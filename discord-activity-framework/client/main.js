/**
 * Discord Activity Framework - Main Client Application
 * 
 * This is the main entry point for Discord Activities built with this framework.
 * It handles Discord SDK initialization, authentication, and provides a foundation
 * for building interactive Activities.
 */

import { DiscordSDK } from "@discord/embedded-app-sdk";
import "./style.css";

// Global state
let discordSdk = null;
let auth = null;
let isConnected = false;

// DOM elements
const app = document.querySelector('#app');
const statusElement = document.createElement('div');
statusElement.className = 'status';
statusElement.textContent = 'Initializing...';
document.body.appendChild(statusElement);

/**
 * Initialize the Discord SDK and set up the application
 */
async function initializeDiscordSDK() {
  try {
    updateStatus('Connecting to Discord...');
    
    // Get client ID from environment
    const clientId = import.meta.env.VITE_CLIENT_ID;
    if (!clientId) {
      throw new Error('VITE_CLIENT_ID environment variable is required');
    }

    // Initialize Discord SDK
    discordSdk = new DiscordSDK(clientId);
    
    // Wait for SDK to be ready
    await discordSdk.ready();
    updateStatus('Discord SDK Ready');
    
    // Authenticate user
    await authenticateUser();
    
    // Set up the main application UI
    setupApplication();
    
  } catch (error) {
    console.error('Failed to initialize Discord SDK:', error);
    updateStatus('Connection Failed', 'error');
    showError('Failed to connect to Discord. Please make sure you are running this Activity within Discord.');
  }
}

/**
 * Authenticate the user with Discord
 */
async function authenticateUser() {
  try {
    updateStatus('Authenticating...');
    
    // Authorize with Discord
    const { code } = await discordSdk.commands.authorize({
      client_id: import.meta.env.VITE_CLIENT_ID,
      response_type: "code",
      state: "",
      prompt: "none",
      scope: [
        "identify",
        "guilds",
        "applications.commands",
        "rpc.activities.write"
      ],
    });

    // Exchange code for access token
    const response = await fetch("/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error(`Token exchange failed: ${response.statusText}`);
    }

    const { access_token } = await response.json();

    // Authenticate with Discord client
    auth = await discordSdk.commands.authenticate({ access_token });
    
    if (!auth) {
      throw new Error("Authentication failed");
    }

    updateStatus('Authenticated', 'connected');
    isConnected = true;
    
  } catch (error) {
    console.error('Authentication failed:', error);
    throw error;
  }
}

/**
 * Set up the main application UI
 */
function setupApplication() {
  app.innerHTML = `
    <div class="discord-activity">
      <div class="activity-header">
        <h1>🎮 Discord Activity Framework</h1>
        <p>Welcome to your Discord Activity!</p>
      </div>
      
      <div class="main-content">
        <div class="activity-info">
          <h2>📊 Activity Information</h2>
          <div class="info-grid" id="activity-info-grid">
            <!-- Activity info will be populated here -->
          </div>
        </div>
        
        <div class="activity-state">
          <h2>🎯 Activity State Management</h2>
          <div class="state-form">
            <div class="form-group">
              <label for="activity-details">Activity Details</label>
              <input type="text" id="activity-details" placeholder="What are you doing?" value="Building an awesome Activity">
            </div>
            <div class="form-group">
              <label for="activity-state">Activity State</label>
              <input type="text" id="activity-state" placeholder="Current state" value="In Development">
            </div>
            <div class="form-group">
              <label for="activity-large-text">Large Image Text</label>
              <input type="text" id="activity-large-text" placeholder="Large image hover text" value="Discord Activity Framework">
            </div>
            <div class="form-group">
              <label for="activity-small-text">Small Image Text</label>
              <input type="text" id="activity-small-text" placeholder="Small image hover text" value="Framework">
            </div>
            <button class="btn" onclick="updateActivityState()">Update Activity State</button>
          </div>
        </div>
        
        <div class="controls">
          <button class="btn" onclick="getChannelInfo()">📺 Get Channel Info</button>
          <button class="btn" onclick="getGuildInfo()">🏰 Get Guild Info</button>
          <button class="btn secondary" onclick="shareActivity()">🔗 Share Activity</button>
          <button class="btn secondary" onclick="openExternalLink()">🌐 Open External Link</button>
          <button class="btn danger" onclick="closeActivity()">❌ Close Activity</button>
        </div>
      </div>
    </div>
  `;
  
  // Populate activity info
  populateActivityInfo();
  
  // Set up event listeners
  setupEventListeners();
  
  // Set initial activity state
  updateActivityState();
}

