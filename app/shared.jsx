// shared.jsx — brand primitives, bank logos, icons, phone frame
// Exposed on window for the other screen files.
const { useState, useEffect, useRef, useCallback, useMemo } = React;

// ── Indian number formatting ──────────────────────────────────
function inr(n, withSym = true) {
  if (n == null || isNaN(n)) return '';
  const neg = n < 0;
  const s = Math.round(Math.abs(n)).toString();
  let out;
  if (s.length <= 3) out = s;
  else {
    const last3 = s.slice(-3);
    let rest = s.slice(0, -3);
    rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    out = rest + ',' + last3;
  }
  return (neg ? '-' : '') + (withSym ? '₹' : '') + out;
}
// compact lakh form: 150000 -> ₹1.5L
function lakh(n) {
  if (n >= 10000000) return '₹' + (n / 10000000).toFixed(n % 10000000 ? 2 : 0).replace(/\.00$/, '') + 'Cr';
  if (n >= 100000) return '₹' + (n / 100000).toFixed(n % 100000 ? 1 : 0).replace(/\.0$/, '') + 'L';
  if (n >= 1000) return '₹' + Math.round(n / 1000) + 'K';
  return '₹' + n;
}

// ── Brand bank marks (stylised, brand-coloured) ──────────────
const BANKS = {
  FEDERAL: { name: 'FEDERAL BANK', short: 'Federal', bg: '#FDB913', fg: '#0B2C6F', mono: 'F' },
  HDFC: { name: 'HDFC BANK', short: 'HDFC', bg: '#004C8F', fg: '#ED232A', mono: 'H' },
  ICICI: { name: 'ICICI BANK', short: 'ICICI', bg: '#AE282E', fg: '#F58220', mono: 'I' },
  AXIS: { name: 'AXIS BANK', short: 'Axis', bg: '#97144D', fg: '#ED1C24', mono: 'A' },
  SBI: { name: 'SBI CARD', short: 'SBI', bg: '#22409A', fg: '#fff', mono: 'S' },
  IDFC: { name: 'IDFC FIRST', short: 'IDFC', bg: '#9C1D26', fg: '#E4002B', mono: 'I' },
};

function BankLogo({ id, size = 34, show = true }) {
  const b = BANKS[id] || BANKS.HDFC;
  if (!show) {
    return (
      <div style={{
        width: size, height: size, borderRadius: 9, flexShrink: 0,
        background: 'var(--primary-l)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="8" width="18" height="12" rx="2.5" stroke="var(--primary)" strokeWidth="2" />
          <path d="M3 11h18" stroke="var(--primary)" strokeWidth="2" />
        </svg>
      </div>
    );
  }
  // brand-coloured glyph badge
  return (
    <div style={{
      width: size, height: size, borderRadius: 9, flexShrink: 0, overflow: 'hidden',
      background: b.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.04)',
    }}>
      <span style={{
        fontWeight: 800, fontSize: size * 0.5, color: b.fg, lineHeight: 1, letterSpacing: -0.5,
      }}>{b.mono}</span>
      <span style={{
        position: 'absolute', right: 3, bottom: 3, width: size * 0.18, height: size * 0.18,
        borderRadius: 2, background: b.fg, opacity: 0.9,
      }} />
    </div>
  );
}

// ── Equall wordmark ──────────────────────────────────────────
function EquallMark({ center = true, light = false }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', lineHeight: 1 }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 17L8 9l4 5 3-7 3 10" stroke="url(#eg)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <defs><linearGradient id="eg" x1="3" y1="3" x2="21" y2="21"><stop stopColor="#7F55DF" /><stop offset="1" stopColor="#20BFB4" /></linearGradient></defs>
        </svg>
        <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: 1, color: light ? '#fff' : 'var(--ink)' }}>EQUALL</span>
      </div>
      <div style={{ fontSize: 10, fontWeight: 500, color: light ? 'rgba(255,255,255,.7)' : 'var(--muted)', marginTop: 2 }}>
        A brand of <b style={{ color: light ? '#fff' : 'var(--ink-2)' }}>LTCV Credit</b>
      </div>
    </div>
  );
}

