import { Plugin } from "@/lib/types";

export const perfProfilerPlugin: Plugin = {
  slug: "perf-profiler",
  title: "Performance Profiler",
  description: "Profile and optimize code performance with bundle analysis, runtime benchmarking, memory leak detection, and actionable improvement suggestions",
  tags: ["performance", "profiling", "optimization", "bundle-size", "community"],
  featured: false,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  installCommand: "claude plugins add perf-profiler",
  commands: [
    { name: "/perf:bundle", description: "Analyze bundle size and suggest tree-shaking opportunities" },
    { name: "/perf:bench", description: "Benchmark a function or code block" },
    { name: "/perf:memory", description: "Detect potential memory leaks in the current file" },
  ],
};
