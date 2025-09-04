# Embedded App SDK Reference

The Embedded App SDK handles RPC calls between your application and Discord. It’s designed to help you build interactive Activities (games, social experiences, utilities). For tutorials and examples, see **Building an Activity** and the **Sample Projects**.

---

## Install the SDK

The SDK is available via npm and GitHub. In your frontend JavaScript project:

```bash
npm install @discord/embedded-app-sdk
```

Then import and instantiate:

```ts
import { DiscordSDK } from "@discord/embedded-app-sdk";

const discordSdk = new DiscordSDK(DISCORD_CLIENT_ID);

async function setup() {
  await discordSdk.ready(); // The rest of your app logic
}
```

---

## SDK Methods

| Method        | Description                                                                |
| ---           | ---                                                                        |
| `ready()`     | Resolves when your app has successfully connected to the Discord client.   |
| `subscribe()` | Subscribe to an Embedded App SDK event.                                    |
| `unsubscribe()` | Unsubscribe from a previously subscribed SDK event.                      |
| `close()`     | Close your app with a specified close code and optional reason.            |

### `ready()`
- **Platforms:** Web, iOS, Android  
- **Scopes:** None  
- **Signature:** `ready(): Promise<void>`

### `subscribe()`
- **Platforms:** Web, iOS, Android  
- **Scopes:** Depends on the event (see each event’s requirements)  
- **Signature:**
  ```ts
  subscribe<Event>(
    event: Event,
    listener: (data: EventPayloadData<Event>) => void,
    ...subscribeArgs: Partial<EventPayloadData<Event>>
  ): Promise<EventEmitter>
  ```
- **Usage:**
  ```ts
  await discordSdk.subscribe("SDK_EVENT_NAME", eventHandler, args);
  ```

### `unsubscribe()`
- **Platforms:** Web, iOS, Android  
- **Scopes:** None  
- **Signature:**
  ```ts
  unsubscribe<Event>(
    event: Event,
    listener: (data: EventPayloadData<Event>) => void,
    ...subscribeArgs: Partial<EventPayloadData<Event>>
  ): Promise<EventEmitter>
  ```
- **Usage:**
  ```ts
  await discordSdk.unsubscribe("SDK_EVENT_NAME", eventHandler, args);
  ```

### `close()`
- **Platforms:** Web, iOS, Android  
- **Scopes:** None  
- **Signature:** `close(code: RPCCloseCodes, message: string): void`  
- **Usage:**
  ```ts
  discordSdk.close(RPCCloseCodes.CLOSE_NORMAL, "You exited from app");
  ```

---

## SDK Commands

All commands are accessed via `discordSdk.commands.*`.

| Command | Description |
| --- | --- |
| `authenticate` | Authenticate an existing client with your app. |
| `authorize` | Authorize a new client with your app. |
| `captureLog` | Forward logs to your own logger. |
| `encourageHardwareAcceleration` | Presents a modal allowing users to enable hardware acceleration. |
| `getChannel` | Returns information about the provided channel ID. |
| `getChannelPermissions` | Returns the current user’s permissions in the connected channel. |
| `getEntitlements` | Returns a list of entitlements for the current user. |
| `getInstanceConnectedParticipants` | Returns all participants connected to the current Activity instance. |
| `getPlatformBehaviors` | Returns information about supported platform behaviors. |
| `getRelationships` | Returns the current user’s relationships. *(Requires Discord approval)* |
| `getSkus` | Returns a list of your app’s SKUs (priced SKUs only). |
| `initiateImageUpload` | Opens Discord’s file upload flow. |
| `openExternalLink` | Opens an external URL via Discord’s confirmation dialog. |
| `openInviteDialog` | Opens Channel Invite UI without additional OAuth scopes. |
| `openShareMomentDialog` | Opens a dialog to share a Discord CDN media URL. |
| `setActivity` | Updates the user’s Rich Presence for your Activity. |
| `setConfig` | Sets whether PIP (picture-in-picture) is interactive. |
| `setOrientationLockState` | Locks orientation for focused / PIP / grid modes. |
| `shareLink` | Presents a modal for the user to share a link (with optional message/custom_id). |
| `startPurchase` | Launches the purchase flow for a given SKU ID. |
| `userSettingsGetLocale` | Returns the current user’s locale. |

