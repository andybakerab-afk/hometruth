import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { searchProperties } from '@/lib/serper';
import { QUERY_GENERATION_PROMPT, ANALYSE_PROPERTIES_PROMPT } from '@/lib/prompts';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { location, budget, household, weeklyLife, hardNos, lifestyle } = body;

    if (!location || !budget) {
      return NextResponse.json({ error: 'Missing required buyer answers' }, { status: 400 });
    }

    const answersText = [
      `Location preference: ${location}`,
      `Budget: ${budget}`,
      `Household: ${household}`,
      `Typical week: ${weeklyLife}`,
      `Hard nos: ${hardNos}`,
      `Lifestyle: ${lifestyle}`,
    ].join('\n');

    // Step 1: Generate search queries
    let queries: string[] = [];
    try {
      const queryPrompt = QUERY_GENERATION_PROMPT.replace('{{ANSWERS}}', answersText);
      const queryResponse = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 256,
        messages: [{ role: 'user', content: queryPrompt }],
      });

      const queryText = queryResponse.content[0].type === 'text' ? queryResponse.content[0].text : '';
      queries = JSON.parse(queryText.trim());
    } catch {
      queries = [`${location} property for sale Melbourne site:domain.com.au`];
    }

    // Step 2: Fetch Serper results
    let serperResultsText = 'No search results available.';
    try {
      if (process.env.SERPER_API_KEY) {
        const serperResponse = await searchProperties(queries);
        if (serperResponse.organic.length > 0) {
          serperResultsText = serperResponse.organic
            .slice(0, 15)
            .map((r, i) => `[${i + 1}] ${r.title}\nURL: ${r.link}\n${r.snippet}${r.imageUrl ? `\nImage: ${r.imageUrl}` : ''}`)
            .join('\n\n');
        }
      }
    } catch (err) {
      console.error('Serper error:', err);
    }

    // Step 3: Claude analyses and returns structured properties
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
