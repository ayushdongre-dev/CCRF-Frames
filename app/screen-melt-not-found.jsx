// screen-melt-not-found.jsx — Payment Not Found

function MeltNotFoundScreen({ go, retryCount, setRetryCount, setMeltState }) {
  var ink   = '#1B192E';
  var ink2  = '#4B4960';
  var muted = '#8A879B';
  var G     = '#1FA971';
  var G_L   = 'var(--green-l)';
  var G_BDR = '#A7E4C5';
  var P_BDR = '#C7C4F2';
  var sora  = { fontFamily: "'Sora',sans-serif" };

  var retryAvailable = retryCount < 1;

  var [fileSelected, setFileSelected] = useState(false);
  var [fileName,     setFileName]     = useState(null);
  var [password,     setPassword]     = useState('');
  var [showPass,     setShowPass]     = useState(false);
  var [dragOver,     setDragOver]     = useState(false);
  var [showUpload,   setShowUpload]   = useState(false);

  function handleFile(file) {
    if (!file) return;
    setFileSelected(true);
    setFileName(file.name);
  }
  function handleRetry()  { setRetryCount(retryCount + 1); go('meltbank'); }
  function handleBureau() { setMeltState('bureau_fallback'); go('postdisbursal'); }

  var today     = new Date();
  var batchDays = [4, 10, 18, 26];
  var MONTHS    = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var nextBatch = null;
  for (var i = 0; i < batchDays.length; i++) {
    if (batchDays[i] > today.getDate()) { nextBatch = new Date(today.getFullYear(), today.getMonth(), batchDays[i]); break; }
  }
  if (!nextBatch) nextBatch = new Date(today.getFullYear(), today.getMonth() + 1, batchDays[0]);
  var nextStr = nextBatch.getDate() + ' ' + MONTHS[nextBatch.getMonth()];

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#F9F8FC', animation: 'fadeIn .25s' }}>

      {/* Header */}
      <div style={{ background: '#fff', padding: '12px 16px 14px', flexShrink: 0, borderBottom: '1px solid #F0EEF8', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={function(){ go('meltpayment'); }}
          style={{ width: 36, height: 36, borderRadius: 12, border: '1.5px solid #ECEAF4', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke={ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: ink, ...sora }}>Verification</div>
        </div>
        <div style={{ width: 36 }} />
      </div>

      <div className="scr" style={{ flex: 1, overflowY: 'auto', padding: '32px 20px 8px' }}>

        {/* ── Hero ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 32, animation: 'fadeUp .38s both' }}>
          <div style={{ position: 'relative', marginBottom: 18 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 28px -6px rgba(217,119,6,.28)' }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                <circle cx="10.5" cy="10.5" r="6.5" stroke="#D97706" strokeWidth="2"/>
                <path d="m21 21-4.35-4.35" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
                <path d="M10.5 7.5v3M10.5 13h.01" stroke="#D97706" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={{ position: 'absolute', inset: -5, borderRadius: '50%', border: '1.5px solid rgba(217,119,6,.14)', pointerEvents: 'none' }} />
          </div>
          <div style={{ fontSize: 22, fontWeight: 900, color: ink, ...sora, letterSpacing: -0.5, lineHeight: 1.2, marginBottom: 6 }}>Transaction not found</div>
          <div style={{ fontSize: 13, color: muted, lineHeight: 1.5 }}>Couldn't verify your repayment in AA records.</div>
        </div>

        {/* ── Retry card ── */}
        {retryAvailable ? (
          <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 20px rgba(0,0,0,.07)', marginBottom: 12, animation: 'fadeUp .38s .09s both' }}>
            <div style={{ background: '#FFFBEB', borderBottom: '1px solid #FDE68A', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="#D97706" strokeWidth="2.2" strokeLinecap="round"/></svg>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: '#92400E' }}>Last attempt</span>
            </div>
            <div style={{ padding: '16px 18px 18px' }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: ink, ...sora, marginBottom: 3 }}>Retry Verification</div>
              <div style={{ fontSize: 12.5, color: muted, marginBottom: 16 }}>Re-check with Account Aggregator.</div>
              <button
                onClick={handleRetry}
                style={{
                  width: '100%', height: 50, borderRadius: 14, border: 'none',
                  background: 'linear-gradient(135deg, var(--primary), #4F46E5)',
                  color: '#fff', fontWeight: 800, fontSize: 15, ...sora,
                  boxShadow: '0 10px 24px -8px rgba(127,85,223,.48)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                  cursor: 'pointer', letterSpacing: -0.2, transition: 'transform .1s',
                }}
                onMouseDown={function(e){ e.currentTarget.style.transform='scale(.975)'; }}
                onMouseUp={function(e){ e.currentTarget.style.transform='scale(1)'; }}
                onMouseLeave={function(e){ e.currentTarget.style.transform='scale(1)'; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M1 4v6h6M23 20v-6h-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Retry
                <div style={{ background: 'rgba(255,255,255,.22)', borderRadius: 999, padding: '2px 8px', fontSize: 10, fontWeight: 700, letterSpacing: 0.3 }}>1 LEFT</div>
              </button>
            </div>
          </div>
        ) : (
          <div style={{ background: '#FEF2F2', borderRadius: 14, padding: '12px 14px', marginBottom: 12, display: 'flex', gap: 9, alignItems: 'center', animation: 'fadeUp .38s .09s both' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="9" stroke="#EF4444" strokeWidth="1.8"/><path d="M12 8v4M12 16h.01" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/></svg>
            <span style={{ fontSize: 12.5, color: '#991B1B', fontWeight: 500 }}>No retries left. Upload a statement or wait for auto-check on <strong>{nextStr}</strong>.</span>
          </div>
        )}

        {/* OR */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, animation: 'fadeUp .38s .15s both' }}>
          <div style={{ flex: 1, height: 1, background: '#EAE8F4' }} />
          <span style={{ fontSize: 10.5, fontWeight: 700, color: muted, letterSpacing: 0.4 }}>OR</span>
          <div style={{ flex: 1, height: 1, background: '#EAE8F4' }} />
        </div>

        {/* ── Upload ── */}
        <div style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,.05)', marginBottom: 12, animation: 'fadeUp .38s .19s both' }}>
          <button onClick={function(){ setShowUpload(!showUpload); }}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 13, padding: '14px 16px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', borderBottom: showUpload ? '1px solid #F0EEF8' : 'none' }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: '#F4F2FB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 16V6M8 10l4-4 4 4" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 20h14" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: ink, ...sora }}>Upload statement</div>
              <div style={{ fontSize: 11.5, color: muted, marginTop: 2 }}>PDF or image · speeds up by 3 days</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ background: G, borderRadius: 999, padding: '3px 9px' }}>
                <span style={{ fontSize: 9.5, fontWeight: 700, color: '#fff', letterSpacing: 0.3 }}>FASTEST</span>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ transform: showUpload ? 'rotate(180deg)' : 'none', transition: 'transform .2s', flexShrink: 0 }}>
                <path d="M6 9l6 6 6-6" stroke={muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>

          {showUpload && (
            <div style={{ padding: '14px 16px', animation: 'slideDown .22s both' }}>
              <div
                onClick={function(){ document.getElementById('nf-upload').click(); }}
                onDragOver={function(e){ e.preventDefault(); setDragOver(true); }}
                onDragLeave={function(){ setDragOver(false); }}
                onDrop={function(e){ e.preventDefault(); setDragOver(false); var f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
                style={{ borderRadius: 12, border: '2px dashed ' + (fileSelected ? G : dragOver ? 'var(--primary)' : '#D8D5EC'), background: fileSelected ? G_L : dragOver ? 'var(--primary-l)' : '#FAFAFA', padding: '12px 14px', cursor: 'pointer', transition: 'all .2s', display: 'flex', alignItems: 'center', gap: 11, marginBottom: 11 }}
              >
                <input id="nf-upload" type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: 'none' }}
                  onChange={function(e){ var f = e.target.files && e.target.files[0]; if (f) handleFile(f); }} />
                <div style={{ width: 36, height: 36, borderRadius: 10, background: fileSelected ? G : 'var(--primary-l)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .2s' }}>
                  {fileSelected
                    ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 13l5 5L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    : <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 15V5m0 0L8 9m4-4l4 4" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 19h14" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round"/></svg>
                  }
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: fileSelected ? G : ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', transition: 'color .2s' }}>
                    {fileSelected ? (fileName || 'File selected') : 'Tap to upload'}
                  </div>
                  <div style={{ fontSize: 11, color: muted, marginTop: 1 }}>{fileSelected ? 'Tap to replace' : 'Last 90 days'}</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: fileSelected ? G : 'var(--primary)', background: fileSelected ? G_L : 'var(--primary-l)', border: '1.5px solid ' + (fileSelected ? G_BDR : P_BDR), borderRadius: 999, padding: '3px 9px', flexShrink: 0, transition: 'all .2s' }}>
                  {fileSelected ? 'Done' : 'Browse'}
                </span>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={function(e){ setPassword(e.target.value); }}
                  placeholder="PDF password (if protected)"
                  style={{ width: '100%', height: 42, borderRadius: 11, border: '1.5px solid #E0DCF0', background: '#fff', padding: '0 44px 0 14px', boxSizing: 'border-box', fontSize: 13.5, color: ink, fontFamily: 'inherit', outline: 'none', transition: 'border-color .15s' }}
                  onFocus={function(e){ e.target.style.borderColor = 'var(--primary)'; }}
                  onBlur={function(e){ e.target.style.borderColor = '#E0DCF0'; }}
                />
                <button onClick={function(){ setShowPass(!showPass); }}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', width: 26, height: 26, cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
                  {showPass
                    ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" stroke={muted} strokeWidth="2" strokeLinecap="round"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" stroke={muted} strokeWidth="2" strokeLinecap="round"/><line x1="1" y1="1" x2="23" y2="23" stroke={muted} strokeWidth="2" strokeLinecap="round"/></svg>
                    : <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={muted} strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="12" r="3" stroke={muted} strokeWidth="2"/></svg>
                  }
                </button>
              </div>
            </div>
          )}
        </div>

        {/* OR */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, animation: 'fadeUp .38s .23s both' }}>
          <div style={{ flex: 1, height: 1, background: '#EAE8F4' }} />
          <span style={{ fontSize: 10.5, fontWeight: 700, color: muted, letterSpacing: 0.4 }}>OR</span>
          <div style={{ flex: 1, height: 1, background: '#EAE8F4' }} />
        </div>

        {/* ── Wait ── */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', boxShadow: '0 2px 10px rgba(0,0,0,.04)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 13, animation: 'fadeUp .38s .27s both' }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: '#F4F2FB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#9A95B5" strokeWidth="1.8"/>
              <path d="M12 7v5l3 3" stroke="#9A95B5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: ink, ...sora, marginBottom: 2 }}>Wait for auto-check</div>
            <div style={{ fontSize: 12, color: muted }}>Next batch run: <strong style={{ color: ink }}>{nextStr}</strong></div>
          </div>
        </div>

      </div>

      {/* CTA */}
      <BottomBar>
        {fileSelected ? (
          <button
            onClick={function(){ go('meltpayment'); }}
            style={{ width: '100%', height: 54, borderRadius: 16, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,var(--primary),#4F46E5)', color: '#fff', fontWeight: 800, fontSize: 15, fontFamily: "'Sora',sans-serif", boxShadow: '0 12px 28px -8px rgba(127,85,223,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'transform .1s', letterSpacing: -0.2 }}
            onMouseDown={function(e){ e.currentTarget.style.transform='scale(.975)'; }}
            onMouseUp={function(e){ e.currentTarget.style.transform='scale(1)'; }}
            onMouseLeave={function(e){ e.currentTarget.style.transform='scale(1)'; }}
          >
            Submit Statement
          </button>
        ) : (
          <button
            onClick={handleBureau}
            style={{ width: '100%', height: 54, borderRadius: 16, border: '1.5px solid #ECEAF4', background: '#fff', color: ink2, fontWeight: 700, fontSize: 14.5, fontFamily: "'Sora',sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={ink2} strokeWidth="1.8"/><path d="M12 7v5l3 3" stroke={ink2} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Notify me automatically
          </button>
        )}
      </BottomBar>
    </div>
  );
}
window.MeltNotFoundScreen = MeltNotFoundScreen;
