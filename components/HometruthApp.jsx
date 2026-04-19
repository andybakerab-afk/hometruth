"use client";

import { useState, useEffect } from "react";
import P from "../src/theme.js";

const HOME_SCREENS = ["Hero","Preferences","Suburb Truth","Ask Hometruth","Get the Report","Property Report","Meet Nick","How We Work","Get Started"];
const CAR_SCREENS  = ["Hero","What You Want","Dealer Truth","Ask Hometruth","Get the Report","Nick Handles It","How We Work","Get Started"];

export default function Hometruth() {
  const [vertical, setVertical] = useState("homes");
  const [screen, setScreen]     = useState(0);
  const [entered, setEntered]   = useState(false);
  const screens = vertical === "homes" ? HOME_SCREENS : CAR_SCREENS;

  useEffect(() => {
    setEntered(false);
    const t = setTimeout(() => setEntered(true), 60);
    return () => clearTimeout(t);
  }, [screen, vertical]);

  const go = (n) => setScreen(Math.max(0, Math.min(n, screens.length - 1)));
  const switchVertical = (v) => { setVertical(v); setScreen(0); };

  const S = {
    wrap:      { minHeight:"100vh", padding:"0 16px 32px", fontFamily:P.fontB, display:"flex", flexDirection:"column", alignItems:"center" },
    h1:        { fontFamily:P.fontD, fontSize:"1.85rem", fontWeight:"600", lineHeight:"1.15", letterSpacing:"-.025em", color:P.text, marginBottom:"8px", textShadow:"0 1px 0 rgba(255,255,255,.55)" },
    em:        { fontStyle:"italic", color:"#9d8170", fontWeight:"500" },
    sub:       { fontFamily:P.fontB, fontSize:"13px", fontWeight:"300", lineHeight:"1.6", color:P.textSub, marginBottom:"12px" },
    sp:        { flex:1 },
    secLabel:  { fontFamily:P.fontB, fontSize:"10px", fontWeight:"600", letterSpacing:"0.10em", textTransform:"uppercase", color:P.textHint, marginBottom:"7px" },
    pillRow:   { display:"flex", gap:"6px", flexWrap:"wrap", marginBottom:"12px" },
    pill:      (on) => ({ fontFamily:P.fontB, fontSize:"12px", padding:"5px 13px", borderRadius:"99px", border:`1px solid ${on?P.accent:"rgba(88,66,48,0.14)"}`, background:on?`linear-gradient(135deg,${P.accentDark},${P.accent})`:"rgba(255,255,255,.6)", color:on?P.accentText:P.textSub, cursor:"pointer", fontWeight:on?"500":"400", boxShadow:on?"0 3px 8px rgba(180,72,38,0.20)":"none" }),
    rl:        { fontFamily:P.fontB, fontSize:"13px", color:P.text, fontWeight:"400" },
    rv:        { fontFamily:P.fontB, fontSize:"12px", fontWeight:"500", color:P.textSub },
    avatarRow: { display:"flex", alignItems:"center", gap:"12px", marginBottom:"12px", padding:"14px 16px", background:"radial-gradient(140% 120% at 0% 0%, rgba(255,255,255,.72) 0%, rgba(255,255,255,0) 45%), linear-gradient(180deg, #fffdfb 0%, #faf6f1 100%)", borderRadius:"20px", border:"1px solid rgba(98,76,58,.11)", boxShadow:"0 8px 22px rgba(74,52,35,.08), inset 0 1px 0 rgba(255,255,255,.65)" },
    avatar:    { width:"44px", height:"44px", borderRadius:"50%", background:`linear-gradient(135deg,${P.accentSoft},#eeddd3)`, border:`1px solid rgba(198,90,50,0.18)`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:P.fontD, fontSize:"17px", color:P.accent, flexShrink:0, boxShadow:"0 2px 8px rgba(198,90,50,0.14)" },
    an:        { fontFamily:P.fontD, fontSize:"15px", color:P.text },
    at:        { fontFamily:P.fontB, fontSize:"12px", fontWeight:"300", color:P.textSub },
    quote:     { marginBottom:"12px", padding:"12px 14px 12px 16px", borderLeft:`3px solid ${P.accent}`, background:"linear-gradient(90deg,rgba(198,90,50,0.05) 0%,transparent 100%)", borderRadius:"0 12px 12px 0", border:"1px solid rgba(198,90,50,0.10)", borderLeft:`3px solid ${P.accent}` },
    qt:        { fontFamily:P.fontD, fontSize:"14px", fontStyle:"italic", lineHeight:"1.6", color:P.text, marginBottom:"5px" },
    qa:        { fontFamily:P.fontB, fontSize:"10px", color:P.textHint, letterSpacing:"0.06em", textTransform:"uppercase" },
    chatName:  { fontFamily:P.fontB, fontSize:"10px", fontWeight:"600", letterSpacing:"0.08em", textTransform:"uppercase", color:P.textHint, marginBottom:"5px" },
    them:      { background:"linear-gradient(160deg,#f8f3ec 0%,#f2ece3 100%)", color:P.text, borderRadius:"14px", borderBottomLeftRadius:"4px", padding:"10px 13px", fontFamily:P.fontB, fontSize:"13px", lineHeight:"1.55", maxWidth:"85%", marginBottom:"8px", alignSelf:"flex-start", border:"1px solid rgba(98,76,58,.08)", boxShadow:"0 1px 4px rgba(50,35,22,0.06)" },
    me:        { background:`linear-gradient(135deg,${P.accentDark} 0%,${P.accent} 100%)`, color:P.accentText, borderRadius:"14px", borderBottomRightRadius:"4px", padding:"10px 13px", fontFamily:P.fontB, fontSize:"13px", lineHeight:"1.55", maxWidth:"85%", marginBottom:"8px", alignSelf:"flex-end", boxShadow:"0 3px 10px rgba(180,72,38,0.22)" },
    inputRow:  { display:"flex", gap:"8px", alignItems:"center", padding:"10px 13px", border:"1px solid rgba(98,76,58,.12)", borderRadius:"14px", marginBottom:"8px", background:"linear-gradient(160deg,#fffdfb 0%,#faf5ee 100%)" },
    inputTxt:  { fontFamily:P.fontB, fontSize:"13px", color:P.textHint, flex:1 },
    sendBtn:   { width:"28px", height:"28px", borderRadius:"50%", background:`linear-gradient(135deg,${P.accentDark},${P.accent})`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"0 2px 8px rgba(180,72,38,0.28)" },
    askBubble: { background:"linear-gradient(160deg,#f8f3ec 0%,#f2ece3 100%)", borderRadius:"14px", borderBottomLeftRadius:"4px", padding:"12px 14px", marginBottom:"10px", border:"1px solid rgba(98,76,58,.08)", boxShadow:"0 2px 8px rgba(50,35,22,.05)" },
    askA:      { fontFamily:P.fontB, fontSize:"13px", fontWeight:"300", lineHeight:"1.65", color:P.textSub },
    netCard:   { display:"flex", alignItems:"center", gap:"10px", padding:"10px 12px", border:"1px solid rgba(98,76,58,.09)", borderRadius:"14px", marginBottom:"7px", background:"linear-gradient(160deg,#fffdfb 0%,#faf5ee 100%)", boxShadow:"0 2px 8px rgba(50,35,22,.05)" },
    netIcon:   (bg) => ({ width:"34px", height:"34px", borderRadius:"10px", background:bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:"15px" }),
    netLabel:  { fontFamily:P.fontB, fontSize:"13px", fontWeight:"500", color:P.text },
    netDesc:   { fontFamily:P.fontB, fontSize:"11px", fontWeight:"300", color:P.textSub },
    netFee:    { fontFamily:P.fontD, fontSize:"13px", color:P.good, flexShrink:0 },
    free:      { fontFamily:P.fontB, fontSize:"11px", fontWeight:"600", padding:"3px 10px", borderRadius:"99px", background:P.warmBg, color:P.warm },
    when:      { fontFamily:P.fontB, fontSize:"11px", color:P.textHint },
    bowHero:   { background:`linear-gradient(150deg,#111110 0%,${P.ink} 40%,${P.inkAlt} 100%)`, borderRadius:"20px", padding:"22px 18px", marginBottom:"12px", textAlign:"center", boxShadow:"0 12px 32px rgba(10,10,8,0.35), inset 0 1px 0 rgba(255,255,255,.06)" },
    propCard:  { border:"1px solid rgba(98,76,58,.10)", borderRadius:"20px", overflow:"hidden", marginBottom:"9px", boxShadow:"0 8px 22px rgba(74,52,35,.08), inset 0 1px 0 rgba(255,255,255,.65)" },
    propImg:   { height:"110px", background:P.propPlaceholder, display:"flex", alignItems:"center", justifyContent:"center" },
    propPrice: { fontFamily:P.fontD, fontSize:"19px", fontWeight:"500", color:P.warmDark },
    propBody:  { padding:"12px 14px" },
    propAddr:  { fontFamily:P.fontB, fontSize:"14px", fontWeight:"600", color:P.text, marginBottom:"3px" },
    propSub:   { fontFamily:P.fontB, fontSize:"12px", color:P.textSub, marginBottom:"8px" },
    propTags:  { display:"flex", gap:"5px", flexWrap:"wrap", marginBottom:"8px" },
    propTag:   { fontFamily:P.fontB, fontSize:"11px", padding:"3px 9px", borderRadius:"99px", background:"linear-gradient(180deg,#fffdfb,#f5f0e8)", color:P.textSub, border:"1px solid rgba(98,76,58,.09)" },
    matchPct:  { fontFamily:P.fontD, fontSize:"18px", color:P.good, fontWeight:"400" },
    matchBar:  { height:"4px", background:"rgba(88,66,48,0.08)", borderRadius:"2px", marginTop:"4px" },
    matchFill: { height:"4px", background:`linear-gradient(90deg,${P.good},#4a9448)`, borderRadius:"2px", width:"91%" },
    gateCard:  { background:"radial-gradient(140% 120% at 0% 0%, rgba(255,255,255,.72) 0%, rgba(255,255,255,0) 45%), linear-gradient(180deg, #fffdfb 0%, #faf6f1 100%)", borderRadius:"20px", padding:"20px 18px", marginBottom:"12px", border:"1px solid rgba(98,76,58,.11)", boxShadow:"0 8px 22px rgba(74,52,35,.08), inset 0 1px 0 rgba(255,255,255,.65)" },
    gatePrice: { fontFamily:P.fontD, fontSize:"40px", fontWeight:"400", color:P.accent, lineHeight:"1" },
    gateSub:   { fontFamily:P.fontB, fontSize:"12px", color:P.textSub, marginTop:"4px", marginBottom:"16px" },
    gateRow:   { display:"flex", alignItems:"center", gap:"9px", marginBottom:"9px" },
    gateCheck: { width:"18px", height:"18px", borderRadius:"50%", background:P.goodBg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, border:"1px solid rgba(46,95,45,0.18)" },
    gateItem:  { fontFamily:P.fontB, fontSize:"13px", color:P.text, fontWeight:"400" },
    lockBadge: { display:"inline-flex", alignItems:"center", gap:"5px", background:P.warnBg, borderRadius:"99px", padding:"4px 11px", fontFamily:P.fontB, fontSize:"11px", fontWeight:"600", color:P.warn, marginBottom:"12px", border:"1px solid rgba(139,42,42,0.14)" },
    transRow:  { display:"flex", alignItems:"flex-start", gap:"10px", padding:"12px 14px", borderBottom:"1px solid rgba(98,76,58,.07)", background:"inherit" },
    transIcon: { fontSize:"18px", flexShrink:0, marginTop:"1px" },
    transLabel:{ fontFamily:P.fontB, fontSize:"13px", fontWeight:"600", color:P.text, marginBottom:"2px" },
    transDesc: { fontFamily:P.fontB, fontSize:"12px", fontWeight:"300", color:P.textSub, lineHeight:"1.5" },
    transFee:  { fontFamily:P.fontD, fontSize:"13px", color:P.gold, flexShrink:0, marginLeft:"auto", paddingLeft:"8px" },
    warnBox:   { background:P.warnBg, borderRadius:"14px", padding:"11px 13px", display:"flex", alignItems:"flex-start", gap:"10px", marginBottom:"8px", border:`1px solid rgba(139,42,42,0.10)` },
    navBtn:    (visible) => ({ width:"36px", height:"36px", borderRadius:"50%", border:`0.5px solid ${visible?"rgba(98,76,58,.14)":"transparent"}`, background:"transparent", cursor:visible?"pointer":"default", display:"flex", alignItems:"center", justifyContent:"center", opacity:visible?1:0, transition:"opacity 0.2s", flexShrink:0 }),
  };

  const ArrowR = () => (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
      <path d="M2 6h8M6 2l4 4-4 4" stroke={P.accentText} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const Chev = () => (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{flexShrink:0}}>
      <path d="M3 1.5l3.5 3.5L3 8.5" stroke={P.accentText} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const Check = () => (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M2 5l2.5 2.5L8 2.5" stroke={P.good} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // ── SHARED: Freemium Gate ────────────────────────────────────────────────
  const GateScreen = ({ context }) => (
    <div style={{display:"flex",flexDirection:"column",flex:1}}>
      <p className="eyebrow">{context === "homes" ? "Full suburb report" : "Full dealer report"}</p>
      <div style={S.h1}>You've found something worth<br/><span style={S.em}>knowing everything about.</span></div>

      <div style={S.lockBadge}>
        <svg width="10" height="11" viewBox="0 0 10 11" fill="none"><rect x="1" y="5" width="8" height="6" rx="1.5" stroke={P.warn} strokeWidth="1.2"/><path d="M3 5V3.5a2 2 0 1 1 4 0V5" stroke={P.warn} strokeWidth="1.2" strokeLinecap="round"/></svg>
        Free preview limit reached
      </div>

      <div style={S.gateCard}>
        <div style={S.gatePrice}>$49</div>
        <div style={S.gateSub}>One full report · No subscription · No recurring fees</div>
        {[
          context === "homes" ? "Street-by-street suburb breakdown" : "True drive-away price range",
          context === "homes" ? "True auction reserve estimate" : "Dealer margin and negotiation ceiling",
          context === "homes" ? "Comparable recent sales" : "Finance kickback disclosure",
          context === "homes" ? "Nick's specific auction strategy" : "End-of-quarter timing intel",
          "Nick's personal take and recommendation",
        ].map((item, i) => (
          <div key={i} style={S.gateRow}>
            <div style={S.gateCheck}><Check/></div>
            <div style={S.gateItem}>{item}</div>
          </div>
        ))}
      </div>

      <div style={{...S.sub, fontSize:"12px", marginBottom:"8px"}}>
        Peace of mind before a{context === "homes" ? " $1.4M" : "n $80k"} decision. That's what $49 buys.
      </div>

      <div style={S.sp}/>
      <button className="btn btn-gold" onClick={() => go(screen + 1)}>Get the full report — $49</button>
      <button className="btn btn-ghost" onClick={() => go(screen - 1)}>Keep browsing for free</button>
    </div>
  );

  // ── SHARED: How We Work (Transparency) ──────────────────────────────────
  const TransparencyScreen = ({ context }) => (
    <div style={{display:"flex",flexDirection:"column",flex:1}}>
      <p className="eyebrow">How we work</p>
      <div style={S.h1}>Here's exactly how Hometruth<br/><span style={S.em}>makes money.</span></div>
      <div style={{...S.sub, marginBottom:"10px"}}>We think you should know. Most referral businesses bury this. We put it on the front page.</div>

      <div style={S.secLabel}>What we earn</div>
      <div className="report-card">
        {(context === "homes" ? [
          ["💳","$49 per report","You pay directly. No hidden extras.",""],
          ["🏠","Finance broker referral","When you take a loan through our partner","$800–$1,500"],
          ["📋","Conveyancer referral","When you use our recommended conveyancer","$300–$500"],
          ["🔍","Building inspection","When you book through our partner","$150–$250"],
          ["👤","Nick's advocacy fee","Paid directly by you, agreed upfront","On request"],
        ] : [
          ["💳","$49 per report","You pay directly. No hidden extras.",""],
          ["💰","Car finance referral","When you take a loan through our broker","$500–$1,500"],
          ["🛡️","Insurance referral","When you insure through our partner","Trail fee"],
          ["👤","Nick's negotiation fee","Paid directly by you, agreed upfront","On request"],
        ]).map(([icon, label, desc, fee], i) => (
          <div key={i} style={S.transRow}>
            <div style={S.transIcon}>{icon}</div>
            <div style={{flex:1}}>
              <div style={S.transLabel}>{label}</div>
              <div style={S.transDesc}>{desc}</div>
            </div>
            {fee && <div style={S.transFee}>{fee}</div>}
          </div>
        ))}
      </div>

      <div style={{...S.sub, fontSize:"12px", marginBottom:"4px"}}>
        Our partners are chosen because they're genuinely good — not because the fee is highest. You can always ask us to explain any recommendation.
      </div>

      <div style={S.sp}/>
      <button className="btn btn-primary" onClick={() => go(screen + 1)}>Got it — let's keep going <Chev/></button>
    </div>
  );

  // ── HOMES screens ─────────────────────────────────────────────────────────
  const HomesScreen = () => {

    if (screen === 0) return (
      <div>
        <p className="eyebrow">BY PICKLE · MELBOURNE</p>
        <h1 className="hero-title">
          Finding a home shouldn't feel like
          <em>filling out forms.</em>
        </h1>
        <p className="hero-copy">
          Real advice. Real market insight. Someone genuinely in your corner.
        </p>
        <div className="features">
          <div className="card">
            <div className="icon">🏠</div>
            <div>
              <h3>Personalised search</h3>
              <p>Not just bedrooms and price. The vibe, the street, the neighbours.</p>
            </div>
          </div>
          <div className="card highlight">
            <div className="icon">◔</div>
            <div>
              <h3>Suburb truth</h3>
              <p>What agents won't tell you. What Google can't know.</p>
            </div>
          </div>
          <div className="card">
            <div className="icon">👤</div>
            <div>
              <h3>Nick will bring it home</h3>
              <p>Licensed buyer's advocate. No conflicts. Genuinely on your side.</p>
            </div>
          </div>
        </div>
        <button className="cta" onClick={() => go(1)}>See how it works →</button>
        <div className="dots">
          {screens.map((_,i) => <div key={i} onClick={() => go(i)} className={`dot${i===screen?" active":""}`}/>)}
        </div>
      </div>
    );

    if (screen === 1) return (
      <div style={{display:"flex",flexDirection:"column",flex:1}}>
        <p className="eyebrow">Step 1 · Personalise</p>
        <div style={S.h1}>Tell us what <span style={S.em}>home</span> means to you.</div>
        <div style={S.secLabel}>I'm looking to</div>
        <div style={S.pillRow}><span style={S.pill(true)}>Buy</span><span style={S.pill(false)}>Sell</span><span style={S.pill(false)}>Invest</span></div>
        <div style={S.secLabel}>What matters most</div>
        <div style={S.pillRow}><span style={S.pill(true)}>Neighbourhood feel</span><span style={S.pill(true)}>Commute</span><span style={S.pill(false)}>Schools</span><span style={S.pill(true)}>Quiet street</span><span style={S.pill(false)}>Parks</span></div>
        <div style={S.secLabel}>Budget</div>
        <div style={S.pillRow}><span style={S.pill(false)}>Under $800k</span><span style={S.pill(true)}>$800k–$1.5M</span><span style={S.pill(false)}>$1.5M+</span></div>
        <div style={S.sp}/>
        <button className="btn btn-primary" onClick={() => go(2)}>Show me what's out there <Chev/></button>
      </div>
    );

    if (screen === 2) return (
      <div style={{display:"flex",flexDirection:"column",flex:1}}>
        <p className="eyebrow">Suburb snapshot · Fitzroy · Free</p>
        <div style={S.h1}>A taste of what agents don't put <span style={S.em}>in the brochure.</span></div>
        <div className="report-card">
          {[
            ["Median house price",<span style={S.rv}>$1.42M</span>],
            ["Auction reserve gap",<span className="badge badge-warn">Significantly above quote</span>],
            ["Days on market",<span style={S.rv}>18 days avg</span>],
            ["Vibe",<span style={S.rv}>Inner-city creative</span>],
            ["Nick's take",<span className="badge badge-gold">Strong suburb, details matter</span>],
          ].map(([l,v],i) => (
            <div key={i} className="report-row"><span style={S.rl}>{l}</span>{v}</div>
          ))}
        </div>
        <div style={S.warnBox}>
          <div style={{fontFamily:P.fontB, fontSize:"12px", color:P.warn, lineHeight:"1.5"}}>
            🔒 <strong>The full report</strong> includes street-by-street breakdown, true reserve estimate, comparable sales, and Nick's specific auction strategy. <strong>$49 one-off.</strong>
          </div>
        </div>
        <div style={S.sp}/>
        <button className="btn btn-gold" onClick={() => go(4)}>Get the full suburb report — $49</button>
        <button className="btn btn-ghost" onClick={() => go(3)}>Ask Hometruth first</button>
      </div>
    );

    if (screen === 3) return (
      <div style={{display:"flex",flexDirection:"column",flex:1}}>
        <p className="eyebrow">Ask Hometruth · Free</p>
        <div style={S.h1}>Honest answers. <span style={S.em}>Not what you want to hear.</span></div>
        <div style={S.chatName}>You</div>
        <div style={{...S.me,marginBottom:"9px"}}>Is Fitzroy worth $1.4M or am I getting played?</div>
        <div style={S.askBubble}>
          <div style={S.askA}>Depends on the street. <strong style={{fontWeight:500,color:P.text}}>Some are genuinely strong.</strong> But reserve gaps of 12–14% above quote are common right now — agents are quoting low to drive auction competition.<br/><br/>The full report shows you which streets to target and what to actually budget. Without it you're guessing at a $1.4M decision.</div>
        </div>
        <div style={S.inputRow}><span style={S.inputTxt}>Ask anything about Fitzroy...</span><div style={S.sendBtn}><ArrowR/></div></div>
        <div style={S.sp}/>
        <button className="btn btn-gold" onClick={() => go(4)}>Get the full report — $49</button>
      </div>
    );

    if (screen === 4) return <GateScreen context="homes"/>;

    if (screen === 5) return (
      <div style={{display:"flex",flexDirection:"column",flex:1}}>
        <p className="eyebrow">Full report · Fitzroy · Unlocked</p>
        <div style={S.propCard}>
          <div style={S.propImg}>
            <div style={{textAlign:"center"}}><div style={{fontFamily:P.fontB,fontSize:"10px",color:P.textSub,marginBottom:"4px",letterSpacing:"0.08em",textTransform:"uppercase"}}>3 bed · 2 bath · Terrace</div><div style={S.propPrice}>$1.28M – $1.42M</div><div style={{fontFamily:P.fontB,fontSize:"10px",color:P.textSub,marginTop:"2px"}}>True market range · Full analysis</div></div>
          </div>
          <div style={S.propBody}>
            <div style={S.propAddr}>14 Gore Street</div>
            <div style={S.propSub}>Fitzroy VIC 3065 · Quoted at $1.1M</div>
            <div style={S.propTags}>{["Quiet street","Tram 500m","Low flood risk","North-facing"].map(t=><span key={t} style={S.propTag}>{t}</span>)}</div>
            <div style={{display:"flex",alignItems:"baseline",gap:"6px",marginBottom:"3px"}}><span style={S.matchPct}>91%</span><span style={{fontFamily:P.fontB,fontSize:"12px",color:P.textSub}}>lifestyle match</span></div>
            <div style={S.matchBar}><div style={S.matchFill}/></div>
          </div>
        </div>
        <div className="report-card">
          {[
            ["Auction reserve est.",<span className="badge badge-warn">$1.30M–$1.38M</span>],
            ["Comparable sales (90d)",<span style={S.rv}>4 sales, avg $1.31M</span>],
            ["Best bid timing",<span className="badge badge-gold">Late — let others show first</span>],
            ["Nick's strategy",<span className="badge badge-good">Worth pursuing</span>],
          ].map(([l,v],i) => (
            <div key={i} className="report-row"><span style={S.rl}>{l}</span>{v}</div>
          ))}
        </div>
        <div style={S.sp}/>
        <button className="btn btn-primary" onClick={() => go(6)}>Get Nick in your corner <Chev/></button>
      </div>
    );

    if (screen === 6) return (
      <div style={{display:"flex",flexDirection:"column",flex:1}}>
        <p className="eyebrow">Your buyer's advocate</p>
        <div style={S.h1}>No suits. No spin.<br/><span style={S.em}>Just straight talk.</span></div>
        <div style={S.avatarRow}>
          <div style={S.avatar}>N</div>
          <div style={{flex:1}}><div style={S.an}>Nick</div><div style={S.at}>Licensed buyer's advocate · Melb</div></div>
          <span className="badge badge-good">Available</span>
        </div>
        <div style={S.quote}>
          <div style={S.qt}>"I got my licence, looked around at the industry, and thought — this isn't how it should work. So I built something different."</div>
          <div style={S.qa}>Nick · Founder, Hometruth</div>
        </div>
        <div style={S.chatName}>A real conversation</div>
        <div style={{display:"flex",flexDirection:"column"}}>
          <div style={S.them}>That Gore St quote of $1.1M — you need $1.3–1.35M to compete. Here's why it's still worth it.</div>
          <div style={S.me}>No one else told me that.</div>
          <div style={S.them}>That's kind of the whole point.</div>
        </div>
        <div style={S.sp}/>
        <button className="btn btn-primary" onClick={() => go(7)}>How does Hometruth make money? <Chev/></button>
      </div>
    );

    if (screen === 7) return <TransparencyScreen context="homes"/>;

    if (screen === 8) return (
      <div style={{display:"flex",flexDirection:"column",flex:1}}>
        <p className="eyebrow">Ready when you are</p>
        <div style={S.h1}>This is how buying a home <span style={S.em}>should</span> feel.</div>
        <div style={S.sub}>No pressure. No jargon. Honest guidance from someone who actually gives a damn.</div>
        <div className="report-card">
          {[
            ["Browse suburbs freely","free"],
            ["Snapshot data & AI questions","free"],
            ["Full suburb report","$49"],
            ["Nick's buyer advocacy","when"],
          ].map(([label,type],i) => (
            <div key={i} className="report-row">
              <span style={S.rl}>{label}</span>
              {type==="free" ? <span style={S.free}>Free</span> : type==="$49" ? <span className="badge badge-gold">$49</span> : <span style={S.when}>On request</span>}
            </div>
          ))}
        </div>
        <div style={S.sp}/>
        <button className="btn btn-primary" onClick={() => go(0)}>Start over <Chev/></button>
      </div>
    );
  };

  // ── CARS screens ──────────────────────────────────────────────────────────
  const CarsScreen = () => {

    if (screen === 0) return (
      <div>
        <p className="eyebrow">BY PICKLE · MELBOURNE</p>
        <h1 className="hero-title">
          Buying a car shouldn't feel like
          <em>a negotiation you'll lose.</em>
        </h1>
        <p className="hero-copy">
          Dealers are trained negotiators. You're not. Hometruth changes that.
        </p>
        <div className="features">
          <div className="card">
            <div className="icon">🚗</div>
            <div>
              <h3>Dealer truth</h3>
              <p>Real margins, end-of-quarter pressure, finance kickback intel.</p>
            </div>
          </div>
          <div className="card highlight">
            <div className="icon">◔</div>
            <div>
              <h3>Ask Hometruth</h3>
              <p>Is now a good time to buy? What should I actually pay?</p>
            </div>
          </div>
          <div className="card">
            <div className="icon">🎁</div>
            <div>
              <h3>Just show up for the bow</h3>
              <p>Nick handles everything. You pick it up with a gift box on it.</p>
            </div>
          </div>
        </div>
        <button className="cta" onClick={() => go(1)}>See how it works →</button>
        <div className="dots">
          {screens.map((_,i) => <div key={i} onClick={() => go(i)} className={`dot${i===screen?" active":""}`}/>)}
        </div>
      </div>
    );

    if (screen === 1) return (
      <div style={{display:"flex",flexDirection:"column",flex:1}}>
        <p className="eyebrow">Step 1 · What you want</p>
        <div style={S.h1}>Tell us about your next <span style={S.em}>car.</span></div>
        <div style={S.secLabel}>New or used</div>
        <div style={S.pillRow}><span style={S.pill(true)}>New</span><span style={S.pill(false)}>Used</span><span style={S.pill(false)}>Demo</span></div>
        <div style={S.secLabel}>Brand preference</div>
        <div style={S.pillRow}><span style={S.pill(false)}>Audi</span><span style={S.pill(true)}>BMW</span><span style={S.pill(false)}>Mercedes</span><span style={S.pill(false)}>Lexus</span><span style={S.pill(false)}>Other</span></div>
        <div style={S.secLabel}>Budget</div>
        <div style={S.pillRow}><span style={S.pill(false)}>Under $60k</span><span style={S.pill(true)}>$60k–$120k</span><span style={S.pill(false)}>$120k+</span></div>
        <div style={S.secLabel}>Timing</div>
        <div style={S.pillRow}><span style={S.pill(false)}>This month</span><span style={S.pill(true)}>Next 3 months</span><span style={S.pill(false)}>Just exploring</span></div>
        <div style={S.sp}/>
        <button className="btn btn-primary" onClick={() => go(2)}>Show me what dealers won't <Chev/></button>
      </div>
    );

    if (screen === 2) return (
      <div style={{display:"flex",flexDirection:"column",flex:1}}>
        <p className="eyebrow">Dealer snapshot · BMW 3 Series · Free</p>
        <div style={S.h1}>A taste of what the dealer won't <span style={S.em}>tell you upfront.</span></div>
        <div className="report-card">
          {[
            ["Drive-away range",<span style={S.rv}>$89,900–$94,200</span>],
            ["Dealer margin",<span className="badge badge-warn">Significant room to move</span>],
            ["End of quarter",<span className="badge badge-good">March 31 — strong timing</span>],
            ["Finance kickback",<span className="badge badge-warn">Check before you sign</span>],
            ["Nick's take",<span className="badge badge-gold">Demo stock is the sweet spot</span>],
          ].map(([l,v],i) => (
            <div key={i} className="report-row"><span style={S.rl}>{l}</span>{v}</div>
          ))}
        </div>
        <div style={S.warnBox}>
          <div style={{fontFamily:P.fontB, fontSize:"12px", color:P.warn, lineHeight:"1.5"}}>
            🔒 <strong>The full report</strong> shows exact margin figures, negotiation ceiling, end-of-quarter targets and Nick's specific strategy for this dealer. <strong>$49 one-off.</strong>
          </div>
        </div>
        <div style={S.sp}/>
        <button className="btn btn-gold" onClick={() => go(4)}>Get the full dealer report — $49</button>
        <button className="btn btn-ghost" onClick={() => go(3)}>Ask Hometruth first</button>
      </div>
    );

    if (screen === 3) return (
      <div style={{display:"flex",flexDirection:"column",flex:1}}>
        <p className="eyebrow">Ask Hometruth · Free</p>
        <div style={S.h1}>Honest answers. <span style={S.em}>Not what the dealer wants you to hear.</span></div>
        <div style={S.chatName}>You</div>
        <div style={{...S.me,marginBottom:"9px"}}>Is end of quarter really a thing or just a myth?</div>
        <div style={S.askBubble}>
          <div style={S.askA}>It's absolutely real. <strong style={{fontWeight:500,color:P.text}}>Dealers have monthly and quarterly targets</strong> — salespeople's bonuses depend on them. In the last week, a dealer behind target will take deals they'd normally reject.<br/><br/>The full report shows which dealers are under pressure right now and exactly how to use that.</div>
        </div>
        <div style={S.inputRow}><span style={S.inputTxt}>Ask anything about BMW 3 Series...</span><div style={S.sendBtn}><ArrowR/></div></div>
        <div style={S.sp}/>
        <button className="btn btn-gold" onClick={() => go(4)}>Get the full report — $49</button>
      </div>
    );

    if (screen === 4) return <GateScreen context="cars"/>;

    if (screen === 5) return (
      <div style={{display:"flex",flexDirection:"column",flex:1}}>
        <p className="eyebrow">Nick handles everything</p>
        <div style={S.h1}>You just show up for <span style={S.em}>the bow.</span></div>
        <div style={S.bowHero}>
          <div style={{fontSize:"36px",marginBottom:"6px"}}>🎁</div>
          <div style={{fontFamily:P.fontD,fontSize:"16px",color:P.onInk,marginBottom:"4px",fontStyle:"italic"}}>"We handed it to Nick."</div>
          <div style={{fontFamily:P.fontB,fontSize:"12px",color:P.onInkSub,lineHeight:"1.5"}}>"He did all the negotiating and communication with the dealer. We just picked it up with a gift box and a bow on it."</div>
          <div style={{fontFamily:P.fontB,fontSize:"10px",color:P.onInkHint,marginTop:"8px",letterSpacing:"0.06em",textTransform:"uppercase"}}>A real Hometruth family</div>
        </div>
        <div className="report-card">
          {[
            ["Identifies the right car & dealer",<span className="badge badge-good">Done</span>],
            ["Negotiates price & extras",<span className="badge badge-good">Done</span>],
            ["Handles all dealer comms",<span className="badge badge-good">Done</span>],
            ["Arranges finance if needed",<span className="badge badge-good">Done</span>],
            ["You",<span className="badge badge-gold">Just pick it up</span>],
          ].map(([l,v],i) => (
            <div key={i} className="report-row"><span style={S.rl}>{l}</span>{v}</div>
          ))}
        </div>
        <div style={S.sp}/>
        <button className="btn btn-primary" onClick={() => go(6)}>How does Hometruth make money? <Chev/></button>
      </div>
    );

    if (screen === 6) return <TransparencyScreen context="cars"/>;

    if (screen === 7) return (
      <div style={{display:"flex",flexDirection:"column",flex:1}}>
        <p className="eyebrow">Ready when you are</p>
        <div style={S.h1}>Your next car. <span style={S.em}>Handled.</span></div>
        <div style={S.sub}>No awkward dealer conversations. No feeling like you got played. Just the car you wanted, at the right price.</div>
        <div className="report-card">
          {[
            ["Browse car models freely","free"],
            ["Dealer snapshots & AI questions","free"],
            ["Full dealer report","$49"],
            ["Nick's negotiation service","when"],
          ].map(([label,type],i) => (
            <div key={i} className="report-row">
              <span style={S.rl}>{label}</span>
              {type==="free" ? <span style={S.free}>Free</span> : type==="$49" ? <span className="badge badge-gold">$49</span> : <span style={S.when}>On request</span>}
            </div>
          ))}
        </div>
        <div style={S.sp}/>
        <button className="btn btn-primary" onClick={() => go(0)}>Start over <Chev/></button>
      </div>
    );
  };

  return (
    <div style={S.wrap}>
      <div className="phone">
        {/* Animated screen — includes brand, segmented, and screen content */}
        <div
          className="screen"
          style={{opacity:entered?1:0, transform:entered?"translateY(0)":"translateY(6px)", transition:"opacity 0.3s ease, transform 0.3s ease", overflow:"hidden"}}
        >
          <div className="brand">HOMETRUTH</div>
          <div className="segmented">
            <button className={`tab${vertical==="homes"?" active":""}`} onClick={() => switchVertical("homes")}>🏠 Homes</button>
            <button className={`tab${vertical==="cars"?" active":""}`} onClick={() => switchVertical("cars")}>🚗 Cars</button>
          </div>
          {vertical === "homes" ? <HomesScreen/> : <CarsScreen/>}
        </div>

        {/* Bottom nav — hidden on hero (hero has its own dots) */}
        {screen !== 0 && (
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"6px 20px 18px", flexShrink:0}}>
            <button onClick={() => go(screen-1)} style={S.navBtn(screen > 0)}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke={P.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div className="dots" style={{margin:0}}>
              {screens.map((_,i) => <div key={i} onClick={() => go(i)} className={`dot${i===screen?" active":""}`}/>)}
            </div>
            <button onClick={() => go(screen+1)} style={S.navBtn(screen < screens.length - 1)}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke={P.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        )}
      </div>

      <div style={{marginTop:"12px", fontFamily:P.fontB, fontSize:"11px", color:P.textSub, letterSpacing:"0.06em", textTransform:"uppercase"}}>
        {vertical==="homes"?"Homes":"Cars"} · {screens[screen]}
      </div>
    </div>
  );
}
