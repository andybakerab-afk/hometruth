'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Question } from './Question';
import { AnswerInput } from './AnswerInput';

const QUESTIONS = [
  "Where are you looking — suburb, area, or describe the kind of place you have in mind?",
  "What's your budget — the real number you'd stretch to?",
  "Who's moving in?",
  "What really matters in the property itself? Bedrooms, layout, outdoor space, parking — what's actually on the list?",
  "What are your hard nos?",
  "Last one — tell me how you actually live. What do you need nearby, what does your day-to-day look like, what would you genuinely miss?",
];

const FOLLOW_UP = "And where are you at with timing — ready to move, or still working it out?";

const QUESTION_KEYS = ['location', 'budget', 'household', 'mustHaves', 'hardNos', 'lifestyle'] as const;

export type BuyerAnswers = Record<typeof QUESTION_KEYS[number], string>;

function buildAck(questionIndex: number): string {
  switch (questionIndex) {
    case 0: return 'Got it — I know that part of the market.';
    case 1: return 'Noted. I can work with that.';
    case 2: return 'Makes sense.';
    case 3: return 'Good to know — that shapes where I look.';
    case 4: return 'Good to know — saves us both time.';
    default: return 'Got it.';
  }
}

interface Turn {
  type: 'question' | 'answer' | 'ack';
  text: string;
}

interface ConversationFlowProps {
  onComplete?: (answers: BuyerAnswers) => void;
}

export function ConversationFlow({ onComplete }: ConversationFlowProps) {
  const router = useRouter();
  const [turns, setTurns] = useState<Turn[]>([{ type: 'question', text: QUESTIONS[0] }]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [followUpPhase, setFollowUpPhase] = useState(false);
  const [answers, setAnswers] = useState<Partial<BuyerAnswers>>({});
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [turns]);

  function handleSubmit() {
    const text = inputValue.trim();
    if (!text || isTransitioning) return;

    setInputValue('');
    setIsTransitioning(true);
    setTurns(prev => [...prev, { type: 'answer', text }]);

    if (followUpPhase) {
      const combinedLifestyle = `${answers.lifestyle}\n\nTiming: ${text}`;
      const fullAnswers = { ...answers, lifestyle: combinedLifestyle } as BuyerAnswers;

      setTimeout(() => {
        setTurns(prev => [...prev, { type: 'question', text: 'On it. Give me a moment.' }]);
        setIsComplete(true);
        setIsTransitioning(false);

        if (onComplete) {
          onComplete(fullAnswers);
        } else {
          const params = new URLSearchParams(fullAnswers);
          router.push(`/results?${params.toString()}`);
        }
      }, 400);
      return;
    }

    const key = QUESTION_KEYS[currentQuestion];
    const newAnswers = { ...answers, [key]: text };
    setAnswers(newAnswers);

    const nextIndex = currentQuestion + 1;
    const ack = buildAck(currentQuestion);

    if (nextIndex >= QUESTIONS.length) {
      setTimeout(() => {
        setTurns(prev => [...prev, { type: 'ack', text: ack }]);
        setTimeout(() => {
          setTurns(prev => [...prev, { type: 'question', text: FOLLOW_UP }]);
          setFollowUpPhase(true);
          setIsTransitioning(false);
        }, 420);
      }, 300);
    } else {
      setTimeout(() => {
        setTurns(prev => [...prev, { type: 'ack', text: ack }]);
        setTimeout(() => {
          setTurns(prev => [...prev, { type: 'question', text: QUESTIONS[nextIndex] }]);
          setCurrentQuestion(nextIndex);
          setIsTransitioning(false);
        }, 420);
      }, 300);
    }
  }

  return (
    <>
      <div className="conversation-wrap">
        <div
          className="progress-dots"
          role="progressbar"
          aria-valuenow={Math.min(currentQuestion + 1, QUESTIONS.length)}
          aria-valuemax={QUESTIONS.length}
          aria-label="Conversation progress"
        >
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={`progress-dot ${i < currentQuestion ? 'done' : i === currentQuestion && !followUpPhase ? 'active' : followUpPhase ? 'done' : ''}`}
            />
          ))}
        </div>

        {turns.map((turn, i) => {
          if (turn.type === 'question') {
            return <Question key={i} text={turn.text} />;
          }
          if (turn.type === 'ack') {
            return (
              <div key={i} className="nick-intro animate-in">
                <div className="nick-avatar-img" aria-hidden="true">
                  <Image src="/nick-avatar.svg" alt="Nick" width={42} height={42} />
                </div>
                <div>
                  <div className="nick-name-label">Nick</div>
                  <div className="acknowledgement-bubble">{turn.text}</div>
                </div>
              </div>
            );
          }
          return (
            <div key={i} className="answer-row animate-in">
              <div className="answer-bubble">{turn.text}</div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>

      {!isComplete && (
        <AnswerInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSubmit}
          disabled={isTransitioning}
        />
      )}
    </>
  );
}
