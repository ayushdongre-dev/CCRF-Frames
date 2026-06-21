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
  return { cardsInt, meltInt, saving: cardsInt - meltInt, monthsDiff: nC - nM };
}

// ── MELT SAVINGS SCREEN ──────────────────────────────────────
function SavingsScreen({ go, monthly = 30000, setMonthly }) {
  const [playKey, setPlayKey] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(null);
  const [sheetClosing, setSheetClosing] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(null);
  const MIN = 25000, MAX = 100000, STEP = 5000;

  useEffect(() => { const t = setTimeout(() => setPlayKey(k => k + 1), 90); return () => clearTimeout(t); }, []);
  useEffect(() => { setPlayKey(k => k + 1); }, [monthly]);

  const { cardsInt, meltInt, saving, monthsDiff } = useMemo(() => calcSavings(monthly), [monthly]);

  const animCardsInt = useAnimatedNumber(cardsInt);
  const animMeltInt = useAnimatedNumber(meltInt);
  const animSaving = useAnimatedNumber(saving);
  const animMonthsDiff = useAnimatedNumber(monthsDiff);
  const animMonthly = useAnimatedNumber(monthly, 300);

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
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: MELT.bg, animation: 'fadeIn .35s', position: 'relative' }}>
      {/* 1. nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 14px 6px', flexShrink: 0 }}>
        <button onClick={() => go('selling')} style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icon.back('#333333')}</button>
        <span style={{ fontWeight: 600, fontSize: 21, color: MELT.purple, letterSpacing: -0.4 }}>melt</span>
        <div style={{ width: 38 }} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        {/* 2. eyebrow + headline */}
        <div style={{ textAlign: 'center', padding: '0 24px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: MELT.purple, marginTop: 0 }}>YOUR MONEY IS FROZEN IN CARD DEBT</div>
          <div style={{ fontWeight: 800, fontSize: 27, lineHeight: 1.16, marginTop: 6, color: MELT.ink, letterSpacing: -0.4 }}>
            Here's how much<br />Melt frees for you
          </div>
          {/* card debt pill — fixed */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 8, padding: '8px 16px', borderRadius: 999, background: '#fff', border: `1px solid ${MELT.purpleBorder}`, boxShadow: '0 6px 18px -12px rgba(40,30,80,.5)' }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: MELT.muted2 }}>Your credit card debt</span>
            <span style={{ fontWeight: 800, fontSize: 16, color: MELT.ink }}>₹5,00,000</span>
          </div>

          {/* ── Monthly payment stepper ── */}
          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <div style={{ fontSize: 13, color: MELT.muted2, fontFamily: 'Sora, sans-serif', fontWeight: 500 }}>Monthly credit card payment</div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between',
              gap: 0, padding: '5px 8px', borderRadius: 12,
              background: '#fff', border: `1px solid ${MELT.purpleBorder}`,
              boxShadow: '0 6px 18px -12px rgba(40,30,80,.5)',
              minWidth: 0,
            }}>
              <button
                onClick={() => setMonthly(m => Math.max(MIN, m - STEP))}
                disabled={monthly <= MIN}
                style={{ ...btnBase, opacity: monthly <= MIN ? 0.35 : 1 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14" stroke="#3D3DC4" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </button>
              <span style={{ fontWeight: 800, fontSize: 16, color: '#1A1733', fontFamily: 'Sora, sans-serif', minWidth: 80, textAlign: 'center', letterSpacing: -0.3 }}>
                {inr(animMonthly)}
              </span>
              <button
                onClick={() => setMonthly(m => Math.min(MAX, m + STEP))}
                disabled={monthly >= MAX}
                style={{ ...btnBase, opacity: monthly >= MAX ? 0.35 : 1 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="#3D3DC4" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 3. hero card */}
        <div style={{ margin: '10px 20px 0', borderRadius: 24, background: MELT.hero, boxShadow: '0 22px 44px -22px rgba(15,13,46,.7)', position: 'relative', zIndex: 0 }}>
          <div style={{ padding: 24, position: 'relative' }}>
            {/* divider */}
            <div style={{ position: 'absolute', top: 24, bottom: 24, left: '50%', width: 1, background: 'rgba(255,255,255,.3)' }} />
            <div style={{ display: 'flex' }}>
              {/* LEFT — your cards now */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, paddingRight: 8, position: 'relative' }}>
                <HalfLabel color="#F06A6A">YOUR CARDS NOW</HalfLabel>
                <IceCube />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ fontSize: 16, fontWeight: 800, color: '#FF6B6B' }}>54% p.a.</span>
                    <InfoTip text="At 42% interest rate, you also pay 18% GST on your interest paid" />
                  </div>
                  <div style={{ fontSize: 13, color: '#E79A9A', marginTop: 2 }}>{inr(animCardsInt)} interest</div>
                </div>
              </div>
              {/* RIGHT — with melt */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, paddingLeft: 8 }}>
                <HalfLabel color={MELT.greenSoft}>WITH MELT</HalfLabel>
                <Puddle />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#4ADE80' }}>25% p.a.</div>
                  <div style={{ fontSize: 13, color: '#9AD9B4', marginTop: 2 }}>{inr(animMeltInt)} interest</div>
                </div>
              </div>
            </div>
          </div>
          {/* savings badge (rolling counter) */}
          <div onClick={() => setPlayKey(k => k + 1)} style={{
            background: '#FFFFFF',
            border: '1px solid rgba(30, 27, 75, 0.08)',
            borderRadius: 20,
            padding: '14px 16px',
            textAlign: 'center',
            cursor: 'pointer',
            margin: '0',
            width: '100%',
            boxShadow: '0 14px 34px -26px rgba(32, 28, 72, 0.38)',
            fontFamily: fintechFont,
          }}>
            <div style={{
              display: 'flex', alignItems: 'baseline', justifyContent: 'center',
              gap: 7, flexWrap: 'nowrap',
              lineHeight: 1,
            }}>
              <span style={{
                fontWeight: 650,
                fontSize: 15,
                color: '#2B2A3A',
                whiteSpace: 'nowrap',
                letterSpacing: 0,
                lineHeight: 1.2,
              }}>You save</span>
              <div style={{
                display: 'inline-flex', alignItems: 'baseline', justifyContent: 'center',
                minHeight: 0,
                background: 'transparent',
                borderRadius: 0,
              }}>
                <SlotNumber value={saving} playKey={playKey} h={28} chrome={false} digitColor={MELT.purple} sepColor={MELT.purple} gap={0} />
              </div>
              <span style={{
                fontWeight: 650,
                fontSize: 15,
                color: '#2B2A3A',
                whiteSpace: 'nowrap',
                letterSpacing: 0,
                lineHeight: 1.2,
              }}>in interest</span>
            </div>
            <div style={{
              fontSize: 13,
              color: '#737184',
              marginTop: 8,
              fontWeight: 600,
              lineHeight: 1.4,
              letterSpacing: 0,
            }}>
              and become debt-free {animMonthsDiff} months sooner
            </div>
          </div>
        </div>

        {/* 5. comparison card */}
        <div style={{ padding: '14px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
            <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, fontWeight: 800, letterSpacing: 0.8, color: MELT.muted3 }}>TOTAL INTEREST YOU'D PAY</div>
            <button onClick={() => go('visualise')} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, fontWeight: 800, color: MELT.purple }}>
              Visualise how {Icon.arrowR(MELT.purple)}
            </button>
          </div>
          <div style={{ background: '#fff', borderRadius: 10, padding: 16, boxShadow: '0 10px 26px -20px rgba(40,30,80,.45)', display: 'flex', flexDirection: 'column', gap: 12, border: '1px solid #EFEAFD' }}>
            <MeltCompareRow label="Your cards now" rate={54} total={inr(animCardsInt)} frac={1} color={MELT.red} playKey={playKey} />
            <MeltCompareRow label="With Melt" rate={25} total={inr(animMeltInt)} frac={cardsInt > 0 ? meltInt / cardsInt : 0.25} color={MELT.purple} playKey={playKey} delay={160} />
          </div>
        </div>

        {/* 4. two stat chips */}
        <div style={{ display: 'flex', gap: 8, padding: '12px 20px 0' }}>
          <div style={{ flex: 1, height: 80, borderRadius: 14, background: MELT.purpleL, border: `1px solid ${MELT.purpleBorder}`, padding: '12px 13px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              {coinDownIcon}
              <span style={{ fontWeight: 800, fontSize: 20, color: MELT.ink, whiteSpace: 'nowrap' }}>₹{savingLakh}L</span>
            </div>
            <div style={{ fontSize: 12, color: MELT.muted2, marginTop: 5 }}>freed in interest</div>
          </div>
          <div style={{ flex: 1, height: 80, borderRadius: 14, background: MELT.greenBg, border: `1px solid ${MELT.greenBorder}`, padding: '12px 13px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              {calTickIcon}
              <span style={{ fontWeight: 800, fontSize: 20, color: MELT.ink, whiteSpace: 'nowrap' }}>{animMonthsDiff} months</span>
            </div>
            <div style={{ fontSize: 12, color: MELT.muted2, marginTop: 5 }}>sooner debt-free</div>
          </div>
        </div>

        {/* 6. benefit pills */}
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

        {/* 7. educational section */}
        <div style={{ padding: '18px 0 0', animation: 'fadeUp .9s .1s both' }}>
          <div style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: 0.8, color: MELT.muted3, marginBottom: 10, padding: '0 20px', textTransform: 'uppercase' }}>
            Understanding Credit Card Debt
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
            <button
              onClick={() => setSheetOpen('interest')}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 10, width: 'calc(100% - 40px)', minHeight: 84, borderRadius: 18,
                background: '#fff', border: '1px solid #ECE8FB', padding: '14px 14px',
                textAlign: 'left', cursor: 'pointer', boxShadow: '0 8px 20px -18px rgba(40,30,80,.45)',
                marginLeft: 20, marginRight: 20,
                animation: 'fadeUp 1s .18s both',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#15122F', lineHeight: 1.25 }}>How Credit Card Interest Works</div>
                <div style={{ fontSize: 12.5, color: '#5F617A', lineHeight: 1.45, marginTop: 5 }}>
                  See how interest and GST can increase the cost of your outstanding balance.
                </div>
              </div>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 999, background: '#F4F1FF', flexShrink: 0 }}>
                {Icon.chevR(MELT.purple, 18)}
              </span>
            </button>
            <button
              onClick={() => setSheetOpen('minimum')}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 10, width: 'calc(100% - 40px)', minHeight: 84, borderRadius: 18,
                background: '#fff', border: '1px solid #ECE8FB', padding: '14px 14px',
                textAlign: 'left', cursor: 'pointer', boxShadow: '0 8px 20px -18px rgba(40,30,80,.45)',
                marginLeft: 20, marginRight: 20,
                animation: 'fadeUp 1.12s .28s both',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#15122F', lineHeight: 1.25 }}>Paying Only the Minimum Due?</div>
                <div style={{ fontSize: 12.5, color: '#5F617A', lineHeight: 1.45, marginTop: 5 }}>
                  Learn why minimum payments may keep debt outstanding for longer.
                </div>
              </div>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 999, background: '#F4F1FF', flexShrink: 0 }}>
                {Icon.chevR(MELT.purple, 18)}
              </span>
            </button>
          </div>
        </div>

        {/* 8. disclaimer */}
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
              padding: '4px 16px 12px', borderBottom: '1px solid #F0ECFA'
            }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#161331' }}>
                {sheetOpen === 'interest'
                  ? 'How Credit Card Interest Works'
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
              }}>
                Close
              </button>
            </div>
            <div style={{ padding: '16px 16px 24px', overflowY: 'auto', maxHeight: 'calc(90vh - 72px)' }}>
              {sheetOpen === 'interest' ? (
                <>
                  <div style={{
                    borderRadius: 22,
                    padding: '18px 16px 16px',
                    color: '#fff',
                    background: '#171331',
                    boxShadow: '0 18px 36px -24px rgba(23, 19, 49, 0.9)',
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: '#BEB5F5', textTransform: 'uppercase', letterSpacing: 0.6 }}>
                      Effective Annual Cost
                    </div>
                    <div style={{ marginTop: 8, display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                      <span style={{ fontSize: 44, fontWeight: 850, lineHeight: 0.95, letterSpacing: 0 }}>53.1%</span>
                      <span style={{ paddingBottom: 4, fontSize: 15, fontWeight: 750, color: '#DCD7FF' }}>p.a.</span>
                    </div>
                    <div style={{ marginTop: 12, height: 1, background: 'rgba(255,255,255,0.12)' }} />
                    <div style={{ marginTop: 12, fontSize: 14, fontWeight: 650, color: '#F4F1FF', lineHeight: 1.35 }}>
                      A ₹1,00,000 balance can cost <strong>₹53,100</strong> in one year.
                    </div>
                  </div>

                  <div style={{ marginTop: 16, background: '#FFFFFF', borderRadius: 18, padding: 14, border: '1px solid #ECE8F7', boxShadow: '0 12px 28px -24px rgba(24, 21, 47, 0.7)' }}>
                    <div style={{ fontSize: 12, color: '#78758D', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.6 }}>
                      Monthly cost on ₹1 lakh
                    </div>
                    <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
                      <div style={{ flex: 1 }}>
                        {[
                          ['Interest', '₹3,750'],
                          ['GST on interest', '₹675'],
                        ].map(([label, value]) => (
                          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '8px 0', borderBottom: label === 'Interest' ? '1px solid #F0EDF8' : 'none', fontSize: 13, color: '#555168', fontWeight: 650 }}>
                            <span>{label}</span>
                            <strong style={{ color: '#18152F' }}>{value}</strong>
                          </div>
                        ))}
                      </div>
                      <div style={{
                        minWidth: 92,
                        borderRadius: 16,
                        background: '#F6F3FF',
                        border: '1px solid #E9E2FF',
                        padding: '12px 10px',
                        textAlign: 'center',
                      }}>
                        <div style={{ fontSize: 11, color: '#77738E', fontWeight: 800 }}>Total</div>
                        <div style={{ marginTop: 5, fontSize: 22, color: MELT.purple, fontWeight: 850, lineHeight: 1 }}>
                          ₹4,425
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 14, background: '#FFF8EA', borderRadius: 16, padding: '12px 14px', fontSize: 13, color: '#5A4A12', lineHeight: 1.4, fontWeight: 650, border: '1px solid #F5E2BA' }}>
                    The longer the balance stays unpaid, the more expensive it becomes.
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 14, color: '#5F617A', lineHeight: 1.6 }}>
                    The Minimum Due is the minimum amount required to keep your account active and avoid missing a payment.
                  </div>
                  <div style={{ fontSize: 14, color: '#5F617A', lineHeight: 1.6, marginTop: 8 }}>
                    However, paying only the Minimum Due does not clear the outstanding balance.
                  </div>
                  <div style={{ marginTop: 16, background: '#F7F5FF', borderRadius: 16, padding: 14, border: '1px solid #E8E0FF' }}>
                    <div style={{ fontSize: 12, color: MELT.muted3, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6 }}>Example</div>
                    <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: '1fr auto', rowGap: 6, columnGap: 10, fontSize: 13, color: '#2D2B43' }}>
                      <span>Outstanding Balance</span><strong>₹1,00,000</strong>
                      <span>Minimum Due</span><strong>₹5,000</strong>
                      <span>Amount Remaining</span><strong>₹95,000</strong>
                    </div>
                  </div>
                  <div style={{ marginTop: 12, fontSize: 14, color: '#5F617A', lineHeight: 1.6 }}>
                    Interest may continue to apply on the remaining balance.
                  </div>
                  <div style={{ marginTop: 14, background: '#FFF7E8', borderRadius: 14, padding: '12px 14px', fontSize: 13, color: '#5A4A12', lineHeight: 1.5 }}>
                    Paying only the Minimum Due may reduce immediate payment pressure, but can increase the overall repayment cost over time.
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}

      {/* 10. sticky CTA */}
      <BottomBar bg={MELT.bg}>
        <button onClick={() => go('cards')} style={{
          width: '100%', height: 56, borderRadius: 16, background: MELT.purple, color: '#fff',
          fontWeight: 600, fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
          boxShadow: '0 14px 30px -8px rgba(91,63,212,.6)', transition: 'transform .12s',
        }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(.975)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          Melt my debt {Icon.arrowR('#fff')}
        </button>
      </BottomBar>
    </div>
  );
}

Object.assign(window, { SellingStories, SavingsScreen });
