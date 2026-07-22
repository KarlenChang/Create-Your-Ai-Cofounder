# Agent Setup Protocol

You are running this protocol because a workshop participant pasted this URL into your Hermes chat. Read every step, then run them in order, one at a time.

**Critical rules:**
- Before EVERY action, tell the user what you are about to do and wait for their "yes" before doing it
- Detect the user's operating system (Mac or Windows) and use the correct file paths
- Never assume — always confirm paths with the user before creating folders or files
- If the user says "no" or wants to change something, respect that and ask what they prefer

## Step 1: Check gbrain

**Say to the user:**
> "I'm going to check if gbrain (your business brain tool) is already installed. If it's not, I'll install it for you. Is that okay?"

Wait for their response.

Run `gbrain --version` in the terminal. If you see a version number, tell the user gbrain is already installed and skip to Step 2.

If the command is not found, tell the user:
> "gbrain is not installed. I'll install it now — this downloads bun (a package manager) and then installs gbrain. This takes about 30 seconds."

Wait for their "yes", then run:
```
curl -fsSL https://bun.sh/install | bash
bun install -g github:garrytan/gbrain
```

Verify with `gbrain --version` and tell the user it's installed.

## Step 2: Create the brain folder structure

**First, detect the operating system:**
- Mac: the brain folder will be at `~/Documents/my-company-brain/`
- Windows: the brain folder will be at `%USERPROFILE%\Documents\my-company-brain\`

**Say to the user:**
> "I'm going to create your business brain folder. This is where all your business knowledge will live — it persists across all projects and sessions.
>
> Based on your system, I'll create it at: `[insert correct path for their OS]`
>
> Is this the folder you want me to use? If you'd prefer a different location, tell me where."

Wait for their response. If they want a different path, use their path instead.

**Once they confirm**, tell them what you're creating:
> "Creating 7 folders inside your brain folder:
> - org/ — business model, customer journey
> - projects/ — active work
> - people/ — clients, partners
> - concepts/ — methodology
> - decisions/ — what was chosen and why
> - sources/ — reference material
> - ideas/ — things not sure about yet
>
> Is that okay?"

Wait for their "yes", then run the mkdir command with their confirmed path.

**Important:** No misc folder. If you do not know where something goes, leave it out.

## Step 3: Initialize the gbrain database

**Say to the user:**
> "Now I'll initialize the gbrain database inside your brain folder. This creates a local database that your agent can search, query, and save things to. It runs entirely on your laptop — nothing is sent to the cloud.
>
> I'll run: `gbrain init --pglite` in `[their brain folder path]`
>
> Is that okay?"

Wait for their "yes", then run:
```
cd [their brain folder path]
gbrain init --pglite
```

If gbrain asks for an embedding provider, tell the user:
> "gbrain is asking which embedding provider to use. I'll accept the defaults — this works fine for most people."

Then verify:
```
gbrain doctor --json
```

Tell the user the results. If anything is red, say:
> "Something needs fixing. I'll run `gbrain doctor --fix` now."

## Step 4: Set up git (safety net)

**Say to the user:**
> "I'll set up git in your brain folder. This is a safety net — it means every change to your brain can be undone if something goes wrong. Think of it as an undo button for your business knowledge.
>
> I'll run: `git init`, `git add .`, and `git commit` in `[their brain folder path]`
>
> Is that okay?"

Wait for their "yes", then run:
```
cd [their brain folder path]
git init
git add .
git commit -m "Initial brain structure"
```

Tell them: "Git is set up. Any future changes can be reverted with `git checkout .` if something goes wrong."

## Step 5: Create SOUL.md

**Say to the user:**
> "I'll create a file called SOUL.md in your Hermes config folder. This file teaches your agent three important habits:
>
> 1. **Search before answering** — before answering questions about your business, it checks the brain first
> 2. **Capture as you go** — when you share something important, it saves it to the brain
> 3. **Cite your sources** — when it answers from the brain, it tells you which page it used
>
> I'll create the file at: `[~/.hermes/SOUL.md or %USERPROFILE%\.hermes\SOUL.md]`
>
> Is that okay?"

Wait for their "yes", then create the SOUL.md file with the appropriate path for their OS.

## Step 6: Create the project pointer

**Say to the user:**
> "I'll create a project pointer file. This tells the brain that you have a project called 'workshop-build' and where its files live.
>
> I'll create it at: `[their brain folder path]/projects/workshop-build.md`
>
> Is that okay?"

Wait for their "yes", then create the file.

## Step 7: Verify gbrain is working

**Say to the user:**
> "Everything is installed. Let's test it. I'm going to ask you two questions about your business and save the answers to your brain. This proves the whole system works.
>
> First question: In one sentence, what does your business do?"

Wait for their answer. Then:

> "Second question: Who is your ideal customer?"

Wait for their answer. Then save both:
```
gbrain capture "Business: [their answer]"
gbrain capture "Ideal customer: [their answer]"
```

Tell them: "Both saved to your brain. Your agent can now search for and reference this information."

## Step 8: Install the workshop skills

**Say to the user:**
> "Now I'll install two skills for this workshop:
>
> 1. **Lean Canvas** — helps you map your business model on one page
> 2. **Customer Journey Map** — helps you map how customers move through your business
>
> I'll download these from the workshop repository and save them to your Hermes skills folder.
>
> Is that okay?"

Wait for their "yes".

Fetch the two skill files from the GitHub repository and save them locally:
- Lean Canvas: `https://raw.githubusercontent.com/KarlenChang/Create-Your-Ai-Cofounder/main/skills/lean-canvas/SKILL.md`
- Customer Journey Map: `https://raw.githubusercontent.com/KarlenChang/Create-Your-Ai-Cofounder/main/skills/customer-journey-map/SKILL.md`

Save to the appropriate paths based on their OS:
- Mac: `~/.hermes/skills/lean-canvas/SKILL.md` and `~/.hermes/skills/customer-journey-map/SKILL.md`
- Windows: `%USERPROFILE%\.hermes\skills\lean-canvas\SKILL.md` and `%USERPROFILE%\.hermes\skills\customer-journey-map\SKILL.md`

Tell them when both are loaded.

## Step 9: Save the skills to the brain

**Say to the user:**
> "I'll copy both skills into your brain's org/ folder so the brain knows about them. Then I'll save a summary to the brain.
>
> Is that okay?"

Wait for their "yes", then copy the files and save the summary:
```
gbrain capture "Workshop skills installed: Lean Canvas (for business model mapping) and Customer Journey Map (for customer experience mapping). Both are available in org/."
```

## Done

Tell the user:

```
Setup complete! Here's what you have:

- Brain: gbrain database at [their brain folder path]
- Skills: Lean Canvas + Customer Journey Map loaded
- Brain content: [list pages with gbrain list]
- Project: workshop-build

You're ready to go. Try saying:
"Help me fill in my Lean Canvas"
```

If any step fails, tell the user what happened and ask for help. Do not skip steps. Do not make up results.
