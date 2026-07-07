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

function HowItWorksModal({ onClose }) {
  var sora = { fontFamily: "'Sora', -apple-system, system-ui, sans-serif" };
  var DURATION = 5000;
  var st = useState(0); var step = st[0]; var setStep = st[1];
  var ak = useState(0); var animKey = ak[0]; var setAnimKey = ak[1];
  var pr = useState(0); var progress = pr[0]; var setProgress = pr[1];
  var startRef = useRef(null);
  var rafRef = useRef(null);

  // scroll lock
  useEffect(function() {
    var scr = document.getElementById('phone-scroll-viewport');
    if (scr) scr.style.overflowY = 'hidden';
    return function() { if (scr) scr.style.overflowY = 'auto'; };
  }, []);

  var STEPS = [
    {
      num: '01', color: '#2D9E6B',
      title: '₹2L lands in your bank — today',
      sub: 'Melt wires money directly to your salary account. Same day, zero hassle.',
      Visual: Step1Anim,
    },
    {
      num: '02', color: '#3D3DC4',
      title: 'Clear every card, one by one',
      sub: 'Use those funds to pay off your credit card dues. Watch each balance drop to zero.',
      Visual: Step2Anim,
    },
    {
      num: '03', color: '#E8A020',
      title: 'Phase 2 opens — ₹3L more',
      sub: 'Repay Phase 1 on time and ₹3,00,000 unlocks automatically. No re-apply needed.',
      Visual: Step3Anim,
    },
  ];

  var NSTEPS = STEPS.length;
  var s = STEPS[step];
  var isLast = step === NSTEPS - 1;

  // auto-advance with RAF for smooth per-step progress bar
  useEffect(function() {
    setProgress(0);
    startRef.current = performance.now();
    var tick = function(now) {
      var p = Math.min((now - startRef.current) / DURATION, 1);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setStep(function(cur) {
          if (cur < NSTEPS - 1) {
            setAnimKey(function(k) { return k + 1; });
            return cur + 1;
          }
          onClose();
          return cur;
        });
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return function() { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [step]);

  function skipToNext() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (!isLast) {
      setAnimKey(function(k) { return k + 1; });
      setStep(function(n) { return n + 1; });
    } else {
      onClose();
    }
  }

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 999, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '16px', background: 'rgba(10,8,28,0.68)', backdropFilter: 'blur(4px)' }}
      onClick={function(e) { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: '#fff', borderRadius: 28, width: '100%', maxHeight: '90%', display: 'flex', flexDirection: 'column', animation: 'popIn .32s cubic-bezier(.2,1.15,.4,1) both', boxShadow: '0 28px 70px -18px rgba(10,8,28,.72), 0 8px 24px rgba(0,0,0,.14)' }}>

        {/* Fixed header */}
        <div style={{ padding: '14px 20px 0', flexShrink: 0 }}>
          <div style={{ width: 44, height: 5, borderRadius: 999, background: '#E0DCF0', margin: '0 auto 12px' }} />

          {/* Story-style progress bars — one per step */}
          <div style={{ display: 'flex', gap: 5, marginBottom: 14 }}>
            {STEPS.map(function(_, i) {
              var fill = i < step ? 1 : i === step ? progress : 0;
              return (
                <div key={i} style={{ flex: 1, height: 3, borderRadius: 999, background: '#E8E6F2', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 999, background: s.color, width: (fill * 100) + '%' }} />
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 34, fontWeight: 900, color: s.color, lineHeight: 1, ...sora }}>{s.num}</span>
              <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 1.3, color: '#A7A4B8', ...sora }}>HOW IT WORKS</span>
            </div>
            <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: 999, background: '#F4F3FB', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#888" strokeWidth="2.2" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 0', overscrollBehavior: 'contain' }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#1A1A2E', letterSpacing: -0.4, lineHeight: 1.2, marginBottom: 6, ...sora }}>{s.title}</div>
          <div style={{ fontSize: 13, color: '#8A8AA0', lineHeight: 1.55, marginBottom: 14 }}>{s.sub}</div>
          <div key={animKey}><s.Visual /></div>
          <div style={{ height: 12 }} />
        </div>

        {/* Fixed footer */}
        <div style={{ padding: '10px 20px 22px', flexShrink: 0, borderTop: '1px solid #F0ECFA' }}>
          <button onClick={skipToNext} style={{
            width: '100%', height: 46, borderRadius: 13, border: 'none', cursor: 'pointer',
            background: s.color, color: '#fff', fontWeight: 700, fontSize: 15, ...sora,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            transition: 'transform .1s',
          }}
            onMouseDown={function(e){ e.currentTarget.style.transform='scale(.975)'; }}
            onMouseUp={function(e){ e.currentTarget.style.transform='scale(1)'; }}
            onMouseLeave={function(e){ e.currentTarget.style.transform='scale(1)'; }}>
            {isLast ? 'Got it' : 'Next'}
            {!isLast && <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </button>
        </div>
      </div>
    </div>
  );
}

