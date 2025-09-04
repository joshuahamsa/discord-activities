**On this page** Install the SDK SDK Methods SDK Commands SDK Events SDK Interfaces SDK Enums **MONETIZATION DISCOVERY** 

##### Using with the 

##### Embedded App SDK 

##### Using with the 

##### Discord Social SDK 

##### Using with 

##### the Game 

##### SDK 

 LEGACY 

##### Best Practices 

##### Overview 

##### Enabling 

##### Monetization 

##### Managing SKUs 

##### Implementing App 

##### Subscriptions 

##### Implementing One

##### Time Purchases 

##### Implementing IAP for 

##### Activities 

##### Overview 

# Embedded App 

# SDK Reference 

##### The Embedded App SDK handles making RPC calls 

##### between your application and Discord. It is designed to 

##### assist developers in developing interactive Activities like 

##### games. 

##### To learn more about building Activities, check out our 

##### Building an Activity tutorial or explore our Sample Projects. 

## Install the SDK 

##### The Embedded App SDK is available via npm and GitHub. 

##### In your frontend JavaScript project directory, install using 

##### your package manager of choice. 

##### Search ⌘ K 


**EVENTS DEVELOPER TOOLS** 

##### Enabling Discovery 

##### Best Practices 

##### Overview 

##### Using Gateway 

##### Gateway Events 

##### Webhook Events 

##### Embedded App SDK 

##### After installing, you can import and instantiate the SDK in 

##### your project. 

## SDK Methods 

 NAME DESCRIPTION ready Resolves when your app has successfully connected to the Discord client subscribe Subscribe to an Embedded App SDK Event unsubscribe Unsubscribe to an Embedded App SDK Event close Close an Embedded App 

### ready() 

##### Resolves when your app has successfully connected to the 

 npm install @discord/embedded-app-sdk import { DiscordSDK } from "@discord/embedded-app-sdk"; const discordSdk = new DiscordSDK(DISCORD_CLIENT_ID); 


##### Discord client. 

 WEB IOS ANDROID 

##### No scopes required 

##### ready(): Promise<void> 

### subscribe() 

#### Supported Platforms 

#### Required Scopes 

#### Signature 

