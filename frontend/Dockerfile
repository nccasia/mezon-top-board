# Stage 1: Build the React app
FROM node:22 AS build

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . ./

ARG REACT_APP_BACKEND_URL

ENV REACT_APP_BACKEND_URL $REACT_APP_BACKEND_URL

RUN yarn build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]