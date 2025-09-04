# Using Rich Presence with the Embedded App SDK

When developing an Activity, the Embedded App SDK makes it easy to integrate Rich Presence to display details about what a user is up to inside of your game or social experience. Rich Presence data can be thought of as an extension of your Activity—and leveling it up just a little makes it more interesting and relevant to the user playing your Activity (and their friends that might want to jump in and play). This guide provides an overview of the platform and technical knowledge you need to integrate Ric...

Not sure if you should be building with the Embedded App SDK? Read through *Choosing an SDK* to understand your options when integrating Rich Presence with your app. The rest of the guide assumes you've already developed an app that can launch an Activity. If you aren't at that point quite yet, you should follow the guide on building your first Activity before continuing.

## Understanding Rich Presence Data

### Default Rich Presence Data

By default, when a user is connected to your Activity, the app's icon will appear on their profile. If the user viewing the profile has the ability to join, an "Ask to Join" button will be displayed as well.

While this is okay, it's pretty limited and doesn't provide much context about what a user is actually *doing* inside of the Activity. In the following sections, we'll take a look at what richer and more actionable presence can look like.

### Custom Rich Presence Data

Now let's see what custom presence data can look like when a user joins your Activity. The types for these fields and examples are in the sections below, but for now let's just get an idea of what we're working with:

**Playing AppName — 4:AsktoJoin**

A few small things to note about the above image:
1. `large_image` and `small_image` are both in the `assets` object, which you can see below in the table. They're labeled with the object's keys to make it more clear how they appear in a Discord profile.
2. You can't set App Name when setting presence—it's always the name configured in your app's settings.
3. The `state` (1 of max_party) badge will only render when a `party` field is provided. Otherwise, `state` will be shown in a line of text below `details`.

## Updating Presence

When updating Rich Presence data using the Embedded App SDK, the only real command you need to use is **setActivity()**. Under the hood, `setActivity()` calls the RPC `SET_ACTIVITY` command with the features and fields available when you're building an Activity.

### Why am I seeing the word *activity* everywhere?

A brief platform history lesson about what all these different activities are about.

### rpc.activities.write Scope

To display custom Rich Presence data for a user, your app will need to be authorized with the `rpc.activities.write` scope for that user. To request the scope, your `authorize()` call might look something like this:

### Example requesting `rpc.activities.write` with `authorize()`

```javascript
const { code } = await discordSdk.commands.authorize({
  client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
  response_type: "code",
  state: "",
  prompt: "none",
  scope: [
    "identify",
    "rpc.activities.write"
  ],
});
```

### setActivity Fields

When calling `setActivity()`, you are expected to pass a partial activity object. Below is a table with many of the available fields for the activity partial. Some were left out since they don't have an effect for Activities.

All of the fields on the partial object are optional and nullable:

| FIELD      | TYPE      | DESCRIPTION                                                                 |
|------------|-----------|-----------------------------------------------------------------------------|
| type       | integer   | Activity type, which determines the header text for the Rich Presence data  |
| state      | string    | User's current party status                                                 |
| details    | string    | What the player is currently doing in your Activity                         |
| timestamps | object    | Unix timestamps to display start and/or end times                           |
| assets     | object    | Images used for the Rich Presence data (and their hover texts)              |
| party      | object    | Information for the current party of the player                             |

### setActivity Example

Now let's take a look at a real example. Take the following Rich Presence data for an Activity:

**Activity partial object**

```javascript
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
    timestamps: {
      start: 1723137832,
    },
    party: {
      size: [2, 4],
    },
  },
});
```

## Using External Custom Assets

Typically when building an Activity, you need to be aware of the proxy and how to use external resources. However, luckily for you, image URLs in fields for features like Rich Presence don't need to jump through any extra hoops. As mentioned in the Rich Presence overview, you have more than 300 custom assets—or if you want to use your stored images from somewhere else, you can specify an external URL for `large_image` or `small_image` within the assets object.

### Example setting presence with an external asset

```javascript
await discordSdk.commands.setActivity({
  activity: {
    type: 2,
    state: "Broken Hearts and Code (club edit)",
    details: "DJ Wump",
    assets: {
      large_image: "https://example.com/album-covers/dj-wump/broken-code-and-heart.jpg",
      large_text: "Listening to a track",
    },
  },
});
```
