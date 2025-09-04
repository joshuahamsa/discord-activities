**On this page** Cache Busting Handling Rate Limits Static IP Addresses Backward Compatibility **QUICK START INTERACTIONS COMPONENTS ACTIVITIES** API Reference Overview of Apps Getting Started Overview Receiving and Responding Application Commands Overview Using Message Components Using Modal Components Component Reference Home > Activities > Development Guides > Production Readiness 

# Production 

# Readiness 

## Cache Busting 

 All assets loaded by your application will respect cache headers. One exception is that Discord's application proxy will remove any cache headers for assets whose content-type headers include text/html. For all nontext/html content that your application plans to serve, be sure your application has a cache-busting strategy. This is often built into build processes. If your application has a static !lename for its javascript or css, please be sure to implement cache busting techniques, for example webpack enables creating a content hash and manifest as a part of Search ⌘ K 


Overview How Activities Work Quickstart Development Guides Local Development User Actions Mobile Layout Networking Multiplayer the build process. 

## Handling Rate Limits 

 Be sure network requests made by your application's client and server will be able to respect Discord API's rate limiting as described here. See this implementation in the Activity Starter project for an example of how to respect the retry_after header when you receive a 429 error. 

## Static IP Addresses 

 If your application's server is utilizing a dynamically assigned IP address (this is standard for cloud functions), there is a non-zero chance that you will inherit from a previous bad actor an IP address which has been banned by Cloud"are. In this scenario any egress traf!c from the IP address directed towards Discord's API will be banned for up-to an hour. The best way to mitigate this situation is to set up a static IP address for all of your application server's 


egress traf!c to be routed through. 

## Backward Compatibility 

When new commands become available in the embeddedapp-sdk, those commands won't be supported by all Discord app versions. The new command will typically only be supported by newer Discord app versions. When an application tries to use a new command with an old Discord app version that doesn't support the command, the Discord app will respond with error code INVALID_COMMAND which the application can handle like this: 

### New Commands 

 try { const {permissions} = await discordSdk.commands.getChannelPermissions(); // check permissions ... } catch (error) { if (error.code == RPCErrorCodes.INVALID_COMMAND) { // This is an expected error. The Discord client doesn't support this command ... } else { // Unexpected error 


... } } 


