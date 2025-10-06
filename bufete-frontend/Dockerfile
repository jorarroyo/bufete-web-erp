#### Stage 1: Build the react application
FROM node:10.16.3-alpine as build

# Configure the main working directory inside the docker image. 
# This is the base directory used in any further RUN, COPY, and ENTRYPOINT 
# commands.
WORKDIR /app

# Copy the package.json as well as the package-lock.json and install 
# the dependencies. This is a separate step so the dependencies 
# will be cached unless changes to one of those two files 
# are made.
COPY package.json ./
RUN yarn install

# Copy the main application
COPY . ./

# Arguments
# ARG REACT_APP_API_BASE_URL
# ENV REACT_APP_API_BASE_URL $REACT_APP_API_BASE_URL
# ENV NODE_ENV production

# that will be empty
# RUN echo "API BASE URL": $REACT_APP_API_BASE_URL

# Build the application
RUN yarn build

#### Stage 2: Serve the React application from Nginx
FROM nginx:1.17.0-alpine

# Copy the react build from Stage 1
COPY --from=build /app/build /var/www

# Copy our custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 3000 to the Docker host, so we can access it
# from the outside.
# EXPOSE 80


ENTRYPOINT ["nginx","-g","daemon off;"]
