/* =========================================================
   Ganga B Nair · The Explorer's Portfolio — interactions
   ========================================================= */
(function () {
  "use strict";

  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const music = window.ExplorerMusic;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } },
  };

  /* -------------------------------------------------------
     The lands. x/y = landmark base on the 1200×780 map,
     wx/wy = where the explorer stands on the trail.
     The words for each land live in js/lands.js.
     ------------------------------------------------------- */
  const STOPS = [
    {
      id: "start", name: "Base Camp", domain: "Thiruvananthapuram, Kerala",
      acc: "acc-compass", gear: "a trusty compass", face: "face-happy",
      x: 70, y: 690, wx: 140, wy: 712,
    },
    {
      id: "web", name: "Webweaver Village", domain: "Freelance Web Development",
      acc: "acc-laptop", gear: "my coding laptop", face: "face-happy",
      x: 290, y: 612, wx: 202, wy: 640,
    },
    {
      id: "uiux", name: "Pixel Peaks", domain: "UI / UX Design",
      acc: "acc-palette", gear: "palette & brush", face: "face-think",
      x: 520, y: 652, wx: 418, wy: 676,
    },
    {
      id: "ai", name: "Neural Jungle", domain: "AI & Agentic AI",
      acc: "acc-bot", gear: "a bot buddy", face: "face-think",
      x: 770, y: 634, wx: 660, wy: 664,
    },
    {
      id: "cyber", name: "Cipher Caves", domain: "Cybersecurity",
      acc: "acc-magnifier", gear: "a magnifying glass", face: "face-think",
      x: 1000, y: 664, wx: 898, wy: 692,
    },
    {
      id: "hack", name: "Hackathon Volcano", domain: "Hackathons",
      acc: "acc-trophy", gear: "a shiny trophy", face: "face-wow",
      x: 1040, y: 492, wx: 1118, wy: 560,
    },
    {
      id: "robotics", name: "Gearworks Ridge", domain: "Robotics & Hardware",
      acc: "acc-gear", gear: "wrench & gear", face: "face-laugh",
      x: 810, y: 462, wx: 912, wy: 490,
    },
    {
      id: "music", name: "Melody Lagoon", domain: "Music",
      acc: "acc-headphones", gear: "headphones", face: "face-laugh",
      x: 590, y: 456, wx: 684, wy: 478,
    },
    {
      id: "writing", name: "Ink River", domain: "Writing",
      acc: "acc-notebook", gear: "my notebook", face: "face-happy",
      x: 300, y: 448, wx: 404, wy: 470,
    },
    {
      id: "anchor", name: "Spotlight Stage", domain: "Anchoring & Public Speaking",
      acc: "acc-mic", gear: "a microphone", face: "face-laugh",
      x: 170, y: 262, wx: 88, wy: 346,
    },
    {
      id: "startup", name: "Launchpad Lighthouse", domain: "Startups & Entrepreneurship",
      acc: "acc-rocket", gear: "a rocket", face: "face-wow",
      x: 640, y: 206, wx: 526, wy: 236,
    },
    {
      id: "treasure", name: "The Next Adventure", domain: "Opportunities ahead",
      acc: "acc-chest", gear: "an empty spot in my backpack", face: "face-wow",
      x: 930, y: 262, wx: 828, wy: 282,
    },
  ];
  const LANDS = window.LANDS || {};
  STOPS.forEach((s) => { s.content = LANDS[s.id] || { tagline: "", story: [], projects: [], skills: [] }; });
  const byId = Object.fromEntries(STOPS.map((s, i) => [s.id, { ...s, index: i }]));
  const DOMAIN_COUNT = STOPS.length - 2; // minus base camp & treasure

  /* =======================================================
     LOADER
     ======================================================= */
  const loader = document.getElementById("loader");
  const statusEl = loader.querySelector(".loader-status");
  const gearList = loader.querySelector(".loader-gear");
  const actions = loader.querySelector(".loader-actions");
  const pctEl = document.getElementById("loaderPct");
  const clipRect = document.getElementById("trailClipRect");
  const trailBase = document.getElementById("loaderTrailBase");
  const dot = document.getElementById("loaderDot");

  const PACKING = [
    ["acc-laptop", "Packing the laptop…"],
    ["acc-palette", "Mixing the paint palette…"],
    ["acc-bot", "Charging the bot buddy…"],
    ["acc-magnifier", "Polishing the magnifying glass…"],
    ["acc-trophy", "Dusting off the trophy…"],
    ["acc-gear", "Tightening the gears…"],
    ["acc-headphones", "Untangling the headphones…"],
    ["acc-notebook", "Sharpening pencils…"],
    ["acc-mic", "Tuning the mic… one, two!"],
    ["acc-rocket", "Fuelling the rocket…"],
  ];
  PACKING.forEach(([id]) => {
    const li = document.createElement("li");
    li.innerHTML = `<svg viewBox="0 0 64 64"><use href="#${id}"/></svg>`;
    gearList.appendChild(li);
  });

  function setProgress(p) {
    const len = trailBase.getTotalLength();
    const pt = trailBase.getPointAtLength(len * p);
    dot.setAttribute("cx", pt.x); dot.setAttribute("cy", pt.y);
    clipRect.setAttribute("width", 400 * p);
    pctEl.textContent = Math.round(p * 100);
  }

  const assetsReady = Promise.all([
    ...["explorer-wave", "face-happy", "face-think", "face-laugh", "face-wow"].map((n) =>
      new Promise((res) => { const i = new Image(); i.onload = i.onerror = res; i.src = `assets/img/${n}.webp`; })),
    document.fonts ? document.fonts.ready.catch(() => {}) : Promise.resolve(),
  ]);

  (async function runLoader() {
    const items = gearList.children;
    const perItem = REDUCED ? 60 : 320;
    for (let i = 0; i < PACKING.length; i++) {
      statusEl.textContent = PACKING[i][1];
      items[i].classList.add("packed");
      setProgress((i + 1) / (PACKING.length + 1));
      await wait(perItem);
    }
    statusEl.textContent = "Checking the map one last time…";
    await assetsReady;
    setProgress(1);
    await wait(REDUCED ? 0 : 350);
    statusEl.textContent = "All packed! Ready to explore?";
    loader.querySelector(".loader-title").textContent = "Backpack's ready!";
    actions.hidden = false;
    document.getElementById("startBtn").focus({ preventScroll: true });
  })();

  function enterSite(withMusic) {
    loader.classList.add("is-done");
    document.body.classList.remove("is-loading");
    document.body.classList.add("is-ready");
    if (withMusic) setMusic(true);
    setTimeout(() => loader.remove(), 800);
  }
  document.getElementById("startBtn").addEventListener("click", () => enterSite(true));
  document.getElementById("quietBtn").addEventListener("click", () => enterSite(false));

  /* =======================================================
     MUSIC TOGGLE
     ======================================================= */
  const musicBtn = document.getElementById("musicBtn");
  async function setMusic(on) {
    if (on) on = await music.start();
    else music.stop();
    musicBtn.setAttribute("aria-pressed", String(on));
    musicBtn.setAttribute("aria-label", on ? "Turn music off" : "Turn music on");
    musicBtn.querySelector(".music-label").textContent = on ? "Music on" : "Music off";
    store.set("explorer-music", on ? "on" : "off");
  }
  musicBtn.addEventListener("click", () => setMusic(!music.playing));

  /* =======================================================
     MAP
     ======================================================= */
  const SVGNS = "http://www.w3.org/2000/svg";
  const trail = document.getElementById("trail");
  const trailDone = document.getElementById("trailDone");
  const trailMask = document.getElementById("trailMaskPath");
  const avatar = document.getElementById("avatar");
  const avatarAcc = document.getElementById("avatarAcc");
  const avatarAccUse = document.getElementById("avatarAccUse");

  // 1. Smooth trail through every waypoint (Catmull-Rom → Bézier)
  function smoothPath(pts) {
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      const t = 0.5 / 3 * 2;
      const c1 = [p1[0] + (p2[0] - p0[0]) * t / 2, p1[1] + (p2[1] - p0[1]) * t / 2];
      const c2 = [p2[0] - (p3[0] - p1[0]) * t / 2, p2[1] - (p3[1] - p1[1]) * t / 2];
      d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0]} ${p2[1]}`;
    }
    return d;
  }
  const d = smoothPath(STOPS.map((s) => [s.wx, s.wy]));
  [trail, trailDone, trailMask].forEach((p) => p.setAttribute("d", d));
  const TOTAL = trail.getTotalLength();

  // 2. Find each stop's distance along the trail
  (function measure() {
    const samples = [];
    for (let l = 0; l <= TOTAL; l += 2) { const p = trail.getPointAtLength(l); samples.push([l, p.x, p.y]); }
    let from = 0;
    STOPS.forEach((s) => {
      let best = from, bestD = Infinity;
      for (let i = 0; i < samples.length; i++) {
        const [l, x, y] = samples[i];
        if (l < from - 1) continue;
        const dd = (x - s.wx) ** 2 + (y - s.wy) ** 2;
        if (dd < bestD) { bestD = dd; best = l; }
      }
      byId[s.id].len = best; s.len = best; from = best;
    });
  })();

  // 3. Position landmarks, add labels + halo, make them buttons
  const landmarkEls = {};
  document.querySelectorAll("#landmarks .lm").forEach((g) => {
    const s = byId[g.dataset.stop];
    if (!s) return;
    g.setAttribute("transform", `translate(${s.x} ${s.y})`);
    const art = document.createElementNS(SVGNS, "g");
    art.setAttribute("class", "lm-art");
    while (g.firstChild) art.appendChild(g.firstChild);
    const ring = document.createElementNS(SVGNS, "ellipse");
    ring.setAttribute("class", "ring"); ring.setAttribute("rx", 70); ring.setAttribute("ry", 14);
    g.appendChild(ring); g.appendChild(art);

    const label = document.createElementNS(SVGNS, "g");
    label.setAttribute("class", "lm-label");
    const rect = document.createElementNS(SVGNS, "rect");
    const text = document.createElementNS(SVGNS, "text");
    text.setAttribute("text-anchor", "middle"); text.setAttribute("y", 32);
    text.textContent = s.name;
    label.appendChild(rect); label.appendChild(text); g.appendChild(label);

    g.setAttribute("tabindex", "0");
    g.setAttribute("role", "button");
    g.setAttribute("aria-label", `${s.name}: ${s.domain}. Opens this land's page`);
    g.addEventListener("click", () => { stopTour(); goTo(s.id, { open: true }); });
    g.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); stopTour(); goTo(s.id, { open: true }); }
    });
    landmarkEls[s.id] = g;
  });
  function sizeLabels() {
    if (home && home.hidden) return; // can't measure text while the map is hidden
    Object.values(landmarkEls).forEach((g) => {
      const t = g.querySelector(".lm-label text"), r = g.querySelector(".lm-label rect");
      let w = 0;
      try { w = t.getComputedTextLength(); } catch (e) { w = 0; }
      if (!w) w = t.textContent.length * 9.5;
      r.setAttribute("x", -w / 2 - 12); r.setAttribute("y", 12);
      r.setAttribute("width", w + 24); r.setAttribute("height", 28); r.setAttribute("rx", 10);
    });
  }
  const home = document.getElementById("home");
  sizeLabels();
  if (document.fonts) document.fonts.ready.then(sizeLabels).catch(() => {});
  window.addEventListener("explorer:home", sizeLabels);

  // 4. Legend
  const legendList = document.getElementById("legendList");
  const legendBtns = {};
  STOPS.forEach((s) => {
    const li = document.createElement("li");
    const b = document.createElement("button");
    b.type = "button";
    b.innerHTML = `<svg viewBox="0 0 64 64" aria-hidden="true"><use href="#${s.acc}"/></svg><span>${s.domain === "Thiruvananthapuram, Kerala" ? "Base Camp" : s.id === "treasure" ? "Next Adventure" : s.domain}</span>`;
    b.addEventListener("click", () => {
      stopTour(); goTo(s.id);
      document.querySelector(".map-frame").scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "center" });
    });
    li.appendChild(b); legendList.appendChild(li); legendBtns[s.id] = b;
  });

  // 5. Explorer movement
  let currentLen = 0, currentId = "start", walkRAF = null, walkResolve = null;

  const scroller = document.querySelector(".map-scroll");
  const worldMap = document.getElementById("worldMap");
  function follow(x) {
    if (scroller.scrollWidth <= scroller.clientWidth + 4) return;
    const scale = worldMap.clientWidth / 1200;
    scroller.scrollLeft = x * scale - scroller.clientWidth / 2;
  }
  function placeAt(len) {
    const p = trail.getPointAtLength(len);
    follow(p.x);
    avatar.setAttribute("transform", `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`);
    trailMask.setAttribute("stroke-dasharray", `${len} ${TOTAL + 10}`);
  }

  function walkTo(target) {
    cancelAnimationFrame(walkRAF);
    if (walkResolve) { walkResolve(false); walkResolve = null; }
    return new Promise((resolve) => {
      const start = currentLen, dist = Math.abs(target - start);
      if (REDUCED || dist < 1) { currentLen = target; placeAt(target); resolve(true); return; }
      const dur = Math.min(2600, Math.max(650, dist * 2.1));
      const t0 = performance.now();
      walkResolve = resolve;
      avatar.classList.add("walking");
      const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
      (function frame(now) {
        const t = Math.min(1, (now - t0) / dur);
        currentLen = start + (target - start) * ease(t);
        placeAt(currentLen);
        if (t < 1) walkRAF = requestAnimationFrame(frame);
        else { avatar.classList.remove("walking"); walkResolve = null; resolve(true); }
      })(t0);
    });
  }

  const J = {
    root: document.querySelector(".journal"),
    face: document.getElementById("jFace"),
    accWrap: document.querySelector(".journal-acc"),
    acc: document.getElementById("jAccUse"),
    kicker: document.getElementById("jKicker"),
    gear: document.getElementById("jGear"),
    title: document.getElementById("jTitle"),
    domain: document.getElementById("jDomain"),
    blurb: document.getElementById("jBlurb"),
    list: document.getElementById("jList"),
    explore: document.getElementById("exploreBtn"),
    prev: document.getElementById("prevBtn"),
    next: document.getElementById("nextBtn"),
  };

  function renderJournal(s) {
    J.face.src = `assets/img/${s.face}.webp`;
    J.acc.setAttribute("href", `#${s.acc}`);
    J.kicker.textContent = s.id === "start" ? "Base camp" : s.id === "treasure" ? "X marks the spot" : `Land ${s.index} of ${DOMAIN_COUNT}`;
    J.gear.textContent = `Gear: ${s.gear}`;
    J.title.textContent = s.name;
    J.domain.textContent = s.domain;
    J.blurb.textContent = s.content.tagline + (s.content.story[0] ? " " + s.content.story[0] : "");
    J.list.innerHTML = "";
    (s.content.projects || []).slice(0, 3).forEach((p) => { const li = document.createElement("li"); li.textContent = p.title; J.list.appendChild(li); });
    J.explore.href = `#land-${s.id}`;
    J.explore.innerHTML = `Explore ${s.name} <span aria-hidden="true">→</span>`;
    J.prev.disabled = s.index === 0;
    J.next.innerHTML = s.index === STOPS.length - 1 ? 'Back to camp <span aria-hidden="true">↺</span>' : 'Next stop <span aria-hidden="true">→</span>';
    restartAnim(J.root, "swap");
    restartAnim(J.accWrap, "pop");
  }

  function setActive(id) {
    Object.entries(landmarkEls).forEach(([k, g]) => g.classList.toggle("is-active", k === id));
    Object.entries(legendBtns).forEach(([k, b]) => b.setAttribute("aria-current", String(k === id)));
  }

  async function goTo(id, opts = {}) {
    const s = byId[id];
    if (!s) return;
    currentId = id;
    setActive(id);
    const arrived = await walkTo(s.len);
    if (!arrived) return;
    arriveAt(s);
    music.blip();
    if (opts.open) { await wait(REDUCED ? 0 : 450); location.hash = `land-${id}`; }
  }
  function arriveAt(s) {
    avatarAccUse.setAttribute("href", `#${s.acc}`);
    restartAnim(avatarAcc, "pop");
    renderJournal(s);
  }
  /* jump straight to a land without walking (used when coming back from a page) */
  function teleport(id) {
    const s = byId[id];
    if (!s) return;
    currentId = id; currentLen = s.len;
    placeAt(s.len); setActive(id); arriveAt(s);
  }

  J.next.addEventListener("click", () => {
    stopTour();
    const i = byId[currentId].index;
    goTo(STOPS[(i + 1) % STOPS.length].id);
  });
  J.prev.addEventListener("click", () => {
    stopTour();
    const i = byId[currentId].index;
    if (i > 0) goTo(STOPS[i - 1].id);
  });
  document.getElementById("resetBtn").addEventListener("click", () => { stopTour(); goTo("start"); });

  // 6. Guided tour
  const tourBtn = document.getElementById("tourBtn");
  let touring = false;
  async function runTour() {
    touring = true;
    tourBtn.innerHTML = '<span aria-hidden="true">■</span> Stop the tour';
    let i = byId[currentId].index;
    if (i >= STOPS.length - 1) i = -1;
    for (let k = i + 1; k < STOPS.length && touring; k++) {
      await goTo(STOPS[k].id);
      if (!touring) break;
      await wait(2200);
    }
    stopTour();
  }
  function stopTour() {
    touring = false;
    tourBtn.innerHTML = '<span aria-hidden="true">▶</span> Take the guided tour';
  }
  tourBtn.addEventListener("click", () => (touring ? stopTour() : runTour()));

  // initial state
  placeAt(0);
  renderJournal(byId.start);
  setActive("start");

  /* =======================================================
     ISLAND PAGES + ROUTER  (#land-<id>, #map, #wispr, #top)
     ======================================================= */
  const landView = document.getElementById("landView");
  const iris = document.getElementById("iris");
  const LV = {
    crumb: document.getElementById("lvCrumb"),
    kicker: document.getElementById("lvKicker"),
    title: document.getElementById("lvTitle"),
    domain: document.getElementById("lvDomain"),
    tagline: document.getElementById("lvTagline"),
    art: document.getElementById("lvArt"),
    speech: document.getElementById("lvSpeech"),
    explorer: document.getElementById("lvExplorer"),
    acc: document.getElementById("lvAcc"),
    story: document.getElementById("lvStory"),
    projects: document.getElementById("lvProjects"),
    skills: document.getElementById("lvSkills"),
    fun: document.getElementById("lvFun"),
    prev: document.getElementById("lvPrev"),
    next: document.getElementById("lvNext"),
  };
  let view = "home";
  let lastLand = null;

  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function renderLand(s) {
    const c = s.content;
    const t = c.theme || {};
    landView.style.setProperty("--land-sky", t.sky || "#9ad8f5");
    landView.style.setProperty("--land-ground", t.ground || "#8fd162");
    landView.style.setProperty("--land-accent", t.accent || "#ff8a3d");
    landView.classList.toggle("is-dark", !!t.dark);
    landView.dataset.land = s.id;

    LV.crumb.textContent = s.name;
    LV.kicker.textContent = s.id === "start" ? "Base camp" : s.id === "treasure" ? "X marks the spot" : `Land ${s.index} of ${DOMAIN_COUNT}`;
    LV.title.textContent = s.name;
    LV.domain.textContent = s.domain;
    LV.tagline.textContent = c.tagline || "";
    LV.speech.textContent = `Gear: ${s.gear}!`;
    LV.acc.setAttribute("href", `#${s.acc}`);
    document.title = `${s.name} · Ganga B Nair`;

    // big version of this land's landmark, cloned from the map
    LV.art.innerHTML = "";
    const src = document.querySelector(`#landmarks .lm[data-stop="${s.id}"] .lm-art`);
    if (src) {
      const g = src.cloneNode(true);
      g.removeAttribute("class");
      LV.art.appendChild(g);
      try {
        const b = g.getBBox();
        const pad = 14;
        LV.art.setAttribute("viewBox", `${b.x - pad} ${b.y - pad} ${b.width + pad * 2} ${b.height + pad * 2}`);
      } catch (e) { LV.art.setAttribute("viewBox", "-120 -170 240 190"); }
    }

    LV.story.innerHTML = "";
    (c.story || []).forEach((para) => LV.story.appendChild(el("p", null, para)));

    LV.projects.innerHTML = "";
    (c.projects || []).forEach((p, i) => {
      const card = el(p.link ? "a" : "article", "treasure-card");
      if (p.link) { card.href = p.link; card.target = "_blank"; card.rel = "noopener"; }
      card.style.setProperty("--tilt", `${(i % 2 ? 1 : -1) * (0.6 + (i % 3) * 0.4)}deg`);
      card.appendChild(el("h3", null, p.title));
      if (p.role) card.appendChild(el("p", "treasure-role", p.role));
      if (p.blurb) card.appendChild(el("p", "treasure-blurb", p.blurb));
      if (p.tags && p.tags.length) {
        const ul = el("ul", "treasure-tags");
        p.tags.forEach((tg) => ul.appendChild(el("li", null, tg)));
        card.appendChild(ul);
      }
      if (p.link) card.appendChild(el("span", "treasure-link", "Open ↗"));
      LV.projects.appendChild(card);
    });

    LV.skills.innerHTML = "";
    (c.skills || []).forEach((k) => LV.skills.appendChild(el("li", null, k)));

    LV.fun.hidden = !c.funFact;
    LV.fun.textContent = c.funFact ? `Fun fact: ${c.funFact}` : "";

    const prev = STOPS[(s.index - 1 + STOPS.length) % STOPS.length];
    const next = STOPS[(s.index + 1) % STOPS.length];
    LV.prev.href = `#land-${prev.id}`; LV.prev.querySelector(".lbl").textContent = prev.name;
    LV.next.href = `#land-${next.id}`; LV.next.querySelector(".lbl").textContent = next.name;
  }

  function irisSwap(fn) {
    if (REDUCED || !document.body.classList.contains("is-ready")) { fn(); return Promise.resolve(); }
    return new Promise((resolve) => {
      iris.classList.remove("open"); iris.classList.add("closing");
      setTimeout(() => {
        fn();
        iris.classList.remove("closing"); iris.classList.add("open");
        setTimeout(() => { iris.classList.remove("open"); resolve(); }, 520);
      }, 480);
    });
  }

  function showLand(id) {
    const s = byId[id];
    irisSwap(() => {
      home.hidden = true;
      landView.hidden = false;
      renderLand(s);
      teleport(id);
      lastLand = id;
      view = "land";
      window.scrollTo(0, 0);
      const h = LV.title; h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true });
    });
  }

  function showHome(anchor) {
    const wasLand = view === "land";
    const go = () => {
      landView.hidden = true;
      home.hidden = false;
      view = "home";
      document.title = "Ganga B Nair · The Explorer's Portfolio";
      window.dispatchEvent(new Event("explorer:home"));
      const target = anchor ? document.getElementById(anchor) : null;
      if (wasLand && anchor === "map" && lastLand) {
        teleport(lastLand);
        const frame = document.querySelector(".map-frame");
        frame.scrollIntoView({ block: "center" });
        const lm = landmarkEls[lastLand];
        if (lm) lm.focus({ preventScroll: true });
      } else if (target) {
        target.scrollIntoView({ behavior: wasLand || REDUCED ? "auto" : "smooth" });
      } else if (wasLand) {
        window.scrollTo(0, 0);
      }
    };
    if (wasLand) irisSwap(go); else go();
  }

  function route() {
    const h = decodeURIComponent(location.hash.slice(1));
    if (h.startsWith("land-") && byId[h.slice(5)]) showLand(h.slice(5));
    else showHome(h);
  }
  window.addEventListener("hashchange", route);
  if (location.hash) route();

  window.Explorer = { STOPS, byId, music, REDUCED };

  /* =======================================================
     Small helpers
     ======================================================= */
  function wait(ms) { return new Promise((r) => setTimeout(r, ms)); }
  function restartAnim(el, cls) { el.classList.remove(cls); void el.getBoundingClientRect(); el.classList.add(cls); }
})();