#### SDK Usage 

 async function setup() { await discordSdk.ready(); // The rest of your app logic } 


##### Used to subscribe to a speci!c event from the list of SDK 

##### Events. 

 WEB IOS ANDROID 

##### Depends on the event. Refer to the Required Scopes for the 

##### speci!c event you are subscribing to. 

##### subscribe<Event>(event: Event, listener: 

##### (data: EventPayloadData<Event>) => void, 

##### ...subscribeArgs: 

##### Partial<EventPayloadData<Event>>): 

##### Promise<EventEmitter> 

### unsubscribe() 

#### Supported Platforms 

#### Required Scopes 

#### Signature 

#### Usage 

 await discordSdk.subscribe("SDK_EVENT_NAME", eventHandler, args); 


### unsubscribe() 

##### Used to unsubscribe to SDK Events that your app has 

##### already subscribed to. 

 WEB IOS ANDROID 

##### No scopes required 

##### The EventPayloadData will vary based on the event you 

##### are unsubscribing from. See the speci!c event for details. 

##### unsubscribe<Event>(event: Event, listener: 

##### (data: EventPayloadData<Event>) => void, 

##### ...subscribeArgs: 

##### Partial<EventPayloadData<Event>>): 

##### Promise<EventEmitter> 

#### Supported Platforms 

#### Required Scopes 

#### Signature 

#### Usage 


### close() 

##### Used to close your app with a speci!ed code and reason. 

 WEB IOS ANDROID 

##### No scopes required 

##### close(code: RPCCloseCodes, message: 

##### string): void 

 await discordSdk.unsubscribe("SDK_EVENT_NAME"); 

#### Supported Platforms 

#### Required Scopes 

#### Signature 

#### SDK Usage 

 discordSdk.close(RPCCloseCodes.CLOSE_NORMAL, "You exited from app"); 


## SDK Commands 

##### Developers can use these commands to interact with the 

##### Discord client. The following SDK commands are pre!xed 

##### with .commands , such as, 

##### discordSDK.commands.authenticate. 

 NAME DESCRIPTION authenticate Authenticate an existing client with your app authorize Authorize a new client with your app captureLog Forward logs to your own logger encourageHardwareAccele ration Presents a modal dialog to allow enabling of hardware acceleration getChannel Returns information about the channel, per the channel_id getChannelPermissions Returns permissions for the current user in the currently connected channel getEntitlements Returns a list of entitlements for the current user 


getInstanceConnectedPar ticipants Returns all participants connected to the instance getPlatformBehaviors Returns information about supported platform behaviors getRelationships Returns the current user's relationships getSkus Returns a list of your app's SKUs initiateImageUpload Presents the !le upload "ow in the Discord client openExternalLink Allows for opening an external link from within the Discord client openInviteDialog Presents a modal dialog with Channel Invite UI without requiring additional OAuth scopes openShareMomentDialog Presents a modal dialog to share media to a channel or DM setActivity Modi!es how your activity's rich presence is displayed in the Discord client setCon!g Set whether or not the PIP (picture-in-picture) is interactive setOrientationLockState Set options for orientation and picture-in-picture (PIP) modes 


 shareLink Presents a modal for the user to share a link to your activity with custom query params startPurchase Launches the purchase "ow for a speci!c SKU, per the sku_id userSettingsGetLocale Returns the current user's locale 

### authenticate() 

##### Authenticate an existing client with your app. 

 WEB IOS ANDROID 

##### No scopes required 

##### authenticate(args: AuthenticateRequest): 

##### Promise<AuthenticateResponse> 

#### Supported Platforms 

#### Required Scopes 

#### Signature 


### authorize() 

##### Authorize a new client with your app. 

 WEB IOS ANDROID 

##### No scopes required 

##### authorize(args: AuthorizeRequest): 

##### Promise<AuthorizeResponse> 

#### Usage 

 await discordSdk.commands.authenticate({ access_token: 'ACCESS_TOKEN_STRING' }); 

#### Supported Platforms 

#### Required Scopes 

#### Signature 


### captureLog() 

#### Usage 

 await discordSdk.commands.authorize({ client_id: DISCORD_CLIENT_ID, response_type: "code", state: "", prompt: "none", scope: [ // "applications.builds.upload", // "applications.builds.read", // "applications.store.update", // "applications.entitlements", // "bot", "identify", // "connections", // "email", // "gdm.join", "guilds", // "guilds.join", // "guilds.members.read", // "messages.read", // "relationships.read", // 'rpc.activities.write', // "rpc.notifications.read", // "rpc.voice.write", // "rpc.voice.read", // "webhook.incoming", ], }); 


### captureLog() 

##### Forward logs to your own logger. 

 WEB IOS ANDROID 

##### No scopes required 

##### captureLog(args: CaptureLogRequest): 

##### Promise<void> 

### encourageHardwareAcceleration() 

#### Supported Platforms 

#### Required Scopes 

#### Signature 

#### Usage 

 await discordSdk.commands.captureLog({ level: 'log', message: 'This is my log message!' }); 


### encourageHardwareAcceleration() 

##### Presents a modal dialog to allow enabling of hardware 

##### acceleration. 

 WEB IOS ANDROID 

##### No scopes required 

##### encourageHardwareAcceleration(): 

##### Promise<EncourageHardwareAccelerationResponse> 

### getChannel() 

#### Supported Platforms 

#### Required Scopes 

#### Signature 

#### Usage 

 await discordSdk.commands.encourageHardwareAcceleration(); 


##### Returns information about the channel for a provided 

##### channel ID. 

 WEB IOS ANDROID 

##### [guilds] for guild channels 

##### [guilds, dm_channels.read] for GDM channels. 

##### dm_channels.read requires approval from Discord. 

##### getChannel(args: GetChannelRequest): 

##### Promise<GetChannelResponse> 

### getChannelPermissions() 

#### Supported Platforms 

#### Required Scopes 

#### Signature 

#### Usage 

 await discordSdk.commands.getChannel({ channel_id: discordSdk.channelId, }); 


### getChannelPermissions() 

##### Returns permissions for the current user in the currently 

##### connected channel. 

 WEB IOS ANDROID 

##### guilds.members.read 

##### getChannelPermissions(): 

##### Promise<GetChannelPermissionsResponse> 

### getEntitlements() 

#### Supported Platforms 

#### Required Scopes 

#### Signature 

#### Usage 

 await discordSdk.commands.getChannelPermissions(); 


##### Returns a list of entitlements for the current user. 

 WEB IOS ANDROID 

##### No scopes required 

##### getEntitlements(): 

##### Promise<GetEntitlementsResponse> 

### getInstanceConnectedParticipants() 

##### Returns all participants connected to the instance. 

#### Supported Platforms 

#### Required Scopes 

#### Signature 

#### Usage 

 await discordSdk.commands.getEntitlements(); 


 WEB IOS ANDROID 

##### No scopes required 

##### getInstanceConnectedParticipants(): 

##### Promise<GetInstanceConnectedParticipantsResponse> 

### getPlatformBehaviors() 

##### Returns information about supported platform behaviors. 

 WEB IOS ANDROID 

#### Supported Platforms 

#### Required Scopes 

#### Signature 

#### Usage 

 await discordSdk.commands.getInstanceConnectedParticipants(); 

#### Supported Platforms 


##### No scopes required 

##### getPlatformBehaviors(): 

##### Promise<GetPlatformBehaviorsResponse> 

### getRelationships() 

##### Returns the current user's relationships. 

 WEB IOS ANDROID 

#### Required Scopes 

#### Signature 

#### Usage 

 await discordSdk.commands.getPlatformBehaviors(); 

#### Supported Platforms 


##### relationships.read 

##### Requires Discord approval 

##### getRelationships(): 

##### Promise<GetRelationshipsResponse> 

### getSkus() 

##### Returns a list of SKU objects. SKUs without prices are 

##### automatically !ltered out. 

 WEB IOS ANDROID 

#### Required Scopes 

#### Signature 

#### Usage 

 await discordSdk.commands.getRelationships(); 

#### Supported Platforms 


##### No scopes required 

##### getSkus(): Promise<GetSkusResponse> 

### initiateImageUpload() 

##### Presents the !le upload "ow in the Discord client. 

 WEB IOS ANDROID 

##### No scopes required 

#### Required Scopes 

#### Signature 

#### Usage 

 await discordSdk.commands.getSkus(); 

#### Supported Platforms 

#### Required Scopes 


##### initiateImageUpload(): 

##### Promise<InitiateImageUploadResponse> 

### openExternalLink() 

##### Allows for opening an external link from within the Discord 

##### client. 

 WEB IOS ANDROID 

##### No scopes required 

#### Signature 

#### Usage 

 await discordSdk.commands.initiateImageUpload(); 

#### Supported Platforms 

#### Required Scopes 

#### Signature 


##### openExternalLink(args: 

##### OpenExternalLinkRequest): 

##### Promise<OpenExternalLinkResponse> 

### openInviteDialog() 

##### Presents a modal dialog with Channel Invite UI without 

##### requiring additional OAuth scopes. 

 WEB IOS ANDROID 

##### No scopes required 

#### Usage 

 await discordSdk.commands.openExternalLink({ url: 'string url' }); 

#### Supported Platforms 

#### Required Scopes 


##### openInviteDialog(): Promise<void> 

### openShareMomentDialog() 

##### Presents a modal dialog to share media to a channel or 

##### direct message. 

 WEB IOS ANDROID 

##### No scopes required 

#### Signature 

#### Usage 

 await discordSdk.commands.openInviteDialog(); 

#### Supported Platforms 

#### Required Scopes 

#### Signature 


##### openShareMomentDialog(args: 

##### OpenShareMomentDialogRequest) 

##### Promise<void> 

### setActivity() 

##### Modi!es how your Activity's Rich Presence data is 

##### displayed in the Discord client. The inner activity !eld is 

##### a partial Activity object. 

##### Read the guide on Using Rich Presence with the Embedded 

##### App SDK for more usage details. 

 WEB IOS ANDROID 

#### Usage 

 await discordSdk.commands.openShareMomentDialog({ mediaUrl: 'DISCORD_CDN_URL' }); 

#### Supported Platforms 


##### rpc.activities.write 

##### setActivity(args: SetActivityRequest): 

##### Promise<Activity> 

### setCon!g() 

##### Set whether or not the PIP (picture-in-picture) is 

##### interactive. 

 WEB IOS ANDROID 

#### Required Scopes 

#### Signature 

#### Usage 

 await discordSdk.commands.setActivity({ activity: { type: 0 , details: 'Details', state: 'Playing' } }); 

#### Supported Platforms 


##### No scopes required 

##### setConfig(args: SetConfigRequest): 

##### Promise<SetConfigResponse> 

### setOrientationLockState() 

##### Locks the application to speci!c orientations in each of the 

##### supported layout modes. 

#### Required Scopes 

#### Signature 

#### Usage 

 await discordSdk.commands.setConfig({ use_interactive_pip: true }) 

#### Supported Platforms 


 WEB IOS ANDROID 

##### No scopes required 

##### setOrientationLockState(args: 

##### SetOrientationLockStateRequest): 

##### Promise<void> 

### shareLink() 

#### Required Scopes 

#### Signature 

#### Usage 

 import {Common} from '@discord/embedded-app-sdk'; await discordSdk.commands.setOrientationLockState({ lock_state: Common.OrientationLockStateTypeObject.LANDSCAPE, picture_in_picture_lock_state: Common.OrientationLockStateTypeObject.LANDSCAPE, grid_lock_state: Common.OrientationLockStateTypeObject.UNLOCKED }); 


##### Presents the user with a modal to share a link 

 WEB IOS ANDROID 

##### No scopes required 

##### shareLink(args: ShareLinkRequest): 

##### Promise<ShareLinkResponse><void> 

### startPurchase() 

#### Supported Platforms 

#### Required Scopes 

#### Signature 

#### Usage 

 const { success } = await discordSdk.commands.shareLink({ message: 'This message is shared alongside the link!', custom_id: 'some_custom_id', }); success? console.log('User shared link!') : console.log('User did not share link 


### startPurchase() 

##### Launches the purchase "ow for a speci!c SKU ID. 

 WEB IOS ANDROID 

##### No scopes required 

##### startPurchase(args: StartPurchaseRequest): 

##### Promise<StartPurchaseResponse> 

### userSettingsGetLocale() 

#### Supported Platforms 

#### Required Scopes 

#### Signature 

#### Usage 

 await discordSdk.commands.startPurchase({sku_id: skuId}); 


##### Returns the current user's locale. 

 WEB IOS ANDROID 

##### identify 

##### userSettingsGetLocale(): 

##### Promise<UserSettingsGetLocaleResponse> 

## SDK Events 

##### Developers may use the following events alongside the 

##### subscribe() SDK method to subscribe to events from 

#### Supported Platforms 

#### Required Scopes 

#### Signature 

#### Usage 

 await discordSdk.commands.userSettingsGetLocale(); 


##### Discord and supported devices. 

 NAME DESCRIPTION READY non-subscription event sent immediately after connecting, contains server information ERROR non-subscription event sent when there is an error, including command responses VOICE_STATE_UPDATE sent when a user's voice state changes in a subscribed voice channel (mute, volume, etc.) SPEAKING_START sent when a user in a subscribed voice channel speaks SPEAKING_STOP sent when a user in a subscribed voice channel stops speaking ACTIVITY_LAYOUT_MODE_UP DATE Received when a user changes the layout mode in the Discord client ORIENTATION_UPDATE Received when screen orientation changes CURRENT_USER_UPDATE Received when the current user object changes 


###### CURRENT_GUILD_MEMBER_ 

###### UPDATE 

 Received when the current guild member object changes THERMAL_STATE_UPDATE Received when Android or iOS thermal states are surfaced to the Discord app ACTIVITY_INSTANCE_PARTICI PANTS_UPDATE Received when the number of instance participants changes RELATIONSHIP_UPDATE Received when a relationship of the current user is updated ENTITLEMENT_CREATE Received when an entitlement is created for a SKU 

### READY 

##### Non-subscription event sent immediately after connecting, 

##### contains server information. 

##### No scopes required 

#### Required Scopes 

#### Sample Event Payload 

###### { 

 "v": 1 , 


### ERROR 

##### Non-subscription event sent when there is an error, 

##### including command responses. 

##### No scopes required 

### VOICE_STATE_UPDATE 

 "config": { "cdn_host": "cdn.discordapp.com", "api_endpoint": "//discord.com/api", "environment": "production" } } 

#### Required Scopes 

#### Sample Event Payload 

###### { 

 "code": 4006 , "message": "Not authenticated or invalid scope" } 


##### Received when a user's voice state changes in a subscribed 

##### voice channel (mute, volume, etc). 

##### rpc.voice.read 

#### Required Scopes 

#### Sample Event Payload 

###### { 

 "voice_state": { "mute": false, "deaf": false, "self_mute": false, "self_deaf": false, "suppress": false }, "user": { "id": "190320984123768832", "username": "test 2", "discriminator": "7479", "avatar": "b004ec1740a63ca06ae2e14c5cee11f3", "bot": false }, "nick": "test user 2", "volume": 110 , "mute": false, "pan": { "left": 1.0, "right": 1.0 } 


### SPEAKING_START 

##### Received when a user in a subscribed voice channel speaks. 

##### rpc.voice.read 

### SPEAKING_STOP 

##### Received when a user in a subscribed voice channel stops 

##### speaking. 

###### } 

#### Required Scopes 

#### Sample Event Payload 

###### { 

 "channel_id": "7173758092142710784", "user_id": "7173758143913005056" } 


##### rpc.voice.read 

### ACTIVITY_LAYOUT_MODE_UPDATE 

##### Received when a user changes the layout mode in the 

##### Discord client. 

##### No scopes required 

#### Required Scopes 

#### Sample Event Payload 

###### { 

 "channel_id": "7173758211307081728", "user_id": "7173758261412237312" } 

#### Required Scopes 

#### Sample Event Payload 

###### { 

 "layout_mode": 1 } 


