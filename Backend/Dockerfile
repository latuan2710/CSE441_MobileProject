# Use a Maven image with JDK for building the application
FROM maven:3.9.5-eclipse-temurin-8 AS build

# Set the working directory
WORKDIR /app

# Copy the Maven project files
COPY pom.xml .
COPY src ./src

# Build the application and unpack it into a layered structure
RUN mvn clean package -DskipTests && \
    mkdir -p target/dependency && \
    (cd target/dependency; jar -xf ../*.jar)

# Use a lightweight runtime image
FROM openjdk:8-jdk-alpine

# Create a non-root user
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copy the application layers from the build stage
COPY --from=build /app/target/dependency/BOOT-INF/lib /app/lib
COPY --from=build /app/target/dependency/META-INF /app/META-INF
COPY --from=build /app/target/dependency/BOOT-INF/classes /app

# Define the entry point
ENTRYPOINT ["java", "-cp", "app:app/lib/*", "com.baki.backend.BackendApplication"]
