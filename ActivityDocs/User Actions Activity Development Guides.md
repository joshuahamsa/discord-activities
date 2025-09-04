**On this page** Open External Link Open Invite Dialog Open Share Moment Dialog Setting Up an Entry Point Command Encourage Hardware Acceleration **QUICK START INTERACTIONS COMPONENTS ACTIVITIES** 

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

#### Home > Activities > Development Guides > User Actions 

# User Actions 

## Open External Link 

#### Since Activities are sandboxed, your app will need to 

#### perform a command in order for users to launch any 

#### external links. Users will be prompted inside Discord 

#### whether or not they want to open the external link. 

### Usage 

 import {DiscordSDK} from '@discord/embedded-app-sdk'; const discordSdk = new DiscordSDK(clientId); await discordSdk.ready(); // Once the sdk has established the connection with the discord client, external // links can be launched discordSdk.commands.openExternalLink({ url: 'https://google.com', }); 

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

#### Users will see a modal inside the Discord app notifying 

#### them whether or not they want to proceed. By clicking 

#### Trust this Domain , users will not see a modal for that 

#### speci!c domain again. 

## Open Invite Dialog 

#### Getting an Application Channel Invite, as outlined in these 

#### docs, is not granted by any OAuth scopes. Nonetheless, the 

#### openInviteDialog command is available via the SDK. 

#### This command opens the Application Channel Invite UI 

#### within the discord client without requiring additional OAuth 

#### scopes. 

### User Experience 


#### This command returns an error when called from DM 

#### (Direct Message) contexts, so should only be called in Guild 

#### Voice or Text Channels. Similarly, this command returns an 

#### error if the user has invalid permissions for the channel, so 

#### using getChannelPermissions (requires OAuth scope 

#### 'guilds.members.read' ) is highly recommended. 

#### User Experience 

### Usage 

 import {DiscordSDK, Permissions, PermissionUtils} from '@discord/embedded-app-sdk const discordSdk = new DiscordSDK(clientId); await discordSdk.ready(); try { const {permissions} = await discordSdk.commands.getChannelPermissions(); if (PermissionUtils.can(Permissions.CREATE_INSTANT_INVITE, permissions)) { await discordSdk.commands.openInviteDialog(); // successfully opened dialog } else { console.warn('User does not have CREATE_INSTANT_INVITE permissions'); } } catch (err) { // failed to fetch permissions or open dialog console.warn(err.message); } 


#### Users will see a modal inside the Discord app allowing them 

#### to send an invite to a channel, friend, or copy an invite link 

#### to share manually. 

## Open Share Moment Dialog 

#### The easiest way for an application to share media to a 

#### channel or DM is to use the openShareMomentDialog 


#### command. This command accepts a Discord CDN 

#### mediaUrl (eg 

#### https://cdn.discordapp.com/attachments/... ) and 

#### opens a dialog on the discord client that allows the user to 

#### select channels, DMs, and GDMs to share to. This requires 

#### no additional OAuth scopes, but does require the 

#### application to be authenticated. 

#### Since mediaUrl must be a Discord CDN URL, it is 

#### encouraged to use the activities attachment API endpoint ( 

 discord.com/api/applications/${applicationId}/attachment 

#### ) to create an ephemeral CDN URL. This endpoint accepts 

#### bearer tokens for any scopes, so it can be called from the 

#### application client using the authorized user's bearer token. 

#### The endpoint returns a serialized attachment, which 

#### includes a url attribute, which should then be passed to 

#### the DiscordSDK command as mediaUrl. 

### Usage 

 import {discordSdk} from './wherever-you-initialize-your-sdk'; import {accessToken} from './wherever-you-store-your-access-token'; // some image const imageURL = 'https://i.imgur.com/vaSWuKr.gif'; // get image data const response = await fetch(imageURL); 


#### User Experience 

 const blob = await response.blob(); const mimeType = blob.type; // image data as buffer const buf = await blob.arrayBuffer(); // image as file const imageFile = new File([buf], 'example.gif', {type: mimeType}); const body = new FormData(); body.append('file', imageFile); const attachmentResponse = await fetch(${env.discordAPI}/applications/${env.appl method: 'POST', headers: { Authorization: Bearer ${accessToken}, }, body, }); const attachmentJson = await attachmentResponse.json(); // mediaUrl is an ephemeral Discord CDN URL const mediaUrl = attachmentJson.attachment.url; // opens dialog in Discord client await discordSdk.commands.openShareMomentDialog({mediaUrl}); 


