# Community Resources

Our community members create amazing tools and resources that help developers build and maintain their apps.  

From permissions calculators and embed visualizers to comprehensive libraries for interfacing with our API, the community has built a wealth of resources to make your development process smoother and more efficient.

---

## Table of Contents
- [Discord Developers](#discord-developers)
- [Libraries](#libraries)
- [Interactions](#interactions)
- [OpenAPI Specification](#openapi-specification)
- [Permission Calculators](#permission-calculators)
- [Intent Calculators](#intent-calculators)
- [Embed Visualizers](#embed-visualizers)
- [API Types](#api-types)
- [Game SDK Tools](#game-sdk-tools)

---

## Discord Developers

The **Official Discord Developers server** is a developer-run but community-driven support hub.  

If you need help developing something on Discord or want official updates from the developers, this is the place to be.

---

## Libraries

Discord does not maintain official SDKs.  

The following is an **inexhaustive list of third-party libraries** that:
- Implement valid rate limits
- Are recently maintained
- Have large, active communities

**Discord Libraries**

| Name           | Language    |
|----------------|-------------|
| Concord        | C           |
| Discord.Net    | C#          |
| DSharpPlus     | C#          |
| D++            | C++         |
| discljord      | Clojure     |
| DiscordGo      | Go          |
| Discord4J      | Java        |
| JDA            | Java        |
| discord.js     | JavaScript  |
| Eris           | JavaScript  |
| Oceanic        | JavaScript  |
| Discordia      | Lua         |
| DiscordPHP     | PHP         |
| discord.py     | Python      |
| disnake        | Python      |
| hikari         | Python      |
| interactions.py| Python      |
| nextcord       | Python      |
| pycord         | Python      |
| discordrb      | Ruby        |
| Serenity       | Rust        |

---

## Interactions

Interactions are the new way of making a Discord bot.  

The following **open-source libraries** help with:
- Security and authentication checks (for webhooks)
- Types for Interactions data models

**C#**
- Discord.Net.Rest
- DSharpPlus.Http.AspNetCore  

**Clojure**
- ring-discord-auth  

**Dart**
- nyxx_interactions  

**Go**
- tempest  

**JavaScript**
- discord-interactions-js  
- discord-slash-commands (and its Deno fork: `slash-create`)  

**Python**
- discord-interactions-python  
- discord-interactions.py  
- dispike  
- ask-discord-interactions  

**PHP**
- discord-interactions-php  

**Other**
- caddy-discord-interactions-verifier  

**Tools**
- BotForge’s Application Commands Builder & Previewer  
- Rauf’s Slash Command Generator  
- Bsati’s Slash Command Builder  

---

## OpenAPI Specification

The OpenAPI specification is currently in **public preview** and is **subject to breaking changes**.  

It provides a standard **OpenAPI 3.1 spec** for the Discord HTTP API.

---

## Permission Calculators

Permissions in Discord can be tricky.  

If you’re making a bot for others and aren’t sure how to calculate permissions or generate your authorization URL, try these tools:  
- BotForge’s Permissions Calculator  
- FiniteReality’s Permissions Calculator  
- abalabahaha’s Permissions Calculator  

---

## Intent Calculators

Gateway Intents can be confusing at first.  

If you’re unsure what to send in your Identify payload, try:  
- ziad87’s Intent Calculator  
- Larko’s Intent Calculator  

---

## Embed Visualizers

Embeds and webhooks can feel confusing, but these tools help you preview how they’ll look in Discord:  
- JohnyTheCarrot’s Embed Previewer (Browser Extension)  

---

## API Types

If you’re working with the Discord API, type modules can help with **type inspection and completion**.

**API Types**

| Name               | Language   |
|--------------------|------------|
| dasgo              | Go         |
| discord-api-types  | JavaScript |

---

## Game SDK Tools

Discord Game SDK’s **lobby and networking layer** is similar to other gaming platforms (like Steamworks SDK).  

The following open-source library provides a **uniform interface** for shared features, simplifying multi-platform development:  

- **HouraiNetworking** (tailored for Unity3D)