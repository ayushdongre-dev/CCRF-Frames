// screen-reward.jsx — B2 "You have earned this!" (minimal premium)

function RewardScreen({ go }) {
  var G    = '#1FA971';
  var ink  = '#1B192E';
  var ink2 = '#4B4960';
  var muted = '#8A879B';
  var sora = { fontFamily: "'Sora',sans-serif" };
  var rst  = useState(false); var revealed = rst[0]; var setRevealed = rst[1];

  useEffect(function() {
    var t = setTimeout(function() { setRevealed(true); }, 150);
    return function() { clearTimeout(t); };
  }, []);

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff', animation: 'fadeIn .25s' }}>
      <EquallHead onHome={function(){ go('home'); }} />

      <div className="scr" style={{ flex: 1, overflowY: 'auto', padding: '0 22px 8px', display: 'flex', flexDirection: 'column' }}>

        {/* ── Hero ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8, paddingBottom: 32 }}>
          {/* Success ring + check */}
          <div style={{ position: 'relative', width: 90, height: 90, marginBottom: 22, animation: revealed ? 'popIn .45s both' : 'none' }}>
            <div style={{ position: 'absolute', inset: -10, borderRadius: 999, background: 'radial-gradient(circle,rgba(31,169,113,.12) 0%,transparent 70%)', animation: 'successGlow 2.2s ease-in-out infinite' }} />
            <div style={{ width: 90, height: 90, borderRadius: 999, background: 'linear-gradient(135deg,' + G + ',#0EA876)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 14px 36px -12px rgba(31,169,113,.55)' }}>
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l5 5L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ strokeDasharray: 24, strokeDashoffset: 0, animation: 'drawCheck .5s .3s both' }} />
              </svg>
            </div>
          </div>

          <div style={{ fontWeight: 800, fontSize: 26, color: ink, ...sora, textAlign: 'center', lineHeight: 1.1, marginBottom: 10, animation: 'fadeUp .4s .2s both' }}>
            You have earned this!
          </div>
          <div style={{ fontSize: 14, color: muted, textAlign: 'center', lineHeight: 1.55, maxWidth: 260, animation: 'fadeUp .4s .3s both' }}>
            Your payment is verified. Round 2 is now unlocked.
          </div>
        </div>

        {/* ── Minimal 3-row summary ── */}
        <div style={{ borderRadius: 20, overflow: 'hidden', border: '1.5px solid #ECEAF4', animation: 'fadeUp .4s .45s both' }}>
          {/* Row 1 — Round 1 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '1px solid #F0EEF7' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: muted, letterSpacing: 0.4, marginBottom: 3 }}>ROUND 1</div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: ink2 }}>Already disbursed</div>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#94A3B8', ...sora }}>₹2,50,000</div>
          </div>

          {/* Row 2 — Round 2 unlocked (highlighted) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '1px solid #F0EEF7', background: '#E7F7EF' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: G, letterSpacing: 0.4 }}>ROUND 2</div>
                <div style={{ background: G, borderRadius: 999, padding: '1px 7px' }}>
                  <span style={{ fontSize: 8.5, fontWeight: 900, color: '#fff', letterSpacing: 0.5 }}>NEW</span>
                </div>
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: G }}>Unlocked for you</div>
            </div>
            <div style={{ fontSize: 20, fontWeight: 900, color: G, ...sora }}>+ ₹2,50,000</div>
          </div>

          {/* Row 3 — Total */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 20px', background: '#F4F3FB' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: ink, ...sora }}>Total Melt Limit</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: ink, ...sora }}>₹5,00,000</div>
          </div>
        </div>
      </div>

      {/* ── Sticky CTA ── */}
      <BottomBar>
        <button
          onClick={function(){ go('newloan'); }}
          style={{
            width: '100%', height: 52, borderRadius: 15, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg,' + G + ',#0EA876)',
            color: '#fff', fontWeight: 800, fontSize: 15.5, ...sora,
            boxShadow: '0 10px 26px -8px rgba(31,169,113,.5)',
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
