import React from 'react';

interface Comparable {
  address: string;
  soldPrice: string;
  soldDate: string;
  note: string;
}

export interface FullReportData {
  suburbDeepDive: {
    priceTrends: string;
    clearanceRate: string;
    daysOnMarket: string;
    whoBuysHere: string;
    whatChanging: string;
  };
  propertyAnalysis: {
    trueReserve: string;
    reserveReasoning: string;
    comparables: Comparable[];
    quotedPriceRead: string;
    buildingPestFlags: string;
  };
  auctionStrategy: {
    whenToBid: string;
    openingBid: string;
    walkAway: string;
    watchFor: string;
  };
  nicksRecommendation: {
    verdict: 'pursue' | 'pass' | 'conditional';
    verdictReason: string;
    walkAwayIf: string;
    goHardIf: string;
  };
}

const VERDICT_LABELS: Record<string, string> = {
  pursue: 'Pursue this one',
  pass: 'Pass on this one',
  conditional: 'Conditional — conditions apply',
};

export function FullReport({ data }: { data: FullReportData }) {
  const { nicksRecommendation: rec, suburbDeepDive: suburb, propertyAnalysis: prop, auctionStrategy: auction } = data;

  return (
    <div className="full-report">

      {/* Nick's Recommendation — top, most prominent */}
      <div className={`verdict-card verdict-${rec.verdict}`}>
        <div className="eyebrow">Nick's Recommendation</div>
        <div className="verdict-label">{VERDICT_LABELS[rec.verdict] ?? rec.verdict}</div>
        <p className="verdict-reason">{rec.verdictReason}</p>
        <div className="verdict-conditions">
          <div className="verdict-condition">
            <span className="verdict-condition-label warn">Walk away if</span>
            <span className="verdict-condition-text">{rec.walkAwayIf}</span>
          </div>
          <div className="verdict-condition">
            <span className="verdict-condition-label good">Go hard if</span>
            <span className="verdict-condition-text">{rec.goHardIf}</span>
          </div>
        </div>
      </div>

      {/* Suburb Deep Dive */}
      <div className="report-section">
        <div className="report-section-header">
          <div className="report-section-title">Suburb Deep Dive</div>
        </div>
        <div className="report-section-body">
          <ReportDataRow label="Price Trends" value={suburb.priceTrends} />
          <ReportDataRow label="Clearance Rate" value={suburb.clearanceRate} />
          <ReportDataRow label="Days on Market" value={suburb.daysOnMarket} />
          <ReportDataRow label="Who Buys Here" value={suburb.whoBuysHere} />
          <ReportDataRow label="What's Changing" value={suburb.whatChanging} last />
        </div>
      </div>

      {/* Property Analysis */}
      <div className="report-section">
        <div className="report-section-header">
          <div className="report-section-title">Property Analysis</div>
        </div>
        <div className="report-section-body">
          <div className="true-reserve-block">
            <div className="true-reserve-label">Nick's Reserve Estimate</div>
            <div className="true-reserve-value">{prop.trueReserve}</div>
            <p className="true-reserve-reasoning">{prop.reserveReasoning}</p>
          </div>

          <ReportDataRow label="Quoted Price Read" value={prop.quotedPriceRead} />
          <ReportDataRow label="Building & Pest" value={prop.buildingPestFlags} />

          {prop.comparables?.length > 0 && (
            <div className="comparables">
              <div className="comparables-label">Recent Comparable Sales</div>
              {prop.comparables.map((comp, i) => (
                <div className="comparable-item" key={i}>
                  <div className="comparable-left">
                    <div className="comparable-address">{comp.address}</div>
                    <div className="comparable-note">{comp.note}</div>
                  </div>
                  <div className="comparable-right">
                    <div className="comparable-price">{comp.soldPrice}</div>
                    <div className="comparable-date">{comp.soldDate}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Auction Strategy */}
      <div className="report-section">
        <div className="report-section-header">
          <div className="report-section-title">Auction Strategy</div>
        </div>
        <div className="report-section-body">
          <ReportDataRow label="When to Bid" value={auction.whenToBid} />
          <ReportDataRow label="Opening Bid" value={auction.openingBid} />
          <ReportDataRow label="Walk Away At" value={auction.walkAway} highlight />
          <ReportDataRow label="Watch For" value={auction.watchFor} last />
        </div>
      </div>

    </div>
  );
}

function ReportDataRow({ label, value, last = false, highlight = false }: {
  label: string;
  value: string;
  last?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className={`report-data-row${last ? ' last' : ''}${highlight ? ' highlight' : ''}`}>
      <div className="report-data-label">{label}</div>
      <div className="report-data-value">{value}</div>
    </div>
  );
}
