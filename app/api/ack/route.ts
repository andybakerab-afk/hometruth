import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const ACK_SYSTEM = `You are Nick — a Melbourne buyer's advocate. Your only job right now is to give a brief acknowledgement of what the buyer just said.

Rules:
- 1 sentence only. Maximum 20 words.
- React to the specific detail they gave (suburb name, dollar figure, who's moving in, etc.)
- Direct and warm. No "Great!" or "Absolutely!" or any filler.
- Do NOT ask any questions. Do NOT add follow-up. Just acknowledge.
- Allowed openers: "Got it.", "Noted.", "Makes sense.", "Good to know.", "Alright." — then optionally one short clause reacting to the detail.`;

export async function POST(req: NextRequest) {
  try {
    const { question, answer } = await req.json();

    if (!question || !answer) {
      return NextResponse.json({ ack: 'Got it.' });
    }

    const userPrompt = `Question: "${question}"\nAnswer: "${answer}"\n\nAcknowledge in one sentence only. No questions.`;

    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 80,
      system: ACK_SYSTEM,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const ack = response.content[0].type === 'text' ? response.content[0].text.trim() : 'Got it.';
    return NextResponse.json({ ack });
  } catch {
    return NextResponse.json({ ack: 'Got it.' });
  }
}
