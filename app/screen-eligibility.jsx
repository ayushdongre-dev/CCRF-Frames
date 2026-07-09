// screen-eligibility.jsx — CCRF Eligibility · tranche "melt ladder"
// Hero shows the tranche unlocked TODAY; below, a vertical melt-journey ladder
// where each tranche unlocks the next as the customer pays down their balance,
// and a cumulative-limit bar visibly grows 2L (Round 1) → 5L (Round 2).
const ML = {
  bg: '#F7F7FB', card: '#FFFFFF', ink: '#1A1A2E', muted: '#8A8AA0', muted2: '#A7A4B8', line: '#ECEAF4',
  primary: '#3D3DC4', primaryL: '#ECECFA',
  green: '#2D9E6B', greenL: '#E7F6EF',
  amber: '#E8A020', amberInk: '#9A6A10', amberL: '#FCF3E1', amberBorder: '#F0DCAE',
  track: '#EDEDF6', frost: '#E8E8F0',
  hero: '#1A1438', heroCard: 'rgba(255,255,255,.07)',
};

// A simple, auto-playing 3-step animation of the Melt journey — one moving
// element at a time, generous pacing, and a plain-language caption per step
// so it reads clearly for any customer, not just visually-literate ones.
var HIW_ACCENT = '#5B3FD4';

var HIW_STEPS = [
  { title: 'Amount lands in your bank', sub: 'Melt sends money straight to your account.' },
  { title: 'It clears your card dues', sub: 'That amount pays off most of your outstanding balance.' },
  { title: 'Your next amount unlocks', sub: 'Repay on time and more opens up automatically.' },
];

// Deck geometry — front card facing the viewer, three behind it, fanned back-left.
// There are 4 cards; only the first 3 get melted — the 4th stays due on purpose,
// making it visually honest that ₹2L clears most, not all, of the debt.
var DECK_POS = [
  { x: 7, y: -5, r: 3, s: 1, z: 4 },
  { x: 2, y: 2, r: -1, s: 0.94, z: 3 },
  { x: -2, y: 9, r: -4.5, s: 0.89, z: 2 },
  { x: -6, y: 16, r: -8, s: 0.84, z: 1 },
];
var CARD_DUES = [90000, 70000, 40000]; // sums to the ₹2,00,000 disbursed — bank drains to exactly ₹0
var EASE = 'cubic-bezier(.65,0,.35,1)'; // one consistent "premium" motion curve, used everywhere

