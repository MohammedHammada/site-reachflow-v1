"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// Faithful port of the approved aménagement/rénovation LP design (the dark
// "Apple design" version iterated on directly with the client) into this
// site's real Next.js app, wired to the real backend:
//  - form POSTs to /api/submit-lead (same endpoint /agences-etudes uses)
//    and to NEXT_PUBLIC_CRM_WEBHOOK_URL, then routes to /thank-you-amenagement
//  - logo + roadmap teaser now reference real files in /public instead of
//    Claude-artifact-only /_blob/ URLs
//  - testimonial stars reverted to plain ★ per earlier agreed decision
//    (no fabricated Trustpilot-style platform styling)
//  - theme hardcoded to dark only (this is a standalone page, not a
//    theme-aware Claude artifact, and dark is what was reviewed throughout)

const PAGE_STYLES = `
  :root{
    --bg:#000000; --bg-elevated:#1C1C1E; --surface:#151517;
    --text:#F5F5F7; --text-muted:#98989D;
    --accent:#FF6B29; --accent-2:#FF3D68; --accent-ink:#D6551D;
    --gradient-brand:linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
    --border:rgba(255,255,255,0.10); --hairline:rgba(255,255,255,0.14);
    --check:#1E8E5A;
    --shadow-s:0 1px 2px rgba(0,0,0,0.5); --shadow-m:0 8px 24px rgba(0,0,0,0.45); --shadow-l:0 24px 60px rgba(0,0,0,0.55);
    --radius-s:10px; --radius-m:18px; --radius-l:28px; --radius-pill:980px;
    --font: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Inter", "Helvetica Neue", Arial, sans-serif;
    --ease: cubic-bezier(0.22, 1, 0.36, 1);
  }
  #rf-lp{
    background:var(--bg); color:var(--text); font-family:var(--font);
    line-height:1.5; -webkit-font-smoothing:antialiased; font-size:17px;
    position:relative; overflow-x:clip;
  }
  #rf-lp *{box-sizing:border-box;}
  #rf-lp .bg-glow{ position:fixed; z-index:0; border-radius:50%; filter:blur(90px); pointer-events:none; }
  #rf-lp .bg-glow-1{ top:-180px; right:-160px; width:460px; height:460px; background:radial-gradient(circle, color-mix(in srgb, var(--accent) 30%, transparent) 0%, transparent 70%); }
  #rf-lp .bg-glow-2{ top:420px; left:-200px; width:420px; height:420px; background:radial-gradient(circle, color-mix(in srgb, var(--accent-2) 20%, transparent) 0%, transparent 70%); }
  #rf-lp .gradient-text{ background:var(--gradient-brand); -webkit-background-clip:text; background-clip:text; color:transparent; }
  #rf-lp .hl{ color:var(--accent); font-weight:700; text-decoration:underline; text-decoration-color:color-mix(in srgb, var(--accent) 55%, transparent); text-decoration-thickness:2px; text-underline-offset:3px; }
  #rf-lp .hl-soft{ color:var(--accent-ink); font-weight:700; }
  #rf-lp .hl-light{ color:#fff; font-weight:700; text-decoration:underline; text-decoration-color:rgba(255,255,255,0.55); text-decoration-thickness:2px; text-underline-offset:3px; }
  #rf-lp img{max-width:100%; display:block;}
  #rf-lp .wrap{max-width:1100px; margin:0 auto; padding:0 24px; min-width:0; position:relative; z-index:1;}
  #rf-lp .hero-content > *, #rf-lp .approach-grid > *, #rf-lp .form-wrap > *, #rf-lp .how-grid > *,
  #rf-lp .test-grid > *, #rf-lp .quote-grid > *, #rf-lp .check-grid > *{ min-width:0; }
  #rf-lp h1,#rf-lp h2,#rf-lp h3{font-weight:700; color:var(--text);}
  #rf-lp h1{font-size:clamp(2.4rem, 5.4vw, 4.4rem); line-height:1.04; letter-spacing:-0.025em;}
  #rf-lp h2{font-size:clamp(1.7rem, 3.4vw, 2.6rem); line-height:1.08; letter-spacing:-0.02em;}
  #rf-lp h3{font-size:1.2rem; font-weight:600; letter-spacing:-0.005em;}
  #rf-lp p{color:var(--text-muted); font-size:1.02rem; line-height:1.6;}
  #rf-lp a{color:inherit;}
  #rf-lp section{padding:110px 0; position:relative; z-index:1;}
  @media (max-width:720px){ #rf-lp section{padding:64px 0;} #rf-lp h1{letter-spacing:-0.015em;} }
  #rf-lp [data-reveal]{ opacity:0; transform:translateY(16px); transition:opacity 700ms var(--ease), transform 700ms var(--ease); }
  #rf-lp [data-reveal].is-visible{ opacity:1; transform:translateY(0); }
  @media (prefers-reduced-motion: reduce){ #rf-lp [data-reveal]{ opacity:1; transform:none; transition:none; } }

  #rf-lp .site-header{
    position:sticky; top:0; z-index:50;
    padding:14px 24px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;
    background:color-mix(in srgb, var(--bg) 72%, transparent);
    backdrop-filter:blur(20px) saturate(180%); -webkit-backdrop-filter:blur(20px) saturate(180%);
    border-bottom:1px solid transparent; transition:border-color 300ms var(--ease);
  }
  #rf-lp .site-header.is-scrolled{ border-bottom-color:var(--hairline); }
  #rf-lp .brand-logo img{ display:block; height:24px; width:auto; }
  #rf-lp .header-right{ display:flex; align-items:center; gap:12px; flex-wrap:wrap; justify-content:flex-end; }
  #rf-lp .brand-tag{ font-size:0.76rem; color:var(--text-muted); border:1px solid var(--border); padding:5px 12px; border-radius:var(--radius-pill); font-weight:500; white-space:nowrap; }
  #rf-lp .header-cta{
    font-size:0.86rem; font-weight:600; padding:9px 18px; border-radius:var(--radius-pill);
    background:var(--gradient-brand); color:#fff; text-decoration:none; white-space:nowrap;
    opacity:0; transform:translateY(-6px); pointer-events:none; max-width:0; overflow:hidden; padding-left:0; padding-right:0;
    transition:opacity 260ms var(--ease), transform 260ms var(--ease), max-width 260ms var(--ease), padding 260ms var(--ease);
  }
  #rf-lp .site-header.is-scrolled .header-cta{ opacity:1; transform:translateY(0); pointer-events:auto; max-width:220px; padding-left:18px; padding-right:18px; }
  @media (max-width:520px){ #rf-lp .brand-tag,#rf-lp .header-cta{ display:none; } #rf-lp .site-header{ justify-content:center; } }

  #rf-lp .btn{
    position:relative; overflow:hidden; display:inline-flex; align-items:center; justify-content:center; gap:8px;
    background:var(--gradient-brand); color:#fff; font-weight:700; font-size:1.02rem; letter-spacing:-0.005em;
    padding:16px 30px; border-radius:var(--radius-pill); border:none; cursor:pointer; text-decoration:none;
    transition:transform 120ms var(--ease), box-shadow 200ms var(--ease);
    box-shadow:0 10px 26px color-mix(in srgb, var(--accent) 38%, transparent);
  }
  #rf-lp .btn:hover{ box-shadow:0 14px 34px color-mix(in srgb, var(--accent) 48%, transparent); }
  #rf-lp .btn:active{ transform:scale(0.96); transition-duration:90ms; }
  #rf-lp .btn-block{width:100%;}
  @media (max-width:480px){ #rf-lp .btn{ width:100%; } }
  #rf-lp .micro-risk{ font-size:0.86rem; color:var(--text-muted); margin-top:14px; display:flex; gap:8px; align-items:flex-start; }
  #rf-lp .micro-risk svg{flex-shrink:0; margin-top:2px; color:var(--check);}

  #rf-lp .trustbar{ display:flex; align-items:center; justify-content:center; gap:10px 16px; flex-wrap:wrap; padding:6px 0 32px 0; }
  #rf-lp .trust-avatars{ display:flex; align-items:center; }
  #rf-lp .trust-avatars .avatar{ width:30px; height:30px; font-size:0.62rem; margin-left:-9px; border:2px solid var(--bg); box-shadow:0 0 0 1px var(--border); }
  #rf-lp .trust-avatars .avatar:first-child{ margin-left:0; }
  #rf-lp .avatar-more{ background:var(--surface); color:var(--text-muted); font-weight:700; }
  #rf-lp .trust-count{font-size:0.92rem; font-weight:500; color:var(--text-muted);}
  #rf-lp .rating{ display:flex; align-items:center; gap:6px; font-size:0.88rem; font-weight:600; }
  #rf-lp .rating .stars{color:var(--accent); letter-spacing:1px;}

  #rf-lp .hero{padding-top:56px; padding-bottom:60px; text-align:center;}
  #rf-lp .hero-content{ max-width:680px; margin:0 auto; }
  #rf-lp .hero-roadmap{ max-width:560px; margin:32px auto 32px; }
  @media (max-width:720px){ #rf-lp .hero-roadmap{ margin:26px auto 26px; } }
  #rf-lp .hero h1{margin-bottom:22px;}
  #rf-lp .hero .lede{font-size:1.14rem; max-width:46ch; margin:0 auto 30px; color:var(--text-muted);}

  #rf-lp .roadmap-card{
    position:relative; background:var(--bg-elevated); border:2px solid color-mix(in srgb, var(--accent) 65%, var(--border));
    border-radius:var(--radius-l); overflow:hidden;
    box-shadow:var(--shadow-m), 0 0 0 1px color-mix(in srgb, var(--accent) 20%, transparent), 0 20px 60px color-mix(in srgb, var(--accent) 25%, transparent);
  }
  #rf-lp .roadmap-img{ display:block; width:100%; height:auto; }
  #rf-lp .roadmap-lock-pill{
    position:absolute; left:50%; bottom:8%; transform:translateX(-50%);
    display:inline-flex; align-items:center; gap:8px; white-space:nowrap; cursor:pointer;
    background:#14161B; color:#fff; font-weight:700; font-size:0.82rem; letter-spacing:0.03em; text-transform:uppercase;
    padding:12px 22px; border-radius:var(--radius-pill); border:1px solid rgba(255,255,255,0.18);
    text-decoration:none; box-shadow:0 10px 26px rgba(0,0,0,0.35);
    transition:transform 150ms var(--ease), box-shadow 150ms var(--ease);
  }
  #rf-lp .roadmap-lock-pill:hover{ transform:translateX(-50%) translateY(-2px); box-shadow:0 14px 32px rgba(0,0,0,0.45); }
  #rf-lp .roadmap-lock-pill svg{ color:var(--accent); flex-shrink:0; }
  #rf-lp .roadmap-caption{font-size:0.8rem; color:var(--text-muted); text-align:center; margin-top:16px;}

  #rf-lp .eyebrow-num{ font-weight:600; color:var(--accent); font-size:0.9rem; margin-bottom:12px; display:block; letter-spacing:0.01em; }
  #rf-lp .section-head{max-width:640px; margin-bottom:52px;}
  #rf-lp .section-head p{margin-top:14px; font-size:1.05rem;}
  #rf-lp .center{text-align:center; margin-left:auto; margin-right:auto;}
  #rf-lp .steps-title{text-align:center; max-width:800px; margin:0 auto;}
  #rf-lp .steps-title p{margin-top:16px;}

  #rf-lp .how-grid{display:grid; grid-template-columns:repeat(3, 1fr); gap:24px; margin-bottom:44px;}
  @media (max-width:820px){ #rf-lp .how-grid{grid-template-columns:1fr;} }
  #rf-lp .how-card{ background:var(--bg-elevated); border:1px solid var(--border); border-radius:var(--radius-m); padding:28px; box-shadow:var(--shadow-s); transition:box-shadow 250ms var(--ease), transform 250ms var(--ease); }
  #rf-lp .how-card:hover{ box-shadow:0 16px 36px color-mix(in srgb, var(--accent) 20%, transparent); transform:translateY(-4px); }
  #rf-lp .how-icon{ width:52px; height:52px; border-radius:16px; background:var(--gradient-brand); display:flex; align-items:center; justify-content:center; color:#fff; box-shadow:0 8px 20px color-mix(in srgb, var(--accent) 35%, transparent); }
  #rf-lp .how-num{font-size:0.8rem; font-weight:700; color:var(--accent); letter-spacing:0.06em; margin-top:16px; display:block;}
  #rf-lp .how-card h3{margin:6px 0 8px 0;}
  #rf-lp .how-card p{font-size:0.96rem;}
  #rf-lp .cta-center{text-align:center; margin-top:8px;}
  #rf-lp .cta-center .micro-risk{justify-content:center;}

  #rf-lp .growth-path{ position:relative; background:var(--bg-elevated); border:1px solid var(--border); border-radius:var(--radius-l); padding:56px 48px; box-shadow:var(--shadow-m); overflow:hidden; }
  #rf-lp .growth-path::after{ content:""; position:absolute; top:-40%; right:-10%; width:60%; aspect-ratio:1; background:radial-gradient(circle, color-mix(in srgb, var(--accent) 16%, transparent) 0%, transparent 70%); pointer-events:none; }
  #rf-lp .growth-steps{ position:relative; display:flex; gap:0; z-index:1; }
  #rf-lp .growth-line, #rf-lp .growth-line-fill{ position:absolute; top:26px; left:26px; right:26px; height:3px; border-radius:3px; }
  #rf-lp .growth-line{ background:var(--border); }
  #rf-lp .growth-line-fill{ background:linear-gradient(90deg, var(--accent), var(--accent-ink)); width:0%; transition:width 1400ms var(--ease) 250ms; }
  #rf-lp .growth-path.is-visible .growth-line-fill{ width:100%; }
  #rf-lp .growth-step{ flex:1; display:flex; flex-direction:column; align-items:center; text-align:center; position:relative; z-index:1; padding:0 14px; }
  #rf-lp .growth-badge{ width:52px; height:52px; border-radius:50%; background:var(--bg-elevated); border:2px solid var(--border); display:flex; align-items:center; justify-content:center; font-weight:700; font-size:1rem; color:var(--text-muted); margin-bottom:18px; transition:transform 400ms var(--ease), box-shadow 400ms var(--ease); }
  #rf-lp .growth-step:nth-child(4) .growth-badge{ background:color-mix(in srgb, var(--accent) 14%, var(--bg-elevated)); border-color:color-mix(in srgb, var(--accent) 30%, var(--border)); color:var(--accent-ink); }
  #rf-lp .growth-step:nth-child(5) .growth-badge{ background:color-mix(in srgb, var(--accent) 30%, var(--bg-elevated)); border-color:color-mix(in srgb, var(--accent) 55%, var(--border)); color:var(--accent-ink); }
  #rf-lp .growth-step:last-child .growth-badge{ background:var(--gradient-brand); color:#fff; border-color:transparent; box-shadow:0 10px 28px color-mix(in srgb, var(--accent) 45%, transparent); font-size:1.3rem; }
  #rf-lp .growth-path.is-visible .growth-step:last-child .growth-badge{ transform:scale(1.08); }
  #rf-lp .growth-step strong{ font-size:1.14rem; letter-spacing:-0.015em; white-space:nowrap; }
  #rf-lp .growth-step span{ font-size:0.86rem; color:var(--text-muted); margin-top:8px; display:block; max-width:21ch; }
  @media (max-width:720px){
    #rf-lp .growth-path{ padding:38px 26px; }
    #rf-lp .growth-steps{ flex-direction:column; gap:34px; }
    #rf-lp .growth-line, #rf-lp .growth-line-fill{ top:26px; bottom:26px; left:26px; right:auto; width:3px; height:auto; }
    #rf-lp .growth-line-fill{ width:3px; height:0%; transition:height 1400ms var(--ease) 250ms; }
    #rf-lp .growth-path.is-visible .growth-line-fill{ height:100%; width:3px; }
    #rf-lp .growth-step{ flex-direction:row; align-items:flex-start; text-align:left; padding:0; gap:18px; min-width:0; }
    #rf-lp .growth-badge{ margin-bottom:0; flex-shrink:0; }
    #rf-lp .growth-copy{ min-width:0; }
    #rf-lp .growth-step strong{ font-size:clamp(1.05rem, 5.8vw, 1.3rem); display:block; }
    #rf-lp .growth-step span{ max-width:none; white-space:normal; }
  }

  #rf-lp .approach-grid{display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center;}
  @media (max-width:820px){ #rf-lp .approach-grid{grid-template-columns:1fr; gap:32px;} }
  #rf-lp .objective-card{ padding:28px; }
  #rf-lp .objective-grid{ display:grid; grid-template-columns:1fr 1fr; gap:22px; }
  #rf-lp .objective-item{ display:flex; flex-direction:column; gap:12px; }
  #rf-lp .objective-item span:last-child{ font-weight:600; font-size:0.94rem; color:var(--text); }
  @media (max-width:480px){ #rf-lp .objective-grid{ gap:18px; } }
  #rf-lp .check-list{list-style:none; display:flex; flex-direction:column; gap:16px; margin:24px 0;}
  #rf-lp .check-list li{display:flex; gap:14px; align-items:center; font-size:1.04rem; color:var(--text);}
  #rf-lp .check-icon{ flex-shrink:0; width:28px; height:28px; border-radius:50%; background:color-mix(in srgb, var(--check) 16%, var(--bg-elevated)); color:var(--check); display:flex; align-items:center; justify-content:center; }
  #rf-lp .niche-icon{ width:34px; height:34px; border-radius:10px; flex-shrink:0; background:var(--gradient-brand); color:#fff; display:flex; align-items:center; justify-content:center; }

  #rf-lp .form-section{background:var(--surface);}
  #rf-lp .form-wrap{display:grid; grid-template-columns:0.9fr 1.1fr; gap:56px; align-items:flex-start;}
  @media (max-width:880px){ #rf-lp .form-wrap{grid-template-columns:1fr; gap:32px;} }
  #rf-lp .form-card{background:var(--bg-elevated); border:1px solid var(--border); border-radius:var(--radius-l); padding:36px; box-shadow:var(--shadow-m);}
  @media (max-width:480px){ #rf-lp .form-card{padding:24px 20px;} }
  #rf-lp .field{margin-bottom:20px;}
  #rf-lp .field label{display:block; font-size:0.86rem; font-weight:600; margin-bottom:8px;}
  #rf-lp .field .hint{display:block; font-weight:400; color:var(--text-muted); font-size:0.8rem; margin-top:6px;}
  #rf-lp .field input[type=text], #rf-lp .field input[type=tel], #rf-lp .field input[type=email]{
    width:100%; padding:13px 15px; border-radius:var(--radius-s); border:1px solid var(--border);
    background:var(--bg); color:var(--text); font-family:var(--font); font-size:0.98rem;
    transition:border-color 160ms var(--ease), box-shadow 160ms var(--ease);
  }
  #rf-lp .field input:focus{ outline:none; border-color:var(--accent); box-shadow:0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent); }
  #rf-lp .check-grid{display:grid; grid-template-columns:1fr 1fr; gap:10px;}
  @media (max-width:480px){ #rf-lp .check-grid{grid-template-columns:1fr;} }
  #rf-lp .check-opt{ border:1px solid var(--border); border-radius:var(--radius-s); padding:12px 13px; font-size:0.88rem; display:flex; gap:9px; align-items:center; cursor:pointer; user-select:none; background:var(--bg); transition:border-color 160ms var(--ease), background 160ms var(--ease); }
  #rf-lp .check-opt input{accent-color:var(--accent);}
  #rf-lp .check-opt.active{border-color:var(--accent); background:color-mix(in srgb, var(--accent) 8%, var(--bg));}
  #rf-lp .form-note{font-size:0.86rem; margin-top:18px;}
  #rf-lp .form-progress{margin-bottom:26px;}
  #rf-lp .form-progress-bar{height:5px; border-radius:99px; background:var(--bg); overflow:hidden;}
  #rf-lp .form-progress-fill{height:100%; width:50%; border-radius:99px; background:var(--gradient-brand); transition:width 380ms var(--ease);}
  #rf-lp .form-progress-label{display:block; margin-top:9px; font-size:0.8rem; font-weight:600; color:var(--text-muted);}
  #rf-lp .form-step{display:none;}
  #rf-lp .form-step.is-active{display:block; animation:rfStepIn 320ms var(--ease);}
  @keyframes rfStepIn{ from{opacity:0; transform:translateX(10px);} to{opacity:1; transform:translateX(0);} }
  #rf-lp .btn-back{display:block; width:100%; text-align:center; background:none; border:none; color:var(--text-muted); font-size:0.86rem; font-weight:600; padding:10px 0 14px; cursor:pointer; transition:color 160ms var(--ease);}
  #rf-lp .btn-back:hover{color:var(--text);}

  #rf-lp .proof-banner{ position:relative; background:var(--gradient-brand); border-radius:var(--radius-l); padding:56px 32px; text-align:center; box-shadow:0 20px 50px color-mix(in srgb, var(--accent) 35%, transparent); overflow:hidden; }
  #rf-lp .proof-banner::before{ content:""; position:absolute; inset:0; background:radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25) 0%, transparent 45%); pointer-events:none; }
  #rf-lp .proof-number{font-weight:700; font-size:clamp(2.4rem,5.4vw,3.6rem); color:#fff; letter-spacing:-0.02em; position:relative;}
  #rf-lp .proof-banner p{margin-top:10px; font-size:1.02rem; color:rgba(255,255,255,0.9); position:relative;}

  #rf-lp .results-label{ text-align:center; margin:44px 0 24px; font-size:0.95rem; font-weight:600; color:var(--text-muted); }
  #rf-lp .results-grid{ column-count:3; column-gap:16px; }
  @media (max-width:900px){ #rf-lp .results-grid{ column-count:2; } }
  @media (max-width:560px){ #rf-lp .results-grid{ column-count:1; } }
  #rf-lp .results-item{
    break-inside:avoid; margin-bottom:16px; border-radius:var(--radius-m); overflow:hidden;
    border:1px solid var(--border); box-shadow:var(--shadow-s);
    transition:transform 250ms var(--ease), box-shadow 250ms var(--ease);
  }
  #rf-lp .results-item:hover{ transform:translateY(-4px); box-shadow:0 16px 36px color-mix(in srgb, var(--accent) 20%, transparent); }
  #rf-lp .results-item img{ display:block; width:100%; height:auto; }

  #rf-lp .test-grid{display:grid; grid-template-columns:repeat(2,1fr); gap:20px; margin-bottom:20px;}
  @media (max-width:720px){ #rf-lp .test-grid{grid-template-columns:1fr;} }
  #rf-lp .test-audio{ background:var(--bg-elevated); border:1px solid var(--border); border-radius:var(--radius-m); padding:24px; display:flex; flex-direction:column; gap:12px; box-shadow:var(--shadow-s); }
  #rf-lp .test-audio-top{display:flex; align-items:center; gap:12px;}
  #rf-lp .avatar{width:44px; height:44px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-weight:700; color:#fff; font-size:0.85rem;}
  #rf-lp .avatar-1{ background:linear-gradient(135deg, #FF6B29, #FF3D68); }
  #rf-lp .avatar-2{ background:linear-gradient(135deg, #FFB020, #FF6B29); }
  #rf-lp .avatar-3{ background:linear-gradient(135deg, #FF3D68, #B84E9E); }
  #rf-lp .avatar-4{ background:linear-gradient(135deg, #FF8A3D, #FF3D68); }
  #rf-lp .avatar-5{ background:linear-gradient(135deg, #FFB020, #FF3D68); }
  #rf-lp .test-audio strong{font-size:0.94rem;}
  #rf-lp .test-audio .badge{font-size:0.74rem; color:var(--check); display:block; margin-top:2px;}
  #rf-lp .waveform{height:34px; border-radius:var(--radius-pill); background:var(--surface); position:relative; overflow:hidden;}
  #rf-lp .waveform::after{ content:""; position:absolute; inset:0; background:repeating-linear-gradient(90deg, var(--accent) 0 3px, transparent 3px 6px); opacity:0.3; }
  #rf-lp .quote-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:20px;}
  @media (max-width:820px){ #rf-lp .quote-grid{grid-template-columns:1fr;} }
  #rf-lp .quote-card{ background:var(--bg-elevated); border:1px solid var(--border); border-radius:var(--radius-m); padding:24px; box-shadow:var(--shadow-s); transition:box-shadow 250ms var(--ease), transform 250ms var(--ease); }
  #rf-lp .quote-card:hover{ box-shadow:var(--shadow-m); transform:translateY(-2px); }
  #rf-lp .quote-card .stars{color:var(--accent); font-size:0.86rem; margin-bottom:12px; display:block;}
  #rf-lp .quote-card p{font-size:0.92rem; color:var(--text); margin-bottom:16px;}
  #rf-lp .quote-who{display:flex; align-items:center; gap:10px;}
  #rf-lp .quote-who strong{font-size:0.86rem;}
  #rf-lp .quote-who span{font-size:0.76rem; color:var(--text-muted); display:block;}

  #rf-lp .final-cta{ position:relative; text-align:center; padding:72px 32px; border-radius:var(--radius-l); overflow:hidden; }
  #rf-lp .final-cta::before{ content:""; position:absolute; inset:0; background:radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--accent) 14%, transparent) 0%, transparent 60%); pointer-events:none; }
  #rf-lp .final-cta h2{max-width:680px; margin:0 auto 18px auto; position:relative;}
  #rf-lp .final-cta .btn, #rf-lp .final-cta .micro-risk{ position:relative; }

  #rf-lp .site-footer{border-top:1px solid var(--border); padding:40px 0; text-align:center;}
  #rf-lp .site-footer p{font-size:0.84rem;}
  #rf-lp .site-footer .brand-logo{justify-content:center; display:flex; margin-bottom:10px;}

  #rf-lp .sticky-cta{
    position:fixed; left:0; right:0; bottom:0; z-index:60;
    background:color-mix(in srgb, var(--bg-elevated) 94%, transparent);
    backdrop-filter:blur(20px) saturate(180%); -webkit-backdrop-filter:blur(20px) saturate(180%);
    border-top:1px solid var(--hairline); box-shadow:0 -10px 28px rgba(0,0,0,0.35);
    padding:10px 18px; transform:translateY(100%); opacity:0; pointer-events:none;
    transition:transform 280ms var(--ease), opacity 280ms var(--ease); display:none;
  }
  #rf-lp .sticky-cta.is-visible{ transform:translateY(0); opacity:1; pointer-events:auto; }
  #rf-lp .sticky-cta-label{ display:block; text-align:center; font-size:0.68rem; color:var(--text-muted); margin-bottom:6px; }
  #rf-lp .sticky-cta .btn{ width:100%; padding:12px 20px; font-size:0.88rem; box-shadow:0 6px 18px color-mix(in srgb, var(--accent) 30%, transparent); }
  @media (max-width:640px){ #rf-lp .sticky-cta{ display:block; } }

  @media (max-width:640px){
    #rf-lp .site-header{ padding:10px 20px; }
    #rf-lp .hero{ padding-top:0; padding-bottom:24px; }
    #rf-lp .trustbar{ padding:6px 0 8px; gap:5px 10px; }
    #rf-lp .trust-avatars .avatar{ width:22px; height:22px; font-size:0.52rem; margin-left:-7px; }
    #rf-lp .trust-count{ font-size:0.68rem; }
    #rf-lp .rating{ font-size:0.68rem; }
    #rf-lp .hero h1{ font-size:clamp(1.5rem, 7vw, 1.85rem); line-height:1.22; margin-bottom:8px; letter-spacing:-0.005em; }
    #rf-lp .hero .lede{ font-size:0.86rem; line-height:1.5; margin-bottom:14px; }
    #rf-lp .hero .btn{ padding:12px 20px; font-size:0.88rem; }
    #rf-lp .hero .micro-risk{ font-size:0.66rem; margin-top:8px; gap:5px; }
    #rf-lp h2{ font-size:clamp(1.35rem, 6.4vw, 1.65rem); line-height:1.18; letter-spacing:-0.01em; }
    #rf-lp .section-head{ margin-bottom:32px; }
    #rf-lp .btn{ padding:12px 20px; font-size:0.88rem; }
  }
`;

