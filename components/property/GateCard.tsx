import React from 'react';

const REPORT_ITEMS = [
  'Comparable sales — last 12 months, same street and suburb',
  'True reserve estimate — based on agent intel and recent results',
  'Auction strategy — when to bid, where to stop, how to read the room',
  'Building and pest flags — what to check before you spend $700 on an inspection',
  'Suburb deep dive — where the area is heading and why',
  "Nick's recommendation — buy, pass, or negotiate",
];

interface GateCardProps {
  onUnlock?: () => void;
}

export function GateCard({ onUnlock }: GateCardProps) {
  return (
    <div className="report-card animate-in" style={{ animationDelay: '0.35s' }}>
      <div className="eyebrow">Full Report — $49</div>
      <div className="section-title">Everything you need to make the call</div>
      <p className="body-text">One payment. One property. No subscription.</p>

      {REPORT_ITEMS.map((item, i) => (
        <div className="report-row" key={i}>
          <span className="report-row-icon">→</span>
          <span>{item}</span>
        </div>
      ))}

      <button className="btn-gold" onClick={onUnlock}>
        Get the full report — $49
      </button>

      <p style={{ fontSize: '0.75rem', color: 'rgba(255,250,245,0.55)', textAlign: 'center', marginTop: '12px', lineHeight: '1.5' }}>
        A portion of every report goes to a Melbourne homeless charity.
      </p>
    </div>
  );
}
