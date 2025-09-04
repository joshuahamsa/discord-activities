**On this page** Launching Activities Developing Activities Sample Projects Applications Teams Server Insights Embed Debugger Documentation Search **QUICK START INTERACTIONS** 

##### ⌘ K 

Intro Change Log API Reference Overview of Apps Getting Started 

# Overview of 

# Activities 

 Activities are multiplayer games and social experiences that can be launched in Discord. Activities can integrate with Discord features like user identity, voice and chat, pro!le data like Rich Presence, and native monetization. Under the hood, Activities are single page web apps hosted in an iframe and use the Embedded App SDK to communicate with Discord clients. This page focuses on how Activities are launched and built, but you can explore real-world Activities by reading some of our developer case studies, or by trying a few out in Discord. You can also jump right into building using some of the resources below. Search ⌘ K 


**COMPONENTS** Overview Receiving and Responding Application Commands Overview Using Message Components Using Modal Components 

### Build Your First Discord Activity 

 Follow the guide to build your !rst Activity using the Embedded App SDK. 

### Development Patterns 

 Explore common development patterns and practices to make building Activities simpler. 

### How Activities Work 

 Learn more about the lifecycle of Activities and how they run in Discord clients. 

## Launching Activities 

 After you have Activities enabled in your app's settings, your app can launch Activities in two ways: 


1. When a user invokes your app's Entry Point command in the App Launcher 2. By responding to an interaction with the LAUNCH_ACTIVITY callback type Each of these are covered in more detail in the below sections. 

### Entry Point Command 

Activities are primarily opened when users invoke your app's Entry Point command in the App Launcher. When you enable Activities for your app, a default Entry Point command called "Launch" is created for you. By default, Discord automatically handles opening your Activity when your Entry Point command is run by a user. Read more about setting up Entry Point commands in the development guide. 

### Interaction Response 

Activities can be launched in response to command, message component, and modal submission interactions. To open an Activity, set the callback type to LAUNCH_ACTIVITY (type 12 ) when responding to the 


interaction. 

## Developing Activities 

Whether you're developing a multiplayer game, a new social experience, or another creative idea, your Activity will be built as a web app that is run in an iframe in Discord on desktop, mobile, and web. You can get started by following the guide on Building an Activity using the Embedded App SDK or exploring the sample projects The sections below provide an overview of the Embedded App SDK, but technical details about how Activities are run in Discord is covered in How Activities Work. 

### Embedded App SDK 

The Embedded App SDK handles all of the communication between Discord and your app, making it easier to do common tasks like managing connected users, supporting mobile clients, and debugging your Activity. The Embedded App SDK offers different events and commands to handle the communication between Discord and your Activity, which are covered more below. 


The SDK has a set of commands you can call to interact with a Discord client, given you have the appropriate scopes. This is helpful when you want to do authorize and authenticate users, fetch information about your Activity, or update information for your Activity or an authenticated user. Read the Embedded App SDK documentation for a full list of commands, and details about each command. The SDK also has events you can subscribe (or unsubscribe) to for things happening in a connected client that are relevant to your Activity, given you have the appropriate scopes. This is helpful when you want to do things like handle initial connection and thrown errors, listen to updates about a connected user, and listen to events related to your Activity instance. Read the Embedded App SDK documentation for a full list of events, and details for each event. 

## Sample Projects 

#### Commands 

#### Events 


## Sample Projects 

Use the sample projects we've built to help you get started building quickly and learn from common development patterns. You can also !nd a list of community-maintained samples on GitHub, which includes more framework-speci!c examples. 

### Discord Activity Starter 

 This TypeScript starter template is perfect for getting your own Activity up and running quickly. 

### Embedded App SDK Playground 

 This reference example implements the commands and events available to you within the Embedded App SDK. 

### Nested Framework App 

 This reference example demonstrates an Activity using a nested framework like a game engine. 