### `authenticate()`
- **Platforms:** Web, iOS, Android  
- **Scopes:** None  
- **Signature:** `authenticate(args: AuthenticateRequest): Promise<AuthenticateResponse>`  
- **Usage:**
  ```ts
  await discordSdk.commands.authenticate({ access_token: "ACCESS_TOKEN_STRING" });
  ```

### `authorize()`
- **Platforms:** Web, iOS, Android  
- **Scopes:** None (command itself has no scopes; you *request* scopes here)  
- **Signature:** `authorize(args: AuthorizeRequest): Promise<AuthorizeResponse>`  
- **Usage:**
  ```ts
  await discordSdk.commands.authorize({
    client_id: DISCORD_CLIENT_ID,
    response_type: "code",
    state: "",
    prompt: "none",
    scope: [
      "identify",
      "guilds",
      // "guilds.members.read",
      // "relationships.read",
      // "rpc.activities.write",
      // "dm_channels.read",
      "applications.commands",
    ],
  });
  ```

### `captureLog()`
- **Platforms:** Web, iOS, Android  
- **Scopes:** None  
- **Signature:** `captureLog(args: CaptureLogRequest): Promise<void>`  
- **Usage:**
  ```ts
  await discordSdk.commands.captureLog({ level: "log", message: "This is my log message!" });
  ```

### `encourageHardwareAcceleration()`
- **Platforms:** Web, iOS, Android  
- **Scopes:** None  
- **Signature:** `encourageHardwareAcceleration(): Promise<EncourageHardwareAccelerationResponse>`  
- **Usage:**
  ```ts
  const { enabled } = await discordSdk.commands.encourageHardwareAcceleration();
  console.log(`Hardware Acceleration is ${enabled === true ? "enabled" : "disabled"}`);
  ```

### `getChannel()`
- **Platforms:** Web, iOS, Android  
- **Scopes:** `guilds` (guild channels); `guilds` & `dm_channels.read` (GDM; requires approval)  
- **Signature:** `getChannel(args: GetChannelRequest): Promise<GetChannelResponse>`  
- **Usage:**
  ```ts
  await discordSdk.commands.getChannel({ channel_id: discordSdk.channelId });
  ```

### `getChannelPermissions()`
- **Platforms:** Web, iOS, Android  
- **Scopes:** `guilds.members.read`  
- **Signature:** `getChannelPermissions(): Promise<GetChannelPermissionsResponse>`  
- **Usage:**
  ```ts
  const { permissions } = await discordSdk.commands.getChannelPermissions();
  ```

### `getEntitlements()`
- **Platforms:** Web, iOS, Android  
- **Scopes:** None  
- **Signature:** `getEntitlements(): Promise<GetEntitlementsResponse>`  
- **Usage:**
  ```ts
  const { entitlements } = await discordSdk.commands.getEntitlements();
  ```

### `getInstanceConnectedParticipants()`
- **Platforms:** Web, iOS, Android  
- **Scopes:** None  
- **Signature:** `getInstanceConnectedParticipants(): Promise<GetInstanceConnectedParticipantsResponse>`  
- **Usage:**
  ```ts
  const { participants } = await discordSdk.commands.getInstanceConnectedParticipants();
  ```

### `getPlatformBehaviors()`
- **Platforms:** Web, iOS, Android  
- **Scopes:** None  
- **Signature:** `getPlatformBehaviors(): Promise<GetPlatformBehaviorsResponse>`  
- **Usage:**
  ```ts
  const res = await discordSdk.commands.getPlatformBehaviors();
  ```

### `getRelationships()`
- **Platforms:** Web, iOS, Android  
- **Scopes:** `relationships.read` *(requires Discord approval)*  
- **Signature:** `getRelationships(): Promise<GetRelationshipsResponse>`  
- **Usage:**
  ```ts
  const { relationships } = await discordSdk.commands.getRelationships();
  ```