### ORIENTATION_UPDATE 

##### Received when screen orientation changes. 

##### No scopes required 

### CURRENT_USER_UPDATE 

##### Received when the current user object changes. 

##### identify 

#### Required Scopes 

#### Sample Event Payload 

###### { 

 "screen_orientation": 1 } 

#### Required Scopes 

#### Sample Event Payload 


### CURRENT_GUILD_MEMBER_UPDATE 

##### Received when the current guild member object changes. 

##### identify 

##### guilds.members.read 

###### { 

 "id": "7173771622812225536", "username": "beef_supreme", "discriminator": "0", "global_name": "Dis Cord", "avatar": "abcdefg", "avatar_decoration_data": { "asset": "abcdefg", "sku_id": "123456789" }, "bot": false, "flags": 1 , "premium_type": 2 } 

#### Required Scopes 

#### Sample Event Payload 

###### { 


### THERMAL_STATE_UPDATE 

##### Received when Android or iOS thermal states are surfaced 

##### to the Discord mobile app. 

##### No scopes required 

 "user_id": "7173771622812225536", "nick": "beef_supreme", "guild_id": "613425648685547541" "avatar": "abcdefg", "avatar_decoration_data": { "asset": "abcdefg", "sku_id": "123456789" }, "color_string": "#ffff00" } 