const HERO_ROADMAP_SVG = `
  <a href="#form" class="roadmap-lock-pill">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
    ROADMAP COMPLÈTE
  </a>
`;

const PAGE_HTML = `
<div class="bg-glow bg-glow-1" aria-hidden="true"></div>
<div class="bg-glow bg-glow-2" aria-hidden="true"></div>

<header id="rfHeader" class="site-header">
  <span class="brand-logo"><img src="/reachflow-logo-light-text.png" alt="ReachFlow" style="height:24px;width:auto;"></span>
  <div class="header-right">
    <div class="brand-tag">Aménagement &amp; Rénovation</div>
    <a href="#form" class="header-cta">Diagnostic gratuit</a>
  </div>
</header>

<section class="hero">
  <div class="wrap">
    <div class="trustbar">
      <div class="trust-avatars">
        <span class="avatar avatar-1">EC</span>
        <span class="avatar avatar-2">SR</span>
        <span class="avatar avatar-3">NM</span>
        <span class="avatar avatar-4">HB</span>
        <span class="avatar avatar-5">YT</span>
        <span class="avatar avatar-more">+20</span>
      </div>
      <div class="trust-count"><span class="hl-soft">+20 entreprises</span> d'aménagement et de rénovation nous font confiance au Maroc</div>
      <div class="rating"><span class="stars">★★★★★</span> 4.9 · 14 avis</div>
    </div>

    <div class="hero-content">
      <div>
        <h1>Votre entreprise d'aménagement et de rénovation a un potentiel de chantiers <span class="gradient-text">bien supérieur</span> à ce que vous exploitez aujourd'hui.</h1>
        <p class="lede"><span class="hl">Bouche-à-oreille</span>, devis qui traînent — découvrez <span class="hl">gratuitement</span> à quelle étape de croissance vous êtes bloqué, et le <span class="hl">plan exact</span> pour la débloquer.</p>

        <a href="#form" class="btn">Découvrez si votre entreprise est éligible</a>
        <div class="micro-risk">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>
          <span><span class="hl-soft">Aucun paiement</span> ne vous sera demandé sans accord mutuel préalable.</span>
        </div>

        <div class="hero-roadmap">
          <div class="roadmap-card" data-reveal>
            <img class="roadmap-img" src="/roadmap-amenagement-preview.png" alt="Aperçu flouté de la roadmap de croissance en 6 étapes">
            ${HERO_ROADMAP_SVG}
          </div>
          <p class="roadmap-caption">La roadmap détaillée vous est dévoilée pendant votre <span class="hl-soft">diagnostic gratuit</span>.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="steps-title" data-reveal>
      <h2><span class="gradient-text">Les 6 étapes essentielles</span> du scaling, identifiées dans toutes les entreprises d'aménagement et de rénovation que nous avons accompagnées.</h2>
      <p>Et les raisons précises pour lesquelles votre entreprise est probablement bloquée à l'une de ces étapes — <span class="hl">dépendance au réseau</span>, <span class="hl">devis qui traînent</span>, ou <span class="hl">chantiers qui plafonnent</span> votre capacité.</p>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="section-head center" data-reveal>
      <span class="eyebrow-num">Comment ça marche</span>
      <h2>Un process en <span class="gradient-text">3 temps</span>, sans engagement de votre part.</h2>
    </div>
    <div class="how-grid">
      <div class="how-card" data-reveal>
        <div class="how-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg></div>
        <div class="how-num">ÉTAPE 01</div>
        <h3>Diagnostic gratuit</h3>
        <p>Nous réalisons une analyse experte de votre entreprise pour déterminer votre <span class="hl">position exacte</span> sur notre roadmap en 6 étapes.</p>
      </div>
      <div class="how-card" data-reveal>
        <div class="how-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.5" fill="currentColor"/></svg></div>
        <div class="how-num">ÉTAPE 02</div>
        <h3>Détection du blocage</h3>
        <p>Nous identifions précisément ce qui freine votre croissance : <span class="hl">acquisition de chantiers qualifiés</span>, <span class="hl">closing des devis</span>, organisation d'équipe, ou capacité de production.</p>
      </div>
      <div class="how-card" data-reveal>
        <div class="how-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 20l-6-2V4l6 2 6-2 6 2v14l-6-2-6 2z"/><path d="M9 6v14M15 4v14"/></svg></div>
        <div class="how-num">ÉTAPE 03</div>
        <h3>Stratégie personnalisée</h3>
        <p>Vous obtenez un <span class="hl">plan détaillé et sur-mesure</span>, adapté à votre réalité de terrain et à votre région — <span class="hl">sans engagement</span> de votre part.</p>
      </div>
    </div>
    <div class="cta-center">
      <a href="#form" class="btn">Découvrez si votre entreprise est éligible</a>
      <div class="micro-risk">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>
        <span><span class="hl-soft">Aucun paiement</span> ne vous sera demandé sans accord mutuel préalable.</span>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="section-head center" data-reveal>
      <h2>Plus de 20 entreprises d'aménagement et de rénovation au Maroc ont déjà <span class="gradient-text">augmenté leur chiffre d'affaires mensuel</span> grâce à notre accompagnement.</h2>
      <p>Voici la progression type que traverse une entreprise accompagnée par ReachFlow, palier par palier :</p>
    </div>
    <div class="growth-path" data-reveal>
      <div class="growth-steps">
        <div class="growth-line"></div>
        <div class="growth-line-fill"></div>
        <div class="growth-step">
          <div class="growth-badge">01</div>
          <div class="growth-copy"><strong>Point de départ</strong><span>Chantiers irréguliers, dépendants du bouche-à-oreille</span></div>
        </div>
        <div class="growth-step">
          <div class="growth-badge">02</div>
          <div class="growth-copy"><strong>500 000 MAD</strong><span>/ mois — Flux de chantiers stable toute l'année</span></div>
        </div>
        <div class="growth-step">
          <div class="growth-badge">03</div>
          <div class="growth-copy"><strong>1 500 000 MAD</strong><span>/ mois — Votre équipe commerciale prend le relais</span></div>
        </div>
        <div class="growth-step">
          <div class="growth-badge">🚀</div>
          <div class="growth-copy"><strong>3 000 000+ MAD</strong><span>/ mois — Expansion à plusieurs villes</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap approach-grid">
    <div data-reveal>
      <h2>Notre approche est <span class="gradient-text">100&nbsp;% sur mesure</span>.</h2>
      <p style="margin-bottom:16px;">Nous ne sommes pas une agence de leads comme les autres : on construit avec vous une croissance durable, <span class="hl">de l'acquisition jusqu'à la structuration de votre équipe</span>.</p>
      <p>Que votre objectif soit de :</p>
      <ul class="check-list">
        <li><span class="check-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg></span><span>Remplir votre carnet de chantiers toute l'année, <span class="hl">sans creux</span></span></li>
        <li><span class="check-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg></span><span>Augmenter la <span class="hl">valeur moyenne</span> de vos projets</span></li>
        <li><span class="check-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg></span><span>Vous étendre dans <span class="hl">d'autres villes</span></span></li>
        <li><span class="check-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg></span><span>Structurer <span class="hl">votre propre équipe commerciale</span></span></li>
      </ul>
      <p>… nous construisons le plan avec vous, à partir de votre étape actuelle.</p>
    </div>
    <div class="roadmap-card objective-card" data-reveal>
      <div class="objective-grid">
        <div class="objective-item"><span class="niche-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 11h.01M15 11h.01M9 15h.01M15 15h.01"/></svg></span><span>Chantiers toute l'année</span></div>
        <div class="objective-item"><span class="niche-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M15 9.5c0-1.4-1.3-2.5-3-2.5s-3 1.1-3 2.5 1.3 2.2 3 2.5c1.7.3 3 1.1 3 2.5s-1.3 2.5-3 2.5-3-1.1-3-2.5"/></svg></span><span>Valeur des projets</span></div>
        <div class="objective-item"><span class="niche-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.4-7-11.5A7 7 0 0 1 19 9.5C19 14.6 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.3"/></svg></span><span>Nouvelles villes</span></div>
        <div class="objective-item"><span class="niche-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M2.5 20c0-3.5 2.9-6 6.5-6s6.5 2.5 6.5 6"/><circle cx="17.5" cy="8.5" r="2.4"/><path d="M15.8 14.2c2.7.4 4.7 2.4 4.7 5.3"/></svg></span><span>Votre équipe commerciale</span></div>
      </div>
    </div>
  </div>
</section>

<section class="form-section" id="form">
  <div class="wrap">
    <div class="form-wrap">
      <div data-reveal>
        <span class="eyebrow-num">Votre dossier</span>
        <h2>Voyons si votre entreprise est <span class="gradient-text">éligible</span> à un diagnostic gratuit.</h2>
        <p style="margin-top:16px;">Quelques informations pour préparer une analyse pertinente de votre situation — <span class="hl">pas de démarchage, pas d'engagement</span>.</p>
      </div>

      <div class="form-card" data-reveal>
        <div class="form-progress">
          <div class="form-progress-bar"><div class="form-progress-fill" id="formProgressFill"></div></div>
          <span class="form-progress-label" id="formProgressLabel">Étape 1 sur 2</span>
        </div>
        <form id="leadForm">
          <div class="form-step is-active" id="formStep1">
            <div class="field">
              <label for="company">Nom de l'entreprise *</label>
              <input type="text" id="company" required>
            </div>
            <div class="field">
              <label>Quel type de projets réalisez-vous principalement ? *</label>
              <div class="check-grid">
                <label class="check-opt"><input type="checkbox" name="type" value="renovation"> Rénovation complète de logement</label>
                <label class="check-opt"><input type="checkbox" name="type" value="amenagement"> Aménagement intérieur clé-en-main</label>
                <label class="check-opt"><input type="checkbox" name="type" value="cuisine-sdb"> Cuisine &amp; salle de bain</label>
                <label class="check-opt"><input type="checkbox" name="type" value="tertiaire"> Bureaux &amp; locaux commerciaux</label>
              </div>
            </div>
            <button type="button" class="btn btn-block" id="formNextBtn">Continuer</button>
          </div>
          <div class="form-step" id="formStep2">
            <div class="field">
              <label for="fullname">Nom complet *</label>
              <input type="text" id="fullname" required>
            </div>
            <div class="field">
              <label for="phone">Téléphone *
                <span class="hint"><span class="hl">Requis :</span> ce numéro doit être lié à un <span class="hl">compte WhatsApp actif</span> pour que notre expert puisse valider votre dossier.</span>
              </label>
              <input type="tel" id="phone" required>
            </div>
            <div class="field">
              <label for="email">Email *</label>
              <input type="email" id="email" required>
            </div>
            <button type="button" class="btn-back" id="formBackBtn">&larr; Retour</button>
            <button type="submit" class="btn btn-block" id="leadSubmitBtn">Voir si mon entreprise est éligible</button>
            <p class="form-note"><span class="hl-soft">Aucun paiement</span> ne vous sera demandé sans accord mutuel préalable.</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="proof-banner" data-reveal>
      <div class="proof-number">+120 millions de dirhams</div>
      <p>de projets accompagnés pour nos partenaires en <span class="hl-light">moins de 2 ans</span>.</p>
    </div>

    <p class="results-label" data-reveal>Comme on le répète toujours, faites confiance aux chiffres.</p>
    <div class="results-grid" data-reveal>
      <div class="results-item"><img src="/results/calendar-1.jpg" alt="Calendrier de chantiers aménagement — visites, plans, points d'étape" loading="lazy"></div>
      <div class="results-item"><img src="/results/calendar-2.jpg" alt="Calendrier de chantiers aménagement — rendez-vous clients" loading="lazy"></div>
      <div class="results-item"><img src="/results/calendar-3.jpg" alt="Calendrier de chantiers aménagement — suivi technique" loading="lazy"></div>
      <div class="results-item"><img src="/results/crm-stages.jpg" alt="Répartition des opportunités CRM ReachFlow par étape" loading="lazy"></div>
      <div class="results-item"><img src="/results/crm-pipeline.jpg" alt="Pipeline CRM ReachFlow — opportunités aménagement et rénovation" loading="lazy"></div>
      <div class="results-item"><img src="/results/performance-chart.jpg" alt="Analyse de performance — croissance du nombre de clients convertis" loading="lazy"></div>
      <div class="results-item"><img src="/results/payment-1.jpg" alt="Notification de nouveau paiement client ReachFlow" loading="lazy"></div>
      <div class="results-item"><img src="/results/payment-2.jpg" alt="Notification de nouveau paiement client ReachFlow" loading="lazy"></div>
      <div class="results-item"><img src="/results/payment-3.jpg" alt="Notification de nouveau paiement client ReachFlow" loading="lazy"></div>
      <div class="results-item"><img src="/results/payment-4.jpg" alt="Notification de nouveau paiement client ReachFlow" loading="lazy"></div>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="section-head center" data-reveal>
      <h2>Écoutez ce que <span class="gradient-text">nos partenaires</span> disent</h2>
    </div>

    <div class="test-grid">
      <div class="test-audio" data-reveal>
        <div class="test-audio-top">
          <div class="avatar avatar-1">EC</div>
          <div><strong>Entreprise d'aménagement — Casablanca</strong><span class="badge">✓ Audio</span></div>
        </div>
        <div class="waveform"></div>
      </div>
      <div class="test-audio" data-reveal>
        <div class="test-audio-top">
          <div class="avatar avatar-2">SR</div>
          <div><strong>Société de rénovation — Rabat</strong><span class="badge">✓ Audio</span></div>
        </div>
        <div class="waveform"></div>
      </div>
    </div>

    <div class="quote-grid">
      <div class="quote-card" data-reveal>
        <span class="stars">★★★★★</span>
        <p>« Depuis qu'on travaille avec ReachFlow, on <span class="hl">ne dépend plus uniquement du bouche-à-oreille</span>. On a enfin une <span class="hl">vraie stratégie de croissance</span>, pas juste des contacts au compte-gouttes. »</p>
        <div class="quote-who"><div class="avatar avatar-3" style="width:32px;height:32px;font-size:0.7rem;">NM</div><div><strong>Nom du client</strong><span>Entreprise d'aménagement intérieur, Marrakech</span></div></div>
      </div>
      <div class="quote-card" data-reveal>
        <span class="stars">★★★★★</span>
        <p>« L'équipe est réactive et <span class="hl">comprend vraiment les contraintes du secteur</span>. Ce n'est pas juste des demandes, c'est un <span class="hl">vrai accompagnement</span>. »</p>
        <div class="quote-who"><div class="avatar avatar-4" style="width:32px;height:32px;font-size:0.7rem;">HB</div><div><strong>Nom du client</strong><span>Société d'aménagement, Casablanca</span></div></div>
      </div>
      <div class="quote-card" data-reveal>
        <span class="stars">★★★★★</span>
        <p>« On a enfin une <span class="hl">visibilité claire sur notre pipeline</span> de chantiers au lieu de subir les creux d'activité. »</p>
        <div class="quote-who"><div class="avatar avatar-5" style="width:32px;height:32px;font-size:0.7rem;">YT</div><div><strong>Nom du client</strong><span>Société de rénovation, Tanger</span></div></div>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap final-cta" data-reveal>
    <h2>Prêt à savoir où se situe votre entreprise sur <span class="gradient-text">la roadmap</span> ?</h2>
    <a href="#form" class="btn">Découvrez si votre entreprise est éligible</a>
    <div class="micro-risk" style="justify-content:center; margin-top:14px;">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>
      <span><span class="hl-soft">Aucun paiement</span> ne vous sera demandé sans accord mutuel préalable.</span>
    </div>
  </div>
</section>

<footer class="site-footer">
  <div class="wrap">
    <span class="brand-logo"><img src="/reachflow-logo-light-text.png" alt="ReachFlow" style="height:20px;width:auto;margin:0 auto 10px;"></span>
    <p>Le partenaire de croissance pour les entreprises d'aménagement et de rénovation ambitieuses.</p>
    <p style="margin-top:6px;">© 2026 ReachFlow. Tous droits réservés.</p>
  </div>
</footer>

<div class="sticky-cta" id="stickyCta">
  <span class="sticky-cta-label">Diagnostic gratuit · Sans engagement</span>
  <a href="#form" class="btn btn-block">Voir si mon entreprise est éligible</a>
</div>
`;

