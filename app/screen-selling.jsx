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

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', animation: 'fadeIn .35s' }}>
        <AnimCard playKey={playKey} />
        <div style={{ textAlign: 'center', marginTop: 22 }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: 1.5, color: 'var(--primary)' }}>CREDIT MANAGEMENT</div>
          <div style={{ fontWeight: 800, fontSize: 33, lineHeight: 1.1, marginTop: 10, letterSpacing: -0.5 }}>
            Clear All Your<br /><span style={{ color: 'var(--primary)' }}>Credit Card Bills</span>
          </div>
          <div style={{ fontSize: 14.5, color: 'var(--ink-2)', marginTop: 14, lineHeight: 1.5, padding: '0 6px' }}>
            Lower your monthly interest rate today with our exclusive refinance offer.
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, justifyContent: 'center', marginTop: 22 }}>
          <Chip tone="plain" icon={<Dot />}>Lower Interest</Chip>
          <Chip tone="plain" icon={<Dot />}>Save thousands</Chip>
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
function IceCube() {
  return (
    <svg width="112" height="112" viewBox="0 0 120 120" fill="none" aria-hidden="true">
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
      {/* cold cast shadow */}
      <ellipse cx="60" cy="111" rx="38" ry="6.5" fill="#0B1E3A" opacity="0.30" filter="url(#iceShadow)" />
      {/* faces */}
      <polygon points="60,16 100,39 60,62 20,39" fill="url(#iceTop)" opacity="0.97" />
      <polygon points="20,39 60,62 60,106 20,83" fill="url(#iceLeft)" opacity="0.93" />
      <polygon points="100,39 60,62 60,106 100,83" fill="url(#iceRight)" opacity="0.95" />
      {/* top inner highlight */}
      <polygon points="60,24 90,40 60,56 30,40" fill="url(#iceGlow)" />
      {/* credit card frozen inside — refraction ghost + frosted card seen through ice */}
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
      {/* frosted edges */}
      <polygon points="60,16 100,39 60,62 20,39" fill="none" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="1.3" strokeLinejoin="round" />
      <line x1="60" y1="62" x2="60" y2="106" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="1.2" />
      <line x1="20" y1="39" x2="20" y2="83" stroke="#ffffff" strokeOpacity="0.32" strokeWidth="1" />
      <line x1="100" y1="39" x2="100" y2="83" stroke="#ffffff" strokeOpacity="0.32" strokeWidth="1" />
      {/* frost specks */}
      <circle cx="82" cy="50" r="2" fill="#ffffff" opacity="0.5" />
      <circle cx="34" cy="52" r="1.4" fill="#ffffff" opacity="0.4" />
    </svg>
  );
}