#### Required Scopes 

#### Sample Event Payload 

###### { 

 thermal_state: 0 } 


### ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE 

##### Received when the number of instance participants 

##### changes. 

##### No scopes required 

#### Required Scopes 

#### Sample Event Payload 

###### { 

 "participants": [ { "id": "7173771622812225536", "username": "beef_supreme", "discriminator": "0", "global_name": "Dis Cord", "avatar": "abcdefg", "avatar_decoration_data": { "asset": "abcdefg", "sku_id": "123456789" }, "bot": false, "flags": 1 , "premium_type": 2 } ] 


### RELATIONSHIP_UPDATE 

##### Received when a relationship of the current user is 

##### updated. 

##### relationships.read 

##### Requires Discord approval 

###### } 

#### Required Scopes 

#### Sample Event Payload 

###### { 

 "type": 1 , "user": { "id": "7173771622812225536", "username": "beef_supreme", "discriminator": "0", "global_name": "Dis Cord", "avatar": "abcdefg", "avatar_decoration_data": { "asset": "abcdefg", "sku_id": "123456789" 


### ENTITLEMENT_CREATE 

##### Coming soon! Not available during Developer Preview 

## SDK Interfaces 

 PROPERTY TYPE name string type number url? string | null created_at? number | null 

###### }, 

 "bot": false, "flags": 1 , "premium_type": 2 } } 

