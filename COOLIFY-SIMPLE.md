# Simple Coolify Deployment Fix

## Problem
Getting "no available server" error on Coolify deployment.

## Solution
Use the simple Node.js Express server instead of nginx.

## Files Required
- `index.html` - Your main HTML file
- `styles.css` - Your CSS file  
- `script.js` - Your JavaScript file
- `server.js` - Express server (created)
- `package.json` - Dependencies (created)
- `Dockerfile` - Simple Docker config (created)

## Coolify Configuration
1. **Application Type:** Node.js Application
2. **Port:** 3000
3. **Build Command:** Leave empty
4. **Start Command:** Leave empty
5. **Environment Variables:** None

## Test Locally
```bash
npm install
node server.js
```

Then visit `http://localhost:3000`

## Health Check
Visit `/health` endpoint to verify server is running.

## Why This Works
- Simple Express server is more reliable than nginx
- No complex configuration needed
- Works with any deployment platform
- Easy to debug

## If Still Not Working
1. Check Coolify logs for specific errors
2. Verify port is set to 3000
3. Make sure all files are committed to Git
4. Try redeploying from scratch
