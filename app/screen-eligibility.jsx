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
  const CARD_APR = 0.42;
  const EQUALL_APR = 0.22;
  const LOCKED_MORE = FULL_LIMIT - UNLOCKED;
  const ANNUAL_SAVINGS = Math.round(TOTAL_DEBT * (CARD_APR - EQUALL_APR));
  const MONTHLY_SAVINGS = Math.round(ANNUAL_SAVINGS / 12);
  const INTEREST_SAVED = ANNUAL_SAVINGS;
  const progress = Math.round((UNLOCKED / FULL_LIMIT) * 100);
  const unlockedLimit = inr(UNLOCKED);

  const [animIn, setAnimIn] = useState(false);
  const [unlockOpen, setUnlockOpen] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimIn(true), 80); return () => clearTimeout(t); }, []);

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

  const nodeSize = 38;
  const nodeOuter = 46;
  const trackH = 6;

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
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.8, color: EL.muted3, marginBottom: 8 }}>MELT PROGRESS</div>
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
        {false && (() => {
          const TRIP_COST  = 8000;
          const PHONE_COST = 30000;
          const RENT_COST  = 7000;
          const INV_YEARS  = 5;
          const INV_RATE   = 0.12;
          const goaTrips   = Math.max(1, Math.floor(INTEREST_SAVED / TRIP_COST));
          const phones     = Math.max(1, Math.floor(INTEREST_SAVED / PHONE_COST));
          const rentMonths = Math.max(1, Math.floor(INTEREST_SAVED / RENT_COST));
          const investedValue = Math.round(INTEREST_SAVED * Math.pow(1 + INV_RATE, INV_YEARS));
          const investReturn  = investedValue - INTEREST_SAVED;

          const iconPlane = (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2a1.5 1.5 0 0 0-1.5 1.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5Z" fill="#3B82F6"/>
            </svg>
          );
          const iconPhone = (
            <svg width="18" height="22" viewBox="0 0 24 28" fill="none">
              <rect x="4" y="1" width="16" height="26" rx="3" stroke="#3B82F6" strokeWidth="2"/>
              <circle cx="12" cy="23" r="1.2" fill="#3B82F6"/>
              <line x1="9" y1="5" x2="15" y2="5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          );
          const iconHouse = (
            <svg width="22" height="20" viewBox="0 0 24 22" fill="none">
              <path d="M3 10.5L12 2l9 8.5V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10.5Z" stroke="#3B82F6" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M9 22v-7h6v7" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          );
          const iconGrowth = (
            <svg width="22" height="20" viewBox="0 0 24 22" fill="none">
              <polyline points="2,18 8,10 13,14 20,4" stroke="#4ADE80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="16,4 20,4 20,8" stroke="#4ADE80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          );

          const tiles = [
            { icon: iconPlane,  count: goaTrips,   label: 'Goa trips' },
            { icon: iconPhone,  count: phones,      label: 'Smartphones' },
            { icon: iconHouse,  count: rentMonths,  label: "Months' rent" },
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
    </div>
  );
}

window.Eligibility = Eligibility;
