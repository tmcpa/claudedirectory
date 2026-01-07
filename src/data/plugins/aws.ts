import { Plugin } from "@/lib/types";

export const awsPlugin: Plugin = {
  slug: "aws",
  title: "AWS",
  description: "Amazon Web Services integration. Manage S3, Lambda, DynamoDB, EC2, and other AWS services. Deploy serverless functions, manage infrastructure, and query databases.",
  tags: ["aws", "cloud", "serverless", "infrastructure", "official"],
  featured: false,
  author: {
    name: "Amazon",
    url: "https://aws.amazon.com",
  },
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/aws",
  installCommand: "claude plugins add aws@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "aws@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/aws-deploy", description: "Deploy to AWS Lambda or other services" },
    { name: "/s3", description: "Manage S3 buckets and objects" },
    { name: "/dynamodb", description: "Query and manage DynamoDB tables" },
    { name: "/cloudwatch", description: "View CloudWatch logs and metrics" },
  ],
  relatedItems: [
    { type: "mcp-server", slug: "aws", relationship: "requires" },
  ],
};
