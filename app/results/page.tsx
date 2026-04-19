'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { PropertyCard, type PropertyData } from '@/components/property/PropertyCard';
import { GateCard } from '@/components/property/GateCard';
import type { BuyerAnswers } from '@/components/conversation/ConversationFlow';

interface SearchResult {
  intro: string;
  properties: PropertyData[];
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [state, setState] = useState<'loading' | 'success' | 'error'>('loading');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [buyerAnswers, setBuyerAnswers] = useState<BuyerAnswers | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const answers: BuyerAnswers = {
      location: searchParams.get('location') ?? '',
      budget: searchParams.get('budget') ?? '',
      household: searchParams.get('household') ?? '',
      mustHaves: searchParams.get('mustHaves') ?? '',
      hardNos: searchParams.get('hardNos') ?? '',
      lifestyle: searchParams.get('lifestyle') ?? '',
    };

    if (!answers.location || !answers.budget) {
      router.replace('/');
      return;
    }

    setBuyerAnswers(answers);

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

  if (!result || !buyerAnswers) return null;

  return (
    <div className="results-wrap">
      {result.intro && (
        <div className="nick-intro animate-in">
          <div className="nick-avatar-img" aria-hidden="true">
            <Image src="/nick-avatar.png" alt="Nick" width={56} height={56} />
          </div>
          <div>
            <div className="nick-name-label">✦ Nick.ai</div>
            <div className="question-bubble results-intro">{result.intro}</div>
          </div>
        </div>
      )}

      {result.properties.map((property, i) => (
        <PropertyCard key={i} property={property} index={i} />
      ))}

      {result.properties.length > 0 && (
        <GateCard property={result.properties[0]} buyerAnswers={buyerAnswers} />
      )}
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
