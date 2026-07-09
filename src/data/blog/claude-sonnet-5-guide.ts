import { BlogPost } from "@/lib/types";

export const claudeSonnet5Guide: BlogPost = {
  slug: "claude-sonnet-5-guide",
  title: "Claude Sonnet 5: The New Default in Claude Code, Explained",
  description:
    "Sonnet 5 landed June 30 with near-Opus coding ability, a 1M-token context window, and $2/$10 launch pricing through August. Here's what actually changed, the tokenizer fine print that affects your bill, and which model to run when.",
  publishedDate: "2026-07-09",
  tags: [
    "claude-sonnet-5",
    "claude-code",
    "new-features",
    "ai-coding",
    "agentic-workflows",
    "model-comparison",
    "pricing",
    "2026",
  ],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    {
      type: "blog",
      slug: "claude-fable-5-guide",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-opus-4-8-release",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-best-practices",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "context-engineering-claude-code",
      relationship: "recommends",
    },
  ],
  seoTitle: "Claude Sonnet 5 (2026): Pricing, 1M Context, When to Use It",
  seoDescription:
    "Claude Sonnet 5 is the new default model in Claude Code. Full guide: $2/$10 launch pricing, 1M context, tokenizer changes, API breaking changes, and how it compares to Opus 4.8 and Fable 5.",
  content: `# Claude Sonnet 5: The New Default in Claude Code, Explained

June 2026 was a loud month for Anthropic. Fable 5 launched, [got suspended by an export-control directive, and came back](/blog/claude-fable-5-export-controls). Claude Science shipped. And then, on June 30 — almost quietly by comparison — Anthropic released the model most people will actually use every day: **Claude Sonnet 5**.

If you're on a Free or Pro plan, you're probably already running it. Sonnet 5 is now the default model in Claude Code for those plans, and it's available everywhere else — the API, the Claude apps, Managed Agents, and the third-party platforms.

Short version: Sonnet 5 brings near-Opus-4.8 quality on coding and agentic work at Sonnet prices, with a 1M-token context window and launch pricing of $2/$10 per million tokens through August 31. It's the most model most people have ever gotten for the money. But there are two pieces of fine print — a new tokenizer that inflates token counts, and adaptive thinking that changes the latency profile — that you should understand before you assume your bill just dropped.

Let's go through all of it.

---

## What Sonnet 5 Actually Is

The facts, minus the launch-day gloss:

- **Model ID is \`claude-sonnet-5\`.** No date suffix, same alias convention as the rest of the current lineup.
- **Released June 30, 2026.** It replaced Sonnet 4.6 as the current Sonnet-tier model, the same week Fable 5 was redeployed globally.
- **It's the new default for Free and Pro.** In Claude Code and the Claude apps, Free and Pro accounts now start on Sonnet 5. Max, Team Premium, and Enterprise pay-as-you-go stay on Opus 4.8 as their default — you can switch either way.
- **1M-token context window, 128K max output.** The same headline numbers as Opus 4.8 and Fable 5. This is the first time the "budget" tier has had frontier-scale context as a native, no-asterisk feature.
- **Near-Opus performance.** Anthropic's own framing is that Sonnet 5's performance "is close to that of Opus 4.8, but at lower prices," with a strict improvement over Sonnet 4.6 on agentic benchmarks like BrowseComp and OSWorld-Verified.
- **The full effort range, including \`xhigh\`.** Sonnet 5 is the first Sonnet-tier model to support the \`xhigh\` effort level that Opus 4.7 introduced — the recommended setting for hard coding and agentic work.
- **High-resolution vision.** Up to 2576px on an image's long edge (up from 1568px on Sonnet 4.6), which matters most for computer use and screenshot-heavy workflows.
- **Cyber safeguards on by default.** Sonnet 5 ships with the same cybersecurity classifiers as Opus 4.7/4.8. It's also deliberately not the model for security research — Anthropic notes it performs substantially worse on cyber tasks than Opus 4.8.

One framing worth internalizing: the Sonnet tier used to be the compromise tier. You picked Sonnet when Opus was too expensive and lived with the capability gap. Sonnet 5 shrinks that gap enough that for a large share of everyday coding work, it's not a compromise anymore — it's just the sensible default. Which is exactly why Anthropic made it one.

---

## Pricing: $2/$10 Now, $3/$15 in September

The launch pricing is the most aggressive part of the release:

| Period | Input (per MTok) | Output (per MTok) |
|---|---|---|
| Through August 31, 2026 | **$2.00** | **$10.00** |
| From September 1, 2026 | $3.00 | $15.00 |

The standard price is the same sticker Sonnet 4.6 had, so after the promo ends you're paying Sonnet 4.6 prices for a much better model. During the promo you're paying a third less than that. For comparison across the current lineup: Haiku 4.5 is $1/$5, Opus 4.8 is $5/$25, and Fable 5 is $10/$50.

If you have batch workloads, evals to re-run, or a backlog of "we should really let an agent chew through this" projects, the next few weeks are the cheap window to do it.

### The tokenizer fine print

Here's the part that will surprise people when the invoice arrives: **Sonnet 5 uses a new tokenizer, and the same text produces roughly 30% more tokens than it did on Sonnet 4.6** (Anthropic's range is 1.0–1.35× depending on content type).

Nothing about your code changes — but everything you *measure in tokens* shifts:

- The same prompt reports higher \`input_tokens\` than it did on 4.6.
- A \`max_tokens\` limit tuned for Sonnet 4.6 can now truncate output that used to fit.
- The 1M context window holds less *text* than 1M tokens did on the old tokenizer.
- Cost dashboards calibrated against 4.6 will read high even though per-token pricing didn't change.

So the honest cost math is: during the promo, you're paying ~33% less per token on ~30% more tokens — roughly a wash against Sonnet 4.6, for a significantly smarter model. After August 31, an equivalent request costs modestly more than it did on 4.6. Still an excellent trade, but "same price as before" is not quite true, and you should re-baseline any token-budgeted limits with the \`count_tokens\` endpoint against \`claude-sonnet-5\` rather than reusing numbers measured on older models.

---

## What Changed in Claude Code

If you're on Free or Pro, Sonnet 5 became your default in Claude Code with the rollout. A few practical notes on living with that.

**Checking and switching models.** Use \`/model\` in a session to see what you're running and switch:

\`\`\`bash
# In a Claude Code session
/model claude-sonnet-5

# Or from the shell, per invocation
claude --model claude-sonnet-5
\`\`\`

To pin it in a project so everyone gets the same model, set it in \`.claude/settings.json\`:

\`\`\`json
{
  "model": "claude-sonnet-5"
}
\`\`\`

**Mixing tiers where it makes sense.** The model setting isn't all-or-nothing. A pattern that works well: run your main session on Opus 4.8 or Sonnet 5, and pin cheap, mechanical subagents to Haiku via the \`model\` field in an agent's frontmatter. Claude Code also supports \`fallbackModel\` in settings — up to three models tried in order — which is a sensible place to put \`claude-sonnet-5\` as the fallback for an Opus-first setup.

**Org defaults.** Team and Enterprise admins can now set an org-wide default model, so if you administer a deployment, this is the week to decide deliberately rather than letting per-user defaults drift.

**The latency profile is different.** This is the biggest day-to-day change. Sonnet 5 defaults to adaptive thinking — it decides per request whether and how much to think. On hard tasks this is exactly what you want. On trivial ones ("rename this variable," "what does this function do") it can feel slower than Sonnet 4.6, because the model sometimes reasons, verifies, and second-guesses where 4.6 would have just answered. Early reviews consistently flag this: Sonnet 5 spends time running tests even for small changes and revisits its own plan more often than some people would like. Where 4.6 handed back a quick answer, 5 keeps working toward a better one.

You have two levers if that bothers you: drop \`/effort\` to a lower level for quick interactive work, or keep a faster model on hand for throwaway questions. But for the walk-away agentic sessions Claude Code increasingly leans into — long refactors, overnight runs, big-context investigations — the deliberateness is a feature, not a bug.

**The 1M context is the sleeper feature.** Loading an entire mid-size monorepo into a single session and asking real questions across it — "find every instance of this deprecated pattern and its call sites" — now works on the default model of the free plan. That was an Opus-tier capability eighteen months ago. If you've been managing context carefully out of habit, it's worth recalibrating what you can just... include now. (Careful context is still faster and cheaper — see our [context engineering guide](/blog/context-engineering-claude-code) — but the ceiling moved.)

---

## Sonnet 5 vs. Opus 4.8 vs. Fable 5: Which Model, When

With Sonnet 5 landing this close to Opus 4.8 in capability, the model choice is less obvious than it used to be. Here's the current lineup at a glance:

| | Haiku 4.5 | Sonnet 5 | Opus 4.8 | Fable 5 |
|---|---|---|---|---|
| Input / output per MTok | $1 / $5 | $2 / $10 (promo) | $5 / $25 | $10 / $50 |
| Context window | 200K | 1M | 1M | 1M |
| Effort levels | — | low → \`xhigh\`, \`max\` | low → \`xhigh\`, \`max\` | low → \`xhigh\`, \`max\` |
| Default for | subagents | Free, Pro | Max, Team Premium, Enterprise | opt-in only |

And the practical heuristics:

- **Default to Sonnet 5** for everyday coding, tool-heavy agentic work, big-context codebase questions, and anything you run in volume. At a fifth to a third of Opus pricing, "close to Opus 4.8" is the right trade for most tasks, most of the time.
- **Reach for Opus 4.8** when the task is genuinely hard and single-shot correctness matters more than cost: gnarly debugging, architectural decisions, long autonomous runs where a wrong turn at hour one wastes the whole night. Opus also remains ahead on the long-horizon coherence that separates "ran for six hours" from "ran for six hours and was right."
- **Fable 5 is for the problems you'd otherwise not attempt.** As we covered in the [Fable 5 guide](/blog/claude-fable-5-guide), it's a tier above Opus with pricing to match. If Sonnet 5 or Opus 4.8 can do the job, they should.
- **Haiku 4.5 still owns the high-volume, low-stakes lane** — classification, extraction, and cheap subagent fan-outs.

The uncomfortable question Sonnet 5 raises is for Opus, not for its competitors: when the mid tier gets this close to the top tier, every Opus invocation needs a reason. Our advice: run Sonnet 5 as the default and escalate deliberately, rather than running Opus everywhere out of habit.

---

## Using Sonnet 5 in the API

Trying it is a one-line change:

\`\`\`typescript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const response = await client.messages.create({
  model: "claude-sonnet-5",
  max_tokens: 16000,
  messages: [{ role: "user", content: "Review this diff for bugs..." }],
});
\`\`\`

But if you're migrating from Sonnet 4.6, there are real breaking changes. Sonnet 5 adopts the same stricter API surface as Opus 4.7/4.8:

- **Manual thinking budgets are gone.** \`thinking: {type: "enabled", budget_tokens: N}\` returns a 400. Use \`thinking: {type: "adaptive"}\` — or nothing, because...
- **Adaptive thinking is on by default.** On Sonnet 4.6, omitting the \`thinking\` field ran without thinking. On Sonnet 5, omitting it runs adaptive thinking. If you had a latency-sensitive endpoint that relied on thinking being off by omission, set \`thinking: {type: "disabled"}\` explicitly — and note that \`max_tokens\` now needs headroom for thinking tokens if you leave it on.
- **Sampling parameters are rejected.** Non-default \`temperature\`, \`top_p\`, or \`top_k\` values return a 400. Steer style with prompting instead.
- **Thinking display defaults to omitted.** If you stream reasoning to users, set \`thinking: {type: "adaptive", display: "summarized"}\` or your UI will show a long silent pause before output.
- **Effort is your main dial.** \`output_config: {effort: "high"}\` is the default; \`xhigh\` is the recommended setting for the hardest coding and agentic tasks, and \`medium\` on Sonnet 5 is roughly comparable to Sonnet 4.6 at \`high\` — a useful cost step-down.

None of this is exotic if you've already migrated anything to Opus 4.7 or 4.8 — it's the same surface. If you're coming straight from Sonnet 4.5 or older, budget a real migration pass rather than a find-and-replace.

---

## The First Week: What People Are Actually Saying

Launch-week reactions have sorted into a fairly consistent picture.

**The praise centers on agentic endurance and context.** Teams are loading entire monorepos — 250K+ lines — into single sessions and getting useful whole-codebase answers. The model plans, uses tools, and self-verifies well enough that "start it and walk away" workflows that used to require Opus now run acceptably on Sonnet pricing. For a lot of mid-size teams, that's the difference between agentic workflows being a line item they debate and one they don't.

**The criticism centers on deliberateness.** The same self-verification that makes long runs reliable makes quick interactions slower. Reviewers note it runs tests for one-line changes and reconsiders plans mid-flight. If your mental model of Sonnet is "the fast one," Sonnet 5 will occasionally frustrate you — it's better understood as "the thorough one that happens to be affordable."

**And the pricing debate cuts both ways.** Boosters point at near-Opus capability at 40% of Opus input pricing. Skeptics point at the tokenizer inflation and the September price restoration and argue the effective discount is smaller than the headline. Both are right; the model is still clearly the best value in the lineup either way.

---

## FAQ

**Is Claude Sonnet 5 free?**
It's the default model on Claude's Free plan, so yes — you can use it at no cost within free-tier limits. API usage is billed at $2/$10 per million input/output tokens through August 31, 2026, then $3/$15.

**Is Sonnet 5 better than Opus 4.8?**
No — Opus 4.8 is still the more capable model, and it remains the default for Max and Team Premium plans. But Sonnet 5 is close enough on coding and agentic tasks that Opus needs a justification for many workloads, at 2–2.5x the price.

**Does Sonnet 5 have a 1M context window?**
Yes, natively — no beta flag, no long-context surcharge. Note the new tokenizer means 1M tokens holds somewhat less text than it would have on Sonnet 4.6's tokenizer.

**Why does Sonnet 5 feel slower than Sonnet 4.6?**
Adaptive thinking is on by default, and the model self-verifies more. Lower the effort level for quick interactive work, or disable thinking explicitly on latency-sensitive API paths.

**Should I migrate from Sonnet 4.6?**
Almost certainly, and ideally before August 31 while the promo pricing lets you re-run evals cheaply. Just treat it as a real migration: remove \`budget_tokens\` and sampling params, re-baseline token counts, and re-test anything tuned to 4.6's latency profile.

---

## The Bottom Line

Sonnet 5 is the least dramatic release of Anthropic's summer and the one that will change the most people's daily work. Fable 5 redefined the ceiling; Sonnet 5 redefined the default. Near-Opus coding ability, a million tokens of context, and the full effort range — on the free tier's default model, at prices that (for two more months) undercut its own predecessor.

The practical takeaways: let it be your default, escalate to Opus 4.8 deliberately rather than habitually, re-baseline anything you measure in tokens, and use the promo window to run the backlog of agentic experiments you've been putting off.

## Further Reading

- [Claude Fable 5: Anthropic's New Top Tier, Explained](/blog/claude-fable-5-guide) — the other end of the 2026 lineup
- [Claude Opus 4.8 Release: What's New](/blog/claude-opus-4-8-release) — the model Sonnet 5 is chasing
- [Claude Code Best Practices](/blog/claude-code-best-practices) — habits that matter more than model choice
- [Context Engineering for Claude Code](/blog/context-engineering-claude-code) — because a 1M window is not a license to fill it
`,
};
