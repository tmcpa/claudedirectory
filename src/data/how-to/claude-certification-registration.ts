import { HowTo } from "@/lib/types";

export const claudeCertificationRegistrationHowTo: HowTo = {
  slug: "claude-certification-registration",
  title: "How to Register for the Claude Certification Exams",
  description:
    "The registration path for Anthropic's Claude certifications: partner-network eligibility, the Anthropic Partner Academy, Pearson VUE scheduling, fees, and retakes",
  difficulty: "beginner",
  timeToComplete: "15 min",
  tags: ["certification", "claude-certified-architect", "getting-started"],
  author: {
    name: "Your AI Department",
    url: "https://youraidept.com/network/claude-certification",
  },
  relatedItems: [
    {
      type: "blog",
      slug: "anthropic-claude-certification-program",
      relationship: "recommends",
    },
  ],
  content: `# How to Register for the Claude Certification Exams

Anthropic's Claude certifications (CCAR-F, CCDV-F, CCAO-F, CCAR-P) are proctored exams delivered by Pearson VUE. The part that surprises most candidates is registration: there is no individual sign-up. This guide covers how access works and how to book a seat.

*Disclosure: this guide is maintained by [Your AI Department](https://youraidept.com/network), a Claude Partner Network firm. The steps below apply whichever route you take.*

## The eligibility rule

Pearson VUE's [program page](https://www.pearsonvue.com/us/en/anthropic.html) states it plainly: "Certification is open to organizations in the Claude Partner Network and counts toward partner program standing."

You register through the Anthropic Partner Academy, and the Academy requires affiliation with a partner organization. Individuals cannot enroll directly.

## Step 1: Get partner-network affiliation

Three routes in:

1. **Through your employer.** If your company brings Claude to market, it can apply to the [Claude Partner Network](https://claude.com/partners). Membership is free.
2. **Through your own company.** If you operate a company that ships Claude work, it can apply directly. You take on the application and the ongoing partner relationship.
3. **Through a partner firm.** Independent engineers can join an existing partner organization and register under its standing. [Your AI Department](https://youraidept.com/network/claude-certification) is one example; the credential you earn is issued to you personally and stays with you if you leave.

## Step 2: Register at the Anthropic Partner Academy

Once affiliated, sign in to the Partner Academy with your organization email. The Academy holds the self-paced preparation courses for each exam and is where you request your exam registration. New Pearson VUE users receive scheduling credentials by email.

## Step 3: Schedule through Pearson VUE

Exams are delivered online proctored or at a physical test center. Appointments can be rescheduled or cancelled up to 24 hours before the sitting.

## Fees and policies

- **Fees**: $125 per attempt for CCAR-F and CCDV-F per the current exam guides; $99 (CCAO-F) and $175 (CCAR-P) as reported by prep guides but not yet on an official public page
- **Retakes**: up to 4 attempts per exam in any rolling 12-month period, with waiting periods of 14 days after the first attempt, 30 after the second, and 90 after the third
- **Validity**: credentials are valid for 12 months, with a free on-time renewal via a non-proctored assessment on the Partner Academy; a lapsed credential means sitting the full exam again at the standard fee

## Common questions

**Can I take the exam without any company at all?** Not today. The partner-organization requirement is enforced at registration, which is why solo builders use route 3.

**Does the credential belong to me or my organization?** To you. It counts toward the organization's partner standing while you are affiliated, but the certification itself is personal and permanent (subject to the 12-month renewal cycle).

**Which exam should I sit first?** Engineers who design systems usually start with CCAR-F; developers deep in application code with CCDV-F; non-developers with CCAO-F. CCAR-P builds on the architect foundations.

Exam details are Anthropic's and change over time. Verify fees and policies against the official program pages before scheduling.`,
};
