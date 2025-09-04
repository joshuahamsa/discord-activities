#!/bin/bash

# Discord Activity Framework - Deployment Script
# This script helps deploy your Discord Activity to production

set -e

echo "🚀 Discord Activity Framework - Deployment Script"
echo "=================================================="

# Check if required environment variables are set
if [ -z "$DISCORD_CLIENT_ID" ]; then
    echo "❌ Error: DISCORD_CLIENT_ID environment variable is not set"
    echo "Please set your Discord Client ID before deploying"
    exit 1
fi

if [ -z "$DISCORD_CLIENT_SECRET" ]; then
    echo "❌ Error: DISCORD_CLIENT_SECRET environment variable is not set"
    echo "Please set your Discord Client Secret before deploying"
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from example..."
    cp example.env .env
    echo "⚠️  Please edit .env file with your actual credentials before continuing"
    echo "Required variables:"
    echo "  - DISCORD_CLIENT_ID"
    echo "  - DISCORD_CLIENT_SECRET"
    echo "  - VITE_CLIENT_ID"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm run install:all

# Build the client
echo "🔨 Building client application..."
npm run build

# Update activity.json with your application ID
echo "📝 Updating activity.json with your Application ID..."
if [ -f "activity.json" ]; then
    sed -i.bak "s/YOUR_APPLICATION_ID_HERE/$DISCORD_CLIENT_ID/g" activity.json
    echo "✅ Updated activity.json with Application ID: $DISCORD_CLIENT_ID"
fi

# Create deployment package
echo "📦 Creating deployment package..."
mkdir -p dist
cp -r client/dist/* dist/ 2>/dev/null || echo "⚠️  Client build not found, skipping client files"
cp server/* dist/ 2>/dev/null || echo "⚠️  Server files not found, skipping server files"
cp activity.json dist/ 2>/dev/null || echo "⚠️  activity.json not found"
cp manifest.json dist/ 2>/dev/null || echo "⚠️  manifest.json not found"

echo "✅ Deployment package created in ./dist/"

# Display next steps
echo ""
echo "🎉 Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Upload the contents of ./dist/ to your web server"
echo "2. Update your Discord Application settings:"
echo "   - Go to https://discord.com/developers/applications"
echo "   - Select your application"
echo "   - Go to Activities > URL Mappings"
echo "   - Add your production URL"
echo "   - Go to Activities > Settings"
echo "   - Enable Activities"
echo "3. Test your Activity in Discord"
echo ""
echo "📚 For more information, see the README.md file"
