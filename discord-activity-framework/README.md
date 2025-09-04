# Discord Activity Framework

A comprehensive, production-ready framework for building Discord Activities with rich presence, authentication, and interactive features.

## 🚀 Features

- **Complete Discord SDK Integration** - Full support for the Discord Embedded App SDK
- **OAuth2 Authentication** - Secure user authentication with Discord
- **Rich Presence** - Dynamic activity state updates and rich presence display
- **Real-time Events** - Voice state updates, speaking events, and more
- **Modern Development Stack** - Vite, Express, ES6 modules
- **Production Ready** - Error handling, logging, and deployment scripts
- **Mobile Support** - Works on desktop and mobile Discord clients
- **TypeScript Ready** - Easy to extend with TypeScript

## 📋 Prerequisites

- Node.js 18+ 
- A Discord Developer Account
- Basic knowledge of JavaScript/HTML/CSS
- Git (for version control)

## 🛠️ Quick Start

### 1. Clone and Setup

```bash
# Clone the framework
git clone <your-repo-url> discord-activity-framework
cd discord-activity-framework

# Install all dependencies
npm run install:all

# Copy environment template
cp example.env .env
```

### 2. Discord Developer Portal Setup

Follow the detailed setup guide below to configure your Discord application.

### 3. Development

```bash
# Start development servers (client + server)
npm run dev

# In another terminal, create a tunnel for testing
npm run tunnel
```

### 4. Test Your Activity

1. Copy the tunnel URL from the previous step
2. Add it to your Discord app's URL mappings (see setup guide below)
3. Launch your Activity in Discord!

## 🔧 Discord Developer Portal Setup Guide

This comprehensive guide walks you through every setting in the Discord Developer Portal needed to build and deploy a Discord Activity.

### Step 1: Create a Discord Application

