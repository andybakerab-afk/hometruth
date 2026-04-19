"use client";

import { useState, useEffect } from "react";
import P from "../src/theme.js";

const HOME_SCREENS = ["Hero","Preferences","Suburb Truth","Ask Hometruth","Get the Report","Property Report","Meet Nick","How We Work","Get Started"];
const CAR_SCREENS  = ["Hero","What You Want","Dealer Truth","Ask Hometruth","Get the Report","Nick Handles It","How We Work","Get Started"];

export default function Hometruth() {
  const [vertical, setVertical] = useState("homes");
  const [screen, setScreen] = useState(0);
  const [entered, setEntered] = useState(false);
  const screens = vertical === "homes" ? HOME_SCREENS : CAR_SCREENS;

  useEffect(() => {
    setEntered(false);
    const t = setTimeout(() => setEntered(true), 60);
    return () => clearTimeout(t);
  }, [screen, vertical]);

  const go = (n) => setScreen(Math.max(0, Math.min(n, screens.length - 1)));
  const switchVertical = (v) => { setVertical(v); setScreen(0); };

  const S = {
    wrap:      { minHeight:"100vh", background:P.bg, display:"flex", flexDirection:"column", alignItems:"center", padding:"24px 16px 32px", fontFamily:P.fontB },
    phone:     { width:"360px", minHeight:"680px", background:P.surface, borderRadius:"36px", border:`0.5px solid ${P.borderStrong}`, overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:P.phoneShadow },
    statusBar: { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 22px 6px", flexShrink:0 },
    time:      { fontSize:"12px", fontWeight:"500", color:P.textHint },
    wordmark:  { fontFamily:P.fontD, fontSize:"18px", fontWeight:"400", letterSpacing:"0.1em", textTransform:"uppercase", color:P.accent },
    dots:      { display:"flex", gap:"3px" },
    dot:       { width:"5px", height:"5px", borderRadius:"50%", background:P.textHint, opacity:0.5 },
    vtoggle:   { display:"flex", margin:"8px 22px 10px", borderRadius:"10px", overflow:"hidden", border:`0.5px solid ${P.border}`, flexShrink:0 },
    vtab:      (on) => ({ flex:1, fontFamily:P.fontB, fontSize:"12px", fontWeight:"500", padding:"8px 0", textAlign:"center", border:"none", cursor:"pointer", background:on?P.accent:"transparent", color:on?P.accentText:P.textSub, transition:"all 0.2s" }),
    body:      { padding:"12px 22px 14px", flex:1, display:"flex", flexDirection:"column", opacity:entered?1:0, transform:entered?"translateY(0)":"translateY(6px)", transition:"opacity 0.3s ease, transform 0.3s ease", overflow:"hidden" },
    tag:       { fontFamily:P.fontB, fontSize:"11px", fontWeight:"500", letterSpacing:"0.12em", textTransform:"uppercase", color:P.textSub, marginBottom:"10px" },
    h1:        { fontFamily:P.fontD, fontSize:"25px", fontWeight:"400", lineHeight:"1.35", color:P.text, marginBottom:"10px" },
    em:        { fontStyle:"italic", color:P.textSub },
    sub:       { fontFamily:P.fontB, fontSize:"13px", fontWeight:"300", lineHeight:"1.6", color:P.textSub, marginBottom:"12px" },
    sp:        { flex:1 },
    btn:       { fontFamily:P.fontB, fontSize:"14px", fontWeight:"500", padding:"13px 20px", borderRadius:"14px", border:"none", background:`linear-gradient(135deg, ${P.accent} 0%, ${P.accentDark} 100%)`, color:P.accentText, cursor:"pointer", width:"100%", marginTop:"8px", boxShadow:P.shadow, display:"flex", alignItems:"center", justifyContent:"center", gap:"6px" },
    btnGold:   { fontFamily:P.fontB, fontSize:"14px", fontWeight:"500", padding:"13px 20px", borderRadius:"14px", border:"none", background:P.gold, color:P.accentText, cursor:"pointer", width:"100%", marginTop:"8px", boxShadow:P.goldShadow },
    btnG:      { fontFamily:P.fontB, fontSize:"13px", fontWeight:"400", padding:"11px 20px", borderRadius:"14px", border:`0.5px solid ${P.border}`, background:"transparent", color:P.textSub, cursor:"pointer", width:"100%", marginTop:"6px" },
    card:      { background:P.surfaceAlt, borderRadius:"12px", padding:"11px 13px", display:"flex", alignItems:"flex-start", gap:"10px", marginBottom:"7px" },
    icon:      { width:"28px", height:"28px", borderRadius:"7px", background:P.surface, border:`0.5px solid ${P.border}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 },
    cl:        { fontFamily:P.fontB, fontSize:"13px", fontWeight:"500", color:P.text },
    cd:        { fontFamily:P.fontB, fontSize:"12px", fontWeight:"300", color:P.textSub, lineHeight:"1.4" },
    secLabel:  { fontFamily:P.fontB, fontSize:"10px", fontWeight:"500", letterSpacing:"0.1em", textTransform:"uppercase", color:P.textSub, marginBottom:"7px" },
    pillRow:   { display:"flex", gap:"6px", flexWrap:"wrap", marginBottom:"12px" },
    pill:      (on) => ({ fontFamily:P.fontB, fontSize:"12px", padding:"5px 12px", borderRadius:"99px", border:`0.5px solid ${on?P.accent:P.border}`, background:on?P.accent:"transparent", color:on?P.accentText:P.textSub, cursor:"pointer" }),
    strip:     { borderRadius:"12px", border:`0.5px solid ${P.border}`, overflow:"hidden", marginBottom:"10px" },
    row:       (last) => ({ padding:"10px 13px", borderBottom:last?"none":`0.5px solid ${P.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }),
    rl:        { fontFamily:P.fontB, fontSize:"13px", color:P.text },
    rv:        { fontFamily:P.fontB, fontSize:"12px", fontWeight:"500", color:P.textSub },
    badge:     (t) => ({ fontFamily:P.fontB, fontSize:"10px", fontWeight:"500", padding:"3px 9px", borderRadius:"99px", background:t==="warn"?P.warnBg:t==="good"?P.goodBg:t==="warm"?P.warmBg:t==="gold"?P.goldBg:P.surfaceAlt, color:t==="warn"?P.warn:t==="good"?P.good:t==="warm"?P.warm:t==="gold"?P.goldText:P.textSub }),
    avatarRow: { display:"flex", alignItems:"center", gap:"12px", marginBottom:"12px", padding:"11px 13px", background:P.surfaceAlt, borderRadius:"12px" },
    avatar:    { width:"44px", height:"44px", borderRadius:"50%", background:P.accentSoft, border:`0.5px solid ${P.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:P.fontD, fontSize:"17px", color:P.accent, flexShrink:0 },
    an:        { fontFamily:P.fontD, fontSize:"15px", color:P.text },
    at:        { fontFamily:P.fontB, fontSize:"12px", fontWeight:"300", color:P.textSub },
    quote:     { marginBottom:"12px", padding:"12px 13px 12px 15px", borderLeft:`2px solid ${P.accent}` },
    qt:        { fontFamily:P.fontD, fontSize:"14px", fontStyle:"italic", lineHeight:"1.55", color:P.text, marginBottom:"5px" },
    qa:        { fontFamily:P.fontB, fontSize:"10px", color:P.textHint, letterSpacing:"0.06em", textTransform:"uppercase" },
    chatName:  { fontFamily:P.fontB, fontSize:"10px", fontWeight:"500", letterSpacing:"0.07em", textTransform:"uppercase", color:P.textHint, marginBottom:"4px" },
    them:      { background:P.surfaceAlt, color:P.text, borderRadius:"12px", borderBottomLeftRadius:"4px", padding:"9px 12px", fontFamily:P.fontB, fontSize:"13px", lineHeight:"1.5", maxWidth:"85%", marginBottom:"7px", alignSelf:"flex-start" },
    me:        { background:P.accent, color:P.accentText, borderRadius:"12px", borderBottomRightRadius:"4px", padding:"9px 12px", fontFamily:P.fontB, fontSize:"13px", lineHeight:"1.5", maxWidth:"85%", marginBottom:"7px", alignSelf:"flex-end" },
    inputRow:  { display:"flex", gap:"8px", alignItems:"center", padding:"9px 13px", border:`0.5px solid ${P.border}`, borderRadius:"12px", marginBottom:"8px" },
    inputTxt:  { fontFamily:P.fontB, fontSize:"13px", color:P.textHint, flex:1 },
    sendBtn:   { width:"26px", height:"26px", borderRadius:"50%", background:P.accent, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 },
    askBubble: { background:P.surfaceAlt, borderRadius:"12px", borderBottomLeftRadius:"4px", padding:"11px 13px", marginBottom:"10px" },
    askA:      { fontFamily:P.fontB, fontSize:"13px", fontWeight:"300", lineHeight:"1.6", color:P.textSub },
    netCard:   { display:"flex", alignItems:"center", gap:"10px", padding:"9px 11px", border:`0.5px solid ${P.border}`, borderRadius:"11px", marginBottom:"7px" },
    netIcon:   (bg) => ({ width:"34px", height:"34px", borderRadius:"8px", background:bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:"15px" }),
    netLabel:  { fontFamily:P.fontB, fontSize:"13px", fontWeight:"500", color:P.text },
    netDesc:   { fontFamily:P.fontB, fontSize:"11px", fontWeight:"300", color:P.textSub },
    netFee:    { fontFamily:P.fontD, fontSize:"13px", color:P.good, flexShrink:0 },
    free:      { fontFamily:P.fontB, fontSize:"11px", fontWeight:"500", padding:"3px 9px", borderRadius:"99px", background:P.warmBg, color:P.warm },
    when:      { fontFamily:P.fontB, fontSize:"11px", color:P.textHint },
    bowHero:   { background:`linear-gradient(145deg, ${P.ink} 0%, ${P.inkAlt} 100%)`, borderRadius:"12px", padding:"20px 16px", marginBottom:"12px", textAlign:"center" },
    propCard:  { border:`0.5px solid ${P.border}`, borderRadius:"12px", overflow:"hidden", marginBottom:"9px" },
    propImg:   { height:"110px", background:P.propPlaceholder, display:"flex", alignItems:"center", justifyContent:"center" },
    propPrice: { fontFamily:P.fontD, fontSize:"19px", fontWeight:"500", color:P.warmDark },
    propBody:  { padding:"11px 13px" },
    propAddr:  { fontFamily:P.fontB, fontSize:"14px", fontWeight:"500", color:P.text, marginBottom:"3px" },
    propSub:   { fontFamily:P.fontB, fontSize:"12px", color:P.textSub, marginBottom:"8px" },
    propTags:  { display:"flex", gap:"5px", flexWrap:"wrap", marginBottom:"8px" },
    propTag:   { fontFamily:P.fontB, fontSize:"11px", padding:"3px 9px", borderRadius:"99px", background:P.surfaceAlt, color:P.textSub },
    matchPct:  { fontFamily:P.fontD, fontSize:"17px", color:P.good, fontWeight:"400" },
    matchBar:  { height:"4px", background:P.surfaceAlt, borderRadius:"2px", marginTop:"3px" },
    matchFill: { height:"4px", background:P.good, borderRadius:"2px", width:"91%" },
    // Gate specific
    gateCard:  { background:P.surfaceAlt, borderRadius:"16px", padding:"20px 18px", marginBottom:"12px", border:`0.5px solid ${P.border}` },
    gatePrice: { fontFamily:P.fontD, fontSize:"38px", fontWeight:"400", color:P.accent, lineHeight:"1" },
    gateSub:   { fontFamily:P.fontB, fontSize:"12px", color:P.textSub, marginTop:"4px", marginBottom:"16px" },
    gateRow:   { display:"flex", alignItems:"center", gap:"8px", marginBottom:"8px" },
    gateCheck: { width:"18px", height:"18px", borderRadius:"50%", background:P.goodBg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 },
    gateItem:  { fontFamily:P.fontB, fontSize:"13px", color:P.text },
    lockBadge: { display:"inline-flex", alignItems:"center", gap:"5px", background:P.warnBg, borderRadius:"99px", padding:"4px 10px", fontFamily:P.fontB, fontSize:"11px", fontWeight:"500", color:P.warn, marginBottom:"12px" },
    transRow:  { display:"flex", alignItems:"flex-start", gap:"10px", padding:"10px 0", borderBottom:`0.5px solid ${P.border}` },
    transIcon: { fontSize:"18px", flexShrink:0, marginTop:"1px" },
    transLabel:{ fontFamily:P.fontB, fontSize:"13px", fontWeight:"500", color:P.text, marginBottom:"2px" },
    transDesc: { fontFamily:P.fontB, fontSize:"12px", fontWeight:"300", color:P.textSub, lineHeight:"1.45" },
    transFee:  { fontFamily:P.fontD, fontSize:"13px", color:P.gold, flexShrink:0, marginLeft:"auto", paddingLeft:"8px" },
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
      <div style={S.tag}>{context === "homes" ? "Full suburb report" : "Full dealer report"}</div>
      <div style={S.h1}>You've found<br/>something worth<br/><span style={S.em}>knowing everything about.</span></div>

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
      <button style={S.btnGold} onClick={() => go(screen + 1)}>Get the full report — $49</button>
      <button style={S.btnG} onClick={() => go(screen - 1)}>Keep browsing for free</button>
    </div>
  );

  // ── SHARED: How We Work (Transparency) ──────────────────────────────────
  const TransparencyScreen = ({ context }) => (
    <div style={{display:"flex",flexDirection:"column",flex:1}}>
      <div style={S.tag}>How we work</div>
      <div style={S.h1}>Here's exactly<br/>how Hometruth<br/><span style={S.em}>makes money.</span></div>
      <div style={{...S.sub, marginBottom:"10px"}}>We think you should know. Most referral businesses bury this. We put it on the front page.</div>

      <div style={S.secLabel}>What we earn</div>
      <div style={{borderRadius:"12px", border:`0.5px solid ${P.border}`, overflow:"hidden", marginBottom:"12px"}}>
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
        ]).map(([icon, label, desc, fee], i, arr) => (
          <div key={i} style={{...S.transRow, padding:"10px 13px", borderBottom: i < arr.length - 1 ? `0.5px solid ${P.border}` : "none"}}>
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
      <button style={S.btn} onClick={() => go(screen + 1)}>Got it — let's keep going <Chev/></button>
    </div>
  );

  // ── HOMES screens ─────────────────────────────────────────────────────────
  const HomesScreen = () => {
    // screen indices: 0 Hero, 1 Prefs, 2 SuburbTruth, 3 AskHT, 4 Gate, 5 Report, 6 MeetNick, 7 HowWeWork, 8 GetStarted

    if (screen === 0) return (
      <div style={{display:"flex",flexDirection:"column",flex:1}}>
        <div style={S.tag}>by Pickle · Melbourne</div>
        <div style={S.h1}>Finding a home<br/>shouldn't feel like<br/><span style={S.em}>filling out forms.</span></div>
        <div style={S.sub}>Real advice. Real market insight. Someone genuinely in your corner.</div>
        <div style={S.card}><div style={S.icon}><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 2L2 6v8h4v-4h4v4h4V6L8 2z" stroke={P.textSub} strokeWidth="1" strokeLinejoin="round"/></svg></div><div><div style={S.cl}>Personalised search</div><div style={S.cd}>Not just bedrooms and price. The vibe, the street, the neighbours.</div></div></div>
        <div style={{...S.card, background:P.sageBg, borderLeft:`3px solid ${P.sage}`}}><div style={S.icon}><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke={P.sage} strokeWidth="1"/><path d="M8 5v3l2 2" stroke={P.sage} strokeWidth="1" strokeLinecap="round"/></svg></div><div><div style={{...S.cl, color:P.sage}}>Suburb truth</div><div style={S.cd}>What agents won't tell you. What Google can't know.</div></div></div>
        <div style={S.card}><div style={S.icon}><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" stroke={P.textSub} strokeWidth="1"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke={P.textSub} strokeWidth="1" strokeLinecap="round"/></svg></div><div><div style={S.cl}>Nick will bring it home</div><div style={S.cd}>Licensed buyer's advocate. No conflicts. Genuinely on your side.</div></div></div>
        <div style={S.sp}/>
        <button style={S.btn} onClick={() => go(1)}>See how it works <Chev/></button>
      </div>
    );

    if (screen === 1) return (
      <div style={{display:"flex",flexDirection:"column",flex:1}}>
        <div style={S.tag}>Step 1 · Personalise</div>
        <div style={S.h1}>Tell us what<br/><span style={S.em}>home</span> means<br/>to you.</div>
        <div style={S.secLabel}>I'm looking to</div>
        <div style={S.pillRow}><span style={S.pill(true)}>Buy</span><span style={S.pill(false)}>Sell</span><span style={S.pill(false)}>Invest</span></div>
        <div style={S.secLabel}>What matters most</div>
        <div style={S.pillRow}><span style={S.pill(true)}>Neighbourhood feel</span><span style={S.pill(true)}>Commute</span><span style={S.pill(false)}>Schools</span><span style={S.pill(true)}>Quiet street</span><span style={S.pill(false)}>Parks</span></div>
        <div style={S.secLabel}>Budget</div>
        <div style={S.pillRow}><span style={S.pill(false)}>Under $800k</span><span style={S.pill(true)}>$800k–$1.5M</span><span style={S.pill(false)}>$1.5M+</span></div>
        <div style={S.sp}/>
        <button style={S.btn} onClick={() => go(2)}>Show me what's out there <Chev/></button>
      </div>
    );

    if (screen === 2) return (
      <div style={{display:"flex",flexDirection:"column",flex:1}}>
        <div style={S.tag}>Suburb snapshot · Fitzroy · Free</div>
        <div style={S.h1}>A taste of what<br/>agents don't put<br/><span style={S.em}>in the brochure.</span></div>
        <div style={S.strip}>
          {[["Median house price",<span style={S.rv}>$1.42M</span>],["Auction reserve gap",<span style={S.badge("warn")}>Significantly above quote</span>],["Days on market",<span style={S.rv}>18 days avg</span>],["Vibe",<span style={S.rv}>Inner-city creative</span>],["Nick's take",<span style={S.badge("gold")}>Strong suburb, details matter</span>]].map(([l,v],i,a) => (
            <div key={i} style={S.row(i===a.length-1)}><span style={S.rl}>{l}</span>{v}</div>
          ))}
        </div>
        <div style={{...S.card, background:P.warnBg, border:`0.5px solid ${P.warnBg}`}}>
          <div style={{fontFamily:P.fontB, fontSize:"12px", color:P.warn, lineHeight:"1.5"}}>
            🔒 <strong>The full report</strong> includes street-by-street breakdown, true reserve estimate, comparable sales, and Nick's specific auction strategy. <strong>$49 one-off.</strong>
          </div>
        </div>
        <div style={S.sp}/>
        <button style={S.btnGold} onClick={() => go(4)}>Get the full suburb report — $49</button>
        <button style={S.btnG} onClick={() => go(3)}>Ask Hometruth first</button>
      </div>
    );

    if (screen === 3) return (
      <div style={{display:"flex",flexDirection:"column",flex:1}}>
        <div style={S.tag}>Ask Hometruth · Free</div>
        <div style={S.h1}>Honest answers.<br/><span style={S.em}>Not what you<br/>want to hear.</span></div>
        <div style={S.chatName}>You</div>
        <div style={{...S.me,marginBottom:"9px"}}>Is Fitzroy worth $1.4M or am I getting played?</div>
        <div style={S.askBubble}>
          <div style={S.askA}>Depends on the street. <strong style={{fontWeight:500,color:P.text}}>Some are genuinely strong.</strong> But reserve gaps of 12–14% above quote are common right now — agents are quoting low to drive auction competition.<br/><br/>The full report shows you which streets to target and what to actually budget. Without it you're guessing at a $1.4M decision.</div>
        </div>
        <div style={S.inputRow}><span style={S.inputTxt}>Ask anything about Fitzroy...</span><div style={S.sendBtn}><ArrowR/></div></div>
        <div style={S.sp}/>
        <button style={S.btnGold} onClick={() => go(4)}>Get the full report — $49</button>
      </div>
    );

    if (screen === 4) return <GateScreen context="homes"/>;

    if (screen === 5) return (
      <div style={{display:"flex",flexDirection:"column",flex:1}}>
        <div style={S.tag}>Full report · Fitzroy · Unlocked</div>
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
        <div style={S.strip}>
          {[["Auction reserve est.",<span style={S.badge("warn")}>$1.30M–$1.38M</span>],["Comparable sales (90d)",<span style={S.rv}>4 sales, avg $1.31M</span>],["Best bid timing",<span style={S.badge("gold")}>Late — let others show first</span>],["Nick's strategy",<span style={S.badge("good")}>Worth pursuing</span>]].map(([l,v],i,a) => (
            <div key={i} style={S.row(i===a.length-1)}><span style={S.rl}>{l}</span>{v}</div>
          ))}
        </div>
        <div style={S.sp}/>
        <button style={S.btn} onClick={() => go(6)}>Get Nick in your corner <Chev/></button>
      </div>
    );

    if (screen === 6) return (
      <div style={{display:"flex",flexDirection:"column",flex:1}}>
        <div style={S.tag}>Your buyer's advocate</div>
        <div style={S.h1}>No suits.<br/>No spin.<br/><span style={S.em}>Just straight talk.</span></div>
        <div style={S.avatarRow}>
          <div style={S.avatar}>N</div>
          <div style={{flex:1}}><div style={S.an}>Nick</div><div style={S.at}>Licensed buyer's advocate · Melb</div></div>
          <span style={S.badge("good")}>Available</span>
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
        <button style={S.btn} onClick={() => go(7)}>How does Hometruth make money? <Chev/></button>
      </div>
    );

    if (screen === 7) return <TransparencyScreen context="homes"/>;

    if (screen === 8) return (
      <div style={{display:"flex",flexDirection:"column",flex:1}}>
        <div style={S.tag}>Ready when you are</div>
        <div style={S.h1}>This is how buying<br/>a home <span style={S.em}>should</span><br/>feel.</div>
        <div style={S.sub}>No pressure. No jargon. Honest guidance from someone who actually gives a damn.</div>
        <div style={S.strip}>
          {[["Browse suburbs freely","free"],["Snapshot data & AI questions","free"],["Full suburb report","$49"],["Nick's buyer advocacy","when"]].map(([label,type],i,a) => (
            <div key={i} style={S.row(i===a.length-1)}>
              <span style={S.rl}>{label}</span>
              {type==="free"?<span style={S.free}>Free</span>:type==="$49"?<span style={{...S.badge("gold")}}>$49</span>:<span style={S.when}>On request</span>}
            </div>
          ))}
        </div>
        <div style={S.sp}/>
        <button style={S.btn} onClick={() => go(0)}>Start over <Chev/></button>
      </div>
    );
  };

  // ── CARS screens ──────────────────────────────────────────────────────────
  const CarsScreen = () => {
    // screen indices: 0 Hero, 1 WhatYouWant, 2 DealerTruth, 3 AskHT, 4 Gate, 5 NickHandlesIt, 6 HowWeWork, 7 GetStarted

    if (screen === 0) return (
      <div style={{display:"flex",flexDirection:"column",flex:1}}>
        <div style={S.tag}>by Pickle · Melbourne</div>
        <div style={S.h1}>Buying a car<br/>shouldn't feel like<br/><span style={S.em}>a negotiation you'll lose.</span></div>
        <div style={S.sub}>Dealers are trained negotiators. You're not. Hometruth changes that.</div>
        <div style={S.card}><div style={S.icon}><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 11h12M3 11l1-4h8l1 4M5 11v2M11 11v2M6 7h4" stroke={P.textSub} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg></div><div><div style={S.cl}>Dealer truth</div><div style={S.cd}>Real margins, end-of-quarter pressure, finance kickback intel.</div></div></div>
        <div style={S.card}><div style={S.icon}><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke={P.textSub} strokeWidth="1"/><path d="M8 5v3l2 2" stroke={P.textSub} strokeWidth="1" strokeLinecap="round"/></svg></div><div><div style={S.cl}>Ask Hometruth</div><div style={S.cd}>Is now a good time to buy? What should I actually pay?</div></div></div>
        <div style={S.card}><div style={S.icon}><span style={{fontSize:"13px"}}>🎁</span></div><div><div style={S.cl}>Just show up for the bow</div><div style={S.cd}>Nick handles everything. You pick it up with a gift box on it.</div></div></div>
        <div style={S.sp}/>
        <button style={S.btn} onClick={() => go(1)}>See how it works <Chev/></button>
      </div>
    );

    if (screen === 1) return (
      <div style={{display:"flex",flexDirection:"column",flex:1}}>
        <div style={S.tag}>Step 1 · What you want</div>
        <div style={S.h1}>Tell us about<br/>your next<br/><span style={S.em}>car.</span></div>
        <div style={S.secLabel}>New or used</div>
        <div style={S.pillRow}><span style={S.pill(true)}>New</span><span style={S.pill(false)}>Used</span><span style={S.pill(false)}>Demo</span></div>
        <div style={S.secLabel}>Brand preference</div>
        <div style={S.pillRow}><span style={S.pill(false)}>Audi</span><span style={S.pill(true)}>BMW</span><span style={S.pill(false)}>Mercedes</span><span style={S.pill(false)}>Lexus</span><span style={S.pill(false)}>Other</span></div>
        <div style={S.secLabel}>Budget</div>
        <div style={S.pillRow}><span style={S.pill(false)}>Under $60k</span><span style={S.pill(true)}>$60k–$120k</span><span style={S.pill(false)}>$120k+</span></div>
        <div style={S.secLabel}>Timing</div>
        <div style={S.pillRow}><span style={S.pill(false)}>This month</span><span style={S.pill(true)}>Next 3 months</span><span style={S.pill(false)}>Just exploring</span></div>
        <div style={S.sp}/>
        <button style={S.btn} onClick={() => go(2)}>Show me what dealers won't <Chev/></button>
      </div>
    );

    if (screen === 2) return (
      <div style={{display:"flex",flexDirection:"column",flex:1}}>
        <div style={S.tag}>Dealer snapshot · BMW 3 Series · Free</div>
        <div style={S.h1}>A taste of what<br/>the dealer won't<br/><span style={S.em}>tell you upfront.</span></div>
        <div style={S.strip}>
          {[["Drive-away range",<span style={S.rv}>$89,900–$94,200</span>],["Dealer margin",<span style={S.badge("warn")}>Significant room to move</span>],["End of quarter",<span style={S.badge("good")}>March 31 — strong timing</span>],["Finance kickback",<span style={S.badge("warn")}>Check before you sign</span>],["Nick's take",<span style={S.badge("gold")}>Demo stock is the sweet spot</span>]].map(([l,v],i,a) => (
            <div key={i} style={S.row(i===a.length-1)}><span style={S.rl}>{l}</span>{v}</div>
          ))}
        </div>
        <div style={{...S.card, background:P.warnBg, border:`0.5px solid ${P.warnBg}`}}>
          <div style={{fontFamily:P.fontB, fontSize:"12px", color:P.warn, lineHeight:"1.5"}}>
            🔒 <strong>The full report</strong> shows exact margin figures, negotiation ceiling, end-of-quarter targets and Nick's specific strategy for this dealer. <strong>$49 one-off.</strong>
          </div>
        </div>
        <div style={S.sp}/>
        <button style={S.btnGold} onClick={() => go(4)}>Get the full dealer report — $49</button>
        <button style={S.btnG} onClick={() => go(3)}>Ask Hometruth first</button>
      </div>
    );

    if (screen === 3) return (
      <div style={{display:"flex",flexDirection:"column",flex:1}}>
        <div style={S.tag}>Ask Hometruth · Free</div>
        <div style={S.h1}>Honest answers.<br/><span style={S.em}>Not what the<br/>dealer wants you to hear.</span></div>
        <div style={S.chatName}>You</div>
        <div style={{...S.me,marginBottom:"9px"}}>Is end of quarter really a thing or just a myth?</div>
        <div style={S.askBubble}>
          <div style={S.askA}>It's absolutely real. <strong style={{fontWeight:500,color:P.text}}>Dealers have monthly and quarterly targets</strong> — salespeople's bonuses depend on them. In the last week, a dealer behind target will take deals they'd normally reject.<br/><br/>The full report shows which dealers are under pressure right now and exactly how to use that.</div>
        </div>
        <div style={S.inputRow}><span style={S.inputTxt}>Ask anything about BMW 3 Series...</span><div style={S.sendBtn}><ArrowR/></div></div>
        <div style={S.sp}/>
        <button style={S.btnGold} onClick={() => go(4)}>Get the full report — $49</button>
      </div>
    );

    if (screen === 4) return <GateScreen context="cars"/>;

    if (screen === 5) return (
      <div style={{display:"flex",flexDirection:"column",flex:1}}>
        <div style={S.tag}>Nick handles everything</div>
        <div style={S.h1}>You just show<br/>up for<br/><span style={S.em}>the bow.</span></div>
        <div style={S.bowHero}>
          <div style={{fontSize:"36px",marginBottom:"6px"}}>🎁</div>
          <div style={{fontFamily:P.fontD,fontSize:"16px",color:P.onInk,marginBottom:"4px",fontStyle:"italic"}}>"We handed it to Nick."</div>
          <div style={{fontFamily:P.fontB,fontSize:"12px",color:P.onInkSub,lineHeight:"1.5"}}>"He did all the negotiating and communication with the dealer. We just picked it up with a gift box and a bow on it."</div>
          <div style={{fontFamily:P.fontB,fontSize:"10px",color:P.onInkHint,marginTop:"8px",letterSpacing:"0.06em",textTransform:"uppercase"}}>A real Hometruth family</div>
        </div>
        <div style={S.strip}>
          {[["Identifies the right car & dealer",<span style={S.badge("good")}>Done</span>],["Negotiates price & extras",<span style={S.badge("good")}>Done</span>],["Handles all dealer comms",<span style={S.badge("good")}>Done</span>],["Arranges finance if needed",<span style={S.badge("good")}>Done</span>],["You",<span style={S.badge("gold")}>Just pick it up</span>]].map(([l,v],i,a) => (
            <div key={i} style={S.row(i===a.length-1)}><span style={S.rl}>{l}</span>{v}</div>
          ))}
        </div>
        <div style={S.sp}/>
        <button style={S.btn} onClick={() => go(6)}>How does Hometruth make money? <Chev/></button>
      </div>
    );

    if (screen === 6) return <TransparencyScreen context="cars"/>;

    if (screen === 7) return (
      <div style={{display:"flex",flexDirection:"column",flex:1}}>
        <div style={S.tag}>Ready when you are</div>
        <div style={S.h1}>Your next car.<br/><span style={S.em}>Handled.</span></div>
        <div style={S.sub}>No awkward dealer conversations. No feeling like you got played. Just the car you wanted, at the right price.</div>
        <div style={S.strip}>
          {[["Browse car models freely","free"],["Dealer snapshots & AI questions","free"],["Full dealer report","$49"],["Nick's negotiation service","when"]].map(([label,type],i,a) => (
            <div key={i} style={S.row(i===a.length-1)}>
              <span style={S.rl}>{label}</span>
              {type==="free"?<span style={S.free}>Free</span>:type==="$49"?<span style={S.badge("gold")}>$49</span>:<span style={S.when}>On request</span>}
            </div>
          ))}
        </div>
        <div style={S.sp}/>
        <button style={S.btn} onClick={() => go(0)}>Start over <Chev/></button>
      </div>
    );
  };

  return (
    <div style={S.wrap}>
      <div style={S.phone}>
        <div style={S.statusBar}>
          <span style={S.time}>9:41</span>
          <span style={S.wordmark}>Hometruth</span>
          <div style={S.dots}><div style={S.dot}/><div style={S.dot}/><div style={S.dot}/></div>
        </div>
        <div style={{...S.vtoggle}}>
          <button style={S.vtab(vertical==="homes")} onClick={() => switchVertical("homes")}>🏠 Homes</button>
          <button style={S.vtab(vertical==="cars")} onClick={() => switchVertical("cars")}>🚗 Cars</button>
        </div>
        <div style={S.body}>
          {vertical === "homes" ? <HomesScreen/> : <CarsScreen/>}
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 20px 14px",flexShrink:0}}>
          <button onClick={() => go(screen-1)} disabled={screen===0} style={{width:"36px",height:"36px",borderRadius:"50%",border:`0.5px solid ${screen===0?"transparent":P.border}`,background:"transparent",cursor:screen===0?"default":"pointer",display:"flex",alignItems:"center",justifyContent:"center",opacity:screen===0?0:1,transition:"opacity 0.2s"}}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke={P.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div style={{display:"flex",gap:"5px",alignItems:"center"}}>
            {screens.map((_,i) => <div key={i} onClick={() => go(i)} style={{width:i===screen?"18px":"6px",height:"6px",borderRadius:i===screen?"3px":"50%",background:i===screen?P.nav:P.border,cursor:"pointer",transition:"all 0.25s ease"}}/>)}
          </div>
          <button onClick={() => go(screen+1)} disabled={screen===screens.length-1} style={{width:"36px",height:"36px",borderRadius:"50%",border:`0.5px solid ${screen===screens.length-1?"transparent":P.border}`,background:"transparent",cursor:screen===screens.length-1?"default":"pointer",display:"flex",alignItems:"center",justifyContent:"center",opacity:screen===screens.length-1?0:1,transition:"opacity 0.2s"}}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke={P.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
      <div style={{marginTop:"12px",fontFamily:P.fontB,fontSize:"11px",color:P.textSub,letterSpacing:"0.06em",textTransform:"uppercase"}}>
        {vertical==="homes"?"Homes":"Cars"} · {screens[screen]}
      </div>
    </div>
  );
}
