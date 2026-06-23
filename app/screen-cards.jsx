// screen-cards.jsx — Card Selection
// Recommendations applied: (1) cards sorted by Balance Due, DESCENDING;
// (2) bank logos shown (toggleable via Tweaks → showLogos).

// Shared card dataset (used by selection, questions, eligibility, pdf).
const CARD_DATA = [
  { bank: 'FEDERAL', last4: '4821', limit: 100000, due: 73000, util: 0.73, date: '3rd Jan', balance: 73000, creditLimit: 100000 },
  { bank: 'ICICI', last4: '7290', limit: 80000, due: 68900, util: 0.86, date: '8th Jan', balance: 68900, creditLimit: 80000 },
  { bank: 'HDFC', last4: '5678', limit: 150000, due: 45500, util: 0.30, date: '12th Jan', balance: 45500, creditLimit: 150000 },
  { bank: 'SBI', last4: '9012', limit: 120000, due: 38000, util: 0.32, date: '21st Jan', balance: 38000, creditLimit: 120000 },
  { bank: 'AXIS', last4: '1190', limit: 200000, due: 12400, util: 0.06, date: '15th Jan', balance: 12400, creditLimit: 200000 },
].sort((a, b) => b.due - a.due); // ← descending by Balance Due

const MAX_CARDS = 4;

function CardSelection({ go, selected, setSelected, showLogos }) {
  const toggle = (bank) => {
    setSelected(prev => {
      if (prev.includes(bank)) return prev.filter(b => b !== bank);
      if (prev.length >= MAX_CARDS) return prev;
      return [...prev, bank];
    });
  };
  const total = CARD_DATA.filter(c => selected.includes(c.bank)).reduce((s, c) => s + c.due, 0);

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', animation: 'fadeIn .35s' }}>
      <Header title="Select your Cards" onBack={() => go('selling')} help />
      <div style={{ padding: '6px 20px 0', flex: 1 }}>
        <div style={{ fontWeight: 800, fontSize: 23 }}>Hey Ayush,</div>
        <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 2 }}>Let's reduce your credit card debt</div>
        <div style={{ fontWeight: 700, fontSize: 15.5, marginTop: 18 }}>Select your credit cards to consolidate</div>

        <div style={{
          display: 'flex', gap: 10, alignItems: 'flex-start', background: 'var(--primary-l)',
          borderRadius: 14, padding: '13px 14px', marginTop: 12,
        }}>
          <div style={{ width: 22, height: 22, borderRadius: 999, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{Icon.check('#fff', 14)}</div>
          <div style={{ fontSize: 12.8, color: 'var(--ink-2)', lineHeight: 1.45 }}>
            Convert your card debt to a lower-interest EMI and save thousands on interest.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '22px 0 12px' }}>
          <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: 1, color: 'var(--muted)' }}>MY CREDIT CARDS</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary)' }}>Up to {MAX_CARDS} cards</span>
        </div>

        {/* sorted descending by balance due */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {CARD_DATA.map(c => {
            const b = BANKS[c.bank];
            const active = selected.includes(c.bank);
            const utilColor = c.util >= 0.8 ? 'var(--red)' : c.util >= 0.5 ? '#E0A93C' : 'var(--primary)';
            const atMax = !active && selected.length >= MAX_CARDS;
            return (
              <button key={c.bank} onClick={() => toggle(c.bank)} disabled={atMax} style={{
                width: '100%', textAlign: 'left', borderRadius: 16, background: '#fff', padding: '14px 15px 13px',
                boxShadow: active ? '0 0 0 2px var(--primary), 0 14px 26px -18px rgba(127,85,223,.5)' : '0 0 0 1px var(--line)',
                opacity: atMax ? 0.5 : 1, transition: 'box-shadow .15s', position: 'relative',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <BankLogo id={c.bank} size={34} show={showLogos} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <span style={{ fontWeight: 700, fontSize: 14, letterSpacing: 0.2 }}>{b.name}</span>
                      {active && <span style={{ background: 'var(--primary)', color: '#fff', fontSize: 9.5, fontWeight: 700, padding: '2px 7px', borderRadius: 999 }}>SELECTED</span>}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>LIMIT: {inr(c.limit)} · •••• {c.last4}</div>
                  </div>
                  <div style={{
                    width: 22, height: 22, borderRadius: 999, flexShrink: 0,
                    background: active ? 'var(--primary)' : '#fff',
                    boxShadow: active ? 'none' : 'inset 0 0 0 2px var(--line)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{active && Icon.check('#fff', 14)}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 12 }}>
                  <div>
                    <div style={{ fontSize: 10.5, color: 'var(--muted)', fontWeight: 600, letterSpacing: 0.5 }}>BALANCE DUE</div>
                    <div style={{ fontWeight: 800, fontSize: 19, marginTop: 1 }}>{inr(c.due)}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 10.5, color: 'var(--muted)', fontWeight: 600, letterSpacing: 0.5 }}>BALANCE ON</div>
                    <div style={{ fontWeight: 700, fontSize: 13.5, marginTop: 3 }}>{c.date}</div>
                  </div>
                </div>
                <div style={{ marginTop: 11 }}>
                  <div style={{ height: 5, borderRadius: 9, background: 'var(--line)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: (c.util * 100) + '%', background: utilColor, borderRadius: 9 }} />
                  </div>
                  <div style={{ fontSize: 10.5, fontWeight: 600, color: utilColor, textAlign: 'right', marginTop: 4 }}>{Math.round(c.util * 100)}% card utilised</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ position: 'sticky', bottom: 0, background: 'rgba(244,243,251,.92)', backdropFilter: 'blur(14px)', borderTop: '1px solid var(--line)', padding: '13px 20px 26px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 11 }}>
          <div>
            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 1, color: 'var(--muted)' }}>SELECTED</div>
            <div style={{ fontWeight: 800, fontSize: 17, whiteSpace: 'nowrap' }}>{selected.length} / {MAX_CARDS} Cards</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 1, color: 'var(--muted)' }}>TOTAL REFINANCE</div>
            <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--primary)' }}>{inr(total)}</div>
          </div>
        </div>
        <Btn onClick={() => selected.length && go('eligibility')} style={{ opacity: selected.length ? 1 : 0.5 }}>Confirm selection</Btn>
        <div style={{ fontSize: 10.5, color: 'var(--muted)', textAlign: 'center', marginTop: 10, lineHeight: 1.4 }}>
          Estimated offer is not final and is subject to credit approval based on verified income.
        </div>
      </div>
    </div>
  );
}

// Reusable in-app header (back + title + optional help)
function Header({ title, onBack, help, step }) {
  return (
    <div style={{ padding: '4px 16px 10px', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onBack} style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 999 }}>{Icon.back()}</button>
        <span style={{ fontWeight: 700, fontSize: 16, whiteSpace: 'nowrap' }}>{title}</span>
        <div style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{help ? Icon.help() : null}</div>
      </div>
      {step && (
        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 1, color: 'var(--muted)', padding: '0 4px' }}>{step}</div>
          <div style={{ height: 3, borderRadius: 9, background: 'var(--line)', marginTop: 6 }}>
            <div style={{ height: '100%', width: step.includes('1') ? '50%' : '100%', background: 'var(--primary)', borderRadius: 9, transition: 'width .3s' }} />
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { CardSelection, Header, CARD_DATA, MAX_CARDS });
