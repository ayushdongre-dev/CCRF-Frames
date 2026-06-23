// screen-selling.jsx — General Selling
// Page 1 (story mode): animated credit-card hero "Settle All Your Credit Cards".
// After it, the flow moves to a SEPARATE, non-story Savings screen (below).

// ── Animated credit-card stack: shuffles in, number + name type in ──
function AnimCard({ playKey }) {
  const full = '1221 3677 8210 0223';
  const name = 'KAMALA K.';
  const [numShown, setNumShown] = useState(0);
  const [nameShown, setNameShown] = useState(0);
  const [shuffled, setShuffled] = useState(false);

  useEffect(() => {
    setNumShown(0); setNameShown(0); setShuffled(false);
    const t0 = setTimeout(() => setShuffled(true), 120);
    let i = 0, j = 0;
    const ni = setInterval(() => { i++; setNumShown(i); if (i >= full.length) clearInterval(ni); }, 70);
    const nj = setTimeout(() => {
      const nameI = setInterval(() => { j++; setNameShown(j); if (j >= name.length) clearInterval(nameI); }, 90);
    }, 1500);
    return () => { clearTimeout(t0); clearInterval(ni); clearTimeout(nj); };
  }, [playKey]);

  return (
    <div style={{ position: 'relative', height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        position: 'absolute', width: 232, height: 146, borderRadius: 18,
        background: 'linear-gradient(135deg,#B7A6EE,#9A86E6)',
        transform: shuffled ? 'translate(-34px,-22px) rotate(-12deg)' : 'translate(0,0) rotate(0deg)',
        transition: 'transform .7s cubic-bezier(.2,.8,.2,1)', opacity: 0.65,
      }} />
      <div style={{
        position: 'absolute', width: 232, height: 146, borderRadius: 18,
        background: 'linear-gradient(135deg,#9F8BE8,#7E63DC)',
        transform: shuffled ? 'translate(-16px,-10px) rotate(-6deg)' : 'translate(0,0) rotate(0deg)',
        transition: 'transform .7s cubic-bezier(.2,.8,.2,1) .05s', opacity: 0.85,
      }} />
      <div style={{
        position: 'relative', width: 256, height: 158, borderRadius: 18,
        background: 'linear-gradient(135deg,#6E51D8 0%,#4B3596 100%)',
        boxShadow: '0 24px 44px -18px rgba(75,53,150,.85)', overflow: 'hidden',
        padding: '16px 18px', color: '#fff',
        transform: shuffled ? 'translate(8px,6px) rotate(2deg)' : 'translate(0,0)',
        transition: 'transform .7s cubic-bezier(.2,.8,.2,1) .08s',
      }}>
        <div style={{ position: 'absolute', right: -30, top: -30, width: 120, height: 120, borderRadius: 999, background: 'rgba(255,255,255,.08)' }} />
        <div style={{ position: 'absolute', right: 14, bottom: 14, width: 46, height: 30, borderRadius: 6, background: 'rgba(255,255,255,.16)' }} />
        <div style={{ width: 34, height: 24, borderRadius: 5, background: 'linear-gradient(135deg,#F4D58D,#D6A94E)', marginTop: 4 }} />
        <div style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 16.5, letterSpacing: 1.5, marginTop: 30, minHeight: 22, fontWeight: 500 }}>
          {full.slice(0, numShown)}
          {numShown < full.length && <span style={{ animation: 'blink 1s infinite' }}>|</span>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 14 }}>
          <div>
            <div style={{ fontSize: 8, opacity: 0.6, letterSpacing: 1 }}>CARD HOLDER</div>
            <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: 1.5, minHeight: 16 }}>
              {name.slice(0, nameShown)}
              {nameShown > 0 && nameShown < name.length && <span style={{ animation: 'blink 1s infinite' }}>|</span>}
            </div>
          </div>
          <div style={{ fontWeight: 800, fontSize: 13, fontStyle: 'italic', opacity: 0.9 }}>EQUALL</div>
        </div>
      </div>
    </div>
  );
}

