# Production Readiness

## Cache Busting

All assets loaded by your application will respect cache headers. One exception is that Discord's application proxy will remove any cache headers for assets whose `content-type` headers include `text/html`. For all non-`text/html` content that your application plans to serve, be sure your application has a cache-busting strategy. This is often built into build processes.  

If your application has a static filename for its JavaScript or CSS, please be sure to implement cache busting techniques. For example, Webpack enables creating a content hash and manifest as a part of the build process.  

---

## Handling Rate Limits

Be sure network requests made by your application's client and server are able to respect Discord API's rate limiting as described in the documentation.  

See the Activity Starter project for an example of how to respect the `retry_after` header when you receive a **429** error.  

---

## Static IP Addresses

If your application's server is utilizing a dynamically assigned IP address (this is standard for cloud functions), there is a non-zero chance that you will inherit from a previous bad actor an IP address which has been banned by Cloudflare.  

In this scenario, any egress traffic from the IP address directed towards Discord's API will be banned for up to an hour.  

The best way to mitigate this situation is to set up a **static IP address** for all of your application server's egress traffic to be routed through.  

---

## Backward Compatibility

When new commands become available in the **embedded-app-sdk**, those commands won't be supported by all Discord app versions.  

The new command will typically only be supported by newer Discord app versions. When an application tries to use a new command with an old Discord app version that doesn't support it, the Discord app will respond with error code `INVALID_COMMAND`.  

The application can handle it like this:

```javascript
try {
  const { permissions } = await discordSdk.commands.getChannelPermissions();
  // check permissions ...
} catch (error) {
  if (error.code == RPCErrorCodes.INVALID_COMMAND) {
    // This is an expected error.
    // The Discord client doesn't support this command
    ...
  } else {
    // Unexpected error
    ...
  }
}
```
