// screen-postdisbursal.jsx — Post Disbursal Screen
// Premium fintech milestone screen. Uses app green (#1FA971).

var G = '#1FA971';      // app --green
var G_DK = '#178A5E';
var G_BG = '#E7F7EF';   // app --green-l
var G_BDR = '#A7E4C5';
var P = '#5B5BD6';       // app purple
var P_BG = '#EFEEFE';
var P_BDR = '#C7C4F2';
var GY = '#9CA3AF';
var GY_BG = '#F5F4FA';
var GY_BDR = '#E2E8F0';
var INK = '#1B192E';     // app --ink
var INK2 = '#4B4960';    // app --ink-2
var MUTED = '#8A879B';   // app --muted
var LINE = '#ECEAF4';    // app --line

// ── Animated success hero icon ─────────────────────────
function SuccessHero() {
  return (
    <div style={{ position: 'relative', width: 72, height: 72, margin: '0 auto' }}>
      {/* Outer glow ring */}
      <div style={{
        position: 'absolute', inset: -8, borderRadius: 999,
        border: '2px solid ' + G,
        opacity: 0.15,
        animation: 'pulseRing 2.5s ease-out infinite',
      }} />
      {/* Middle glow ring */}
      <div style={{
        position: 'absolute', inset: -4, borderRadius: 999,
        border: '1.5px solid ' + G,
        opacity: 0.25,
        animation: 'pulseRing 2.5s .4s ease-out infinite',
      }} />
      {/* Sparkle dots */}
      <div style={{
        position: 'absolute', top: -6, right: 2, width: 6, height: 6, borderRadius: 999,
        background: '#FCD34D', animation: 'popIn .4s .6s both, gentleFloat 3s 1s infinite',
      }} />
      <div style={{
        position: 'absolute', top: 8, right: -10, width: 4, height: 4, borderRadius: 999,
        background: P, opacity: .6, animation: 'popIn .4s .8s both, gentleFloat 3.5s 1.2s infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: 4, left: -8, width: 5, height: 5, borderRadius: 999,
        background: '#38BDF8', opacity: .5, animation: 'popIn .4s 1s both, gentleFloat 2.8s .8s infinite',
      }} />
      {/* Main circle */}
      <div style={{
        width: 72, height: 72, borderRadius: 999,
        background: 'linear-gradient(145deg, ' + G + ', ' + G_DK + ')',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 12px 32px -8px rgba(31,169,113,.5), 0 0 0 4px rgba(31,169,113,.08)',
        animation: 'popIn .5s both',
      }}>
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
          <path d="M5 12.5l5 5L19 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
            style={{ strokeDasharray: 22, animation: 'drawCheck .5s .35s both' }} />
        </svg>
      </div>
    </div>
  );
}

// ── Step circle with number ────────────────────────────
function PDStep({ num, state }) {
  var bg = state === 'done' ? G : state === 'active' ? '#fff' : GY;
  var bdr = state === 'done' ? G : state === 'active' ? P : GY;
  var fg = state === 'active' ? P : '#fff';
  return (
    <div style={{
      width: 30, height: 30, borderRadius: 999, flexShrink: 0,
      background: bg, border: '2.5px solid ' + bdr,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: state === 'done' ? '0 3px 10px -3px rgba(31,169,113,.35)' : 'none',
      transition: 'all .4s',
    }}>
      <span style={{ fontSize: 12, fontWeight: 800, color: fg, lineHeight: 1, fontFamily: "'Sora',sans-serif" }}>{num}</span>
    </div>
  );
}

