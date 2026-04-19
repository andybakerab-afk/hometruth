import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import {
  searchProperties,
  searchPropertyImage,
  parseListingTitle,
  parseBedroomsFromSnippet,
  type ParsedListing,
} from '@/lib/serper';
import { QUERY_GENERATION_PROMPT, ANALYSE_PROPERTIES_PROMPT } from '@/lib/prompts';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { location, budget, household, mustHaves, hardNos, lifestyle } = body;

    if (!location || !budget) {
      return NextResponse.json({ error: 'Missing required buyer answers' }, { status: 400 });
    }

    const answersText = [
      `Location preference: ${location}`,
      `Budget: ${budget}`,
      `Household: ${household}`,
      `Property must-haves: ${mustHaves}`,
      `Hard nos: ${hardNos}`,
      `Lifestyle & timing: ${lifestyle}`,
    ].join('\n');

    // Step 1: Generate search queries in the confirmed working format
    let queries: string[] = [];
    try {
      const queryPrompt = QUERY_GENERATION_PROMPT.replace('{{ANSWERS}}', answersText);
      const queryResponse = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 256,
        messages: [{ role: 'user', content: queryPrompt }],
      });

      const queryText = queryResponse.content[0].type === 'text' ? queryResponse.content[0].text : '';
      const parsed = JSON.parse(queryText.trim());
      queries = Array.isArray(parsed) ? parsed : [];
    } catch {
      // Fallback: build a simple query from location
      const suburb = location.split(/[,\s]/)[0];
      queries = [`site:domain.com.au/3 ${suburb} bedroom for sale`];
    }

    console.log('[Search API] Generated queries:', queries);

    // Step 2: Fetch Serper results and parse into structured listings
    const parsedListings: ParsedListing[] = [];

    if (process.env.SERPER_API_KEY) {
      try {
        const serperResponse = await searchProperties(queries);
        console.log('[Search API] Serper returned', serperResponse.organic.length, 'results');

        const seen = new Set<string>();
        for (const item of serperResponse.organic.slice(0, 15)) {
          if (!item.link.includes('domain.com.au')) continue;

          const { address, suburb } = parseListingTitle(item.title);
          if (!address || seen.has(address)) continue;
          seen.add(address);

          const bedrooms = parseBedroomsFromSnippet(item.snippet) || parseBedroomsFromSnippet(item.title);

          parsedListings.push({
            address,
            suburb,
            bedrooms,
            snippet: item.snippet,
            sourceUrl: item.link,
            imageUrl: '',
          });

          if (parsedListings.length >= 9) break;
        }

        // Step 3: Fetch images for each unique property in parallel
        await Promise.all(
          parsedListings.map(async (listing, i) => {
            const img = await searchPropertyImage(listing.address);
            parsedListings[i].imageUrl = img;
          })
        );

        console.log('[Search API] Parsed', parsedListings.length, 'listings with images');
      } catch (err) {
        console.error('[Search API] Serper error:', err);
      }
    } else {
      console.warn('[Search API] SERPER_API_KEY missing — Claude will use illustrative properties');
    }

    // Format listings for Claude
    const serperResultsText = parsedListings.length > 0
      ? parsedListings.map((l, i) =>
          `[${i + 1}] Address: ${l.address}\nSuburb: ${l.suburb}\nBedrooms: ${l.bedrooms || 'unknown'}\nSnippet: ${l.snippet}\nSource URL: ${l.sourceUrl}\nImage URL: ${l.imageUrl || 'none'}`
        ).join('\n\n')
      : 'No listings found — use illustrative properties matching the buyer profile.';

    // Step 4: Claude analyses and returns structured properties
    const analysePrompt = ANALYSE_PROPERTIES_PROMPT
      .replace('{{ANSWERS}}', answersText)
      .replace('{{SERPER_RESULTS}}', serperResultsText);

    const analyseResponse = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      messages: [{ role: 'user', content: analysePrompt }],
    });

    const analysisText = analyseResponse.content[0].type === 'text' ? analyseResponse.content[0].text : '';

    let result;
    try {
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      result = JSON.parse(jsonMatch ? jsonMatch[0] : analysisText);
    } catch {
      return NextResponse.json({ error: 'Failed to parse property analysis' }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error('Search API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
