**On this page** Activity Instance Management Instance Participants Render Avatars and Names Preventing unwanted activity sessions **QUICK START INTERACTIONS COMPONENTS ACTIVITIES** 

#### API Reference 

#### Overview of Apps 

#### Getting Started 

#### Overview 

#### Receiving and 

#### Responding 

#### Application 

#### Commands 

#### Overview 

#### Using Message 

#### Components 

#### Using Modal 

#### Components 

#### Component 

#### Reference 

#### Home > Activities > Development Guides > Multiplayer 

#### Experience 

# Multiplayer 

# Experience 

## Activity Instance Management 

#### When a user clicks "Join Application", they expect to enter 

#### the same application that their friends are participating in. 

#### Whether the application is a shared drawing canvas, board 

#### game, collaborative playlist, or !rst-person shooter; the 

#### two users should have access to the same shared data. In 

#### this documentation, we refer to this shared data as an 

#### application instance. 

#### Search ⌘ K 


#### Overview 

#### How Activities Work 

#### Quickstart 

#### Development Guides 

#### Local Development 

#### User Actions 

#### Mobile 

#### Layout 

#### Networking 

#### Multiplayer 

#### The Embedded App SDK allows your app to talk 

#### bidirectionally with the Discord Client. The instanceId is 

#### necessary for your application, as well as Discord, to 

#### understand which unique instance of an application it is 

#### talking to. 

#### The instanceId attribute is available as soon as the SDK 

#### is constructed, and does not require the SDK to receive a 

#### ready payload from the Discord client. 

#### The instanceId should be used as a key to save and load 

#### the shared data relevant to an application. This ensures 

### Using instanceId 

 import {DiscordSDK} from '@discord/embedded-app-sdk'; const discordSdk = new DiscordSDK(clientId); // available immediately const instanceId = discordSdk.instanceId; 


#### that two users who are in the same application instance 

#### have access to the same shared data. 

#### Semantics of instanceId 

#### Instance IDs are generated when a user launches an 

#### application. Any users joining the same application will 

#### receive the same instanceId. When all the users of an 

#### application in a channel leave or close the application, that 

#### instance has !nished its lifecycle, and will not be used 

#### again. The next time a user opens the application in that 

#### channel, a new instanceId will be generated. 

## Instance Participants 

#### Instance Participants are any Discord user actively 

#### connected to the same Application Instance. This data can 

#### be fetched or subscribed to. 

 import {DiscordSDK, Events, type Types} from '@discord/embedded-app-sdk'; const discordSdk = new DiscordSDK('...'); await discordSdk.ready(); // Fetch 


## Render Avatars and Names 

#### Check out detailed documentation on where and how 

#### Discord stores common image assets here. 

#### Here's a basic example for retrieving a user's avatar and 

#### username 

 const participants = await discordSdk.commands.getInstanceConnectedParticipants() // Subscribe function updateParticipants(participants: Types.GetActivityInstanceConnectedParti // Do something really cool } discordSdk.subscribe(Events.ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE, updateParticip // Unsubscribe discordSdk.unsubscribe(Events.ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE, updatePartic // We'll be referencing the user object returned from authenticate const {user} = await discordSdk.commands.authenticate({ access_token: accessToken, }); let avatarSrc = ''; if (user.avatar) { avatarSrc = https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?s } else { 


#### In order to retrieve a user's guild-speci!c avatar and 

#### nickname, your application must request the 

#### guilds.members.read scope. Note, this only grants the 

#### information for that instance of the application's user. To 

#### display the guild-speci!c avater/nickname for all 

#### application users, any info retrieved from 

#### guilds.members.read scope'd API calls must be shared 

#### via your application's server. 

#### Here's an example of how to retrieve the user's guild

#### speci!c avatar and nickname: 

 const defaultAvatarIndex = (BigInt(user.id) >> 22n) % 6n; avatarSrc = https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png } const username = user.global_name ?? ${user.username}#${user.discriminator}; // Then in your HTML/JSX/etc... <img alt="avatar" src={avatarSrc} /> <p>{username}</p> 

### Rendering guild-speci!c avatars and nicknames 

 // We'll be referencing the user object returned from authenticate const {user} = await discordSdk.commands.authenticate({ access_token: accessToken, }); 


#### This example is being done entirely on the client, however, a 

#### more common pattern is to instead, do the following: 

#### Store the user's access token on the application 

#### server 

 // When using the proxy, you may instead replace https://discord.com with /dis // or whatever url mapping you have chosen via the developer portal fetch(https://discord.com/api/users/@me/guilds/${discordSdk.guildId}/member, { method: 'GET', headers: { Authorization: Bearer ${accessToken}, }, }) .then((response) => { return response.json(); }) .then((guildsMembersRead) => { let guildAvatarSrc = ''; // Retrieve the guild-specific avatar, and fallback to the user's avatar if (guildsMembersRead?.avatar) { guildAvatarSrc = https://cdn.discordapp.com/guilds/${discordSdk.guildId}/u } else if (user.avatar) { guildAvatarSrc = https://cdn.discordapp.com/avatars/${user.id}/${user.avat } else { const defaultAvatarIndex = (BigInt(user.id) >> 22n) % 6n; avatarSrc = https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex} } // Retrieve the guild-specific nickname, and fallback to the username#discrim const guildNickname = guildsMembersRead?.nick ?? (user.global_name ?? ${user }); 


#### Retrieve the user's guild-speci!c avatar and 

#### nickname via the application's server 

#### Serve all of the application's avatar/nicknames via 

#### the application's server 

## Preventing unwanted activity 

## sessions 

#### Activities are surfaced through iframes in the Discord app. 

#### The activity website itself is publicly reachable at 

#### <application_id>.discordsays.com. Activities will 

#### expect to be able to communicate with Discord's web or 

#### mobile client via the Discord SDK's RPC protocol. If a user 

#### loads the activity's website in a normal browser, the Discord 

#### RPC server will not be present, and the activity will likely 

#### fail in some way. 

#### It is theoretically possible for a malicious client to mock 

#### Discord's RPC protocol or load one activity website when 

#### launching another. Because the activity is loaded inside 

#### Discord, the RPC protocol is active, and the activity is none 

#### the wiser. 

#### To enable an activity to "lock down" activity access, we 

#### encourage utilizing the get_activity_instance API, 


#### found at 

 discord.com/api/applications/<application_id>/activityinstances/<instance_id>' 

#### . The route requires a Bot token of the application. It 

#### returns a serialized active activity instance for the given 

#### application, if found, otherwise it returns a 404. Here are 

#### two example responses: 

#### With this API, the activity's backend can verify that a client 

#### is in fact in an instance of that activity before allowing the 

#### client to participate in any meaningful gameplay. How an 

#### activity implements "session veri!cation" is left to the 

#### developer's discretion. The solution can be as granular as 

#### gating speci!c features or as binary as not returning the 

#### activity HTML except for valid sessions. 

#### In the below "ow diagram, we show how the server can 

#### deliver the activity website, only for valid users in a valid 

#### activity instance: 

 curl https://discord.com/api/applications/1215413995645968394/activity-instances/ {"message": "404: Not Found", "code": 0 } curl https://discord.com/api/applications/1215413995645968394/activity-instances/ {"application_id":"1215413995645968394","instance_id":"i-1276580072400224306-gc-9 



