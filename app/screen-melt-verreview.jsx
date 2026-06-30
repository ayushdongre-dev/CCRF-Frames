// screen-melt-verreview.jsx — Verification Review

function MeltVerReviewScreen({ go, meltSelBank, meltPayDate, meltPayAmount, setMeltState, setPdState }) {
  var ink   = '#1B192E';
  var ink2  = '#4B4960';
  var muted = '#8A879B';
  var G     = '#1FA971';
  var G_L   = 'var(--green-l)';
  var G_BDR = '#A7E4C5';
  var P     = 'var(--primary)';
  var P_L   = 'var(--primary-l)';
  var P_BDR = '#C7C4F2';
  var sora  = { fontFamily: "'Sora',sans-serif" };

  function fmtInr(digits) {
    if (!digits) return '—';
    var s = digits.replace ? digits.replace(/\D/g, '') : String(Math.floor(digits));
    if (!s) return '—';
    if (s.length <= 3) return s;
    var last3 = s.slice(-3);
    var rest  = s.slice(0, -3);
    var out   = [];
    while (rest.length > 2) { out.unshift(rest.slice(-2)); rest = rest.slice(0, -2); }
    if (rest) out.unshift(rest);
    return out.join(',') + ',' + last3;
  }

  function prettyDate(d) {
    if (!d) return '—';
    var p = d.split('-');
    if (p.length < 3) return d;
    var M = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return parseInt(p[2]) + ' ' + M[parseInt(p[1]) - 1] + ' ' + p[0];
  }

  var bankName  = meltSelBank ? meltSelBank.name   : 'Bank Account';
  var bankLast4 = meltSelBank ? meltSelBank.last4  : '—';
  var bankType  = meltSelBank ? meltSelBank.type   : '';
  var bankId    = meltSelBank ? meltSelBank.bank   : null;

  function handleApprove() {
    if (setPdState) setPdState('unlocked');
    go('reward');
  }

  function handleReject() {
    if (setMeltState) setMeltState('retry_exhausted');
    go('meltstatus');
  }

  var ROW_STYLE = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 0',
    borderBottom: '1px solid #F4F2FB',
  };

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

      <div className="scr" style={{ flex: 1, overflowY: 'auto', padding: '24px 20px 8px' }}>

        {/* ── Hero ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 28, animation: 'fadeUp .38s both' }}>
          <div style={{ position: 'relative', marginBottom: 18 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: P_L, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 28px -6px rgba(127,85,223,.22)' }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke={P} strokeWidth="1.9" strokeLinejoin="round"/>
                <path d="M9 12l2 2 4-4" stroke={P} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ position: 'absolute', inset: -5, borderRadius: '50%', border: '1.5px solid rgba(127,85,223,.15)', pointerEvents: 'none' }} />
          </div>
          <div style={{ fontSize: 21, fontWeight: 900, color: ink, ...sora, letterSpacing: -0.5, lineHeight: 1.2, marginBottom: 6 }}>Submission received</div>
          <div style={{ fontSize: 13, color: muted, lineHeight: 1.5, maxWidth: 270 }}>Please verify the details below before we finalise your Round 2.</div>
        </div>

        {/* ── Summary card ── */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '4px 20px 4px', boxShadow: '0 2px 20px rgba(0,0,0,.07)', marginBottom: 20, animation: 'fadeUp .38s .08s both' }}>

          {/* Bank row */}
          <div style={{ ...ROW_STYLE }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {bankId
                ? <BankLogo id={bankId} size={38} show={true} />
                : (
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: P_L, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="8" width="18" height="12" rx="3" stroke={P} strokeWidth="1.8"/>
                      <path d="M3 12h18" stroke={P} strokeWidth="1.8"/>
                      <path d="M7 16h4" stroke={P} strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                  </div>
                )
              }
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: muted, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 2 }}>Bank Account</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: ink, ...sora, lineHeight: 1.1 }}>{bankName}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              {bankType && <div style={{ fontSize: 10, fontWeight: 700, color: muted, letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 3 }}>{bankType}</div>}
              <div style={{ fontSize: 13, fontWeight: 700, color: ink2, letterSpacing: 1 }}>···· {bankLast4}</div>
            </div>
          </div>

          {/* Amount row */}
          <div style={{ ...ROW_STYLE }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: muted, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 3 }}>Amount Repaid</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: P, ...sora, lineHeight: 1, letterSpacing: -0.5 }}>₹{fmtInr(meltPayAmount)}</div>
            </div>
            <div style={{ width: 42, height: 42, borderRadius: 13, background: P_L, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke={P} strokeWidth="1.8"/>
                <path d="M12 8v4M9 11l3 3 3-3" stroke={P} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Date row */}
          <div style={{ ...ROW_STYLE, borderBottom: 'none' }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: muted, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 3 }}>Date of Payment</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: ink, ...sora }}>{prettyDate(meltPayDate)}</div>
            </div>
            <div style={{ width: 42, height: 42, borderRadius: 13, background: '#F0FDF7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="3" stroke={G} strokeWidth="1.8"/>
                <path d="M3 9h18" stroke={G} strokeWidth="1.8"/>
                <path d="M8 2v3M16 2v3" stroke={G} strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* ── Info note ── */}
        <div style={{ display: 'flex', gap: 10, background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 14, padding: '12px 14px', marginBottom: 20, animation: 'fadeUp .38s .15s both' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
            <circle cx="12" cy="12" r="9" stroke="#D97706" strokeWidth="1.8"/>
            <path d="M12 11v5M12 7.5h.01" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: 12, color: '#92400E', lineHeight: 1.55 }}>Once approved, your Round 2 amount will be disbursed to your account within 2 working days.</span>
        </div>

        {/* ── Outcome label ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, animation: 'fadeUp .38s .2s both' }}>
          <div style={{ flex: 1, height: 1, background: '#EAE8F4' }} />
          <span style={{ fontSize: 10.5, fontWeight: 700, color: muted, letterSpacing: 0.5 }}>SELECT OUTCOME</span>
          <div style={{ flex: 1, height: 1, background: '#EAE8F4' }} />
        </div>

        {/* ── Approve button ── */}
        <button
          onClick={handleApprove}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 14,
            padding: '16px 20px', borderRadius: 18, marginBottom: 10,
            border: '2px solid ' + G_BDR, background: G_L,
            cursor: 'pointer', textAlign: 'left',
            boxShadow: '0 4px 18px -6px rgba(31,169,113,.18)', transition: 'transform .12s',
            animation: 'fadeUp .38s .25s both',
          }}
          onMouseDown={function(e){ e.currentTarget.style.transform='scale(.985)'; }}
          onMouseUp={function(e){ e.currentTarget.style.transform='scale(1)'; }}
          onMouseLeave={function(e){ e.currentTarget.style.transform='scale(1)'; }}
        >
          <div style={{ width: 46, height: 46, borderRadius: 14, background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 14px -4px rgba(31,169,113,.5)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l5 5L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: G, ...sora, marginBottom: 2 }}>Approve</div>
            <div style={{ fontSize: 12, color: ink2 }}>Unlock Round 2 &amp; disburse ₹3,00,000</div>
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
            padding: '16px 20px', borderRadius: 18, marginBottom: 24,
            border: '2px solid #FCA5A5', background: '#FFF5F5',
            cursor: 'pointer', textAlign: 'left',
            boxShadow: '0 2px 12px rgba(0,0,0,.05)', transition: 'transform .12s',
            animation: 'fadeUp .38s .3s both',
          }}
          onMouseDown={function(e){ e.currentTarget.style.transform='scale(.985)'; }}
          onMouseUp={function(e){ e.currentTarget.style.transform='scale(1)'; }}
          onMouseLeave={function(e){ e.currentTarget.style.transform='scale(1)'; }}
        >
          <div style={{ width: 46, height: 46, borderRadius: 14, background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <line x1="18" y1="6" x2="6" y2="18" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round"/>
              <line x1="6" y1="6" x2="18" y2="18" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#EF4444', ...sora, marginBottom: 2 }}>Reject</div>
            <div style={{ fontSize: 12, color: ink2 }}>Move to verification queue</div>
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
