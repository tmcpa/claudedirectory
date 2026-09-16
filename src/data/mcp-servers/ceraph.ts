import { MCPServer } from "@/lib/types";

export const ceraphServer: MCPServer = {
  slug: "ceraph",
  title: "Ceraph React Native MCP",
  description:
    "MCP server for React Native and Expo development. Drive and test apps end-to-end on iOS and Android using real devices and simulators/emulators.",
  tags: [
    "react-native",
    "expo",
    "mobile",
    "debug",
    "debugging",
    "testing",
    "react-native-testing",
    "expo-testing",
    "e2e-testing",
    "e2e",
    "end-to-end",
    "ui-testing",
    "automated-testing",
    "test-automation",
    "harness",
    "agentic",
    "agentic-testing",
    "loops",
    "agentic-loops",
    "agent-loops",
    "qa",
    "quality-assurance",
    "screenshot",
    "ios",
    "ios-simulator",
    "ios-testing",
    "android",
    "android-emulator",
    "android-testing",
    "windows",
    "linux",
    "mac",
    "macos",
    "ai",
    "agent",
    "llm",
    "mcp",
    "mcp-server",
    "model-context-protocol",
    "mobile-testing",
    "webdriveragent",
    "uiautomator2",
    "accessibility",
    "ceraph",
  ],
  author: {
    name: "Ike Studios LLC",
    url: "https://ceraph.dev",
  },
  installCommand: "npx @ceraph/react-native-mcp@latest init",
  docsUrl: "https://ceraph.dev/docs/get-started",
  config: `{
  "mcpServers": {
    "react-native-mcp": {
      "command": "npx",
      "args": ["-y", "@ceraph/react-native-mcp@latest"]
    }
  }
}`,
};
