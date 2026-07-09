// screen-visualise.jsx — CCRF Illustration: potential savings

// ── Fixed scenario constants ─────────────────────────────────────
const VIZ_DUE       = 500000;
const CARD_RATE_PCT = 54;
const MELT_RATE_PCT = 25;

// ── Amortisation builder ─────────────────────────────────────────
function buildAmort(B, P, rAnnual) {
  const r = rAnnual / 12 / 100;
  const balArr = [Math.round(B)];
  const intArr = [0];
  let bal = B, cumInt = 0;
  while (bal > 0.5 && balArr.length < 300) {
    const interest = bal * r;
    const principal = Math.min(P - interest, bal);
    if (principal <= 0) { balArr.push(Math.round(bal)); intArr.push(Math.round(cumInt)); break; }
    cumInt += interest;
    bal -= principal;
    balArr.push(Math.round(Math.max(0, bal)));
    intArr.push(Math.round(cumInt));
  }
  return { balArr, intArr, months: balArr.length - 1, totalInt: Math.round(cumInt) };
}

// ── Helpers ──────────────────────────────────────────────────────
function fmtShort(v) {
  if (v <= 0) return '₹0';
  if (v >= 100000) {
    const l = v / 100000;
    return '₹' + (l % 1 === 0 ? l.toFixed(0) : l.toFixed(1)) + 'L';
  }
  return '₹' + Math.round(v / 1000) + 'K';
}
function fmtIN(v) {
  if (v <= 0) return '₹0';
  return '₹' + Number(v).toLocaleString('en-IN');
}

// ── Chart layout constants ────────────────────────────────────────
const CW = 308, CH = 168, CPL = 44, CPR = 8, CPT = 10, CPB = 28;
function cX(month, totalMonths) { return CPL + (month / totalMonths) * (CW - CPL - CPR); }
function cY(val, maxVal) { return CPT + (1 - Math.max(0, val) / maxVal) * (CH - CPT - CPB); }

function hoverMonth(e, isSVG, totalMonths) {
  const rect = e.currentTarget.getBoundingClientRect();
  const clientX = isSVG ? e.clientX : e.touches[0].clientX;
  const svgX = (clientX - rect.left) / rect.width * CW;
  return Math.max(0, Math.min(totalMonths, Math.round((svgX - CPL) / (CW - CPL - CPR) * totalMonths)));
}

