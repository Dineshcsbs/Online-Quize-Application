# Stage 1: Build the React application
FROM node:14 AS frontend-build

WORKDIR /app/frontend

# Copy package.json and package-lock.json
COPY frontend/package*.json ./
RUN npm install

# Copy the rest of the React application code
COPY frontend/ ./

# Build the React application
RUN npm run build

# Stage 2: Build the Spring Boot application
FROM maven:3.8.5-openjdk-17 AS backend-build

WORKDIR /app/backend

# Copy pom.xml and install dependencies
COPY backend/pom.xml ./
RUN mvn dependency:go-offline

# Copy the source code and package the application
COPY backend/src ./src
RUN mvn clean package -DskipTests

# Stage 3: Create a final image with OpenJDK and Nginx
FROM openjdk:17-jdk-slim

# Install Nginx to serve the React app
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Copy built React app to Nginx html directory
COPY --from=frontend-build /app/frontend/build /usr/share/nginx/html

# Copy the Spring Boot jar file to the final image
COPY --from=backend-build /app/backend/target/*.jar app.jar

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports for Nginx (80) and Spring Boot (8080)
EXPOSE 80 8080

# Start Nginx and the Spring Boot application together
CMD ["sh", "-c", "nginx && java -jar app.jar"]
