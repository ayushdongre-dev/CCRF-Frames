// screen-pdf.jsx — PDF Upload (Design 1: latest statement per card)
function PdfUpload({ go, selected, showLogos }) {
  const cards = CARD_DATA.filter(c => selected.includes(c.bank));
  const [uploaded, setUploaded] = useState({});
  const doneCount = Object.values(uploaded).filter(Boolean).length;
  const activeIdx = cards.findIndex(c => !uploaded[c.bank]);

  const upload = (bank) => {
    setUploaded(u => ({ ...u, [bank]: `${BANKS[bank].short}_stmt_Dec.pdf` }));
  };

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', animation: 'fadeIn .35s' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 16px 6px' }}>
        <button onClick={() => go('eligibility')} style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icon.back()}</button>
        <button style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', letterSpacing: 0.5, paddingRight: 6 }}>HELP</button>
      </div>

      <div style={{ padding: '6px 22px 0', flex: 1 }}>
        <div style={{ fontWeight: 800, fontSize: 27, lineHeight: 1.15, letterSpacing: -0.4 }}>We need your credit card statements</div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: '#EEF3FE', borderRadius: 13, padding: '12px 13px', marginTop: 16 }}>
          <div style={{ flexShrink: 0, marginTop: 1 }}>{Icon.help('#3B6FE0')}</div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.45 }}>
            Please upload the latest PDF statement of 2 months for each listed card to verify your actual card debt.
          </div>
        </div>

        {/* timeline */}
        <div style={{ marginTop: 22, position: 'relative' }}>
          {cards.map((c, i) => {
            const b = BANKS[c.bank];
            const isUp = !!uploaded[c.bank];
            const isActive = i === activeIdx;
            const last = i === cards.length - 1;
            return (
              <div key={c.bank} style={{ display: 'flex', gap: 14, position: 'relative', paddingBottom: last ? 0 : 18 }}>
                {!last && <div style={{ position: 'absolute', left: 12, top: 26, bottom: 2, width: 2, background: isUp ? 'var(--primary)' : 'var(--line)' }} />}
                {/* status node */}
                <div style={{
                  width: 26, height: 26, borderRadius: 999, flexShrink: 0, zIndex: 1, marginTop: 2,
                  background: isUp ? 'var(--primary)' : '#fff',
                  boxShadow: isUp ? 'none' : isActive ? 'inset 0 0 0 2px var(--primary)' : 'inset 0 0 0 2px var(--line)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {isUp ? Icon.check('#fff', 16) : <span style={{ width: 8, height: 8, borderRadius: 999, background: isActive ? 'var(--primary)' : 'var(--line)' }} />}
                </div>

                <div style={{ flex: 1 }}>
                  {isActive && !isUp && (
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary)', marginBottom: 7 }}>Please upload statement for {b.short} Bank</div>
                  )}
                  <div style={{
                    background: '#fff', borderRadius: 16, padding: '14px 15px',
                    boxShadow: isActive && !isUp ? '0 0 0 2px var(--primary), 0 14px 26px -18px rgba(127,85,223,.4)' : '0 0 0 1px var(--line)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <BankLogo id={c.bank} size={30} show={showLogos} />
                        <span style={{ fontWeight: 700, fontSize: 15 }}>{b.short} {c.bank === 'SBI' ? 'Card' : 'Bank'}</span>
                      </div>
                      <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>•••• {c.last4}</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 8 }}>
                      Credit Utilised: <b>{inr(c.due)}</b> / {inr(c.limit)}
                    </div>
                    {isUp ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'var(--green-l)', borderRadius: 12, padding: '11px 13px', marginTop: 12 }}>
                        {Icon.doc('var(--green)')}
                        <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink-2)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{uploaded[c.bank]}</span>
                        <button onClick={() => setUploaded(u => ({ ...u, [c.bank]: false }))} style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--green)' }}>Replace</button>
                      </div>
                    ) : (
                      <button onClick={() => upload(c.bank)} style={{
                        width: '100%', marginTop: 12, height: 44, borderRadius: 12, background: 'var(--primary-l)',
                        color: 'var(--primary)', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      }}>{Icon.upload('var(--primary)')} Choose PDF</button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ position: 'sticky', bottom: 0, background: 'rgba(244,243,251,.92)', backdropFilter: 'blur(14px)', borderTop: '1px solid var(--line)', padding: '13px 22px 26px' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 7 }}>{doneCount} of {cards.length} uploaded</div>
        <div style={{ height: 4, borderRadius: 9, background: 'var(--line)', overflow: 'hidden', marginBottom: 14 }}>
          <div style={{ height: '100%', width: (doneCount / cards.length * 100) + '%', background: 'var(--primary)', borderRadius: 9, transition: 'width .3s' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={() => go('success')} style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-2)', whiteSpace: 'nowrap' }}>I'll provide later</button>
          <Btn variant="dark" onClick={() => go('success')} style={{ flex: 1, opacity: doneCount === cards.length ? 1 : 0.92 }}>Continue</Btn>
        </div>
      </div>
    </div>
  );
}

// Completion screen — closes the loop after the in-scope flow.
function Success({ go }) {
  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 30px', background: 'linear-gradient(180deg,#EFEEFE,#E6E2FA)', textAlign: 'center', animation: 'fadeIn .4s' }}>
      <div style={{ width: 76, height: 76, borderRadius: 999, background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'popIn .5s', boxShadow: '0 18px 36px -12px rgba(31,169,113,.6)' }}>{Icon.check('#fff', 42)}</div>
      <div style={{ fontWeight: 800, fontSize: 25, marginTop: 22 }}>Application submitted</div>
      <div style={{ fontSize: 14.5, color: 'var(--ink-2)', marginTop: 8, lineHeight: 1.5 }}>
        We're verifying your statements. You'll get your final CCRF offer shortly — then we settle your cards directly.
      </div>
      <div style={{ marginTop: 30, width: '100%' }}>
        <Btn onClick={() => go('multioffer')}>Back to start</Btn>
      </div>
    </div>
  );
}

Object.assign(window, { PdfUpload, Success });
