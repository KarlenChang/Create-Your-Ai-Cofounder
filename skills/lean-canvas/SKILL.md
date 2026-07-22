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

## Step 1: Ask the user about their business

Before generating the canvas, ask the user these questions (one at a time or in a group):

1. What problem does your business solve? (Top 3 problems your customers face)
2. What is your solution? (Top 3 features/approaches)
3. What is your unique value proposition? (One sentence — why should customers choose you?)
4. What is your unfair advantage? (What can't be easily copied or bought?)
5. Who are your customer segments? (Who is your ideal customer?)
6. What are the existing alternatives? (How do these problems get solved today?)
7. What are your key metrics? (3 numbers that tell you if it's working)
8. What are your channels? (How do you reach your customers?)
9. Who are your early adopters? (Which customers understand your value first?)
10. What is your cost structure? (Fixed and variable costs)
11. What are your revenue streams? (How do you make money?)

If the user doesn't know an answer, that's fine — write "TBD" and move on. The canvas is a living document.

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
