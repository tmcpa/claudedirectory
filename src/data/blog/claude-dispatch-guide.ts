import { BlogPost } from "@/lib/types";

export const claudeDispatchGuide: BlogPost = {
  slug: "claude-dispatch-guide",
  title:
    "Claude Dispatch: Control Your Desktop From Your Phone With AI in 2026",
  description:
    "Everything you need to know about Claude Dispatch -- Anthropic's new feature that lets you assign tasks from your phone and have Claude execute them on your Mac. Covers setup, use cases, limitations, and how it compares to Remote Control.",
  publishedDate: "2026-03-28",
  tags: [
    "claude-code",
    "claude-desktop",
    "productivity",
    "automation",
    "tutorial",
  ],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    {
      type: "blog",
      slug: "claude-code-remote-control",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-agents-guide",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-workflows-10x-productivity",
      relationship: "recommends",
    },
  ],
  content: `# Claude Dispatch: Control Your Desktop From Your Phone With AI

You're on the train, halfway through your commute, and you realize you forgot to pull last week's metrics into that slide deck before the morning standup. Normally that means scrambling on your laptop or asking a colleague for help. With Claude Dispatch, you pull out your phone, type "pull last week's analytics into the Q1 deck," and by the time you sit down at your desk, it's done.

That's the pitch behind **Claude Dispatch** -- Anthropic's new feature that turns your phone into a remote control for Claude running on your Mac. Launched on March 17, 2026 as a research preview, Dispatch creates a persistent bridge between your mobile device and your desktop. You send instructions from anywhere; Claude executes them on your machine.

This guide breaks down how Dispatch works, what you can actually do with it today, where it falls short, and how it fits alongside Claude Code's existing Remote Control feature.

---

## What Is Claude Dispatch?

Dispatch is a feature within **Claude Cowork** (and now extending into **Claude Code**) that pairs your mobile device with your Mac via a QR code. Once paired, you have a persistent conversation thread with Claude that spans both devices. You text Claude from your phone; Claude works on your desktop.

The key distinction from a regular chat session: **Dispatch doesn't reset between tasks**. It maintains a continuous thread with memory of your previous requests, preferences, and project context. You can assign a task at 8am, get the result at 8:15am, and then reference that work in a follow-up request at 2pm -- all in the same thread.

When you assign a task, Claude intelligently routes it to the right execution environment:

- **Development tasks** (writing code, running tests, managing repos) spin up in **Claude Code**
- **Knowledge work** (research, writing, spreadsheets, file management) runs in **Claude Cowork**

You get a push notification on your phone when the work is done or when Claude needs your approval to continue.

---

## How to Set Up Dispatch

Setup is intentionally simple:

1. **Make sure you're on a Claude Pro ($20/month) or Max plan** -- Dispatch is not available on the free tier
2. **Open Claude Desktop** on your Mac and ensure it's updated to the latest version
3. **Navigate to Settings > Dispatch** and enable the feature
4. **Open the Claude mobile app** on your phone
5. **Scan the QR code** displayed on your Mac's screen
6. You're paired. Start assigning tasks.

The pairing persists across sessions, so you only need to scan the QR code once. If you switch devices or need to re-pair, you can generate a new QR code from the settings panel.

### Requirements

- **macOS only** (Windows support is confirmed as coming soon)
- Claude Desktop must be open and your Mac must be awake
- Claude Pro or Max subscription
- Claude mobile app (iOS or Android)

---

## What Can You Actually Do With Dispatch?

Here's where it gets practical. Dispatch isn't just "Claude on your phone" -- it's Claude on your phone with access to everything on your desktop. That includes your local files, connected MCP servers, installed plugins, and with Computer Use enabled, your actual applications.

### Development Workflows

- **"Review the PR on feature-branch and leave comments on anything that looks off"** -- Claude opens your IDE, reads the diff, and posts review comments
- **"Run the test suite and fix any failures"** -- Claude spins up a Code session, runs tests, and commits fixes
- **"Create a new branch from main and scaffold the user-settings page"** -- Claude handles the git operations and generates boilerplate

### Knowledge Work

- **"Summarize yesterday's meeting notes and email the action items to the team"** -- Claude reads your notes, drafts the email, and sends it
- **"Pull Q1 revenue data from the analytics dashboard and drop it into the board deck"** -- Claude uses Computer Use to navigate your apps
- **"Research competitors' pricing changes this month and write a one-page brief"** -- Claude searches, synthesizes, and writes

### Recurring Tasks

Dispatch natively supports scheduled and recurring tasks:

- **"Every Monday morning, pull last week's analytics and email me a summary"**
- **"Every Friday at 4pm, generate a weekly status report from my commit history"**
- **"Remind me to review open PRs every day at 10am"**

These persist across sessions. Set them once and forget about them.

---

## Dispatch vs. Remote Control: What's the Difference?

If you've been using Claude Code's **Remote Control** feature (launched February 2026), you might wonder how Dispatch differs. They're closely related but serve different use cases:

| Feature | Remote Control | Dispatch |
|---------|---------------|----------|
| **Interface** | Browser-based terminal UI | Mobile app chat UI |
| **Execution** | Claude Code (terminal) | Claude Code + Cowork (full desktop) |
| **Pairing** | URL + auth token | QR code |
| **Context** | Per-session | Persistent across sessions |
| **Computer Use** | No | Yes (with Cowork) |
| **Scheduled tasks** | No | Yes |
| **Best for** | Remote terminal access | Mobile-first task delegation |

**Remote Control** is a developer tool -- it gives you remote access to your terminal session. **Dispatch** is a productivity tool -- it gives you a persistent assistant that can work across your entire desktop environment.

If you're a developer who mainly needs to check on builds or run commands from your phone, Remote Control is lighter and more direct. If you want to delegate full tasks -- including ones that span multiple applications -- Dispatch is the play.

---

## The Honest Limitations

Anthropic is calling this a "research preview" for good reason. Here's what to expect:

### Your Mac Must Stay Awake

Dispatch stops working if your Mac goes to sleep or if you close Claude Desktop. There's no cloud-based fallback -- your machine is doing the actual work. This means you'll want to adjust your energy settings to prevent sleep during work hours, or use a utility to keep your Mac awake.

### One Task at a Time

You can't run multiple Dispatch tasks in parallel. If Claude is working on something, you need to wait for it to finish (or cancel it) before assigning the next task. This is a meaningful constraint for power users.

### Complex Multi-App Tasks Have a ~50% Success Rate

Anthropic has been transparent about this: tasks that require Claude to navigate across multiple applications using Computer Use succeed roughly half the time. Simple, single-app tasks are much more reliable. The technology is genuinely hard, and this is an honest reflection of where autonomous desktop agents are in early 2026.

### It Can Burn Through Your Quota

Multiple users have reported that Dispatch consumes usage quotas faster than expected, especially when Computer Use is involved. If you're on a Pro plan, monitor your usage closely. Max plan subscribers have more headroom but should still keep an eye on consumption for complex tasks.

### macOS Only (For Now)

Windows support has been confirmed but doesn't have a firm release date beyond "the next few weeks." Linux users are out of luck for the foreseeable future.

---

## Tips for Getting the Most Out of Dispatch

After spending time with the feature, here are some practical recommendations:

### 1. Start With Simple, Well-Defined Tasks

Dispatch shines when you give it clear, bounded instructions. "Refactor the auth module to use the new token format" works better than "improve the codebase." The more specific you are, the higher the success rate.

### 2. Use It for Tasks You'd Otherwise Forget

The real killer use case isn't doing things faster -- it's doing things you'd otherwise postpone or forget. Fire off a task while it's fresh in your mind, and come back to the result later.

### 3. Set Up Recurring Tasks Early

Scheduled tasks are the compound-interest play here. Spend 10 minutes setting up your weekly reports, daily PR reviews, and Monday morning summaries. They'll run themselves from that point forward.

### 4. Pair With CLAUDE.md for Context

If you have a well-configured \`CLAUDE.md\` in your project root, Dispatch inherits that context. This means Claude already knows your project conventions, preferred tools, and coding standards when it spins up a Code session on your behalf.

### 5. Keep Computer Use Tasks Simple

Until the success rate for multi-app workflows improves, stick to single-application Computer Use tasks. "Open the spreadsheet and update cell B12" is much more reliable than "pull data from three different apps and compile a report."

---

## The Competitive Landscape

Dispatch didn't launch in a vacuum. OpenClaw -- the open-source desktop agent that went viral in Shenzhen earlier this year -- demonstrated massive demand for autonomous desktop agents. Google's Project Mariner and OpenAI's Operator are exploring similar territory.

What sets Dispatch apart is the **mobile-first delegation model**. Most competing solutions require you to be sitting at your computer to initiate tasks. Dispatch flips this: you're anywhere with your phone, and your computer does the work in the background. Combined with Anthropic's focus on safety (sandboxed execution, explicit approval prompts for sensitive actions), it's a distinctly opinionated take on the desktop agent space.

---

## What's Next

Dispatch is clearly an early step in a larger vision. The trajectory points toward Claude as a persistent, always-available assistant that manages your digital workspace -- not just during the hours you're sitting at your desk, but around the clock.

Windows support will broaden the user base significantly. Multi-task parallelism would remove the biggest power-user friction point. And as Computer Use reliability improves from ~50% to something closer to 90%+, the range of tasks you can confidently delegate will expand dramatically.

For now, Dispatch is most valuable as a lightweight way to fire off tasks from your phone and come back to finished work. It's not going to replace sitting down and doing deep work -- but it's very good at handling the tasks that would otherwise sit in your "I'll get to it later" list indefinitely.

---

## Getting Started

1. Update Claude Desktop to the latest version
2. Enable Dispatch in Settings
3. Pair your phone by scanning the QR code
4. Start with a simple task: "Summarize the README in my current project"
5. Graduate to recurring tasks once you're comfortable

Dispatch is available now as a research preview for Claude Pro and Max subscribers on macOS. Try it out and see how it fits into your workflow -- the best use cases tend to emerge from actually using it rather than theorizing about it.`,
};
