// screen-reward.jsx — B2 "You have earned this!"

function RewardScreen({ go }) {
  var ink   = '#1B192E';
  var muted = '#8A879B';
  var G     = '#1FA971';
  var sora  = { fontFamily: "'Sora',sans-serif" };
  var rst   = useState(false); var revealed = rst[0]; var setRevealed = rst[1];

  useEffect(function() { var t = setTimeout(function() { setRevealed(true); }, 200); return function() { clearTimeout(t); }; }, []);

  var ROWS = [
    { label: 'Previous tranche',      value: '₹1,50,000', color: '#64748B', bg: '#F8FAFC' },
    { label: 'Tranche 2 unlocked',    value: '+ ₹1,25,000', color: G,        bg: 'var(--green-l)', highlight: true },
    { label: 'Total facility',        value: '₹2,75,000', color: ink,       bg: '#F4F3FB' },
    { label: 'Outstanding balance',   value: '₹1,28,400', color: '#D97706', bg: '#FFFBEB' },
    { label: 'Fresh cash you receive',value: '₹1,46,600', color: G,         bg: 'var(--green-l)' },
  ];

  var CONFETTI = [
    { left: '10%', color: '#FCD34D', delay: '0s',   size: 9,  shape: 'circle' },
    { left: '25%', color: G,         delay: '.12s', size: 7,  shape: 'square' },
    { left: '45%', color: '#7F55DF', delay: '.05s', size: 8,  shape: 'square' },
    { left: '60%', color: '#38BDF8', delay: '.18s', size: 6,  shape: 'circle' },
    { left: '78%', color: '#FCD34D', delay: '.08s', size: 8,  shape: 'square' },
    { left: '90%', color: G,         delay: '.22s', size: 7,  shape: 'circle' },
    { left: '35%', color: '#F472B6', delay: '.3s',  size: 5,  shape: 'square' },
    { left: '70%', color: '#7F55DF', delay: '.14s', size: 6,  shape: 'circle' },
  ];

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff', animation: 'fadeIn .25s' }}>
      <EquallHead onHome={function(){ go('home'); }} />

      <div className="scr" style={{ flex: 1, overflowY: 'auto', padding: '0 20px 8px' }}>
        {/* Hero section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24, position: 'relative' }}>
          {/* Confetti */}
          {revealed && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 80, pointerEvents: 'none', overflow: 'visible', zIndex: 5 }}>
              {CONFETTI.map(function(c, i) {
                return (
                  <div key={i} style={{
                    position: 'absolute', left: c.left, top: -8,
                    width: c.size, height: c.size,
                    borderRadius: c.shape === 'circle' ? 999 : 2,
                    background: c.color,
                    animation: 'confettiFall 2.2s ' + c.delay + ' both',
                    zIndex: 5,
                  }} />
                );
              })}
            </div>
          )}

          {/* Success circle */}
          <div style={{ position: 'relative', width: 80, height: 80, marginTop: 12, marginBottom: 16, animation: revealed ? 'popIn .5s both' : 'none', zIndex: 2 }}>
            <div style={{ position: 'absolute', inset: -8, borderRadius: 999, background: 'radial-gradient(circle, rgba(31,169,113,.15) 0%, transparent 70%)', animation: 'successGlow 2s ease-in-out infinite' }} />
            <div style={{ width: 80, height: 80, borderRadius: 999, background: 'linear-gradient(135deg,' + G + ',#0EA876)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 30px -10px rgba(31,169,113,.55)' }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M5 13l5 5L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 24, strokeDashoffset: 0, animation: 'drawCheck .5s .3s both' }} /></svg>
            </div>
          </div>

          <div style={{ fontWeight: 800, fontSize: 24, color: ink, ...sora, textAlign: 'center', lineHeight: 1.1, marginBottom: 8, animation: 'fadeUp .4s .2s both' }}>
            You have earned this! 🎉
          </div>
          <div style={{ fontSize: 13, color: muted, textAlign: 'center', lineHeight: 1.5, maxWidth: 290, animation: 'fadeUp .4s .3s both' }}>
            Bureau confirmed your payment. Your Melt Tranche 2 is now unlocked.
          </div>

          {/* Chips */}
          <div style={{ display: 'flex', gap: 8, marginTop: 14, animation: 'fadeUp .4s .4s both' }}>
            {['Bureau confirmed', 'Cards cleared'].map(function(lbl, i) {
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'var(--green-l)', border: '1px solid #A7E4C5', borderRadius: 999, padding: '5px 12px' }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 13l5 5L19 7" stroke={G} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: G }}>{lbl}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tranche breakdown */}
        <div style={{ borderRadius: 18, border: '1.5px solid var(--line)', overflow: 'hidden', marginBottom: 14, animation: 'fadeUp .4s .5s both' }}>
          <div style={{ padding: '13px 16px', background: '#F4F3FB', borderBottom: '1px solid var(--line)' }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: muted, letterSpacing: 0.4 }}>TRANCHE SUMMARY</div>
          </div>
          {ROWS.map(function(r, i) {
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: r.bg, borderBottom: i < ROWS.length - 1 ? '1px solid var(--line)' : 'none', transition: 'background .2s' }}>
                <span style={{ fontSize: 13, fontWeight: r.highlight ? 700 : 500, color: r.highlight ? G : muted }}>{r.label}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: r.color, ...sora }}>{r.value}</span>
              </div>
            );
          })}
        </div>

        {/* Info note */}
        <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start', background: '#F4F3FB', border: '1px solid var(--line)', borderRadius: 12, padding: '11px 13px', marginBottom: 6 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="9" stroke="var(--muted)" strokeWidth="1.8" /><path d="M12 11v5M12 7.5h.01" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" /></svg>
          <span style={{ fontSize: 12, color: '#4B4960', lineHeight: 1.5 }}>
            Your current Melt loan will close and a new loan account will be created once your new amount is approved. The outstanding balance of <strong style={{ color: ink }}>₹1,28,400</strong> is rolled into the new loan.
          </span>
        </div>
      </div>

      {/* CTA */}
      <BottomBar>
        <button onClick={function(){ go('newloan'); }} style={{
          width: '100%', height: 52, borderRadius: 15, border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg,' + G + ',#0EA876)',
          color: '#fff', fontWeight: 700, fontSize: 15, ...sora,
          boxShadow: '0 10px 24px -8px rgba(31,169,113,.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          transition: 'transform .1s',
        }}
          onMouseDown={function(e){ e.currentTarget.style.transform='scale(.975)'; }}
          onMouseUp={function(e){ e.currentTarget.style.transform='scale(1)'; }}
          onMouseLeave={function(e){ e.currentTarget.style.transform='scale(1)'; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          See my offer
        </button>
      </BottomBar>
    </div>
  );
}

window.RewardScreen = RewardScreen;
