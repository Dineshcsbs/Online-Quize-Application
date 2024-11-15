# Step 1: Use a Maven image with OpenJDK 17 to build the app
FROM maven:3.8.4-openjdk-17 AS build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy only the pom.xml to cache dependencies
COPY pom.xml .

# Step 4: Download project dependencies
RUN mvn dependency:go-offline

# Step 5: Copy the source files and build the app (skip tests for faster builds)
COPY src ./src
RUN mvn clean package -DskipTests

# Step 6: Use a slimmer OpenJDK image to run the built app
FROM openjdk:17-jdk-slim

# Step 7: Set the working directory for the final image
WORKDIR /app

# Step 8: Copy the generated JAR file from the build image
COPY --from=build /app/target/quiz-0.0.1-SNAPSHOT.jar .

# Step 9: Expose port 8080 for the app
EXPOSE 8080

# Step 10: Correct ENTRYPOINT without the extra space after "java"
ENTRYPOINT ["java", "-jar", "/app/quiz-0.0.1-SNAPSHOT.jar"]
