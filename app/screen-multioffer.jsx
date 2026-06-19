// screen-multioffer.jsx — Choose how to use your offer
function MultiOffer({ go }) {
  const [selected, setSelected] = React.useState('debt');

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#F0EFFE', animation: 'fadeIn .4s' }}>

      {/* nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 14px 6px', flexShrink: 0 }}>
        <button onClick={() => go('selling')} style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {Icon.back('#333')}
        </button>
        <span style={{ fontWeight: 600, fontSize: 21, color: '#5B3FD4', letterSpacing: -0.4 }}>melt</span>
        <div style={{ width: 38 }} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '4px 20px 32px', overflowY: 'auto' }}>

        {/* heading */}
        <div style={{ fontWeight: 800, fontSize: 26, letterSpacing: -0.5, lineHeight: 1.2, marginTop: 8, marginBottom: 18 }}>
          Choose how to<br />use your offer
        </div>

        {/* approved amount */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.1, color: '#888', marginBottom: 4 }}>
            YOU'RE APPROVED FOR
          </div>
          <div style={{ fontWeight: 800, fontSize: 48, color: '#5B3FD4', letterSpacing: -3, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
            ₹2,50,000
          </div>
          <div style={{ fontSize: 13, color: '#888', marginTop: 5 }}>
            Pick what works best for you
          </div>
        </div>

        {/* Option 1 — Clear card debt */}
        <div
          onClick={() => setSelected('debt')}
          style={{
            borderRadius: 18,
            border: selected === 'debt' ? '2px solid #5B3FD4' : '2px solid #E0DCF5',
            background: '#fff',
            padding: '14px 14px 16px',
            cursor: 'pointer',
            position: 'relative',
            transition: 'border-color .15s',
          }}
        >
          {/* RECOMMENDED badge */}
          <div style={{
            position: 'absolute', top: -1, right: 14,
            background: '#5B3FD4', color: '#fff',
            fontSize: 9.5, fontWeight: 700, letterSpacing: 0.8,
            padding: '3px 9px', borderRadius: '0 0 8px 8px',
          }}>
            RECOMMENDED
          </div>

          {/* row: checkmark + label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{
              width: 22, height: 22, borderRadius: 999,
              background: selected === 'debt' ? '#5B3FD4' : 'transparent',
              border: selected === 'debt' ? 'none' : '2px solid #ccc',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {selected === 'debt' && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15.5, color: '#1A1733', lineHeight: 1.2 }}>Clear your card debt</div>
              <div style={{ fontSize: 12.5, color: '#5B3FD4', fontWeight: 600 }}>with melt</div>
            </div>
          </div>

          {/* inner info card */}
          <div style={{
            background: '#F8F7FE', borderRadius: 12,
            padding: '12px 14px',
          }}>
            <div style={{ fontSize: 12, color: '#888', fontWeight: 600, marginBottom: 4 }}>Your credit card debt</div>
            <div style={{ fontWeight: 800, fontSize: 26, color: '#1A1733', letterSpacing: -1, lineHeight: 1, fontVariantNumeric: 'tabular-nums', marginBottom: 8 }}>₹5,00,000</div>
            <div style={{ fontSize: 12, color: '#888', lineHeight: 1.5 }}>
              Reduce it now at a lower cost, skip paying high interest rate on your credit cards
            </div>
          </div>
        </div>

        {/* OR divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '14px 0' }}>
          <div style={{ flex: 1, height: 1, background: '#DDD' }} />
          <div style={{ fontSize: 12, fontWeight: 600, color: '#AAA' }}>OR</div>
          <div style={{ flex: 1, height: 1, background: '#DDD' }} />
        </div>

        {/* Option 2 — Cash loan */}
        <div
          onClick={() => setSelected('cash')}
          style={{
            borderRadius: 18,
            border: selected === 'cash' ? '2px solid #5B3FD4' : '2px solid #E0DCF5',
            background: '#fff',
            padding: '16px 14px',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 12,
            transition: 'border-color .15s',
          }}
        >
          {/* radio */}
          <div style={{
            width: 22, height: 22, borderRadius: 999,
            background: selected === 'cash' ? '#5B3FD4' : 'transparent',
            border: selected === 'cash' ? 'none' : '2px solid #ccc',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            {selected === 'cash' && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15.5, color: '#1A1733' }}>Cash loan</div>
            <div style={{ fontSize: 12.5, color: '#888', marginTop: 2 }}>
              Instant cash, <span style={{ color: '#5B3FD4', fontWeight: 600 }}>any purpose</span>
            </div>
          </div>

          {/* card icon */}
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: '#F0EFFE',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
              <rect x="1" y="1" width="18" height="14" rx="3" stroke="#5B3FD4" strokeWidth="1.6"/>
              <line x1="1" y1="5.5" x2="19" y2="5.5" stroke="#5B3FD4" strokeWidth="1.4"/>
              <rect x="3" y="8.5" width="5" height="2.5" rx="1" fill="#5B3FD4" opacity="0.45"/>
            </svg>
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
          Continue {Icon.arrowR('#fff')}
        </button>
      </BottomBar>
    </div>
  );
}
window.MultiOffer = MultiOffer;
