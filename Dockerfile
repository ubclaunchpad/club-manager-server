# Using Node.js LTS
FROM node:14.14.0-alpine

# Set the working directory
WORKDIR /usr/app

# Copy package.json and the Yarn lock file
COPY package.json ./
COPY yarn.lock ./

# Install packages
RUN yarn install

# Copy the remaining files (refer to .dockerignore to see what is excluded)
COPY . /usr/app

EXPOSE 4000

# Run the server
CMD ["yarn", "run", "start:docker"]
