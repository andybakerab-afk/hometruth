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
  console.log('[Serper] API key present:', !!apiKey, '| key prefix:', apiKey ? apiKey.slice(0, 6) + '…' : 'MISSING');

  if (!apiKey) {
    throw new Error('SERPER_API_KEY is not configured');
  }

  const allResults: SerperResult[] = [];

  for (const query of queries) {
    console.log('[Serper] Running query:', query);

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

    console.log('[Serper] Response status:', response.status);

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      console.error(`[Serper] Query failed (${response.status}):`, query, errText);
      continue;
    }

    const data = await response.json();
    console.log('[Serper] Raw response keys:', Object.keys(data));
    console.log('[Serper] Organic count:', data.organic?.length ?? 0);

    if (data.organic?.length > 0) {
      console.log('[Serper] First organic item:', JSON.stringify(data.organic[0], null, 2));
    }

    if (data.organic) {
      for (const item of data.organic) {
        allResults.push({
          title: item.title ?? '',
          link: item.link ?? '',
          snippet: item.snippet ?? '',
          imageUrl: item.imageUrl ?? item.thumbnail ?? undefined,
        });
      }
    }
  }

  console.log('[Serper] Total results collected:', allResults.length);
  return { organic: allResults, queries };
}
