'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PropertyCard, type PropertyData } from '@/components/property/PropertyCard';
import { GateCard } from '@/components/property/GateCard';

interface SearchResult {
  intro: string;
  properties: PropertyData[];
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [state, setState] = useState<'loading' | 'success' | 'error'>('loading');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const answers = {
      location: searchParams.get('location') ?? '',
      budget: searchParams.get('budget') ?? '',
      household: searchParams.get('household') ?? '',
      weeklyLife: searchParams.get('weeklyLife') ?? '',
      hardNos: searchParams.get('hardNos') ?? '',
      lifestyle: searchParams.get('lifestyle') ?? '',
    };

    if (!answers.location || !answers.budget) {
      router.replace('/');
      return;
    }

    fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers),
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? `Request failed (${res.status})`);
        }
        return res.json();
      })
      .then((data: SearchResult) => {
        setResult(data);
        setState('success');
      })
      .catch((err: Error) => {
        console.error('Results fetch error:', err);
        setErrorMessage(err.message ?? 'Something went wrong.');
        setState('error');
      });
  }, []);

  if (state === 'loading') {
    return (
      <div className="loading-wrap">
        <div className="loading-spinner" role="status" aria-label="Loading" />
        <div className="loading-text">Nick's on it…</div>
        <div className="loading-sub">Searching Melbourne listings and adding the inside word.</div>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="error-wrap">
        <div className="error-title">Something went wrong</div>
        <p className="error-body">{errorMessage || 'Could not load properties. Check your connection and try again.'}</p>
        <button className="btn-ghost" style={{ maxWidth: '200px', marginTop: '8px' }} onClick={() => router.back()}>
          Go back
        </button>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="results-wrap">
      {result.intro && (
        <div className="nick-intro animate-in">
          <div className="nick-avatar" aria-hidden="true">N</div>
          <div>
            <div className="nick-name-label">Nick</div>
            <div className="question-bubble results-intro">{result.intro}</div>
          </div>
        </div>
      )}

      {result.properties.map((property, i) => (
        <PropertyCard key={i} property={property} index={i} />
      ))}

      <GateCard />

      <p style={{ fontSize: '0.75rem', color: 'var(--text-hint)', textAlign: 'center', padding: '8px 0 4px', lineHeight: '1.5' }}>
        HomeTruth receives a spotter fee if you proceed with a referred conveyancer, broker, or inspector.
        This is disclosed upfront and never affects Nick's advice.
      </p>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="loading-wrap">
      <div className="loading-spinner" role="status" aria-label="Loading" />
      <div className="loading-text">Nick's on it…</div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResultsContent />
    </Suspense>
  );
}
