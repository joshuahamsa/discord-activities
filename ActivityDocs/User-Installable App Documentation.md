# Developing a User‑Installable App

Discord apps can be installed to **servers**, **users**, or **both**. This guide walks through building a basic game‑integration app that supports **both installation contexts**. Along the way you’ll implement four commands — `/link`, `/profile`, `/leaderboard`, and `/wiki` — and see how installation and interaction contexts shape where those commands can run.

---

## Resources Used in This Guide

- Node.js (LTS recommended)
- ngrok (or another tunneling solution)
- Sample repo: `https://github.com/discord/user-install-example`
- A Discord application in the Developer Portal

---

## Step 0: Project Setup

Clone the sample project and install dependencies.

```bash
# Clone the repo
git clone https://github.com/discord/user-install-example.git

# Navigate into the project
cd user-install-example

# Install dependencies
npm install
```

Open the project in your editor of choice.

### Project Structure (High Level)

```
user-install-example/
├─ commands.js            # Command payloads (names, descriptions, contexts)
├─ app.js                 # Interaction handling
├─ .env.sample            # Environment variable template
└─ package.json
```

---

## Step 1: Creating an App

Create an app in the **Developer Portal** if you don’t have one already. After creating it, you’ll land on **General Information**, where you can name your app and set an icon.

### Fetching App Credentials

Rename `.env.sample` to `.env`, then fill in these values from the Developer Portal:

- **Application ID** → set as `APP_ID`
- **Public Key** → set as `PUBLIC_KEY` (used to verify Discord requests)
- **Bot Token** → on the **Bot** page click **Reset Token**, then set as `BOT_TOKEN`

> ⚠️ **Keep credentials secret.** Don’t commit `.env` to version control.

### Add Guild Members Intent

The sample builds a fake leaderboard using guild members, which requires a privileged intent.

1. Go to **Bot** → **Privileged Gateway Intents**
2. Enable **Server Members Intent**

### Choosing Supported Installation Contexts

Installation contexts define *where* the app can be installed.

- Go to **Installation** → **Installation Contexts**
- Check **User Install** and **Guild Install**
- Click **Save Changes**

### Configuring Default Install Settings

1. In **Installation** → **Install Link**, select **Discord Provided Link**
2. In **Default Install Settings**:
   - **User Install**: add the `applications.commands` scope
   - **Guild Install**: add `applications.commands` and `bot` scopes  
     - When `bot` is selected, choose Bot **Permissions** (e.g., *Send Messages*) to match your needs

Save changes.

### Installing Your App

Install to both a **test server** and **your user account** to exercise both contexts.

- **Install to server**: Use the **Install Link**, choose **Add to server**, and complete the flow.
- **Install to user**: Use the same **Install Link**, choose **Add to my apps**, and complete the flow (you can DM your app afterward).

---

## Step 2: Setting Up Commands

Before registering commands, understand contexts.

### Contexts for Application Commands

Commands can specify two context fields when created/updated:

- `integration_types` → which **installation contexts** the command supports:
  - `USER_INSTALL`, `GUILD_INSTALL`, or both
- `contexts` → which **interaction contexts** (surfaces) the command may run in:
  - `GUILD` (server channels)
  - `BOT_DM` (DM with your bot)
  - `PRIVATE_CHANNEL` (DMs/GDMs with other users)

> ℹ️ `PRIVATE_CHANNEL` can only be included if `USER_INSTALL` is present in `integration_types`.

### Commands in the Sample Project

| Command       | Description                                      | Installation Contexts                | Interaction Contexts                          |
|---------------|--------------------------------------------------|--------------------------------------|-----------------------------------------------|
| `/leaderboard`| View game leaderboard for the current server     | GUILD_INSTALL                        | GUILD                                         |
| `/wiki`       | Find info about game items/characters            | GUILD_INSTALL, USER_INSTALL          | GUILD, BOT_DM, PRIVATE_CHANNEL                |
| `/profile`    | Get info about your game inventory & progress    | USER_INSTALL                         | GUILD, BOT_DM, PRIVATE_CHANNEL                |
| `/link`       | Link your game account to Discord                | USER_INSTALL                         | BOT_DM                                        |

> See `commands.js` for exact payloads including `integration_types` and `contexts`.

