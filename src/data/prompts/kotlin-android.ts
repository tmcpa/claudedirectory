import { Prompt } from "@/lib/types";

export const kotlinAndroidPrompt: Prompt = {
  slug: "kotlin-android",
  title: "Kotlin / Android Development",
  description: "CLAUDE.md for Kotlin and Android projects with Jetpack Compose",
  tags: ["kotlin", "android", "mobile", "jetpack-compose"],
  dateAdded: "2026-03-11",
  author: {
    name: "Claude Code Community",
  },
  content: `# Kotlin / Android Project

This is a Kotlin Android project using Jetpack Compose and modern Android architecture.

## Project Structure
- \`app/src/main/java/\` - Main source code
- \`ui/\` - Compose UI screens and components
- \`data/\` - Repositories, data sources, and models
- \`domain/\` - Use cases and domain models
- \`di/\` - Dependency injection modules
- \`app/src/test/\` - Unit tests
- \`app/src/androidTest/\` - Instrumented tests

## Code Style
- Use Kotlin idioms (scope functions, extensions, sealed classes)
- Use Jetpack Compose for all new UI
- Use coroutines and Flow for async operations
- Follow Kotlin coding conventions

## Conventions
- Use MVVM architecture with ViewModels
- Use Hilt for dependency injection
- Use sealed classes/interfaces for UI state
- Use data classes for models and DTOs
- Prefer immutable data (val over var)

## State Management
- Use StateFlow for UI state in ViewModels
- Use remember and mutableStateOf in Compose
- Collect flows with collectAsStateWithLifecycle
- Keep UI state in ViewModels, not in composables

## Navigation
- Use Compose Navigation with type-safe routes
- Define navigation graphs in a central location
- Pass arguments through routes, not shared state

## Commands
- \`./gradlew assembleDebug\` - Build debug APK
- \`./gradlew test\` - Run unit tests
- \`./gradlew connectedAndroidTest\` - Run instrumented tests
- \`./gradlew lint\` - Run lint checks
`,
};
