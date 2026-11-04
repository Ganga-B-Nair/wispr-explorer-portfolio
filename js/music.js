/* =========================================================
   Original adventure theme, synthesised live with Web Audio.
   No audio files, no copyrighted music: an upbeat marimba +
   whistle tune over a bouncy bass and light percussion.
   ========================================================= */
(function () {
  const BPM = 128;
  const STEP = 60 / BPM / 2; // eighth notes
  const LOOKAHEAD = 0.12;

  // note name -> frequency
  const NOTES = {};
  const names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  for (let o = 1; o <= 7; o++) names.forEach((n, i) => { NOTES[n + o] = 440 * Math.pow(2, (i - 9 + (o - 4) * 12) / 12); });

  // Melody: [note | null, length in eighths] — 8 bars of 8 eighths
  const MELODY = [
    ["E5",1],["G5",1],["C6",2],["B5",1],["G5",1],["E5",2],
    ["D5",1],["G5",1],["B5",2],["A5",1],["G5",1],["D5",2],
    ["C5",1],["E5",1],["A5",2],["G5",1],["E5",1],["C5",1],["E5",1],
    ["F5",2],["A5",1],["C6",1],["A5",2],["G5",2],
    ["E5",1],["G5",1],["C6",1],["E6",1],["D6",2],["C6",2],
    ["B5",1],["D6",1],["B5",1],["G5",1],["A5",2],["B5",2],
    ["C6",1],["A5",1],["F5",1],["A5",1],["G5",1],["F5",1],["E5",1],["D5",1],
    ["G5",2],["D5",1],["F5",1],["E5",2],[null,2],
  ];
  // chord per bar: root (bass) + triad (marimba off-beats)
  const CHORDS = [
    { root: "C3", fifth: "G3", triad: ["C4","E4","G4"] },
    { root: "G2", fifth: "D3", triad: ["B3","D4","G4"] },
    { root: "A2", fifth: "E3", triad: ["A3","C4","E4"] },
    { root: "F2", fifth: "C3", triad: ["A3","C4","F4"] },
    { root: "C3", fifth: "G3", triad: ["C4","E4","G4"] },
    { root: "G2", fifth: "D3", triad: ["B3","D4","G4"] },
    { root: "F2", fifth: "C3", triad: ["A3","C4","F4"] },
    { root: "G2", fifth: "D3", triad: ["B3","D4","G4"] },
  ];

  // expand melody into a 64-step lookup
  const melodySteps = new Array(64).fill(null);
  let pos = 0;
  MELODY.forEach(([n, len]) => { if (n) melodySteps[pos] = { n, len }; pos += len; });

  let ctx = null, master = null, noiseBuf = null, timer = null;
  let step = 0, nextTime = 0, playing = false;

  function init() {
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18; comp.ratio.value = 4;
    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(comp); comp.connect(ctx.destination);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }

  function env(g, t, peak, attack, decay) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  }

  function marimba(freq, t, vel = 0.25, decay = 0.4) {
    const g = ctx.createGain(); g.connect(master);
    const o1 = ctx.createOscillator(); o1.type = "sine"; o1.frequency.value = freq;
    const o2 = ctx.createOscillator(); o2.type = "sine"; o2.frequency.value = freq * 4;
    const g2 = ctx.createGain(); g2.gain.value = 0.12;
    o1.connect(g); o2.connect(g2); g2.connect(g);
    env(g, t, vel, 0.005, decay);
    o1.start(t); o2.start(t); o1.stop(t + decay + 0.05); o2.stop(t + decay + 0.05);
  }

  function whistle(freq, t, dur) {
    const g = ctx.createGain(); g.connect(master);
    const o = ctx.createOscillator(); o.type = "triangle"; o.frequency.value = freq;
    const lfo = ctx.createOscillator(); lfo.frequency.value = 5.5;
    const lfoG = ctx.createGain(); lfoG.gain.value = freq * 0.006;
    lfo.connect(lfoG); lfoG.connect(o.frequency);
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 2600;
    o.connect(lp); lp.connect(g);
    const end = t + Math.max(dur * 0.92, 0.08);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.16, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.09, t + Math.min(0.12, dur * 0.6));
    g.gain.exponentialRampToValueAtTime(0.0001, end);
    o.start(t); lfo.start(t); o.stop(end + 0.02); lfo.stop(end + 0.02);
    marimba(freq, t, 0.1, 0.25); // a little pluck on the front of each note
  }

  function bass(freq, t) {
    const g = ctx.createGain(); g.connect(master);
    const o = ctx.createOscillator(); o.type = "triangle"; o.frequency.value = freq;
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 600;
    o.connect(lp); lp.connect(g);
    env(g, t, 0.38, 0.01, STEP * 1.7);
    o.start(t); o.stop(t + STEP * 2);
  }

  function noise(t, hp, peak, decay) {
    const s = ctx.createBufferSource(); s.buffer = noiseBuf;
    const f = ctx.createBiquadFilter(); f.type = "highpass"; f.frequency.value = hp;
    const g = ctx.createGain();
    s.connect(f); f.connect(g); g.connect(master);
    env(g, t, peak, 0.002, decay);
    s.start(t); s.stop(t + decay + 0.05);
  }

  function kick(t) {
    const g = ctx.createGain(); g.connect(master);
    const o = ctx.createOscillator(); o.type = "sine";
    o.frequency.setValueAtTime(140, t);
    o.frequency.exponentialRampToValueAtTime(45, t + 0.14);
    env(g, t, 0.55, 0.003, 0.18);
    o.start(t); o.stop(t + 0.22);
  }

  function schedule(s, t) {
    const bar = Math.floor(s / 8) % 8;
    const beat = s % 8;
    const chord = CHORDS[bar];
    const m = melodySteps[s % 64];
    if (m) whistle(NOTES[m.n], t, m.len * STEP);
    // bass: root / fifth / octave / fifth on quarter notes
    if (beat % 2 === 0) {
      const which = [chord.root, chord.fifth, chord.root, chord.fifth][beat / 2];
      bass(NOTES[which] * (beat === 4 ? 2 : 1), t);
    }
    // marimba skank on the off-beats
    if (beat % 2 === 1) chord.triad.forEach((n, i) => marimba(NOTES[n], t + i * 0.008, 0.07, 0.22));
    // drums
    if (beat === 0 || beat === 4) kick(t);
    if (beat === 2 || beat === 6) noise(t, 1800, 0.14, 0.12);
    if (beat % 2 === 1) noise(t, 7000, 0.05, 0.035);
    if (bar === 7 && beat === 7) noise(t, 4000, 0.1, 0.25); // little fill
  }

  function tick() {
    while (nextTime < ctx.currentTime + LOOKAHEAD) {
      schedule(step, nextTime);
      nextTime += STEP;
      step = (step + 1) % 64;
    }
  }

  const api = {
    get playing() { return playing; },
    async start() {
      init();
      if (!ctx) return false;
      try { await ctx.resume(); } catch (e) { return false; }
      if (playing) return true;
      playing = true;
      step = 0;
      nextTime = ctx.currentTime + 0.08;
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.8);
      timer = setInterval(tick, 25);
      tick();
      return true;
    },
    stop() {
      if (!ctx || !playing) return;
      playing = false;
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
      setTimeout(() => { if (!playing) clearInterval(timer); }, 450);
    },
    /* short "arrived!" jingle — plays even when the theme is off only if sfx enabled */
    blip() {
      if (!ctx || !playing) return;
      const t = ctx.currentTime + 0.02;
      ["C6", "E6", "G6"].forEach((n, i) => marimba(NOTES[n], t + i * 0.07, 0.18, 0.3));
    },
  };
  window.ExplorerMusic = api;
})();
