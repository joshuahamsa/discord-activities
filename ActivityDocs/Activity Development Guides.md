**On this page** Setting Up Activity Metadata Setting Up Activity Art Assets Embedded Background Cover Art App Tile Video Preview **QUICK START INTERACTIONS COMPONENTS ACTIVITIES** API Reference Overview of Apps Getting Started Overview Receiving and Responding Application Commands Overview Using Message Components Using Modal Components Component Reference Home > Activities > Development Guides > Assets and Metadata 

# Assets and 

# Metadata 

## Setting Up Activity Metadata 

 The Activity Shelf is where users can see what Activities can be played. It has various metadata and art assets that can be con!gured. To update your app's metadata in the Discord Developer Portal, navigate to the Settings -> General Information tab of your app. Application Name: The publicly visible name of your app. Application Icon: The publicly visible icon for your Search ⌘ K 


Overview How Activities Work Quickstart Development Guides Local Development User Actions Mobile Layout Networking Multiplayer app. **Application Description:** The application description is shown in the view of the Activity Shelf Item. **Max Participants:** The max participants indicate the maximum number of players for your application. Max Participants is displayed above the name in the 1-up view: Up to X participants. Leaving this !eld empty defaults to Unlimited participants. Max Participants is also displayed under the name in the 2-up view. An app can have a different application name and avatar from the application's bot username and avatar. Both sets of metadata are public-facing and may be visible in various situations when a user interacts with your app. You can view your bot's username on the Settings -> Bot tab. 

## Setting Up Activity Art Assets 

 The Activity Shelf is where users can see what Activities can be played. It has various metadata and art assets that 


can be con!gured. To update your app's embedded-speci!c art assets in the Discord Developer Portal, navigate to the Activities -> Art Assets tab of your app. 

## Embedded Background 

Used as a background overlay in Grid view. Artwork should be clustered around the edges of the image leaving space in the center of the image so the UI does not clash with it. 16:9 aspect ratio At least 1024 pixels wide 

## Cover Art 

Used as the main image in the Activity Shelf. It is suggested that this image contain the title and some art in the background. 

### Speci!cations 

### Speci!cations: 


 Image can be displayed at both 16:9 and 13:11 aspect ratios At least 1024 pixels wide 

## App Tile 

There are two views of an application tile. The regular size tile (2-up tile) and the larger "featured" application tile (1up tile). 

## Video Preview 

Hovering over the cover image should start playing a preview video of the Application. The preview videos should be no more than 10 seconds long. If no video is provided, nothing will happen as you hover over the application. 

### Speci!cations: 640 x 360, mp4 format, under 10 

### seconds long, under 1 MB in size 


