# Stage 1: Build the React app
FROM node:22 AS build

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . ./
RUN yarn build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]