// ── Main screen ─────────────────────────────────────────
function PostDisbursal({ go }) {
  var S = { fontFamily: "'Sora',-apple-system,system-ui,sans-serif" };
  var st = useState(false);
  var done = st[0];
  var setDone = st[1];
  var s2 = done ? 'done' : 'active';
  var s3 = done ? 'active' : 'locked';

  function dash(c) { return 'repeating-linear-gradient(to bottom,' + c + ' 0,' + c + ' 4px,transparent 4px,transparent 9px)'; }

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#F7F6FC', animation: 'fadeIn .25s' }}>

      {/* Header */}
      <div style={{ padding: '4px 18px 0', flexShrink: 0 }}>
        <button onClick={function(){ go('revisedoffer'); }} style={{
          width: 36, height: 36, borderRadius: 999,
          border: '1.5px solid ' + LINE, background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 5l-7 7 7 7" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>

        {/* Hero section */}
        <div style={{ textAlign: 'center', padding: '12px 24px 16px', animation: 'fadeUp .5s both' }}>
          <SuccessHero />
          <div style={{ fontWeight: 800, fontSize: 23, color: INK, marginTop: 14, letterSpacing: -0.3, fontFamily: "'Sora',sans-serif" }}>
            Congratulations!
          </div>
          <div style={{ fontWeight: 700, fontSize: 17, color: G, marginTop: 3, fontFamily: "'Sora',sans-serif" }}>
            Your loan is being disbursed
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 500, color: MUTED, marginTop: 6, lineHeight: 1.5 }}>
            Your first tranche has been sent successfully.<br />
            You're one step closer to becoming debt-free.
          </div>
        </div>

        {/* Timeline + Cards */}
        <div style={{ padding: '0 14px 0 18px' }}>

          {/* STEP 1 */}
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 30, flexShrink: 0, paddingTop: 14 }}>
              <PDStep num={1} state="done" />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, paddingTop: 3, paddingBottom: 1 }}>
                <div style={{ width: 2, height: 10, backgroundImage: dash(G), borderRadius: 9 }} />
                <div style={{ width: 6, height: 6, background: G, transform: 'rotate(45deg)', margin: '2px 0', flexShrink: 0, borderRadius: 1 }} />
                <div style={{ width: 2, flex: 1, backgroundImage: dash(G), borderRadius: 9 }} />
              </div>
            </div>
            <div style={{
              flex: 1, borderRadius: 18, padding: '12px 14px 13px', marginBottom: 6,
              background: '#fff', border: '1.5px solid ' + G_BDR,
              boxShadow: '0 2px 12px -4px rgba(31,169,113,.12), 0 0 0 1px rgba(31,169,113,.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: 0.8, color: G, fontFamily: "'Sora',sans-serif" }}>COMPLETED</span>
                <div style={{ width: 18, height: 18, borderRadius: 999, background: G, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 13l5 5L19 7" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                  background: G_BG,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="6" width="20" height="13" rx="3" stroke={G} strokeWidth="1.6" />
                    <rect x="2" y="6" width="20" height="5" rx="3" fill={G} opacity=".15" />
                    <rect x="14" y="12" width="6" height="4" rx="1.5" fill={G} opacity=".12" stroke={G} strokeWidth=".8" />
                    <circle cx="17" cy="14" r="1" fill={G} />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: INK, fontFamily: "'Sora',sans-serif" }}>First tranche disbursed</div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: INK2, marginTop: 2 }}>₹1,50,000 sent to your account</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 10, paddingTop: 9, borderTop: '1px solid ' + G_BDR }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" fill={G} />
                  <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontSize: 11, fontWeight: 600, color: G }}>Disbursed on 20 May 2025, 10:30 AM</span>
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 30, flexShrink: 0, paddingTop: 14 }}>
              <PDStep num={2} state={s2} />
              <div style={{ width: 2, flex: 1, backgroundImage: dash(done ? G : LINE), borderRadius: 9, marginTop: 3, marginBottom: 1, transition: 'background .5s' }} />
            </div>
            <div style={{
              flex: 1, borderRadius: 18, padding: '12px 14px 14px', marginBottom: 6,
              background: done ? '#fff' : '#fff',
              border: done ? ('1.5px solid ' + G_BDR) : ('1.5px dashed ' + P_BDR),
              boxShadow: done ? '0 2px 12px -4px rgba(31,169,113,.12)' : '0 4px 20px -6px rgba(91,91,214,.15), 0 0 0 1px rgba(91,91,214,.05)',
              transition: 'all .4s',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  fontSize: 9, fontWeight: 800, letterSpacing: 0.8,
                  color: done ? G : P, fontFamily: "'Sora',sans-serif",
                }}>{done ? 'COMPLETED' : 'PENDING ACTION'}</span>
                {done && (
                  <div style={{ width: 18, height: 18, borderRadius: 999, background: G, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 13l5 5L19 7" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 8 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                  background: done ? G_BG : P_BG,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', transition: 'background .3s',
                }}>
                  {done ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" fill={G} />
                      <path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <React.Fragment>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="5" width="18" height="16" rx="3" stroke={P} strokeWidth="1.5" />
                        <path d="M3 10h18" stroke={P} strokeWidth="1.5" />
                        <path d="M8 3v4M16 3v4" stroke={P} strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <div style={{
                        position: 'absolute', bottom: -1, right: -1,
                        width: 16, height: 16, borderRadius: 999,
                        background: P, border: '2px solid #fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="8" stroke="#fff" strokeWidth="2.2" />
                          <path d="M12 8v4l2 1.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                    </React.Fragment>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: done ? G_DK : INK, fontFamily: "'Sora',sans-serif" }}>
                    {done ? 'Payment marked done' : "I've paid my part"}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: done ? G : MUTED, marginTop: 2, lineHeight: 1.4 }}>
                    {done ? 'Verified · Next step unlocked' : 'Once your payment is complete, mark it as done.'}
                  </div>
                </div>
              </div>

              {!done && (
                <React.Fragment>
                  <button onClick={function(){ setDone(true); }} style={{
                    position: 'relative', width: '100%', height: 44, borderRadius: 13, border: 'none',
                    background: 'linear-gradient(135deg, ' + P + ', #4F46E5)',
                    color: '#fff', fontWeight: 700, fontSize: 14, fontFamily: "'Sora',sans-serif",
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                    marginTop: 14, cursor: 'pointer', overflow: 'hidden',
                    boxShadow: '0 8px 22px -6px rgba(91,91,214,.45)', transition: 'transform .1s',
                  }}
                    onMouseDown={function(e){ e.currentTarget.style.transform='scale(.975)'; }}
                    onMouseUp={function(e){ e.currentTarget.style.transform='scale(1)'; }}
                    onMouseLeave={function(e){ e.currentTarget.style.transform='scale(1)'; }}
                  >
                    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 13 }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '45%', height: '100%', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent)', animation: 'shimmer 3s infinite' }} />
                    </div>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ position: 'relative', zIndex: 1 }}>
                      <path d="M5 13l5 5L19 7" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ position: 'relative', zIndex: 1 }}>Mark as Done</span>
                  </button>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: 8 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke={MUTED} strokeWidth="1.6" strokeLinejoin="round" />
                      <path d="M9 12l2 2 4-4" stroke={MUTED} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: 11, fontWeight: 500, color: MUTED }}>We'll verify and move to the next step</span>
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>

          {/* STEP 3 */}
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 30, flexShrink: 0, paddingTop: 14 }}>
              <PDStep num={3} state={s3} />
            </div>
            <div style={{
              flex: 1, borderRadius: 18, padding: '12px 14px 14px',
              background: done ? '#fff' : GY_BG,
              border: done ? ('1.5px solid ' + P_BDR) : ('1.5px solid ' + GY_BDR),
              boxShadow: done ? '0 4px 20px -6px rgba(91,91,214,.15)' : 'none',
              opacity: done ? 1 : 0.6,
              transition: 'all .45s',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  fontSize: 9, fontWeight: 800, letterSpacing: 0.8,
                  color: done ? P : GY, fontFamily: "'Sora',sans-serif",
                }}>{done ? 'UNLOCKED' : 'LOCKED'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 8 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                  background: done ? P_BG : 'rgba(156,163,175,.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background .3s',
                }}>
                  {done ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill={P} />
                    </svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ animation: 'lockShimmer 3s infinite' }}>
                      <rect x="5" y="11" width="14" height="10" rx="2.5" stroke={GY} strokeWidth="1.7" />
                      <path d="M8 11V8a4 4 0 018 0v3" stroke={GY} strokeWidth="1.7" strokeLinecap="round" />
                      <circle cx="12" cy="15.5" r="1.3" fill={GY} />
                    </svg>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: done ? INK : INK2, fontFamily: "'Sora',sans-serif" }}>
                    Verification &amp; next tranche
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: done ? MUTED : GY, marginTop: 2, lineHeight: 1.4 }}>
                    {done ? 'Verification will begin shortly' : 'Unlocks after you mark payment as done.'}
                  </div>
                </div>
              </div>

              {!done && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 10, paddingTop: 9, borderTop: '1px solid ' + GY_BDR }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke={GY} strokeWidth="1.6" />
                    <path d="M12 11v5M12 7.5h.01" stroke={GY} strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span style={{ fontSize: 11, fontWeight: 500, color: GY }}>Complete Step 2 to continue</span>
                </div>
              )}

              {done && (
                <button onClick={function(){ go('success'); }} style={{
                  position: 'relative', width: '100%', height: 44, borderRadius: 13, border: 'none',
                  background: INK, color: '#fff', fontWeight: 700, fontSize: 14,
                  fontFamily: "'Sora',sans-serif",
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                  marginTop: 14, cursor: 'pointer', overflow: 'hidden',
                  boxShadow: '0 8px 22px -6px rgba(27,25,46,.35)',
                  transition: 'transform .1s', animation: 'fadeUp .3s both',
                }}
                  onMouseDown={function(e){ e.currentTarget.style.transform='scale(.975)'; }}
                  onMouseUp={function(e){ e.currentTarget.style.transform='scale(1)'; }}
                  onMouseLeave={function(e){ e.currentTarget.style.transform='scale(1)'; }}
                >
                  <span style={{ position: 'relative', zIndex: 1 }}>Continue</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ position: 'relative', zIndex: 1 }}>
                    <path d="M5 12h13m0 0l-4-4m4 4l-4 4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '16px 0 24px' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke={G} strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M9 12l2 2 4-4" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 11, fontWeight: 600, color: INK2 }}>Secure process</span>
          <span style={{ fontSize: 11, color: MUTED }}>·</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: INK2 }}>RBI regulated</span>
          <span style={{ fontSize: 11, color: MUTED }}>·</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: INK2 }}>Your data is safe</span>
        </div>
      </div>
    </div>
  );
}

window.PostDisbursal = PostDisbursal;
