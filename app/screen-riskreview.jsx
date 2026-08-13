// screen-riskreview.jsx — Final Risk Review ("Final checks in progress")
// Sits between bank selection and the journey screen. While underwriting runs,
// it sets the expectation for the whole Part 1 → Part 2 loop: money lands in
// the chosen account, card bills get paid from that same account, then the
// customer comes back to confirm dates and amounts.

function RiskReviewScreen({ go, salaryAcc }) {
  var sora  = { fontFamily: "'Sora', -apple-system, system-ui, sans-serif" };
  var ink   = '#1E293B';
  var ink2  = '#334155';
  var muted = '#94A3B8';
  var P     = '#5B5BD6';
  var LINE  = '#E9E7F4';

  var acc = salaryAcc || { short: 'HDFC', name: 'HDFC Bank', last4: '4321' };
  var accLabel = (acc.short || acc.name) + ' XX' + acc.last4;

  var DETAILS = [
    { k: 'Loan Amount',          v: '₹2,25,000' },
    { k: 'Tenure',               v: '18 Months' },
    { k: 'EMI',                  v: '₹14,464' },
    { k: 'Interest Rate',        v: '19% p.a.' },
    { k: 'Net Disbursed Amount', v: '₹2,08,857.98', note: true },
  ];

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#F7F7FB', animation: 'fadeIn .3s' }}>
      <EquallHead onHome={function () { go('home'); }} />

      <div className="scr" style={{ flex: 1, overflowY: 'auto', padding: '2px 18px 8px' }}>

        {/* ── running indicator ── */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 6, marginBottom: 16 }}>
          <div style={{ width: 76, height: 76, borderRadius: 999, background: '#DCF3E4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1.6s linear infinite' }}>
              <path d="M20 12a8 8 0 10-2.6 5.9" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
              <path d="M20 6v5h-5" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div style={{ fontSize: 22, fontWeight: 800, color: ink, letterSpacing: -0.5, textAlign: 'center', marginBottom: 8, ...sora }}>
          Final Checks in Progress
        </div>
        <div style={{ fontSize: 13, color: muted, lineHeight: 1.5, textAlign: 'center', marginBottom: 22 }}>
          Evaluating risk and prepping your loan for disbursement.
        </div>

        <div style={{ fontSize: 15, fontWeight: 800, color: ink, marginBottom: 10, ...sora }}>Your Loan details</div>

        <div style={{
          background: '#fff', borderRadius: 18, padding: '6px 18px 18px', marginBottom: 8,
          border: '1px solid ' + LINE, boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 8px 20px -12px rgba(40,30,80,.14)',
        }}>
          {DETAILS.map(function (d, i) {
            return (
              <div key={d.k} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                padding: '13px 0', borderBottom: i === DETAILS.length - 1 ? 'none' : '1px solid #F1EFF9',
              }}>
                <span style={{ fontSize: 13.5, color: ink2, display: 'flex', alignItems: 'center', gap: 4 }}>
                  {d.k}
                  {d.note && <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke={muted} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </span>
                <span style={{ fontSize: 15, fontWeight: 800, color: ink, letterSpacing: -0.3, ...sora }}>{d.v}</span>
              </div>
            );
          })}

          <div style={{ height: 1, background: LINE, margin: '6px 0 16px' }} />

          <div style={{ fontSize: 14, fontWeight: 800, color: ink, marginBottom: 14, ...sora }}>Once your application is approved:</div>

          {[
            <span>Money will be credited to <b style={{ color: ink }}>{accLabel}</b></span>,
            <span>Pay your credit card bills <b style={{ color: ink }}>from the same account</b></span>,
            <span>Once you've paid your credit card bills, come back and <b style={{ color: ink }}>confirm the date and amount to get Part 2 unlocked.</b></span>,
          ].map(function (node, i) {
            return (
              <div key={i} style={{ display: 'flex', gap: 11, alignItems: 'flex-start', marginBottom: i === 2 ? 0 : 14 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 999, flexShrink: 0, background: '#EFEDFD',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 800, color: P, ...sora,
                }}>{i + 1}</div>
                <div style={{ fontSize: 13, color: ink2, lineHeight: 1.55 }}>{node}</div>
              </div>
            );
          })}
        </div>

        <div style={{ height: 16 }} />
      </div>

      <BottomBar bg="rgba(255,255,255,.92)">
        <button
          onClick={function () { go('journeycontinues'); }}
          style={{
            width: '100%', height: 54, borderRadius: 16, border: 'none', cursor: 'pointer',
            background: '#3D30B8', color: '#fff', fontWeight: 800, fontSize: 15.5, ...sora, letterSpacing: -0.2,
            boxShadow: '0 12px 26px -10px rgba(61,48,184,.6)', transition: 'transform .12s',
          }}
          onMouseDown={function (e) { e.currentTarget.style.transform = 'scale(.975)'; }}
          onMouseUp={function (e) { e.currentTarget.style.transform = 'scale(1)'; }}
          onMouseLeave={function (e) { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          Check status
        </button>
      </BottomBar>
    </div>
  );
}
window.RiskReviewScreen = RiskReviewScreen;
