# Layout

## Application Orientation

This SDK provides APIs for locking the application to specific orientations. The possible lock states are:

- **UNLOCKED**
- **PORTRAIT**
- **LANDSCAPE**

`lock_state` is the default lock state, and it affects the app orientation when the application is focused.

- `picture_in_picture_lock_state` determines the PIP aspect ratio.
- `grid_lock_state` determines the grid tile aspect ratio for the application.

When `picture_in_picture_lock_state` is not set, the application PIP falls back to `lock_state` to determine the aspect ratio.  
When `grid_lock_state` is not set, the application grid tile falls back to `picture_in_picture_lock_state` to determine its aspect ratio.  
If `picture_in_picture_lock_state` is also not set, it uses `lock_state`.

Calling `setOrientationLockState` with an **undefined** or **omitted** value for `picture_in_picture_lock_state` or `grid_lock_state` will not change the corresponding lock states for the application.  
Calling `setOrientationLockState` with a **null** value for these fields will clear the corresponding lock states, causing them to use fallback states.

### Example: Locking Application Orientation

```javascript
import { DiscordSDK, Common } from '@discord/embedded-app-sdk';

const discordSdk = new DiscordSDK(clientId);
await discordSdk.ready();

// Set a default lock state
discordSdk.commands.setOrientationLockState({
  lock_state: Common.OrientationLockStateTypeObject.PORTRAIT,
});

// Or set both a default lock state and a picture-in-picture lock state
discordSdk.commands.setOrientationLockState({
  lock_state: Common.OrientationLockStateTypeObject.PORTRAIT,
  picture_in_picture_lock_state: Common.OrientationLockStateTypeObject.LANDSCAPE,
  grid_lock_state: Common.OrientationLockStateTypeObject.LANDSCAPE,
});
```

### Configuring Default Orientation Lock State Through the Developer Portal

It is also possible to configure a default orientation lock state via the **Developer Portal**.  
Using this method, the Discord app applies the orientation lock before the SDK initializes, creating a smoother launch flow.  
This ensures the application starts in the correct orientation immediately, instead of switching after a delay.

The Developer Portal supports setting different default orientation lock states for **phones** versus **tablets**.

### Subscribing to Screen Orientation Updates

To listen for screen orientation (sometimes different from the physical device orientation), subscribe to the `ORIENTATION_UPDATE` event. Discord will publish the current orientation upon subscription and send updates for changes.

```javascript
const handleOrientationUpdate = (update: { screen_orientation: number }) => {
  switch (update.screen_orientation) {
    case Common.OrientationTypeObject.PORTRAIT:
      // Handle portrait
      break;
    case Common.OrientationTypeObject.LANDSCAPE:
      // Handle landscape
      break;
    default:
      // Handle unknown orientation
  }
};

discordSdk.subscribe('ORIENTATION_UPDATE', handleOrientationUpdate);
```

---

## Application Layout Mode

There are three layout modes that an application can be in:

1. **Focused**
2. **Picture-in-Picture (PIP)**
3. **Grid Mode**

Activities can subscribe to the layout mode to determine when to update or optimize their layouts.

- Old Discord clients only support the `ACTIVITY_PIP_MODE_UPDATE` event.  
- New Discord clients support both `ACTIVITY_PIP_MODE_UPDATE` and `ACTIVITY_LAYOUT_MODE_UPDATE`.

Use `subscribeToLayoutModeUpdatesCompat` and `unsubscribeFromLayoutModeUpdatesCompat` for backward compatibility.

### Example: Subscribing to Layout Mode Updates in React

```javascript
export default function LayoutMode() {
  const handleLayoutModeUpdate = React.useCallback((update: { layout_mode: number }) => {
    // Handle layout mode update here
  }, []);

  React.useEffect(() => {
    discordSdk.subscribeToLayoutModeUpdatesCompat(handleLayoutModeUpdate);
    return () => {
      discordSdk.unsubscribeFromLayoutModeUpdatesCompat(handleLayoutModeUpdate);
    };
  }, [handleLayoutModeUpdate]);
}
```
