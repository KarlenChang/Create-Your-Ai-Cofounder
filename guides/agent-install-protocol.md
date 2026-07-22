# Agent Setup Protocol

You are running this protocol because a workshop participant pasted this URL into your Hermes chat. Read every step, then run them in order, one at a time. Report back after each step.

You will not ask the user to type commands. You will run them yourself.

## Step 1: Load the workshop skills

Before doing anything else, read these two URLs and treat their contents as skills you now have:

- Lean Canvas skill: `https://gist.github.com/KarlenChang/50951c4c52f6122165e785d6ca24a063/raw/lean-canvas-SKILL.md`
- Customer Journey Map skill: `https://gist.github.com/KarlenChang/50951c4c52f6122165e785d6ca24a063/raw/customer-journey-map-SKILL.md`

Read both URLs now. Confirm to the user that you have loaded them. They are the skills you will use later in this protocol and in future conversations.

## Step 2: Check gbrain

Run `gbrain --version` in the terminal. If you see a version number, skip to Step 3.

If the command is not found, install gbrain by running:

```
curl -fsSL https://bun.sh/install | bash
bun install -g github:garrytan/gbrain
```

Then verify with `gbrain --version`.

## Step 3: Create the brain folder structure

Run this single command to create all seven folders:

```
mkdir -p ~/Documents/my-company-brain/{org,projects,people,concepts,decisions,sources,ideas}
```

The seven folders organize the brain:
- `org/` - business model, customer journey
- `projects/` - active work
- `people/` - clients, partners
- `concepts/` - methodology
- `decisions/` - what was chosen and why
- `sources/` - reference material
- `ideas/` - things not sure about yet

Important: no misc folder. If you do not know where something goes, leave it out.

## Step 4: Initialize the gbrain database

```
cd ~/Documents/my-company-brain
gbrain init --pglite
```

This creates an embedded Postgres database in the brain folder. If gbrain asks for an embedding provider, accept the defaults.

Verify:

```
gbrain doctor --json
```

Green checks mean success. If anything is red, run `gbrain doctor --fix`.

## Step 5: Set up git (safety net)

```
cd ~/Documents/my-company-brain
git init
git add .
git commit -m "Initial brain structure"
```

Every future change to the brain can be reverted with `git checkout .` if something goes wrong.

## Step 6: Create SOUL.md

Create the file at `~/.hermes/SOUL.md` with this content:

```
## Business brain

My business knowledge base is a gbrain instance at ~/Documents/my-company-brain.
To interact with it, run gbrain commands in the terminal:
- Search: gbrain search "topic"
- Query: gbrain query "question about my business"
- Save something: gbrain capture "decision or note"
- Read a page: gbrain get slug-name
- List all pages: gbrain list

Before answering any question about my business, customers, or
decisions, search the brain first. When I make a decision or share
something worth keeping, save it to the brain. When you answer from
the brain, tell me which page you used.
```

This teaches the agent three habits: search before answering, capture as you go, cite your sources.

## Step 7: Create the project pointer

Create the file `~/Documents/my-company-brain/projects/workshop-build.md`:

```
# Workshop Build

Project folder: ~/Documents/my-projects/workshop-build/

## What this is

The first project in the business brain. The agent's working
directory for the workshop session is the folder above. This
pointer file lets the brain track what each project is about.
```

## Step 8: Capture the user's business context

Ask the user exactly two questions and save each answer to the brain:

1. "In one sentence, what does your business do?"
2. "Who is your ideal customer?"

Save each answer using:

```
gbrain capture "Business: [their one-sentence answer]"
gbrain capture "Ideal customer: [their answer]"
```

## Done

Once all steps are complete, report back:

```
Setup complete. Here's what I can do:
- Lean Canvas skill loaded
- Customer Journey Map skill loaded
- Brain: [list of pages using gbrain list]
- Project: workshop-build

Try asking me: "Help me fill in my Lean Canvas" or "What do you know about my business?"
```

If any step fails, ask the user for help. Do not skip steps. Do not make up results.