#### Activity 


 timestamps? Timestamp | null application_id? string | null details? string | null details_url? string | null state? string | null state_url? string | null emoji? Emoji | null party? Party | null assets? Assets | null secrets? Secrets | null instance? boolean | null "ags? number | null PROPERTY TYPE large_image? string | null large_text? string | null large_url? string | null 

#### Assets 


 small_image? string | null small_text? string | null small_url? string | null PROPERTY TYPE description string icon? string | null id string rpc_origins? string[] name string PROPERTY TYPE id string !lename string size number url string proxy_url string 

#### Application 

#### Attachment 


 height? number | null width? number | null PROPERTY TYPE access_token? string | null PROPERTY TYPE access_token string user User scopes string[] expires string application Application PROPERTY TYPE client_id string scope OAuthScopes[] 

#### AuthenticateRequest 

#### AuthenticateResponse 

#### AuthorizeRequest 


 response_type? 'code' code_challenge? string state? string prompt? 'none' code_challenge_method? 'S256' PROPERTY TYPE code string PROPERTY TYPE asset string sku_id? string | null PROPERTY TYPE level ConsoleLevel message string 

#### AuthorizeResponse 

#### AvatarDecorationData 

#### CaptureLogRequest 


 PROPERTY TYPE id string guild_id string type number name string PROPERTY TYPE title? string | null type? string | null description? string | null url? string | null timestamp? string | null color? number | null footer? EmbedFooter | null image? Image | null thumbnail? Image | null 

