# Multiplayer Experience

## Activity Instance Management

When a user clicks **"Join Application"**, they expect to enter the same application that their friends are participating in.  

Whether the application is a shared drawing canvas, board game, collaborative playlist, or first-person shooter, users should have access to the same shared data.  
In this documentation, we refer to this shared data as an **application instance**.

The **Embedded App SDK** allows your app to talk bidirectionally with the Discord Client.  

- The **instanceId** is necessary for both your app and Discord to understand which unique instance is being referenced.  
- `instanceId` is available as soon as the SDK is constructed (no `ready` payload needed).  
- Use `instanceId` as a key to save and load shared data.  

### Using instanceId

```javascript
import { DiscordSDK } from '@discord/embedded-app-sdk';

const discordSdk = new DiscordSDK(clientId);

// available immediately
const instanceId = discordSdk.instanceId;
```

### Semantics of instanceId
- Instance IDs are generated when a user launches an application.  
- Any users joining the same application will receive the **same instanceId**.  
- When all users leave or close the application, that instance is finished and won’t be reused.  
- The next launch in that channel will generate a **new instanceId**.

---

## Instance Participants

**Instance Participants** = Any Discord users actively connected to the same Application Instance.  

This data can be fetched or subscribed to:

```javascript
import { DiscordSDK, Events, type Types } from '@discord/embedded-app-sdk';

const discordSdk = new DiscordSDK('...');
await discordSdk.ready();

// Fetch
const participants = await discordSdk.commands.getInstanceConnectedParticipants();

// Subscribe
function updateParticipants(participants: Types.GetActivityInstanceConnectedParticipantsResponse) {
  // Do something cool with participants
}

discordSdk.subscribe(Events.ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE, updateParticipants);

// Unsubscribe
discordSdk.unsubscribe(Events.ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE, updateParticipants);
```

---

## Render Avatars and Names

Check out [Discord Image Assets Documentation](https://discord.com/developers/docs/reference#image-formatting).  

### Basic Example (user avatar and username)

```javascript
// Reference the user object returned from authenticate
const { user } = await discordSdk.commands.authenticate({
  access_token: accessToken,
});

let avatarSrc = '';
if (user.avatar) {
  avatarSrc = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
} else {
  const defaultAvatarIndex = (BigInt(user.id) >> 22n) % 6n;
  avatarSrc = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`;
}

const username = user.global_name ?? `${user.username}#${user.discriminator}`;

// Then in HTML/JSX
<img alt="avatar" src={avatarSrc} />
<p>{username}</p>
```

### Rendering Guild-Specific Avatars and Nicknames

To retrieve a user’s **guild-specific avatar/nickname**, your app must request the `guilds.members.read` scope.  

Client example:
```javascript
const { user } = await discordSdk.commands.authenticate({
  access_token: accessToken,
});
```

Server-based example (recommended):
```javascript
fetch(`https://discord.com/api/users/@me/guilds/${discordSdk.guildId}/member`, {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
})
  .then((response) => response.json())
  .then((guildsMembersRead) => {
    let guildAvatarSrc = '';

    if (guildsMembersRead?.avatar) {
      guildAvatarSrc = `https://cdn.discordapp.com/guilds/${discordSdk.guildId}/users/${user.id}/avatars/${guildsMembersRead.avatar}.png`;
    } else if (user.avatar) {
      guildAvatarSrc = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
    } else {
      const defaultAvatarIndex = (BigInt(user.id) >> 22n) % 6n;
      guildAvatarSrc = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`;
    }

    const guildNickname = guildsMembersRead?.nick ?? (user.global_name ?? `${user.username}#${user.discriminator}`);
  });
```

---

## Preventing Unwanted Activity Sessions

Activities are surfaced through iframes inside the Discord client.  
However, the activity’s website is also **publicly reachable** at:  

```
<application_id>.discordsays.com
```

- If loaded outside of Discord → no RPC server present → activity may fail.  
- Malicious clients could try to mock the RPC protocol.  

### Locking Down Activity Access

Use the API:  

```
GET https://discord.com/api/applications/<application_id>/activity-instances/<instance_id>
```

- Requires the **application’s Bot token**  
- Returns serialized active activity instance if found, otherwise 404  

### Example Responses

**404 Not Found:**
```json
{"message": "404: Not Found", "code": 0}
```

**Valid Instance:**
```json
{
  "application_id": "1215413995645968394",
  "instance_id": "i-1276580072400224306-gc-9"
}
```

With this, your backend can **verify session validity** before allowing participation.  

Possible approaches:  
- Gate specific features unless verified  
- Do not return the activity HTML unless session is valid  
