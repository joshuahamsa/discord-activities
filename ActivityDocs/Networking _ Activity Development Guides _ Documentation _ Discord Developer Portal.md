# Networking

## Activity Proxy Considerations

All network traffic is routed through the **Discord Proxy** for security reasons.  
Under the hood, Discord uses **Cloudflare Workers**, which imposes certain restrictions:  

- **Currently supported**: WebSockets  
- **Planned**: WebTransport  
- **Not supported**: WebRTC  

---

## Construct a Full URL

In some cases, you may need to use a **full URL** rather than a relative path.  

The full URL is a combination of:  
1. Protocol (https)  
2. Your application's client ID  
3. The Discord proxy domain  
4. The resource path  

### Example

Given a client ID of `12345678`:

| Relative Path | Full Path |
|---------------|-----------|
| `/foo/bar.jpg` | `https://12345678.discordsays.com/foo/bar.jpg` |

```javascript
const protocol = "https";
const clientId = "<YOUR CLIENT ID>";
const proxyDomain = "discordsays.com";
const resourcePath = "/foo/bar.jpg";

const url = new URL(`${protocol}://${clientId}.${proxyDomain}${resourcePath}`);
```

---

## Using External Resources

Activities in Discord are **sandboxed** via the proxy.  
This protects user IPs and blocks malicious endpoints.  

### Important Notes
- External (non-sandboxed) URLs are blocked → will result in `blocked:csp` errors.  
- Example: An npm module tries `https://foo.library.com` → fails.  

### Solutions
1. Fork the library (update with mapped URLs)  
2. Use a post-install tool like `patch-package`  
3. Use the **Embedded App SDK's** `patchUrlMappings` API (recommended)  

### Example

Developer Portal mapping:  
```
/foo -> foo.com
```

Code:
```javascript
import { patchUrlMappings } from '@discord/embedded-app-sdk';

const isProd = process.env.NODE_ENV === 'production';

async function setupApp() {
  if (isProd) {
    patchUrlMappings([{ prefix: '/foo', target: 'foo.com' }]);
  }
  // Continue app initialization here...
}
```

⚠️ Note: `patchUrlMappings` modifies `fetch`, `WebSocket`, and `XMLHttpRequest.prototype.open`.  
This can cause side effects depending on the library. Use only when necessary.

---

## Security Considerations

Do **not** trust data coming from the Discord client as truth.  

- User data (username, nitro status, channel, etc.) may be falsified.  
- Use this data locally only.  
- For trusted data → call the Discord API directly from your server with the **OAuth2 user token**.  

Additionally:  
- Data from the client is **not sanitized**.  
- Sanitize all strings (e.g., usernames, channel names).  
- Use `.textContent` (instead of `.innerHTML`) to safely display data in the UI.

---

### Trusting Client Data

If your activity sets a cookie for proxy network requests:  
- Cookie’s domain **must match**: `{clientId}.discordsays.com`  
- Cookie must include:  
  - `SameSite=None`  
  - `Partitioned`  

Why?  
- `SameSite=None` → required for cookies in iframes  
- `Partitioned` → limits the cookie to your own activity iframe only  

✅ Other activities cannot access your cookies thanks to **CSP enforcement**.

---

### Using Cookies

To set cookies correctly for network requests through the proxy, ensure the following:  
- Domain: `{clientId}.discordsays.com`  
- Flags: `SameSite=None; Partitioned`  

This ensures secure, activity-specific cookie behavior in Discord’s sandboxed environment.  
