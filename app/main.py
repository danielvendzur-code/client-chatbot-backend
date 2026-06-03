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


@app.get("/test", include_in_schema=False)
async def test() -> FileResponse:
    """Same widget as /demo but with a ?cbw=test marker so the wizard
    can render in 'test' mode (all steps visible at once for QA)."""
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


def _service_request_html(req: LeadRequest) -> str:
    """Render the structured service request from the calculator wizard."""
    sr = req.service_request
    if not sr:
        return ""
    rows = "".join(
        f"<tr><td style='padding:6px 12px;color:#64748b;font-weight:600;"
        f"vertical-align:top;width:42%'>{escape(label)}</td>"
        f"<td style='padding:6px 12px;color:#0f172a;'>{escape(value)}</td></tr>"
        for label, value in sr.answers.items()
    )
    price_html = (
        f"<div style='margin:12px 0 0;padding:14px;border-radius:12px;"
        f"background:linear-gradient(145deg,#064e3b,#022c22);color:#fff;"
        f"text-align:center'>"
        f"<div style='font-size:12px;opacity:.85'>Odhadovaná cena</div>"
        f"<div style='font-size:26px;font-weight:800;margin-top:4px'>"
        f"{escape(sr.estimated_price or '—')}</div></div>"
        if sr.estimated_price
        else ""
    )
    return (
        "<h3 style='margin:18px 0 6px;font:700 14px sans-serif;color:#0f172a;'>"
        f"Dopyt z kalkulačky — {escape(sr.service_label)}</h3>"
        "<table style='border-collapse:collapse;width:100%;border:1px solid #e2e8f0;border-radius:8px'>"
        f"{rows}</table>"
        f"{price_html}"
    )


def _render_lead_email(req: LeadRequest) -> tuple[str, str]:
    """Returns (subject, html_body) for the lead notification email to the owner."""
    sr = req.service_request
    if sr:
        subject = f"Nový dopyt: {sr.service_label} — {req.name}"
    else:
        subject = f"Nový lead: {req.name}"
    rows = [
        ("Meno", req.name),
        ("E-mail", req.email),
        ("Telefón", req.phone or "—"),
        ("Správa", req.message or "—"),
    ]
    rows_html = "".join(
        f"<tr><td style='padding:6px 12px;color:#64748b;font-weight:600;"
        f"vertical-align:top;width:42%'>{escape(label)}</td>"
        f"<td style='padding:6px 12px;color:#0f172a;'>{escape(value)}</td></tr>"
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
        "<div style='font:14px -apple-system,Segoe UI,sans-serif;color:#0f172a;max-width:600px'>"
        f"<h2 style='margin:0 0 12px;color:#064e3b;'>Nový dopyt z chatbota</h2>"
        "<table style='border-collapse:collapse;width:100%;border:1px solid #e2e8f0;border-radius:8px'>"
        f"{rows_html}</table>"
        f"{_service_request_html(req)}"
        f"{convo_html}"
        "</div>"
    )
    return subject, body


def _render_customer_email(req: LeadRequest) -> tuple[str, str]:
    """Returns (subject, html_body) for the auto-reply confirmation to the customer."""
    company = settings.company.name
    sr_block = _service_request_html(req) if req.service_request else ""
    contact_lines = []
    if settings.company.contact_phone:
        contact_lines.append(f"Telefón: {escape(settings.company.contact_phone)}")
    if settings.company.contact_email:
        contact_lines.append(f"E-mail: {escape(settings.company.contact_email)}")
    if settings.company.website:
        contact_lines.append(f"Web: {escape(settings.company.website)}")
    contact_html = "<br>".join(contact_lines) or "&nbsp;"

    subject = f"Ďakujeme za dopyt — {company}"
    body = (
        "<div style='font:14px -apple-system,Segoe UI,sans-serif;color:#0f172a;max-width:600px;line-height:1.55'>"
        f"<h2 style='margin:0 0 8px;color:#064e3b;'>Ďakujeme za dopyt!</h2>"
        f"<p>Dobrý deň {escape(req.name)},</p>"
        "<p>vašu požiadavku sme úspešne prijali. Konateľ vás bude kontaktovať čo najskôr s presnou ponukou.</p>"
        f"{sr_block}"
        "<p style='margin-top:18px'>Ak máte ďalšie otázky, pokojne nám napíšte alebo zavolajte.</p>"
        "<div style='margin-top:18px;padding:12px;background:#f0fdfa;border:1px solid #a7f3d0;border-radius:10px'>"
        f"<strong style='color:#064e3b'>{escape(company)}</strong><br>"
        f"<span style='color:#475569;font-size:13px'>{contact_html}</span>"
        "</div>"
        "</div>"
    )
    return subject, body


def _photo_attachments(req: LeadRequest) -> list[dict[str, str]]:
    """Convert PhotoAttachment.data_url entries into Resend `attachments`."""
    if not req.service_request or not req.service_request.photos:
        return []
    out: list[dict[str, str]] = []
    for i, p in enumerate(req.service_request.photos, 1):
        # data URL example: "data:image/jpeg;base64,XXXX"
        b64 = p.data_url.split(",", 1)[-1] if "," in p.data_url else p.data_url
        ext = (p.type.split("/", 1)[-1] or "jpg")[:8]
        out.append({
            "filename": p.name or f"foto-{i}.{ext}",
            "content": b64,
            "content_type": p.type or "image/jpeg",
        })
    return out


def _send_via_resend(
    *,
    to: str,
    subject: str,
    html: str,
    reply_to: str | None = None,
    bcc: str | None = None,
    attachments: list[dict[str, str]] | None = None,
) -> None:
    """Single helper that wraps resend.Emails.send with our config."""
    cfg = settings.resend
    if not cfg.api_key:
        raise RuntimeError("resend not configured (missing api_key)")
    try:
        import resend  # type: ignore[import-not-found]
    except ImportError as exc:
        raise RuntimeError("resend package not installed") from exc

    resend.api_key = cfg.api_key
    payload: dict[str, object] = {
        "from": cfg.lead_from,
        "to": [to],
        "subject": subject,
        "html": html,
    }
    if reply_to:
        payload["reply_to"] = reply_to
    if bcc:
        payload["bcc"] = [bcc]
    if attachments:
        payload["attachments"] = attachments
    resend.Emails.send(payload)


async def _send_owner_notification(req: LeadRequest) -> None:
    cfg = settings.resend
    if not cfg.lead_to:
        raise RuntimeError("LEAD_TO not configured")
    subject, html = _render_lead_email(req)
    _send_via_resend(
        to=cfg.lead_to,
        subject=subject,
        html=html,
        reply_to=req.email,
        bcc=cfg.lead_bcc or None,
        attachments=_photo_attachments(req),
    )


async def _send_customer_confirmation(req: LeadRequest) -> None:
    subject, html = _render_customer_email(req)
    reply_to = settings.company.contact_email or None
    _send_via_resend(to=req.email, subject=subject, html=html, reply_to=reply_to)


@app.post("/api/lead", response_model=LeadResponse)
async def submit_lead(req: LeadRequest) -> LeadResponse:
    logger.info(
        "lead received: name=%s email=%s phone=%s service=%s",
        req.name,
        req.email,
        req.phone,
        req.service_request.service if req.service_request else None,
    )
    try:
        await _send_owner_notification(req)
    except Exception as exc:  # noqa: BLE001
        logger.warning("owner notification failed: %s", exc)

    try:
        await _send_customer_confirmation(req)
    except Exception as exc:  # noqa: BLE001
        logger.warning("customer confirmation failed: %s", exc)

    return LeadResponse(ok=True, message=settings.lead.success)
