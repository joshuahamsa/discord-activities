# User Actions

## Open External Link

Since Activities are sandboxed, your app will need to perform a command in order for users to launch any external links. Users will be prompted inside Discord whether or not they want to open the external link.

### Usage

```javascript
import { DiscordSDK } from '@discord/embedded-app-sdk';
const discordSdk = new DiscordSDK(clientId);
await discordSdk.ready();

// Once the sdk has established the connection with the discord client, external
// links can be launched
discordSdk.commands.openExternalLink({
  url: 'https://google.com',
});
```

Users will see a modal inside the Discord app notifying them whether or not they want to proceed. By clicking **Trust this Domain**, users will not see a modal for that specific domain again.

---

## Open Invite Dialog

Getting an Application Channel Invite, as outlined in these docs, is not granted by any OAuth scopes. Nonetheless, the `openInviteDialog` command is available via the SDK.

This command opens the Application Channel Invite UI within the Discord client without requiring additional OAuth scopes.

### User Experience

This command returns an error when called from **DM (Direct Message)** contexts, so it should only be called in **Guild Voice or Text Channels**. Similarly, this command returns an error if the user has invalid permissions for the channel, so using `getChannelPermissions` (requires OAuth scope `guilds.members.read`) is highly recommended.

### Usage

```javascript
import { DiscordSDK, Permissions, PermissionUtils } from '@discord/embedded-app-sdk';
const discordSdk = new DiscordSDK(clientId);
await discordSdk.ready();

try {
  const { permissions } = await discordSdk.commands.getChannelPermissions();
  if (PermissionUtils.can(Permissions.CREATE_INSTANT_INVITE, permissions)) {
    await discordSdk.commands.openInviteDialog();
    // successfully opened dialog
  } else {
    console.warn('User does not have CREATE_INSTANT_INVITE permissions');
  }
} catch (err) {
  // failed to fetch permissions or open dialog
  console.warn(err.message);
}
```

Users will see a modal inside the Discord app allowing them to send an invite to a channel, friend, or copy an invite link to share manually.

---

## Open Share Moment Dialog

The easiest way for an application to share media to a channel or DM is to use the `openShareMomentDialog` command.  

This command accepts a **Discord CDN mediaUrl** (e.g. `https://cdn.discordapp.com/attachments/...`) and opens a dialog on the Discord client that allows the user to select channels, DMs, and GDMs to share to.  

This requires no additional OAuth scopes, but does require the application to be authenticated.

Since `mediaUrl` must be a Discord CDN URL, it is encouraged to use the **activities attachment API endpoint** (`discord.com/api/applications/${applicationId}/attachment`) to create an ephemeral CDN URL.  

This endpoint accepts bearer tokens for any scopes, so it can be called from the application client using the authorized user's bearer token. The endpoint returns a serialized attachment, which includes a URL attribute, which should then be passed to the DiscordSDK command as `mediaUrl`.

### Usage

```javascript
import { discordSdk } from './wherever-you-initialize-your-sdk';
import { accessToken } from './wherever-you-store-your-access-token';

// some image
const imageURL = 'https://i.imgur.com/vaSWuKr.gif';

// get image data
const response = await fetch(imageURL);
const blob = await response.blob();
const mimeType = blob.type;

// image data as buffer
const buf = await blob.arrayBuffer();

// image as file
const imageFile = new File([buf], 'example.gif', { type: mimeType });

const body = new FormData();
body.append('file', imageFile);

const attachmentResponse = await fetch(
  `${env.discordAPI}/applications/${env.applicationId}/attachment`,
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body,
  }
);

const attachmentJson = await attachmentResponse.json();

// mediaUrl is an ephemeral Discord CDN URL
const mediaUrl = attachmentJson.attachment.url;

// opens dialog in Discord client
await discordSdk.commands.openShareMomentDialog({ mediaUrl });
```

---

## Setting Up an Entry Point Command

An **Entry Point command** is required for users to be able to launch your Activity from the App Launcher menu in Discord.

When you enable Activities in your app's settings, a default Entry Point command is automatically created for your app. The default Entry Point command will use the `DISCORD_LAUNCH_ACTIVITY (2)` handler type, which means that Discord automatically launches your Activity for the user and posts a follow-up message into the channel where it was launched from.

If you want to handle sending messages yourself, you can update the handler to be `APP_HANDLER (1)`. Details about Entry Point command handlers are in the Entry Point command documentation.

Entry Point commands can be customized in the same way as other commands. Since Entry Point commands can only be global, you'll use the **HTTP endpoints for global commands**:

- Edit your existing Entry Point command's name or details using the **Edit Global Application Command** endpoint.  
- If you don't know the ID for your app's Entry Point command, use the **Get Global Application Commands** endpoint to retrieve it.  
- Make a different (option-less) command your Entry Point command by updating its command type to `PRIMARY_ENTRY_POINT (type 4)`.  
- Your app can only have one Entry Point command, so if your app already has one, you must first delete it or update its command type.  
- To create a new Entry Point command, you can call the **Create Global Application Command** endpoint and set the command type to `PRIMARY_ENTRY_POINT (type 4)`.

### Example Entry Point Command Payload

```json
{
  "name": "launch",
  "description": "Launch Realms of Wumpus",
  "type": 4, // PRIMARY_ENTRY_POINT is type 4
  "handler": 2, // DISCORD_LAUNCH_ACTIVITY is handler value 2
  "integration_types": [0, 1],
  "contexts": [0, 1, 2]
}
```

---

## Encourage Hardware Acceleration

Activities that are compute intensive may benefit from encouraging users to enable hardware acceleration.  

When an application invokes the `encourageHardwareAcceleration` command the current status of the setting will be returned and the user will be prompted to update the setting, if applicable.

Users will see a modal inside the Discord app if Hardware Acceleration is disabled, encouraging them to change the setting. By clicking **Don't show me this again**, they will not see the modal for any application on this device again.

Switching the Hardware Acceleration setting causes the Discord client to quit and re-launch, so it is best practice to invoke this command as soon as possible, so users do not begin the experience of an application before restarting. Ideally, this is immediately after:

```javascript
await discordSdk.ready();
```

### Usage

```javascript
import { DiscordSDK } from '@discord/embedded-app-sdk';
const discordSdk = new DiscordSDK(clientId);

await discordSdk.ready();
const { enabled } = await discordSdk.commands.encourageHardwareAcceleration();
console.log(`Hardware Acceleration is ${enabled === true ? 'enabled' : 'disabled'}`);
```
