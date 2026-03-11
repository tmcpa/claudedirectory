import { Prompt } from "@/lib/types";

export const swiftPrompt: Prompt = {
  slug: "swift",
  title: "Swift / iOS Development",
  description: "CLAUDE.md for Swift and iOS/macOS projects with SwiftUI patterns",
  tags: ["swift", "ios", "macos", "swiftui", "mobile"],
  dateAdded: "2026-03-11",
  author: {
    name: "Claude Code Community",
  },
  content: `# Swift / iOS Project

This is a Swift project for Apple platforms using modern Swift patterns.

## Project Structure
- \`Sources/\` - Main application source code
- \`Views/\` - SwiftUI views
- \`Models/\` - Data models and entities
- \`ViewModels/\` - Observable view models
- \`Services/\` - Networking and business logic
- \`Extensions/\` - Swift extensions
- \`Tests/\` - Unit and UI tests

## Code Style
- Follow Swift API Design Guidelines
- Use SwiftUI for new views, UIKit only when necessary
- Prefer value types (structs/enums) over reference types (classes)
- Use Swift concurrency (async/await) for asynchronous code

## Conventions
- Use PascalCase for types, camelCase for properties and methods
- Use \`@Observable\` macro for view models (Swift 5.9+)
- Use \`@Environment\` and \`@Binding\` for data flow
- Prefer protocol-oriented programming
- Use Swift Package Manager for dependencies

## Error Handling
- Use typed throws where appropriate
- Define domain-specific error enums
- Use Result type for completion handlers
- Handle optionals safely with guard and if-let

## Architecture
- MVVM pattern with SwiftUI
- Dependency injection via environment
- Separate networking into service layers
- Use Combine or AsyncSequence for reactive streams

## Commands
- \`swift build\` - Build the project
- \`swift test\` - Run tests
- \`xcodebuild -scheme App test\` - Run Xcode tests
`,
};
