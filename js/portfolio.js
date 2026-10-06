/**
 * Portfolio page – video lightbox for YouTube reels
 */
(function () {
  "use strict";

  const modal = document.getElementById("video-modal");
  const iframe = document.getElementById("video-iframe");
  const backdrop = modal?.querySelector(".video-modal-backdrop");
  const closeBtn = modal?.querySelector(".video-modal-close");

  if (!modal || !iframe) return;

  function openVideo(videoId) {
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeVideo() {
    modal.hidden = true;
    iframe.src = "";
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".project-card").forEach((card) => {
    const videoId = card.dataset.video;
    if (!videoId) return;

    const play = () => openVideo(videoId);
    card.addEventListener("click", play);
    card.querySelector(".project-play")?.addEventListener("click", (e) => {
      e.stopPropagation();
      play();
    });
  });

  closeBtn?.addEventListener("click", closeVideo);
  backdrop?.addEventListener("click", closeVideo);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeVideo();
  });
})();