1. **Go to the Discord Developer Portal**
   - Visit [https://discord.com/developers/applications](https://discord.com/developers/applications)
   - Log in with your Discord account

2. **Create a New Application**
   - Click the **"New Application"** button
   - Enter a name for your application (e.g., "My Awesome Activity")
   - Select your development team (or create one)
   - Click **"Create"**

3. **Note Your Application ID**
   - On the **General Information** page, copy your **Application ID**
   - This is your `CLIENT_ID` - you'll need it for the `.env` file

### Step 2: Configure Installation Contexts

1. **Navigate to Installation Settings**
   - In the left sidebar, click **"Installation"**
   - Under **"Installation Contexts"**, ensure both are selected:
     - ✅ **User Install** - Allows users to install your app to their account
     - ✅ **Guild Install** - Allows servers to install your app

2. **Why Both Contexts?**
   - **User Install**: Your Activity can be launched in DMs and Group DMs
   - **Guild Install**: Your Activity can be launched in server channels
   - Having both gives maximum flexibility

### Step 3: OAuth2 Configuration

1. **Navigate to OAuth2 Settings**
   - Click **"OAuth2"** in the left sidebar
   - Click **"General"** tab

2. **Add Redirect URIs**
   - In the **"Redirects"** section, add:
     - `https://127.0.0.1` (for local development)
     - Your production domain (e.g., `https://yourapp.com/auth/callback`)
   - Click **"Save Changes"**

3. **Copy OAuth2 Credentials**
   - Copy your **Client ID** (same as Application ID)
   - Copy your **Client Secret** (keep this secure!)
   - Add these to your `.env` file

### Step 4: Enable Activities

1. **Navigate to Activities Settings**
   - Click **"Activities"** in the left sidebar
   - Click **"Settings"**

2. **Enable Activities**
   - Check the **"Enable Activities"** checkbox
   - This creates a default "Launch" command for your Activity

3. **Configure Activity Settings**
   - **Activity Type**: Select "Activity" (not "Rich Presence")
   - **Supported Platforms**: Select "Desktop" and "Mobile"
   - **Supported Locales**: Add "en-US" (and others as needed)

### Step 5: URL Mappings (Development)

1. **Navigate to URL Mappings**
   - Click **"Activities"** → **"URL Mappings"**

2. **Add Development URL**
   - **Prefix**: `/` (root path)
   - **Target**: Your tunnel URL (e.g., `https://funky-jogging-bunny.trycloudflare.com`)
   - Click **"Add Mapping"**

3. **URL Mapping Rules**
   - **Prefix**: The path prefix in your Activity URL
   - **Target**: Where requests to that prefix should be routed
   - For development, map `/` to your tunnel URL
   - For production, map `/` to your production domain

### Step 6: Art Assets (Optional)

1. **Navigate to Art Assets**
   - Click **"Activities"** → **"Art Assets"**

2. **Upload Activity Images**
   - **Large Image**: 1024x1024px (for rich presence)
   - **Small Image**: 512x512px (for rich presence)
   - **Activity Icon**: 512x512px (for the Activity launcher)

3. **Image Requirements**
   - Format: PNG, JPG, or GIF
   - Max size: 8MB
   - Must be appropriate content
   - Will be reviewed by Discord

### Step 7: App Testers (Optional)

1. **Navigate to App Testers**
   - Click **"App Testers"** in the left sidebar

2. **Add Test Users**
   - Add Discord user IDs of people who should test your Activity
   - Testers can access your Activity before it's published
   - Useful for getting feedback during development

### Step 8: Environment Configuration

1. **Update Your .env File**
   ```env
   # Discord Application Credentials
   DISCORD_CLIENT_ID=your_application_id_here
   DISCORD_CLIENT_SECRET=your_client_secret_here
   
   # Client-side environment variable
   VITE_CLIENT_ID=your_application_id_here
   
   # Server Configuration
   PORT=3001
   ```

2. **Security Notes**
   - Never commit your `.env` file to version control
   - Keep your Client Secret secure
   - Use different credentials for development and production

## 🏗️ Project Structure

```
discord-activity-framework/
├── client/                 # Frontend application
│   ├── index.html         # Main HTML file
│   ├── main.js           # Main JavaScript application
│   ├── style.css         # Application styles
│   ├── package.json      # Client dependencies
│   └── vite.config.js    # Vite configuration
├── server/               # Backend server
│   ├── server.js         # Express server
│   └── package.json      # Server dependencies
├── activity.json         # Activity configuration
├── manifest.json         # Application manifest
├── example.env          # Environment template
├── deploy.sh            # Deployment script
├── package.json         # Root package.json
└── README.md           # This file
```

## 🎮 Using the Framework

### Basic Activity Setup

The framework provides a complete foundation for Discord Activities. Here's how to customize it:

1. **Update Activity Information**
   - Edit `activity.json` with your Activity details
   - Update the `manifest.json` with your app information

2. **Customize the UI**
   - Modify `client/index.html` for your Activity's interface
   - Update `client/style.css` for styling
   - Add your game logic to `client/main.js`

3. **Add Backend Functionality**
   - Extend `server/server.js` with your API endpoints
   - Add database integration if needed
   - Implement user data persistence

### Rich Presence Features

The framework includes built-in rich presence management:

```javascript
// Update activity state
await discordSdk.commands.setActivity({
  activity: {
    type: 0, // Playing
    details: "Building an awesome Activity",
    state: "In Development",
    timestamps: {
      start: Date.now()
    },
    assets: {
      large_image: "your_large_image_key",
      large_text: "Your Activity Name",
      small_image: "your_small_image_key", 
      small_text: "Status"
    }
  }
});
```

### Event Handling

Listen to Discord events:

```javascript
// Voice state updates
discordSdk.subscribe('VOICE_STATE_UPDATE', (data) => {
  console.log('Voice state changed:', data);
});

// Speaking events
discordSdk.subscribe('SPEAKING_START', (data) => {
  console.log('User started speaking:', data);
});
```

## 🚀 Deployment

### Development Deployment

1. **Start Development Servers**
   ```bash
   npm run dev
   ```

2. **Create Tunnel**
   ```bash
   npm run tunnel
   ```

3. **Update URL Mappings**
   - Copy the tunnel URL
   - Add it to your Discord app's URL mappings

### Production Deployment

1. **Prepare for Production**
   ```bash
   # Update your .env with production values
   # Update activity.json with production URL
   # Build the application
   npm run build
   ```

2. **Deploy to Your Server**
   - Upload the `dist/` folder to your web server
   - Ensure your server supports Node.js applications
   - Set up environment variables on your server

3. **Update Discord Settings**
   - Update URL mappings to point to your production domain
   - Test your Activity in production

4. **Use the Deployment Script**
   ```bash
   ./deploy.sh
   ```

## 🔒 Security Considerations

### Environment Variables
- Never expose your `DISCORD_CLIENT_SECRET` in client-side code
- Use different credentials for development and production
- Rotate secrets regularly

### OAuth2 Security
- Always validate the authorization code on your server
- Use HTTPS in production
- Implement proper error handling

### Content Security
- Validate all user inputs
- Sanitize data before displaying
- Implement rate limiting on your API

## 🐛 Troubleshooting

### Common Issues

1. **"Discord SDK not available"**
   - Make sure you're running the Activity within Discord
   - Check that your URL mappings are correct
   - Verify your Activity is enabled in the Developer Portal

2. **Authentication Failures**
   - Verify your Client ID and Secret are correct
   - Check that your redirect URI is properly configured
   - Ensure your server is running and accessible

3. **Rich Presence Not Updating**
   - Check that you have the `rpc.activities.write` scope
   - Verify your activity state format is correct
   - Make sure you're calling `setActivity` after authentication

4. **URL Mapping Issues**
   - Ensure your tunnel/server is running
   - Check that the URL is accessible from the internet
   - Verify the prefix and target are correctly configured

### Debug Mode

Enable debug logging by setting:
```env
LOG_LEVEL=debug
```

### Getting Help

- Check the [Discord Developer Documentation](https://discord.com/developers/docs)
- Join the [Discord Developers Server](https://discord.gg/discord-developers)
- Review the [Embedded App SDK Reference](https://discord.com/developers/docs/game-sdk/sdk-reference)

## 📚 Additional Resources

### Discord Documentation
- [Activities Overview](https://discord.com/developers/docs/activities/overview)
- [Embedded App SDK](https://discord.com/developers/docs/game-sdk/sdk-reference)
- [OAuth2 Guide](https://discord.com/developers/docs/topics/oauth2)

### Framework Examples
- Check the `examples/` directory for sample implementations
- Review the existing Discord Activity examples in your workspace

### Community
- [Discord Developers Server](https://discord.gg/discord-developers)
- [Discord API Server](https://discord.gg/discord-api)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the Discord Developer Documentation
3. Open an issue on GitHub
4. Join the Discord Developers community

---

**Happy Building! 🎮**

This framework provides everything you need to create amazing Discord Activities. Start with the basic setup, customize it for your needs, and deploy to share your creation with the Discord community!
