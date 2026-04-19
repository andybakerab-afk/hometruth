export interface SerperResult {
  title: string;
  link: string;
  snippet: string;
  imageUrl?: string;
}

export interface SerperResponse {
  organic: SerperResult[];
  queries: string[];
}

export async function searchProperties(queries: string[]): Promise<SerperResponse> {
  const apiKey = process.env.SERPER_API_KEY;
  if (!apiKey) {
    throw new Error('SERPER_API_KEY is not configured');
  }

  const allResults: SerperResult[] = [];

  for (const query of queries) {
    const response = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: query,
        gl: 'au',
        hl: 'en',
        num: 10,
      }),
    });

    if (!response.ok) {
      console.error(`Serper query failed: ${query}`, response.status);
      continue;
    }

    const data = await response.json();

    if (data.organic) {
      for (const item of data.organic) {
        allResults.push({
          title: item.title ?? '',
          link: item.link ?? '',
          snippet: item.snippet ?? '',
          imageUrl: item.imageUrl ?? undefined,
        });
      }
    }
  }

  return { organic: allResults, queries };
}
