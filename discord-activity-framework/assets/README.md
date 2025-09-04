# Activity Assets

This directory contains assets for your Discord Activity.

## Required Assets

### Activity Images
- **large-image.png** (1024x1024px) - Large image for rich presence
- **small-image.png** (512x512px) - Small image for rich presence  
- **activity-icon.png** (512x512px) - Icon for the Activity launcher

### Image Requirements
- **Format**: PNG, JPG, or GIF
- **Max Size**: 8MB per image
- **Content**: Must be appropriate and follow Discord's guidelines
- **Review**: All images are subject to Discord's review process

## Uploading Assets

1. **Prepare Your Images**
   - Create images in the required sizes
   - Ensure they meet Discord's content guidelines
   - Optimize file sizes for faster loading

2. **Upload to Discord**
   - Go to your Discord Application settings
   - Navigate to **Activities** → **Art Assets**
   - Upload your images
   - Note the asset keys for use in your code

3. **Use in Your Activity**
   ```javascript
   await discordSdk.commands.setActivity({
     activity: {
       assets: {
         large_image: "your_large_image_key",
         large_text: "Your Activity Name",
         small_image: "your_small_image_key",
         small_text: "Status"
       }
     }
   });
   ```

## Asset Guidelines

### Content Guidelines
- No inappropriate, offensive, or NSFW content
- No copyrighted material without permission
- No misleading or deceptive content
- Must be relevant to your Activity

### Technical Guidelines
- Use high-quality images
- Ensure good contrast and readability
- Test how images look in Discord's UI
- Consider both light and dark themes

### Best Practices
- Use consistent branding across all assets
- Make images recognizable at small sizes
- Use clear, readable text overlays
- Test assets in different Discord clients

## Example Assets

The framework includes placeholder assets that you can replace:
- `large-image.png` - Default Discord logo
- `small-image.png` - Default Discord logo
- `activity-icon.png` - Default Discord logo

Replace these with your own branded assets for a professional appearance.
