import { Hook } from "@/lib/types";

export const bundleSizeCheckHook: Hook = {
  slug: "bundle-size-check",
  title: "Bundle Size Monitor",
  description:
    "Monitors JavaScript bundle size after builds and warns when the bundle exceeds size thresholds",
  event: "PostToolUse",
  matcher: "Bash",
  tags: ["performance", "bundle-size", "optimization", "build"],
  featured: false,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  script: `#!/bin/bash
# Bundle Size Monitor Hook
# Warns when build output exceeds size thresholds

COMMAND="$1"

# Only check after build commands
if ! echo "$COMMAND" | grep -qE "(npm run build|yarn build|pnpm build|next build|vite build)"; then
  exit 0
fi

# Configurable threshold in KB (default 500KB)
MAX_SIZE_KB=\${BUNDLE_SIZE_LIMIT:-500}

# Check common build output directories
for DIR in ".next" "dist" "build" "out"; do
  if [ -d "$DIR" ]; then
    # Find JS files and check total size
    TOTAL_KB=$(find "$DIR" -name "*.js" -exec du -k {} + 2>/dev/null | awk '{sum+=$1} END {print sum}')

    if [ -n "$TOTAL_KB" ] && [ "$TOTAL_KB" -gt "$MAX_SIZE_KB" ]; then
      echo "BUNDLE SIZE WARNING"
      echo ""
      echo "Total JS bundle size: \${TOTAL_KB}KB (threshold: \${MAX_SIZE_KB}KB)"
      echo ""
      echo "Largest files:"
      find "$DIR" -name "*.js" -exec du -k {} + 2>/dev/null | sort -rn | head -5
      echo ""
      echo "Consider: code splitting, tree shaking, dynamic imports, or removing unused dependencies."
      # Warning only — don't block the build
      exit 0
    fi
  fi
done

exit 0
`,
};
