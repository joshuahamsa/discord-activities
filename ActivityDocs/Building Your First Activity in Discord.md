# Building Your First Activity in Discord

Activities are web-based games and apps that run within Discord. They’re embedded in iframes inside the Discord client and can be launched from the **App Launcher** or by responding to interactions.

If this is your first time learning about Activities, check out the **Activities Overview** for background and links to advanced sample projects.

---

## Table of Contents
- [Introduction](#introduction)
  - [What We’ll Be Building](#what-well-be-building)
  - [Resources Used in This Guide](#resources-used-in-this-guide)
- [Step 0: Enable Developer Mode](#step-0-enable-developer-mode)
- [Step 1: Setting Up the Project](#step-1-setting-up-the-project)
  - [Project Structure](#project-structure)
  - [Install Project Dependencies](#install-project-dependencies)
  - [Step 1 Checkpoint](#step-1-checkpoint)
- [Step 2: Creating an App](#step-2-creating-an-app)
  - [Choose Installation Contexts](#choose-installation-contexts)
  - [Why Installation Contexts Matter](#why-installation-contexts-matter)
  - [Add a Redirect URI](#add-a-redirect-uri)
  - [Fetch Your OAuth2 Credentials](#fetch-your-oauth2-credentials)
  - [Step 2 Checkpoint](#step-2-checkpoint)
- [Step 3: Setting Up the Embedded App SDK](#step-3-setting-up-the-embedded-app-sdk)
  - [Install the SDK](#install-the-sdk)
  - [Import the SDK in Your Project](#import-the-sdk-in-your-project)
  - [Add SDK Initialization to Frontend](#add-sdk-initialization-to-frontend)
  - [Step 3 Checkpoint](#step-3-checkpoint)
- [Step 4: Running Your App in Discord](#step-4-running-your-app-in-discord)
  - [Run Your App](#run-your-app)
  - [Set Up a Public Endpoint](#set-up-a-public-endpoint)
  - [Set Up Your Activity URL Mapping](#set-up-your-activity-url-mapping)
  - [Enable Activities](#enable-activities)
  - [Running Your Activity in Discord](#running-your-activity-in-discord)
  - [Step 4 Checkpoint](#step-4-checkpoint)
- [Step 5: Authorizing & Authenticating Users](#step-5-authorizing--authenticating-users)
  - [OAuth2 Flow Diagram](#oauth2-flow-diagram)
  - [Server Setup](#server-setup)
  - [Calling External Resources From Your Activity](#calling-external-resources-from-your-activity)
  - [Calling Your Backend Server From Your Client](#calling-your-backend-server-from-your-client)
  - [Calling the Backend Server](#calling-the-backend-server)
  - [Step 5 Checkpoint](#step-5-checkpoint)
- [Step 6: Use the SDK to Fetch the Channel](#step-6-use-the-sdk-to-fetch-the-channel)
  - [Fetching a Channel Using the SDK](#fetching-a-channel-using-the-sdk)
  - [Step 6 Checkpoint](#step-6-checkpoint)
- [Step 7: Use the API to Fetch the Guild](#step-7-use-the-api-to-fetch-the-guild)
  - [Fetching Information About the Current Server](#fetching-information-about-the-current-server)
  - [Step 7 Checkpoint](#step-7-checkpoint)
- [Next Steps](#next-steps)
  - [Development Guides](#development-guides)
  - [Sample Activity Projects](#sample-activity-projects)
  - [Discord Developers](#discord-developers)

---

## Introduction

In this guide, we’ll build a Discord app with a basic Activity that handles **user authentication** and **fetches data** using the API. It assumes an understanding of JavaScript and async functions, and a basic understanding of frontend frameworks like React and Vue.

If you’re still learning to program, there are many free education resources to explore like **The Odin Project**, **Codecademy**, and **Khan Academy**.

### What We’ll Be Building

- Initialize the Embedded App SDK
- Authenticate a user via a small Express backend
- Fetch channel and guild info and render it in the Activity

### Resources Used in This Guide

- `discord/getting-started-activity` — a project template to get you started
- `@discord/embedded-app-sdk` — the SDK used to communicate between your app and Discord
- **Node.js** — latest version
- **Express** — create a server to handle authentication and serve your app
- **Vite** — build tool for modern JavaScript projects
- **cloudflared** — bridge your local development server to the internet

---

## Step 0: Enable Developer Mode

Developer Mode will allow you to run in-development Activities and expose resource IDs (users, channels, servers) to simplify testing.

**To enable Developer Mode:**

1. Go to **User Settings** in your Discord client. On desktop, click the cogwheel icon near the bottom-left next to your username.
2. Click **Advanced** in the left sidebar and toggle **Developer Mode** on.

---

## Step 1: Setting Up the Project

Before creating an app, set up your project from the `discord/getting-started-activity` repository.

Clone the project:

```bash
git clone git@github.com:discord/getting-started-activity.git
```

The project has two parts:

- **client** — the Activity’s frontend (vanilla JS + Vite)
- **server** — a backend using Node.js and Express (you can use any backend you prefer)

### Project Structure

```
├── client
│   ├── main.js            # your Activity frontend
│   ├── index.html
│   ├── package.json
│   ├── rocket.png
│   ├── vite.config.js
├── server
│   ├── package.json
│   ├── server.js          # your Activity backend
└── .env                   # your credentials, IDs, and secrets
```

### Install Project Dependencies

Install and start the frontend:

```bash
cd getting-started-activity/client
npm install
npm run dev
```

Visit **http://localhost:5173/** — you should see a vanilla JS template running with Vite.  
In the following steps, we’ll connect it to backend services, make it runnable in Discord, and populate it with data from Discord APIs.

### Step 1 Checkpoint

By the end of Step 1, you should have:

- An understanding of what Discord Activities are
- Developer Mode enabled
- The sample project cloned
- Frontend dependencies installed (in the `client` folder)

---

## Step 2: Creating an App

Create a new app in the Developer Portal: **https://discord.com/developers/applications**

Enter a name for your app, select a development team, then press **Create**.

After creation you’ll land on the **General Overview** page where you can update basic information such as description and icon.

### Choose Installation Contexts

Apps can be installed to different **installation contexts**: servers, user accounts, or both. The recommended and default behavior is to support **both**.

In the app’s settings, click **Installation** (left sidebar), then under **Installation Contexts** ensure **User Install** and **Guild Install** are selected. This allows users to launch your Activity across servers, DMs, and Group DMs.

### Why Installation Contexts Matter

- **Server context** (server-installed): must be authorized by a member with `MANAGE_GUILD`. Visible to all server members.
- **User context** (user-installed): visible only to the authorizing user across all their servers/DMs/GDMs; limited to using commands.

See the **Applications** docs and **Developing a User-Installable App** guide for more details.

### Add a Redirect URI

Add a Redirect URI for the standard OAuth flow. The Embedded App SDK automatically redirects users back to your Activity when the RPC `authorize` command is called, so we’ll use a placeholder value:

- Go to **OAuth2** in your app’s settings.
- Under **Redirects**, enter:
  ```
  https://127.0.0.1
  ```
- Click **Save Changes**.

### Fetch Your OAuth2 Credentials

For our sample app, we’ll request these scopes later:

- `identify` — basic user info
- `guilds` — basic info about a user’s servers
- `applications.commands` — install commands

Copy identifiers into your project’s environment file:

```bash
# from the project root
cp example.env .env
```

In **OAuth2** settings:

1. **Client ID** → add to `.env` as `VITE_CLIENT_ID` (public ID associated with your app)  
2. **Client Secret** → add to `.env` as `DISCORD_CLIENT_SECRET` (private; used to grant OAuth2 `access_token`; never share or commit)

> **Why the `VITE_` prefix?** Vite exposes `import.meta.env.VITE_*` variables to the client bundle.

### Step 2 Checkpoint

By the end of Step 2, you should have:

- A placeholder Redirect URI configured
- Your app’s Client ID and Client Secret added to `.env`

---

## Step 3: Setting Up the Embedded App SDK

The Embedded App SDK handles communication between Discord and your Activity with commands (e.g., fetch channel info) and events (e.g., user starts/stops speaking).

### Install the SDK

From `getting-started-activity/client`:

```bash
npm install @discord/embedded-app-sdk
```

### Import the SDK in Your Project

Initialize the SDK and wait for the ready event.

### Add SDK Initialization to Frontend

In `getting-started-activity/client/main.js`:

```javascript
// Import the SDK
import { DiscordSDK } from "@discord/embedded-app-sdk";
import "./style.css";
import rocketLogo from "/rocket.png";

// Instantiate the SDK
const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);

setupDiscordSdk().then(() => {
  console.log("Discord SDK is ready");
});

async function setupDiscordSdk() {
  await discordSdk.ready();
}

document.querySelector("#app").innerHTML = `
  <div>
    <img src="${rocketLogo}" class="logo" alt="Discord" />
    <h1>Hello, World!</h1>
  </div>
`;
```

### Step 3 Checkpoint

- Embedded App SDK installed
- SDK imported and initialized in `client/main.js`

---

## Step 4: Running Your App in Discord

Let’s enable Activities and run your Activity inside Discord.

### Run Your App

```bash
cd client
npm run dev
```

You should see output similar to:

```
VITE v5.0.12 ready in 100 ms
➜ Local: http://localhost:5173/
➜ Network: use --host to expose
➜ press h + enter to show help
```

We’ll use the **Local** URL in the next step.

### Set Up a Public Endpoint

Create a tunnel so Discord can reach your local app. Example using **cloudflared**:

```bash
cloudflared tunnel --url http://localhost:5173
```

Example output:

```
Your quick Tunnel has been created! Visit it at (it may take some time to be reachable):
https://funky-jogging-bunny.trycloudflare.com
```

Copy the URL for the next step.

### Set Up Your Activity URL Mapping

Because Activities are sandboxed and go through the Discord proxy, add a public **URL Mapping** in your app’s settings.

In **Activities → URL Mappings**, enter the tunnel URL you generated.

| PREFIX | TARGET                                   |
|-------:|:-----------------------------------------|
| `/`    | `funky-jogging-bunny.trycloudflare.com`  |

### Enable Activities

In **Activities → Settings**, enable **Activities**.  
This creates a default **Entry Point** command called **“Launch”**. Discord will open your Activity when this command is run (and post a message in the channel). You can customize the handler or create your own entry point if desired.

### Running Your Activity in Discord

Open your test server, then in any voice or text channel open the **App Launcher** and find your in-development Activity (search by name if needed). Click it to launch your app inside Discord.

### Step 4 Checkpoint

- Public endpoint set up  
- Activity URL Mapping added  
- Activities enabled  
- Activity launched inside Discord

---

## Step 5: Authorizing & Authenticating Users

We’ll implement a small server (Express) to complete the OAuth flow and exchange the code for an access token.

### OAuth2 Flow Diagram

```
Discord-Client → Application-Iframe → Application-Server → Discord API
     ↓                ↓                    ↓                ↓
(This step opens the OAuth modal)
Request to authorize scopes
Reply with OAuth authorize code
Send OAuth code to application server to fetch access_token from developer portal
Use OAuth code and client secret
Reply with access_token
Reply with access_token
Application Instance Validation
```

Sample implementations:
- **Back-end code:** https://github.com/discord/discord-embedded-app-sdk/tree/main/examples/getting-started-activity/server
- **Front-end code:** https://github.com/discord/discord-embedded-app-sdk/tree/main/examples/getting-started-activity/client

The server exposes a single POST route `/api/token` to securely perform the OAuth2 code exchange.

### Server Setup (`getting-started-activity/server/server.js`)

```bash
# move into our server directory
cd server
# install dependencies
npm install
```

Start the backend server:

```bash
npm run dev
```

Expected output:

```
> server@1.0.0 dev
> node server.js
Server listening at http://localhost:3001
```

You can now run server and client in separate terminals.

### Calling External Resources From Your Activity

Activities are proxied and subject to CSP. Read:
- **Constructing a Full URL**
- **Using External Resources**

### Calling Your Backend Server From Your Client

Next, have the client call your server to start OAuth and obtain an access token.

> **What is `vite.config.js`?** Vite configuration that can assist with proxying during local development.

### Calling the Backend Server

In `getting-started-activity/client/main.js`:

```javascript
import { DiscordSDK } from "@discord/embedded-app-sdk";
import rocketLogo from "/rocket.png";
import "./style.css";

// Will eventually store the authenticated user's access_token
let auth;

const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);

setupDiscordSdk().then(() => {
  console.log("Discord SDK is authenticated");
  // We can now make API calls within the scopes we requested in setupDiscordSdk
  // Note: the access_token returned is a sensitive secret and should be treated as such
});

async function setupDiscordSdk() {
  await discordSdk.ready();
  console.log("Discord SDK is ready");

  // Authorize with Discord Client
  const { code } = await discordSdk.commands.authorize({
    client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
    response_type: "code",
    state: "",
    prompt: "none",
    scope: ["identify", "guilds", "applications.commands"],
  });

  // Retrieve an access_token from your activity's server
  const response = await fetch("/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });

  const { access_token } = await response.json();

  // Authenticate with Discord client (using the access_token)
  auth = await discordSdk.commands.authenticate({ access_token });

  if (auth == null) {
    throw new Error("Authenticate command failed");
  }
}

document.querySelector("#app").innerHTML = `
  <div>
    <img src="${rocketLogo}" class="logo" alt="Discord" />
    <h1>Hello, World!</h1>
  </div>
`;
```

Now, when you relaunch the app, you’ll be prompted to authorize using the `identify`, `guilds`, and `applications.commands` scopes.

> **Safe storage of tokens:** Treat access tokens as sensitive. Never expose them in client logs or commit them to version control.

### Step 5 Checkpoint

- `client/main.js` updated to call the backend for authorization/authentication  
- Authorization flow completes successfully when opening the Activity

---

## Step 6: Use the SDK to Fetch the Channel

Let’s fetch details about the channel the Activity is running in, using `commands.getChannel`.

### Fetching a Channel Using the SDK

In `getting-started-activity/client/main.js`:

```javascript
async function appendVoiceChannelName() {
  const app = document.querySelector("#app");
  let activityChannelName = "Unknown";

  // Requesting the channel in GDMs (when the guild ID is null) requires
  // the dm_channels.read scope which requires Discord approval.
  if (discordSdk.channelId != null && discordSdk.guildId != null) {
    // Over RPC collect info about the channel
    const channel = await discordSdk.commands.getChannel({
      channel_id: discordSdk.channelId,
    });
    if (channel.name != null) {
      activityChannelName = channel.name;
    }
  }

  // Update the UI with the name of the current voice channel
  const textTagString = `Activity Channel: "${activityChannelName}"`;
  const textTag = document.createElement("p");
  textTag.textContent = textTagString;
  app.appendChild(textTag);
}
```

Call it after `setupDiscordSdk()`:

```javascript
setupDiscordSdk().then(() => {
  console.log("Discord SDK is authenticated");
  appendVoiceChannelName();
});
```

### Step 6 Checkpoint

- `client/main.js` updated to fetch the channel name using the SDK  
- Function called in the `setupDiscordSdk()` callback

---

## Step 7: Use the API to Fetch the Guild

Since we requested `identify` and `guilds`, use the access token to call the REST API.

### Fetching Information About the Current Server

In `client/main.js`:

```javascript
async function appendGuildAvatar() {
  const app = document.querySelector("#app");

  // 1. From the HTTP API, fetch a list of the user's guilds
  const guilds = await fetch(`https://discord.com/api/v10/users/@me/guilds`, {
    headers: {
      // NOTE: using the access_token provided by the "authenticate" command
      Authorization: `Bearer ${auth.access_token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

  // 2. Find the current guild's info, including its "icon"
  const currentGuild = guilds.find((g) => g.id === discordSdk.guildId);

  // 3. Append an img tag with the guild's avatar
  if (currentGuild != null) {
    const guildImg = document.createElement("img");
    guildImg.setAttribute(
      "src",
      // More info on image formatting: https://discord.com/developers/docs/reference#image-formatting
      `https://cdn.discordapp.com/icons/${currentGuild.id}/${currentGuild.icon}.png`
    );
    guildImg.setAttribute("width", "128px");
    guildImg.setAttribute("height", "128px");
    guildImg.setAttribute("style", "border-radius: 50%;");
    app.appendChild(guildImg);
  }
}
```

Call the new function after auth:

```javascript
setupDiscordSdk().then(() => {
  console.log("Discord SDK is authenticated");
  appendVoiceChannelName();
  appendGuildAvatar();
});
```

### Step 7 Checkpoint

- `client/main.js` updated to fetch guild information via `GET /users/@me/guilds`  
- Function called in the `setupDiscordSdk()` callback

---

## Next Steps

Congrats on building your first Activity! This simple example gets you started with the Embedded App SDK and Discord APIs.

### Development Guides

Follow the **Activities Development Guides** for suggested practices and considerations:  
https://discord.com/developers/docs/activities/development-guides

### Sample Activity Projects

Try the **playground app** to explore the full range of Embedded App SDK features, or review other examples:  
https://github.com/discord/discord-embedded-app-sdk/tree/main/examples/playground

### Discord Developers

Join the **Discord Developers** community to ask questions, attend platform events, and interact with other Activities developers:  
https://discord.gg/discord-developers
