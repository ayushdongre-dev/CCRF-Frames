// screen-amount.jsx — Loan Amount Selection (after PDF upload) · Equall/LTCV
// Arc dial spans the FULL ₹4,00,000 limit; only ₹1,50,000 is unlocked today,
// so the thumb is capped at ₹1.5L and the ₹1.5L→₹4L arc shows as locked.
// Also defines the shared EquallHead used by the Final Offer screen.
const AMT = {
  bg: '#FFFFFF', ink: '#1E293B', ink2: '#334155', muted: '#64748B', muted2: '#94A3B8',
  purple: '#5B5BD6', purpleLite: '#DDD9F7', purpleL: '#EDE9FE', purpleBorder: '#C7C4F2',
  arcTrack: '#E2E8F0', navy: '#1E3A5F', line: '#E2E8F0',
};

// ── Shared Equall / LTCV Credit header (used here + Final Offer) ──
function EquallHead({ onHome }) {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px 16px 14px', flexShrink: 0 }}>
      <button onClick={onHome} aria-label="Home" style={{ position: 'absolute', left: 16, top: 4, width: 38, height: 38, borderRadius: 999, border: '1.6px solid #C7C4F2', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 11l9-7 9 7" stroke="#5B5BD6" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 9.5V20h5v-5h4v5h5V9.5" stroke="#5B5BD6" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <div style={{ width: 30, height: 30, borderRadius: 9, background: 'linear-gradient(135deg,#7C6CF5,#3B0764)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 14px -6px rgba(91,91,214,.7)' }}>
          <span style={{ fontSize: 17, fontWeight: 800, color: '#fff', fontFamily: "'Sora',sans-serif", lineHeight: 1 }}>M</span>
        </div>
        <div style={{ lineHeight: 1.05 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#1E293B', letterSpacing: 0.5, fontFamily: "'Sora',sans-serif" }}>EQUALL</div>
          <div style={{ fontSize: 9.5, fontWeight: 500, color: '#94A3B8', marginTop: 1 }}>A brand of LTCV Credit</div>
        </div>
      </div>
    </div>
  );
}

function shortInr(v) {
  if (v >= 100000) { const l = v / 100000; return '₹' + (Number.isInteger(l) ? l : l.toFixed(1)) + 'L'; }
  return '₹' + Math.round(v / 1000) + 'K';
}

// ── Semicircular arc dial with an unlocked cap ────────────────
function ArcDial({ value, min, max, cap, step, onChange }) {
  const ref = useRef(null);
  const [drag, setDrag] = useState(false);
  const R = 132, CX = 160, CY = 168, VW = 320, VH = 190, SW = 15;
  const L = Math.PI * R;
  const f = (value - min) / (max - min);
  const capF = (cap - min) / (max - min);
  const theta = Math.PI * (1 - f);
  const tx = CX + R * Math.cos(theta), ty = CY - R * Math.sin(theta);
  const capTheta = Math.PI * (1 - capF);
  const lx = CX + R * Math.cos(capTheta), ly = CY - R * Math.sin(capTheta);
  const ARC = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`;

  const setFromEvent = (clientX, clientY) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (clientX - rect.left) * (VW / rect.width);
    const py = (clientY - rect.top) * (VH / rect.height);
    let ang = Math.atan2(CY - py, px - CX) * 180 / Math.PI;
    ang = Math.max(0, Math.min(180, ang));
    const frac = 1 - ang / 180;
    let v = min + frac * (max - min);
    v = Math.round(v / step) * step;
    v = Math.max(min, Math.min(cap, v)); // capped at unlocked limit
    if (v !== value) onChange(v);
  };

  useEffect(() => {
    if (!drag) return;
    const mv = (e) => { const t = e.touches ? e.touches[0] : e; setFromEvent(t.clientX, t.clientY); e.preventDefault(); };
    const up = () => setDrag(false);
    window.addEventListener('pointermove', mv, { passive: false });
    window.addEventListener('pointerup', up);
    return () => { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); };
  }, [drag, value]);

  return (
    <svg ref={ref} viewBox={`0 0 ${VW} ${VH}`} style={{ width: '100%', display: 'block', touchAction: 'none', cursor: 'pointer' }}
      onPointerDown={(e) => { setDrag(true); setFromEvent(e.clientX, e.clientY); }}>
      <defs>
        <pattern id="lockHatch" patternUnits="userSpaceOnUse" width="7" height="7" patternTransform="rotate(45)">
          <rect width="7" height="7" fill="#E6E8EF" />
          <line x1="0" y1="0" x2="0" y2="7" stroke="#C2C8D4" strokeWidth="2.6" />
        </pattern>
      </defs>
      {/* locked track (full arc, grey base) */}
      <path d={ARC} fill="none" stroke={AMT.arcTrack} strokeWidth={SW} strokeLinecap="round" />
      {/* locked hatched region (cap→max) — reads clearly as unavailable */}
      <path d={ARC} fill="none" stroke="url(#lockHatch)" strokeWidth={SW} strokeLinecap="butt" strokeDasharray={`0 ${capF * L} ${(1 - capF) * L}`} />
      {/* unlocked track (light purple, min→cap) */}
      <path d={ARC} fill="none" stroke={AMT.purpleLite} strokeWidth={SW} strokeLinecap="round" strokeDasharray={`${capF * L} ${L * 2}`} />
      {/* selected fill (solid purple, min→value) */}
      <path d={ARC} fill="none" stroke={AMT.purple} strokeWidth={SW} strokeLinecap="round" strokeDasharray={`${f * L} ${L * 2}`} />
      {/* lock marker at the unlocked cap */}
      <g transform={`translate(${lx} ${ly})`}>
        <circle r="11" fill="#fff" stroke={AMT.purpleBorder} strokeWidth="1.5" style={{ filter: 'drop-shadow(0 2px 4px rgba(30,41,59,.2))' }} />
        <g transform="translate(-5.5 -5.5) scale(.46)"><rect x="4" y="11" width="16" height="9" rx="2" stroke="#94A3B8" strokeWidth="2.4" fill="none" /><path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="#94A3B8" strokeWidth="2.4" strokeLinecap="round" fill="none" /></g>
      </g>
      {/* thumb */}
      <circle cx={tx} cy={ty} r="13" fill="#fff" stroke={AMT.purple} strokeWidth="4" style={{ filter: 'drop-shadow(0 4px 8px rgba(91,91,214,.45))' }} />
      {/* center labels */}
      <text x={CX} y={CY - 34} textAnchor="middle" fontFamily="'Sora',sans-serif" fontWeight="800" fontSize="42" fill={AMT.ink}>{shortInr(value)}</text>
      <text x={CX} y={CY - 12} textAnchor="middle" fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="600" fontSize="14" fill={AMT.muted}>Loan Amount</text>
    </svg>
  );
}

function AmountSelection({ go }) {
  const sora = { fontFamily: "'Sora', -apple-system, system-ui, sans-serif" };
  const MIN = 50000, MAX = 500000, CAP = 200000, STEP = 10000;
  const [amount, setAmount] = useState(0);
  const introPlayed = useRef(false);
  useEffect(() => {
    if (introPlayed.current) return;
    introPlayed.current = true;
    let startTs = null;
    const TARGET = 200000, DURATION = 1200;
    const step = (ts) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / DURATION, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setAmount(Math.round(e * TARGET));
      if (p < 1) requestAnimationFrame(step);
      else setAmount(TARGET);
    };
    requestAnimationFrame(step);
  }, []);
  const dec = () => setAmount(a => Math.max(MIN, a - STEP));
  const inc = () => setAmount(a => Math.min(CAP, a + STEP));

  const Stepper = ({ label, onClick, disabled }) => (
    <button onClick={onClick} disabled={disabled} style={{
      flex: 1, height: 46, borderRadius: 13, background: '#fff', border: `1.5px solid ${AMT.line}`,
      fontSize: 15, fontWeight: 700, color: disabled ? AMT.muted2 : AMT.ink, opacity: disabled ? 0.55 : 1,
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, ...sora,
    }}>{label}</button>
  );

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: AMT.bg, animation: 'fadeIn .3s' }}>
      <EquallHead onHome={() => go('home')} />

      <div style={{ flex: 1, padding: '4px 20px 0' }}>
        {/* header */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 22, color: AMT.ink, letterSpacing: -0.5, ...sora }}>How much do you need today?</div>
          <div style={{ fontSize: 12.5, color: AMT.muted, fontWeight: 500, marginTop: 6 }}>Drawing from the limit you've unlocked so far</div>
        </div>

        {/* arc dial */}
        <div style={{ marginTop: 16 }}>
          <ArcDial value={amount} min={MIN} max={MAX} cap={CAP} step={STEP} onChange={setAmount} />
          {/* end labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: -8, padding: '0 2px' }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: AMT.muted }}>₹50K</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><rect x="4" y="11" width="16" height="9" rx="2" stroke={AMT.muted2} strokeWidth="1.9" /><path d="M8 11V8a4 4 0 0 1 8 0v3" stroke={AMT.muted2} strokeWidth="1.9" strokeLinecap="round" /></svg>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: AMT.muted2 }}>₹5L total</span>
            </div>
          </div>
        </div>

        {/* unlocked / locked legend */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 14 }}>
          <span style={{ width: 11, height: 11, borderRadius: 3, background: AMT.purple }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: AMT.ink2 }}>Unlocked today</span>
          <span style={{ width: 11, height: 11, borderRadius: 3, marginLeft: 10, background: 'repeating-linear-gradient(45deg, #E6E8EF 0 2.5px, #C2C8D4 2.5px 4px)' }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: AMT.muted }}>Locked · repay to unlock</span>
        </div>

        {/* steppers */}
        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <Stepper label="− ₹10K" onClick={dec} disabled={amount <= MIN} />
          <Stepper label="+ ₹10K" onClick={inc} disabled={amount >= CAP} />
        </div>

        {/* narrative note */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: '#F7F6FD', border: `1px solid ${AMT.line}`, borderRadius: 14, padding: '13px 15px', marginTop: 20 }}>
          <div style={{ flexShrink: 0, marginTop: 1 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="4" y="11" width="16" height="9" rx="2" stroke={AMT.purple} strokeWidth="1.8" /><path d="M8 11V8a4 4 0 0 1 8 0v3" stroke={AMT.purple} strokeWidth="1.8" strokeLinecap="round" /></svg>
          </div>
          <div style={{ fontSize: 12.3, color: AMT.ink2, lineHeight: 1.5 }}>
            Pay your card bills, then come back to unlock the remaining <b style={{ color: AMT.ink }}>{shortInr(MAX - amount)}</b>.
          </div>
        </div>
      </div>

      {/* CTA */}
      <BottomBar bg="#fff">
        <button onClick={() => go('revisedoffer')} style={{
          width: '100%', height: 56, borderRadius: 15, background: AMT.navy, color: '#fff',
          fontWeight: 700, fontSize: 16.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, whiteSpace: 'nowrap', ...sora,
          boxShadow: '0 14px 30px -10px rgba(30,58,95,.55)', transition: 'transform .12s',
        }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(.975)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          Select EMI &amp; Tenure
        </button>
      </BottomBar>
    </div>
  );
}

window.AmountSelection = AmountSelection;
window.EquallHead = EquallHead;
