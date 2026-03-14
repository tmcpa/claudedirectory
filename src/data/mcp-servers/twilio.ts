import { MCPServer } from "@/lib/types";

export const twilioServer: MCPServer = {
  slug: "twilio",
  title: "Twilio Server",
  description:
    "Send SMS, make calls, and manage Twilio communication services through natural language",
  tags: ["twilio", "sms", "communications", "messaging", "community"],
  featured: false,
  author: {
    name: "Twilio Community",
    url: "https://github.com/twilio",
  },
  repoUrl: "https://github.com/twilio/twilio-mcp",
  installCommand: "npm install -g @twilio/mcp-server",
  config: `{
  "mcpServers": {
    "twilio": {
      "command": "npx",
      "args": ["-y", "@twilio/mcp-server"],
      "env": {
        "TWILIO_ACCOUNT_SID": "your-account-sid",
        "TWILIO_AUTH_TOKEN": "your-auth-token"
      }
    }
  }
}`,
};
