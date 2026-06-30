// screen-melt-bankaccount.jsx — Melt: Bank Account Selection

function MeltBankAccountScreen({ go, setMeltSelBank }) {
  var ink   = '#1B192E';
  var muted = '#8A879B';
  var P     = 'var(--primary)';
  var P_L   = 'var(--primary-l)';
  var P_BDR = '#C7C4F2';
  var LINE  = 'var(--line)';
  var G     = '#1FA971';
  var G_L   = 'var(--green-l)';
  var G_BDR = '#A7E4C5';
  var sora  = { fontFamily: "'Sora',sans-serif" };

  var ACCOUNTS = [
    { id: 'fed1',   bank: 'FEDERAL', name: 'Federal Bank', last4: '4521', type: 'Savings' },
    { id: 'hdfc1',  bank: 'HDFC',    name: 'HDFC Bank',    last4: '8834', type: 'Savings' },
    { id: 'icici1', bank: 'ICICI',   name: 'ICICI Bank',   last4: '2290', type: 'Current' },
  ];

  var [selAcc,       setSelAcc]       = useState(null);
  var [useOther,     setUseOther]     = useState(false);
  var [fileSelected, setFileSelected] = useState(false);
  var [fileName,     setFileName]     = useState(null);
  var [password,     setPassword]     = useState('');
  var [showPass,     setShowPass]     = useState(false);
  var [dragOver,     setDragOver]     = useState(false);

  var canContinue = (selAcc && !useOther) || (useOther && fileSelected);

  function handleFile(file) {
    if (!file) return;
    setFileSelected(true);
    setFileName(file.name);
  }

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#F9F8FC', animation: 'fadeIn .25s' }}>

      {/* ── Header ── */}
      <div style={{ background: '#fff', padding: '12px 16px', flexShrink: 0, borderBottom: '1px solid #F0EEF8' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <button
            onClick={function () { go('postdisbursal'); }}
            style={{ width: 36, height: 36, borderRadius: 12, border: '1.5px solid #ECEAF4', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke={ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: muted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 2 }}>Step 1 of 2</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: ink, ...sora, lineHeight: 1 }}>Bank Account</div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <div style={{ width: 20, height: 4, borderRadius: 999, background: P }} />
            <div style={{ width: 20, height: 4, borderRadius: 999, background: LINE }} />
          </div>
        </div>
        {/* progress bar */}
        <div style={{ height: 3, background: '#F0EEF8', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ width: '50%', height: '100%', background: P, borderRadius: 999 }} />
        </div>
      </div>

      <div className="scr" style={{ flex: 1, overflowY: 'auto', padding: '26px 20px 8px' }}>

        {/* ── Title ── */}
        <div style={{ animation: 'fadeUp .35s both' }}>
          <div style={{ fontSize: 23, fontWeight: 900, color: ink, ...sora, lineHeight: 1.2, letterSpacing: -0.5, marginBottom: 6 }}>
            Which account did<br />you repay from?
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 500, color: muted, lineHeight: 1.6, marginBottom: 26 }}>
            Select the account used to settle your card dues.
          </div>
        </div>

        {/* ── Grouped account list ── */}
        <div style={{
          background: '#fff', borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 2px 16px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
          marginBottom: 14,
          animation: 'fadeUp .35s .08s both',
        }}>
          {ACCOUNTS.map(function (acc, i) {
            var isSel  = selAcc === acc.id && !useOther;
            var isLast = i === ACCOUNTS.length - 1;
            return (
              <button
                key={acc.id}
                onClick={function () { setSelAcc(acc.id); setUseOther(false); }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 13,
                  padding: '14px 16px',
                  background: isSel ? '#F5F3FE' : '#fff',
                  borderLeft: '3px solid ' + (isSel ? 'var(--primary)' : 'transparent'),
                  borderBottom: isLast ? 'none' : '1px solid #F4F2FB',
                  cursor: 'pointer', transition: 'background .12s, border-color .12s',
                  textAlign: 'left',
                }}
              >
                <BankLogo id={acc.bank} size={44} show={true} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: isSel ? 'var(--primary)' : ink, ...sora, transition: 'color .12s', lineHeight: 1.2 }}>{acc.name}</div>
                  <div style={{ fontSize: 11.5, fontWeight: 500, color: muted, marginTop: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ background: isSel ? P_L : '#F4F2FB', color: isSel ? 'var(--primary)' : muted, fontSize: 10, fontWeight: 700, padding: '1px 7px', borderRadius: 5, transition: 'all .12s' }}>{acc.type}</span>
                    <span>···· {acc.last4}</span>
                  </div>
                </div>
                {/* Radio */}
                <div style={{
                  width: 22, height: 22, borderRadius: 999, flexShrink: 0,
                  border: '2px solid ' + (isSel ? 'var(--primary)' : '#D8D5EC'),
                  background: isSel ? 'var(--primary)' : '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all .15s',
                  boxShadow: isSel ? '0 2px 8px rgba(127,85,223,.3)' : 'none',
                }}>
                  {isSel && <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 13l5 5L19 7" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Other account ── */}
        <div style={{ animation: 'fadeUp .35s .14s both', marginBottom: 20 }}>
          <button
            onClick={function () { setUseOther(true); setSelAcc(null); }}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 13,
              padding: '13px 16px',
              borderRadius: useOther ? '16px 16px 0 0' : 16,
              border: '1.5px solid ' + (useOther ? 'var(--primary)' : '#E8E4F4'),
              borderBottom: useOther ? '1px solid rgba(127,85,223,0.1)' : '1.5px solid #E8E4F4',
              background: useOther ? '#F5F3FE' : '#fff',
              cursor: 'pointer', transition: 'all .15s', textAlign: 'left',
              boxShadow: useOther ? '0 4px 16px -4px rgba(127,85,223,.15)' : 'none',
            }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: 14, flexShrink: 0,
              background: useOther ? 'var(--primary)' : '#F0EEF9',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all .2s',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="8" width="18" height="12" rx="3" stroke={useOther ? '#fff' : '#9A95B5'} strokeWidth="1.8" />
                <path d="M3 12h18" stroke={useOther ? '#fff' : '#9A95B5'} strokeWidth="1.8" />
                <path d="M7 16h4" stroke={useOther ? '#fff' : '#9A95B5'} strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: useOther ? 'var(--primary)' : ink, ...sora, transition: 'color .15s' }}>Different account</div>
              <div style={{ fontSize: 11.5, fontWeight: 500, color: muted, marginTop: 2 }}>Upload statement to verify</div>
            </div>
            <div style={{
              width: 22, height: 22, borderRadius: 999, flexShrink: 0,
              border: '2px solid ' + (useOther ? 'var(--primary)' : '#D8D5EC'),
              background: useOther ? 'var(--primary)' : '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all .15s',
              boxShadow: useOther ? '0 2px 8px rgba(127,85,223,.3)' : 'none',
            }}>
              {useOther && <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 13l5 5L19 7" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </div>
          </button>

          {useOther && (
            <div style={{
              background: '#FAFAFA', borderRadius: '0 0 16px 16px',
              border: '1.5px solid var(--primary)', borderTop: 'none',
              padding: '18px 16px',
              animation: 'slideDown .28s both',
            }}>
              {/* PDF upload zone */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: '#6B6880', letterSpacing: 0.3, marginBottom: 8, textTransform: 'uppercase' }}>Bank Statement (PDF)</div>
                <div
                  onClick={function () { document.getElementById('melt-stmt-upload').click(); }}
                  onDragOver={function (e) { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={function () { setDragOver(false); }}
                  onDrop={function (e) { e.preventDefault(); setDragOver(false); var f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
                  style={{
                    borderRadius: 14,
                    border: '2px dashed ' + (fileSelected ? G : dragOver ? 'var(--primary)' : '#D8D5EC'),
                    background: fileSelected ? G_L : dragOver ? P_L : '#fff',
                    padding: '14px 14px', cursor: 'pointer', transition: 'all .2s',
                    display: 'flex', alignItems: 'center', gap: 12,
                  }}
                >
                  <input id="melt-stmt-upload" type="file" accept=".pdf" style={{ display: 'none' }}
                    onChange={function (e) { var f = e.target.files && e.target.files[0]; if (f) handleFile(f); }} />
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: fileSelected ? G : P_L, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .2s' }}>
                    {fileSelected
                      ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 13l5 5L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      : <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 15V5m0 0L8 9m4-4l4 4" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 19h14" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" /></svg>
                    }
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: fileSelected ? G : ink, transition: 'color .2s', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {fileSelected ? (fileName || 'Statement uploaded') : 'Tap to upload'}
                    </div>
                    <div style={{ fontSize: 11, color: muted, marginTop: 2 }}>
                      {fileSelected ? 'Tap to replace' : 'Last 3-month statement'}
                    </div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: fileSelected ? G : 'var(--primary)', background: fileSelected ? G_L : P_L, border: '1.5px solid ' + (fileSelected ? G_BDR : P_BDR), borderRadius: 999, padding: '4px 10px', flexShrink: 0, transition: 'all .2s' }}>
                    {fileSelected ? 'Done' : 'Browse'}
                  </span>
                </div>
              </div>

              {/* Password */}
              <div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: '#6B6880', letterSpacing: 0.3, marginBottom: 8, textTransform: 'uppercase' }}>
                  PDF Password <span style={{ fontWeight: 500, color: muted, textTransform: 'none', letterSpacing: 0 }}>(if protected)</span>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={function (e) { setPassword(e.target.value); }}
                    placeholder="Enter password"
                    style={{
                      width: '100%', height: 46, borderRadius: 12,
                      border: '1.5px solid #E0DCF0',
                      background: '#fff', padding: '0 46px 0 14px', boxSizing: 'border-box',
                      fontSize: 14, color: ink, fontFamily: 'inherit',
                      outline: 'none', transition: 'border-color .15s',
                    }}
                    onFocus={function (e) { e.target.style.borderColor = 'var(--primary)'; }}
                    onBlur={function (e) { e.target.style.borderColor = '#E0DCF0'; }}
                  />
                  <button
                    onClick={function () { setShowPass(!showPass); }}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
                  >
                    {showPass
                      ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" stroke={muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" stroke={muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><line x1="1" y1="1" x2="23" y2="23" stroke={muted} strokeWidth="2" strokeLinecap="round" /></svg>
                      : <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke={muted} strokeWidth="2" /></svg>
                    }
                  </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 8 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><rect x="5" y="10" width="14" height="10" rx="2" stroke={muted} strokeWidth="2" /><path d="M8 10V7a4 4 0 018 0v3" stroke={muted} strokeWidth="2" /></svg>
                  <span style={{ fontSize: 11, color: muted }}>Your password is never stored</span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* ── Bottom CTA ── */}
      <BottomBar>
        <button
          onClick={function () {
            if (!canContinue) return;
            if (setMeltSelBank) {
              var acc = ACCOUNTS.find(function(a) { return a.id === selAcc; });
              setMeltSelBank(useOther ? { id: 'other', bank: null, name: 'Other Account', last4: '—', type: 'Savings' } : (acc || null));
            }
            go('meltpayment');
          }}
          style={{
            width: '100%', height: 54, borderRadius: 16, border: 'none',
            cursor: canContinue ? 'pointer' : 'default',
            background: canContinue ? 'linear-gradient(135deg, var(--primary), #4F46E5)' : '#ECEAF4',
            color: canContinue ? '#fff' : muted,
            fontWeight: 800, fontSize: 15, ...sora,
            boxShadow: canContinue ? '0 12px 28px -8px rgba(127,85,223,.5)' : 'none',
            transition: 'all .25s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            letterSpacing: -0.2,
          }}
          onMouseDown={function (e) { if (canContinue) e.currentTarget.style.transform = 'scale(.975)'; }}
          onMouseUp={function (e) { e.currentTarget.style.transform = 'scale(1)'; }}
          onMouseLeave={function (e) { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          Continue
          {canContinue && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          )}
        </button>
      </BottomBar>
    </div>
  );
}

window.MeltBankAccountScreen = MeltBankAccountScreen;
