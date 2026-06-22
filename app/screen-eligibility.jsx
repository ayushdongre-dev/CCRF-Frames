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

function AnimatedCounter({ from, to, duration, active }) {
  const [val, setVal] = useState(from);

  useEffect(() => {
    if (!active) {
      setVal(from);
      return;
    }
    let start = null;
    let animId;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = progress * (2 - progress); // easeOutQuad
      setVal(Math.floor(easedProgress * (to - from) + from));
      if (progress < 1) {
        animId = window.requestAnimationFrame(step);
      }
    };
    animId = window.requestAnimationFrame(step);
    return () => {
      if (animId) window.cancelAnimationFrame(animId);
    };
  }, [active, from, to, duration]);

  return <span>{inr(val)}</span>;
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
  const [autoplay, setAutoplay] = useState(true);
  const [step2Time, setStep2Time] = useState(0);
  const [dialUnlocked, setDialUnlocked] = useState(false);

  useEffect(() => { const t = setTimeout(() => setAnimIn(true), 80); return () => clearTimeout(t); }, []);

  useEffect(() => {
    if (activeStep !== 1 || !howItWorksOpen) {
      setStep2Time(0);
      return;
    }
    const interval = setInterval(() => {
      setStep2Time(t => t + 100);
    }, 100);
    return () => clearInterval(interval);
  }, [activeStep, howItWorksOpen]);

  useEffect(() => {
    if (activeStep !== 2) {
      setDialUnlocked(false);
    } else {
      const t = setTimeout(() => setDialUnlocked(true), 1500);
      return () => clearTimeout(t);
    }
  }, [activeStep]);

  // Flat 7-second Autoplay loop sequence
  useEffect(() => {
    if (!howItWorksOpen || !autoplay) return;
    const timer = setInterval(() => {
      setActiveStep(current => (current + 1) % 3);
    }, 7000);
    return () => clearInterval(timer);
  }, [howItWorksOpen, autoplay]);
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

        /* ── Morphing Card Keyframes ── */
        @keyframes laserSweep {
          0% { clip-path: inset(0 0 0 0); }
          100% { clip-path: inset(0 0 0 100%); }
        }
        @keyframes laserLine {
          0% { left: 0%; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes stampBounce {
          0% { transform: scale(3) rotate(-15deg); opacity: 0; }
          70% { transform: scale(0.9) rotate(-10deg); opacity: 1; }
          85% { transform: scale(1.1) rotate(-12deg); }
          100% { transform: scale(1) rotate(-10deg); opacity: 1; }
        }
        @keyframes rateSlash {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes floatSparkles {
          0% { transform: translateY(10px) scale(0.5); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-30px) scale(1.2); opacity: 0; }
        }
        @keyframes cashFlowLine {
          0% { transform: translateY(-100%); opacity: 0; }
          30% { opacity: 0.5; }
          70% { opacity: 0.5; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 12px rgba(91, 63, 212, 0.4); }
          50% { box-shadow: 0 0 24px rgba(91, 63, 212, 0.8), 0 0 8px rgba(34, 211, 238, 0.4); }
        }
        
        /* ── Revamped timeline keyframes ── */
        @keyframes timerCountdown {
          from { stroke-dashoffset: 50.26; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes cardSlideOut {
          0% { transform: translateY(0) scale(1) rotate(-4deg); opacity: 1; }
          100% { transform: translateY(-180px) scale(0.85) rotate(-15deg); opacity: 0; }
        }
        @keyframes cardStackUp {
          0% { transform: translateY(14px) scale(0.92) rotate(-8deg); }
          100% { transform: translateY(0) scale(1) rotate(-4deg); }
        }
        @keyframes pulseLimitBoost {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 12px 4px rgba(74, 222, 128, 0.1); }
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>

            {/* Stage 1 — available now */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'stretch' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 3 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: EL.green, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px -4px rgba(26,122,74,.6)' }}>
                  {Icon.check('#fff', 14)}
                </div>
                <div style={{ flex: 1, width: 0, borderLeft: `2px dashed ${EL.amber}`, margin: '4px 0 0' }} />
              </div>
              <div style={{ flex: 1, background: EL.greenBg, border: `1px solid ${EL.greenBorder}`, borderRadius: 12, padding: '9px 12px 10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
                  <span style={{ fontSize: 9.5, fontWeight: 800, color: EL.green, letterSpacing: 0.5 }}>AVAILABLE NOW</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 8.5, color: EL.muted3, fontWeight: 600, letterSpacing: 0.3 }}>TOTAL LIMIT</div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: EL.green }}>₹1,50,000</div>
                  </div>
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: EL.ink, letterSpacing: -0.5, lineHeight: 1 }}>₹1,50,000</div>
                <div style={{ fontSize: 11, color: EL.muted2, marginTop: 2, fontWeight: 500 }}>Yours to use today</div>
                <div style={{ marginTop: 7, height: 4, borderRadius: 99, background: 'rgba(26,122,74,.15)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '37.5%', background: EL.green, borderRadius: 99 }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
                  <span style={{ fontSize: 9.5, color: EL.muted3, fontWeight: 500 }}>₹0</span>
                  <span style={{ fontSize: 9.5, color: EL.muted3, fontWeight: 500 }}>of ₹4,00,000 max</span>
                </div>
              </div>
            </div>

            {/* Stage 2 — unlock next */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'stretch' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 3 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#fff', border: `2px solid ${EL.purple}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {Icon.lock(EL.purple, 11)}
                </div>
                <div style={{ flex: 1, width: 0, borderLeft: '2px dashed #D4D0E8', margin: '4px 0 0' }} />
              </div>
              <div style={{ flex: 1, background: EL.purpleL, border: `1px solid ${EL.purpleBorder}`, borderRadius: 12, padding: '9px 12px 10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {Icon.lock(EL.purple, 9)}
                    <span style={{ fontSize: 9.5, fontWeight: 800, color: EL.purple, letterSpacing: 0.5 }}>UNLOCK NEXT</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 8.5, color: EL.muted3, fontWeight: 600, letterSpacing: 0.3 }}>TOTAL LIMIT</div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: EL.purple }}>₹2,50,000</div>
                  </div>
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: EL.ink, letterSpacing: -0.5, lineHeight: 1 }}>+₹1,00,000</div>
                <div style={{ fontSize: 11, color: EL.muted2, marginTop: 2, fontWeight: 500 }}>Pay off your current card bill to unlock the offer</div>
                <div style={{ marginTop: 7, height: 4, borderRadius: 99, background: '#D4D0E8', backgroundImage: `repeating-linear-gradient(90deg, #B8B0D8 0, #B8B0D8 8px, transparent 8px, transparent 13px)` }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
                  <span style={{ fontSize: 9.5, color: EL.muted3, fontWeight: 500 }}>Locked</span>
                  <span style={{ fontSize: 9.5, color: EL.muted3, fontWeight: 500 }}>of ₹4,00,000 max</span>
                </div>
              </div>
            </div>

            {/* Stage 3 — next step */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'stretch' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 3 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#fff', border: `2px solid #C8C4D8`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {Icon.lock('#C8C4D8', 11)}
                </div>
              </div>
              <div style={{ flex: 1, background: '#F4F3FA', border: '1px solid #E0DCF0', borderRadius: 12, padding: '9px 12px 10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {Icon.lock('#B8B4C8', 9)}
                    <span style={{ fontSize: 9.5, fontWeight: 800, color: EL.muted3, letterSpacing: 0.5 }}>NEXT STEP</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 8.5, color: EL.muted3, fontWeight: 600, letterSpacing: 0.3 }}>TOTAL LIMIT</div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: EL.muted2 }}>₹4,00,000</div>
                  </div>
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: EL.muted2, letterSpacing: -0.5, lineHeight: 1 }}>+₹1,50,000</div>
                <div style={{ fontSize: 11, color: EL.muted3, marginTop: 2, fontWeight: 500 }}>Get the above loan, pay off the rest of your bills, and unlock more!</div>
                <div style={{ marginTop: 7, height: 4, borderRadius: 99, background: '#D4D0E8', backgroundImage: `repeating-linear-gradient(90deg, #C4C0D8 0, #C4C0D8 8px, transparent 8px, transparent 13px)` }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
                  <span style={{ fontSize: 9.5, color: EL.muted3, fontWeight: 500 }}>Locked</span>
                  <span style={{ fontSize: 9.5, color: EL.muted3, fontWeight: 500 }}>of ₹4,00,000 max</span>
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

        {/* ── What your savings could buy ── */}
        {(() => {
          const TRIP_COST = 8000;
          const PHONE_COST = 30000;
          const RENT_COST = 7000;
          const INV_YEARS = 5;
          const INV_RATE = 0.12;
          const goaTrips = Math.max(1, Math.floor(INTEREST_SAVED / TRIP_COST));
          const phones = Math.max(1, Math.floor(INTEREST_SAVED / PHONE_COST));
          const rentMonths = Math.max(1, Math.floor(INTEREST_SAVED / RENT_COST));
          const investedValue = Math.round(INTEREST_SAVED * Math.pow(1 + INV_RATE, INV_YEARS));
          const investReturn = investedValue - INTEREST_SAVED;

          const iconPlane = (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2a1.5 1.5 0 0 0-1.5 1.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5Z" fill="#3B82F6" />
            </svg>
          );
          const iconPhone = (
            <svg width="18" height="22" viewBox="0 0 24 28" fill="none">
              <rect x="4" y="1" width="16" height="26" rx="3" stroke="#3B82F6" strokeWidth="2" />
              <circle cx="12" cy="23" r="1.2" fill="#3B82F6" />
              <line x1="9" y1="5" x2="15" y2="5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          );
          const iconHouse = (
            <svg width="22" height="20" viewBox="0 0 24 22" fill="none">
              <path d="M3 10.5L12 2l9 8.5V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10.5Z" stroke="#3B82F6" strokeWidth="2" strokeLinejoin="round" />
              <path d="M9 22v-7h6v7" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          );
          const iconGrowth = (
            <svg width="22" height="20" viewBox="0 0 24 22" fill="none">
              <polyline points="2,18 8,10 13,14 20,4" stroke="#4ADE80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="16,4 20,4 20,8" stroke="#4ADE80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          );

          const tiles = [
            { icon: iconPlane, count: goaTrips, label: 'Goa trips' },
            { icon: iconPhone, count: phones, label: 'Smartphones' },
            { icon: iconHouse, count: rentMonths, label: "Months' rent" },
          ];

          return (
            <div style={{ marginTop: 6, borderRadius: 18, background: EL.hero, overflow: 'hidden', boxShadow: '0 16px 40px -20px rgba(15,13,46,.7)' }}>
              <div style={{ padding: '14px 16px 8px' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>What your interest could buy instead</div>
              </div>

              {/* Investment tile — compact single row */}
              <div style={{ margin: '4px 10px 6px', background: 'rgba(74,222,128,.1)', borderRadius: 12, padding: '10px 13px', border: '1px solid rgba(74,222,128,.2)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flexShrink: 0 }}>{iconGrowth}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,.5)', fontWeight: 600, letterSpacing: 0.3 }}>IF YOU INVESTED IT INSTEAD</div>
                  <div style={{ fontSize: 13.5, fontWeight: 800, color: '#4ADE80', marginTop: 2 }}>
                    {inr(INTEREST_SAVED)} → {inr(investedValue)}
                  </div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,.5)', marginTop: 2 }}>
                    at 12% p.a. over {INV_YEARS} yrs — <span style={{ color: '#4ADE80', fontWeight: 700 }}>+{inr(investReturn)} returns</span>
                  </div>
                </div>
              </div>

              {/* 3 tiles */}
              <div style={{ display: 'flex', padding: '0 10px 12px', gap: 6 }}>
                {tiles.map((t, i) => (
                  <div key={i} style={{
                    flex: 1,
                    background: 'rgba(255,255,255,.06)',
                    borderRadius: 12,
                    padding: '10px 6px 9px',
                    textAlign: 'center',
                    border: '1px solid rgba(255,255,255,.08)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>{t.icon}</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{t.count}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,.65)', marginTop: 3, fontWeight: 500 }}>{t.label}</div>
                    <div style={{ fontSize: 9, color: '#4ADE80', marginTop: 4, fontWeight: 600 }}>saved from interest</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

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
              background: '#0F0D2E',
              border: '1px solid rgba(255, 255, 255, 0.15)',
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
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255, 255, 255, 0.6)',
                fontWeight: 600,
                fontSize: 12,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                zIndex: 10,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'; }}
            >
              ✕
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#A3F3C9', textTransform: 'uppercase' }}>
                How this works?
              </span>
              <svg width="14" height="14" viewBox="0 0 20 20" style={{ transform: 'rotate(-90deg)', filter: 'drop-shadow(0 0 2px rgba(163,243,201,0.5))' }}>
                <circle cx="10" cy="10" r="8" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="2" />
                <circle
                  cx="10"
                  cy="10"
                  r="8"
                  fill="none"
                  stroke="#A3F3C9"
                  strokeWidth="2"
                  strokeDasharray="50.26"
                  strokeDashoffset="50.26"
                  style={{
                    animation: autoplay ? 'timerCountdown 7s linear forwards' : 'none',
                  }}
                  key={activeStep + '_' + autoplay}
                />
              </svg>
            </div>

            {/* Visual Container (Unified Morphing Card Canvas) */}
            <div style={{
              width: '100%',
              height: 180,
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              border: '1px solid rgba(255, 255, 255, 0.05)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                width: 260,
                height: 150,
                position: 'relative',
                borderRadius: 16,
                overflow: 'hidden',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: activeStep === 2 ? '0 12px 32px rgba(91, 63, 212, 0.4)' : '0 10px 25px rgba(0,0,0,0.3)',
                animation: activeStep === 2 ? 'glowPulse 3s infinite' : 'none',
              }}>
                {/* Sparkles (Step 3 only) */}
                {activeStep === 2 && (
                  <>
                    <span style={{ position: 'absolute', top: 15, left: 20, fontSize: 14, animation: 'floatSparkles 2s infinite ease-out', zIndex: 20 }}>✨</span>
                    <span style={{ position: 'absolute', bottom: 20, right: 30, fontSize: 16, animation: 'floatSparkles 2.5s infinite ease-out', animationDelay: '0.4s', zIndex: 20 }}>✨</span>
                    <span style={{ position: 'absolute', top: 30, right: 20, fontSize: 12, animation: 'floatSparkles 1.8s infinite ease-out', animationDelay: '0.8s', zIndex: 20 }}>✨</span>
                  </>
                )}

                {/* Layer 3: Circular Limit Dial (visible during Step 3) */}
                {activeStep === 2 && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, #0F0D2E 0%, #15133C 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px 12px 10px',
                    color: '#fff',
                    zIndex: 10,
                  }}>
                    {/* Iterative Rounds flow indicator */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                      <span style={{ fontSize: 8, fontWeight: 800, color: '#4ADE80', background: 'rgba(74,222,128,0.1)', padding: '2px 5px', borderRadius: 4, whiteSpace: 'nowrap' }}>ROUND 1 (₹1.5L)</span>
                      <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>➔</span>
                      <span style={{ fontSize: 8, fontWeight: 800, color: dialUnlocked ? '#4ADE80' : 'rgba(255,255,255,0.3)', background: dialUnlocked ? 'rgba(74,222,128,0.15)' : 'rgba(255,255,255,0.05)', padding: '2px 5px', borderRadius: 4, whiteSpace: 'nowrap' }}>ROUND 2 (+₹1L)</span>
                      <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)' }}>➔</span>
                      <span style={{ fontSize: 8, fontWeight: 800, color: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.02)', padding: '2px 5px', borderRadius: 4, whiteSpace: 'nowrap' }}>ROUND 3 (+₹1.5L)</span>
                    </div>

                    {/* SVG Gauge */}
                    <div style={{ position: 'relative', width: 84, height: 84, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="84" height="84" style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
                        {/* Background track circle */}
                        <circle cx="42" cy="42" r="37" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                        {/* Foreground animated progress circle */}
                        <circle
                          cx="42"
                          cy="42"
                          r="37"
                          fill="none"
                          stroke="#4ADE80"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeDasharray="232.48"
                          strokeDashoffset={dialUnlocked ? "0" : "116.24"}
                          style={{
                            transition: 'stroke-dashoffset 2.0s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
                            filter: 'drop-shadow(0 0 4px rgba(74,222,128,0.5))',
                          }}
                        />
                      </svg>
                      {/* Center Content */}
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 12,
                        textAlign: 'center',
                      }}>
                        <span style={{
                          fontSize: 14,
                          animation: !dialUnlocked ? 'lockUnlockShake 0.8s infinite ease-in-out' : 'checkPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both',
                          marginBottom: 1
                        }}>
                          {dialUnlocked ? '🔓' : '🔒'}
                        </span>
                        <div style={{ fontSize: 7, color: '#A3E2C9', fontWeight: 700, letterSpacing: 0.3 }}>ROUND 2</div>
                        <div style={{ fontSize: 12, fontWeight: 800, color: '#fff', letterSpacing: -0.2 }}>
                          +<AnimatedCounter from={0} to={100000} duration={2000} active={activeStep === 2} />
                        </div>
                      </div>
                    </div>

                    {/* Limit Boost Pulse Tag */}
                    <div style={{
                      marginTop: 8,
                      background: 'rgba(74, 222, 128, 0.15)',
                      border: '1px solid #4ADE80',
                      borderRadius: 20,
                      padding: '3px 10px',
                      fontSize: 8,
                      fontWeight: 800,
                      color: '#4ADE80',
                      letterSpacing: 0.8,
                      opacity: dialUnlocked ? 1 : 0,
                      transform: dialUnlocked ? 'scale(1)' : 'scale(0.8)',
                      transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s',
                      animation: dialUnlocked ? 'pulseLimitBoost 2.0s infinite ease-in-out 1.2s' : 'none',
                    }}>
                      ROUND 2 FUNDS UNLOCKED
                    </div>
                  </div>
                )}

                {/* Layer 2: Card Stack (visible during Step 2) */}
                {activeStep === 1 && (() => {
                  const dues1 = step2Time < 500 ? 60000 : step2Time >= 1700 ? 0 : Math.round(60000 - ((step2Time - 500) / 1200) * 60000);
                  const dues2 = step2Time < 3000 ? 90000 : step2Time >= 4200 ? 0 : Math.round(90000 - ((step2Time - 3000) / 1200) * 90000);

                  const card1Transform = step2Time < 2200 ? 'translateY(0) scale(1) rotate(-4deg)' : 'translateY(-200px) scale(0.8) rotate(-15deg)';
                  const card1Opacity = step2Time < 2200 ? 1 : 0;

                  const card2Transform = step2Time < 2200 ? 'translateY(12px) scale(0.94) rotate(-2deg)' : step2Time < 4700 ? 'translateY(0) scale(1) rotate(-4deg)' : 'translateY(-200px) scale(0.8) rotate(-15deg)';
                  const card2Opacity = step2Time < 4700 ? 1 : 0;

                  const card3Transform = step2Time < 2200 ? 'translateY(24px) scale(0.88) rotate(0deg)' : step2Time < 4700 ? 'translateY(12px) scale(0.94) rotate(-2deg)' : 'translateY(0) scale(1) rotate(-4deg)';

                  const card4Transform = step2Time < 2200 ? 'translateY(36px) scale(0.82) rotate(2deg)' : step2Time < 4700 ? 'translateY(24px) scale(0.88) rotate(0deg)' : 'translateY(12px) scale(0.94) rotate(-2deg)';

                  return (
                    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                      
                      {/* Card 4 (Slate) */}
                      <div style={{
                        position: 'absolute',
                        inset: 16,
                        background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
                        borderRadius: 12,
                        padding: 12,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        color: '#fff',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                        transform: card4Transform,
                        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                        zIndex: 1,
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 8, fontWeight: 700, color: '#BDC3C7', letterSpacing: 0.8 }}>CARD 4 DUES</span>
                          <span style={{ fontSize: 10 }}>💳</span>
                        </div>
                        <div>
                          <div style={{ fontSize: 7, color: '#BDC3C7', opacity: 0.8 }}>CARD BALANCE DUES</div>
                          <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: -0.3 }}>
                            {inr(40000)}
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }} />
                      </div>

                      {/* Card 3 (Purple) */}
                      <div style={{
                        position: 'absolute',
                        inset: 16,
                        background: 'linear-gradient(135deg, #5B3FD4 0%, #3A1C71 100%)',
                        borderRadius: 12,
                        padding: 12,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        color: '#fff',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                        transform: card3Transform,
                        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                        zIndex: 2,
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 8, fontWeight: 700, color: '#E8E8FF', letterSpacing: 0.8 }}>CARD 3 DUES</span>
                          <span style={{ fontSize: 10 }}>💳</span>
                        </div>
                        <div>
                          <div style={{ fontSize: 7, color: '#E8E8FF', opacity: 0.8 }}>CARD BALANCE DUES</div>
                          <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: -0.3 }}>
                            {inr(37400)}
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }} />
                      </div>

                      {/* Card 2 (Orange) */}
                      <div style={{
                        position: 'absolute',
                        inset: 16,
                        background: 'linear-gradient(135deg, #E67E22 0%, #B85C00 100%)',
                        borderRadius: 12,
                        padding: 12,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        color: '#fff',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                        transform: card2Transform,
                        opacity: card2Opacity,
                        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-out',
                        zIndex: 3,
                      }}>
                        {/* Laser line Card 2 */}
                        {step2Time >= 3000 && step2Time < 4200 && (
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            width: 3,
                            background: '#4ADE80',
                            boxShadow: '0 0 10px #4ADE80, 0 0 20px #4ADE80',
                            left: `${((step2Time - 3000) / 1200) * 100}%`,
                            zIndex: 10,
                          }} />
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 8, fontWeight: 700, color: '#FFE0CC', letterSpacing: 0.8 }}>CARD 2 DUES</span>
                          <span style={{ fontSize: 10 }}>💳</span>
                        </div>
                        <div>
                          <div style={{ fontSize: 7, color: '#FFE0CC', opacity: 0.8 }}>CARD BALANCE DUES</div>
                          <div style={{ fontSize: 18, fontWeight: 800, color: step2Time >= 4200 ? '#4ADE80' : '#fff', letterSpacing: -0.3 }}>
                            {inr(dues2)}
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }} />

                        {/* PAID Stamp Card 2 */}
                        {step2Time >= 4000 && (
                          <div style={{
                            position: 'absolute',
                            top: '30%',
                            left: '25%',
                            transform: 'rotate(-10deg)',
                            background: 'rgba(0, 0, 0, 0.2)',
                            border: '2px solid #4ADE80',
                            borderRadius: 4,
                            color: '#4ADE80',
                            padding: '3px 8px',
                            fontSize: 12,
                            fontWeight: 900,
                            letterSpacing: 1,
                            textTransform: 'uppercase',
                            animation: 'stampBounce 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both',
                            zIndex: 15,
                          }}>
                            PAID
                          </div>
                        )}
                      </div>

                      {/* Card 1 (Maroon) */}
                      <div style={{
                        position: 'absolute',
                        inset: 16,
                        background: 'linear-gradient(135deg, #97144D 0%, #5F0B30 100%)',
                        borderRadius: 12,
                        padding: 12,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        color: '#fff',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                        transform: card1Transform,
                        opacity: card1Opacity,
                        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-out',
                        zIndex: 4,
                      }}>
                        {/* Laser line Card 1 */}
                        {step2Time >= 500 && step2Time < 1700 && (
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            width: 3,
                            background: '#4ADE80',
                            boxShadow: '0 0 10px #4ADE80, 0 0 20px #4ADE80',
                            left: `${((step2Time - 500) / 1200) * 100}%`,
                            zIndex: 10,
                          }} />
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 8, fontWeight: 700, color: '#FFE5EC', letterSpacing: 0.8 }}>CARD 1 DUES</span>
                          <span style={{ fontSize: 10 }}>💳</span>
                        </div>
                        <div>
                          <div style={{ fontSize: 7, color: '#FFE5EC', opacity: 0.8 }}>CARD BALANCE DUES</div>
                          <div style={{ fontSize: 18, fontWeight: 800, color: step2Time >= 1700 ? '#4ADE80' : '#fff', letterSpacing: -0.3 }}>
                            {inr(dues1)}
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }} />

                        {/* PAID Stamp Card 1 */}
                        {step2Time >= 1500 && (
                          <div style={{
                            position: 'absolute',
                            top: '30%',
                            left: '25%',
                            transform: 'rotate(-10deg)',
                            background: 'rgba(0, 0, 0, 0.2)',
                            border: '2px solid #4ADE80',
                            borderRadius: 4,
                            color: '#4ADE80',
                            padding: '3px 8px',
                            fontSize: 12,
                            fontWeight: 900,
                            letterSpacing: 1,
                            textTransform: 'uppercase',
                            animation: 'stampBounce 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both',
                            zIndex: 15,
                          }}>
                            PAID
                          </div>
                        )}
                      </div>

                    </div>
                  );
                })()}

                {/* Layer 1: White Ledger Card (Step 1 only, fades out on transition) */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: '#FFFFFF',
                  border: '1px solid #ECEAF4',
                  padding: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  color: '#1B192E',
                  zIndex: 3,
                  opacity: activeStep === 0 ? 1 : 0,
                  pointerEvents: activeStep === 0 ? 'auto' : 'none',
                  transition: 'opacity 0.6s ease-in-out',
                }}>
                  {/* Ledger Grid Background */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'radial-gradient(#ECEAF4 1.2px, transparent 1.2px)',
                    backgroundSize: '12px 12px',
                    opacity: 0.4,
                    pointerEvents: 'none',
                  }} />

                  {/* Digital Cash Flow Lines */}
                  {activeStep === 0 && (
                    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                      <div style={{ position: 'absolute', left: '15%', top: 0, bottom: 0, width: 1, borderLeft: '1.5px dashed #4ADE80', animation: 'cashFlowLine 2s infinite linear' }} />
                      <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, borderLeft: '1.5px dashed #4ADE80', animation: 'cashFlowLine 2.5s infinite linear', animationDelay: '0.4s' }} />
                      <div style={{ position: 'absolute', right: '15%', top: 0, bottom: 0, width: 1, borderLeft: '1.5px dashed #4ADE80', animation: 'cashFlowLine 1.8s infinite linear', animationDelay: '0.8s' }} />
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                    <span style={{ fontSize: 8.5, fontWeight: 800, color: '#534AB7', letterSpacing: 1.2 }}>CCRF BANK TRANSFER</span>
                    <span style={{ fontSize: 10, color: '#1A7A4A', fontWeight: 700 }}>● DIRECT DEPOSIT</span>
                  </div>

                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ fontSize: 8, color: '#888', fontWeight: 600 }}>DISBURSED FUNDS</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: '#1A7A4A', letterSpacing: -0.5 }}>
                      <AnimatedCounter from={0} to={150000} duration={2500} active={activeStep === 0} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                    <span style={{ fontSize: 8, color: '#888', fontWeight: 500 }}>TRANSFERRED TO ACC: *8940</span>
                    <span style={{
                      fontSize: 8,
                      fontWeight: 800,
                      color: '#1A7A4A',
                      background: '#E8F8EE',
                      padding: '2px 6px',
                      borderRadius: 4,
                      transition: 'opacity 0.3s',
                      opacity: 1,
                    }}>
                      SUCCESS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Progress Tab Bar */}
            <div style={{ display: 'flex', width: '100%', gap: 8, marginBottom: 20 }}>
              {steps.map((s, idx) => {
                const isActive = activeStep === idx;
                const isCompleted = idx < activeStep;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveStep(idx);
                      setAutoplay(false);
                    }}
                    style={{
                      flex: 1,
                      padding: '8px 4px',
                      borderRadius: 10,
                      background: isActive ? 'rgba(127, 85, 223, 0.15)' : isCompleted ? 'rgba(26, 122, 74, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                      border: isActive ? '1px solid #7F55DF' : isCompleted ? '1px solid #1A7A4A' : '1px solid rgba(255, 255, 255, 0.08)',
                      color: isActive ? '#fff' : isCompleted ? '#4ADE80' : 'rgba(255, 255, 255, 0.4)',
                      fontSize: 10,
                      fontWeight: 700,
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 4,
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                  >
                    {isCompleted ? '✓' : ''} {idx + 1}. {idx === 0 ? 'Transfer' : idx === 1 ? 'Melt Dues' : 'Unlock More'}
                  </button>
                );
              })}
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

            {/* Got it Button */}
            <button
              onClick={() => setHowItWorksOpen(false)}
              style={{
                width: '100%',
                height: 48,
                borderRadius: 14,
                background: '#7F55DF',
                color: '#fff',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(127, 85, 223, 0.3)',
                transition: 'background 0.2s, transform 0.1s',
                border: 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#6B40CF'}
              onMouseLeave={e => e.currentTarget.style.background = '#7F55DF'}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

window.Eligibility = Eligibility;
