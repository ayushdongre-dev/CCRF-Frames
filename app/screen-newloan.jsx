// screen-newloan.jsx — B3 "Your New Loan" (Tranche 2 top-up selection)

var NL = {
  OUTSTANDING: 128400,
  NEW_MAX: 125000,
  NEW_MIN: 25000,
  STEP: 5000,
};

function fmtNL(n) {
  var s = String(Math.floor(n));
  if (s.length <= 3) return s;
  var last3 = s.slice(-3);
  var rest = s.slice(0, -3);
  var parts = [];
  while (rest.length > 2) { parts.unshift(rest.slice(-2)); rest = rest.slice(0, -2); }
  if (rest.length) parts.unshift(rest);
  return parts.join(',') + ',' + last3;
}

function shortNL(v) {
  if (v >= 100000) { var l = v / 100000; return '₹' + (Number.isInteger(l) ? l : l.toFixed(2)) + 'L'; }
  return '₹' + Math.round(v / 1000) + 'K';
}

// ── Linear drag slider ───────────────────────────────────
function LinearSlider({ value, min, max, step, onChange }) {
  var rr = useRef(null);
  var dst = useState(false); var dragging = dst[0]; var setDragging = dst[1];
  var pct = (value - min) / (max - min);

  function updateFromClientX(clientX) {
    var el = rr.current; if (!el) return;
    var rect = el.getBoundingClientRect();
    var frac = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    var v = Math.round((min + frac * (max - min)) / step) * step;
    v = Math.max(min, Math.min(max, v));
    if (v !== value) onChange(v);
  }

  useEffect(function() {
    if (!dragging) return;
    function mv(e) { var t = e.touches ? e.touches[0] : e; updateFromClientX(t.clientX); e.preventDefault(); }
    function up() { setDragging(false); }
    window.addEventListener('pointermove', mv, { passive: false });
    window.addEventListener('pointerup', up);
    return function() { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); };
  }, [dragging, value, min, max, step]);

  return (
    <div ref={rr} style={{ position: 'relative', height: 30, cursor: 'pointer', touchAction: 'none', userSelect: 'none' }}
      onPointerDown={function(e) { setDragging(true); updateFromClientX(e.clientX); }}>
      {/* Track */}
      <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%', height: 6, borderRadius: 999, background: '#ECEAF4' }} />
      {/* Fill */}
      <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: (pct * 100) + '%', height: 6, borderRadius: 999, background: 'var(--primary)' }} />
      {/* Thumb */}
      <div style={{
        position: 'absolute', top: '50%',
        left: (pct * 100) + '%',
        transform: 'translate(-50%, -50%)',
        width: 24, height: 24, borderRadius: 999,
        background: '#fff', border: '3px solid var(--primary)',
        boxShadow: '0 4px 12px -3px rgba(127,85,223,.55)',
        transition: dragging ? 'none' : 'left .05s',
      }} />
    </div>
  );
}

