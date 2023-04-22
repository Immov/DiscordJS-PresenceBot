# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

# Mount the application code as a volume
VOLUME /app
