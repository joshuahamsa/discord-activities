**On this page** Supported Platforms: Web, iOS, Android Mobile Safe Areas Mobile Thermal States **QUICK START INTERACTIONS COMPONENTS ACTIVITIES** 

###### API Reference 

###### Overview of Apps 

###### Getting Started 

###### Overview 

###### Receiving and 

###### Responding 

###### Application 

###### Commands 

###### Overview 

###### Using Message 

###### Components 

###### Using Modal 

###### Components 

###### Component 

###### Reference 

###### Home > Activities > Development Guides > Mobile 

# Mobile 

## Supported Platforms: Web, iOS, 

## Android 

###### By default, your Activity will be launchable on web/desktop. 

###### To enable or disable support for Web/iOS/Android, do the 

###### following: 

###### Visit the developer portal 

###### Select your application 

###### Select Activities -> Settings in the left-side of 

###### the developer portal, or visit 

 https://discord.com/developers/<your app id>/embedded/settings 

###### From check the appropriate checkboxes in the 

###### developer portal, and save your changes 

###### Search ⌘ K 


###### Overview 

###### How Activities Work 

###### Quickstart 

###### Development Guides 

###### Local Development 

###### User Actions 

###### Mobile 

###### Layout 

###### Networking 

###### Multiplayer 

## Mobile Safe Areas 

###### As an example, you can de!ne your safe area insets as 

###### below in CSS: 

###### This prefers the --discord-safe-area-inset-* variable 

###### and will fallback to the env values for iOS + any local dev 

###### testing that is done outside of Discord. 

 <BacktoApplications SELECTEDAPP 

##### MySuperCoolGame 

 SETTINGS GeneralInformation 

#### Y OAuth2 

 Bot RichPresence App^ Testers MONETIZATION 

(+ (^) GettingStarted ACTIVITIES URLMappings Settings ArtAssets 

### ActivitySettings 

#### Aplaceforyoutoconfigureyouractivitysettings 

 AGEGATE (APPLICATIONSWITHCONTENTUNSUITABLEFORCHILDRENUNDERTHE AgeGated PHONEDEFAULTORIENTATIONLOCKSTATE (THISSETTINGISONLYCONSUMEDINTHEDISCORDMOBILEAPPSONPHONE Unlocked TABLETDEFAULTORIENTATIONLOCKSTATE (THISSETTINGISONLYCONSUMEDINTHEDISCORDMOBILEAPPSONTABLET Unlocked SUPPORTEDPLATFORMS Web iOS Android :root { --sait: var(--discord-safe-area-inset-top, env(safe-area-inset-top)); --saib: var(--discord-safe-area-inset-bottom, env(safe-area-inset-bottom)); --sail: var(--discord-safe-area-inset-left, env(safe-area-inset-left)); --sair: var(--discord-safe-area-inset-right, env(safe-area-inset-right)); } 


###### You can then reference these values: 

## Mobile Thermal States 

###### You may need to respond to thermal state changes using 

###### recommendations from thermal states surfaced by mobile 

###### devices to improve the user experience. 

###### Discord's Embedded App SDK provides an abstraction over 

###### Apple's thermal state APIs and Android's thermal state 

###### APIs. 

###### Here's how Discord's abstraction maps to Apple's thermal 

###### states and Android's thermal states. 

 body { padding-left: var(--sail); padding-right: var(--sair); padding-top: var(--sait); padding-bottom: var(--saib); } enum ThermalState { NOMINAL = 0 , // maps to "nominal" on iOS and "none" on Android FAIR = 1 , // maps to "fair" on iOS and "light" / "moderate" on Android 


###### The Embedded App SDK allows developers to subscribe to 

###### these thermal state changes. 

###### Discord will publish the current thermal state upon event 

###### subscription, and it will also publish any thermal state 

###### changes that happen afterward. 

###### On Android devices, the thermal state updates will 

###### only be available on Android 10 and higher. 

 SERIOUS = 2 , // maps to "serious" on iOS and "severe" on Android CRITICAL = 3 , // maps to "critical" on iOS and "critical" / "emergency" / "shut } const handleThermalStateUpdate = (update: {thermal_state: number}) => { switch (thermalState) { case Common.ThermalStateTypeObject.NOMINAL: ... case Common.ThermalStateTypeObject.FAIR: ... case Common.ThermalStateTypeObject.SERIOUS: ... case Common.ThermalStateTypeObject.CRITICAL: ... default: ... } } discordSdk.subscribe('THERMAL_STATE_UPDATE', handleThermalStateUpdate); 