### `getSkus()`
- **Platforms:** Web, iOS, Android  
- **Scopes:** None  
- **Signature:** `getSkus(): Promise<GetSkusResponse>`  
- **Usage:**
  ```ts
  const { skus } = await discordSdk.commands.getSkus();
  ```

### `initiateImageUpload()`
- **Platforms:** Web, iOS, Android  
- **Scopes:** None  
- **Signature:** `initiateImageUpload(): Promise<InitiateImageUploadResponse>`  
- **Usage:**
  ```ts
  const res = await discordSdk.commands.initiateImageUpload();
  ```

### `openExternalLink()`
- **Platforms:** Web, iOS, Android  
- **Scopes:** None  
- **Signature:** `openExternalLink(args: OpenExternalLinkRequest): Promise<OpenExternalLinkResponse>`  
- **Usage:**
  ```ts
  const { opened } = await discordSdk.commands.openExternalLink({ url: "https://example.com" });
  ```

### `openInviteDialog()`
- **Platforms:** Web, iOS, Android  
- **Scopes:** None  
- **Signature:** `openInviteDialog(): Promise<void>`  
- **Usage:**
  ```ts
  await discordSdk.commands.openInviteDialog();
  ```

### `openShareMomentDialog()`
- **Platforms:** Web, iOS, Android  
- **Scopes:** None (but you must pass a **Discord CDN** `mediaUrl`)  
- **Signature:** `openShareMomentDialog(args: OpenShareMomentDialogRequest): Promise<void>`  
- **Usage:**
  ```ts
  await discordSdk.commands.openShareMomentDialog({ mediaUrl: "https://cdn.discordapp.com/attachments/..." });
  ```

### `setActivity()`
- **Platforms:** Web, iOS, Android  
- **Scopes:** `rpc.activities.write`  
- **Signature:** `setActivity(args: SetActivityRequest): Promise<Activity>`  
- **Usage:**
  ```ts
  await discordSdk.commands.setActivity({
    activity: {
      type: 0,
      details: "Traveling with a group",
      state: "In Mainframe",
      assets: {
        large_image: "main-game-image",
        large_text: "in a group",
        small_image: "map-mainframe",
        small_text: "in mainframe",
      },
      timestamps: { start: 1723137832 },
      party: { size: [2, 4] },
    },
  });
  ```

### `setConfig()`
- **Platforms:** Web, iOS, Android  
- **Scopes:** None  
- **Signature:** `setConfig(args: SetConfigRequest): Promise<SetConfigResponse>`  
- **Usage:**
  ```ts
  await discordSdk.commands.setConfig({ use_interactive_pip: true });
  ```

### `setOrientationLockState()`
- **Platforms:** Web, iOS, Android  
- **Scopes:** None  
- **Signature:** `setOrientationLockState(args: SetOrientationLockStateRequest): Promise<void>`  
- **Usage:**
  ```ts
  import { Common } from "@discord/embedded-app-sdk";

  await discordSdk.commands.setOrientationLockState({
    lock_state: Common.OrientationLockStateTypeObject.LANDSCAPE,
    picture_in_picture_lock_state: Common.OrientationLockStateTypeObject.LANDSCAPE,
    grid_lock_state: Common.OrientationLockStateTypeObject.UNLOCKED,
  });
  ```

### `shareLink()`
- **Platforms:** Web, iOS, Android  
- **Scopes:** None  
- **Signature:** `shareLink(args: ShareLinkRequest): Promise<ShareLinkResponse>`  
- **Usage:**
  ```ts
  const { success } = await discordSdk.commands.shareLink({
    message: "This message is shared alongside the link!",
    custom_id: "some_custom_id",
  });
  console.log(success ? "User shared link!" : "User did not share link.");
  ```

### `startPurchase()`
- **Platforms:** Web, iOS, Android  
- **Scopes:** None  
- **Signature:** `startPurchase(args: StartPurchaseRequest): Promise<StartPurchaseResponse>`  
- **Usage:**
  ```ts
  await discordSdk.commands.startPurchase({ sku_id: skuId });
  ```

### `userSettingsGetLocale()`
- **Platforms:** Web, iOS, Android  
- **Scopes:** `identify`  
- **Signature:** `userSettingsGetLocale(): Promise<UserSettingsGetLocaleResponse>`  
- **Usage:**
  ```ts
  const { locale } = await discordSdk.commands.userSettingsGetLocale();
  ```

