# Use an official Node.js image for building the React app
FROM node:14 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Use Nginx to serve the built React app
FROM nginx:alpine

# Copy the build output to Nginx's html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port Nginx is running on
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
