"""
Chat handler. Talks to the configured LLM provider.

If no API key is configured, falls back to a deterministic
echo/canned reply so the UI can be developed and demoed offline.
"""

from __future__ import annotations

from .config import settings
from .models import Message


def _build_system_prompt() -> str:
    company = settings.company
    bot = settings.bot
    parts = [
        bot.system_prompt,
        f"Reprezentuješ firmu: {company.name}.",
    ]
    if company.tagline:
        parts.append(f"Krátky popis firmy: {company.tagline}.")
    if company.industry:
        parts.append(f"Odvetvie: {company.industry}.")
    if company.contact_email:
        parts.append(f"Kontaktný e-mail: {company.contact_email}.")
    if company.contact_phone:
        parts.append(f"Telefón: {company.contact_phone}.")
    if company.website:
        parts.append(f"Web: {company.website}.")
    return " ".join(parts)


def _fallback_reply(messages: list[Message]) -> str:
    last = messages[-1].content.strip().lower()
    if any(w in last for w in ("ahoj", "čau", "dobrý", "hello", "hi")):
        return f"Ahoj! Som {settings.bot.display_name}. Ako ti môžem pomôcť?"
    if any(w in last for w in ("cen", "koľko", "price")):
        return (
            "Ceny závisia od konkrétneho riešenia. "
            f"Napíš nám na {settings.company.contact_email} a ozveme sa ti."
        )
    if any(w in last for w in ("kontakt", "email", "telefón", "contact")):
        return (
            f"Pokojne nás kontaktuj na {settings.company.contact_email}"
            + (f" alebo telefonicky {settings.company.contact_phone}." if settings.company.contact_phone else ".")
        )
    return (
        "Ďakujem za správu. Práve prebieha demo režim bez pripojenia "
        "k jazykovému modelu — po nastavení API kľúča dostaneš plnú odpoveď."
    )


async def _anthropic_reply(messages: list[Message]) -> str:
    try:
        from anthropic import AsyncAnthropic
    except ImportError:
        return _fallback_reply(messages)

    client = AsyncAnthropic(api_key=settings.llm.api_key)
    api_messages = [
        {"role": m.role, "content": m.content}
        for m in messages
        if m.role in ("user", "assistant")
    ]
    response = await client.messages.create(
        model=settings.llm.model,
        system=_build_system_prompt(),
        messages=api_messages,
        max_tokens=settings.llm.max_tokens,
        temperature=settings.llm.temperature,
    )
    chunks = [block.text for block in response.content if hasattr(block, "text")]
    return "".join(chunks).strip() or _fallback_reply(messages)


async def generate_reply(messages: list[Message]) -> str:
    if not settings.llm.api_key:
        return _fallback_reply(messages)
    if settings.llm.provider == "anthropic":
        return await _anthropic_reply(messages)
    return _fallback_reply(messages)
