# Use a Maven image with JDK pre-installed
FROM maven:3.9.5-eclipse-temurin-17

# Set the working directory
WORKDIR /app

# Copy the Maven project files
COPY pom.xml .
COPY src ./src

# Expose the port your Spring Boot application runs on
EXPOSE 8080

# Command to run the application
CMD ["mvn", "spring-boot:run"]