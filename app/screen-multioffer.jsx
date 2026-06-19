// screen-multioffer.jsx — Eligibility result screen
function MultiOffer({ go }) {
  const benefitTiles = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="13" stroke="#1A7A4A" strokeWidth="1.6" strokeDasharray="3 2" opacity="0.35"/>
          <circle cx="16" cy="16" r="8" fill="#E8F8EE"/>
          <path d="M16 10v6l3.5 2" stroke="#1A7A4A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10.5 21.5l3-3" stroke="#1A7A4A" strokeWidth="1.6" strokeLinecap="round"/>
          <circle cx="16" cy="16" r="2.5" fill="#1A7A4A"/>
          <path d="M20 8.5c2.5 1.4 4 4 4 7a8 8 0 0 1-16 0c0-3 1.5-5.6 4-7" stroke="#1A7A4A" strokeWidth="1.6" strokeLinecap="round"/>
          <path d="M13.5 11.5l1.5 3 3-4.5" stroke="#1A7A4A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Save up to\n70% on\nInterest',
      color: '#1A7A4A',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="5" y="9" width="18" height="12" rx="3" fill="#EDE8FF" stroke="#5B3FD4" strokeWidth="1.6"/>
          <rect x="9" y="13" width="18" height="12" rx="3" fill="#fff" stroke="#5B3FD4" strokeWidth="1.6"/>
          <line x1="9" y1="17" x2="27" y2="17" stroke="#5B3FD4" strokeWidth="1.4"/>
          <rect x="11" y="19" width="5" height="2.5" rx="1" fill="#5B3FD4" opacity="0.5"/>
        </svg>
      ),
      label: 'Convert\nmultiple bills\ninto one',
      color: '#5B3FD4',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="5" y="7" width="18" height="17" rx="3" fill="#FFF8EC" stroke="#E8A020" strokeWidth="1.6"/>
          <line x1="5" y1="12" x2="23" y2="12" stroke="#E8A020" strokeWidth="1.4"/>
          <line x1="9" y1="5" x2="9" y2="9" stroke="#E8A020" strokeWidth="1.7" strokeLinecap="round"/>
          <line x1="19" y1="5" x2="19" y2="9" stroke="#E8A020" strokeWidth="1.7" strokeLinecap="round"/>
          <path d="M21 20h6M24 17v6" stroke="#E8A020" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
      label: 'Reduce\nRepayment\nTime',
      color: '#E8A020',
    },
  ];

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#F0EFFE', animation: 'fadeIn .4s' }}>
      <style>{`
        @keyframes popIn {
          0%   { transform: scale(0); opacity: 0; }
          60%  { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(18px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>

      {/* nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 14px 6px', flexShrink: 0 }}>
        <button onClick={() => go('selling')} style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {Icon.back('#333')}
        </button>
        <span style={{ fontWeight: 600, fontSize: 21, color: '#5B3FD4', letterSpacing: -0.4 }}>melt</span>
        <div style={{ width: 38 }} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8px 24px 32px' }}>

        {/* checkmark circle */}
        <div style={{
          width: 72, height: 72, borderRadius: 999, background: '#5B3FD4',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 16px 36px -12px rgba(91,63,212,.6)',
          animation: 'popIn .5s cubic-bezier(.34,1.56,.64,1)',
        }}>
          {Icon.check('#fff', 34)}
        </div>

        {/* heading */}
        <div style={{ fontWeight: 800, fontSize: 26, marginTop: 18, letterSpacing: -0.4, textAlign: 'center', animation: 'slideUp .4s .1s both' }}>
          You're eligible!
        </div>
        <div style={{ fontSize: 14, color: '#888', marginTop: 3, animation: 'slideUp .4s .15s both' }}>
          Your loan offer
        </div>

        {/* amount */}
        <div style={{ fontWeight: 800, fontSize: 52, color: '#5B3FD4', letterSpacing: -4, marginTop: 8, lineHeight: 1, fontStretch: 'condensed', fontVariantNumeric: 'tabular-nums', animation: 'slideUp .4s .2s both' }}>
          ₹2,50,000
        </div>

        {/* recommendation card */}
        <div style={{
          marginTop: 28, width: '100%', background: '#fff', borderRadius: 18,
          padding: '18px 16px 16px', border: '1px solid #E8E4FA',
          boxShadow: '0 8px 28px -14px rgba(40,30,80,.25)',
          animation: 'slideUp .4s .28s both',
        }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 1, color: '#5B3FD4', marginBottom: 10 }}>RECOMMENDATION</div>
          <div style={{ fontSize: 13.5, color: '#333', lineHeight: 1.55, fontWeight: 500, marginBottom: 16 }}>
            Your current card debt is <span style={{ color: '#1A1733', fontWeight: 700 }}>₹5,00,000</span>.
          </div>

          {/* three benefit tiles */}
          <div style={{ display: 'flex', gap: 8 }}>
            {benefitTiles.map((t, i) => (
              <div key={i} style={{
                flex: 1, borderRadius: 14, border: '1px solid #F0EEF8',
                background: '#FAFAFE', padding: '14px 8px 12px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                textAlign: 'center',
              }}>
                {t.icon}
                <div style={{
                  fontSize: 11, fontWeight: 600, color: '#444', lineHeight: 1.4,
                  whiteSpace: 'pre-line',
                }}>
                  {t.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <BottomBar bg="#F0EFFE">
        <button
          onClick={() => go('selling')}
          style={{
            width: '100%', height: 56, borderRadius: 16, background: '#5B3FD4', color: '#fff',
            fontWeight: 600, fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
            boxShadow: '0 14px 30px -8px rgba(91,63,212,.6)', transition: 'transform .12s',
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(.975)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          Know how much you can save {Icon.arrowR('#fff')}
        </button>
      </BottomBar>
    </div>
  );
}
window.MultiOffer = MultiOffer;
