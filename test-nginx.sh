#!/bin/bash

echo "=== Testing Nginx Configuration ==="

# Test nginx configuration
echo "Testing nginx configuration syntax..."
nginx -t

echo ""
echo "=== Starting nginx in background ==="
nginx -g "daemon off;" &

# Wait a moment for nginx to start
sleep 2

echo ""
echo "=== Testing HTTP requests ==="

# Test main page
echo "Testing main page (/)..."
curl -I http://localhost/

echo ""
echo "Testing health check (/healthcheck.html)..."
curl -I http://localhost/healthcheck.html

echo ""
echo "Testing 404 page (/nonexistent)..."
curl -I http://localhost/nonexistent

echo ""
echo "=== Stopping nginx ==="
nginx -s quit

echo "Test completed!"
