const app = document.getElementById("app");
const thumb = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

function render() {
  setMeta();
  app.innerHTML = `
    <header class="site-header">
      <a class="brand" href="index.html#home" aria-label="Learn with Neha home">
        <span class="brand-badge">N</span>
        <span><strong>${SITE.brand}</strong><small>${SITE.message}</small></span>
      </a>
      <nav class="nav-links" aria-label="Main navigation">
        <a href="index.html#home">Home</a>
        <a href="index.html#about">About</a>
        <a href="index.html#videos">Videos</a>
        <a href="index.html#learn-ai">Learn AI</a>
        <a href="index.html#read">Read</a>
        <a href="index.html#contact">Contact</a>
      </nav>
      <a class="channel-link" href="${SITE.links.youtube}" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">▶</span>YouTube Channel</a>
      <button class="menu-button" type="button" aria-label="Open navigation">Menu</button>
    </header>

    <main>
      ${heroStudio()}
      ${learningRoadmap()}
      ${mediumReading()}
      ${videoShelf()}
      ${aboutStudio()}
      ${whyStrip()}
      ${comingNext()}
      ${subscribeBand()}
    </main>

    ${footer()}
  `;
  bindInteractions();
}

function setMeta() {
  const description = "Learn with Neha makes Artificial Intelligence, Machine Learning, LLMs, and Generative AI simple for beginners.";
  document.title = "Learn with Neha | Making AI Simple";
  document.querySelector("meta[name='description']")?.setAttribute("content", description);
  document.querySelector("meta[property='og:title']")?.setAttribute("content", "Learn with Neha");
  document.querySelector("meta[property='og:description']")?.setAttribute("content", description);
  document.querySelector("meta[property='og:type']")?.setAttribute("content", "website");
  document.querySelector("meta[property='og:image']")?.setAttribute("content", thumb(featuredVideo.id));

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: SITE.name,
        jobTitle: "Software Engineer and AI Educator",
        url: SITE.links.website,
        sameAs: [SITE.links.youtube, SITE.links.linkedin, SITE.links.medium, SITE.links.github, SITE.links.book]
      },
      {
        "@type": "WebSite",
        name: SITE.brand,
        description,
        url: SITE.links.website
      },
      {
        "@type": "VideoObject",
        name: featuredVideo.title,
        description: featuredVideo.description,
        thumbnailUrl: thumb(featuredVideo.id),
        embedUrl: `https://www.youtube.com/embed/${featuredVideo.id}`,
        uploadDate: "2026-08-12"
      }
    ]
  };
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

function heroStudio() {
  return `
    <section id="home" class="studio-hero">
      <div class="hero-topline reveal">
        <span>Beginner AI lessons</span>
        <span>Visual explanations</span>
        <span>Real-world technology</span>
      </div>

      <div class="hero-board reveal">
        <div class="hero-copy">
          <p class="eyebrow">Welcome to Learn with Neha</p>
          <h1>AI Doesn't Have to Be Complicated.</h1>
          <p class="lead">${SITE.description}</p>
          <div class="hero-actions">
            <a class="button primary" href="#learn-ai">Start Learning AI</a>
            <a class="button secondary" href="${SITE.links.youtube}" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">▶</span>Watch on YouTube</a>
          </div>
        </div>

        <aside class="portrait-sticker reveal delay-1">
          <img src="../assets/learn-with-neha-clean-portrait.png" alt="Neha Chinnasani" loading="eager" />
          <div class="sticker-caption">
            <strong>${SITE.name}</strong>
            <span>Software engineer and AI educator</span>
          </div>
        </aside>
      </div>

      <div class="start-module reveal">
        <div class="start-copy">
          <p class="eyebrow">Start Here</p>
          <h2>${featuredVideo.title}</h2>
          <p class="subtitle">${featuredVideo.subtitle}</p>
          <p>${featuredVideo.description}</p>
          <a class="button primary" href="${featuredVideo.url}" target="_blank" rel="noopener noreferrer">Watch the Full Explanation</a>
        </div>
        <a class="featured-thumb" href="${featuredVideo.url}" target="_blank" rel="noopener noreferrer" aria-label="Watch ${featuredVideo.title}">
          <img src="${thumb(featuredVideo.id)}" alt="YouTube thumbnail for ${featuredVideo.title}" loading="lazy" />
          <span aria-hidden="true">▶</span>
        </a>
      </div>
    </section>
  `;
}

