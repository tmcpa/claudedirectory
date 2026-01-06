"use client";

import { CopyButton } from "./copy-button";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  showCopy?: boolean;
}

export function CodeBlock({
  code,
  language = "plaintext",
  className,
  showCopy = true,
}: CodeBlockProps) {
  return (
    <div className={cn("relative group", className)}>
      <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-4 text-sm">
        <code className={`language-${language} text-zinc-100`}>{code}</code>
      </pre>
      {showCopy && (
        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <CopyButton text={code} className="bg-zinc-800 hover:bg-zinc-700" />
        </div>
      )}
    </div>
  );
}
