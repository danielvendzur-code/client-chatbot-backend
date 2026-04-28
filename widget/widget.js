/* ============================================================
 * Embeddable chat widget — emerald palette.
 *
 * Usage:
 *   <script src="https://your-host/widget/widget.js"
 *           data-api="https://your-host" defer></script>
 *
 * Pulls config from `${api}/api/config`, posts chat messages
 * to `${api}/api/chat`, and submits leads to `${api}/api/lead`.
 * ============================================================ */

(function () {
  "use strict";

  if (window.__cbwLoaded) return;
  window.__cbwLoaded = true;

  const script = document.currentScript ||
    document.querySelector('script[src*="widget.js"]');
  const apiBase = (script && script.dataset.api) || window.location.origin;
  const cssHref = (script && script.dataset.css) ||
    apiBase.replace(/\/$/, "") + "/widget/widget.css";
  const STORAGE_KEY = "cbw_state_v1";
  const MUTE_KEY = "cbw_muted";

  // ---------- helpers ----------
  const h = (tag, attrs = {}, children = []) => {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") el.className = v;
      else if (k === "html") el.innerHTML = v;
      else if (k.startsWith("on") && typeof v === "function") {
        el.addEventListener(k.slice(2).toLowerCase(), v);
      } else if (v !== false && v != null) {
        el.setAttribute(k, v);
      }
    }
    for (const c of [].concat(children)) {
      if (c == null || c === false) continue;
      el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return el;
  };
  const fmtTime = (d = new Date()) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const loadCss = () => {
    if (document.querySelector('link[data-cbw="1"]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = cssHref;
    link.dataset.cbw = "1";
    document.head.appendChild(link);
  };

  const applyTheme = (root, theme) => {
    const map = {
      primary: "--cbw-primary", primaryHover: "--cbw-primary-hover",
      accent: "--cbw-accent", bg: "--cbw-bg", surface: "--cbw-surface",
      text: "--cbw-text", textMuted: "--cbw-text-muted", border: "--cbw-border",
      userBubble: "--cbw-user-bubble", botBubble: "--cbw-bot-bubble",
      radius: "--cbw-radius",
    };
    for (const [k, cssVar] of Object.entries(map)) {
      if (theme && theme[k]) root.style.setProperty(cssVar, theme[k]);
    }
  };

  // ---------- icons ----------
  const ICON_BOT = `
    <svg class="cbw-bot-svg" viewBox="0 0 32 32" fill="none">
      <rect x="6" y="9" width="20" height="16" rx="6"
            fill="currentColor" fill-opacity="0.18"
            stroke="currentColor" stroke-width="1.6"/>
      <line x1="16" y1="3" x2="16" y2="9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
      <circle cx="16" cy="3" r="1.6" fill="currentColor"/>
      <circle class="cbw-eye cbw-eye-l" cx="12" cy="17" r="1.8" fill="currentColor"/>
      <circle class="cbw-eye cbw-eye-r" cx="20" cy="17" r="1.8" fill="currentColor"/>
      <path d="M13 21 Q16 23 19 21" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none"/>
    </svg>`;
  const ICON_CLOSE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
  const ICON_SEND = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>`;
  const ICON_DOTS = `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="12" cy="19" r="1.8"/></svg>`;
  const ICON_SOUND_ON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;
  const ICON_SOUND_OFF = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;
  const ICON_PHONE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`;
  const ICON_WA = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
  const ICON_MAIL = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`;
  const ICON_LEAD = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"/><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"/></svg>`;

  // ---------- sound ----------
  const Sound = (() => {
    let ctx = null;
    const get = () => (ctx ||= new (window.AudioContext || window.webkitAudioContext)());
    let muted = localStorage.getItem(MUTE_KEY) !== "0"; // muted by default
    return {
      isMuted: () => muted,
      toggle() { muted = !muted; localStorage.setItem(MUTE_KEY, muted ? "1" : "0"); return muted; },
      play(kind) {
        if (muted) return;
        try {
          const c = get();
          const o = c.createOscillator(), g = c.createGain();
          o.connect(g); g.connect(c.destination);
          g.gain.setValueAtTime(0.07, c.currentTime);
          if (kind === "send") {
            o.frequency.setValueAtTime(620, c.currentTime);
            o.frequency.linearRampToValueAtTime(820, c.currentTime + 0.1);
            g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.15);
            o.start(c.currentTime); o.stop(c.currentTime + 0.15);
          } else if (kind === "receive") {
            o.frequency.setValueAtTime(520, c.currentTime);
            o.frequency.linearRampToValueAtTime(720, c.currentTime + 0.1);
            o.frequency.linearRampToValueAtTime(880, c.currentTime + 0.2);
            g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.24);
            o.start(c.currentTime); o.stop(c.currentTime + 0.24);
          } else if (kind === "click") {
            o.frequency.setValueAtTime(1000, c.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.06);
            o.start(c.currentTime); o.stop(c.currentTime + 0.06);
          }
        } catch (_) {}
      },
    };
  })();

  // ---------- storage ----------
  const Store = {
    save(state) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {} },
    load() {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null; } catch (_) { return null; }
    },
    clear() { try { localStorage.removeItem(STORAGE_KEY); } catch (_) {} },
  };

  // ---------- API ----------
  const api = {
    base: () => apiBase.replace(/\/$/, ""),
    async config() {
      try {
        const r = await fetch(this.base() + "/api/config");
        if (!r.ok) throw 0;
        return await r.json();
      } catch (_) {
        return {
          company_name: "[Company]", bot_name: "Asistent", bot_initials: "AI",
          welcome_message: "Ahoj! Ako ti môžem pomôcť?", placeholder: "Napíš správu…",
          suggested_questions: ["Čo ponúkate?", "Ceny", "Kontakt"],
          theme: { position: "right" },
          contacts: { phone: "", whatsapp: "", email: "" },
          lead_form: {
            title: "Zanechajte nám kontakt", subtitle: "Ozveme sa vám čo najskôr.",
            button: "Odoslať", button_open: "Zanechať kontakt",
            success: "Ďakujeme, ozveme sa vám.",
            name_placeholder: "Vaše meno", email_placeholder: "E-mail",
            phone_placeholder: "Telefón (nepovinné)", message_placeholder: "Správa (nepovinné)",
          },
        };
      }
    },
  };

  // ---------- build & wire ----------
  function build(cfg) {
    const root = h("div", {
      class: "cbw-root",
      "data-position": (cfg.theme && cfg.theme.position) || "right",
      "data-open": "false", "data-unread": "false", "data-keyboard": "false",
    });

    const launcher = h("button", {
      class: "cbw-launcher", "aria-label": "Otvoriť chat", type: "button",
      html:
        ICON_BOT +
        '<span class="cbw-sparkles"><span class="cbw-sparkle"></span><span class="cbw-sparkle"></span><span class="cbw-sparkle"></span></span>' +
        '<span class="cbw-badge"></span>',
    });

    const avatar = h("div", { class: "cbw-avatar", html: ICON_BOT });
    const titleWrap = h("div", { class: "cbw-title-wrap" }, [
      h("span", { class: "cbw-title" }, cfg.bot_name || "Asistent"),
      h("span", { class: "cbw-subtitle" }, "online"),
    ]);

    const soundBtn = h("button", {
      class: "cbw-icon-btn", type: "button",
      "aria-label": Sound.isMuted() ? "Zapnúť zvuk" : "Stíšiť",
      html: Sound.isMuted() ? ICON_SOUND_OFF : ICON_SOUND_ON,
    });

    const contacts = cfg.contacts || {};
    const menu = h("div", { class: "cbw-menu", "data-open": "false" });
    if (contacts.phone) {
      menu.appendChild(h("a", {
        class: "cbw-menu-item", "data-kind": "phone",
        href: "tel:" + contacts.phone.replace(/\s+/g, ""),
        html: ICON_PHONE + "<span>Zavolať</span>",
      }));
    }
    if (contacts.whatsapp) {
      const wa = String(contacts.whatsapp).replace(/[^\d]/g, "");
      menu.appendChild(h("a", {
        class: "cbw-menu-item", "data-kind": "whatsapp",
        href: "https://wa.me/" + wa, target: "_blank", rel: "noopener",
        html: ICON_WA + "<span>WhatsApp</span>",
      }));
    }
    if (contacts.email) {
      menu.appendChild(h("a", {
        class: "cbw-menu-item", "data-kind": "email",
        href: "mailto:" + contacts.email,
        html: ICON_MAIL + "<span>" + contacts.email + "</span>",
      }));
    }
    const dotsBtn = h("button", {
      class: "cbw-icon-btn", type: "button", "aria-label": "Kontakty", html: ICON_DOTS,
    });
    if (!menu.children.length) dotsBtn.style.display = "none";

    const closeBtn = h("button", {
      class: "cbw-icon-btn", type: "button", "aria-label": "Zavrieť", html: ICON_CLOSE,
    });
    const actions = h("div", { class: "cbw-actions" }, [soundBtn, dotsBtn, menu, closeBtn]);
    const header = h("div", { class: "cbw-header" }, [avatar, titleWrap, actions]);

    const messages = h("div", { class: "cbw-messages", role: "log", "aria-live": "polite" });

    const suggestions = h("div", { class: "cbw-suggestions" });
    const lf = cfg.lead_form || {};
    const leadChip = h("button", {
      class: "cbw-chip cbw-chip-lead", type: "button",
      html: ICON_LEAD + "<span>" + (lf.button_open || "Zanechať kontakt") + "</span>",
    });
    suggestions.appendChild(leadChip);
    (cfg.suggested_questions || []).forEach((q) => {
      suggestions.appendChild(h("button", {
        class: "cbw-chip", type: "button",
        onclick: () => sendMessage(q),
      }, q));
    });

    const leadName = h("input", { class: "cbw-field", type: "text", placeholder: lf.name_placeholder || "Vaše meno", "aria-label": "Meno" });
    const leadEmail = h("input", { class: "cbw-field", type: "email", placeholder: lf.email_placeholder || "E-mail", "aria-label": "E-mail" });
    const leadPhone = h("input", { class: "cbw-field", type: "tel", placeholder: lf.phone_placeholder || "Telefón (nepovinné)", "aria-label": "Telefón" });
    const leadMsg = h("textarea", { class: "cbw-field", rows: "2", placeholder: lf.message_placeholder || "Správa (nepovinné)", "aria-label": "Správa" });
    const leadSubmit = h("button", { class: "cbw-lead-submit", type: "submit" }, lf.button || "Odoslať");
    const leadClose = h("button", { class: "cbw-lead-close", type: "button", "aria-label": "Zavrieť formulár" }, "×");
    const leadHead = h("div", { class: "cbw-lead-head" }, [
      h("div", {}, [
        h("h4", { class: "cbw-lead-title" }, lf.title || "Zanechajte nám kontakt"),
        h("p", { class: "cbw-lead-subtitle" }, lf.subtitle || "Ozveme sa vám čo najskôr."),
      ]),
      leadClose,
    ]);
    const leadForm = h("form", { class: "cbw-lead", "data-open": "false" }, [
      leadHead, leadName, leadEmail, leadPhone, leadMsg, leadSubmit,
    ]);

    const input = h("textarea", {
      class: "cbw-input", rows: "1",
      placeholder: cfg.placeholder || "Napíš správu…", "aria-label": "Správa",
    });
    const sendBtn = h("button", {
      class: "cbw-send", type: "button", "aria-label": "Odoslať",
      disabled: "true", html: ICON_SEND,
    });
    const composer = h("div", { class: "cbw-composer" }, [input, sendBtn]);

    const footer = h("div", { class: "cbw-footer" }, [
      "Powered by ",
      h("a", {
        href: "#", target: "_blank", rel: "noopener",
        style: "color:inherit;text-decoration:none;border-bottom:1px dotted currentColor;",
      }, cfg.company_name || "AI"),
    ]);

    const panel = h("div", { class: "cbw-panel", role: "dialog", "aria-label": "Chat" }, [
      header, messages, suggestions, leadForm, composer, footer,
    ]);

    root.appendChild(panel);
    root.appendChild(launcher);
    document.body.appendChild(root);
    applyTheme(root, cfg.theme || {});

    // ---------- state ----------
    const saved = Store.load();
    const history = (saved && saved.history) || [];
    let sessionId = saved && saved.sessionId || null;
    let leadDone = !!(saved && saved.leadDone);
    let busy = false;
    let firstOpen = history.length === 0;
    let currentAnim = null;

    if (history.length) {
      history.forEach((m) => appendBubble(m.role === "assistant" ? "bot" : "user", m.content, false));
    }

    // ---------- DOM helpers ----------
    function appendBubble(role, text, save = true) {
      const bubble = h("div", { class: "cbw-msg cbw-" + role });
      bubble.appendChild(document.createTextNode(stripTokens(text)));
      bubble.appendChild(h("span", { class: "cbw-msg-time" }, fmtTime()));
      messages.appendChild(bubble);
      messages.scrollTop = messages.scrollHeight;
      if (save) {
        history.push({ role: role === "bot" ? "assistant" : "user", content: text });
        persist();
      }
      return bubble;
    }
    function stripTokens(t) { return String(t || "").replace(/\[SHOW_LEAD_FORM(?::[^\]]*)?\]/g, "").trim(); }
    function showTyping() {
      const dots = h("div", { class: "cbw-typing", "aria-label": "Píše",
        html: "<span></span><span></span><span></span>" });
      messages.appendChild(dots);
      messages.scrollTop = messages.scrollHeight;
      return dots;
    }
    function autoResize() {
      input.style.height = "auto";
      input.style.height = Math.min(input.scrollHeight, 120) + "px";
    }
    function persist() { Store.save({ history, sessionId, leadDone }); }
    function setSendState() { sendBtn.disabled = busy || input.value.trim().length === 0; }

    // ---------- genie animation ----------
    function togglePanel(open) {
      const next = open == null ? root.dataset.open !== "true" : !!open;
      if (next === (root.dataset.open === "true")) return;

      if (currentAnim) { currentAnim.cancel(); currentAnim = null; }
      root.dataset.open = next ? "true" : "false";

      if (next) {
        root.dataset.unread = "false";
        currentAnim = panel.animate([
          { transform: "scale(0)",    opacity: 0 },
          { transform: "scale(0.18)", opacity: 0.45, offset: 0.18 },
          { transform: "scale(0.55)", opacity: 0.8,  offset: 0.5 },
          { transform: "scale(0.88)", opacity: 0.96, offset: 0.8 },
          { transform: "scale(1)",    opacity: 1 },
        ], { duration: 520, easing: "cubic-bezier(0.22,0.61,0.36,1)", fill: "forwards" });
        currentAnim.onfinish = () => {
          currentAnim = null;
          if (firstOpen) { firstOpen = false; appendBubble("bot", cfg.welcome_message || "Ahoj!"); }
          if (!matchMedia("(max-width:480px)").matches) input.focus();
        };
      } else {
        currentAnim = panel.animate([
          { transform: "scale(1)",    opacity: 1 },
          { transform: "scale(0.6)",  opacity: 0.5, offset: 0.4 },
          { transform: "scale(0)",    opacity: 0 },
        ], { duration: 320, easing: "cubic-bezier(0.55,0.06,0.68,0.19)", fill: "forwards" });
        currentAnim.onfinish = () => { currentAnim = null; closeMenu(); closeLead(); };
      }
    }

    // ---------- menu ----------
    function toggleMenu(open) {
      const next = open == null ? menu.dataset.open !== "true" : !!open;
      menu.dataset.open = next ? "true" : "false";
      dotsBtn.dataset.active = next ? "true" : "false";
    }
    function closeMenu() { toggleMenu(false); }

    // ---------- lead form ----------
    function openLead() {
      leadForm.dataset.open = "true";
      messages.scrollTop = messages.scrollHeight;
      setTimeout(() => leadName.focus(), 200);
    }
    function closeLead() { leadForm.dataset.open = "false"; }

    // ---------- chat ----------
    async function sendMessage(text) {
      const trimmed = (text || "").trim();
      if (!trimmed || busy) return;
      input.value = ""; autoResize(); busy = true; setSendState();

      appendBubble("user", trimmed);
      Sound.play("send");

      const typing = showTyping();
      try {
        const res = await fetch(api.base() + "/api/chat", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId, messages: history }),
        });
        const data = await res.json();
        sessionId = data.session_id || sessionId;
        typing.remove();
        appendBubble("bot", data.reply || "(prázdna odpoveď)");
        Sound.play("receive");
        if (root.dataset.open !== "true") root.dataset.unread = "true";
      } catch (err) {
        typing.remove();
        appendBubble("bot", "Prepáč, niečo sa pokazilo. Skús to prosím znova.");
      } finally {
        busy = false; setSendState(); input.focus();
      }
    }

    async function submitLead(e) {
      e.preventDefault();
      const name = leadName.value.trim();
      const email = leadEmail.value.trim();
      const phone = leadPhone.value.trim();
      const msg = leadMsg.value.trim();

      let bad = false;
      [leadName, leadEmail].forEach((el) => el.classList.remove("cbw-invalid"));
      if (name.length < 2) { leadName.classList.add("cbw-invalid"); bad = true; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { leadEmail.classList.add("cbw-invalid"); bad = true; }
      if (bad) return;

      leadSubmit.disabled = true;
      const original = leadSubmit.textContent;
      leadSubmit.textContent = "Odosielam…";

      try {
        const r = await fetch(api.base() + "/api/lead", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name, email,
            phone: phone || null,
            message: msg || null,
            conversation: history.slice(-8),
          }),
        });
        if (!r.ok) throw new Error("fail");
        const data = await r.json();
        leadDone = true; persist();
        closeLead();
        appendBubble("bot", data.message || (cfg.lead_form && cfg.lead_form.success) || "Ďakujeme.");
        Sound.play("receive");
        leadName.value = leadEmail.value = leadPhone.value = leadMsg.value = "";
        leadChip.style.display = "none";
      } catch (_) {
        appendBubble("bot", "Odoslanie zlyhalo. Skús to prosím znova alebo nás kontaktuj priamo.");
      } finally {
        leadSubmit.disabled = false;
        leadSubmit.textContent = original;
      }
    }

    if (leadDone) leadChip.style.display = "none";

    // ---------- events ----------
    launcher.addEventListener("click", () => { Sound.play("click"); togglePanel(true); });
    closeBtn.addEventListener("click", () => { Sound.play("click"); togglePanel(false); });
    dotsBtn.addEventListener("click", (e) => { e.stopPropagation(); toggleMenu(); });
    document.addEventListener("click", (e) => {
      if (!actions.contains(e.target)) closeMenu();
    });
    soundBtn.addEventListener("click", () => {
      const muted = Sound.toggle();
      soundBtn.innerHTML = muted ? ICON_SOUND_OFF : ICON_SOUND_ON;
      soundBtn.setAttribute("aria-label", muted ? "Zapnúť zvuk" : "Stíšiť");
    });
    leadChip.addEventListener("click", () => { Sound.play("click"); openLead(); });
    leadClose.addEventListener("click", closeLead);
    leadForm.addEventListener("submit", submitLead);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && root.dataset.open === "true") togglePanel(false);
    });

    input.addEventListener("input", () => { autoResize(); setSendState(); });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (!sendBtn.disabled) sendMessage(input.value);
      }
    });
    sendBtn.addEventListener("click", () => {
      if (!sendBtn.disabled) sendMessage(input.value);
    });

    // ---------- mobile keyboard ----------
    (function () {
      const vv = window.visualViewport;
      const isMobile = () => matchMedia("(max-width:480px)").matches;
      function pin() {
        if (!isMobile() || root.dataset.open !== "true") return;
        const top = vv ? vv.offsetTop : 0;
        const hh  = vv ? vv.height    : window.innerHeight;
        panel.style.setProperty("top",        top + "px", "important");
        panel.style.setProperty("height",     hh  + "px", "important");
        panel.style.setProperty("max-height", hh  + "px", "important");
        requestAnimationFrame(() => { messages.scrollTop = messages.scrollHeight; });
      }
      if (vv) {
        vv.addEventListener("resize", pin);
        vv.addEventListener("scroll", pin);
      }
      const onFocus = () => {
        if (!isMobile()) return;
        root.dataset.keyboard = "true";
        setTimeout(pin, 120); setTimeout(pin, 360);
      };
      const onBlur = () => {
        if (!isMobile()) return;
        root.dataset.keyboard = "false";
        setTimeout(pin, 150);
      };
      [input, leadName, leadEmail, leadPhone, leadMsg].forEach((el) => {
        el.addEventListener("focus", onFocus);
        el.addEventListener("blur", onBlur);
      });
    })();

    // ---------- public API ----------
    window.Chatbot = {
      open: () => togglePanel(true),
      close: () => togglePanel(false),
      toggle: () => togglePanel(),
      send: (text) => { togglePanel(true); sendMessage(text); },
      reset: () => { Store.clear(); location.reload(); },
    };
  }

  function init() {
    loadCss();
    api.config().then(build);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
