# Use a Maven image to build the application
FROM maven:3.8.5-openjdk-17 AS build

# Set the working directory
WORKDIR /app

# Copy the pom.xml and download dependencies
COPY pom.xml ./
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Use a JRE image to run the application
FROM openjdk:17-jdk-slim

# Copy the jar file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "app.jar"]