// ── STORY MODE: single hero slide ──
function SellingStories({ go, storyMs = 7000 }) {
  const [prog, setProg] = useState(0);
  const [paused, setPaused] = useState(false);
  const [playKey, setPlayKey] = useState(0);
  const startRef = useRef(performance.now());
  const rafRef = useRef(0);

  const advance = useCallback(() => go('savings'), [go]);

  useEffect(() => {
    startRef.current = performance.now();
    const tick = (now) => {
      if (!paused) {
        const p = Math.min(1, (now - startRef.current) / storyMs);
        setProg(p);
        if (p >= 1) { advance(); return; }
      } else {
        startRef.current = now - prog * storyMs;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, storyMs, advance]);

  const onTap = (e) => {
    const x = e.clientX - e.currentTarget.getBoundingClientRect().left;
    if (x < e.currentTarget.clientWidth * 0.32) { setProg(0); startRef.current = performance.now(); setPlayKey(k => k + 1); }
    else advance();
  };

  return (
    <div
      onClick={onTap}
      onMouseDown={() => setPaused(true)}
      onMouseUp={() => setPaused(false)}
      onMouseLeave={() => setPaused(false)}
      style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg,#EFEEFE 0%,#E4E0FA 100%)', position: 'relative', padding: '0 22px 26px', cursor: 'pointer', userSelect: 'none' }}>
      <div style={{ display: 'flex', gap: 6, paddingTop: 6, marginBottom: 18 }}>
        <div style={{ flex: 1, height: 3.5, borderRadius: 9, background: 'rgba(127,85,223,.22)', overflow: 'hidden' }}>
          <div style={{ height: '100%', borderRadius: 9, background: 'var(--primary)', width: (prog * 100) + '%' }} />
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 24px', animation: 'fadeIn .35s' }}>
        {/* Card Graphic stack */}
        <div style={{ transform: 'scale(0.85)', margin: '-10px 0 10px', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimCard playKey={playKey} />
        </div>

        {/* Title and Tagline */}
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1.5, color: '#5B3FD4', textTransform: 'uppercase', marginBottom: 8 }}>
            Introducing Melt
          </div>
          <h1 style={{ fontWeight: 850, fontSize: 30, lineHeight: 1.15, color: '#1B192E', letterSpacing: -0.8, margin: '0 0 12px 0' }}>
            Clear All Your<br />Credit Card Bills
          </h1>
          <p style={{ fontSize: 14.5, color: '#6E6B82', lineHeight: 1.5, margin: 0, padding: '0 16px' }}>
            Consolidate your balances into a single low-interest plan.
          </p>
        </div>

        {/* Loading dots */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 36, gap: 10 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#5B3FD4', opacity: 0.3, animation: 'blink 1.4s infinite both' }} />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#5B3FD4', opacity: 0.3, animation: 'blink 1.4s infinite both 0.2s' }} />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#5B3FD4', opacity: 0.3, animation: 'blink 1.4s infinite both 0.4s' }} />
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#88859E', letterSpacing: 0.8, textTransform: 'uppercase', animation: 'blink 2s infinite' }}>
            Loading...
          </span>
        </div>
      </div>

      <div style={{ textAlign: 'right', position: 'absolute', right: 22, bottom: 18 }}>
        <button onClick={(e) => { e.stopPropagation(); go('savings'); }}
          style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}>skip →</button>
      </div>
    </div>
  );
}

function Dot() { return <span style={{ width: 5, height: 5, borderRadius: 9, background: 'var(--primary)' }} />; }

// ════════════════════════════════════════════════════════════
//  MELT — Savings screen
//  "Your money is frozen in card debt. Melt liquefies it."
//  Ice cube (frozen ₹ @ 42%) → puddle (liquid ₹ @ 22%).
// ════════════════════════════════════════════════════════════
const MELT = {
  bg: '#F7F7FC', hero: '#0F0D2E', purple: '#5B3FD4', purpleL: '#EDE8FF', purpleBorder: '#C4B5FD',
  green: '#1A7A4A', greenSoft: '#66BB88', greenBg: '#E8F8EE', greenBorder: '#86EFAC',
  red: '#E95B5B', ink: '#1A1A2E', muted: '#888888', muted2: '#666666', muted3: '#999999',
};

// ── Rolling counter (kept from prior build) ──────────────────
// chrome=false → clean rolling digits (no casino window) for light surfaces.
function SlotReel({ digit, delay, playKey, h, chrome = true, digitColor = '#2A1E55' }) {
  const LOOPS = 6;
  const target = (LOOPS * 10 + digit);
  const [y, setY] = useState(0);
  useEffect(() => { setY(0); const t = setTimeout(() => setY(target), 60); return () => clearTimeout(t); }, [playKey, digit]);
  const strip = [];
  for (let i = 0; i < (LOOPS + 2) * 10; i++) strip.push(i % 10);
  return (
    <div style={{
      height: h, width: h * (chrome ? 0.72 : 0.6), overflow: 'hidden', position: 'relative',
      background: chrome ? 'linear-gradient(#fff,#F3F1FB)' : 'transparent', borderRadius: chrome ? 9 : 0,
      boxShadow: chrome ? 'inset 0 7px 9px -6px rgba(0,0,0,.45), inset 0 -7px 9px -6px rgba(0,0,0,.45), 0 1px 0 rgba(255,255,255,.5)' : 'none',
    }}>
      <div style={{ transform: `translateY(-${y * h}px)`, transition: `transform 1.9s cubic-bezier(.16,.74,.2,1) ${delay}s` }}>
        {strip.map((d, i) => (
          <div key={i} style={{ height: h, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: h * 0.66, color: digitColor, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{d}</div>
        ))}
      </div>
      {chrome && <div style={{ position: 'absolute', inset: 0, borderRadius: 9, background: 'linear-gradient(105deg,rgba(255,255,255,.55) 0%,rgba(255,255,255,0) 38%)', pointerEvents: 'none' }} />}
    </div>
  );
}

function SlotNumber({ value, playKey, h = 52, chrome = true, digitColor = '#2A1E55', sepColor = '#fff', gap = 4 }) {
  const grouped = inr(value);
  let digitIdx = 0;
  const chars = grouped.split('').map((ch, i) => {
    if (ch >= '0' && ch <= '9') {
      const el = <SlotReel key={i} digit={+ch} delay={digitIdx * 0.14} playKey={playKey} h={h} chrome={chrome} digitColor={digitColor} />;
      digitIdx++;
      return el;
    }
    return <span key={i} style={{ fontWeight: 800, fontSize: ch === '₹' ? h * 0.62 : h * 0.72, color: sepColor, alignSelf: 'center', padding: ch === '₹' ? '0 3px 0 0' : '0 1px', lineHeight: 1 }}>{ch}</span>;
  });
  return <div style={{ display: 'flex', alignItems: 'stretch', gap }}>{chars}</div>;
}

// ── HERO ILLUSTRATION 1: ice cube with a credit card frozen inside ──
function IceCube({ size = 112, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden="true" style={style}>
      <defs>
        <linearGradient id="iceTop" x1="20" y1="16" x2="100" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F4FAFF" /><stop offset="1" stopColor="#CBE3FF" />
        </linearGradient>
        <linearGradient id="iceLeft" x1="20" y1="39" x2="60" y2="106" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#A9CDF2" /><stop offset="1" stopColor="#6E9FDD" />
        </linearGradient>
        <linearGradient id="iceRight" x1="100" y1="39" x2="60" y2="106" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#D2E7FC" /><stop offset="1" stopColor="#90BAEC" />
        </linearGradient>
        <radialGradient id="iceGlow" cx="50%" cy="34%" r="62%">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" /><stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="iceShadow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.4" /></filter>
        <filter id="iceRefract" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="0.6" /></filter>
      </defs>
      <ellipse cx="60" cy="111" rx="38" ry="6.5" fill="#0B1E3A" opacity="0.30" filter="url(#iceShadow)" />
      <polygon points="60,16 100,39 60,62 20,39" fill="url(#iceTop)" opacity="0.97" />
      <polygon points="20,39 60,62 60,106 20,83" fill="url(#iceLeft)" opacity="0.93" />
      <polygon points="100,39 60,62 60,106 100,83" fill="url(#iceRight)" opacity="0.95" />
      <polygon points="60,24 90,40 60,56 30,40" fill="url(#iceGlow)" />
      <g filter="url(#iceRefract)">
        <g transform="translate(60 73) skewX(-7) rotate(-5)">
          <rect x="-22" y="-13" width="44" height="30" rx="5" fill="#2C568F" opacity="0.35" />
          <rect x="-23" y="-15" width="44" height="30" rx="5" fill="#DCEEFF" opacity="0.92" />
          <rect x="-16" y="-7" width="10" height="8" rx="1.8" fill="#AFD0EE" />
          <rect x="-16" y="5" width="28" height="2.6" rx="1.3" fill="#9FC0E4" />
          <rect x="-16" y="10" width="17" height="2.6" rx="1.3" fill="#9FC0E4" />
          <polygon points="-23,-15 -8,-15 -18,15 -23,15" fill="#ffffff" opacity="0.18" />
          <rect x="-23" y="-15" width="44" height="30" rx="5" fill="none" stroke="#ffffff" strokeOpacity="0.65" strokeWidth="1" />
        </g>
      </g>
      <polygon points="60,16 100,39 60,62 20,39" fill="none" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="1.3" strokeLinejoin="round" />
      <line x1="60" y1="62" x2="60" y2="106" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="1.2" />
      <line x1="20" y1="39" x2="20" y2="83" stroke="#ffffff" strokeOpacity="0.32" strokeWidth="1" />
      <line x1="100" y1="39" x2="100" y2="83" stroke="#ffffff" strokeOpacity="0.32" strokeWidth="1" />
      <circle cx="82" cy="50" r="2" fill="#ffffff" opacity="0.5" />
      <circle cx="34" cy="52" r="1.4" fill="#ffffff" opacity="0.4" />
    </svg>
  );
}

// ── HERO ILLUSTRATION 2: half-melted cube, credit card emerging ──
function Puddle({ size = 112, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden="true" style={style}>
      <defs>
        <radialGradient id="meltWater" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#A5F3FC" />
          <stop offset="70%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </radialGradient>
        <linearGradient id="cardWarm" x1="36" y1="36" x2="84" y2="68" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFEAA7" />
          <stop offset="40%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#E2A900" />
        </linearGradient>
        <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodColor="#000000" floodOpacity="0.15" />
        </filter>
      </defs>
      
      {/* Bottom Puddle (Water) */}
      <ellipse cx="60" cy="101" rx="46" ry="11" fill="none" stroke="#8FC5F2" strokeOpacity="0.22" strokeWidth="1.4" />
      <ellipse cx="60" cy="101" rx="42" ry="10" fill="#38BDF8" opacity="0.15" />
      <ellipse cx="60" cy="100" rx="36" ry="8.5" fill="url(#meltWater)" />
      <ellipse cx="50" cy="97" rx="10" ry="2.3" fill="#ffffff" opacity="0.4" />
      
      {/* 50% Melted Ice Block (Rendered Behind) */}
      <g opacity="0.85">
        {/* Ice top face */}
        <polygon points="60,62 86,72 60,82 34,72" fill="#EAF7FF" />
        {/* Ice left face */}
        <polygon points="34,72 60,82 60,98 34,88" fill="#A9D2EE" />
        {/* Ice right face */}
        <polygon points="86,72 60,82 60,98 86,88" fill="#7FB8DF" />
        {/* Ice lines */}
        <path d="M32,72 L60,82 L88,72" fill="none" stroke="#ffffff" strokeOpacity="0.65" strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M60,82 L60,98" stroke="#ffffff" strokeOpacity="0.38" strokeWidth="1" />
      </g>
      
      {/* Golden Credit Card - Free, sharp, and on top */}
      <g transform="rotate(-15 60 52)" filter="url(#cardShadow)">
        {/* Card Body - Warm Golden gradient */}
        <rect x="36" y="36" width="48" height="32" rx="4.5" fill="url(#cardWarm)" />
        {/* Card Border - Crisp Gold border */}
        <rect x="36" y="36" width="48" height="32" rx="4.5" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.9" />
        
        {/* Chip - Crisp white/gold metallic rect */}
        <rect x="42" y="42" width="10" height="7.5" rx="1.5" fill="#FFFBEB" />
        <rect x="44" y="44" width="6" height="3.5" rx="0.5" fill="#E2A900" opacity="0.3" />
        
        {/* Embossed Text/Lines */}
        <rect x="42" y="54" width="36" height="2" rx="1" fill="#FDE68A" />
        <rect x="42" y="58.5" width="20" height="2" rx="1" fill="#FDE68A" />
      </g>

      <path d="M52,96 q2,7 0,10 q-2,-3 0,-10 Z" fill="#CFEFFF" opacity="0.85" />
      <path d="M66,96 q1.8,6 0,9 q-1.8,-3 0,-9 Z" fill="#BDE7FF" opacity="0.74" />
      <circle cx="76" cy="97" r="2.4" fill="#CFEFFF" opacity="0.8" />
      
      {/* Sparkling stars indicating the card is freed & premium */}
      <path d="M86 30 l1.2 3 3 1.2 -3 1.2 -1.2 3 -1.2-3 -3-1.2 3-1.2z" fill="#F59E0B" opacity="0.85" />
      <path d="M26 24 l1.2 3 3 1.2 -3 1.2 -1.2 3 -1.2-3 -3-1.2 3-1.2z" fill="#F59E0B" opacity="0.85" />
    </svg>
  );
}

// stat-chip icons
const coinDownIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="9.5" cy="9.5" r="6" stroke="#1A7A4A" strokeWidth="2" /><path d="M9.5 6.7v5.6M7.4 10.2l2.1 2.1 2.1-2.1" stroke="#1A7A4A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><path d="M17.5 13.5v6m0 0l-2.3-2.3M17.5 19.5l2.3-2.3" stroke="#1A7A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const calTickIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3.5" y="5" width="17" height="15.5" rx="3" stroke="#1A7A4A" strokeWidth="2" /><path d="M3.5 9.5h17" stroke="#1A7A4A" strokeWidth="2" /><path d="M8 3v3.2M16 3v3.2" stroke="#1A7A4A" strokeWidth="2" strokeLinecap="round" /><path d="M8.6 14.6l2.2 2.2L15.4 12" stroke="#1A7A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

// comparison row (Melt palette)
function MeltCompareRow({ label, rate, total, frac, color, playKey, delay = 0 }) {
  const [grow, setGrow] = useState(false);
  useEffect(() => { setGrow(false); const t = setTimeout(() => setGrow(true), 160 + delay); return () => clearTimeout(t); }, [playKey]);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7, gap: 8 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: '#333333', whiteSpace: 'nowrap', flexShrink: 1, minWidth: 0 }}>
          <span style={{ width: 9, height: 9, borderRadius: 9, background: color, flexShrink: 0 }} />{label}
          <span style={{ fontSize: 12.5, color: MELT.muted2, fontWeight: 600 }}>{rate}% p.a.</span>
        </span>
        <span style={{ fontWeight: 700, fontSize: 14, color, flexShrink: 0 }}>{total}</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: '#F0EEF6', overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: 3, background: color, width: grow ? (frac * 100) + '%' : '0%', transition: 'width 1s cubic-bezier(.2,.8,.2,1)' }} />
      </div>
    </div>
  );
}

