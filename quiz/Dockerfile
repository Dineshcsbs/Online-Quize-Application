# Stage 1: Build the React app
FROM node:14 AS frontend-build

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build the Spring Boot app
FROM maven:3.8.5-openjdk-17 AS backend-build

WORKDIR /app/backend
COPY backend/pom.xml ./
COPY backend/src ./src
RUN mvn clean package -DskipTests

# Stage 3: Create a final image
FROM openjdk:17-jdk-slim AS final

# Copy the built React app to the Nginx html directory
COPY --from=frontend-build /app/frontend/build /usr/share/nginx/html

# Copy the Spring Boot jar file
COPY --from=backend-build /app/backend/target/*.jar app.jar

# Install Nginx
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports for Nginx and Spring Boot
EXPOSE 80
EXPOSE 8080

# Start Nginx and the Spring Boot application
CMD ["sh", "-c", "nginx && java -jar app.jar"]
