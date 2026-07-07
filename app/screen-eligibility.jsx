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

// One continuous, auto-playing, text-free animation of the Melt refinancing journey.
// Scenes: amount lands in bank → flows to debt cards (partial clear) → remaining debt
// holds → verified → next amount unlocks → remaining debt clears → loop.
var HIW_ACCENT = '#5B3FD4';

function MeltJourneyAnim() {
  var CARD_W = 44, GAP = 8, ROW_H = 92;
  var makeCards = function() { return [0, 1, 2, 3, 4].map(function(id) { return { id: id, status: 'full', fill: 0 }; }); };
  var DX = { 0: -104, 1: -52, 2: 0 };       // scene 2 targets, within the initial 5-card row
  var DX2 = { 2: -52, 3: 0, 4: 52 };        // scene 5 targets, within the remaining 3-card row

  var cs = useState(makeCards()); var cards = cs[0]; var setCards = cs[1];
  var m1s = useState('hidden'); var melt1 = m1s[0]; var setMelt1 = m1s[1];
  var m2s = useState('hidden'); var melt2 = m2s[0]; var setMelt2 = m2s[1];
  var bas = useState(0); var bankAmt = bas[0]; var setBankAmt = bas[1];
  var bgs = useState(false); var bankGlow = bgs[0]; var setBankGlow = bgs[1];
  var cst = useState([]); var coins = cst[0]; var setCoins = cst[1];
  var vst = useState(false); var verify = vst[0]; var setVerify = vst[1];
  var acs = useState(false); var allClear = acs[0]; var setAllClear = acs[1];
  var scn = useState(0); var scene = scn[0]; var setScene = scn[1];
  var timers = useRef([]);
  var coinKey = useRef(0);

  function setStatus(id, patch) {
    setCards(function(list) { return list.map(function(c) { return c.id === id ? Object.assign({}, c, patch) : c; }); });
  }

  useEffect(function() {
    function clearAll() { timers.current.forEach(clearTimeout); timers.current = []; }
    function push(fn, ms) { var t = setTimeout(fn, ms); timers.current.push(t); return t; }

    function spawnCoin(dx, delay, onArrive) {
      push(function() {
        var key = ++coinKey.current;
        setCoins(function(list) { return list.concat([{ key: key, dx: dx }]); });
        push(function() {
          setCoins(function(list) { return list.filter(function(c) { return c.key !== key; }); });
          if (onArrive) onArrive();
        }, 640);
      }, delay);
    }

    function clearThenRemove(id, delay) {
      spawnCoin(DX[id], delay, function() {
        setStatus(id, { status: 'cleared', fill: 100 });
        push(function() { setStatus(id, { status: 'gone' }); }, 480);
      });
    }

    function loop() {
      clearAll();
      setCards(makeCards());
      setMelt1('hidden'); setMelt2('hidden');
      setBankAmt(0); setBankGlow(false);
      setCoins([]); setVerify(false); setAllClear(false); setScene(0);

      // Scene 1 — first amount lands in the bank
      push(function() { setMelt1('in'); }, 250);
      push(function() { setMelt1('merging'); }, 1050);
      push(function() { setMelt1('hidden'); setBankAmt(200000); setBankGlow(true); }, 1650);
      push(function() { setBankGlow(false); }, 2250);

      // Scene 2 — partial repayment flows out: 2 cards clear, 1 goes partial, 2 untouched
      push(function() { setScene(1); }, 2500);
      clearThenRemove(0, 2500);
      clearThenRemove(1, 2720);
      spawnCoin(DX[2], 2940, function() { setStatus(2, { status: 'partial', fill: 55 }); });

      // Scene 3 — hold on the remaining unpaid debt
      push(function() { setScene(2); }, 4500);

      // Scene 4 — verification
      push(function() { setScene(3); setVerify(true); }, 5100);
      push(function() { setVerify(false); }, 6100);

      // Scene 5 — next amount unlocks, flows only to what's left
      push(function() { setScene(4); setMelt2('in'); }, 6300);
      push(function() { setMelt2('merging'); }, 7100);
      push(function() { setMelt2('hidden'); setBankAmt(500000); setBankGlow(true); }, 7700);

      // Scene 6 — remaining debt clears one by one
      push(function() { setScene(5); }, 7900);
      (function() {
        var order = [2, 3, 4];
        order.forEach(function(id, i) {
          spawnCoin(DX2[id], 7900 + i * 260, function() {
            setStatus(id, { status: 'cleared', fill: 100 });
            push(function() { setStatus(id, { status: 'gone' }); }, 480);
          });
        });
      })();
      push(function() { setBankGlow(false); }, 8600);
      push(function() { setAllClear(true); }, 9700);

      push(loop, 12200);
    }

    loop();
    return clearAll;
  }, []);

  var visible = cards.filter(function(c) { return c.status !== 'gone'; });

  function MeltCard(state, amount, key) {
    var visible2 = state !== 'hidden';
    var merging = state === 'merging';
    return (
      <div key={key} style={{
        width: 148, borderRadius: 14, padding: '10px 14px',
        background: 'linear-gradient(135deg,#4A30B5,#5B3FD4)',
        display: 'flex', alignItems: 'center', gap: 9,
        boxShadow: '0 10px 22px -8px rgba(91,63,212,.55)',
        opacity: visible2 ? 1 : 0,
        transform: merging ? 'translateY(46px) scale(.42)' : visible2 ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(.9)',
        transition: merging ? 'transform .58s cubic-bezier(.5,0,.75,.9), opacity .5s .1s ease-in' : 'transform .42s cubic-bezier(.2,1.1,.4,1), opacity .3s',
        transformOrigin: 'center top',
      }}>
        <div style={{ width: 24, height: 24, borderRadius: 8, background: 'rgba(255,255,255,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: 12, fontWeight: 900, color: '#fff' }}>M</span>
        </div>
        <span style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: -0.4, fontFamily: "'Sora',sans-serif" }}>{amount}</span>
      </div>
    );
  }

  return (
    <div style={{ background: 'linear-gradient(180deg,#FAFAFD,#F4F3FB)', borderRadius: 22, padding: '26px 16px 20px', border: '1px solid #EDEBF6' }}>

      {/* melt-card slot */}
      <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        {MeltCard(melt1, '₹2,00,000', 'm1')}
        <div style={{ position: 'absolute', opacity: melt2 !== 'hidden' ? 1 : 0, transition: 'opacity .2s' }}>
          {MeltCard(melt2, '₹3,00,000', 'm2')}
        </div>
      </div>

      {/* connector */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg width="14" height="16" viewBox="0 0 14 16" fill="none"><path d="M2 2l5 6 5-6" stroke="#D7D3EC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>

      {/* bank */}
      <div style={{ position: 'relative', margin: '2px auto 0' }}>
        <div style={{
          width: '100%', borderRadius: 16, padding: '13px 16px',
          background: '#15132A',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
          boxShadow: bankGlow ? '0 0 0 3px rgba(91,63,212,.28), 0 10px 26px -10px rgba(91,63,212,.6)' : '0 4px 14px rgba(20,16,40,.18)',
          transition: 'box-shadow .5s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8"/></svg>
            </div>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: 'rgba(255,255,255,.4)', fontFamily: "'Sora',sans-serif" }}>BANK ACCOUNT</span>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: -0.5, fontFamily: "'Sora',sans-serif", fontVariantNumeric: 'tabular-nums' }}>{inr(bankAmt)}</span>
        </div>

        {/* verification badge */}
        <div style={{
          position: 'absolute', right: -6, bottom: -10, width: 26, height: 26, borderRadius: 999,
          background: '#2D9E6B', display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '3px solid #FAFAFD', boxShadow: '0 4px 10px rgba(45,158,107,.4)',
          opacity: verify ? 1 : 0, transform: verify ? 'scale(1)' : 'scale(.4)',
          transition: 'transform .34s cubic-bezier(.2,1.3,.4,1), opacity .25s',
        }}>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>

        {/* flying coins */}
        {coins.map(function(c) {
          return (
            <div key={c.key} style={{ position: 'absolute', left: '50%', top: '100%', width: 12, height: 12, marginLeft: -6, pointerEvents: 'none' }}>
              <FlyCoin dx={c.dx} />
            </div>
          );
        })}
      </div>

      {/* debt cards row */}
      <div style={{ height: ROW_H, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 14 }}>
        {allClear ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, animation: 'fadeIn .4s both' }}>
            <div style={{ width: 40, height: 40, borderRadius: 999, background: '#E7F7EF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke="#2D9E6B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex' }}>
            {cards.map(function(c) {
              var gone = c.status === 'gone';
              return (
                <div key={c.id} style={{
                  width: gone ? 0 : CARD_W, marginRight: gone ? 0 : GAP, opacity: gone ? 0 : 1,
                  overflow: 'hidden', flexShrink: 0,
                  transition: 'width .45s cubic-bezier(.4,0,.2,1), margin .45s cubic-bezier(.4,0,.2,1), opacity .3s',
                }}>
                  <DebtCard status={c.status} fill={c.fill} />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* scene dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 16 }}>
        {[0, 1, 2, 3, 4, 5].map(function(i) {
          return <div key={i} style={{ width: 5, height: 5, borderRadius: 999, background: i === scene ? HIW_ACCENT : '#E2DFEF', transition: 'background .3s' }} />;
        })}
      </div>
    </div>
  );
}