// ── Info tooltip ─────────────────────────────────────────────
function InfoTip({ text }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <button
        onClick={e => { e.stopPropagation(); setOpen(o => !o); }}
        style={{ width: 12, height: 12, borderRadius: 999, background: 'transparent', border: 'none', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
      >
        <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="9" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" fill="rgba(255,255,255,0.15)" />
          <circle cx="10" cy="6.5" r="1.2" fill="#fff" />
          <rect x="9.1" y="9" width="1.8" height="5.5" rx="0.9" fill="#fff" />
        </svg>
      </button>
      {open && (
        <div
          onClick={e => e.stopPropagation()}
          style={{ position: 'absolute', bottom: 26, left: '50%', transform: 'translateX(-50%)', width: 210, background: '#fff', borderRadius: 14, padding: '13px 14px 11px', boxShadow: '0 12px 32px -6px rgba(0,0,0,.18)', zIndex: 20, border: '1px solid #FBECEB' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginBottom: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 3L22 20H2L12 3Z" fill="#FDE7A9" opacity="0.95" />
              <path d="M12 3L22 20H2L12 3Z" stroke="#D09400" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="12" cy="16.5" r="1.2" fill="#D09400" />
              <rect x="11.1" y="9.5" width="1.8" height="5" rx="0.9" fill="#D09400" />
            </svg>
            <span style={{ fontWeight: 700, fontSize: 13, color: '#B67B00' }}>Hidden Cost Alert</span>
          </div>
          <div style={{ fontSize: 11, color: '#444', lineHeight: 1.5, fontWeight: 500 }}>
            <span style={{ color: '#B67B00', fontWeight: 700 }}>3.75%/month interest + 18% GST on interest = ~54% p.a. effective cost</span>
          </div>
          <button onClick={() => setOpen(false)} style={{ marginTop: 10, fontSize: 11.5, fontWeight: 600, color: '#999' }}>Tap to dismiss</button>
        </div>
      )}
    </div>
  );
}

// ── Animated number tween (old → new when target changes) ────
function useAnimatedNumber(target, duration = 550) {
  const [val, setVal] = useState(target);
  const prevRef = useRef(target);
  const rafRef = useRef(null);
  useEffect(() => {
    const from = prevRef.current;
    prevRef.current = target;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (from === target) return;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const e = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setVal(Math.round(from + (target - from) * e));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else setVal(target);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);
  return val;
}

// ── Savings math ──────────────────────────────────────────────
function calcSavings(monthly) {
  const B = 500000, rC = 0.54 / 12, rM = 0.25 / 12;
  function payoffN(P, r) {
    if (P <= B * r) return 999;
    return Math.ceil(-Math.log(1 - (B * r) / P) / Math.log(1 + r));
  }
  function totalInt(P, r) {
    const n = payoffN(P, r);
    let bal = B;
    for (let i = 0; i < n - 1; i++) bal = bal * (1 + r) - P;
    return Math.max(0, Math.round((n - 1) * P + bal * (1 + r) - B));
  }
  const cardsInt = totalInt(monthly, rC);
  const meltInt = totalInt(monthly, rM);
  const nC = payoffN(monthly, rC);
  const nM = payoffN(monthly, rM);
  return { cardsInt, meltInt, saving: cardsInt - meltInt, monthsDiff: nC - nM, nC, nM };
}


// ── Premium white outline/solid SVGs for benefit chips (replacing emojis) ──
const whiteSavingsIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="12" cy="12" r="3" />
    <path d="M6 12h.01M18 12h.01" />
  </svg>
);

const whiteClockIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const whiteTrendIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

// ── Calculator & Advisory SVGs for bottom sheets (replacing emojis) ──
const purpleCalcIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B3FD4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="16" y1="14" x2="16" y2="18" />
    <path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" strokeWidth="3" />
  </svg>
);

const lightbulbIcon = (color) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .6 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <line x1="9" y1="18" x2="15" y2="18" />
    <line x1="10" y1="22" x2="14" y2="22" />
  </svg>
);

// ── MELT SAVINGS SCREEN — Redesigned ─────────────────────────
function SavingsScreen({ go, monthly = 30000, setMonthly }) {
  const [sheetOpen, setSheetOpen] = useState(null);
  const [sheetClosing, setSheetClosing] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(null);
  const MIN = 25000, MAX = 100000, STEP = 5000;

  useEffect(() => {
    const scr = document.getElementById('phone-scroll-viewport');
    if (!scr) return;
    scr.style.overflowY = sheetOpen ? 'hidden' : 'auto';
    return () => { scr.style.overflowY = 'auto'; };
  }, [sheetOpen]);

  const { cardsInt, meltInt, saving, monthsDiff, nC, nM } = useMemo(() => calcSavings(monthly), [monthly]);
  const animMonthsDiff = useAnimatedNumber(monthsDiff);
  const animMonthly = useAnimatedNumber(monthly, 300);

  // Entrance count-up animation for the hero number
  const [countedSaving, setCountedSaving] = useState(0);
  useEffect(() => {
    let frame;
    const duration = 1100;
    const start = performance.now();
    const to = saving;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setCountedSaving(Math.round(to * ease));
      if (t < 1) frame = requestAnimationFrame(tick);
      else setCountedSaving(to);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [saving]);

  const dismissSheet = () => {
    if (sheetClosing) return;
    setSheetClosing(true);
    setTimeout(() => { setSheetOpen(null); setSheetClosing(false); setDragOffset(0); setIsDragging(false); }, 230);
  };
  const onDragStart = (y) => { dragStartY.current = y; setIsDragging(true); };
  const onDragMove = (y) => {
    if (dragStartY.current == null || !isDragging) return;
    const d = y - dragStartY.current;
    if (d > 0) setDragOffset(Math.min(d, 360));
  };
  const onDragEnd = () => {
    if (dragOffset > 100) dismissSheet();
    else { setDragOffset(0); setIsDragging(false); }
    dragStartY.current = null;
  };

  const savingL = (countedSaving / 100000).toFixed(2);
  const savingLFinal = (saving / 100000).toFixed(2);

  // Monthly interest on ₹5L at 54% p.a. (for minimum-due sheet)
  const monthlyInterestOnDebt = Math.round(500000 * 0.54 / 12);

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#F4F3FB', animation: 'fadeIn .35s', position: 'relative' }}>

      {/* ── NAV ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 16px 0', flexShrink: 0 }}>
        <button onClick={() => go('selling')} style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer' }}>
          {Icon.back('#5B3FD4')}
        </button>
        <span style={{ fontWeight: 850, fontSize: 18, color: '#5B3FD4', letterSpacing: -0.5 }}>melt</span>
        <div style={{ width: 38 }} />
      </div>

      {/* ── EMI ADJUSTER ── */}
      <div style={{ margin: '10px 16px 0', background: '#FFFFFF', borderRadius: 18, padding: '12px 16px', boxShadow: '0 2px 12px rgba(91,63,212,0.07)', border: '1px solid #EAE6F8', animation: 'fadeUp .5s both' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, color: '#6E6B82', fontWeight: 600 }}>See your savings with:</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => setMonthly(m => Math.max(MIN, m - STEP))} disabled={monthly <= MIN}
              style={{ width: 28, height: 28, borderRadius: 999, border: '1.5px solid #C4B5FD', background: '#F6F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: monthly <= MIN ? 'not-allowed' : 'pointer', opacity: monthly <= MIN ? 0.4 : 1 }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke="#5B3FD4" strokeWidth="3.5" strokeLinecap="round" /></svg>
            </button>
            <span style={{ fontWeight: 900, fontSize: 16, color: '#1B192E', fontFamily: 'Sora, sans-serif', minWidth: 72, textAlign: 'center', letterSpacing: -0.5 }}>{inr(animMonthly)}<span style={{ fontSize: 10, fontWeight: 600, color: '#88859E', marginLeft: 2 }}>/mo</span></span>
            <button onClick={() => setMonthly(m => Math.min(MAX, m + STEP))} disabled={monthly >= MAX}
              style={{ width: 28, height: 28, borderRadius: 999, border: '1.5px solid #C4B5FD', background: '#F6F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: monthly >= MAX ? 'not-allowed' : 'pointer', opacity: monthly >= MAX ? 0.4 : 1 }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="#5B3FD4" strokeWidth="3.5" strokeLinecap="round" /></svg>
            </button>
          </div>
        </div>
        <div style={{ marginTop: 6, paddingTop: 6, borderTop: '1px solid #F0ECFA', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 10, color: '#88859E', fontWeight: 600 }}>Current card debt</span>
          <span style={{ fontSize: 12, fontWeight: 800, color: '#1B192E', fontFamily: 'Sora, sans-serif', letterSpacing: -0.3 }}>₹5,00,000</span>
        </div>
      </div>

      {/* ── COMPARISON ── */}
      <div style={{ margin: '12px 16px 0', animation: 'fadeUp .55s .06s both' }}>
        <div style={{ fontSize: 10.5, fontWeight: 800, color: '#88859E', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8, paddingLeft: 2 }}>Why Melt?</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'stretch', padding: '4px 0' }}>
          {/* Credit Cards (Red Card) */}
          <div style={{
            flex: 1,
            background: 'linear-gradient(145deg, rgba(255,232,232,0.85) 0%, rgba(255,245,245,0.5) 50%, rgba(255,255,255,0.96) 100%)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: 20,
            padding: '18px 10px 10px',
            border: '1px solid rgba(252,165,165,0.5)',
            boxShadow: 'inset 0 1.5px 0.5px rgba(255,255,255,0.85), 0 8px 24px -6px rgba(220,38,38,0.06)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            minHeight: 200
          }}>
            <div style={{ fontSize: 9.5, fontWeight: 800, color: '#DC2626', letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 2 }}>Credit Cards</div>
            <div style={{ fontSize: 34, fontWeight: 900, color: '#DC2626', fontFamily: 'Sora, sans-serif', letterSpacing: -1, lineHeight: 1.1 }}>54%</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#EF4444', marginBottom: 10 }}>p.a. interest</div>
            <div style={{
              height: 74, display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'float 3.5s ease-in-out infinite',
              filter: 'drop-shadow(0 4px 10px rgba(110,160,220,0.18))',
              marginBottom: 4
            }}>
              <IceCube size={70} />
            </div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3, borderTop: '1px solid rgba(220,38,38,0.12)', marginTop: 'auto', paddingTop: 6 }}>
              <div style={{ fontSize: 10, color: '#7C788A', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                <span>Interest</span>
                <span style={{ color: '#1B192E', fontWeight: 700, fontFamily: 'Sora, sans-serif' }}>{lakh(cardsInt)}</span>
              </div>
              <div style={{ fontSize: 10, color: '#7C788A', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                <span>Total Pay</span>
                <span style={{ color: '#DC2626', fontWeight: 800, fontFamily: 'Sora, sans-serif' }}>{lakh(500000 + cardsInt)}</span>
              </div>
            </div>
          </div>


          {/* With Melt (Purple Card — identical size) */}
          <div style={{
            flex: 1,
            background: 'linear-gradient(145deg, rgba(246,243,255,0.92) 0%, rgba(250,248,255,0.6) 50%, rgba(255,255,255,0.98) 100%)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: 20,
            padding: '18px 10px 10px',
            border: '2px solid #5B3FD4',
            boxShadow: 'inset 0 1.5px 0.5px rgba(255,255,255,0.95), 0 10px 28px -6px rgba(91,63,212,0.14)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            minHeight: 200
          }}>
            <div style={{ fontSize: 9.5, fontWeight: 800, color: '#5B3FD4', letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 2 }}>With Melt</div>
            <div style={{ fontSize: 34, fontWeight: 900, color: '#5B3FD4', fontFamily: 'Sora, sans-serif', letterSpacing: -1, lineHeight: 1.1 }}>25%</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#7C5CE7', marginBottom: 10 }}>p.a. interest</div>
            <div style={{
              height: 74, display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'float 3.5s ease-in-out infinite 1.75s',
              filter: 'drop-shadow(0 4px 12px rgba(245,158,11,0.25))',
              marginBottom: 4
            }}>
              <Puddle size={70} />
            </div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3, borderTop: '1px solid rgba(91,63,212,0.15)', marginTop: 'auto', paddingTop: 6 }}>
              <div style={{ fontSize: 10, color: '#7C788A', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                <span>Interest</span>
                <span style={{ color: '#1B192E', fontWeight: 700, fontFamily: 'Sora, sans-serif' }}>{lakh(meltInt)}</span>
              </div>
              <div style={{ fontSize: 10, color: '#7C788A', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                <span>Total Pay</span>
                <span style={{ color: '#5B3FD4', fontWeight: 800, fontFamily: 'Sora, sans-serif' }}>{lakh(500000 + meltInt)}</span>
              </div>
            </div>
            {/* RECOMMENDED tag — top-right corner */}
            <div style={{
              position: 'absolute', top: -12, right: -6,
              background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
              borderRadius: 5, padding: '2px 6px',
              boxShadow: '0 2px 6px rgba(22,163,74,0.3)'
            }}>
              <span style={{ fontSize: 6.5, fontWeight: 900, color: '#fff', letterSpacing: 0.5 }}>RECOMMENDED</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── HERO SAVINGS CARD ── */}
      <div style={{
        margin: '12px 16px 0',
        background: 'linear-gradient(135deg, #0F764E 0%, #15A26B 60%, #17B276 100%)',
        borderRadius: 22, padding: '14px 18px 12px',
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(16,185,129,0.22)',
        animation: 'fadeUp .6s .1s both',
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
      }}>
        <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.75)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 2, zIndex: 1 }}>
          Total Interest Saved
        </div>
        <div style={{ zIndex: 1, margin: '2px 0 1px' }}>
          <span style={{ fontSize: 36, fontWeight: 900, color: '#FFFFFF', fontFamily: 'Sora, sans-serif', letterSpacing: -1, lineHeight: 1 }}>
            {inr(countedSaving)}
          </span>
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 600, zIndex: 1 }}>
          by switching to Melt
        </div>
      </div>

      {/* ── BENEFITS ── */}
      <div style={{ margin: '10px 16px 0', animation: 'fadeUp .62s .12s both' }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: '#88859E', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 6, paddingLeft: 2 }}>Your Benefits</div>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{
            flex: 1, background: '#FFFFFF', borderRadius: 14, padding: '10px 8px 8px',
            border: '1px solid #D1FAE5', textAlign: 'center',
            boxShadow: '0 2px 8px rgba(16,185,129,0.06)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="6" width="20" height="12" rx="2" stroke="#10B981" strokeWidth="2" />
              <circle cx="12" cy="12" r="3" stroke="#10B981" strokeWidth="2" />
            </svg>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: '#065F46', lineHeight: 1.15, letterSpacing: -0.3 }}>{lakh(saving)}</div>
            <div style={{ fontSize: 8.5, fontWeight: 600, color: '#6B7280' }}>Interest Saved</div>
          </div>
          <div style={{
            flex: 1, background: '#FFFFFF', borderRadius: 14, padding: '10px 8px 8px',
            border: '1px solid #DDD6FE', textAlign: 'center',
            boxShadow: '0 2px 8px rgba(91,63,212,0.04)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#7C3AED" strokeWidth="2" />
              <polyline points="12 7 12 12 15.5 14" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: '#4C1D95', lineHeight: 1.15, letterSpacing: -0.3 }}>{monthsDiff} months</div>
            <div style={{ fontSize: 8.5, fontWeight: 600, color: '#6B7280' }}>Debt-Free Faster</div>
          </div>
          <div style={{
            flex: 1, background: '#FFFFFF', borderRadius: 14, padding: '10px 8px 8px',
            border: '1px solid #BFDBFE', textAlign: 'center',
            boxShadow: '0 2px 8px rgba(59,130,246,0.04)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="16 7 22 7 22 13" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: '#1E3A8A', lineHeight: 1.15, letterSpacing: -0.3 }}>Better</div>
            <div style={{ fontSize: 8.5, fontWeight: 600, color: '#6B7280' }}>Credit Score</div>
          </div>
        </div>
        {/* Visualise button */}
        <button onClick={() => go('visualise')} style={{
          width: '100%', marginTop: 10, padding: '6px 0',
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
          transition: 'transform 0.15s, opacity 0.15s'
        }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.96)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: '#5B3FD4', letterSpacing: -0.2 }}>Visualise My Savings</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginTop: 1.5 }}>
            <path d="M5 12h14m0 0l-5-5m5 5l-5 5" stroke="#5B3FD4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* ── UNDERSTANDING CREDIT CARD DEBT ── */}
      <div style={{ margin: '10px 16px 0', animation: 'fadeUp .64s .14s both' }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: '#88859E', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 6, paddingLeft: 2 }}>Understanding Credit Card Debt</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <button onClick={() => setSheetOpen('interest')} style={{
            display: 'flex', alignItems: 'center', gap: 10, width: '100%',
            background: '#FFFFFF', padding: '10px 12px', borderRadius: 14,
            border: '1px solid #EAE6F8', cursor: 'pointer', textAlign: 'left',
            boxShadow: '0 2px 8px rgba(91,63,212,0.04)'
          }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: '#FFF0F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#DC2626" strokeWidth="2" /><path d="M12 7v5l3 2" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" /></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#15122F', letterSpacing: -0.2 }}>How credit card interest works</div>
              <div style={{ fontSize: 9.5, color: '#88859E', fontWeight: 500, marginTop: 1 }}>Why 54% p.a. makes your debt grow fast</div>
            </div>
            <span style={{ flexShrink: 0 }}>{Icon.chevR('#C4B5FD', 14)}</span>
          </button>
          <button onClick={() => setSheetOpen('minimum')} style={{
            display: 'flex', alignItems: 'center', gap: 10, width: '100%',
            background: '#FFFFFF', padding: '10px 12px', borderRadius: 14,
            border: '1px solid #EAE6F8', cursor: 'pointer', textAlign: 'left',
            boxShadow: '0 2px 8px rgba(91,63,212,0.04)'
          }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: '#FFF8EC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke="#D97706" strokeWidth="2" /><path d="M2 10h20" stroke="#D97706" strokeWidth="2" /></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#15122F', letterSpacing: -0.2 }}>What if you just pay minimum?</div>
              <div style={{ fontSize: 9.5, color: '#88859E', fontWeight: 500, marginTop: 1 }}>See where your money actually goes</div>
            </div>
            <span style={{ flexShrink: 0 }}>{Icon.chevR('#C4B5FD', 14)}</span>
          </button>
        </div>
      </div>

      {/* ── TRUST ROW ── */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, margin: '8px 16px 0', animation: 'fadeUp .66s .16s both' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="#5B3FD4" strokeWidth="2" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#5B3FD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#5B3FD4' }}>Foreclose anytime</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="5" y="10" width="14" height="10" rx="2" stroke="#5B3FD4" strokeWidth="2" /><path d="M8 10V7a4 4 0 018 0v3" stroke="#5B3FD4" strokeWidth="2" /><circle cx="12" cy="15" r="1.5" fill="#5B3FD4" /></svg>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#5B3FD4' }}>No hidden charges</span>
        </div>
      </div>

      {/* ── DISCLAIMER ── */}
      <div style={{ fontSize: 8.5, color: '#AAAABC', textAlign: 'center', padding: '4px 24px 80px', lineHeight: 1.35, animation: 'fadeUp .68s .18s both' }}>
        Illustrative, based on ₹5L debt &amp; {inr(monthly)}/mo. Actual savings shown after card details.
      </div>

      {/* ── BOTTOM SHEETS ── */}
      {sheetOpen && (() => {
        const portalContainer = typeof document !== 'undefined' ? document.getElementById('phone-scroll-viewport')?.parentNode : null;
        if (!portalContainer) return null;
        return ReactDOM.createPortal(
          <>
            <div onClick={dismissSheet}
              onTouchMove={e => e.preventDefault()}
              style={{ position: 'absolute', inset: 0, background: 'rgba(9,9,18,0.42)', zIndex: 20, opacity: sheetClosing ? 0 : 1, transition: 'opacity 230ms ease-out' }}
            />
            <div style={{
              position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 21,
              height: '58%', display: 'flex', flexDirection: 'column', background: '#fff',
              borderTopLeftRadius: 24, borderTopRightRadius: 24,
              boxShadow: '0 -18px 40px -18px rgba(20,14,57,0.45)',
              overflow: 'hidden',
              transform: sheetClosing ? 'translateY(100%)' : `translateY(${dragOffset}px)`,
              transition: isDragging ? 'none' : 'transform 240ms cubic-bezier(.2,.75,.2,1)',
            }}>
              <div
                onTouchStart={e => onDragStart(e.touches[0].clientY)}
                onTouchMove={e => onDragMove(e.touches[0].clientY)}
                onTouchEnd={onDragEnd}
                onMouseDown={e => onDragStart(e.clientY)}
                onMouseMove={e => onDragMove(e.clientY)}
                onMouseUp={onDragEnd}
                onMouseLeave={onDragEnd}
                style={{ cursor: 'grab', userSelect: 'none', flexShrink: 0 }}
              >
                <div style={{ width: 44, height: 5, borderRadius: 999, background: '#E0DCF0', margin: '10px auto 8px' }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 18px 12px', borderBottom: '1px solid #F0ECFA' }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: '#161331', letterSpacing: -0.3 }}>
                    {sheetOpen === 'interest' ? 'How Card Interest Grows' : 'Paying Only Minimum Due?'}
                  </div>
                  <button onClick={dismissSheet} style={{ fontSize: 13, fontWeight: 700, color: '#5B3FD4', background: '#F4F1FF', border: 'none', cursor: 'pointer', padding: '4px 10px', borderRadius: 8 }}>Close</button>
                </div>
              </div>

              <div key={sheetOpen} style={{ flex: 1, overflowY: 'auto', overscrollBehavior: 'contain', padding: '16px 18px 32px' }}>
                {sheetOpen === 'interest' ? (
                  <>
                    {/* Scenario context */}
                    <div style={{ background: '#F4F1FF', borderRadius: 14, padding: '10px 14px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #DDD6FE' }}>
                      {purpleCalcIcon}
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#5B3FD4', lineHeight: 1.4 }}>
                        Your example: <strong>₹5L debt</strong> · <strong>{inr(monthly)}/mo</strong> EMI · <strong>54% p.a.</strong>
                      </span>
                    </div>

                    {/* Receipt ledger */}
                    <div style={{ background: '#FAFAFA', borderRadius: 18, padding: '18px 16px', border: '1px solid #E8E4F5' }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: '#88859E', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 12, textAlign: 'center' }}>
                        What You Pay Over {nC} Months
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: '#5C5870' }}>Your Debt (Principal)</span>
                          <span style={{ fontSize: 14, fontWeight: 750, color: '#1B192E', fontFamily: 'Sora, sans-serif' }}>₹5,00,000</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#D32F2F', display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ width: 6, height: 6, borderRadius: 99, background: '#D32F2F', display: 'inline-block' }} />
                            Interest (54% p.a.)
                          </span>
                          <span style={{ fontSize: 14, fontWeight: 850, color: '#D32F2F', fontFamily: 'Sora, sans-serif' }}>+ {lakh(cardsInt)}</span>
                        </div>
                        <div style={{ borderTop: '1.5px dashed #E2DDF0', paddingTop: 10 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 14, fontWeight: 800, color: '#1B192E' }}>Total You Pay</span>
                            <span style={{ fontSize: 18, fontWeight: 900, color: '#1B192E', fontFamily: 'Sora, sans-serif' }}>{lakh(500000 + cardsInt)}</span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', height: 8, borderRadius: 99, overflow: 'hidden', marginTop: 16, background: '#EAE6F5' }}>
                        <div style={{ width: `${Math.round((500000 / (500000 + cardsInt)) * 100)}%`, background: 'linear-gradient(90deg, #7C5CE7, #5B3FD4)' }} />
                        <div style={{ flex: 1, background: 'linear-gradient(90deg, #E54B4B, #F06A6A)' }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10.5, fontWeight: 700 }}>
                        <span style={{ color: '#5B3FD4', display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: 99, background: '#5B3FD4', display: 'inline-block' }} /> Principal</span>
                        <span style={{ color: '#E54B4B', display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: 99, background: '#E54B4B', display: 'inline-block' }} /> Interest {lakh(cardsInt)}</span>
                      </div>

                      <div style={{ marginTop: 14, background: '#F0FDF4', borderRadius: 12, padding: '10px 12px', border: '1px solid #A3E2C9', fontSize: 12, color: '#047857', fontWeight: 600, lineHeight: 1.4, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        {lightbulbIcon('#047857')}
                        <span>
                          With Melt at 25% p.a., you'd pay <strong>{lakh(500000 + meltInt)}</strong> total — saving <strong>{lakh(saving)}</strong> in interest.
                        </span>
                      </div>
                    </div>

                    <div style={{ marginTop: 12, background: '#FFF9F0', borderRadius: 14, padding: '12px 14px', fontSize: 12.5, color: '#8A5A00', lineHeight: 1.5, fontWeight: 600, border: '1px solid #FFE4C4', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8A5A00" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
                      Interest accrues daily from the transaction date — the longer it stays, the more expensive it gets.
                    </div>
                  </>
                ) : (
                  <>
                    {/* Scenario context */}
                    <div style={{ background: '#F4F1FF', borderRadius: 14, padding: '10px 14px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #DDD6FE' }}>
                      {purpleCalcIcon}
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#5B3FD4', lineHeight: 1.4 }}>
                        Your example: <strong>₹5L debt</strong> · <strong>{inr(monthly)}/mo</strong> payment · <strong>54% p.a.</strong>
                      </span>
                    </div>

                    <div style={{ background: '#FAFAFA', borderRadius: 18, padding: '18px 16px', border: '1px solid #E8E4F5' }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: '#88859E', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 14, textAlign: 'center' }}>
                        Where your {inr(monthly)} goes each month
                      </div>
                      {(() => {
                        const principalPaid = Math.max(0, monthly - monthlyInterestOnDebt);
                        const interestPct = Math.min(100, Math.round((monthlyInterestOnDebt / monthly) * 100));
                        return (
                          <>
                            <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                              <div style={{ flex: 1, background: '#FFF5F5', border: '1.5px solid #FECACA', borderRadius: 14, padding: '12px 10px', textAlign: 'center' }}>
                                <div style={{ fontSize: 9, fontWeight: 800, color: '#DC2626', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 }}>Goes to Interest</div>
                                <div style={{ fontSize: 20, fontWeight: 900, color: '#DC2626', fontFamily: 'Sora, sans-serif' }}>{inr(monthlyInterestOnDebt)}</div>
                                <div style={{ fontSize: 9.5, color: '#EF4444', fontWeight: 700, marginTop: 2 }}>{interestPct}% of payment</div>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', color: '#88859E', fontSize: 18, fontWeight: 700 }}>+</div>
                              <div style={{ flex: 1, background: '#F0FDF4', border: '1.5px solid #A3E2C9', borderRadius: 14, padding: '12px 10px', textAlign: 'center' }}>
                                <div style={{ fontSize: 9, fontWeight: 800, color: '#1FA971', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 }}>Reduces Debt</div>
                                <div style={{ fontSize: 20, fontWeight: 900, color: '#1FA971', fontFamily: 'Sora, sans-serif' }}>{inr(principalPaid)}</div>
                                <div style={{ fontSize: 9.5, color: '#1FA971', fontWeight: 700, marginTop: 2 }}>{100 - interestPct}% of payment</div>
                              </div>
                            </div>
                            <div style={{ height: 10, borderRadius: 99, overflow: 'hidden', background: '#EAE6F5', marginBottom: 10 }}>
                              <div style={{ height: '100%', width: `${interestPct}%`, background: 'linear-gradient(90deg, #E54B4B, #F06A6A)' }} />
                            </div>
                            <div style={{ background: '#FFF0F0', borderRadius: 12, padding: '10px 12px', border: '1px solid #FCA5A5', fontSize: 12, color: '#B91C1C', fontWeight: 600, lineHeight: 1.4, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                              {lightbulbIcon('#B91C1C')}
                              <span>
                                At 54% p.a., <strong>{interestPct}% of your {inr(monthly)}</strong> goes straight to interest — your ₹5L debt barely shrinks.
                              </span>
                            </div>
                          </>
                        );
                      })()}
                    </div>

                    <div style={{ marginTop: 12, background: 'linear-gradient(90deg, #F3F1FA, #FAFAFD)', borderRadius: 14, padding: '14px 16px', borderLeft: '4px solid #5B3FD4', fontSize: 12.5, color: '#4B4960', lineHeight: 1.5, fontWeight: 600 }}>
                      <span style={{ fontSize: 10, fontWeight: 800, color: '#5B3FD4', letterSpacing: 0.8, textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Advisory</span>
                      With Melt at 25% p.a., a much larger share of your {inr(monthly)} pays down your actual debt — clearing it <strong>{monthsDiff} months sooner</strong>.
                    </div>
                  </>
                )}
              </div>
            </div>
          </>,
          portalContainer
        );
      })()}

      {/* ── STICKY CTA ── */}
      <BottomBar bg="rgba(244,243,251,0.95)">
        <button onClick={() => go('cards')} style={{
          width: '100%', height: 56, borderRadius: 16,
          background: 'linear-gradient(135deg, #5B3FD4 0%, #3D3DC4 100%)',
          color: '#fff', fontWeight: 700, fontSize: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
          boxShadow: '0 8px 22px rgba(91,63,212,0.3)', border: 'none', cursor: 'pointer',
        }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(.975)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          Select my card {Icon.arrowR('#fff')}
        </button>
      </BottomBar>
    </div>
  );
}

Object.assign(window, { SellingStories, SavingsScreen });
