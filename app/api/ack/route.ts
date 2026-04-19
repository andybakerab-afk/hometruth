import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT } from '@/lib/prompts';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { question, answer, questionIndex } = await req.json();

    if (!question || !answer) {
      return NextResponse.json({ ack: 'Got it.' });
    }

    const userPrompt = `The buyer just answered one of your questions.

Question you asked: "${question}"
Their answer: "${answer}"

Respond with a genuine 1–2 sentence acknowledgement in Nick's voice. React specifically to what they said — mention the actual suburbs, budget figure, or details they gave. Be direct and warm. No filler words. No "Great!" or "Absolutely!" This is a brief conversational acknowledgement before you ask the next question. Question index: ${questionIndex}.`;

    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 150,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const ack = response.content[0].type === 'text' ? response.content[0].text.trim() : 'Got it.';
    return NextResponse.json({ ack });
  } catch {
    return NextResponse.json({ ack: 'Got it.' });
  }
}
