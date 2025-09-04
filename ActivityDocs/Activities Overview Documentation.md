# Overview of Activities

## Table of Contents
- [Overview of Activities](#overview-of-activities)
- [Key Resources](#key-resources)
  - [Build Your First Discord Activity](#build-your-first-discord-activity)
  - [Development Patterns](#development-patterns)
  - [How Activities Work](#how-activities-work)
- [Launching Activities](#launching-activities)
  - [Entry Point Command](#entry-point-command)
  - [Interaction Response](#interaction-response)
- [Developing Activities](#developing-activities)
  - [Embedded App SDK](#embedded-app-sdk)
- [Sample Projects](#sample-projects)
  - [Discord Activity Starter](#discord-activity-starter)
  - [Embedded App SDK Playground](#embedded-app-sdk-playground)
  - [Nested Framework App](#nested-framework-app)

---

## Overview of Activities

Activities are multiplayer games and social experiences that can be launched in Discord. Activities can integrate with Discord features like user identity, voice and chat, profile data like Rich Presence, and native monetization.  

Under the hood, Activities are single-page web apps hosted in an iframe and use the **Embedded App SDK** to communicate with Discord clients.  

This page focuses on how Activities are launched and built, but you can also:
- Explore real-world Activities by reading developer case studies
- Try a few out directly in Discord
- Jump right into building using the resources below

---

## Key Resources

### Build Your First Discord Activity
Follow the guide to build your first Activity using the Embedded App SDK.

### Development Patterns
Explore common development patterns and practices to make building Activities simpler.

### How Activities Work
Learn more about the lifecycle of Activities and how they run in Discord clients.

---

## Launching Activities

After you have Activities enabled in your app’s settings, your app can launch Activities in two ways:

1. When a user invokes your app’s **Entry Point command** in the App Launcher  
2. By responding to an interaction with the **`LAUNCH_ACTIVITY`** callback type  

Each of these is covered in more detail below.

### Entry Point Command
Activities are primarily opened when users invoke your app’s Entry Point command in the App Launcher.  

When you enable Activities for your app, a default Entry Point command called **“Launch”** is created for you. By default, Discord automatically handles opening your Activity when this command is run by a user.  

Read more about setting up Entry Point commands in the development guide.

### Interaction Response
Activities can also be launched in response to:
- Commands
- Message components
- Modal submissions  

To open an Activity, set the callback type to **`LAUNCH_ACTIVITY`** (`type: 12`) when responding to the interaction.

---

## Developing Activities

Whether you’re building a multiplayer game, a new social experience, or another creative idea, your Activity will be built as a **web app** that runs in an iframe in Discord on desktop, mobile, and web.

You can get started by:
- Following the guide on **Building an Activity using the Embedded App SDK**
- Exploring the **sample projects**

Technical details about how Activities are run in Discord are covered in **How Activities Work**.

### Embedded App SDK
The Embedded App SDK handles communication between Discord and your app, making it easier to:
- Manage connected users
- Support mobile clients
- Debug your Activity  

The SDK provides:
- **Commands** you can call (given the correct scopes) to:
  - Authorize and authenticate users
  - Fetch information about your Activity
  - Update information for your Activity or an authenticated user
- **Events** you can subscribe/unsubscribe to, which let you:
  - Handle initial connections and errors
  - Listen for updates about connected users
  - Track Activity-related events  

See the full Embedded App SDK documentation for detailed commands and events.

---

## Sample Projects

Use the sample projects we’ve built to help you get started quickly and learn from common development patterns.  

You can also find a list of **community-maintained samples on GitHub**, including framework-specific examples.

### Discord Activity Starter
A TypeScript starter template for quickly getting your own Activity up and running.

### Embedded App SDK Playground
A reference example that implements the commands and events available in the Embedded App SDK.

### Nested Framework App
A reference example demonstrating an Activity built with a nested framework, such as a game engine.