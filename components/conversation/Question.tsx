import React from 'react';

interface QuestionProps {
  text: string;
  animationDelay?: number;
}

export function Question({ text, animationDelay = 0 }: QuestionProps) {
  return (
    <div className="nick-intro" style={{ animationDelay: `${animationDelay}s` }}>
      <div className="nick-avatar" aria-hidden="true">N</div>
      <div>
        <div className="nick-name-label">Nick</div>
        <div className="question-bubble">{text}</div>
      </div>
    </div>
  );
}