// ── HERO ILLUSTRATION 2: half-melted cube, credit card emerging ──
function Puddle() {
  return (
    <svg width="112" height="112" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="meltWater" cx="46%" cy="40%" r="62%">
          <stop offset="0" stopColor="#E4F3FF" /><stop offset="1" stopColor="#7FBDF0" />
        </radialGradient>
        <linearGradient id="meltIce" x1="34" y1="52" x2="86" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#E6F5FD" /><stop offset="1" stopColor="#9BCAE8" />
        </linearGradient>
        <linearGradient id="cardWarm" x1="44" y1="24" x2="82" y2="78" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFF6E4" /><stop offset="1" stopColor="#F1CE86" />
        </linearGradient>
        <filter id="warmGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="0" stdDeviation="2.6" floodColor="#F4B43C" floodOpacity="0.55" />
        </filter>
      </defs>

      {/* melted puddle base */}
      <ellipse cx="60" cy="101" rx="46" ry="11" fill="none" stroke="#8FC5F2" strokeOpacity="0.22" strokeWidth="1.4" />
      <ellipse cx="60" cy="100" rx="34" ry="9" fill="url(#meltWater)" />
      <ellipse cx="50" cy="97" rx="10" ry="2.3" fill="#ffffff" opacity="0.5" />

      {/* credit card emerging (drawn first — lower half ends up inside the ice) */}
      <g transform="rotate(-25 62 60)" filter="url(#warmGlow)">
        <rect x="40" y="40" width="46" height="30" rx="5" fill="url(#cardWarm)" />
        <rect x="47" y="47" width="10" height="8" rx="1.8" fill="#E7B964" />
        <rect x="47" y="59" width="30" height="2.6" rx="1.3" fill="#F6DCA0" />
        <rect x="47" y="64" width="18" height="2.6" rx="1.3" fill="#F6DCA0" />
        <polygon points="40,40 54,40 46,70 40,70" fill="#ffffff" opacity="0.28" />
      </g>

      {/* half-melted ice cube (translucent — lower card visible inside, melting top) */}
      <g opacity="0.78">
        <polygon points="60,48 88,63 60,78 32,63" fill="#EAF7FF" />
        <polygon points="32,63 60,78 60,99 34,84" fill="#A9D2EE" />
        <polygon points="88,63 60,78 60,99 84,86" fill="#7FB8DF" />
        <path d="M32,63 L60,78 L88,63" fill="none" stroke="#ffffff" strokeOpacity="0.65" strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M60,78 L60,99" stroke="#ffffff" strokeOpacity="0.38" strokeWidth="1" />
        <path d="M34,84 C40,89 47,86 52,91 C56,95 64,94 69,90 C74,86 80,90 84,86 L60,99 Z" fill="#CFEFFF" opacity="0.9" />
        <path d="M43,67 L60,58 L77,67" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* frosty collar where the card pierces the ice surface */}
      <ellipse cx="60" cy="60" rx="15" ry="4" fill="#ffffff" opacity="0.38" transform="rotate(-25 60 60)" />
      {/* ice sheen + melt drips */}
      <path d="M41,70 C44,67 49,67 52,69" stroke="#ffffff" strokeOpacity="0.62" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M52,96 q2,7 0,10 q-2,-3 0,-10 Z" fill="#CFEFFF" opacity="0.85" />
      <path d="M66,96 q1.8,6 0,9 q-1.8,-3 0,-9 Z" fill="#BDE7FF" opacity="0.74" />
      <circle cx="76" cy="97" r="2.4" fill="#CFEFFF" opacity="0.8" />
      {/* freed sparkle on the emerged card */}
      <path d="M82 30 l1.3 3.6 3.6 1.3 -3.6 1.3 -1.3 3.6 -1.3-3.6 -3.6-1.3 3.6-1.3z" fill="#FFF1C9" opacity="0.92" />
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


// ── MELT SAVINGS SCREEN ──────────────────────────────────────
function SavingsScreen({ go, monthly = 30000, setMonthly }) {
  const [playKey, setPlayKey] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(null);
  const [sheetClosing, setSheetClosing] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(null);
  const [showInterestTip, setShowInterestTip] = useState(false);
  const MIN = 25000, MAX = 100000, STEP = 5000;



  useEffect(() => { const t = setTimeout(() => setPlayKey(k => k + 1), 90); return () => clearTimeout(t); }, []);
  useEffect(() => { setPlayKey(k => k + 1); }, [monthly]);

  const { cardsInt, meltInt, saving, monthsDiff, nC, nM } = useMemo(() => calcSavings(monthly), [monthly]);

  const animCardsInt = useAnimatedNumber(cardsInt);
  const animMeltInt = useAnimatedNumber(meltInt);
  const animSaving = useAnimatedNumber(saving);
  const animMonthsDiff = useAnimatedNumber(monthsDiff);
  const animMonthly = useAnimatedNumber(monthly, 300);
  const animNC = useAnimatedNumber(nC);
  const animNM = useAnimatedNumber(nM);

  const dismissSheet = () => {
    if (sheetClosing) return;
    setSheetClosing(true);
    setTimeout(() => {
      setSheetOpen(null);
      setSheetClosing(false);
      setDragOffset(0);
      setIsDragging(false);
    }, 230);
  };

  const onDragStart = (clientY) => {
    dragStartY.current = clientY;
    setIsDragging(true);
  };
  const onDragMove = (clientY) => {
    if (dragStartY.current == null || !isDragging) return;
    const delta = clientY - dragStartY.current;
    if (delta > 0) {
      setDragOffset(Math.min(delta, 360));
    }
  };
  const onDragEnd = () => {
    if (dragOffset > window.innerHeight * 0.28) {
      dismissSheet();
    } else {
      setDragOffset(0);
      setIsDragging(false);
    }
    dragStartY.current = null;
  };

  const savingLakh = (animSaving / 100000).toFixed(2);
  const fintechFont = '"Google Sans", "SF Pro Display", Inter, "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

  const HalfLabel = ({ children, color }) => (
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.8, color, textAlign: 'center' }}>{children}</div>
  );

  const btnBase = {
    width: 32, height: 32, borderRadius: 999, border: 'none', cursor: 'pointer',
    background: '#eeeef8', display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, transition: 'opacity .15s',
  };

  return (
    <div style={{
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(180deg, #EFEEFE 0%, #F7F7FC 100%)',
      animation: 'fadeIn .35s',
      position: 'relative'
    }}>

      {/* 1. nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 14px 2px', flexShrink: 0 }}>
        <button onClick={() => go('selling')} style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer' }}>
          {Icon.back('#5B3FD4')}
        </button>
        <span style={{ fontWeight: 850, fontSize: 20, color: '#5B3FD4', letterSpacing: -0.5 }}>melt</span>
        <div style={{ width: 38 }} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingBottom: 16 }}>
        {/* 2. eyebrow + headline */}
        <div style={{ textAlign: 'center', padding: '4px 24px 0' }}>
          <h1 style={{ fontWeight: 850, fontSize: 20, color: '#1A1A2E', letterSpacing: -0.5, margin: 0 }}>
            Your Card Debt, Melted.
          </h1>
        </div>

        {/* 3. Visualization Assumptions Console (Two-column layout) */}
        <div style={{
          background: 'rgba(91, 63, 212, 0.02)',
          border: '1px dashed rgba(91, 63, 212, 0.16)',
          borderRadius: 12,
          padding: '6px 12px',
          margin: '6px 16px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
        }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 8.5, fontWeight: 800, color: '#88859E', letterSpacing: 0.5, textTransform: 'uppercase', lineHeight: 1.2 }}>
              Visualization Assumptions
            </div>
            <div style={{ fontSize: 11, color: '#6E6A85', fontWeight: 500, lineHeight: 1.2 }}>
              Your current debt <span style={{ fontWeight: 800, color: '#1B192E' }}>5 Lakhs</span>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
            <div style={{ fontSize: 8.5, fontWeight: 800, color: '#88859E', letterSpacing: 0.5, textTransform: 'uppercase', lineHeight: 1.2 }}>
              Monthly Payment
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <button
                onClick={() => setMonthly(m => Math.max(MIN, m - STEP))}
                disabled={monthly <= MIN}
                style={{ ...btnBase, width: 20, height: 20, opacity: monthly <= MIN ? 0.35 : 1, border: '1px solid #C4B5FD', background: '#fff' }}
              >
                <svg width="7" height="7" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14" stroke="#5B3FD4" strokeWidth="4.5" strokeLinecap="round" />
                </svg>
              </button>
              <span style={{ fontWeight: 850, fontSize: 12, color: '#1B192E', fontFamily: 'Sora, sans-serif', minWidth: 55, textAlign: 'center', letterSpacing: -0.2 }}>
                {inr(animMonthly)}
              </span>
              <button
                onClick={() => setMonthly(m => Math.min(MAX, m + STEP))}
                disabled={monthly >= MAX}
                style={{ ...btnBase, width: 20, height: 20, opacity: monthly >= MAX ? 0.35 : 1, border: '1px solid #C4B5FD', background: '#fff' }}
              >
                <svg width="7" height="7" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="#5B3FD4" strokeWidth="4.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 4. Comparison Columns */}
        <div style={{
          display: 'flex',
          gap: 14,
          margin: '8px 16px 0',
          position: 'relative',
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}>
          {/* Connecting Switch Badge */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) translateZ(25px)',
            zIndex: 10,
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: '#FFFFFF',
            border: '2px solid #5B3FD4',
            boxShadow: '0 8px 20px rgba(91, 63, 212, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B3FD4" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>

          {/* Left Card: Credit Cards */}
          <div style={{
            flex: 1,
            background: 'linear-gradient(135deg, rgba(240, 246, 255, 0.45) 0%, rgba(255, 255, 255, 0.3) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            borderLeft: '1.5px solid rgba(255, 255, 255, 0.55)',
            borderTop: '1.5px solid rgba(255, 255, 255, 0.55)',
            borderRadius: 22,
            padding: '12px 10px 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            boxShadow: '0 12px 28px -8px rgba(220, 38, 38, 0.05), 0 4px 10px -2px rgba(0, 0, 0, 0.02), inset 0 1px 1px rgba(255, 255, 255, 0.8)',
            position: 'relative',
            transform: 'rotateY(6deg) rotateX(1deg) translateZ(-5px)',
            transformStyle: 'flat',
            transformOrigin: 'right center',
            transition: 'transform 0.4s ease',
          }}>
            {/* Specular glass reflection overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(115deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0) 100%)',
              borderRadius: 22,
              pointerEvents: 'none',
              zIndex: 2,
            }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 1, height: 18 }}>
              <span style={{ fontSize: 9, fontWeight: 800, color: '#DC2626', letterSpacing: 0.8, textTransform: 'uppercase', background: 'rgba(220, 38, 38, 0.06)', padding: '2px 6px', borderRadius: 6 }}>
                Credit Cards
              </span>
              <span style={{ fontSize: 8.5, fontWeight: 800, color: '#88859E', letterSpacing: 0.5, textTransform: 'uppercase' }}>
                Standard
              </span>
            </div>

            <div style={{ textAlign: 'center', margin: 0, zIndex: 5, position: 'relative', height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <span style={{ fontSize: 28, fontWeight: 900, color: '#DC2626', letterSpacing: -1, fontFamily: 'Sora, sans-serif' }}>54%</span>
                <span style={{ fontSize: 10.5, fontWeight: 800, color: '#88859E', textTransform: 'uppercase', marginTop: 6 }}>p.a.</span>
                <button
                  onClick={(e) => { e.stopPropagation(); setShowInterestTip(prev => !prev); }}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 999,
                    background: 'transparent',
                    border: 'none',
                    padding: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    marginTop: 4,
                    outline: 'none',
                    zIndex: 5,
                    position: 'relative',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9" stroke="#88859E" strokeWidth="1.5" fill="rgba(136, 133, 158, 0.12)" />
                    <circle cx="10" cy="6.5" r="1.2" fill="#88859E" />
                    <rect x="9.1" y="9" width="1.8" height="5.5" rx="0.9" fill="#88859E" />
                  </svg>
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 68, margin: '2px 0', zIndex: 1 }}>
              <div style={{ transform: 'scale(0.72)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IceCube />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 2, borderTop: '1px solid rgba(255, 255, 255, 0.5)', paddingTop: 6, zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 10, color: '#7C788A', fontWeight: 600 }}>Est. Interest</span>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#1B192E', fontFamily: 'Sora, sans-serif' }}>{inr(animCardsInt)}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 10, color: '#7C788A', fontWeight: 600 }}>Total Outflow</span>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#DC2626', fontFamily: 'Sora, sans-serif' }}>{inr(500000 + cardsInt)}</span>
              </div>
            </div>

            {showInterestTip && (
              <div
                onClick={e => { e.stopPropagation(); }}
                style={{
                  position: 'absolute',
                  inset: 8,
                  background: 'rgba(255, 255, 255, 0.98)',
                  borderRadius: 16,
                  padding: '10px 8px 8px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid #FCA5A5',
                  backdropFilter: 'blur(10px)',
                  animation: 'fadeIn 0.2s ease-out',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
                    <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="9" stroke="#DC2626" strokeWidth="1.5" fill="rgba(220, 38, 38, 0.1)" />
                      <circle cx="10" cy="6.5" r="1.2" fill="#DC2626" />
                      <rect x="9.1" y="9" width="1.8" height="5.5" rx="0.9" fill="#DC2626" />
                    </svg>
                    <span style={{ fontWeight: 800, fontSize: 11, color: '#DC2626', letterSpacing: -0.2 }}>Interest Breakdown</span>
                  </div>
                  <div style={{ fontSize: 9.5, color: '#454350', lineHeight: 1.4, fontWeight: 600 }}>
                    3.75%/month interest + 18% GST on interest = ~54% p.a. effective cost
                  </div>
                </div>
                <button
                  onClick={() => setShowInterestTip(false)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderTop: '1px solid #F3F4F6',
                    paddingTop: 6,
                    fontSize: 9.5,
                    fontWeight: 700,
                    color: '#9CA3AF',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  Tap to dismiss
                </button>
              </div>
            )}
          </div>

          {/* Right Card: With Melt */}
          <div style={{
            flex: 1,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(245, 243, 255, 0.55) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '2px solid #5B3FD4',
            borderRadius: 22,
            padding: '12px 10px 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            boxShadow: '0 18px 38px -10px rgba(91, 63, 212, 0.28), 0 4px 12px rgba(0, 0, 0, 0.02), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
            position: 'relative',
            transform: 'rotateY(-6deg) rotateX(1deg) translateZ(10px)',
            transformOrigin: 'left center',
            transition: 'transform 0.4s ease',
          }}>
            {/* Specular glass reflection overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(115deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0) 100%)',
              borderRadius: 22,
              pointerEvents: 'none',
              zIndex: 2,
            }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 1, height: 18 }}>
              <span style={{ fontSize: 9, fontWeight: 800, color: '#5B3FD4', letterSpacing: 0.8, textTransform: 'uppercase', background: 'rgba(91, 63, 212, 0.08)', padding: '2px 6px', borderRadius: 6 }}>
                With Melt
              </span>
              <span style={{ fontSize: 8.5, fontWeight: 800, color: '#10B981', letterSpacing: 0.5, textTransform: 'uppercase' }}>
                Refinance
              </span>
            </div>

            <div style={{ textAlign: 'center', margin: 0, zIndex: 1, height: 42, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <span style={{ fontSize: 28, fontWeight: 900, color: '#5B3FD4', letterSpacing: -1, fontFamily: 'Sora, sans-serif' }}>25%</span>
                <span style={{ fontSize: 10.5, fontWeight: 800, color: '#88859E', textTransform: 'uppercase', marginTop: 6 }}>p.a.</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 68, margin: '2px 0', zIndex: 1 }}>
              <div style={{ transform: 'scale(0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Puddle />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 2, borderTop: '1px solid rgba(91, 63, 212, 0.12)', paddingTop: 6, zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 1 }}>
                <span style={{ fontSize: 10, color: '#7C788A', fontWeight: 600 }}>Est. Interest</span>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#1B192E', fontFamily: 'Sora, sans-serif' }}>{inr(animMeltInt)}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 1 }}>
                <span style={{ fontSize: 10, color: '#7C788A', fontWeight: 600 }}>Total Payable</span>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#5B3FD4', fontFamily: 'Sora, sans-serif' }}>{inr(500000 + meltInt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Savings Hook Banner */}
        <div style={{
          margin: '10px 16px 4px',
          background: 'linear-gradient(135deg, #047857 0%, #10B981 48%, #065F46 100%)',
          borderRadius: 22,
          padding: '14px 16px 12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          border: '1.5px solid rgba(255, 255, 255, 0.22)',
          boxShadow: '0 20px 35px -10px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 4px 10px rgba(0, 0, 0, 0.05)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Holographic glowing blobs */}
          <div style={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(52, 211, 153, 0.35) 0%, rgba(52, 211, 153, 0) 70%)',
            filter: 'blur(15px)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            bottom: -60,
            left: -40,
            width: 140,
            height: 140,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, rgba(16, 185, 129, 0) 70%)',
            filter: 'blur(15px)',
            pointerEvents: 'none',
          }} />

          {/* Premium Vector Grid Pattern Overlay */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08, pointerEvents: 'none' }}>
            <defs>
              <pattern id="grid" width="16" height="16" patternUnits="userSpaceOnUse">
                <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#FFFFFF" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>



          <div style={{
            fontSize: 10,
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            zIndex: 1,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
          }}>
            <span style={{ fontSize: 12, filter: 'drop-shadow(0 0 4px #fff)' }}>✨</span> Total Interest Saved
          </div>

          {/* Big Value Number Capsule Container */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 0,
            zIndex: 1,
            background: 'rgba(255, 255, 255, 0.07)',
            padding: '4px 12px',
            borderRadius: 12,
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}>
            <SlotNumber
              value={saving}
              playKey={playKey}
              h={38}
              chrome={false}
              digitColor="#FFFFFF"
              sepColor="#FFFFFF"
              gap={1.2}
            />
          </div>

          {/* Infographic progress comparing Outflow / Interest Melted */}
          <div style={{
            width: '100%',
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: 16,
            padding: '10px 12px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            zIndex: 1,
            boxSizing: 'border-box',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.05)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 10.5, color: '#FFFFFF', fontWeight: 700, letterSpacing: 0.2 }}>Interest Melted Away</span>
              <span style={{
                fontSize: 10,
                color: '#10B981',
                fontWeight: 800,
                background: '#FFFFFF',
                padding: '2px 6px',
                borderRadius: 5,
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
                letterSpacing: -0.2,
              }}>
                {cardsInt > 0 ? ((saving / cardsInt) * 100).toFixed(1) : 0}% Melted
              </span>
            </div>

            {/* Visual Bar */}
            <div style={{ height: 8, borderRadius: 99, background: 'rgba(255, 255, 255, 0.15)', position: 'relative', overflow: 'hidden' }}>
              {/* Credit Card Drag Line (Yellow-Orange Gradient) */}
              <div style={{ height: '100%', width: '100%', background: 'linear-gradient(90deg, #FBBF24 0%, #F59E0B 100%)', borderRadius: 99 }} />
              {/* Melt Payoff Line (Pure White Glowing overlay) */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: `${cardsInt > 0 ? ((saving / cardsInt) * 100) : 0}%`,
                background: '#FFFFFF',
                borderRadius: 99,
                boxShadow: '0 0 12px rgba(255, 255, 255, 0.8), 0 0 4px rgba(255, 255, 255, 0.9)',
              }} />
            </div>

            {/* Labels under the bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, fontWeight: 700 }}>
              <span style={{ color: '#FDE047', display: 'inline-flex', alignItems: 'center', gap: 4, textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FDE047', boxShadow: '0 0 4px #FDE047' }} /> Card Interest: {lakh(cardsInt)}
              </span>
              <span style={{ color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', gap: 4, textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFFFFF', boxShadow: '0 0 6px #FFFFFF' }} /> Melt Interest: {lakh(meltInt)}
              </span>
            </div>
          </div>

          <div style={{
            fontSize: 12,
            color: '#E6FDF4',
            fontWeight: 600,
            letterSpacing: -0.1,
            zIndex: 1,
            opacity: 0.95,
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
          }}>
            by refinancing to a single 25% p.a. plan
          </div>
        </div>

        {/* 5. Three Premium Benefit Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '16px 16px 0' }}>
          {/* Card 1: Interest Freed */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 16px',
            borderRadius: 18,
            background: '#E8F8EE',
            border: '1px solid #86EFAC',
            boxShadow: '0 4px 14px rgba(26, 122, 74, 0.03)',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12, background: '#1FA971',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 14.5, fontWeight: 800, color: '#1A7A4A' }}>
                ₹{savingLakh}L Freed in Interest
              </span>
              <span style={{ fontSize: 11.5, color: '#1FA971', fontWeight: 600 }}>
                Melt refinance reduces interest payments by over 70%
              </span>
            </div>
          </div>

          {/* Card 2: Debt Free Sooner */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 16px',
            borderRadius: 18,
            background: '#EDE8FF',
            border: '1px solid #C4B5FD',
            boxShadow: '0 4px 14px rgba(91, 63, 212, 0.03)',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12, background: '#5B3FD4',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 14.5, fontWeight: 800, color: '#4C28D4' }}>
                {animMonthsDiff} Months Sooner Debt-Free
              </span>
              <span style={{ fontSize: 11.5, color: '#5B3FD4', fontWeight: 600 }}>
                Melt payoff: <span style={{ fontWeight: 800 }}>{nM} months</span> vs Credit Card: <span style={{ fontWeight: 800 }}>{nC >= 999 ? 'Never' : nC + ' months'}</span>
              </span>
            </div>
          </div>

          {/* Card 3: Credit Score Boost */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 16px',
            borderRadius: 18,
            background: '#FFF9F0',
            border: '1px solid #FCD34D',
            boxShadow: '0 4px 14px rgba(217, 119, 6, 0.03)',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12, background: '#D97706',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 14.5, fontWeight: 800, color: '#B45309' }}>
                Improve Your Credit Score
              </span>
              <span style={{ fontSize: 11.5, color: '#D97706', fontWeight: 600 }}>
                Replacing high card utilisation with a structured loan boosts CIBIL rating
              </span>
            </div>
          </div>
        </div>


        {/* 7. educational section */}
        <div style={{ padding: '18px 0 0', animation: 'fadeUp .9s .1s both' }}>
          <div style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: 0.8, color: MELT.muted3, marginBottom: 10, padding: '0 20px', textTransform: 'uppercase' }}>
            Understanding Credit Card Debt
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
            <button
              onClick={() => setSheetOpen('interest')}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 10, width: 'calc(100% - 40px)', borderRadius: 14,
                background: '#fff', border: '1px solid #ECE8FB', padding: '10px 14px',
                textAlign: 'left', cursor: 'pointer', boxShadow: '0 8px 20px -18px rgba(40,30,80,.45)',
                marginLeft: 20, marginRight: 20,
                animation: 'fadeUp 1s .18s both',
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 800, color: '#15122F', lineHeight: 1.25 }}>How Credit Card Interest Works</div>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 999, background: '#F4F1FF', flexShrink: 0 }}>
                {Icon.chevR(MELT.purple, 16)}
              </span>
            </button>
            <button
              onClick={() => setSheetOpen('minimum')}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 10, width: 'calc(100% - 40px)', borderRadius: 14,
                background: '#fff', border: '1px solid #ECE8FB', padding: '10px 14px',
                textAlign: 'left', cursor: 'pointer', boxShadow: '0 8px 20px -18px rgba(40,30,80,.45)',
                marginLeft: 20, marginRight: 20,
                animation: 'fadeUp 1.12s .28s both',
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 800, color: '#15122F', lineHeight: 1.25 }}>Paying Only the Minimum Due?</div>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 999, background: '#F4F1FF', flexShrink: 0 }}>
                {Icon.chevR(MELT.purple, 16)}
              </span>
            </button>
          </div>
        </div>

        {/* benefit pills */}
        <div className="scr" style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '16px 20px 0' }}>
          {[
            { t: 'Foreclose anytime', c: MELT.purple, check: true },
            { t: 'Save ~70% on Interest', c: '#333333' },
          ].map((p, i) => (
            <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 36, padding: '0 14px', borderRadius: 18, background: '#fff', border: `1px solid ${MELT.purpleBorder}`, whiteSpace: 'nowrap', flexShrink: 0, fontSize: 13, fontWeight: 600, color: p.c }}>
              {p.check
                ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7.5" stroke={MELT.purple} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                : <span style={{ width: 4, height: 4, borderRadius: 9, background: '#333333' }} />}
              {p.t}
            </div>
          ))}
        </div>

        {/* disclaimer */}
        <div style={{ fontSize: 12, color: MELT.muted3, textAlign: 'center', padding: '18px 28px 8px', lineHeight: 1.5 }}>
          Illustrative, based on average card balances. Your actual savings appear on the next screen.
        </div>
      </div>

      {/* 9. bottom sheets */}
      {sheetOpen && (
        <>
          <div
            onClick={dismissSheet}
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(9, 9, 18, 0.38)',
              zIndex: 20,
              opacity: sheetClosing ? 0 : 1,
              transition: 'opacity 230ms ease-out',
            }}
          />
          <div
            onTouchStart={(e) => onDragStart(e.touches[0].clientY)}
            onTouchMove={(e) => onDragMove(e.touches[0].clientY)}
            onTouchEnd={onDragEnd}
            onMouseDown={(e) => onDragStart(e.clientY)}
            onMouseMove={(e) => onDragMove(e.clientY)}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            style={{
              position: 'absolute', left: 0, right: 0, bottom: 0,
              zIndex: 21,
              maxHeight: '90vh',
              background: '#fff',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              boxShadow: '0 -18px 40px -18px rgba(20, 14, 57, 0.45)',
              overflow: 'hidden',
              transform: sheetClosing ? 'translateY(100%)' : `translateY(${dragOffset}px)`,
              transition: isDragging ? 'none' : 'transform 240ms cubic-bezier(.2,.75,.2,1)',
            }}>
            <div style={{
              width: 52, height: 5, borderRadius: 999,
              background: '#E7E0F8', margin: '10px auto 8px'
            }} />
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '6px 16px 14px', borderBottom: '1px solid #F0ECFA'
            }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#161331', letterSpacing: -0.2 }}>
                {sheetOpen === 'interest'
                  ? 'Understanding Credit Card Interest'
                  : 'What Happens When You Pay Only the Minimum Due?'}
              </div>
              <button onClick={dismissSheet} style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                flexShrink: 0,
                fontSize: 14,
                fontWeight: 700,
                color: MELT.purple,
                lineHeight: 1,
                transition: 'opacity 0.2s ease',
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = 0.8}
                onMouseLeave={e => e.currentTarget.style.opacity = 1}>
                Close
              </button>
            </div>
            <div style={{ padding: '16px 16px 24px', overflowY: 'auto', maxHeight: 'calc(90vh - 72px)' }}>
              {sheetOpen === 'interest' ? (
                <>
                  {/* Premium light-themed dashboard audit card */}
                  <div style={{
                    background: 'linear-gradient(135deg, #FAF9FD 0%, #F4F2FA 100%)',
                    borderRadius: 20,
                    padding: '20px 18px',
                    border: '1px solid #E2DDF0',
                    boxShadow: '0 10px 25px -12px rgba(26, 14, 80, 0.12), inset 0 1px 0 #FFF',
                    color: '#1B192E',
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: '#6A6782', letterSpacing: '0.8px', textTransform: 'uppercase', textAlign: 'center', marginBottom: 12 }}>
                      How a ₹1,00,000 Debt Grows in 1 Year
                    </div>

                    {/* Premium Invoice/Receipt Ledger Card */}
                    <div style={{
                      background: '#FFF',
                      border: '1px solid #E2DDF0',
                      borderRadius: 16,
                      padding: '16px 18px',
                      boxShadow: '0 8px 24px -12px rgba(26, 14, 80, 0.08), inset 0 1px 0 #FFF',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 12,
                    }}>
                      {/* Starting Debt Row */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#5C5870' }}>Starting Debt Balance</span>
                        <span style={{ fontSize: 14, fontWeight: 750, color: '#1B192E', fontFamily: 'Sora, sans-serif' }}>₹1,00,000</span>
                      </div>

                      {/* Added Cost Row */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 13, fontWeight: 650, color: '#D32F2F', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ width: 6, height: 6, borderRadius: 99, background: '#D32F2F' }} />
                          Added Cost (12 Months)
                        </span>
                        <span style={{ fontSize: 14, fontWeight: 850, color: '#D32F2F', fontFamily: 'Sora, sans-serif' }}>+ ₹67,260</span>
                      </div>

                      {/* Dashed Separator */}
                      <div style={{ borderTop: '1px dashed #E2DDF0', margin: '2px 0' }} />

                      {/* Total Owed Row */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 13.5, fontWeight: 800, color: '#1B192E' }}>Total Owed after 1 Year</span>
                        <span style={{ fontSize: 16, fontWeight: 900, color: '#1B192E', fontFamily: 'Sora, sans-serif' }}>₹1,67,260</span>
                      </div>
                    </div>

                    <div style={{ fontSize: 12.5, color: '#4B4960', marginTop: 14, fontWeight: 500, lineHeight: 1.45, textAlign: 'center' }}>
                      If you carry a credit card balance of <strong>₹1,00,000</strong> for 1 year, you end up paying an extra <strong style={{ color: '#D32F2F', fontWeight: 800 }}>₹67,260</strong> in interest, fees, and taxes.
                    </div>


                    {/* Sleek horizontal meter */}
                    <div style={{
                      display: 'flex',
                      height: 8,
                      borderRadius: 99,
                      overflow: 'hidden',
                      marginTop: 18,
                      background: '#EAE6F5',
                      boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.06)'
                    }}>
                      <div style={{ width: '67%', background: 'linear-gradient(90deg, #E54B4B 0%, #F06A6A 100%)' }} />
                      <div style={{ width: '15%', background: 'linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%)' }} />
                      <div style={{ width: '18%', background: 'linear-gradient(90deg, #EC4899 0%, #F472B6 100%)' }} />
                    </div>

                    {/* Breakdown items */}
                    <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {[
                        { label: 'Interest (45% p.a.)', val: '₹45,000', color: '#E54B4B' },
                        { label: 'GST Tax (18% on Interest & Fees)', val: '₹10,260', color: '#F59E0B' },
                        { label: 'Late Payment Fees & Penalty', val: '₹12,000', color: '#EC4899' },
                      ].map((item, idx) => (
                        <div key={idx} style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: 13,
                          color: '#4B4960',
                          paddingBottom: 8,
                          borderBottom: idx < 2 ? '1px solid #ECE8F6' : 'none'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{
                              width: 6,
                              height: 6,
                              borderRadius: 99,
                              background: item.color,
                            }} />
                            <span style={{ fontWeight: 600 }}>{item.label}</span>
                          </div>
                          <strong style={{ color: '#1B192E', fontFamily: 'Sora, sans-serif', fontWeight: 750 }}>{item.val}</strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Detailed Reality warning points */}
                  <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      {
                        title: 'Daily Interest Accrual',
                        desc: 'Interest accrues from transaction date, not the bill due date, if any balance is carried.',
                        icon: (
                          <div style={{
                            width: 32, height: 32, borderRadius: 99,
                            background: '#FFEAEA',
                            border: '1px solid rgba(211, 47, 47, 0.08)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                          }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D32F2F" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                          </div>
                        )
                      },
                      {
                        title: '18% GST on All Charges',
                        desc: 'A mandatory 18% GST is added to all interest charges and penalty fees.',
                        icon: (
                          <div style={{
                            width: 32, height: 32, borderRadius: 99,
                            background: '#FFEAEA',
                            border: '1px solid rgba(211, 47, 47, 0.08)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                          }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D32F2F" strokeWidth="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                          </div>
                        )
                      },
                      {
                        title: 'Late Payment Penalty',
                        desc: 'Missed or delayed payments immediately trigger penalty fees up to ₹1,300.',
                        icon: (
                          <div style={{
                            width: 32, height: 32, borderRadius: 99,
                            background: '#FFEAEA',
                            border: '1px solid rgba(211, 47, 47, 0.08)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                          }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D32F2F" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                          </div>
                        )
                      }
                    ].map((item, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        gap: 12,
                        padding: '14px 16px',
                        borderRadius: 16,
                        background: '#FFF',
                        border: '1px solid #ECE8F7',
                        borderLeft: '4px solid #D32F2F',
                        boxShadow: '0 8px 20px -16px rgba(24, 21, 47, 0.08)',
                      }}>
                        {item.icon}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                          <span style={{ fontSize: 13.5, fontWeight: 800, color: '#1B192E' }}>{item.title}</span>
                          <span style={{ fontSize: 11.5, color: '#5C5870', lineHeight: 1.5 }}>{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    marginTop: 14,
                    background: '#FFF9F0',
                    borderRadius: 16,
                    padding: '12px 14px',
                    fontSize: 13,
                    color: '#8A5A00',
                    lineHeight: 1.4,
                    fontWeight: 650,
                    border: '1px solid #FFE4C4',
                    boxShadow: '0 8px 20px -16px rgba(138, 90, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6
                  }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8A5A00" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
                    <span>The longer the balance stays unpaid, the more expensive it becomes.</span>
                  </div>
                </>
              ) : (
                <>
                  {/* Premium light-themed dashboard minimum due card */}
                  <div style={{
                    background: 'linear-gradient(135deg, #FAF9FD 0%, #F4F2FA 100%)',
                    borderRadius: 20,
                    padding: '20px 18px',
                    border: '1px solid #E2DDF0',
                    boxShadow: '0 10px 25px -12px rgba(26, 14, 80, 0.12), inset 0 1px 0 #FFF',
                    color: '#1B192E',
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: '#6A6782', letterSpacing: '0.8px', textTransform: 'uppercase', textAlign: 'center', marginBottom: 12 }}>
                      ON A ₹5,000 MINIMUM PAYMENT
                    </div>

                    {/* Ultra-Simple Visual Payment Flow */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 12,
                      marginTop: 10,
                    }}>
                      {/* Box 1: Minimum Payment */}
                      <div style={{
                        background: '#FFF',
                        border: '1px solid #E2DDF0',
                        borderRadius: 12,
                        padding: '10px 16px',
                        textAlign: 'center',
                        boxShadow: '0 2px 8px rgba(26, 14, 80, 0.02)',
                        flex: 1,
                      }}>
                        <div style={{ fontSize: 9, fontWeight: 800, color: '#6A6782', letterSpacing: '0.4px', textTransform: 'uppercase' }}>
                          Minimum Payment
                        </div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: '#1B192E', marginTop: 4, fontFamily: 'Sora, sans-serif' }}>
                          ₹5,000
                        </div>
                      </div>

                      {/* Arrow */}
                      <div style={{ fontSize: 20, color: '#88859E', fontWeight: 800 }}>➔</div>

                      {/* Box 2: Principal Reduction */}
                      <div style={{
                        background: '#E7F7EF',
                        border: '1px solid #A3E2C9',
                        borderRadius: 12,
                        padding: '10px 16px',
                        textAlign: 'center',
                        boxShadow: '0 2px 8px rgba(31, 169, 113, 0.02)',
                        flex: 1,
                      }}>
                        <div style={{ fontSize: 9, fontWeight: 800, color: '#1FA971', letterSpacing: '0.4px', textTransform: 'uppercase' }}>
                          Principal Reduction
                        </div>
                        <div style={{ fontSize: 18, fontWeight: 900, color: '#1FA971', marginTop: 4, fontFamily: 'Sora, sans-serif' }}>
                          ₹575
                        </div>
                      </div>
                    </div>

                    <div style={{ fontSize: 12.5, color: '#4B4960', marginTop: 14, fontWeight: 500, lineHeight: 1.45, textAlign: 'center' }}>
                      Interest and GST consume <strong style={{ color: '#D32F2F', fontWeight: 800 }}>₹4,425</strong> of your payment, leaving only <strong>₹575</strong> to reduce your balance.
                    </div>

                    {/* Split bar visualizing the payment leak */}
                    <div style={{
                      display: 'flex',
                      height: 10,
                      borderRadius: 99,
                      overflow: 'hidden',
                      marginTop: 18,
                      background: '#EAE6F5',
                      boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.06)'
                    }}>
                      <div style={{ width: '88.5%', background: 'linear-gradient(90deg, #E54B4B 0%, #F06A6A 100%)' }} />
                      <div style={{ width: '11.5%', background: 'linear-gradient(90deg, #1FA971 0%, #22C55E 100%)' }} />
                    </div>

                    {/* Simple legend */}
                    <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 700, gap: 10, flexWrap: 'wrap' }}>
                      <span style={{ color: '#D32F2F', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <span style={{ width: 6, height: 6, borderRadius: 99, background: '#E54B4B' }} /> Interest + GST: ₹4,425
                      </span>
                      <span style={{ color: '#1FA971', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <span style={{ width: 6, height: 6, borderRadius: 99, background: '#1FA971' }} /> Debt Reduced: ₹575
                      </span>
                    </div>
                  </div>

                  {/* 1 Year Grid Picture */}
                  <div style={{
                    marginTop: 16,
                    background: '#FFF',
                    borderRadius: 20,
                    border: '1px solid #ECE8F7',
                    padding: '16px 18px',
                    boxShadow: '0 8px 20px -16px rgba(24, 21, 47, 0.08)',
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: '#88859E', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 12 }}>
                      THE 1-YEAR PICTURE (PAYING MINIMUMS)
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div style={{ borderRight: '1px solid #ECE8F7', paddingRight: 8 }}>
                        <div style={{ fontSize: 11, color: '#88859E', fontWeight: 600 }}>Total Paid in Year</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: '#1B192E', marginTop: 3 }}>₹60,000</div>
                      </div>
                      <div style={{ paddingLeft: 8 }}>
                        <div style={{ fontSize: 11, color: '#88859E', fontWeight: 600 }}>Interest + GST Charged</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: '#D32F2F', marginTop: 3 }}>₹53,100</div>
                      </div>
                      <div style={{ borderTop: '1px solid #ECE8F7', borderRight: '1px solid #ECE8F7', paddingTop: 10, paddingRight: 8 }}>
                        <div style={{ fontSize: 11, color: '#88859E', fontWeight: 600 }}>Debt Remaining</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: '#1B192E', marginTop: 3 }}>~₹93,100</div>
                      </div>
                      <div style={{ borderTop: '1px solid #ECE8F7', paddingTop: 10, paddingLeft: 8 }}>
                        <div style={{ fontSize: 11, color: '#88859E', fontWeight: 600 }}>Time to Clear ₹1L</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: '#D32F2F', marginTop: 3 }}>9–10 Years</div>
                      </div>
                    </div>

                    <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid #F0ECFA', fontSize: 12.5, color: '#5C5870', lineHeight: 1.45 }}>
                      You paid <strong>₹60,000</strong> in a year. The bank took <strong>₹53,100</strong> of it. Your debt is still <strong>₹93,100</strong>. Over 9 years, interest alone can exceed <strong>₹2,20,000</strong>.
                    </div>
                  </div>

                  {/* Warning Points */}
                  <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      {
                        title: 'Daily Compounding Interest',
                        desc: 'Unpaid balances accrue interest daily, compounding the outstanding balance carried into the next billing cycle.',
                        icon: (
                          <div style={{
                            width: 32, height: 32, borderRadius: 99,
                            background: '#FFEAEA',
                            border: '1px solid rgba(211, 47, 47, 0.08)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                          }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D32F2F" strokeWidth="2.5"><path d="M23 6l-9.5 9.5-5-5L1 18" /><path d="M17 6h6v6" /></svg>
                          </div>
                        )
                      },
                      {
                        title: 'Additional Late Penalty',
                        desc: 'Missed or delayed payments immediately incur an additional late fee plus mandatory GST tax.',
                        icon: (
                          <div style={{
                            width: 32, height: 32, borderRadius: 99,
                            background: '#FFEAEA',
                            border: '1px solid rgba(211, 47, 47, 0.08)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                          }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D32F2F" strokeWidth="2.5"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                          </div>
                        )
                      }
                    ].map((item, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        gap: 12,
                        padding: '14px 16px',
                        borderRadius: 16,
                        background: '#FFF',
                        border: '1px solid #ECE8F7',
                        borderLeft: '4px solid #D32F2F',
                        boxShadow: '0 8px 20px -16px rgba(24, 21, 47, 0.08)',
                      }}>
                        {item.icon}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                          <span style={{ fontSize: 13.5, fontWeight: 800, color: '#1B192E' }}>{item.title}</span>
                          <span style={{ fontSize: 11.5, color: '#5C5870', lineHeight: 1.5 }}>{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* High-Impact Advisory Block */}
                  <div style={{
                    marginTop: 14,
                    background: 'linear-gradient(90deg, #F3F1FA 0%, #FAFAFD 100%)',
                    borderRadius: 16,
                    padding: '14px 16px',
                    borderLeft: '4px solid #5B3FD4',
                    boxShadow: '0 8px 20px -16px rgba(91, 63, 212, 0.12)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: '#5B3FD4', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 4 }}>
                      Advisory Note
                    </span>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: '#4B4960', lineHeight: 1.45 }}>
                      Paying only the minimum due covers interest and fees, leaving your core debt balance virtually unchanged.
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}

      {/* 10. sticky CTA */}
      <BottomBar bg="#F7F7FC">
        <button onClick={() => go('visualise')} style={{
          width: '100%', height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #5B3FD4 0%, #3D3DC4 100%)', color: '#fff',
          fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
          boxShadow: '0 8px 22px rgba(91, 63, 212, 0.25)', border: 'none', cursor: 'pointer', transition: 'all .15s ease',
        }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(.975)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          Shift to Melt & Visualise Timeline {Icon.arrowR('#fff')}
        </button>
      </BottomBar>
    </div>
  );
}

Object.assign(window, { SellingStories, SavingsScreen });