// ── Icons ─────────────────────────────────────────────────────
const Icon = {
  back: (c = 'var(--ink)') => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  chevR: (c = 'var(--muted)', s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  chevD: (c = 'var(--primary)') => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 9l7 7 7-7" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  check: (c = '#fff', s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7.5" stroke={c} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  help: (c = 'var(--primary)') => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="2" /><path d="M9.5 9.5a2.5 2.5 0 113.2 2.4c-.7.3-1.2.9-1.2 1.6v.5" stroke={c} strokeWidth="2" strokeLinecap="round" /><circle cx="11.5" cy="17" r="1.1" fill={c} /></svg>,
  cash: (c = 'var(--primary)') => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2.5" y="6" width="19" height="12" rx="2.5" stroke={c} strokeWidth="2" /><circle cx="12" cy="12" r="2.6" stroke={c} strokeWidth="2" /></svg>,
  relief: (c = 'var(--green)') => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2.5" y="5" width="19" height="13" rx="2.5" stroke={c} strokeWidth="2" /><path d="M2.5 9.5h19" stroke={c} strokeWidth="2" /><path d="M6 14.5h5" stroke={c} strokeWidth="2" strokeLinecap="round" /></svg>,
  bolt: (c = 'var(--primary)', s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill={c} /></svg>,
  shield: (c = 'var(--primary)') => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke={c} strokeWidth="2" strokeLinejoin="round" /></svg>,
  upload: (c = 'var(--primary)') => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 15V5m0 0L8 9m4-4l4 4" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 16v2a2 2 0 002 2h10a2 2 0 002-2v-2" stroke={c} strokeWidth="2" strokeLinecap="round" /></svg>,
  doc: (c = 'var(--primary)') => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 3h8l4 4v14a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" stroke={c} strokeWidth="2" strokeLinejoin="round" /><path d="M14 3v4h4" stroke={c} strokeWidth="2" strokeLinejoin="round" /></svg>,
  clock: (c = 'var(--muted)') => <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="2" /><path d="M12 7v5l3 2" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  cards2: (c = 'var(--primary)') => <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="14" height="10" rx="2" stroke={c} strokeWidth="2" /><path d="M7 7V5h14v10h-2" stroke={c} strokeWidth="2" /></svg>,
  sliders: (c = 'var(--primary)', s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 21V14M5 10V3M12 21v-9M12 8V3M19 21v-5M19 12V3" stroke={c} strokeWidth="2" strokeLinecap="round" /><circle cx="5" cy="12" r="2" fill={c} /><circle cx="12" cy="10" r="2" fill={c} /><circle cx="19" cy="14" r="2" fill={c} /></svg>,
  arrowR: (c = '#fff') => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  star: (c = '#fff', s = 13) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M12 2l2.9 6.1 6.6.8-4.9 4.5 1.3 6.6L12 17.8 6.1 20.6l1.3-6.6L2.5 8.9l6.6-.8L12 2z" /></svg>,
  lock: (c = 'var(--muted)', s = 13) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="5" y="10" width="14" height="10" rx="2" stroke={c} strokeWidth="2" /><path d="M8 10V7a4 4 0 018 0v3" stroke={c} strokeWidth="2" /></svg>,
};

// ── Brand button ──────────────────────────────────────────────
function Btn({ children, onClick, variant = 'primary', style = {} }) {
  const base = {
    width: '100%', height: 54, borderRadius: 16, fontWeight: 700, fontSize: 16.5,
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
    transition: 'transform .12s, filter .12s', letterSpacing: 0.2,
  };
  const skin = {
    primary: { background: 'var(--primary)', color: '#fff', boxShadow: '0 10px 22px -8px rgba(127,85,223,.6)' },
    dark: { background: 'var(--ink)', color: '#fff', boxShadow: '0 10px 22px -8px rgba(27,25,46,.5)' },
    ghost: { background: 'var(--primary-l)', color: 'var(--primary)' },
    outline: { background: '#fff', color: 'var(--primary)', boxShadow: 'inset 0 0 0 1.5px var(--primary)' },
  }[variant];
  return (
    <button onClick={onClick} style={{ ...base, ...skin, ...style }}
      onMouseDown={e => e.currentTarget.style.transform = 'scale(.975)'}
      onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
      {children}
    </button>
  );
}

// ── Pill chip ────────────────────────────────────────────────
function Chip({ children, tone = 'primary', icon }) {
  const tones = {
    primary: { bg: 'var(--primary-l)', fg: 'var(--primary)' },
    green: { bg: 'var(--green-l)', fg: 'var(--green)' },
    plain: { bg: '#fff', fg: 'var(--ink-2)' },
  };
  const t = tones[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: t.bg, color: t.fg, fontWeight: 600, fontSize: 12.5,
      padding: '7px 12px', borderRadius: 999, whiteSpace: 'nowrap',
      boxShadow: tone === 'plain' ? '0 1px 3px rgba(0,0,0,.06)' : 'none',
    }}>{icon}{children}</span>
  );
}

// ── Status bar (iOS-style, dark glyphs) ──────────────────────
function StatusBar({ light = false }) {
  const c = light ? '#fff' : '#1B192E';
  return (
    <div style={{
      height: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      padding: '0 30px 8px', flexShrink: 0, position: 'relative', zIndex: 5,
    }}>
      <span style={{ fontWeight: 700, fontSize: 15.5, color: c, letterSpacing: 0.3 }}>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="18" height="12" viewBox="0 0 18 12"><rect x="0" y="7" width="3" height="5" rx="1" fill={c} /><rect x="5" y="4.5" width="3" height="7.5" rx="1" fill={c} /><rect x="10" y="2" width="3" height="10" rx="1" fill={c} /><rect x="15" y="0" width="3" height="12" rx="1" fill={c} opacity="0.35" /></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M8 2.6c2 0 3.9.8 5.3 2.1l1-1.1A9 9 0 008 1a9 9 0 00-6.3 2.6l1 1.1A7.4 7.4 0 018 2.6z" fill={c} /><path d="M8 6c1 0 2 .4 2.7 1.1l1-1.1A6 6 0 008 4.4 6 6 0 004.3 6l1 1.1A4 4 0 018 6z" fill={c} /><circle cx="8" cy="9.6" r="1.4" fill={c} /></svg>
        <svg width="25" height="12" viewBox="0 0 25 12"><rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke={c} strokeOpacity="0.4" fill="none" /><rect x="2" y="2" width="17" height="8" rx="1.6" fill={c} /><path d="M23 4v4c.8-.3 1.2-1 1.2-2S23.8 4.3 23 4z" fill={c} fillOpacity="0.5" /></svg>
      </div>
    </div>
  );
}

// ── Phone frame ──────────────────────────────────────────────
function Phone({ children, light = false, bg = 'var(--bg)', clean = false }) {
  return (
    <div style={{
      width: 402, height: 858, borderRadius: 52, padding: 5,
      background: '#0E0D16', position: 'relative', flexShrink: 0,
      boxShadow: '0 50px 90px -30px rgba(40,30,80,.55), 0 0 0 1px rgba(0,0,0,.5)',
    }}>
      <div style={{
        width: '100%', height: '100%', borderRadius: 47, overflow: 'hidden',
        background: bg, position: 'relative', display: 'flex', flexDirection: 'column',
      }}>
        {!clean && <div style={{
          position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
          width: 116, height: 33, borderRadius: 20, background: '#0E0D16', zIndex: 40,
        }} />}
        {!clean && <StatusBar light={light} />}
        <div id="phone-scroll-viewport" className="scr" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}>
          {children}
        </div>
        {!clean && <div style={{
          position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
          width: 138, height: 5, borderRadius: 9, background: light ? 'rgba(255,255,255,.6)' : 'rgba(20,16,40,.28)', zIndex: 40,
        }} />}
      </div>
    </div>
  );
}

