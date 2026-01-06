import { Prompt } from "@/lib/types";

export const reactNativePrompt: Prompt = {
  slug: "react-native",
  title: "React Native / Expo",
  description: "CLAUDE.md for React Native and Expo mobile app development",
  tags: ["react-native", "expo", "mobile", "typescript"],
  author: {
    name: "Claude Code Community",
  },
  content: `# React Native / Expo Project

This is a React Native project built with Expo.

## Tech Stack
- Expo SDK
- React Native
- TypeScript
- Expo Router for navigation

## Project Structure
- \`app/\` - Expo Router screens and layouts
- \`components/\` - Reusable components
- \`hooks/\` - Custom React hooks
- \`constants/\` - App constants and theme
- \`assets/\` - Images, fonts, and static files

## Conventions
- Use functional components with hooks
- Prefer StyleSheet.create over inline styles
- Use Expo's vector icons
- Handle both iOS and Android platforms

## Navigation
- Use Expo Router file-based routing
- Organize screens in the app/ directory
- Use layouts for shared navigation structure

## Styling
- Use StyleSheet.create for performance
- Support light and dark modes
- Use consistent spacing and typography
- Consider safe areas for notches

## Commands
- \`npx expo start\` - Start development server
- \`npx expo run:ios\` - Run on iOS simulator
- \`npx expo run:android\` - Run on Android emulator
- \`npx expo build\` - Build for production
`,
};
