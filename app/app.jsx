// app.jsx — router, device frame, flow nav, tweaks
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primaryColor": "#7F55DF",
  "showLogos": true,
  "storySeconds": 7,
  "ccrfRate": 22
}/*EDITMODE-END*/;

const ORDER = ['home', 'multioffer', 'selling', 'savings', 'cards', 'eligibility', 'visualise', 'pdf', 'amountselect', 'revisedoffer', 'postdisbursal', 'meltbank', 'meltpayment', 'verifying', 'meltnotfound', 'verreview', 'meltstatus', 'reward', 'newloan', 'success'];
const LABELS = {
  home: 'Home', multioffer: 'Multi Offer', selling: 'General Selling', savings: 'Savings', cards: 'Card Selection',
  eligibility: 'Eligibility', visualise: 'Visualise', pdf: 'PDF Upload', amountselect: 'Amount', revisedoffer: 'Final Offer',
  postdisbursal: 'Post Disbursal', meltbank: 'Bank Account', meltpayment: 'Payment Details',
  verifying: 'Verifying', meltnotfound: 'Not Found', verreview: 'Ver. Review', meltstatus: 'Melt Status', reward: 'Reward', newloan: 'New Loan', success: 'Done',
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useState(() => {
    const requested = new URLSearchParams(window.location.search).get('route');
    if (requested && ORDER.includes(requested)) {
      localStorage.setItem('ccrf_route', requested);
      return requested;
    }
    const saved = localStorage.getItem('ccrf_route');
    return (saved && ORDER.includes(saved)) ? saved : 'home';
  });
  const [selected, setSelected] = useState(['FEDERAL', 'ICICI', 'HDFC']);
  const [monthly, setMonthly] = useState(30000);
  const [pdState, setPdState] = useState('action');
  const [meltState, setMeltState] = useState('idle'); // 'idle'|'txn_not_found'|'retry_exhausted'|'bureau_fallback'
  const [retryCount, setRetryCount] = useState(0);
  const [verifyAttempt, setVerifyAttempt] = useState(0); // 0=first attempt (always fails), 1+=retry (goes to verreview)
  const [meltSelBank, setMeltSelBank] = useState(null);
  const [meltPayDate, setMeltPayDate] = useState('');
  const [meltPayAmount, setMeltPayAmount] = useState('');

  const go = useCallback((r) => { setRoute(r); localStorage.setItem('ccrf_route', r); }, []);

  useEffect(() => {
    const resetScroll = () => {
      const scr = document.getElementById('phone-scroll-viewport');
      if (!scr) return;
      scr.scrollTop = 0;
      scr.scrollLeft = 0;
    };
    resetScroll();
    requestAnimationFrame(resetScroll);
  }, [route]);

  // apply tweaks → CSS vars
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary', t.primaryColor);
    // derive a darker shade + light tint
    root.style.setProperty('--primary-d', shade(t.primaryColor, -18));
    root.style.setProperty('--primary-l', tint(t.primaryColor, 0.90));
  }, [t.primaryColor]);

  const storyMs = (t.storySeconds || 7) * 1000;

  const screen = (() => {
    switch (route) {
      case 'home': return <HomeScreen go={go} meltState={meltState} />;
      case 'multioffer': return <MultiOffer go={go} />;
      case 'selling': return <SellingStories go={go} storyMs={storyMs} />;
      case 'savings': return <SavingsScreen go={go} ccrfRate={t.ccrfRate} monthly={monthly} setMonthly={setMonthly} />;
      case 'cards': return <CardSelection go={go} selected={selected} setSelected={setSelected} showLogos={t.showLogos} />;
      case 'eligibility': return <Eligibility go={go} ccrfRate={t.ccrfRate} />;
      case 'visualise': return <Visualise go={go} ccrfRate={t.ccrfRate} monthly={monthly} />;
      case 'pdf': return <PdfUpload go={go} selected={selected} showLogos={t.showLogos} />;
      case 'amountselect': return <AmountSelection go={go} ccrfRate={t.ccrfRate} />;
      case 'revisedoffer': return <RevisedOffer go={go} ccrfRate={t.ccrfRate} />;
      case 'postdisbursal': return <PostDisbursal go={go} pdState={pdState} setPdState={setPdState} setVerifyAttempt={setVerifyAttempt} />;
      case 'meltbank': return <MeltBankAccountScreen go={go} setMeltSelBank={setMeltSelBank} />;
      case 'meltpayment': return <MeltPaymentScreen go={go} setMeltPayDate={setMeltPayDate} setMeltPayAmount={setMeltPayAmount} />;
      case 'meltnotfound': return <MeltNotFoundScreen go={go} retryCount={retryCount} setRetryCount={setRetryCount} setMeltState={setMeltState} />;
      case 'meltstatus': return <MeltStatusScreen go={go} meltState={meltState} retryCount={retryCount} setRetryCount={setRetryCount} />;
      case 'verifying': return <VerifyingScreen go={go} setPdState={setPdState} verifyAttempt={verifyAttempt} setVerifyAttempt={setVerifyAttempt} setMeltState={setMeltState} />;
      case 'verreview': return <MeltVerReviewScreen go={go} meltSelBank={meltSelBank} meltPayDate={meltPayDate} meltPayAmount={meltPayAmount} setMeltState={setMeltState} setPdState={setPdState} />;
      case 'reward': return <RewardScreen go={go} />;
      case 'newloan': return <NewLoanScreen go={go} />;
      case 'topupcontinues': return <TopupContinues go={go} />;
      case 'success': return <Success go={go} />;
      default: return <MultiOffer go={go} />;
    }
  })();

  const light = route === 'selling';
  const bg = route === 'savings' ? '#F7F7FC'
    : (route === 'eligibility' || route === 'home') ? '#F7F7FB'
      : (route === 'pdf' || route === 'multioffer' || route === 'amountselect' || route === 'revisedoffer') ? '#FFFFFF'
        : (route === 'selling' || route === 'visualise' || route === 'success') ? '#EFEEFE'
          : (route === 'postdisbursal' || route === 'meltbank' || route === 'meltpayment' || route === 'verifying' || route === 'meltnotfound' || route === 'verreview' || route === 'meltstatus' || route === 'reward' || route === 'newloan') ? '#FFFFFF'
            : 'var(--bg)';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
      {/* flow rail */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#9A95B5', marginBottom: 8, paddingLeft: 14 }}>CCRF FLOW</div>
        {ORDER.filter(r => r !== 'success').map((r) => {
          const active = route === r;
          const idx = ORDER.indexOf(r);
          const cur = ORDER.indexOf(route);
          const done = idx < cur;
          return (
            <button key={r} onClick={() => go(r)} style={{
              display: 'flex', alignItems: 'center', gap: 11, padding: '8px 14px', borderRadius: 11,
              background: active ? '#fff' : 'transparent', textAlign: 'left',
              boxShadow: active ? '0 6px 18px -10px rgba(40,30,80,.4)' : 'none', transition: 'background .15s',
            }}>
              <span style={{
                width: 22, height: 22, borderRadius: 999, flexShrink: 0, fontSize: 11, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: active ? 'var(--primary)' : done ? 'rgba(127,85,223,.18)' : '#DEDAEC',
                color: active ? '#fff' : done ? 'var(--primary)' : '#fff',
              }}>{idx + 1}</span>
              <span style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: active ? 'var(--ink)' : '#6E6A85', whiteSpace: 'nowrap' }}>{LABELS[r]}</span>
            </button>
          );
        })}
      </div>

      <Phone light={light} bg={bg} clean={route === 'pdf'}>{screen}</Phone>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Brand" />
        <TweakColor label="Primary color" value={t.primaryColor}
          options={['#7F55DF', '#5B6CF0', '#1F8A5B', '#E0613C']}
          onChange={(v) => setTweak('primaryColor', v)} />
        <TweakSection label="Card Selection" />
        <TweakToggle label="Show bank logos" value={t.showLogos} onChange={(v) => setTweak('showLogos', v)} />
        <TweakSection label="General Selling stories" />
        <TweakSlider label="Auto-advance" value={t.storySeconds} min={3} max={12} step={1} unit="s"
          onChange={(v) => setTweak('storySeconds', v)} />
        <TweakSection label="Savings illustration" />
        <TweakSlider label="CCRF rate" value={t.ccrfRate} min={16} max={28} step={1} unit="%"
          onChange={(v) => setTweak('ccrfRate', v)} />
        <TweakSection label="Post Disbursal (dev)" />
        <TweakButton label="Reset → action" onClick={() => { setPdState('action'); go('postdisbursal'); }} />
        <TweakButton label="Set → pending" onClick={() => { setPdState('pending'); go('postdisbursal'); }} />
        <TweakButton label="Simulate bureau confirm →" onClick={() => { setPdState('unlocked'); go('postdisbursal'); }} />
        <TweakSection label="Melt Tranche 2 (dev)" />
        <TweakButton label="→ Bank Account" onClick={() => go('meltbank')} />
        <TweakButton label="→ Payment Details" onClick={() => go('meltpayment')} />
        <TweakSection label="Verify flow (dev)" />
        <TweakButton label="Reset verify attempt" onClick={() => { setVerifyAttempt(0); setRetryCount(0); setMeltState('idle'); }} />
        <TweakButton label="→ Verification Review" onClick={() => go('verreview')} />
        <TweakButton label="Reset melt state" onClick={() => { setMeltState('idle'); setRetryCount(0); setVerifyAttempt(0); go('postdisbursal'); }} />
        <TweakButton label="→ Not Found" onClick={() => { setMeltState('txn_not_found'); go('meltnotfound'); }} />
        <TweakButton label="Set bureau fallback" onClick={() => { setMeltState('bureau_fallback'); go('meltstatus'); }} />
      </TweaksPanel>
    </div>
  );
}

