**On this page** Understanding Rich Presence Data Updating Presence Using External Custom Assets **ACTIVITIES** Component Reference Overview How Activities Work Quickstart Development Guides Local Development User Actions Mobile Layout Networking Multiplayer Experience Growth and Referrals Assets and Metadata Production Readiness Design Patterns 

# Using Rich 

# Presence with the 

# Embedded App 

# SDK 

 When developing an Activity, the Embedded App SDK makes it easy to integrate Rich Presence to display details about what a user is up to inside of your game or social experience. Rich Presence data can be thought of as an extension of your Activity—and leveling it up just a little makes it more interesting and relevant to the user playing your Activity (and their friends that might want to jump in and play). This guide provides an overview of the platform and technical knowledge you need to integrate Rich Presence with your existing Activity. Search ⌘ K 


**DISCORD SOCIAL SDK RICH PRESENCE** Overview Core Concepts Getting Started Development Guides Design Guidelines How To Social SDK Reference Not sure if you should be building with the Embedded App SDK? Read through Choosing an SDK to understand your options when integrating Rich Presence with your app. The rest of the guide assumes you've already developed an app that can launch an Activity. If you aren't at that point quite yet, you should follow the guide on building your !rst Activity before continuing. 

##### Understanding Rich Presence 

##### Data 

###### Default Rich Presence Data 

 By default, when a user is connected to your Activity, the app's icon will appear on their pro!le. If the user viewing the pro!le has the ability to join, an "Ask to Join" button will be displayed as well. 


While this is okay, it's pretty limited and doesn't provide much context about what a user is actually _doing_ inside of the Activity. In the following sections, we'll take a look at what richer and more actionable presence can look like. 

###### Custom Rich Presence Data 

Now let's see what custom presence data can look like when a user joins your Activity. The types for these !elds and examples are in the sections below, but for now let's just get an idea of what we're working with: 

#### Playing 

## AppName 

### 4:AsktoJoin 


A few small things to note about the above image: 1. large_image and small_image are both in the assets object, which you can see below in the table below. They're labeled with the object's keys to make it more clear how they appear in a Discord pro"le. 2. You can't set App Name when setting presence—it's always the name con"gured in your app's settings. 3. The state (1 of max_party) badge will only render when a party "eld is provided. Otherwise, state will be shown in a line of text below details. 

##### Updating Presence 

When updating Rich Presence data using the Embedded App SDK, the only real command you need to use is **setActivity()**. Under the hood, setActivity() calls the RPC SET_ACTIVITY command with the features and !elds available when you're building an Activity. 


###### Why am I seeing the word 

###### activity everywhere? 

 A brief platform history lesson about what all these different activites are about 

###### rpc.activities.write Scope 

To display custom Rich Presence data for a user, your app will need to be authorized with the rpc.activities.write scope for that user. To request the scope, your authorize() call might look something like this: 

###### Example requesting 

###### rpc.activities.write with 

###### authorize() 

###### setActivity Fields 

When calling setActivity() , you are expected to pass a partial activity object. Below is a table with many of the available !elds for the activity partial. Some were left out since they don't have an effect for Activities. 


 All of the !elds on the partial object are optional and nullable FIELD TYPE DESCRIPTION type integer Activity type, which determines the header text for the Rich Presence data state string User's current party status details string What the player is currently doing in your Activity timesta mps timestamps object Unix timestamps to display start and/or end times assets assets object Images used for the Rich Presence data (and their hover texts) party party object Information for the current party of the player 

###### setActivity Example 

Now let's take a look at more of a real example. Take a look at the Rich Presence data below that is for an Activity: **Activity partial object** 


To create this sort of Rich Presence, here is what the setActivity() code would look like: 

###### Example calling setActivity() 

###### command 

 The following example only focuses on using setActivity(). Follow the Building an Activity guide for more details on topics like instantiating the Embedded App SDK and authenticating users. await discordSdk.commands.setActivity({ activity: { type: 0 , 


##### Using External Custom Assets 

Typically when building an Activity, you need to be aware of the proxy and how to use external resources. However, lucikly for you (and the writer of this guide), image URLs in !elds for features like Rich Presence don't need to jump through any extra hoops. As mentioned in the Rich Presence overview, you have more than 300 custom assets or if you want to use your stored images from somewhere else, you can specify an external details: 'Traveling with a group', state: 'In Mainframe', assets: { large_image: 'main-game-image', large_text: 'in a group', small_image: 'map-mainframe', small_text: 'in mainframe' }, timestamps: { start: 1723137832 }, party: { size: [ 2 , 4 ] } } }); 


URL for large_image or small_image within the assets object. 

###### Example setting presence with 

###### an external asset 

 The following example only focuses on using setActivity(). Follow the Building an Activity guide for more details on topics like instantiating the Embedded App SDK and authenticating users. await discordSdk.commands.setActivity({ activity: { type: 2 , state: 'Broken Hearts and Code (club edit)', details: 'DJ Wump', assets: { large_image: 'https://example.com/album-covers/dj-wump/broken-code-and-h large_text: 'Listening to a track', } } }); 


