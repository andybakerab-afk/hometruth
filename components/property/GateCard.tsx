'use client';

import React, { useState } from 'react';
import { FullReport, type FullReportData } from './FullReport';
import type { PropertyData } from './PropertyCard';
import type { BuyerAnswers } from '../conversation/ConversationFlow';

interface GateCardProps {
  property: PropertyData;
  buyerAnswers: BuyerAnswers;
}

type Phase = 'idle' | 'loading' | 'success' | 'error';

export function GateCard({ property, buyerAnswers }: GateCardProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [reportData, setReportData] = useState<FullReportData | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  async function handleGenerate() {
    setPhase('loading');
    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ property, buyerAnswers }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? `Failed (${res.status})`);
      }
      const data: FullReportData = await res.json();
      setReportData(data);
      setPhase('success');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.';
      setErrorMsg(msg);
      setPhase('error');
    }
  }

  if (phase === 'success' && reportData) {
    return (
      <div className="animate-in">
        <div className="report-property-context">
          <div className="eyebrow">Full Report</div>
          <div className="report-property-name">{property.address}, {property.suburb}</div>
        </div>
        <FullReport data={reportData} />
      </div>
    );
  }

  if (phase === 'loading') {
    return (
      <div className="report-loading">
        <div className="loading-spinner" role="status" aria-label="Generating report" />
        <div className="loading-text">Nick's writing this up…</div>
        <div className="loading-sub">Pulling comparables, reading the market, checking the numbers.</div>
      </div>
    );
  }

  if (phase === 'error') {
    return (
      <div className="report-error-card">
        <p className="error-body">{errorMsg}</p>
        <button className="btn-ghost" onClick={() => setPhase('idle')} style={{ marginTop: '12px' }}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="report-trigger-card animate-in">
      <div className="report-trigger-header">
        <div className="eyebrow">Nick's Full Analysis</div>
        <div className="section-title">{property.address}</div>
        <p className="body-text">Comparable sales, reserve estimate, auction strategy and Nick's straight recommendation.</p>
      </div>
      <button className="btn-primary" onClick={handleGenerate}>
        Get Nick's full report
      </button>
      <p className="disclosure-text">
        HomeTruth receives a spotter fee if you proceed with a referred conveyancer, broker, or inspector.
        Disclosed upfront and never affects Nick's advice.
      </p>
    </div>
  );
}
