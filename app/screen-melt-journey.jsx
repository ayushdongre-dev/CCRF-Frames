// screen-melt-journey.jsx — "Know Your Melt Journey" · premium vertical timeline
function MeltJourneyScreen({ go, salaryAcc }) {
  var sora = { fontFamily: "'Sora', -apple-system, system-ui, sans-serif" };
  var PRIMARY = 'var(--primary)';
  var GREEN = '#2D9E6B';
  var AMBER = '#E8A020';

  var ACC4     = (salaryAcc && salaryAcc.last4) || '4321';
  var ACC_NAME = (salaryAcc && (salaryAcc.short || salaryAcc.name)) || 'HDFC';
  var PART1    = 200000;
  var DISBURSED_ON = '12 Jun 2026';

  var STEPS = [
    { state: 'done', title: '₹2,00,000 Disbursed', desc: 'Credited to ' + ACC_NAME + ' XX' + ACC4 + ' on ' + DISBURSED_ON + '.', tag: 'Part 1' },
    { state: 'active', title: 'Clear your card bills', desc: 'Pay them off with that money, then validate the payments here.', tag: '6 days left' },
    { state: 'upcoming', title: 'Part 2 Unlocks', desc: 'Once your payments are validated, ₹3,00,000 opens automatically.', tag: '+₹3,00,000' },
  ];

  // A returning customer lands here days after disbursal — restate what to
  // clear, what to clear it with, and which account to clear it from.
  var TODO = [
    {
      title: 'What to clear',
      body: 'The credit card bills you picked when you applied.',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2.5" stroke={PRIMARY} strokeWidth="1.9" /><path d="M3 10h18" stroke={PRIMARY} strokeWidth="1.9" /></svg>,
    },
    {
      title: 'What to pay with',
      body: 'The ' + inr(PART1) + ' Part 1 loan credited to you on ' + DISBURSED_ON + '.',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3v18M8.5 7.5h6a2.5 2.5 0 010 5h-5a2.5 2.5 0 000 5h6" stroke={PRIMARY} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    },
    {
      title: 'Which account to pay from',
      body: ACC_NAME + ' XX' + ACC4 + ' — the same account the loan landed in.',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 10l9-6 9 6" stroke={PRIMARY} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 10v9h14v-9M3 19h18" stroke={PRIMARY} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    },
  ];

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff', animation: 'fadeIn .3s' }}>

      {/* nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px 4px', flexShrink: 0 }}>
        <button onClick={function () { go('home'); }} style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
          {Icon.back('var(--ink)')}
        </button>
        <span style={{ fontWeight: 700, fontSize: 15.5, color: 'var(--ink)', letterSpacing: -0.2, ...sora }}>Your Melt Status</span>
        <div style={{ width: 38 }} />
      </div>

      <div style={{ flex: 1, padding: '10px 20px 16px' }}>

        {/* ── summary hero — compact progress strip ── */}
        <div style={{
          borderRadius: 14, padding: '12px 14px', background: '#fff',
          border: '1px solid var(--line)', marginBottom: 14,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink)', letterSpacing: -0.1, ...sora }}>Your Melt Journey</span>
            <span style={{ fontSize: 10.5, fontWeight: 800, color: PRIMARY, background: 'var(--primary-l)', borderRadius: 999, padding: '2px 8px', flexShrink: 0, ...sora }}>Step 1 of 3</span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {[0, 1, 2].map(function (i) {
              var filled = i === 0;
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
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', paddingBottom: isLast ? 0 : 18, position: 'relative' }}>
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

        {/* ── Deadline strip ── */}
        <div style={{
          marginTop: 14, borderRadius: 16, padding: '12px 14px',
          background: 'linear-gradient(135deg,#FDF3DC,#FFF6E8)', border: '1px solid #EDD899',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 7 }}>
            <span style={{ fontSize: 11.5, fontWeight: 600, color: '#8A6A22' }}>Clear &amp; validate by 22 Jun</span>
            <span style={{ fontSize: 11.5, fontWeight: 800, color: '#B8882A', ...sora }}>6 days left</span>
          </div>
          <div style={{ height: 5, borderRadius: 999, background: 'rgba(232,160,32,.18)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '40%', borderRadius: 999, background: 'linear-gradient(90deg,#F5A623,#E8A020)' }} />
          </div>
        </div>

        {/* ── What to do (returning-customer recap) ── */}
        <div style={{
          marginTop: 12, borderRadius: 20, padding: '14px 15px 4px',
          background: '#fff', border: '1px solid var(--line)',
          boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 8px 20px -14px rgba(40,30,80,.18)',
        }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink)', letterSpacing: -0.1, marginBottom: 12, ...sora }}>
            How to unlock Part 2
          </div>
          {TODO.map(function (t, i) {
            return (
              <div key={t.title} style={{ display: 'flex', gap: 11, alignItems: 'flex-start', paddingBottom: 10, marginBottom: 10, borderBottom: i === TODO.length - 1 ? 'none' : '1px solid #F4F2FB' }}>
                <div style={{ width: 30, height: 30, borderRadius: 10, flexShrink: 0, background: 'var(--primary-l)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', marginBottom: 3, ...sora }}>{t.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{t.body}</div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* CTA */}
      <BottomBar>
        <Btn onClick={function () { go('meltbank'); }}>
          Validate your payments {Icon.arrowR('#fff')}
        </Btn>
      </BottomBar>
    </div>
  );
}
window.MeltJourneyScreen = MeltJourneyScreen;
