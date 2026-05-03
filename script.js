const header = document.querySelector("[data-header]");

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

document.querySelectorAll(".hero-actions .button").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.assign(button.href);
  });
});

const motionAllowed = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
const cursorAllowed = window.matchMedia("(pointer: fine)").matches;

if (motionAllowed) {
  const revealItems = document.querySelectorAll(
    ".code-window, .project-card, .timeline article, .skill-grid article, .cert-panel, .contact-layout",
  );

  revealItems.forEach((item) => item.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

if (cursorAllowed && motionAllowed) {
  const dot = document.querySelector(".cursor-dot");
  const halo = document.querySelector(".cursor-halo");
  const interactiveSelector = "a, button, [data-scroll], .project-card, .skill-grid article, .contact-card a";

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let haloX = mouseX;
  let haloY = mouseY;
  let lastSpark = 0;

  window.addEventListener(
    "pointermove",
    (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      document.body.classList.add("cursor-ready");
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

      const now = performance.now();
      if (now - lastSpark > 70) {
        lastSpark = now;
        const spark = document.createElement("span");
        spark.className = "cursor-spark";
        spark.style.left = `${mouseX}px`;
        spark.style.top = `${mouseY}px`;
        spark.style.background = Math.random() > 0.5 ? "var(--accent)" : "var(--coral)";
        document.body.appendChild(spark);
        spark.addEventListener("animationend", () => spark.remove(), { once: true });
      }
    },
    { passive: true },
  );

  document.addEventListener("pointerover", (event) => {
    if (event.target.closest(interactiveSelector)) {
      document.body.classList.add("cursor-active");
    }
  });

  document.addEventListener("pointerout", (event) => {
    if (event.target.closest(interactiveSelector)) {
      document.body.classList.remove("cursor-active");
    }
  });

  const animateCursor = () => {
    haloX += (mouseX - haloX) * 0.16;
    haloY += (mouseY - haloY) * 0.16;
    halo.style.transform = `translate3d(${haloX}px, ${haloY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  };

  animateCursor();
}
