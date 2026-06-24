// screen-claim.jsx — A2 "Cleared your cards?" (upload or wait)

function ClaimScreen({ go }) {
  var vst = useState(false); var fileSelected = vst[0]; var setFileSelected = vst[1];
  var nst = useState(null);  var fileName    = nst[0]; var setFileName    = nst[1];
  var dst = useState(false); var dragOver    = dst[0]; var setDragOver    = dst[1];
  var sub = { fontSize: 13, fontWeight: 500, color: '#8A879B', lineHeight: 1.5 };
  var ink = '#1B192E'; var ink2 = '#4B4960'; var P = 'var(--primary)';
  var sora = { fontFamily: "'Sora',sans-serif" };

  function handleFile(file) {
    if (!file) return;
    setFileSelected(true);
    setFileName(file.name);
  }

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff', animation: 'fadeIn .25s' }}>
      <EquallHead onHome={function(){ go('home'); }} />

      <div className="scr" style={{ flex: 1, overflowY: 'auto', padding: '0 20px 8px' }}>
        {/* Back + breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
          <button onClick={function(){ go('postdisbursal'); }} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--muted)' }}>Back</span>
          </button>
          <span style={{ fontSize: 11, color: 'var(--line)' }}>·</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary)' }}>Step 2 of 3</span>
        </div>

        {/* Title */}
        <div style={{ fontWeight: 800, fontSize: 24, color: ink, ...sora, lineHeight: 1.1, marginBottom: 6 }}>
          Cleared your cards?
        </div>
        <div style={sub}>
          Help us verify faster by uploading a bank statement — or sit tight, we'll detect it automatically.
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--line)', margin: '20px 0' }} />

        {/* Option A — Upload */}
        <div
          onClick={function() { document.getElementById('ccrf-upload-input').click(); }}
          onDragOver={function(e){ e.preventDefault(); setDragOver(true); }}
          onDragLeave={function(){ setDragOver(false); }}
          onDrop={function(e){ e.preventDefault(); setDragOver(false); var f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
          style={{
            borderRadius: 16, border: '2px dashed ' + (fileSelected ? 'var(--green)' : dragOver ? 'var(--primary)' : 'var(--line)'),
            background: fileSelected ? 'var(--green-l)' : dragOver ? 'var(--primary-l)' : '#FAFAF9',
            padding: '20px 16px', cursor: 'pointer', transition: 'all .2s',
            marginBottom: 14, position: 'relative',
          }}
        >
          <input id="ccrf-upload-input" type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: 'none' }}
            onChange={function(e){ var f = e.target.files && e.target.files[0]; if (f) handleFile(f); }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14, flexShrink: 0,
              background: fileSelected ? 'var(--green)' : 'var(--primary-l)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all .25s',
            }}>
              {fileSelected
                ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 13l5 5L19 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                : <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 16V6M8 10l4-4 4 4" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 20h14" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" /></svg>
              }
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: fileSelected ? 'var(--green)' : ink, ...sora, marginBottom: 3, transition: 'color .2s' }}>
                {fileSelected ? fileName || 'File selected' : 'Upload bank statement'}
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>
                {fileSelected ? 'Tap to change file' : 'PDF or image · last 90 days'}
              </div>
            </div>
            <div style={{ flexShrink: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: fileSelected ? 'var(--green)' : 'var(--primary)', background: fileSelected ? 'var(--green-l)' : 'var(--primary-l)', border: '1.5px solid ' + (fileSelected ? '#A7E4C5' : '#C7C4F2'), borderRadius: 999, padding: '4px 10px', transition: 'all .2s' }}>
                {fileSelected ? 'Done' : 'Browse'}
              </div>
            </div>
          </div>
          {/* Fastest badge */}
          <div style={{ position: 'absolute', top: -10, right: 14, background: 'var(--primary)', borderRadius: 999, padding: '3px 10px', fontSize: 10, fontWeight: 700, color: '#fff', letterSpacing: 0.4 }}>
            FASTEST
          </div>
        </div>

        {/* Separator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
          <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--muted)', letterSpacing: 0.3 }}>OR</span>
          <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
        </div>

        {/* Option B — Wait */}
        <div style={{
          borderRadius: 16, border: '1.5px solid var(--line)',
          background: '#FAFAF9', padding: '16px', marginBottom: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, flexShrink: 0, background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="var(--muted)" strokeWidth="1.8" /><path d="M12 7v5l3 3" stroke="var(--muted)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: ink, ...sora, marginBottom: 3 }}>
                Wait for automatic update
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>
                We auto-detect card payments — no action needed.
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, padding: '9px 12px', background: '#F4F3FB', borderRadius: 10, border: '1px solid var(--line)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="var(--muted)" strokeWidth="1.8" /><path d="M12 7v5l3 3" stroke="var(--muted)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span style={{ fontSize: 12, color: ink2 }}>Expected update by: <strong style={{ color: ink }}>4 Jul 2026</strong></span>
          </div>
        </div>

        {/* Info note */}
        <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12, padding: '10px 13px', marginBottom: 6 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="9" stroke="#D97706" strokeWidth="1.8" /><path d="M12 11v5M12 7.5h.01" stroke="#D97706" strokeWidth="2" strokeLinecap="round" /></svg>
          <span style={{ fontSize: 12, color: '#92400E', lineHeight: 1.5 }}>
            Uploading a statement speeds up verification by up to 3 days.
          </span>
        </div>
      </div>

      {/* Bottom CTA */}
      <BottomBar>
        <button
          onClick={function(){ if (fileSelected || true) go('verifying'); }}
          style={{
            width: '100%', height: 52, borderRadius: 15, border: 'none', cursor: 'pointer',
            background: fileSelected ? 'linear-gradient(135deg,var(--primary),#4F46E5)' : 'linear-gradient(135deg,var(--muted),#9CA3AF)',
            color: '#fff', fontWeight: 700, fontSize: 15, ...sora,
            boxShadow: fileSelected ? '0 10px 24px -8px rgba(127,85,223,.5)' : 'none',
            transition: 'all .25s',
          }}
        >
          {fileSelected ? 'Submit for verification' : 'Skip — update me automatically'}
        </button>
        {fileSelected && (
          <button onClick={function(){ go('verifying'); }} style={{ width: '100%', height: 42, borderRadius: 13, border: '1.5px solid var(--line)', background: '#fff', color: 'var(--muted)', fontWeight: 600, fontSize: 13.5, marginTop: 8, cursor: 'pointer' }}>
            Skip — update me automatically
          </button>
        )}
      </BottomBar>
    </div>
  );
}

window.ClaimScreen = ClaimScreen;
