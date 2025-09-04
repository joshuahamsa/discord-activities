# Best Practices for Rich Presence

Rich Presence lets you display actionable data in a Discord user’s profile about what they’re up to in your game or app.  

This guide shows best practices for making that data as effective as possible.  
If you don’t already know about Rich Presence, read the **overview** first.

---

## Table of Contents
- [How Should You Think About the Data You Show?](#how-should-you-think-about-the-data-you-show)
- [Tips](#tips)
  - [Keep It Short](#keep-it-short)
  - [Make It Actionable](#make-it-actionable)
  - [Use All of the Fields](#use-all-of-the-fields)
  - [Have Interesting, Expressive Art](#have-interesting-expressive-art)
- [Launch Checklist](#launch-checklist)
  - [Profile Strings](#profile-strings)
  - [Artwork](#artwork)
  - [Joining](#joining)

---

## How Should You Think About the Data You Show?

The data in players’ profiles is the **first impression** others on Discord will get of your game or app — whether they’re familiar with it or not.  

It should answer the question: *Can I play with my friend right now?*  

Show data like:
- What the player is currently doing  
- How much time has elapsed or remains (if applicable)  
- Their party state  
- Your cool artwork!  

---

## Tips

### Keep It Short
Details and state should be **snippets**, not sentences.  
Strings should fit on one line — especially in the small profile view.  

**Examples:**
- ✅ `Playing Ranked`  
- ❌ `Currently playing a ranked match in the competitive playlist`

---

### Make It Actionable
Keep **party size data** up to date. Track party state accurately (In Queue, In Game, In Menus). Include game mode details so others clearly understand.  

**Examples:**
- ✅ `In Queue (2/4)`  
- ✅ `Playing Ranked - Dust 2`

---

### Use All of the Fields
Make use of every applicable field. Save space by putting map/character names in tooltips, and avoid repeating info.  

**Examples:**
- `details` → Current activity  
- `state` → Additional context  
- `large_image` → Consistent branding  
- `small_image` → Player-specific info  

---

### Have Interesting, Expressive Art
- Large image → Should be consistent across all party members  
- Small image → Can be customized per player  

Use **high-resolution artwork** so it looks great on high-DPI screens. Recommended size: **1024×1024 pixels**.  

**Examples:**
- Large image: Game logo or current map  
- Small image: Character portrait or rank icon  

---

## Launch Checklist

Before launching a Rich Presence integration, review this checklist to ensure everything is polished.

### Profile Strings
- Have you made use of all available fields?  
- Do your strings fit without line wrapping?  
- Did you check small profile pop-out?  
- Do they clearly communicate:
  - What the player is doing?  
  - If they’re solo or grouped?  
  - If they can party up?  

---

### Artwork
- Is artwork high resolution (≥1024×1024)?  
- Is it clean, interesting, and not overly detailed?  
- Do you have artwork for every state (including default/menu)?  
- Did you use tooltips and small images appropriately?  

---

### Joining
> Applicable when building with the **Game SDK** (Activities presence data already has an Ask to Join button).  

- Have you implemented join invites (if applicable)?  
- Does invite state represent:
  - Party size?  
  - Open slots?  
  - Discord vs. non-Discord members?  
- Can you post invites to Discord without extra in-game setup?  
- Do you remove presence payload data when invites are no longer possible?  
  - ⚠️ A Join secret should **not** be sent if the player can’t invite anyone!  