export default function AmenagementPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const header = root.querySelector<HTMLElement>("#rfHeader");
    const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    root.querySelectorAll<HTMLLabelElement>(".check-opt").forEach((opt) => {
      const input = opt.querySelector("input");
      input?.addEventListener("change", () => opt.classList.toggle("active", input.checked));
    });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealTargets = root.querySelectorAll<HTMLElement>("[data-reveal]");
    let io: IntersectionObserver | null = null;
    if (!reduceMotion && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
      );
      revealTargets.forEach((el) => io!.observe(el));
    } else {
      revealTargets.forEach((el) => el.classList.add("is-visible"));
    }

    const heroBtn = root.querySelector<HTMLElement>(".hero .btn");
    const formSection = root.querySelector<HTMLElement>("#form");
    const stickyCta = root.querySelector<HTMLElement>("#stickyCta");
    let heroPast = false;
    let formInView = false;
    let stickyIo1: IntersectionObserver | null = null;
    let stickyIo2: IntersectionObserver | null = null;
    if (heroBtn && formSection && stickyCta && "IntersectionObserver" in window) {
      const update = () => stickyCta.classList.toggle("is-visible", heroPast && !formInView);
      stickyIo1 = new IntersectionObserver(
        (entries) => { heroPast = !entries[0].isIntersecting; update(); },
        { rootMargin: "0px 0px -85% 0px" }
      );
      stickyIo1.observe(heroBtn);
      stickyIo2 = new IntersectionObserver(
        (entries) => { formInView = entries[0].isIntersecting; update(); },
        { threshold: 0.1 }
      );
      stickyIo2.observe(formSection);
    }

    const form = root.querySelector<HTMLFormElement>("#leadForm");
    const submitBtn = root.querySelector<HTMLButtonElement>("#leadSubmitBtn");
    const step1 = root.querySelector<HTMLElement>("#formStep1");
    const step2 = root.querySelector<HTMLElement>("#formStep2");
    const nextBtn = root.querySelector<HTMLButtonElement>("#formNextBtn");
    const backBtn = root.querySelector<HTMLButtonElement>("#formBackBtn");
    const progressFill = root.querySelector<HTMLElement>("#formProgressFill");
    const progressLabel = root.querySelector<HTMLElement>("#formProgressLabel");
    const goToStep = (n: 1 | 2) => {
      step1?.classList.toggle("is-active", n === 1);
      step2?.classList.toggle("is-active", n === 2);
      if (progressFill) progressFill.style.width = n === 1 ? "50%" : "100%";
      if (progressLabel) progressLabel.textContent = n === 1 ? "Étape 1 sur 2" : "Étape 2 sur 2";
      if (n === 2) form?.querySelector<HTMLInputElement>("#fullname")?.focus();
    };
    const onNext = () => {
      const company = form?.querySelector<HTMLInputElement>("#company");
      const checks = form?.querySelectorAll<HTMLInputElement>('input[name="type"]:checked') ?? [];
      if (!company?.value.trim()) {
        alert("Merci d'indiquer le nom de votre entreprise.");
        company?.focus();
        return;
      }
      if (checks.length === 0) {
        alert("Merci de sélectionner au moins un type de projet.");
        return;
      }
      goToStep(2);
    };
    nextBtn?.addEventListener("click", onNext);
    backBtn?.addEventListener("click", () => goToStep(1));

    const onSubmit = async (e: Event) => {
      e.preventDefault();
      if (!form) return;
      const checks = form.querySelectorAll<HTMLInputElement>('input[name="type"]:checked');
      if (checks.length === 0) {
        goToStep(1);
        alert("Merci de sélectionner au moins un type de projet.");
        return;
      }
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Envoi…"; }

      const fullname = (form.querySelector<HTMLInputElement>("#fullname")?.value || "").trim();
      const phone = (form.querySelector<HTMLInputElement>("#phone")?.value || "").trim();
      const email = (form.querySelector<HTMLInputElement>("#email")?.value || "").trim();
      const company = (form.querySelector<HTMLInputElement>("#company")?.value || "").trim();
      const projectTypes = Array.from(checks).map((c) => c.value);
      const datetime = (() => {
        const n = new Date();
        const p = (x: number) => String(x).padStart(2, "0");
        return `${p(n.getDate())}/${p(n.getMonth() + 1)}/${n.getFullYear()} ${p(n.getHours())}:${p(n.getMinutes())}:${p(n.getSeconds())}`;
      })();

      const sheetPayload = {
        nomComplet: fullname,
        telephone: phone,
        email,
        entreprise: company,
        typesDeProjets: projectTypes.join(", "),
        eligible: true,
        source: "amenagement",
        datetime,
      };

      try {
        await fetch("/api/submit-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...sheetPayload, isDisqualified: false }),
        });
      } catch (err) {
        console.error(err);
      }
      try {
        const url = process.env.NEXT_PUBLIC_CRM_WEBHOOK_URL;
        const secret = process.env.NEXT_PUBLIC_CRM_WEBHOOK_SECRET;
        if (url) {
          await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...(secret ? { Authorization: `Bearer ${secret}` } : {}) },
            body: JSON.stringify({
              name: fullname,
              phone,
              company,
              source: "amenagement",
              has_booked_call: false,
              notes: Object.entries(sheetPayload).map(([k, v]) => `${k}: ${v}`).join(" | "),
            }),
          });
        }
      } catch (err) {
        console.error(err);
      }

      const params = new URLSearchParams({ nom: fullname, phone });
      router.push(`/thank-you-amenagement?${params.toString()}`);
    };
    form?.addEventListener("submit", onSubmit);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
      stickyIo1?.disconnect();
      stickyIo2?.disconnect();
      form?.removeEventListener("submit", onSubmit);
      nextBtn?.removeEventListener("click", onNext);
    };
  }, [router]);

  return (
    <div id="rf-lp" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: PAGE_STYLES }} />
      <div dangerouslySetInnerHTML={{ __html: PAGE_HTML }} />
    </div>
  );
}
