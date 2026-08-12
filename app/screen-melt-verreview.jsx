// screen-melt-verreview.jsx — Verification Review

function MeltVerReviewScreen({ go, meltSelBank, meltPayDate, meltPayAmount, meltPayments, cardDue, setMeltState }) {
  var ink   = '#1B192E';
  var ink2  = '#4B4960';
  var muted = '#8A879B';
  var G     = '#1FA971';
  var G_L   = 'var(--green-l)';
  var G_BDR = '#A7E4C5';
  var sora  = { fontFamily: "'Sora',sans-serif" };

  function handleApprove() {
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
            <div style={{ fontSize: 16, fontWeight: 800, color: ink, ...sora, lineHeight: 1 }}>Payment Validation</div>
          </div>
          <div style={{ width: 36 }} />
        </div>
      </div>

      <div className="scr" style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 8px' }}>

        {/* ── What the customer submitted ── */}
        {(function () {
          var DUE  = cardDue || 200000;
          var list = (meltPayments && meltPayments.length)
            ? meltPayments
            : (meltPayDate && meltPayAmount ? [{ date: meltPayDate, amount: parseInt(meltPayAmount, 10) }] : []);
          var total = list.reduce(function (s, p) { return s + (p.amount || 0); }, 0);
          var pct   = DUE > 0 ? Math.min(1, total / DUE) : 0;
          var full  = total >= DUE;
          if (!list.length) return null;

          function prettyDate(d) {
            if (!d) return '';
            var p = d.split('-');
            var M = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            return parseInt(p[2], 10) + ' ' + M[parseInt(p[1], 10) - 1] + ' ' + p[0];
          }

          return (
            <div style={{
              background: '#fff', borderRadius: 18, padding: '16px 18px', marginBottom: 16,
              boxShadow: '0 1px 3px rgba(0,0,0,.05), 0 4px 14px rgba(0,0,0,.06)',
              animation: 'fadeUp .3s both',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: muted, letterSpacing: 0.7, textTransform: 'uppercase' }}>Card bill payments</span>
                {meltSelBank && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: ink2 }}>
                    <BankLogo id={meltSelBank.bank} size={18} show={!!meltSelBank.bank} />
                    {meltSelBank.name} ···· {meltSelBank.last4}
                  </span>
                )}
              </div>

              {list.map(function (p, i) {
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '7px 0', borderBottom: i === list.length - 1 ? 'none' : '1px solid #F4F2FB' }}>
                    <span style={{ fontSize: 12.5, color: ink2 }}>{prettyDate(p.date)}</span>
                    <span style={{ fontSize: 13.5, fontWeight: 800, color: ink, ...sora }}>{inr(p.amount)}</span>
                  </div>
                );
              })}

              <div style={{ height: 6, background: '#F0EEF8', borderRadius: 999, overflow: 'hidden', margin: '14px 0 8px' }}>
                <div style={{ width: (pct * 100) + '%', height: '100%', borderRadius: 999, background: full ? G : 'var(--primary)' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: full ? G : 'var(--primary)' }}>{inr(total)} of Part 1 ({inr(DUE)})</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: muted }}>{Math.round(pct * 100)}% validated</span>
              </div>
            </div>
          );
        })()}

        {/* ── Approve button ── */}
        <button
          onClick={handleApprove}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 14,
            padding: '18px 20px', borderRadius: 18, marginBottom: 12,
            border: '2px solid ' + G_BDR, background: G_L,
            cursor: 'pointer', textAlign: 'left',
            boxShadow: '0 1px 4px rgba(31,169,113,.12), 0 4px 14px rgba(31,169,113,.09)', transition: 'transform .12s',
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
            <div style={{ fontSize: 12.5, color: ink2 }}>Unlock Part 2 &amp; disburse ₹3,00,000</div>
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
            boxShadow: '0 1px 4px rgba(239,68,68,.10), 0 4px 14px rgba(0,0,0,.06)', transition: 'transform .12s',
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
