# Use the official Node.js image as the base image
FROM node:22

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Install NestJS CLI globally
RUN yarn global add @nestjs/cli

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN yarn build

# Run migrations
RUN yarn db:run

# Start the NestJS application
CMD ["yarn", "start:prod"]