#### ChannelMention 

#### Embed 


 video? Video | null provider? EmbedProvider | null author? EmbedAuthor | null !elds? EmbedField[] | null PROPERTY TYPE name? string | null url? string | null icon_url? string | null proxy_icon_url? string | null PROPERTY TYPE name string value string inline boolean 

#### EmbedAuthor 

#### EmbedField 

#### EmbedFooter 


 PROPERTY TYPE text string icon_url? string | null proxy_icon_url? string | null PROPERTY TYPE name? string | null url? string | null PROPERTY TYPE id string name? string | null roles? string[] | null user? User | null require_colons? boolean | null managed? boolean | null animated? boolean | null 

#### EmbedProvider 

#### Emoji 


 available? boolean | null PROPERTY TYPE enabled boolean PROPERTY TYPE id string sku_id string application_id string user_id string gift_code_"ags number type string | number gifter_user_id? string | null branches? string[] | null starts_at? string | null ends_at? string | null parent_id? string | null 

#### EncourageHardwareAccelerationResponse 

#### Entitlement 


 consumed? boolean | null deleted? boolean | null gift_code_batch_id? string | null PROPERTY TYPE permissions bigint | string PROPERTY TYPE channel_id string PROPERTY TYPE id string type ChannelTypesObject guild_id? string | null name? string | null topic? string | null 

