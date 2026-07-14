// screen-home3.jsx — Home 3: Remaining Amount Disbursed
// Cloned from the approved Home 1 template (screen-home.jsx). Layout, spacing,
// typography, Loan Snapshot, and action cards are identical — only the hero
// card's badge, icon, headline, message, progress and CTA text differ.
function HomeScreen3({ go, meltState }) {
  var sora = { fontFamily: "'Sora', -apple-system, system-ui, sans-serif" };

  var loan = {
    amount: 200000,
    outstanding: 168420,
    emi: 18810,
    nextEmiDate: '14 Aug',
    paidEmis: 3,
    totalEmis: 15,
  };
  var repayPct = Math.round((loan.paidEmis / loan.totalEmis) * 100);

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff', animation: 'fadeIn .3s' }}>

      {/* ── header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px 4px', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>Good Morning,</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', letterSpacing: -0.4, ...sora }}>Ayush 👋</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button style={{ position: 'relative', width: 40, height: 40, borderRadius: 999, background: '#F6F5FC', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="var(--ink-2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div style={{ position: 'absolute', top: 8, right: 9, width: 7, height: 7, borderRadius: 999, background: '#E8A020', border: '1.5px solid #fff' }} />
          </button>
          <button style={{ width: 40, height: 40, borderRadius: 999, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 15, color: '#fff', ...sora }}>A</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '14px 18px 26px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* ── HERO — celebration card, direct CTA to claim reward ── */}
        <button
          onClick={function () { go('reward'); }}
          style={{
            textAlign: 'left', border: 'none', cursor: 'pointer', padding: 0,
            borderRadius: 24, overflow: 'hidden', position: 'relative',
            background: 'linear-gradient(150deg,#1A1438 0%,#2A1F5E 45%,#3D2A9C 75%,#5B3FD4 100%)',
            boxShadow: '0 22px 46px -18px rgba(26,20,56,.55)',
            transition: 'transform .15s',
          }}
          onMouseDown={function (e) { e.currentTarget.style.transform = 'scale(.985)'; }}
          onMouseUp={function (e) { e.currentTarget.style.transform = 'scale(1)'; }}
          onMouseLeave={function (e) { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <div style={{ position: 'absolute', top: -50, right: -40, width: 190, height: 190, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,111,240,.6) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -60, left: -30, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(45,158,107,.28) 0%, transparent 70%)', pointerEvents: 'none' }} />

          {/* confetti flecks — subtle, celebratory, not distracting */}
          {[
            { top: 14, left: '18%', c: '#FFD76A', r: -18 },
            { top: 22, left: '82%', c: '#8B6FF0', r: 14 },
            { top: 44, left: '92%', c: '#5DD79E', r: -8 },
            { top: 10, left: '48%', c: '#FF8AAE', r: 22 },
          ].map(function (d, i) {
            return <div key={i} style={{ position: 'absolute', top: d.top, left: d.left, width: 6, height: 6, borderRadius: 2, background: d.c, opacity: 0.85, transform: 'rotate(' + d.r + 'deg)', pointerEvents: 'none' }} />;
          })}

          <div style={{ position: 'relative', padding: '22px 20px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 999, background: 'linear-gradient(150deg,#FFDD8C,#E8A020)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px -2px rgba(232,160,32,.5)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" fill="#fff"/></svg>
                </div>
                <span style={{ fontSize: 14.5, fontWeight: 700, color: '#fff', letterSpacing: -0.2, ...sora }}>Congratulations!</span>
              </div>
              <span style={{ fontSize: 10.5, fontWeight: 700, color: '#8FE3B8', background: 'rgba(45,158,107,.22)', border: '1px solid rgba(93,215,158,.35)', borderRadius: 999, padding: '3px 9px', whiteSpace: 'nowrap' }}>Approved</span>
            </div>

            <div style={{ fontSize: 21, fontWeight: 800, color: '#fff', letterSpacing: -0.6, lineHeight: 1.2, marginBottom: 6, ...sora }}>
              ₹3,00,000 more unlocked
            </div>

            <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,.65)', fontWeight: 500, lineHeight: 1.45, marginBottom: 18 }}>
              You've successfully cleared Round 1. Claim your reward now to move this amount into your bank account.
            </div>

            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              background: '#fff', borderRadius: 14, padding: '13px 16px',
              boxShadow: '0 8px 20px -6px rgba(0,0,0,.3)',
            }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: '#3D2A9C', letterSpacing: -0.1, ...sora }}>Claim Your Reward</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="#3D2A9C" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </button>

        {/* ── LOAN SNAPSHOT ── */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '17px 18px', border: '1px solid var(--line)', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 8px 20px -8px rgba(40,30,80,.10)' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: 'var(--muted)', marginBottom: 14, textTransform: 'uppercase' }}>Loan Snapshot</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 16, columnGap: 10, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 10.5, color: 'var(--muted)', fontWeight: 600, marginBottom: 4 }}>Loan Amount</div>
              <div style={{ fontSize: 16.5, fontWeight: 800, color: 'var(--ink)', letterSpacing: -0.3, ...sora }}>{inr(loan.amount)}</div>
            </div>
            <div>
              <div style={{ fontSize: 10.5, color: 'var(--muted)', fontWeight: 600, marginBottom: 4 }}>Outstanding</div>
              <div style={{ fontSize: 16.5, fontWeight: 800, color: 'var(--ink)', letterSpacing: -0.3, ...sora }}>{inr(loan.outstanding)}</div>
            </div>
            <div>
              <div style={{ fontSize: 10.5, color: 'var(--muted)', fontWeight: 600, marginBottom: 4 }}>EMI Amount</div>
              <div style={{ fontSize: 16.5, fontWeight: 800, color: 'var(--ink)', letterSpacing: -0.3, ...sora }}>{inr(loan.emi)}<span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>/mo</span></div>
            </div>
            <div>
              <div style={{ fontSize: 10.5, color: 'var(--muted)', fontWeight: 600, marginBottom: 4 }}>Next EMI Date</div>
              <div style={{ fontSize: 16.5, fontWeight: 800, color: 'var(--ink)', letterSpacing: -0.3, ...sora }}>{loan.nextEmiDate}</div>
            </div>
          </div>

          <div style={{ height: 1, background: 'var(--line)', marginBottom: 12 }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
            <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--ink-2)' }}>Repayment Progress</span>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--primary)' }}>{loan.paidEmis} of {loan.totalEmis} EMIs</span>
          </div>
          <div style={{ height: 6, borderRadius: 999, background: 'var(--line)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: repayPct + '%', borderRadius: 999, background: 'linear-gradient(90deg,var(--primary),#9B87F5)' }} />
          </div>
        </div>

        {/* ── ACTION CARDS — styled to clearly read as tappable CTAs ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <button onClick={function () { go('reward'); }} style={{
            textAlign: 'left', border: '1px solid var(--line)', cursor: 'pointer', background: '#fff',
            borderRadius: 18, padding: '15px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 6px 16px -8px rgba(40,30,80,.10)',
            display: 'flex', flexDirection: 'column', gap: 8, transition: 'transform .12s',
          }}
            onMouseDown={function (e) { e.currentTarget.style.transform = 'scale(.97)'; }}
            onMouseUp={function (e) { e.currentTarget.style.transform = 'scale(1)'; }}
            onMouseLeave={function (e) { e.currentTarget.style.transform = 'scale(1)'; }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: 'var(--primary-l)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/></svg>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="#C4C1D9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink)' }}>Prepay EMI</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.4, marginTop: 2 }}>Reduce your tenure or EMI</div>
            </div>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--primary)', marginTop: 2 }}>Pay now</div>
          </button>

          <button onClick={function () { go('reward'); }} style={{
            textAlign: 'left', border: '1px solid var(--line)', cursor: 'pointer', background: '#fff',
            borderRadius: 18, padding: '15px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 6px 16px -8px rgba(40,30,80,.10)',
            display: 'flex', flexDirection: 'column', gap: 8, transition: 'transform .12s',
          }}
            onMouseDown={function (e) { e.currentTarget.style.transform = 'scale(.97)'; }}
            onMouseUp={function (e) { e.currentTarget.style.transform = 'scale(1)'; }}
            onMouseLeave={function (e) { e.currentTarget.style.transform = 'scale(1)'; }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: 'var(--primary-l)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.9" strokeLinecap="round"><path d="M6 3h8l4 4v14a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z"/><path d="M14 3v4h4" strokeLinejoin="round"/></svg>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="#C4C1D9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink)' }}>Loan Details</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.4, marginTop: 2 }}>Statement, schedule & docs</div>
            </div>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--primary)', marginTop: 2 }}>View details</div>
          </button>
        </div>

        {/* footer */}
        <div style={{ fontSize: 10.5, color: '#AAA', textAlign: 'center', lineHeight: 1.55, padding: '6px 8px 4px' }}>
          EQUALL is a product of <span style={{ fontWeight: 700, color: '#888' }}>LTCV Credit Private Limited</span>, a registered NBFC.
        </div>
      </div>
    </div>
  );
}
window.HomeScreen3 = HomeScreen3;
