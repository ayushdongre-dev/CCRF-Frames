// screen-postdisbursal.jsx — Melt Dashboard  (3-state hub)
// pdState: 'action' | 'pending' | 'unlocked'

var G     = '#1FA971';
var G_DK  = '#178A5E';
var G_BG  = '#E7F7EF';
var G_BDR = '#A7E4C5';
var P     = '#5B5BD6';
var P_BG  = '#EFEEFE';
var P_BDR = '#C7C4F2';
var GY    = '#9CA3AF';
var GY_BG = '#F5F4FA';
var GY_BDR= '#E2E8F0';
var INK   = '#1B192E';
var INK2  = '#4B4960';
var MUTED = '#8A879B';
var LINE  = '#ECEAF4';

function fmtINR(n) {
  var s = String(Math.floor(n));
  if (s.length <= 3) return s;
  var last3 = s.slice(-3);
  var rest = s.slice(0, -3);
  var parts = [];
  while (rest.length > 2) { parts.unshift(rest.slice(-2)); rest = rest.slice(0, -2); }
  if (rest.length) parts.unshift(rest);
  return parts.join(',') + ',' + last3;
}

// ── Premium Melt offer hero card (unlocked state) ────────
function MeltHeroCard({ go, heroCount }) {
  return (
    <div style={{
      borderRadius: 22,
      background: 'linear-gradient(140deg,#8B5CF6 0%,#6D28D9 45%,#4F46E5 100%)',
      padding: '22px 20px 20px',
      marginBottom: 12,
      position: 'relative', overflow: 'hidden',
      boxShadow: '0 20px 48px -12px rgba(109,40,217,.45), 0 0 0 1px rgba(255,255,255,.1) inset',
      animation: 'popIn .45s both',
    }}>
      {/* Radial glow — top right */}
      <div style={{ position: 'absolute', top: -44, right: -44, width: 190, height: 190, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,255,255,.13) 0%,transparent 65%)', pointerEvents: 'none' }} />
      {/* Radial glow — bottom left */}
      <div style={{ position: 'absolute', bottom: -24, left: -14, width: 110, height: 110, borderRadius: '50%', background: 'radial-gradient(circle,rgba(167,139,250,.22) 0%,transparent 65%)', pointerEvents: 'none' }} />

      {/* Eyebrow */}
      <div style={{ fontSize: 11.5, fontWeight: 500, color: 'rgba(255,255,255,.6)', marginBottom: 10, letterSpacing: 0.2 }}>
        You are eligible for an exclusive offer
      </div>

      {/* MELT badge */}
      <div style={{ display: 'inline-block', background: 'rgba(255,255,255,.16)', border: '1px solid rgba(255,255,255,.28)', borderRadius: 999, padding: '3px 12px', fontSize: 10, fontWeight: 800, color: '#fff', letterSpacing: 1.2, marginBottom: 14 }}>
        MELT
      </div>

      {/* Amount count-up */}
      <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 44, fontWeight: 800, color: '#fff', lineHeight: 1, marginBottom: 6, letterSpacing: -1 }}>
        ₹{fmtINR(heroCount)}
      </div>

      {/* Headline */}
      <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,.82)', marginBottom: 20, lineHeight: 1.35 }}>
        Get ₹3,00,000 as your Melt Round 2
      </div>

      {/* Bottom row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.2)', borderRadius: 999, padding: '6px 14px', animation: 'popIn .3s .35s both' }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ADE80', animation: 'blink 2s ease-in-out infinite' }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>Unlocked</span>
        </div>
        <button
          onClick={function(){ go('reward'); }}
          style={{ background: '#fff', color: '#6D28D9', fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 14.5, border: 'none', borderRadius: 13, padding: '11px 22px', cursor: 'pointer', boxShadow: '0 4px 16px -4px rgba(0,0,0,.28)', transition: 'transform .12s', animation: 'popIn .35s .2s both', letterSpacing: 0.1 }}
          onMouseDown={function(e){ e.currentTarget.style.transform='scale(.96)'; }}
          onMouseUp={function(e){ e.currentTarget.style.transform='scale(1)'; }}
          onMouseLeave={function(e){ e.currentTarget.style.transform='scale(1)'; }}
        >
          Start Here →
        </button>
      </div>
    </div>
  );
}

// ── Dark loan summary card ───────────────────────────────
function LoanCard({ countVal, barFilled, showVerifiedBanner }) {
  var M = { color: 'rgba(255,255,255,.45)', fontSize: 10, fontWeight: 600, letterSpacing: 0.4, marginBottom: 2 };
  return (
    <div style={{
      borderRadius: 22,
      background: 'linear-gradient(145deg,#16133A,#26215C)',
      padding: '16px 18px',
      boxShadow: '0 16px 40px -12px rgba(22,19,58,.55)',
      animation: 'fadeUp .5s both',
      position: 'relative', overflow: 'hidden', marginBottom: 4,
    }}>
      <div style={{ position: 'absolute', top: -40, right: -40, width: 130, height: 130, borderRadius: '50%', background: 'radial-gradient(circle,rgba(91,91,214,.22) 0%,transparent 70%)', pointerEvents: 'none' }} />

      {/* Payment verified banner */}
      {showVerifiedBanner && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(31,169,113,.15)', border: '1px solid rgba(31,169,113,.28)', borderRadius: 10, padding: '7px 11px', marginBottom: 14, animation: 'fadeUp .3s .2s both' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 13l5 5L19 7" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#4ADE80' }}>Your payment has been verified successfully</span>
        </div>
      )}

      {/* Account row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,.38)', letterSpacing: 0.5, marginBottom: 2 }}>LOAN ACCOUNT</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,.88)', letterSpacing: 1.5, fontFamily: 'monospace' }}>CCRF ···· ···· 4521</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(31,169,113,.18)', border: '1px solid rgba(31,169,113,.3)', borderRadius: 999, padding: '4px 10px' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: G, animation: 'blink 2s ease-in-out infinite' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: G, fontFamily: "'Sora',sans-serif" }}>Active</span>
        </div>
      </div>

      {/* Stats 2×2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 0', marginBottom: 14 }}>
        {[
          { label: 'LOAN AMOUNT',  value: '₹2,00,000',  hl: false },
          { label: 'EMI AMOUNT',   value: '₹18,810/mo', hl: false },
          { label: 'OUTSTANDING',  value: '₹' + fmtINR(Math.max(0, 228000 - Math.round(countVal * 228000 / 200000))), hl: true },
          { label: 'TENURE',       value: '15 months',   hl: false },
        ].map(function(s, i) {
          return (
            <div key={i} style={{ paddingRight: i % 2 === 0 ? 12 : 0, borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,.07)' : 'none' }}>
              <div style={M}>{s.label}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: s.hl ? '#FCD34D' : '#fff', fontFamily: "'Sora',sans-serif", lineHeight: 1.1 }}>{s.value}</div>
            </div>
          );
        })}
      </div>

      {/* EMI progress */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ background: 'rgba(255,255,255,.1)', borderRadius: 999, height: 5, overflow: 'hidden' }}>
          <div style={{ height: '100%', borderRadius: 999, background: 'linear-gradient(90deg,' + G + ',#38D988)', width: '20%', transformOrigin: 'left', animation: barFilled ? 'barFillH 1.1s .3s ease-out both' : 'none' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
          <span style={{ fontSize: 10.5, fontWeight: 600, color: 'rgba(255,255,255,.5)' }}>3 of 15 EMIs paid</span>
          <span style={{ fontSize: 10.5, fontWeight: 700, color: G }}>20%</span>
        </div>
      </div>

      {/* Next EMI */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid rgba(255,255,255,.07)' }}>
        <div style={{ fontSize: 10.5, fontWeight: 600, color: 'rgba(255,255,255,.4)' }}>Next EMI due</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: '#fff', fontFamily: "'Sora',sans-serif" }}>₹18,810</span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,.3)' }}>·</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,.55)' }}>04/08/2026</span>
        </div>
      </div>
    </div>
  );
}

