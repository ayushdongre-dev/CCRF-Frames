// screen-journeycontinues.jsx — Journey Continues transition screen

function JourneyContinues({ go }) {
  var sora = { fontFamily: "'Sora',sans-serif" };
  var st = React.useState(false); var visible = st[0]; var setVisible = st[1];

  React.useEffect(function () {
    var t = setTimeout(function () { setVisible(true); }, 80);
    return function () { clearTimeout(t); };
  }, []);

  return (
    <div style={{
      minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(160deg, #16133A 0%, #26215C 55%, #1A2B4A 100%)',
      padding: '40px 28px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Ambient glow blobs */}
      <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(127,85,223,.22) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(31,169,113,.14) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Icon ring */}
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: 'rgba(255,255,255,.07)',
        border: '1.5px solid rgba(255,255,255,.14)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 28,
        boxShadow: '0 0 0 16px rgba(255,255,255,.03)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(.7)',
        transition: 'opacity .5s .1s, transform .5s .1s cubic-bezier(.34,1.56,.64,1)',
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Hero text */}
      <div style={{
        textAlign: 'center',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity .55s .22s, transform .55s .22s',
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,.42)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14, ...sora }}>
          Your journey
        </div>
        <div style={{ fontSize: 48, fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: -2, ...sora }}>
          continues.
        </div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,.45)', marginTop: 18, lineHeight: 1.6, maxWidth: 240, margin: '18px auto 0' }}>
          Phase 1 is complete. You're on your way to clearing your card.
        </div>
      </div>

      {/* CTA */}
      <div style={{
        marginTop: 52,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(14px)',
        transition: 'opacity .5s .45s, transform .5s .45s',
        width: '100%',
      }}>
        <button
          onClick={function () { go('home'); }}
          style={{
            width: '100%', height: 52, borderRadius: 15, border: 'none', cursor: 'pointer',
            background: 'rgba(255,255,255,.12)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,.2)',
            color: '#fff', fontWeight: 700, fontSize: 15, ...sora,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'background .15s, transform .12s',
          }}
          onMouseDown={function (e) { e.currentTarget.style.transform = 'scale(.975)'; }}
          onMouseUp={function (e) { e.currentTarget.style.transform = 'scale(1)'; }}
          onMouseLeave={function (e) { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          Continue
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  );
}

window.JourneyContinues = JourneyContinues;