function FlyCoin({ dx }) {
  var gs = useState(false); var go = gs[0]; var setGo = gs[1];
  useEffect(function() { var t = setTimeout(function() { setGo(true); }, 16); return function() { clearTimeout(t); }; }, []);
  return (
    <div style={{
      width: 12, height: 12, borderRadius: 999,
      background: 'linear-gradient(135deg,#8B6FF0,#5B3FD4)',
      boxShadow: '0 2px 6px rgba(91,63,212,.5)',
      transform: go ? 'translate(' + dx + 'px, 84px) scale(1)' : 'translate(0,0) scale(.5)',
      opacity: go ? 0 : 1,
      transition: 'transform .6s cubic-bezier(.3,.5,.3,1), opacity .22s .4s ease-in',
    }} />
  );
}

// generic, brand-free debt card — no card-network marks
function DebtCard({ status, fill }) {
  var cleared = status === 'cleared';
  return (
    <div style={{ position: 'relative', width: 44, height: 30, borderRadius: 8, overflow: 'hidden', background: 'linear-gradient(135deg,#E4E2F1,#CBC8E1)', boxShadow: '0 2px 6px -2px rgba(40,30,80,.28)' }}>
      <div style={{ position: 'absolute', left: 5, top: 5, width: 9, height: 6, borderRadius: 1.5, background: 'rgba(255,255,255,.55)' }} />
      <div style={{ position: 'absolute', left: 5, bottom: 5, width: 22, height: 2, borderRadius: 999, background: 'rgba(255,255,255,.4)' }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: (fill || 0) + '%',
        background: 'linear-gradient(180deg,#37B179,#2D9E6B)',
        transition: 'height .5s cubic-bezier(.4,0,.2,1)',
      }} />
      {cleared && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn .2s .1s both' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      )}
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

  // ── 3 clean stages ──
  const STAGES = [
    { state: 'done',   label: 'Available today',     desc: '₹2L hits your salary account same day', amount: '₹2,00,000', color: ML.green,   bg: ML.greenL },
    { state: 'active', label: 'Melt your card bills', desc: 'Pay off all card dues within 10 days',   amount: '10 days',   color: ML.primary, bg: ML.primaryL },
    { state: 'locked', label: 'Unlock Phase 2',       desc: 'Repay on time, ₹3L more opens up',       amount: '+₹3L',      color: ML.amber,   bg: ML.amberL },
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

        {/* ── 3 STAGES ── */}
        <div style={{ background: ML.card, borderRadius: 20, padding: '14px 16px 10px', marginTop: 12, boxShadow: '0 1px 4px rgba(0,0,0,.08), 0 4px 14px rgba(40,30,80,.14)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontWeight: 800, fontSize: 17, color: ML.ink, letterSpacing: -0.3, ...sora }}>Three simple steps</div>
            <button onClick={() => setShowHIW(true)} style={{ fontSize: 11, fontWeight: 700, color: ML.primary, background: ML.primaryL, borderRadius: 999, padding: '5px 11px', border: 'none', cursor: 'pointer', letterSpacing: 0.1, ...sora, flexShrink: 0 }}>How it works ›</button>
          </div>

          {/* Vertical timeline */}
          <div>
            {STAGES.map((s, i) => {
              const done = s.state === 'done', active = s.state === 'active', locked = s.state === 'locked';
              const isLast = i === STAGES.length - 1;
              return (
                <div key={i} style={{ display: 'flex', gap: 13, alignItems: 'flex-start', paddingBottom: isLast ? 0 : 20 }}>
                  {/* Node + line */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 22, flexShrink: 0 }}>
                    <div style={{ position: 'relative', width: 22, height: 22, borderRadius: 999,
                      background: done ? ML.green : active ? ML.primary : '#C8C5DE',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: done ? '0 2px 8px rgba(45,158,107,.4)' : active ? '0 2px 8px rgba(61,61,196,.38)' : 'none',
                      zIndex: 1,
                    }}>
                      {active && <span style={{ position: 'absolute', inset: 0, borderRadius: 999, animation: 'meltPulse 2s ease-out infinite' }} />}
                      {done ? (
                        <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      ) : locked ? (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#9A97B8" strokeWidth="2.4" strokeLinecap="round"><rect x="4" y="10" width="16" height="12" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/></svg>
                      ) : (
                        <div style={{ width: 7, height: 7, borderRadius: 999, background: '#fff' }} />
                      )}
                    </div>
                    {!isLast && <div style={{ width: 2, flex: 1, minHeight: 16, marginTop: 3, background: done ? 'rgba(45,158,107,.3)' : '#E2DFEF', borderRadius: 1 }} />}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, paddingTop: 3 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: locked ? ML.muted : ML.ink, ...sora, lineHeight: 1.25 }}>{s.label}</span>
                      <span style={{
                        fontSize: 11.5, fontWeight: 800, ...sora, flexShrink: 0,
                        color: locked ? '#AEA9C9' : s.color,
                        background: locked ? '#F0EFF8' : s.bg,
                        borderRadius: 999, padding: '2px 9px',
                        border: `1px solid ${locked ? '#E2DFEF' : s.color + '28'}`,
                      }}>{s.amount}</span>
                    </div>
                    {!locked && <div style={{ fontSize: 10.5, color: ML.muted, marginTop: 3, lineHeight: 1.45 }}>{s.desc}</div>}
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
