/* =========================================================
   ✏️  YOUR ISLAND PAGES — edit the words here.
   ---------------------------------------------------------
   Every land on the map has its own page. Each page is built
   from one entry below:

     tagline   one line under the title
     story     paragraphs for the "Field notes" section
     projects  cards for "Treasures found here"
               { title, role, blurb, tags: [], link }  (link is optional)
     skills    chips for "Gear in my backpack"
     funFact   the little stamp at the bottom (optional)
     theme     sky / ground colours for the page banner

   The drafts below come from what I know of your work.
   Rewrite them in your own voice. Plain text only; use
   \n\n inside a story string if you want a line break.
   ========================================================= */
window.LANDS = {
  start: {
    tagline: "Every expedition starts with a map and a very full backpack.",
    theme: { sky: "#9ad8f5", ground: "#8fd162", accent: "#ff8a3d" },
    story: [
      "Hi, I'm Ganga — a third-year B.Tech Computer Science & AI student at Mar Baselios College of Engineering & Technology in Thiruvananthapuram, Kerala.",
      "I've never been able to pick just one field. I code, design, write, anchor stages, run a startup cell and break things in hackathons. This map is how I make sense of all of it: lots of lands, one curious explorer.",
    ],
    projects: [
      { title: "B.Tech, Computer Science & AI", role: "MBCET · 3rd year", blurb: "Where the expedition is based. CGPA 9.33.", tags: ["Academics"] },
      { title: "Google AI Professional Certificate", role: "Certification", blurb: "Foundations in applied AI and responsible use.", tags: ["AI"] },
      { title: "Gemini Certified University Student", role: "Certification", blurb: "Hands-on with Google's Gemini models and tooling.", tags: ["AI"] },
    ],
    skills: ["Curiosity", "Fast learner", "Builder", "Storyteller", "Leader"],
    funFact: "I also compete in shot put and long-distance running.",
  },

  web: {
    tagline: "Where ideas turn into websites people can actually click.",
    theme: { sky: "#ffd9a0", ground: "#b5e08a", accent: "#7b5cd6" },
    story: [
      "I build websites as a freelancer and for the communities I'm part of. I love the whole journey — the first sketch, the stack decisions, and the moment a client opens the live link.",
      "My go-to tools are React and Next.js with Tailwind, backed by Firebase, PostgreSQL or FastAPI depending on what the project needs.",
    ],
    projects: [
      { title: "Poster e-commerce store", role: "Freelance build", blurb: "A full online poster store for a client, with a neomorphic dark and acid-lime design.", tags: ["Next.js", "Prisma", "Neon", "Cloudinary", "Vercel"] },
      { title: "TEDx MBCET website", role: "Designer & developer", blurb: "Designing the event website for TEDx MBCET.", tags: ["Web design", "Events"] },
      { title: "Connstellation", role: "Full-stack project", blurb: "Event networking drawn as a night sky: attendees are stars, and every connection draws a constellation line.", tags: ["React", "MongoDB", "Node"] },
      { title: "This portfolio", role: "Solo build", blurb: "A hand-drawn adventure map in plain HTML, CSS and JavaScript, with an original soundtrack made in code.", tags: ["HTML", "CSS", "JS", "Web Audio"] },
    ],
    skills: ["React", "Next.js", "Tailwind", "Firebase", "PostgreSQL", "FastAPI", "Vercel"],
    funFact: "This whole map is plain HTML, CSS and JS: no framework, no build step.",
  },

  uiux: {
    tagline: "The peaks where wireframes become worlds.",
    theme: { sky: "#f6c9e2", ground: "#c7b6f3", accent: "#e94f8a" },
    story: [
      "I care about how a product feels — the flow, the colour, the type and the small moments that make someone smile without noticing why.",
      "I usually start with the people using it, sketch the flow, then prototype until it feels obvious. As the frontend engineer on my team projects, I also get to turn those designs into real interfaces.",
    ],
    projects: [
      { title: "Pink Slip — “Permission, Paperless.”", role: "Product & UX", blurb: "A campus permission app replacing paper pink slips: six roles, a nurse-initiated medical approval flow and QR gate passes.", tags: ["Expo", "FastAPI", "UX flows"] },
      { title: "StudyLens", role: "Frontend engineer", blurb: "An AI study platform for students, built by a team of six in a Next.js monorepo.", tags: ["Next.js", "TypeScript", "Tailwind"] },
      { title: "Inceptra bootcamp", role: "Experience designer", blurb: "A Greek-mythology-themed startup bootcamp for 110 first-years, with Polybius-square ID card puzzles.", tags: ["Branding", "Gamification"] },
    ],
    skills: ["Figma", "User flows", "Prototyping", "Design systems", "Visual design"],
    funFact: "The explorer character on this site is me, turned into a cartoon.",
  },

  ai: {
    tagline: "A jungle of models, agents and pipelines.",
    theme: { sky: "#b7ecd9", ground: "#6fbf4a", accent: "#1fb8d6" },
    story: [
      "Agentic AI is the field I'm most excited about: systems that can reason, use tools and get real work done alongside people.",
      "I've built multi-agent platforms, agent tools and ML pipelines, and I try hard to design them so humans stay in control of the decisions that matter.",
    ],
    projects: [
      { title: "TRACE", role: "Team Pradhama · SheBuildsTech 3.0", blurb: "An 8-agent LangGraph forensic AI platform that correlates evidence over time. Top 10 at SheBuildsTech 3.0 and taken into KSUM's incubation programme.", tags: ["LangGraph", "Neo4j", "PostgreSQL"] },
      { title: "Agentic investigation tool", role: "Backend · HAC'KP 2026", blurb: "Building tools for a locally run AI assistant for investigators, including a PDF-to-Markdown tool the agent harness reads.", tags: ["Python", "MCP tools", "Agents"] },
      { title: "FIDO", role: "Team of 4", blurb: "A focus companion pet: a rule engine plus a bandit that learns which nudge actually works for you.", tags: ["Raspberry Pi 5", "RL", "Computer vision"] },
      { title: "Lookbook", role: "Solo data-science project", blurb: "A stocking assistant that gives a small fashion boutique trend and stock-mix guidance.", tags: ["Data science", "Python"] },
    ],
    skills: ["LangGraph", "Python", "LLM agents", "MCP tools", "OpenCV", "MediaPipe", "Data science"],
    funFact: "I dictate most of my prompts to AI tools with Wispr Flow.",
  },

  cyber: {
    tagline: "Dark caves full of clues.",
    theme: { sky: "#c9c3e8", ground: "#9b8b7a", accent: "#ffd23f" },
    story: [
      "I enjoy digging into media, metadata and evidence to find what doesn't add up, and building tools that help investigators do it faster and more fairly.",
      "At HAC'KP 2026, Kerala Police Cyberdome's national hackathon, I was one of 50 national winners in the Media Detection & Triage track.",
    ],
    projects: [
      { title: "Media Detection & Triage", role: "Backend · ensemble scoring", blurb: "Built the ensemble scorer that combines several detection signals into a confidence-banded risk score, plus the triage queue endpoint.", tags: ["FastAPI", "Scoring", "Testing"] },
      { title: "Setu", role: "Backend · Smart India Hackathon 2026", blurb: "Portable health records for Kerala's migrant workers, with tamper-evident hash chaining and envelope encryption.", tags: ["Security", "FastAPI", "Encryption"] },
      { title: "SecuPro", role: "AI + security", blurb: "A computer-vision security project.", tags: ["Computer vision"] },
    ],
    skills: ["Digital forensics", "Hashing & integrity", "Auth & RBAC", "Threat thinking", "Testing"],
    funFact: "HAC'KP got me special entry to c0c0n 2026.",
  },

  hack: {
    tagline: "Always about to erupt.",
    theme: { sky: "#ffd0b0", ground: "#c98a5a", accent: "#e5533d" },
    story: [
      "Hackathons are where I learn fastest: big problems, tiny timelines and brilliant teammates. I love the moment a messy idea becomes a working demo at 3 a.m.",
      "I've built for police, health, campus life and more, and every hackathon adds something new to my backpack.",
    ],
    projects: [
      { title: "HAC'KP 2026", role: "National winner (top 50)", blurb: "Kerala Police Cyberdome's national hackathon, Track 2 — Media Detection & Triage.", tags: ["Cybersecurity", "AI"] },
      { title: "SheBuildsTech 3.0", role: "Top 10 · KSUM incubation", blurb: "Built TRACE in a 20-hour final and moved into a 2-month incubation programme.", tags: ["Agentic AI"] },
      { title: "Smart India Hackathon 2026", role: "Team Vault · backend", blurb: "Built Setu, from architecture to pitch, in an 8-hour sprint.", tags: ["HealthTech"] },
      { title: "Agentic AI Hackathon", role: "Product Space", blurb: "Where I first picked up Wispr Flow. The full story is further down the home page.", tags: ["Agents", "Wispr Flow"] },
    ],
    skills: ["Rapid prototyping", "Pitching", "Team leadership", "Shipping under pressure"],
    funFact: "Two of my 2026 hackathon projects kept going after the event: TRACE and the HAC'KP investigation tools.",
  },

  robotics: {
    tagline: "Where code gets a body.",
    theme: { sky: "#cde7f7", ground: "#8fc46a", accent: "#ffb02e" },
    story: [
      "I like building things that move, react and keep you company: hardware that makes AI feel physical and friendly.",
      "From Raspberry Pi builds to hand-tracking experiments, I enjoy the mix of sensors, code and a little bit of magic.",
    ],
    projects: [
      { title: "FIDO — Focus-Inducing Distraction Observer", role: "Team of 4 · one week · zero budget", blurb: "A desktop pet on a Raspberry Pi 5 that notices when you drift and nudges you back to work.", tags: ["Raspberry Pi 5", "Servo", "Camera"] },
      { title: "SkyMind", role: "Concept", blurb: "An AI-controlled drone concept.", tags: ["Drones", "AI"] },
      { title: "Creative CV experiments", role: "Personal", blurb: "Face mesh, hand tracking and particle physics with OpenCV and MediaPipe.", tags: ["OpenCV", "MediaPipe"] },
    ],
    skills: ["Raspberry Pi", "Sensors", "OpenCV", "MediaPipe", "Embedded Python"],
    funFact: "FIDO was built in one week with zero budget.",
  },

  music: {
    tagline: "A calm lagoon that's never quiet.",
    theme: { sky: "#bfe9f5", ground: "#6cc6e0", accent: "#7b5cd6" },
    story: [
      "Music is how I recharge, and it keeps sneaking into my projects.",
      "I'm especially interested in how technology can help people learn music by spotting where they struggle, not just whether they're in tune.",
    ],
    projects: [
      { title: "TAALIM", role: "ML project · team of 4", blurb: "Tonal Analysis and Adaptive Learning for Instrumental Musicians: finding exactly where a student struggles during practice.", tags: ["Audio ML", "Python"] },
      { title: "This site's soundtrack", role: "Composer & coder", blurb: "An original adventure tune generated live in the browser with the Web Audio API.", tags: ["Web Audio", "JavaScript"] },
      { title: "Audio synthesis experiments", role: "Creative coding", blurb: "Turning movement and gestures into sound.", tags: ["MediaPipe", "Synthesis"] },
    ],
    skills: ["Audio ML", "Web Audio", "Synthesis", "A good ear"],
    funFact: "Press the music button in the corner. I wrote that tune in code.",
  },

  writing: {
    tagline: "A river of ink that flows through everything I do.",
    theme: { sky: "#cfe6f7", ground: "#7fc6e4", accent: "#2b3a55" },
    story: [
      "Writing is how I think. Papers, scripts, speeches, docs: I like taking something complicated and making it feel simple.",
      "I presented a paper at the Think Kerala Youth Conclave, and I write most of the scripts and speeches for the events I'm part of.",
    ],
    projects: [
      { title: "Think Kerala Youth Conclave", role: "Paper presenter", blurb: "Presented a paper at the conclave.", tags: ["Research", "Policy"] },
      { title: "Event scripts", role: "Scriptwriter", blurb: "Full anchoring scripts, including a 33-performance Onam show with paired Manglish and English lines.", tags: ["Scripts", "Bilingual"] },
      { title: "Speeches & community comms", role: "Writer", blurb: "Speeches and Discord announcements for campus talks with industry partners.", tags: ["Comms"] },
    ],
    skills: ["Technical writing", "Scriptwriting", "Speeches", "Research papers", "Malayalam & English"],
    funFact: "Most of my first drafts are spoken, not typed.",
  },

  anchor: {
    tagline: "Lights up, mic on.",
    theme: { sky: "#3b2a5c", ground: "#a0623a", accent: "#ffd23f", dark: true },
    story: [
      "I anchor college events, and I love keeping a room full of people with me: the timing, the jokes, the quick saves when something goes off-script.",
      "Being on stage taught me to think on my feet and to say exactly what I mean in very few words.",
    ],
    projects: [
      { title: "Onam celebrations", role: "Anchor & scriptwriter", blurb: "A two-anchor show with 33 performances.", tags: ["Stage", "Bilingual"] },
      { title: "HASH, Offroads/AutoShow, Crossroads '26", role: "Anchor", blurb: "Hosting the college's biggest events.", tags: ["Live events"] },
      { title: "Seminars & sessions", role: "Speaker", blurb: "Including a JavaScript/jQuery seminar for students.", tags: ["Teaching"] },
    ],
    skills: ["Public speaking", "Hosting", "Improvisation", "Audience energy"],
    funFact: "My Onam script had paired Manglish and English lines for two anchors.",
  },

  startup: {
    tagline: "A lighthouse that guides new founders home.",
    theme: { sky: "#a9dadb", ground: "#9b8b7a", accent: "#e5533d" },
    story: [
      "I'm the CEO of Catalyst IEDC, my college's entrepreneurship cell, and part of Think Kerala's startup ecosystem team.",
      "Through SALT, I guide students from more than 20 Kerala schools through their first startup steps. Helping someone ship their first idea is one of my favourite feelings.",
    ],
    projects: [
      { title: "Catalyst IEDC", role: "CEO", blurb: "Leading the college entrepreneurship cell, its events and its founders.", tags: ["Leadership"] },
      { title: "SALT mentoring", role: "Mentor", blurb: "Guiding students from 20+ Kerala schools through their first startup journey.", tags: ["Mentoring"] },
      { title: "Inceptra", role: "Organiser", blurb: "A two-day startup bootcamp for 110 first-years.", tags: ["Events", "Bootcamp"] },
      { title: "SheFi Scholar", role: "Scholar", blurb: "Part of the SheFi scholar community.", tags: ["Community"] },
    ],
    skills: ["Leadership", "Community building", "Mentoring", "Event strategy", "Pitching"],
    funFact: "TRACE is heading into incubation, so I may be a founder myself soon.",
  },

  treasure: {
    tagline: "X marks the spot.",
    theme: { sky: "#ffe9a8", ground: "#e8cf95", accent: "#e5533d" },
    story: [
      "The treasure isn't gold. It's the next team, problem or opportunity I get to explore.",
      "I'm happiest where AI meets real people and real habits, which is exactly why Wispr Flow caught my attention. Scroll down on the home page to read how that happened.",
    ],
    projects: [
      { title: "Open to internships", role: "2026–27", blurb: "Product, growth, AI engineering or anything that mixes them.", tags: ["Opportunities"] },
      { title: "Let's build something", role: "Collaborations", blurb: "Hackathon teammates, startup ideas, websites. Say hi!", tags: ["Collab"] },
    ],
    skills: ["Ready to explore"],
    funFact: "My backpack always has room for one more adventure.",
  },
};
