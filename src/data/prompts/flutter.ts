import { Prompt } from "@/lib/types";

export const flutterPrompt: Prompt = {
  slug: "flutter",
  title: "Flutter & Dart Development",
  description: "CLAUDE.md for Flutter and Dart cross-platform mobile and web apps",
  tags: ["flutter", "dart", "mobile", "cross-platform", "android", "ios"],
  dateAdded: "2026-03-22",
  author: {
    name: "Claude Code Community",
  },
  content: `# Flutter Project

This is a Flutter project using Dart for cross-platform mobile and web development.

## Project Structure
- \`lib/\` - Main Dart source code
- \`lib/main.dart\` - App entry point
- \`lib/screens/\` - Screen/page widgets
- \`lib/widgets/\` - Reusable widget components
- \`lib/models/\` - Data models
- \`lib/services/\` - API services and business logic
- \`lib/providers/\` - State management (Riverpod/Provider)
- \`lib/utils/\` - Helper functions and constants
- \`test/\` - Unit and widget tests
- \`integration_test/\` - Integration tests

## Code Style
- Follow official Dart style guide and \`dart analyze\` rules
- Use \`const\` constructors wherever possible
- Prefer composition over inheritance for widgets
- Keep widgets small and single-purpose
- Use named parameters for widget constructors

## Conventions
- Use PascalCase for classes and enums
- Use camelCase for variables, functions, and parameters
- Use snake_case for file names
- Prefix private members with underscore
- Use Riverpod or Provider for state management
- Use \`go_router\` for navigation

## Commands
- \`flutter run\` - Run on connected device or emulator
- \`flutter build apk\` - Build Android APK
- \`flutter build ios\` - Build iOS app
- \`flutter test\` - Run all tests
- \`dart analyze\` - Run static analysis
- \`dart format .\` - Format all Dart files
`,
};
