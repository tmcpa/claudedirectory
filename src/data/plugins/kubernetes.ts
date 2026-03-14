import { Plugin } from "@/lib/types";

export const kubernetesPlugin: Plugin = {
  slug: "kubernetes",
  title: "Kubernetes",
  description: "Interact with Kubernetes clusters to inspect pods, debug deployments, generate manifests, and troubleshoot issues without leaving Claude Code",
  tags: ["infrastructure", "kubernetes", "k8s", "devops", "external"],
  featured: false,
  author: {
    name: "Kubernetes",
    url: "https://github.com/kubernetes",
  },
  installCommand: "claude plugins add @kubernetes/claude-plugin",
  repoUrl: "https://github.com/kubernetes/claude-plugin",
  commands: [
    { name: "/k8s:pods", description: "List and inspect pods in current context" },
    { name: "/k8s:logs", description: "Stream logs from a pod or deployment" },
    { name: "/k8s:manifest", description: "Generate Kubernetes manifests from descriptions" },
    { name: "/k8s:debug", description: "Diagnose failing deployments or CrashLoopBackOff pods" },
  ],
};