## Setting Up an Entry Point 


## Setting Up an Entry Point 

## Command 

#### An Entry Point command is required for users to be able to 

#### launch your Activity from the App Launcher menu in 

#### Discord. 

#### When you enable Activities in your app's settings, a default 

#### Entry Point command is automatically created for your app. 

#### The default Entry Point command will use the 

#### DISCORD_LAUNCH_ACTIVITY ( 2 ) handler type, which 

#### means that Discord automatically launches your Activity 

#### for the user and posts a follow-up message into the channel 

#### where it was launched from. 

#### If you want to handle sending messages yourself, you can 

#### update the handler to be APP_HANDLER ( 1 ). Details about 

#### Entry Point command handlers is in the Entry Point 

#### command documentation. 

#### Entry Point commands can be customized in the same way 

#### as other commands. Since Entry Point commands can only 

#### be global, you'll use the HTTP endpoints for global 

#### commands: 

#### Edit your existing Entry Point command's name or 

### Customizing the Default Entry Point Command 


#### details using the Edit Global Application Command 

#### endpoint. If you don't know the ID for your app's Entry 

#### Point command, use the Get Global Application 

#### Commands endpoint to retrieve it. 

#### Make a different (option-less) command your Entry 

#### Point command by updating its command type to 

#### PRIMARY_ENTRY_POINT (type 4 ). Your app can only 

#### have one Entry Point command, so if your app already 

#### has one, you must !rst delete it or update its command 

#### type. 

#### To create a new Entry Point command, you can call the 

#### Create Global Application Command endpoint and set the 

#### command type to PRIMARY_ENTRY_POINT (type 4 ). 

#### Your command payload may look something like this: 

### Creating an Entry Point Command 

##### { 

 "name": "launch", "description": "Launch Realms of Wumpus", // PRIMARY_ENTRY_POINT is type 4 "type": 4 , // DISCORD_LAUNCH_ACTIVITY is handler value 2 "handler": 2 , // integration_types and contexts define where your command can be used (see be "integration_types": [ 0 , 1 ], 


#### In addition to the type and handler values, the 

#### command payload includes integration_types and 

#### contexts which let you con!gure when and where your 

#### command can be used: 

#### integration_types de!nes the installation 

#### contexts where your command is available (to a server, 

#### to a user's account, or both). If you don't set 

#### integration_types when creating a command, it will 

#### default to your app's currently-supported installation 

#### contexts. 

#### contexts de!nes the interaction contexts where a 

#### command can be run in Discord (in a server, in a DM 

#### with your app, and/or in DMs and Group DMs with other 

#### users). 

#### Details about both of these !elds are in the command 

#### contexts documentation. 

## Encourage Hardware 

 "contexts": [ 0 , 1 , 2 ] } 


## Encourage Hardware 

## Acceleration 

#### Activities that are compute intensive may bene!t from 

#### encouraging users to enable hardware acceleration. When 

#### an application invokes the 

#### encourageHardwareAcceleration command the current 

#### status of the setting will be returned and the user will be 

#### prompted to update the setting, if applicable. 

#### Users will see a modal inside the Discord app if Hardware 

#### Acceleration is disabled, encouraging them to change the 

#### setting. By clicking Don't show me this again they will not 

#### see the modal for any application on this device again. 

#### Switching the Hardware Acceleration setting causes the 

#### Discord client to quit and re-launch, so it is best practice to 

#### invoke this command as soon as possible, so users do not 

#### begin the experience of an application before restarting. 

#### Ideally, this is immediately after 

#### await discordSdk.ready(). 

### Best Practices 

### Usage 

 import {DiscordSDK} from '@discord/embedded-app-sdk'; const discordSdk = new DiscordSDK(clientId); 


 await discordSdk.ready(); const {enabled} = await discordSdk.commands.encourageHardwareAcceleration(); console.log(Hardware Acceleration is ${enabled === true? 'enabled' : 'disabled' 

### User Experience 