// ── Main screen ───────────────────────────────────────────
function NewLoanScreen({ go }) {
  var est = useState(NL.NEW_MAX); var extra = est[0]; var setExtra = est[1];
  var newLoanAmt = NL.OUTSTANDING + extra;
  var ink   = '#1B192E';
  var ink2  = '#4B4960';
  var muted = '#8A879B';
  var G     = '#1FA971';
  var sora  = { fontFamily: "'Sora',sans-serif" };

  var STEPS_HIW = [
    { title: 'Choose your amount', body: "Pick an amount between ₹25K and ₹1.25L — we'll show you EMI options next." },
    { title: 'We handle your old balance', body: 'The ₹1,28,400 you still owe gets rolled into the new loan automatically.' },
    { title: 'Money lands in your account', body: 'The extra cash is sent to your bank account, usually within minutes.' },
    { title: 'Fresh start, one loan', body: 'Old Melt loan closes. New loan = ₹1,28,400 outstanding + ₹' + fmtNL(extra) + ' extra = ₹' + fmtNL(newLoanAmt) + '.' },
  ];

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff', animation: 'fadeIn .25s' }}>
      {/* Header */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 16px 10px', flexShrink: 0 }}>
        <button onClick={function(){ go('postdisbursal'); }} style={{ position: 'absolute', left: 16, top: 5, width: 38, height: 38, borderRadius: 999, border: '1.5px solid #C7C4F2', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 11l9-7 9 7" stroke="#5B5BD6" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 9.5V20h5v-5h4v5h5V9.5" stroke="#5B5BD6" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#1E293B', letterSpacing: 0.5, ...sora }}>EQUALL</div>
          <div style={{ fontSize: 9.5, fontWeight: 500, color: '#94A3B8', marginTop: 1 }}>A brand of LTCV Credit</div>
        </div>
        <button style={{ position: 'absolute', right: 16, top: 10, fontSize: 11, fontWeight: 700, color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer' }}>HELP</button>
      </div>

      <div className="scr" style={{ flex: 1, overflowY: 'auto', padding: '0 20px 8px' }}>
        {/* Title */}
        <div style={{ fontWeight: 800, fontSize: 24, color: ink, ...sora, lineHeight: 1.05, marginBottom: 8 }}>Your New Loan</div>

        {/* Green banner */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--green-l)', border: '1px solid #A7E4C5', borderRadius: 12, padding: '9px 14px', marginBottom: 14 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" fill={G} /></svg>
          <span style={{ fontSize: 13, fontWeight: 700, color: G }}>You paid on time — you have earned this</span>
        </div>

        {/* Subheading */}
        <div style={{ fontSize: 13, color: muted, marginBottom: 10 }}>How much extra cash do you need?</div>

        {/* Slider card */}
        <div style={{ background: 'var(--primary-l)', borderRadius: 18, padding: '16px', marginBottom: 12, border: '1.5px solid #C7C4F2' }}>
          {/* Amount display */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 14 }}>
            <span style={{ fontWeight: 800, fontSize: 32, color: ink, ...sora, lineHeight: 1 }}>₹{fmtNL(extra)}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)', background: '#fff', borderRadius: 999, padding: '3px 11px', border: '1.5px solid #C7C4F2', cursor: 'pointer' }}>Edit</span>
          </div>

          <LinearSlider value={extra} min={NL.NEW_MIN} max={NL.NEW_MAX} step={NL.STEP} onChange={setExtra} />

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: muted, marginTop: 6, marginBottom: 14 }}>
            <span>₹25K</span>
            <span>← Drag to choose →</span>
            <span>₹1.25L</span>
          </div>

          {/* Borrow row */}
          <div style={{ borderTop: '1px solid rgba(127,85,223,.15)', paddingTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, color: muted, letterSpacing: 0.5, marginBottom: 3 }}>YOU CURRENTLY OWE</div>
              <div style={{ fontWeight: 800, fontSize: 17, color: ink, ...sora }}>₹{fmtNL(NL.OUTSTANDING)}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 999, background: 'rgba(255,255,255,.7)', border: '1px solid #C7C4F2' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: muted, letterSpacing: 0.5, marginBottom: 3 }}>YOU ARE BORROWING</div>
              <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--primary)', ...sora }}>₹{fmtNL(extra)}</div>
            </div>
          </div>
        </div>

        {/* New loan total row */}
        <div style={{ background: 'linear-gradient(135deg,var(--primary),#4F46E5)', borderRadius: 14, padding: '13px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,.7)', marginBottom: 2 }}>Your new loan amount</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)' }}>₹{fmtNL(NL.OUTSTANDING)} + ₹{fmtNL(extra)}</div>
          </div>
          <div style={{ fontWeight: 800, fontSize: 22, color: '#fff', ...sora }}>₹{fmtNL(newLoanAmt)}</div>
        </div>

        {/* Info note */}
        <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start', background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 12, padding: '11px 13px', marginBottom: 18 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="9" stroke="var(--muted)" strokeWidth="1.8" /><path d="M12 11v5M12 7.5h.01" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" /></svg>
          <span style={{ fontSize: 12, color: ink2, lineHeight: 1.5 }}>
            ₹{fmtNL(extra)} will be sent to your bank. Your existing Melt loan closes and a new account is created with a total of ₹{fmtNL(newLoanAmt)}.
          </span>
        </div>

        {/* How it works */}
        <div style={{ fontWeight: 800, fontSize: 15, color: ink, ...sora, marginBottom: 12 }}>How it works</div>
        {STEPS_HIW.map(function(s, i) {
          return (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <div style={{ width: 26, height: 26, borderRadius: 999, background: 'var(--primary)', color: '#fff', fontWeight: 800, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1, ...sora }}>
                {i + 1}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13.5, color: ink, marginBottom: 3 }}>{s.title}</div>
                <div style={{ fontSize: 12.5, color: muted, lineHeight: 1.4 }}>{s.body}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTAs */}
      <BottomBar>
        <button onClick={function(){ go('revisedoffer'); }} style={{
          width: '100%', height: 52, borderRadius: 15, border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg,var(--primary),#4F46E5)',
          color: '#fff', fontWeight: 700, fontSize: 15, ...sora,
          boxShadow: '0 10px 24px -8px rgba(127,85,223,.5)', marginBottom: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'transform .1s',
        }}
          onMouseDown={function(e){ e.currentTarget.style.transform='scale(.975)'; }}
          onMouseUp={function(e){ e.currentTarget.style.transform='scale(1)'; }}
          onMouseLeave={function(e){ e.currentTarget.style.transform='scale(1)'; }}
        >
          Select EMI &amp; Tenure
        </button>
        <button style={{ width: '100%', height: 44, borderRadius: 13, border: '1.5px solid var(--line)', background: '#fff', color: 'var(--primary)', fontWeight: 600, fontSize: 13.5, cursor: 'pointer' }}>
          View Details
        </button>
      </BottomBar>
    </div>
  );
}

window.NewLoanScreen = NewLoanScreen;
