# Basic Activity Example

This example shows how to create a simple Discord Activity using the framework.

## Features

- Basic Discord SDK integration
- User authentication
- Simple UI with activity state management
- Rich presence updates

## Getting Started

1. **Copy the Example**
   ```bash
   cp -r examples/basic-activity/* .
   ```

2. **Follow the Main README**
   - Set up your Discord application
   - Configure environment variables
   - Start development servers

3. **Customize**
   - Modify the UI in `client/index.html`
   - Update styles in `client/style.css`
   - Add your game logic to `client/main.js`

## Code Structure

### Client (`client/main.js`)
- Discord SDK initialization
- User authentication
- Basic UI setup
- Activity state management

### Server (`server/server.js`)
- OAuth2 token exchange
- Basic API endpoints
- Error handling

## Key Concepts

### Authentication Flow
1. User launches Activity in Discord
2. Activity requests authorization with Discord
3. Discord returns authorization code
4. Server exchanges code for access token
5. Activity authenticates with Discord client

### Rich Presence
- Update activity state with `setActivity()`
- Show current user status
- Display custom images and text

### Event Handling
- Listen to Discord events
- React to user actions
- Update UI based on events

## Next Steps

- Add your game logic
- Implement multiplayer features
- Add persistent data storage
- Create custom UI components
- Add more Discord API integrations
