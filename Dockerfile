# Use Node.js as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy all static files
COPY . .

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
