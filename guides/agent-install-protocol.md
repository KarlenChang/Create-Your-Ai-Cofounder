# Agent Setup Protocol

You are running this protocol because a workshop participant pasted this URL into your Hermes chat. Read every step, then run them in order, one at a time. Report back after each step.

You will not ask the user to type commands. You will run them yourself.

## Step 1: Check gbrain

Run `gbrain --version` in the terminal. If you see a version number, skip to Step 2.

If the command is not found, install gbrain by running:

```
curl -fsSL https://bun.sh/install | bash
bun install -g github:garrytan/gbrain
```

Then verify with `gbrain --version`.

## Step 2: Create the brain folder structure

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

## Step 3: Initialize the gbrain database

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

## Step 4: Set up git (safety net)

```
cd ~/Documents/my-company-brain
git init
git add .
git commit -m "Initial brain structure"
```

Every future change to the brain can be reverted with `git checkout .` if something goes wrong.

## Step 5: Create SOUL.md

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

## Step 6: Create the project pointer

Create the file `~/Documents/my-company-brain/projects/workshop-build.md`:

```
# Workshop Build

Project folder: ~/Documents/my-projects/workshop-build/

## What this is

The first project in the business brain. The agent's working
directory for the workshop session is the folder above. This
pointer file lets the brain track what each project is about.
```

## Step 7: Verify gbrain is working

Ask the user:
"In one sentence, what does your business do?"
"Who is your ideal customer?"

Save both answers:

```
gbrain capture "Business: [their answer]"
gbrain capture "Ideal customer: [their answer]"
```

## Step 8: Install the workshop skills

Now that gbrain is working, install the two skills for this workshop. Read these two files from the GitHub repository and save them locally:

- Lean Canvas skill: `https://raw.githubusercontent.com/KarlenChang/Create-Your-Ai-Cofounder/main/skills/lean-canvas/SKILL.md`
- Customer Journey Map skill: `https://raw.githubusercontent.com/KarlenChang/Create-Your-Ai-Cofounder/main/skills/customer-journey-map-SKILL.md`

For each skill, fetch the file content and save it to the corresponding local path:
- `~/.hermes/skills/lean-canvas/SKILL.md`
- `~/.hermes/skills/customer-journey-map/SKILL.md`

Create the directories if they do not exist. Confirm to the user that both skills are loaded.

## Step 9: Save the skills to the brain

Copy both skills into the brain's `org/` folder so the brain knows about them:

```
cp ~/.hermes/skills/lean-canvas/SKILL.md ~/Documents/my-company-brain/org/lean-canvas-skill.md
cp ~/.hermes/skills/customer-journey-map/SKILL.md ~/Documents/my-company-brain/org/customer-journey-map-skill.md
```

Then capture a summary:

```
gbrain capture "Workshop skills installed: Lean Canvas (for business model mapping) and Customer Journey Map (for customer experience mapping). Both are available in org/."
```

## Done

Once all steps are complete, report back:

```
Setup complete. Here's what I have:
- Brain: gbrain database initialized at ~/Documents/my-company-brain/
- Skills: Lean Canvas + Customer Journey Map loaded
- Brain content: [list pages with gbrain list]
- Project: workshop-build

Try: "Help me fill in my Lean Canvas"
```

If any step fails, ask the user for help. Do not skip steps. Do not make up results.
