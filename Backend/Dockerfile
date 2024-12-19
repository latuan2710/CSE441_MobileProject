# Use Maven image with JDK pre-installed
FROM maven:3.9.5-eclipse-temurin-17

# Set the working directory
WORKDIR /app

# Copy the Maven project files
COPY . .

# Expose the application port
EXPOSE 8080

# Default command to run the Spring Boot application
CMD ["mvn", "spring-boot:run"]