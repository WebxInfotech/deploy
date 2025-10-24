# Deployment Guide for Coolify

## Option 1: Using Docker with Node.js (Recommended for development)

1. Use the `Dockerfile` in your Coolify deployment
2. Coolify will automatically detect the Dockerfile
3. The app will run on port 3000

## Option 2: Using Docker with Nginx (Recommended for production)

1. Rename `Dockerfile.nginx` to `Dockerfile`
2. This uses nginx for better performance and static file serving
3. The app will run on port 80

## Option 3: Direct Static File Deployment

If Coolify supports direct static file deployment:
1. Upload all files except `node_modules`, `.git`, and development files
2. Ensure `index.html` is in the root directory
3. Set the document root to serve `index.html`

## Required Files for Deployment

Make sure these files are present:
- `index.html` (main HTML file)
- `styles.css` (CSS styles)
- `script.js` (JavaScript functionality)
- `package.json` (dependencies)
- `Dockerfile` (for containerized deployment)

## Troubleshooting

If you get "no available server" error:
1. Check that all required files are present
2. Ensure the Dockerfile is properly configured
3. Verify that the port is correctly exposed
4. Check Coolify logs for specific error messages

## Testing Locally

Before deploying, test locally:
```bash
npm install
npm start
```

Then visit `http://localhost:3000` to verify everything works.
