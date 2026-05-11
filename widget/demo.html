<!DOCTYPE html>
<html lang="sk">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,interactive-widget=resizes-visual" />
<title>Chat — odvoznabytku.sk</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root {
    --primary: #0284c7;          /* sky-600 */
    --primary-hover: #0369a1;    /* sky-700 */
    --primary-deep: #075985;     /* sky-800 */
    --accent: #38bdf8;           /* sky-400 */
    --accent-soft: #bae6fd;      /* sky-200 */
    --bg: #ffffff;
    --surface: #f8fafc;
    --surface-2: #f0f9ff;        /* sky-50 */
    --text: #0f172a;
    --text-muted: #64748b;
    --border: #cbd5e1;
    --bot-bubble-bg: #e0f2fe;    /* sky-100 */
    --bot-bubble-text: #075985;
    --bot-bubble-border: #7dd3fc; /* sky-300 */
    --radius: 18px;
    --transition: cubic-bezier(0.22,0.61,0.36,1);
    --glow: 0 0 24px rgba(2, 132, 199, 0.32);
  }
  * { box-sizing: border-box; }
  *::before, *::after { box-sizing: border-box; }
  html, body { margin:0; padding:0; }
  body {
    font-family: 'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif;
    color: var(--text);
    background: #f0f9ff;
    min-height: 100dvh;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
  }

  /* Flat blue gradient for "branded" surfaces (header, CTA, send, user bubble) */
  .cbw-dynamic-green, .cbw-input:focus {
    background-color: var(--primary) !important;
    background-image: linear-gradient(145deg, #0ea5e9 0%, #0284c7 50%, #075985 100%) !important;
    color: #fff !important;
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.22),
      inset 0 -1px 2px rgba(0,0,0,0.18),
      0 6px 18px -6px rgba(2, 132, 199, 0.55) !important;
    border: none !important;
  }

  /* ============================================================
     WIDGET WAPPER
     ============================================================ */
  .cbw-root {
    --z: 2147483000;
    position: fixed; bottom: 24px; right: 24px;
    z-index: var(--z);
  }

  .cbw-launcher {
    position: relative; width: 72px; height: 72px;
    border: none; cursor: pointer; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    transition: transform 250ms var(--transition), filter 200ms ease;
  }
  .cbw-launcher:hover { transform: translateY(-3px) scale(1.04); filter: brightness(1.1); }
  .cbw-launcher:active { transform: scale(0.95); }
  .cbw-root[data-open="true"] .cbw-launcher {
    opacity: 0; pointer-events: none; transition: opacity 200ms ease 100ms;
  }

  /* Notifikačný odznak */
  .cbw-badge {
    position: absolute; top: -2px; right: 2px;
    width: 24px; height: 24px; border-radius: 50%;
    background: #ef4444; border: 2.5px solid #fff;
    color: #fff; font-size: 12px; font-weight: bold;
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transform: scale(0);
    animation: cbw-badge-appear 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 5s forwards, cbw-pulse-badge 2s infinite 5s;
  }
  @keyframes cbw-badge-appear { 100% { opacity: 1; transform: scale(1); } }
  @keyframes cbw-pulse-badge {
    0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
    70% { box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
    100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
  }

  /* Zelené Konfety */
  .cbw-confetti {
    position: fixed; width: 6px; height: 6px; border-radius: 50%;
    pointer-events: none; z-index: 2147483005;
    animation: cbw-confetti-anim 0.6s ease-out forwards;
  }
  @keyframes cbw-confetti-anim {
    0% { transform: translate(0, 0) scale(1); opacity: 1; }
    100% { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; }
  }

  /* ---------- BOX ROBOT (cardboard box with stuff poking out) ---------- */
  .cbw-robot { width: 48px; height: 48px; display: block; overflow: visible; }
  .cbw-robot.cbw-robot-sm { width: 36px; height: 36px; }
  .cbw-robot-head { transition: transform .3s cubic-bezier(0.34, 1.56, 0.64, 1); transform-origin: 40px 50px; }
  .cbw-eye, .cbw-eyes, .cbw-mouth { transition: transform .3s ease; transform-origin: center; transform-box: fill-box; }
  .cbw-flap-left  { transform-origin: 40px 32px; transform-box: fill-box; transition: transform .3s ease; }
  .cbw-flap-right { transform-origin: 40px 32px; transform-box: fill-box; transition: transform .3s ease; }
  .cbw-stuff      { transform-origin: 40px 34px; transform-box: fill-box; transition: transform .3s ease; }

  .is-idle .cbw-robot-head { animation: cbw-box-wobble 4s ease-in-out infinite; }
  .is-idle .cbw-eye        { animation: cbw-blink-cute 4s infinite; }
  .is-idle .cbw-stuff      { animation: cbw-stuff-jiggle 3s ease-in-out infinite; }

  .is-greeting .cbw-robot-head { animation: cbw-box-hop .8s ease-in-out; }
  .is-greeting .cbw-eye        { transform: scaleY(1.15) scaleX(1.1); }
  .is-greeting .cbw-mouth      { transform: scaleY(1.4); }
  .is-greeting .cbw-flap-left  { transform: rotate(-12deg); }
  .is-greeting .cbw-flap-right { transform: rotate(12deg); }

  .is-listening .cbw-robot-head { transform: rotate(-4deg) translateY(2px); animation: none; }
  .is-listening .cbw-eyes       { transform: translate(-1px, 2px); }
  .is-listening .cbw-mouth      { transform: scaleY(0.55); }

  .is-thinking .cbw-robot-head { transform: rotate(3deg) translateY(-2px); animation: none; }
  .is-thinking .cbw-eyes       { animation: cbw-scan 1.5s infinite alternate ease-in-out; }
  .is-thinking .cbw-stuff      { animation: cbw-stuff-jiggle .9s ease-in-out infinite; }

  .is-action .cbw-robot-head { animation: cbw-box-bounce .5s ease; }
  .is-action .cbw-eye        { transform: scaleY(0.3) translateY(-1px); }
  .is-action .cbw-mouth      { transform: scaleY(1.4) translateY(-1px); }

  .is-talking .cbw-robot-head { animation: cbw-box-wobble-fast .6s infinite alternate ease-in-out; }
  .is-talking .cbw-mouth      { animation: cbw-mouth-talk .35s infinite alternate ease-in-out; }

  @keyframes cbw-box-wobble      { 0%,100% { transform: rotate(-1deg) translateY(0); } 50% { transform: rotate(1deg) translateY(-2px); } }
  @keyframes cbw-box-wobble-fast { 0% { transform: rotate(-1.5deg) translateY(0); } 100% { transform: rotate(1.5deg) translateY(-1px); } }
  @keyframes cbw-blink-cute      { 0%, 92%, 100% { transform: scaleY(1); } 96% { transform: scaleY(0.1); } }
  @keyframes cbw-box-hop         { 0%,100% { transform: translateY(0); } 35% { transform: translateY(-4px) rotate(-3deg); } 65% { transform: translateY(-2px) rotate(3deg); } }
  @keyframes cbw-scan            { 0% { transform: translate(-3px, 0); } 100% { transform: translate(3px, 0); } }
  @keyframes cbw-box-bounce      { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.07) translateY(-3px); } }
  @keyframes cbw-stuff-jiggle    { 0%,100% { transform: rotate(0deg) translateY(0); } 25% { transform: rotate(-2deg) translateY(-1px); } 75% { transform: rotate(2deg) translateY(-1px); } }
  @keyframes cbw-mouth-talk      { 0% { transform: scaleY(0.5); } 100% { transform: scaleY(1.3); } }

  /* ---------- PANEL — silky open/close (transform + opacity only) ---------- */
  /*
   * Avoid filter:blur and complex multi-keyframe animations during the open —
   * those caused visible jank on slower devices. A single transition with an
   * overshoot easing on transform feels lively without dropping frames.
   */
  .cbw-panel {
    position: absolute; bottom: 88px; right: 0;
    width: min(390px, calc(100vw - 32px));
    height: min(640px, calc(100vh - 120px));
    background: #fff; border-radius: var(--radius); border: 1px solid var(--border);
    box-shadow: 0 24px 60px -16px rgba(2,44,34,.3), 0 8px 24px -10px rgba(15,23,42,.15);
    display: flex; flex-direction: column; overflow: hidden;
    transform-origin: 100% 100%;
    opacity: 0;
    transform: scale(0.85) translateY(28px);
    pointer-events: none;
    will-change: transform, opacity;
    transition:
      transform 460ms cubic-bezier(0.22, 1.4, 0.36, 1),
      opacity   320ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .cbw-root[data-open="true"] .cbw-panel {
    opacity: 1;
    transform: scale(1) translateY(0);
    pointer-events: auto;
  }

  /* ---------- HEADER ---------- */
  .cbw-header { position: relative; padding: 14px 14px 14px 16px; display: flex; align-items: center; gap: 12px; flex-shrink: 0; border-bottom: 1px solid rgba(0,0,0,0.1); }
  .cbw-header-avatar {
    position: relative; width: 48px; height: 48px; border-radius: 50%;
    background: rgba(255,255,255,.15); border: 1px solid rgba(255,255,255,.3);
    display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(0,0,0,.15);
  }
  .cbw-header-avatar::after { content:""; position:absolute; width:11px; height:11px; bottom:-2px; right:-2px; background:var(--accent); border:2px solid #0f172a; border-radius:50%; }
  .cbw-title-wrap { flex:1; min-width:0; line-height:1.2; }
  .cbw-title { font-weight:700; font-size:15.5px; text-shadow: 0 1px 2px rgba(0,0,0,0.4); }
  .cbw-subtitle { font-size:12px; opacity:.92; display:flex; align-items:center; gap:6px; margin-top:1px; }
  .cbw-subtitle::before { content:""; width:6px; height:6px; border-radius:50%; background:var(--accent); box-shadow: 0 0 8px #fff; }
  .cbw-actions { display:flex; gap:2px; align-items:center; }
  .cbw-icon-btn { background: transparent; border: none; color:#fff; cursor: pointer; padding: 8px; border-radius: 10px; display: flex; align-items: center; justify-content: center; transition: background 150ms ease; }
  .cbw-icon-btn:hover { background: rgba(255,255,255,.2); }
  .cbw-icon-btn svg { width:18px; height:18px; transition: transform 200ms ease; }

  /* Refresh — full-rotation spin on click */
  #cbwRefresh.cbw-spinning svg {
    animation: cbw-spin-360 720ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes cbw-spin-360 {
    0%   { transform: rotate(0deg)   scale(1); }
    50%  { transform: rotate(180deg) scale(1.12); }
    100% { transform: rotate(360deg) scale(1); }
  }

  /* ---------- MESSAGES ---------- */
  .cbw-messages { flex:1; padding: 16px 14px; overflow-y: auto; background: var(--surface); display: flex; flex-direction: column; gap: 10px; scroll-behavior: smooth; }
  .cbw-messages::-webkit-scrollbar { width: 6px; }
  .cbw-messages::-webkit-scrollbar-thumb { background: var(--border); border-radius: 6px; }
  
  .cbw-msg { 
    max-width: 85%; padding: 10px 14px; border-radius: 14px; 
    font-size: 14px; line-height: 1.5; word-wrap: break-word; white-space: pre-wrap; 
    animation: cbw-balloon-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; 
    transform-origin: bottom center;
  }
  
  @keyframes cbw-balloon-in { 
    0% { opacity: 0; transform: scale(0.4) translateY(20px); filter: blur(4px); } 
    60% { opacity: 1; transform: scale(1.05) translateY(-2px); filter: blur(0); }
    100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); } 
  }
  
  .cbw-msg.cbw-bot {
    align-self: flex-start;
    background: linear-gradient(180deg, var(--bot-bubble-bg), #cce9f9);
    color: var(--bot-bubble-text);
    border: 1px solid var(--bot-bubble-border);
    border-bottom-left-radius: 4px;
    transform-origin: bottom left;
    box-shadow: 0 2px 6px -2px rgba(2, 132, 199, 0.18);
  }
  .cbw-msg.cbw-user {
    align-self: flex-end;
    background: linear-gradient(145deg, #0ea5e9, #075985);
    color: #fff;
    border-bottom-right-radius: 4px;
    transform-origin: bottom right;
    box-shadow: 0 4px 12px -4px rgba(2, 132, 199, 0.45);
  }

  .cbw-typing { align-self:flex-start; display:inline-flex; gap:5px; padding:13px 16px; border-radius:14px; border-bottom-left-radius:4px; animation: cbw-balloon-in 0.4s ease both; transform-origin: bottom left; }
  .cbw-typing span { width:7px; height:7px; border-radius:50%; background: #fff; opacity:.95; box-shadow: 0 0 6px rgba(255,255,255,.8); animation: cbw-bounce 1.2s infinite ease-in-out; }
  .cbw-typing span:nth-child(2) { animation-delay:.15s; } .cbw-typing span:nth-child(3) { animation-delay:.3s; }

  /* ---------- CHIPS ---------- */
  .cbw-chips { display:flex; flex-wrap:wrap; gap:6px; padding: 0 14px 10px; background: var(--surface); }
  .cbw-chip { border: 1px solid var(--border); background: #fff; color: var(--text); padding: 7px 12px; border-radius: 999px; font: inherit; font-size: 12.5px; cursor: pointer; position: relative; overflow: hidden; transition: all 150ms ease; display: inline-flex; align-items: center; gap: 6px; }
  .cbw-chip svg { width:14px; height:14px; flex-shrink:0; }
  .cbw-chip:hover { background: var(--surface-2); transform: translateY(-1px); border-color: var(--primary); }
  
  .cbw-chip-highlight { border-color: transparent !important; font-weight: 600; }
  .cbw-chip-quote .cbw-chip-progress { position: absolute; bottom: 0; left: 0; height: 3px; width: 0%; background: rgba(255,255,255,0.7); transition: width 600ms var(--transition); }
  .cbw-chip-quote[data-stage="0"] .cbw-chip-progress { width: 0%; }
  .cbw-chip-quote[data-stage="1"] .cbw-chip-progress { width: 25%; }
  .cbw-chip-quote[data-stage="2"] .cbw-chip-progress { width: 50%; }
  .cbw-chip-quote[data-stage="3"] .cbw-chip-progress { width: 75%; }
  .cbw-chip-quote[data-stage="4"] .cbw-chip-progress { width: 100%; }

  /* ---------- FORMS ---------- */
  .cbw-form { display:none; margin: 4px 14px 10px; padding: 14px; background: #fff; border: 1px solid var(--border); border-radius: 14px; box-shadow: 0 8px 20px -10px rgba(15,23,42,.1); animation: cbw-balloon-in 0.4s var(--transition); transform-origin: top center; }
  .cbw-form[data-open="true"] { display: block; }
  .cbw-form-head { display:flex; justify-content:space-between; margin-bottom:10px; }
  .cbw-form-title { font-size:14px; font-weight:700; margin:0; }
  .cbw-form-subtitle { font-size:12px; color: var(--text-muted); margin:2px 0 0; }
  .cbw-form-close { cursor:pointer; background:none; border:none; font-size:18px; color: var(--text-muted); }
  .cbw-field { width: 100%; padding: 9px 12px; margin-bottom: 8px; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; font: inherit; font-size: 13.5px; }
  .cbw-field:focus { border-color: var(--primary); outline: none; }
  textarea.cbw-field { resize:vertical; min-height:64px; }
  .cbw-form-submit { width:100%; padding:11px; background: #0f766e; border:none; border-radius:10px; color:#fff; font:inherit; font-weight:600; cursor:pointer; transition: 150ms ease; }
  .cbw-form-submit:hover { background: var(--primary-hover); }
  .cbw-calc-progress { height:6px; border-radius:999px; background: var(--surface-2); margin-bottom: 12px; overflow: hidden; }
  .cbw-calc-progress-bar { height: 100%; background: var(--accent); border-radius: 999px; width: 33%; transition: width 500ms var(--transition); }
  .cbw-calc-step { display:none; animation: cbw-balloon-in 0.3s var(--transition); }
  .cbw-calc-step[data-active="true"] { display:block; }
  .cbw-calc-label { font-size: 13px; font-weight: 600; margin-bottom: 6px; }
  .cbw-calc-helper { font-size:11.5px; color: var(--text-muted); margin: 4px 0 10px; }
  .cbw-calc-actions { display:flex; gap:8px; margin-top:6px; }
  .cbw-calc-back { flex: 0 0 auto; padding: 11px 16px; background: var(--surface-2); border:1px solid var(--border); border-radius:10px; font:inherit; font-size:13.5px; font-weight:600; cursor:pointer; }
  .cbw-calc-result { background: var(--surface-2); border: 1px solid var(--accent); border-radius: 12px; padding: 14px; margin: 10px 0; text-align: center; }
  .cbw-calc-result-value { font-size: 24px; font-weight: 700; color: #0f766e; margin: 4px 0 6px; }

  /* ---------- CONTACT BAR ---------- */
  .cbw-contact-bar { display: flex; gap: 6px; padding: 8px 12px; background: #fff; border-top: 1px solid var(--border); }
  .cbw-contact-bar:empty { display: none; }
  .cbw-contact-icon { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 9px 8px; min-height: 40px; border-radius: 11px; border: 1px solid var(--border); background: var(--surface); color: var(--text-muted); text-decoration: none; font-size: 12px; font-weight: 600; transition: all 200ms ease; }
  .cbw-contact-icon svg { width: 16px; height: 16px; flex-shrink: 0; }
  .cbw-contact-icon[data-kind="phone"]:hover { color: #f97316; border-color: rgba(249,115,22,.5); background: rgba(249,115,22,.08); }
  .cbw-contact-icon[data-kind="whatsapp"]:hover { color: #16a34a; border-color: rgba(22,163,74,.5); background: rgba(22,163,74,.08); }
  .cbw-contact-icon[data-kind="email"]:hover { color: #3b82f6; border-color: rgba(59,130,246,.5); background: rgba(59,130,246,.08); }

  /* ---------- STICKY CTA (always visible during chat) ---------- */
  .cbw-cta-bar {
    flex-shrink: 0;
    padding: 10px 14px;
    background: linear-gradient(180deg, #ffffff 0%, var(--surface) 100%);
    border-bottom: 1px solid var(--border);
    position: relative;
    z-index: 3;
  }
  .cbw-cta-btn {
    width: 100%;
    display: flex; align-items: center; gap: 12px;
    padding: 13px 16px;
    border-radius: 14px;
    border: none; cursor: pointer;
    font: inherit; font-size: 15px; font-weight: 700;
    text-align: left;
    color: #fff;
    position: relative; overflow: hidden;
    transition: transform 200ms ease, filter 200ms ease;
  }
  .cbw-cta-btn:hover { transform: translateY(-1px); filter: brightness(1.08); }
  .cbw-cta-btn:active { transform: scale(0.98); }
  .cbw-cta-icon {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: rgba(255,255,255,0.18);
    border: 1px solid rgba(255,255,255,0.30);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.30);
    animation: cbw-cta-pulse 2.4s ease-in-out infinite;
  }
  @keyframes cbw-cta-pulse {
    0%, 100% { box-shadow: inset 0 1px 0 rgba(255,255,255,0.30), 0 0 0 0 rgba(255,255,255,0); }
    50%      { box-shadow: inset 0 1px 0 rgba(255,255,255,0.30), 0 0 0 6px rgba(255,255,255,0.06); }
  }
  .cbw-cta-icon svg { width: 20px; height: 20px; color: #fff; }
  .cbw-cta-text { flex: 1; line-height: 1.25; }
  .cbw-cta-text small { display: block; font-size: 11.5px; font-weight: 500; opacity: 0.88; margin-top: 1px; }
  .cbw-cta-arrow { width: 20px; height: 20px; color: #fff; opacity: 0.85; transition: transform 220ms ease; flex-shrink: 0; }
  .cbw-cta-btn:hover .cbw-cta-arrow { transform: translateX(4px); }

  /* Hide CTA bar when calc is active (already inside calc) */
  .cbw-root.cbw-calc-active .cbw-cta-bar,
  .cbw-root.cbw-calc-active .cbw-messages,
  .cbw-root.cbw-calc-active .cbw-chips { display: none !important; }
  /* Subtle fade for chips while user is typing */
  .cbw-root.cbw-typing-active .cbw-chips { opacity: 0.4; pointer-events: none; transition: opacity 240ms ease; }

  /* ---------- CALCULATOR — service cards + multi-step wizard ---------- */
  .cbw-calc-wizard {
    display: none;
    flex-direction: column;
    flex: 1;
    background: var(--surface);
    overflow: hidden;
  }
  .cbw-calc-wizard[data-open="true"] { display: flex; }
  .cbw-calc-head {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 14px;
    background: #fff;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }
  .cbw-calc-head-back {
    width: 32px; height: 32px; border-radius: 8px;
    border: 1px solid var(--border); background: #fff; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: var(--text); transition: all 150ms ease;
    flex-shrink: 0;
  }
  .cbw-calc-head-back:hover { background: var(--surface); }
  .cbw-calc-head-back svg { width: 16px; height: 16px; }
  .cbw-calc-head-info { flex: 1; line-height: 1.2; }
  .cbw-calc-head-title { font-size: 14px; font-weight: 700; color: var(--text); }
  .cbw-calc-head-step  { font-size: 11.5px; color: var(--text-muted); margin-top: 1px; }
  .cbw-calc-head-x {
    width: 32px; height: 32px; border-radius: 8px;
    border: none; background: transparent; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: var(--text-muted); transition: background 150ms ease;
  }
  .cbw-calc-head-x:hover { background: var(--surface); color: var(--text); }
  .cbw-calc-head-x svg { width: 16px; height: 16px; }

  .cbw-calc-bar {
    height: 4px; background: var(--surface-2);
    flex-shrink: 0;
  }
  .cbw-calc-bar > span {
    display: block; height: 100%;
    background: linear-gradient(90deg, var(--accent), #14b8a6);
    border-radius: 0 4px 4px 0;
    transition: width 480ms cubic-bezier(0.22,1,0.36,1);
    box-shadow: 0 0 8px rgba(20,184,166,0.5);
  }

  .cbw-calc-body {
    flex: 1;
    padding: 18px 16px 16px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .cbw-calc-body::-webkit-scrollbar { width: 6px; }
  .cbw-calc-body::-webkit-scrollbar-thumb { background: var(--border); border-radius: 6px; }

  .cbw-calc-prompt {
    font-size: 17px; font-weight: 700;
    color: var(--text); line-height: 1.3;
    margin: 0 0 4px;
  }
  .cbw-calc-hint {
    font-size: 12.5px; color: var(--text-muted);
    margin: 0 0 14px;
  }

  /* Service cards (step 1) */
  .cbw-svc-grid {
    display: flex; flex-direction: column; gap: 10px;
    margin-bottom: 4px;
  }
  .cbw-svc-card {
    display: flex; align-items: center; gap: 14px;
    padding: 14px;
    background: #fff;
    border: 1.5px solid var(--border);
    border-radius: 14px;
    cursor: pointer;
    text-align: left;
    font: inherit;
    transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease, background 200ms ease;
    position: relative; overflow: hidden;
  }
  .cbw-svc-card:hover {
    transform: translateY(-2px);
    border-color: #0f766e;
    background: #f0fdfa;
    box-shadow: 0 8px 24px -10px rgba(2, 44, 34, 0.30);
  }
  .cbw-svc-card:active { transform: scale(0.99); }
  .cbw-svc-icon {
    width: 56px; height: 56px;
    border-radius: 14px;
    background: linear-gradient(145deg, #d1fae5, #a7f3d0);
    border: 1px solid #86efac;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    color: #064e3b;
    transition: all 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .cbw-svc-card:hover .cbw-svc-icon {
    background: linear-gradient(145deg, #064e3b, #022c22);
    color: #d1fae5;
    transform: scale(1.06) rotate(-3deg);
    box-shadow: 0 6px 16px -6px rgba(2, 44, 34, 0.55);
  }
  .cbw-svc-icon svg { width: 30px; height: 30px; }
  .cbw-svc-text { flex: 1; min-width: 0; }
  .cbw-svc-title { font-size: 14.5px; font-weight: 700; color: var(--text); }
  .cbw-svc-sub   { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
  .cbw-svc-card .cbw-svc-arrow {
    width: 20px; height: 20px; color: var(--text-muted);
    transition: transform 220ms ease, color 200ms ease;
    flex-shrink: 0;
  }
  .cbw-svc-card:hover .cbw-svc-arrow { color: #0f766e; transform: translateX(4px); }

  /* Service icons (landscape) — slightly larger so animations have room */
  .cbw-svc-icon { width: 72px; height: 54px; border-radius: 14px; padding: 4px; }
  .cbw-svc-icon svg { width: 100%; height: 100%; }

  /* Hover-only animations on service icons */
  .cbw-svc-card:hover .cbw-anim-truck-body,
  .cbw-svc-card:hover .cbw-anim-truck-rev    { animation: cbw-bounce-soft .45s ease-in-out infinite alternate; }
  .cbw-svc-card:hover .cbw-anim-wheel        { animation: cbw-spin .7s linear infinite; transform-origin: center; transform-box: fill-box; }
  .cbw-svc-card:hover .cbw-anim-house        { animation: cbw-fade-pulse 1.6s ease-in-out infinite alternate; }
  .cbw-svc-card:hover .cbw-anim-box-fly      { animation: cbw-box-fly 1.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
  .cbw-svc-card:hover .cbw-anim-out-1        { animation: cbw-eject 1.5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
  .cbw-svc-card:hover .cbw-anim-out-2        { animation: cbw-eject 1.5s ease-in-out .2s infinite; transform-box: fill-box; transform-origin: center; }
  .cbw-svc-card:hover .cbw-anim-out-3        { animation: cbw-eject 1.5s ease-in-out .4s infinite; transform-box: fill-box; transform-origin: center; }
  .cbw-svc-card:hover .cbw-anim-broom        { animation: cbw-broom-sweep .85s ease-in-out infinite alternate; transform-origin: 100% 0; transform-box: fill-box; }
  .cbw-svc-card:hover .cbw-anim-spark-pop    { animation: cbw-spark 1.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
  .cbw-svc-card:hover .cbw-anim-fall-1       { animation: cbw-drop 1.5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
  .cbw-svc-card:hover .cbw-anim-fall-2       { animation: cbw-drop 1.5s ease-in-out .35s infinite; transform-box: fill-box; transform-origin: center; }
  .cbw-svc-card:hover .cbw-anim-fall-3       { animation: cbw-drop 1.5s ease-in-out .7s infinite; transform-box: fill-box; transform-origin: center; }
  .cbw-svc-card:hover .cbw-anim-lid          { animation: cbw-lid 1.5s ease-in-out infinite; transform-origin: 0 100%; transform-box: fill-box; }
  .cbw-svc-card:hover .cbw-anim-recycle-spin { animation: cbw-spin 2s linear infinite; transform-origin: center; transform-box: fill-box; }
  .cbw-svc-card:hover .cbw-anim-road         { animation: cbw-road-flow .55s linear infinite; }
  .cbw-svc-card:hover .cbw-anim-smoke        { animation: cbw-smoke 1.1s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }

  /* Direction (odvoz/dovoz) + new category icon animations */
  .cbw-svc-card:hover .cbw-anim-house        { animation: cbw-fade-pulse 1.6s ease-in-out infinite alternate; }
  .cbw-svc-card:hover .cbw-anim-house-dest   { animation: cbw-fade-pulse 1.6s ease-in-out infinite alternate; }
  .cbw-svc-card:hover .cbw-anim-box-out      { animation: cbw-pkg-out 1.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
  .cbw-svc-card:hover .cbw-anim-box-in       { animation: cbw-pkg-in  1.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
  .cbw-svc-card:hover .cbw-anim-door         { animation: cbw-door-blink 1.4s ease-in-out infinite; }
  .cbw-svc-card:hover .cbw-anim-motion       { animation: cbw-motion-flow .6s linear infinite; }
  .cbw-svc-card:hover .cbw-anim-wardrobe     { animation: cbw-bounce-soft .55s ease-in-out infinite alternate; }
  .cbw-svc-card:hover .cbw-anim-door-l       { animation: cbw-door-open 2.4s ease-in-out infinite; transform-origin: 0 50%; transform-box: fill-box; }
  .cbw-svc-card:hover .cbw-anim-knob         { animation: cbw-knob-pulse 1.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
  .cbw-svc-card:hover .cbw-anim-sofa         { animation: cbw-bounce-soft .55s ease-in-out infinite alternate; }
  .cbw-svc-card:hover .cbw-anim-fridge       { animation: cbw-bounce-soft .55s ease-in-out infinite alternate; }
  .cbw-svc-card:hover .cbw-anim-fridge-light { animation: cbw-light-blink 2.4s ease-in-out infinite; }
  .cbw-svc-card:hover .cbw-anim-fridge-door  { animation: cbw-fridge-door 2.4s ease-in-out infinite; transform-origin: 0 50%; transform-box: fill-box; }
  .cbw-svc-card:hover .cbw-anim-snow         { animation: cbw-spin 4s linear infinite; transform-box: fill-box; transform-origin: center; }
  .cbw-svc-card:hover .cbw-anim-brick-1      { animation: cbw-drop 1.5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
  .cbw-svc-card:hover .cbw-anim-brick-2      { animation: cbw-drop 1.5s ease-in-out .35s infinite; transform-box: fill-box; transform-origin: center; }
  .cbw-svc-card:hover .cbw-anim-brick-3      { animation: cbw-drop 1.5s ease-in-out .7s infinite; transform-box: fill-box; transform-origin: center; }
  .cbw-svc-card:hover .cbw-anim-dust         { animation: cbw-spark 1.5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
  .cbw-svc-card:hover .cbw-anim-pallet       { animation: cbw-lift .9s ease-in-out infinite alternate; }
  .cbw-svc-card:hover .cbw-anim-forklift     { animation: cbw-bounce-soft .45s ease-in-out infinite alternate; }
  .cbw-svc-card:hover .cbw-anim-other        { animation: cbw-other-pulse 2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
  .cbw-svc-card:hover .cbw-anim-dot-1        { animation: cbw-spark 1.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
  .cbw-svc-card:hover .cbw-anim-dot-2        { animation: cbw-spark 1.4s ease-in-out .25s infinite; transform-box: fill-box; transform-origin: center; }
  .cbw-svc-card:hover .cbw-anim-dot-3        { animation: cbw-spark 1.4s ease-in-out .5s  infinite; transform-box: fill-box; transform-origin: center; }
  .cbw-svc-card:hover .cbw-anim-dot-4        { animation: cbw-spark 1.4s ease-in-out .75s infinite; transform-box: fill-box; transform-origin: center; }

  @keyframes cbw-pkg-out {
    0%, 100% { transform: translate(0, 0); opacity: 1; }
    40%      { transform: translate(8px, -1px); opacity: 1; }
    55%      { transform: translate(8px, -1px); opacity: 0; }
    56%      { transform: translate(0, 0); opacity: 0; }
    70%      { transform: translate(0, 0); opacity: 1; }
  }
  @keyframes cbw-pkg-in {
    0%, 100% { transform: translate(0, 0); opacity: 1; }
    40%      { transform: translate(10px, -1px); opacity: 1; }
    55%      { transform: translate(10px, -1px); opacity: 0; }
    56%      { transform: translate(0, 0); opacity: 0; }
    70%      { transform: translate(0, 0); opacity: 1; }
  }
  @keyframes cbw-door-blink   { 0%, 70%, 100% { opacity: .5; } 78% { opacity: 1; } }
  @keyframes cbw-motion-flow  { from { transform: translateX(0); } to { transform: translateX(-6px); } }
  @keyframes cbw-door-open    { 0%, 60%, 100% { transform: scaleX(1); } 75%, 88% { transform: scaleX(0.25); } }
  @keyframes cbw-knob-pulse   { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.4); } }
  @keyframes cbw-light-blink  { 0%, 60%, 100% { opacity: 0; } 72%, 88% { opacity: 0.85; } }
  @keyframes cbw-fridge-door  { 0%, 60%, 100% { transform: scaleX(1); } 75%, 90% { transform: scaleX(0.3); } }
  @keyframes cbw-lift         { 0% { transform: translateY(0); } 100% { transform: translateY(-3px); } }
  @keyframes cbw-other-pulse  { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }

  /* Photo upload UI */
  .cbw-photo-drop {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 14px;
    background: var(--surface-2);
    border: 1.5px dashed var(--primary);
    border-radius: 12px;
    color: var(--primary-deep);
    font-size: 13.5px; font-weight: 600;
    cursor: pointer;
    transition: all 150ms ease;
  }
  .cbw-photo-drop:hover { background: var(--accent-soft); border-style: solid; }
  .cbw-photo-drop svg { width: 18px; height: 18px; flex-shrink: 0; }
  .cbw-photo-thumbs {
    display: flex; flex-wrap: wrap; gap: 8px;
    margin-top: 8px;
  }
  .cbw-photo-thumb {
    position: relative;
    width: 64px; height: 64px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid var(--border);
    background: #fff;
  }
  .cbw-photo-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .cbw-photo-thumb button {
    position: absolute; top: 2px; right: 2px;
    width: 20px; height: 20px;
    border-radius: 50%;
    border: none;
    background: rgba(15, 23, 42, 0.7);
    color: #fff;
    cursor: pointer;
    font: bold 14px sans-serif;
    line-height: 1;
    display: flex; align-items: center; justify-content: center;
  }
  .cbw-photo-thumb button:hover { background: rgba(220, 38, 38, 0.85); }

  /* GDPR note */
  .cbw-gdpr {
    font-size: 11.5px; color: var(--text-muted);
    margin: 8px 0 0; line-height: 1.4;
  }

  /* Direction cards — slightly bigger */
  .cbw-dir-card { padding: 18px 14px; }
  .cbw-dir-card .cbw-svc-icon { width: 90px; height: 60px; }

  /* Sticky call-now bar (above composer) */
  .cbw-callbar {
    flex-shrink: 0;
    display: flex; align-items: center; gap: 10px;
    padding: 8px 12px;
    background: linear-gradient(180deg, #f0f9ff, #e0f2fe);
    border-top: 1px solid var(--bot-bubble-border);
  }
  .cbw-callbar-text {
    flex: 1;
    font-size: 12px;
    color: var(--bot-bubble-text);
    line-height: 1.3;
  }
  .cbw-callbar-text strong { display: block; font-size: 13px; color: var(--primary-deep); }
  .cbw-callbar-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 8px 12px;
    border-radius: 999px;
    background: var(--primary);
    color: #fff;
    text-decoration: none;
    font-size: 12.5px; font-weight: 700;
    transition: filter 150ms ease, transform 150ms ease;
    flex-shrink: 0;
  }
  .cbw-callbar-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
  .cbw-callbar-btn svg { width: 14px; height: 14px; }
  .cbw-callbar:empty,
  .cbw-root.cbw-calc-active .cbw-callbar { display: none; }

  /* CTA helper text under the CTA bar */
  .cbw-cta-hint {
    margin: 6px 4px 0;
    font-size: 11.5px;
    color: var(--text-muted);
    text-align: center;
  }
  .cbw-cta-hint::before {
    content: ""; display: inline-block;
    width: 6px; height: 6px; border-radius: 50%;
    background: #22c55e;
    margin-right: 5px; vertical-align: middle;
    animation: cbw-online-dot 2s ease-in-out infinite;
  }
  @keyframes cbw-online-dot {
    0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5); }
    50%      { box-shadow: 0 0 0 5px rgba(34, 197, 94, 0); }
  }

  /* Invalid field state (used by phone/name/email validators) */
  .cbw-invalid { border-color: #f87171 !important; box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.18) !important; }

  @keyframes cbw-bounce-soft { 0% { transform: translateY(0); } 100% { transform: translateY(-1.4px); } }
  @keyframes cbw-spin        { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes cbw-fade-pulse  { 0% { opacity: 1; } 100% { opacity: .65; } }
  @keyframes cbw-box-fly {
    0%, 100% { transform: translate(0, 0); opacity: 1; }
    35%      { transform: translate(8px, -2px); opacity: 1; }
    50%      { transform: translate(8px, -2px); opacity: 0; }
    51%      { transform: translate(0, 0); opacity: 0; }
    65%      { transform: translate(0, 0); opacity: 1; }
  }
  @keyframes cbw-eject {
    0%, 65%, 100% { transform: translate(0, 0) scale(1); opacity: .7; }
    78%           { transform: translate(0, -10px) scale(.6); opacity: .15; }
    82%           { transform: translate(0, 0) scale(1); opacity: 0; }
    90%           { transform: translate(0, 0) scale(1); opacity: .7; }
  }
  @keyframes cbw-broom-sweep { 0% { transform: rotate(-10deg); } 100% { transform: rotate(10deg); } }
  @keyframes cbw-spark { 0%, 100% { opacity: 0; transform: scale(.3); } 50% { opacity: 1; transform: scale(1.15); } }
  @keyframes cbw-drop {
    0%   { transform: translateY(0);   opacity: 0; }
    8%   { opacity: .7; }
    55%  { transform: translateY(20px); opacity: .7; }
    65%  { opacity: 0; }
    100% { transform: translateY(0);   opacity: 0; }
  }
  @keyframes cbw-lid { 0%, 30%, 100% { transform: rotate(0deg); } 14% { transform: rotate(-12deg); } }
  @keyframes cbw-road-flow { from { transform: translateX(0); } to { transform: translateX(-12px); } }
  @keyframes cbw-smoke {
    0%   { transform: translate(0, 0) scale(1);    opacity: .45; }
    60%  { transform: translate(2px, -6px) scale(1.4); opacity: 0; }
    100% { transform: translate(0, 0) scale(1);    opacity: 0; }
  }

  /* Tone variants for option cards (semantic color-coding) */
  .cbw-q-card[data-tone="good"]  { border-color: #86efac; background: #f0fdf4; color: #166534; }
  .cbw-q-card[data-tone="good"]:hover { background: #dcfce7; border-color: #4ade80; color: #14532d; }
  .cbw-q-card[data-tone="good"][aria-pressed="true"] {
    background: linear-gradient(145deg, #16a34a, #14532d);
    border-color: #14532d; color: #fff;
    box-shadow: 0 4px 12px -4px rgba(20,83,45,0.45);
  }
  .cbw-q-card[data-tone="warn"]  { border-color: #fde68a; background: #fffbeb; color: #854d0e; }
  .cbw-q-card[data-tone="warn"]:hover { background: #fef3c7; border-color: #facc15; color: #713f12; }
  .cbw-q-card[data-tone="warn"][aria-pressed="true"] {
    background: linear-gradient(145deg, #d97706, #78350f);
    border-color: #78350f; color: #fff;
    box-shadow: 0 4px 12px -4px rgba(120,53,15,0.45);
  }
  .cbw-q-card[data-tone="bad"]   { border-color: #fca5a5; background: #fef2f2; color: #991b1b; }
  .cbw-q-card[data-tone="bad"]:hover { background: #fee2e2; border-color: #f87171; color: #7f1d1d; }
  .cbw-q-card[data-tone="bad"][aria-pressed="true"] {
    background: linear-gradient(145deg, #dc2626, #7f1d1d);
    border-color: #7f1d1d; color: #fff;
    box-shadow: 0 4px 12px -4px rgba(127,29,29,0.45);
  }
  .cbw-q-card-custom { display: inline-flex; align-items: center; justify-content: center; gap: 6px; }
  .cbw-q-card-custom svg { width: 14px; height: 14px; }
  .cbw-q-custom-wrap { margin-top: 8px; animation: cbw-msg-in 220ms ease both; }

  /* Multi-select chip — inline icon */
  .cbw-q-chip { display: inline-flex; align-items: center; gap: 6px; }
  .cbw-q-chip-ico { width: 16px; height: 16px; display: inline-flex; flex-shrink: 0; }
  .cbw-q-chip-ico svg { width: 100%; height: 100%; }

  /* Question inputs — radio cards */
  .cbw-q-cards {
    display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
    margin-bottom: 4px;
  }
  .cbw-q-cards.cbw-q-cards-3 { grid-template-columns: 1fr 1fr 1fr; }
  .cbw-q-card {
    padding: 12px 10px;
    background: #fff;
    border: 1.5px solid var(--border);
    border-radius: 12px;
    text-align: center;
    cursor: pointer;
    font: inherit; font-size: 13px; font-weight: 600;
    color: var(--text);
    transition: all 180ms ease;
    line-height: 1.25;
  }
  .cbw-q-card:hover { border-color: #0f766e; background: #f0fdfa; }
  .cbw-q-card[aria-pressed="true"] {
    border-color: #064e3b;
    background: linear-gradient(145deg, #064e3b, #022c22);
    color: #fff;
    box-shadow: 0 4px 12px -4px rgba(2,44,34,0.45);
  }
  .cbw-q-card small { display: block; font-weight: 500; font-size: 11px; opacity: 0.8; margin-top: 2px; }

  /* Question — multi-select chips */
  .cbw-q-multi { display: flex; flex-wrap: wrap; gap: 6px; }
  .cbw-q-chip {
    padding: 8px 12px;
    background: #fff;
    border: 1.5px solid var(--border);
    border-radius: 999px;
    cursor: pointer;
    font: inherit; font-size: 13px; font-weight: 500;
    color: var(--text);
    transition: all 160ms ease;
  }
  .cbw-q-chip:hover { border-color: #0f766e; background: #f0fdfa; }
  .cbw-q-chip[aria-pressed="true"] {
    border-color: #064e3b;
    background: linear-gradient(145deg, #064e3b, #022c22);
    color: #fff;
    box-shadow: 0 3px 10px -4px rgba(2,44,34,0.45);
  }

  /* Question — toggle (yes/no) */
  .cbw-q-toggle { display: flex; gap: 8px; }
  .cbw-q-toggle .cbw-q-card { flex: 1; }

  /* Question — text/number/date */
  .cbw-q-input {
    width: 100%;
    padding: 12px 14px;
    background: #fff;
    border: 1.5px solid var(--border);
    border-radius: 12px;
    font: inherit; font-size: 14.5px;
    color: var(--text);
    outline: none;
    transition: border-color 180ms ease, box-shadow 180ms ease;
  }
  .cbw-q-input::placeholder { color: var(--text-muted); }
  .cbw-q-input:focus {
    border-color: #064e3b;
    box-shadow: 0 0 0 3px rgba(6,78,59,0.15);
  }

  /* Question — group (sub-fields) */
  .cbw-q-group { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .cbw-q-group-item label { display: block; font-size: 11.5px; color: var(--text-muted); font-weight: 600; margin-bottom: 4px; }

  /* Wizard footer (Back / Next) */
  .cbw-calc-foot {
    display: flex; gap: 8px;
    padding: 12px 14px;
    background: #fff;
    border-top: 1px solid var(--border);
    flex-shrink: 0;
  }
  .cbw-calc-foot button {
    flex: 1;
    padding: 12px 16px;
    border-radius: 12px;
    font: inherit; font-size: 14px; font-weight: 600;
    cursor: pointer;
    transition: all 180ms ease;
    border: 1.5px solid var(--border);
    background: #fff;
    color: var(--text);
  }
  .cbw-calc-foot .cbw-calc-back-btn:hover { background: var(--surface-2); }
  .cbw-calc-foot .cbw-calc-next-btn {
    flex: 2;
    border: none;
    color: #fff;
  }
  .cbw-calc-foot .cbw-calc-next-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .cbw-calc-foot .cbw-calc-next-btn:hover:not(:disabled) { filter: brightness(1.08); }

  /* Summary */
  .cbw-sum-card {
    background: #fff;
    border: 1.5px solid var(--border);
    border-radius: 14px;
    padding: 14px;
    margin-bottom: 12px;
  }
  .cbw-sum-row {
    display: flex; justify-content: space-between; gap: 12px;
    padding: 6px 0;
    font-size: 13px;
    border-bottom: 1px dashed var(--border);
  }
  .cbw-sum-row:last-child { border-bottom: none; }
  .cbw-sum-row > span:first-child { color: var(--text-muted); }
  .cbw-sum-row > span:last-child  { color: var(--text); font-weight: 600; text-align: right; max-width: 60%; }
  .cbw-sum-price {
    margin: 12px 0 14px;
    padding: 16px;
    border-radius: 14px;
    text-align: center;
    color: #fff;
    /* leather background applied via class */
  }
  .cbw-sum-price-label { font-size: 12px; opacity: 0.85; margin-bottom: 4px; }
  .cbw-sum-price-value { font-size: 30px; font-weight: 800; letter-spacing: -0.02em; }
  .cbw-sum-price-note  { font-size: 11px; opacity: 0.78; margin-top: 4px; }

  /* Thank-you screen */
  .cbw-thanks {
    text-align: center;
    padding: 24px 16px;
  }
  .cbw-thanks-emoji {
    font-size: 48px; margin-bottom: 12px;
    animation: cbw-thanks-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes cbw-thanks-pop { 0% { transform: scale(0); } 60% { transform: scale(1.18); } 100% { transform: scale(1); } }
  .cbw-thanks-title { font-size: 20px; font-weight: 800; color: var(--text); margin-bottom: 6px; }
  .cbw-thanks-text  { font-size: 14px; color: var(--text-muted); margin-bottom: 18px; line-height: 1.5; }

  /* ---------- COMPOSER & ZMENA FARIEB INPUT BOXU ---------- */
  .cbw-composer { border-top: 1px solid var(--border); background: #fff; padding: 10px 14px 12px; display: flex; align-items: flex-end; gap: 8px; flex-shrink: 0; }
  .cbw-composer-wrap { flex: 1; position: relative; }
  
  .cbw-input { 
    width: 100%; resize: none; border: 1px solid var(--border); outline: none; 
    border-radius: 20px; padding: 10px 14px; font: inherit; font-size: 14.5px; 
    line-height: 1.4; max-height: 120px; min-height: 42px; 
    background: #ffffff; color: var(--text); transition: all 200ms ease; 
  }
  .cbw-input::placeholder { color: var(--text-muted); }
  
  /* Po kliknutí sa input zmení na prémiovú kožu s bielym textom */
  .cbw-input:focus { border-color: #022c22; box-shadow: 0 0 0 3px rgba(17,94,89,0.2); }
  .cbw-input:focus::placeholder { color: rgba(255,255,255,0.7); }
  
  .cbw-send { width: 42px; height: 42px; border-radius: 50%; border: none; color:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center; transition: transform 150ms ease, filter 150ms ease; flex-shrink: 0; }
  .cbw-send:hover:not(:disabled) { filter: brightness(1.1); }
  .cbw-send:disabled { opacity:.5; cursor:not-allowed; }
  .cbw-send svg { width:18px; height:18px; }

  /* MOBILE */
  @media (max-width: 480px) {
    .cbw-root { bottom:16px; right:16px; }
    .cbw-launcher { width:62px; height:62px; }
    .cbw-root[data-open="true"] .cbw-panel { position: fixed !important; inset: 0 !important; width: 100vw !important; height: 100dvh !important; border-radius: 0 !important; }
  }
</style>
</head>
<body>

<div class="cbw-root" id="cbwRoot" data-position="right" data-open="false">

  <!-- Panel -->
  <div class="cbw-panel" id="cbwPanel" role="dialog" aria-label="Chat">
    
    <div class="cbw-header cbw-dynamic-green">
      <div class="cbw-header-avatar" aria-hidden="true">
        <!-- BOX ROBOT — animated cardboard box with items poking out -->
        <svg class="cbw-robot is-idle" viewBox="0 0 80 80" fill="none">
          <g class="cbw-robot-head">
            <!-- Stuff sticking out of the top of the box -->
            <g class="cbw-stuff">
              <!-- Lamp (left) -->
              <line x1="22" y1="18" x2="22" y2="32" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
              <path d="M17 18 L27 18 L25 12 L19 12 Z" fill="#fef3c7" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/>
              <!-- Book/box (middle right) -->
              <rect x="38" y="20" width="14" height="14" rx="1" fill="#fde68a" stroke="#fff" stroke-width="1.4"/>
              <line x1="42" y1="20" x2="42" y2="34" stroke="#fff" stroke-width="1.2"/>
              <!-- Plush ears (right) -->
              <ellipse cx="60" cy="22" rx="3" ry="4" fill="#fca5a5" stroke="#fff" stroke-width="1.4"/>
              <ellipse cx="66" cy="22" rx="3" ry="4" fill="#fca5a5" stroke="#fff" stroke-width="1.4"/>
            </g>
            <!-- Top flaps of the cardboard box (slightly open) -->
            <path class="cbw-flap-left"  d="M12 32 L40 28 L40 36 L12 36 Z" fill="#cbd5e1" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/>
            <path class="cbw-flap-right" d="M68 32 L40 28 L40 36 L68 36 Z" fill="#cbd5e1" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/>
            <!-- Main box body -->
            <path d="M12 36 L68 36 L66 66 L14 66 Z" fill="#e2e8f0" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/>
            <!-- Tape strip -->
            <rect x="36" y="36" width="8" height="30" fill="#94a3b8" opacity="0.6"/>
            <!-- Vertical seam line -->
            <line x1="40" y1="36" x2="40" y2="66" stroke="#94a3b8" stroke-width="1" opacity="0.5"/>
            <!-- Eyes (drawn on box) -->
            <g class="cbw-eyes">
              <ellipse class="cbw-eye" cx="28" cy="50" rx="3" ry="4" fill="#0f172a"/>
              <ellipse class="cbw-eye" cx="52" cy="50" rx="3" ry="4" fill="#0f172a"/>
              <circle cx="28.7" cy="48.6" r="1" fill="#fff"/>
              <circle cx="52.7" cy="48.6" r="1" fill="#fff"/>
            </g>
            <!-- Smile -->
            <path class="cbw-mouth" d="M32 58 Q40 62 48 58" stroke="#0f172a" stroke-width="1.8" stroke-linecap="round" fill="none"/>
            <!-- Tiny "FRAGILE" label -->
            <text x="40" y="74" text-anchor="middle" fill="#fff" opacity="0.6" font-size="6" font-family="monospace" font-weight="700" letter-spacing="0.5">BOX</text>
          </g>
        </svg>
      </div>
      <div class="cbw-title-wrap">
        <div class="cbw-title" id="cbwTitle">Asistent</div>
        <div class="cbw-subtitle">online</div>
      </div>
      <div class="cbw-actions">
        <button class="cbw-icon-btn" id="cbwRefresh" type="button" aria-label="Reštartovať chat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="23 4 23 10 17 10"></polyline>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
          </svg>
        </button>
        <button class="cbw-icon-btn" id="cbwClose" type="button" aria-label="Zavrieť">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Sticky CTA — always visible during chat -->
    <div class="cbw-cta-bar" id="cbwCtaBar">
      <button class="cbw-cta-btn cbw-dynamic-green" id="cbwOpenCalc" type="button">
        <span class="cbw-cta-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="3"/>
            <line x1="8" y1="6" x2="16" y2="6"/>
            <circle cx="8.5" cy="11.5" r="0.6"/>
            <circle cx="12" cy="11.5" r="0.6"/>
            <circle cx="15.5" cy="11.5" r="0.6"/>
            <circle cx="8.5" cy="15" r="0.6"/>
            <circle cx="12" cy="15" r="0.6"/>
            <line x1="8" y1="18.5" x2="16" y2="18.5"/>
          </svg>
        </span>
        <span class="cbw-cta-text">
          Spočítať cenu zdarma
          <small>Odvoz / dovoz nábytku, zariadenia, materiálu…</small>
        </span>
        <svg class="cbw-cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
      <p class="cbw-cta-hint">Bratislava · zvyčajne reagujeme do 30 minút</p>
    </div>

    <!-- Messages -->
    <div class="cbw-messages" id="cbwMessages" role="log" aria-live="polite"></div>

    <!-- Quick chips (FAQ) -->
    <div class="cbw-chips" id="cbwChips">
      <button class="cbw-chip action-chip" data-msg="Aké služby ponúkate?" type="button">
        <span>Naše služby</span>
      </button>
      <button class="cbw-chip action-chip" data-msg="Povedzte mi o vašej firme." type="button">
        <span>O nás</span>
      </button>
      <button class="cbw-chip action-chip" data-msg="Aké sú vaše otváracie hodiny?" type="button">
        <span>Otváracie hodiny</span>
      </button>
      <button class="cbw-chip action-chip" id="cbwChipContact" type="button">
        <span>Zanechať kontakt</span>
      </button>
    </div>

    <!-- Lead form (simple contact, separate from calculator flow) -->
    <form class="cbw-form" id="cbwLeadForm" data-open="false" novalidate>
      <div class="cbw-form-head">
        <div><h4 class="cbw-form-title">Zanechajte nám kontakt</h4></div>
        <button type="button" class="cbw-form-close" id="cbwLeadClose">×</button>
      </div>
      <input class="cbw-field" id="cbwLeadName" type="text" placeholder="Vaše meno" />
      <input class="cbw-field" id="cbwLeadEmail" type="email" placeholder="E-mail" />
      <input class="cbw-field" id="cbwLeadPhone" type="tel" placeholder="Telefón (nepovinné)" />
      <textarea class="cbw-field" id="cbwLeadMsg" rows="2" placeholder="Správa (nepovinné)"></textarea>
      <button type="button" class="cbw-form-submit action-btn" id="cbwLeadSubmit">Odoslať</button>
    </form>

    <!-- Calculator wizard — services → questions → summary → contact → done -->
    <div class="cbw-calc-wizard" id="cbwCalcWizard" data-open="false">
      <div class="cbw-calc-head">
        <button class="cbw-calc-head-back" id="cbwCalcBack" type="button" aria-label="Späť" style="visibility:hidden">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div class="cbw-calc-head-info">
          <div class="cbw-calc-head-title" id="cbwCalcTitle">Cenová kalkulačka</div>
          <div class="cbw-calc-head-step"  id="cbwCalcStep">Vyberte službu</div>
        </div>
        <button class="cbw-calc-head-x" id="cbwCalcExit" type="button" aria-label="Zatvoriť kalkulačku">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="cbw-calc-bar"><span id="cbwCalcBarFill" style="width:5%"></span></div>
      <div class="cbw-calc-body" id="cbwCalcBody"></div>
      <div class="cbw-calc-foot" id="cbwCalcFoot" style="display:none">
        <button type="button" class="cbw-calc-back-btn" id="cbwCalcPrev">Späť</button>
        <button type="button" class="cbw-calc-next-btn cbw-dynamic-green" id="cbwCalcNext" disabled>Pokračovať</button>
      </div>
    </div>

    <!-- Direct contact icons -->
    <div class="cbw-contact-bar" id="cbwContactBar"></div>

    <!-- Sticky 'Zavolaj teraz' bar -->
    <div class="cbw-callbar" id="cbwCallBar"></div>

    <!-- Composer -->
    <div class="cbw-composer">
      <div class="cbw-composer-wrap">
        <textarea class="cbw-input" id="cbwInput" rows="1" placeholder="Napíš správu…"></textarea>
      </div>
      <button class="cbw-send cbw-dynamic-green" id="cbwSend" type="button" disabled>
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </button>
    </div>
  </div>

  <!-- Launcher -->
  <button class="cbw-launcher cbw-dynamic-green" id="cbwLauncher" type="button" aria-label="Otvoriť chat">
    <svg class="cbw-robot is-idle" viewBox="0 0 80 80" fill="none">
      <g class="cbw-robot-head">
        <g class="cbw-stuff">
          <line x1="22" y1="18" x2="22" y2="32" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
          <path d="M17 18 L27 18 L25 12 L19 12 Z" fill="#fef3c7" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/>
          <rect x="38" y="20" width="14" height="14" rx="1" fill="#fde68a" stroke="#fff" stroke-width="1.4"/>
          <line x1="42" y1="20" x2="42" y2="34" stroke="#fff" stroke-width="1.2"/>
          <ellipse cx="60" cy="22" rx="3" ry="4" fill="#fca5a5" stroke="#fff" stroke-width="1.4"/>
          <ellipse cx="66" cy="22" rx="3" ry="4" fill="#fca5a5" stroke="#fff" stroke-width="1.4"/>
        </g>
        <path class="cbw-flap-left"  d="M12 32 L40 28 L40 36 L12 36 Z" fill="#cbd5e1" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/>
        <path class="cbw-flap-right" d="M68 32 L40 28 L40 36 L68 36 Z" fill="#cbd5e1" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/>
        <path d="M12 36 L68 36 L66 66 L14 66 Z" fill="#e2e8f0" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/>
        <rect x="36" y="36" width="8" height="30" fill="#94a3b8" opacity="0.6"/>
        <line x1="40" y1="36" x2="40" y2="66" stroke="#94a3b8" stroke-width="1" opacity="0.5"/>
        <g class="cbw-eyes">
          <ellipse class="cbw-eye" cx="28" cy="50" rx="3" ry="4" fill="#0f172a"/>
          <ellipse class="cbw-eye" cx="52" cy="50" rx="3" ry="4" fill="#0f172a"/>
          <circle cx="28.7" cy="48.6" r="1" fill="#fff"/>
          <circle cx="52.7" cy="48.6" r="1" fill="#fff"/>
        </g>
        <path class="cbw-mouth" d="M32 58 Q40 62 48 58" stroke="#0f172a" stroke-width="1.8" stroke-linecap="round" fill="none"/>
      </g>
    </svg>
    <span class="cbw-badge" id="cbwBadge">1</span>
  </button>
</div>

<script>
(function () {
  'use strict';
  
  const root = document.getElementById('cbwRoot');
  const launcher = document.getElementById('cbwLauncher');
  const closeBtn = document.getElementById('cbwClose');
  const refreshBtn = document.getElementById('cbwRefresh');
  const messagesEl = document.getElementById('cbwMessages');
  const input = document.getElementById('cbwInput');
  const sendBtn = document.getElementById('cbwSend');
  const contactBar = document.getElementById('cbwContactBar');
  const robots = () => document.querySelectorAll('.cbw-robot');
  const badge = document.getElementById('cbwBadge');

  const ICON_PHONE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>';
  const ICON_WA = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
  const ICON_MAIL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>';

  // Sound disabled — no-op stub kept so existing call sites still work
  function playSound() {}

  let robotStateTimer = null;
  function setRobotState(state, duration = null) {
    robots().forEach(r => {
      r.classList.remove('is-idle', 'is-greeting', 'is-listening', 'is-thinking', 'is-action', 'is-talking');
      r.classList.add(state ? `is-${state}` : 'is-idle');
    });
    if (duration) {
      clearTimeout(robotStateTimer);
      robotStateTimer = setTimeout(() => setRobotState(''), duration);
    }
  }

  // ---------- Zelené Konfety ----------
  function spawnConfetti(el) {
    const rect = el.getBoundingClientRect();
    const colors = ['#0f766e', '#14b8a6', '#059669', '#34d399'];
    for(let i = 0; i < 8; i++) {
      const conf = document.createElement('div');
      conf.className = 'cbw-confetti';
      conf.style.left = (rect.left + rect.width / 2) + 'px';
      conf.style.top = (rect.top + rect.height / 2) + 'px';
      const dx = (Math.random() - 0.5) * 80;
      const dy = (Math.random() - 0.5) * 80 - 20;
      conf.style.setProperty('--dx', dx + 'px');
      conf.style.setProperty('--dy', dy + 'px');
      conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      document.body.appendChild(conf);
      setTimeout(() => conf.remove(), 600);
    }
  }

  // ---------- Chat Logic ----------
  function appendBubble(role, text) {
    const bubble = document.createElement('div');
    bubble.className = 'cbw-msg cbw-' + role;
    bubble.textContent = text;
    messagesEl.appendChild(bubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return bubble;
  }

  function showTyping() {
    setRobotState('talking');
    const dots = document.createElement('div');
    dots.className = 'cbw-typing cbw-dynamic-green'; 
    dots.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(dots);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return dots;
  }

  function hideTyping(el) {
    if (el) el.remove();
  }

  function togglePanel(open) {
    const next = open == null ? root.dataset.open !== 'true' : !!open;
    if (next === (root.dataset.open === 'true')) return;
    root.dataset.open = next ? 'true' : 'false';
    if (next) {
      if (badge) badge.remove();
      setRobotState('greeting', 2500);
      if (messagesEl.children.length === 0) {
        setTimeout(() => {
          appendBubble('bot', 'Ahoj! Som virtuálny asistent. Ako vám môžem pomôcť?');
          playSound();
        }, 700);
      }
    }
  }

  refreshBtn.addEventListener('click', () => {
    refreshBtn.classList.add('cbw-spinning');
    setTimeout(() => refreshBtn.classList.remove('cbw-spinning'), 740);
    setRobotState('greeting', 1500);
    messagesEl.innerHTML = '';
    closeForms();
    appendBubble('bot', 'Konverzácia bola obnovená. Ako vám môžem pomôcť?');
    playSound();
  });

  launcher.addEventListener('click', () => togglePanel(true));
  closeBtn.addEventListener('click', () => togglePanel(false));
  
  let typingTimer;
  input.addEventListener('focus', () => {
    input.classList.add('cbw-dynamic-green');
  });
  input.addEventListener('blur', () => {
    if(!input.value.trim()) input.classList.remove('cbw-dynamic-green');
  });

  input.addEventListener('input', () => {
    sendBtn.disabled = !input.value.trim();
    setRobotState('listening');
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => setRobotState(''), 1000);
  });

  sendBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    input.classList.remove('cbw-dynamic-green');
    sendBtn.disabled = true;
    appendBubble('user', text);
    playSound();
    
    setRobotState('thinking');
    setTimeout(() => {
      const typing = showTyping();
      setTimeout(() => {
        setRobotState('');
        hideTyping(typing);
        appendBubble('bot', 'Ďakujem za správu! Tvoj podnet sme zaznamenali.');
        playSound();
      }, 2000);
    }, 1000);
  });

  document.querySelectorAll('.action-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      spawnConfetti(btn);
      setRobotState('action', 1500);
      if(btn.dataset.msg) {
        input.value = btn.dataset.msg;
        input.classList.add('cbw-dynamic-green');
        sendBtn.disabled = false;
        sendBtn.click();
      }
    });
  });

  // ---------- Lead form (simple chip-driven) ----------
  const leadForm = document.getElementById('cbwLeadForm');
  function closeLead() { leadForm.dataset.open = 'false'; }
  document.getElementById('cbwLeadClose').addEventListener('click', closeLead);
  document.getElementById('cbwChipContact').addEventListener('click', () => {
    leadForm.dataset.open = 'true';
    messagesEl.scrollTop = messagesEl.scrollHeight;
  });
  document.getElementById('cbwLeadSubmit').addEventListener('click', async () => {
    const name  = document.getElementById('cbwLeadName').value.trim();
    const email = document.getElementById('cbwLeadEmail').value.trim();
    const phone = document.getElementById('cbwLeadPhone').value.trim();
    const msg   = document.getElementById('cbwLeadMsg').value.trim();
    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setRobotState('action', 1500);
    closeLead();
    try {
      await fetch(window.location.origin + '/api/lead', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone: phone || null, message: msg || null })
      });
    } catch (_) {}
    appendBubble('bot', 'Ďakujeme, úspešne sme prijali vaše kontaktné údaje. Ozveme sa vám čo najskôr.');
    playSound();
  });

  /* ============================================================
     CALCULATOR WIZARD — sťahovanie / vypratávanie / odpad / klavír
     ============================================================ */

  // ---------- Tiny inline icons for multi-select options (replaces emojis) ----------
  const ICN = {
    box:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    tools:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    piano:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="1.5"/><line x1="6" y1="6" x2="6" y2="14"/><line x1="10" y1="6" x2="10" y2="14"/><line x1="14" y1="6" x2="14" y2="14"/><line x1="18" y1="6" x2="18" y2="14"/></svg>',
    safe:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="14" cy="12" r="2.5"/><line x1="14" y1="9.5" x2="14" y2="7"/></svg>',
    fish:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13c5-7 13-7 18 0-5 7-13 7-18 0z"/><circle cx="16" cy="13" r="0.8" fill="currentColor"/></svg>',
    kitchen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="9"/><line x1="15" y1="9" x2="15" y2="21"/></svg>',
    bolt:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    paint:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 11h2v8a2 2 0 0 1-2 2h-2"/><path d="M3 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6H3"/><circle cx="9" cy="14" r="1"/></svg>',
    barrel:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="2"/><path d="M3 5v14c0 1.1 4 2 9 2s9-.9 9-2V5"/></svg>',
    plus:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  };

  // ---------- Service catalog (4 services, placeholder pricing/questions) ----------
  const DIRECTIONS = [
    { id: 'odvoz', title: 'Odvoz', sub: 'Vyvezieme od vás staré veci', icon: iconOdvoz },
    { id: 'dovoz', title: 'Dovoz', sub: 'Privezieme tovar / nábytok k vám', icon: iconDovoz },
  ];

  const SERVICES = [
    {
      id: 'furniture',
      title: 'Nábytok',
      sub:   'Sedačky, skrine, postele, stoly…',
      base:  50,
      icon:  iconFurniture,
      directions: ['odvoz', 'dovoz'],
      questions: [
        { id: 'item_kind', label: 'Aký typ nábytku?', type: 'cards', cols: 2, allowCustom: true,
          options: [
            { value: 'sofa',     label: 'Sedačka',      mult: 1.2 },
            { value: 'wardrobe', label: 'Skriňa',       mult: 1.1 },
            { value: 'bed',      label: 'Posteľ',       mult: 1.0 },
            { value: 'table',    label: 'Stôl + stoličky', mult: 1.0 },
            { value: 'mixed',    label: 'Viac kusov',   mult: 1.5 },
          ] },
        { id: 'quantity', label: 'Počet kusov?', type: 'number', placeholder: 'napr. 2' },
        { id: 'service_extra_odvoz', label: 'Potrebná demontáž?', type: 'cards', cols: 2, onlyDir: 'odvoz',
          options: [
            { value: 'yes', label: 'Áno, rozobrať',  add: 30 },
            { value: 'no',  label: 'Nie, vcelku',    tone: 'good' },
          ] },
        { id: 'service_extra_dovoz', label: 'Potrebná montáž?', type: 'cards', cols: 2, onlyDir: 'dovoz',
          options: [
            { value: 'yes', label: 'Áno, zostaviť', add: 40 },
            { value: 'no',  label: 'Nie, len doviezť', tone: 'good' },
          ] },
        { id: 'store', label: 'Z akej predajne?', type: 'cards', cols: 2, onlyDir: 'dovoz', allowCustom: true,
          options: [
            { value: 'momax',   label: 'Mömax' },
            { value: 'ikea',    label: 'IKEA' },
            { value: 'jysk',    label: 'JYSK' },
            { value: 'kika',    label: 'Kika' },
          ] },
        { id: 'remove_old', label: 'Odvezieme aj starý nábytok?', type: 'cards', cols: 2, onlyDir: 'dovoz',
          options: [
            { value: 'yes', label: 'Áno, prosím', add: 40, tone: 'good' },
            { value: 'no',  label: 'Nie, ďakujem' },
          ] },
        { id: 'from_address', label: 'Z akej adresy?', type: 'text', placeholder: 'Mesto, ulica' },
        { id: 'to_address',   label: 'Kam doručiť?',  type: 'text', placeholder: 'Mesto, ulica' },
        { id: 'floors', label: 'Poschodie z / na', type: 'group', sub: [
            { id: 'floor_from', label: 'Z poschodia',  type: 'number', placeholder: '0' },
            { id: 'floor_to',   label: 'Na poschodie', type: 'number', placeholder: '0' },
          ] },
        { id: 'elevator', label: 'Je k dispozícii výťah?', type: 'cards', cols: 3,
          options: [
            { value: 'both', label: 'Áno, oboje', tone: 'good' },
            { value: 'one',  label: 'Iba jeden',  tone: 'warn' },
            { value: 'none', label: 'Bez výťahu', tone: 'bad', addPct: 0.20 },
          ] },
        { id: 'date', label: 'Plánovaný termín?', hint: 'Voliteľné.', type: 'date' },
      ]
    },
    {
      id: 'appliance',
      title: 'Zariadenie / spotrebič',
      sub:   'Chladnička, práčka, sušička, sporák…',
      base:  45,
      icon:  iconAppliance,
      directions: ['odvoz', 'dovoz'],
      questions: [
        { id: 'item_kind', label: 'Aký spotrebič?', type: 'cards', cols: 2, allowCustom: true,
          options: [
            { value: 'fridge',  label: 'Chladnička',      mult: 1.3 },
            { value: 'washer',  label: 'Práčka',          mult: 1.0 },
            { value: 'dryer',   label: 'Sušička',         mult: 1.0 },
            { value: 'stove',   label: 'Sporák / rúra',   mult: 1.1 },
            { value: 'dishw',   label: 'Umývačka',        mult: 1.0 },
            { value: 'mixed',   label: 'Viac kusov',      mult: 1.6 },
          ] },
        { id: 'quantity', label: 'Počet kusov?', type: 'number', placeholder: 'napr. 1' },
        { id: 'disconnect', label: 'Treba odpojiť od prípojok?', type: 'cards', cols: 2, onlyDir: 'odvoz',
          options: [
            { value: 'yes', label: 'Áno', add: 25 },
            { value: 'no',  label: 'Nie, je odpojený', tone: 'good' },
          ] },
        { id: 'install', label: 'Inštalácia na mieste?', type: 'cards', cols: 2, onlyDir: 'dovoz',
          options: [
            { value: 'yes', label: 'Áno, prosím', add: 40 },
            { value: 'no',  label: 'Nie, sám si to spravím', tone: 'good' },
          ] },
        { id: 'eco', label: 'Ekologická likvidácia?', type: 'cards', cols: 2, onlyDir: 'odvoz',
          options: [
            { value: 'yes', label: 'Áno (v cene)',  tone: 'good' },
            { value: 'no',  label: 'Nie, len odviesť' },
          ] },
        { id: 'remove_old', label: 'Odvezieme aj starý spotrebič?', type: 'cards', cols: 2, onlyDir: 'dovoz',
          options: [
            { value: 'yes', label: 'Áno, prosím', add: 30, tone: 'good' },
            { value: 'no',  label: 'Nie, ďakujem' },
          ] },
        { id: 'from_address', label: 'Z akej adresy?', type: 'text', placeholder: 'Mesto, ulica' },
        { id: 'to_address',   label: 'Kam doručiť?',  type: 'text', placeholder: 'Mesto, ulica' },
        { id: 'floors', label: 'Poschodie z / na', type: 'group', sub: [
            { id: 'floor_from', label: 'Z poschodia',  type: 'number', placeholder: '0' },
            { id: 'floor_to',   label: 'Na poschodie', type: 'number', placeholder: '0' },
          ] },
        { id: 'elevator', label: 'Je k dispozícii výťah?', type: 'cards', cols: 3,
          options: [
            { value: 'both', label: 'Áno, oboje', tone: 'good' },
            { value: 'one',  label: 'Iba jeden',  tone: 'warn' },
            { value: 'none', label: 'Bez výťahu', tone: 'bad', addPct: 0.20 },
          ] },
        { id: 'date', label: 'Plánovaný termín?', type: 'date' },
      ]
    },
    {
      id: 'construction',
      title: 'Stavebný odpad',
      sub:   'Suť, drevo, kov, zmesný odpad',
      base:  70,
      icon:  iconConstruction,
      directions: ['odvoz'],
      questions: [
        { id: 'waste_type', label: 'Typ stavebného odpadu?', type: 'cards', cols: 2, allowCustom: true,
          options: [
            { value: 'rubble',   label: 'Suť / tehly',  mult: 1.0 },
            { value: 'wood',     label: 'Drevo',        mult: 0.9 },
            { value: 'metal',    label: 'Kov',          mult: 1.2, tone: 'warn' },
            { value: 'mixed',    label: 'Zmesný',       mult: 1.1 },
          ] },
        { id: 'volume', label: 'Odhadovaný objem (m³)?', hint: 'Pomôže presnejšie naceniť.', type: 'number', placeholder: 'napr. 5' },
        { id: 'bags', label: 'Alebo počet BIG-bagov?', type: 'number', placeholder: 'napr. 3' },
        { id: 'access', label: 'Prístup pre nákladiak?', type: 'cards', cols: 2,
          options: [
            { value: 'yes', label: 'Áno, k vchodu',     tone: 'good' },
            { value: 'no',  label: 'Iba pešo / ďaleko', tone: 'bad',  addPct: 0.30 },
          ] },
        { id: 'address', label: 'Adresa?', type: 'text', placeholder: 'Mesto, ulica' },
        { id: 'date',    label: 'Plánovaný termín?', type: 'date' },
      ]
    },
    {
      id: 'material',
      title: 'Materiál / tovar',
      sub:   'Z Hornbachu, OBI, Baumaxu, IKEA…',
      base:  40,
      icon:  iconMaterial,
      directions: ['dovoz'],
      questions: [
        { id: 'goods', label: 'Čo prevážame?', type: 'text', placeholder: 'napr. obklady, drevo, palety…' },
        { id: 'store', label: 'Z akej predajne?', type: 'cards', cols: 2, allowCustom: true,
          options: [
            { value: 'hornbach', label: 'Hornbach' },
            { value: 'obi',      label: 'OBI' },
            { value: 'baumax',   label: 'Baumax' },
            { value: 'ikea',     label: 'IKEA' },
          ] },
        { id: 'volume_est', label: 'Odhad objemu / hmotnosti', type: 'cards', cols: 2,
          options: [
            { value: 'small',  label: 'Menšie balenia', sub: 'do 50 kg',       mult: 0.8, tone: 'good' },
            { value: 'medium', label: 'Bežná dodávka',  sub: '50 – 300 kg',     mult: 1.0 },
            { value: 'large',  label: 'Palety',         sub: '300+ kg / palety', mult: 1.6, tone: 'warn' },
          ] },
        { id: 'carry_in', label: 'Vynáška do bytu / domu?', type: 'cards', cols: 2,
          options: [
            { value: 'yes', label: 'Áno, prosím',         add: 30 },
            { value: 'no',  label: 'Stačí pred vchod',    tone: 'good' },
          ] },
        { id: 'to_address', label: 'Kam doručiť?', type: 'text', placeholder: 'Mesto, ulica' },
        { id: 'floors', label: 'Na poschodie', type: 'number', placeholder: '0' },
        { id: 'elevator', label: 'Je výťah?', type: 'cards', cols: 2,
          options: [
            { value: 'yes', label: 'Áno', tone: 'good' },
            { value: 'no',  label: 'Nie', tone: 'bad', addPct: 0.20 },
          ] },
        { id: 'date', label: 'Plánovaný termín?', type: 'date' },
      ]
    },
    {
      id: 'other',
      title: 'Iné…',
      sub:   'Niečo iné? Popíšte vašu požiadavku',
      base:  50,
      icon:  iconOther,
      directions: ['odvoz', 'dovoz'],
      questions: [
        { id: 'description', label: 'Popíšte čo potrebujete', hint: 'Čím podrobnejšie, tým presnejší odhad.', type: 'textarea', placeholder: 'Napr. odviesť starý gauč z 3. poschodia, alebo doviezť kvety zo záhradníctva…' },
        { id: 'address', label: 'Adresa', type: 'text', placeholder: 'Mesto, ulica' },
        { id: 'date',    label: 'Plánovaný termín?', type: 'date' },
      ]
    },
  ];

  // ---------- Animated direction + category icons ----------
  function iconOdvoz() {
    // Truck loading boxes, driving AWAY (to the right)
    return ''
      + '<svg viewBox="0 0 80 56" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
      // House on the left (source of items)
      + '<g class="cbw-anim-house">'
      +   '<path d="M3 30 L11 20 L19 30 L19 46 L3 46 Z" fill="rgba(255,255,255,0.5)"/>'
      +   '<rect x="8" y="36" width="6" height="10" fill="currentColor" opacity="0.35"/>'
      + '</g>'
      // Box leaving house, flying into truck
      + '<g class="cbw-anim-box-out">'
      +   '<rect x="22" y="28" width="9" height="9" rx="0.5" fill="#fde68a" stroke="currentColor" stroke-width="1.4"/>'
      +   '<line x1="22" y1="32.5" x2="31" y2="32.5" stroke="currentColor" stroke-width="1.2" opacity="0.55"/>'
      + '</g>'
      // Truck on the right
      + '<g class="cbw-anim-truck-body">'
      +   '<rect x="33" y="24" width="24" height="20" rx="1.5" fill="rgba(255,255,255,0.35)"/>'
      +   '<path d="M57 28 L66 28 L74 36 L74 44 L57 44 Z" fill="rgba(255,255,255,0.35)"/>'
      +   '<rect x="66" y="30" width="6" height="3.5" fill="currentColor" opacity="0.4"/>'
      +   '<rect x="36" y="27" width="18" height="14" fill="currentColor" opacity="0.16"/>'
      +   '<rect x="42" y="29" width="9" height="8" rx="0.5" fill="#fde68a" stroke="currentColor" stroke-width="1.2"/>'
      + '</g>'
      // Wheels
      + '<g class="cbw-anim-wheel"><circle cx="40" cy="46" r="3.2"/><circle cx="40" cy="46" r="1" fill="currentColor"/></g>'
      + '<g class="cbw-anim-wheel" style="animation-delay:.05s"><circle cx="67" cy="46" r="3.2"/><circle cx="67" cy="46" r="1" fill="currentColor"/></g>'
      // Motion lines coming from behind
      + '<g class="cbw-anim-motion"><line x1="30" y1="36" x2="24" y2="36" stroke-width="1.2"/><line x1="29" y1="40" x2="22" y2="40" stroke-width="1.2"/></g>'
      + '</svg>';
  }
  function iconDovoz() {
    // Truck DELIVERING — driving in from the left, package flying to the house door
    return ''
      + '<svg viewBox="0 0 80 56" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
      // Truck on the left, arriving
      + '<g class="cbw-anim-truck-rev">'
      +   '<rect x="3" y="24" width="24" height="20" rx="1.5" fill="rgba(255,255,255,0.35)"/>'
      +   '<path d="M27 28 L36 28 L40 36 L40 44 L27 44 Z" fill="rgba(255,255,255,0.35)"/>'
      +   '<rect x="29" y="30" width="6" height="3.5" fill="currentColor" opacity="0.4"/>'
      +   '<rect x="6" y="27" width="18" height="14" fill="currentColor" opacity="0.16"/>'
      + '</g>'
      // Wheels
      + '<g class="cbw-anim-wheel"><circle cx="10" cy="46" r="3.2"/><circle cx="10" cy="46" r="1" fill="currentColor"/></g>'
      + '<g class="cbw-anim-wheel" style="animation-delay:.05s"><circle cx="37" cy="46" r="3.2"/><circle cx="37" cy="46" r="1" fill="currentColor"/></g>'
      // Package flying from truck to house
      + '<g class="cbw-anim-box-in">'
      +   '<rect x="42" y="30" width="9" height="9" rx="0.5" fill="#fde68a" stroke="currentColor" stroke-width="1.4"/>'
      +   '<line x1="42" y1="34.5" x2="51" y2="34.5" stroke="currentColor" stroke-width="1.2" opacity="0.55"/>'
      + '</g>'
      // House (destination) on the right
      + '<g class="cbw-anim-house-dest">'
      +   '<path d="M61 30 L69 20 L77 30 L77 46 L61 46 Z" fill="rgba(255,255,255,0.5)"/>'
      +   '<rect class="cbw-anim-door" x="66" y="36" width="6" height="10" fill="currentColor" opacity="0.5"/>'
      + '</g>'
      + '</svg>';
  }
  function iconFurniture() {
    // Sofa / wardrobe with opening doors
    return ''
      + '<svg viewBox="0 0 80 56" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
      // Wardrobe (left)
      + '<g class="cbw-anim-wardrobe">'
      +   '<rect x="6" y="10" width="28" height="40" rx="1.5" fill="rgba(255,255,255,0.4)"/>'
      +   '<line x1="20" y1="10" x2="20" y2="50"/>'
      +   '<circle class="cbw-anim-knob" cx="17" cy="30" r="1.2" fill="currentColor"/>'
      +   '<circle class="cbw-anim-knob" cx="23" cy="30" r="1.2" fill="currentColor"/>'
      // Opening left door
      +   '<rect class="cbw-anim-door-l" x="6" y="10" width="14" height="40" fill="rgba(255,255,255,0.7)" stroke="currentColor" stroke-width="1.4"/>'
      + '</g>'
      // Sofa (right)
      + '<g class="cbw-anim-sofa">'
      +   '<rect x="40" y="28" width="34" height="14" rx="2" fill="rgba(255,255,255,0.4)"/>'
      +   '<rect x="40" y="22" width="34" height="10" rx="2" fill="rgba(255,255,255,0.6)"/>'
      +   '<rect x="38" y="26" width="4" height="18" rx="1.5" fill="rgba(255,255,255,0.5)"/>'
      +   '<rect x="72" y="26" width="4" height="18" rx="1.5" fill="rgba(255,255,255,0.5)"/>'
      +   '<rect x="42" y="42" width="2" height="6"/>'
      +   '<rect x="70" y="42" width="2" height="6"/>'
      + '</g>'
      + '</svg>';
  }
  function iconAppliance() {
    // Fridge with opening door + light blink
    return ''
      + '<svg viewBox="0 0 80 56" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
      // Fridge body
      + '<g class="cbw-anim-fridge">'
      +   '<rect x="22" y="6" width="36" height="46" rx="2" fill="rgba(255,255,255,0.4)"/>'
      +   '<line x1="22" y1="22" x2="58" y2="22"/>'
      +   '<rect x="54" y="12" width="2" height="6" rx="0.5" fill="currentColor" opacity="0.6"/>'
      +   '<rect x="54" y="28" width="2" height="6" rx="0.5" fill="currentColor" opacity="0.6"/>'
      // Inside (light)
      +   '<rect class="cbw-anim-fridge-light" x="26" y="26" width="22" height="22" fill="#fde68a" opacity="0"/>'
      // Door opening
      +   '<rect class="cbw-anim-fridge-door" x="22" y="22" width="36" height="30" rx="1" fill="rgba(255,255,255,0.7)" stroke="currentColor" stroke-width="1.4"/>'
      + '</g>'
      // Snowflake
      + '<g class="cbw-anim-snow">'
      +   '<line x1="40" y1="10" x2="40" y2="18"/>'
      +   '<line x1="36" y1="14" x2="44" y2="14"/>'
      +   '<line x1="37" y1="11" x2="43" y2="17"/>'
      +   '<line x1="43" y1="11" x2="37" y2="17"/>'
      + '</g>'
      + '</svg>';
  }
  function iconConstruction() {
    // Bricks falling into a container
    return ''
      + '<svg viewBox="0 0 80 56" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
      // Falling bricks
      + '<g class="cbw-anim-brick-1"><rect x="20" y="2" width="10" height="5" fill="currentColor" opacity="0.65"/></g>'
      + '<g class="cbw-anim-brick-2"><rect x="38" y="2" width="10" height="5" fill="currentColor" opacity="0.55"/></g>'
      + '<g class="cbw-anim-brick-3"><rect x="56" y="2" width="10" height="5" fill="currentColor" opacity="0.5"/></g>'
      // Container body
      + '<path d="M8 22 L72 22 L66 50 L14 50 Z" fill="rgba(255,255,255,0.5)" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>'
      + '<line x1="14" y1="32" x2="66" y2="32"/>'
      + '<line x1="14" y1="42" x2="66" y2="42"/>'
      + '<line x1="32" y1="22" x2="32" y2="50"/>'
      + '<line x1="48" y1="22" x2="48" y2="50"/>'
      // Dust particles
      + '<g class="cbw-anim-dust">'
      +   '<circle cx="22" cy="26" r="1.4" fill="currentColor" opacity="0.5"/>'
      +   '<circle cx="58" cy="28" r="1.2" fill="currentColor" opacity="0.45"/>'
      + '</g>'
      + '</svg>';
  }
  function iconMaterial() {
    // Pallet being lifted by a forklift
    return ''
      + '<svg viewBox="0 0 80 56" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
      // Pallet + boxes
      + '<g class="cbw-anim-pallet">'
      +   '<rect x="38" y="20" width="34" height="16" rx="0.5" fill="rgba(255,255,255,0.5)"/>'
      +   '<line x1="38" y1="28" x2="72" y2="28"/>'
      +   '<line x1="50" y1="20" x2="50" y2="36"/>'
      +   '<line x1="60" y1="20" x2="60" y2="36"/>'
      +   '<rect x="40" y="10" width="14" height="10" rx="0.5" fill="#fde68a" stroke="currentColor" stroke-width="1.2"/>'
      +   '<rect x="56" y="14" width="14" height="6"  rx="0.5" fill="#fde68a" stroke="currentColor" stroke-width="1.2"/>'
      + '</g>'
      // Pallet bottom slats
      + '<g class="cbw-anim-pallet">'
      +   '<rect x="38" y="36" width="34" height="3" fill="rgba(255,255,255,0.6)" stroke="currentColor" stroke-width="1.2"/>'
      +   '<rect x="40" y="39" width="3" height="5" fill="rgba(255,255,255,0.6)" stroke="currentColor" stroke-width="1"/>'
      +   '<rect x="52" y="39" width="3" height="5" fill="rgba(255,255,255,0.6)" stroke="currentColor" stroke-width="1"/>'
      +   '<rect x="67" y="39" width="3" height="5" fill="rgba(255,255,255,0.6)" stroke="currentColor" stroke-width="1"/>'
      + '</g>'
      // Forklift
      + '<g class="cbw-anim-forklift">'
      +   '<rect x="6" y="24" width="14" height="14" rx="1" fill="rgba(255,255,255,0.5)"/>'
      +   '<rect x="9" y="26" width="8" height="6" fill="currentColor" opacity="0.35"/>'
      +   '<line x1="20" y1="42" x2="40" y2="42" stroke-width="2"/>'
      +   '<line x1="20" y1="46" x2="40" y2="46" stroke-width="2"/>'
      + '</g>'
      // Wheels
      + '<g class="cbw-anim-wheel"><circle cx="10" cy="44" r="2.4"/><circle cx="10" cy="44" r=".8" fill="currentColor"/></g>'
      + '<g class="cbw-anim-wheel" style="animation-delay:.05s"><circle cx="17" cy="44" r="2.4"/><circle cx="17" cy="44" r=".8" fill="currentColor"/></g>'
      + '</svg>';
  }
  function iconOther() {
    // Big question mark with pulsing dots
    return ''
      + '<svg viewBox="0 0 80 56" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
      + '<g class="cbw-anim-other">'
      +   '<circle cx="40" cy="28" r="20" fill="rgba(255,255,255,0.4)"/>'
      +   '<path d="M32 24 a8 8 0 0 1 16 0 c0 5 -8 6 -8 12" stroke-width="2.4"/>'
      +   '<circle cx="40" cy="42" r="1.6" fill="currentColor"/>'
      + '</g>'
      + '<g class="cbw-anim-dot-1"><circle cx="14" cy="14" r="1.6" fill="currentColor" opacity="0.5"/></g>'
      + '<g class="cbw-anim-dot-2"><circle cx="66" cy="14" r="1.6" fill="currentColor" opacity="0.5"/></g>'
      + '<g class="cbw-anim-dot-3"><circle cx="20" cy="48" r="1.6" fill="currentColor" opacity="0.5"/></g>'
      + '<g class="cbw-anim-dot-4"><circle cx="60" cy="48" r="1.6" fill="currentColor" opacity="0.5"/></g>'
      + '</svg>';
  }

  // ---------- Wizard state ----------
  const wiz = document.getElementById('cbwCalcWizard');
  const wizBody  = document.getElementById('cbwCalcBody');
  const wizFoot  = document.getElementById('cbwCalcFoot');
  const wizPrev  = document.getElementById('cbwCalcPrev');
  const wizNext  = document.getElementById('cbwCalcNext');
  const wizBack  = document.getElementById('cbwCalcBack');
  const wizExit  = document.getElementById('cbwCalcExit');
  const wizTitle = document.getElementById('cbwCalcTitle');
  const wizStep  = document.getElementById('cbwCalcStep');
  const wizBar   = document.getElementById('cbwCalcBarFill');
  const ctaBtn   = document.getElementById('cbwOpenCalc');

  /*
   * Wizard state:
   *   qIndex = -2  → pick direction (odvoz / dovoz)
   *   qIndex = -1  → pick service category
   *   qIndex 0..N-1 → service question (with onlyDir filter applied)
   *   qIndex = N   → summary + contact form
   *   qIndex = N+1 → thank-you screen
   */
  const RESUME_KEY = 'cbw_calc_resume_v1';
  let wizState = {
    direction: null,  // 'odvoz' | 'dovoz'
    service:   null,
    answers:   {},
    qIndex:    -2,
  };

  function persistResume() {
    try {
      if (wizState.qIndex < 0 || wizState.qIndex >= (wizState.service ? wizState.service.questions.length + 2 : 0)) {
        localStorage.removeItem(RESUME_KEY);
        return;
      }
      localStorage.setItem(RESUME_KEY, JSON.stringify({
        direction: wizState.direction,
        serviceId: wizState.service && wizState.service.id,
        answers:   wizState.answers,
        qIndex:    wizState.qIndex,
      }));
    } catch (_) {}
  }
  function loadResume() {
    try {
      const raw = localStorage.getItem(RESUME_KEY);
      if (!raw) return null;
      const d = JSON.parse(raw);
      if (!d || !d.direction || !d.serviceId) return null;
      const svc = SERVICES.find(s => s.id === d.serviceId);
      if (!svc) return null;
      return { direction: d.direction, service: svc, answers: d.answers || {}, qIndex: typeof d.qIndex === 'number' ? d.qIndex : 0 };
    } catch (_) { return null; }
  }

  function openCalc() {
    root.classList.add('cbw-calc-active');
    wiz.dataset.open = 'true';
    const resumed = loadResume();
    if (resumed && confirmResume()) {
      wizState = { direction: resumed.direction, service: resumed.service, answers: resumed.answers, qIndex: resumed.qIndex };
    } else {
      wizState = { direction: null, service: null, answers: {}, qIndex: -2 };
    }
    renderWizard();
    setRobotState('greeting', 1500);
  }
  function confirmResume() {
    // Lightweight resume — silent if there's saved progress for the same session.
    // Could be replaced with a small banner; keeping it simple for now.
    return true;
  }
  function closeCalc() {
    root.classList.remove('cbw-calc-active');
    wiz.dataset.open = 'false';
  }
  ctaBtn.addEventListener('click', openCalc);
  wizExit.addEventListener('click', closeCalc);

  // Skip questions whose onlyDir does not match the chosen direction.
  function visibleQuestions() {
    if (!wizState.service) return [];
    return wizState.service.questions.filter(q => !q.onlyDir || q.onlyDir === wizState.direction);
  }

  // Steps: 1 (direction) + 1 (service) + Nvisible (questions) + 1 (summary) + 1 (thanks)
  function totalSteps() {
    if (!wizState.service) return 1 + 1;
    return 2 + visibleQuestions().length + 2;
  }
  function currentStepNumber() {
    // direction = 1, service = 2, questions 3..N+2, summary N+3, thanks N+4
    return wizState.qIndex + 3;
  }
  function setProgress() {
    const pct = (currentStepNumber() / totalSteps()) * 100;
    wizBar.style.width = pct + '%';
  }
  function setHeader(title, stepText) {
    wizTitle.textContent = title;
    wizStep.textContent  = stepText;
    wizBack.style.visibility = (wizState.qIndex <= -2) ? 'hidden' : 'visible';
  }

  function renderWizard() {
    wizBody.innerHTML = '';
    wizFoot.style.display = 'none';

    if (wizState.qIndex === -2) {
      renderDirectionPicker();
    } else if (wizState.qIndex === -1) {
      renderServicePicker();
    } else if (wizState.qIndex < wizState.service.questions.length) {
      // Skip onlyDir-filtered questions automatically
      const q = wizState.service.questions[wizState.qIndex];
      if (q.onlyDir && q.onlyDir !== wizState.direction) {
        wizState.qIndex += 1;
        return renderWizard();
      }
      renderQuestion();
    } else if (wizState.qIndex === wizState.service.questions.length) {
      renderSummary();
    } else {
      renderThanks();
    }
    setProgress();
    persistResume();
  }

  function renderDirectionPicker() {
    setHeader('Cenová kalkulačka', 'Krok 1 — odvoz alebo dovoz?');
    const intro = document.createElement('p');
    intro.className = 'cbw-calc-prompt';
    intro.textContent = 'Čo pre vás zariadime?';
    const hint = document.createElement('p');
    hint.className = 'cbw-calc-hint';
    hint.textContent = 'Vyberte smer — odviezť staré veci, alebo doviezť nový tovar.';
    wizBody.appendChild(intro);
    wizBody.appendChild(hint);

    const grid = document.createElement('div');
    grid.className = 'cbw-svc-grid';
    DIRECTIONS.forEach(dir => {
      const card = document.createElement('button');
      card.className = 'cbw-svc-card cbw-dir-card';
      card.type = 'button';
      card.innerHTML =
        '<span class="cbw-svc-icon">' + dir.icon() + '</span>'
        + '<span class="cbw-svc-text"><span class="cbw-svc-title">' + dir.title + '</span><span class="cbw-svc-sub">' + dir.sub + '</span></span>'
        + '<svg class="cbw-svc-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';
      card.addEventListener('click', () => {
        spawnConfetti(card);
        setRobotState('action', 800);
        wizState.direction = dir.id;
        wizState.qIndex = -1;
        renderWizard();
      });
      grid.appendChild(card);
    });
    wizBody.appendChild(grid);
  }

  function renderServicePicker() {
    const dirLabel = wizState.direction === 'odvoz' ? 'Odvoz' : 'Dovoz';
    setHeader(dirLabel, 'Krok 2 — vyberte kategóriu');
    const intro = document.createElement('p');
    intro.className = 'cbw-calc-prompt';
    intro.textContent = 'Čo bude predmetom ' + (wizState.direction === 'odvoz' ? 'odvozu' : 'dovozu') + '?';
    const hint = document.createElement('p');
    hint.className = 'cbw-calc-hint';
    hint.textContent = 'Vyberte kategóriu, alebo „Iné…" a popíšte to vlastnými slovami.';
    wizBody.appendChild(intro);
    wizBody.appendChild(hint);

    const grid = document.createElement('div');
    grid.className = 'cbw-svc-grid';
    SERVICES
      .filter(svc => !svc.directions || svc.directions.indexOf(wizState.direction) >= 0)
      .forEach(svc => {
        const card = document.createElement('button');
        card.className = 'cbw-svc-card';
        card.type = 'button';
        card.innerHTML =
          '<span class="cbw-svc-icon">' + svc.icon() + '</span>'
          + '<span class="cbw-svc-text"><span class="cbw-svc-title">' + svc.title + '</span><span class="cbw-svc-sub">' + svc.sub + '</span></span>'
          + '<svg class="cbw-svc-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';
        card.addEventListener('click', () => {
          spawnConfetti(card);
          setRobotState('action', 800);
          wizState.service = svc;
          wizState.qIndex = 0;
          renderWizard();
        });
        grid.appendChild(card);
      });
    wizBody.appendChild(grid);
  }

  function renderQuestion() {
    const q = wizState.service.questions[wizState.qIndex];
    const vis = visibleQuestions();
    const visIdx = vis.indexOf(q) + 1; // 1-based
    setHeader(wizState.service.title, 'Krok ' + (visIdx + 2) + ' z ' + (vis.length + 3));

    const prompt = document.createElement('p');
    prompt.className = 'cbw-calc-prompt';
    prompt.textContent = q.label;
    wizBody.appendChild(prompt);

    if (q.hint) {
      const hint = document.createElement('p');
      hint.className = 'cbw-calc-hint';
      hint.textContent = q.hint;
      wizBody.appendChild(hint);
    }

    if (q.type === 'cards') {
      const grid = document.createElement('div');
      grid.className = 'cbw-q-cards' + (q.cols === 3 ? ' cbw-q-cards-3' : '');
      if (q.cols === 1) grid.style.gridTemplateColumns = '1fr';

      // Custom answer panel (revealed when "Iné" is clicked, if allowed)
      let customWrap = null;
      let customInput = null;
      if (q.allowCustom) {
        customWrap = document.createElement('div');
        customWrap.className = 'cbw-q-custom-wrap';
        customWrap.style.display = 'none';
        customInput = document.createElement('input');
        customInput.className = 'cbw-q-input';
        customInput.placeholder = 'Popíšte vašu situáciu…';
        const existing = wizState.answers[q.id];
        if (typeof existing === 'string' && existing.indexOf('__custom__:') === 0) {
          customInput.value = existing.slice('__custom__:'.length);
          customWrap.style.display = 'block';
        }
        customInput.addEventListener('input', () => {
          wizState.answers[q.id] = '__custom__:' + customInput.value;
          wizNext.disabled = !customInput.value.trim();
        });
        customWrap.appendChild(customInput);
      }

      q.options.forEach(opt => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'cbw-q-card';
        if (opt.tone) b.dataset.tone = opt.tone;
        b.setAttribute('aria-pressed', wizState.answers[q.id] === opt.value ? 'true' : 'false');
        b.innerHTML = opt.label + (opt.sub ? '<small>' + opt.sub + '</small>' : '');
        b.addEventListener('click', () => {
          wizState.answers[q.id] = opt.value;
          grid.querySelectorAll('.cbw-q-card').forEach(c => c.setAttribute('aria-pressed', 'false'));
          b.setAttribute('aria-pressed', 'true');
          if (customWrap) customWrap.style.display = 'none';
          wizNext.disabled = false;
        });
        grid.appendChild(b);
      });

      if (q.allowCustom) {
        const cb = document.createElement('button');
        cb.type = 'button';
        cb.className = 'cbw-q-card cbw-q-card-custom';
        const isCustom = typeof wizState.answers[q.id] === 'string'
          && wizState.answers[q.id].indexOf('__custom__:') === 0;
        cb.setAttribute('aria-pressed', isCustom ? 'true' : 'false');
        cb.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg><span>Iné…</span>';
        cb.addEventListener('click', () => {
          grid.querySelectorAll('.cbw-q-card').forEach(c => c.setAttribute('aria-pressed', 'false'));
          cb.setAttribute('aria-pressed', 'true');
          customWrap.style.display = 'block';
          setTimeout(() => customInput.focus(), 50);
          wizState.answers[q.id] = '__custom__:' + (customInput.value || '');
          wizNext.disabled = !customInput.value.trim();
        });
        grid.appendChild(cb);
      }

      wizBody.appendChild(grid);
      if (customWrap) wizBody.appendChild(customWrap);
    } else if (q.type === 'multi') {
      const wrap = document.createElement('div');
      wrap.className = 'cbw-q-multi';
      const sel = wizState.answers[q.id] || [];
      q.options.forEach(opt => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'cbw-q-chip';
        b.setAttribute('aria-pressed', sel.includes(opt.value) ? 'true' : 'false');
        const ico = (opt.icon && ICN[opt.icon])
          ? '<span class="cbw-q-chip-ico">' + ICN[opt.icon] + '</span>'
          : '';
        b.innerHTML = ico + '<span>' + opt.label + '</span>';
        b.addEventListener('click', () => {
          const cur = wizState.answers[q.id] || [];
          const i = cur.indexOf(opt.value);
          if (i >= 0) cur.splice(i, 1); else cur.push(opt.value);
          wizState.answers[q.id] = cur;
          b.setAttribute('aria-pressed', cur.includes(opt.value) ? 'true' : 'false');
        });
        wrap.appendChild(b);
      });
      wizBody.appendChild(wrap);
      wizNext.disabled = false; // multi-select is always optional
    } else if (q.type === 'text' || q.type === 'number' || q.type === 'date') {
      const inp = document.createElement('input');
      inp.className = 'cbw-q-input';
      inp.type = q.type === 'number' ? 'number' : (q.type === 'date' ? 'date' : 'text');
      if (q.placeholder) inp.placeholder = q.placeholder;
      if (wizState.answers[q.id] != null) inp.value = wizState.answers[q.id];
      inp.addEventListener('input', () => {
        wizState.answers[q.id] = inp.value;
        wizNext.disabled = false;
      });
      wizBody.appendChild(inp);
      // Optional fields are always passable; required ones gate Next.
      wizNext.disabled = false;
    } else if (q.type === 'group') {
      const group = document.createElement('div');
      group.className = 'cbw-q-group';
      q.sub.forEach(sub => {
        const item = document.createElement('div');
        item.className = 'cbw-q-group-item';
        const lab = document.createElement('label');
        lab.textContent = sub.label;
        const inp = document.createElement('input');
        inp.className = 'cbw-q-input';
        inp.type = sub.type || 'text';
        if (sub.placeholder) inp.placeholder = sub.placeholder;
        if (wizState.answers[sub.id] != null) inp.value = wizState.answers[sub.id];
        inp.addEventListener('input', () => { wizState.answers[sub.id] = inp.value; });
        item.appendChild(lab);
        item.appendChild(inp);
        group.appendChild(item);
      });
      wizBody.appendChild(group);
      wizNext.disabled = false;
    } else if (q.type === 'textarea') {
      const ta = document.createElement('textarea');
      ta.className = 'cbw-q-input';
      ta.rows = 4;
      if (q.placeholder) ta.placeholder = q.placeholder;
      if (wizState.answers[q.id] != null) ta.value = wizState.answers[q.id];
      ta.addEventListener('input', () => {
        wizState.answers[q.id] = ta.value;
        wizNext.disabled = !ta.value.trim();
      });
      wizBody.appendChild(ta);
      wizNext.disabled = !(wizState.answers[q.id] && wizState.answers[q.id].trim());
    }

    wizFoot.style.display = 'flex';
    wizPrev.textContent = wizState.qIndex === 0 ? 'Späť na výber' : 'Späť';
    wizNext.textContent = (wizState.qIndex === wizState.service.questions.length - 1) ? 'Zobraziť cenu' : 'Pokračovať';
  }

  function calculatePrice() {
    const svc = wizState.service;
    let price = svc.base;
    let mult  = 1.0;
    let pctAdd = 0;
    let extras = 0;

    svc.questions.forEach(q => {
      if (q.onlyDir && q.onlyDir !== wizState.direction) return;
      const a = wizState.answers[q.id];
      if (q.type === 'cards' && a) {
        const opt = q.options.find(o => o.value === a);
        if (opt) {
          if (opt.mult)   mult  *= opt.mult;
          if (opt.add)    extras += opt.add;
          if (opt.addPct) pctAdd += opt.addPct;
        }
      } else if (q.type === 'multi' && Array.isArray(a)) {
        a.forEach(v => {
          const opt = q.options.find(o => o.value === v);
          if (opt && opt.add) extras += opt.add;
        });
      } else if (q.type === 'number' && a) {
        const n = Number(a) || 0;
        if (q.id === 'area' || q.id === 'volume' || q.id === 'bags') {
          mult *= Math.max(0.6, Math.min(3.0, 0.6 + n / 50));
        }
        if (q.id === 'quantity' && n > 1) {
          mult *= 1 + (n - 1) * 0.35;
        }
      }
    });

    price = price * mult * (1 + pctAdd) + extras;
    return Math.max(40, Math.round(price / 10) * 10);
  }

  function formatAnswer(q, a) {
    if (a == null || a === '' || (Array.isArray(a) && !a.length)) return '—';
    if (q.type === 'cards') {
      if (typeof a === 'string' && a.indexOf('__custom__:') === 0) {
        const v = a.slice('__custom__:'.length).trim();
        return v ? 'Iné — ' + v : 'Iné';
      }
      const opt = q.options.find(o => o.value === a);
      return opt ? opt.label : String(a);
    }
    if (q.type === 'multi') {
      return a.map(v => {
        const opt = q.options.find(o => o.value === v);
        return opt ? opt.label : v;
      }).join(', ');
    }
    return String(a);
  }

  function renderSummary() {
    setHeader(wizState.service.title, 'Zhrnutie a kontakt');
    const svc = wizState.service;
    const price = calculatePrice();

    // Summary rows
    const sum = document.createElement('div');
    sum.className = 'cbw-sum-card';
    const dirRow = document.createElement('div');
    dirRow.className = 'cbw-sum-row';
    dirRow.innerHTML = '<span>Smer</span><span>' + (wizState.direction === 'odvoz' ? 'Odvoz' : 'Dovoz') + '</span>';
    sum.appendChild(dirRow);
    const headerRow = document.createElement('div');
    headerRow.className = 'cbw-sum-row';
    headerRow.innerHTML = '<span>Kategória</span><span>' + svc.title + '</span>';
    sum.appendChild(headerRow);

    svc.questions.forEach(q => {
      if (q.onlyDir && q.onlyDir !== wizState.direction) return;
      if (q.type === 'group') {
        q.sub.forEach(sub => {
          const v = wizState.answers[sub.id];
          if (v == null || v === '') return;
          const r = document.createElement('div');
          r.className = 'cbw-sum-row';
          r.innerHTML = '<span>' + sub.label + '</span><span>' + (v || '—') + '</span>';
          sum.appendChild(r);
        });
      } else {
        const v = wizState.answers[q.id];
        if (v == null || v === '' || (Array.isArray(v) && !v.length)) return;
        const r = document.createElement('div');
        r.className = 'cbw-sum-row';
        r.innerHTML = '<span>' + q.label + '</span><span>' + formatAnswer(q, v) + '</span>';
        sum.appendChild(r);
      }
    });
    wizBody.appendChild(sum);

    // Price card
    const priceCard = document.createElement('div');
    priceCard.className = 'cbw-sum-price cbw-dynamic-green';
    priceCard.innerHTML =
      '<div class="cbw-sum-price-label">Orientačná cena</div>'
      + '<div class="cbw-sum-price-value">' + price.toLocaleString('sk-SK') + ' €</div>'
      + '<div class="cbw-sum-price-note">Konečnú cenu vám potvrdí konateľ po krátkom telefonáte / obhliadke.</div>';
    wizBody.appendChild(priceCard);

    // Photos upload (optional)
    const photoBlock = document.createElement('div');
    photoBlock.style.cssText = 'margin-bottom:10px;';
    photoBlock.innerHTML =
      '<p class="cbw-calc-prompt" style="font-size:14px;margin-bottom:6px">Fotky (voliteľné)</p>'
      + '<p class="cbw-calc-hint" style="margin-bottom:6px">Pomôžete nám presnejšie naceniť. Max. 3 fotky.</p>'
      + '<label for="cbwSumPhotos" class="cbw-photo-drop">'
      +   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>'
      +   '<span>Vybrať fotky</span>'
      + '</label>'
      + '<input id="cbwSumPhotos" type="file" accept="image/*" multiple style="display:none">'
      + '<div id="cbwPhotoThumbs" class="cbw-photo-thumbs"></div>';
    wizBody.appendChild(photoBlock);

    const photoInput = document.getElementById('cbwSumPhotos');
    const photoThumbs = document.getElementById('cbwPhotoThumbs');
    wizState._photos = wizState._photos || [];
    function renderThumbs() {
      photoThumbs.innerHTML = '';
      wizState._photos.forEach((p, i) => {
        const t = document.createElement('div');
        t.className = 'cbw-photo-thumb';
        t.innerHTML = '<img src="' + p.url + '" alt=""><button type="button" aria-label="Odstrániť" data-idx="' + i + '">×</button>';
        photoThumbs.appendChild(t);
      });
      photoThumbs.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          wizState._photos.splice(+btn.dataset.idx, 1);
          renderThumbs();
        });
      });
    }
    photoInput.addEventListener('change', () => {
      const files = Array.from(photoInput.files || []).slice(0, 3 - wizState._photos.length);
      files.forEach(f => {
        const reader = new FileReader();
        reader.onload = () => {
          wizState._photos.push({ name: f.name, type: f.type, size: f.size, url: reader.result });
          renderThumbs();
        };
        reader.readAsDataURL(f);
      });
      photoInput.value = '';
    });
    renderThumbs();

    // Contact form
    const form = document.createElement('div');
    form.innerHTML =
      '<p class="cbw-calc-prompt" style="font-size:15px;margin:6px 0 8px">Vaše kontaktné údaje</p>'
      + '<input class="cbw-q-input" id="cbwSumName"  type="text"  placeholder="Vaše meno" required style="margin-bottom:8px">'
      + '<input class="cbw-q-input" id="cbwSumEmail" type="email" placeholder="E-mail"     required style="margin-bottom:8px">'
      + '<input class="cbw-q-input" id="cbwSumPhone" type="tel"   placeholder="Telefón (napr. +421 9XX XXX XXX)" required style="margin-bottom:8px">'
      + '<textarea class="cbw-q-input" id="cbwSumMsg" rows="2" placeholder="Doplňujúca správa (nepovinné)"></textarea>'
      + '<p class="cbw-gdpr">Odoslaním súhlasíte so spracovaním vašich kontaktných údajov za účelom vybavenia dopytu. Údaje neposkytujeme tretím stranám.</p>';
    wizBody.appendChild(form);

    const sName  = document.getElementById('cbwSumName');
    const sEmail = document.getElementById('cbwSumEmail');
    const sPhone = document.getElementById('cbwSumPhone');
    function isSkPhoneValid(v) {
      // Accepts +421 9XX XXX XXX, 09XX XXX XXX, with optional spaces / hyphens
      const cleaned = v.replace(/[\s\-]/g, '');
      return /^(?:\+421|421|0)9\d{8}$/.test(cleaned);
    }
    function validate() {
      const nameOk  = sName.value.trim().length >= 2;
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sEmail.value.trim());
      const phoneOk = isSkPhoneValid(sPhone.value.trim());
      sName.classList.toggle('cbw-invalid',  !nameOk  && sName.value.length > 0);
      sEmail.classList.toggle('cbw-invalid', !emailOk && sEmail.value.length > 0);
      sPhone.classList.toggle('cbw-invalid', !phoneOk && sPhone.value.length > 0);
      wizNext.disabled = !(nameOk && emailOk && phoneOk);
    }
    sName.addEventListener('input',  validate);
    sEmail.addEventListener('input', validate);
    sPhone.addEventListener('input', validate);
    validate();

    wizState._lastPrice = price;
    wizFoot.style.display = 'flex';
    wizPrev.textContent = 'Späť';
    wizNext.textContent = 'Odoslať dopyt';
  }

  async function submitQuoteRequest() {
    const svc = wizState.service;
    const name  = (document.getElementById('cbwSumName')  || {}).value || '';
    const email = (document.getElementById('cbwSumEmail') || {}).value || '';
    const phone = (document.getElementById('cbwSumPhone') || {}).value || '';
    const msg   = (document.getElementById('cbwSumMsg')   || {}).value || '';

    // Build human-readable answers map for the email
    const answersFlat = { 'Smer': wizState.direction === 'odvoz' ? 'Odvoz' : 'Dovoz' };
    svc.questions.forEach(q => {
      if (q.onlyDir && q.onlyDir !== wizState.direction) return;
      if (q.type === 'group') {
        q.sub.forEach(sub => {
          const v = wizState.answers[sub.id];
          if (v != null && v !== '') answersFlat[sub.label] = String(v);
        });
      } else {
        const v = wizState.answers[q.id];
        if (v == null || v === '' || (Array.isArray(v) && !v.length)) return;
        answersFlat[q.label] = formatAnswer(q, v);
      }
    });

    const photos = (wizState._photos || []).map(p => ({
      name: p.name, type: p.type, size: p.size, data_url: p.url,
    }));

    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || null,
      message: msg.trim() || null,
      service_request: {
        service: svc.id,
        service_label: (wizState.direction === 'odvoz' ? 'Odvoz — ' : 'Dovoz — ') + svc.title,
        answers: answersFlat,
        estimated_price: wizState._lastPrice.toLocaleString('sk-SK') + ' €',
        photos: photos,
      },
    };

    wizNext.disabled = true;
    wizNext.textContent = 'Odosielam…';
    try {
      await fetch(window.location.origin + '/api/lead', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (_) { /* best effort — still show thanks */ }

    // Clear resume state after successful submit
    try { localStorage.removeItem(RESUME_KEY); } catch (_) {}

    wizState.qIndex = wizState.service.questions.length + 1;
    renderWizard();

    // Mirror in chat (so when user closes the calc, the conversation has a trace)
    appendBubble('user', 'Cenová ponuka: ' + svc.title);
    appendBubble('bot',  'Ďakujeme, ' + (name.trim() || 'priateľu') + '! Vašu požiadavku sme prijali. Konateľ vás bude čo najskôr kontaktovať. Potvrdenie sme vám zaslali na e-mail.');
    playSound();
    setRobotState('action', 2000);
  }

  function renderThanks() {
    setHeader(wizState.service.title, 'Hotovo');
    const wrap = document.createElement('div');
    wrap.className = 'cbw-thanks';
    wrap.innerHTML =
      '<div class="cbw-thanks-emoji">🎉</div>'
      + '<div class="cbw-thanks-title">Ďakujeme!</div>'
      + '<div class="cbw-thanks-text">Váš dopyt sme prijali a konateľ firmy vás bude čo najskôr kontaktovať.<br>Potvrdenie sme zaslali na váš e-mail.</div>';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'cbw-calc-next-btn cbw-dynamic-green';
    closeBtn.style.cssText = 'width:100%;padding:13px 16px;border:none;border-radius:12px;color:#fff;font:inherit;font-size:14px;font-weight:600;cursor:pointer;';
    closeBtn.textContent = 'Späť do chatu';
    closeBtn.addEventListener('click', closeCalc);
    wrap.appendChild(closeBtn);
    wizBody.appendChild(wrap);
  }

  // ---------- Wizard footer wiring ----------
  function stepBackOnce() {
    if (wizState.qIndex <= -2) return;
    if (wizState.qIndex === -1) {
      wizState.direction = null;
      wizState.qIndex = -2;
    } else if (wizState.qIndex === 0) {
      wizState.service = null;
      wizState.qIndex = -1;
    } else {
      // Skip backward over onlyDir-filtered questions
      do { wizState.qIndex -= 1; }
      while (wizState.qIndex >= 0
             && wizState.service.questions[wizState.qIndex].onlyDir
             && wizState.service.questions[wizState.qIndex].onlyDir !== wizState.direction);
    }
  }
  wizPrev.addEventListener('click', () => {
    stepBackOnce();
    renderWizard();
  });
  wizNext.addEventListener('click', () => {
    if (!wizState.service) return;
    if (wizState.qIndex < wizState.service.questions.length - 1) {
      wizState.qIndex += 1;
      renderWizard();
    } else if (wizState.qIndex === wizState.service.questions.length - 1) {
      wizState.qIndex += 1;
      renderWizard();
    } else if (wizState.qIndex === wizState.service.questions.length) {
      submitQuoteRequest();
    }
  });
  wizBack.addEventListener('click', () => wizPrev.click());

  // ---------- Kontakty Init (odvoznabytku.sk) ----------
  function applyConfig() {
    const c = { phone: '+421948841313', whatsapp: '+421948841313', email: 'info@odvoznabytku.sk' };

    if (c.phone) contactBar.insertAdjacentHTML('beforeend', '<a class="cbw-contact-icon contact-click" href="tel:' + c.phone + '" data-kind="phone">' + ICON_PHONE + '<span>Zavolať</span></a>');
    if (c.whatsapp) {
      const wa = c.whatsapp.replace(/[^\d]/g, '');
      const waMsg = encodeURIComponent('Dobrý deň, mám záujem o vašu službu.');
      contactBar.insertAdjacentHTML('beforeend', '<a class="cbw-contact-icon contact-click" href="https://wa.me/' + wa + '?text=' + waMsg + '" target="_blank" data-kind="whatsapp">' + ICON_WA + '<span>WhatsApp</span></a>');
    }
    if (c.email) contactBar.insertAdjacentHTML('beforeend', '<a class="cbw-contact-icon contact-click" href="mailto:' + c.email + '" data-kind="email">' + ICON_MAIL + '<span>Mail</span></a>');

    // Sticky call bar (above composer)
    const callBar = document.getElementById('cbwCallBar');
    if (callBar && c.phone) {
      callBar.innerHTML =
        '<div class="cbw-callbar-text">'
        +   '<strong>Radšej zavoláte?</strong>'
        +   'Sme dostupní každý pracovný deň.'
        + '</div>'
        + '<a class="cbw-callbar-btn contact-click" href="tel:' + c.phone + '" data-kind="phone">'
        +   ICON_PHONE + '<span>' + c.phone.replace(/^\+421/, '+421 ') + '</span>'
        + '</a>';
    }

    document.querySelectorAll('.contact-click').forEach(btn => {
      btn.addEventListener('click', () => setRobotState('action', 1500));
    });
  }
  applyConfig();

})();
</script>

</body>
</html>
