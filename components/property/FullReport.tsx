import React from 'react';

interface Comparable {
  address: string;
  soldPrice: string;
  soldDate: string;
  note: string;
}

interface PriceTrendPoint {
  month: string;
  value: number;
}

export interface FullReportData {
  suburbDeepDive: {
    priceTrends: string;
    clearanceRate: string;
    daysOnMarket: string;
    whoBuysHere: string;
    whatChanging: string;
    priceTrendData?: PriceTrendPoint[];
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
  financeSnapshot?: {
    estimatedPurchasePrice: string;
    deposit20pct: string;
    loanAmount: string;
    monthlyVariableRepayment: string;
    monthlyFixedRepayment: string;
    stampDuty: string;
    conveyancing: string;
    buildingInspection: string;
    totalFundsNeeded: string;
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
  conditional: 'Conditional',
};

export function FullReport({ data }: { data: FullReportData }) {
  const { nicksRecommendation: rec, suburbDeepDive: suburb, propertyAnalysis: prop, auctionStrategy: auction, financeSnapshot: finance } = data;

  return (
    <div className="full-report">

      {/* Nick's Recommendation */}
      <div className="report-section">
        <div className="report-section-header">
          <div className="report-section-title">Nick's Recommendation</div>
        </div>
        <div className={`verdict-banner verdict-banner-${rec.verdict}`}>
          {VERDICT_LABELS[rec.verdict] ?? rec.verdict}
        </div>
        <div className="report-section-body">
          <ReportDataRow label="Assessment" value={rec.verdictReason} />
          <ReportDataRow label="Walk away if" value={rec.walkAwayIf} />
          <ReportDataRow label="Go hard if" value={rec.goHardIf} last />
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
          <ReportDataRow label="What's Changing" value={suburb.whatChanging} last={!suburb.priceTrendData?.length} />
          {suburb.priceTrendData && suburb.priceTrendData.length > 0 && (
            <PriceChart data={suburb.priceTrendData} />
          )}
        </div>
      </div>

      {/* Property Analysis */}
      <div className="report-section">
        <div className="report-section-header">
          <div className="report-section-title">Property Analysis</div>
        </div>
        <div className="report-section-body">
          <ReportDataRow label="Nick's Reserve" value={prop.trueReserve} highlight />
          <ReportDataRow label="Reserve Reasoning" value={prop.reserveReasoning} />
          <ReportDataRow label="Quoted Price Read" value={prop.quotedPriceRead} />
          <ReportDataRow label="Building & Pest" value={prop.buildingPestFlags} last={!prop.comparables?.length} />

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

      {/* Finance Snapshot */}
      {finance && (
        <div className="report-section">
          <div className="report-section-header">
            <div className="report-section-title">Finance Snapshot</div>
          </div>
          <div className="report-section-body">
            <ReportDataRow label="Est. Purchase Price" value={finance.estimatedPurchasePrice} />
            <ReportDataRow label="20% Deposit" value={finance.deposit20pct} />
            <ReportDataRow label="Loan Amount" value={finance.loanAmount} highlight />
            <ReportDataRow label="Variable Repayment" value={`${finance.monthlyVariableRepayment} at 6.5% p.a.`} />
            <ReportDataRow label="Fixed Repayment" value={`${finance.monthlyFixedRepayment} at 6.1% p.a.`} />
            <ReportDataRow label="Stamp Duty (VIC)" value={finance.stampDuty} />
            <ReportDataRow label="Conveyancing" value={finance.conveyancing} />
            <ReportDataRow label="Building Inspection" value={finance.buildingInspection} />
            <ReportDataRow label="Total Funds Needed" value={finance.totalFundsNeeded} highlight last />
          </div>
          <div className="finance-broker-note">
            Connect with Nick&apos;s broker for a personalised assessment.
          </div>
        </div>
      )}

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

function PriceChart({ data }: { data: PriceTrendPoint[] }) {
  const values = data.map(d => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  return (
    <div className="price-chart-wrap">
      <div className="price-chart-label">6-Month Price Trend</div>
      <div className="price-chart-bars">
        {data.map((point, i) => {
          const heightPct = 20 + ((point.value - min) / range) * 80;
          return (
            <div key={i} className="price-chart-col">
              <div className="price-chart-bar-wrap">
                <div
                  className="price-chart-bar"
                  style={{ height: `${heightPct}%` }}
                />
              </div>
              <div className="price-chart-month">{point.month}</div>
              <div className="price-chart-value">${point.value}k</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
