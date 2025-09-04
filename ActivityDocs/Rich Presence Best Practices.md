**On this page** How should you think about the data you show? Tips Launch Checklist **ACTIVITIES** Component Reference Overview How Activities Work Quickstart Development Guides Local Development User Actions Mobile Layout Networking Multiplayer Experience Growth and Referrals Assets and Metadata Production Readiness Design Patterns 

# Best Practices for 

# Rich Presence 

 Rich Presence lets you display actionable data in a Discord user's pro!le about what they're up to in your game or app. This guide is intended to show some best practices on how to make that data the best it can be. If you don't already know about Rich Presence, read the overview !rst. 

## How should you think about the 

## data you show? 

 The data in your players’ pro!les is the !rst thing that others on Discord will see about your game or app, both those familiar with it and those who have never seen it before. It should answer whether someone can play with their friend right now and show data like: Search ⌘ K 


**DISCORD SOCIAL SDK RICH PRESENCE** Overview Core Concepts Getting Started Development Guides Design Guidelines How To Social SDK Reference What the player is currently doing How much time has elapsed or remains (if applicable) Their party state Your cool artwork! 

## Tips 

### Keep it Short 

 details and state should be snippets of data, not sentences. Make sure your strings stay on one line—especially on the small pro!le! Examples 

### Make it Actionable! 


### Make it Actionable! 

Always keep party size data up to date. Keep accurate track of party state: In Queue, In Game, In Menus, etc. Include game modes, ranked vs. unranked, etc. so others can clearly see. **Examples** 

### Use ALL of the !elds (where applicable)! 

Make use of all the !elds that are applicable to you. Save space by putting map and character names in the tooltips. Try not to repeat information. **Examples** 


### Have interesting, expressive art! 

The large image should be consistent for all players in a party. The small image is where you can customize on a perplayer basis. Use high resolution artwork so your art looks great on fancy, high DPI screens. We strongly recommend image sizes of 1024x1024 pixels. **Examples** 


## Launch Checklist 

Ready to launch a Rich Presence integration for your game? If so, we recommend looking over this checklist one last time to ensure that your integration is as great as it can be! Have you made use of all available !elds where appropriate? Do your strings !t on their own lines without line wrapping? Did you check on the smaller pro!le pop out? Do they clearly communicate: What the player is currently doing? If the player is in a group or playing alone? If the player is in a state where they can party up? 

#### Pro!le Strings 


 Is your artwork high resolution? Are your images at least 1024x1024 pixels? Is it clean, interesting, and descriptive without being too highly detailed? Do you have artwork for every different state? Don't forget your default state/main menu! Did you make use of tooltips and the small image where appropriate? Since all Activities presence data has an Ask to Join button, Join Invites are only applicable when building with the Game SDK Have you successfully implemented join invites for your game if applicable? Does the state of the invite properly represent the party/group in-game with regards to: Size? Open slots? Discord and non-Discord users in the party? Are you able to post invites to Discord without any 

#### Artwork 

#### Joining 


additional in-game setup or con!guration? Are you properly removing data from the presence payload when someone can no longer send invites? A Join secret should not be sent if the player can't invite anyone! 


