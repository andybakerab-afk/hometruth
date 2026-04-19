'use client';

import React, { useState } from 'react';
import { SignalBadge } from './SignalBadge';

export interface PropertySignal {
  label: string;
  value: string;
  type: 'good' | 'warn' | 'gold';
}

export interface PropertyData {
  address: string;
  suburb: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  quotedPrice: string;
  trueRange: string;
  matchReason: string;
  nicksBrief: string;
  sourceUrl: string;
  imageUrl: string;
  signals: PropertySignal[];
}

interface PropertyCardProps {
  property: PropertyData;
  index: number;
}

function PropertyImage({ src, alt, suburb }: { src: string; alt: string; suburb: string }) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div className="property-photo-placeholder">
        <span>{suburb}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="property-photo"
      loading="lazy"
      onError={() => setErrored(true)}
    />
  );
}

export function PropertyCard({ property, index }: PropertyCardProps) {
  return (
    <article className="property-card animate-in" style={{ animationDelay: `${index * 0.1}s` }}>
      <PropertyImage
        src={property.imageUrl}
        alt={`${property.address}, ${property.suburb}`}
        suburb={property.suburb}
      />

      <div className="property-body">
        <div className="property-meta">
          <div>
            <div className="property-address">{property.address}</div>
            <div className="property-suburb">{property.suburb}</div>
          </div>
          <div className="property-price">{property.quotedPrice}</div>
        </div>

        <div className="property-beds">
          <span><BedIcon /> {property.bedrooms} bed</span>
          <span><BathIcon /> {property.bathrooms} bath</span>
          <span>{property.type}</span>
        </div>

        {property.matchReason && (
          <div className="match-reason">{property.matchReason}</div>
        )}

        <p className="nicks-brief">"{property.nicksBrief}"</p>

        {property.trueRange && (
          <p className="true-range">
            <strong>Nick's range:</strong> {property.trueRange}
          </p>
        )}

        <div className="signal-row">
          {property.signals.map((signal, i) => (
            <SignalBadge key={i} {...signal} />
          ))}
        </div>
      </div>

      {property.sourceUrl && (
        <div className="property-link-row">
          <a
            href={property.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="property-source-link"
          >
            View listing ↗
          </a>
        </div>
      )}
    </article>
  );
}

function BedIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9V19M3 9C3 7.9 3.9 7 5 7H19C20.1 7 21 7.9 21 9M3 9H21M21 9V19M3 13H21"/>
    </svg>
  );
}

function BathIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 6L9 12M7 12H17M5 12H19C19 16 15.866 19 12 19C8.134 19 5 16 5 12Z"/>
    </svg>
  );
}
