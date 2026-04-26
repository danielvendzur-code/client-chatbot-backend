from __future__ import annotations

from typing import Literal
from pydantic import BaseModel, Field


Role = Literal["user", "assistant", "system"]


class Message(BaseModel):
    role: Role
    content: str = Field(..., min_length=1, max_length=4000)


class ChatRequest(BaseModel):
    session_id: str | None = None
    messages: list[Message] = Field(..., min_length=1, max_length=40)


class ChatResponse(BaseModel):
    session_id: str
    reply: str


class WidgetConfig(BaseModel):
    company_name: str
    bot_name: str
    bot_initials: str
    welcome_message: str
    placeholder: str
    suggested_questions: list[str]
    theme: dict[str, str]
