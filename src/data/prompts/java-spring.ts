import { Prompt } from "@/lib/types";

export const javaSpringPrompt: Prompt = {
  slug: "java-spring",
  title: "Java Spring Boot",
  description: "CLAUDE.md for Java Spring Boot applications with enterprise patterns",
  tags: ["java", "spring-boot", "backend", "enterprise", "api"],
  author: {
    name: "Claude Code Community",
  },
  content: `# Java Spring Boot Project

This is a Spring Boot application using Java.

## Project Structure
- \`src/main/java/\` - Application source code
- \`src/main/resources/\` - Configuration files
- \`src/test/java/\` - Test source code
- \`pom.xml\` or \`build.gradle\` - Build configuration

## Architecture
- \`controller/\` - REST endpoints
- \`service/\` - Business logic
- \`repository/\` - Data access layer
- \`model/\` or \`entity/\` - Domain objects
- \`dto/\` - Data transfer objects
- \`config/\` - Configuration classes

## Conventions
- Use constructor injection over field injection
- Follow layered architecture (Controller → Service → Repository)
- Use DTOs for API request/response, not entities
- Handle exceptions with @ControllerAdvice
- Use Bean Validation annotations for input validation

## Testing
- Unit test services with Mockito
- Integration test with @SpringBootTest
- Use @WebMvcTest for controller tests
- Use Testcontainers for database tests

## Commands
- \`./mvnw spring-boot:run\` - Start application
- \`./mvnw test\` - Run tests
- \`./mvnw package\` - Build JAR
- \`./gradlew bootRun\` - Start (Gradle)
- \`./gradlew test\` - Run tests (Gradle)
`,
};
