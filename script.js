const header = document.querySelector("[data-header]");
const motionAllowed = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
const cursorAllowed = window.matchMedia("(pointer: fine)").matches;

const updateHeader = () => {
  header?.classList.toggle("scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

document.querySelectorAll(".hero-actions .button").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.assign(button.href);
  });
});

const revealSelector = [
  ".signal-panel",
  ".portrait-console",
  ".metric-grid article",
  ".command-card",
  ".focus-board article",
  ".project-card",
  ".experience-card",
  ".education-card",
  ".skill-map article",
  ".cert-panel",
  ".contact-shell",
].join(", ");

const revealItems = document.querySelectorAll(revealSelector);

const nativeReveal = () => {
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
};

const nativeHeroIntro = () => {
  document.querySelectorAll(".hero .eyebrow, h1, .hero-copy, .hero-actions, .signal-panel, .portrait-console, .metric-grid article").forEach((item, index) => {
    item.animate(
      [
        { opacity: 0, transform: "translateY(24px) scale(0.98)" },
        { opacity: 1, transform: "translateY(0) scale(1)" },
      ],
      {
        duration: 720,
        delay: 110 * index,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        fill: "both",
      },
    );
  });
};

if (motionAllowed) {
  nativeReveal();
  nativeHeroIntro();

  import("https://cdn.jsdelivr.net/npm/motion@12.23.24/+esm")
    .then(({ animate, inView, scroll, stagger }) => {
      animate(
        ".hero .eyebrow, h1, .hero-copy, .hero-actions, .signal-panel, .portrait-console, .metric-grid article",
        { opacity: [0, 1], y: [28, 0], filter: ["blur(8px)", "blur(0px)"] },
        { delay: stagger(0.08), duration: 0.8, easing: [0.16, 1, 0.3, 1] },
      );

      animate(
        ".portrait-frame img",
        { opacity: [0, 1], x: [42, 0], rotate: [4, 0] },
        { duration: 1.05, delay: 0.22, easing: [0.16, 1, 0.3, 1] },
      );

      inView(revealSelector, (element) => {
        element.classList.add("visible");
        animate(
          element,
          { opacity: [0, 1], y: [36, 0], scale: [0.98, 1] },
          { duration: 0.72, easing: [0.16, 1, 0.3, 1] },
        );
      });

      scroll(
        (progress) => {
          document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(3));
        },
        { target: document.body },
      );
    })
    .catch(() => {
      document.documentElement.classList.add("motion-cdn-unavailable");
    });
}

if (cursorAllowed && motionAllowed) {
  const dot = document.querySelector(".cursor-dot");
  const halo = document.querySelector(".cursor-halo");
  const interactiveSelector = "a, button, [data-scroll], .project-card, .skill-map article, .contact-card a, .experience-card";

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
      if (now - lastSpark > 82) {
        lastSpark = now;
        const spark = document.createElement("span");
        spark.className = "cursor-spark";
        spark.style.left = `${mouseX}px`;
        spark.style.top = `${mouseY}px`;
        spark.style.background = Math.random() > 0.5 ? "var(--accent-2)" : "var(--accent)";
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
