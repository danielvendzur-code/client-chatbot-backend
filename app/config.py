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
    contact_whatsapp: str = _env("COMPANY_WHATSAPP", "")
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
    """Visual theme. Defaults to the Tailwind emerald palette."""

    primary: str = _env("THEME_PRIMARY", "#10b981")          # emerald-500
    primary_hover: str = _env("THEME_PRIMARY_HOVER", "#059669")  # emerald-600
    accent: str = _env("THEME_ACCENT", "#34d399")            # emerald-400
    bg: str = _env("THEME_BG", "#ffffff")
    surface: str = _env("THEME_SURFACE", "#f0fdf4")          # emerald-50
    text: str = _env("THEME_TEXT", "#0f172a")
    text_muted: str = _env("THEME_TEXT_MUTED", "#64748b")
    border: str = _env("THEME_BORDER", "#d1fae5")            # emerald-100
    user_bubble: str = _env("THEME_USER_BUBBLE", "#10b981")
    bot_bubble: str = _env("THEME_BOT_BUBBLE", "#ecfdf5")    # emerald-50/100
    radius: str = _env("THEME_RADIUS", "16px")
    position: str = _env("THEME_POSITION", "right")


@dataclass
class LeadCopy:
    """Strings shown by the lead-capture form in the widget."""

    title: str = _env("LEAD_TITLE", "Zanechajte nám kontakt")
    subtitle: str = _env("LEAD_SUBTITLE", "Ozveme sa vám čo najskôr.")
    button: str = _env("LEAD_BUTTON", "Odoslať")
    button_open: str = _env("LEAD_BUTTON_OPEN", "Zanechať kontakt")
    success: str = _env("LEAD_SUCCESS", "Ďakujeme, ozveme sa vám.")
    name_placeholder: str = _env("LEAD_NAME_PLACEHOLDER", "Vaše meno")
    email_placeholder: str = _env("LEAD_EMAIL_PLACEHOLDER", "E-mail")
    phone_placeholder: str = _env("LEAD_PHONE_PLACEHOLDER", "Telefón (nepovinné)")
    message_placeholder: str = _env(
        "LEAD_MESSAGE_PLACEHOLDER", "Správa (nepovinné)"
    )


@dataclass
class ResendConfig:
    """Email delivery for incoming leads (resend.com)."""

    api_key: str = _env("RESEND_API_KEY", "")
    lead_to: str = _env("LEAD_TO", "")
    lead_from: str = _env("LEAD_FROM", "onboarding@resend.dev")
    lead_bcc: str = _env("LEAD_BCC", "")


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
    lead: LeadCopy = field(default_factory=LeadCopy)
    resend: ResendConfig = field(default_factory=ResendConfig)
    llm: LLMConfig = field(default_factory=LLMConfig)
    cors_origins: tuple[str, ...] = field(
        default_factory=lambda: tuple(
            o.strip()
            for o in _env("CORS_ORIGINS", "*").split(",")
            if o.strip()
        )
    )


settings = Settings()
