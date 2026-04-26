from __future__ import annotations

import uuid
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles

from .chat import generate_reply
from .config import settings
from .models import ChatRequest, ChatResponse, WidgetConfig


ROOT = Path(__file__).resolve().parent.parent
WIDGET_DIR = ROOT / "widget"

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
    return WidgetConfig(
        company_name=settings.company.name,
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
    )


@app.post("/api/chat", response_model=ChatResponse)
async def chat(req: ChatRequest) -> ChatResponse:
    if not req.messages:
        raise HTTPException(status_code=400, detail="messages cannot be empty")
    session_id = req.session_id or uuid.uuid4().hex
    reply = await generate_reply(req.messages)
    return ChatResponse(session_id=session_id, reply=reply)
