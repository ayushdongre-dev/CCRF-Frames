// screen-revised.jsx — Your Final Offer (Equall / LTCV Credit)
// Appears after banking verification + hard offer. Confirmatory gradient hero,
// EMI-plan radio list, savings callout, customize-tenure, Continue.
const REV = {
  bg: '#FFFFFF', ink: '#1E293B', ink2: '#334155', muted: '#64748B', muted2: '#94A3B8',
  purple: '#5B5BD6', purpleL: '#EDE9FE', purpleBorder: '#C7C4F2',
  amber: '#D97706', navy: '#1E3A5F', line: '#E2E8F0',
  green: '#059669', greenBg: '#D1FAE5', greenBorder: '#6EE7B7',
};

function RevisedOffer({ go }) {
  const sora = { fontFamily: "'Sora', -apple-system, system-ui, sans-serif" };
  const [plan, setPlan] = useState(0);
  const PLANS = [
    { months: 15, emi: 6325, rec: true },
    { months: 10, emi: 9120 },
    { months: 6, emi: 14710 },
  ];

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: REV.bg, animation: 'fadeIn .3s' }}>
      <EquallHead onHome={() => go('home')} />

      <div style={{ flex: 1, padding: '2px 18px 0' }}>
        {/* ── confirmed offer hero ── */}
        <div style={{ position: 'relative', borderRadius: 22, padding: '18px 20px 20px', overflow: 'hidden', background: 'linear-gradient(150deg,#3B0764,#5B5BD6)', boxShadow: '0 2px 10px rgba(0,0,0,.14), 0 8px 24px rgba(59,7,100,.28)' }}>
          {/* glow */}
          <div style={{ position: 'absolute', top: -40, right: -30, width: 150, height: 150, borderRadius: 999, background: 'radial-gradient(circle, rgba(255,255,255,.18), transparent 70%)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,.16)', border: '1px solid rgba(255,255,255,.25)', borderRadius: 999, padding: '5px 11px', whiteSpace: 'nowrap' }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: '#34D399' }} />
              <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 0.8, color: '#fff', ...sora }}>✦ REVISED OFFER</span>
            </div>

            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <div style={{ fontWeight: 800, fontSize: 46, color: '#fff', letterSpacing: -1.5, lineHeight: 1.1, ...sora }}>₹2,00,000</div>
              <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,.82)', marginTop: 4 }}>Revised basis your banking verification</div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              <div style={{ flex: 1, background: 'rgba(255,255,255,.14)', border: '1px solid rgba(255,255,255,.2)', borderRadius: 13, padding: '11px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 19, fontWeight: 800, color: '#fff', letterSpacing: -0.4, ...sora }}>20% p.a.</div>
                <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,.72)', marginTop: 2 }}>Interest rate</div>
              </div>
              <div style={{ flex: 1, background: 'rgba(255,255,255,.14)', border: '1px solid rgba(255,255,255,.2)', borderRadius: 13, padding: '11px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 19, fontWeight: 800, color: '#fff', letterSpacing: -0.4, ...sora }}>15 months</div>
                <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,.72)', marginTop: 2 }}>Tenure</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── tranche notice (one line) ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: REV.purpleL, border: `1px solid ${REV.purpleBorder}`, borderRadius: 12, padding: '10px 13px', marginTop: 14 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="9.2" stroke={REV.purple} strokeWidth="1.7" /><path d="M12 11v5M12 7.6h.01" stroke={REV.purple} strokeWidth="2" strokeLinecap="round" /></svg>
          <span style={{ fontSize: 12, fontWeight: 600, color: REV.ink2, lineHeight: 1.4 }}>Phase 1 of your <b style={{ color: REV.ink }}>₹5,00,000</b> limit — Phase 2 unlocks once you repay.</span>
        </div>

        {/* ── select EMI plan ── */}
        <div style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 16.5, fontWeight: 800, color: REV.ink, letterSpacing: -0.3, ...sora }}>Choose your EMI plan</span>
            <button onClick={() => go('amountselect')} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12.5, fontWeight: 700, color: REV.purple, ...sora }}>
              <span>✏</span> Edit
            </button>
          </div>
          <div style={{ fontSize: 12, fontWeight: 500, color: REV.muted, marginTop: 5 }}>First EMI on 4 Mar 2026</div>

          {/* EMI cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 13 }}>
            {PLANS.map((p, i) => {
              const on = plan === i;
              return (
                <button key={i} onClick={() => setPlan(i)} style={{
                  position: 'relative', display: 'flex', alignItems: 'center', gap: 13, textAlign: 'left',
                  width: '100%', borderRadius: 15, padding: '15px 16px',
                  background: on ? REV.purpleL : '#fff', border: `2px solid ${on ? REV.purple : REV.line}`,
                  transition: 'all .15s',
                }}>
                  {/* radio */}
                  <span style={{ width: 22, height: 22, borderRadius: 999, flexShrink: 0, border: `2px solid ${on ? REV.purple : '#CBD5E1'}`, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {on && <span style={{ width: 11, height: 11, borderRadius: 999, background: REV.purple }} />}
                  </span>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: 9, whiteSpace: 'nowrap' }}>
                    <span style={{ fontSize: 16, fontWeight: 800, color: REV.ink, ...sora }}>{p.months} Months</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: REV.ink2, whiteSpace: 'nowrap' }}>₹ {p.emi.toLocaleString('en-IN')}/month</span>
                  </div>
                  {p.rec && (
                    <span style={{ position: 'absolute', top: -10, right: 14, background: REV.purple, color: '#fff', fontSize: 9.5, fontWeight: 700, letterSpacing: 0.4, borderRadius: 999, padding: '3px 9px', boxShadow: '0 5px 12px -5px rgba(91,91,214,.7)', ...sora }}>★ Recommended</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* savings callout (one line) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 11, background: REV.greenBg, borderLeft: `4px solid ${REV.green}`, borderRadius: '8px 12px 12px 8px', padding: '12px 14px', marginTop: 16 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="9" stroke={REV.green} strokeWidth="1.9" /><path d="M9 12l2 2 4-4.5" stroke={REV.green} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#065F46', ...sora }}>You save ₹40,500 in interest vs your cards</div>
          </div>

          {/* customize tenure */}
          <button style={{
            width: '100%', height: 50, borderRadius: 14, background: '#fff', border: `1.5px solid ${REV.purpleBorder}`,
            color: REV.purple, fontSize: 14.5, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 16, ...sora,
          }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke={REV.purple} strokeWidth="1.8" /><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H1a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 2.6 7a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H7a1.6 1.6 0 0 0 1-1.5V1a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V7a1.6 1.6 0 0 0 1.5 1H23a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z" stroke={REV.purple} strokeWidth="1.5" transform="scale(.8) translate(3 3)" /></svg>
            Customize Tenure
          </button>
        </div>
      </div>

      {/* CTA */}
      <BottomBar bg="#fff">
        <button onClick={() => go('journeycontinues')} style={{
          width: '100%', height: 56, borderRadius: 15, background: REV.navy, color: '#fff',
          fontWeight: 700, fontSize: 16.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, whiteSpace: 'nowrap', ...sora,
          boxShadow: '0 14px 30px -10px rgba(30,58,95,.55)', transition: 'transform .12s',
        }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(.975)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          Continue
        </button>
      </BottomBar>
    </div>
  );
}

window.RevisedOffer = RevisedOffer;