---

## SDK Events

Use `subscribe()` to listen to these events.

| Event | Description | Scopes |
| --- | --- | --- |
| `READY` | Sent immediately after connecting; includes server info. | None |
| `ERROR` | Sent when there is an error (including command errors). | None |
| `VOICE_STATE_UPDATE` | Voice state changes (mute, volume, etc.) in a subscribed voice channel. | `rpc.voice.read` |
| `SPEAKING_START` | A user in a subscribed voice channel starts speaking. | `rpc.voice.read` |
| `SPEAKING_STOP` | A user in a subscribed voice channel stops speaking. | `rpc.voice.read` |
| `ACTIVITY_LAYOUT_MODE_UPDATE` | User changed layout mode (focused, PIP, grid). | None |
| `ORIENTATION_UPDATE` | Screen orientation changed. | None |
| `CURRENT_USER_UPDATE` | Current user object changed. | `identify` |
| `CURRENT_GUILD_MEMBER_UPDATE` | Current guild member object changed. | `identify`, `guilds.members.read` |
| `THERMAL_STATE_UPDATE` | Thermal state surfaced on Android/iOS. | None |
| `ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE` | Instance participants changed. | None |
| `RELATIONSHIP_UPDATE` | A relationship of the current user updated. | `relationships.read` *(approval)* |
| `ENTITLEMENT_CREATE` | (Coming soon) Entitlement created for a SKU. | — |

**Sample Payloads**

`READY`
```json
{
  "v": 1,
  "config": {
    "cdn_host": "cdn.discordapp.com",
    "api_endpoint": "//discord.com/api",
    "environment": "production"
  }
}
```

`ERROR`
```json
{ "code": 4006, "message": "Not authenticated or invalid scope" }
```

`ACTIVITY_LAYOUT_MODE_UPDATE`
```json
{ "layout_mode": 1 }
```

`ORIENTATION_UPDATE`
```json
{ "screen_orientation": 1 }
```

`THERMAL_STATE_UPDATE`
```json
{ "thermal_state": 0 }
```

---

## SDK Interfaces (Selected)

> This section lists commonly used shapes. Field presence may vary by context.

### `Activity` (partial used by `setActivity`)
```ts
interface Activity {
  name: string;
  type: number;
  url?: string | null;
  created_at?: number | null;
  timestamps?: Timestamp | null;
  application_id?: string | null;
  details?: string | null;
  details_url?: string | null;
  state?: string | null;
  state_url?: string | null;
  emoji?: Emoji | null;
  party?: Party | null;
  assets?: Assets | null;
  secrets?: Secrets | null;
  instance?: boolean | null;
  flags?: number | null;
}
```

### `Assets`
```ts
interface Assets {
  large_image?: string | null;
  large_text?: string | null;
  large_url?: string | null;
  small_image?: string | null;
  small_text?: string | null;
  small_url?: string | null;
}
```

### `AuthenticateRequest` / `AuthenticateResponse`
```ts
interface AuthenticateRequest { access_token?: string | null; }
interface AuthenticateResponse {
  access_token: string;
  user: User;
  scopes: string[];
  expires: string;
  application: Application;
}
```

### `AuthorizeRequest` / `AuthorizeResponse`
```ts
interface AuthorizeRequest {
  client_id: string;
  scope: OAuthScopes[];
  response_type?: "code";
  state?: string;
  prompt?: "none";
  code_challenge?: string;
  code_challenge_method?: "S256";
}
interface AuthorizeResponse { code: string; }
```

### `OpenExternalLinkRequest` / `OpenExternalLinkResponse`
```ts
interface OpenExternalLinkRequest { url: string; }
interface OpenExternalLinkResponse { opened: boolean | null; } // null on clients before Dec 2024
```

### `OpenShareMomentDialogRequest`
```ts
interface OpenShareMomentDialogRequest {
  mediaUrl: string; // must be a Discord CDN URL
}
```

### `SetActivityRequest`
```ts
interface SetActivityRequest { activity: Activity; }
```

