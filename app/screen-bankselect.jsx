// screen-bankselect.jsx — Bank Selection (after Final Offer)
// The account picked here is the account the loan lands in AND the account the
// customer must pay their card bills from — that single-account rule is what
// makes the later payment validation possible, so it is stated up front.

var SALARY_BANKS = [
  { id: 'HDFC',   short: 'HDFC',   name: 'HDFC Bank',              mono: 'H', bg: '#004C8F', fg: '#ED232A', last4: '4321' },
  { id: 'ICICI',  short: 'ICICI',  name: 'ICICI Bank',             mono: 'I', bg: '#AE282E', fg: '#F58220', last4: '7702' },
  { id: 'KOTAK',  short: 'Kotak',  name: 'Kotak Mahindra Bank',    mono: 'K', bg: '#003874', fg: '#ED1C24', last4: '5518' },
  { id: 'AXIS',   short: 'Axis',   name: 'Axis Bank',              mono: 'A', bg: '#97144D', fg: '#ED1C24', last4: '2043' },
  { id: 'SBI',    short: 'State',  name: 'State Bank of India',    mono: 'S', bg: '#22409A', fg: '#fff',    last4: '9186' },
  { id: 'BOB',    short: 'BANK',   name: 'Bank of Baroda',         mono: 'B', bg: '#1B3C74', fg: '#F26522', last4: '3390' },
  { id: 'PNB',    short: 'Punjab', name: 'Punjab National Bank',   mono: 'P', bg: '#1B5FAA', fg: '#F7C948', last4: '6624' },
  { id: 'CANARA', short: 'Canara', name: 'Canara Bank',            mono: 'C', bg: '#0E9B8E', fg: '#F7C948', last4: '8071' },
  { id: 'UNION',  short: 'Union',  name: 'Union Bank of India',    mono: 'U', bg: '#C0272D', fg: '#F7C948', last4: '1157' },
];

