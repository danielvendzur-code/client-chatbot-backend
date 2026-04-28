from __future__ import annotations

from typing import Literal
from pydantic import BaseModel, EmailStr, Field


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


class Contacts(BaseModel):
    phone: str = ""
    whatsapp: str = ""
    email: str = ""


class LeadFormCopy(BaseModel):
    title: str
    subtitle: str
    button: str
    button_open: str
    success: str
    name_placeholder: str
    email_placeholder: str
    phone_placeholder: str
    message_placeholder: str


class WidgetConfig(BaseModel):
    company_name: str
    bot_name: str
    bot_initials: str
    welcome_message: str
    placeholder: str
    suggested_questions: list[str]
    theme: dict[str, str]
    contacts: Contacts
    lead_form: LeadFormCopy


class LeadRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=40)
    message: str | None = Field(default=None, max_length=2000)
    conversation: list[Message] = Field(default_factory=list, max_length=20)


class LeadResponse(BaseModel):
    ok: bool
    message: str
