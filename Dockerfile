# Use an official Node.js runtime as a parent image
FROM node:19-slim

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the entire project directory to the container
COPY . .

# Create a volume for app logs
VOLUME /app/src

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
