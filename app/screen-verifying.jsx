// screen-verifying.jsx — A3 "Verification in Progress" (20s auto-approve)

var VERIFY_DURATION = 5; // seconds

function VerifyingScreen({ go, setPdState }) {
  var ink  = '#1B192E';
  var ink2 = '#4B4960';
  var muted= '#8A879B';
  var G    = '#1FA971';
  var sora = { fontFamily: "'Sora',sans-serif" };

  var tst = useState(VERIFY_DURATION); var timeLeft = tst[0]; var setTimeLeft = tst[1];

  var elapsed  = VERIFY_DURATION - timeLeft;
  var progress = elapsed / VERIFY_DURATION; // 0 → 1

  // Countdown tick
  useEffect(function() {
    if (timeLeft <= 0) return;
    var t = setTimeout(function() { setTimeLeft(function(n) { return n - 1; }); }, 1000);
    return function() { clearTimeout(t); };
  }, [timeLeft]);

  // Navigate when done
  useEffect(function() {
    if (timeLeft > 0) return;
    var t = setTimeout(function() {
      if (setPdState) setPdState('unlocked');
      go('reward');
    }, 400); // brief pause so final "done" state is visible
    return function() { clearTimeout(t); };
  }, [timeLeft]);

  // Steps animate through as time passes
  function stepState(idx) {
    // idx 0: always done
    // idx 1: active 0-6s, done after 7s
    // idx 2: active 7-14s, done after 15s
    // idx 3: active 15s+, done at end
    var thresholds = [-1, 2, 4, VERIFY_DURATION];
    var prevDone = elapsed >= thresholds[idx];
    var nextActive = elapsed >= thresholds[idx - 1 < 0 ? 0 : idx - 1];

    if (idx === 0) return { done: true,  active: false };
    if (elapsed >= thresholds[idx])     return { done: true,  active: false };
    if (elapsed >= thresholds[idx - 1]) return { done: false, active: true };
    return { done: false, active: false };
  }

  var STEPS = [
    { label: 'Payment flagged for review', detail: 'We received your update' },
    { label: 'Statement processing',       detail: 'Extracting payment data…' },
    { label: 'Bureau confirmation',        detail: 'Awaiting CIBIL data' },
    { label: 'Round 2 Unlocked',            detail: timeLeft <= 0 ? 'Approved!' : 'Offer ready for you' },
  ];

  var allDone = timeLeft <= 0;

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff', animation: 'fadeIn .25s' }}>
      <EquallHead onHome={function(){ go('home'); }} />

      <div className="scr" style={{ flex: 1, overflowY: 'auto', padding: '0 22px 8px' }}>

        {/* Spinner / success hero */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 12, marginBottom: 24 }}>
          <div style={{ position: 'relative', width: 80, height: 80, marginBottom: 14 }}>
            {/* Pulse ring */}
            <div style={{ position: 'absolute', inset: -12, borderRadius: 999, border: '2px solid ' + (allDone ? 'rgba(31,169,113,.2)' : 'rgba(127,85,223,.15)'), animation: 'pulseRing 2s ease-out infinite', transition: 'border-color .4s' }} />
            {/* Track */}
            <div style={{ position: 'absolute', inset: 0, borderRadius: 999, border: '4px solid #ECEAF4' }} />
            {/* Arc — transitions from primary to green on done */}
            {!allDone && (
              <div style={{ position: 'absolute', inset: 0, borderRadius: 999, border: '4px solid transparent', borderTopColor: 'var(--primary)', animation: 'spin .9s linear infinite' }} />
            )}
            {/* Center icon */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {allDone
                ? <div style={{ width: 44, height: 44, borderRadius: 999, background: 'linear-gradient(135deg,' + G + ',#0EA876)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'popIn .4s both' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 13l5 5L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                : <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="var(--primary)" strokeWidth="1.8" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="var(--primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              }
            </div>
          </div>

          {/* Countdown / complete text */}
          <div style={{ fontWeight: 800, fontSize: 22, color: allDone ? G : ink, ...sora, textAlign: 'center', marginBottom: 6, transition: 'color .4s' }}>
            {allDone ? 'Verification Complete!' : 'Verification in Progress'}
          </div>
          <div style={{ fontSize: 13, fontWeight: 500, color: muted, textAlign: 'center', lineHeight: 1.5, maxWidth: 280, marginBottom: 16 }}>
            {allDone
              ? 'Your tranche is approved. Taking you there…'
              : 'Auto-verifying your payment. Please wait.'}
          </div>

          {/* Progress bar */}
          <div style={{ width: '100%', maxWidth: 300 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: muted }}>Verifying…</span>
              <span style={{ fontSize: 12, fontWeight: 800, color: allDone ? G : 'var(--primary)', ...sora, transition: 'color .3s' }}>
                {allDone ? 'Done ✓' : timeLeft + 's'}
              </span>
            </div>
            <div style={{ height: 7, borderRadius: 999, background: '#ECEAF4', overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 999,
                background: allDone ? 'linear-gradient(90deg,' + G + ',#38D988)' : 'linear-gradient(90deg,var(--primary),#7C6CF5)',
                width: (progress * 100) + '%',
                transition: 'width 1s linear, background .5s',
              }} />
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ borderRadius: 18, border: '1.5px solid var(--line)', padding: '16px 14px', marginBottom: 14 }}>
          {STEPS.map(function(s, i) {
            var st = stepState(i);
            var isLast = i === STEPS.length - 1;
            return (
              <div key={i} style={{ display: 'flex', gap: 12, position: 'relative' }}>
                {/* Connector line */}
                {!isLast && (
                  <div style={{ position: 'absolute', left: 13.5, top: 28, width: 1.5, height: 'calc(100% - 4px)', background: st.done ? G : '#ECEAF4', transition: 'background .5s' }} />
                )}
                {/* Node */}
                <div style={{
                  width: 28, height: 28, borderRadius: 999, flexShrink: 0, marginTop: 2,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: st.done ? G : st.active ? '#fff' : '#F4F3FB',
                  border: '2px solid ' + (st.done ? G : st.active ? 'var(--primary)' : '#ECEAF4'),
                  boxShadow: st.active ? '0 3px 12px -3px rgba(127,85,223,.4)' : 'none',
                  animation: st.active ? 'nodePulseGentle 1.5s ease-in-out infinite' : 'none',
                  transition: 'all .4s',
                }}>
                  {st.done
                    ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 13l5 5L19 7" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    : st.active
                      ? <div style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--primary)', animation: 'blink 1.2s ease-in-out infinite' }} />
                      : <div style={{ width: 8, height: 8, borderRadius: 999, background: '#C7C4F2', opacity: 0.4 }} />
                  }
                </div>
                {/* Content */}
                <div style={{ flex: 1, paddingBottom: isLast ? 0 : 18 }}>
                  <div style={{ fontWeight: 700, fontSize: 13.5, color: st.done || st.active ? ink : muted, ...sora, lineHeight: 1.2, marginBottom: 3, transition: 'color .3s' }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: 12, color: st.done ? G : st.active ? 'var(--primary)' : muted, transition: 'color .3s' }}>
                    {s.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info note */}
        {!allDone && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12, padding: '11px 14px', marginBottom: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="9" stroke="#D97706" strokeWidth="1.8" /><path d="M12 11v5M12 7.5h.01" stroke="#D97706" strokeWidth="2" strokeLinecap="round" /></svg>
            <span style={{ fontSize: 12.5, color: '#92400E', lineHeight: 1.5 }}>
              Sit tight — you will be redirected automatically in <strong style={{ color: '#78350F' }}>{timeLeft}s</strong>.
            </span>
          </div>
        )}
      </div>

      {/* CTA */}
      <BottomBar>
        <button
          onClick={function(){
            if (setPdState) setPdState('pending');
            go('postdisbursal');
          }}
          style={{ width: '100%', height: 52, borderRadius: 15, border: '1.5px solid var(--line)', background: '#fff', color: ink2, fontWeight: 700, fontSize: 15, ...sora, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 11l9-7 9 7" stroke={ink2} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 9.5V20h5v-5h4v5h5V9.5" stroke={ink2} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Go to home
        </button>
      </BottomBar>
    </div>
  );
}

window.VerifyingScreen = VerifyingScreen;
