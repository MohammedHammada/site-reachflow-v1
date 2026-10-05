"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// A/B variant of /amenagement: replaces the qualifying form with a
// "chantiers perdus" calculator/simulator funnel. The original /amenagement
// page is untouched (control). Same design system, same backend pattern
// (/api/submit-lead), but its own dedicated Simulateur tab (same sheet as
// /amenagement) since the fields captured here (métier, devis/mois,
// simulation results, UTM, fbclid...) don't match the /amenagement columns.
//
// No disqualification: everyone who completes the form is routed to the
// existing /thank-you-amenagement page, same as the /amenagement funnel.
// Budget/decision-maker answers are still captured for the closer's
// context, but never block anyone.

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
    position:relative; overflow-x:clip; cursor:auto;
  }
  #rf-lp *{box-sizing:border-box;}
  body:has(#rf-lp){ cursor:auto; }
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
  #rf-lp .quote-grid > *, #rf-lp .check-grid > *{ min-width:0; }
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
  #rf-lp .site-header.is-scrolled .header-cta{ opacity:1; transform:translateY(0); pointer-events:auto; max-width:260px; padding-left:18px; padding-right:18px; }
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
  #rf-lp .micro-risk{ font-size:0.86rem; color:var(--text-muted); margin-top:14px; display:flex; gap:8px; align-items:flex-start; justify-content:center; }
  #rf-lp .micro-risk svg{flex-shrink:0; margin-top:2px; color:var(--check);}

  #rf-lp .trustbar{ display:flex; align-items:center; justify-content:center; gap:10px 16px; flex-wrap:wrap; padding:6px 0 32px 0; }
  #rf-lp .trust-avatars{ display:flex; align-items:center; }
  #rf-lp .trust-avatars .avatar{ width:30px; height:30px; margin-left:-9px; border:2px solid var(--bg); box-shadow:0 0 0 1px var(--border); }
  #rf-lp .trust-avatars .avatar:first-child{ margin-left:0; }
  #rf-lp .avatar-more{ background:var(--surface); color:var(--text-muted); font-weight:700; }
  #rf-lp .trust-count{font-size:0.92rem; font-weight:500; color:var(--text-muted);}
  #rf-lp .rating{ display:flex; align-items:center; gap:6px; font-size:0.88rem; font-weight:600; }
  #rf-lp .rating .stars{color:var(--accent); letter-spacing:1px;}

  #rf-lp .hero{padding-top:56px; padding-bottom:60px; text-align:center;}
  #rf-lp .hero-content{ max-width:680px; margin:0 auto; }
  #rf-lp .hero-eyebrow{display:block; text-align:center; font-weight:600; color:var(--accent); font-size:0.9rem; margin-bottom:14px; letter-spacing:0.01em;}
  #rf-lp .hero h1{margin-bottom:22px;}
  #rf-lp .hero .lede{font-size:1.14rem; max-width:48ch; margin:0 auto 24px; color:var(--text-muted);}

  #rf-lp .niche-tags-label{display:block; text-align:center; font-size:0.86rem; color:var(--text-muted); margin-bottom:12px;}
  #rf-lp .niche-tags{display:flex; flex-wrap:wrap; gap:8px; justify-content:center; max-width:580px; margin:0 auto 28px;}
  #rf-lp .niche-tag{font-size:0.82rem; font-weight:600; padding:9px 17px; border-radius:var(--radius-pill); border:1px solid var(--border); background:var(--bg-elevated); color:var(--text); cursor:pointer; transition:border-color 160ms var(--ease), background 160ms var(--ease), transform 120ms var(--ease); white-space:nowrap;}
  #rf-lp .niche-tag:hover{border-color:var(--accent); background:color-mix(in srgb, var(--accent) 10%, var(--bg-elevated));}
  #rf-lp .niche-tag:active{transform:scale(0.95);}
  @media (max-width:640px){ #rf-lp .niche-tags{gap:7px;} #rf-lp .niche-tag{font-size:0.76rem; padding:7px 14px;} }

  #rf-lp .eyebrow-num{ font-weight:600; color:var(--accent); font-size:0.9rem; margin-bottom:12px; display:block; letter-spacing:0.01em; }
  #rf-lp .section-head{max-width:640px; margin-bottom:52px;}
  #rf-lp .section-head p{margin-top:14px; font-size:1.05rem;}
  #rf-lp .center{text-align:center; margin-left:auto; margin-right:auto;}

  #rf-lp .pain-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:22px; margin-bottom:32px;}
  @media (max-width:820px){ #rf-lp .pain-grid{grid-template-columns:1fr;} }
  #rf-lp .pain-card{background:var(--bg-elevated); border:1px solid var(--border); border-radius:var(--radius-m); padding:26px; box-shadow:var(--shadow-s);}
  #rf-lp .pain-card p{color:var(--text); font-size:1rem; line-height:1.5; margin:0;}
  #rf-lp .pain-icon{width:40px; height:40px; border-radius:12px; background:color-mix(in srgb, var(--accent-2) 16%, var(--bg-elevated)); color:var(--accent-2); display:flex; align-items:center; justify-content:center; margin-bottom:16px;}
  #rf-lp .pain-closing{text-align:center; font-size:1.15rem; font-weight:700; color:var(--text); max-width:620px; margin:0 auto;}

  #rf-lp .how-grid{display:grid; grid-template-columns:repeat(3, 1fr); gap:24px; margin-bottom:44px;}
  @media (max-width:820px){ #rf-lp .how-grid{grid-template-columns:1fr;} }
  #rf-lp .how-card{ background:var(--bg-elevated); border:1px solid var(--border); border-radius:var(--radius-m); padding:28px; box-shadow:var(--shadow-s); transition:box-shadow 250ms var(--ease), transform 250ms var(--ease); }
  #rf-lp .how-card:hover{ box-shadow:0 16px 36px color-mix(in srgb, var(--accent) 20%, transparent); transform:translateY(-4px); }
  #rf-lp .how-icon{ width:52px; height:52px; border-radius:16px; background:var(--gradient-brand); display:flex; align-items:center; justify-content:center; color:#fff; box-shadow:0 8px 20px color-mix(in srgb, var(--accent) 35%, transparent); }
  #rf-lp .how-num{font-size:0.8rem; font-weight:700; color:var(--accent); letter-spacing:0.06em; margin-top:16px; display:block;}
  #rf-lp .how-card h3{margin:6px 0 8px 0;}
  #rf-lp .how-card p{font-size:0.96rem;}
  #rf-lp .cta-center{text-align:center; margin-top:8px;}

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

  #rf-lp .roadmap-card{
    position:relative; background:var(--bg-elevated); border:2px solid color-mix(in srgb, var(--accent) 65%, var(--border));
    border-radius:var(--radius-l); overflow:hidden;
    box-shadow:var(--shadow-m), 0 0 0 1px color-mix(in srgb, var(--accent) 20%, transparent), 0 20px 60px color-mix(in srgb, var(--accent) 25%, transparent);
  }

  #rf-lp .guarantee-block{background:var(--bg-elevated); border:1px solid var(--border); border-radius:var(--radius-l); padding:52px 40px; text-align:center; box-shadow:var(--shadow-m);}
  @media (max-width:640px){ #rf-lp .guarantee-block{padding:36px 22px;} }
  #rf-lp .guarantee-block h2{margin-bottom:16px;}
  #rf-lp .guarantee-block p{max-width:640px; margin:0 auto; font-size:1.05rem;}
  #rf-lp .scarcity-badge{display:inline-flex; align-items:center; gap:8px; margin-top:24px; padding:11px 22px; border-radius:var(--radius-pill); background:color-mix(in srgb, var(--accent-2) 16%, var(--bg)); border:1px solid color-mix(in srgb, var(--accent-2) 40%, var(--border)); color:var(--accent-2); font-weight:700; font-size:0.88rem;}

  #rf-lp .form-section{background:var(--surface);}
  #rf-lp .sim-card{max-width:640px; margin:0 auto;}
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
  #rf-lp .form-note{font-size:0.86rem; margin-top:18px; text-align:center;}
  #rf-lp .form-progress{margin-bottom:26px;}
  #rf-lp .form-progress-bar{height:5px; border-radius:99px; background:var(--bg); overflow:hidden;}
  #rf-lp .form-progress-fill{height:100%; width:11%; border-radius:99px; background:var(--gradient-brand); transition:width 380ms var(--ease);}
  #rf-lp .form-progress-label{display:block; margin-top:9px; font-size:0.8rem; font-weight:600; color:var(--text-muted); text-align:center;}
  #rf-lp .form-step{display:none;}
  #rf-lp .form-step.is-active{display:block; animation:rfStepIn 320ms var(--ease);}
  @keyframes rfStepIn{ from{opacity:0; transform:translateX(10px);} to{opacity:1; transform:translateX(0);} }
  #rf-lp .btn-back{display:block; width:100%; text-align:center; background:none; border:none; color:var(--text-muted); font-size:0.86rem; font-weight:600; padding:10px 0 14px; cursor:pointer; transition:color 160ms var(--ease);}
  #rf-lp .btn-back:hover{color:var(--text);}
  #rf-lp .sim-question{text-align:center; margin-bottom:22px;}

  #rf-lp .sim-option-btn{ display:block; width:100%; text-align:left; padding:16px 18px; border-radius:var(--radius-s); border:1px solid var(--border); background:var(--bg); color:var(--text); font-size:0.98rem; font-weight:600; cursor:pointer; margin-bottom:10px; transition:border-color 160ms var(--ease), background 160ms var(--ease), transform 120ms var(--ease); font-family:var(--font); }
  #rf-lp .sim-option-btn:hover{border-color:var(--accent); background:color-mix(in srgb, var(--accent) 8%, var(--bg));}
  #rf-lp .sim-option-btn:active{transform:scale(0.98);}
  #rf-lp .sim-option-btn.is-selected{border-color:var(--accent); background:color-mix(in srgb, var(--accent) 14%, var(--bg)); color:var(--accent-ink);}

  #rf-lp .sim-slider-value{text-align:center; font-size:clamp(2.2rem,6vw,2.8rem); font-weight:700; margin:8px 0 24px; color:var(--text);}
  #rf-lp .sim-slider{width:100%; accent-color:var(--accent); height:6px; margin-bottom:28px;}

  #rf-lp .sim-result-big{text-align:center; font-size:clamp(1.5rem,5vw,2.1rem); font-weight:700; color:var(--text); margin-bottom:6px; line-height:1.3;}
  #rf-lp .sim-result-sub{text-align:center; color:var(--text-muted); margin-bottom:24px; font-size:1rem;}
  #rf-lp .sim-breakdown{background:var(--bg); border:1px solid var(--border); border-radius:var(--radius-m); padding:18px; margin-bottom:20px;}
  #rf-lp .sim-breakdown-row{display:flex; justify-content:space-between; gap:12px; padding:9px 0; font-size:0.9rem; border-bottom:1px solid var(--border); color:var(--text);}
  #rf-lp .sim-breakdown-row:last-child{border-bottom:none;}
  #rf-lp .sim-breakdown-row span:first-child{color:var(--text-muted);}
  #rf-lp .sim-leak-box{background:color-mix(in srgb, var(--accent) 12%, var(--bg-elevated)); border:1px solid color-mix(in srgb, var(--accent) 35%, var(--border)); border-radius:var(--radius-m); padding:18px; margin-bottom:20px;}
  #rf-lp .sim-leak-box strong{display:block; margin-bottom:6px; color:var(--accent-ink); font-size:1rem;}
  #rf-lp .sim-leak-box p{margin:0; font-size:0.92rem; color:var(--text);}


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

  #rf-lp .avatar{width:44px; height:44px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-weight:700; color:#fff; font-size:0.85rem;}
  #rf-lp .avatar svg{width:58%; height:58%; opacity:0.92;}
  #rf-lp .avatar-1{ background:linear-gradient(135deg, #FF6B29, #FF3D68); }
  #rf-lp .avatar-2{ background:linear-gradient(135deg, #FFB020, #FF6B29); }
  #rf-lp .avatar-3{ background:linear-gradient(135deg, #FF3D68, #B84E9E); }
  #rf-lp .avatar-4{ background:linear-gradient(135deg, #FF8A3D, #FF3D68); }
  #rf-lp .avatar-5{ background:linear-gradient(135deg, #FFB020, #FF3D68); }
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
    #rf-lp .trust-avatars .avatar{ width:22px; height:22px; margin-left:-7px; }
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

const PERSON_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>`;

const PAGE_HTML = `
<div class="bg-glow bg-glow-1" aria-hidden="true"></div>
<div class="bg-glow bg-glow-2" aria-hidden="true"></div>

<header id="rfHeader" class="site-header">
  <span class="brand-logo"><img src="/reachflow-logo-light-text.png" alt="ReachFlow" style="height:24px;width:auto;"></span>
  <div class="header-right">
    <div class="brand-tag">Aménagement &amp; Rénovation</div>
    <a href="#simulateur" class="header-cta">Calculer mes chantiers perdus</a>
  </div>
</header>

<section class="hero">
  <div class="wrap">
    <div class="trustbar">
      <div class="trust-avatars">
        <span class="avatar avatar-1">${PERSON_ICON}</span>
        <span class="avatar avatar-2">${PERSON_ICON}</span>
        <span class="avatar avatar-3">${PERSON_ICON}</span>
        <span class="avatar avatar-4">${PERSON_ICON}</span>
        <span class="avatar avatar-5">${PERSON_ICON}</span>
        <span class="avatar avatar-more">+20</span>
      </div>
      <div class="trust-count"><span class="hl-soft">+20 entreprises</span> d'aménagement et de rénovation nous font confiance au Maroc</div>
      <div class="rating"><span class="stars">★★★★★</span> 4.9 · 14 avis</div>
    </div>

    <div class="hero-content">
      <div>
        <span class="hero-eyebrow">Pour les entreprises d'aménagement, de rénovation et de menuiserie au Maroc</span>
        <h1>Combien de chantiers laissez-vous <span class="gradient-text">partir</span> chaque mois ?</h1>
        <p class="lede">Répondez à 4 questions. En 30 secondes, vous voyez exactement combien de MAD de chantiers vous perdez — et d'où vient la fuite.</p>

        <div class="niche-tags-label">Vous vous reconnaissez ?</div>
        <div class="niche-tags" id="nicheTags">
          <button type="button" class="niche-tag" data-metier="amenagement-renovation">Aménagement &amp; rénovation</button>
          <button type="button" class="niche-tag" data-metier="menuiserie-alu">Menuiserie aluminium</button>
          <button type="button" class="niche-tag" data-metier="menuiserie-pvc">Menuiserie PVC</button>
          <button type="button" class="niche-tag" data-metier="menuiserie-bois">Menuiserie bois</button>
        </div>

        <a href="#simulateur" class="btn">Calculer mes chantiers perdus</a>
        <div class="micro-risk">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>
          <span>Gratuit · 30 secondes · Résultat immédiat, sans inscription</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="section-head center" data-reveal>
      <h2>Vous reconnaissez l'une de ces situations ?</h2>
    </div>
    <div class="pain-grid">
      <div class="pain-card" data-reveal>
        <div class="pain-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg></div>
        <p>Le devis à 80 000 MAD envoyé il y a 3 semaines, toujours sans réponse.</p>
      </div>
      <div class="pain-card" data-reveal>
        <div class="pain-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg></div>
        <p>Les mois creux où votre équipe attend un chantier.</p>
      </div>
      <div class="pain-card" data-reveal>
        <div class="pain-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8-6.2 3.8 1.6-7-5.4-4.7 7.1-.6z"/></svg></div>
        <p>Les clients qui vous comparent au moins cher, au lieu de choisir la qualité.</p>
      </div>
    </div>
    <p class="pain-closing" data-reveal>Ce n'est pas un problème de savoir-faire. C'est un problème de système.</p>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="section-head center" data-reveal>
      <span class="eyebrow-num">Comment ça marche</span>
      <h2>Comment ça <span class="gradient-text">marche</span></h2>
    </div>
    <div class="how-grid">
      <div class="how-card" data-reveal>
        <div class="how-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg></div>
        <div class="how-num">ÉTAPE 01</div>
        <h3>Calculez vos chantiers perdus (30 s)</h3>
        <p>4 questions simples, et vous voyez immédiatement combien de MAD vous laissez partir chaque mois, et pourquoi.</p>
      </div>
      <div class="how-card" data-reveal>
        <div class="how-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.5" fill="currentColor"/></svg></div>
        <div class="how-num">ÉTAPE 02</div>
        <h3>Réservez votre session Plan Chantiers 90 jours</h3>
        <p>45 minutes avec un expert pour construire votre plan de récupération, avec un objectif chiffré.</p>
      </div>
      <div class="how-card" data-reveal>
        <div class="how-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 20l-6-2V4l6 2 6-2 6 2v14l-6-2-6 2z"/><path d="M9 6v14M15 4v14"/></svg></div>
        <div class="how-num">ÉTAPE 03</div>
        <h3>On installe la Machine à Chantiers</h3>
        <p>Publicités, qualification, relance des devis : vous ne faites que les visites.</p>
      </div>
    </div>
    <div class="cta-center">
      <a href="#simulateur" class="btn">Calculer mes chantiers perdus</a>
      <div class="micro-risk">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>
        <span>Gratuit · 30 secondes · Résultat immédiat, sans inscription</span>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="section-head center" data-reveal>
      <h2>Vos 90 premiers jours avec <span class="gradient-text">ReachFlow</span></h2>
    </div>
    <div class="growth-path" data-reveal>
      <div class="growth-steps">
        <div class="growth-line"></div>
        <div class="growth-line-fill"></div>
        <div class="growth-step">
          <div class="growth-badge">01</div>
          <div class="growth-copy"><strong>J1–7</strong><span>Installation du système : publicités, formulaire, qualification WhatsApp</span></div>
        </div>
        <div class="growth-step">
          <div class="growth-badge">02</div>
          <div class="growth-copy"><strong>J14–21</strong><span>Vos premiers rendez-vous qualifiés arrivent</span></div>
        </div>
        <div class="growth-step">
          <div class="growth-badge">03</div>
          <div class="growth-copy"><strong>J30</strong><span>Relance automatique de vos devis en attente</span></div>
        </div>
        <div class="growth-step">
          <div class="growth-badge">🚀</div>
          <div class="growth-copy"><strong>J90</strong><span>3 mois de chantiers dans votre carnet. Sinon, on continue gratuitement.</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap approach-grid">
    <div data-reveal>
      <h2>Et une fois votre carnet <span class="gradient-text">plein</span> ?</h2>
      <p style="margin-bottom:16px;">La garantie 90 jours, c'est le point de départ. Ensuite, on construit la suite avec vous, <span class="hl">de l'acquisition jusqu'à la structuration de votre équipe</span> :</p>
      <ul class="check-list">
        <li><span class="check-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg></span><span>Garder un carnet plein toute l'année, <span class="hl">sans creux</span></span></li>
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

<section>
  <div class="wrap">
    <div class="guarantee-block" data-reveal>
      <h2>La garantie <span class="gradient-text">Machine à Chantiers</span></h2>
      <p>Votre premier propriétaire qualifié sous 7 jours. 20 propriétaires prêts à lancer leurs travaux en 90 jours (25 en menuiserie). Si l'objectif n'est pas atteint, on continue 60 jours de plus, gratuitement.</p>
      <span class="scarcity-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M13 2L3 14h8l-1 8 11-14h-8z"/></svg>
        5 places au tarif fondateur
      </span>
    </div>
  </div>
</section>

<section class="form-section" id="simulateur">
  <div class="wrap">
    <div class="section-head center" data-reveal>
      <span class="eyebrow-num">Simulateur</span>
      <h2>Calculez vos <span class="gradient-text">chantiers perdus</span></h2>
    </div>

    <div class="form-card sim-card" data-reveal>
      <div class="form-progress">
        <div class="form-progress-bar"><div class="form-progress-fill" id="formProgressFill"></div></div>
        <span class="form-progress-label" id="formProgressLabel">Étape 1 sur 7</span>
      </div>
      <form id="simForm">

        <div class="form-step is-active" data-step="1">
          <div class="sim-question"><h3>Vous êtes dans quel métier ?</h3></div>
          <button type="button" class="sim-option-btn" data-field="metier" data-value="amenagement-renovation">Aménagement / rénovation</button>
          <button type="button" class="sim-option-btn" data-field="metier" data-value="menuiserie-alu">Menuiserie aluminium</button>
          <button type="button" class="sim-option-btn" data-field="metier" data-value="menuiserie-pvc">Menuiserie PVC</button>
          <button type="button" class="sim-option-btn" data-field="metier" data-value="menuiserie-bois">Menuiserie bois</button>
        </div>

        <div class="form-step" data-step="2">
          <div class="sim-question"><h3>Combien de devis envoyez-vous par mois ?</h3></div>
          <div class="sim-slider-value" id="devisSliderValue">10</div>
          <input type="range" class="sim-slider" id="devisSlider" min="1" max="50" value="10">
          <button type="button" class="btn-back step-back">&larr; Retour</button>
          <button type="button" class="btn btn-block" id="simStep2Next">Continuer</button>
        </div>

        <div class="form-step" data-step="3">
          <div class="sim-question"><h3>Sur 10 devis, combien sont signés ?</h3></div>
          <button type="button" class="sim-option-btn" data-field="signes_sur_10" data-value="1">1</button>
          <button type="button" class="sim-option-btn" data-field="signes_sur_10" data-value="2">2</button>
          <button type="button" class="sim-option-btn" data-field="signes_sur_10" data-value="3">3</button>
          <button type="button" class="sim-option-btn" data-field="signes_sur_10" data-value="4">4</button>
          <button type="button" class="sim-option-btn" data-field="signes_sur_10" data-value="5">5+</button>
          <button type="button" class="btn-back step-back">&larr; Retour</button>
        </div>

        <div class="form-step" data-step="4">
          <div class="sim-question"><h3>Quel est le montant moyen d'un chantier ?</h3></div>
          <button type="button" class="sim-option-btn" data-field="montant_moyen" data-value="moins-20k" data-mad="15000">Moins de 20 000 MAD</button>
          <button type="button" class="sim-option-btn" data-field="montant_moyen" data-value="20k-50k" data-mad="35000">20 000 – 50 000 MAD</button>
          <button type="button" class="sim-option-btn" data-field="montant_moyen" data-value="50k-100k" data-mad="75000">50 000 – 100 000 MAD</button>
          <button type="button" class="sim-option-btn" data-field="montant_moyen" data-value="plus-100k" data-mad="120000">Plus de 100 000 MAD</button>
          <button type="button" class="btn-back step-back">&larr; Retour</button>
        </div>

        <div class="form-step" data-step="5">
          <div class="sim-question"><h3>En combien de temps répondez-vous à une nouvelle demande ?</h3></div>
          <button type="button" class="sim-option-btn" data-field="delai_reponse" data-value="moins-1h" data-rate="0.15">Moins d'1 heure</button>
          <button type="button" class="sim-option-btn" data-field="delai_reponse" data-value="jour-meme" data-rate="0.20">Le jour même</button>
          <button type="button" class="sim-option-btn" data-field="delai_reponse" data-value="1-2-jours" data-rate="0.30">1 à 2 jours</button>
          <button type="button" class="sim-option-btn" data-field="delai_reponse" data-value="plus-2-jours" data-rate="0.40">Plus de 2 jours</button>
          <button type="button" class="btn-back step-back">&larr; Retour</button>
        </div>

        <div class="form-step" data-step="6">
          <div class="sim-result-big" id="simResultBig"></div>
          <div class="sim-result-sub" id="simResultSub"></div>
          <div class="sim-breakdown" id="simBreakdown"></div>
          <div class="sim-leak-box" id="simLeakBox"></div>
          <p style="text-align:center;">La bonne nouvelle : une partie de ce montant est récupérable. Pendant une session Plan Chantiers 90 jours de 45 minutes, on construit avec vous le plan exact pour la récupérer.</p>
          <button type="button" class="btn btn-block" id="simStep6Next">Je veux récupérer ces chantiers</button>
          <p class="form-note">Estimation basée sur vos réponses et des hypothèses prudentes.</p>
        </div>

        <div class="form-step" data-step="7">
          <div class="sim-question"><h3>Où peut-on vous joindre pour préparer votre session ?</h3></div>
          <div class="field">
            <label for="simNom">Prénom et nom *</label>
            <input type="text" id="simNom" required>
          </div>
          <div class="field">
            <label for="simPhone">Numéro WhatsApp *
              <span class="hint"><span class="hl">Requis :</span> ce numéro doit être lié à un <span class="hl">compte WhatsApp actif</span> pour que notre expert puisse valider votre dossier.</span>
            </label>
            <input type="tel" id="simPhone" required>
          </div>
          <div class="field">
            <label for="simVille">Ville *</label>
            <input type="text" id="simVille" required>
          </div>
          <div class="field">
            <label for="simEntreprise">Nom de l'entreprise *</label>
            <input type="text" id="simEntreprise" required>
          </div>
          <div class="field">
            <label>Quel budget publicitaire mensuel pouvez-vous investir pour attirer de nouveaux clients ? *</label>
            <div class="check-grid">
              <button type="button" class="sim-option-btn" data-field="budget_pub" data-value="moins-3k">Moins de 3 000 MAD</button>
              <button type="button" class="sim-option-btn" data-field="budget_pub" data-value="3k-6k">3 000 – 6 000 MAD</button>
              <button type="button" class="sim-option-btn" data-field="budget_pub" data-value="6k-10k">6 000 – 10 000 MAD</button>
              <button type="button" class="sim-option-btn" data-field="budget_pub" data-value="plus-10k">Plus de 10 000 MAD</button>
            </div>
          </div>
          <div class="field">
            <label>Êtes-vous la personne qui prend la décision ? *</label>
            <div class="check-grid">
              <button type="button" class="sim-option-btn" data-field="decideur" data-value="oui">Oui</button>
              <button type="button" class="sim-option-btn" data-field="decideur" data-value="avec-associe">Avec un associé</button>
              <button type="button" class="sim-option-btn" data-field="decideur" data-value="non">Non</button>
            </div>
          </div>
          <button type="button" class="btn-back step-back">&larr; Retour</button>
          <button type="button" class="btn btn-block" id="simStep7Submit">Voir si mon entreprise est éligible</button>
        </div>

      </form>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="proof-banner" data-reveal>
      <div class="proof-number">+85 millions de dirhams</div>
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

    <div class="quote-grid">
      <div class="quote-card" data-reveal>
        <span class="stars">★★★★★</span>
        <p>« Depuis qu'on travaille avec ReachFlow, on <span class="hl">ne dépend plus uniquement du bouche-à-oreille</span>. On a enfin une <span class="hl">vraie stratégie de croissance</span>, pas juste des contacts au compte-gouttes. »</p>
        <div class="quote-who"><div class="avatar avatar-3" style="width:32px;height:32px;">${PERSON_ICON}</div><div><span>Entreprise d'aménagement intérieur, Marrakech</span></div></div>
      </div>
      <div class="quote-card" data-reveal>
        <span class="stars">★★★★★</span>
        <p>« L'équipe est réactive et <span class="hl">comprend vraiment les contraintes du secteur</span>. Ce n'est pas juste des demandes, c'est un <span class="hl">vrai accompagnement</span>. »</p>
        <div class="quote-who"><div class="avatar avatar-4" style="width:32px;height:32px;">${PERSON_ICON}</div><div><span>Société d'aménagement, Casablanca</span></div></div>
      </div>
      <div class="quote-card" data-reveal>
        <span class="stars">★★★★★</span>
        <p>« On a enfin une <span class="hl">visibilité claire sur notre pipeline</span> de chantiers au lieu de subir les creux d'activité. »</p>
        <div class="quote-who"><div class="avatar avatar-5" style="width:32px;height:32px;">${PERSON_ICON}</div><div><span>Société de rénovation, Tanger</span></div></div>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap final-cta" data-reveal>
    <h2>Combien de chantiers avez-vous laissé <span class="gradient-text">partir</span> ce mois-ci ?</h2>
    <a href="#simulateur" class="btn">Calculer mes chantiers perdus</a>
    <div class="micro-risk" style="margin-top:14px;">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>
      <span>Gratuit · 30 secondes · Résultat immédiat, sans inscription</span>
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
  <span class="sticky-cta-label">Calculez vos chantiers perdus · 30 s</span>
  <a href="#simulateur" class="btn btn-block">Calculer</a>
</div>
`;

type SimData = {
  lead_id: string;
  metier: string;
  devis_mois: number;
  signes_sur_10: number;
  montant_moyen_label: string;
  montant_moyen_value: number;
  delai_reponse: string;
  part_recuperable: number;
  devis_perdus: number;
  mad_perdus_mois: number;
  mad_perdus_an: number;
  main_leak: string;
  nom: string;
  whatsapp: string;
  ville: string;
  entreprise: string;
  budget_pub: string;
  decideur: string;
  qualifie: boolean;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  fbclid: string;
};

function fmtMAD(n: number): string {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function makeLeadId(): string {
  return `sim_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

export default function AmenagementSimulateurPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const header = root.querySelector<HTMLElement>("#rfHeader");
    const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

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
    const simSection = root.querySelector<HTMLElement>("#simulateur");
    const stickyCta = root.querySelector<HTMLElement>("#stickyCta");
    let heroPast = false;
    let simInView = false;
    let stickyIo1: IntersectionObserver | null = null;
    let stickyIo2: IntersectionObserver | null = null;
    if (heroBtn && simSection && stickyCta && "IntersectionObserver" in window) {
      const update = () => stickyCta.classList.toggle("is-visible", heroPast && !simInView);
      stickyIo1 = new IntersectionObserver(
        (entries) => { heroPast = !entries[0].isIntersecting; update(); },
        { rootMargin: "0px 0px -85% 0px" }
      );
      stickyIo1.observe(heroBtn);
      stickyIo2 = new IntersectionObserver(
        (entries) => { simInView = entries[0].isIntersecting; update(); },
        { threshold: 0.1 }
      );
      stickyIo2.observe(simSection);
    }

    // ---- Simulator state ----
    const data: SimData = {
      lead_id: makeLeadId(),
      metier: "", devis_mois: 10, signes_sur_10: 0,
      montant_moyen_label: "", montant_moyen_value: 0,
      delai_reponse: "", part_recuperable: 0,
      devis_perdus: 0, mad_perdus_mois: 0, mad_perdus_an: 0, main_leak: "",
      nom: "", whatsapp: "", ville: "", entreprise: "",
      budget_pub: "", decideur: "", qualifie: false,
      utm_source: "", utm_medium: "", utm_campaign: "", fbclid: "",
    };

    try {
      const qs = new URLSearchParams(window.location.search);
      data.utm_source = qs.get("utm_source") || "";
      data.utm_medium = qs.get("utm_medium") || "";
      data.utm_campaign = qs.get("utm_campaign") || "";
      data.fbclid = qs.get("fbclid") || "";
    } catch { /* noop */ }

    const simForm = root.querySelector<HTMLFormElement>("#simForm");
    const steps = Array.from(root.querySelectorAll<HTMLElement>("#simForm .form-step"));
    const totalSteps = steps.length;
    const progressFill = root.querySelector<HTMLElement>("#formProgressFill");
    const progressLabel = root.querySelector<HTMLElement>("#formProgressLabel");

    const pushDataLayer = (payload: Record<string, unknown>) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(payload);
    };

    const goToSimStep = (n: number) => {
      steps.forEach((step) => step.classList.toggle("is-active", Number(step.dataset.step) === n));
      if (progressFill) progressFill.style.width = `${(n / totalSteps) * 100}%`;
      if (progressLabel) progressLabel.textContent = `Étape ${n} sur ${totalSteps}`;
      pushDataLayer({ event: "simulator_step", step: n });
      if (n === 6) renderResult();
      simForm?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // ---- Métier (step 1) + hero niche-tag pre-select ----
    const metierButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-field="metier"]'));
    const selectMetier = (value: string) => {
      data.metier = value;
      metierButtons.forEach((b) => b.classList.toggle("is-selected", b.dataset.value === value));
    };
    metierButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        selectMetier(btn.dataset.value || "");
        setTimeout(() => goToSimStep(2), 180);
      });
    });

    const nicheTagButtons = root.querySelectorAll<HTMLButtonElement>(".niche-tag");
    nicheTagButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const metier = btn.dataset.metier || "";
        selectMetier(metier);
        document.querySelector("#simulateur")?.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => goToSimStep(2), 150);
      });
    });

    // ---- Devis/mois slider (step 2) ----
    const devisSlider = root.querySelector<HTMLInputElement>("#devisSlider");
    const devisSliderValue = root.querySelector<HTMLElement>("#devisSliderValue");
    const onSliderInput = () => {
      if (devisSliderValue && devisSlider) devisSliderValue.textContent = devisSlider.value;
    };
    devisSlider?.addEventListener("input", onSliderInput);
    const step2NextBtn = root.querySelector<HTMLButtonElement>("#simStep2Next");
    const onStep2Next = () => {
      data.devis_mois = Number(devisSlider?.value || 10);
      goToSimStep(3);
    };
    step2NextBtn?.addEventListener("click", onStep2Next);

    // ---- Generic single-select auto-advance (signes, montant, delai) ----
    const autoAdvanceFields = ["signes_sur_10", "montant_moyen", "delai_reponse"];
    const autoAdvanceButtons: { btn: HTMLButtonElement; handler: () => void }[] = [];
    autoAdvanceFields.forEach((field) => {
      const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>(`[data-field="${field}"]`));
      buttons.forEach((btn) => {
        const handler = () => {
          buttons.forEach((b) => b.classList.toggle("is-selected", b === btn));
          const value = btn.dataset.value || "";
          if (field === "signes_sur_10") data.signes_sur_10 = Number(value);
          if (field === "montant_moyen") {
            data.montant_moyen_label = btn.textContent?.trim() || "";
            data.montant_moyen_value = Number(btn.dataset.mad || 0);
          }
          if (field === "delai_reponse") {
            data.delai_reponse = value;
            data.part_recuperable = Number(btn.dataset.rate || 0);
          }
          const currentStepEl = btn.closest<HTMLElement>(".form-step");
          const currentStepNum = Number(currentStepEl?.dataset.step || 0);
          setTimeout(() => goToSimStep(currentStepNum + 1), 180);
        };
        btn.addEventListener("click", handler);
        autoAdvanceButtons.push({ btn, handler });
      });
    });

    // ---- Back buttons ----
    const backButtons = Array.from(root.querySelectorAll<HTMLButtonElement>(".step-back"));
    const onBack = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement;
      const n = Number(btn.closest<HTMLElement>(".form-step")?.dataset.step || 1);
      goToSimStep(Math.max(1, n - 1));
    };
    backButtons.forEach((btn) => btn.addEventListener("click", onBack));

    // ---- Result (step 6) ----
    const leakRules = (): { title: string; text: string } => {
      if (data.delai_reponse === "1-2-jours" || data.delai_reponse === "plus-2-jours") {
        return {
          title: "Votre délai de réponse",
          text: "Un propriétaire qui demande un devis contacte souvent plusieurs entreprises. Celle qui répond en premier a une longueur d'avance — et vous arrivez après.",
        };
      }
      if (data.signes_sur_10 <= 2) {
        return {
          title: "Votre taux de signature",
          text: "Vos devis partent, mais trop peu sont signés. Le problème est souvent la qualité des demandes reçues ou le suivi après la visite.",
        };
      }
      return {
        title: "Le suivi de vos devis",
        text: "Vous répondez vite et vous signez correctement. La fuite vient des devis envoyés qui ne sont jamais relancés.",
      };
    };

    const renderResult = () => {
      const devisPerdusRaw = data.devis_mois * (1 - data.signes_sur_10 / 10);
      const devisPerdus = Math.floor(devisPerdusRaw);
      const madPerdusMois = Math.round((devisPerdus * data.montant_moyen_value * data.part_recuperable) / 1000) * 1000;
      const madPerdusAn = madPerdusMois * 12;
      const leak = leakRules();

      data.devis_perdus = devisPerdus;
      data.mad_perdus_mois = madPerdusMois;
      data.mad_perdus_an = madPerdusAn;
      data.main_leak = leak.title;

      const big = root.querySelector<HTMLElement>("#simResultBig");
      const sub = root.querySelector<HTMLElement>("#simResultSub");
      const breakdown = root.querySelector<HTMLElement>("#simBreakdown");
      const leakBox = root.querySelector<HTMLElement>("#simLeakBox");

      if (big) big.textContent = `Vous laissez partir environ ${fmtMAD(madPerdusMois)} MAD de chantiers par mois.`;
      if (sub) sub.textContent = `Soit environ ${fmtMAD(madPerdusAn)} MAD par an.`;
      if (breakdown) {
        breakdown.innerHTML = `
          <div class="sim-breakdown-row"><span>Devis envoyés</span><span>${data.devis_mois} / mois</span></div>
          <div class="sim-breakdown-row"><span>Devis signés</span><span>${data.signes_sur_10} sur 10</span></div>
          <div class="sim-breakdown-row"><span>Devis perdus</span><span>environ ${devisPerdus} / mois</span></div>
          <div class="sim-breakdown-row"><span>Montant moyen d'un chantier</span><span>${data.montant_moyen_label}</span></div>
        `;
      }
      if (leakBox) {
        leakBox.innerHTML = `<strong>Votre principale fuite : ${leak.title}</strong><p>${leak.text}</p>`;
      }

      // GTM listens for this "simulator_result" dataLayer event and fires
      // the Meta "SimulatorResult" custom event from there.
      pushDataLayer({
        event: "simulator_result",
        metier: data.metier,
        devis_mois: data.devis_mois,
        signes_sur_10: data.signes_sur_10,
        montant_moyen_value: data.montant_moyen_value,
        delai_reponse: data.delai_reponse,
        mad_perdus_mois: madPerdusMois,
        mad_perdus_an: madPerdusAn,
      });
    };

    const step6NextBtn = root.querySelector<HTMLButtonElement>("#simStep6Next");
    step6NextBtn?.addEventListener("click", () => goToSimStep(7));

    // ---- Phone filtering (step 7) ----
    const simPhoneEl = root.querySelector<HTMLInputElement>("#simPhone");
    const onSimPhoneInput = () => {
      if (!simPhoneEl) return;
      const filtered = simPhoneEl.value.replace(/[^\d\s()+-]/g, "");
      if (filtered !== simPhoneEl.value) simPhoneEl.value = filtered;
    };
    simPhoneEl?.addEventListener("input", onSimPhoneInput);

    const buildPayload = (extra: Record<string, unknown> = {}) => ({
      lead_id: data.lead_id,
      metier: data.metier,
      devis_mois: data.devis_mois,
      signes_sur_10: data.signes_sur_10,
      montant_moyen_label: data.montant_moyen_label,
      montant_moyen_value: data.montant_moyen_value,
      delai_reponse: data.delai_reponse,
      part_recuperable: data.part_recuperable,
      devis_perdus: data.devis_perdus,
      mad_perdus_mois: data.mad_perdus_mois,
      mad_perdus_an: data.mad_perdus_an,
      main_leak: data.main_leak,
      nom: data.nom,
      whatsapp: data.whatsapp,
      ville: data.ville,
      entreprise: data.entreprise,
      budget_pub: data.budget_pub,
      decideur: data.decideur,
      qualifie: data.qualifie,
      utm_source: data.utm_source,
      utm_medium: data.utm_medium,
      utm_campaign: data.utm_campaign,
      fbclid: data.fbclid,
      source: "amenagement-simulateur",
      source_page: "amenagement-simulateur",
      datetime: (() => {
        const n = new Date();
        const p = (x: number) => String(x).padStart(2, "0");
        return `${p(n.getDate())}/${p(n.getMonth() + 1)}/${n.getFullYear()} ${p(n.getHours())}:${p(n.getMinutes())}:${p(n.getSeconds())}`;
      })(),
      ...extra,
    });

    // ---- Qualification buttons (budget_pub, decideur) — live inside step 7 now ----
    const qualifFields = ["budget_pub", "decideur"];
    const qualifButtons: { btn: HTMLButtonElement; handler: () => void }[] = [];
    qualifFields.forEach((field) => {
      const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>(`[data-field="${field}"]`));
      buttons.forEach((btn) => {
        const handler = () => {
          buttons.forEach((b) => b.classList.toggle("is-selected", b === btn));
          const value = btn.dataset.value || "";
          if (field === "budget_pub") data.budget_pub = value;
          if (field === "decideur") data.decideur = value;
        };
        btn.addEventListener("click", handler);
        qualifButtons.push({ btn, handler });
      });
    });

    const step7SubmitBtn = root.querySelector<HTMLButtonElement>("#simStep7Submit");
    const onStep7Submit = () => {
      const nomEl = root.querySelector<HTMLInputElement>("#simNom");
      const villeEl = root.querySelector<HTMLInputElement>("#simVille");
      const entrepriseEl = root.querySelector<HTMLInputElement>("#simEntreprise");
      const nom = (nomEl?.value || "").trim();
      const phone = (simPhoneEl?.value || "").trim();
      const ville = (villeEl?.value || "").trim();
      const entreprise = (entrepriseEl?.value || "").trim();

      if (!nom) { alert("Merci d'indiquer votre nom."); nomEl?.focus(); return; }
      const phoneDigits = phone.replace(/\D/g, "");
      if (phoneDigits.length < 9 || phoneDigits.length > 14 || !/^[\d\s()+-]+$/.test(phone)) {
        alert("Merci d'entrer un numéro de téléphone valide (chiffres uniquement).");
        simPhoneEl?.focus();
        return;
      }
      if (!ville) { alert("Merci d'indiquer votre ville."); villeEl?.focus(); return; }
      if (!entreprise) { alert("Merci d'indiquer le nom de votre entreprise."); entrepriseEl?.focus(); return; }
      if (!data.budget_pub) { alert("Merci d'indiquer le budget envisagé."); return; }
      if (!data.decideur) { alert("Merci d'indiquer si vous êtes décisionnaire."); return; }

      data.nom = nom;
      data.whatsapp = phone;
      data.ville = ville;
      data.entreprise = entreprise;
      // No disqualification: everyone who completes the form moves on.
      data.qualifie = true;

      // Google Apps Script responses are slow (2-5s), so we don't make the
      // visitor wait on it — redirect right away. keepalive:true lets the
      // request survive that immediate navigation instead of risking
      // cancellation mid-flight (seen as a real issue on /amenagement's
      // equivalent GHL call).
      fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...buildPayload(), isDisqualified: false }),
        keepalive: true,
      }).catch((err) => console.error(err));

      // GTM listens for this and fires the Meta "QualifiedLead" custom event.
      pushDataLayer({ event: "qualified_lead", metier: data.metier, budget_pub: data.budget_pub, decideur: data.decideur });

      const params = new URLSearchParams({
        nom: data.nom,
        phone: data.whatsapp,
        entreprise: data.entreprise,
        types: data.metier,
      });
      router.push(`/thank-you-amenagement?${params.toString()}`);
    };
    step7SubmitBtn?.addEventListener("click", onStep7Submit);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
      stickyIo1?.disconnect();
      stickyIo2?.disconnect();
      devisSlider?.removeEventListener("input", onSliderInput);
      step2NextBtn?.removeEventListener("click", onStep2Next);
      autoAdvanceButtons.forEach(({ btn, handler }) => btn.removeEventListener("click", handler));
      backButtons.forEach((btn) => btn.removeEventListener("click", onBack));
      step6NextBtn?.removeEventListener("click", () => goToSimStep(7));
      simPhoneEl?.removeEventListener("input", onSimPhoneInput);
      step7SubmitBtn?.removeEventListener("click", onStep7Submit);
      qualifButtons.forEach(({ btn, handler }) => btn.removeEventListener("click", handler));
    };
  }, [router]);

  return (
    <div id="rf-lp" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: PAGE_STYLES }} />
      <div dangerouslySetInnerHTML={{ __html: PAGE_HTML }} />
    </div>
  );
}
