// screen-pdf.jsx — Interest explanation
function PdfUpload({ go, selected, showLogos }) {
  return (
    <div style={{
      minHeight: '100%', background: '#fff', animation: 'fadeIn .25s',
      color: '#2F2E33', display: 'flex', justifyContent: 'center',
    }}>
      <div style={{
        width: 720, height: 541, flexShrink: 0, padding: '0 0 54px',
        transform: 'scale(.5)', transformOrigin: 'top center',
      }}>
        <div style={{
          width: 72, height: 8, borderRadius: 999, background: '#CFCBC3',
          margin: '20px auto 32px',
        }} />

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          margin: '0 36px 34px',
        }}>
          <div style={{ fontSize: 30, lineHeight: 1, fontWeight: 800 }}>Why 54%?</div>
          <button onClick={() => go('visualise')} style={{
            color: '#514ABA', fontSize: 28, fontWeight: 800, lineHeight: 1,
            padding: '2px 0 0 12px',
          }}>Close</button>
        </div>

        <section style={{
          background: '#1C1833', borderRadius: 30, padding: '31px 32px 35px',
          color: '#fff', minHeight: 174, margin: '0 36px',
          display: 'grid', gridTemplateColumns: '1fr 214px', columnGap: 16,
          alignItems: 'center',
        }}>
        <div style={{ minWidth: 0 }}>
          <div style={{
            color: '#B6ADF2', fontSize: 22, fontWeight: 700,
            letterSpacing: 2.1, textTransform: 'uppercase', marginBottom: 10,
          }}>Effective annual cost</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 72, lineHeight: .92, fontWeight: 800 }}>53.1%</span>
            <span style={{ color: '#A9A79E', fontSize: 26, fontWeight: 800 }}>p.a.</span>
          </div>
        </div>
        <div style={{
          textAlign: 'right', color: '#AAA79E', fontSize: 24,
          lineHeight: 1.36, fontWeight: 800, flexShrink: 0,
        }}>
          <div>on ₹1L unpaid</div>
          <div>for a year</div>
          <div style={{ color: '#F6F5F2', marginTop: 4 }}>₹53,100 gone</div>
        </div>
        </section>

        <section style={{
          background: '#F0EEFC', borderRadius: 26, margin: '28px 36px 0',
          padding: '28px 28px 32px',
        }}>
          <CostBlock
            title="Monthly · on ₹1L balance"
            rows={[
              { dot: '#DF6137', label: 'Interest at 3.75%/month', value: '₹3,750' },
              { dot: '#564ABA', label: '+ 18% GST on interest', value: '₹675' },
            ]}
            totalLabel="Monthly cost"
            totalValue="₹4,425"
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '18px 0 26px' }}>
            <div style={{ height: 1, background: '#CEC9C2', flex: 1 }} />
            <div style={{ color: '#AAA79E', fontSize: 22, fontWeight: 700 }}>×12 months</div>
            <div style={{ height: 1, background: '#CEC9C2', flex: 1 }} />
          </div>

          <CostBlock
            title="Annually · on ₹1L balance"
            rows={[
              { dot: '#DF6137', label: 'Interest at 45%/year', value: '₹45,000' },
              { dot: '#564ABA', label: '+ 18% GST on interest', value: '₹8,100' },
            ]}
            totalLabel="Annual cost"
            totalValue="₹53,100"
          />
        </section>

        <section style={{
          margin: '24px 36px 0', background: '#E9F4DF', borderRadius: 23,
          minHeight: 113, padding: '24px 30px', display: 'flex',
          alignItems: 'flex-start', gap: 16, color: '#1F5511',
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: 999, border: '3px solid #387E20',
            flexShrink: 0, display: 'flex', alignItems: 'center',
            justifyContent: 'center', marginTop: 1,
          }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M5.5 12.4l4.1 4.1 9-9" stroke="#387E20" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ fontSize: 27, lineHeight: 1.25, fontWeight: 500 }}>
            <b style={{ fontWeight: 800 }}>Pay full bill by due date</b> — and you pay zero interest, ever.
          </div>
        </section>
      </div>
    </div>
  );
}

function CostBlock({ title, rows, totalLabel, totalValue }) {
  return (
    <div>
      <div style={{
        color: '#8177E3', fontSize: 21, lineHeight: 1.1,
        fontWeight: 800, textTransform: 'uppercase',
        letterSpacing: 1.6, marginBottom: 24,
      }}>{title}</div>

      <div style={{ display: 'grid', gap: 18 }}>
        {rows.map((row) => (
          <div key={row.label} style={{
            display: 'grid', gridTemplateColumns: '20px minmax(0, 1fr) auto',
            alignItems: 'center', columnGap: 13,
          }}>
            <span style={{ width: 16, height: 16, borderRadius: 999, background: row.dot }} />
            <span style={{ color: '#5D5B5A', fontSize: 27, lineHeight: 1.12, fontWeight: 700 }}>{row.label}</span>
            <span style={{ color: '#2F2E33', fontSize: 28, lineHeight: 1, fontWeight: 800 }}>{row.value}</span>
          </div>
        ))}
      </div>

      <div style={{ height: 1, background: '#CEC9C2', margin: '26px 0 20px' }} />

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <span style={{ color: '#2F2E33', fontSize: 27, lineHeight: 1, fontWeight: 800 }}>{totalLabel}</span>
        <span style={{ color: '#5B50C8', fontSize: 35, lineHeight: 1, fontWeight: 800 }}>{totalValue}</span>
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
