/* ============================================================
 * Embeddable chat widget.
 *
 * Usage:
 *   <script src="https://your-host/widget/widget.js"
 *           data-api="https://your-host"
 *           defer></script>
 *
 * The widget pulls config from `${api}/api/config` and posts
 * messages to `${api}/api/chat`.
 * ============================================================ */

(function () {
  "use strict";

  if (window.__cbwLoaded) return;
  window.__cbwLoaded = true;

  const script = document.currentScript ||
    document.querySelector('script[src*="widget.js"]');
  const apiBase = (script && script.dataset.api) || window.location.origin;
  const cssHref =
    (script && script.dataset.css) ||
    apiBase.replace(/\/$/, "") + "/widget/widget.css";

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
      primary: "--cbw-primary",
      primaryHover: "--cbw-primary-hover",
      accent: "--cbw-accent",
      bg: "--cbw-bg",
      surface: "--cbw-surface",
      text: "--cbw-text",
      textMuted: "--cbw-text-muted",
      border: "--cbw-border",
      userBubble: "--cbw-user-bubble",
      botBubble: "--cbw-bot-bubble",
      radius: "--cbw-radius",
    };
    for (const [k, cssVar] of Object.entries(map)) {
      if (theme && theme[k]) root.style.setProperty(cssVar, theme[k]);
    }
  };

  // ---------- icons ----------

  const ICON_CHAT = `
    <svg class="cbw-icon-chat" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/>
    </svg>`;

  const ICON_CLOSE = `
    <svg class="cbw-icon-close" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 6l12 12M18 6L6 18"/>
    </svg>`;

  const ICON_SEND = `
    <svg viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 2L11 13"/>
      <path d="M22 2l-7 20-4-9-9-4 20-7Z"/>
    </svg>`;

  // ---------- widget ----------

  async function fetchConfig() {
    try {
      const res = await fetch(apiBase.replace(/\/$/, "") + "/api/config");
      if (!res.ok) throw new Error("config fetch failed");
      return await res.json();
    } catch (_) {
      return {
        company_name: "[Company]",
        bot_name: "Asistent",
        bot_initials: "AI",
        welcome_message: "Ahoj! Ako ti môžem pomôcť?",
        placeholder: "Napíš správu…",
        suggested_questions: ["Čo ponúkate?", "Kontakt", "Ceny"],
        theme: { position: "right" },
      };
    }
  }

  function build(cfg) {
    const root = h("div", {
      class: "cbw-root",
      "data-position": (cfg.theme && cfg.theme.position) || "right",
      "data-open": "false",
      "data-unread": "false",
    });

    // Launcher
    const launcher = h("button", {
      class: "cbw-launcher",
      "aria-label": "Otvoriť chat",
      type: "button",
      html: ICON_CHAT + ICON_CLOSE + '<span class="cbw-badge"></span>',
    });

    // Header
    const avatar = h("div", { class: "cbw-avatar" }, cfg.bot_initials || "AI");
    const titleWrap = h("div", { class: "cbw-title-wrap" }, [
      h("span", { class: "cbw-title" }, cfg.bot_name || "Asistent"),
      h("span", { class: "cbw-subtitle" }, "online"),
    ]);
    const closeBtn = h("button", {
      class: "cbw-close",
      "aria-label": "Zavrieť",
      type: "button",
      html: ICON_CLOSE.replace(' class="cbw-icon-close"', ""),
    });
    const header = h("div", { class: "cbw-header" }, [avatar, titleWrap, closeBtn]);

    // Messages area
    const messages = h("div", { class: "cbw-messages", role: "log", "aria-live": "polite" });

    // Suggestions
    const suggestions = h("div", { class: "cbw-suggestions" });
    (cfg.suggested_questions || []).forEach((q) => {
      suggestions.appendChild(
        h("button", {
          class: "cbw-chip",
          type: "button",
          onclick: () => sendMessage(q),
        }, q)
      );
    });

    // Composer
    const input = h("textarea", {
      class: "cbw-input",
      rows: "1",
      placeholder: cfg.placeholder || "Napíš správu…",
      "aria-label": "Správa",
    });
    const sendBtn = h("button", {
      class: "cbw-send",
      type: "button",
      "aria-label": "Odoslať",
      disabled: "true",
      html: ICON_SEND,
    });
    const composer = h("div", { class: "cbw-composer" }, [input, sendBtn]);

    const footer = h("div", { class: "cbw-footer" }, [
      "Powered by ",
      h("a", { href: "#", target: "_blank", rel: "noopener" }, cfg.company_name || "AI"),
    ]);

    const panel = h("div", {
      class: "cbw-panel",
      role: "dialog",
      "aria-label": "Chat",
    }, [header, messages, suggestions, composer, footer]);

    root.appendChild(panel);
    root.appendChild(launcher);
    document.body.appendChild(root);
    applyTheme(root, cfg.theme || {});

    // ---------- state ----------

    const history = []; // [{role, content}]
    let sessionId = null;
    let busy = false;
    let firstOpen = true;

    // ---------- behaviour ----------

    const togglePanel = (open) => {
      const next = open == null ? root.dataset.open !== "true" : !!open;
      root.dataset.open = next ? "true" : "false";
      if (next) {
        root.dataset.unread = "false";
        if (firstOpen) {
          firstOpen = false;
          appendBot(cfg.welcome_message || "Ahoj!");
        }
        setTimeout(() => input.focus(), 220);
      }
    };

    launcher.addEventListener("click", () => togglePanel());
    closeBtn.addEventListener("click", () => togglePanel(false));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && root.dataset.open === "true") togglePanel(false);
    });

    const appendBubble = (role, text) => {
      const bubble = h("div", { class: "cbw-msg cbw-" + role });
      bubble.appendChild(document.createTextNode(text));
      bubble.appendChild(h("span", { class: "cbw-msg-time" }, fmtTime()));
      messages.appendChild(bubble);
      messages.scrollTop = messages.scrollHeight;
      return bubble;
    };

    const appendBot = (text) => {
      appendBubble("bot", text);
      history.push({ role: "assistant", content: text });
    };

    const showTyping = () => {
      const dots = h("div", {
        class: "cbw-typing",
        "aria-label": "Píše",
        html: "<span></span><span></span><span></span>",
      });
      messages.appendChild(dots);
      messages.scrollTop = messages.scrollHeight;
      return dots;
    };

    const autoResize = () => {
      input.style.height = "auto";
      input.style.height = Math.min(input.scrollHeight, 120) + "px";
    };

    const updateSendDisabled = () => {
      sendBtn.disabled = busy || input.value.trim().length === 0;
    };

    input.addEventListener("input", () => {
      autoResize();
      updateSendDisabled();
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (!sendBtn.disabled) sendMessage(input.value);
      }
    });

    sendBtn.addEventListener("click", () => {
      if (!sendBtn.disabled) sendMessage(input.value);
    });

    async function sendMessage(text) {
      const trimmed = (text || "").trim();
      if (!trimmed || busy) return;

      input.value = "";
      autoResize();
      busy = true;
      updateSendDisabled();
      suggestions.style.display = "none";

      appendBubble("user", trimmed);
      history.push({ role: "user", content: trimmed });

      const typing = showTyping();
      try {
        const res = await fetch(apiBase.replace(/\/$/, "") + "/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId, messages: history }),
        });
        const data = await res.json();
        sessionId = data.session_id || sessionId;
        typing.remove();
        appendBot(data.reply || "(prázdna odpoveď)");
        if (root.dataset.open !== "true") root.dataset.unread = "true";
      } catch (err) {
        typing.remove();
        appendBot("Prepáč, niečo sa pokazilo. Skús to prosím znova.");
      } finally {
        busy = false;
        updateSendDisabled();
        input.focus();
      }
    }

    // Public API
    window.Chatbot = {
      open: () => togglePanel(true),
      close: () => togglePanel(false),
      toggle: () => togglePanel(),
      send: (text) => {
        togglePanel(true);
        sendMessage(text);
      },
    };
  }

  function init() {
    loadCss();
    fetchConfig().then(build);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
