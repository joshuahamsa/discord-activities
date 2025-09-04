# Activity Design Patterns

## Table of Contents
- [Guiding Principles](#guiding-principles)
  - [Interaction over Isolation](#interaction-over-isolation)
  - [Expression over Monotony](#expression-over-monotony)
  - [Accessibility over Exclusion](#accessibility-over-exclusion)
- [Providing a "Solo-Plus" Experience](#providing-a-solo-plus-experience)
  - [Solo or Single-Player](#solo-or-single-player)
  - [Solo-Plus or Small Groups](#solo-plus-or-small-groups)
  - [Large Groups of Users](#large-groups-of-users)
- [User Presence & Privacy](#user-presence--privacy)
  - [Make Actions and Presence Visible](#make-actions-and-presence-visible)
  - [Respect User Privacy](#respect-user-privacy)
- [Deliver a Quality Experience](#deliver-a-quality-experience)
  - [Surprise and Delight Users](#surprise-and-delight-users)
  - [Keep Load Times Low](#keep-load-times-low)
  - [Support Drop-In, Drop-Out Behavior](#support-drop-in-drop-out-behavior)
  - [Make Your App Widely Available](#make-your-app-widely-available)
  - [Cross-Platform Support](#cross-platform-support)
  - [Discord is a Global Audience](#discord-is-a-global-audience)
  - [Implement Invites](#implement-invites)
  - [Implement Sharing](#implement-sharing)
  - [Activities in Text Channels](#activities-in-text-channels)
  - [Monetization Considerations](#monetization-considerations)
- [Game Design Considerations](#game-design-considerations)
  - [Easy to Learn, Hard to Master](#easy-to-learn-hard-to-master)
  - [Voice Users are Most Engaged](#voice-users-are-most-engaged)
  - [Consider Game Tropes](#consider-game-tropes)
  - [Activity Lifecycle](#activity-lifecycle)
  - [Track Game Phases](#track-game-phases)
  - [Games per Session](#games-per-session)
  - [Group Size Impacts](#group-size-impacts)
- [Co-Watching / Co-Listening](#co-watching--co-listening)
- [Technical Considerations](#technical-considerations)
  - [Developing for the Iframe](#developing-for-the-iframe)
  - [Developing in Unity](#developing-in-unity)
- [Quality and Testing](#quality-and-testing)
  - [Verify UI/UX](#verify-uiux)
  - [Test for Performance](#test-for-performance)
  - [Test for Audio](#test-for-audio)
  - [Validate Activity Controls](#validate-activity-controls)
  - [Mobile Device UI Considerations](#mobile-device-ui-considerations)
  - [Desktop Accessibility Guidelines](#desktop-accessibility-guidelines)

---

## Guiding Principles

### Interaction over Isolation
Activities are not for screen-sharing — Discord already has that built in!  
Give users ways to interact with one another. User actions should impact the experiences of other participants.

### Expression over Monotony
Users want to create memorable moments. Build experiences where users can craft moments and react in ways they’ll want to share with others.

### Accessibility over Exclusion
Inclusivity is key. Reduce the bar to entry for your Activity and reward people for engaging deeply with the experience.

---

## Providing a "Solo-Plus" Experience

Successful Activities should accommodate small group sessions (**“Plus”**) but also be playable and enjoyable in single-player (**“Solo”**) sessions.

### Solo or Single-Player
While most people use Discord with friends, consider making your Activity compelling alone, but better together.  

If you don’t support solo play, expect users to peek in alone. Provide ways to preview the Activity so they’ll want to come back with friends.

### Solo-Plus or Small Groups
Small group sessions (3–8 people) show higher engagement and retention.  
Letting players join with friends keeps them coming back.

### Large Groups of Users
The real limit is the number of people who can join a voice call (up to 25+).  
Design your Activity to handle large groups gracefully.

---

## User Presence & Privacy

### Make Actions and Presence Visible
Users enjoy spaces that feel active. Use server nicknames and avatars where possible. Show when a user is speaking in voice, or whether they’re active/inactive.

### Respect User Privacy
For sessions that match users from various servers, anonymize usernames and avatars by default.  

Only display Discord personal identifiers with user confirmation, and only when the viewers already have access to them via the server or DM.

---

## Deliver a Quality Experience

### Surprise and Delight Users
Care about the small details. Deliver the right emotion when least expected to create magic moments.

### Keep Load Times Low
Low load times allow drop-in/drop-out play — especially important for mobile.  

- Partition loading and work with dev tools to reduce load times  
- Support different screen sizes/orientations across devices  
- Ensure UI scales properly  

### Support Drop-In, Drop-Out Behavior
Users may join mid-experience. Give them something to do — even spectating.  

Also handle users leaving unexpectedly or going AFK gracefully.  

### Make Your App Widely Available
- Support both desktop and mobile  
- Consider multiple languages and cultures  

#### Cross-Platform Support
#### Discord is a Global Audience

### Implement Invites
The Embedded App SDK allows sending invites to friends. Place invite prompts intentionally, such as when:
- Players leave a session
- Minimum participants not reached (e.g., Chess needing 2 players)

### Implement Sharing
Encourage users to share images or GIFs capturing fun/memorable moments.  

Avoid making things shareable just to advertise the Activity — focus on moments that spark conversation.

### Activities in Text Channels
Your UI should not rely on voice chat for explanation. Provide clear instructions through:
- First-time user experience flows
- “How To Play” instructions
- Toast messages
- Call-to-Action buttons  

But avoid overwhelming users with too much copy.

### Monetization Considerations
Monetization in Activities will be available soon. Keep in mind:
- Avoid early login/paywalls blocking participation  
- Avoid “pay to win” advantages  
- Focus on cosmetic/aesthetic unlocks (skins, themes, avatars, etc.)

---

## Game Design Considerations

### Easy to Learn, Hard to Master
Users may feel pressure joining mid-game.  
Keep controls approachable and intuitive.  

Avoid long tutorials — provide simple loops that are easy to grasp quickly.

### Voice Users are Most Engaged
Engagement and retention increase when users are in a voice call with friends.

### Consider Game Tropes
Leverage familiar genre expectations. Align your design with player interests to encourage retention.

### Activity Lifecycle
Activities close when the last participant leaves.  
The next launch creates a new instance (even in the same DM/voice channel).

### Track Game Phases
Track drop-offs:
- Launch → Start (often the biggest gap, especially without solo play)  
- Checkpoints within a game  
- % of sessions that reach game completion  

Adjust defaults if certain game modes/settings are underperforming.

### Games per Session
Not all Activities need multiple games per session, but if you expect repeat plays and don’t see them, investigate why.

### Group Size Impacts
Analyze metrics by group size.  

Examples:
- Do larger groups finish less often?  
- Do smaller groups replay more?  

Design for robust experiences across different sizes when possible.

---

## Co-Watching / Co-Listening

Go beyond simple screen-sharing.  
- Provide creative interactions that affect all participants  
- Offer host controls, but let everyone participate (e.g., content suggestions)  
- Handle geo-restricted content gracefully  
- Sync playback across users  

Users are familiar with platforms like Spotify, YouTube, Netflix — follow their design patterns.  

Ensure volume controls work consistently across devices.

---

## Technical Considerations

### Developing for the Iframe
Remember the Discord client is running alongside your Activity:
- Optimize CPU, RAM, and GPU use  
- Prioritize **time-to-first-interaction**  
- Minimize WASM to avoid stutters/thermal issues (esp. on iOS)  

All network traffic is routed through the Discord proxy for security.  

Create multiple versions of your Activity (Development, Staging, Production) for safe iteration.

### Developing in Unity
Unity can work, but requires heavy optimization to meet standards.  
Web-first game engines are generally more performant.

---

## Quality and Testing

### Verify UI/UX
- Ensure all buttons/UI elements function correctly  
- Handle Discord usernames properly (username vs. server identity)

### Test for Performance
- Test across phones, tablets, desktops, and OSes  
- Prevent lag from significantly impacting experience

### Test for Audio
- Confirm sound effects and music play correctly  
- Ensure volume controls work as expected

### Validate Activity Controls
- Test all controls (clicks, drags, keys, swipes, hovers)  
- Verify tutorials and instructions match the Activity on both desktop and mobile

### Mobile Device UI Considerations
- Avoid placing UI under notches/camera cutouts  
- Consider curved edges and safe areas  
- Respect iOS/Android swipe gestures  
- Prevent Android back button conflicts  

### Desktop Accessibility Guidelines
- Support TAB navigation between Discord fields/buttons  
- Allow ESC to close in-Activity modals  
- Use high-contrast, color-blind-friendly colors  
- Avoid relying solely on color for gameplay-critical elements