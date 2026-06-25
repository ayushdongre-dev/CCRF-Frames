// screen-multioffer.jsx — Choose your offer: Melt card debt or Cash loan
function MultiOffer({ go }) {
  var sora = { fontFamily: "'Sora',sans-serif" };
  var ink = '#1B192E'; var ink2 = '#4B4960'; var muted = '#8A879B';
  var P = '#5B3FD4'; var Pl = '#F0EFFE'; var Pb = '#C7C4F2';

  var sel = useState('melt'); var selected = sel[0]; var setSelected = sel[1];

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#F7F6FD', animation: 'fadeIn .3s' }}>

      {/* nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 16px 8px', flexShrink: 0 }}>
        <button onClick={function(){ go('selling'); }} style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', borderRadius: 999, border: '1.5px solid ' + Pb }}>
          {Icon.back(P)}
        </button>
        <span style={{ fontWeight: 800, fontSize: 18, color: P, letterSpacing: -0.5, ...sora }}>melt</span>
        <div style={{ width: 38 }} />
      </div>

      <div style={{ flex: 1, padding: '4px 20px 0' }}>

        {/* hero */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontWeight: 800, fontSize: 22, color: ink, ...sora, lineHeight: 1.1, marginBottom: 10 }}>Choose how to use your offer</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', borderRadius: 999, padding: '8px 20px', border: '1.5px solid ' + Pb, boxShadow: '0 4px 16px -6px rgba(91,63,212,.18)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" fill={P} />
              <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 14, fontWeight: 800, color: P, ...sora }}>Approved for ₹2,00,000</span>
          </div>
          <div style={{ fontSize: 13, color: muted, marginTop: 10, fontWeight: 500 }}>Pick what works best for you</div>
        </div>

        {/* Card 1 — Clear card debt (Melt) */}
        <button onClick={function(){ setSelected('melt'); }} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: 0, cursor: 'pointer', marginBottom: 12, display: 'block' }}>
          <div style={{
            borderRadius: 20, padding: '16px', position: 'relative',
            background: selected === 'melt' ? Pl : '#fff',
            border: selected === 'melt' ? '2px solid ' + P : '1.5px solid #E8E4FA',
            boxShadow: selected === 'melt' ? '0 8px 28px -10px rgba(91,63,212,.3)' : '0 2px 10px -4px rgba(0,0,0,.07)',
            transition: 'all .2s ease',
          }}>
            {/* RECOMMENDED pill */}
            <div style={{ position: 'absolute', top: -11, left: 16, background: 'linear-gradient(135deg,#22C55E,#16A34A)', borderRadius: 999, padding: '3px 10px', boxShadow: '0 2px 8px rgba(22,163,74,.3)' }}>
              <span style={{ fontSize: 8.5, fontWeight: 900, color: '#fff', letterSpacing: 0.6 }}>RECOMMENDED</span>
            </div>

            {/* header row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, marginTop: 4 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 17, color: selected === 'melt' ? P : ink, ...sora }}>Clear your card debt</div>
                <div style={{ fontSize: 12, color: muted, fontWeight: 500, marginTop: 2 }}>with Melt</div>
              </div>
              <div style={{
                width: 26, height: 26, borderRadius: 999, flexShrink: 0,
                background: selected === 'melt' ? P : '#ECEAF4',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background .2s',
              }}>
                {selected === 'melt'
                  ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 13l5 5L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  : <div style={{ width: 10, height: 10, borderRadius: 999, border: '2px solid ' + Pb }} />
                }
              </div>
            </div>

            {/* inset detail */}
            <div style={{ background: selected === 'melt' ? 'rgba(91,63,212,.06)' : '#F7F6FD', borderRadius: 12, padding: '12px 14px', border: '1px solid ' + (selected === 'melt' ? 'rgba(91,63,212,.15)' : '#EAE6F8') }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: muted, marginBottom: 3 }}>Your credit card debt</div>
              <div style={{ fontWeight: 900, fontSize: 28, color: selected === 'melt' ? P : ink, ...sora, letterSpacing: -1, lineHeight: 1, marginBottom: 6 }}>₹5,00,000</div>
              <div style={{ fontSize: 12, color: ink2, lineHeight: 1.5 }}>Reduce it at a <b style={{ color: ink }}>lower cost</b> and avoid high credit card interest charges.</div>
            </div>
          </div>
        </button>

        {/* OR divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '0 4px 12px' }}>
          <div style={{ flex: 1, height: 1, background: '#ECEAF4' }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: muted, letterSpacing: 0.5 }}>OR</span>
          <div style={{ flex: 1, height: 1, background: '#ECEAF4' }} />
        </div>

        {/* Card 2 — Cash loan */}
        <button onClick={function(){ setSelected('cash'); }} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'block' }}>
          <div style={{
            borderRadius: 20, padding: '16px',
            background: selected === 'cash' ? Pl : '#fff',
            border: selected === 'cash' ? '2px solid ' + P : '1.5px solid #E8E4FA',
            boxShadow: selected === 'cash' ? '0 8px 28px -10px rgba(91,63,212,.3)' : '0 2px 10px -4px rgba(0,0,0,.07)',
            transition: 'all .2s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 17, color: selected === 'cash' ? P : ink, ...sora }}>Cash loan</div>
              <div style={{ fontSize: 12, color: muted, fontWeight: 500, marginTop: 2 }}>Instant cash, any purpose</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" opacity="0.45">
                <rect x="2" y="7" width="20" height="14" rx="3" stroke={selected === 'cash' ? P : '#64748B'} strokeWidth="1.8"/>
                <path d="M16 14a2 2 0 1 0 0-.01" stroke={selected === 'cash' ? P : '#64748B'} strokeWidth="1.8"/>
                <path d="M2 11h20" stroke={selected === 'cash' ? P : '#64748B'} strokeWidth="1.8"/>
              </svg>
              <div style={{
                width: 26, height: 26, borderRadius: 999, flexShrink: 0,
                background: selected === 'cash' ? P : '#ECEAF4',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background .2s',
              }}>
                {selected === 'cash'
                  ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 13l5 5L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  : <div style={{ width: 10, height: 10, borderRadius: 999, border: '2px solid ' + Pb }} />
                }
              </div>
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
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </BottomBar>
    </div>
  );
}
window.MultiOffer = MultiOffer;