// ── Sticky bottom action bar ─────────────────────────────────
function BottomBar({ children, bg = 'rgba(244,243,251,.86)' }) {
  return (
    <div style={{
      position: 'sticky', bottom: 0, zIndex: 6,
      padding: '14px 20px 30px', background: bg,
      backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
      borderTop: '1px solid var(--line)',
    }}>{children}</div>
  );
}

// ── "Back to Cash Loan" exit link + warning confirmation ────
// A plain-text link meant to sit just below a page's main CTA. Tapping it
// never navigates immediately — it always confirms first, since leaving this
// journey is a one-way door (the card-debt journey can't be resumed).
function BackToCashLoanLink({ onConfirm, style = {} }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} style={{
        display: 'block', width: '100%', textAlign: 'center',
        fontSize: 13.5, fontWeight: 700, color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer',
        ...style,
      }}>Back to Cash Loan</button>
      {open && <BackToCashLoanWarning onClose={() => setOpen(false)} onConfirm={onConfirm} />}
    </>
  );
}

function BackToCashLoanWarning({ onClose, onConfirm }) {
  const sora = { fontFamily: "'Sora', -apple-system, system-ui, sans-serif" };

  // Portalled to the phone frame's own fixed-size container (sibling of the
  // scrollable page content), not `position: fixed` to the browser viewport —
  // the phone frame is itself transform-scaled and the page content scrolls
  // independently, so a plain fixed/absolute overlay either gets clipped by
  // the phone's rounded-corner mask or centers on the wrong (scrolled) box.
  // This mirrors the same portal target used by the bottom sheets in
  // screen-selling.jsx, which is the one proven way an overlay reliably
  // covers the full visible phone screen regardless of scroll position.
  const portalContainer = typeof document !== 'undefined' ? document.getElementById('phone-scroll-viewport')?.parentNode : null;
  if (!portalContainer) return null;

  return ReactDOM.createPortal(
    <div style={{
      position: 'absolute', inset: 0, zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, background: 'rgba(20,16,32,.55)', backdropFilter: 'blur(3px)', animation: 'fadeIn .18s',
    }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        width: '100%', maxWidth: 340, background: '#fff', borderRadius: 24, padding: '26px 22px 22px',
        boxShadow: '0 30px 70px -20px rgba(10,8,28,.55)', animation: 'popIn .28s cubic-bezier(.2,1.1,.4,1) both', textAlign: 'center',
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: 999, margin: '0 auto 16px', background: 'var(--red-l)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="var(--red)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="12" y1="9" x2="12" y2="13" stroke="var(--red)" strokeWidth="2" strokeLinecap="round"/>
            <line x1="12" y1="17" x2="12.01" y2="17" stroke="var(--red)" strokeWidth="2.4" strokeLinecap="round"/>
          </svg>
        </div>
        <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--ink)', letterSpacing: -0.3, marginBottom: 8, ...sora }}>
          Leave this journey?
        </div>
        <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: 22 }}>
          If you continue, you'll be taken back to the Cash Loan journey. <strong>You won't be able to return to this Clear Card Debt journey.</strong>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onClose} style={{
            flex: 1, height: 50, borderRadius: 14, border: '1.5px solid var(--line)', cursor: 'pointer',
            background: '#fff', color: 'var(--ink-2)', fontWeight: 700, fontSize: 15, ...sora,
          }}>No</button>
          <button onClick={onConfirm} style={{
            flex: 1, height: 50, borderRadius: 14, border: 'none', cursor: 'pointer',
            background: 'var(--red)', color: '#fff', fontWeight: 700, fontSize: 15, ...sora,
          }}>Yes</button>
        </div>
      </div>
    </div>,
    portalContainer
  );
}

