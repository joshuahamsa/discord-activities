/**
 * Discord Activity Framework - Backend Server
 * 
 * This server handles OAuth2 authentication and provides API endpoints
 * for the Discord Activity client.
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Environment variables validation
const requiredEnvVars = ['DISCORD_CLIENT_ID', 'DISCORD_CLIENT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
  console.error('Please check your .env file and ensure all required variables are set.');
  process.exit(1);
}

/**
 * Exchange OAuth2 authorization code for access token
 */
app.post('/api/token', async (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://discord.com/api/v10/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'https://127.0.0.1', // Placeholder redirect URI
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Token exchange failed:', errorData);
      return res.status(400).json({ 
        error: 'Failed to exchange authorization code for access token',
        details: errorData
      });
    }

    const tokenData = await tokenResponse.json();
    
    // Return the access token
    res.json({
      access_token: tokenData.access_token,
      token_type: tokenData.token_type,
      expires_in: tokenData.expires_in,
      scope: tokenData.scope
    });

  } catch (error) {
    console.error('Error in token exchange:', error);
    res.status(500).json({ 
      error: 'Internal server error during token exchange',
      details: error.message
    });
  }
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

/**
 * Get user information endpoint
 */
app.get('/api/user', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization header required' });
    }

    const accessToken = authHeader.substring(7);
    
    const userResponse = await fetch('https://discord.com/api/v10/users/@me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!userResponse.ok) {
      return res.status(userResponse.status).json({ 
        error: 'Failed to fetch user information',
        status: userResponse.status
      });
    }

    const userData = await userResponse.json();
    res.json(userData);

  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message
    });
  }
});

/**
 * Get user's guilds endpoint
 */
app.get('/api/guilds', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization header required' });
    }

    const accessToken = authHeader.substring(7);
    
    const guildsResponse = await fetch('https://discord.com/api/v10/users/@me/guilds', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!guildsResponse.ok) {
      return res.status(guildsResponse.status).json({ 
        error: 'Failed to fetch guilds',
        status: guildsResponse.status
      });
    }

    const guildsData = await guildsResponse.json();
    res.json(guildsData);

  } catch (error) {
    console.error('Error fetching guilds:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message
    });
  }
});

/**
 * Activity data endpoint (for storing/retrieving activity-specific data)
 */
app.get('/api/activity/:activityId', (req, res) => {
  const { activityId } = req.params;
  
  // In a real application, you would fetch this from a database
  // For now, we'll return mock data
  res.json({
    activityId,
    name: 'Discord Activity Framework',
    version: '1.0.0',
    data: {
      // Add your activity-specific data here
    }
  });
});

app.post('/api/activity/:activityId', (req, res) => {
  const { activityId } = req.params;
  const { data } = req.body;
  
  // In a real application, you would save this to a database
  console.log(`Saving activity data for ${activityId}:`, data);
  
  res.json({
    success: true,
    activityId,
    message: 'Activity data saved successfully'
  });
});

/**
 * Error handling middleware
 */
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: error.message
  });
});

/**
 * 404 handler
 */
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path,
    method: req.method
  });
});

/**
 * Start the server
 */
app.listen(PORT, () => {
  console.log(`🚀 Discord Activity Framework Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔑 Make sure to set up your .env file with Discord credentials`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down server gracefully...');
  process.exit(0);
});
