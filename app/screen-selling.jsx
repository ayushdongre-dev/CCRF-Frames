// screen-selling.jsx — General Selling
// Page 1 (story mode): animated credit-card hero "Settle All Your Credit Cards".
// After it, the flow moves to a SEPARATE, non-story Savings screen (below).

// ── Animated credit-card stack: shuffles in, number + name type in ──
function AnimCard({ playKey }) {
  const full = '1221 3677 8210 0223';
  const name = 'AYUSH D.';
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
        boxShadow: '0 2px 12px rgba(0,0,0,.14), 0 8px 24px rgba(75,53,150,.28)', overflow: 'hidden',
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
        <linearGradient id="iceTp" x1="20" y1="16" x2="100" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#EBF6FF"/><stop offset="1" stopColor="#B8DCFA"/>
        </linearGradient>
        <linearGradient id="iceLt" x1="20" y1="40" x2="60" y2="104" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#72ACD9"/><stop offset="1" stopColor="#3E80BC"/>
        </linearGradient>
        <linearGradient id="iceRt" x1="100" y1="40" x2="60" y2="104" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#A4C8EC"/><stop offset="1" stopColor="#6CA4D6"/>
        </linearGradient>
        <filter id="iceSh" x="-40%" y="-30%" width="180%" height="180%"><feGaussianBlur stdDeviation="3.2"/></filter>
      </defs>
      {/* Drop shadow */}
      <ellipse cx="60" cy="110" rx="32" ry="5.5" fill="#1A3F7A" opacity="0.22" filter="url(#iceSh)"/>
      {/* Cube faces */}
      <polygon points="20,40 60,60 60,104 20,84" fill="url(#iceLt)"/>
      <polygon points="100,40 60,60 60,104 100,84" fill="url(#iceRt)"/>
      <polygon points="20,40 60,18 100,40 60,60" fill="url(#iceTp)"/>
      {/* Top highlight */}
      <polygon points="34,38 60,22 86,38 60,52" fill="white" opacity="0.28"/>
      {/* Credit card frozen inside — large, clear, prominent */}
      <g transform="translate(60,76) rotate(-4)">
        <rect x="-22" y="-14" width="44" height="28" rx="5" fill="#DAEEFB"/>
        <rect x="-22" y="-14" width="44" height="28" rx="5" fill="rgba(170,215,250,0.35)"/>
        <rect x="-22" y="-14" width="44" height="28" rx="5" fill="none" stroke="rgba(110,170,220,0.55)" strokeWidth="1.5"/>
        {/* Chip */}
        <rect x="-14" y="-8" width="11" height="8" rx="2" fill="#88B8D8"/>
        <rect x="-14" y="-8" width="11" height="8" rx="2" fill="none" stroke="#6AA2CC" strokeWidth="1"/>
        {/* Rupee — large and unmistakable */}
        <text x="10" y="8" textAnchor="middle" fontSize="16" fontWeight="900" fill="#2E6EA8" fontFamily="sans-serif" opacity="0.82">₹</text>
        {/* Freeze cracks */}
        <rect x="-14" y="8" width="30" height="2.5" rx="1.2" fill="#88B8D8" opacity="0.75"/>
        {/* Shine */}
        <polygon points="-22,-14 -8,-14 -18,14 -22,14" fill="white" opacity="0.15"/>
      </g>
      {/* Cube edges */}
      <polygon points="20,40 60,18 100,40 60,60" fill="none" stroke="white" strokeOpacity="0.65" strokeWidth="1.5" strokeLinejoin="round"/>
      <line x1="60" y1="60" x2="60" y2="104" stroke="white" strokeOpacity="0.40" strokeWidth="1.2"/>
      <line x1="20" y1="40" x2="20" y2="84" stroke="white" strokeOpacity="0.26" strokeWidth="1"/>
      <line x1="100" y1="40" x2="100" y2="84" stroke="white" strokeOpacity="0.26" strokeWidth="1"/>
      {/* Ice sparkles */}
      <circle cx="82" cy="47" r="2.2" fill="white" opacity="0.72"/>
      <circle cx="36" cy="52" r="1.6" fill="white" opacity="0.60"/>
      <circle cx="72" cy="28" r="1.5" fill="white" opacity="0.55"/>
      <circle cx="42" cy="30" r="1" fill="white" opacity="0.50"/>
    </svg>
  );
}

