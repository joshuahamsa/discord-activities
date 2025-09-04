# Discord Activities Collection

A comprehensive collection of Discord Activity examples, documentation, and a production-ready framework for building Discord Activities.

## 📚 What's Included

### 🏗️ Discord Activity Framework
A complete, production-ready framework for building Discord Activities with:
- **Full Discord SDK Integration** - Complete Embedded App SDK support
- **OAuth2 Authentication** - Secure user authentication flow
- **Rich Presence Management** - Dynamic activity state updates
- **Modern Development Stack** - Vite, Express, ES6 modules
- **Production Deployment** - Automated deployment scripts
- **Comprehensive Documentation** - Step-by-step setup guides

**Location**: `discord-activity-framework/`

### 📖 Complete Documentation
Comprehensive Discord Activity documentation covering:
- Activities Overview and Design Patterns
- Development Guides and Best Practices
- Rich Presence Implementation
- Mobile and Multiplayer Development
- Production Readiness and Networking
- User Actions and Community Resources

**Location**: `ActivityDocs/`

### 🎮 Example Activities
Ready-to-use Discord Activity examples:
- **Basic Activity Template** - Simple starting point
- **Getting Started Activity** - Official Discord example
- **Svelte Activity** - Modern framework example
- **Custom Activity** - Advanced implementation

**Location**: `discord-activity/`, `getting-started-activity/`, `sveltkordity/`

## 🚀 Quick Start

### Option 1: Use the Framework (Recommended)
```bash
# Clone this repository
git clone <your-repo-url> discord-activities
cd discord-activities

# Navigate to the framework
cd discord-activity-framework

# Follow the framework README for setup
cat README.md
```

### Option 2: Explore Examples
```bash
# Clone this repository
git clone <your-repo-url> discord-activities
cd discord-activities

# Explore any example project
cd getting-started-activity
# or
cd sveltkordity
# or
cd discord-activity
```

## 📋 Prerequisites

- Node.js 18+
- Discord Developer Account
- Basic knowledge of JavaScript/HTML/CSS
- Git (for version control)

## 🛠️ Framework Features

The Discord Activity Framework provides:

### Core Features
- ✅ **Discord SDK Integration** - Full Embedded App SDK support
- ✅ **Authentication Flow** - OAuth2 with Discord
- ✅ **Rich Presence** - Dynamic activity state management
- ✅ **Real-time Events** - Voice, speaking, and activity events
- ✅ **Mobile Support** - Works on desktop and mobile Discord
- ✅ **Production Ready** - Error handling, logging, deployment

### Development Tools
- ✅ **Hot Reload** - Vite development server
- ✅ **Concurrent Servers** - Client and server running together
- ✅ **Tunnel Support** - Cloudflare tunnel integration
- ✅ **Environment Management** - Secure credential handling
- ✅ **Build System** - Optimized production builds

### Documentation
- ✅ **Complete Setup Guide** - Discord Developer Portal configuration
- ✅ **API Reference** - All Discord SDK methods and events
- ✅ **Best Practices** - Security, performance, and deployment
- ✅ **Troubleshooting** - Common issues and solutions
- ✅ **Examples** - Multiple implementation patterns

## 📁 Repository Structure

```
DiscordActivities/
├── discord-activity-framework/    # 🏗️ Main Framework
│   ├── client/                   # Frontend (Vite + Discord SDK)
│   ├── server/                   # Backend (Express + OAuth2)
│   ├── assets/                   # Activity images and assets
│   ├── examples/                 # Framework examples
│   ├── README.md                 # Comprehensive setup guide
│   └── deploy.sh                 # Deployment script
├── ActivityDocs/                 # 📖 Complete Documentation
│   ├── Activities Overview Documentation.md
│   ├── Building Your First Activity in Discord.md
│   ├── Embedded App SDK Reference.md
│   ├── Production Readiness Activity Development Guides.md
│   └── ... (20+ documentation files)
├── getting-started-activity/     # 🎮 Official Discord Example
├── sveltkordity/                # 🎮 Svelte Framework Example
├── discord-activity/            # 🎮 Custom Activity Example
└── README.md                    # This file
```

## 🎯 Getting Started with the Framework

1. **Navigate to the Framework**
   ```bash
   cd discord-activity-framework
   ```

2. **Follow the Setup Guide**
   - Read the comprehensive README.md
   - Set up your Discord application
   - Configure environment variables
   - Start development servers

3. **Customize for Your Needs**
   - Modify the UI and styling
   - Add your game logic
   - Implement multiplayer features
   - Deploy to production

## 📚 Documentation Overview

The `ActivityDocs/` folder contains complete Discord documentation:

### Core Concepts
- **Activities Overview** - What are Discord Activities?
- **How Activities Work** - Technical implementation details
- **Activity Design Patterns** - Best practices and patterns

### Development Guides
- **Building Your First Activity** - Step-by-step tutorial
- **Activity Development Guides** - Comprehensive development guide
- **Mobile Activity Development** - Mobile-specific considerations
- **Multiplayer Experience** - Building multiplayer Activities

### Advanced Topics
- **Rich Presence** - Implementing rich presence features
- **User Actions** - Handling user interactions
- **Networking** - Real-time communication
- **Production Readiness** - Deployment and scaling

### SDK Reference
- **Embedded App SDK Reference** - Complete API documentation
- **Best Practices** - Performance and security guidelines

## 🔧 Example Activities

### Getting Started Activity
Official Discord example with basic functionality:
- Discord SDK integration
- User authentication
- Channel and guild information
- Rich presence updates

### Svelte Activity
Modern framework implementation:
- SvelteKit integration
- TypeScript support
- Advanced UI components
- Real-time features

### Custom Activity
Advanced implementation example:
- Complex game logic
- Multiplayer features
- Custom UI components
- Production deployment

## 🚀 Deployment

### Development
```bash
# Start development servers
npm run dev

# Create tunnel for testing
npm run tunnel
```

### Production
```bash
# Use the deployment script
./deploy.sh

# Or manual deployment
npm run build
# Upload dist/ folder to your server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](discord-activity-framework/LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `ActivityDocs/` folder
- **Framework Issues**: See `discord-activity-framework/README.md`
- **Discord API**: [Discord Developer Documentation](https://discord.com/developers/docs)
- **Community**: [Discord Developers Server](https://discord.gg/discord-developers)

## 🎉 What's Next?

1. **Start with the Framework** - Use `discord-activity-framework/` for new projects
2. **Explore Examples** - Study the example Activities for patterns
3. **Read Documentation** - Dive into `ActivityDocs/` for deep understanding
4. **Build Your Activity** - Create something amazing!
5. **Share with Community** - Contribute back to help others

---

**Happy Building! 🎮**

This collection provides everything you need to build professional Discord Activities. Start with the framework, explore the examples, and create something amazing for the Discord community!
