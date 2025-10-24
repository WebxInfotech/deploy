# Coolify "No Available Server" Fix

## Current Issue
Getting "no available server" error on Coolify deployment at:
`https://esc0goocso8w0so844s8k0w8.82.29.161.139.sslip.io/`

## Solution Steps

### Step 1: Use the Simple Dockerfile
1. Rename `Dockerfile.simple` to `Dockerfile`
2. Delete the old `Dockerfile`

### Step 2: Coolify Configuration
In your Coolify dashboard:

1. **Application Type:** Node.js Application
2. **Build Command:** Leave empty
3. **Start Command:** Leave empty
4. **Port:** 3000
5. **Environment Variables:** None required

### Step 3: Alternative Configuration
If the above doesn't work, try:

1. **Application Type:** Static Website
2. **Build Command:** `npm install`
3. **Start Command:** `node server.js`
4. **Port:** 3000

### Step 4: Check Logs
1. Go to your Coolify dashboard
2. Click on your application
3. Check the "Logs" section
4. Look for error messages

### Step 5: Manual Testing
Test the server locally:
```bash
npm install
node server.js
```

Then visit `http://localhost:3000`

## Files Required
- `index.html` - Main HTML file
- `styles.css` - CSS styles
- `script.js` - JavaScript functionality
- `server.js` - Express server
- `package.json` - Dependencies
- `Dockerfile` - Docker configuration

## Common Issues
1. **Wrong port configuration** - Make sure port is set to 3000
2. **Missing dependencies** - Ensure package.json has express
3. **Dockerfile issues** - Use the simple Dockerfile
4. **Build errors** - Check Coolify logs

## Health Check
The server includes a health check at `/health` endpoint.

## Support
If you still have issues:
1. Check Coolify logs for specific errors
2. Verify all files are committed to Git
3. Ensure Dockerfile is in the root directory
4. Make sure port is set to 3000 in Coolify settings
