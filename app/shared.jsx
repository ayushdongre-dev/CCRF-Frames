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
  HDFC:    { name: 'HDFC BANK',    short: 'HDFC',    bg: '#004C8F', fg: '#ED232A', mono: 'H' },
  ICICI:   { name: 'ICICI BANK',   short: 'ICICI',   bg: '#AE282E', fg: '#F58220', mono: 'I' },
  AXIS:    { name: 'AXIS BANK',    short: 'Axis',    bg: '#97144D', fg: '#ED1C24', mono: 'A' },
  SBI:     { name: 'SBI CARD',     short: 'SBI',     bg: '#22409A', fg: '#fff',    mono: 'S' },
  IDFC:    { name: 'IDFC FIRST',   short: 'IDFC',    bg: '#9C1D26', fg: '#E4002B', mono: 'I' },
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
        <div className="scr" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}>
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

Object.assign(window, { useState, useEffect, useRef, useCallback, inr, lakh, BANKS, BankLogo, EquallMark, Icon, Btn, Chip, StatusBar, Phone, BottomBar });
