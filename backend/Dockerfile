# Use the official Node.js image as the base image
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy the source code to the working directory
COPY . .

# Copy the package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install NestJS CLI globally
RUN yarn global add @nestjs/cli

# Install the dependencies using Yarn
RUN yarn

# Build the NestJS application
RUN yarn build

# Run migrations
CMD ["yarn", "db:run"]

# Start the NestJS application
CMD ["yarn", "start:prod"]