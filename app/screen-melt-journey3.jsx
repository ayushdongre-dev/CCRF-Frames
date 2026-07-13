// screen-melt-journey3.jsx — "Your Melt Status" for Home 3: Verified, awaiting disbursement
// Cloned from screen-melt-journey.jsx (the approved Status 1 template). Same
// layout, spacing and typography — only the timeline states, bottom callout
// and CTA change to reflect verification completing and the ₹3,00,000
// disbursement now being processed (not yet landed).
function MeltJourneyScreen3({ go }) {
  var sora = { fontFamily: "'Sora', -apple-system, system-ui, sans-serif" };
  var PRIMARY = 'var(--primary)';
  var GREEN = '#2D9E6B';

  var STEPS = [
    { state: 'done', title: '₹2,00,000 Disbursed', desc: 'Credited directly to your salary account.', tag: 'Step 1' },
    { state: 'done', title: 'Verification Completed', desc: 'Melt confirmed your dues were fully cleared.', tag: '✓ Verified' },
    { state: 'active', title: '₹3,00,000 Unlocked', desc: 'Continue your journey to receive this amount in your bank.', tag: 'Action needed' },
  ];

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff', animation: 'fadeIn .3s' }}>

      {/* nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px 4px', flexShrink: 0 }}>
        <button onClick={function () { go('home3'); }} style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
          {Icon.back('var(--ink)')}
        </button>
        <span style={{ fontWeight: 700, fontSize: 15.5, color: 'var(--ink)', letterSpacing: -0.2, ...sora }}>Your Melt Status</span>
        <div style={{ width: 38 }} />
      </div>

      <div style={{ flex: 1, padding: '10px 20px 26px' }}>

        {/* ── summary hero — compact progress strip ── */}
        <div style={{
          borderRadius: 14, padding: '12px 14px', background: '#fff',
          border: '1px solid var(--line)', marginBottom: 18,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink)', letterSpacing: -0.1, ...sora }}>Your Melt Journey</span>
            <span style={{ fontSize: 10.5, fontWeight: 800, color: GREEN, background: '#E7F7EF', borderRadius: 999, padding: '2px 8px', flexShrink: 0, ...sora }}>Verified</span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {[0, 1, 2].map(function (i) {
              return <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: GREEN }} />;
            })}
          </div>
        </div>

        {/* ── vertical timeline ── */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {STEPS.map(function (s, i) {
            var isLast = i === STEPS.length - 1;
            var done = s.state === 'done', active = s.state === 'active', upcoming = s.state === 'upcoming';
            var nodeColor = done ? GREEN : active ? PRIMARY : '#D6D2EA';
            var lineColor = (done || (active && i > 0)) ? 'rgba(45,158,107,.3)' : '#E8E5F2';
            return (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', paddingBottom: isLast ? 0 : 22, position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 26, flexShrink: 0 }}>
                  <div style={{
                    position: 'relative', width: 26, height: 26, borderRadius: 999, flexShrink: 0,
                    background: nodeColor, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: active ? '0 0 0 5px rgba(91,63,212,.14)' : done ? '0 2px 8px rgba(45,158,107,.35)' : 'none',
                  }}>
                    {done ? (
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    ) : active ? (
                      <div style={{ width: 8, height: 8, borderRadius: 999, background: '#fff' }} />
                    ) : (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#A7A2C4" strokeWidth="2.4" strokeLinecap="round"><rect x="4" y="10" width="16" height="12" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/></svg>
                    )}
                  </div>
                  {!isLast && <div style={{ width: 2, flex: 1, minHeight: 30, marginTop: 4, background: lineColor, borderRadius: 1 }} />}
                </div>

                <div style={{ flex: 1, paddingTop: 2, paddingBottom: 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 14.5, fontWeight: 700, color: upcoming ? 'var(--muted)' : 'var(--ink)', letterSpacing: -0.1, ...sora }}>{s.title}</span>
                    {s.tag && (
                      <span style={{
                        fontSize: 10.5, fontWeight: 800, flexShrink: 0, whiteSpace: 'nowrap', borderRadius: 999, padding: '3px 9px',
                        color: active ? PRIMARY : upcoming ? '#AEA9C9' : GREEN,
                        background: active ? 'var(--primary-l)' : upcoming ? '#F0EFF8' : '#E7F7EF',
                        border: '1px solid ' + (active ? 'rgba(91,63,212,.2)' : upcoming ? '#E2DFEF' : 'rgba(45,158,107,.25)'),
                      }}>{s.tag}</span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: upcoming ? '#B2AECB' : 'var(--muted)', lineHeight: 1.5 }}>{s.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Amount unlocked — customer must continue to claim it ── */}
        <div style={{
          marginTop: 20, borderRadius: 20, padding: '18px 18px', position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(135deg,#E8F8F1 0%,#D4F0E3 100%)', border: '1px solid rgba(31,169,113,0.25)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 50, height: 50, borderRadius: 15, flexShrink: 0, background: 'linear-gradient(135deg,#37B179,#2D9E6B)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 18px rgba(45,158,107,.4)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M8 11V8.2A4 4 0 0116 7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/><rect x="3" y="11" width="18" height="11" rx="3" fill="rgba(255,255,255,.9)"/><circle cx="12" cy="17" r="2.2" fill="#2D9E6B"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1, color: '#1A7A4A', marginBottom: 4 }}>₹3,00,000 UNLOCKED</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#14532D', letterSpacing: -0.1, ...sora }}>Verified — continue to receive it in your bank</div>
            </div>
          </div>
          <div style={{ marginTop: 12, fontSize: 11.5, color: '#3F7A66', lineHeight: 1.5 }}>
            You've been successfully verified and this amount is unlocked. Claim your reward to continue your journey and receive it in your account.
          </div>
        </div>
      </div>

      {/* CTA */}
      <BottomBar>
        <Btn onClick={function () { go('reward'); }}>
          Claim Your Reward {Icon.arrowR('#fff')}
        </Btn>
      </BottomBar>
    </div>
  );
}
window.MeltJourneyScreen3 = MeltJourneyScreen3;