function BankSelectScreen({ go, salaryAcc, setSalaryAcc }) {
  var sora  = { fontFamily: "'Sora', -apple-system, system-ui, sans-serif" };
  var ink   = '#1E293B';
  var ink2  = '#334155';
  var muted = '#94A3B8';
  var P     = '#5B5BD6';

  var [selId, setSelId] = useState(salaryAcc ? salaryAcc.id : 'HDFC');
  var sel = SALARY_BANKS.filter(function (b) { return b.id === selId; })[0] || null;

  function choose(id) { setSelId(id); }

  function BankMark(props) {
    var b = props.bank, s = props.size || 26;
    return (
      <div style={{
        width: s, height: s, borderRadius: 8, flexShrink: 0, background: b.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <span style={{ fontSize: s * 0.5, fontWeight: 800, color: b.fg, lineHeight: 1, ...sora }}>{b.mono}</span>
        <span style={{ position: 'absolute', right: 2, bottom: 2, width: s * 0.16, height: s * 0.16, borderRadius: 2, background: b.fg, opacity: 0.9 }} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#F7F7FB', animation: 'fadeIn .3s' }}>
      <EquallHead onHome={function () { go('home'); }} />

      <div className="scr" style={{ flex: 1, overflowY: 'auto', padding: '2px 18px 8px' }}>

        <div style={{ fontSize: 21, fontWeight: 800, color: ink, letterSpacing: -0.5, lineHeight: 1.25, marginBottom: 14, ...sora }}>
          Choose your salary bank account
        </div>

        {/* ── the single-account rule ── */}
        <div style={{
          display: 'flex', gap: 12, background: '#EFEDFD', border: '1px solid #DDD8F8',
          borderRadius: 16, padding: '14px 15px', marginBottom: 20,
        }}>
          <div style={{ width: 26, height: 26, borderRadius: 999, background: P, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 15, fontWeight: 900, color: '#fff', lineHeight: 1, ...sora }}>!</span>
          </div>
          <div style={{ fontSize: 13, color: ink2, lineHeight: 1.55 }}>
            Your money comes to the account you choose here. Pay your credit card bills{' '}
            <b style={{ color: ink, background: '#DDD8F8', borderRadius: 4, padding: '1px 4px' }}>from the same account</b>{' '}
            — that's how we confirm your payment.
          </div>
        </div>

        {/* ── popular banks ── */}
        <div style={{ fontSize: 14, fontWeight: 800, color: ink, marginBottom: 10, ...sora }}>Popular Banks</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 9, marginBottom: 22 }}>
          {SALARY_BANKS.map(function (b) {
            var on = b.id === selId;
            return (
              <button key={b.id} onClick={function () { choose(b.id); }} style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '11px 10px',
                borderRadius: 14, cursor: 'pointer', background: '#fff',
                border: '1.5px solid ' + (on ? P : '#E7E5F2'),
                boxShadow: on ? '0 4px 14px -6px rgba(91,91,214,.45)' : '0 1px 2px rgba(0,0,0,.04)',
                transition: 'border-color .15s, box-shadow .15s',
              }}>
                <BankMark bank={b} />
                <span style={{ fontSize: 13, fontWeight: 700, color: on ? P : ink, letterSpacing: -0.2, ...sora, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.short}</span>
              </button>
            );
          })}
        </div>

        {/* ── resolved selection ── */}
        <div style={{ fontSize: 14, fontWeight: 800, color: ink, marginBottom: 10, ...sora }}>Select Bank</div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, background: '#fff',
          border: '1.5px solid ' + (sel ? '#E7E5F2' : '#F0EEF8'), borderRadius: 14, padding: '13px 14px',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="6.5" stroke={muted} strokeWidth="1.9" />
            <path d="M16 16l4.5 4.5" stroke={muted} strokeWidth="1.9" strokeLinecap="round" />
          </svg>
          <span style={{ flex: 1, minWidth: 0, fontSize: 14, fontWeight: sel ? 700 : 500, color: sel ? ink : muted, ...sora, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {sel ? sel.name + ' — XX' + sel.last4 : 'Search for your bank'}
          </span>
          {sel && (
            <button onClick={function () { setSelId(null); }} aria-label="Clear" style={{ width: 22, height: 22, border: 'none', background: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <line x1="18" y1="6" x2="6" y2="18" stroke={muted} strokeWidth="2.4" strokeLinecap="round" />
                <line x1="6" y1="6" x2="18" y2="18" stroke={muted} strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </button>
          )}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <path d="M6 9l6 6 6-6" stroke={muted} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div style={{ height: 20 }} />
      </div>

      <BottomBar bg="rgba(255,255,255,.92)">
        <button
          onClick={function () {
            if (!sel) return;
            if (setSalaryAcc) setSalaryAcc({ id: sel.id, bank: sel.id, name: sel.name, short: sel.short, last4: sel.last4 });
            go('riskreview');
          }}
          style={{
            width: '100%', height: 54, borderRadius: 16, border: 'none',
            cursor: sel ? 'pointer' : 'default',
            background: sel ? '#3D30B8' : '#E7E5F2', color: sel ? '#fff' : muted,
            fontWeight: 800, fontSize: 15.5, ...sora, letterSpacing: -0.2,
            boxShadow: sel ? '0 12px 26px -10px rgba(61,48,184,.6)' : 'none', transition: 'all .2s',
          }}
          onMouseDown={function (e) { if (sel) e.currentTarget.style.transform = 'scale(.975)'; }}
          onMouseUp={function (e) { e.currentTarget.style.transform = 'scale(1)'; }}
          onMouseLeave={function (e) { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          {sel ? 'Continue with ' + sel.short + ' XX' + sel.last4 : 'Select a bank to continue'}
        </button>
      </BottomBar>
    </div>
  );
}
window.BankSelectScreen = BankSelectScreen;
window.SALARY_BANKS = SALARY_BANKS;