### `SetConfigRequest` / `SetConfigResponse`
```ts
interface SetConfigRequest { use_interactive_pip: boolean; }
interface SetConfigResponse { use_interactive_pip: boolean; }
```

### `SetOrientationLockStateRequest`
```ts
type OrientationLockState =
  | Common.OrientationLockStateTypeObject.UNLOCKED
  | Common.OrientationLockStateTypeObject.PORTRAIT
  | Common.OrientationLockStateTypeObject.LANDSCAPE;

interface SetOrientationLockStateRequest {
  lock_state: OrientationLockState;
  picture_in_picture_lock_state: OrientationLockState;
  grid_lock_state: OrientationLockState;
}
```

### `ShareLinkRequest` / `ShareLinkResponse`
```ts
interface ShareLinkRequest {
  message: string;
  custom_id?: string;
}
interface ShareLinkResponse { success: boolean; }
```

### `StartPurchaseRequest` / `StartPurchaseResponse`
```ts
interface StartPurchaseRequest { sku_id: string; }
interface StartPurchaseResponse { /* platform-provided result */ }
```

### `User` (partial)
```ts
interface User {
  id: string;
  username: string;
  discriminator: string;
  global_name?: string | null;
  avatar?: string | null;
  avatar_decoration_data?: AvatarDecorationData | null;
  bot: boolean;
  flags?: number | null;
  premium_type?: number | null;
}
```

---

## SDK Enums (Selected)

### `ChannelTypesObject`
```
DM=1, GROUP_DM=3, GUILD_TEXT=0, GUILD_VOICE=2, GUILD_CATEGORY=4, GUILD_ANNOUNCEMENT=5,
ANNOUNCEMENT_THREAD=10, PUBLIC_THREAD=11, PRIVATE_THREAD=12, GUILD_STAGE_VOICE=13,
GUILD_DIRECTORY=14, GUILD_FORUM=15
```

### `ConsoleLevel`
```
"error" | "log" | "warn" | "debug" | "info"
```

### `OrientationLockStateTypeObject`
```
UNHANDLED=-1, UNLOCKED=1, PORTRAIT=2, LANDSCAPE=3
```

### `ThermalStateTypeObject`
```
UNHANDLED=-1, NOMINAL=0, FAIR=1, SERIOUS=2, CRITICAL=3
```

### `OrientationTypeObject`
```
UNHANDLED=-1, PORTRAIT=0, LANDSCAPE=1
```

### `LayoutModeTypeObject`
```
UNHANDLED=-1, FOCUSED=0, PIP=1, GRID=2
```

### `OAuthScopes` (not exhaustive)
```
"bot", "rpc", "identify", "connections", "email", "guilds", "guilds.join",
"guilds.members.read", "gdm.join", "messages.read", "rpc.notifications.read",
"rpc.voice.write", "rpc.voice.read", "rpc.activities.write", "webhook.incoming",
"applications.commands", "applications.builds.upload", "applications.builds.read",
"applications.store.update", "applications.entitlements", "relationships.read",
"activities.read", "activities.write", "dm_channels.read"
```

### `RPCCloseCodes`
```
CLOSE_NORMAL=1000, CLOSE_UNSUPPORTED=1003, CLOSE_ABNORMAL=1006,
INVALID_CLIENTID=4000, INVALID_ORIGIN=4001, RATELIMITED=4002, TOKEN_REVOKED=4003,
INVALID_VERSION=4004, INVALID_ENCODING=4005
```

### `SkuTypeObject`
```
APPLICATION=1, DLC=2, CONSUMABLE=3, BUNDLE=4, SUBSCRIPTION=5
```

### Relationship Types
```
0=None, 1=Friend, 2=Blocked, 3=Pending Incoming, 4=Pending Outgoing, 5=Implicit, 6=Suggestion
```

---

> **Notes**
> - Some features (e.g., `relationships.read`, `dm_channels.read`) require Discord approval.
> - Older Discord clients may not support newer commands/events; handle `RPCErrorCodes.INVALID_COMMAND` where appropriate.
> - Payload shapes are simplified for clarity; refer to the official type definitions for exhaustive fields.
