# Using Node.js LTS
FROM node:14.14.0-alpine

# Set the working directory
WORKDIR /usr/app

# Copy package.json and the Yarn lock file
COPY package.json ./
COPY yarn.lock ./

# Install packages
RUN yarn install