function learningRoadmap() {
  return `
    <section id="learn-ai" class="section roadmap reveal">
      <div class="section-intro">
        <p class="eyebrow">Learn AI</p>
        <h2>Learn AI From the Beginning</h2>
        <p>No complicated jargon. We'll build your understanding step by step.</p>
      </div>
      <div class="roadmap-list">
        ${learnCards.map((card) => `
          <article class="roadmap-item">
            <span class="roadmap-number">${card.number}</span>
            <div class="roadmap-icon">${card.icon}</div>
            <div>
              <h3>${card.title}</h3>
              <p>${card.description}</p>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function mediumReading() {
  return `
    <section id="read" class="section reading-lab reveal">
      <div class="section-intro row">
        <div>
          <p class="eyebrow">Read and learn</p>
          <h2>Read My Medium Blogs</h2>
          <p>Short AI explainers you can read after watching the videos, so the concept settles from both sides.</p>
        </div>
        <a class="button secondary" href="${SITE.links.medium}" target="_blank" rel="noopener noreferrer">Open Medium</a>
      </div>
      <div class="reading-grid">
        ${mediumPosts.map((post) => `
          <article class="reading-card">
            <span>${post.label}</span>
            <h3>${post.title}</h3>
            <p>${post.description}</p>
            <a class="text-link" href="${post.url}" target="_blank" rel="noopener noreferrer">Read on Medium</a>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function videoShelf() {
  return `
    <section id="videos" class="section video-shelf reveal">
      <div class="section-intro row">
        <div>
          <p class="eyebrow">Latest Videos</p>
          <h2>Latest from Learn with Neha</h2>
        </div>
        <a class="button secondary" href="${SITE.links.youtube}" target="_blank" rel="noopener noreferrer">View All Videos on YouTube</a>
      </div>
      <div class="video-row">
        ${videos.map(videoCard).join("")}
      </div>
    </section>
  `;
}

function videoCard(video) {
  return `
    <article class="video-card">
      <a class="video-thumb" href="${video.url}" target="_blank" rel="noopener noreferrer" aria-label="Watch ${video.title}">
        <img src="${thumb(video.id)}" alt="YouTube thumbnail for ${video.title}" loading="lazy" />
        <span aria-hidden="true">▶</span>
      </a>
      <div class="video-body">
        <h3>${video.title}</h3>
        <p>${video.description}</p>
        <a class="text-link" href="${video.url}" target="_blank" rel="noopener noreferrer">Watch Video</a>
      </div>
    </article>
  `;
}

function aboutStudio() {
  return `
    <section id="about" class="section about-studio reveal">
      <div class="about-card">
        <p class="eyebrow">About</p>
        <h2>Hi, I'm Neha</h2>
        <p>I'm a software engineer and AI enthusiast passionate about understanding how modern technology actually works.</p>
        <p>I created Learn with Neha to make AI easier to understand, especially for beginners who often feel overwhelmed by technical terminology.</p>
        <p>Here, we'll go beyond buzzwords and understand concepts step by step, using simple explanations, practical examples, and visual demonstrations.</p>
        <p>Whether you're a student, developer, working professional, or simply curious about AI, you're welcome to learn along with me.</p>
        <a class="button primary" href="${SITE.links.website}" target="_blank" rel="noopener noreferrer">My AI Journey</a>
      </div>
      <div class="notebook-card">
        <h3>Learning Promise</h3>
        <ul>
          <li>Simple language before formulas.</li>
          <li>Visual examples before abstract theory.</li>
          <li>Real technology before buzzwords.</li>
        </ul>
      </div>
    </section>
  `;
}

function whyStrip() {
  return `
    <section class="section why-strip reveal">
      <div class="section-intro centered">
        <p class="eyebrow">Why Learn with Neha</p>
        <h2>Complex AI. Simple Explanations.</h2>
      </div>
      <div class="reason-row">
        ${reasons.map((reason) => `
          <article class="reason-card">
            <h3>${reason.title}</h3>
            <p>${reason.description}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function comingNext() {
  return `
    <section class="section coming-next reveal">
      <div class="section-intro row">
        <div>
          <p class="eyebrow">Coming Next</p>
          <h2>What Should We Learn Next?</h2>
        </div>
        <p>Upcoming lessons will keep building the AI foundation one concept at a time.</p>
      </div>
      <div class="topic-cloud">
        ${upcomingTopics.map((topic) => `<article><span>Coming Soon</span><strong>${topic}</strong></article>`).join("")}
      </div>
    </section>
  `;
}

function subscribeBand() {
  return `
    <section id="contact" class="subscribe-band reveal">
      <div>
        <p class="eyebrow">YouTube Channel</p>
        <h2>Learning AI? Let's Learn Together.</h2>
        <p>Subscribe to Learn with Neha for simple, visual explanations of AI, machine learning, LLMs, and the technology shaping our future.</p>
      </div>
      <a class="button subscribe-button" href="${SITE.links.youtube}" target="_blank" rel="noopener noreferrer">Subscribe on YouTube</a>
    </section>
  `;
}

function footer() {
  return `
    <footer class="footer">
      <div>
        <h2>${SITE.brand}</h2>
        <p>${SITE.message}</p>
      </div>
      <nav aria-label="Footer navigation">
        <a href="index.html#home">Home</a>
        <a href="index.html#about">About</a>
        <a href="index.html#videos">Videos</a>
        <a href="index.html#learn-ai">Learn AI</a>
        <a href="index.html#read">Read</a>
        <a href="${SITE.links.youtube}" target="_blank" rel="noopener noreferrer">YouTube</a>
        <a href="index.html#contact">Contact</a>
      </nav>
      <p class="copyright">© 2026 Learn with Neha. All rights reserved.</p>
    </footer>
  `;
}

function bindInteractions() {
  const menu = document.querySelector(".menu-button");
  const nav = document.querySelector(".nav-links");
  menu?.addEventListener("click", () => nav.classList.toggle("open"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.14 });

  document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
}

render();
