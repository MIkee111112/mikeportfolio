/**
 * Mouse-following particles (dust trail)
 * Lightweight canvas overlay – works on every page.
 */
(function () {
  "use strict";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  // Skip on touch-only devices (no useful hover trail)
  if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.id = "mouse-particles";
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "45",
  });
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let w = 0;
  let h = 0;
  let dpr = 1;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  const particles = [];
  const MAX = 48;
  let mouseX = -999;
  let mouseY = -999;
  let lastSpawn = 0;

  const COLORS = [
    "rgba(139, 92, 246,",   // primary
    "rgba(196, 181, 253,",  // soft violet
    "rgba(34, 211, 238,",   // cyan accent
    "rgba(255, 255, 255,",  // white
  ];

  function spawn(x, y) {
    if (particles.length >= MAX) particles.shift();
    const color = COLORS[(Math.random() * COLORS.length) | 0];
    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2 - 0.3,
      life: 1,
      decay: 0.012 + Math.random() * 0.02,
      size: 1.5 + Math.random() * 2.5,
      color,
    });
  }

  document.addEventListener(
    "mousemove",
    (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const now = performance.now();
      if (now - lastSpawn > 16) {
        spawn(mouseX, mouseY);
        if (Math.random() > 0.4) spawn(mouseX + (Math.random() - 0.5) * 8, mouseY + (Math.random() - 0.5) * 8);
        lastSpawn = now;
      }
    },
    { passive: true }
  );

  document.addEventListener(
    "mouseleave",
    () => {
      mouseX = -999;
      mouseY = -999;
    },
    { passive: true }
  );

  function tick() {
    ctx.clearRect(0, 0, w, h);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.015; // slight gravity
      p.life -= p.decay;

      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }

      const alpha = p.life * 0.7;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fillStyle = p.color + alpha + ")";
      ctx.fill();

      // soft glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = p.color + alpha * 0.2 + ")";
      ctx.fill();
    }

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();
