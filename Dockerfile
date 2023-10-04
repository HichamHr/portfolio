# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies including development dependencies
RUN npm install

# Expose a port for the React app to run on (e.g., port 3000)
EXPOSE 3000

# Define the command to start your React app with hot-reloading
CMD ["npm", "start"]