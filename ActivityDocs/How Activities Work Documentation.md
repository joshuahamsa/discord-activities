# How Activities Work

Activities are web applications that run in an iframe within Discord on desktop, mobile, and web.  
To achieve this, Discord uses the **postMessage** protocol to enable secure communication between your application and the Discord client.  

The **Embedded App SDK** simplifies this process by managing postMessage for you.  
For details on available commands and their usage, see the **SDK Reference**.  
For practical examples, check out the **Sample Projects**.

---

## Designed for Single-Page Apps (SPAs)

The SDK is intended for use by **single-page applications (SPAs)**.  

We recognize developers may use frameworks or approaches that don’t perfectly align with SPAs.  
We recommend:
- Nesting those frameworks inside your Activity’s top-level SPA  
- Passing messages as needed  

See the **Nested Messages App sample project** for guidance.

---

## Activity Lifecycle

1. **Initialization**  
   - When your iframe loads within Discord, it includes **unique query parameters** in its URL.  
   - These parameters can be accessed by your application using the Discord SDK.  

2. **Handshake Process**  
   - Constructing the SDK instance begins a **handshake** with the Discord client.  
   - Once established, the iframe receives a message:  
     ```
     [FRAME, { evt: 'READY', ... }]
     ```  
   - The SDK’s `ready()` method resolves once a connection is established.  

3. **Authorization and Authentication**  
   - After receiving the **READY** payload, your app should perform **OAuth authorization** and **authentication** to acquire necessary scopes.  
   - This is required to use features like `rpc.activities.write`.  

4. **Interacting with the Discord Client**  
   - After authentication, your app can **subscribe to events** and **send commands**.  
   - Using commands or events outside your granted scope will throw errors.  
   - Adding new scopes may prompt the user with an OAuth modal for confirmation.  

5. **Disconnection and Errors**  
   - A message like:  
     ```
     [CLOSE, { message: string, code: number }]
     ```  
     indicates an error or that you must restart the connection.  

6. **Sending Errors or Close Requests**  
   - To send an error or request closure:  
     ```
     [CLOSE, { message?: string, code: number }]
     ```  
   - Any code other than `CLOSE_NORMAL` displays the message to the user.  
   - `CLOSE_NORMAL` results in silent closure.  

---

## Sample Code and Activity Lifecycle Diagram

Below is a **minimal example** of setting up the SDK.  
For complete applications, see the **Sample Projects**.

```javascript
import { DiscordSDK } from '@discord/embedded-app-sdk';

const discordSdk = new DiscordSDK(YOUR_OAUTH2_CLIENT_ID);

async function setup() {
  // Wait for READY payload from the Discord client
  await discordSdk.ready();

  // Request OAuth authorization for listed scopes
  const { code } = await discordSdk.commands.authorize({
    client_id: YOUR_OAUTH2_CLIENT_ID,
    response_type: 'code',
    state: '',
    prompt: 'none',
    scope: ['identify'],
  });

  // Exchange the code for an access_token from your server
  const response = await fetch('/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });

  const { access_token } = await response.json();

  // Authenticate with the Discord client
  auth = await discordSdk.commands.authenticate({
    access_token,
  });
}
```

### Activity Lifecycle Diagram

This diagram illustrates the communication flow between your application and Discord in the sample code above:

**Discord-Client → Application-Iframe → Discord API → Application-Server**

1. **SDK Setup**  
   - Mounts application iframe (no nonce included)  
   - Initiates handshake  
   - Opens socket  
   - Fetches application info and sets it on the socket object  
   - Returns application info (no nonce included)  
   - Sends Ready Payload  

2. **Authorization**  
   - OAuth modal opens  
   - Requests authorization for scopes  
   - User replies with OAuth authorize code  
   - Application iframe sends OAuth code to the server  
   - Server exchanges OAuth code + client secret for access_token with the developer portal  
   - Server replies with access_token  
   - Application iframe replies with access_token  
   - Client authenticates with access_token  
   - Authentication validated (includes nonce)  

3. **Command Example**  
   - Application iframe sends a command  
   - Command runs on the client  
   - Sensitive info stripped (response verified against nonce)  
   - Command response returned  

4. **Event Subscribe Example**  
   - Application iframe subscribes to an event  
   - Event is captured by Discord client  
   - Event is DISPATCHed to iframe (no nonce)  

---

**@discord/embedded-app-sdk:** Authentication, Command, and Event flows