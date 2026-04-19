export interface SerperResult {
  title: string;
  link: string;
  snippet: string;
  imageUrl?: string;
}

export interface ParsedListing {
  address: string;
  suburb: string;
  bedrooms: number;
  snippet: string;
  sourceUrl: string;
  imageUrl: string;
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

export async function searchPropertyImage(address: string): Promise<string> {
  const apiKey = process.env.SERPER_API_KEY;
  if (!apiKey) return '';

  try {
    const response = await fetch('https://google.serper.dev/images', {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: address + ' Melbourne property',
        gl: 'au',
        num: 3,
      }),
    });

    if (!response.ok) return '';

    const data = await response.json();
    const first = data.images?.[0];
    return first?.imageUrl ?? first?.thumbnailUrl ?? '';
  } catch {
    return '';
  }
}

export function parseListingTitle(title: string): { address: string; suburb: string } {
  // Domain titles: "123 Street Name, Suburb VIC 3000 | Domain" or "123 Street, Suburb | Domain"
  const withoutDomain = title.split(' | ')[0].trim();

  // Try to extract suburb from the last comma-separated segment before the state/postcode
  const parts = withoutDomain.split(',');
  if (parts.length >= 2) {
    const address = parts.slice(0, -1).join(',').trim();
    const suburbPart = parts[parts.length - 1].trim();
    // Remove VIC/NSW/etc and postcode if present
    const suburb = suburbPart.replace(/\s+(VIC|NSW|QLD|SA|WA|TAS|ACT|NT)\s*\d{4}/i, '').trim();
    return { address: withoutDomain, suburb: suburb || suburbPart };
  }

  return { address: withoutDomain, suburb: '' };
}

export function parseBedroomsFromSnippet(snippet: string): number {
  const match = snippet.match(/(\d+)\s*(?:bed(?:room)?s?|br\b)/i);
  return match ? parseInt(match[1], 10) : 0;
}
