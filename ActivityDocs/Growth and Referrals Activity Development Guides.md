# Growth & Referrals

This guide covers strategies and APIs to help your Activity grow through shareable, trackable links. It includes how to prompt users to share, how to handle referrals, and how to create & manage custom incentivized links (both via the Developer Portal and programmatically from your Activity).

---

## On This Page
- [Prompting Users to Share Incentivized Links](#prompting-users-to-share-incentivized-links)
- [Implementation Overview](#implementation-overview)
- [Sharing Links](#sharing-links)
- [Handling Incoming Referrals](#handling-incoming-referrals)
- [Link Sharing Best Practices](#link-sharing-best-practices)
- [Creating and Managing Custom Incentivized Links](#creating-and-managing-custom-incentivized-links)
  - [Creating a Link](#creating-a-link)
  - [Editing a Link](#editing-a-link)
  - [Copying a Link](#copying-a-link)
  - [Deleting a Link](#deleting-a-link)
  - [Best Practices](#best-practices)
  - [User Experience](#user-experience)
- [Generating a Custom Link Within Your Activity](#generating-a-custom-link-within-your-activity)
  - [Generating a Link](#generating-a-link)

---

## Prompting Users to Share Incentivized Links

Incentivized sharing can help grow your Activity via network effects. Useful patterns include:

- **Referral links** — Users copy links from your Activity that include their Discord user ID, e.g.  
  `https://discord.com/activities/<YOUR_ACTIVITY_ID>?referrer_id=123456789`  
  If a friend clicks and starts playing, reward the referrer.
- **Promotions** — Run time-limited promos with a **custom_id**, e.g.  
  `https://discord.com/activities/<YOUR_ACTIVITY_ID>?custom_id=social012025`
- **Social deep-links** — Link directly to relevant in-app locations, e.g.  
  `https://discord.com/activities/<YOUR_ACTIVITY_ID>?referrer_id=123456789&custom_id=visitlocation`
- **Turn-based deep-links** — DM users a link that opens the exact game instance and turn.
- **Affiliate marketing** — Attribute traffic to partners via **custom_id**, e.g.  
  `https://discord.com/activities/<YOUR_ACTIVITY_ID>?custom_id=influencer1`
- **Source attribution** — Use **custom_id** values to segment traffic across campaigns.

This guide demonstrates a referral flow that rewards the sharer and the new user.

---

## Implementation Overview

1. Generate a unique identifier for the share (campaign/user/share-level granularity).
2. Use the **Embedded App SDK** `shareLink` command to let the user share.
3. Track the share attempt and whether it succeeded.
4. On launch, read referral data exposed by the SDK and validate on your server.
5. Grant rewards when a valid referral is detected (avoid abuse, prevent self-referrals).

---

## Sharing Links

```ts
import { DiscordSDK } from '@discord/embedded-app-sdk';

const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);
await discordSdk.ready();

// Generate a unique ID for this promotion.
// This could be per-campaign, per-user, or per-share depending on your needs.
const customId = await createPromotionalCustomId();

try {
  const { success } = await discordSdk.commands.shareLink({
    message: 'Click this link to redeem 5 free coins!',
    custom_id: customId,
  });

  if (success) {
    // Track successful share for analytics / limiting
    await trackSuccessfulShare(customId);
  }
} catch (error) {
  // Handle share failures appropriately
  console.error('Failed to share link:', error);
}
```

---

## Handling Incoming Referrals

When a user clicks a shared link, your Activity launches with referral metadata available through the SDK.

```ts
// Early in your activity's initialization
async function handleReferral(currentUserId: string) {
  // Validate the referral data
  const { customId, referrerId } = {
    customId: (discordSdk as any).customId,
    referrerId: (discordSdk as any).referrerId,
  };

  if (!customId || !referrerId) return;

  try {
    // Verify this is a valid promotion and hasn't expired
    const promotion = await validatePromotion(customId);
    if (!promotion) {
      console.log('Invalid or expired promotion');
      return;
    }

    // Prevent self-referrals
    if (referrerId === currentUserId) {
      console.log('Self-referrals not allowed');
      return;
    }

    // Grant rewards to both users
    await grantRewards({
      promotionId: customId,
      referrerId,
      newUserId: currentUserId,
    });
  } catch (error) {
    console.error('Failed to process referral:', error);
  }
}
```

**Important security notes**

- Generate unique, non-guessable `custom_id` values.
- Track & validate referrals server-side to prevent abuse.
- **Do not** override the `referrer_id` query parameter directly.  
  When present, `referrer_id` is expected to be a Discord snowflake user ID; otherwise it will be set to the message author’s ID by Discord.

---

## Link Sharing Best Practices

- Handle edge cases (e.g., expired promotions) gracefully.
- Consider cool-down periods between shares to reduce spam.
- Localize share copy where useful.
- Ensure your server validates campaign status and user eligibility before granting rewards.

---

## Creating and Managing Custom Incentivized Links

Use the **Developer Portal** to create branded “Custom Links” that control how your link appears as an embed off-platform.

### Creating a Link

1. In your application’s portal, open **Activities → Custom Links**.
2. Click **Create New**.
3. Upload an image (aspect ratio **43:24**).
4. Provide **Title** and **Description** (required).
5. Optionally set a **custom_id** (a `custom_id` present in the URL itself will override this).
6. Click **Save**.

### Editing a Link

1. Click on a row to open the edit modal.
2. Update the fields (e.g., description).
3. Click **Update**.

### Copying a Link

- Click the **copy** icon on the row. The icon turns green to confirm copy.  
- Share the URL anywhere. It looks like:
  ```
  https://discord.com/activities/<YOUR_ACTIVITY_ID>?link_id=0-123456789
  ```
  Even if a **custom_id** is set in the portal, it won’t appear in the URL but will load when the user clicks the link.
- You may optionally shorten the URL.

### Deleting a Link

1. Click the **trash** icon on the link’s row.
2. Confirm the deletion in the dialog.

> **Warning:** Deletion is **immediate** and **irreversible**. Ensure your link isn’t actively used, and that your Activity gracefully handles any post-deletion visits.

### Best Practices

- Generate unique, non-guessable `custom_id`s.
- Track and validate referrals to prevent abuse.
- Gracefully handle expirations for any time-limited links still circulating off-platform.

### User Experience

- Users see an embed with your configured image, title, and description.
- Clicking **Play** opens the Activity and passes through your `custom_id`.
- A `referrer_id` will be present for links shared on Discord.

---

## Generating a Custom Link Within Your Activity

You can also generate **ephemeral, customizable links** directly from your Activity:

- Customize the embed presentation (image/title/description).
- Generate on-demand.
- **Ephemeral** with a **30-day TTL**.
- These do **not** appear in the Developer Portal.

### Generating a Link

```ts
import { DiscordSDK } from '@discord/embedded-app-sdk';

// Convert an image ArrayBuffer to a base64-encoded string ahead of time
const image = base64EncodedImage; // e.g., "data:image/png;base64,AAAA..."

const res = await fetch(`${env.discordAPI}/applications/${env.applicationId}/...`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${accessToken}`, // user token from OAuth
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    custom_id: 'user_123/game_456',
    description: 'I just beat level 10 with a perfect score',
    title: 'Check out my high score!',
    image, // base64 data URL string
  }),
});

// The endpoint returns a JSON payload with a link_id
const { link_id } = await res.json();

// Open the Share modal in Discord with the generated link
const { success } = await discordSdk.commands.shareLink({
  message: 'Check out my high score!',
  link_id,
});

if (success) {
  console.log('User shared link!');
} else {
  console.log('User did not share link');
}
```

> **Note:** The exact REST path for link creation may vary; consult your latest API docs. The returned payload must include a `link_id`, which you pass to `discordSdk.commands.shareLink({ link_id })`.

---

## Appendix: Quick Reference

- **shareLink** — Presents a modal for the user to share a link with optional `message`, `custom_id`, or `link_id`.
- **referrer_id** — Assigned by Discord for links shared on-platform; treat as authoritative (don’t override client-side).
- **custom_id** — Arbitrary campaign or context identifier you assign; validate on your backend.
- **Developer Portal → Activities → Custom Links** — Create, edit, copy, and delete branded links for off-platform sharing.

