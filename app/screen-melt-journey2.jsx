// screen-melt-journey2.jsx — "Your Melt Status" for Home 2: Verification in Progress
// Cloned from screen-melt-journey.jsx (the approved Status 1 template). Same
// layout, spacing and typography — only the timeline states, bottom callout
// and CTA change to reflect that dues are paid and verification is underway.
function MeltJourneyScreen2({ go }) {
  var sora = { fontFamily: "'Sora', -apple-system, system-ui, sans-serif" };
  var PRIMARY = 'var(--primary)';
  var GREEN = '#2D9E6B';

  var STEPS = [
    { state: 'done', title: '₹2,00,000 Disbursed', desc: 'Credited directly to your salary account.', tag: 'Part 1' },
    { state: 'active', title: 'Verifying Your Documents', desc: "We've received your documents and are confirming everything.", tag: 'In progress' },
    { state: 'upcoming', title: 'Part 2 Unlocks', desc: 'Once verified, ₹3,00,000 opens automatically.', tag: '+₹3,00,000' },
  ];

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff', animation: 'fadeIn .3s' }}>

      {/* nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px 4px', flexShrink: 0 }}>
        <button onClick={function () { go('home2'); }} style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
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
            <span style={{ fontSize: 10.5, fontWeight: 800, color: PRIMARY, background: 'var(--primary-l)', borderRadius: 999, padding: '2px 8px', flexShrink: 0, ...sora }}>Step 2 of 3</span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {[0, 1, 2].map(function (i) {
              var filled = i <= 1;
              return <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: filled ? GREEN : '#E8E5F2' }} />;
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
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
                        <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,.3)" strokeWidth="2.4" />
                        <path d="M12 3a9 9 0 019 9" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
                      </svg>
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

        {/* ── Verification status ── */}
        <div style={{
          marginTop: 20, borderRadius: 20, padding: '18px 18px', position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(135deg,#F2F0FE,#EAE6FD)', border: '1px solid #D9D2F7',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 50, height: 50, borderRadius: 15, flexShrink: 0, background: 'linear-gradient(135deg,#8B6FF0,#5B3FD4)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 18px rgba(91,63,212,.4)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1.4s linear infinite' }}>
                <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,.35)" strokeWidth="2.6" />
                <path d="M12 3a9 9 0 019 9" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1, color: '#7A5FD1', marginBottom: 4 }}>VERIFICATION IN PROGRESS</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#3D2A9C', letterSpacing: -0.1, ...sora }}>We'll notify you the moment it's done</div>
            </div>
          </div>
          <div style={{ marginTop: 12, fontSize: 11.5, color: '#6A5CA8', lineHeight: 1.5 }}>
            No action needed from you right now — verification usually completes within 24 hours.
          </div>
        </div>
      </div>

      {/* CTA */}
      <BottomBar>
        <Btn onClick={function () { go('verifying'); }}>
          Check Verification Status {Icon.arrowR('#fff')}
        </Btn>
      </BottomBar>
    </div>
  );
}
window.MeltJourneyScreen2 = MeltJourneyScreen2;