// ── Tag pill ─────────────────────────────────────────────
function Tag({ label, color, bg, border }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: bg, border: '1px solid ' + border, borderRadius: 999, padding: '2px 9px' }}>
      <div style={{ width: 5, height: 5, borderRadius: '50%', background: color, flexShrink: 0 }} />
      <span style={{ fontSize: 9, fontWeight: 800, color: color, letterSpacing: 0.6, fontFamily: "'Sora',sans-serif" }}>{label}</span>
    </div>
  );
}

// ── Dashed connector segment ─────────────────────────────
function Connector({ color }) {
  var dash = 'repeating-linear-gradient(to bottom,' + color + ' 0,' + color + ' 4px,transparent 4px,transparent 9px)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, paddingTop: 3, paddingBottom: 2, transformOrigin: 'top', animation: 'lineGrow .5s .7s both' }}>
      <div style={{ width: 2, height: 8, backgroundImage: dash, borderRadius: 9 }} />
      <div style={{ width: 5, height: 5, background: color, transform: 'rotate(45deg)', margin: '2px 0', flexShrink: 0, borderRadius: 1 }} />
      <div style={{ width: 2, flex: 1, backgroundImage: dash, borderRadius: 9 }} />
    </div>
  );
}

// ── Main component ───────────────────────────────────────
function PostDisbursal({ go, pdState, setPdState }) {
  var pdst     = pdState || 'action';
  var action   = pdst === 'action';
  var pending  = pdst === 'pending';
  var unlocked = pdst === 'unlocked';

  var aphst = useState('init');  var animPhase = aphst[0]; var setAnimPhase = aphst[1];
  var cvst  = useState(0);       var countVal  = cvst[0];  var setCountVal  = cvst[1];
  var snst  = useState(0);       var shimmerN  = snst[0];  var setShimmerN  = snst[1];
  var bfst  = useState(false);   var barFilled = bfst[0];  var setBarFilled = bfst[1];
  var hcst  = useState(0);       var heroCount = hcst[0];  var setHeroCount = hcst[1];
  var hrst  = useRef(false);

  useEffect(function() {
    var t = setTimeout(function() { setBarFilled(true); }, 400);
    return function() { clearTimeout(t); };
  }, []);

  useEffect(function() {
    var outer = setTimeout(function() {
      var startTs = null;
      function step(ts) {
        if (!startTs) startTs = ts;
        var p = Math.min((ts - startTs) / 800, 1);
        var e = 1 - Math.pow(1 - p, 3);
        setCountVal(Math.round(e * 200000));
        if (p < 1) { requestAnimationFrame(step); } else { setCountVal(200000); }
      }
      requestAnimationFrame(step);
    }, 1200);
    return function() { clearTimeout(outer); };
  }, []);

  useEffect(function() {
    var t = setTimeout(function() { setAnimPhase('active'); }, 2400);
    return function() { clearTimeout(t); };
  }, []);

  useEffect(function() {
    if (animPhase !== 'active' || !action) return;
    var t = setInterval(function() { setShimmerN(function(n) { return n + 1; }); }, 7000);
    return function() { clearInterval(t); };
  }, [animPhase, pdst]);

  // Hero count-up (₹1,25,000) — fires once on unlock
  useEffect(function() {
    if (!unlocked || hrst.current) return;
    hrst.current = true;
    var startTs = null;
    function step(ts) {
      if (!startTs) startTs = ts;
      var p = Math.min((ts - startTs) / 1200, 1);
      var e = 1 - Math.pow(1 - p, 3);
      setHeroCount(Math.round(e * 300000));
      if (p < 1) { requestAnimationFrame(step); } else { setHeroCount(300000); }
    }
    requestAnimationFrame(step);
  }, [unlocked]);

  var sora = { fontFamily: "'Sora',sans-serif" };

  // ════════════════════════════════════════════════════════
  // UNLOCKED STATE — premium offer layout
  // ════════════════════════════════════════════════════════
  if (unlocked) {
    return (
      <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#F4F3FB', animation: 'fadeIn .2s' }}>
        {/* Header */}
        <div style={{ padding: '10px 16px 6px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <button onClick={function(){ go('revisedoffer'); }} style={{ width: 34, height: 34, borderRadius: 999, border: '1.5px solid ' + LINE, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: INK, ...sora, lineHeight: 1.1 }}>Melt Dashboard</div>
            <div style={{ fontSize: 11.5, fontWeight: 500, color: G, marginTop: 1 }}>Offer unlocked — take your next step</div>
          </div>
        </div>

        <div className="scr" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '4px 16px 28px' }}>

          {/* 1 — HERO CARD */}
          <MeltHeroCard go={go} heroCount={heroCount} />

          {/* 2 — LOAN DETAILS */}
          <LoanCard countVal={countVal} barFilled={barFilled} showVerifiedBanner={true} />

          {/* 3 — JOURNEY SECTION */}
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: INK, ...sora, letterSpacing: -0.1, marginBottom: 14, animation: 'fadeUp .4s .4s both' }}>
              Your Melt Journey
            </div>

            {/* Step 1 — Tranche 1 Disbursed */}
            <div style={{ display: 'flex', gap: 10, animation: 'fadeUp .35s .5s both' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 28, flexShrink: 0, paddingTop: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: 999, background: G, border: '2px solid ' + G, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 10px -3px rgba(31,169,113,.4)', flexShrink: 0 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 13l5 5L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <Connector color={G} />
              </div>
              <div style={{ flex: 1, borderRadius: 16, padding: '11px 13px 13px', marginBottom: 6, background: '#fff', border: '1.5px solid ' + G_BDR }}>
                <div style={{ marginBottom: 6 }}><Tag label="COMPLETED" color={G} bg={G_BG} border={G_BDR} /></div>
                <div style={{ fontWeight: 700, fontSize: 13.5, color: INK, ...sora, marginBottom: 4 }}>Round 1 Disbursed</div>
                <div style={{ fontSize: 11.5, color: INK2, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontWeight: 800, color: G }}>₹2,00,000</span>
                  <span style={{ color: LINE }}>·</span>
                  <span>20 May 2025</span>
                </div>
              </div>
            </div>

            {/* Step 2 — Payment Verified */}
            <div style={{ display: 'flex', gap: 10, animation: 'fadeUp .35s .65s both' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 28, flexShrink: 0, paddingTop: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: 999, background: G, border: '2px solid ' + G, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 10px -3px rgba(31,169,113,.4)', flexShrink: 0 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 13l5 5L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <Connector color={G} />
              </div>
              <div style={{ flex: 1, borderRadius: 16, padding: '11px 13px 13px', marginBottom: 6, background: '#fff', border: '1.5px solid ' + G_BDR }}>
                <div style={{ marginBottom: 6 }}><Tag label="COMPLETED" color={G} bg={G_BG} border={G_BDR} /></div>
                <div style={{ fontWeight: 700, fontSize: 13.5, color: INK, ...sora, marginBottom: 4 }}>Payment Verified</div>
                <div style={{ fontSize: 11.5, color: INK2, lineHeight: 1.4 }}>
                  Your card payment has been successfully verified.
                </div>
              </div>
            </div>

            {/* Step 3 — Extra Melt Tranche (active unlocked) */}
            <div style={{ display: 'flex', gap: 10, animation: 'fadeUp .35s .8s both' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 28, flexShrink: 0, paddingTop: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: 999, background: '#fff', border: '2px solid ' + G, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 14px -3px rgba(31,169,113,.35)', flexShrink: 0, animation: 'nodePulseGentle 2s .8s ease-in-out infinite' }}>
                  {/* Open lock */}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <rect x="5" y="11" width="14" height="10" rx="2" stroke={G} strokeWidth="1.9" />
                    <path d="M8 11V7a4 4 0 015.8-3.5" stroke={G} strokeWidth="1.9" strokeLinecap="round" />
                    <circle cx="12" cy="15.5" r="1.3" fill={G} />
                  </svg>
                </div>
              </div>
              <div style={{
                flex: 1, borderRadius: 16, padding: '14px 14px 16px',
                background: '#fff',
                border: '2px solid ' + G,
                boxShadow: '0 0 0 4px rgba(31,169,113,.06), 0 10px 28px -8px rgba(31,169,113,.2)',
              }}>
                <div style={{ marginBottom: 8 }}><Tag label="UNLOCKED" color={G} bg={G_BG} border={G_BDR} /></div>
                <div style={{ fontWeight: 800, fontSize: 15, color: INK, ...sora, marginBottom: 4 }}>Round 2 Available</div>
                <div style={{ fontWeight: 800, fontSize: 26, color: G, ...sora, lineHeight: 1, marginBottom: 6 }}>₹3,00,000</div>
                <div style={{ fontSize: 12.5, color: INK2, lineHeight: 1.4, marginBottom: 14 }}>
                  You've unlocked ₹3,00,000 for Round 2. Tap below to claim your offer.
                </div>
                <button
                  onClick={function(){ go('reward'); }}
                  style={{ width: '100%', height: 46, borderRadius: 13, border: 'none', background: G, color: '#fff', fontWeight: 800, fontSize: 14, ...sora, cursor: 'pointer', boxShadow: '0 8px 22px -6px rgba(31,169,113,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, transition: 'transform .12s' }}
                  onMouseDown={function(e){ e.currentTarget.style.transform='scale(.975)'; }}
                  onMouseUp={function(e){ e.currentTarget.style.transform='scale(1)'; }}
                  onMouseLeave={function(e){ e.currentTarget.style.transform='scale(1)'; }}
                >
                  Continue →
                </button>
              </div>
            </div>
          </div>

          {/* Trust strip */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: 20, paddingTop: 12, borderTop: '1px solid ' + LINE }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke={G} strokeWidth="1.8" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span style={{ fontSize: 10.5, fontWeight: 600, color: INK2 }}>Secure</span>
            <span style={{ fontSize: 10.5, color: MUTED }}>·</span>
            <span style={{ fontSize: 10.5, fontWeight: 600, color: INK2 }}>RBI regulated</span>
            <span style={{ fontSize: 10.5, color: MUTED }}>·</span>
            <span style={{ fontSize: 10.5, fontWeight: 600, color: INK2 }}>Data safe</span>
          </div>
        </div>

        {/* Sticky primary CTA */}
        <BottomBar>
          <button
            onClick={function(){ go('reward'); }}
            style={{ width: '100%', height: 52, borderRadius: 15, border: 'none', cursor: 'pointer', background: G, color: '#fff', fontWeight: 800, fontSize: 15.5, ...sora, boxShadow: '0 10px 28px -8px rgba(31,169,113,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'transform .12s' }}
            onMouseDown={function(e){ e.currentTarget.style.transform='scale(.975)'; }}
            onMouseUp={function(e){ e.currentTarget.style.transform='scale(1)'; }}
            onMouseLeave={function(e){ e.currentTarget.style.transform='scale(1)'; }}
          >
            Start Here →
          </button>
        </BottomBar>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════
  // ACTION / PENDING STATE — standard dashboard
  // ════════════════════════════════════════════════════════
  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#F4F3FB', animation: 'fadeIn .2s' }}>
      <div style={{ padding: '10px 16px 6px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <button onClick={function(){ go('revisedoffer'); }} style={{ width: 34, height: 34, borderRadius: 999, border: '1.5px solid ' + LINE, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: INK, ...sora, lineHeight: 1.1 }}>Melt Dashboard</div>
          <div style={{ fontSize: 11.5, fontWeight: 500, color: MUTED, marginTop: 1 }}>Track your loan &amp; clear dues</div>
        </div>
      </div>

      <div className="scr" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '4px 16px 24px' }}>
        <LoanCard countVal={countVal} barFilled={barFilled} showVerifiedBanner={false} />

        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: INK, ...sora, letterSpacing: -0.1, marginBottom: 12, animation: 'fadeUp .4s .4s both' }}>
            Your melt journey
          </div>

          {/* Step 1 */}
          <div style={{ display: 'flex', gap: 10, animation: 'fadeUp .4s .6s both' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 28, flexShrink: 0, paddingTop: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 999, background: G, border: '2px solid ' + G, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 10px -3px rgba(31,169,113,.45)', flexShrink: 0 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 13l5 5L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <Connector color={LINE} />
            </div>
            <div style={{ flex: 1, borderRadius: 16, padding: '11px 13px 12px', marginBottom: 5, background: '#fff', border: '1.5px solid ' + G_BDR }}>
              <div style={{ marginBottom: 7 }}><Tag label="COMPLETED" color={G} bg={G_BG} border={G_BDR} /></div>
              <div style={{ fontWeight: 700, fontSize: 13.5, color: INK, ...sora }}>Round 1 disbursed</div>
              <div style={{ fontSize: 11.5, fontWeight: 500, color: INK2, marginTop: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontWeight: 700, color: G }}>₹{countVal === 0 ? '—' : fmtINR(countVal)}</span>
                <span style={{ color: LINE }}>·</span>
                <span>20 May 2025, 10:30 AM</span>
              </div>
            </div>
          </div>

          {/* Step 2 — Action / Pending */}
          <div style={{ display: 'flex', gap: 10, animation: 'fadeUp .4s 1s both' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 28, flexShrink: 0, paddingTop: 12 }}>
              <div style={{ animation: animPhase === 'active' && action ? 'nodePulse .3s ease-out both, nodePulseGentle 1.5s .5s ease-in-out infinite' : 'none' }}>
                <div style={{ width: 28, height: 28, borderRadius: 999, background: '#fff', border: '2px solid ' + P, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 12px -3px rgba(91,91,214,.38)' }}>
                  {pending
                    ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin .9s linear infinite' }}><circle cx="12" cy="12" r="8" stroke="rgba(91,91,214,.25)" strokeWidth="2.5" /><path d="M12 4a8 8 0 018 8" stroke={P} strokeWidth="2.5" strokeLinecap="round" /></svg>
                    : <span style={{ fontSize: 11, fontWeight: 800, color: P, lineHeight: 1, ...sora }}>2</span>
                  }
                </div>
              </div>
              <div style={{ width: 2, flex: 1, background: LINE, borderRadius: 9, marginTop: 3, marginBottom: 2 }} />
            </div>
            <div style={{ flex: 1, borderRadius: 16, padding: '11px 13px 13px', marginBottom: 5, background: '#fff', border: '1.5px dashed ' + P_BDR, boxShadow: animPhase === 'active' && action ? '0 4px 28px -6px rgba(91,91,214,.3)' : '0 3px 18px -6px rgba(91,91,214,.12)', transition: 'box-shadow .5s' }}>
              <div style={{ marginBottom: 7 }}>
                {pending
                  ? <Tag label="VERIFYING" color={MUTED} bg={GY_BG} border={GY_BDR} />
                  : <Tag label="ACTION REQUIRED" color={P} bg={P_BG} border={P_BDR} />
                }
              </div>
              <div style={{ fontWeight: 700, fontSize: 13.5, color: INK, ...sora }}>
                {pending ? 'Verification in progress' : 'Pay your card'}
              </div>
              <div style={{ fontSize: 11.5, fontWeight: 500, color: MUTED, marginTop: 3, lineHeight: 1.4 }}>
                {pending
                  ? "We're reviewing your card payment. We'll notify you the moment your offer unlocks."
                  : 'Settle your outstanding dues to proceed.'}
              </div>
              {action && (
                <React.Fragment>
                  <button onClick={function(){ go('claim'); }} style={{ position: 'relative', width: '100%', height: 42, borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,' + P + ',#4F46E5)', color: '#fff', fontWeight: 700, fontSize: 13.5, ...sora, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 12, cursor: 'pointer', overflow: 'hidden', boxShadow: '0 8px 22px -6px rgba(91,91,214,.45)', transition: 'transform .1s' }}
                    onMouseDown={function(e){ e.currentTarget.style.transform='scale(.975)'; }}
                    onMouseUp={function(e){ e.currentTarget.style.transform='scale(1)'; }}
                    onMouseLeave={function(e){ e.currentTarget.style.transform='scale(1)'; }}
                  >
                    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 12 }}>
                      <div key={shimmerN} style={{ position: 'absolute', top: 0, left: 0, width: '45%', height: '100%', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent)', animation: shimmerN === 0 ? 'shimmer .8s 2.6s both' : 'shimmer .8s both' }} />
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ position: 'relative', zIndex: 1 }}><path d="M5 13l5 5L19 7" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <span style={{ position: 'relative', zIndex: 1 }}>Mark as Done</span>
                  </button>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 7 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke={MUTED} strokeWidth="1.6" strokeLinejoin="round" /></svg>
                    <span style={{ fontSize: 10.5, fontWeight: 500, color: MUTED }}>We'll verify after you mark</span>
                  </div>
                </React.Fragment>
              )}
              {pending && (
                <button onClick={function(){ go('verifying'); }} style={{ width: '100%', height: 40, borderRadius: 12, marginTop: 10, cursor: 'pointer', background: 'none', border: '1.5px solid ' + P_BDR, color: P, fontWeight: 700, fontSize: 13, ...sora, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1.2s linear infinite' }}><circle cx="12" cy="12" r="8" stroke="rgba(91,91,214,.25)" strokeWidth="2" /><path d="M12 4a8 8 0 018 8" stroke={P} strokeWidth="2" strokeLinecap="round" /></svg>
                  Check status
                </button>
              )}
            </div>
          </div>

          {/* Step 3 — Locked */}
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 28, flexShrink: 0, paddingTop: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 999, background: GY, border: '2px solid ' + GY, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="10" rx="2.5" stroke="#fff" strokeWidth="1.8" /><path d="M8 11V8a4 4 0 018 0v3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" /><circle cx="12" cy="15.5" r="1.2" fill="#fff" /></svg>
              </div>
            </div>
            <div style={{ flex: 1, borderRadius: 16, padding: '11px 13px 13px', background: GY_BG, border: '1.5px solid ' + GY_BDR, opacity: 0.55 }}>
              <div style={{ marginBottom: 7 }}><Tag label="LOCKED" color={GY} bg={GY_BG} border={GY_BDR} /></div>
              <div style={{ fontWeight: 700, fontSize: 13.5, color: INK2, ...sora }}>Verification &amp; Round 2</div>
              <div style={{ fontSize: 11.5, fontWeight: 500, color: GY, marginTop: 3 }}>Unlocks after step 2 is complete.</div>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: 16, paddingTop: 12, borderTop: '1px solid ' + LINE }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke={G} strokeWidth="1.8" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span style={{ fontSize: 10.5, fontWeight: 600, color: INK2 }}>Secure</span>
          <span style={{ fontSize: 10.5, color: MUTED }}>·</span>
          <span style={{ fontSize: 10.5, fontWeight: 600, color: INK2 }}>RBI regulated</span>
          <span style={{ fontSize: 10.5, color: MUTED }}>·</span>
          <span style={{ fontSize: 10.5, fontWeight: 600, color: INK2 }}>Data safe</span>
        </div>
      </div>
    </div>
  );
}

window.PostDisbursal = PostDisbursal;
