// screen-melt-payment.jsx — Payment Details

function MeltPaymentScreen({ go, setMeltPayDate, setMeltPayAmount }) {
  var ink   = '#1B192E';
  var muted = '#8A879B';
  var P     = 'var(--primary)';
  var G     = '#1FA971';
  var sora  = { fontFamily: "'Sora',sans-serif" };

  var [payDate,    setPayDate]    = useState('');
  var [rawAmount,  setRawAmount]  = useState('');
  var [amtFocus,   setAmtFocus]   = useState(false);

  function fmtInr(digits) {
    if (!digits) return '';
    if (digits.length <= 3) return digits;
    var last3 = digits.slice(-3);
    var rest  = digits.slice(0, -3);
    var out   = [];
    while (rest.length > 2) { out.unshift(rest.slice(-2)); rest = rest.slice(0, -2); }
    if (rest) out.unshift(rest);
    return out.join(',') + ',' + last3;
  }

  function handleAmountChange(val) {
    setRawAmount(val.replace(/\D/g, '').slice(0, 9));
  }

  var displayAmount = fmtInr(rawAmount);
  var todayStr = new Date().toISOString().slice(0, 10);
  var minDate  = new Date(); minDate.setMonth(minDate.getMonth() - 6);
  var minStr   = minDate.toISOString().slice(0, 10);
  var canSubmit = payDate && rawAmount && parseInt(rawAmount) > 0;

  function prettyDate(d) {
    if (!d) return '';
    var p = d.split('-');
    var M = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return parseInt(p[2]) + ' ' + M[parseInt(p[1]) - 1] + ' ' + p[0];
  }

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#F9F8FC', animation: 'fadeIn .25s' }}>

      {/* ── Header ── */}
      <div style={{ background: '#fff', padding: '12px 16px', flexShrink: 0, borderBottom: '1px solid #F0EEF8' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <button onClick={function(){ go('meltbank'); }}
            style={{ width: 36, height: 36, borderRadius: 12, border: '1.5px solid #ECEAF4', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke={ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: muted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 2 }}>Step 2 of 2</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: ink, ...sora, lineHeight: 1 }}>Payment Details</div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <div style={{ width: 20, height: 4, borderRadius: 999, background: P }} />
            <div style={{ width: 20, height: 4, borderRadius: 999, background: P }} />
          </div>
        </div>
        <div style={{ height: 3, background: '#F0EEF8', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ width: '100%', height: '100%', background: P, borderRadius: 999 }} />
        </div>
      </div>

      <div className="scr" style={{ flex: 1, overflowY: 'auto', padding: '26px 20px 8px' }}>

        {/* Title */}
        <div style={{ animation: 'fadeUp .35s both' }}>
          <div style={{ fontSize: 23, fontWeight: 900, color: ink, ...sora, lineHeight: 1.2, letterSpacing: -0.5, marginBottom: 6 }}>
            When and how much<br />did you repay?
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 500, color: muted, lineHeight: 1.6, marginBottom: 24 }}>
            We'll match this against your bank statement.
          </div>
        </div>

        {/* ── Date card ── */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,.05), 0 4px 14px rgba(0,0,0,.07)', marginBottom: 12, animation: 'fadeUp .35s .08s both' }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: muted, letterSpacing: 0.7, textTransform: 'uppercase', marginBottom: 14 }}>Date of Payment</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <input
                type="date"
                value={payDate}
                min={minStr}
                max={todayStr}
                onChange={function(e){ setPayDate(e.target.value); }}
                style={{
                  border: 'none', outline: 'none', background: 'transparent',
                  fontSize: 20, fontWeight: 800, color: payDate ? ink : '#C8C4DC',
                  fontFamily: "'Sora',sans-serif", width: '100%', colorScheme: 'light',
                }}
              />
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
                {payDate
                  ? <><svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 13l5 5L19 7" stroke={G} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: G }}>{prettyDate(payDate)}</span></>
                  : <span style={{ fontSize: 11.5, color: muted }}>Within the last 6 months</span>
                }
              </div>
            </div>
            <div style={{ width: 42, height: 42, borderRadius: 13, background: payDate ? '#F0FDF7' : '#F4F2FB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .2s' }}>
              {payDate
                ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 13l5 5L19 7" stroke={G} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                : <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="3" stroke="#9A95B5" strokeWidth="1.8" /><path d="M3 9h18" stroke="#9A95B5" strokeWidth="1.8" /><path d="M8 2v3M16 2v3" stroke="#9A95B5" strokeWidth="1.8" strokeLinecap="round" /></svg>
              }
            </div>
          </div>
        </div>

        {/* ── Amount card — hero input ── */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,.05), 0 4px 14px rgba(0,0,0,.07)', marginBottom: 14, animation: 'fadeUp .35s .14s both' }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: muted, letterSpacing: 0.7, textTransform: 'uppercase', marginBottom: 16 }}>Amount Repaid</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginBottom: 12 }}>
            <span style={{ fontSize: 30, fontWeight: 900, color: rawAmount ? P : '#D4D0E8', ...sora, lineHeight: 1, transition: 'color .2s', flexShrink: 0 }}>₹</span>
            <input
              type="text"
              inputMode="numeric"
              value={displayAmount}
              onChange={function(e){ handleAmountChange(e.target.value); }}
              onFocus={function(){ setAmtFocus(true); }}
              onBlur={function(){ setAmtFocus(false); }}
              placeholder="0"
              style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                fontSize: 40, fontWeight: 900, color: rawAmount ? ink : '#D4D0E8',
                fontFamily: "'Sora',sans-serif", letterSpacing: -2, lineHeight: 1, minWidth: 0,
              }}
            />
          </div>
          <div style={{ height: 2, background: amtFocus ? P : (rawAmount ? 'rgba(127,85,223,.25)' : '#EAE8F4'), borderRadius: 999, transition: 'background .2s', marginBottom: 12 }} />
          {rawAmount && parseInt(rawAmount) > 0
            ? <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 13l5 5L19 7" stroke={G} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span style={{ fontSize: 11.5, fontWeight: 600, color: G }}>₹{displayAmount} will be verified</span>
              </div>
            : <span style={{ fontSize: 11.5, color: muted }}>Total card dues cleared in this repayment</span>
          }
        </div>

        {/* Info note */}
        <div style={{ display: 'flex', gap: 10, background: 'var(--primary-l)', borderRadius: 14, padding: '12px 14px', animation: 'fadeUp .35s .2s both' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
            <circle cx="12" cy="12" r="9" stroke="var(--primary)" strokeWidth="1.8" />
            <path d="M12 11v5M12 7.5h.01" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 12, color: '#5B4CA0', lineHeight: 1.55 }}>Cross-checked with your bank statement for verification.</span>
        </div>

        <div style={{ height: 16 }} />
      </div>

      <BottomBar>
        <button
          onClick={function(){
            if (!canSubmit) return;
            if (setMeltPayDate) setMeltPayDate(payDate);
            if (setMeltPayAmount) setMeltPayAmount(rawAmount);
            go('verifying');
          }}
          style={{
            width: '100%', height: 54, borderRadius: 16, border: 'none',
            cursor: canSubmit ? 'pointer' : 'default',
            background: canSubmit ? 'linear-gradient(135deg, var(--primary), #4F46E5)' : '#ECEAF4',
            color: canSubmit ? '#fff' : muted, fontWeight: 800, fontSize: 15, ...sora,
            boxShadow: canSubmit ? '0 12px 28px -8px rgba(127,85,223,.5)' : 'none',
            transition: 'all .25s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, letterSpacing: -0.2,
          }}
          onMouseDown={function(e){ if (canSubmit) e.currentTarget.style.transform = 'scale(.975)'; }}
          onMouseUp={function(e){ e.currentTarget.style.transform = 'scale(1)'; }}
          onMouseLeave={function(e){ e.currentTarget.style.transform = 'scale(1)'; }}
        >
          Submit for Verification
          {canSubmit && <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 13l5 5L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
        </button>
      </BottomBar>
    </div>
  );
}
window.MeltPaymentScreen = MeltPaymentScreen;
