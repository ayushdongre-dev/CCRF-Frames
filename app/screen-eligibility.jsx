// screen-eligibility.jsx — CCRF Eligibility · tranche "melt ladder"
// Hero shows the tranche unlocked TODAY; below, a vertical melt-journey ladder
// where each tranche unlocks the next as the customer pays down their balance,
// and a cumulative-limit bar visibly grows 2L (Round 1) → 5L (Round 2).
const ML = {
  bg: '#F7F7FB', card: '#FFFFFF', ink: '#1A1A2E', muted: '#8A8AA0', muted2: '#A7A4B8', line: '#ECEAF4',
  primary: '#3D3DC4', primaryL: '#ECECFA',
  green: '#2D9E6B', greenL: '#E7F6EF',
  amber: '#E8A020', amberInk: '#9A6A10', amberL: '#FCF3E1', amberBorder: '#F0DCAE',
  track: '#EDEDF6', frost: '#E8E8F0',
  hero: '#1A1438', heroCard: 'rgba(255,255,255,.07)',
};

function Eligibility({ go }) {
  const sora = { fontFamily: "'Sora', -apple-system, system-ui, sans-serif" };
  const TOTAL = 500000, AVAIL = 200000;
  const availPct = (AVAIL / TOTAL) * 100;

  // ── 3 clean stages ──
  const STAGES = [
    { state: 'done', label: 'Available today', desc: 'Lands in your salary bank account' },
    { state: 'active', label: 'Melt your card bills', desc: 'Use it to clear your outstanding dues by 20th June' },
    { state: 'locked', label: 'Unlock Round 2', desc: 'Repay on time and Round 2 opens up automatically' },
  ];

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: ML.bg, ...sora }}>
      <style>{`@keyframes meltPulse{0%{box-shadow:0 0 0 0 rgba(61,61,196,.30)}70%{box-shadow:0 0 0 8px rgba(61,61,196,0)}100%{box-shadow:0 0 0 0 rgba(61,61,196,0)}}
        @keyframes cashFall{0%{transform:translateY(-4px);opacity:0}25%{opacity:1}100%{transform:translateY(22px);opacity:0}}
        @keyframes paidDrop{0%{transform:rotate(-12deg) scale(1.7);opacity:0}55%{opacity:1}100%{transform:rotate(-12deg) scale(1);opacity:1}}
        @keyframes growBarX{from{transform:scaleX(0)}to{transform:scaleX(1)}}
        @media (prefers-reduced-motion: reduce){[data-anim]{animation:none!important}}`}</style>

      {/* nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 14px 4px', flexShrink: 0 }}>
        <button onClick={() => go('cards')} style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icon.back('#333')}</button>
        <span style={{ fontWeight: 700, fontSize: 19, color: ML.primary, letterSpacing: -0.3, ...sora }}>melt</span>
        <div style={{ width: 38 }} />
      </div>

      <div style={{ flex: 1, padding: '6px 18px 0' }}>
        {/* ── HERO — total limit prominent ── */}
        <div style={{ background: ML.hero, borderRadius: 24, padding: '22px 22px 20px', position: 'relative', overflow: 'hidden', boxShadow: '0 18px 40px -22px rgba(26,20,56,.8)' }}>
          <div style={{ position: 'absolute', top: -50, right: -30, width: 160, height: 160, borderRadius: 999, background: 'radial-gradient(circle, rgba(91,63,212,.55), transparent 70%)' }} />
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.4, color: '#A99CF0', ...sora }}>YOUR TOTAL MELT LIMIT</div>
            <div style={{ fontWeight: 800, fontSize: 50, color: '#fff', letterSpacing: -2, lineHeight: 1.1, marginTop: 4, ...sora }}>₹5,00,000</div>

            {/* availability bar */}
            <div style={{ marginTop: 18 }}>
              <div style={{ position: 'relative', height: 9, borderRadius: 9, background: 'rgba(255,255,255,.14)', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: availPct + '%', background: 'linear-gradient(90deg,#37B179,#5DD79E)', borderRadius: 9, transformOrigin: 'left', animation: 'growBarX .8s cubic-bezier(.4,0,.2,1) both' }} />
              </div>
              <div style={{ marginTop: 9 }}>
                <span style={{ fontSize: 13.5, fontWeight: 800, color: '#8FE3B8', ...sora }}>₹2,00,000</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.6)', marginLeft: 6 }}>available now</span>
              </div>
              <div style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,.45)', marginTop: 4 }}>Unlocks as you repay your credit card dues</div>
            </div>
          </div>
        </div>

        {/* ── 3 STAGES ── */}
        <div style={{ background: ML.card, borderRadius: 20, padding: '18px 18px 10px', marginTop: 14, boxShadow: '0 12px 32px -22px rgba(40,30,80,.5)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.1, color: ML.muted2, ...sora }}>HOW IT WORKS</div>
          <div style={{ fontWeight: 800, fontSize: 20, color: ML.ink, letterSpacing: -0.4, marginTop: 6, ...sora }}>Three simple steps</div>

          <div style={{ marginTop: 16 }}>
            {STAGES.map((s, i) => {
              const last = i === STAGES.length - 1;
              const done = s.state === 'done', active = s.state === 'active', locked = s.state === 'locked';
              const nodeColor = done ? ML.green : active ? ML.primary : '#C9C6DA';
              const nextColor = !last ? (STAGES[i + 1].state === 'done' ? ML.green : STAGES[i + 1].state === 'active' ? ML.primary : '#C9C6DA') : null;
              return (
                <div key={i} style={{ display: 'flex', gap: 14 }}>
                  {/* node + connector */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ position: 'relative', width: 30, height: 30 }}>
                      {active && <span style={{ position: 'absolute', inset: 0, borderRadius: 999, animation: 'meltPulse 2.2s ease-out infinite' }} />}
                      <div style={{ width: 30, height: 30, borderRadius: 999, background: done ? ML.green : '#fff', border: done ? 'none' : `2px solid ${nodeColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: done ? `0 6px 14px -6px ${ML.green}` : 'none' }}>
                        {done ? Icon.check('#fff', 15) : <span style={{ fontSize: 13, fontWeight: 800, color: nodeColor, ...sora }}>{i + 1}</span>}
                      </div>
                    </div>
                    {!last && <div style={{ width: 2.5, flex: 1, minHeight: 78, marginTop: 3, borderRadius: 9, background: `linear-gradient(${nodeColor}, ${nextColor})`, opacity: 0.4 }} />}
                  </div>

                  {/* content */}
                  <div style={{ flex: 1, paddingBottom: last ? 4 : 16, minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: 16, color: locked ? ML.muted : ML.ink, letterSpacing: -0.3, ...sora }}>{s.label}</div>
                    <div style={{ fontSize: 12.5, color: locked ? ML.muted2 : ML.muted, marginTop: 2, lineHeight: 1.45, ...sora }}>{s.desc}</div>
                    {/* per-stage visual */}
                    <div style={{ marginTop: 11 }}>
                      {done && <StageReceive />}
                      {active && <StageMelt />}
                      {locked && <StageLocked />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* savings + tenure summary (bottom) */}
        <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
          <div style={{ flex: 1, background: ML.greenL, borderRadius: 14, padding: '13px 15px' }}>
            <div style={{ fontWeight: 800, fontSize: 21, color: ML.green, letterSpacing: -0.5, ...sora }}>₹28,080</div>
            <div style={{ fontSize: 11.5, color: '#3F7A66', fontWeight: 600, marginTop: 2 }}>saved in interest</div>
          </div>
          <div style={{ flex: 1, background: ML.greenL, borderRadius: 14, padding: '13px 15px' }}>
            <div style={{ fontWeight: 800, fontSize: 21, color: ML.green, letterSpacing: -0.5, ...sora }}>3 months</div>
            <div style={{ fontSize: 11.5, color: '#3F7A66', fontWeight: 600, marginTop: 2 }}>shorter tenure</div>
          </div>
        </div>
        <button onClick={() => go('visualise')} style={{ display: 'block', margin: '12px auto 4px', fontSize: 13, fontWeight: 700, color: ML.primary, ...sora }}>Visualise how →</button>
      </div>

      {/* CTA */}
      <div style={{ position: 'sticky', bottom: 0, padding: '14px 20px 26px', background: ML.bg, borderTop: `1px solid ${ML.line}`, marginTop: 8 }}>
        <button onClick={() => go('pdf')} style={{
          width: '100%', height: 56, borderRadius: 16, background: ML.primary, color: '#fff',
          fontWeight: 700, fontSize: 16.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
          boxShadow: '0 16px 32px -10px rgba(61,61,196,.55)', transition: 'transform .12s', ...sora,
        }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(.975)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          Continue {Icon.arrowR('#fff')}
        </button>
      </div>
    </div>
  );
}

// Stage 1 visual — cash arriving in your salary account (static, big number)
function StageReceive() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', borderRadius: 12, padding: '12px 15px', border: '1px solid #D7EEDF' }}>
      <CashWad color="#2D9E6B" />
      <div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.6, color: '#7BAE97', fontFamily: "'Sora',sans-serif" }}>STRAIGHT TO YOUR ACCOUNT</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: '#1E6B49', letterSpacing: -1, lineHeight: 1.1, fontFamily: "'Sora',sans-serif" }}>₹2,00,000</div>
      </div>
    </div>
  );
}

// static cash wad icon
function CashWad({ color }) {
  return (
    <svg width="46" height="46" viewBox="0 0 48 48" fill="none" style={{ flexShrink: 0 }}>
      <rect x="6" y="16" width="36" height="22" rx="4" fill="#fff" stroke={color} strokeWidth="2.4" />
      <rect x="6" y="16" width="36" height="22" rx="4" fill={color} opacity="0.08" />
      <circle cx="24" cy="27" r="6.5" stroke={color} strokeWidth="2.2" />
      <text x="24" y="30.5" textAnchor="middle" fontSize="9" fontWeight="800" fill={color} fontFamily="sans-serif">₹</text>
      <path d="M11 21v12M37 21v12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Stage 2 visual — cycling card deck: front card fades fully green → rotates back → next comes forward
function StageMelt() {
  var CARDS = [
    'linear-gradient(135deg,#7C6CF5,#4A2FC0)',
    'linear-gradient(135deg,#6A5BE0,#3D3DC4)',
    'linear-gradient(135deg,#4A2FC0,#2A1E72)',
  ];
  var frst = useState(0); var frontIdx = frst[0]; var setFrontIdx = frst[1];
  var gfst = useState(false); var greenFill = gfst[0]; var setGreenFill = gfst[1];
  var ts = useRef([]);

  useEffect(function() {
    var timers = ts.current;
    var add = function(fn, ms) { var id = setTimeout(fn, ms); timers.push(id); return id; };
    var loop = function() {
      setGreenFill(false);
      add(function() {
        setGreenFill(true);
        add(function() {
          setFrontIdx(function(i) { return (i + 1) % 3; });
          setGreenFill(false);
          add(loop, 700);
        }, 900);
      }, 350);
    };
    add(loop, 400);
    return function() { timers.forEach(clearTimeout); timers.length = 0; };
  }, []);

  // rank 0=front, 1=mid, 2=back — clean fan spread
  var POS = [
    { x: 12,  y: 5,  r: 7,   s: 1,    z: 10 },
    { x: -1,  y: 0,  r: -1,  s: 0.925, z: 5  },
    { x: -14, y: 5,  r: -8,  s: 0.85, z: 1  },
  ];

  return (
    <div style={{ background: '#F4F4FC', borderRadius: 14, padding: '22px 14px 18px', border: '1px solid #E2DFF4', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{ position: 'relative', width: 130, height: 82 }}>
        {CARDS.map(function(grad, idx) {
          var rank = (idx - frontIdx + 3) % 3;
          var p = POS[rank];
          var isFront = rank === 0;
          return (
            <div key={idx} style={{
              position: 'absolute', left: '50%', top: '50%',
              width: 80, height: 53, borderRadius: 10,
              background: grad,
              transform: 'translate(calc(-50% + ' + p.x + 'px), calc(-50% + ' + p.y + 'px)) rotate(' + p.r + 'deg) scale(' + p.s + ')',
              transformOrigin: 'center center', zIndex: p.z,
              transition: 'transform 0.5s cubic-bezier(.4,0,.2,1)',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,.3)',
              boxShadow: isFront ? '0 10px 24px -8px rgba(40,20,90,.65)' : '0 3px 8px -3px rgba(40,20,90,.3)',
            }}>
              {/* sheen */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(115deg,rgba(255,255,255,.24),transparent 55%)' }} />
              {/* chip */}
              <div style={{ position: 'absolute', left: 8, top: 10, width: 13, height: 9, borderRadius: 2, background: 'linear-gradient(135deg,#F4D58A,#C99A3A)' }} />
              {/* network dots */}
              <div style={{ position: 'absolute', right: 8, top: 10, display: 'flex' }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: 'rgba(255,90,90,.85)' }} />
                <span style={{ width: 8, height: 8, borderRadius: 999, background: 'rgba(255,190,70,.85)', marginLeft: -3.5 }} />
              </div>
              {/* full-card green overlay — opacity fade, not width sweep */}
              {isFront && (
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: 10,
                  background: 'rgba(45,158,107,0.93)',
                  opacity: greenFill ? 1 : 0,
                  transition: greenFill ? 'opacity 0.36s ease-in' : 'opacity 0.18s ease-out',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" style={{ opacity: greenFill ? 1 : 0, transition: 'opacity 0.15s .18s' }}>
                    <path d="M5 13l4 4 10-11" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#2D9E6B', letterSpacing: 0.4, opacity: 0.85 }}>Clearing your cards</div>
    </div>
  );
}

// Stage 3 visual — locked, with the remaining amount
function StageLocked() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#FAFAFC', borderRadius: 12, padding: '12px 15px', border: '1px dashed #E2DFEF' }}>
      <div style={{ width: 46, height: 46, borderRadius: 12, background: '#F1F0F8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {Icon.lock('#A7A4B8', 20)}
      </div>
      <div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.6, color: '#A7A4B8', fontFamily: "'Sora',sans-serif" }}>UNLOCKS AS YOU REPAY</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#8A8AA0', letterSpacing: -0.8, lineHeight: 1.1, fontFamily: "'Sora',sans-serif" }}>₹3,00,000</div>
      </div>
    </div>
  );
}

function Bolt() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M13 2L4.5 13.5H11l-1 8.5L19 10h-6.5L13 2z" fill="#fff"/></svg>;
}
function InfoDot() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#8FE3B8" strokeWidth="1.8"/><path d="M12 11v5M12 7.5h.01" stroke="#8FE3B8" strokeWidth="2" strokeLinecap="round"/></svg>;
}

// ── animation primitives ──────────────────────────────────────
function usePRM() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    const f = () => setR(m.matches); f();
    m.addEventListener ? m.addEventListener('change', f) : m.addListener(f);
    return () => { m.removeEventListener ? m.removeEventListener('change', f) : m.removeListener(f); };
  }, []);
  return r;
}

// looping slot-reel count-up: 0 → target, hold, restart
function SlotCount({ target, color, size = 26, period = 3000, climb = 1300 }) {
  const reduce = usePRM();
  const [val, setVal] = useState(0);
  const [roll, setRoll] = useState(true);
  useEffect(() => {
    if (reduce) { setVal(target); setRoll(false); return; }
    let raf, s = null;
    const loop = (ts) => {
      if (s == null) s = ts;
      const t = (ts - s) % period;
      if (t < climb) { const p = t / climb; setVal(Math.round((1 - Math.pow(1 - p, 3)) * target)); setRoll(true); }
      else { setVal(target); setRoll(false); }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [target, reduce, period, climb]);
  return <span style={{ display: 'inline-block', fontWeight: 800, fontSize: size, color, letterSpacing: -1, fontVariantNumeric: 'tabular-nums', filter: roll ? 'blur(.5px)' : 'none', transition: 'filter .15s', fontFamily: "'Sora', sans-serif" }}>{inr(val)}</span>;
}

function WalletCash({ color }) {
  return (
    <div style={{ position: 'relative', width: 46, height: 46, flexShrink: 0 }}>
      <div data-anim style={{ position: 'absolute', left: 13, top: 2, width: 20, height: 11, borderRadius: 3, background: color, opacity: .85, animation: 'cashFall 1.5s ease-in infinite' }} />
      <div data-anim style={{ position: 'absolute', left: 17, top: 2, width: 20, height: 11, borderRadius: 3, background: color, opacity: .5, animation: 'cashFall 1.5s ease-in infinite .75s' }} />
      <svg width="46" height="46" viewBox="0 0 48 48" fill="none" style={{ position: 'absolute', inset: 0 }}>
        <rect x="5" y="22" width="38" height="21" rx="5" fill="#fff" stroke={color} strokeWidth="2.4" />
        <path d="M5 29h38" stroke={color} strokeWidth="2" />
        <circle cx="36" cy="36" r="2.6" fill={color} />
      </svg>
    </div>
  );
}

function CashStack({ color }) {
  return (
    <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
      <rect x="6" y="27" width="30" height="15" rx="3" fill="#fff" stroke={color} strokeWidth="2" />
      <rect x="9" y="21" width="30" height="15" rx="3" fill="#fff" stroke={color} strokeWidth="2" />
      <rect x="12" y="15" width="30" height="15" rx="3" fill="#fff" stroke={color} strokeWidth="2" />
      <circle cx="27" cy="22.5" r="4.2" stroke={color} strokeWidth="2" />
      <text x="27" y="25.6" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={color} fontFamily="sans-serif">₹</text>
    </svg>
  );
}

// Step 1 — cash landing in account (slot count-up)
function Step1Anim() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', borderRadius: 12, padding: '12px 14px', border: '1px solid #D7EEDF' }}>
      <WalletCash color="#2D9E6B" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.6, color: '#7BAE97', marginBottom: 2, fontFamily: "'Sora', sans-serif" }}>LANDING IN YOUR ACCOUNT</div>
        <SlotCount target={200000} color="#2D9E6B" />
      </div>
    </div>
  );
}

// Step 3 — additional funds unlock (slot count-up, amber/locked)
function Step3Anim() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#FAFAFC', borderRadius: 12, padding: '12px 14px', border: '1px dashed #E2DFEF' }}>
      <WalletCash color="#E8A020" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.6, color: '#C6A560', marginBottom: 2, fontFamily: "'Sora', sans-serif" }}>ADDITIONAL FUNDS UNLOCK</div>
        <SlotCount target={300000} color="#B98518" />
      </div>
    </div>
  );
}

// Step 2 — coins arc (rainbow curve) from cash stack into the card; balance counts down, PAID stamp
function Step2Anim() {
  const reduce = usePRM();
  const [phase, setPhase] = useState(reduce ? 1 : 0);
  useEffect(() => {
    if (reduce) { setPhase(1); return; }
    let raf, s = null; const P = 5200;
    const loop = (ts) => { if (s == null) s = ts; setPhase(((ts - s) % P) / P); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  // geometry of the arc (within a 270×84 stage)
  const W = 270, H = 86;
  const x0 = 30, y0 = 50;     // launch point (top of cash stack)
  const x1 = 214, y1 = 40;    // landing point (card)
  const lift = 52;            // arc height
  const pt = (t) => {
    const x = x0 + (x1 - x0) * t;
    const y = y0 + (y1 - y0) * t - lift * 4 * t * (1 - t); // parabola, peak mid
    return { x, y };
  };
  // sampled path for the faint rainbow guide
  const RBANDS = ['#FF6B6B', '#F7A23B', '#F4D03F', '#2ECC71', '#3BA0F4', '#7B5BE0'];
  const path = (() => { let d = ''; for (let i = 0; i <= 24; i++) { const p = pt(i / 24); d += (i ? 'L' : 'M') + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ' '; } return d; })();

  const TE = 0.62;                                  // transfers complete at 62% of loop
  const tp = Math.min(phase / TE, 1);
  const balance = Math.round(187400 - tp * 100000); // 1,87,400 → 87,400
  const paid = phase > TE + 0.02;
  const N = 5, span = 0.5, each = (TE - span) / (N - 1); // coin launch stagger

  return (
    <div style={{ position: 'relative', background: '#F4F4FC', borderRadius: 12, padding: '0', border: '1px solid #E2DFF4', overflow: 'hidden', height: H }}>
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
        {/* rainbow guide arc */}
        {!reduce && RBANDS.map((c, k) => (
          <path key={k} d={path} fill="none" stroke={c} strokeWidth="2.1" strokeLinecap="round"
            transform={`translate(0 ${(k - (RBANDS.length - 1) / 2) * 2.3})`}
            style={{ opacity: 0.22 }} />
        ))}
      </svg>

      {/* left: cash source */}
      <div style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}><CashStack color="#3D3DC4" /></div>

      {/* flying coins along the arc */}
      {!reduce && Array.from({ length: N }).map((_, k) => {
        const local = (phase - k * each) / span;
        if (local < 0 || local > 1) return null;
        const p = pt(local);
        const pop = Math.sin(Math.min(local, 0.5) / 0.5 * Math.PI / 2);   // scale-in at launch
        const fade = local > 0.85 ? (1 - local) / 0.15 : 1;               // fade at landing
        const lx = (p.x / W) * 100, ly = (p.y / H) * 100;
        return (
          <div key={k} style={{ position: 'absolute', left: lx + '%', top: ly + '%', transform: `translate(-50%,-50%) scale(${0.7 + 0.3 * pop})`, opacity: fade, zIndex: 3 }}>
            <Coin />
          </div>
        );
      })}

      {/* right: credit card */}
      <div style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', width: 110, zIndex: 2 }}>
        <div style={{ position: 'relative', borderRadius: 9, padding: '8px 9px', background: 'linear-gradient(135deg,#4A2FC0,#3D3DC4)', boxShadow: '0 6px 14px -8px rgba(61,61,196,.6)' }}>
          <div style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: 0.5, color: 'rgba(255,255,255,.7)', fontFamily: "'Sora', sans-serif" }}>CARD BALANCE</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 3 }}>
            <svg width="13" height="13" viewBox="0 0 24 24"><path d="M12 4v13M6 12l6 6 6-6" stroke="#FF6B6E" strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: -0.4, fontVariantNumeric: 'tabular-nums', fontFamily: "'Sora', sans-serif" }}>{inr(balance)}</span>
          </div>
          {paid && (
            <div data-anim style={{ position: 'absolute', right: -3, bottom: -7, transform: 'rotate(-12deg)', animation: 'paidDrop .35s cubic-bezier(.2,1.4,.4,1) both' }}>
              <span style={{ display: 'inline-block', border: '2px solid #2D9E6B', color: '#1E6B49', fontSize: 10, fontWeight: 800, letterSpacing: 1, borderRadius: 4, padding: '1px 5px', background: 'rgba(231,246,239,.95)', fontFamily: "'Sora', sans-serif" }}>PAID</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// small ₹ coin with shine
function Coin() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" style={{ display: 'block', filter: 'drop-shadow(0 2px 3px rgba(61,61,196,.35))' }}>
      <circle cx="12" cy="12" r="10" fill="#E8A020" />
      <circle cx="12" cy="12" r="10" fill="url(#coinG)" />
      <circle cx="12" cy="12" r="7.5" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1" />
      <text x="12" y="16" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff" fontFamily="sans-serif">₹</text>
      <defs>
        <radialGradient id="coinG" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="rgba(255,255,255,.5)" />
          <stop offset="0.5" stopColor="rgba(255,255,255,0)" />
          <stop offset="1" stopColor="rgba(0,0,0,.15)" />
        </radialGradient>
      </defs>
    </svg>
  );
}

window.Eligibility = Eligibility;