/**
 * Populate the activity information section
 */
async function populateActivityInfo() {
  const infoGrid = document.getElementById('activity-info-grid');
  
  try {
    // Get channel information
    let channelInfo = 'Not available';
    if (discordSdk.channelId && discordSdk.guildId) {
      try {
        const channel = await discordSdk.commands.getChannel({
          channel_id: discordSdk.channelId
        });
        channelInfo = channel.name || 'Unknown Channel';
      } catch (error) {
        console.warn('Could not fetch channel info:', error);
      }
    }
    
    // Get user information
    const userInfo = auth?.user ? `${auth.user.username}#${auth.user.discriminator}` : 'Unknown User';
    
    // Get guild information
    let guildInfo = 'Not available';
    if (discordSdk.guildId) {
      try {
        const guilds = await fetch(`https://discord.com/api/v10/users/@me/guilds`, {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
            'Content-Type': 'application/json',
          },
        }).then(response => response.json());
        
        const currentGuild = guilds.find(g => g.id === discordSdk.guildId);
        guildInfo = currentGuild ? currentGuild.name : 'Unknown Guild';
      } catch (error) {
        console.warn('Could not fetch guild info:', error);
      }
    }
    
    infoGrid.innerHTML = `
      <div class="info-item">
        <div class="info-label">User</div>
        <div class="info-value">${userInfo}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Channel</div>
        <div class="info-value">${channelInfo}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Guild</div>
        <div class="info-value">${guildInfo}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Instance ID</div>
        <div class="info-value">${discordSdk.instanceId || 'N/A'}</div>
      </div>
    `;
    
  } catch (error) {
    console.error('Error populating activity info:', error);
    infoGrid.innerHTML = '<div class="error-message">Failed to load activity information</div>';
  }
}

/**
 * Set up event listeners for the application
 */
function setupEventListeners() {
  // Listen for voice state updates
  if (discordSdk) {
    discordSdk.subscribe('VOICE_STATE_UPDATE', (data) => {
      console.log('Voice state updated:', data);
    });
    
    // Listen for speaking events
    discordSdk.subscribe('SPEAKING_START', (data) => {
      console.log('User started speaking:', data);
    });
    
    discordSdk.subscribe('SPEAKING_STOP', (data) => {
      console.log('User stopped speaking:', data);
    });
    
    // Listen for activity layout changes
    discordSdk.subscribe('ACTIVITY_LAYOUT_MODE_UPDATE', (data) => {
      console.log('Activity layout changed:', data);
    });
  }
}

/**
 * Update the activity's rich presence state
 */
async function updateActivityState() {
  if (!discordSdk || !isConnected) {
    showError('Not connected to Discord');
    return;
  }
  
  try {
    const details = document.getElementById('activity-details')?.value || 'Building an awesome Activity';
    const state = document.getElementById('activity-state')?.value || 'In Development';
    const largeText = document.getElementById('activity-large-text')?.value || 'Discord Activity Framework';
    const smallText = document.getElementById('activity-small-text')?.value || 'Framework';
    
    await discordSdk.commands.setActivity({
      activity: {
        type: 0, // Playing
        details: details,
        state: state,
        timestamps: {
          start: Date.now()
        },
        assets: {
          large_image: 'https://discord.com/assets/847541504914fd33810e70a0ea73177e.ico',
          large_text: largeText,
          small_image: 'https://discord.com/assets/847541504914fd33810e70a0ea73177e.ico',
          small_text: smallText
        }
      }
    });
    
    showSuccess('Activity state updated successfully!');
    
  } catch (error) {
    console.error('Failed to update activity state:', error);
    showError('Failed to update activity state');
  }
}

