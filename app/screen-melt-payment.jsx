// screen-melt-payment.jsx — Step 2 of Payment Validation
// Purpose of this screen: prove the Part 1 loan (₹2,00,000 already disbursed)
// actually went into settling card bills. The customer logs each card-bill
// payment (date + amount); the bar shows how much of Part 1 is accounted for.
// Header/flow naming is shared with step 1 (screen-melt-bankaccount.jsx).

function MeltPaymentScreen({ go, cardDue, meltSelBank, setMeltPayments, setMeltPayDate, setMeltPayAmount }) {
  var ink   = '#1B192E';
  var ink2  = '#4B4960';
  var muted = '#8A879B';
  var P     = 'var(--primary)';
  var G     = '#1FA971';
  var AMBER = '#B8791F';
  var sora  = { fontFamily: "'Sora',sans-serif" };

  var PART1 = cardDue || 200000;

  var nextId = useRef(2);
  var [rows, setRows] = useState([{ id: 1, date: '', amt: '' }]);

  var todayStr = new Date().toISOString().slice(0, 10);
  var minDate  = new Date(); minDate.setMonth(minDate.getMonth() - 6);
  var minStr   = minDate.toISOString().slice(0, 10);

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

  function patch(id, key, val) {
    setRows(function (rs) {
      return rs.map(function (r) {
        if (r.id !== id) return r;
        var n = { id: r.id, date: r.date, amt: r.amt };
        n[key] = val;
        return n;
      });
    });
  }
  function addRow()      { setRows(function (rs) { return rs.concat([{ id: nextId.current++, date: '', amt: '' }]); }); }
  function removeRow(id) { setRows(function (rs) { return rs.length === 1 ? rs : rs.filter(function (r) { return r.id !== id; }); }); }

  function rowAmt(r)     { return r.amt ? parseInt(r.amt, 10) : 0; }
  function isComplete(r) { return !!r.date && rowAmt(r) > 0; }
  function isPartial(r)  { return (!!r.date || rowAmt(r) > 0) && !isComplete(r); }

  var complete  = rows.filter(isComplete);
  var partial   = rows.filter(isPartial);
  var settled   = complete.reduce(function (s, r) { return s + rowAmt(r); }, 0);
  var pct       = PART1 > 0 ? Math.min(1, settled / PART1) : 0;
  var remaining = Math.max(0, PART1 - settled);
  var excess    = Math.max(0, settled - PART1);
  var allUsed   = settled >= PART1 && PART1 > 0;
  var canSubmit = complete.length > 0 && partial.length === 0;

  function submit() {
    if (!canSubmit) return;
    var payload = complete
      .map(function (r) { return { date: r.date, amount: rowAmt(r) }; })
      .sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    if (setMeltPayments) setMeltPayments(payload);
    if (setMeltPayDate) setMeltPayDate(payload[0].date);       // legacy single-payment props
    if (setMeltPayAmount) setMeltPayAmount(String(settled));
    go('verifying');
  }

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#F9F8FC', animation: 'fadeIn .25s' }}>

      <MeltStepHeader step={2} steps={2} title="Card bill payments" onBack={function () { go('meltbank'); }} />

      <div className="scr" style={{ flex: 1, overflowY: 'auto', padding: '22px 20px 8px' }}>

        {/* ── Title ── */}
        <div style={{ fontSize: 22, fontWeight: 900, color: ink, ...sora, lineHeight: 1.25, letterSpacing: -0.5, marginBottom: 6, animation: 'fadeUp .35s both' }}>
          Validate your Card<br />bill payments
        </div>
        <div style={{ fontSize: 12.5, color: muted, lineHeight: 1.55, marginBottom: 18, animation: 'fadeUp .35s .05s both' }}>
          Add every payment you made to clear your card bills.
        </div>

        {/* ── Part 1 usage ── */}
        <div style={{
          background: '#fff', borderRadius: 20, padding: '16px 18px', marginBottom: 18,
          boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 4px 14px rgba(0,0,0,.06)',
          animation: 'fadeUp .35s .08s both',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: muted, letterSpacing: 0.7, textTransform: 'uppercase' }}>Total card bills paid</span>
            <span style={{ fontSize: 11.5, fontWeight: 800, ...sora, color: allUsed ? G : P }}>{Math.round(pct * 100)}%</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 12 }}>
            <span style={{ fontSize: 26, fontWeight: 900, ...sora, letterSpacing: -1, lineHeight: 1, color: settled ? (allUsed ? G : ink) : '#D4D0E8', transition: 'color .25s' }}>{inr(settled)}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: muted }}>of your {inr(PART1)} Part 1 loan</span>
          </div>

          <div style={{ height: 8, background: '#F0EEF8', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{
              width: (pct * 100) + '%', height: '100%', borderRadius: 999,
              background: allUsed ? G : 'linear-gradient(90deg, var(--primary), #4F46E5)',
              transition: 'width .45s cubic-bezier(.3,1,.4,1), background .25s',
            }} />
          </div>

          <div style={{ fontSize: 11.5, fontWeight: 600, color: allUsed ? G : (settled ? ink2 : muted), marginTop: 10 }}>
            {allUsed
              ? 'Your full Part 1 loan is covered' + (excess > 0 ? ' · ' + inr(excess) + ' paid extra' : '')
              : (settled ? inr(remaining) + ' left to add' : 'Add your first payment below')}
          </div>
        </div>

        {/* ── Payments list ── */}
        <div style={{ fontSize: 10, fontWeight: 700, color: muted, letterSpacing: 0.7, textTransform: 'uppercase', marginBottom: 8 }}>
          Payments done to settle your card bills {complete.length > 0 ? '(' + complete.length + ')' : ''}
        </div>

        <div style={{
          background: '#fff', borderRadius: 18, overflow: 'hidden', marginBottom: 14,
          boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.05)',
          animation: 'fadeUp .35s .12s both',
        }}>
          {rows.map(function (r, i) {
            var bad = isPartial(r);
            return (
              <div key={r.id} style={{ borderBottom: '1px solid #F4F2FB', background: bad ? '#FFFBF3' : '#fff', transition: 'background .2s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px' }}>
                  <input
                    type="date"
                    value={r.date}
                    min={minStr}
                    max={todayStr}
                    onChange={function (e) { patch(r.id, 'date', e.target.value); }}
                    style={{
                      flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', padding: 0,
                      fontSize: 13.5, fontWeight: 600, color: r.date ? ink : '#C0BCD6',
                      fontFamily: 'inherit', colorScheme: 'light',
                    }}
                  />
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, flexShrink: 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: r.amt ? ink : '#C0BCD6', ...sora }}>₹</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={fmtInr(r.amt)}
                      placeholder="0"
                      onChange={function (e) { patch(r.id, 'amt', e.target.value.replace(/\D/g, '').slice(0, 9)); }}
                      style={{
                        width: 96, border: 'none', outline: 'none', background: 'transparent', padding: 0,
                        fontSize: 15, fontWeight: 800, color: r.amt ? ink : '#C0BCD6',
                        fontFamily: "'Sora',sans-serif", textAlign: 'right', letterSpacing: -0.3,
                      }}
                    />
                  </div>
                  <button
                    onClick={function () { removeRow(r.id); }}
                    aria-label="Remove payment"
                    disabled={rows.length === 1}
                    style={{
                      width: 24, height: 24, flexShrink: 0, border: 'none', background: 'none', padding: 0,
                      cursor: rows.length === 1 ? 'default' : 'pointer', opacity: rows.length === 1 ? 0.25 : 1,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <line x1="18" y1="6" x2="6" y2="18" stroke={muted} strokeWidth="2.4" strokeLinecap="round" />
                      <line x1="6" y1="6" x2="18" y2="18" stroke={muted} strokeWidth="2.4" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                {bad && (
                  <div style={{ fontSize: 11, fontWeight: 600, color: AMBER, padding: '0 14px 10px' }}>
                    {r.date ? 'Add the amount paid' : 'Add the date of this payment'}
                  </div>
                )}
              </div>
            );
          })}

          <button
            onClick={addRow}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              height: 46, border: 'none', background: '#fff', cursor: 'pointer',
              color: P, fontWeight: 800, fontSize: 13, ...sora,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke={P} strokeWidth="2.4" strokeLinecap="round" /></svg>
            Add payment
          </button>
        </div>

        {/* ── One-line footnote ── */}
        <div style={{ display: 'flex', gap: 7, alignItems: 'flex-start', marginBottom: 4 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
            <circle cx="12" cy="12" r="9" stroke={muted} strokeWidth="1.8" />
            <path d="M12 11v5M12 7.5h.01" stroke={muted} strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 11.5, color: muted, lineHeight: 1.5 }}>
            The above card payments will be validated from bank account{' '}
            <b style={{ color: ink2, fontWeight: 700 }}>
              {meltSelBank ? (meltSelBank.bank ? meltSelBank.name + ' ' : '') + '····' + meltSelBank.last4 : 'you selected'}
            </b>.
          </span>
        </div>

        <div style={{ height: 12 }} />
      </div>

      <BottomBar>
        {partial.length > 0 && (
          <div style={{ fontSize: 11.5, fontWeight: 700, color: AMBER, textAlign: 'center', marginBottom: 10 }}>
            Complete the highlighted payment to continue.
          </div>
        )}
        <button
          onClick={submit}
          style={{
            width: '100%', height: 54, borderRadius: 16, border: 'none',
            cursor: canSubmit ? 'pointer' : 'default',
            background: canSubmit ? 'linear-gradient(135deg, var(--primary), #4F46E5)' : '#ECEAF4',
            color: canSubmit ? '#fff' : muted, fontWeight: 800, fontSize: 15, ...sora,
            boxShadow: canSubmit ? '0 12px 28px -8px rgba(127,85,223,.5)' : 'none',
            transition: 'all .25s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, letterSpacing: -0.2,
          }}
          onMouseDown={function (e) { if (canSubmit) e.currentTarget.style.transform = 'scale(.975)'; }}
          onMouseUp={function (e) { e.currentTarget.style.transform = 'scale(1)'; }}
          onMouseLeave={function (e) { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          Submit for Validation
          {canSubmit && <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 13l5 5L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
        </button>
      </BottomBar>
    </div>
  );
}
window.MeltPaymentScreen = MeltPaymentScreen;
