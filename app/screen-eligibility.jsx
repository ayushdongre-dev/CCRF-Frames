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
      title: 'Money lands instantly',
      sub: 'Same day · straight to your salary account.',
      Visual: Step1Anim,
    },
    {
      num: '02', color: '#3D3DC4',
      title: 'Melt your card dues',
      sub: 'Use the funds to clear your card bills within 10 days.',
      Visual: Step2Anim,
    },
    {
      num: '03', color: '#E8A020',
      title: 'Phase 2 opens itself',
      sub: 'Repay on time · ₹3,00,000 more unlocks automatically.',
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
    <div style={{ position: 'absolute', inset: 0, zIndex: 999, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: 'rgba(12,10,30,0.55)' }}
      onClick={function(e) { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: '#fff', borderRadius: '26px 26px 0 0', height: '60%', display: 'flex', flexDirection: 'column', animation: 'fadeUp .28s both' }}>

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
    { state: 'done', label: 'Available today', desc: 'Lands in your salary bank account' },
    { state: 'active', label: 'Melt your card bills', desc: 'Pay your card dues within 10 days of disbursal' },
    { state: 'locked', label: 'Unlock Phase 2', desc: 'Repay on time and Phase 2 opens up automatically' },
  ];

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: ML.bg, ...sora, position: 'relative' }}>
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
        <div style={{ background: ML.hero, borderRadius: 24, padding: '22px 22px 20px', position: 'relative', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,.16), 0 8px 24px rgba(26,20,56,.30)' }}>
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
        <div style={{ background: ML.card, borderRadius: 20, padding: '18px 18px 10px', marginTop: 14, boxShadow: '0 1px 4px rgba(0,0,0,.08), 0 4px 14px rgba(40,30,80,.14)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontWeight: 800, fontSize: 20, color: ML.ink, letterSpacing: -0.4, ...sora }}>Three simple steps</div>
            <button onClick={() => setShowHIW(true)} style={{ fontSize: 11, fontWeight: 700, color: ML.primary, background: ML.primaryL, borderRadius: 999, padding: '5px 11px', border: 'none', cursor: 'pointer', letterSpacing: 0.1, ...sora, flexShrink: 0 }}>How it works</button>
          </div>

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

// Step 1 — dark account card: amount rolls up, CREDITED badge fades in
function Step1Anim() {
  return (
    <div style={{ background: '#0C1F16', borderRadius: 18, padding: '18px 18px 16px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -36, right: -18, width: 110, height: 110, borderRadius: '50%', background: 'radial-gradient(circle, rgba(45,158,107,.32) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1.2, color: 'rgba(255,255,255,0.38)', fontFamily: "'Sora',sans-serif" }}>SALARY ACCOUNT</span>
        <span style={{ background: '#2D9E6B', borderRadius: 999, padding: '3px 10px', fontSize: 9.5, fontWeight: 800, color: '#fff', letterSpacing: 0.3, animation: 'fadeIn .5s .9s both', fontFamily: "'Sora',sans-serif" }}>✓ CREDITED</span>
      </div>
      <SlotCount target={200000} color="#4ADE80" size={38} period={4200} climb={1600} />
      <div style={{ marginTop: 14, height: 3, borderRadius: 999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: '100%', borderRadius: 999, background: 'linear-gradient(90deg,#2D9E6B,#4ADE80)', transformOrigin: 'left', animation: 'growBarX 1.8s .15s cubic-bezier(.4,0,.2,1) both' }} />
      </div>
    </div>
  );
}

// Step 2 — card balance counts to zero, PAID stamp pops in, loops
function Step2Anim() {
  var bst = useState(187400); var balance = bst[0]; var setBalance = bst[1];
  var pst = useState(false); var paid = pst[0]; var setPaid = pst[1];
  var rafRef = useRef(null); var timerRef = useRef(null);

  useEffect(function() {
    var TOTAL = 187400, DURATION = 2600;
    function runLoop() {
      setPaid(false); setBalance(TOTAL);
      var start = performance.now();
      function tick(now) {
        var t = Math.min((now - start) / DURATION, 1);
        var e = 1 - Math.pow(1 - t, 2.5);
        setBalance(Math.round(TOTAL * (1 - e)));
        if (t < 1) { rafRef.current = requestAnimationFrame(tick); }
        else { setBalance(0); setPaid(true); timerRef.current = setTimeout(runLoop, 2000); }
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    timerRef.current = setTimeout(runLoop, 280);
    return function() { clearTimeout(timerRef.current); cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div style={{ position: 'relative', borderRadius: 18, padding: '20px 18px 18px', background: 'linear-gradient(135deg,#1E1660,#3D3DC4)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -28, right: -14, width: 88, height: 88, borderRadius: '50%', background: 'rgba(255,255,255,0.055)', pointerEvents: 'none' }} />
      <div style={{ fontSize: 9.5, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 1, marginBottom: 8, fontFamily: "'Sora',sans-serif" }}>CARD BALANCE</div>
      <div style={{ fontSize: 38, fontWeight: 900, color: '#fff', fontFamily: "'Sora',sans-serif", letterSpacing: -2, lineHeight: 1, marginBottom: 14, fontVariantNumeric: 'tabular-nums' }}>{inr(balance)}</div>
      <div style={{ height: 5, borderRadius: 999, background: 'rgba(255,255,255,0.14)', overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: 999, background: paid ? '#4ADE80' : '#FF6B6B', width: (balance / 187400 * 100) + '%', transition: 'background .35s ease' }} />
      </div>
      {paid && (
        <div style={{ position: 'absolute', right: 18, top: '48%', transform: 'translateY(-50%) rotate(-10deg)', animation: 'paidDrop .38s cubic-bezier(.2,1.4,.4,1) both' }}>
          <span style={{ display: 'inline-block', border: '2.5px solid #2D9E6B', color: '#1A5C3A', fontSize: 14, fontWeight: 900, letterSpacing: 1.5, borderRadius: 7, padding: '5px 11px', background: 'rgba(255,255,255,.97)', fontFamily: "'Sora',sans-serif" }}>PAID ✓</span>
        </div>
      )}
    </div>
  );
}

// Step 3 — padlock opens, ₹3L amount rolls in
function Step3Anim() {
  var ust = useState(false); var unlocked = ust[0]; var setUnlocked = ust[1];
  var ast = useState(false); var showAmt = ast[0]; var setShowAmt = ast[1];
  var t1 = useRef(null); var t2 = useRef(null); var t3 = useRef(null);

  useEffect(function() {
    function runLoop() {
      setUnlocked(false); setShowAmt(false);
      t1.current = setTimeout(function() { setUnlocked(true); }, 1100);
      t2.current = setTimeout(function() { setShowAmt(true); }, 1700);
      t3.current = setTimeout(runLoop, 5000);
    }
    runLoop();
    return function() { clearTimeout(t1.current); clearTimeout(t2.current); clearTimeout(t3.current); };
  }, []);

  return (
    <div style={{ background: '#FDF5E4', borderRadius: 18, padding: '18px 18px', border: '1px solid #F0DCAE', display: 'flex', alignItems: 'center', gap: 18 }}>
      <div style={{
        width: 64, height: 64, borderRadius: 18, flexShrink: 0,
        background: unlocked ? '#E8A020' : '#BDB9CE',
        boxShadow: unlocked ? '0 6px 22px rgba(232,160,32,.5)' : '0 3px 8px rgba(0,0,0,.10)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background .45s ease, box-shadow .45s ease',
      }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          {/* closed shackle */}
          <path d="M8 11V7a4 4 0 018 0v4" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
            style={{ opacity: unlocked ? 0 : 1, transition: 'opacity .25s' }} />
          {/* open shackle (raised) */}
          <path d="M8 11V8.5A4 4 0 0115.8 7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
            style={{ opacity: unlocked ? 1 : 0, transition: 'opacity .25s .15s' }} />
          <rect x="3" y="11" width="18" height="11" rx="3" fill="rgba(255,255,255,0.92)" />
          <circle cx="12" cy="17" r="2.3" fill={unlocked ? '#E8A020' : '#BDB9CE'} style={{ transition: 'fill .4s' }} />
        </svg>
      </div>
      <div>
        <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 0.8, color: '#C6A560', marginBottom: 6, fontFamily: "'Sora',sans-serif" }}>PHASE 2 UNLOCKS</div>
        {showAmt
          ? <SlotCount target={300000} color="#92640A" size={34} period={4200} climb={1200} />
          : <div style={{ fontSize: 30, fontWeight: 900, color: '#D4C4A0', fontFamily: "'Sora',sans-serif", letterSpacing: -0.5 }}>₹ • • •</div>
        }
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
