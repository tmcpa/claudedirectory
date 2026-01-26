import { Skill } from "@/lib/types";

export const iosSimulatorSkill: Skill = {
  slug: "ios-simulator",
  title: "iOS Simulator",
  description: "Build, navigate, and test iOS apps via simulator automation with XcodeBuild integration",
  tags: ["ios", "xcode", "mobile", "testing", "automation"],
  featured: false,
  author: {
    name: "conorluddy",
    url: "https://github.com/conorluddy/ios-simulator-skill",
  },
  repoUrl: "https://github.com/conorluddy/ios-simulator-skill",
  content: `# iOS Simulator Skill

Automate iOS app building, navigation, and testing via the iOS Simulator.

## Overview

This skill enables Claude Code to interact with iOS simulators for:

- **Building** - Compile and run iOS apps on simulator
- **Navigation** - Interact with UI elements, tap buttons, scroll
- **Testing** - Run UI tests and validate app behavior
- **Screenshots** - Capture simulator screenshots for debugging

## Installation

Clone the skill to your Claude Code configuration:

\`\`\`bash
git clone https://github.com/conorluddy/ios-simulator-skill.git ~/.claude/skills/ios-simulator
\`\`\`

## Requirements

- Xcode installed with iOS simulators
- XcodeBuildMCP server (recommended)
- macOS development environment

## Features

### Build and Run
- Build iOS projects with xcodebuild
- Launch apps on specific simulator devices
- Handle build errors and warnings

### UI Automation
- Tap elements by accessibility identifier
- Input text into text fields
- Scroll and swipe gestures
- Wait for elements to appear

### Testing Support
- Run XCUITest test suites
- Capture test results and failures
- Generate test coverage reports

## Example Usage

"Build and run the app on iPhone 15 Pro simulator"
"Tap the login button and enter test credentials"
"Run all UI tests and show me any failures"

## Repository

[github.com/conorluddy/ios-simulator-skill](https://github.com/conorluddy/ios-simulator-skill)
`,
};
