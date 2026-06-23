// screen-eligibility.jsx - CCRF Eligibility: "Melt Your Credit Card Debt"
// Redesigned to match Savings screen design framework

const EL = {
  bg: '#F7F7FC',
  hero: '#0F0D2E',
  purple: '#5B3FD4',
  purpleL: '#EDE8FF',
  purpleBorder: '#C4B5FD',
  green: '#1A7A4A',
  greenSoft: '#66BB88',
  greenBg: '#E8F8EE',
  greenBorder: '#86EFAC',
  red: '#E84040',
  ink: '#1A1A2E',
  card: '#FFFFFF',
  muted: '#888888',
  muted2: '#666666',
  muted3: '#999999',
  amber: '#E8A020',
  amberInk: '#8B6217',
  amberBg: '#FFF8EC',
  amberBorder: '#F5D9A0',
  line: '#ECEAF4',
};

const LoopingCounter = ({ start, end, duration, loopDuration, delay = 0 }) => {
  const { useState, useEffect } = React;
  const [val, setVal] = useState(start);
  useEffect(() => {
    let startTime = performance.now();
    let frame;
    const animate = (time) => {
      let elapsed = time - startTime;
      let localTime = (elapsed - delay) % loopDuration;
      if (localTime < 0) {
         setVal(start);
      } else if (localTime > duration) {
         setVal(end);
      } else {
         let progress = localTime / duration;
         const easeOut = 1 - Math.pow(1 - progress, 3);
         setVal(Math.floor(start + (end - start) * easeOut));
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [start, end, duration, loopDuration, delay]);
  return <>{typeof inr === 'function' ? inr(val) : '₹' + val.toLocaleString('en-IN')}</>;
};

const IconUnlock = (c = 'var(--muted)', s = 13) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
    <rect x="5" y="10" width="14" height="10" rx="2" stroke={c} strokeWidth="2" />
    <path d="M8 10V7a4 4 0 017-3" stroke={c} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

function Stage2Section({ animTick }) {
  const { useState, useEffect } = React;
  const [walletBal, setWalletBal] = useState(150000);
  const [cardBal, setCardBal] = useState(187400);
  const [phase, setPhase] = useState('idle'); // 'idle' | 'paying' | 'paid'

  useEffect(() => {
    // Each time animTick changes, run one full cycle: idle → paying → paid
    setPhase('idle');
    setWalletBal(150000);
    setCardBal(187400);

    let animFrame;
    const IDLE_HOLD = 1200; // brief idle before payment starts
    const PAY_DUR   = 2800; // countdown duration

    const t = setTimeout(() => {
      setPhase('paying');
      const startTime = performance.now();

      const update = (now) => {
        const elapsed = now - startTime;
        if (elapsed < PAY_DUR) {
          const ease = (elapsed / PAY_DUR) * (2 - elapsed / PAY_DUR);
          setWalletBal(Math.round(150000 - 150000 * ease));
          setCardBal(Math.round(187400 - 150000 * ease));
          animFrame = requestAnimationFrame(update);
        } else {
          setWalletBal(0);
          setCardBal(37400);
          setPhase('paid');
        }
      };
      animFrame = requestAnimationFrame(update);
    }, IDLE_HOLD);

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(animFrame);
    };
  }, [animTick]);

  const isUnlocked = phase === 'paid';
  const isPaying = phase === 'paying';

  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'stretch' }}>
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 3, width: 26, flexShrink: 0 }}>
        {/* Timeline rail */}
        <div style={{ position: 'absolute', top: 24, bottom: -20, width: 2, background: isUnlocked ? '#E8F8EE' : '#ECEAF4', transition: 'background 0.5s ease' }} />
        <div style={{
          position: 'absolute',
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: isUnlocked ? EL.green : EL.purple,
          opacity: isPaying ? 0.8 : 0.4,
          zIndex: 3,
          boxShadow: isUnlocked ? `0 0 8px ${EL.green}` : 'none',
          animation: isPaying ? 'railFlowFast 1s linear infinite' : 'railFlow 2.5s ease-in-out infinite',
        }} />

        <div style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: '#fff',
          border: `2px solid ${isUnlocked ? EL.green : EL.purple}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          boxShadow: isUnlocked ? `0 0 10px rgba(26,122,74,0.35)` : 'none',
          transform: isUnlocked ? 'scale(1.1)' : 'scale(1)',
          transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}>
          {isUnlocked ? IconUnlock(EL.green, 11) : Icon.lock(EL.purple, 11)}
        </div>
      </div>

      <div style={{
        flex: 1,
        background: EL.purpleL,
        border: `1px solid ${EL.purpleBorder}`,
        borderRadius: 14,
        padding: '14px 14px 16px',
        overflow: 'hidden',
        boxShadow: 'none',
        transition: 'all 0.5s ease',
      }}>

        {/* ── Arc animation: wallet → arc → card ── */}
        <div style={{ position: 'relative', height: 86, marginBottom: 8, overflow: 'visible' }}>

          {/* Wallet: 52px wide, 36px high. Anchored left. No white background box! */}
          <div style={{ position: 'absolute', top: 10, left: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
            <div style={{
              width: 52,
              height: 36,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #78350F 0%, #451A03 100%)',
              border: '1.5px solid #92400E',
              boxShadow: '0 4px 10px rgba(69,26,3,0.25)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'visible',
            }}>
              {/* Cash note peeking out */}
              <div style={{
                position: 'absolute',
                top: -8,
                left: 10,
                width: 22,
                height: 12,
                borderRadius: '2px 2px 0 0',
                background: 'linear-gradient(to bottom, #10B981, #059669)',
                border: '0.8px solid rgba(255,255,255,0.3)',
                boxShadow: '0 -2px 4px rgba(5,150,105,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 6,
                fontWeight: 900,
                zIndex: 1,
              }}>
                ₹
              </div>

              {/* Wallet flap & clasp */}
              <div style={{
                position: 'absolute',
                right: 0,
                top: 8,
                width: 20,
                height: 20,
                background: '#451A03',
                borderRadius: '4px 0 0 4px',
                borderLeft: '1px solid #78350F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
              }}>
                {/* Gold metal buckle */}
                <div style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: '#F5D9A0',
                  boxShadow: '0 0 2px #E8A020',
                }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
              <span style={{ fontSize: 7, fontWeight: 700, color: EL.muted2, letterSpacing: 0.2 }}>Your A/C</span>
              <span style={{ fontSize: 8.5, fontWeight: 800, color: EL.green, marginTop: 1 }}>
                ₹{walletBal === 150000 ? '1.5L' : (walletBal / 100000).toFixed(2) + 'L'}
              </span>
            </div>
          </div>

          {/* Dashed arc SVG path */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', zIndex: 1, pointerEvents: 'none' }} viewBox="0 0 200 86" preserveAspectRatio="none">
            <path d="M 26 28 Q 100 -12 174 28" fill="none" stroke="rgba(127,85,223,0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
          </svg>

          {/* Staggered green Cash Note bills flying along the arc */}
          {isPaying && [0, 1, 2, 3, 4].map(i => (
            <div key={i} style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: 22,
              height: 12,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #34D399 0%, #059669 100%)',
              border: '0.8px solid rgba(255,255,255,0.4)',
              boxShadow: '0 2px 6px rgba(5,150,105,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 7,
              fontWeight: 900,
              zIndex: 5,
              offsetPath: "path('M 26 28 Q 100 -12 174 28')",
              animation: `flowParticle 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
              animationDelay: `${i * 0.25}s`,
            }}>
              ₹
            </div>
          ))}

          {/* Card: 52px wide, 36px high. Anchored right. */}
          <div style={{ position: 'absolute', top: 10, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
            <div style={{
              width: 52,
              height: 36,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(49,46,129,0.25)',
              border: '1.5px solid #4338CA',
              position: 'relative',
              transition: 'all 0.5s ease',
              animation: isPaying ? 's2CardVibrate 0.15s infinite alternate' : 'none',
            }}>
              {/* Realistic credit card layout */}
              <div style={{ width: '100%', height: '100%', padding: '4px 6px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
                {/* Card chip & contact symbol */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ width: 10, height: 8, background: '#F5D9A0', borderRadius: 1.5, border: '0.5px solid #E8A020' }} />
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" opacity="0.6">
                    <path d="M4 12c4.4-4.4 11.6-4.4 16 0M7 12c2.8-2.8 7.2-2.8 10 0M10 12c1.1-1.1 2.9-1.1 4 0" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                {/* Card number mock */}
                <div style={{ display: 'flex', gap: 2 }}>
                  <div style={{ width: 12, height: 2, background: 'rgba(255,255,255,0.25)', borderRadius: 0.5 }} />
                  <div style={{ width: 12, height: 2, background: 'rgba(255,255,255,0.25)', borderRadius: 0.5 }} />
                  <div style={{ width: 12, height: 2, background: 'rgba(255,255,255,0.25)', borderRadius: 0.5 }} />
                </div>
              </div>

              {/* PAID stamp overlay */}
              {isUnlocked && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) rotate(-15deg)',
                  border: '1.5px solid #E5484D',
                  borderRadius: 3,
                  color: '#E5484D',
                  fontSize: 8.5,
                  fontWeight: 900,
                  padding: '1px 3px',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  background: 'rgba(255, 255, 255, 0.95)',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                  zIndex: 10,
                  animation: 'stampPop 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.3) both',
                }}>
                  PAID
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
              <span style={{ fontSize: 7, fontWeight: 700, color: EL.purple, letterSpacing: 0.2 }}>CARD BALANCE</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 1 }}>
                <span style={{ fontSize: 8.5, fontWeight: 800, color: EL.ink }}>₹{cardBal.toLocaleString('en-IN')}</span>
                {isPaying && (
                  <span style={{ color: '#E5484D', fontSize: 9, fontWeight: 900, animation: 's2RedArr 1.2s infinite ease-in-out', display: 'inline-block' }}>↓</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {Icon.lock(EL.purple, 10)}
            <span style={{ fontSize: 10, fontWeight: 800, color: EL.purple, letterSpacing: 0.5 }}>UNLOCK NEXT</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 8.5, color: EL.muted3, fontWeight: 600, letterSpacing: 0.3 }}>TOTAL LIMIT</div>
            <div style={{ fontSize: 11, fontWeight: 800, color: EL.purple }}>₹2,50,000</div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: EL.muted2, fontWeight: 600, lineHeight: 1.4 }}>
          Pay your card bills using the same account by 4th July 2026
        </div>
      </div>
    </div>
  );
}