#### GetChannelPermissionsResponse 

#### GetChannelRequest 

#### GetChannelResponse 


 bitrate? number | null user_limit? number | null position? number | null voice_states UserVoiceState[] messages Message[] PROPERTY TYPE entitlements Entitlement[] PROPERTY TYPE participants User[] PROPERTY TYPE iosKeyboardResizesView? boolean PROPERTY TYPE 

#### GetEntitlementsResponse 

#### GetInstanceConnectedParticipantsResponse 

#### GetPlatformBehaviorsResponse 

#### GetRelationshipsResponse 


 relationships Relationship[] PROPERTY TYPE skus Sku[] PROPERTY TYPE user User nick? string | null roles string[] joined_at string deaf boolean mute boolean PROPERTY TYPE user_id string nick? string | null 

#### GetSkusResponse 

#### GuildMember 

#### GuildMemberRPC 


 guild_id string avatar? string | null avatar_decoration_data? AvatarDecorationData | null color_string? string | null PROPERTY TYPE url? string | null proxy_url? string | null height? number | null width? number | null PROPERTY TYPE image_url string PROPERTY TYPE id string 

#### Image 

#### InitiateImageUploadResponse 

#### Message 


channel_id string guild_id? string | null author? User | null member? GuildMember | null content string timestamp string edited_timestamp? string | null tts boolean mention_everyone boolean mentions User[] mention_roles string[] mention_channels ChannelMention[] attachments Attachment[] embeds Embed[] reactions? Reaction[] | null nonce? string pinned boolean webhook_id? string | null 


 type number activity? MessageActivity | null application? MessageApplication | null message_reference? MessageReference | null "ags? number stickers? Sticker[] | null referenced_message? Message | null PROPERTY TYPE type number party_id? string | null PROPERTY TYPE id string cover_image? string | null description string 

#### MessageActivity 

#### MessageApplication 


 icon? string | null name string PROPERTY TYPE message_id? string | null channel_id? string | null guild_id? string | null PROPERTY TYPE url string 

##### { opened: null } is returned on Discord clients 

##### before December 2024 that do not report the open 

##### link result. 

 PROPERTY TYPE opened boolean | null 

#### MessageReference 

#### OpenExternalLinkRequest 

#### OpenExternalLinkResponse 


 PROPERTY TYPE mediaUrl string PROPERTY TYPE id? string | null size? number[] | null PROPERTY TYPE count number me boolean emoji Emoji PROPERTY TYPE type number user User 

#### OpenShareMomentDialogRequest 

#### Party 

#### Reaction 

#### Relationship 


 PROPERTY TYPE join? string match? string PROPERTY TYPE activity Activity PROPERTY TYPE use_interactive_pip boolean PROPERTY TYPE use_interactive_pip boolean PROPERTY TYPE lock_state OrientationLockState 

#### Secrets 

#### SetActivityRequest 

#### SetCon!gRequest 

#### SetCon!gResponse 

#### SetOrientationLockStateRequest 


 picture_in_picture_lock_state OrientationLockState grid_lock_state OrientationLockState PROPERTY TYPE custom_id? string message string PROPERTY TYPE success boolean PROPERTY TYPE id string name string type SkuTypeObject price SkuPrice application_id string 

#### ShareLinkRequest 

