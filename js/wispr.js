/* =========================================================
   The Wispr Line — scroll-driven train track story
   ========================================================= */
(function () {
  "use strict";
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wrap = document.getElementById("trackWrap");
  if (!wrap) return;

  const svg = document.getElementById("trackSvg");
  const P = (id) => document.getElementById(id);
  const mainParts = ["trackBed", "trackSleepers", "trackRails", "trackLead", "trackLit", "maskMainOuter", "maskMainInner"].map(P);
  const spurParts = ["spurBed", "spurSleepers", "spurRails", "maskSpurOuter", "maskSpurInner"].map(P);
  const mask = P("railMask");
  const lead = P("trackLead");
  const lit = P("trackLit");
  const train = P("train");
  const stations = [...wrap.querySelectorAll(".station")];

  let total = 0;
  let stops = []; // { el, len }

  function center(el) {
    const r = el.getBoundingClientRect(), w = wrap.getBoundingClientRect();
    return [r.left + r.width / 2 - w.left, r.top + r.height / 2 - w.top];
  }

  function curve(pts) {
    let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
      const my = (y1 - y0) * 0.5;
      d += ` C${x0.toFixed(1)} ${(y0 + my).toFixed(1)} ${x1.toFixed(1)} ${(y1 - my).toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
    }
    return d;
  }

  function layout() {
    if (!wrap.offsetParent) return; // hidden (island page is open)
    const W = wrap.clientWidth, H = wrap.scrollHeight;
    svg.setAttribute("width", W); svg.setAttribute("height", H);
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    ["x", "y"].forEach((k) => mask.setAttribute(k, 0));
    mask.setAttribute("width", W); mask.setAttribute("height", H);

    const main = [], mainEls = [];
    let spur = null, spurFrom = null;
    stations.forEach((st) => {
      const c = center(st.querySelector(".station-pin"));
      if (st.dataset.spur) { spur = c; spurFrom = main[main.length - 1]; }
      else { main.push(c); mainEls.push(st); }
    });
    if (main.length < 2) return;
    const start = [main[0][0], 0];
    const pts = [start, ...main];
    const d = curve(pts);
    mainParts.forEach((p) => p.setAttribute("d", d));

    if (spur && spurFrom) {
      const sd = `M${spurFrom[0]} ${spurFrom[1]} C${spurFrom[0]} ${spurFrom[1] + 60} ${spur[0]} ${spur[1] - 80} ${spur[0]} ${spur[1]}`;
      spurParts.forEach((p) => p.setAttribute("d", sd));
    }

    total = lead.getTotalLength();
    // distance along the track for each main-line station
    stops = mainEls.map((el, i) => ({ el, len: nearestLen(main[i]) }));
    const spurEl = stations.find((s) => s.dataset.spur);
    if (spurEl) {
      const before = stops.find((s) => s.el === stations[stations.indexOf(spurEl) - 1]);
      if (before) stops.push({ el: spurEl, len: before.len + 1 });
    }
    update();
  }

  function nearestLen([x, y]) {
    let best = 0, bestD = Infinity;
    for (let l = 0; l <= total; l += 6) {
      const p = lead.getPointAtLength(l);
      const d = (p.x - x) ** 2 + (p.y - y) ** 2;
      if (d < bestD) { bestD = d; best = l; }
    }
    return best;
  }

  let ticking = false;
  function update() {
    ticking = false;
    if (!total || !wrap.offsetParent) return;
    const r = wrap.getBoundingClientRect();
    const focusY = window.innerHeight * 0.55 - r.top; // point on the page the train chases
    // find length whose y is closest to focusY (track goes downward)
    let lo = 0, hi = total;
    for (let i = 0; i < 22; i++) {
      const mid = (lo + hi) / 2;
      if (lead.getPointAtLength(mid).y < focusY) lo = mid; else hi = mid;
    }
    const len = Math.max(0, Math.min(total, lo));
    const p = lead.getPointAtLength(len);
    const p2 = lead.getPointAtLength(Math.min(total, len + 4));
    const ang = Math.atan2(p2.y - p.y, p2.x - p.x) * 180 / Math.PI - 90; // 0 when heading straight down
    const tilt = Math.max(-18, Math.min(18, -ang * 0.35));
    train.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -78%) rotate(${tilt}deg)`;
    lit.style.strokeDasharray = `${len} ${total + 20}`;
    stops.forEach((s) => s.el.classList.toggle("is-reached", len >= s.len - 2));
    train.classList.toggle("moving", Math.abs(len - lastLen) > 0.5);
    lastLen = len;
    clearTimeout(idle); idle = setTimeout(() => train.classList.remove("moving"), 180);
  }
  let lastLen = 0, idle = null;
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => requestAnimationFrame(layout));
  window.addEventListener("explorer:home", () => requestAnimationFrame(layout));
  if (document.fonts) document.fonts.ready.then(layout).catch(() => {});
  window.addEventListener("load", layout);
  if ("ResizeObserver" in window) new ResizeObserver(() => requestAnimationFrame(layout)).observe(wrap);
  layout();

  /* ---------- filler-word demo ---------- */
  const btn = document.getElementById("flowBtn");
  const raw = document.getElementById("flowRaw");
  const clean = document.getElementById("flowClean");
  let flowed = false;
  btn.addEventListener("click", async () => {
    if (!flowed) {
      flowed = true;
      btn.disabled = true;
      const fillers = [...raw.querySelectorAll(".filler")];
      for (const f of fillers) { f.classList.add("zap"); await wait(REDUCED ? 0 : 260); }
      await wait(REDUCED ? 0 : 450);
      raw.hidden = true; clean.hidden = false;
      clean.classList.add("appear");
      btn.disabled = false;
      btn.innerHTML = '<span aria-hidden="true">↺</span> Show the ramble again';
      if (window.ExplorerMusic) window.ExplorerMusic.blip();
    } else {
      flowed = false;
      raw.querySelectorAll(".filler").forEach((f) => f.classList.remove("zap"));
      raw.hidden = false; clean.hidden = true; clean.classList.remove("appear");
      btn.innerHTML = '<span aria-hidden="true">✨</span> Run it through Flow';
    }
  });
  function wait(ms) { return new Promise((r) => setTimeout(r, ms)); }
})();
