"""
Configuration for the chatbot.

Company-specific details are intentionally left as placeholders here.
When assigning this bot to a real client, fill in the values below
(or override them via environment variables / a .env file).
"""

from __future__ import annotations

import os
from dataclasses import dataclass, field


def _env(key: str, default: str) -> str:
    value = os.getenv(key)
    return value if value is not None and value != "" else default


@dataclass
class CompanyProfile:
    """Identity and tone of the bot. Replace before going live."""

    name: str = _env("COMPANY_NAME", "[Company Name]")
    tagline: str = _env("COMPANY_TAGLINE", "[Short tagline / one-liner]")
    website: str = _env("COMPANY_WEBSITE", "https://example.com")
    contact_email: str = _env("COMPANY_EMAIL", "hello@example.com")
    contact_phone: str = _env("COMPANY_PHONE", "")
    industry: str = _env("COMPANY_INDUSTRY", "")
    languages: tuple[str, ...] = ("sk", "en")


@dataclass
class BotPersona:
    """How the assistant should introduce itself and behave."""

    display_name: str = _env("BOT_NAME", "Asistent")
    avatar_initials: str = _env("BOT_INITIALS", "AI")
    welcome_message: str = _env(
        "BOT_WELCOME",
        "Ahoj! Som virtuálny asistent. Ako ti môžem pomôcť?",
    )
    placeholder: str = _env("BOT_PLACEHOLDER", "Napíš správu…")
    suggested_questions: tuple[str, ...] = (
        "Čo ponúkate?",
        "Aké sú ceny?",
        "Ako vás môžem kontaktovať?",
        "Otváracie hodiny",
    )
    system_prompt: str = (
        "Si zdvorilý a stručný virtuálny asistent. "
        "Odpovedaj v jazyku, v ktorom sa používateľ pýta. "
        "Ak nepoznáš odpoveď, ponúkni kontakt na firmu."
    )


@dataclass
class Theme:
    """Visual theme. Defaults are neutral and brand-agnostic."""

    primary: str = _env("THEME_PRIMARY", "#4f46e5")          # indigo-600
    primary_hover: str = _env("THEME_PRIMARY_HOVER", "#4338ca")
    accent: str = _env("THEME_ACCENT", "#22d3ee")            # cyan-400
    bg: str = _env("THEME_BG", "#ffffff")
    surface: str = _env("THEME_SURFACE", "#f8fafc")          # slate-50
    text: str = _env("THEME_TEXT", "#0f172a")                # slate-900
    text_muted: str = _env("THEME_TEXT_MUTED", "#64748b")    # slate-500
    border: str = _env("THEME_BORDER", "#e2e8f0")            # slate-200
    user_bubble: str = _env("THEME_USER_BUBBLE", "#4f46e5")
    bot_bubble: str = _env("THEME_BOT_BUBBLE", "#f1f5f9")    # slate-100
    radius: str = _env("THEME_RADIUS", "16px")
    position: str = _env("THEME_POSITION", "right")           # left | right


@dataclass
class LLMConfig:
    """Provider settings. Defaults to Anthropic Claude."""

    provider: str = _env("LLM_PROVIDER", "anthropic")
    model: str = _env("LLM_MODEL", "claude-sonnet-4-6")
    api_key: str = _env("ANTHROPIC_API_KEY", "")
    temperature: float = float(_env("LLM_TEMPERATURE", "0.4"))
    max_tokens: int = int(_env("LLM_MAX_TOKENS", "600"))


@dataclass
class Settings:
    company: CompanyProfile = field(default_factory=CompanyProfile)
    bot: BotPersona = field(default_factory=BotPersona)
    theme: Theme = field(default_factory=Theme)
    llm: LLMConfig = field(default_factory=LLMConfig)
    cors_origins: tuple[str, ...] = field(
        default_factory=lambda: tuple(
            o.strip()
            for o in _env("CORS_ORIGINS", "*").split(",")
            if o.strip()
        )
    )


settings = Settings()
