**On this page** Activity Proxy Considerations Construct A Full URL Using External Resources Security Considerations **QUICK START INTERACTIONS COMPONENTS ACTIVITIES** API Reference Overview of Apps Getting Started Overview Receiving and Responding Application Commands Overview Using Message Components Using Modal Components Component Reference Home > Activities > Development Guides > Networking 

# Networking 

## Activity Proxy Considerations 

 All network traf!c is routed through the Discord Proxy for various security reasons. Under the hood we utilize Cloud"are Workers, which brings some restrictions, outlined below. While we currently only support websockets, we're working with our upstream providers to enable WebTransport. WebRTC is not supported. 

### WebTransport 

### WebRTC 

 Search ⌘ K 


Overview How Activities Work Quickstart Development Guides Local Development User Actions Mobile Layout Networking Multiplayer 

## Construct A Full URL 

 There are scenarios where instead of using a relative url ( /path/to/my/thing ) you may want or need to reference the full url when making a network request. The URL is a combination of the following 1. The protocol you wish to use 2. Your application's client id 3. The discord proxy domain 4. Whatever you need to list Here's an example of how to build a full url, using the URL constructor: In other words, given an application client id of 12345678 RELATIVE PATH FULL PATH /foo/bar.jpg https://12345678.discordsays.com/foo/bar.jpg const protocol = https; const clientId = '<YOUR CLIENT ID>'; const proxyDomain = 'discordsays.com'; const resourcePath = '/foo/bar.jpg'; const url = new URL(${protocol}://${clientId}.${proxyDomain}${resourcePath}); 


## Using External Resources 

Activities in Discord are "sandboxed" via a Discord proxy. This is done to hide the users' IP addresses as well as block URLs from known malicious endpoints. To achieve this, the Discord Developer Portal has a section for con!guring URL Mappings for your application. One edge-case of URL mappings is that third-party NPM modules or other resources may reference external (nonsandboxed) urls. For example, if your application has an npm module that attempts to make an http request to https://foo.library.com, the request will fail with a blocked:csp error. To get around this limitation there are several options to consider: Fork the library (to use mapped urls) Utilize a post-install utility such as patch-package Use our Embedded App SDK's patchUrlMappings API In the above scenario, we recommend using the 


patchUrlMappings API, as it will allow a smooth transition from the non-sandboxed dev environment to the production environment. This method call takes an array of "mappings" which will transform any external network requests to the mappings you've de!ned. See the example below: In this example, imagine you have a third-party library which makes an HTTP request to foo.com In the developer portal, create a mapping like this: /foo -> foo.com Then in your code, when initializing the SDK, you will make a function call. import {patchUrlMappings} from '@discord/embedded-app-sdk'; const isProd = process.env.NODE_ENV === 'production'; // Actual dev/prod env chec async function setupApp() { if (isProd) { patchUrlMappings([{prefix: '/foo', target: 'foo.com'}]); } // start app initialization after this.... } 


 Note: patchUrlMappings is modifying your browser's fetch , WebSocket , and XMLHttpRequest.prototype.open global variables. Depending on the library, you may see side effects from using this helper function. It should be used only when necessary. 

## Security Considerations 

Do not trust data coming from the Discord client as truth. It's !ne to use this data in your application locally, but assume any data coming from the Discord Client could be falsi!ed. That includes data about the current user, their nitro status, their current channel, etc. If you need this information in a trusted manner, contact Discord API directly from your application's server, with the user token you received from completing the OAuth2 "ow. Furthermore, data coming from the Discord client is not sanitized beforehand. Things like usernames and channel names are arbitrary user input. Make sure to sanitize these strings or use .textContent (for example) to display them safely in your UI. 

### Trusting Client Data 


To set a cookie for your activity to use in network requests through the proxy, make sure the cookie's domain matches your app's full {clientId}.discordsays.com domain. You will also need to explicitly set SameSite=None Partitioned on the cookie. SameSite=None is needed as browsers refuse to store or send cookies with higher restriction levels for any navigation within an iframe. Partitioned then limits the use of that cookie to only Discord's iframes. Rest assured: other activities will not be able to make requests with your activity's cookie, thanks to the Content Security Policy (CSP) limiting requests only to your own app's proxy. 

### Using Cookies 


