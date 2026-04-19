import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { FULL_REPORT_PROMPT } from '@/lib/prompts';
import type { PropertyData } from '@/components/property/PropertyCard';
import type { BuyerAnswers } from '@/components/conversation/ConversationFlow';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { property: PropertyData; buyerAnswers: BuyerAnswers };
    const { property, buyerAnswers } = body;

    if (!property?.address || !buyerAnswers?.location) {
      return NextResponse.json({ error: 'Missing property or buyer answers' }, { status: 400 });
    }

    const propertyText = [
      `Address: ${property.address}, ${property.suburb}`,
      `Type: ${property.type}`,
      `Bedrooms: ${property.bedrooms}, Bathrooms: ${property.bathrooms}`,
      `Quoted price: ${property.quotedPrice}`,
      `Nick's brief: ${property.nicksBrief}`,
    ].join('\n');

    const answersText = [
      `Location preference: ${buyerAnswers.location}`,
      `Budget: ${buyerAnswers.budget}`,
      `Household: ${buyerAnswers.household}`,
      `Must-haves: ${buyerAnswers.mustHaves}`,
      `Hard nos: ${buyerAnswers.hardNos}`,
      `Lifestyle & timing: ${buyerAnswers.lifestyle}`,
    ].join('\n');

    const prompt = FULL_REPORT_PROMPT
      .replace('{{PROPERTY}}', propertyText)
      .replace('{{ANSWERS}}', answersText);

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 3000,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';

    let result;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      result = JSON.parse(jsonMatch ? jsonMatch[0] : text);
    } catch {
      return NextResponse.json({ error: 'Failed to parse report' }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error('Report API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