// color helpers
function hexToRgb(h) { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
function rgbToHex(r, g, b) { return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join(''); }
function shade(h, pct) { const [r, g, b] = hexToRgb(h); const f = 1 + pct / 100; return rgbToHex(r * f, g * f, b * f); }
function tint(h, amt) { const [r, g, b] = hexToRgb(h); return rgbToHex(r + (255 - r) * amt, g + (255 - g) * amt, b + (255 - b) * amt); }

// responsive scaling of the whole composition
function mount() {
  const stage = document.getElementById('stage');
  ReactDOM.createRoot(stage).render(<App />);
  const fit = () => {
    const inner = stage.firstElementChild;
    if (!inner) return;
    inner.style.transform = 'none';
    const w = inner.scrollWidth, h = inner.scrollHeight;
    const s = Math.min(1, (window.innerWidth - 40) / w, (window.innerHeight - 40) / h);
    inner.style.transform = `scale(${s})`;
    inner.style.transformOrigin = 'center center';
  };
  const ro = new ResizeObserver(fit);
  ro.observe(stage);
  window.addEventListener('resize', fit);
  setTimeout(fit, 60); setTimeout(fit, 400);

  // Safety net: if the animation timeline is throttled (offscreen iframe,
  // backgrounded tab, capture context), entrance animations can stall at
  // currentTime 0 and leave opacity:0 content invisible. Finishing a stalled
  // entrance animation lands it on its visible end-state. In a foreground tab
  // animations progress (currentTime > 0) so they're never force-finished.
  setInterval(() => {
    if (!document.getAnimations) return;
    for (const a of document.getAnimations()) {
      try {
        if (a.playState === 'running' && a.currentTime === 0) a.finish();
      } catch (e) { }
    }
  }, 500);
}
mount();