// ── Balance Chart ─────────────────────────────────────────────────
function BalanceChart({ cardBal, meltBal, cardMonths, meltMonths }) {
  const [hov, setHov] = React.useState(null);
  const [animPct, setAnimPct] = React.useState(0);
  const maxBal = 500000;
  const totalMonths = cardMonths;

  React.useEffect(() => {
    setAnimPct(0);
    const start = performance.now();
    const dur = 900;
    function step(now) {
      const t = Math.min((now - start) / dur, 1);
      setAnimPct(t < 1 ? t * t * (3 - 2 * t) : 1);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [cardMonths, meltMonths]);

  const animMonths = Math.round(animPct * totalMonths);
  const cardPath = cardBal.slice(0, animMonths + 1).map((b, i) => `${i === 0 ? 'M' : 'L'}${cX(i, totalMonths).toFixed(1)},${cY(b, maxBal).toFixed(1)}`).join(' ');
  const meltPath = meltBal.slice(0, animMonths + 1).map((b, i) => `${i === 0 ? 'M' : 'L'}${cX(i, totalMonths).toFixed(1)},${cY(b, maxBal).toFixed(1)}`).join(' ');

  const cardArea = cardPath ? `${cardPath} L${cX(animMonths, totalMonths).toFixed(1)},${cY(0, maxBal).toFixed(1)} L${cX(0, totalMonths).toFixed(1)},${cY(0, maxBal).toFixed(1)} Z` : '';
  const meltArea = meltPath ? `${meltPath} L${cX(animMonths, totalMonths).toFixed(1)},${cY(0, maxBal).toFixed(1)} L${cX(0, totalMonths).toFixed(1)},${cY(0, maxBal).toFixed(1)} Z` : '';

  const yLabels = [500000, 400000, 300000, 200000, 100000, 0];
  const step = Math.max(1, Math.round(totalMonths / 6));
  const xLabels = Array.from({ length: totalMonths + 1 }, (_, i) => i).filter(m => m % step === 0 || m === totalMonths);

  let tip = null;
  if (hov !== null) {
    const hx      = cX(hov, totalMonths);
    const cb = cardBal[Math.min(hov, cardBal.length - 1)] || 0;
    const mb = meltBal[Math.min(hov, meltBal.length - 1)] || 0;
    const tipW = 108, tipH = 58;
    const tipX = hx + 8 + tipW > CW - CPR ? hx - tipW - 8 : hx + 8;
    const tipY = CPT + 4;
    tip = (
      <g>
        <line x1={hx} y1={CPT} x2={hx} y2={CH - CPB} stroke="#bbb" strokeWidth="1" strokeDasharray="3,2" />
        <circle cx={hx} cy={cY(cb, maxBal)} r="3.5" fill="var(--red)" />
        <circle cx={hx} cy={cY(mb, maxBal)} r="3.5" fill="var(--primary)" />
        <rect x={tipX} y={tipY} width={tipW} height={tipH} rx={7} fill="white" opacity="0.97" filter="url(#ts)" />
        <text x={tipX + 8} y={tipY + 14} fontSize="8" fill="#888" fontWeight="600">Month {hov}</text>
        <text x={tipX + 8} y={tipY + 29} fontSize="8.5" fill="var(--red)" fontWeight="700">Card  {fmtShort(cb)}</text>
        <text x={tipX + 8} y={tipY + 44} fontSize="8.5" fill="var(--primary)" fontWeight="700">Melt  {hov >= meltMonths ? 'Paid off ✓' : fmtShort(mb)}</text>
      </g>
    );
  }

  return (
    <svg viewBox={`0 0 ${CW} ${CH}`} style={{ width: '100%', cursor: 'pointer', userSelect: 'none' }}
      onMouseMove={e => setHov(hoverMonth(e, true, totalMonths))}
      onMouseLeave={() => setHov(null)}
      onTouchMove={e => { e.preventDefault(); setHov(hoverMonth(e, false, totalMonths)); }}
      onTouchEnd={() => setHov(null)}
    >
      <defs>
        <filter id="ts" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#00000020" />
        </filter>
      </defs>
      {yLabels.map((v, i) => {
        const y = cY(v, maxBal);
        return <g key={i}>
          <line x1={CPL} y1={y} x2={CW - CPR} y2={y} stroke="#E8E6F2" strokeWidth="1" />
          <text x={CPL - 5} y={y + 3} fontSize="9.5" fill="#5E5C7A" textAnchor="end" fontWeight="600">{fmtShort(v)}</text>
        </g>;
      })}
      {xLabels.map((m, i) => (
        <text key={i} x={cX(m, totalMonths)} y={CH - CPB + 14} fontSize="9.5" fill="#5E5C7A" textAnchor="middle" fontWeight="500">{m}</text>
      ))}
      <path d={cardArea} fill="rgba(212,79,72,.09)" />
      <path d={meltArea} fill="rgba(127,85,223,.11)" />
      <path d={cardPath} stroke="var(--red)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={meltPath} stroke="var(--primary)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {tip}
    </svg>
  );
}

// ── Cumulative Interest Chart ─────────────────────────────────────
const CCW = 308, CCH = 210, CCPL = 46, CCPR = 8, CCPT = 14, CCPB = 26;

function ccX(month, total) { return CCPL + (month / total) * (CCW - CCPL - CCPR); }
function ccY(val, maxVal)  { return CCPT + (1 - Math.max(0, val) / maxVal) * (CCH - CCPT - CCPB); }

function smoothPts(pts) {
  if (pts.length < 2) return '';
  let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = ((pts[i].x + pts[i + 1].x) / 2).toFixed(1);
    const my = ((pts[i].y + pts[i + 1].y) / 2).toFixed(1);
    d += ` Q${pts[i].x.toFixed(1)},${pts[i].y.toFixed(1)} ${mx},${my}`;
  }
  d += ` L${pts[pts.length - 1].x.toFixed(1)},${pts[pts.length - 1].y.toFixed(1)}`;
  return d;
}

function CumulativeChart({ cardInt, meltInt, cardMonths, meltMonths, meltInterest, intSaved }) {
  const [hov, setHov] = React.useState(null);
  const [animPct, setAnimPct] = React.useState(0);
  const [demoHov, setDemoHov] = React.useState(null);
  const [isDemoActive, setIsDemoActive] = React.useState(false);

  const totalMonths = cardMonths;
  const maxInt = Math.max(...cardInt, 100000);
  const moSaved = totalMonths - meltMonths;

  const startTimeoutRef = React.useRef(null);
  const intervalRef = React.useRef(null);
  const finishTimeoutRef = React.useRef(null);

  const stopDemo = React.useCallback(() => {
    setIsDemoActive(false);
    setDemoHov(null);
    if (startTimeoutRef.current) clearTimeout(startTimeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (finishTimeoutRef.current) clearTimeout(finishTimeoutRef.current);
  }, []);

  React.useEffect(() => {
    // Reset drawing animation percentage
    setAnimPct(0);
    const start = performance.now();
    const dur = 1100;
    function step(now) {
      const t = Math.min((now - start) / dur, 1);
      setAnimPct(t < 1 ? t * t * (3 - 2 * t) : 1);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);

    // Set up automated hover demo
    setIsDemoActive(false);
    setDemoHov(null);
    if (startTimeoutRef.current) clearTimeout(startTimeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (finishTimeoutRef.current) clearTimeout(finishTimeoutRef.current);

    startTimeoutRef.current = setTimeout(() => {
      setIsDemoActive(true);
      let currentMonth = 0;
      const endMonth = Math.round(totalMonths * 0.7);
      
      intervalRef.current = setInterval(() => {
        setDemoHov(currentMonth);
        if (currentMonth >= endMonth) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = null;
          
          finishTimeoutRef.current = setTimeout(() => {
            setIsDemoActive(false);
            setDemoHov(null);
          }, 1500);
        } else {
          currentMonth++;
        }
      }, 60);
    }, 1300); // Start 200ms after drawing animation completes

    return () => {
      if (startTimeoutRef.current) clearTimeout(startTimeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (finishTimeoutRef.current) clearTimeout(finishTimeoutRef.current);
    };
  }, [cardMonths, meltMonths, totalMonths]);

  const animMonths = Math.round(animPct * totalMonths);
  // The melt line must stop the moment the melt loan is paid off — no flat tail beyond it.
  const meltAnimMonths = Math.min(animMonths, meltMonths);

  const cardPts = cardInt.slice(0, animMonths + 1).map((v, i) => ({ x: ccX(i, totalMonths), y: ccY(v, maxInt) }));
  const meltPts = meltInt.slice(0, meltAnimMonths + 1).map((v, i) => ({ x: ccX(i, totalMonths), y: ccY(v, maxInt) }));

  const cardPath = smoothPts(cardPts);
  const meltPath = smoothPts(meltPts);

  // Y-axis labels
  const yMax = Math.ceil(maxInt / 100000) * 100000;
  const yLabels = [yMax, yMax * 0.75, yMax * 0.5, yMax * 0.25, 0].map(Math.round);
  const xStep = Math.max(1, Math.round(totalMonths / 6));
  const xLabels = Array.from({ length: totalMonths + 1 }, (_, i) => i).filter(m => m % xStep === 0 || m === totalMonths);

  // Savings callout badge — positioned top-left
  const badgeX = CCPL + 2, badgeY = CCPT + 2, badgeW = 108, badgeH = 36;

  // Hover tooltip
  function ccHover(e, isSVG) {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = isSVG ? e.clientX : e.touches[0].clientX;
    const svgX = (clientX - rect.left) / rect.width * CCW;
    return Math.max(0, Math.min(totalMonths, Math.round((svgX - CCPL) / (CCW - CCPL - CCPR) * totalMonths)));
  }

  const activeHov = hov !== null ? hov : (isDemoActive ? demoHov : null);

  let tip = null;
  let handGesture = null;

  if (activeHov !== null) {
    const hx    = ccX(activeHov, totalMonths);
    const ci    = cardInt[Math.min(activeHov, cardInt.length - 1)];
    const mi    = meltInt[Math.min(activeHov, meltInt.length - 1)];
    const mDone = activeHov >= meltMonths;
    const saved = Math.max(0, ci - (mDone ? meltInterest : mi));
    const tipW = 148, tipH = 66;
    const tipX = hx + 8 + tipW > CCW - CCPR ? hx - tipW - 8 : hx + 8;
    const tipY = CCH - CCPB - tipH - 4;
    tip = (
      <g style={{ transition: 'opacity 0.15s' }}>
        <line x1={hx} y1={CCPT} x2={hx} y2={CCH - CCPB} stroke="#ccc" strokeWidth="1" strokeDasharray="3,2" />
        <circle cx={hx} cy={ccY(ci, maxInt)} r="3.5" fill="#E8453C" />
        <circle cx={hx} cy={ccY(mi, maxInt)} r="3.5" fill="var(--primary)" />
        <rect x={tipX} y={tipY} width={tipW} height={tipH} rx={8} fill="white" opacity="0.97" filter="url(#tc2)" />
        <text x={tipX + 9} y={tipY + 13} fontSize="7.5" fill="#999" fontWeight="600">Month {activeHov}</text>
        <text x={tipX + 9} y={tipY + 27} fontSize="8.5" fill="#E8453C" fontWeight="700">Without Melt  {fmtIN(ci)}</text>
        <text x={tipX + 9} y={tipY + 41} fontSize="8.5" fill="var(--primary)" fontWeight="700">With Melt  {mDone ? fmtIN(meltInterest) + ' ✓' : fmtIN(mi)}</text>
        <rect x={tipX + 7} y={tipY + 49} width={tipW - 14} height={13} rx={4} fill="rgba(22,163,74,.13)" />
        <text x={tipX + 11} y={tipY + 59} fontSize="7.5" fill="#15803D" fontWeight="700">Saved  {fmtIN(saved)}</text>
      </g>
    );

    if (isDemoActive && demoHov !== null) {
      const hy = ccY(mi, maxInt);
      handGesture = (
        <g transform={`translate(${hx}, ${hy})`} style={{ pointerEvents: 'none', transition: 'transform 0.08s ease-out' }}>
          <circle cx="0" cy="0" r="10" fill="var(--primary)" opacity="0.4">
            <animate attributeName="r" values="5;14" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <g transform="translate(-8.5, 0) scale(1.1)">
            <path
              d="M 8.5 0 C 7.67 0 7 0.67 7 1.5 L 7 8.5 C 7 8.5 6.13 7.6 5.3 6.8 C 4.7 6.2 3.8 6.2 3.2 6.8 C 2.6 7.4 2.6 8.3 3.2 8.9 L 6.8 12.5 C 8.6 14.3 11 15.3 13.5 15.3 L 15.5 15.3 C 18.5 15.3 21 12.8 21 9.8 L 21 6.5 C 21 5.67 20.33 5 19.5 5 C 19.3 5 19.1 5.04 18.9 5.12 C 18.6 4.45 17.9 4 17.1 4 C 16.9 4 16.7 4.03 16.5 4.1 C 16.1 3.44 15.4 3 14.6 3 C 14.3 3 14.1 3.03 13.9 3.1 C 13.5 2.44 12.8 2 12 2 C 11.8 2 11.6 2.03 11.4 2.1 L 11.4 1.5 C 11.4 0.67 10.73 0 9.9 0 L 8.5 0 Z"
              fill="white"
              stroke="#1C192E"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </g>
        </g>
      );
    }
  }

  return (
    <svg viewBox={`0 0 ${CCW} ${CCH}`} style={{ width: '100%', cursor: 'crosshair', userSelect: 'none', overflow: 'visible' }}
      onMouseMove={e => {
        stopDemo();
        setHov(ccHover(e, true));
      }}
      onMouseLeave={() => setHov(null)}
      onTouchStart={stopDemo}
      onTouchMove={e => {
        e.preventDefault();
        stopDemo();
        setHov(ccHover(e, false));
      }}
      onTouchEnd={() => setHov(null)}
    >
      <defs>
        <filter id="tc2" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#00000018" />
        </filter>
        <filter id="badgeShadow" x="-10%" y="-10%" width="120%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#00000025" />
        </filter>
      </defs>

      {/* grid lines + y-axis labels */}
      {yLabels.map((v, i) => {
        const y = ccY(v, maxInt);
        return <g key={i}>
          <line x1={CCPL} y1={y} x2={CCW - CCPR} y2={y} stroke="#E8E6F2" strokeWidth="1" />
          <text x={CCPL - 5} y={y + 3} fontSize="9.5" fill="#5E5C7A" textAnchor="end" fontWeight="600">{fmtShort(v)}</text>
        </g>;
      })}

      {/* x-axis labels */}
      {xLabels.map((m, i) => (
        <text key={i} x={ccX(m, totalMonths)} y={CCH - CCPB + 14} fontSize="9.5" fill="#5E5C7A" textAnchor="middle" fontWeight="500">{m}</text>
      ))}

      {/* curves */}
      <path d={cardPath} stroke="#E8453C" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={meltPath} stroke="var(--primary)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* Two end-lines — where each line stops — plus the time delta between them */}
      {animPct > 0.9 && meltMonths < totalMonths && (() => {
        const mx = ccX(meltMonths, totalMonths);
        const my = ccY(meltInterest, maxInt);
        const cx = ccX(totalMonths, totalMonths);
        const cardFinal = cardInt[cardInt.length - 1];
        const cy = ccY(cardFinal, maxInt);
        const axisY = CCH - CCPB;
        const dimY = axisY - 14;
        const gapW = cx - mx;
        const midX = (mx + cx) / 2;
        const showTag = gapW > 34;
        return (
          <g style={{ animation: 'fadeIn .4s both' }}>
            {/* end-line: With Melt */}
            <line x1={mx} y1={my} x2={mx} y2={axisY} stroke="var(--primary)" strokeWidth="1.2" strokeDasharray="3,3" opacity="0.35" />
            <circle cx={mx} cy={my} r="5" fill="var(--primary)" stroke="#fff" strokeWidth="2.2" />
            {/* minimal tick — replaces the old "paid off" text badge */}
            <g transform={`translate(${mx}, ${my - 15})`}>
              <circle cx="0" cy="0" r="6.5" fill="var(--primary)" />
              <path d="M-2.8 0.3l1.8 1.8 3.4-3.6" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>

            {/* end-line: Credit Card */}
            <line x1={cx} y1={cy} x2={cx} y2={axisY} stroke="#E8453C" strokeWidth="1.2" strokeDasharray="3,3" opacity="0.35" />
            <circle cx={cx} cy={cy} r="5" fill="#E8453C" stroke="#fff" strokeWidth="2.2" />

            {/* time-delta dimension line */}
            <line x1={mx} y1={dimY} x2={cx} y2={dimY} stroke="#B8B5CC" strokeWidth="1.2" />
            <line x1={mx} y1={dimY - 4} x2={mx} y2={dimY + 4} stroke="#B8B5CC" strokeWidth="1.2" />
            <line x1={cx} y1={dimY - 4} x2={cx} y2={dimY + 4} stroke="#B8B5CC" strokeWidth="1.2" />
            {showTag && (
              <>
                <rect x={midX - 30} y={dimY - 9} width="60" height="15" rx="7.5" fill="#fff" stroke="#E1DEF0" />
                <text x={midX} y={dimY + 1.5} fontSize="7.5" fill="var(--primary)" fontWeight="800" textAnchor="middle">{moSaved} mo saved</text>
              </>
            )}
          </g>
        );
      })()}

      {/* savings callout badge */}
      {animPct > 0.85 && (
        <g style={{ animation: 'fadeIn .3s' }}>
          {/* badge */}
          <rect x={badgeX} y={badgeY} width={badgeW} height={badgeH} rx={8} fill="#16A34A" filter="url(#badgeShadow)" />
          <text x={badgeX + badgeW / 2} y={badgeY + 13} fontSize="7" fill="rgba(255,255,255,0.85)" fontWeight="700" textAnchor="middle" letterSpacing="0.6">YOU SAVE IN INTEREST</text>
          <text x={badgeX + badgeW / 2} y={badgeY + 28} fontSize="13" fill="#fff" fontWeight="800" textAnchor="middle">{fmtIN(intSaved)}</text>
        </g>
      )}

      {tip}
      {handGesture}
    </svg>
  );
}

// ── UI Components ─────────────────────────────────────────────────
function Card({ children }) {
  return (
    <div style={{ background: '#fff', borderRadius: 22, padding: '18px 16px 16px', marginTop: 14, border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 1px 3px rgba(0,0,0,.05), 0 4px 14px rgba(0,0,0,.07)' }}>
      {children}
    </div>
  );
}
function Mini({ tone, label, rate, time, interest }) {
  const isRed = tone === 'red';
  const accent  = isRed ? '#E8453C'                        : 'var(--primary)';
  const c       = isRed ? '#C0392B'                        : '#5B3FD4';
  const border  = isRed ? 'rgba(232,69,60,0.14)'          : 'rgba(91,63,212,0.14)';
  const shadow  = isRed ? '0 4px 16px rgba(212,79,72,.07)': '0 4px 16px rgba(91,63,212,.08)';
  const divider = isRed ? 'rgba(232,69,60,0.10)'          : 'rgba(91,63,212,0.10)';
  return (
    <div style={{ flex: 1, background: '#fff', border: `1px solid ${border}`, borderRadius: 16, overflow: 'hidden', boxShadow: shadow }}>
      <div style={{ height: 4, background: accent }} />
      <div style={{ padding: '11px 12px 14px' }}>
        <div style={{ fontWeight: 700, fontSize: 12.5, color: c, lineHeight: 1.25, marginBottom: 3, minHeight: 30 }}>{label}</div>
        <div style={{ fontSize: 9.5, fontWeight: 500, color: '#999', marginBottom: 11 }}>{rate}</div>
      </div>
    </div>
  );
}
function Legend({ items }) {
  return (
    <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 14, flexWrap: 'wrap' }}>
      {items.map(([c, l], i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11, color: 'var(--ink-2)', fontWeight: 600 }}>
          <span style={{ width: 22, height: 3.5, borderRadius: 999, background: c, flexShrink: 0 }} />{l}
        </div>
      ))}
    </div>
  );
}

// ── Screen ────────────────────────────────────────────────────────
function Visualise({ go, ccrfRate = 22, monthly = 30000 }) {
  const { cardAmort, meltAmort } = React.useMemo(() => ({
    cardAmort: buildAmort(VIZ_DUE, monthly, CARD_RATE_PCT),
    meltAmort: buildAmort(VIZ_DUE, monthly, MELT_RATE_PCT),
  }), [monthly]);

  const cardMonths   = cardAmort.months;
  const meltMonths   = meltAmort.months;
  const cardInterest = cardAmort.totalInt;
  const meltInterest = meltAmort.totalInt;
  const intSaved     = cardInterest - meltInterest;

  // Pad melt balance/interest arrays to card length
  const meltBalPadded = [...meltAmort.balArr, ...Array(Math.max(0, cardMonths - meltAmort.months)).fill(0)];
  const meltIntPadded = [...meltAmort.intArr, ...Array(Math.max(0, cardMonths - meltAmort.months)).fill(meltInterest)];

  return (
    <div style={{ minHeight: '100%', background: '#F4F3FB', animation: 'fadeIn .35s' }}>
      <Header title="Savings Illustration" onBack={() => go('eligibility')} />
      <div style={{ padding: '2px 18px 32px' }}>

        {/* ── Cumulative interest chart ── */}
        <Card>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--ink)', lineHeight: 1.3 }}>Interest You'll Pay Over Time</div>
            <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 3, fontWeight: 500 }}>Credit Card vs Melt · drag to explore</div>
          </div>
          <CumulativeChart cardInt={cardAmort.intArr} meltInt={meltIntPadded} cardMonths={cardMonths} meltMonths={meltMonths} meltInterest={meltInterest} intSaved={intSaved} />
          <Legend items={[['#E8453C', `Credit Card (${CARD_RATE_PCT}% p.a.)`], ['var(--primary)', `With Melt (${MELT_RATE_PCT}% p.a.)`]]} />
        </Card>

        {/* ── Balance repayment chart ── */}
        <Card>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--ink)', lineHeight: 1.3 }}>Debt You'll Clear Over Time</div>
            <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 3, fontWeight: 500 }}>Outstanding balance month by month</div>
          </div>
          <BalanceChart cardBal={cardAmort.balArr} meltBal={meltBalPadded} cardMonths={cardMonths} meltMonths={meltMonths} />
          <Legend items={[['var(--red)', `Credit Card (${CARD_RATE_PCT}% p.a.)`], ['var(--primary)', `Melt (${MELT_RATE_PCT}% p.a.)`]]} />
        </Card>

        <div style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'center', marginTop: 16, lineHeight: 1.5, padding: '0 8px' }}>
          Estimated interest is calculated assuming an annual rate of 54%, including 3–4% monthly interest (up to 45% p.a.) and 18% GST on the interest charged. Actual charges may vary.
        </div>
      </div>
    </div>
  );
}

window.Visualise = Visualise;