/**
 * Get channel information
 */
async function getChannelInfo() {
  if (!discordSdk || !discordSdk.channelId) {
    showError('No channel information available');
    return;
  }
  
  try {
    const channel = await discordSdk.commands.getChannel({
      channel_id: discordSdk.channelId
    });
    
    showSuccess(`Channel: ${channel.name} (${channel.type})`);
    console.log('Channel info:', channel);
    
  } catch (error) {
    console.error('Failed to get channel info:', error);
    showError('Failed to get channel information');
  }
}

/**
 * Get guild information
 */
async function getGuildInfo() {
  if (!discordSdk || !discordSdk.guildId) {
    showError('No guild information available');
    return;
  }
  
  try {
    const guilds = await fetch(`https://discord.com/api/v10/users/@me/guilds`, {
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
        'Content-Type': 'application/json',
      },
    }).then(response => response.json());
    
    const currentGuild = guilds.find(g => g.id === discordSdk.guildId);
    
    if (currentGuild) {
      showSuccess(`Guild: ${currentGuild.name}`);
      console.log('Guild info:', currentGuild);
    } else {
      showError('Guild not found');
    }
    
  } catch (error) {
    console.error('Failed to get guild info:', error);
    showError('Failed to get guild information');
  }
}

/**
 * Share the activity
 */
async function shareActivity() {
  if (!discordSdk) {
    showError('Discord SDK not available');
    return;
  }
  
  try {
    const { success } = await discordSdk.commands.shareLink({
      message: 'Check out this awesome Discord Activity!',
      custom_id: 'activity_share'
    });
    
    if (success) {
      showSuccess('Activity shared successfully!');
    } else {
      showError('Failed to share activity');
    }
    
  } catch (error) {
    console.error('Failed to share activity:', error);
    showError('Failed to share activity');
  }
}

/**
 * Open an external link
 */
async function openExternalLink() {
  if (!discordSdk) {
    showError('Discord SDK not available');
    return;
  }
  
  try {
    const { opened } = await discordSdk.commands.openExternalLink({
      url: 'https://discord.com/developers/applications'
    });
    
    if (opened) {
      showSuccess('External link opened!');
    } else {
      showError('Failed to open external link');
    }
    
  } catch (error) {
    console.error('Failed to open external link:', error);
    showError('Failed to open external link');
  }
}

/**
 * Close the activity
 */
function closeActivity() {
  if (!discordSdk) {
    showError('Discord SDK not available');
    return;
  }
  
  try {
    discordSdk.close(1000, "User closed the activity");
  } catch (error) {
    console.error('Failed to close activity:', error);
    showError('Failed to close activity');
  }
}

/**
 * Update the status indicator
 */
function updateStatus(message, type = '') {
  statusElement.textContent = message;
  statusElement.className = `status ${type}`;
  console.log('Status:', message);
}

/**
 * Show an error message
 */
function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    mainContent.insertBefore(errorDiv, mainContent.firstChild);
    
    // Remove after 5 seconds
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.parentNode.removeChild(errorDiv);
      }
    }, 5000);
  }
}

/**
 * Show a success message
 */
function showSuccess(message) {
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.textContent = message;
  
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    mainContent.insertBefore(successDiv, mainContent.firstChild);
    
    // Remove after 3 seconds
    setTimeout(() => {
      if (successDiv.parentNode) {
        successDiv.parentNode.removeChild(successDiv);
      }
    }, 3000);
  }
}

// Make functions globally available for onclick handlers
window.updateActivityState = updateActivityState;
window.getChannelInfo = getChannelInfo;
window.getGuildInfo = getGuildInfo;
window.shareActivity = shareActivity;
window.openExternalLink = openExternalLink;
window.closeActivity = closeActivity;

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeDiscordSDK);
