// screen-multioffer.jsx — Choose your offer
function MultiOffer({ go }) {
  var sora = { fontFamily: "'Sora',sans-serif" };
  var ink = '#1B192E'; var muted = '#8A879B';
  var P = '#5B3FD4'; var Pl = '#F2F0FE'; var Pb = '#C7C4F2';

  var sel = useState('melt'); var selected = sel[0]; var setSelected = sel[1];
  var meltOn = selected === 'melt';
  var cashOn  = selected === 'cash';

  function Radio(active) {
    return (
      <div style={{
        width: 22, height: 22, borderRadius: 999, flexShrink: 0,
        background: active ? P : '#fff',
        border: active ? 'none' : ('2px solid ' + Pb),
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: active ? '0 2px 8px rgba(91,63,212,.3)' : 'none',
        transition: 'all .2s',
      }}>
        {active && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 13l5 5L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#F7F6FD', animation: 'fadeIn .3s' }}>

      {/* nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 16px 10px', flexShrink: 0 }}>
        <button onClick={function(){ go('selling'); }} style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', borderRadius: 999, border: '1.5px solid ' + Pb }}>
          {Icon.back(P)}
        </button>
        <span style={{ fontWeight: 800, fontSize: 18, color: P, letterSpacing: -0.5, ...sora }}>melt</span>
        <div style={{ width: 38 }}/>
      </div>

      <div style={{ flex: 1, padding: '0 20px 20px' }}>

        {/* ── Hero ── */}
        <div style={{ marginBottom: 16, textAlign: 'center' }}>
          <div style={{ fontWeight: 900, fontSize: 24, color: ink, ...sora, letterSpacing: -0.8, lineHeight: 1.2 }}>Your offer is ready.</div>
          <div style={{ fontSize: 13, color: muted, fontWeight: 500, marginTop: 6 }}>Choose how you'd like to use it.</div>
        </div>

        {/* ── Card 1: Clear Card Debt ── */}
        <button onClick={function(){ setSelected('melt'); }}
          style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: 0, cursor: 'pointer', marginBottom: 10, display: 'block' }}>
          <div style={{
            borderRadius: 18, overflow: 'hidden',
            background: meltOn ? Pl : '#fff',
            border: meltOn ? ('2px solid ' + P) : '1.5px solid #E8E4FA',
            boxShadow: meltOn ? '0 2px 6px rgba(0,0,0,.07), 0 6px 0 #D8D4EC, 0 18px 44px rgba(0,0,0,.14)' : '0 2px 6px rgba(0,0,0,.07), 0 6px 0 #D8D4EC, 0 18px 44px rgba(0,0,0,.14)',
            transition: 'box-shadow .2s, border-color .2s, background .2s',
          }}>
            {/* exclusive strip */}
            <div style={{
              background: 'linear-gradient(90deg, #4B2EC2, #6D28D9)',
              padding: '6px 16px', display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="#FFD700"/>
              </svg>
              <span style={{ fontSize: 10.5, fontWeight: 700, color: '#fff', letterSpacing: 0.3 }}>You're in the top 5% of customers</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px 12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                  <div style={{ fontWeight: 800, fontSize: 16, color: meltOn ? P : ink, ...sora, transition: 'color .2s' }}>Clear Card Debt</div>
                  <div style={{
                    background: '#1FA971', borderRadius: 6, padding: '2px 8px',
                    fontSize: 9.5, fontWeight: 700, color: '#fff', letterSpacing: 0.4, flexShrink: 0,
                  }}>Recommended</div>
                </div>
                <div style={{ fontSize: 12, color: muted, fontWeight: 500 }}>Melt handles your card dues</div>
              </div>
              {Radio(meltOn)}
            </div>

            {/* Always expanded */}
            <div style={{ padding: '0 16px 18px' }}>
              <div style={{ height: 1, background: 'rgba(91,63,212,0.10)', marginBottom: 16 }}/>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: 'rgba(91,63,212,0.45)', letterSpacing: 0.9, marginBottom: 7 }}>SANCTIONED AMOUNT</div>
              <div style={{ fontWeight: 900, fontSize: 38, color: P, ...sora, letterSpacing: -1.5, lineHeight: 1 }}>₹5,00,000</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, background: 'rgba(91,63,212,0.07)', borderRadius: 10, padding: '8px 12px' }}>
                <span style={{ fontSize: 11.5, fontWeight: 600, color: muted }}>Your card debt</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: P, ...sora }}>₹5,00,000</span>
              </div>
            </div>
          </div>
        </button>

        {/* OR */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '0 4px 10px' }}>
          <div style={{ flex: 1, height: 1, background: '#E8E4FA' }}/>
          <span style={{ fontSize: 11, fontWeight: 700, color: muted, letterSpacing: 0.5 }}>OR</span>
          <div style={{ flex: 1, height: 1, background: '#E8E4FA' }}/>
        </div>

        {/* ── Card 2: Cash Loan ── */}
        <button onClick={function(){ setSelected('cash'); }}
          style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'block' }}>
          <div style={{
            borderRadius: 18, overflow: 'hidden',
            background: cashOn ? Pl : '#fff',
            border: cashOn ? ('2px solid ' + P) : '1.5px solid #E8E4FA',
            boxShadow: cashOn ? '0 2px 6px rgba(0,0,0,.07), 0 6px 0 #D8D4EC, 0 18px 44px rgba(0,0,0,.14)' : '0 2px 6px rgba(0,0,0,.07), 0 6px 0 #D8D4EC, 0 18px 44px rgba(0,0,0,.14)',
            transition: 'box-shadow .2s, border-color .2s, background .2s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 16px 12px' }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: cashOn ? P : ink, ...sora, transition: 'color .2s' }}>Cash Loan</div>
                <div style={{ fontSize: 12, color: muted, fontWeight: 500, marginTop: 3 }}>Transferred directly to your bank</div>
              </div>
              {Radio(cashOn)}
            </div>

            {/* Always expanded */}
            <div style={{ padding: '0 16px 18px' }}>
              <div style={{ height: 1, background: 'rgba(91,63,212,0.10)', marginBottom: 16 }}/>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: 'rgba(91,63,212,0.45)', letterSpacing: 0.9, marginBottom: 7 }}>SANCTIONED AMOUNT</div>
              <div style={{ fontWeight: 900, fontSize: 38, color: P, ...sora, letterSpacing: -1.5, lineHeight: 1 }}>₹2,00,000</div>
              <div style={{ fontSize: 12, color: muted, fontWeight: 500, marginTop: 10 }}>Transferred to your salary account</div>
            </div>
          </div>
        </button>
      </div>

      {/* CTA */}
      <BottomBar bg="#F7F6FD">
        <button
          onClick={function(){ go('selling'); }}
          style={{
            width: '100%', height: 56, borderRadius: 16, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg,' + P + ',#4F46E5)',
            color: '#fff', fontWeight: 800, fontSize: 16, ...sora,
            boxShadow: '0 12px 28px -8px rgba(91,63,212,.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'transform .1s',
          }}
          onMouseDown={function(e){ e.currentTarget.style.transform='scale(.975)'; }}
          onMouseUp={function(e){ e.currentTarget.style.transform='scale(1)'; }}
          onMouseLeave={function(e){ e.currentTarget.style.transform='scale(1)'; }}
        >
          Continue
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </BottomBar>
    </div>
  );
}
window.MultiOffer = MultiOffer;
