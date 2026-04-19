'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Question } from './Question';
import { AnswerInput } from './AnswerInput';

const QUESTIONS = [
  "Where are you looking — suburb, area, or describe the kind of place you have in mind?",
  "What's your budget — the real number you'd stretch to?",
  "Who's moving in?",
  "What does a typical week look like for you?",
  "What are your hard nos?",
  "Tell me how you actually live — what are you doing, where are you going, what would you miss if it wasn't nearby?",
];

const ACKNOWLEDGEMENTS = ['Got it.', 'Noted.', 'Makes sense.', 'Good to know.', 'Alright.'];

const QUESTION_KEYS = ['location', 'budget', 'household', 'weeklyLife', 'hardNos', 'lifestyle'] as const;

export type BuyerAnswers = Record<typeof QUESTION_KEYS[number], string>;

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
  const [answers, setAnswers] = useState<Partial<BuyerAnswers>>({});
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [turns]);

  function handleSubmit() {
    const text = inputValue.trim();
    if (!text || isTransitioning) return;

    const key = QUESTION_KEYS[currentQuestion];
    const newAnswers = { ...answers, [key]: text };
    setAnswers(newAnswers);
    setInputValue('');
    setIsTransitioning(true);

    setTurns(prev => [...prev, { type: 'answer', text }]);

    const nextIndex = currentQuestion + 1;

    if (nextIndex >= QUESTIONS.length) {
      setTimeout(() => {
        setTurns(prev => [
          ...prev,
          { type: 'question', text: 'On it. Give me a moment.' },
        ]);
        setIsComplete(true);
        setIsTransitioning(false);

        const fullAnswers = newAnswers as BuyerAnswers;
        if (onComplete) {
          onComplete(fullAnswers);
        } else {
          const params = new URLSearchParams(fullAnswers);
          router.push(`/results?${params.toString()}`);
        }
      }, 300);
    } else {
      const ack = ACKNOWLEDGEMENTS[currentQuestion % ACKNOWLEDGEMENTS.length];
      setTimeout(() => {
        setTurns(prev => [...prev, { type: 'ack', text: ack }]);
        setTimeout(() => {
          setTurns(prev => [...prev, { type: 'question', text: QUESTIONS[nextIndex] }]);
          setCurrentQuestion(nextIndex);
          setIsTransitioning(false);
        }, 400);
      }, 300);
    }
  }

  return (
    <>
      <div className="conversation-wrap">
        <div className="progress-dots" role="progressbar" aria-valuenow={currentQuestion + 1} aria-valuemax={QUESTIONS.length} aria-label="Conversation progress">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={`progress-dot ${i < currentQuestion ? 'done' : i === currentQuestion ? 'active' : ''}`}
            />
          ))}
        </div>

        {turns.map((turn, i) => {
          if (turn.type === 'question') {
            return <Question key={i} text={turn.text} animationDelay={0} />;
          }
          if (turn.type === 'ack') {
            return (
              <div key={i} className="nick-intro">
                <div className="nick-avatar" aria-hidden="true">N</div>
                <div>
                  <div className="nick-name-label">Nick</div>
                  <div className="acknowledgement-bubble">{turn.text}</div>
                </div>
              </div>
            );
          }
          return (
            <div key={i} className="answer-row">
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
