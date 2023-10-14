# Use an official Node.js image as the base image
FROM node:14 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
# RUN npm install --only=production
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the React app (replace "build" with your Vite build command)
RUN npm run build

# Start a new stage and copy over the compiled build
FROM nginx:alpine AS production

# Copy the built files to the nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port that nginx will listen on (default is 80)
EXPOSE 80

# Command to start nginx (it starts automatically)
CMD ["nginx", "-g", "daemon off;"]
