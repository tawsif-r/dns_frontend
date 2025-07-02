# Use the official Node.js 22 image as the base
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 for the web server
EXPOSE 3000

# Command to run the application (overridden in docker-compose.yml for dev)
CMD ["npm", "start"]