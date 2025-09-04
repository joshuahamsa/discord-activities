# Mobile

## Supported Platforms: Web, iOS, Android

By default, your Activity is launchable on **web/desktop**.  

To enable or disable support for **Web/iOS/Android**:

1. Visit the [Discord Developer Portal](https://discord.com/developers)  
2. Select your application  
3. Go to **Activities → Settings** in the left sidebar  
   Or visit directly:  
   ```
   https://discord.com/developers/<your app id>/embedded/settings
   ```
4. Check or uncheck the appropriate platform boxes  
5. Save your changes  

---

## Mobile Safe Areas

Safe areas ensure your Activity UI doesn’t overlap with device notches, rounded corners, or system indicators.  

You can define safe area insets in CSS like this:

```css
:root {
  --sait: var(--discord-safe-area-inset-top, env(safe-area-inset-top));
  --saib: var(--discord-safe-area-inset-bottom, env(safe-area-inset-bottom));
  --sail: var(--discord-safe-area-inset-left, env(safe-area-inset-left));
  --sair: var(--discord-safe-area-inset-right, env(safe-area-inset-right));
}

body {
  padding-left: var(--sail);
  padding-right: var(--sair);
  padding-top: var(--sait);
  padding-bottom: var(--saib);
}
```

This prefers the `--discord-safe-area-inset-*` variables.  
If unavailable, it falls back to `env(safe-area-inset-*)` values (for iOS and local dev testing).

---

## Mobile Thermal States

You may need to respond to **thermal state changes** from devices to ensure a smooth user experience.  

Discord’s Embedded App SDK provides an abstraction over:
- Apple’s iOS thermal state APIs  
- Android’s thermal state APIs  

### Thermal State Mapping

```javascript
enum ThermalState {
  NOMINAL = 0,   // iOS: "nominal", Android: "none"
  FAIR = 1,      // iOS: "fair", Android: "light" / "moderate"
  SERIOUS = 2,   // iOS: "serious", Android: "severe"
  CRITICAL = 3,  // iOS: "critical", Android: "critical" / "emergency" / "shut"
}
```

### Subscribing to Thermal State Updates

The Embedded App SDK allows developers to subscribe to these changes.  

- On subscription → Discord publishes the current thermal state  
- Afterwards → Discord publishes updates on any changes  
- On Android → Available on Android 10 and higher  

```javascript
const handleThermalStateUpdate = (update: { thermal_state: number }) => {
  switch (update.thermal_state) {
    case Common.ThermalStateTypeObject.NOMINAL:
      // handle nominal
      break;
    case Common.ThermalStateTypeObject.FAIR:
      // handle fair
      break;
    case Common.ThermalStateTypeObject.SERIOUS:
      // handle serious
      break;
    case Common.ThermalStateTypeObject.CRITICAL:
      // handle critical
      break;
    default:
      // handle unknown state
  }
};

discordSdk.subscribe('THERMAL_STATE_UPDATE', handleThermalStateUpdate);
```