// Smoothly animates towards `target` whenever it changes. `resetKey` lets a
// fresh loop snap instantly instead of visibly counting down from the old value.
function useCountUp(target, resetKey, ms) {
  var vs = useState(target); var val = vs[0]; var setVal = vs[1];
  var from = useRef(target);
  var lastReset = useRef(resetKey);
  useEffect(function() {
    if (resetKey !== lastReset.current) {
      lastReset.current = resetKey;
      from.current = target;
      setVal(target);
      return;
    }
    var start = from.current, end = target;
    if (start === end) return;
    var t0 = null, raf;
    function tick(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min((ts - t0) / ms, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(start + (end - start) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else from.current = end;
    }
    raf = requestAnimationFrame(tick);
    return function() { if (raf) cancelAnimationFrame(raf); };
  }, [target, resetKey, ms]);
  return val;
}

function MeltJourneyAnim() {
  var m1 = useState('hidden'); var melt = m1[0]; var setMelt = m1[1];       // 'hidden' | 'in' | 'merging'
  var m2 = useState('₹2,00,000'); var meltAmt = m2[0]; var setMeltAmt = m2[1];
  var bas = useState(0); var bankAmt = bas[0]; var setBankAmt = bas[1];
  var lks = useState(0); var loopKey = lks[0]; var setLoopKey = lks[1];
  var bgs = useState(false); var bankGlow = bgs[0]; var setBankGlow = bgs[1];
  var cst = useState(false); var coinOn = cst[0]; var setCoinOn = cst[1];
  var dks = useState(false); var deckOn = dks[0]; var setDeckOn = dks[1];
  var fis = useState(0); var frontIdx = fis[0]; var setFrontIdx = fis[1];
  var mds = useState([false, false, false, false]); var melted = mds[0]; var setMelted = mds[1];
  var mis = useState(null); var meltingId = mis[0]; var setMeltingId = mis[1];
  var lps = useState('hidden'); var lockPhase = lps[0]; var setLockPhase = lps[1]; // 'hidden' | 'locked' | 'unlocked'
  var scn = useState(0); var step = scn[0]; var setStep = scn[1];
  var timers = useRef([]);

  var displayBankAmt = useCountUp(bankAmt, loopKey, 700);

  function markMelted(id) {
    setMelted(function(list) { var next = list.slice(); next[id] = true; return next; });
  }

  useEffect(function() {
    function clearAll() { timers.current.forEach(clearTimeout); timers.current = []; }
    function push(fn, ms) { var t = setTimeout(fn, ms); timers.current.push(t); return t; }

    function loop() {
      clearAll();
      setLoopKey(function(k) { return k + 1; });
      setStep(0); setMelt('hidden'); setMeltAmt('₹2,00,000');
      setBankAmt(0); setBankGlow(false); setCoinOn(false);
      setDeckOn(false); setFrontIdx(0); setMelted([false, false, false, false]); setMeltingId(null); setLockPhase('hidden');

      // Step 1 — Melt sends money straight into your bank.
      // The card lands and fades first; the bank reacts a beat later —
      // that small stagger is what makes the "money arriving" feel real, not a snap-cut.
      push(function() { setMelt('in'); }, 300);
      push(function() { setMelt('merging'); }, 1300);
      push(function() { setMelt('hidden'); }, 1920);
      push(function() { setBankAmt(200000); setBankGlow(true); }, 2080);
      push(function() { setBankGlow(false); }, 2820);

      // Step 2 — that balance clears 3 of the 4 cards, one at a time.
      // Each melted card simply slides to the back of the deck — the 4th card
      // stays untouched at the front, honestly showing what's still due.
      push(function() { setStep(1); setDeckOn(true); }, 3500);

      push(function() { setCoinOn(true); }, 4150);
      push(function() { setCoinOn(false); setMeltingId(0); markMelted(0); }, 4770);
      push(function() { setBankAmt(200000 - CARD_DUES[0]); }, 5280);
      push(function() { setMeltingId(null); setFrontIdx(1); }, 5540);

      push(function() { setCoinOn(true); }, 5900);
      push(function() { setCoinOn(false); setMeltingId(1); markMelted(1); }, 6520);
      push(function() { setBankAmt(200000 - CARD_DUES[0] - CARD_DUES[1]); }, 7030);
      push(function() { setMeltingId(null); setFrontIdx(2); }, 7290);

      push(function() { setCoinOn(true); }, 7650);
      push(function() { setCoinOn(false); setMeltingId(2); markMelted(2); }, 8270);
      push(function() { setBankAmt(0); }, 8780);
      push(function() { setMeltingId(null); setFrontIdx(3); }, 9040);
      // (9040 → 9900 is a deliberate hold: 3 cards green + checked behind, the
      // 4th still due and purple at the front, bank back at ₹0)

      // Step 3 — a lock clicks open, then a bigger amount unlocks into the bank.
      push(function() { setStep(2); setDeckOn(false); setLockPhase('locked'); }, 9900);
      push(function() { setLockPhase('unlocked'); }, 10900);
      push(function() { setLockPhase('hidden'); setMeltAmt('₹3,00,000'); setMelt('in'); }, 11700);
      push(function() { setMelt('merging'); }, 12650);
      push(function() { setMelt('hidden'); }, 13280);
      push(function() { setBankAmt(300000); setBankGlow(true); }, 13440);
      push(function() { setBankGlow(false); }, 14200);

      push(loop, 15500);
    }

    loop();
    return clearAll;
  }, []);

  var meltVisible = melt !== 'hidden';
  var merging = melt === 'merging';

  return (
    <div style={{ position: 'relative', background: 'linear-gradient(180deg,#FBFAFF,#F5F3FC)', borderRadius: 24, padding: '24px 16px 20px', border: '1px solid #ECE9F8', overflow: 'hidden' }}>
      {/* ambient premium glow */}
      <div style={{ position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)', width: 240, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,63,212,.10), transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative' }}>
        {/* top zone — either the melt card or the unlock moment; same fixed slot, never jumps */}
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{
            position: 'absolute', width: 160, borderRadius: 15, padding: '10px 14px',
            background: 'linear-gradient(150deg,#5B3FD4 0%,#4A30B5 55%,#361F94 100%)',
            display: 'flex', alignItems: 'center', gap: 9,
            boxShadow: meltVisible ? '0 14px 30px -10px rgba(91,63,212,.6), 0 0 0 1px rgba(255,255,255,.08) inset' : 'none',
            opacity: meltVisible ? 1 : 0,
            transform: merging ? 'translateY(54px) scale(.38)' : meltVisible ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(.92)',
            transition: merging ? 'transform .64s ' + EASE + ', opacity .3s .32s ease-in' : 'transform .42s cubic-bezier(.2,1.1,.4,1), opacity .3s',
            transformOrigin: 'center top',
          }}>
            <div style={{ width: 25, height: 25, borderRadius: 8, background: 'rgba(255,255,255,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 12.5, fontWeight: 900, color: '#fff' }}>M</span>
            </div>
            <span style={{ fontSize: 15.5, fontWeight: 800, color: '#fff', letterSpacing: -0.4, fontFamily: "'Sora',sans-serif" }}>{meltAmt}</span>
          </div>

          <div style={{ position: 'absolute', opacity: lockPhase !== 'hidden' ? 1 : 0, transform: lockPhase !== 'hidden' ? 'scale(1)' : 'scale(.7)', transition: 'opacity .3s, transform .3s ' + EASE }}>
            <LockBadge unlocked={lockPhase === 'unlocked'} />
          </div>
        </div>

        <FlowLine active={(meltVisible && !merging) || lockPhase === 'unlocked'} />

        {/* bank — a card in its own right: the one constant anchor across all three steps */}
        <div style={{ position: 'relative', margin: '0 auto' }}>
          <div style={{
            position: 'relative', overflow: 'hidden', width: '100%', height: 70, borderRadius: 18,
            background: 'linear-gradient(155deg,#2A2358 0%,#1A1640 48%,#0C0A1E 100%)',
            border: '1px solid rgba(255,255,255,.08)',
            boxShadow: bankGlow
              ? '0 0 0 3px rgba(139,111,240,.32), 0 16px 34px -10px rgba(91,63,212,.7), 0 1px 0 rgba(255,255,255,.08) inset'
              : '0 8px 20px -8px rgba(20,16,40,.45), 0 1px 0 rgba(255,255,255,.06) inset',
            transition: 'box-shadow .5s ease',
          }}>
            {/* soft diagonal sheen for a premium metal-card texture */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(255,255,255,.07) 0%, transparent 32%, transparent 68%, rgba(255,255,255,.04) 100%)' }} />
            {/* faint corner glow */}
            <div style={{ position: 'absolute', top: -30, right: -20, width: 110, height: 110, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,111,240,.28), transparent 70%)' }} />
            {bankGlow && <BankShimmer />}

            <div style={{ position: 'relative', height: '100%', padding: '0 17px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 999, background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9BFF5" strokeWidth="1.9" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: 1.1, color: 'rgba(196,190,232,.55)', fontFamily: "'Sora',sans-serif" }}>AVAILABLE BALANCE</div>
                  <div style={{ fontSize: 9.5, fontWeight: 600, color: 'rgba(255,255,255,.35)', marginTop: 1 }}>Your bank account</div>
                </div>
              </div>
              <span style={{ fontSize: 19.5, fontWeight: 800, color: '#fff', letterSpacing: -0.6, fontFamily: "'Sora',sans-serif", fontVariantNumeric: 'tabular-nums' }}>{inr(displayBankAmt)}</span>
            </div>
          </div>

          {/* single flowing token — one at a time, easy to track */}
          {coinOn && (
            <div style={{ position: 'absolute', left: '50%', top: '100%', width: 12, height: 12, marginLeft: -6, pointerEvents: 'none' }}>
              <FlyCoin />
            </div>
          )}
        </div>

        <FlowLine active={deckOn && !meltVisible} />

        {/* card-deck zone — fixed height, fades in only for step 2 */}
        <div style={{ position: 'relative', height: 92, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: deckOn ? 1 : 0, transition: 'opacity .4s ease' }}>
          {/* melt puddle — glows briefly beneath the deck each time a card melts */}
          <div style={{
            position: 'absolute', bottom: 6, width: 88, height: 20, borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(139,111,240,.55), rgba(139,111,240,.12) 60%, transparent 80%)',
            filter: 'blur(1px)',
            opacity: meltingId !== null ? 1 : 0, transform: meltingId !== null ? 'scale(1)' : 'scale(.6)',
            transition: 'opacity .35s ease, transform .35s ease',
          }} />
          <div style={{ position: 'relative', width: 110, height: 70 }}>
            {[0, 1, 2, 3].map(function(id) {
              var rank = (id - frontIdx + 4) % 4;
              return <DeckCard key={id} pos={DECK_POS[rank]} melted={melted[id]} pulsing={meltingId === id} />;
            })}
          </div>
        </div>

        {/* step caption */}
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#1A1A2E', letterSpacing: -0.2, fontFamily: "'Sora',sans-serif" }}>{HIW_STEPS[step].title}</div>
          <div style={{ fontSize: 11, color: '#8A879B', marginTop: 3, fontWeight: 500 }}>{HIW_STEPS[step].sub}</div>
        </div>

        {/* step dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 14 }}>
          {[0, 1, 2].map(function(i) {
            return <div key={i} style={{
              width: i === step ? 20 : 6, height: 6, borderRadius: 999,
              background: i === step ? 'linear-gradient(90deg,#8B6FF0,' + HIW_ACCENT + ')' : '#E2DFEF',
              boxShadow: i === step ? '0 1px 4px rgba(91,63,212,.4)' : 'none',
              transition: 'all .3s',
            }} />;
          })}
        </div>
      </div>
    </div>
  );
}

// A slim, animated connector — a soft flowing line rather than a static glyph.
function FlowLine({ active }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: 18, alignItems: 'center' }}>
      <svg width="2" height="16" viewBox="0 0 2 16">
        <line x1="1" y1="0" x2="1" y2="16" stroke="#D7D3EC" strokeWidth="2" strokeLinecap="round" />
        <line x1="1" y1="0" x2="1" y2="16" stroke={HIW_ACCENT} strokeWidth="2" strokeLinecap="round"
          strokeDasharray="4,7" style={{ opacity: active ? 0.85 : 0, transition: 'opacity .3s', animation: active ? 'dashFlow .7s linear infinite' : 'none' }} />
      </svg>
    </div>
  );
}

// The step-3 opener: a lock that visibly clicks open, in the same amber the
// rest of the app already uses for "Phase 2 unlocks" — before any money moves.
function LockBadge({ unlocked }) {
  return (
    <div style={{
      position: 'relative', width: 56, height: 56, borderRadius: 999,
      background: unlocked ? 'linear-gradient(150deg,#FFDD8C,#E8A020)' : 'linear-gradient(150deg,#3C3860,#242045)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: unlocked ? '0 12px 28px -8px rgba(232,160,32,.6)' : '0 6px 16px -6px rgba(20,16,40,.4)',
      transition: 'background .5s ease, box-shadow .5s ease',
    }}>
      {!unlocked && <span style={{ position: 'absolute', inset: -6, borderRadius: 999, border: '2px solid rgba(139,111,240,.28)', animation: 'meltPulse 2s ease-out infinite' }} />}
      <span style={{
        position: 'absolute', inset: -12, borderRadius: 999,
        background: 'radial-gradient(circle, rgba(255,221,140,.55), transparent 70%)',
        opacity: unlocked ? 1 : 0, transform: unlocked ? 'scale(1.3)' : 'scale(.5)',
        transition: 'opacity .5s ease, transform .5s ' + EASE,
      }} />
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', opacity: unlocked ? 0 : 1, transition: 'opacity .25s' }}>
        <rect x="5" y="11" width="14" height="10" rx="2.5" fill="#fff" />
        <path d="M8 11V8a4 4 0 018 0v3" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" />
        <circle cx="12" cy="16" r="1.5" fill="#3C3860" />
      </svg>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', opacity: unlocked ? 1 : 0, transition: 'opacity .25s .15s' }}>
        <rect x="5" y="11" width="14" height="10" rx="2.5" fill="#fff" />
        <path d="M8 11V8.3A4 4 0 0116 7" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" />
        <circle cx="12" cy="16" r="1.5" fill="#B8862A" />
      </svg>
    </div>
  );
}

// A one-shot shimmer sweep across the bank card — mounted only while bankGlow
// is true, so it replays cleanly every time money lands.
function BankShimmer() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div style={{
        position: 'absolute', top: 0, bottom: 0, width: '55%', left: '-60%',
        background: 'linear-gradient(100deg, transparent, rgba(255,255,255,.28), transparent)',
        animation: 'bankShimmer .9s ease-out',
      }} />
    </div>
  );
}

function FlyCoin() {
  var gs = useState(false); var go = gs[0]; var setGo = gs[1];
  useEffect(function() { var t = setTimeout(function() { setGo(true); }, 16); return function() { clearTimeout(t); }; }, []);
  return (
    <div style={{
      width: 12, height: 12, borderRadius: 999,
      background: 'linear-gradient(135deg,#8B6FF0,#5B3FD4)',
      boxShadow: '0 2px 6px rgba(91,63,212,.5)',
      transform: go ? 'translate(0, 84px) scale(1)' : 'translate(0,0) scale(.5)',
      opacity: go ? 0 : 1,
      transition: 'transform .6s ' + EASE + ', opacity .2s .38s ease-in',
    }} />
  );
}

// a proper purple, brand-true credit card — chip, masked number, "CREDIT CARD" label.
// Melting = it droops into the puddle below while turning green — colour and shape
// change together — then it reforms, settled and checked, at the back of the deck.
function DeckCard({ pos, melted, pulsing }) {
  var squash = pulsing
    ? 'translate(calc(-50% + ' + pos.x + 'px), calc(-50% + ' + (pos.y + 11) + 'px)) rotate(' + (pos.r * 0.25) + 'deg) scale(' + (pos.s * 1.1) + ', ' + (pos.s * 0.22) + ')'
    : 'translate(calc(-50% + ' + pos.x + 'px), calc(-50% + ' + pos.y + 'px)) rotate(' + pos.r + 'deg) scale(' + pos.s + ')';
  return (
    <div style={{
      position: 'absolute', left: '50%', top: '50%', width: 76, height: 48,
      borderRadius: pulsing ? '9px 9px 28px 28px' : 9,
      transform: squash,
      transformOrigin: pulsing ? 'center bottom' : 'center center', zIndex: pulsing ? 4 : pos.z,
      transition: 'transform .46s ' + EASE + ', border-radius .46s ease',
      overflow: 'hidden', background: 'linear-gradient(150deg,#7B5FEA 0%,#5B3FD4 55%,#3D2A9C 100%)',
      boxShadow: pos.z === 3 && !pulsing ? '0 14px 28px -8px rgba(45,25,130,.5)' : '0 4px 10px -4px rgba(45,25,130,.3)',
      border: '1px solid rgba(255,255,255,.14)',
    }}>
      {/* melted → the card body itself turns green, permanently, once cleared */}
      <div style={{
        position: 'absolute', inset: 0, background: 'linear-gradient(150deg,#3FC08A 0%,#2D9E6B 55%,#1F7A52 100%)',
        opacity: melted ? 1 : 0, transition: 'opacity .46s ease' + (melted ? ' .05s' : ''),
      }} />
      {/* brief flash of heat right as it melts */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 25%, rgba(255,255,255,.65), transparent 60%)', opacity: pulsing ? 1 : 0, transition: 'opacity .5s ease' }} />
      {/* shine */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(125deg,rgba(255,255,255,.2),transparent 55%)' }} />
      {/* chip */}
      <div style={{ position: 'absolute', left: 8, top: 8, width: 14, height: 10, borderRadius: 2.5, background: 'linear-gradient(135deg,#F4D58A,#C99A3A)' }} />
      {/* masked number */}
      <div style={{ position: 'absolute', left: 8, top: 27, display: 'flex', gap: 6 }}>
        {[0, 1, 2, 3].map(function(g) {
          return <div key={g} style={{ display: 'flex', gap: 1.5 }}>
            {[0, 1].map(function(d) { return <span key={d} style={{ width: 2.4, height: 2.4, borderRadius: 999, background: 'rgba(255,255,255,.6)' }} />; })}
          </div>;
        })}
      </div>
      {/* label */}
      <div style={{ position: 'absolute', left: 8, bottom: 6, fontSize: 6.5, fontWeight: 800, letterSpacing: 0.9, color: 'rgba(255,255,255,.7)' }}>CREDIT CARD</div>

      {/* cleared badge — small, permanent, doesn't hide the card */}
      <div style={{
        position: 'absolute', right: -3, top: -3, width: 17, height: 17, borderRadius: 999,
        background: '#fff', border: '2px solid #1F7A52',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: (melted && !pulsing) ? 1 : 0, transform: (melted && !pulsing) ? 'scale(1)' : 'scale(.4)',
        transition: 'transform .3s cubic-bezier(.2,1.3,.4,1) .1s, opacity .2s .1s',
      }}>
        <svg width="9" height="9" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke="#2D9E6B" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
    </div>
  );
}

function HowItWorksModal({ onClose }) {
  var sora = { fontFamily: "'Sora', -apple-system, system-ui, sans-serif" };

  // scroll lock
  useEffect(function() {
    var scr = document.getElementById('phone-scroll-viewport');
    if (scr) scr.style.overflowY = 'hidden';
    return function() { if (scr) scr.style.overflowY = 'auto'; };
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 999, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '16px', background: 'rgba(10,8,28,0.68)', backdropFilter: 'blur(4px)' }}
      onClick={function(e) { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: '#fff', borderRadius: 28, width: '100%', maxHeight: '90%', display: 'flex', flexDirection: 'column', animation: 'popIn .32s cubic-bezier(.2,1.15,.4,1) both', boxShadow: '0 28px 70px -18px rgba(10,8,28,.72), 0 8px 24px rgba(0,0,0,.14)' }}>

        {/* Fixed header */}
        <div style={{ padding: '14px 20px 0', flexShrink: 0 }}>
          <div style={{ width: 44, height: 5, borderRadius: 999, background: '#E0DCF0', margin: '0 auto 14px' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: '#1A1A2E', letterSpacing: -0.2, ...sora }}>How Melt works</span>
            <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: 999, background: '#F4F3FB', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#888" strokeWidth="2.2" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>

        {/* Body — one continuous animation */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 20px 0', overscrollBehavior: 'contain' }}>
          <MeltJourneyAnim />
        </div>

        {/* Fixed footer */}
        <div style={{ padding: '14px 20px 22px', flexShrink: 0 }}>
          <button onClick={onClose} style={{
            width: '100%', height: 46, borderRadius: 13, border: 'none', cursor: 'pointer',
            background: HIW_ACCENT, color: '#fff', fontWeight: 700, fontSize: 15, ...sora,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            transition: 'transform .1s',
          }}
            onMouseDown={function(e){ e.currentTarget.style.transform='scale(.975)'; }}
            onMouseUp={function(e){ e.currentTarget.style.transform='scale(1)'; }}
            onMouseLeave={function(e){ e.currentTarget.style.transform='scale(1)'; }}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

function Eligibility({ go }) {
  const sora = { fontFamily: "'Sora', -apple-system, system-ui, sans-serif" };
  const TOTAL = 500000, AVAIL = 200000;
  const availPct = (AVAIL / TOTAL) * 100;
  const [showHIW, setShowHIW] = useState(false);

  // ── 4 clear stages — one glance tells the whole story ──
  const STAGES = [
    {
      state: 'done', label: 'Amount credited', desc: '₹2L sent straight to your salary account', amount: 'Today',
      color: ML.green, bg: ML.greenL,
      icon: (c) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill={c}/></svg>,
    },
    {
      state: 'active', label: 'Clear your card dues', desc: 'Use it to pay off all outstanding card balances', amount: null,
      color: ML.primary, bg: ML.primaryL,
      icon: (c) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" strokeLinecap="round"><rect x="3" y="6" width="18" height="12" rx="2.5"/><path d="M3 10h18"/></svg>,
    },
    {
      state: 'pending', label: 'We verify repayment', desc: 'We confirm your dues are cleared', amount: null,
      color: '#0F9B8E', bg: '#E7F6F4',
      icon: (c) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/><path d="M9.5 12l2 2 3.5-4"/></svg>,
    },
    {
      state: 'locked', label: '₹3L more unlocks', desc: 'Your next round opens automatically', amount: '+₹3,00,000',
      color: ML.amber, bg: ML.amberL,
      icon: (c) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" strokeLinecap="round"><path d="M8 11V8.2A4 4 0 0116 7"/><rect x="3" y="11" width="18" height="11" rx="3"/><circle cx="12" cy="17" r="1.4" fill={c} stroke="none"/></svg>,
    },
  ];

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: ML.bg, ...sora, position: 'relative' }}>
      <style>{`@keyframes meltPulse{0%{box-shadow:0 0 0 0 rgba(61,61,196,.30)}70%{box-shadow:0 0 0 8px rgba(61,61,196,0)}100%{box-shadow:0 0 0 0 rgba(61,61,196,0)}}
        @keyframes cashFall{0%{transform:translateY(-4px);opacity:0}25%{opacity:1}100%{transform:translateY(22px);opacity:0}}
        @keyframes paidDrop{0%{transform:rotate(-12deg) scale(1.7);opacity:0}55%{opacity:1}100%{transform:rotate(-12deg) scale(1);opacity:1}}
        @keyframes growBarX{from{transform:scaleX(0)}to{transform:scaleX(1)}}
        @keyframes dashFlow{from{stroke-dashoffset:8}to{stroke-dashoffset:0}}
        @keyframes slideUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes coinRight{0%{transform:translate(0,-50%);opacity:0}15%{opacity:1}85%{opacity:1}100%{transform:translate(120px,-50%);opacity:0}}
        @keyframes chevDown{0%,100%{opacity:.2;transform:translateY(-2px)}50%{opacity:1;transform:translateY(2px)}}
        @keyframes bankShimmer{from{transform:translateX(0)}to{transform:translateX(260%)}}
        @media (prefers-reduced-motion: reduce){[data-anim]{animation:none!important}}`}</style>

      {/* nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 14px 4px', flexShrink: 0 }}>
        <button onClick={() => go('cards')} style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icon.back('#333')}</button>
        <span style={{ fontWeight: 700, fontSize: 19, color: ML.primary, letterSpacing: -0.3, ...sora }}>melt</span>
        <div style={{ width: 38 }} />
      </div>

      <div style={{ flex: 1, padding: '6px 18px 0' }}>
        {/* ── HERO — total limit prominent ── */}
        <div style={{ background: ML.hero, borderRadius: 24, padding: '22px 22px 20px', position: 'relative', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,.16), 0 8px 24px rgba(26,20,56,.30)' }}>
          <div style={{ position: 'absolute', top: -50, right: -30, width: 160, height: 160, borderRadius: 999, background: 'radial-gradient(circle, rgba(91,63,212,.55), transparent 70%)' }} />
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.4, color: '#A99CF0', ...sora }}>YOUR TOTAL MELT LIMIT</div>
            <div style={{ fontWeight: 800, fontSize: 50, color: '#fff', letterSpacing: -2, lineHeight: 1.1, marginTop: 4, ...sora }}>₹5,00,000</div>
            <div style={{ marginTop: 18 }}>
              <div style={{ position: 'relative', height: 9, borderRadius: 9, background: 'rgba(255,255,255,.14)', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: availPct + '%', background: 'linear-gradient(90deg,#37B179,#5DD79E)', borderRadius: 9, transformOrigin: 'left', animation: 'growBarX .8s cubic-bezier(.4,0,.2,1) both' }} />
              </div>
              <div style={{ marginTop: 9 }}>
                <span style={{ fontSize: 13.5, fontWeight: 800, color: '#8FE3B8', ...sora }}>₹2,00,000</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.6)', marginLeft: 6 }}>available now</span>
              </div>
              <div style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,.45)', marginTop: 4 }}>Unlocks as you repay your credit card dues</div>
            </div>
          </div>
        </div>

        {/* ── STAGES ── */}
        <div style={{ background: ML.card, borderRadius: 20, padding: '14px 16px 10px', marginTop: 12, boxShadow: '0 1px 4px rgba(0,0,0,.08), 0 4px 14px rgba(40,30,80,.14)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontWeight: 800, fontSize: 17, color: ML.ink, letterSpacing: -0.3, ...sora }}>Steps</div>
            <button onClick={() => setShowHIW(true)} style={{ fontSize: 11, fontWeight: 700, color: ML.primary, background: ML.primaryL, borderRadius: 999, padding: '5px 11px', border: 'none', cursor: 'pointer', letterSpacing: 0.1, ...sora, flexShrink: 0 }}>How it works ›</button>
          </div>

          {/* Vertical timeline */}
          <div>
            {STAGES.map((s, i) => {
              const done = s.state === 'done', active = s.state === 'active', pending = s.state === 'pending', locked = s.state === 'locked';
              const isLast = i === STAGES.length - 1;
              const nodeBg = done ? ML.green : (active || pending) ? s.color : '#EDEBF6';
              return (
                <div key={i} style={{ display: 'flex', gap: 13, alignItems: 'flex-start', paddingBottom: isLast ? 0 : 18 }}>
                  {/* Node + line */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 26, flexShrink: 0 }}>
                    <div style={{ position: 'relative', width: 26, height: 26, borderRadius: 999,
                      background: nodeBg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: done ? '0 2px 8px rgba(45,158,107,.4)' : active ? '0 2px 8px rgba(61,61,196,.38)' : 'none',
                      zIndex: 1,
                    }}>
                      {active && <span style={{ position: 'absolute', inset: 0, borderRadius: 999, animation: 'meltPulse 2s ease-out infinite' }} />}
                      {done ? (
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      ) : locked ? (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9A97B8" strokeWidth="2.4" strokeLinecap="round"><rect x="4" y="10" width="16" height="12" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/></svg>
                      ) : (
                        s.icon('#fff')
                      )}
                    </div>
                    {!isLast && <div style={{ width: 2, flex: 1, minHeight: 14, marginTop: 3, background: done ? 'rgba(45,158,107,.3)' : '#E2DFEF', borderRadius: 1 }} />}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, paddingTop: 2, paddingBottom: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: locked ? ML.muted : ML.ink, ...sora, lineHeight: 1.25 }}>
                        <span style={{ color: locked ? '#C4C1D9' : s.color, fontWeight: 800, marginRight: 6 }}>0{i + 1}</span>
                        {s.label}
                      </span>
                      {s.amount && (
                        <span style={{
                          fontSize: 10.5, fontWeight: 800, ...sora, flexShrink: 0, whiteSpace: 'nowrap',
                          color: locked ? '#AEA9C9' : s.color,
                          background: locked ? '#F0EFF8' : s.bg,
                          borderRadius: 999, padding: '2px 8px',
                          border: `1px solid ${locked ? '#E2DFEF' : s.color + '28'}`,
                        }}>{s.amount}</span>
                      )}
                    </div>
                    <div style={{ fontSize: 10.5, color: locked ? '#B2AECB' : ML.muted, marginTop: 3, lineHeight: 1.45 }}>{s.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* savings + tenure summary (bottom) */}
        <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
          <div style={{ flex: 1, background: 'linear-gradient(145deg, #E8F8F1 0%, #D4F0E3 100%)', borderRadius: 14, padding: '13px 15px', border: '1px solid rgba(31,169,113,0.18)', boxShadow: '0 1px 4px rgba(31,169,113,.10), 0 4px 14px rgba(31,169,113,.08), inset 0 1px 0 rgba(255,255,255,0.7)' }}>
            <div style={{ fontWeight: 800, fontSize: 21, color: ML.green, letterSpacing: -0.5, ...sora }}>₹28,080</div>
            <div style={{ fontSize: 11.5, color: '#3F7A66', fontWeight: 600, marginTop: 2 }}>saved in interest</div>
          </div>
          <div style={{ flex: 1, background: 'linear-gradient(145deg, #E8F8F1 0%, #D4F0E3 100%)', borderRadius: 14, padding: '13px 15px', border: '1px solid rgba(31,169,113,0.18)', boxShadow: '0 1px 4px rgba(31,169,113,.10), 0 4px 14px rgba(31,169,113,.08), inset 0 1px 0 rgba(255,255,255,0.7)' }}>
            <div style={{ fontWeight: 800, fontSize: 21, color: ML.green, letterSpacing: -0.5, ...sora }}>3 months</div>
            <div style={{ fontSize: 11.5, color: '#3F7A66', fontWeight: 600, marginTop: 2 }}>shorter tenure</div>
          </div>
        </div>
        <button onClick={() => go('visualise')} style={{ display: 'block', margin: '12px auto 4px', fontSize: 13, fontWeight: 700, color: ML.primary, ...sora }}>Visualise how →</button>
      </div>

      {/* CTA */}
      <div style={{ position: 'sticky', bottom: 0, padding: '14px 20px 26px', background: ML.bg, borderTop: `1px solid ${ML.line}`, marginTop: 8 }}>
        <button onClick={() => go('amountselect')} style={{
          width: '100%', height: 56, borderRadius: 16, background: ML.primary, color: '#fff',
          fontWeight: 700, fontSize: 16.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
          boxShadow: '0 16px 32px -10px rgba(61,61,196,.55)', transition: 'transform .12s', ...sora,
        }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(.975)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          Continue {Icon.arrowR('#fff')}
        </button>
      </div>

      {showHIW && <HowItWorksModal onClose={() => setShowHIW(false)} />}
    </div>
  );
}

window.Eligibility = Eligibility;
