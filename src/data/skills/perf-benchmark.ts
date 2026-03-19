import { Skill } from "@/lib/types";

export const perfBenchmarkSkill: Skill = {
  slug: "perf-benchmark",
  title: "Performance Benchmark",
  description:
    "Profile and benchmark code performance, identify bottlenecks, and suggest optimizations with before/after measurements",
  tags: ["performance", "benchmarking", "profiling", "optimization"],
  featured: false,
  author: {
    name: "Claude Code Community",
  },
  content: `# Performance Benchmark Skill

Identify performance bottlenecks and measure the impact of optimizations with structured benchmarking.

## Usage
\`\`\`
/perf-benchmark [file or function]
\`\`\`

## Behavior
1. Identify performance-critical code paths
2. Set up benchmarks using the project's testing framework
3. Run baseline measurements
4. Suggest and apply optimizations
5. Compare before/after results

## Analysis Areas

### Runtime Performance
- Function execution time profiling
- Hot path identification
- Algorithm complexity analysis
- Memory allocation patterns

### Bundle/Build Performance
- Build time measurement
- Bundle size analysis
- Tree-shaking effectiveness
- Code splitting opportunities

### Database Performance
- Query execution plans (EXPLAIN ANALYZE)
- N+1 query detection
- Index usage analysis
- Connection pool sizing

### Network Performance
- API response time measurement
- Payload size optimization
- Caching effectiveness
- Concurrent request handling

## Output
- Baseline measurements with statistical analysis
- Identified bottlenecks ranked by impact
- Optimization suggestions with estimated improvement
- Before/after comparison table

## Example
\`\`\`
/perf-benchmark src/api/handlers.ts
\`\`\`
Profiles the specified file and produces an optimization report.
`,
};