### Registering the Commands

```bash
npm run register
```

This uses the **Create Global Application Command** endpoint for each payload in `commands.js`.

Afterward, check Discord:

- **In your test server**: `/leaderboard`, `/wiki`, `/profile`
- **In any of your guilds**: `/wiki`, `/profile`
- **In your app’s DM**: `/wiki`, `/profile`, `/link`
- **In DMs/GDMs with other users**: `/wiki`, `/profile`

If running any command fails, proceed to Step 3 to handle interactivity.

---

## Step 3: Handling Interactivity

To receive and respond to interactive requests, you must expose an **Interactions Endpoint URL**.

### Set Up a Public Endpoint

Start the app (Express server):

```bash
npm run start
```

By default it listens on port `3000`. To expose it publicly using **ngrok**:

```bash
ngrok http 3000
```

Copy the **Forwarding** URL shown by ngrok.

### Configure the Interaction Endpoint URL

In the Developer Portal → **General Information**:

- Set **Interaction Endpoint URL** to:  
  `https://<your-ngrok-subdomain>.ngrok-free.dev/interactions`
- Click **Save Changes** and ensure it verifies

If verification fails, confirm ngrok and your app are both running on the same port and the URL is correct.

### Understanding Metadata for Interactions

When you invoke a command (e.g., `/profile`), your server logs the incoming interaction. A condensed example:

```json
{
  "type": 2,
  "application_id": "234248956100616262",
  "token": "interaction-token",
  "version": 1,
  "locale": "en-US",
  "channel_id": "1234563982236504123",
  "context": 1,
  "authorizing_integration_owners": { "1": "1090372582781497424" },
  "app_permissions": "442368",
  "data": { "id": "1234358421659193405", "name": "link", "type": 1 },
  "user": { /* partial user */ },
  "entitlements": [],
  "channel": { /* partial channel */ }
}
```

Key fields:

- **`context`** — which interaction context the command was invoked from:  
  - `BOT_DM (1)` for DM with your bot  
  - `PRIVATE_CHANNEL (2)` for DMs/GDMs with other users  
  - `GUILD (0)` for server channels

- **`authorizing_integration_owners`** — IDs of the installation owners by context:
  - Keys: `"0"` → `GUILD_INSTALL`, `"1"` → `USER_INSTALL`
  - For `USER_INSTALL`, value is always the ID of the user who authorized your app  
  > Not the same as the user who *triggered* the interaction — that’s in `user`.

- **`app_permissions`** — bitwise string of your app’s permissions where the interaction occurred. Useful to adapt responses (e.g., choose ephemeral responses in servers).

### Using Metadata for Command Interactions

Example logic for `/profile`:

- If invoked in a **guild** or **PRIVATE_CHANNEL**, respond **ephemerally** (`flags: 64`) and include a share button.
- If invoked in **BOT_DM**, respond non‑ephemerally.

Sketch:

```js
const interactionContext = body.context; // 0=GUILD, 1=BOT_DM, 2=PRIVATE_CHANNEL
const isEphemeral = interactionContext !== 1; // ephemeral unless BOT_DM

const response = {
  type: 4,
  data: {
    content: "Your profile…",
    flags: isEphemeral ? 64 : 0,
    components: isEphemeral
      ? [{ type: 1, components: [{ type: 2, style: 1, custom_id: "share_profile", label: "Share Profile" }]}]
      : []
  }
};
```

### Using Metadata for Message Component Interactions

Components can be clicked by any user who can see the message, regardless of installation context. For a user‑installed app:

- `/game` (USER_INSTALL) sends a message with **Join** button in a guild/GDM
- When **Join** is clicked, your app needs:
  1. **User B** (who clicked) to track who wants to join
  2. **User A** (who invoked `/game`) to notify the organizer

Helpful fields:

- **`interaction_metadata`** — present on messages created from interactions; carry metadata forward
- **`authorizing_integration_owners`** — distinguishes the installation owner (User A for USER_INSTALL) from the clicking user

Use these to correlate who installed the app vs. who clicked the component.

---

## Next Steps

- **Interactions Docs** — Learn more about receiving/responding to commands & components.  
- **Sample Repository** — Explore and extend the sample app for richer features.

Happy building! 🎮
