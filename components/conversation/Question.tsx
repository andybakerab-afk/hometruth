import React from 'react';
import Image from 'next/image';

interface QuestionProps {
  text: string;
  animationDelay?: number;
}

export function Question({ text, animationDelay = 0 }: QuestionProps) {
  return (
    <div className="nick-intro" style={{ animationDelay: `${animationDelay}s` }}>
      <div className="nick-avatar-img" aria-hidden="true">
        <Image src="/nick-avatar.png" alt="Nick" width={42} height={42} priority />
      </div>
      <div>
        <div className="nick-name-label">✦ Nick.ai</div>
        <div className="question-bubble">{text}</div>
      </div>
    </div>
  );
}
