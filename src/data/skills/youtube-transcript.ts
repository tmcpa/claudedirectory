import { Skill } from "@/lib/types";

export const youtubeTranscriptSkill: Skill = {
  slug: "youtube-transcript",
  title: "YouTube Transcript Downloader",
  description: "Download transcripts and captions from YouTube videos for analysis and summarization",
  tags: ["youtube", "transcript", "captions", "video", "content"],
  featured: false,
  author: {
    name: "michalparkola",
    url: "https://github.com/michalparkola/youtube-transcript-skill",
  },
  repoUrl: "https://github.com/michalparkola/youtube-transcript-skill",
  content: `# YouTube Transcript Downloader Skill

Download and process transcripts from YouTube videos.

## Overview

This skill enables Claude Code to extract transcripts from YouTube videos for:

- **Summarization** - Create summaries of video content
- **Analysis** - Search and analyze video transcripts
- **Translation** - Work with multi-language captions
- **Quotes** - Extract specific quotes with timestamps

## Installation

Clone the skill to your Claude Code configuration:

\`\`\`bash
git clone https://github.com/michalparkola/youtube-transcript-skill.git ~/.claude/skills/youtube-transcript
\`\`\`

## Requirements

- Python 3.8+ installed
- youtube-transcript-api package

\`\`\`bash
pip install youtube-transcript-api
\`\`\`

## Features

### Transcript Download
- Fetch auto-generated captions
- Download manual subtitles
- Support for multiple languages
- Handle videos without captions

### Timestamp Support
- Preserve timing information
- Link to specific video moments
- Create chapter markers

### Output Formats
- Plain text transcripts
- SRT/VTT subtitle files
- JSON with metadata
- Markdown with timestamps

## Example Usage

"Download the transcript for this YouTube video: [URL]"
"Summarize the key points from this video transcript"
"Find all mentions of 'machine learning' in this video"

## Repository

[github.com/michalparkola/youtube-transcript-skill](https://github.com/michalparkola/youtube-transcript-skill)
`,
  relatedItems: [
    { type: "mcp-server", slug: "youtube", relationship: "works-with" },
  ],
};