// ── Repayment-proof flow: shared step header ─────────────────
// Both steps of the "confirm your repayment" flow (bank account → payments)
// render the SAME header so the two screens read as one task, not two
// unrelated forms: same flow name, same step counter, same progress bar.
function MeltStepHeader({ step = 1, steps = 2, title, flow = 'Payment validation', onBack }) {
  const sora = { fontFamily: "'Sora',sans-serif" };
  const ink = '#1B192E', muted = '#8A879B';
  return (
    <div style={{ background: '#fff', padding: '12px 16px', flexShrink: 0, borderBottom: '1px solid #F0EEF8' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <button onClick={onBack}
          style={{ width: 36, height: 36, borderRadius: 12, border: '1.5px solid #ECEAF4', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke={ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: muted, letterSpacing: 0.7, textTransform: 'uppercase', marginBottom: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {flow} · Step {step} of {steps}
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: ink, ...sora, lineHeight: 1 }}>{title}</div>
        </div>
        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
          {Array.from({ length: steps }).map((_, i) => (
            <div key={i} style={{ width: 20, height: 4, borderRadius: 999, background: i < step ? 'var(--primary)' : 'var(--line)' }} />
          ))}
        </div>
      </div>
      <div style={{ height: 3, background: '#F0EEF8', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ width: (step / steps * 100) + '%', height: '100%', background: 'var(--primary)', borderRadius: 999, transition: 'width .3s' }} />
      </div>
    </div>
  );
}

// ── Repayment-proof flow: shared context strip ───────────────
// Carries the same two facts across both steps — what has to be cleared, and
// which account it was cleared from — so step 2 never feels like a fresh start.
function MeltDuesStrip({ cardDue, bank, note, label = 'Part 1 loan disbursed' }) {
  const sora = { fontFamily: "'Sora',sans-serif" };
  return (
    <div style={{
      background: '#fff', border: '1px solid var(--line)', borderRadius: 14,
      padding: '10px 12px', marginBottom: 18,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--primary-l)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2.5" stroke="var(--primary)" strokeWidth="1.8" /><path d="M3 10h18" stroke="var(--primary)" strokeWidth="1.8" /></svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#8A879B', letterSpacing: 0.6, textTransform: 'uppercase' }}>{label}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 2 }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: '#1B192E', ...sora, letterSpacing: -0.3 }}>{inr(cardDue)}</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#8A879B' }}>credited to you</span>
          </div>
        </div>
        {bank && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#F7F6FC', border: '1px solid var(--line)', borderRadius: 999, padding: '4px 10px 4px 5px', flexShrink: 0 }}>
            <BankLogo id={bank.bank} size={20} show={!!bank.bank} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#4B4960' }}>···· {bank.last4}</span>
          </div>
        )}
      </div>
      {note && (
        <div style={{ fontSize: 11.5, color: '#8A879B', lineHeight: 1.45, marginTop: 8, paddingTop: 8, borderTop: '1px solid #F4F2FB' }}>{note}</div>
      )}
    </div>
  );
}

Object.assign(window, { useState, useEffect, useRef, useCallback, inr, lakh, BANKS, BankLogo, EquallMark, Icon, Btn, Chip, StatusBar, Phone, BottomBar, BackToCashLoanLink, MeltStepHeader, MeltDuesStrip });
