/* =============================================
   MY TOOLS PACK — JAVASCRIPT
   Particle Canvas · Tools Rendering · Filters
   ============================================= */

// ─────────────────────────────────────────────
// 1. TOOLS DATA
// ─────────────────────────────────────────────
const tools = [
  {
    id: "sports-tv-player", 
    title: "Sports TV Player",
    description: "Watch live sports channels from around the world including cricket, football, and more through a seamless streaming experience.",
    icon: "📺", 
    category: "Entertainment",
    tags: ["Live Sports", "Streaming", "TV Channels", "Cricket", "Football"],
    link: "https://sportsplayer.vikum.me/",
    status: "live",
    featured: true
  },
];

// ─────────────────────────────────────────────
// 2. PARTICLE CANVAS
// ─────────────────────────────────────────────
(function initParticles() {
  const canvas = document.getElementById("particleCanvas");
  const ctx = canvas.getContext("2d");

  let particles = [];
  let W, H;

  const COUNT = 90;
  const COLORS = ["#a855f7", "#ec4899", "#06b6d4", "#3b82f6", "#f97316"];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticle() {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.8 + 0.3,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.15,
      color,
    };
  }

  function init() {
    particles = [];
    for (let i = 0; i < COUNT; i++) particles.push(createParticle());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw connection lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / 120) * 0.12;
          ctx.strokeStyle = particles[i].color;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    // Draw particles
    particles.forEach((p) => {
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Move
      p.x += p.dx;
      p.y += p.dy;

      // Wrap
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => { resize(); init(); });
  resize();
  init();
  draw();
})();

// ─────────────────────────────────────────────
// 3. TYPEWRITER EFFECT
// ─────────────────────────────────────────────
(function typewriter() {
  const el = document.getElementById("typewriter-target");
  const words = ["Tools Collection", "Dev Arsenal", "Power Tools", "Web Utilities"];
  let wordIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function type() {
    const current = words[wordIdx];
    if (!deleting) {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 2000);
        return;
      }
    } else {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        wordIdx = (wordIdx + 1) % words.length;
      }
    }
    setTimeout(type, deleting ? 60 : 110);
  }

  setTimeout(type, 1000);
})();

// ─────────────────────────────────────────────
// 4. NAVBAR SCROLL EFFECT
// ─────────────────────────────────────────────
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

// ─────────────────────────────────────────────
// 5. RENDER TOOLS
// ─────────────────────────────────────────────
const grid = document.getElementById("toolsGrid");
const noResults = document.getElementById("noResults");
const badgeCount = document.getElementById("tool-count-badge");
const statTools = document.getElementById("stat-tools");

badgeCount.textContent = `${tools.length} Tools Available`;
statTools.textContent = `${tools.length}+`;

function getCategoryClass(cat) {
  return cat.toLowerCase();
}

function getStatusHTML(status) {
  const labels = { live: "🟢 Live", wip: "🟡 WIP", beta: "🔵 Beta" };
  const classes = { live: "status-live", wip: "status-wip", beta: "status-beta" };
  return `<span class="card-status ${classes[status]}">${labels[status]}</span>`;
}

function renderCards(list) {
  grid.innerHTML = "";
  if (list.length === 0) {
    noResults.classList.remove("hidden");
    return;
  }
  noResults.classList.add("hidden");

  list.forEach((tool, i) => {
    const catClass = getCategoryClass(tool.category);
    const card = document.createElement("div");
    card.className = "tool-card";
    card.setAttribute("data-id", tool.id);
    card.style.animationDelay = `${i * 0.07}s`;

    card.innerHTML = `
      <div class="card-top">
        <div class="card-icon icon-${catClass}">${tool.icon}</div>
        <div class="card-badges">
          <span class="badge-cat cat-${catClass}">${tool.category}</span>
          ${tool.featured ? '<span class="badge-featured">⭐ Featured</span>' : ""}
        </div>
      </div>
      <h3 class="card-title">${tool.title}</h3>
      <p class="card-desc">${tool.description}</p>
      <div class="card-tags">
        ${tool.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
      </div>
      <div class="card-footer">
        <a href="${tool.link}" target="_blank" class="card-link link-${catClass}" id="card-link-${tool.id}">
          Open Tool
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
        ${getStatusHTML(tool.status)}
      </div>
    `;

    // 3D tilt effect
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -6;
      const rotY = ((x - cx) / cx) * 6;
      card.style.transform = `translateY(-6px) scale(1.01) perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });

    grid.appendChild(card);
  });

  // Intersection Observer for stagger animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".tool-card").forEach((c) => observer.observe(c));
}

// ─────────────────────────────────────────────
// 6. SEARCH & FILTER
// ─────────────────────────────────────────────
const searchInput = document.getElementById("searchInput");
const searchClear = document.getElementById("searchClear");
const pills = document.querySelectorAll(".pill");

let activeFilter = "all";
let searchQuery = "";

function filterTools() {
  let result = tools;

  if (activeFilter !== "all") {
    result = result.filter((t) => t.category === activeFilter);
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    result = result.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        t.category.toLowerCase().includes(q)
    );
  }

  renderCards(result);
}

// Search input
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value.trim();
  searchClear.classList.toggle("visible", searchQuery.length > 0);
  filterTools();
});

// Clear button
searchClear.addEventListener("click", () => {
  searchInput.value = "";
  searchQuery = "";
  searchClear.classList.remove("visible");
  searchInput.focus();
  filterTools();
});

// Filter pills
pills.forEach((pill) => {
  pill.addEventListener("click", () => {
    pills.forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");
    activeFilter = pill.dataset.filter;
    filterTools();
  });
});

// ─────────────────────────────────────────────
// 7. SMOOTH SCROLL FOR NAV LINKS
// ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ─────────────────────────────────────────────
// 8. INIT
// ─────────────────────────────────────────────
renderCards(tools);

// Animate mini-cards in about section
const miniCards = document.querySelectorAll(".mini-card");
miniCards.forEach((mc, i) => {
  mc.style.animationDelay = `${i * 0.1}s`;
});
