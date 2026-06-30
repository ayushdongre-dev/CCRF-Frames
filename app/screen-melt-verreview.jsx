// screen-melt-verreview.jsx — Verification Review

function MeltVerReviewScreen({ go, meltSelBank, meltPayDate, meltPayAmount, setMeltState, setPdState }) {
  var ink   = '#1B192E';
  var ink2  = '#4B4960';
  var muted = '#8A879B';
  var G     = '#1FA971';
  var G_L   = 'var(--green-l)';
  var G_BDR = '#A7E4C5';
  var sora  = { fontFamily: "'Sora',sans-serif" };

  function handleApprove() {
    if (setPdState) setPdState('unlocked');
    go('reward');
  }

  function handleReject() {
    if (setMeltState) setMeltState('retry_exhausted');
    go('meltstatus');
  }

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#F9F8FC', animation: 'fadeIn .25s' }}>

      {/* ── Header ── */}
      <div style={{ background: '#fff', padding: '12px 16px 14px', flexShrink: 0, borderBottom: '1px solid #F0EEF8' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36 }} />
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: muted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 2 }}>Verification</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: ink, ...sora, lineHeight: 1 }}>Review Details</div>
          </div>
          <div style={{ width: 36 }} />
        </div>
      </div>

      <div className="scr" style={{ flex: 1, overflowY: 'auto', padding: '32px 20px 8px' }}>

        {/* ── Approve button ── */}
        <button
          onClick={handleApprove}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 14,
            padding: '18px 20px', borderRadius: 18, marginBottom: 12,
            border: '2px solid ' + G_BDR, background: G_L,
            cursor: 'pointer', textAlign: 'left',
            boxShadow: '0 4px 18px -6px rgba(31,169,113,.18)', transition: 'transform .12s',
            animation: 'fadeUp .35s both',
          }}
          onMouseDown={function(e){ e.currentTarget.style.transform='scale(.985)'; }}
          onMouseUp={function(e){ e.currentTarget.style.transform='scale(1)'; }}
          onMouseLeave={function(e){ e.currentTarget.style.transform='scale(1)'; }}
        >
          <div style={{ width: 50, height: 50, borderRadius: 15, background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 16px -4px rgba(31,169,113,.5)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l5 5L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: G, ...sora, marginBottom: 3 }}>Approve</div>
            <div style={{ fontSize: 12.5, color: ink2 }}>Unlock Round 2 &amp; disburse ₹3,00,000</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* ── Reject button ── */}
        <button
          onClick={handleReject}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 14,
            padding: '18px 20px', borderRadius: 18,
            border: '2px solid #FCA5A5', background: '#FFF5F5',
            cursor: 'pointer', textAlign: 'left',
            boxShadow: '0 2px 12px rgba(0,0,0,.05)', transition: 'transform .12s',
            animation: 'fadeUp .35s .08s both',
          }}
          onMouseDown={function(e){ e.currentTarget.style.transform='scale(.985)'; }}
          onMouseUp={function(e){ e.currentTarget.style.transform='scale(1)'; }}
          onMouseLeave={function(e){ e.currentTarget.style.transform='scale(1)'; }}
        >
          <div style={{ width: 50, height: 50, borderRadius: 15, background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <line x1="18" y1="6" x2="6" y2="18" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round"/>
              <line x1="6" y1="6" x2="18" y2="18" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#EF4444', ...sora, marginBottom: 3 }}>Reject</div>
            <div style={{ fontSize: 12.5, color: ink2 }}>Move to verification queue</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

      </div>
    </div>
  );
}
window.MeltVerReviewScreen = MeltVerReviewScreen;
