from __future__ import annotations

import logging
import uuid
from html import escape
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles

from .chat import generate_reply
from .config import settings
from .models import (
    ChatRequest,
    ChatResponse,
    Contacts,
    LeadFormCopy,
    LeadRequest,
    LeadResponse,
    WidgetConfig,
)


ROOT = Path(__file__).resolve().parent.parent
WIDGET_DIR = ROOT / "widget"

logger = logging.getLogger("chatbot")

app = FastAPI(title="Client Chatbot Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=list(settings.cors_origins) or ["*"],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

app.mount("/widget", StaticFiles(directory=WIDGET_DIR), name="widget")


@app.get("/", include_in_schema=False)
async def root() -> RedirectResponse:
    return RedirectResponse(url="/demo")


@app.get("/demo", include_in_schema=False)
async def demo() -> FileResponse:
    return FileResponse(WIDGET_DIR / "demo.html")


@app.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/config", response_model=WidgetConfig)
async def get_widget_config() -> WidgetConfig:
    t = settings.theme
    c = settings.company
    l = settings.lead
    return WidgetConfig(
        company_name=c.name,
        bot_name=settings.bot.display_name,
        bot_initials=settings.bot.avatar_initials,
        welcome_message=settings.bot.welcome_message,
        placeholder=settings.bot.placeholder,
        suggested_questions=list(settings.bot.suggested_questions),
        theme={
            "primary": t.primary,
            "primaryHover": t.primary_hover,
            "accent": t.accent,
            "bg": t.bg,
            "surface": t.surface,
            "text": t.text,
            "textMuted": t.text_muted,
            "border": t.border,
            "userBubble": t.user_bubble,
            "botBubble": t.bot_bubble,
            "radius": t.radius,
            "position": t.position,
        },
        contacts=Contacts(
            phone=c.contact_phone,
            whatsapp=c.contact_whatsapp or c.contact_phone,
            email=c.contact_email,
        ),
        lead_form=LeadFormCopy(
            title=l.title,
            subtitle=l.subtitle,
            button=l.button,
            button_open=l.button_open,
            success=l.success,
            name_placeholder=l.name_placeholder,
            email_placeholder=l.email_placeholder,
            phone_placeholder=l.phone_placeholder,
            message_placeholder=l.message_placeholder,
        ),
    )


@app.post("/api/chat", response_model=ChatResponse)
async def chat(req: ChatRequest) -> ChatResponse:
    if not req.messages:
        raise HTTPException(status_code=400, detail="messages cannot be empty")
    session_id = req.session_id or uuid.uuid4().hex
    reply = await generate_reply(req.messages)
    return ChatResponse(session_id=session_id, reply=reply)


def _render_lead_email(req: LeadRequest) -> tuple[str, str]:
    """Returns (subject, html_body) for the lead notification email."""
    subject = f"Nový lead: {req.name}"
    rows = [
        ("Meno", req.name),
        ("E-mail", req.email),
        ("Telefón", req.phone or "—"),
        ("Správa", req.message or "—"),
    ]
    rows_html = "".join(
        f"<tr><td style='padding:6px 12px;color:#64748b;font-weight:600;"
        f"vertical-align:top;'>{escape(label)}</td>"
        f"<td style='padding:6px 12px;'>{escape(value)}</td></tr>"
        for label, value in rows
    )
    convo_html = ""
    if req.conversation:
        items = "".join(
            f"<li style='margin:4px 0;'><strong>"
            f"{'Návštevník' if m.role == 'user' else 'Bot'}:</strong> "
            f"{escape(m.content)}</li>"
            for m in req.conversation
        )
        convo_html = (
            "<h3 style='margin:18px 0 6px;font:600 14px sans-serif;color:#0f172a;'>"
            "Posledný kontext konverzácie</h3>"
            f"<ul style='font:14px sans-serif;color:#0f172a;padding-left:18px;'>"
            f"{items}</ul>"
        )
    body = (
        "<div style='font:14px -apple-system,Segoe UI,sans-serif;color:#0f172a;'>"
        f"<h2 style='margin:0 0 12px;color:#059669;'>Nový kontakt z chatbota</h2>"
        "<table style='border-collapse:collapse;'>"
        f"{rows_html}</table>"
        f"{convo_html}"
        "</div>"
    )
    return subject, body


async def _send_lead_email(req: LeadRequest) -> None:
    cfg = settings.resend
    if not cfg.api_key or not cfg.lead_to:
        raise RuntimeError("resend not configured")
    try:
        import resend  # type: ignore[import-not-found]
    except ImportError as exc:
        raise RuntimeError("resend package not installed") from exc

    resend.api_key = cfg.api_key
    subject, html = _render_lead_email(req)
    payload: dict[str, object] = {
        "from": cfg.lead_from,
        "to": [cfg.lead_to],
        "subject": subject,
        "html": html,
        "reply_to": req.email,
    }
    if cfg.lead_bcc:
        payload["bcc"] = [cfg.lead_bcc]
    resend.Emails.send(payload)


@app.post("/api/lead", response_model=LeadResponse)
async def submit_lead(req: LeadRequest) -> LeadResponse:
    logger.info("lead received: name=%s email=%s phone=%s", req.name, req.email, req.phone)
    try:
        await _send_lead_email(req)
    except Exception as exc:  # noqa: BLE001
        logger.warning("lead email failed: %s", exc)
        # Still return ok=true — lead was logged; surface a softer message
        # so the widget UX stays positive even when delivery is misconfigured.
        return LeadResponse(ok=True, message=settings.lead.success)
    return LeadResponse(ok=True, message=settings.lead.success)
