# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY ./src /app/src
COPY ./view /app/views
COPY .env ./

# Set the environment variable to production
ENV NODE_ENV=production

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD ["node", "src/index.js"]