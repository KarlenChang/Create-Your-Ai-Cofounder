---
name: lean-canvas
description: "Generate a Lean Canvas as an HTML document using the classic Ash Maurya layout. Use when exploring a lean startup canvas, testing a business hypothesis, or modeling a new venture."
source: "Forked from phuryn/pm-skills — rewritten to output HTML"
---

# Lean Canvas

## Metadata
- **Name**: lean-canvas
- **Description**: Generate a Lean Canvas business model as a visual HTML document
- **Triggers**: lean canvas, startup canvas, lean model, business hypothesis, fill in my canvas, business model

## Instructions

You are a business model strategist designing a Lean Canvas for $ARGUMENTS.

**Output format: HTML.** Do NOT output markdown or plain text. Generate a complete, self-contained HTML file using the template below.

## Step 1: Ask the user about their business — follow the sequence

Tell the user: There's an ideal sequence for filling in a Lean Canvas. You can follow it step by step or use your own order. Here's the recommended sequence:

**Tell the user this at the start:**
> "I'll ask you questions in a specific order — the classic Lean Canvas sequence. Each box builds on the one before it. If you don't know an answer, just say so — we can mark it as TBD and move on."

Then ask them in this exact order (one at a time — don't dump all questions at once):

| # | Box | Question |
|---|-----|----------|
| **1** | **Problem** | "What are the top 3 problems your customers face?" |
| **2** | **Solution** | "For those problems, what are the top 3 things you deliver to solve them?" |
| **3** | **Unique Value Proposition** | "In one sentence, why should customers choose you over alternatives?" |
| **4** | **Unfair Advantage** | "What do you have that competitors can't easily copy or buy?" |
| **5** | **Customer Segments** | "Who is your ideal customer? Be specific." |
| **6** | **Channels** | "How do you reach your customers? What channels?" |
| **7** | **Early Adopters** | "Which type of customer would recognize your value first?" |
| **8** | **Key Metrics** | "What 3 numbers tell you if your business is working?" |

After the numbered sequence, ask about the remaining boxes:

| # | Box | Question |
|---|-----|----------|
| **9** | **Existing Alternatives** | "How do customers solve these problems today — before you?" |
| **10** | **Cost Structure** | "What are your biggest fixed and variable costs?" |
| **11** | **Revenue Streams** | "How do you make money? What's your pricing?" |

If the user doesn't know an answer, that's fine — write "TBD" and move on. The canvas is a living document. Tell them: "The goal isn't perfection — it's getting your assumptions on paper so you can test them."

**The sequence logic:** Problem → Solution → UVP is the core chain. Unfair Advantage → Customer Segments → Channels → Early Adopters expands the go-to-market view. Key Metrics closes the loop. The remaining boxes (Alternatives, Cost, Revenue) refine the edges.

## Step 2: Generate the HTML

Use the HTML template at `templates/lean-canvas.html` in the workshop repository. Fill in each section with the user's answers.

Save the completed HTML file to the user's workspace or brain folder. Suggest the path: `~/Documents/my-company-brain/org/lean-canvas.html`

## Step 3: Save to the brain

After generating the HTML, save a summary to the brain:

```
gbrain capture "Lean Canvas created for [business name]. Saved as HTML at [path]. Key UVP: [their UVP]. Top problem: [their #1 problem]."
```

## The HTML Layout

The Lean Canvas has this structure (matching Ash Maurya's original layout):

```
┌──────────────┬──────────────┬──────────────┬──────────────┬──────────────┐
│   PROBLEM    │   SOLUTION   │     UVP      │    UNFAIR    │   CUSTOMER   │
│              │              │   (spans     │   ADVANTAGE  │   SEGMENTS   │
│              │              │   2 rows)    │              │              │
├──────────────┼──────────────┤              ├──────────────┼──────────────┤
│   EXISTING   │     KEY      │              │   CHANNELS   │    EARLY     │
│ ALTERNATIVES │   METRICS    │              │              │   ADOPTERS   │
├──────────────┴──────────────┴──────────────┴──────────────┴──────────────┤
│                        COST STRUCTURE        │      REVENUE STREAMS     │
└──────────────────────────────────────────────┴──────────────────────────┘
```

The template is at: `https://raw.githubusercontent.com/KarlenChang/Create-Your-Ai-Cofounder/main/templates/lean-canvas.html`

## Notes
- The Lean Canvas is designed for rapid hypothesis testing
- Focus on addressing the riskiest assumptions first
- Update the canvas as you learn and validate
- Each section should be specific and measurable where possible
- The HTML output is visual and can be opened in any browser
- Lean Canvas (Ash Maurya) replaces Partners/Activities/Resources with Problem/Solution/Unfair Advantage
