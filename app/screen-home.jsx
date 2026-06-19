// screen-home.jsx — EQUALL Home Dashboard
function HomeScreen({ go }) {
  const steps = [
    { label: 'Apply',            done: false, active: true },
    { label: 'Your Offer',       done: false, active: false },
    { label: 'Verify & Approve', done: false, active: false },
    { label: 'Setup & Disbursal',done: false, active: false },
  ];

  const useCases = [
    { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v5c0 5.5 4 10.7 9 12 5-1.3 9-6.5 9-12V7L12 2Z" stroke="#5B3FD4" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="#5B3FD4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: 'Education Purpose', desc: 'Fund school, courses or scholarships.' },
    { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#5B3FD4" strokeWidth="1.8"/><circle cx="12" cy="12" r="3" stroke="#5B3FD4" strokeWidth="1.8"/><line x1="12" y1="3" x2="12" y2="6" stroke="#5B3FD4" strokeWidth="1.8" strokeLinecap="round"/><line x1="12" y1="18" x2="12" y2="21" stroke="#5B3FD4" strokeWidth="1.8" strokeLinecap="round"/><line x1="3" y1="12" x2="6" y2="12" stroke="#5B3FD4" strokeWidth="1.8" strokeLinecap="round"/><line x1="18" y1="12" x2="21" y2="12" stroke="#5B3FD4" strokeWidth="1.8" strokeLinecap="round"/></svg>, title: 'Medical Expenses', desc: 'Cover unexpected health or emergency costs.' },
    { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M3 10.5L12 2l9 8.5V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10.5Z" stroke="#5B3FD4" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 22v-7h6v7" stroke="#5B3FD4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: 'Home Renovation', desc: 'Renovate your home without upfront stress.' },
    { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" stroke="#5B3FD4" strokeWidth="1.8" strokeLinejoin="round"/></svg>, title: 'Personal Events', desc: 'Plan weddings, birthdays or festivals.' },
  ];

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#F4F3FB', animation: 'fadeIn .35s', overflowY: 'auto' }}>

      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* logo mark */}
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M11 2L3 8v6l8 6 8-6V8L11 2Z" fill="#5B3FD4" opacity=".85"/>
            <path d="M11 6L6 10v3l5 3.5L16 13v-3L11 6Z" fill="#fff" opacity=".7"/>
          </svg>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, color: '#1A1A2E', letterSpacing: 0.5 }}>EQUALL</div>
            <div style={{ fontSize: 9.5, color: '#888', fontWeight: 500, marginTop: -1 }}>A brand of <span style={{ fontWeight: 700 }}>LTCV Credit</span></div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ position: 'relative', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, borderRadius: 999, background: '#E8A020', border: '1.5px solid #F4F3FB' }} />
          </div>
          <div style={{ width: 36, height: 36, borderRadius: 999, background: '#5B3FD4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, color: '#fff' }}>S</div>
        </div>
      </div>

      <div style={{ padding: '4px 18px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* greeting */}
        <div>
          <div style={{ fontSize: 14, color: '#666' }}>Good morning,</div>
          <div style={{ fontSize: 21, fontWeight: 800, color: '#1A1A2E', letterSpacing: -0.3 }}>Shatakshi Singh 👋</div>
        </div>

        {/* hero card */}
        <div style={{
          borderRadius: 22, background: '#0F0D2E', overflow: 'hidden', position: 'relative',
          boxShadow: '0 18px 40px -18px rgba(15,13,46,.7)', minHeight: 148,
        }}>
          {/* glow */}
          <div style={{ position: 'absolute', top: -30, left: -30, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,63,212,.4) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ padding: '22px 20px 22px', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,.65)', fontWeight: 500 }}>You can get a loan upto</div>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#fff', letterSpacing: -1.5, lineHeight: 1.1, marginTop: 4 }}>₹5,00,000</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.55)', marginTop: 6, lineHeight: 1.4 }}>Resume your loan<br/>application to continue</div>
              <button
                onClick={() => go('multioffer')}
                style={{
                  marginTop: 14, padding: '9px 18px', borderRadius: 22, background: '#fff', color: '#1A1A2E',
                  fontWeight: 700, fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 5,
                }}
              >
                Check eligibility »
              </button>
            </div>
            {/* card stack illustration */}
            <div style={{ position: 'relative', width: 70, height: 90, flexShrink: 0, marginRight: 4 }}>
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: 60, height: 38, borderRadius: 8, background: 'rgba(91,63,212,.6)', transform: 'rotate(-8deg)' }} />
              <div style={{ position: 'absolute', bottom: 8, right: 4, width: 60, height: 38, borderRadius: 8, background: 'rgba(91,63,212,.85)', transform: 'rotate(-3deg)' }}>
                <div style={{ position: 'absolute', bottom: 6, left: 8, width: 20, height: 14, borderRadius: 3, background: 'rgba(255,200,80,.9)' }} />
                <div style={{ position: 'absolute', top: 8, right: 8 }}>
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><circle cx="5" cy="5" r="5" fill="rgba(255,255,255,.25)"/><circle cx="9" cy="5" r="5" fill="rgba(255,255,255,.15)"/></svg>
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: 16, right: 8, width: 60, height: 38, borderRadius: 8, background: '#5B3FD4' }}>
                <div style={{ position: 'absolute', top: 8, left: 8, fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,.7)' }}>₹</div>
              </div>
            </div>
          </div>
        </div>

        {/* steps */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '18px 18px 16px', boxShadow: '0 6px 20px -14px rgba(40,30,80,.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#1A1A2E' }}>Steps to get the loan</div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, color: '#E8A020', background: '#FFF8EC', border: '1px solid #F5D9A0', borderRadius: 20, padding: '3px 9px' }}>IN PROGRESS</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {steps.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: i < steps.length - 1 ? 16 : 0, position: 'relative' }}>
                {i < steps.length - 1 && (
                  <div style={{ position: 'absolute', left: 11, top: 24, width: 2, height: 16, background: s.active ? '#E8A020' : '#E8E4F0' }} />
                )}
                <div style={{
                  width: 24, height: 24, borderRadius: 999, flexShrink: 0,
                  background: s.done ? '#1A7A4A' : s.active ? '#E8A020' : '#E8E4F0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: s.active ? '0 0 0 4px rgba(232,160,32,.15)' : 'none',
                }}>
                  {s.done
                    ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6l2.5 2.5 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    : <div style={{ width: 8, height: 8, borderRadius: 999, background: s.active ? '#fff' : '#C4BEDC' }} />
                  }
                </div>
                <div style={{ fontSize: 14, fontWeight: s.active ? 700 : 500, color: s.active ? '#1A1A2E' : '#9A95B5' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TrustIQ */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '16px 18px', boxShadow: '0 6px 20px -14px rgba(40,30,80,.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.8, color: '#999', position: 'absolute', marginTop: -38 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* semicircle gauge */}
            <div style={{ position: 'relative', width: 56, height: 36 }}>
              <svg width="56" height="36" viewBox="0 0 56 36">
                <path d="M4 34 A24 24 0 0 1 52 34" stroke="#E8E4F0" strokeWidth="5" fill="none" strokeLinecap="round"/>
                <path d="M4 34 A24 24 0 0 1 52 34" stroke="#1A7A4A" strokeWidth="5" fill="none" strokeLinecap="round"
                  strokeDasharray="75.4" strokeDashoffset="18"/>
              </svg>
              <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', fontWeight: 800, fontSize: 16, color: '#1A1A2E' }}>78</div>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.8, color: '#999', marginBottom: 3 }}>TRUSTIQ SCORE</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ fontWeight: 700, fontSize: 15, color: '#1A1A2E' }}>TrustIQ</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#1A7A4A', background: '#E8F8EE', borderRadius: 20, padding: '2px 8px' }}>Strong</span>
              </div>
            </div>
          </div>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="#C4BEDC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>

        {/* ways to use */}
        <div>
          <div style={{ fontWeight: 800, fontSize: 17, color: '#1A1A2E', marginBottom: 12 }}>Ways to use EQUALL loans</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {useCases.map((u, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 16, padding: '16px 14px', boxShadow: '0 4px 14px -10px rgba(40,30,80,.25)' }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: '#EDEAFA', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  {u.icon}
                </div>
                <div style={{ fontWeight: 700, fontSize: 13.5, color: '#1A1A2E', marginBottom: 4 }}>{u.title}</div>
                <div style={{ fontSize: 11.5, color: '#888', lineHeight: 1.45 }}>{u.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* products for you */}
        <div>
          <div style={{ fontWeight: 800, fontSize: 17, color: '#1A1A2E', marginBottom: 12 }}>Products For You</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* Melt */}
            <button onClick={() => go('multioffer')} style={{
              width: '100%', borderRadius: 18, background: '#1A1740', padding: '16px 18px',
              display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
              boxShadow: '0 10px 28px -14px rgba(15,13,46,.6)',
            }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(91,63,212,.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2C8 8 5 10 5 14a7 7 0 0 0 14 0c0-4-3-6-7-12Z" fill="#60A5FA" opacity=".85"/><path d="M12 14c-1.5-2-2-3-2-4.5a2 2 0 0 1 4 0C14 11 13.5 12 12 14Z" fill="#fff" opacity=".5"/></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14.5, color: '#fff' }}>Melt · Card Debt Relief</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.55)', marginTop: 3 }}>Manage card debt smarter, with lower monthly payments</div>
              </div>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6 4l5 5-5 5" stroke="rgba(255,255,255,.4)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            {/* Instant Cash */}
            <button style={{
              width: '100%', borderRadius: 18, background: '#0D3D2B', padding: '16px 18px',
              display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
              boxShadow: '0 10px 28px -14px rgba(13,61,43,.6)',
            }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(26,122,74,.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8Z" fill="#4ADE80"/></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14.5, color: '#fff' }}>Instant Cash</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.55)', marginTop: 3 }}>Quick personal loans disbursed in minutes.</div>
              </div>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6 4l5 5-5 5" stroke="rgba(255,255,255,.4)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>

        {/* footer */}
        <div style={{ fontSize: 10.5, color: '#AAA', textAlign: 'center', lineHeight: 1.55, padding: '4px 8px 8px' }}>
          EQUALL is a product of <span style={{ fontWeight: 700, color: '#888' }}>LTCV Credit Private Limited</span>, a registered NBFC. Loan products are subject to credit approval.
        </div>

      </div>
    </div>
  );
}
window.HomeScreen = HomeScreen;
