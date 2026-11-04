# Prompt Log

Every prompt used to build this portfolio, in order.

**How these prompts were written:** I spoke every prompt aloud and dictated it with
[Wispr Flow](https://wisprflow.ai) on my laptop. The only exception is the repo link
in Prompt 4, which I pasted. They're copied
below exactly as Flow produced them, with no edits, so you can see real dictated
prompts, not polished ones.

**AI tool:** Claude (Anthropic), working in a cloud workspace linked to my laptop.
**Times:** India Standard Time (UTC+05:30).

---

## Session 1 — Planning and first build

### Prompt 1 · Sat 31 Oct 2026, 13:03 IST · 🎙️ Wispr Flow

> I'm going to start a Wispr Flow portfolio project. I need it for two things: the Wispr hiring challenge as well as the Wispr agentic AI one. I need to submit the second one today itself, so I need to be able to build it really quickly. I need to start a repo in D or download in D.
>
> I will attach two images for references. I want a Dora the Explorer-style portfolio. I will attach an updated resume as well. Plan first on what the landing page should look like. There should be a fun loading screen as well. I also want to attach the actual Dora the Explorer music to the back. The entire thing should focus on how I am set to explore so many opportunities and how I look at so many fields.
>
> If required, model the image I'm sending. I made two images converting myself into Lord of the Explorers style, like that kind of animation. Look into those images and, if possible, make them domain-specific:
>
> * When a UI/UX thing comes, change my palette into some, change my accessorist palette and brush.
> * When something else like AI comes, change my accessory into a bot.
> * Cybersecurity: change it into a magnifying glass.
> * Writing: I already have the accessory notebook.
> * Typing: all the domains I'm interested in, robotics.
> * I'm interested in music.
> * I'm interested as an anchor, so I need a mic there.
> * I'm a freelance website developer.
> * Whatever I do, like hackathon, whatever I like.
>
> Design it like the map in Dora. The landing page should look like this: I open it, and it's my cartoon-style me with "Welcome to Gangabnair's Portfolio." When you scroll down, there's a map, and the map is showing all the different domains I'm interested in. Design this much now, then we'll go into the later specifics.

**Attachments:** two cartoon reference images of me and one photo.

**What came out of it**
- A plan for the landing page, then a working build: a loading screen (packing gear along a dotted trail), a hero with my waving cartoon, and an illustrated adventure map with 10 lands plus a base camp and a treasure spot.
- My cartoon walks the trail, and her accessory changes for each land: palette & brush, bot, magnifying glass, notebook, gear, headphones, mic, laptop, trophy, rocket.
- The real Dora theme is copyrighted, so instead there's an original adventure tune generated in the browser with the Web Audio API. Dora characters were also left out.
- The project was saved to `D:\wispr-explorer-portfolio`.

---

## Session 2 — Island pages and the Wispr story

### Prompt 2 · Wed 4 Nov 2026, 19:20 IST · 🎙️ Wispr Flow

> This is fine. This is working quite a bit, but what I need right now is that this has only one page. What would be better is that every island on the map has its own page, and then I write the description there and can backtrack from there.
>
> I also need another page. When you scroll down, you can come to it. I need to explain how I came into contact with Wispr Flow itself. I did another hackathon that did only Wispr Flow projects as well, so I need to say that I need that as well. That page should be, again, like a map, but with tracks through it.
>
> At one point, I had no idea, and then I heard about this agentic AI hackathon by Product Space. I was just doing it with it, finding that it is really easy, all of that. I need a page like that because it's for the Wispr Flow growth hiring. Obviously, I need to mention how I came into contact with it and how I use it. I use it very little on my phone. I use it most on my laptop because I have a lot of thoughts and I need to be able to say them coherently. I use a lot of filler words because my brain runs really quickly, so I need to be able to note down every single thing.

**What came out of it**
- Every island now has its own page (`#land-uiux`, `#land-ai`, and so on). Each has a themed banner, field notes, project cards, skills and a fun fact. Back, previous and next buttons work, and the music keeps playing between pages.
- All island text moved into one file, `js/lands.js`, so I can write it myself.
- **The Wispr Line:** a scroll-driven train-track map below the main map, with these stations:
  1. Fast brain and filler words
  2. Product Space Agentic AI Hackathon
  3. "Wait… that's it?"
  4. The Wispr-only hackathon
  5. Laptop HQ
  6. Phone, a short side branch
  7. Wispr Flow · Growth
- A "Run it through Flow" demo that strips filler words from a ramble.

### Prompt 3 · Wed 4 Nov 2026, 20:31 IST · 🎙️ Wispr Flow

> I want to push this to Git now, and then I'll pick it up on Emergent with Claude itself. Have I already made my GitHub repo, or should I make it?

**What came out of it:** a check showing the repo didn't exist yet, and steps to create it.

### Prompt 4 · Wed 4 Nov 2026, 20:33 IST

> https://github.com/Ganga-B-Nair/wispr-explorer-portfolio.git

**What came out of it:** the first commit, pushed to `main`.

### Prompt 5 · Wed 4 Nov 2026, 20:35 IST · 🎙️ Wispr Flow

> What are some really good things I can add to this portfolio? Except for the changes I need to make, what are some things that I can add to this portfolio that will make it stand out so much compared to other people's? All my achievements are there, and everything is there. I want something different that makes the user want to interact with me.
>
> I don't want a normal Sudoku game or something of that sort. I want to show all my links, all the things I want to do, and all the things I do do, and then just something that screams me, something that tells them, "Okay, this has to be our new intern, like a personality hire at least." Something that reflects that so insanely well. What would be something of that sort? List out a few ideas for that.

**What came out of it:** a shortlist of interactive ideas:
- Explorer's Passport with a secret island
- Voice navigation ("talk to the map")
- Ramble Meter with shareable badges
- Raw voice notes plus Flow transcripts on each island
- "Ask my backpack" agent
- "Drop me a Wispr problem"
- Live "currently exploring" board
- Visitor passport stamps

### Prompt 6 · Wed 4 Nov 2026, 23:23 IST · 🎙️ Wispr Flow

> Is there a prompt log? If not, then create one and push that as well to get a prompt. All the prompts I use are Wispr Flow prompts, so I need documentation of that as well.

**What came out of it:** this file.

---

## Adding new entries

Copy this block to the end of the file for each new prompt:

```markdown
### Prompt N · Day DD Mon YYYY, HH:MM IST · 🎙️ Wispr Flow

> (paste the prompt exactly as Flow wrote it)

**Tool:** Claude / Emergent / …
**What came out of it:** one or two lines.
```

Mark a prompt with 🎙️ Wispr Flow if you dictated it. Leave the mark off if you pasted or typed it, like the repo link in Prompt 4.