function Eligibility({ go }) {
  const sora = { fontFamily: "'Sora', -apple-system, system-ui, sans-serif" };
  const TOTAL = 500000, AVAIL = 200000;
  const availPct = (AVAIL / TOTAL) * 100;
  const [showHIW, setShowHIW] = useState(false);

  // ── 3 clean stages ──
  const STAGES = [
    { state: 'done',   label: 'Available today',     desc: '₹2L hits your salary account same day', amount: '₹2,00,000', color: ML.green,   bg: ML.greenL },
    { state: 'active', label: 'Melt your card bills', desc: 'Pay off all card dues within 10 days',   amount: '10 days',   color: ML.primary, bg: ML.primaryL },
    { state: 'locked', label: 'Unlock Phase 2',       desc: 'Repay on time, ₹3L more opens up',       amount: '+₹3L',      color: ML.amber,   bg: ML.amberL },
  ];

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: ML.bg, ...sora, position: 'relative' }}>
      <style>{`@keyframes meltPulse{0%{box-shadow:0 0 0 0 rgba(61,61,196,.30)}70%{box-shadow:0 0 0 8px rgba(61,61,196,0)}100%{box-shadow:0 0 0 0 rgba(61,61,196,0)}}
        @keyframes cashFall{0%{transform:translateY(-4px);opacity:0}25%{opacity:1}100%{transform:translateY(22px);opacity:0}}
        @keyframes paidDrop{0%{transform:rotate(-12deg) scale(1.7);opacity:0}55%{opacity:1}100%{transform:rotate(-12deg) scale(1);opacity:1}}
        @keyframes growBarX{from{transform:scaleX(0)}to{transform:scaleX(1)}}
        @keyframes dashFlow{from{stroke-dashoffset:8}to{stroke-dashoffset:0}}
        @keyframes slideUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes coinRight{0%{transform:translate(0,-50%);opacity:0}15%{opacity:1}85%{opacity:1}100%{transform:translate(120px,-50%);opacity:0}}
        @keyframes chevDown{0%,100%{opacity:.2;transform:translateY(-2px)}50%{opacity:1;transform:translateY(2px)}}
        @media (prefers-reduced-motion: reduce){[data-anim]{animation:none!important}}`}</style>

      {/* nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 14px 4px', flexShrink: 0 }}>
        <button onClick={() => go('cards')} style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icon.back('#333')}</button>
        <span style={{ fontWeight: 700, fontSize: 19, color: ML.primary, letterSpacing: -0.3, ...sora }}>melt</span>
        <div style={{ width: 38 }} />
      </div>

      <div style={{ flex: 1, padding: '6px 18px 0' }}>
        {/* ── HERO — total limit prominent ── */}
        <div style={{ background: ML.hero, borderRadius: 24, padding: '22px 22px 20px', position: 'relative', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,.16), 0 8px 24px rgba(26,20,56,.30)' }}>
          <div style={{ position: 'absolute', top: -50, right: -30, width: 160, height: 160, borderRadius: 999, background: 'radial-gradient(circle, rgba(91,63,212,.55), transparent 70%)' }} />
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.4, color: '#A99CF0', ...sora }}>YOUR TOTAL MELT LIMIT</div>
            <div style={{ fontWeight: 800, fontSize: 50, color: '#fff', letterSpacing: -2, lineHeight: 1.1, marginTop: 4, ...sora }}>₹5,00,000</div>
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
        <div style={{ background: ML.card, borderRadius: 20, padding: '14px 16px 10px', marginTop: 12, boxShadow: '0 1px 4px rgba(0,0,0,.08), 0 4px 14px rgba(40,30,80,.14)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontWeight: 800, fontSize: 17, color: ML.ink, letterSpacing: -0.3, ...sora }}>Three simple steps</div>
            <button onClick={() => setShowHIW(true)} style={{ fontSize: 11, fontWeight: 700, color: ML.primary, background: ML.primaryL, borderRadius: 999, padding: '5px 11px', border: 'none', cursor: 'pointer', letterSpacing: 0.1, ...sora, flexShrink: 0 }}>How it works ›</button>
          </div>

          {/* Vertical timeline */}
          <div>
            {STAGES.map((s, i) => {
              const done = s.state === 'done', active = s.state === 'active', locked = s.state === 'locked';
              const isLast = i === STAGES.length - 1;
              return (
                <div key={i} style={{ display: 'flex', gap: 13, alignItems: 'flex-start', paddingBottom: isLast ? 0 : 20 }}>
                  {/* Node + line */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 22, flexShrink: 0 }}>
                    <div style={{ position: 'relative', width: 22, height: 22, borderRadius: 999,
                      background: done ? ML.green : active ? ML.primary : '#C8C5DE',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: done ? '0 2px 8px rgba(45,158,107,.4)' : active ? '0 2px 8px rgba(61,61,196,.38)' : 'none',
                      zIndex: 1,
                    }}>
                      {active && <span style={{ position: 'absolute', inset: 0, borderRadius: 999, animation: 'meltPulse 2s ease-out infinite' }} />}
                      {done ? (
                        <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      ) : locked ? (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#9A97B8" strokeWidth="2.4" strokeLinecap="round"><rect x="4" y="10" width="16" height="12" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/></svg>
                      ) : (
                        <div style={{ width: 7, height: 7, borderRadius: 999, background: '#fff' }} />
                      )}
                    </div>
                    {!isLast && <div style={{ width: 2, flex: 1, minHeight: 16, marginTop: 3, background: done ? 'rgba(45,158,107,.3)' : '#E2DFEF', borderRadius: 1 }} />}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, paddingTop: 3 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: locked ? ML.muted : ML.ink, ...sora, lineHeight: 1.25 }}>{s.label}</span>
                      <span style={{
                        fontSize: 11.5, fontWeight: 800, ...sora, flexShrink: 0,
                        color: locked ? '#AEA9C9' : s.color,
                        background: locked ? '#F0EFF8' : s.bg,
                        borderRadius: 999, padding: '2px 9px',
                        border: `1px solid ${locked ? '#E2DFEF' : s.color + '28'}`,
                      }}>{s.amount}</span>
                    </div>
                    {!locked && <div style={{ fontSize: 10.5, color: ML.muted, marginTop: 3, lineHeight: 1.45 }}>{s.desc}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* savings + tenure summary (bottom) */}
        <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
          <div style={{ flex: 1, background: 'linear-gradient(145deg, #E8F8F1 0%, #D4F0E3 100%)', borderRadius: 14, padding: '13px 15px', border: '1px solid rgba(31,169,113,0.18)', boxShadow: '0 1px 4px rgba(31,169,113,.10), 0 4px 14px rgba(31,169,113,.08), inset 0 1px 0 rgba(255,255,255,0.7)' }}>
            <div style={{ fontWeight: 800, fontSize: 21, color: ML.green, letterSpacing: -0.5, ...sora }}>₹28,080</div>
            <div style={{ fontSize: 11.5, color: '#3F7A66', fontWeight: 600, marginTop: 2 }}>saved in interest</div>
          </div>
          <div style={{ flex: 1, background: 'linear-gradient(145deg, #E8F8F1 0%, #D4F0E3 100%)', borderRadius: 14, padding: '13px 15px', border: '1px solid rgba(31,169,113,0.18)', boxShadow: '0 1px 4px rgba(31,169,113,.10), 0 4px 14px rgba(31,169,113,.08), inset 0 1px 0 rgba(255,255,255,0.7)' }}>
            <div style={{ fontWeight: 800, fontSize: 21, color: ML.green, letterSpacing: -0.5, ...sora }}>3 months</div>
            <div style={{ fontSize: 11.5, color: '#3F7A66', fontWeight: 600, marginTop: 2 }}>shorter tenure</div>
          </div>
        </div>
        <button onClick={() => go('visualise')} style={{ display: 'block', margin: '12px auto 4px', fontSize: 13, fontWeight: 700, color: ML.primary, ...sora }}>Visualise how →</button>
      </div>

      {/* CTA */}
      <div style={{ position: 'sticky', bottom: 0, padding: '14px 20px 26px', background: ML.bg, borderTop: `1px solid ${ML.line}`, marginTop: 8 }}>
        <button onClick={() => go('amountselect')} style={{
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

      {showHIW && <HowItWorksModal onClose={() => setShowHIW(false)} />}
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

// Stage 2 visual — CashWad (same as Stage 1) + bold animated arrow + card deck melts one by one
function StageMelt() {
  var CARDS = [
    'linear-gradient(135deg,#7C6CF5,#4A2FC0)',
    'linear-gradient(135deg,#5A4BD1,#3630A8)',
    'linear-gradient(135deg,#4A2FC0,#2A1E72)',
  ];
  var frst = useState(0); var frontIdx = frst[0]; var setFrontIdx = frst[1];
  var gfst = useState(false); var greenFill = gfst[0]; var setGreenFill = gfst[1];
  var efst = useState(false); var cardExit = efst[0]; var setCardExit = efst[1];
  var ts = useRef([]);

  useEffect(function() {
    var timers = ts.current;
    var add = function(fn, ms) { var id = setTimeout(fn, ms); timers.push(id); return id; };
    var loop = function() {
      setGreenFill(false); setCardExit(false);
      add(function() {
        setGreenFill(true);
        add(function() {
          setCardExit(true); setGreenFill(false);
          add(function() {
            setFrontIdx(function(i) { return (i + 1) % 3; });
            setCardExit(false);
            add(loop, 520);
          }, 460);
        }, 680);
      }, 900);
    };
    add(loop, 600);
    return function() { timers.forEach(clearTimeout); timers.length = 0; };
  }, []);

  var POS = [
    { x: 8,  y: 0,  r: 3,   s: 1,    z: 10 },
    { x: 0,  y: 4,  r: -2,  s: 0.93, z: 5  },
    { x: -8, y: 8,  r: -6,  s: 0.86, z: 1  },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', background: '#F0F8F4', borderRadius: 14, border: '1px solid #D7EEDF', padding: '14px 12px', gap: 0 }}>
      <style>{`
        @keyframes arrowFlow {
          0%   { opacity: 0.35; transform: translateX(-3px); }
          50%  { opacity: 1;    transform: translateX(2px); }
          100% { opacity: 0.35; transform: translateX(-3px); }
        }
        @keyframes chevSeq {
          0%, 100% { opacity: 0.18; }
          33%      { opacity: 1; }
        }
      `}</style>

      {/* LEFT — same CashWad as Stage 1 */}
      <div style={{ flexShrink: 0 }}>
        <CashWad color="#2D9E6B" />
      </div>

      {/* CENTER — bold arrow with sequential chevrons to make direction unmistakable */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '0 6px' }}>
        {/* Three sequential chevrons — each pulses in turn left→right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {[0, 1, 2].map(function(k) {
            return (
              <svg key={k} width="18" height="18" viewBox="0 0 24 24" fill="none"
                style={{ animation: 'chevSeq 1.2s ease-in-out ' + (k * 0.32) + 's infinite' }}>
                <path d="M9 6l6 6-6 6" stroke="#2D9E6B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            );
          })}
        </div>
        <span style={{ fontSize: 9, fontWeight: 700, color: '#2D9E6B', letterSpacing: 0.5, opacity: 0.75, fontFamily: "'Sora',sans-serif" }}>pays off</span>
      </div>

      {/* RIGHT — card deck */}
      <div style={{ position: 'relative', width: 96, height: 70, flexShrink: 0 }}>
        {CARDS.map(function(grad, idx) {
          var rank = (idx - frontIdx + 3) % 3;
          var p = POS[rank];
          var isFront = rank === 0;
          var isExiting = isFront && cardExit;
          return (
            <div key={idx} style={{
              position: 'absolute', left: '50%', top: '50%',
              width: 84, height: 56, borderRadius: 10,
              background: grad,
              transform: 'translate(calc(-50% + ' + p.x + 'px), calc(-50% + ' + p.y + 'px)) rotate(' + p.r + 'deg) scale(' + (isExiting ? 0.05 : p.s) + ')',
              opacity: isExiting ? 0 : 1,
              transformOrigin: 'center center',
              zIndex: p.z,
              transition: isExiting
                ? 'transform 0.42s cubic-bezier(.6,0,1,.85), opacity 0.36s 0.04s ease-out'
                : 'transform 0.52s cubic-bezier(.4,0,.2,1), opacity 0.4s ease-in',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,.3)',
              boxShadow: isFront ? '0 12px 28px -8px rgba(40,20,90,.72)' : '0 4px 10px -4px rgba(40,20,90,.28)',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg,rgba(255,255,255,.26),transparent 55%)' }} />
              <div style={{ position: 'absolute', left: 8, top: 9, width: 13, height: 9, borderRadius: 2, background: 'linear-gradient(135deg,#F4D58A,#C99A3A)' }} />
              <div style={{ position: 'absolute', right: 8, top: 9, display: 'flex' }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: 'rgba(255,90,90,.85)' }} />
                <span style={{ width: 8, height: 8, borderRadius: 999, background: 'rgba(255,190,70,.85)', marginLeft: -3.5 }} />
              </div>
              {isFront && (
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: 10,
                  background: 'rgba(45,158,107,0.94)',
                  opacity: greenFill ? 1 : 0,
                  transition: greenFill ? 'opacity 0.3s ease-in' : 'opacity 0.14s ease-out',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" style={{ opacity: greenFill ? 1 : 0, transition: 'opacity 0.16s .1s' }}>
                    <path d="M5 13l4 4 10-11" stroke="#fff" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
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

// Step 1 — Melt sends ₹2L → straight to your salary account
function Step1Anim() {
  var ast = useState(false); var arrived = ast[0]; var setArrived = ast[1];
  var timers = useRef([]);

  useEffect(function() {
    function clearAll() { timers.current.forEach(clearTimeout); timers.current = []; }
    function push(fn, ms) { var t = setTimeout(fn, ms); timers.current.push(t); }
    function runLoop() {
      clearAll();
      setArrived(false);
      push(function() { setArrived(true); }, 1000);
      push(runLoop, 4200);
    }
    runLoop();
    return clearAll;
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Source — Melt */}
      <div style={{ background: 'linear-gradient(135deg,#4A30B5,#5B3FD4)', borderRadius: '16px 16px 0 0', padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1.1, color: 'rgba(255,255,255,.45)', marginBottom: 5, fontFamily: "'Sora',sans-serif" }}>MELT SENDS</div>
          <div style={{ fontSize: 30, fontWeight: 900, color: '#fff', letterSpacing: -1.5, lineHeight: 1, fontFamily: "'Sora',sans-serif" }}>₹2,00,000</div>
        </div>
        <div style={{ width: 46, height: 46, borderRadius: 13, background: 'rgba(255,255,255,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 22, fontWeight: 900, color: '#fff', fontFamily: "'Sora',sans-serif" }}>M</span>
        </div>
      </div>

      {/* Arrow */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#F7F6FC', padding: '6px 0', borderLeft: '1px solid #E8E6F2', borderRight: '1px solid #E8E6F2', gap: 1 }}>
        {[0, 1, 2].map(function(k) {
          return (
            <svg key={k} width="18" height="12" viewBox="0 0 18 12" fill="none"
              style={{ animation: 'chevDown 1s ' + (k * 0.22) + 's ease-in-out infinite' }}>
              <path d="M2 2l7 8 7-8" stroke="#5B3FD4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity={1 - k * 0.28} />
            </svg>
          );
        })}
      </div>

      {/* Destination — Bank Account */}
      <div style={{
        background: '#0C1F16', borderRadius: '0 0 16px 16px', padding: '16px 18px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        border: arrived ? '1px solid rgba(74,222,128,.2)' : '1px solid transparent',
        transition: 'border-color .4s',
      }}>
        <div>
          <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1.1, color: 'rgba(255,255,255,.38)', marginBottom: 5, fontFamily: "'Sora',sans-serif" }}>YOUR SALARY ACCOUNT</div>
          <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: -1.5, lineHeight: 1, fontFamily: "'Sora',sans-serif", color: arrived ? '#4ADE80' : '#2D5A3D', transition: 'color .5s .2s' }}>
            {arrived ? '₹2,00,000' : '₹0'}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={arrived ? '#4ADE80' : '#2D5A3D'} strokeWidth="1.8" strokeLinecap="round" style={{ transition: 'stroke .4s' }}>
            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8"/>
          </svg>
          {arrived && (
            <span style={{ fontSize: 9, fontWeight: 800, color: '#4ADE80', background: 'rgba(74,222,128,.12)', borderRadius: 999, padding: '2px 8px', animation: 'fadeIn .3s both', fontFamily: "'Sora',sans-serif" }}>✓ CREDITED</span>
          )}
        </div>
      </div>
    </div>
  );
}

// Step 2 — simple card deck: front card gets cleared, slides to back, next comes up, loops
var DECK_COLORS = ['#3D3DC4', '#B5304A', '#1E5FA0'];

function Step2Anim() {
  var fst = useState(0); var frontIdx = fst[0]; var setFrontIdx = fst[1];
  var pst = useState(false); var paid = pst[0]; var setPaid = pst[1];
  var ext = useState(false); var exiting = ext[0]; var setExiting = ext[1];
  var timers = useRef([]);

  useEffect(function() {
    function clearAll() { timers.current.forEach(clearTimeout); timers.current = []; }
    function push(fn, ms) { var t = setTimeout(fn, ms); timers.current.push(t); }
    function loop() {
      clearAll();
      setPaid(false); setExiting(false);
      push(function() { setPaid(true); }, 700);
      push(function() { setExiting(true); setPaid(false); }, 1600);
      push(function() {
        setFrontIdx(function(i) { return (i + 1) % DECK_COLORS.length; });
        setExiting(false);
        push(loop, 380);
      }, 2100);
    }
    push(loop, 350);
    return clearAll;
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <div style={{ position: 'relative', width: '100%', height: 120 }}>
        {DECK_COLORS.map(function(color, idx) {
          var rank = (idx - frontIdx + DECK_COLORS.length) % DECK_COLORS.length;
          var isFront = rank === 0;
          var isExit = isFront && exiting;

          // stacking: rank0=front, rank1=mid, rank2=back
          var ty = isExit ? 22 : rank === 0 ? 0 : rank === 1 ? 11 : 22;
          var sc = isExit ? 0.84 : rank === 0 ? 1 : rank === 1 ? 0.91 : 0.84;
          var op = isExit ? 0.55 : rank === 2 ? 0.6 : 1;
          var zI = isExit ? 0 : rank === 0 ? 10 : rank === 1 ? 5 : 1;

          return (
            <div key={idx} style={{
              position: 'absolute', left: 0, right: 0, top: 0, height: 98,
              borderRadius: 22,
              background: color,
              transform: 'translateY(' + ty + 'px) scale(' + sc + ')',
              transformOrigin: 'top center',
              opacity: op,
              zIndex: zI,
              transition: 'transform .52s cubic-bezier(.4,0,.2,1), opacity .45s',
              overflow: 'hidden',
              boxShadow: isFront && !isExit ? '0 12px 32px rgba(0,0,0,.3)' : '0 2px 6px rgba(0,0,0,.1)',
            }}>
              {/* Shine overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg,rgba(255,255,255,.22) 0%,transparent 55%)' }} />
              {/* Card chip decoration */}
              <div style={{ position: 'absolute', left: 16, top: 16, width: 28, height: 20, borderRadius: 5, background: 'rgba(255,255,255,.18)', border: '1px solid rgba(255,255,255,.25)' }} />
              {/* Card circles (Mastercard-style) */}
              <div style={{ position: 'absolute', right: 16, top: 14, display: 'flex' }}>
                <div style={{ width: 22, height: 22, borderRadius: 999, background: 'rgba(255,255,255,.22)' }} />
                <div style={{ width: 22, height: 22, borderRadius: 999, background: 'rgba(255,255,255,.14)', marginLeft: -8 }} />
              </div>

              {/* Paid overlay */}
              {isFront && paid && !exiting && (
                <div style={{ position: 'absolute', inset: 0, borderRadius: 22, background: 'rgba(45,158,107,.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn .2s both' }}>
                  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                    <circle cx="26" cy="26" r="24" fill="rgba(255,255,255,.15)"/>
                    <path d="M16 26l7 7 13-14" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'fadeIn .25s .05s both' }}/>
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Status label */}
      <div style={{ fontSize: 12, fontWeight: 700, color: paid && !exiting ? '#2D9E6B' : '#8A879B', transition: 'color .3s', letterSpacing: 0.1, fontFamily: "'Sora',sans-serif" }}>
        {paid && !exiting ? '✓ Card cleared' : 'Processing payment...'}
      </div>
    </div>
  );
}

// Step 3 — Lock opens, ₹3L unlocks into your account
function Step3Anim() {
  var ust = useState(false); var unlocked = ust[0]; var setUnlocked = ust[1];
  var ast = useState(false); var showAmt = ast[0]; var setShowAmt = ast[1];
  var timers = useRef([]);

  useEffect(function() {
    function clearAll() { timers.current.forEach(clearTimeout); timers.current = []; }
    function push(fn, ms) { var t = setTimeout(fn, ms); timers.current.push(t); }
    function runLoop() {
      clearAll();
      setUnlocked(false); setShowAmt(false);
      push(function() { setUnlocked(true); }, 900);
      push(function() { setShowAmt(true); }, 1650);
      push(runLoop, 5000);
    }
    runLoop();
    return clearAll;
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Phase 1 done — compact */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: '#E7F7EF', borderRadius: 11, padding: '9px 13px', border: '1px solid #B4E8D0' }}>
        <div style={{ width: 22, height: 22, borderRadius: 7, background: '#2D9E6B', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#1A5C3A', flex: 1 }}>Phase 1 repaid on time</span>
        <span style={{ fontSize: 11.5, fontWeight: 800, color: '#2D9E6B' }}>₹2L ✓</span>
      </div>

      {/* Unlock card */}
      <div style={{ borderRadius: 18, overflow: 'hidden', background: unlocked ? 'linear-gradient(135deg,#FDF3DC,#FFF6E8)' : '#F5F4FB', border: '1px solid ' + (unlocked ? '#EDD899' : '#E2DFEE'), transition: 'background .5s, border-color .5s' }}>
        {/* Top bar — lock icon */}
        <div style={{ padding: '18px 18px 14px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 62, height: 62, borderRadius: 18, flexShrink: 0,
            background: unlocked ? 'linear-gradient(135deg,#F5A623,#E8A020)' : '#D4D1E6',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: unlocked ? '0 8px 22px rgba(232,160,32,.48)' : 'none',
            transition: 'background .55s ease, box-shadow .55s ease',
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M8 11V7a4 4 0 018 0v4" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"
                style={{ opacity: unlocked ? 0 : 1, transition: 'opacity .22s' }} />
              <path d="M8 11V8.2A4 4 0 0116 7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"
                style={{ opacity: unlocked ? 1 : 0, transition: 'opacity .28s .18s' }} />
              <rect x="3" y="11" width="18" height="11" rx="3" fill="rgba(255,255,255,.9)" />
              <circle cx="12" cy="17" r="2.4" fill={unlocked ? '#E8A020' : '#ACA9C4'} style={{ transition: 'fill .4s' }} />
            </svg>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1, color: unlocked ? '#B8882A' : '#A7A4B8', marginBottom: 7, fontFamily: "'Sora',sans-serif", transition: 'color .4s' }}>
              {unlocked ? 'PHASE 2 UNLOCKED' : 'PHASE 2 LOCKED'}
            </div>
            {showAmt ? (
              <div style={{ animation: 'slideUp .4s cubic-bezier(.2,1.15,.4,1) both' }}>
                <SlotCount target={300000} color="#92640A" size={34} period={3800} climb={1200} />
              </div>
            ) : (
              <div style={{ fontSize: 32, fontWeight: 900, color: unlocked ? '#D4A830' : '#C4C0DC', fontFamily: "'Sora',sans-serif", letterSpacing: -1, transition: 'color .4s' }}>₹ · · ·</div>
            )}
          </div>
        </div>

        {/* Bottom bar — status */}
        <div style={{ background: unlocked ? 'rgba(232,160,32,.12)' : 'rgba(0,0,0,.04)', padding: '9px 18px', display: 'flex', alignItems: 'center', gap: 7, transition: 'background .4s' }}>
          <div style={{ width: 7, height: 7, borderRadius: 999, background: unlocked ? '#E8A020' : '#B0ADC8', transition: 'background .4s' }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: unlocked ? '#B8862A' : '#8A87A0', fontFamily: "'Sora',sans-serif", transition: 'color .4s' }}>
            {unlocked ? 'Credited to your account automatically' : 'Unlocks after Phase 1 repayment'}
          </span>
        </div>
      </div>
    </div>
  );
}

// ₹ coin — large, gold, clearly visible
function Coin() {
  return (
    <svg width="34" height="34" viewBox="0 0 48 48" style={{ display: 'block', filter: 'drop-shadow(0 3px 6px rgba(180,110,0,.55))' }}>
      <defs>
        <radialGradient id="coinOuter" cx="0.38" cy="0.3" r="0.75">
          <stop offset="0%" stopColor="#FFE066" />
          <stop offset="55%" stopColor="#F5A623" />
          <stop offset="100%" stopColor="#C77C00" />
        </radialGradient>
        <radialGradient id="coinInner" cx="0.38" cy="0.3" r="0.75">
          <stop offset="0%" stopColor="#FFD84D" />
          <stop offset="100%" stopColor="#D4890A" />
        </radialGradient>
      </defs>
      {/* outer disc */}
      <circle cx="24" cy="24" r="22" fill="url(#coinOuter)" />
      {/* rim highlight */}
      <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1.5" />
      {/* inner ring */}
      <circle cx="24" cy="24" r="16" fill="url(#coinInner)" />
      <circle cx="24" cy="24" r="16" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="1" />
      {/* ₹ symbol */}
      <text x="24" y="31" textAnchor="middle" fontSize="17" fontWeight="900" fill="#fff" fontFamily="'Plus Jakarta Sans',sans-serif" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.25))' }}>₹</text>
      {/* shine glint */}
      <ellipse cx="17" cy="17" rx="5" ry="3.5" fill="rgba(255,255,255,.3)" transform="rotate(-30 17 17)" />
    </svg>
  );
}

window.Eligibility = Eligibility;