// ── HERO ILLUSTRATION 2: melted puddle, credit card freed and gleaming ──
function Puddle({ size = 112, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden="true" style={style}>
      <defs>
        <radialGradient id="pudWater" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#93D7F8"/><stop offset="60%" stopColor="#38B2ED"/><stop offset="100%" stopColor="#0B82C4"/>
        </radialGradient>
        <linearGradient id="goldCard" x1="34" y1="30" x2="86" y2="68" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF4BB"/><stop offset="45%" stopColor="#FFD700"/><stop offset="100%" stopColor="#C88E00"/>
        </linearGradient>
        <filter id="cardHalo" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#F59E0B" floodOpacity="0.52"/>
        </filter>
        <filter id="pudSh" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3"/></filter>
      </defs>
      {/* Puddle glow */}
      <ellipse cx="60" cy="106" rx="38" ry="8" fill="#38B2ED" opacity="0.16" filter="url(#pudSh)"/>
      {/* Puddle */}
      <ellipse cx="60" cy="101" rx="44" ry="11" fill="url(#pudWater)"/>
      <ellipse cx="47" cy="97.5" rx="14" ry="3.5" fill="white" opacity="0.36"/>
      {/* Small melting ice remnant */}
      <polygon points="46,88 60,80 74,88 60,96" fill="#C4E8F8" opacity="0.65"/>
      <polygon points="46,88 60,96 60,108 46,100" fill="#88C0E0" opacity="0.55"/>
      <polygon points="74,88 60,96 60,108 74,100" fill="#A0CCEA" opacity="0.55"/>
      <path d="M44,88 L60,80 L76,88" fill="none" stroke="white" strokeOpacity="0.6" strokeWidth="1.1" strokeLinejoin="round"/>
      {/* Freed credit card — bold gold, prominent */}
      <g filter="url(#cardHalo)">
        <g transform="rotate(-17, 60, 50)">
          <rect x="34" y="28" width="52" height="34" rx="5.5" fill="url(#goldCard)"/>
          <rect x="34" y="28" width="52" height="34" rx="5.5" fill="none" stroke="#B8860B" strokeWidth="1.2" strokeOpacity="0.75"/>
          {/* Chip */}
          <rect x="41" y="36" width="11" height="8" rx="2" fill="rgba(255,255,255,0.88)"/>
          <rect x="43" y="38" width="7" height="4" rx="1" fill="#D4A017" opacity="0.35"/>
          {/* Rupee — large, clear */}
          <text x="70" y="52" textAnchor="middle" fontSize="14" fontWeight="900" fill="#7A4A08" fontFamily="sans-serif">₹</text>
          {/* Emboss lines */}
          <rect x="41" y="50" width="38" height="2.2" rx="1.1" fill="#FBBF24" opacity="0.72"/>
          <rect x="41" y="54.5" width="24" height="2.2" rx="1.1" fill="#FBBF24" opacity="0.62"/>
          {/* Card shine */}
          <polygon points="34,28 50,28 40,62 34,62" fill="white" opacity="0.17"/>
        </g>
      </g>
      {/* Water drops */}
      <path d="M54,97 q-1,6 0,10 q1,-4 0,-10 Z" fill="#7DD3FC" opacity="0.88"/>
      <path d="M68,97 q-1,5 0,9 q1,-4 0,-9 Z" fill="#7DD3FC" opacity="0.78"/>
      {/* Freedom sparkles */}
      <path d="M89 24 l1.2 3 3 1.2 -3 1.2 -1.2 3 -1.2-3 -3-1.2 3-1.2z" fill="#FCD34D" opacity="0.92"/>
      <path d="M23 20 l1.2 3 3 1.2 -3 1.2 -1.2 3 -1.2-3 -3-1.2 3-1.2z" fill="#FCD34D" opacity="0.90"/>
      <circle cx="95" cy="38" r="2.2" fill="#FCD34D" opacity="0.78"/>
      <circle cx="18" cy="36" r="1.6" fill="#FCD34D" opacity="0.65"/>
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
  const [showRateInfo, setShowRateInfo] = useState(false);
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

      {/* Rate info click-away + popup — fixed so they escape scroll-container clipping */}
      {showRateInfo && (
        <div onClick={function(){ setShowRateInfo(false); }} style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'transparent' }} />
      )}
      {showRateInfo && (
        <div style={{ position: 'fixed', left: '50%', top: '37%', transform: 'translate(-82%, 0)', zIndex: 100, background: '#fff', borderRadius: 14, padding: '14px 16px', boxShadow: '0 12px 36px rgba(220,38,38,0.13), 0 2px 10px rgba(0,0,0,0.07)', border: '1px solid #FED7D7', animation: 'fadeIn .15s', minWidth: 196 }}>
          {/* Title */}
          <div style={{ fontSize: 12, fontWeight: 800, color: '#1B192E', marginBottom: 10, letterSpacing: -0.2 }}>Hidden costs</div>
          {/* Rows */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
            <span style={{ fontSize: 11, color: '#6B7280', fontWeight: 500 }}>Monthly interest rate</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#374151' }}>3.75%</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 11, color: '#6B7280', fontWeight: 500 }}>GST on interest</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#374151' }}>18%</span>
          </div>
          {/* Total */}
          <div style={{ background: '#FFF5F5', borderRadius: 8, padding: '8px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#6B7280' }}>Effective p.a.</span>
            <span style={{ fontSize: 15, fontWeight: 900, color: '#DC2626', fontFamily: 'Sora, sans-serif', letterSpacing: -0.3 }}>= 54%</span>
          </div>
        </div>
      )}

      {/* ── NAV ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 16px 0', flexShrink: 0 }}>
        <button onClick={() => go('selling')} style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer' }}>
          {Icon.back('#5B3FD4')}
        </button>
        <span style={{ fontWeight: 850, fontSize: 18, color: '#5B3FD4', letterSpacing: -0.5 }}>melt</span>
        <div style={{ width: 38 }} />
      </div>

      {/* ── PAGE TITLE ── */}
      <div style={{ padding: '0 20px 8px', flexShrink: 0, animation: 'fadeUp .4s both', textAlign: 'center' }}>
        <div style={{ fontSize: 20, fontWeight: 900, color: '#1B192E', lineHeight: 1.18, letterSpacing: -0.6, fontFamily: 'Sora, sans-serif' }}>
          Your Money is <span style={{ color: '#5B3FD4' }}>Frozen</span><br />in Card Debt
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 8, background: 'rgba(237,232,255,0.55)', borderRadius: 10, padding: '4px 14px', border: '1px solid rgba(196,181,253,0.35)' }}>
          <span style={{ fontSize: 10, color: '#9896B0', fontWeight: 600 }}>Card debt</span>
          <div style={{ width: 1, height: 10, background: 'rgba(196,181,253,0.5)' }} />
          <span style={{ fontSize: 13.5, fontWeight: 900, color: '#1B192E', fontFamily: 'Sora, sans-serif', letterSpacing: -0.4 }}>₹5,00,000</span>
        </div>
      </div>

      {/* ── COMPARISON ── */}
      <div style={{ margin: '12px 16px 0', animation: 'fadeUp .55s .06s both' }}>
        <div style={{ fontSize: 9.5, fontWeight: 700, color: '#AEACC4', letterSpacing: 1.1, textTransform: 'uppercase', marginBottom: 10, paddingLeft: 2 }}>Why Melt?</div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '4px 0 6px', position: 'relative' }}>

          {/* Arrow — clean, centred */}
          <div style={{
            position: 'absolute', left: '50%', top: '46%',
            transform: 'translate(-50%, -50%)',
            width: 26, height: 26, borderRadius: '50%',
            background: '#fff', zIndex: 3,
            boxShadow: '0 2px 10px rgba(91,63,212,0.16)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="#5B3FD4" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Current card — muted, recedes */}
          <div style={{
            flex: 1, borderRadius: 20, padding: '16px 10px 16px',
            background: 'rgba(255,242,242,0.6)',
            border: '1px solid rgba(252,165,165,0.22)',
            boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 4px 12px rgba(220,38,38,.07)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
            opacity: 0.88,
          }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#EF4444', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 2 }}>Your Card Now</div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 3 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#DC2626', fontFamily: 'Sora, sans-serif', letterSpacing: -1, lineHeight: 1.1 }}>54%</div>
              <button
                onClick={function(e){ e.stopPropagation(); setShowRateInfo(function(v){ return !v; }); }}
                style={{ marginTop: 5, width: 16, height: 16, borderRadius: '50%', border: '1px solid rgba(220,38,38,0.35)', background: 'rgba(220,38,38,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, padding: 0 }}>
                <span style={{ fontSize: 10, fontWeight: 900, color: '#DC2626', lineHeight: 1, fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>i</span>
              </button>
            </div>
            <div style={{ fontSize: 8.5, fontWeight: 600, color: '#EF4444', marginBottom: 10, opacity: 0.75 }}>p.a. interest</div>
            <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'float 3.5s ease-in-out infinite' }}>
              <IceCube size={66} />
            </div>
          </div>

          {/* Melt card — elevated winner */}
          <div style={{
            flex: 1, borderRadius: 20, padding: '16px 10px 16px',
            background: 'linear-gradient(145deg, #EDE8FF 0%, #F5F3FF 55%, #fff 100%)',
            border: '2px solid #5B3FD4',
            boxShadow: '0 1px 4px rgba(91,63,212,.10), 0 4px 16px rgba(91,63,212,.12)',
            transform: 'translateY(-4px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
            position: 'relative',
          }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#5B3FD4', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 2 }}>With Melt</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: '#5B3FD4', fontFamily: 'Sora, sans-serif', letterSpacing: -1, lineHeight: 1.1 }}>25%</div>
            <div style={{ fontSize: 8.5, fontWeight: 700, color: '#7C5CE7', marginBottom: 10 }}>p.a. interest</div>
            <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'float 3.5s ease-in-out infinite 1.75s', filter: 'drop-shadow(0 4px 12px rgba(245,158,11,0.25))' }}>
              <Puddle size={66} />
            </div>
          </div>
        </div>
      </div>

      {/* ── HERO SAVINGS CARD ── */}
      <div style={{
        margin: '8px 16px 0',
        background: 'linear-gradient(145deg, #0A6640 0%, #0F8A56 55%, #13A86A 100%)',
        borderRadius: 24, padding: '18px 16px 14px',
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 16px 40px -6px rgba(10,102,64,0.30), 0 6px 14px rgba(10,102,64,0.10)',
        animation: 'fadeUp .6s .1s both',
      }}>
        <div style={{ position: 'absolute', top: -40, right: -20, width: 150, height: 150, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.09) 0%, transparent 65%)', pointerEvents: 'none' }} />

        {/* Amount — primary */}
        <div style={{ textAlign: 'center', marginBottom: 12, position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.52)', letterSpacing: 1.8, textTransform: 'uppercase', marginBottom: 6 }}>You'll Save</div>
          <div style={{ fontSize: 54, fontWeight: 900, color: '#fff', fontFamily: 'Sora, sans-serif', letterSpacing: -2.5, lineHeight: 1 }}>{inr(countedSaving)}</div>
        </div>

        {/* Months — secondary pill */}
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.13)', borderRadius: 999, padding: '5px 12px 5px 9px', border: '1px solid rgba(255,255,255,0.14)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            <span style={{ fontSize: 11.5, fontWeight: 600, color: 'rgba(255,255,255,0.78)', letterSpacing: 0.1 }}>{animMonthsDiff} months earlier · debt-free</span>
          </div>
        </div>
      </div>

      {/* ── EMI ADJUSTER ── */}
      <div style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 14, padding: '10px 16px', border: '1px solid rgba(196,181,253,0.28)', boxShadow: '0 4px 14px rgba(91,63,212,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, animation: 'fadeUp .58s .1s both' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#6E6B82', flex: 1, lineHeight: 1.3 }}>Visualise with monthly payment:</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <button onClick={() => setMonthly(m => Math.max(MIN, m - STEP))} disabled={monthly <= MIN}
            style={{ width: 28, height: 28, borderRadius: 999, border: '1px solid rgba(196,181,253,0.5)', background: '#F6F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: monthly <= MIN ? 'not-allowed' : 'pointer', opacity: monthly <= MIN ? 0.35 : 1 }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke="#5B3FD4" strokeWidth="3" strokeLinecap="round" /></svg>
          </button>
          <span style={{ fontWeight: 900, fontSize: 15, color: '#1B192E', fontFamily: 'Sora, sans-serif', letterSpacing: -0.5, minWidth: 64, textAlign: 'center' }}>{inr(animMonthly)}<span style={{ fontSize: 10, fontWeight: 500, color: '#AEACC4', marginLeft: 2 }}>/mo</span></span>
          <button onClick={() => setMonthly(m => Math.min(MAX, m + STEP))} disabled={monthly >= MAX}
            style={{ width: 28, height: 28, borderRadius: 999, border: '1px solid rgba(196,181,253,0.5)', background: '#F6F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: monthly >= MAX ? 'not-allowed' : 'pointer', opacity: monthly >= MAX ? 0.35 : 1 }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="#5B3FD4" strokeWidth="3" strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>

      {/* ── VISUALISE BUTTON ── */}
      <div style={{ margin: '10px 16px 0', textAlign: 'center' }}>
        <button onClick={() => go('visualise')} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 0',
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B3FD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
          </svg>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#5B3FD4', textDecoration: 'underline', textDecorationColor: 'rgba(91,63,212,0.3)', textUnderlineOffset: '3px' }}>Visualise My Savings</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14m0 0l-5-5m5 5l-5 5" stroke="#5B3FD4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* ── LEARN MORE ── */}
      <div style={{ margin: '10px 16px 0', animation: 'fadeUp .64s .14s both' }}>
        <span style={{ fontSize: 10, fontWeight: 800, color: '#88859E', letterSpacing: 0.8, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Learn more</span>
        <button onClick={() => setSheetOpen('interest')} style={{
          display: 'flex', alignItems: 'center', gap: 10, width: '100%',
          background: '#F5F3FF', padding: '11px 12px', border: '1px solid rgba(196,181,253,0.35)',
          borderRadius: 12, outline: 'none', cursor: 'pointer', textAlign: 'left', marginBottom: 8,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#9B96C8" strokeWidth="1.8"/><path d="M12 7v5l3 2" stroke="#9B96C8" strokeWidth="1.8" strokeLinecap="round"/></svg>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: '#4B4960', flex: 1 }}>How credit card interest works</span>
          {Icon.chevR('#A89FD4', 12)}
        </button>
        <button onClick={() => setSheetOpen('minimum')} style={{
          display: 'flex', alignItems: 'center', gap: 10, width: '100%',
          background: '#F5F3FF', padding: '11px 12px', border: '1px solid rgba(196,181,253,0.35)',
          borderRadius: 12, outline: 'none', cursor: 'pointer', textAlign: 'left',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke="#9B96C8" strokeWidth="1.8"/></svg>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: '#4B4960', flex: 1 }}>What if you just pay minimum?</span>
          {Icon.chevR('#A89FD4', 12)}
        </button>
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
              height: sheetOpen === 'interest' ? '74%' : '76%', display: 'flex', flexDirection: 'column', background: '#fff',
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
                    {sheetOpen === 'interest' ? 'Compare Your Repayment' : 'Paying Only Minimum Due?'}
                  </div>
                  <button onClick={dismissSheet} style={{ fontSize: 13, fontWeight: 700, color: '#5B3FD4', background: '#F4F1FF', border: 'none', cursor: 'pointer', padding: '4px 10px', borderRadius: 8 }}>Close</button>
                </div>
              </div>

              <div key={sheetOpen} style={{ flex: 1, overflowY: 'auto', overscrollBehavior: 'contain', padding: '16px 18px 32px' }}>
                {sheetOpen === 'interest' ? (
                  <>
                    <div style={{ textAlign: 'center', fontSize: 11.5, color: '#A09DB8', fontWeight: 500, marginBottom: 18 }}>
                      ₹5,00,000 balance , {inr(monthly)}/mo payment
                    </div>

                    {/* ── Comparison table ── */}
                    <div style={{ borderRadius: 20, overflow: 'hidden', border: '1.5px solid #ECEAF4', marginBottom: 16, boxShadow: '0 1px 3px rgba(0,0,0,.05), 0 4px 14px rgba(0,0,0,.07)' }}>

                      {/* Column headers */}
                      <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr 1fr', background: '#FAFAFA' }}>
                        <div style={{ padding: '12px 14px', borderRight: '1px solid #F0EEF8' }} />
                        <div style={{ padding: '12px 8px', textAlign: 'center', borderRight: '1px solid #F0EEF8' }}>
                          <div style={{ fontSize: 10, fontWeight: 700, color: '#9896B0', letterSpacing: 0.5, textTransform: 'uppercase' }}>Credit Card</div>
                        </div>
                        <div style={{ padding: '12px 8px', textAlign: 'center', background: '#F0ECFF' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#5B3FD4', borderRadius: 999, padding: '4px 11px' }}>
                            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                              <path d="M2 5.5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span style={{ fontSize: 9.5, fontWeight: 800, color: '#fff', letterSpacing: 0.3 }}>With Melt</span>
                          </div>
                        </div>
                      </div>

                      {/* Row 1 — Interest Rate */}
                      <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr 1fr', borderTop: '1px solid #F0EEF8', background: '#fff' }}>
                        <div style={{ padding: '16px 14px', borderRight: '1px solid #F0EEF8', display: 'flex', alignItems: 'center' }}>
                          <div style={{ fontSize: 10.5, fontWeight: 600, color: '#6B6883', lineHeight: 1.3 }}>Interest Rate</div>
                        </div>
                        <div style={{ padding: '16px 8px', borderRight: '1px solid #F0EEF8', textAlign: 'center' }}>
                          <div style={{ fontSize: 28, fontWeight: 900, color: '#DC2626', fontFamily: 'Sora, sans-serif', letterSpacing: -1, lineHeight: 1 }}>54%</div>
                          <div style={{ fontSize: 9, color: '#C4C2D8', marginTop: 3, fontWeight: 500 }}>per annum</div>
                        </div>
                        <div style={{ padding: '16px 8px', textAlign: 'center', background: '#F5F2FF' }}>
                          <div style={{ fontSize: 28, fontWeight: 900, color: '#5B3FD4', fontFamily: 'Sora, sans-serif', letterSpacing: -1, lineHeight: 1 }}>25%</div>
                          <div style={{ fontSize: 9, color: '#A89FD4', marginTop: 3, fontWeight: 500 }}>per annum</div>
                        </div>
                      </div>

                      {/* Row 2 — Interest Paid */}
                      <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr 1fr', borderTop: '1px solid #F0EEF8', background: '#FAFAFA' }}>
                        <div style={{ padding: '16px 14px', borderRight: '1px solid #F0EEF8', display: 'flex', alignItems: 'center' }}>
                          <div style={{ fontSize: 10.5, fontWeight: 600, color: '#6B6883', lineHeight: 1.3 }}>Interest Paid</div>
                        </div>
                        <div style={{ padding: '16px 8px', borderRight: '1px solid #F0EEF8', textAlign: 'center' }}>
                          <div style={{ fontSize: 20, fontWeight: 900, color: '#374151', fontFamily: 'Sora, sans-serif', letterSpacing: -0.6, lineHeight: 1 }}>{lakh(cardsInt)}</div>
                          <div style={{ fontSize: 9, color: '#C4C2D8', marginTop: 3, fontWeight: 500 }}>total</div>
                        </div>
                        <div style={{ padding: '16px 8px', textAlign: 'center', background: '#F0ECFF' }}>
                          <div style={{ fontSize: 20, fontWeight: 900, color: '#5B3FD4', fontFamily: 'Sora, sans-serif', letterSpacing: -0.6, lineHeight: 1 }}>{lakh(meltInt)}</div>
                          <div style={{ fontSize: 9, color: '#A89FD4', marginTop: 3, fontWeight: 500 }}>total</div>
                        </div>
                      </div>

                      {/* Row 3 — Total You Pay */}
                      <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr 1fr', borderTop: '1.5px solid #E4E2F0', background: '#fff' }}>
                        <div style={{ padding: '18px 14px', borderRight: '1px solid #F0EEF8', display: 'flex', alignItems: 'center' }}>
                          <div style={{ fontSize: 10.5, fontWeight: 800, color: '#1B192E', lineHeight: 1.3 }}>Total You Pay</div>
                        </div>
                        <div style={{ padding: '18px 8px', borderRight: '1px solid #F0EEF8', textAlign: 'center' }}>
                          <div style={{ fontSize: 22, fontWeight: 900, color: '#1B192E', fontFamily: 'Sora, sans-serif', letterSpacing: -0.8, lineHeight: 1 }}>{lakh(500000 + cardsInt)}</div>
                        </div>
                        <div style={{ padding: '18px 8px', textAlign: 'center', background: '#EDE8FF' }}>
                          <div style={{ fontSize: 22, fontWeight: 900, color: '#4B2FBE', fontFamily: 'Sora, sans-serif', letterSpacing: -0.8, lineHeight: 1 }}>{lakh(500000 + meltInt)}</div>
                        </div>
                      </div>
                    </div>

                    {/* ── Savings card — light & eye-catching ── */}
                    <div style={{ background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)', borderRadius: 20, padding: '18px 20px', border: '1.5px solid #6EE7B7', display: 'flex', alignItems: 'center', boxShadow: '0 8px 28px -8px rgba(16,185,129,0.28)' }}>
                      <div style={{ width: 46, height: 46, borderRadius: 14, background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginRight: 14, boxShadow: '0 6px 18px -4px rgba(16,185,129,0.55)' }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" fill="#fff"/>
                        </svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 9.5, fontWeight: 800, color: '#059669', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>You Save with Melt</div>
                        <div style={{ fontSize: 32, fontWeight: 900, color: '#064E3B', fontFamily: 'Sora, sans-serif', letterSpacing: -1.5, lineHeight: 1, marginBottom: 4 }}>{lakh(saving)}</div>
                        <div style={{ fontSize: 11, color: '#059669', fontWeight: 600 }}>in total interest · {animMonthsDiff} months sooner</div>
                      </div>
                    </div>
                  </>
                ) : (
                  /* ── MINIMUM PAY — single unified card ── */
                  (() => {
                    var meltMonthlyInt = Math.round(500000 * 0.25 / 12);
                    var ccInt = monthlyInterestOnDebt;
                    var ccPrin = Math.max(0, monthly - ccInt);
                    var meltPrin = Math.max(0, monthly - meltMonthlyInt);
                    var extraPrin = meltPrin - ccPrin;
                    var ccIntPct = Math.min(98, Math.round(ccInt / monthly * 100));
                    var meltIntPct = Math.min(98, Math.round(meltMonthlyInt / monthly * 100));
                    return (
                      <>
                        {/* Subtitle */}
                        <div style={{ textAlign: 'center', fontSize: 11.5, color: '#A09DB8', fontWeight: 500, marginBottom: 18 }}>
                          Where your {inr(monthly)} goes each month
                        </div>

                        {/* ── Unified comparison card ── */}
                        <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', border: '1.5px solid #ECEAF4', marginBottom: 14, boxShadow: '0 1px 3px rgba(0,0,0,.05), 0 4px 14px rgba(0,0,0,.07)' }}>

                          {/* ─ Credit Card row ─ */}
                          <div style={{ padding: '16px 16px 15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                              <span style={{ fontSize: 12, fontWeight: 700, color: '#6B7280' }}>Credit Card</span>
                              <span style={{ fontSize: 9.5, fontWeight: 600, color: '#D1D5DB' }}>54% p.a.</span>
                            </div>
                            {/* Bar */}
                            <div style={{ height: 30, borderRadius: 8, overflow: 'hidden', display: 'flex', marginBottom: 9 }}>
                              <div style={{ flex: ccIntPct, background: '#FECACA', display: 'flex', alignItems: 'center', paddingLeft: 10 }}>
                                <span style={{ fontSize: 10.5, fontWeight: 800, color: '#DC2626' }}>{ccIntPct}%</span>
                              </div>
                              <div style={{ width: 2, background: '#fff', flexShrink: 0 }} />
                              <div style={{ flex: 100 - ccIntPct, background: '#EAE8F8', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 8 }}>
                                <span style={{ fontSize: 10.5, fontWeight: 800, color: '#B0ABCC' }}>{100 - ccIntPct}%</span>
                              </div>
                            </div>
                            {/* Amounts */}
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <div>
                                <span style={{ fontSize: 15, fontWeight: 900, color: '#DC2626', fontFamily: 'Sora, sans-serif', letterSpacing: -0.4 }}>{inr(ccInt)}</span>
                                <div style={{ fontSize: 9, color: '#F87171', fontWeight: 600, marginTop: 1 }}>interest</div>
                              </div>
                              <div style={{ textAlign: 'right' }}>
                                <span style={{ fontSize: 15, fontWeight: 900, color: '#9CA3AF', fontFamily: 'Sora, sans-serif', letterSpacing: -0.4 }}>{inr(ccPrin)}</span>
                                <div style={{ fontSize: 9, color: '#C4C2D8', fontWeight: 600, marginTop: 1 }}>reduces debt</div>
                              </div>
                            </div>
                          </div>

                          {/* ─ Divider ─ */}
                          <div style={{ height: 1, background: '#F0EEF8', margin: '0 16px' }} />

                          {/* ─ With Melt row ─ */}
                          <div style={{ padding: '16px 16px 15px', background: '#FAFAFF' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                                <span style={{ fontSize: 12, fontWeight: 700, color: '#5B3FD4' }}>With Melt</span>
                                <span style={{ background: '#5B3FD4', borderRadius: 999, padding: '2px 7px', fontSize: 7.5, fontWeight: 800, color: '#fff', letterSpacing: 0.3 }}>BETTER</span>
                              </div>
                              <span style={{ fontSize: 9.5, fontWeight: 600, color: '#A89FD4' }}>25% p.a.</span>
                            </div>
                            <div style={{ height: 30, borderRadius: 8, overflow: 'hidden', display: 'flex', marginBottom: 9 }}>
                              <div style={{ flex: meltIntPct, background: '#DDD6FE', display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
                                <span style={{ fontSize: 10.5, fontWeight: 800, color: '#7C3AED' }}>{meltIntPct}%</span>
                              </div>
                              <div style={{ width: 2, background: '#fff', flexShrink: 0 }} />
                              <div style={{ flex: 100 - meltIntPct, background: '#5B3FD4', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 8 }}>
                                <span style={{ fontSize: 10.5, fontWeight: 800, color: '#fff' }}>{100 - meltIntPct}%</span>
                              </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <div>
                                <span style={{ fontSize: 15, fontWeight: 900, color: '#7C3AED', fontFamily: 'Sora, sans-serif', letterSpacing: -0.4 }}>{inr(meltMonthlyInt)}</span>
                                <div style={{ fontSize: 9, color: '#A78BFA', fontWeight: 600, marginTop: 1 }}>interest</div>
                              </div>
                              <div style={{ textAlign: 'right' }}>
                                <span style={{ fontSize: 15, fontWeight: 900, color: '#5B3FD4', fontFamily: 'Sora, sans-serif', letterSpacing: -0.4 }}>{inr(meltPrin)}</span>
                                <div style={{ fontSize: 9, color: '#818CF8', fontWeight: 600, marginTop: 1 }}>reduces debt</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* ── Green takeaway ── */}
                        <div style={{ background: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)', borderRadius: 18, padding: '16px 18px', border: '1.5px solid #6EE7B7', display: 'flex', alignItems: 'center', gap: 13, boxShadow: '0 6px 20px -6px rgba(16,185,129,0.22)' }}>
                          <div style={{ width: 42, height: 42, borderRadius: 13, background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 5px 14px -4px rgba(16,185,129,0.55)' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                              <polyline points="17 6 23 6 23 12" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div>
                            <div style={{ fontSize: 22, fontWeight: 900, color: '#065F46', fontFamily: 'Sora, sans-serif', letterSpacing: -0.8, lineHeight: 1, marginBottom: 4 }}>{inr(extraPrin)} more/mo</div>
                            <div style={{ fontSize: 12, color: '#047857', fontWeight: 600, lineHeight: 1.4 }}>reduces your actual debt, not the bank's profit.</div>
                          </div>
                        </div>
                      </>
                    );
                  })()
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
