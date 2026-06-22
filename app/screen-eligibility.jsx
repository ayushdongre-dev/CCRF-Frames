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
  useEffect(() => { const t = setTimeout(() => setAnimIn(true), 80); return () => clearTimeout(t); }, []);
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
      title: "1. Get Approved Amount",
      description: "Take the initial approved amount today to start clearing your high-interest debt.",
      visual: (
        <div style={{ position: 'relative', width: 200, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            position: 'absolute',
            width: 80, height: 80,
            borderRadius: '50%',
            background: 'rgba(26, 122, 74, 0.15)',
            animation: 'pulseGlow 2s infinite ease-in-out',
            zIndex: 1
          }} />
          <div style={{
            position: 'relative',
            width: 140, height: 80,
            background: 'linear-gradient(135deg, #1A7A4A 0%, #115F36 100%)',
            borderRadius: 14,
            boxShadow: '0 10px 25px -5px rgba(26,122,74,0.4)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 12,
            zIndex: 2,
            border: '1px solid rgba(255, 255, 255, 0.15)',
            animation: 'float 3s infinite ease-in-out',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: '#A3F3C9', letterSpacing: 1 }}>APPROVED LIMIT</span>
              <span style={{ width: 14, height: 14, borderRadius: 99, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {Icon.check('#1A7A4A', 9)}
              </span>
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: -0.2 }}>Approved Limit</div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>READY TO CLAIM TODAY</div>
          </div>
        </div>
      )
    },
    {
      title: "2. Pay Credit Card Bill",
      description: "We transfer the unlocked limit directly to your bank account. You then go and pay off your credit card bill by yourself.",
      visual: (
        <div style={{ position: 'relative', width: 200, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <div style={{
            position: 'relative',
            width: 130, height: 78,
            background: 'linear-gradient(135deg, #E84040 0%, #9F1C1C 100%)',
            borderRadius: 12,
            boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 10,
            zIndex: 2,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transform: 'rotate(-5deg)',
            animation: 'howItWorksShake 4s infinite ease-in-out',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 8, fontWeight: 700, color: '#FFB8B8', letterSpacing: 0.5 }}>HIGH INTEREST CARD</span>
              <span style={{ fontSize: 10, fontWeight: 900, color: '#fff' }}>💳</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Card Balance</div>
            <div style={{
              position: 'absolute', inset: 0, borderRadius: 12,
              background: 'rgba(26, 122, 74, 0.9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 800, fontSize: 12,
              opacity: 0,
              animation: 'paymentFlash 3s infinite ease-in-out',
            }}>
              PAID & MELTED!
            </div>
          </div>
          <div style={{ position: 'absolute', left: '15%', bottom: '10%', width: 12, height: 12, borderRadius: '50%', background: '#F5D9A0', border: '1px solid #E8A020', animation: 'coinFly1 3s infinite ease-in-out', zIndex: 3 }} />
          <div style={{ position: 'absolute', right: '20%', bottom: '15%', width: 10, height: 10, borderRadius: '50%', background: '#F5D9A0', border: '1px solid #E8A020', animation: 'coinFly2 3s infinite ease-in-out', zIndex: 3 }} />
        </div>
      )
    },
    {
      title: "3. Come Back & Unlock More",
      description: "Once your card payment reflects in your credit history, return to Equall to unlock even more of your limit.",
      visual: (
        <div style={{ position: 'relative', width: 200, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            position: 'absolute',
            width: 140, height: 80,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(91,63,212,0.3) 0%, transparent 70%)',
            zIndex: 1,
            animation: 'glowPulse 2s infinite ease-in-out',
          }} />
          <div style={{
            position: 'relative',
            width: 130, height: 78,
            background: 'linear-gradient(135deg, #5B3FD4 0%, #3B249E 100%)',
            borderRadius: 12,
            boxShadow: '0 10px 25px rgba(91,63,212,0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 10,
            zIndex: 2,
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 8, fontWeight: 700, color: '#D4C8FF', letterSpacing: 0.5 }}>LOCKED PORTION</span>
              <span style={{ fontSize: 12, animation: 'unlockRotate 3s infinite ease-in-out' }}>🔓</span>
            </div>
            <div>
              <div style={{ fontSize: 9, color: '#C4B5FD', fontWeight: 600 }}>TOTAL UNLOCKED</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#fff' }}>More Limit</div>
            </div>
          </div>
          <div style={{ position: 'absolute', top: 15, left: 20, width: 6, height: 6, borderRadius: 99, background: '#FFE082', animation: 'sparkleFloat 2s infinite ease-out' }} />
          <div style={{ position: 'absolute', bottom: 15, right: 20, width: 8, height: 8, borderRadius: 99, background: '#A3E2C9', animation: 'sparkleFloat 2.5s infinite ease-out', animationDelay: '0.5s' }} />
        </div>
      )
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

        {/* Progress section */}
        <section style={{
          marginTop: 16,
          background: EL.card,
          borderRadius: 20,
          padding: '20px 20px 22px',
          boxShadow: '0 10px 26px -20px rgba(40,30,80,.45)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.8, color: EL.muted3 }}>MELT PROGRESS</span>
            <button
              onClick={() => { setHowItWorksOpen(true); setActiveStep(0); }}
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: EL.purple,
                background: EL.purpleL,
                padding: '4px 10px',
                borderRadius: 999,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                cursor: 'pointer',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = 0.85}
              onMouseLeave={e => e.currentTarget.style.opacity = 1}
            >
              How it works?
            </button>
          </div>
          <div style={{ fontWeight: 800, fontSize: 20, color: EL.ink, letterSpacing: -0.3, marginBottom: 6 }}>Here's your melt journey</div>
          <div style={{ fontSize: 13, color: EL.muted2, lineHeight: 1.5, marginBottom: 22 }}>These are the steps to clear your card debt — and how you can unlock more than ₹1,50,000 over time.</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '4px 0' }}>
            {/* Step 1: Approved */}
            <div style={{ display: 'flex', gap: 14 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: '50%', background: EL.green,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  boxShadow: '0 4px 12px -4px rgba(26,122,74,.6)',
                }}>
                  {Icon.check('#fff', 18)}
                </div>
                <div style={{ width: 2, flex: 1, background: EL.line, margin: '6px 0 -18px' }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: EL.ink, letterSpacing: -0.2 }}>₹1,50,000 approved!</div>
                <div style={{ fontSize: 13, color: EL.muted2, marginTop: 4, fontWeight: 500 }}>Complete application today</div>
              </div>
            </div>

            {/* Step 2: Melt your Debt */}
            <div style={{ display: 'flex', gap: 14 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: '50%', background: EL.purple,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  boxShadow: '0 4px 12px -4px rgba(91,63,212,.6)',
                }}>
                  {Icon.bolt('#fff', 16)}
                </div>
                <div style={{ width: 2, flex: 1, background: EL.line, margin: '6px 0 -18px' }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: EL.ink, letterSpacing: -0.2 }}>Melt your Debt</div>
                <div style={{ fontSize: 13, color: EL.muted2, marginTop: 4, fontWeight: 500 }}>Pay your credit card bill</div>
              </div>
            </div>

            {/* Step 3: Unlock More! */}
            <div style={{ display: 'flex', gap: 14 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: '50%', background: '#fff',
                  border: `2px solid ${EL.amber}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {Icon.lock(EL.amber, 14)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: EL.ink, letterSpacing: -0.2 }}>Unlock More!</div>
                <div style={{ fontSize: 13, color: EL.muted2, marginTop: 4, fontWeight: 500 }}>Get more offer after it reflects in your credit history</div>
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
