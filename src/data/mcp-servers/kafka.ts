import { MCPServer } from "@/lib/types";

export const kafkaServer: MCPServer = {
  slug: "kafka",
  title: "Apache Kafka",
  description:
    "Produce and consume messages, manage topics, inspect consumer groups, and monitor Apache Kafka clusters",
  tags: ["kafka", "messaging", "streaming", "event-driven", "infrastructure"],
  featured: false,
  author: {
    name: "Community",
    url: "https://github.com/Joel-hanson",
  },
  repoUrl: "https://github.com/Joel-hanson/kafka-mcp-server",
  installCommand: "pip install kafka-mcp-server",
  config: `{
  "mcpServers": {
    "kafka": {
      "command": "uvx",
      "args": ["kafka-mcp-server"],
      "env": {
        "KAFKA_BOOTSTRAP_SERVERS": "localhost:9092",
        "KAFKA_SECURITY_PROTOCOL": "PLAINTEXT"
      }
    }
  }
}`,
};
