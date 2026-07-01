// screen-melt-status.jsx — Melt Status

function MeltStatusScreen({ go, meltState, retryCount, setRetryCount }) {
  var ink   = '#1B192E';
  var ink2  = '#4B4960';
  var muted = '#8A879B';
  var LINE  = 'var(--line)';
  var G     = '#1FA971';
  var G_L   = 'var(--green-l)';
  var P     = 'var(--primary)';
  var sora  = { fontFamily: "'Sora',sans-serif" };

  var canRetry  = meltState === 'txn_not_found' && retryCount < 1;
  var exhausted = retryCount >= 1 || meltState === 'retry_exhausted';
  var isBureau  = meltState === 'bureau_fallback';

  var today  = new Date();
  var BATCH  = [4, 10, 18, 26];
  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  function buildUpcoming() {
    var res = [];
    for (var i = 0; i < BATCH.length; i++) {
      var d = new Date(today.getFullYear(), today.getMonth(), BATCH[i]);
      if (d > today) res.push(d);
    }
    for (var j = 0; j < BATCH.length && res.length < 4; j++) {
      res.push(new Date(today.getFullYear(), today.getMonth() + 1, BATCH[j]));
    }
    return res.slice(0, 4);
  }
  var upcoming = buildUpcoming();
  var nextDate = upcoming[0];
  var nextStr  = nextDate.getDate() + ' ' + MONTHS[nextDate.getMonth()] + ' ' + nextDate.getFullYear();

  // State config
  var stateMap = {
    retry: {
      bg: 'linear-gradient(135deg, #5B3FD4 0%, #6D28D9 100%)',
      iconBg: 'rgba(255,255,255,0.15)',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M1 4v6h6M23 20v-6h-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      badge: 'Retry Available', badgeColor: '#fff', badgeBg: 'rgba(255,255,255,0.2)',
      title: 'Transaction not verified',
      body: "We couldn't find your payment in the AA records. You have 1 retry remaining.",
    },
    exhausted: {
      bg: 'linear-gradient(135deg, #B45309 0%, #D97706 100%)',
      iconBg: 'rgba(255,255,255,0.15)',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="12" y1="9" x2="12" y2="13" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          <line x1="12" y1="17" x2="12.01" y2="17" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"/>
        </svg>
      ),
      badge: 'Retry Exhausted', badgeColor: '#fff', badgeBg: 'rgba(255,255,255,0.2)',
      title: 'Retry limit reached',
      body: "You've used your retry. We'll verify automatically on the next batch run.",
    },
    bureau: {
      bg: 'linear-gradient(135deg, #374151 0%, #4B5563 100%)',
      iconBg: 'rgba(255,255,255,0.15)',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="1.8"/>
          <path d="M12 7v5l3 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      badge: 'Waiting', badgeColor: '#fff', badgeBg: 'rgba(255,255,255,0.2)',
      title: 'Waiting for bureau update',
      body: "Your details are submitted. We'll verify automatically on the next batch run.",
    },
  };

  var c = canRetry ? stateMap.retry : exhausted ? stateMap.exhausted : stateMap.bureau;

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#F9F8FC', animation: 'fadeIn .25s' }}>

      {/* ── Header ── */}
      <div style={{ background: '#fff', padding: '12px 16px 14px', flexShrink: 0, borderBottom: '1px solid #F0EEF8' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={function(){ go('home'); }}
            style={{ width: 36, height: 36, borderRadius: 12, border: '1.5px solid #ECEAF4', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke={ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: ink, ...sora, lineHeight: 1 }}>Verification Status</div>
          </div>
        </div>
      </div>

      <div className="scr" style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 8px' }}>

        {/* ── Status hero card ── */}
        <div style={{ background: c.bg, borderRadius: 22, padding: '20px', marginBottom: 16, boxShadow: '0 1px 4px rgba(0,0,0,.08), 0 4px 14px rgba(0,0,0,.12)', animation: 'fadeUp .35s both' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: c.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {c.icon}
            </div>
            <div style={{ background: c.badgeBg, borderRadius: 999, padding: '4px 12px', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: c.badgeColor, animation: 'blink 2s ease-in-out infinite' }} />
              <span style={{ fontSize: 10.5, fontWeight: 700, color: c.badgeColor, letterSpacing: 0.5 }}>{c.badge.toUpperCase()}</span>
            </div>
          </div>
          <div style={{ fontSize: 20, fontWeight: 900, color: '#fff', ...sora, lineHeight: 1.2, marginBottom: 8 }}>{c.title}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.55 }}>{c.body}</div>

          {/* Next batch highlight */}
          <div style={{ marginTop: 16, background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Next check</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#fff', ...sora }}>{nextStr}</span>
          </div>
        </div>

        {/* ── Retry CTA ── */}
        {canRetry && (
          <button
            onClick={function(){ setRetryCount(retryCount + 1); go('verifying'); }}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 14,
              padding: '15px 18px', borderRadius: 18,
              border: '2px solid var(--primary)', background: 'var(--primary-l)',
              cursor: 'pointer', textAlign: 'left', marginBottom: 16,
              boxShadow: '0 4px 18px -6px rgba(127,85,223,.2)', transition: 'transform .12s',
            }}
            onMouseDown={function(e){ e.currentTarget.style.transform='scale(.985)'; }}
            onMouseUp={function(e){ e.currentTarget.style.transform='scale(1)'; }}
            onMouseLeave={function(e){ e.currentTarget.style.transform='scale(1)'; }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 13, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M1 4v6h6M23 20v-6h-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--primary)', ...sora, marginBottom: 1 }}>Retry now</div>
              <div style={{ fontSize: 12, color: ink2 }}>Re-run with Account Aggregator</div>
            </div>
            <div style={{ background: 'var(--primary)', borderRadius: 999, padding: '4px 10px', flexShrink: 0 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#fff' }}>1 left</span>
            </div>
          </button>
        )}

        {/* ── Batch dates — timeline ── */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '18px 18px', boxShadow: '0 1px 3px rgba(0,0,0,.05), 0 4px 14px rgba(0,0,0,.07)', marginBottom: 14, animation: 'fadeUp .35s .12s both' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: muted, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 18 }}>Upcoming Batch Runs</div>
          <div style={{ position: 'relative', paddingLeft: 16 }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: 15, top: 16, bottom: 16, width: 1.5, background: '#EAE8F4', borderRadius: 999 }} />

            {upcoming.map(function(d, i) {
              var isNext  = i === 0;
              var dayStr  = d.getDate() + ' ' + MONTHS[d.getMonth()];
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: i < upcoming.length - 1 ? 18 : 0, position: 'relative' }}>
                  {/* Timeline dot */}
                  <div style={{
                    width: isNext ? 14 : 10, height: isNext ? 14 : 10,
                    borderRadius: '50%', flexShrink: 0,
                    background: isNext ? P : '#D8D5EC',
                    border: isNext ? '2.5px solid #fff' : 'none',
                    boxShadow: isNext ? '0 0 0 3px rgba(127,85,223,.2)' : 'none',
                    marginLeft: isNext ? -2 : 0,
                    zIndex: 1, transition: 'all .2s',
                  }} />

                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: isNext ? 14 : 13, fontWeight: isNext ? 800 : 500, color: isNext ? ink : muted, ...sora }}>{dayStr}</span>
                    {isNext && (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'var(--primary-l)', border: '1.5px solid #C7C4F2', borderRadius: 999, padding: '3px 10px' }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: P, animation: 'blink 2s ease-in-out infinite' }} />
                        <span style={{ fontSize: 10, fontWeight: 800, color: P }}>NEXT</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #F0EEF8', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="12" cy="12" r="9" stroke={muted} strokeWidth="1.8"/><path d="M12 11v5M12 7.5h.01" stroke={muted} strokeWidth="2" strokeLinecap="round"/></svg>
            <span style={{ fontSize: 11.5, color: muted, lineHeight: 1.5 }}>Runs on the 4th, 10th, 18th &amp; 26th of each month. Your status updates automatically.</span>
          </div>
        </div>

        {/* ── Loan summary ── */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '16px 18px', boxShadow: '0 1px 3px rgba(0,0,0,.05), 0 4px 14px rgba(0,0,0,.07)', animation: 'fadeUp .35s .2s both' }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: muted, letterSpacing: 0.7, textTransform: 'uppercase', marginBottom: 12 }}>Your Active Loan</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: ink, ...sora, letterSpacing: -0.5 }}>₹2,00,000</div>
              <div style={{ fontSize: 11.5, color: muted, marginTop: 3 }}>Next EMI · 04 Aug 2026</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: G_L, border: '1.5px solid #A7E4C5', borderRadius: 999, padding: '6px 13px' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: G, animation: 'blink 2s ease-in-out infinite' }} />
              <span style={{ fontSize: 11.5, fontWeight: 700, color: G }}>Active</span>
            </div>
          </div>
        </div>

        <div style={{ height: 16 }} />
      </div>

      {/* ── CTA ── */}
      <BottomBar>
        <button
          onClick={function(){ go('postdisbursal'); }}
          style={{ width: '100%', height: 54, borderRadius: 16, border: '1.5px solid #ECEAF4', background: '#fff', color: ink2, fontWeight: 700, fontSize: 15, ...sora, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', letterSpacing: -0.1 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 11l9-7 9 7" stroke={ink2} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 9.5V20h5v-5h4v5h5V9.5" stroke={ink2} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Go to Dashboard
        </button>
      </BottomBar>
    </div>
  );
}
window.MeltStatusScreen = MeltStatusScreen;
