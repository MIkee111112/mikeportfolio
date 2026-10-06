/**
 * Mike Portfolio – About page
 * Lightweight interactions: mobile menu + scroll reveals
 */

(function () {
  "use strict";

  // ---------- Mobile menu ----------
  const toggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".nav-mobile");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      mobileNav.hidden = open;
    });

    // Close on link click
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.hidden = true;
      });
    });
  }

  // ---------- Scroll reveal ----------
  const reveals = document.querySelectorAll(".reveal");

  if (!reveals.length) return;

  // Respect reduced motion
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    reveals.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -6% 0px",
      threshold: 0.12,
    }
  );

  reveals.forEach((el) => observer.observe(el));

  // ---------- Play button (placeholder) ----------
  const playBtn = document.querySelector(".play-btn");
  if (playBtn) {
    playBtn.addEventListener("click", () => {
      // Replace this with your actual video modal / player logic
      console.log("Play showcase reel – wire up your video player here");
      // Example: open a dialog with an <iframe> or <video>
    });
  }
})();
