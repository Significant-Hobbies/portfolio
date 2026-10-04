(() => {
  'use strict';
  // src/catalog.ts
var DEFAULT_PROJECTS = [
  {
    "id": "codevetter",
    "name": "CodeVetter",
    "url": "https://codevetter.com",
    "description": "Execution-backed verification for AI-written software changes \u2014 local-first and inspectable.",
    "tier": "focus",
    "priority": "P1",
    "category": "utility",
    "maturity": "experiment",
    "spotlight": true,
    "pillarId": "build",
    "domains": [
      "codevetter.com"
    ]
  },
  {
    "id": "posttrainllm",
    "name": "PostTrainLLM",
    "url": "https://posttrainllm.com",
    "description": "An experimental browser model playground: run small language models locally with visible generation metrics.",
    "tier": "focus",
    "priority": "P1",
    "category": "utility",
    "maturity": "experiment",
    "spotlight": true,
    "pillarId": "build",
    "domains": [
      "posttrainllm.com"
    ]
  },
  {
    "id": "anchor",
    "name": "Anchor",
    "url": "https://anchor.significanthobbies.com",
    "description": "A local-first day planner and focus timer for Mac, iPhone, and Apple Watch that explains the gap between the schedule you planned and the day you lived.",
    "tier": "active",
    "priority": "P2",
    "category": "utility",
    "maturity": "in-progress",
    "spotlight": false,
    "pillarId": "learn",
    "domains": [
      "anchor.significanthobbies.com"
    ]
  },
  {
    "id": "anime-list",
    "name": "Anime List",
    "url": "https://anime.significanthobbies.com",
    "description": "Anime and manga discovery with multi-axis filtering and personal watchlists.",
    "tier": "secondary",
    "priority": "P4",
    "category": "media",
    "maturity": "maintained",
    "spotlight": false,
    "pillarId": "learn",
    "domains": [
      "anime.significanthobbies.com"
    ]
  },
  {
    "id": "app-health",
    "name": "App Health",
    "url": "https://health.sassmaker.com",
    "description": "Web analytics, product events, logs, and endpoint health in one workspace.",
    "tier": "active",
    "priority": "P2",
    "category": "utility",
    "maturity": "public-ready",
    "spotlight": false,
    "pillarId": "visibility",
    "domains": [
      "health.sassmaker.com"
    ]
  },
  {
    "id": "agent-testing",
    "name": "Browser Agent Testing",
    "url": "https://browser-agents.sarthakagrawal.dev/",
    "description": "A completed local web and iOS experiment comparing browser-agent speed, cost, reliability and defect detection against independent verification.",
    "tier": "secondary",
    "priority": "P4",
    "category": "experimental",
    "maturity": "experiment",
    "spotlight": false,
    "pillarId": "build",
    "domains": [
      "browser-agents.sarthakagrawal.dev"
    ]
  },
  {
    "id": "browserdaddy",
    "name": "BrowserDaddy",
    "url": "https://browser.daddyrad.com/",
    "description": "A local-first Mac browsing intelligence app for a unified history archive and real attention tracking.",
    "tier": "active",
    "priority": "P2",
    "category": "utility",
    "maturity": "preview",
    "spotlight": false,
    "pillarId": "build",
    "domains": [
      "browser.daddyrad.com"
    ]
  },
  {
    "id": "calorie",
    "name": "Calorie",
    "url": "https://calorie.significanthobbies.com",
    "description": "A private, local-first food, water, and weight journal with transparent timing guidance.",
    "tier": "secondary",
    "priority": "P2",
    "category": "utility",
    "maturity": "maintained",
    "spotlight": false,
    "pillarId": "learn",
    "domains": [
      "calorie.significanthobbies.com"
    ]
  },
  {
    "id": "contextdaddy",
    "name": "ContextDaddy",
    "url": "https://context.daddyrad.com/",
    "description": "A local Mac desk for agent context, skills, usage, and observed telemetry.",
    "tier": "active",
    "category": "utility",
    "maturity": "beta",
    "spotlight": false,
    "pillarId": "build",
    "domains": [
      "context.daddyrad.com"
    ]
  },
  {
    "id": "daddyrad",
    "name": "DaddyRad",
    "url": "https://daddyrad.com/",
    "description": "Umbrella landing for the daddy series: native Mac utilities for performance evidence, storage cleanup, browsing attention and agent context.",
    "tier": "active",
    "priority": "P3",
    "category": "utility",
    "maturity": "beta",
    "spotlight": false,
    "pillarId": "build",
    "domains": [
      "daddyrad.com"
    ]
  },
  {
    "id": "free-ai",
    "name": "Free AI",
    "url": "https://ai-gateway.sassmaker.com",
    "description": "An OpenAI-compatible free-tier model gateway with operator-provisioned project access.",
    "tier": "active",
    "priority": "P4",
    "category": "utility",
    "maturity": "maintained",
    "spotlight": false,
    "pillarId": "build",
    "domains": [
      "ai-gateway.sassmaker.com"
    ]
  },
  {
    "id": "gitstat",
    "name": "GitStat",
    "url": "https://git.significanthobbies.com",
    "description": "An experimental public GitHub analysis tool for repository activity, contributions and code churn.",
    "tier": "secondary",
    "priority": "P2",
    "category": "experimental",
    "maturity": "experiment",
    "spotlight": false,
    "pillarId": "build",
    "domains": [
      "git.significanthobbies.com"
    ]
  },
  {
    "id": "pace",
    "name": "HeyPace",
    "url": "https://heypace.app",
    "description": "An experimental macOS voice-agent preview; installation and permission-dependent workflows are still being qualified.",
    "tier": "focus",
    "priority": "P4",
    "category": "experimental",
    "maturity": "experiment",
    "spotlight": false,
    "pillarId": "build",
    "domains": [
      "heypace.app"
    ]
  },
  {
    "id": "high-signal",
    "name": "High Signal",
    "url": "https://highsignal.app",
    "description": "Evidence-backed daily intelligence across technology, startups, finance, and public markets.",
    "tier": "active",
    "priority": "P2",
    "category": "media",
    "maturity": "public-ready",
    "spotlight": false,
    "pillarId": "learn",
    "domains": [
      "highsignal.app"
    ]
  },
  {
    "id": "on-record",
    "name": "High Signal Podcasts",
    "url": "https://podcasts.highsignal.app",
    "description": "Search evidenced podcast claims and follow links back to the original episode or publication.",
    "tier": "secondary",
    "priority": "P2",
    "category": "media",
    "maturity": "experiment",
    "spotlight": false,
    "pillarId": "learn",
    "domains": [
      "podcasts.highsignal.app"
    ]
  },
  {
    "id": "issue-pages",
    "name": "IssuePages",
    "url": "https://issues.sarthakagrawal.dev",
    "description": "Read public GitHub issues as focused articles; publishing requires repository-owner access.",
    "tier": "secondary",
    "priority": "P4",
    "category": "experimental",
    "maturity": "experiment",
    "spotlight": false,
    "pillarId": "build",
    "domains": [
      "issues.sarthakagrawal.dev"
    ]
  },
  {
    "id": "karte",
    "name": "Karte",
    "url": "https://karte.cc",
    "description": "A creator-owned public profile that answers visitor questions and preserves context for better inbound.",
    "tier": "secondary",
    "priority": "P2",
    "category": "utility",
    "maturity": "public-ready",
    "spotlight": false,
    "pillarId": "build",
    "domains": [
      "karte.cc"
    ]
  },
  {
    "id": "email-manager",
    "name": "Kinetic",
    "url": "https://mail.significanthobbies.com",
    "description": "A private Gmail workspace for local semantic search, sender insights, and explicit unsubscribe workflows.",
    "tier": "active",
    "priority": "P4",
    "category": "utility",
    "maturity": "maintained",
    "spotlight": false,
    "pillarId": "learn",
    "domains": [
      "mail.significanthobbies.com"
    ]
  },
  {
    "id": "kith",
    "name": "Kith",
    "url": "https://kith.significanthobbies.com",
    "description": "A private iPhone app for the people you actually want to stay close to \u2014 closeness-weighted constellation home, standing notes, and a chronological log per person.",
    "tier": "secondary",
    "priority": "P2",
    "category": "utility",
    "maturity": "in-progress",
    "spotlight": false,
    "pillarId": "learn",
    "domains": [
      "kith.significanthobbies.com"
    ]
  },
  {
    "id": "knowledge-base",
    "name": "Knowledge Base",
    "url": "https://knowledgebase.sassmaker.com",
    "description": "Private agent search over specialized corpora with ranked citations, provenance, and schema-aware retrieval.",
    "tier": "active",
    "priority": "P2",
    "category": "utility",
    "maturity": "maintained",
    "spotlight": false,
    "pillarId": "build",
    "domains": [
      "knowledgebase.sassmaker.com"
    ]
  },
  {
    "id": "live",
    "name": "Live",
    "url": "https://live.significanthobbies.com",
    "description": "Explore hobbies and possibilities, build a personal bucket list, and save your progress on this device or in your account.",
    "tier": "active",
    "priority": "P2",
    "category": "media",
    "maturity": "experiment",
    "spotlight": false,
    "pillarId": "learn",
    "domains": [
      "live.significanthobbies.com"
    ]
  },
  {
    "id": "looptv",
    "name": "LoopTV",
    "url": "https://tv.significanthobbies.com",
    "description": "An experimental lean-back queue of curated science and other videos.",
    "tier": "secondary",
    "priority": "P4",
    "category": "media",
    "maturity": "experiment",
    "spotlight": false,
    "pillarId": "learn",
    "domains": [
      "tv.significanthobbies.com"
    ]
  },
  {
    "id": "mashup",
    "name": "Mashup",
    "url": "https://mashup.highsignal.app",
    "description": "Two playable examples of a local media-editing pipeline, with captions and inspectable source and approval receipts.",
    "tier": "secondary",
    "priority": "P2",
    "category": "experimental",
    "spotlight": false,
    "domains": [
      "mashup.highsignal.app"
    ]
  },
  {
    "id": "chatgpt-memory-insights",
    "name": "Memory Map",
    "url": "https://chatgpt.significanthobbies.com",
    "description": "A browser-local experiment for importing a ChatGPT export, exploring semantic themes and search, and optionally saving analysis on your device.",
    "tier": "secondary",
    "priority": "P2",
    "category": "utility",
    "maturity": "experiment",
    "spotlight": false,
    "pillarId": "learn",
    "domains": [
      "chatgpt.significanthobbies.com"
    ]
  },
  {
    "id": "nomad-data-adventure",
    "name": "Nomad Data Adventure",
    "url": "https://nomad.significanthobbies.com/",
    "description": "Nomad Atlas explores 1,374 terrestrial places with living-cost profiles, lifestyle filters, city comparisons and downloadable source data credited to Nomads.com.",
    "tier": "secondary",
    "priority": "P2",
    "category": "experimental",
    "maturity": "experiment",
    "spotlight": false,
    "pillarId": "build",
    "domains": [
      "nomad.significanthobbies.com"
    ]
  },
  {
    "id": "what-it-takes-to-win",
    "name": "Paths",
    "url": "https://paths.significanthobbies.com",
    "description": "Explore sourced career turning points with explicit survivorship and forecasting limits.",
    "tier": "active",
    "priority": "P4",
    "category": "media",
    "maturity": "experiment",
    "spotlight": false,
    "pillarId": "learn",
    "domains": [
      "paths.significanthobbies.com"
    ]
  },
  {
    "id": "performancedaddy",
    "name": "PerformanceDaddy",
    "url": "https://performance.daddyrad.com/",
    "description": "A local Mac performance investigator for background apps, helpers and developer workloads, with measured evidence and reviewed actions.",
    "tier": "active",
    "priority": "P2",
    "category": "utility",
    "maturity": "preview",
    "spotlight": false,
    "pillarId": "build",
    "domains": [
      "performance.daddyrad.com"
    ]
  },
  {
    "id": "ph-catalog",
    "name": "PH Catalog",
    "url": "https://ph.significanthobbies.com",
    "description": "A resumable local Product Hunt catalogue and analytics experiment with a privacy-safe synthetic demo.",
    "tier": "secondary",
    "priority": "P2",
    "category": "experimental",
    "maturity": "experiment",
    "spotlight": false,
    "pillarId": "build",
    "domains": [
      "ph.significanthobbies.com"
    ]
  },
  {
    "id": "reddit-insights",
    "name": "Reddit Insights",
    "url": "https://reddit-insights.highsignal.app",
    "description": "Search a dated snapshot of 93 Reddit communities in your browser, with links to original posts and explicit provenance limits.",
    "tier": "secondary",
    "priority": "P4",
    "category": "experimental",
    "spotlight": false,
    "domains": [
      "reddit-insights.highsignal.app"
    ]
  },
  {
    "id": "research-papers",
    "name": "Research Papers",
    "url": "https://papers.highsignal.app",
    "description": "Search academic papers and follow original sources; account-based research chat is not yet qualified.",
    "tier": "secondary",
    "priority": "P2",
    "category": "media",
    "maturity": "experiment",
    "spotlight": false,
    "pillarId": "learn",
    "domains": [
      "papers.highsignal.app"
    ]
  },
  {
    "id": "rolepatch",
    "name": "RolePatch",
    "url": "https://rolepatch.com",
    "description": "A guest resume-tailoring experiment with a reviewable diff and browser-local document exports.",
    "tier": "secondary",
    "priority": "P2",
    "category": "utility",
    "maturity": "maintained",
    "spotlight": false,
    "pillarId": "build",
    "domains": [
      "rolepatch.com"
    ]
  },
  {
    "id": "saas-maker",
    "name": "SaaS Maker",
    "url": "https://sassmaker.com",
    "description": "A public directory of working experiments, launch destinations, reference projects and reusable tooling.",
    "tier": "active",
    "priority": "P2",
    "category": "media",
    "maturity": "experiment",
    "spotlight": false,
    "pillarId": "build",
    "domains": [
      "sassmaker.com"
    ]
  },
  {
    "id": "sarthakagrawal-personal",
    "name": "Sarthak Agrawal",
    "url": "https://sarthakagrawal.dev",
    "description": "Selected engineering case studies, technical writing and working project demonstrations.",
    "tier": "secondary",
    "priority": "P4",
    "category": "media",
    "maturity": "experiment",
    "spotlight": false,
    "pillarId": "personal",
    "domains": [
      "sarthakagrawal.dev"
    ]
  },
  {
    "id": "setline",
    "name": "Setline",
    "url": "https://setline.significanthobbies.com",
    "description": "An iOS-native training tracker that runs a written strength, cardio and mobility programme one set at a time and measures each exercise against an authored target.",
    "tier": "secondary",
    "priority": "P2",
    "category": "utility",
    "maturity": "maintained",
    "spotlight": false,
    "pillarId": "learn",
    "domains": [
      "setline.significanthobbies.com"
    ]
  },
  {
    "id": "significanthobbies",
    "name": "Significant Hobbies",
    "url": "https://significanthobbies.com",
    "description": "The shared Hub for Live, Calorie, Setline, Kith, and Anchor, backed by one privacy-aware control plane.",
    "tier": "secondary",
    "priority": "P2",
    "category": "utility",
    "maturity": "public-ready",
    "spotlight": false,
    "pillarId": "learn",
    "domains": [
      "significanthobbies.com"
    ]
  },
  {
    "id": "starboard",
    "name": "Starboard",
    "url": "https://starboard.codevetter.com",
    "description": "Explore public GitHub repositories and related projects through a searchable discovery experiment.",
    "tier": "secondary",
    "priority": "P2",
    "category": "utility",
    "maturity": "experiment",
    "spotlight": false,
    "pillarId": "learn",
    "domains": [
      "starboard.codevetter.com"
    ]
  },
  {
    "id": "storagedaddy",
    "name": "storagedaddy",
    "url": "https://storage.daddyrad.com/",
    "description": "An open-source native Mac storage analyzer for developer caches, builds, dependencies and AI session archives, with reviewed cleanup. Free during early access.",
    "tier": "active",
    "priority": "P2",
    "category": "utility",
    "maturity": "beta",
    "spotlight": false,
    "pillarId": "build",
    "domains": [
      "storage.daddyrad.com"
    ]
  },
  {
    "id": "swe-interview-prep",
    "name": "SWE Interview Prep",
    "url": "https://learn.significanthobbies.com",
    "description": "A learning OS for software-engineering interview practice.",
    "tier": "secondary",
    "priority": "P2",
    "category": "media",
    "maturity": "maintained",
    "spotlight": false,
    "pillarId": "learn",
    "domains": [
      "learn.significanthobbies.com"
    ]
  },
  {
    "id": "web-playables",
    "name": "Web Playables",
    "url": "https://idle.aliveville.com",
    "description": "Small browser-playable game experiments.",
    "tier": "secondary",
    "priority": "P4",
    "category": "experimental",
    "spotlight": false,
    "domains": [
      "idle.aliveville.com"
    ]
  }
];

// src/core.ts
function isProject(value) {
  if (!value || typeof value !== "object") return false;
  const project = value;
  try {
    const url = new URL(project.url ?? "");
    return typeof project.id === "string" && project.id.length > 0 && typeof project.name === "string" && project.name.length > 0 && (url.protocol === "http:" || url.protocol === "https:");
  } catch {
    return false;
  }
}
function normalizeProjects(value) {
  if (!Array.isArray(value)) return [];
  const seen = /* @__PURE__ */ new Set();
  return value.filter(isProject).filter((project) => {
    if (seen.has(project.id)) return false;
    seen.add(project.id);
    return true;
  });
}
function withReferralSource(url, currentProjectId) {
  if (!currentProjectId) return url;
  try {
    const destination = new URL(url);
    destination.searchParams.set("ref", currentProjectId);
    return destination.toString();
  } catch {
    return url;
  }
}

// src/element.ts
var PORTFOLIO_PROJECT_STRIP_TAG = "portfolio-project-strip";
var DEFAULT_CATALOG_URL = "https://sassmaker.com/projects.json";
var REQUEST_TIMEOUT_MS = 800;
function registerPortfolioProjectStrip() {
  if (typeof window === "undefined" || customElements.get(PORTFOLIO_PROJECT_STRIP_TAG)) return;
  class PortfolioProjectStripElement extends HTMLElement {
    projects = DEFAULT_PROJECTS;
    static observedAttributes = [
      "current-project",
      "catalog-url",
      "label",
      "speed",
      "theme",
      "layout"
    ];
    connectedCallback() {
      this.render();
      void this.revalidate();
    }
    attributeChangedCallback(_name, previous, next) {
      if (previous !== next && this.isConnected) this.render();
    }
    render() {
      const currentProject = this.getAttribute("current-project") || void 0;
      const label = this.getAttribute("label") || "Other projects by Sarthak";
      const parsedSpeed = Number(this.getAttribute("speed"));
      const speed = Number.isFinite(parsedSpeed) && parsedSpeed > 0 ? Math.max(20, parsedSpeed) : 42;
      const curated = this.getAttribute("layout") === "curated";
      const studio = this.getAttribute("layout") === "studio";
      const eligibleProjects = normalizeProjects(this.projects).filter(
        (project) => project.id !== currentProject
      );
      const projects = curated || studio ? eligibleProjects.slice(0, 3) : eligibleProjects;
      if (projects.length === 0) {
        this.hidden = true;
        return;
      }
      this.hidden = false;
      const root = this.shadowRoot ?? this.attachShadow({ mode: "open" });
      const previousStudio = root.querySelector(".studio-line");
      const restoreStudioFocus = Boolean(
        previousStudio && root.activeElement && previousStudio.contains(root.activeElement)
      );
      const focusedHref = root.activeElement instanceof HTMLAnchorElement ? root.activeElement.href : void 0;
      const studioScrollLeft = previousStudio?.scrollLeft ?? 0;
      root.replaceChildren();
      const style = document.createElement("style");
      style.textContent = `
        :host {
          --portfolio-strip-bg: color-mix(in srgb, currentColor 3%, transparent);
          --portfolio-strip-text: currentColor;
          --portfolio-strip-muted: color-mix(in srgb, currentColor 70%, transparent);
          --portfolio-strip-border: color-mix(in srgb, currentColor 12%, transparent);
          --portfolio-strip-focus: #2563eb;
          display: block;
          width: 100%;
          min-width: 0;
          max-width: 100%;
          overflow: hidden;
          contain: inline-size;
          border-block: 1px solid var(--portfolio-strip-border);
          background: var(--portfolio-strip-bg);
          color: var(--portfolio-strip-text);
          font: inherit;
        }
        :host([theme='light']) { --portfolio-strip-bg: #fafaf9; --portfolio-strip-text: #292524; --portfolio-strip-muted: #6f6964; --portfolio-strip-border: #e7e5e4; }
        :host([theme='dark']) { --portfolio-strip-bg: #171717; --portfolio-strip-text: #f5f5f4; --portfolio-strip-muted: #a8a29e; --portfolio-strip-border: #30302f; }
        :host([integrated]) { border-block: 0; background: transparent; }
        * { box-sizing: border-box; }
        aside { width: 100%; min-width: 0; overflow: hidden; }
        .viewport { width: 100%; min-width: 0; overflow: hidden; padding: 0 1rem; mask-image: linear-gradient(90deg, transparent, currentColor 1rem, currentColor calc(100% - 1rem), transparent); }
        .track { display: flex; width: max-content; align-items: center; animation: portfolio-strip-marquee var(--portfolio-strip-speed) linear infinite; }
        .viewport:hover .track, .viewport:focus-within .track { animation-play-state: paused; }
        ul { display: flex; align-items: center; margin: 0; padding: 0; list-style: none; }
        li { display: inline-flex; align-items: center; white-space: nowrap; }
        a { display: inline-flex; min-height: 2.75rem; align-items: center; border-radius: .2rem; color: inherit; font-size: .8125rem; text-decoration: none; }
        a:hover { text-decoration: underline; text-underline-offset: .2em; }
        a:focus-visible { outline: 2px solid var(--portfolio-strip-focus); outline-offset: 2px; }
        .dot { padding: 0 .7rem; color: var(--portfolio-strip-muted); }
        :host([layout='curated']) { border-block: 0; background: transparent; container-type: inline-size; }
        .curated-list { display: grid; grid-template-columns: minmax(0, 1fr); gap: .75rem; padding: 0; }
        .curated-list li { display: block; white-space: normal; min-width: 0; }
        .curated-list a { font-size: .95rem; font-weight: 650; overflow-wrap: anywhere; }
        .description { margin: 0; color: var(--portfolio-strip-muted); font-size: .8125rem; line-height: 1.5; overflow-wrap: anywhere; }
        @container (min-width: 560px) { .curated-list { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.5rem; align-items: start; } }
        :host([layout='studio']) { border-block: 0; background: transparent; font-family: var(--portfolio-strip-ui-font, var(--fleet-footer-ui-font, inherit)); }
        .studio-line { display: flex; width: 100%; min-width: 0; align-items: center; justify-content: space-between; gap: 1.4rem; padding: .4rem var(--portfolio-strip-edge, var(--fleet-footer-edge, 1.25rem)); overflow-x: auto; overscroll-behavior-x: contain; white-space: nowrap; font-size: .75rem; line-height: 1.5; scrollbar-width: thin; scrollbar-color: var(--portfolio-strip-border) transparent; }
        .studio-line:focus-visible { outline: 2px solid var(--portfolio-strip-focus); outline-offset: -2px; }
        .studio-label, .studio-line > a, .studio-dot { flex: 0 0 auto; }
        .studio-label, .studio-dot { color: var(--portfolio-strip-muted); }
        .studio-list { display: flex; flex: 1 0 auto; align-items: center; justify-content: space-around; gap: 1.4rem; }
        .studio-list li { display: flex; align-items: center; gap: 1.4rem; }
        .studio-line a { font-size: inherit; }
        @media (max-width: 600px) { .studio-line, .studio-list, .studio-list li { gap: 1rem; } }
        @keyframes portfolio-strip-marquee { to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce), (hover: none), (pointer: coarse) {
          .track { animation: none; }
          .viewport { overflow-x: auto; mask-image: none; }
          .duplicate { display: none; }
        }
      `;
      const aside = document.createElement("aside");
      aside.setAttribute("aria-label", label);
      if (studio) {
        const line = document.createElement("div");
        line.className = "studio-line";
        line.tabIndex = 0;
        line.setAttribute("role", "region");
        line.setAttribute("aria-label", "Studio project links; scroll with arrow keys");
        const caption = document.createElement("span");
        caption.className = "studio-label";
        caption.textContent = "From the studio";
        const separator = () => {
          const dot = document.createElement("span");
          dot.className = "studio-dot";
          dot.setAttribute("aria-hidden", "true");
          dot.textContent = "\xB7";
          return dot;
        };
        const list = document.createElement("ul");
        list.className = "studio-list";
        for (const project of projects) {
          const item = document.createElement("li");
          const link = document.createElement("a");
          link.href = withReferralSource(project.url, currentProject);
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.textContent = project.name;
          link.title = project.description || project.name;
          link.setAttribute("aria-label", `${project.name} (opens in a new tab)`);
          item.append(separator(), link);
          list.append(item);
        }
        const all = document.createElement("a");
        all.href = "https://sassmaker.com/projects";
        all.textContent = "All projects \u2197";
        line.append(caption, list, separator(), all);
        aside.append(line);
        root.append(style, aside);
        line.scrollLeft = studioScrollLeft;
        if (restoreStudioFocus) {
          const focusedLink = Array.from(line.querySelectorAll("a")).find(
            (link) => link.href === focusedHref
          );
          (focusedLink ?? line).focus({ preventScroll: true });
          if (focusedLink) {
            const lineBounds = line.getBoundingClientRect();
            const linkBounds = focusedLink.getBoundingClientRect();
            if (linkBounds.left < lineBounds.left) {
              line.scrollLeft += linkBounds.left - lineBounds.left;
            } else if (linkBounds.right > lineBounds.right) {
              line.scrollLeft += linkBounds.right - lineBounds.right;
            }
          }
        }
        return;
      }
      if (curated) {
        const list = document.createElement("ul");
        list.className = "curated-list";
        for (const project of projects) {
          const item = document.createElement("li");
          const link = document.createElement("a");
          link.href = withReferralSource(project.url, currentProject);
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.textContent = project.name;
          link.setAttribute("aria-label", `${project.name} (opens in a new tab)`);
          item.append(link);
          if (project.description) {
            const description = document.createElement("p");
            description.className = "description";
            description.textContent = project.description;
            item.append(description);
          }
          list.append(item);
        }
        aside.append(list);
        root.append(style, aside);
        return;
      }
      const viewport = document.createElement("div");
      viewport.className = "viewport";
      const track = document.createElement("div");
      track.className = "track";
      track.style.setProperty("--portfolio-strip-speed", `${speed}s`);
      const keepFocusedLinkVisible = (link) => {
        const viewportBounds = viewport.getBoundingClientRect();
        const linkBounds = link.getBoundingClientRect();
        const transform = getComputedStyle(track).transform;
        const values = transform.slice(transform.indexOf("(") + 1, -1).split(",").map(Number);
        const offset = transform.startsWith("matrix3d") ? values[12] : values[4];
        const currentOffset = Number.isFinite(offset) ? offset : 0;
        let correction = 0;
        if (linkBounds.left < viewportBounds.left + 16) {
          correction = viewportBounds.left + 16 - linkBounds.left;
        } else if (linkBounds.right > viewportBounds.right - 16) {
          correction = viewportBounds.right - 16 - linkBounds.right;
        }
        track.style.animation = "none";
        track.style.transform = `translateX(${currentOffset + correction}px)`;
      };
      const resumeAfterFocus = (nextTarget) => {
        if (nextTarget instanceof Node && viewport.contains(nextTarget)) return;
        track.style.removeProperty("animation");
        track.style.removeProperty("transform");
      };
      const createList = (duplicate) => {
        const list = document.createElement("ul");
        if (duplicate) {
          list.className = "duplicate";
          list.setAttribute("aria-hidden", "true");
        }
        for (const project of projects) {
          const item = document.createElement("li");
          const link = document.createElement("a");
          link.href = withReferralSource(project.url, currentProject);
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.textContent = project.name;
          link.title = project.description || project.name;
          link.setAttribute("aria-label", `${project.name} (opens in a new tab)`);
          if (duplicate) link.tabIndex = -1;
          else {
            link.addEventListener("focus", () => keepFocusedLinkVisible(link));
            link.addEventListener("blur", (event) => resumeAfterFocus(event.relatedTarget));
          }
          const dot = document.createElement("span");
          dot.className = "dot";
          dot.setAttribute("aria-hidden", "true");
          dot.textContent = "\xB7";
          item.append(link, dot);
          list.append(item);
        }
        return list;
      };
      track.append(createList(false), createList(true));
      viewport.append(track);
      aside.append(viewport);
      root.append(style, aside);
    }
    async revalidate() {
      const catalogUrl = this.getAttribute("catalog-url") ?? DEFAULT_CATALOG_URL;
      if (!catalogUrl) return;
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      try {
        const response = await fetch(catalogUrl, {
          signal: controller.signal,
          headers: { accept: "application/json" },
          cache: "force-cache"
        });
        if (!response.ok) return;
        const projects = normalizeProjects(await response.json());
        if (projects.length > 0) {
          this.projects = projects;
          this.render();
        }
      } catch {
      } finally {
        window.clearTimeout(timeout);
      }
    }
  }
  customElements.define(PORTFOLIO_PROJECT_STRIP_TAG, PortfolioProjectStripElement);
}
registerPortfolioProjectStrip();
  const script = document.currentScript;
  const mount = (authoredHost) => {
    if (!script || script.dataset.auto === 'false') return;
    const host = authoredHost instanceof HTMLElement && authoredHost.localName === 'fleet-footer-extension'
      ? authoredHost : document.querySelector('fleet-footer-extension');
    if (script.dataset.hostOnly === 'true' && !host) return;
    if (host?.querySelector('portfolio-project-strip') || (!host && document.querySelector('portfolio-project-strip'))) return;
    const strip = document.createElement('portfolio-project-strip');
    if (script.dataset.project) strip.setAttribute('current-project', script.dataset.project);
    if (script.dataset.label) strip.setAttribute('label', script.dataset.label);
    if (script.dataset.theme) strip.setAttribute('theme', script.dataset.theme);
    if (script.dataset.speed) strip.setAttribute('speed', script.dataset.speed);
    if (script.dataset.layout) strip.setAttribute('layout', script.dataset.layout);
    if (host) { strip.slot = 'projects'; host.append(strip); }
    else document.body.append(strip);
  };
  document.addEventListener('footer-connect', (event) => {
    const host = event.target;
    if (host instanceof HTMLElement && host.localName === 'fleet-footer-extension' &&
        script?.dataset.project && host.dataset.fleetFooterProject === script.dataset.project) mount(host);
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
})();