#### ShareLinkResponse 

#### Sku 


 "ags number release_date string | null PROPERTY TYPE amount number currency string PROPERTY TYPE sku_id string VALUE Entitlement[] | null PROPERTY TYPE start? number end? number 

#### SkuPrice 

#### StartPurchaseRequest 

#### StartPurchaseResponse 

#### Timestamp 


 PROPERTY TYPE id string username string discriminator string global_name? string | null avatar? string | null avatar_decoration_data AvatarDecorationData | null bot boolean "ags? number | null premium_type? number | null PROPERTY TYPE locale string PROPERTY TYPE 

#### User 

#### UserSettingsGetLocaleResponse 

#### UserVoiceState 


 mute boolean nick string user User voice_state VoiceState volume number PROPERTY TYPE url? string | null height? number | null width? number | null PROPERTY TYPE mute boolean deaf boolean self_mute boolean self_deaf boolean suppress boolean 

#### Video 

#### VoiceState 


## SDK Enums 

 NAME VALUE UNHANDLED -1 DM 1 GROUP_DM 3 GUILD_TEXT 0 GUILD_VOICE 2 GUILD_CATEGORY 4 GUILD_ANNOUNCEMENT 5 GUILD_STORE 6 ANNOUNCEMENT_THREAD 10 PUBLIC_THREAD 11 PRIVATE_THREAD 12 GUILD_STAGE_VOICE 13 

#### ChannelTypesObject 


###### GUILD_DIRECTORY 14 

###### GUILD_FORUM 15 

 VALUE 'error' 'log' 'warn' 'debug' 'info' NAME VALUE UNHANDLED -1 UNLOCKED 1 PORTRAIT 2 LANDSCAPE 3 

#### ConsoleLevel 

#### OrientationLockStateTypeObject 

#### ThermalStateTypeObject 


 NAME VALUE UNHANDLED -1 NOMINAL 0 FAIR 1 SERIOUS 2 CRITICAL 3 NAME VALUE UNHANDLED -1 PORTRAIT 0 LANDSCAPE 1 NAME VALUE UNHANDLED -1 FOCUSED 0 PIP 1 GRID 2 

#### OrientationTypeObject 

#### LayoutModeTypeObject 


 VALUE 'bot' 'rpc' 'identify' 'connections' 'email' 'guilds' 'guilds.join' 'guilds.members.read' 'gdm.join' 'messages.read' 'rpc.noti!cations.read' 'rpc.voice.write' 'rpc.voice.read' 'rpc.activities.write' 'webhook.incoming' 'applications.commands' 

#### OAuthScopes 


 'applications.builds.upload' 'applications.builds.read' 'applications.store.update' 'applications.entitlements' 'relationships.read' 'activities.read' 'activities.write' 'dm_channels.read' NAME CODE CLOSE_NORMAL 1000 CLOSE_UNSUPPORTED 1003 CLOSE_ABNORMAL 1006 INVALID_CLIENTID 4000 INVALID_ORIGIN 4001 RATELIMITED 4002 TOKEN_REVOKED 4003 

#### RPCCloseCodes 


###### INVALID_VERSION 4004 

###### INVALID_ENCODING 4005 

 NAME VALUE UNHANDLED -1 APPLICATION 1 DLC 2 CONSUMABLE 3 BUNDLE 4 SUBSCRIPTION 5 VALU E NAME DESCRIPTION 0 None The user has no relationship with the other user. 1 Friend The user is friends with the other user. 2 Blocked The current user has blocked the target user. 

#### SkuTypeObject 

#### Relationship Types 


3 Pending Incoming The current user has received a friend request from the target user, but it is not yet accepted. 4 Pending Outgoing The current user has sent a friend request to the target user, but it is not yet accepted. 5 Implicit The Implicit type is documented for visibility, but should be unused in the SDK. 6 Suggestion The Suggestion type is documented for visibility, but should be unused in the SDK. 