function Eligibility({ go }) {
  const FIRST_UNLOCK = 50000;
  const UNLOCKED = 150000;
  const FULL_LIMIT = 300000;
  const TOTAL_DEBT = 187400;
  const CARD_APR = 0.45;
  const EQUALL_APR = 0.22;
  const LOCKED_MORE = FULL_LIMIT - UNLOCKED;
  const ANNUAL_SAVINGS = Math.round(TOTAL_DEBT * (CARD_APR - EQUALL_APR));
  const MONTHLY_SAVINGS = Math.round(ANNUAL_SAVINGS / 12);
  const INTEREST_SAVED = ANNUAL_SAVINGS;
  const progress = Math.round((UNLOCKED / FULL_LIMIT) * 100);
  const unlockedLimit = inr(UNLOCKED);

  const [animIn, setAnimIn] = useState(false);
  const [unlockOpen, setUnlockOpen] = useState(false);
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // Stage 1 state
  const [stage1Val, setStage1Val] = useState(0);
  const [s1Animating, setS1Animating] = useState(true);

  // Permanent fade-in flags (only ever go false → true once)
  const [hasStage2, setHasStage2] = useState(false);
  const [hasStage3, setHasStage3] = useState(false);

  // Tick counters to re-trigger animations each loop (not first-time visibility)
  const [s2AnimTick, setS2AnimTick] = useState(0);
  const [lockAnimKey, setLockAnimKey] = useState(0);

  const seqStep = hasStage3 ? 2 : hasStage2 ? 1 : 0;

  useEffect(() => { const t = setTimeout(() => setAnimIn(true), 80); return () => clearTimeout(t); }, []);

  useEffect(() => {
    // Timing constants (ms)
    const S1_DUR   = 2400; // Stage 1 counter counts 0 → 1.5L
    const S2_DUR   = 1200 + 2800 + 600; // idle hold + paying + paid hold = 4600ms
    const S3_DUR   = 1400; // lock animation display time
    const LOOP_GAP = 800;  // brief pause before restarting
    const LOOP_INTERVAL = S1_DUR + S2_DUR + S3_DUR + LOOP_GAP; // ~9200ms

    let animFrame;
    let timers = [];

    const runCycle = () => {
      // ── Stage 1: money flies in, counter counts up ──
      setStage1Val(0);
      setS1Animating(true);

      const startTime = performance.now();
      const tickS1 = (now) => {
        const elapsed = now - startTime;
        if (elapsed < S1_DUR) {
          const ease = (elapsed / S1_DUR) * (2 - elapsed / S1_DUR);
          setStage1Val(Math.round(150000 * ease));
          animFrame = requestAnimationFrame(tickS1);
        } else {
          setStage1Val(150000);
          setS1Animating(false); // stop money particles
        }
      };
      animFrame = requestAnimationFrame(tickS1);

      // ── Stage 2 triggers after Stage 1 finishes ──
      const t1 = setTimeout(() => {
        setHasStage2(true);          // first time: fades in; subsequent: already visible
        setS2AnimTick(n => n + 1);   // always: re-runs Stage2 animation cycle
      }, S1_DUR);
      timers.push(t1);

      // ── Stage 3 triggers after Stage 2 finishes ──
      const t2 = setTimeout(() => {
        setHasStage3(true);          // first time: fades in; subsequent: already visible
        setLockAnimKey(n => n + 1);  // always: re-triggers lock CSS animation
      }, S1_DUR + S2_DUR);
      timers.push(t2);
    };

    runCycle();
    const interval = setInterval(() => {
      cancelAnimationFrame(animFrame);
      timers.forEach(clearTimeout);
      timers = [];
      runCycle();
    }, LOOP_INTERVAL);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animFrame);
      timers.forEach(clearTimeout);
    };
  }, []);
  useEffect(() => {
    const scr = document.getElementById('phone-scroll-viewport');
    if (!scr) return;
    if (howItWorksOpen) {
      scr.style.overflowY = 'hidden';
      scr.scrollTop = 0;
      const preventDefault = (e) => {
        // prevent dragging / scrolling gestures
        e.preventDefault();
      };
      scr.addEventListener('wheel', preventDefault, { passive: false });
      scr.addEventListener('touchmove', preventDefault, { passive: false });
      return () => {
        scr.removeEventListener('wheel', preventDefault);
        scr.removeEventListener('touchmove', preventDefault);
        scr.style.overflowY = 'auto';
      };
    }
  }, [howItWorksOpen]);

  const milestones = [
    {
      amount: inr(FIRST_UNLOCK),
      label: 'Completed',
      state: 'done',
      position: (FIRST_UNLOCK / FULL_LIMIT) * 100,
    },
    {
      amount: inr(UNLOCKED),
      label: 'Unlocked limit',
      state: 'active',
      position: (UNLOCKED / FULL_LIMIT) * 100,
    },
    {
      amount: inr(FULL_LIMIT),
      label: 'Pay dues to unlock',
      state: 'locked',
      position: 100,
    },
  ];

  const SavingsTile = ({ icon, value, label }) => (
    <div style={{
      flex: 1,
      height: 80,
      borderRadius: 14,
      background: EL.greenBg,
      border: `1px solid ${EL.greenBorder}`,
      padding: '12px 13px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        {icon}
        <span style={{ fontWeight: 800, fontSize: 20, color: EL.ink, whiteSpace: 'nowrap' }}>{value}</span>
      </div>
      <div style={{ fontSize: 12, color: EL.muted2, marginTop: 5 }}>{label}</div>
    </div>
  );

  const steps = [
    {
      title: "1. Instant Disbursal",
      description: "Out of your full limit, the initial approved amount is sent instantly to your bank account."
    },
    {
      title: "2. Melt Card Dues",
      description: "Use the approved funds to clear the card dues of some of your credit cards one by one."
    },
    {
      title: "3. Unlock Round 2",
      description: "Once you clear some dues, come back to Equall to unlock your next round of funds."
    }
  ];

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: EL.bg, animation: 'fadeIn .35s' }}>
      <style>{`
        @keyframes progressGrow {
          from { width: 0%; }
          to { width: ${progress}%; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(26,122,74,.35); }
          50% { box-shadow: 0 0 0 8px rgba(26,122,74,.0); }
        }
        @keyframes shimmer {
          from { background-position: -200px 0; }
          to { background-position: 200px 0; }
        }
        @keyframes nodeAppear {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: .9; }
          50% { transform: translateY(5px); opacity: .5; }
        }
        @keyframes howItWorksFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes cardSlideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes howItWorksShake {
          0%, 100% { transform: translateY(0) rotate(-4deg); }
          50% { transform: translateY(-4px) rotate(-6deg); }
        }
        @keyframes paymentFlash {
          0%, 40% { opacity: 0; }
          50%, 90% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes coinFly1 {
          0% { transform: translate(0, 50px) scale(0.5); opacity: 0; }
          20% { opacity: 1; }
          50%, 100% { transform: translate(50px, -35px) scale(1); opacity: 0; }
        }
        @keyframes coinFly2 {
          0% { transform: translate(0, 50px) scale(0.5); opacity: 0; }
          30% { opacity: 1; }
          60%, 100% { transform: translate(-35px, -45px) scale(1); opacity: 0; }
        }
        @keyframes unlockRotate {
          0%, 40% { transform: scale(1) rotate(0deg); }
          50%, 90% { transform: scale(1.15) rotate(-15deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes sparkleFloat {
          0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translate(15px, -15px) scale(1.2); opacity: 0; }
        }
        @keyframes liveDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.65); opacity: 0.2; }
        }
        @keyframes entryParticle {
          0% { transform: translate(-30px, -24px) scale(0.5) rotate(0deg); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translate(6px, 12px) scale(0.9) rotate(270deg); opacity: 0; }
        }
        @keyframes walletReceive {
          0%   { transform: translateY(-16px) scale(0.8); opacity: 0; }
          20%  { transform: translateY(0px)  scale(1);   opacity: 1; }
          70%  { transform: translateY(0px)  scale(1);   opacity: 1; }
          100% { transform: translateY(6px)  scale(0.9); opacity: 0; }
        }
        /* ── Stage 2 seamless arc animation ── */
        @keyframes flowParticle {
          0% {
            offset-distance: 0%;
            opacity: 0;
            transform: scale(0.4) rotate(0deg);
          }
          10% {
            opacity: 1;
            transform: scale(1.1) rotate(45deg);
          }
          90% {
            opacity: 1;
            transform: scale(1) rotate(315deg);
          }
          100% {
            offset-distance: 100%;
            opacity: 0;
            transform: scale(0.4) rotate(360deg);
          }
        }
        @keyframes s2CardVibrate {
          0% { transform: scale(1.02) rotate(-1.5deg); }
          100% { transform: scale(1.02) rotate(1.5deg); }
        }
        @keyframes shineSweep {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        @keyframes stampPop {
          0% { transform: translate(-50%, -50%) scale(2.5) rotate(-35deg); opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(1) rotate(-15deg); opacity: 1; }
        }
        @keyframes s2RedArr {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50%      { transform: translateY(3px); opacity: 1; }
        }
        @keyframes s2PaidIn {
          from { transform: rotate(-18deg) scale(0.5); opacity: 0; }
          60%  { transform: rotate(4deg)  scale(1.1); opacity: 1; }
          to   { transform: rotate(0deg)  scale(1);   opacity: 1; }
        }
        @keyframes railFlow {
          0%   { top: 26px; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: calc(100% + 5px); opacity: 0; }
        }
        @keyframes railFlowFast {
          0%   { top: 26px; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: calc(100% + 5px); opacity: 0; }
        }
        @keyframes moneyFlyIn {
          0%   { transform: translate(var(--fx), var(--fy)) scale(0.3) rotate(var(--fr)); opacity: 0; }
          20%  { opacity: 1; }
          70%  { opacity: 1; }
          100% { transform: translate(0px, 0px) scale(0.6) rotate(0deg); opacity: 0; }
        }
        @keyframes blockFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0px); }
        }
        @keyframes lockShackleOpen {
          0%   { transform: rotate(0deg) translateY(0px); }
          40%  { transform: rotate(-28deg) translateY(-4px); }
          70%  { transform: rotate(-38deg) translateY(-6px); }
          100% { transform: rotate(-38deg) translateY(-6px); }
        }
        @keyframes lockBodyGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(91,63,212,0.3); }
          50%       { box-shadow: 0 0 12px 4px rgba(91,63,212,0.2); }
        }
        @keyframes walletPulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.06); }
        }
      `}</style>

      {/* nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 14px 6px', flexShrink: 0 }}>
        <button onClick={() => go('cards')} style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {Icon.back('#333333')}
        </button>
        <span style={{ fontWeight: 600, fontSize: 21, color: EL.purple, letterSpacing: -0.4 }}>melt</span>
        <div style={{ width: 38 }} />
      </div>

      <div style={{ flex: 1, padding: '6px 20px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>


        {/* Hero card — dark, like savings */}
        <section style={{
          borderRadius: 24,
          background: EL.hero,
          overflow: 'hidden',
          boxShadow: '0 22px 44px -22px rgba(15,13,46,.7)',
        }}>
          <div style={{ padding: '26px 24px 22px', textAlign: 'center', position: 'relative' }}>
            {/* subtle radial glow */}
            <div style={{
              position: 'absolute',
              top: -40,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 220,
              height: 220,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(91,63,212,.25) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1,
              color: EL.greenSoft,
              textTransform: 'uppercase',
              position: 'relative',
            }}>
              <span style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                background: EL.green,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 12px -4px rgba(26,122,74,.8)',
              }}>
                {Icon.check('#fff', 12)}
              </span>
              UNLOCKED OFFER
            </div>

            <div style={{
              marginTop: 16,
              fontSize: 46,
              lineHeight: 1,
              fontWeight: 800,
              color: '#fff',
              letterSpacing: -1,
              position: 'relative',
            }}>
              {unlockedLimit}
            </div>

            <div style={{
              marginTop: 10,
              fontSize: 14.5,
              lineHeight: 1.4,
              fontWeight: 600,
              color: 'rgba(255,255,255,.85)',
            }}>
              Unlocked limit ready for you today
            </div>

            {/* Info box */}
            <div style={{ margin: '18px 0 4px', background: 'rgba(255,255,255,.07)', borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'flex-start', gap: 10, textAlign: 'left' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 9c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1z" fill="#66BB88" />
              </svg>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,.8)', lineHeight: 1.5, fontWeight: 500 }}>
                Out of the <span style={{ color: '#fff', fontWeight: 700 }}>₹1,87,400</span> you selected, we're unlocking <span style={{ color: '#4ADE80', fontWeight: 700 }}>₹1,50,000</span> for you right now.
              </span>
            </div>

          </div>

        </section>

        {/* Unlock in Stages section */}
        <section style={{
          marginTop: 16,
          background: EL.card,
          borderRadius: 20,
          padding: '20px 20px 22px',
          boxShadow: '0 10px 26px -20px rgba(40,30,80,.45)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.8, color: EL.muted3 }}>UNLOCK IN STAGES</span>
            <button
              onClick={() => { setHowItWorksOpen(true); setActiveStep(0); }}
              style={{
                fontSize: 12, fontWeight: 700, color: EL.purple, background: EL.purpleL,
                padding: '4px 10px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 4, cursor: 'pointer', transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = 0.85}
              onMouseLeave={e => e.currentTarget.style.opacity = 1}
            >
              How it works?
            </button>
          </div>
          <div style={{ fontWeight: 800, fontSize: 20, color: EL.ink, letterSpacing: -0.3, marginBottom: 18 }}>You unlock it in stages</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Stage 1 — available now: money flies into wallet */}
            <div style={{
              display: 'flex', gap: 10, alignItems: 'stretch',
              animation: 'blockFadeIn 0.6s ease both',
              animationDelay: '0.1s',
            }}>
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 3, width: 26, flexShrink: 0 }}>
                {/* Timeline rail */}
                <div style={{ position: 'absolute', top: 24, bottom: -20, width: 2, background: '#ECEAF4' }} />
                <div style={{ position: 'absolute', width: 5, height: 5, borderRadius: '50%', background: EL.green, zIndex: 3, animation: 'railFlow 2.5s ease-in-out infinite' }} />
                <div style={{ position: 'relative', width: 26, height: 26, borderRadius: '50%', background: EL.green, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, boxShadow: '0 4px 12px -4px rgba(26,122,74,.6)' }}>
                  {Icon.check('#fff', 15)}
                </div>
              </div>

              <div style={{ flex: 1, background: EL.greenBg, border: `1px solid ${EL.greenBorder}`, borderRadius: 14, padding: '14px 14px 16px', overflow: 'hidden', position: 'relative' }}>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>

                  {/* Animated wallet — pulses while receiving money */}
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{
                      width: 54, height: 54, borderRadius: 13,
                      background: 'rgba(255,255,255,0.75)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      animation: seqStep === 0 ? 'walletPulse 1s ease-in-out infinite' : 'none',
                    }}>
                      <div style={{
                        width: 42, height: 30, borderRadius: 6,
                        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                        border: '1.2px solid #065f46',
                        position: 'relative',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 2px 6px rgba(4,120,87,0.15)',
                      }}>
                        {/* Cash bill slot on top */}
                        <div style={{
                          position: 'absolute', top: -8, left: 8,
                          width: 18, height: 10,
                          borderRadius: '1.5px 1.5px 0 0',
                          background: 'linear-gradient(to bottom, #34d399, #059669)',
                          border: '0.6px solid rgba(255,255,255,0.3)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#fff', fontSize: 5, fontWeight: 900,
                        }}>₹</div>
                        {/* Flap */}
                        <div style={{
                          position: 'absolute', right: 0, top: 6,
                          width: 14, height: 14,
                          background: '#047857',
                          borderRadius: '3px 0 0 3px',
                          borderLeft: '1px solid #059669',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <div style={{ width: 3.5, height: 3.5, borderRadius: '50%', background: '#F5D9A0' }} />
                        </div>
                      </div>
                    </div>

                    {/* Money bills flying INTO wallet during seqStep 0 */}
                    {seqStep === 0 && [
                      { delay: '0s',   fx: '-40px', fy: '-30px', fr: '-20deg' },
                      { delay: '0.3s', fx: '-55px', fy: '10px',  fr: '10deg'  },
                      { delay: '0.6s', fx: '-20px', fy: '-50px', fr: '5deg'   },
                      { delay: '0.9s', fx: '-50px', fy: '-10px', fr: '-15deg' },
                    ].map((p, i) => (
                      <div key={i} style={{
                        position: 'absolute',
                        top: '50%', left: '50%',
                        marginTop: -6, marginLeft: -11,
                        width: 22, height: 12,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #34D399 0%, #059669 100%)',
                        border: '0.8px solid rgba(255,255,255,0.5)',
                        boxShadow: '0 2px 6px rgba(5,150,105,0.35)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontSize: 7, fontWeight: 900,
                        zIndex: 10,
                        '--fx': p.fx,
                        '--fy': p.fy,
                        '--fr': p.fr,
                        animation: 'moneyFlyIn 1.1s ease-in-out infinite',
                        animationDelay: p.delay,
                      }}>₹</div>
                    ))}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 9, color: EL.green, fontWeight: 700, letterSpacing: 0.6, marginBottom: 3 }}>FUNDS AVAILABLE</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: EL.ink, letterSpacing: -0.5, lineHeight: 1 }}>
                      ₹{stage1Val.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.75)', borderRadius: 20, padding: '3px 8px', flexShrink: 0 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: EL.green, animation: 'liveDot 1.8s ease-in-out infinite' }} />
                    <span style={{ fontSize: 8, fontWeight: 700, color: EL.green, letterSpacing: 0.3 }}>LIVE</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: EL.green, letterSpacing: 0.5 }}>AVAILABLE NOW</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 8.5, color: EL.muted3, fontWeight: 600, letterSpacing: 0.3 }}>TOTAL LIMIT</div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: EL.green }}>₹1,50,000</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: EL.muted2, fontWeight: 600, lineHeight: 1.4 }}>
                  Funds deposited in your salaried bank account
                </div>
              </div>
            </div>

            {/* Stage 2 — unlock next: fades in after Stage 1 */}
            <div style={{
              opacity: seqStep >= 1 ? 1 : 0,
              transform: seqStep >= 1 ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
              pointerEvents: seqStep >= 1 ? 'auto' : 'none',
            }}>
              <Stage2Section seqStep={seqStep >= 1 ? seqStep - 1 : 0} />
            </div>

            {/* Stage 3 — next step: fades in after Stage 2, shows lock unlocking */}
            <div style={{
              display: 'flex', gap: 10, alignItems: 'stretch',
              opacity: seqStep >= 2 ? 1 : 0,
              transform: seqStep >= 2 ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
              pointerEvents: seqStep >= 2 ? 'auto' : 'none',
            }}>
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 3, width: 26, flexShrink: 0 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#fff', border: `2px solid #C8C4D8`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                  {Icon.lock('#C8C4D8', 11)}
                </div>
              </div>

              <div style={{ flex: 1, background: '#F4F3FA', border: '1px solid #E0DCF0', borderRadius: 14, padding: '14px 14px 16px', overflow: 'hidden', opacity: 0.85 }}>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  {/* Animated lock unlocking */}
                  <div style={{ width: 54, height: 54, borderRadius: 13, background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
                    <div style={{
                      width: 36, height: 36,
                      borderRadius: '50%',
                      background: 'rgba(200,196,216,0.15)',
                      border: '1.5px solid #C8C4D8',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      position: 'relative',
                      overflow: 'visible',
                      animation: seqStep >= 2 ? 'lockBodyGlow 2s ease-in-out infinite' : 'none',
                    }}>
                      {/* Lock body */}
                      <svg width="18" height="20" viewBox="0 0 18 20" fill="none" style={{ position: 'relative', zIndex: 2 }}>
                        <rect x="1" y="9" width="16" height="11" rx="2.5" fill="#C8C4D8" />
                        <rect x="3.5" y="11" width="11" height="7" rx="1.5" fill="#DDD9EE" opacity="0.6" />
                        <circle cx="9" cy="15" r="1.5" fill="#B8B4C8" />
                      </svg>
                      {/* Animated shackle that opens */}
                      <svg
                        width="12" height="10" viewBox="0 0 12 10" fill="none"
                        style={{
                          position: 'absolute',
                          top: -2, left: 3,
                          transformOrigin: 'bottom left',
                          animation: seqStep >= 2 ? 'lockShackleOpen 1s ease-out 0.2s both' : 'none',
                        }}
                      >
                        <path d="M2 9 V4 Q2 0 6 0 Q10 0 10 4 V9" stroke="#B8B4C8" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                      </svg>
                    </div>
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 9, color: EL.muted3, fontWeight: 700, letterSpacing: 0.6, marginBottom: 3 }}>ADDITIONAL LIMIT</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#B0ADCA', letterSpacing: -0.5, lineHeight: 1 }}>₹1,50,000</div>
                  </div>
                  {/* 15-day badge */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(200,196,216,0.2)', border: '1px solid #DDD9EE', borderRadius: 10, padding: '5px 7px', flexShrink: 0 }}>
                    <span style={{ fontSize: 14, fontWeight: 900, color: '#9C98B8', lineHeight: 1 }}>15</span>
                    <span style={{ fontSize: 7, fontWeight: 700, color: EL.muted3, letterSpacing: 0.3, marginTop: 1 }}>DAYS</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {Icon.lock('#B8B4C8', 10)}
                    <span style={{ fontSize: 10, fontWeight: 800, color: EL.muted3, letterSpacing: 0.5 }}>NEXT STEP</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 8.5, color: EL.muted3, fontWeight: 600, letterSpacing: 0.3 }}>TOTAL LIMIT</div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#B0ADCA' }}>₹4,00,000</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: EL.muted3, fontWeight: 600, lineHeight: 1.4 }}>
                  Unlocks 15 days after your payment reflects in credit history
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Savings stats — dual chip layout like savings page */}
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <SavingsTile
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="9.5" cy="9.5" r="6" stroke={EL.green} strokeWidth="2" />
                <path d="M9.5 6.7v5.6M7.4 10.2l2.1 2.1 2.1-2.1" stroke={EL.green} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17.5 13.5v6m0 0l-2.3-2.3M17.5 19.5l2.3-2.3" stroke={EL.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            value={inr(MONTHLY_SAVINGS)}
            label="monthly savings"
          />
          <SavingsTile
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="3.5" y="5" width="17" height="15.5" rx="3" stroke={EL.green} strokeWidth="2" />
                <path d="M3.5 9.5h17" stroke={EL.green} strokeWidth="2" />
                <path d="M8 3v3.2M16 3v3.2" stroke={EL.green} strokeWidth="2" strokeLinecap="round" />
                <path d="M8.6 14.6l2.2 2.2L15.4 12" stroke={EL.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            value={inr(INTEREST_SAVED)}
            label="total interest saved"
          />
        </div>


        {/* Disclaimer */}
        <div style={{ fontSize: 11.5, color: EL.muted3, textAlign: 'center', marginTop: 16, lineHeight: 1.4, padding: '0 10px' }}>
          Savings are being calculated based on current offer.
        </div>



        <div style={{ height: 16 }} />
      </div>

      {/* Sticky CTA — with backdrop blur like savings */}
      <BottomBar bg={EL.bg}>
        <button
          onClick={() => go('pdf')}
          style={{
            width: '100%',
            height: 56,
            borderRadius: 16,
            background: EL.purple,
            color: '#fff',
            fontWeight: 600,
            fontSize: 17,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 9,
            boxShadow: '0 14px 30px -8px rgba(91,63,212,.6)',
            transition: 'transform .12s',
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(.975)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          Claim Offer {Icon.arrowR('#fff')}
        </button>
      </BottomBar>

      {/* How it Works Modal */}
      {howItWorksOpen && (
        <div
          onTouchMove={e => e.preventDefault()}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 100,
            background: 'rgba(9, 9, 20, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            animation: 'howItWorksFadeIn 0.3s ease-out',
          }}
        >
          <div
            onTouchMove={e => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 340,
              background: '#121124',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 24,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              animation: 'cardSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              color: '#fff',
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setHowItWorksOpen(false)}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 600,
                fontSize: 16,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>

            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#CBA6FF', textTransform: 'uppercase', marginBottom: 12 }}>
              How CCRF works
            </span>

            {/* Visual Container */}
            <div style={{
              width: '100%',
              height: 140,
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}>
              {steps[activeStep].visual}
            </div>

            {/* Stepper Dots */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
              {steps.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  style={{
                    width: idx === activeStep ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: idx === activeStep ? '#7F55DF' : 'rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>

            {/* Title & Description */}
            <div style={{ textAlign: 'center', minHeight: 90, marginBottom: 24 }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, margin: '0 0 8px 0', color: '#fff', fontFamily: 'Sora, sans-serif' }}>
                {steps[activeStep].title}
              </h3>
              <p style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.7)', margin: 0, lineHeight: 1.45, padding: '0 6px', fontFamily: 'inherit' }}>
                {steps[activeStep].description}
              </p>
            </div>

            {/* Navigation buttons */}
            <div style={{ display: 'flex', width: '100%', gap: 12 }}>
              {activeStep > 0 ? (
                <button
                  onClick={() => setActiveStep(activeStep - 1)}
                  style={{
                    flex: 1,
                    height: 48,
                    borderRadius: 14,
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
                >
                  Back
                </button>
              ) : null}

              <button
                onClick={() => {
                  if (activeStep < steps.length - 1) {
                    setActiveStep(activeStep + 1);
                  } else {
                    setHowItWorksOpen(false);
                  }
                }}
                style={{
                  flex: 2,
                  height: 48,
                  borderRadius: 14,
                  background: '#7F55DF',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(127, 85, 223, 0.3)',
                  transition: 'background 0.2s, transform 0.1s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#6B40CF'}
                onMouseLeave={e => e.currentTarget.style.background = '#7F55DF'}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                {activeStep === steps.length - 1 ? 'Got it!' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

window.Eligibility = Eligibility;
