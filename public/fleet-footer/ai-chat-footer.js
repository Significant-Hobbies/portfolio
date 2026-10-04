(() => {
  'use strict';

  const AUTO_CAPTURE_KINDS = {"codevetter":"newsletter","pace":"newsletter","posttrainllm":"newsletter","live":"newsletter","saas-maker":"newsletter","gitstat":"newsletter","email-manager":"newsletter","chatgpt-memory-insights":"newsletter","free-ai":"newsletter","high-signal":"newsletter","on-record":"newsletter","issue-pages":"newsletter","research-papers":"newsletter","knowledge-base":"newsletter","significanthobbies":"newsletter","anime-list":"newsletter","looptv":"newsletter","reader":"newsletter","swe-interview-prep":"newsletter","calorie":"newsletter","setline":"newsletter","kith":"newsletter","ios-landings":"newsletter","rolepatch":"newsletter","karte":"newsletter","starboard":"newsletter","ai-game":"newsletter","app-health":"newsletter","mashup":"newsletter","motion":"newsletter","open-historia":"newsletter","ph-catalog":"newsletter","web-playables":"newsletter","what-it-takes-to-win":"newsletter","sarthakagrawal-personal":"newsletter","reddit-insights":"newsletter","anchor":"newsletter","nomad-data-adventure":"newsletter","storagedaddy":"newsletter","browserdaddy":"newsletter","performancedaddy":"newsletter","meme-lab":"newsletter","nutrition-formula-engine":"newsletter","every-song-is-a-website":"newsletter","contextdaddy":"newsletter","mentionpilot":"newsletter","daddyrad":"newsletter"};
  const FOOTER_ART = {"codevetter":{"src":"/footer-art/codevetter.webp","width":2172,"height":724,"alt":"Finely drawn dark verification bench with task and change folios, a central bounded execution chamber, and retained evidence to the right.","focalX":50,"focalY":50,"credit":"Original illustration for CodeVetter","sha256":"36588b9c1d0a02b0b04b0d8e9cbeb9661440b2927d7e9a12f7b6a0e176fae910"},"pace":{"src":"/footer-art/pace.webp","width":2170,"height":725,"alt":"HeyPace: A quiet personal voice-assistance desk centers a microphone beside an unbranded monitor and empty chair. A short blue physical ribbon links voice to the visible workspace; a lamp, folded note and small local tools complete the wings.","focalX":50,"focalY":50,"credit":"Original illustration for HeyPace","sha256":"bd1345b1c0e70d17bfa143564ccd89b21781185664dc1b90f9be1727908a9b8d"},"posttrainllm":{"src":"/footer-art/posttrainllm.webp","width":2170,"height":725,"alt":"PostTrainLLM: A specialist-model recipe atelier centers a measured recipe tray and paired comparison samples. Sorted local material enters a modest experimental apparatus; a comparison notebook and source cabinet remain distinct at the wings.","focalX":50,"focalY":50,"credit":"Original illustration for PostTrainLLM","sha256":"63c2514f2a3e4e225277cda029a8cc990836ca91c53e213b418b0f4a12040f7c"},"live":{"src":"/footer-art/live.webp","width":2170,"height":725,"alt":"Live: An inhabited life atlas centers a reachable path junction beside an open blank possibility list. One chosen gold footpath leads toward modest activities: a garden, workshop and distant lookout. The illustration invites a next move without depicting completed achievements.","focalX":50,"focalY":50,"credit":"Original illustration for Live","sha256":"3db0af1bc73641894adbaf7ca36fdd01c23a289abd70f31d9deddd024bbc95c0"},"saas-maker":{"src":"/footer-art/saas-maker.webp","width":2170,"height":725,"alt":"SaaS Maker: A product studio courtyard centers an active craft table where small software-inspired models are made and inspected. Varied finished and unfinished models occupy a quiet exhibition shelf; useful tools remain on the outer workbenches.","focalX":50,"focalY":50,"credit":"Original illustration for SaaS Maker","sha256":"f2a322b87d983ad130458cf2bb1117fd4caa91aca7686988265eaf5d605ed528"},"gitstat":{"src":"/footer-art/gitstat.webp","width":2171,"height":724,"alt":"GitStat: A contribution-history weaving station centers a loom. Distinct repository threads enter it from separate spools and form a chronological fabric while preserving their individual routes. A folded timeline rests beside the loom.","focalX":50,"focalY":50,"credit":"Original illustration for GitStat","sha256":"86458fee72b8d765c773dedfaf5bdb235ef80dd82d6fe024ef341a6483450eff"},"email-manager":{"src":"/footer-art/email-manager.webp","width":2169,"height":725,"alt":"Kinetic: A deliberate inbox sorting desk centers one selected sealed envelope and a hand-operated review tray. Different sender-sized envelope groups occupy the wings; no sender identity or message content is visible.","focalX":50,"focalY":50,"credit":"Original illustration for Kinetic","sha256":"608d95ab7e52b1aa43650828a4f2032bdc5bef686a715ea573931595594aeaa9"},"chatgpt-memory-insights":{"src":"/footer-art/chatgpt-memory-insights.webp","width":2171,"height":724,"alt":"Memory Map: A cool cartography workshop centers an open transit-like atlas and a source slip physically connected to one route. A boxed conversation archive and folded map margins occupy the wings. It is analytical mapping rather than warm nostalgia stationery.","focalX":50,"focalY":50,"credit":"Original illustration for Memory Map","sha256":"f546bcbf4be31048005badd75e8d9583df38a79dfcfab7c5c1d5f086808260b7"},"free-ai":{"src":"/footer-art/free-ai.webp","width":2172,"height":724,"alt":"Free AI: A small routing junction centers one request parcel and a manual track switch. Several bounded tracks lead to modest endpoints; an obvious alternative bypasses one closed gate without promising unlimited throughput.","focalX":50,"focalY":50,"credit":"Original illustration for Free AI","sha256":"26a88d2ef0d56bd1cd3a8f974faf4de0b73fc7a737242b22db53c45070f855a8"},"high-signal":{"src":"/footer-art/high-signal.webp","width":2171,"height":724,"alt":"High Signal: A signal-watch desk centers one daily sheet whose physical source ribbons remain visible. Scattered public-source slips pass through a narrow sorting aperture; a restrained tuning instrument and loose paper occupy the wings.","focalX":50,"focalY":50,"credit":"Original illustration for High Signal","sha256":"073b92cd7e9d6e90a77f21c46aad762544406b606019fc4c40ecb898ae528bf2"},"on-record":{"src":"/footer-art/on-record.webp","width":2171,"height":724,"alt":"High Signal Podcasts: An oral-history research room centers a claim card connected to its source reel. A microphone, attribution slips and referenced books remain distinct around it, emphasizing source-linked claims rather than a podcast directory.","focalX":50,"focalY":50,"credit":"Original illustration for High Signal Podcasts","sha256":"10ab36994c185216c85d76ed31664227ba1a6f49e65af28e82a7822cb5c82171"},"issue-pages":{"src":"/footer-art/issue-pages.webp","width":2171,"height":724,"alt":"IssuePages: A modest publishing press centers a folded issue sheet and deliberate approval lever. The sheet moves toward an openly readable display stand; a plain source folio sits on the other side. Keep the apparatus small and ordinary.","focalX":50,"focalY":50,"credit":"Original illustration for IssuePages","sha256":"3bbaf28600b6060aa4911d09fa6ac7383d6c3b79e30f9b3ca61ae3a102610110"},"research-papers":{"src":"/footer-art/research-papers.webp","width":2169,"height":725,"alt":"Research Papers: A research reading gallery centers one open paper under a study lamp, with a visible citation thread leading back to its scholarly shelf. Indexed volumes, a magnifier and restrained specimen trays frame the study area.","focalX":50,"focalY":50,"credit":"Original illustration for Research Papers","sha256":"709c788faeb58d1de55ec50b53e35eb1b57a05754eccc499334c2e577e0a7f6b"},"knowledge-base":{"src":"/footer-art/knowledge-base.webp","width":2169,"height":725,"alt":"Knowledge Base: A private reading vault centers an index drawer retrieving one page while its provenance ribbon stays attached to the source volume. Closed specialist books sit behind a modest privacy partition in the wings.","focalX":50,"focalY":50,"credit":"Original illustration for Knowledge Base","sha256":"418cd23e703c38e823c4f90fd48185ad7e87faeb8a512e9f0059085eaf4d39b2"},"significanthobbies":{"src":"/footer-art/significanthobbies.webp","width":2159,"height":728,"alt":"Significant Hobbies: A shared courtyard centers a common path and table connecting five independent personal rooms. Each room retains a separate doorway and its own interior character; no room's contents flow into another.","focalX":50,"focalY":50,"credit":"Original illustration for Significant Hobbies","sha256":"793590b059e352e9a8a381f3d0074b5994b64e9596cfbc8dde0e1268fc161f3d"},"anime-list":{"src":"/footer-art/anime-list.webp","width":2168,"height":725,"alt":"Anime List: An original animation-club room centers a personal watch shelf and one invented illustrated story card. A projector, original abstract story panels and a seasonal moon-cycle window frame the scene.","focalX":50,"focalY":50,"credit":"Original illustration for Anime List","sha256":"b2370994f1f05837bada8d4bd232dbdf8f809e06da6fa9bac3f5817c188c119e"},"looptv":{"src":"/footer-art/looptv.webp","width":2169,"height":725,"alt":"LoopTV: A calm lean-back screening nook centers one comfortable chair facing a fictional abstract screen. A simple channel selector, unbranded reels and an empty alternate slot show deliberate simplicity and unavailable content without drama.","focalX":50,"focalY":50,"credit":"Original illustration for LoopTV","sha256":"647e371670bb62c6e39c8a843a714a9d2ff3f4001876719a9b63a7c380ba8cb5"},"swe-interview-prep":{"src":"/footer-art/swe-interview-prep.webp","width":2171,"height":724,"alt":"SWE Interview Prep: A practical learning workshop centers a small built artifact and review notebook. Concept sketches, a drill jig and an application folio form a physical sequence in the wings; the journey ends with evidence rather than a trophy.","focalX":50,"focalY":50,"credit":"Original illustration for SWE Interview Prep","sha256":"af4490398f221a4b2d06931416938f53b49195dfc755c9bd22fdd4719b8de795"},"calorie":{"src":"/footer-art/calorie.webp","width":2169,"height":725,"alt":"Calorie: A modest food-journal table centers a fictional meal, transparent measuring vessel and blank daily notebook. Ordinary ingredients and a loose optional marker sit aside, making the journal useful without mandatory targets.","focalX":50,"focalY":50,"credit":"Original illustration for Calorie","sha256":"4ecabb617faef59d62c87543ef02acce505f937eb8b6bf513c5b51b9e00ead74"},"setline":{"src":"/footer-art/setline.webp","width":2172,"height":724,"alt":"Setline: An empty training station centers an authored set card, dumbbell and simple rest timer. A second blank actual-result card remains separate on the bench; the space suggests one set at a time.","focalX":50,"focalY":50,"credit":"Original illustration for Setline","sha256":"75f737ad788ed05fbfde4f0193096f358d959a07130fcab6025639f7fcb0bd64"},"kith":{"src":"/footer-art/kith.webp","width":2170,"height":725,"alt":"Kith: A warm relationship courtyard centers a blank note and the nearest pair of chairs. Additional chosen chairs sit at different comfortable distances; discreet keepsake boxes suggest remembered moments without a social feed.","focalX":50,"focalY":50,"credit":"Original illustration for Kith","sha256":"c765483ebe2957edea7c90b5abd7e3db585433e3b7895be8c983070474fd905f"},"rolepatch":{"src":"/footer-art/rolepatch.webp","width":2170,"height":725,"alt":"RolePatch: A careful application-tailoring desk centers a plain resume sheet beside a job-description card, joined by removable revision strips. A source folder and separate review tray occupy the sides, making approval visible before action.","focalX":50,"focalY":50,"credit":"Original illustration for RolePatch","sha256":"0992326235de3d6c14e9f881f1725020f693924d790fb25689aaf181c7093c8b"},"karte":{"src":"/footer-art/karte.webp","width":2170,"height":725,"alt":"Karte: A creator-owned welcome alcove centers a portfolio folio and visitor-question envelope. A restrained gold doorway opens toward public work while a closed drawer keeps private notes separate.","focalX":50,"focalY":50,"credit":"Original illustration for Karte","sha256":"82a259b668d1e6507173483dd10368d0304b6923099a8afeb1b5d2850ca134fb"},"starboard":{"src":"/footer-art/starboard.webp","width":2169,"height":725,"alt":"Starboard: A project-aware charting bench centers an unfinished vessel model beside one deliberately selected tool. A star-chart folio and organized tool cabinet fill the wings; unused tools remain visibly optional.","focalX":50,"focalY":50,"credit":"Original illustration for Starboard","sha256":"69d07d109488dfbc3d3f589f9a880e0c6b4d5b337d895ce700e0b9dc6fccb9b9"},"app-health":{"src":"/footer-art/app-health.webp","width":2169,"height":725,"alt":"App Health: A request-and-event relay station centers a single parcel at an inspection desk. Separate request rails and closed diagnostic drawers remain bounded, distinct from Site Health's whole-portfolio project inventory scene.","focalX":50,"focalY":50,"credit":"Original illustration for App Health","sha256":"d89c904afcbb6b379ecdb0aeb394609af83c63f1703f637dec6df5e5fde08886"},"mashup":{"src":"/footer-art/mashup.webp","width":2170,"height":725,"alt":"Mashup: A local editing bench centers an assembled filmstrip and cutting surface. Original abstract frames, owned-source reels and retained cut slips surround an editable sequence folio.","focalX":50,"focalY":50,"credit":"Original illustration for Mashup","sha256":"4bd8e37d6d4f21cc22402f8e7450a50afecce0adfe5517a59e2d6a5a55821be5"},"ph-catalog":{"src":"/footer-art/ph-catalog.webp","width":2172,"height":724,"alt":"Finely drawn research cabinet containing original product objects and separate source cards, with a central structured folio and separate annotation slip.","focalX":50,"focalY":50,"credit":"Original illustration for PH Catalog","sha256":"ca1786d2519cfafa52e2ff7ba5faecb41407f93c230b092b7c55a5febbceb945"},"web-playables":{"src":"/footer-art/web-playables.webp","width":2169,"height":725,"alt":"Web Playables: A browser-game packaging workshop centers an original miniature level and save capsule. Distinct playable-world props sit in open frames beside an offline travel case and modest packaging tools.","focalX":50,"focalY":50,"credit":"Original illustration for Web Playables","sha256":"75ee5d1549bebbc3507e5e945c3a93ad88befbdce46982bbee0c35d592ac9bc8"},"what-it-takes-to-win":{"src":"/footer-art/what-it-takes-to-win.webp","width":2170,"height":725,"alt":"Paths: A landscape of unequal starting conditions centers a route fork and comparison folio. Paths from varied shelters meet obstacles and reach different ordinary vantage points; there is no crowned winner.","focalX":50,"focalY":50,"credit":"Original illustration for Paths","sha256":"7d3ad09814045ad9fc23bec710750cbad0591721ee31d4ed1439d89ed965cff6"},"sarthakagrawal-personal":{"src":"/footer-art/sarthakagrawal-personal.webp","width":2171,"height":724,"alt":"Sarthak Agrawal: A personal maker's workroom centers a selected-work folio and writing notebook. A few original project studies, a restrained bookshelf and useful craft tools show work without inventing a portrait or biography.","focalX":50,"focalY":50,"credit":"Original illustration for Sarthak Agrawal","sha256":"cfb1f34a025880332ad02bbbb617ce8ccd427073391e203ac92bcb56d6d72462"},"reddit-insights":{"src":"/footer-art/reddit-insights.webp","width":2172,"height":724,"alt":"Reddit Insights: A community research bulletin board centers one unlettered day folder with a source-linked discussion card inside its boundary. Separate community drawers and empty unobserved-day slots make captured scope visible.","focalX":50,"focalY":50,"credit":"Original illustration for Reddit Insights","sha256":"bf2ac20dedbae952868f879468c851773f0dc40291a43376990f3608fe1f950b"},"anchor":{"src":"/footer-art/anchor.webp","width":2171,"height":724,"alt":"Anchor: A day-planning terrace centers the crossing between a planned stepping-stone path and a real-life detour. A pause bench, simple clock, task tokens and end-of-day notebook make interruptions ordinary.","focalX":50,"focalY":50,"credit":"Original illustration for Anchor","sha256":"efcbdc055f2e6aa2fd4822868019c132a5bb27125ce90641cae8919954ef9926"},"nomad-data-adventure":{"src":"/footer-art/nomad-data-adventure.webp","width":2170,"height":725,"alt":"Nomad Data Adventure: A saved-place comparison table centers two original miniature city landscapes and a comparison foldout. Fictional coast and hill, closed dataset folders and a travel bag show tradeoffs rather than an ideal destination.","focalX":50,"focalY":50,"credit":"Original illustration for Nomad Data Adventure","sha256":"487f4de10060e4594f602009c0fe54e8569fa0753a7d5fde94a648e618f78d30"},"storagedaddy":{"src":"/footer-art/storagedaddy.webp","width":2171,"height":724,"alt":"storagedaddy: A storage cartographer's attic centers a spatial map and magnifier. Developer project crates, ordinary storage parcels and generic build-artifact packages occupy the wings; a separate review basket remains untouched.","focalX":50,"focalY":50,"credit":"Original illustration for storagedaddy","sha256":"9164eb6b49796a5263e6741ca85d51ceec01b42fac68aeb5647f90eb3d3fa8c5"},"browserdaddy":{"src":"/footer-art/browserdaddy.webp","width":2170,"height":725,"alt":"BrowserDaddy: An original tab-carrying guide centers a local archive folio along a history path. A distinct clock alcove represents measured attention separately, framed by quiet forest materials rather than another product's storage boxes.","focalX":50,"focalY":50,"credit":"Original illustration for BrowserDaddy","sha256":"78388a8f3fd4e4e92bc0860de3ce7d03fd231ef9527322912cfe14fa91edbf80"},"performancedaddy":{"src":"/footer-art/performancedaddy.webp","width":2170,"height":725,"alt":"PerformanceDaddy: A calm local diagnostic bench centers one mechanical symptom specimen and an observation lens. Modest measured instruments, process-like gears and port sockets surround a deliberately untouched review-only action handle.","focalX":50,"focalY":50,"credit":"Original illustration for PerformanceDaddy","sha256":"74af2c7952c555a8737187a46fbd6393c7f58bfd2fb9124cbea5fec82909a8d8"},"agent-testing":{"src":"/footer-art/agent-testing.webp","width":2171,"height":724,"alt":"Browser Agent Testing: A compact experiment reading bench centers a retained evidence envelope and two plainly fictional viewport studies. One route folio supplies context; no extra control-room props or active app shell are invented.","focalX":50,"focalY":50,"credit":"Original illustration for Browser Agent Testing","sha256":"9fe38d1d06d641d0d42e79460e68ed02b44f29631d7ebc16a265881567e8ba79"},"contextdaddy":{"src":"/footer-art/contextdaddy.webp","width":2171,"height":724,"alt":"ContextDaddy: An instruction-library workshop centers exposed skill cards in one rack and actual usage receipts in a separate ledger. A small window reveals incomplete observation; provenance tabs and a closed configuration drawer keep boundaries visible.","focalX":50,"focalY":50,"credit":"Original illustration for ContextDaddy","sha256":"81de7c1273d8b842a1456495296807b5310b3998d0f0be16d4a7616596365301"},"daddyrad":{"src":"/footer-art/daddyrad.webp","width":2170,"height":725,"alt":"DaddyRad: A local utility courtyard centers one shared entrance surrounded by four distinct small inspection bays: storage parcels, browsing folios, performance instruments and context cards. Each bay remains bounded and original.","focalX":50,"focalY":50,"credit":"Original illustration for DaddyRad","sha256":"ca705e3d83cb8847aad25b07b61996392b1cdf72c845158a1e5134b39345edc8"},"memory-map":{"src":"/footer-art/chatgpt-memory-insights.webp","width":2171,"height":724,"alt":"Memory Map: A cool cartography workshop centers an open transit-like atlas and a source slip physically connected to one route. A boxed conversation archive and folded map margins occupy the wings. It is analytical mapping rather than warm nostalgia stationery.","focalX":50,"focalY":50,"credit":"Original illustration for Memory Map","sha256":"f546bcbf4be31048005badd75e8d9583df38a79dfcfab7c5c1d5f086808260b7"},"high-signal-podcasts":{"src":"/footer-art/on-record.webp","width":2171,"height":724,"alt":"High Signal Podcasts: An oral-history research room centers a claim card connected to its source reel. A microphone, attribution slips and referenced books remain distinct around it, emphasizing source-linked claims rather than a podcast directory.","focalX":50,"focalY":50,"credit":"Original illustration for High Signal Podcasts","sha256":"10ab36994c185216c85d76ed31664227ba1a6f49e65af28e82a7822cb5c82171"},"portfolio":{"src":"/footer-art/sarthakagrawal-personal.webp","width":2171,"height":724,"alt":"Sarthak Agrawal: A personal maker's workroom centers a selected-work folio and writing notebook. A few original project studies, a restrained bookshelf and useful craft tools show work without inventing a portrait or biography.","focalX":50,"focalY":50,"credit":"Original illustration for Sarthak Agrawal","sha256":"cfb1f34a025880332ad02bbbb617ce8ccd427073391e203ac92bcb56d6d72462"}};
  // src/assets/provider-logos/chatgpt.jpg
var chatgpt_default = "data:image/jpeg;base64,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";

// src/assets/provider-logos/claude.jpg
var claude_default = "data:image/jpeg;base64,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";

// src/assets/provider-logos/gemini.jpg
var gemini_default = "data:image/jpeg;base64,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";

// src/assets/provider-logos/grok.jpg
var grok_default = "data:image/jpeg;base64,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";

// src/assets/provider-logos/perplexity.jpg
var perplexity_default = "data:image/jpeg;base64,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";

// src/providerLogos.ts
var PROVIDER_LOGOS = {
  claude: claude_default,
  chatgpt: chatgpt_default,
  gemini: gemini_default,
  perplexity: perplexity_default,
  grok: grok_default
};

// src/providers.ts
function encode(prompt) {
  return encodeURIComponent(prompt);
}
var buildUrl = {
  claude: (prompt) => `https://claude.ai/new?q=${encode(prompt)}`,
  chatgpt: (prompt) => `https://chatgpt.com/?q=${encode(prompt)}`,
  gemini: (prompt) => `https://gemini.google.com/app?is_sa=1&is_sa_p=${encode(prompt)}`,
  perplexity: (prompt) => `https://www.perplexity.ai/?q=${encode(prompt)}`,
  grok: (prompt) => `https://grok.com/?q=${encode(prompt)}`
};
var DEFAULT_PROMPT_TEMPLATE = "What does {companyName} ({companyUrl}) do, and who is it best for? Keep it concise.";
var DEFAULT_PROVIDERS = [
  "claude",
  "chatgpt",
  "gemini",
  "perplexity",
  "grok"
];
function getProviderUrl(provider, prompt) {
  return buildUrl[provider](prompt);
}

// src/element.ts
var AI_CHAT_FOOTER_TAG = "ai-chat-footer";
var PROVIDER_NAMES = {
  claude: "Claude",
  chatgpt: "ChatGPT",
  gemini: "Gemini",
  perplexity: "Perplexity",
  grok: "Grok"
};
var SVG_NS = "http://www.w3.org/2000/svg";
function createProviderLogo(provider) {
  const image = document.createElement("img");
  image.src = PROVIDER_LOGOS[provider];
  image.alt = "";
  image.setAttribute("aria-hidden", "true");
  image.decoding = "async";
  return image;
}
function createSparkleIcon() {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", "0 0 16 16");
  svg.setAttribute("aria-hidden", "true");
  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute(
    "d",
    "M8 1.5c.35 3.65 2.85 6.15 6.5 6.5-3.65.35-6.15 2.85-6.5 6.5C7.65 10.85 5.15 8.35 1.5 8 5.15 7.65 7.65 5.15 8 1.5Z"
  );
  svg.append(path);
  return svg;
}
function interpolate(template, companyName, companyUrl) {
  return template.replace(/\{companyName\}/g, companyName).replace(/\{companyUrl\}/g, companyUrl);
}
function normalizeProviderIds(value) {
  if (!value) return DEFAULT_PROVIDERS;
  const allowed = new Set(DEFAULT_PROVIDERS);
  const providers = value.split(",").map((provider) => provider.trim().toLowerCase()).filter((provider) => allowed.has(provider));
  return providers.length > 0 ? [...new Set(providers)] : DEFAULT_PROVIDERS;
}
function registerAIChatFooter() {
  if (typeof window === "undefined" || customElements.get(AI_CHAT_FOOTER_TAG)) return;
  class AIChatFooterElement extends HTMLElement {
    static observedAttributes = [
      "company-name",
      "company-url",
      "product-name",
      "product-url",
      "label",
      "prompt",
      "providers",
      "theme",
      "layout",
      "question-placeholder"
    ];
    questionValue;
    questionContext = "";
    connectedCallback() {
      this.render();
    }
    attributeChangedCallback(_name, previous, next) {
      if (previous !== next && this.isConnected) this.render();
    }
    render() {
      const companyName = this.getAttribute("product-name") || this.getAttribute("company-name") || "this product";
      const companyUrl = this.getAttribute("product-url") || this.getAttribute("company-url") || window.location.origin;
      const questionLayout = this.getAttribute("layout") === "question";
      const label = this.getAttribute("label") || (questionLayout ? `Ask AI about ${companyName}` : `Explore ${companyName} with AI`);
      const promptTemplate = this.getAttribute("prompt") || DEFAULT_PROMPT_TEMPLATE;
      const prompt = interpolate(promptTemplate, companyName, companyUrl);
      const questionContext = JSON.stringify([companyName, companyUrl]);
      if (this.questionContext !== questionContext) {
        this.questionValue = void 0;
        this.questionContext = questionContext;
      }
      const question = this.questionValue ?? prompt;
      const providers = normalizeProviderIds(this.getAttribute("providers"));
      const theme = this.getAttribute("theme");
      const root = this.shadowRoot ?? this.attachShadow({ mode: "open" });
      root.replaceChildren();
      const style = document.createElement("style");
      style.textContent = `
        :host {
          --ai-footer-text: inherit;
          --ai-footer-muted: color-mix(in srgb, currentColor 72%, transparent);
          --ai-footer-border: color-mix(in srgb, currentColor 18%, transparent);
          --ai-footer-surface: transparent;
          --ai-footer-control: color-mix(in srgb, currentColor 4%, transparent);
          --ai-footer-focus: #2563eb;
          display: block;
          color: var(--ai-footer-text);
          background: var(--ai-footer-surface);
          font: inherit;
        }
        :host([theme='light']) { color-scheme: light; }
        :host([theme='dark']) { color-scheme: dark; }
        * { box-sizing: border-box; }
        .footer { display: grid; grid-template-columns: minmax(13rem, .72fr) minmax(0, 1.28fr); align-items: center; gap: clamp(1.25rem, 3vw, 3rem); padding: 1.25rem var(--ai-footer-edge, 1.25rem); border-block-start: 1px solid var(--ai-footer-border); }
        :host([integrated]) .footer { border-block-start: 0; }
        p { margin: 0; }
        .intro { display: grid; grid-template-columns: 2.5rem minmax(0, 1fr); align-items: start; gap: .8rem; }
        .signal { display: grid; width: 2.5rem; height: 2.5rem; place-items: center; border: 1px solid var(--ai-footer-border); border-radius: .75rem; background: var(--ai-footer-control); }
        .signal svg { width: 1.15rem; height: 1.15rem; fill: currentColor; }
        .label { margin: 0; font-size: clamp(1rem, 1.4vw, 1.15rem); font-weight: 720; letter-spacing: -.025em; line-height: 1.2; }
        .description { max-width: 36rem; margin-top: .3rem; color: var(--ai-footer-muted); font-size: .78rem; line-height: 1.45; }
        ul { display: flex; flex-wrap: nowrap; justify-content: flex-end; gap: .25rem; margin: 0; padding: 0; list-style: none; }
        a { display: grid; width: 2.75rem; height: 2.75rem; min-height: 2.75rem; place-items: center; padding: .375rem; border: 1px solid transparent; border-radius: .75rem; background: transparent; color: inherit; text-decoration: none; transition: background-color 150ms ease, border-color 150ms ease, transform 150ms ease; }
        a:hover { border-color: var(--ai-footer-border); background: var(--ai-footer-control); transform: translateY(-1px); }
        a:focus-visible { outline: 2px solid var(--ai-footer-focus); outline-offset: 2px; }
        a img { display: block; width: 2rem; height: 2rem; border-radius: .625rem; object-fit: cover; }
        @media (max-width: 1000px) { .footer { grid-template-columns: minmax(0, 1fr); gap: 1rem; } ul { justify-content: flex-start; } }
        :host([layout='compact']) .footer { grid-template-columns: minmax(0, 1fr); gap: 1rem; padding: 0; }
        :host([layout='compact']) ul { flex-wrap: wrap; justify-content: flex-start; }
        :host([layout='question']) { min-width: 0; font-family: var(--fleet-footer-ui-font, inherit); }
        :host([layout='question']) .footer { grid-template-columns: minmax(0, 1fr); align-items: start; gap: .8rem; padding: 0; }
        :host([layout='question']) .intro { display: block; }
        :host([layout='question']) .signal { display: none; }
        :host([layout='question']) .label { font-size: 1rem; font-weight: 600; letter-spacing: -.015em; line-height: 1.4; }
        :host([layout='question']) .description { font-size: .75rem; }
        .question { display: grid; gap: .45rem; min-width: 0; }
        .question span { color: var(--ai-footer-muted); font-family: var(--fleet-footer-label-font, var(--fleet-footer-mono-font, inherit)); font-size: .75rem; line-height: 1.5; }
        textarea { display: block; box-sizing: border-box; width: 100%; min-width: 0; min-height: 5rem; padding: .7rem .8rem; border: 1px solid var(--ai-footer-border); border-radius: .25rem; background: transparent; color: inherit; font: inherit; font-size: 1rem; line-height: 1.55; resize: vertical; }
        textarea::placeholder { color: var(--ai-footer-muted); opacity: 1; }
        textarea:focus-visible { outline: 2px solid var(--ai-footer-focus); outline-offset: 2px; }
        :host([layout='question']) ul { flex-wrap: wrap; justify-content: flex-start; gap: .65rem; }
        @media (prefers-reduced-motion: reduce) { a { transition: background-color 150ms ease, border-color 150ms ease; } a:hover { transform: none; } }
      `;
      const region = document.createElement("aside");
      region.className = "footer";
      region.setAttribute("aria-label", "Ask AI about this product");
      if (theme) region.dataset.theme = theme;
      const intro = document.createElement("div");
      intro.className = "intro";
      const signal = document.createElement("span");
      signal.className = "signal";
      signal.setAttribute("aria-hidden", "true");
      signal.append(createSparkleIcon());
      const copy = document.createElement("div");
      const heading = document.createElement("h2");
      heading.className = "label";
      heading.textContent = label;
      const description = document.createElement("p");
      description.className = "description";
      description.textContent = "Open a pre-filled question in a new tab with the assistant you already use.";
      copy.append(heading, description);
      intro.append(signal, copy);
      region.append(intro);
      let textarea;
      if (questionLayout) {
        const field = document.createElement("label");
        field.className = "question";
        const fieldLabel = document.createElement("span");
        fieldLabel.textContent = "Your question";
        textarea = document.createElement("textarea");
        textarea.rows = 3;
        textarea.maxLength = 2e3;
        textarea.value = question;
        textarea.placeholder = this.getAttribute("question-placeholder") || "Ask a question about this product\u2026";
        field.append(fieldLabel, textarea);
        region.append(field);
      }
      const list = document.createElement("ul");
      const providerLinks = [];
      for (const provider of providers) {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = getProviderUrl(provider, questionLayout ? question : prompt);
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.dataset.aiProvider = provider;
        link.title = PROVIDER_NAMES[provider];
        link.setAttribute(
          "aria-label",
          `Ask ${PROVIDER_NAMES[provider]} about ${companyName} (opens in a new tab)`
        );
        link.append(createProviderLogo(provider));
        item.append(link);
        list.append(item);
        providerLinks.push([provider, link]);
      }
      textarea?.addEventListener("input", () => {
        if (!textarea) return;
        this.questionValue = textarea.value;
        for (const [provider, link] of providerLinks) {
          link.href = getProviderUrl(provider, this.questionValue);
        }
      });
      region.append(list);
      root.append(style, region);
    }
  }
  customElements.define(AI_CHAT_FOOTER_TAG, AIChatFooterElement);
}
registerAIChatFooter();

  (function registerFleetFooter() {
  if (typeof window === 'undefined' || customElements.get('fleet-footer-extension')) return;
  // All helpers stay inside this function: hosted endpoints serialize its source.
  const safeFontBase = (raw) => {
    try {
      const url = new URL(
        raw || 'https://sassmaker.com/fonts/fleet-footer-precise-v1/',
        window.location.href
      );
      if (
        url.username ||
        url.password ||
        url.search ||
        url.hash ||
        !['http:', 'https:'].includes(url.protocol) ||
        (url.origin !== window.location.origin && url.origin !== 'https://sassmaker.com')
      )
        return null;
      if (!url.pathname.endsWith('/')) url.pathname += '/';
      return url.href;
    } catch {
      return null;
    }
  };
  const fontRegistry = (base) => {
    let key = 2166136261;
    for (const character of base) key = Math.imul(key ^ character.charCodeAt(0), 16777619) >>> 0;
    const suffix = key.toString(16);
    const families = {
      ui: `FleetGeist-${suffix}`,
      mono: `FleetGeistMono-${suffix}`,
      signature: `FleetNewsreader-${suffix}`,
    };
    if (!document.head.querySelector(`[data-fleet-footer-fonts="${suffix}"]`)) {
      const style = document.createElement('style');
      style.dataset.fleetFooterFonts = suffix;
      style.textContent = [
        [families.ui, 'geist.woff2', '100 900'],
        [families.mono, 'geistmono.woff2', '400'],
        [families.signature, 'newsreader.woff2', '200 800'],
      ]
        .map(
          ([family, file, weight]) =>
            `@font-face{font-family:"${family}";font-style:normal;font-weight:${weight};font-display:swap;src:url(${JSON.stringify(new URL(file, base).href)}) format("woff2")}`
        )
        .join('\n');
      document.head.append(style);
    }
    return families;
  };
  class FleetFooterExtension extends HTMLElement {
    static observedAttributes = [
      'product-name',
      'signature-name',
      'signature-font',
      'font-base',
      'fonts',
      'art-src',
      'art-alt',
      'art-width',
      'art-height',
      'art-position',
      'art-credit',
      'theme',
      'surface',
      'show-updates',
      'capture-status',
    ];
    connectedCallback() {
      this.resolveNativeCanvas();
      if (!this.shadowRoot) this.build();
      this.update();
      queueMicrotask(() => {
        if (this.isConnected)
          this.dispatchEvent(new CustomEvent('footer-connect', { bubbles: true, composed: true }));
      });
    }
    attributeChangedCallback(name) {
      if (this.shadowRoot) {
        if (name === 'theme') this.resolveNativeCanvas();
        this.update();
      }
    }
    resolveNativeCanvas() {
      // Only background color, at most eight ancestors; no content/data collection.
      let color;
      let node = this;
      for (let depth = 0; node && depth < 8; depth++, node = node.parentElement) {
        if (typeof window.getComputedStyle !== 'function') break;
        const candidate = window.getComputedStyle(node).backgroundColor;
        const match = /^rgba?\(([^)]+)\)$/.exec(candidate || '');
        if (!match) continue;
        const components = match[1].split(/[\s,/]+/).filter(Boolean);
        if (components.length === 3 || (components.length === 4 && Number(components[3]) === 1)) {
          color = candidate;
          break;
        }
      }
      this.style.setProperty(
        '--fleet-footer-native-canvas',
        color || (this.getAttribute('theme') === 'dark' ? '#171717' : '#fafaf9')
      );
    }
    build() {
      const root = this.attachShadow({ mode: 'open' });
      const style = document.createElement('style');
      style.textContent = `
        :host{--fleet-footer-canvas:var(--fleet-footer-native-canvas,#fafaf9);--fleet-footer-lower:var(--fleet-footer-canvas);--fleet-footer-ui-font:var(--fleet-footer-loaded-ui,system-ui,sans-serif);--fleet-footer-mono-font:var(--fleet-footer-loaded-mono,ui-monospace,monospace);--fleet-footer-label-font:var(--fleet-footer-mono-font);--fleet-footer-border:color-mix(in srgb,currentColor 18%,transparent);--fleet-footer-muted:color-mix(in srgb,currentColor 78%,transparent);--fleet-footer-focus:currentColor;display:block;width:100%;min-width:0;color:inherit;font:14px/1.55 var(--fleet-footer-ui-font);font-synthesis:none;border-block-start:1px solid var(--fleet-footer-border)}
        :host([theme=dark]){color-scheme:dark}:host([theme=light]){color-scheme:light}
        *{box-sizing:border-box}[hidden]{display:none!important}
        .frame{width:calc(100% - 2 * var(--fleet-footer-edge,3.5rem));max-width:var(--fleet-footer-max-width,83rem);margin-inline:auto;min-width:0}
        .plane{background:linear-gradient(180deg,var(--fleet-footer-canvas,transparent) 0%,var(--fleet-footer-canvas,transparent) 51%,var(--fleet-footer-lower,var(--fleet-footer-canvas,transparent)) 82%)}
        .middle{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(0,1fr);gap:clamp(2rem,6vw,5.5rem);align-items:start;padding-block:2.25rem 4.8rem;position:relative;z-index:2}
        .product,.services,.navigation,.cta,.feedback,.ai,.capture{min-width:0}.cta{margin-block-end:1.5rem}.feedback{margin-block-start:1.25rem}
        .capture{border-block-start:1px solid var(--fleet-footer-border);margin-block-start:1.5rem;padding-block-start:1.5rem}
        .capture-heading{font:600 1rem/1.35 var(--fleet-footer-ui-font);letter-spacing:-.015em;margin:0 0 .75rem}
        .service-status{font-size:.8rem;line-height:1.5;color:var(--fleet-footer-muted);margin:0}
        button{font:500 .8rem/1.4 var(--fleet-footer-ui-font);color:inherit;background:transparent;border:1px solid var(--fleet-footer-border);min-height:44px;padding:.5rem .8rem;margin-block-start:.6rem;cursor:pointer}
        button:focus-visible{outline:2px solid var(--fleet-footer-focus);outline-offset:4px}
        .terminal{position:relative;isolation:isolate;height:var(--fleet-footer-art-height,clamp(27rem,39vw,35rem));margin-block-start:-3.75rem;overflow:hidden;background:var(--fleet-footer-lower,var(--fleet-footer-canvas,transparent))}
        figure{position:absolute;inset:0;margin:0;z-index:-2}.art{display:block;width:100%;height:100%;max-width:none;object-fit:cover;object-position:50% 58%}
        .terminal::before{content:'';position:absolute;inset:0;z-index:-1;pointer-events:none;background:linear-gradient(180deg,var(--fleet-footer-lower,var(--fleet-footer-canvas,transparent)) 0%,color-mix(in srgb,var(--fleet-footer-lower,var(--fleet-footer-canvas,transparent)) 99%,transparent) 16%,color-mix(in srgb,var(--fleet-footer-lower,var(--fleet-footer-canvas,transparent)) 82%,transparent) 30%,color-mix(in srgb,var(--fleet-footer-lower,var(--fleet-footer-canvas,transparent)) 24%,transparent) 45%,transparent 57%)}
        .signature{padding-block-start:1rem;pointer-events:none}.wordmark{font:600 var(--fleet-footer-signature-size,clamp(3rem,10vw,8.25rem))/1.04 var(--fleet-footer-signature-font,var(--fleet-footer-ui-font));letter-spacing:-.045em;margin:0;max-width:100%;overflow-wrap:anywhere;font-optical-sizing:auto}
        .terminal[data-serif] .wordmark{font-family:var(--fleet-footer-signature-font,var(--fleet-footer-loaded-signature,Georgia,serif));font-size:var(--fleet-footer-signature-size,clamp(4.125rem,14vw,12.5rem));font-weight:400;line-height:1}
        .terminal[data-no-art]{height:auto!important;padding-block-end:2.5rem}.terminal[data-no-art]::before{display:none}
        .art-fallback{margin:0;padding:2rem var(--fleet-footer-edge,3.5rem);position:absolute;inset-block-start:45%;color:var(--fleet-footer-muted);font-size:.875rem}
        .studio{background:var(--fleet-footer-canvas,transparent);padding-block:.5rem;min-width:0}.projects{min-width:0;width:100%}
        ::slotted(*){min-width:0;max-width:100%;font-family:var(--fleet-footer-ui-font)}::slotted([slot=projects]){display:block;width:100%;--portfolio-strip-ui-font:var(--fleet-footer-ui-font);--portfolio-strip-edge:var(--fleet-footer-edge,3.5rem)}
        :host([surface=app]) .middle{padding-block-start:1.5rem}:host([surface=app]) .cta{display:none}:host([surface=app]) .terminal{height:var(--fleet-footer-app-art-height,25.3rem)}:host([surface=app]) .wordmark{font-size:var(--fleet-footer-app-signature-size,3.75rem)}:host([surface=app]) .terminal[data-serif] .wordmark{font-size:var(--fleet-footer-app-signature-size,4.75rem)}
        @media(max-width:1050px){.frame{width:calc(100% - 4rem)}.middle{gap:2.8rem}::slotted([slot=projects]){--portfolio-strip-edge:2rem}}
        @media(max-width:760px){.frame{width:calc(100% - 2.5rem)}.middle{grid-template-columns:minmax(0,1fr);gap:2rem;padding-block-start:1.6rem}.terminal{height:var(--fleet-footer-mobile-art-height,23.75rem)}.wordmark{font-size:var(--fleet-footer-mobile-signature-size,3.25rem)}.terminal[data-serif] .wordmark{font-size:var(--fleet-footer-mobile-signature-size,6.125rem)}::slotted([slot=projects]){--portfolio-strip-edge:1.25rem}:host([surface=app]) .terminal{height:var(--fleet-footer-app-mobile-art-height,20.3rem)}:host([surface=app]) .wordmark{font-size:var(--fleet-footer-app-mobile-signature-size,2.6875rem)}:host([surface=app]) .terminal[data-serif] .wordmark{font-size:var(--fleet-footer-app-mobile-signature-size,4.125rem)}}
        @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
      `;
      const make = (tag, className, part) => {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (part) node.setAttribute('part', part);
        return node;
      };
      const makeSlot = (name) => {
        const slot = make('slot');
        slot.name = name;
        slot.addEventListener('slotchange', () => this.update());
        return slot;
      };
      const region = make('section', 'precise', 'root');
      region.setAttribute('aria-label', 'Product help, updates and studio');
      const plane = make('div', 'plane', 'plane');
      const middle = make('div', 'frame middle', 'middle');
      const product = make('div', 'product', 'product');
      const cta = make('div', 'cta', 'cta');
      cta.append(makeSlot('cta'));
      const navigation = make('div', 'navigation', 'navigation');
      navigation.append(makeSlot('navigation'));
      const feedback = make('div', 'feedback', 'feedback');
      feedback.append(makeSlot('feedback'));
      product.append(cta, navigation, feedback);
      const services = make('div', 'services', 'services');
      const ai = make('section', 'ai', 'ai');
      ai.setAttribute('aria-label', 'Ask AI');
      ai.append(makeSlot('ai'));
      const capture = make('section', 'capture', 'capture');
      capture.setAttribute('aria-label', 'Product updates');
      const heading = make('h2', 'capture-heading');
      heading.textContent = 'Product updates';
      const status = make('p', 'service-status', 'capture-status');
      status.setAttribute('role', 'status');
      const retry = make('button', 'retry', 'capture-retry');
      retry.type = 'button';
      retry.textContent = 'Try again';
      retry.addEventListener('click', () =>
        this.dispatchEvent(new CustomEvent('capture-retry', { bubbles: true, composed: true }))
      );
      capture.append(heading, makeSlot('capture'), status, retry);
      services.append(ai, capture);
      middle.append(product, services);
      plane.append(middle);
      const terminal = make('section', 'terminal', 'art-stage');
      terminal.setAttribute('aria-label', 'Product illustration and signature');
      const signature = make('div', 'frame signature', 'signature');
      const wordmark = make('h2', 'wordmark', 'wordmark');
      signature.append(wordmark);
      const figure = make('figure');
      const image = make('img', 'art', 'art');
      image.alt = '';
      image.loading = 'lazy';
      image.decoding = 'async';
      const fallback = make('p', 'art-fallback', 'art-fallback');
      fallback.textContent = 'Illustration unavailable.';
      fallback.hidden = true;
      image.addEventListener('error', () => {
        image.hidden = true;
        fallback.hidden = false;
      });
      image.addEventListener('load', () => {
        image.hidden = false;
        fallback.hidden = true;
      });
      figure.append(image);
      terminal.append(signature, figure, fallback);
      const studio = make('aside', 'studio', 'studio');
      studio.setAttribute('aria-label', 'Other projects from the studio');
      const projects = make('div', 'projects', 'projects');
      projects.append(makeSlot('projects'));
      studio.append(projects);
      // Studio child owns its one caption/three links/All projects. No duplicated frame copy.
      region.append(plane, terminal, studio);
      root.append(style, region);
      const nativeStyle = make('style');
      nativeStyle.dataset.fleetFooterNativeStyles = 'precise';
      nativeStyle.textContent = `
        fleet-footer-extension > [slot="navigation"],fleet-footer-extension > [slot="cta"],fleet-footer-extension > [slot="feedback"]{font-family:var(--fleet-footer-ui-font,var(--fleet-footer-loaded-ui,system-ui,sans-serif))}
        fleet-footer-extension > [slot="navigation"] a,fleet-footer-extension > [slot="navigation"] summary{font-family:var(--fleet-footer-ui-font,var(--fleet-footer-loaded-ui,system-ui,sans-serif));font-size:14px;line-height:1.45;min-height:44px;display:inline-flex;align-items:center}
        fleet-footer-extension > [slot="navigation"] :is(h2,h3,h4,[data-fleet-footer-group-label]){font-family:var(--fleet-footer-label-font,var(--fleet-footer-loaded-mono,ui-monospace,monospace));font-size:12px;font-weight:400;line-height:1.5;letter-spacing:.07em}
        fleet-footer-extension > [slot="navigation"] [data-fleet-footer-primary]{font-size:15px;font-weight:500}
        fleet-footer-extension > [slot="navigation"] [data-fleet-footer-legal]{font-size:12px}
        fleet-footer-extension > [slot="feedback"] button{font-family:var(--fleet-footer-ui-font,var(--fleet-footer-loaded-ui,system-ui,sans-serif));font-weight:500;min-height:44px}
      `;
      this.append(nativeStyle);
    }
    update() {
      const root = this.shadowRoot;
      if (!root) return;
      const assigned = (name) =>
        root.querySelector(`slot[name="${name}"]`).assignedElements().length > 0;
      const base =
        this.getAttribute('fonts') === 'false'
          ? null
          : safeFontBase(this.getAttribute('font-base'));
      if (base) {
        const families = fontRegistry(base);
        for (const [role, family] of Object.entries(families))
          this.style.setProperty(
            `--fleet-footer-loaded-${role}`,
            `"${family}",${role === 'mono' ? 'ui-monospace,monospace' : role === 'signature' ? 'Georgia,serif' : 'system-ui,sans-serif'}`
          );
      } else
        for (const role of ['ui', 'mono', 'signature'])
          this.style.removeProperty(`--fleet-footer-loaded-${role}`);
      const name = this.getAttribute('product-name') || 'this product';
      const isAtlas = /^(atlas|ph catalog)$/i.test(name);
      root.querySelector('.wordmark').textContent =
        this.getAttribute('signature-name') || (isAtlas ? 'Atlas' : name);
      const signatureFont = this.getAttribute('signature-font');
      root
        .querySelector('.terminal')
        .toggleAttribute(
          'data-serif',
          signatureFont === 'newsreader' || (!signatureFont && isAtlas)
        );
      if (signatureFont === 'inherit') root.querySelector('.wordmark').style.fontFamily = 'inherit';
      else root.querySelector('.wordmark').style.removeProperty('font-family');
      let url;
      const raw = this.getAttribute('art-src');
      try {
        const parsed = new URL(raw || '', window.location.href);
        if (
          raw &&
          !parsed.username &&
          !parsed.password &&
          ['http:', 'https:'].includes(parsed.protocol)
        )
          url = parsed.href;
      } catch {}
      const image = root.querySelector('.art');
      root.querySelector('figure').hidden = !url;
      root.querySelector('.art-fallback').hidden = !url || !image.hidden;
      if (url && image.getAttribute('src') !== url) {
        image.hidden = false;
        root.querySelector('.art-fallback').hidden = true;
        image.src = url;
      }
      if (!url) image.removeAttribute('src');
      image.alt = this.getAttribute('art-alt') || '';
      for (const [attr, fallback] of [
        ['width', 2172],
        ['height', 724],
      ]) {
        const number = Number(this.getAttribute(`art-${attr}`));
        image.setAttribute(
          attr,
          String(Number.isSafeInteger(number) && number > 0 && number <= 4096 ? number : fallback)
        );
      }
      const position = this.getAttribute('art-position') || '50% 58%';
      image.style.objectPosition =
        /^\d{1,3}(\.\d+)?% \d{1,3}(\.\d+)?%$/.test(position) &&
        position.split(' ').every((value) => parseFloat(value) <= 100)
          ? position
          : '50% 58%';
      root.querySelector('.terminal').toggleAttribute('data-no-art', !url);
      // Credit stays accessible metadata; no tiny overlay caption on busy artwork.
      const credit = this.getAttribute('art-credit');
      if (credit) image.setAttribute('title', credit);
      else image.removeAttribute('title');
      for (const slot of ['cta', 'navigation', 'feedback', 'ai'])
        root.querySelector(`.${slot}`).hidden = !assigned(slot);
      root.querySelector('.product').hidden = !['cta', 'navigation', 'feedback'].some(assigned);
      const hasCapture = assigned('capture');
      const enabled = this.getAttribute('show-updates') === 'true';
      root.querySelector('.capture').hidden = !hasCapture && !enabled;
      root.querySelector('.capture-heading').hidden = hasCapture;
      const status = root.querySelector('.service-status');
      const unavailable = this.getAttribute('capture-status') === 'unavailable';
      status.hidden = hasCapture || !enabled;
      status.textContent = unavailable
        ? 'Signup is unavailable right now.'
        : 'Getting the signup form…';
      root.querySelector('.retry').hidden = hasCapture || !enabled || !unavailable;
      root.querySelector('.services').hidden = !assigned('ai') && !hasCapture && !enabled;
      root.querySelector('.studio').hidden = !assigned('projects');
    }
  }
  customElements.define('fleet-footer-extension', FleetFooterExtension);
})();

  const script = document.currentScript;
  const assetBase = new URL('.', script?.src || 'https://sassmaker.com/ai-chat-footer.js');
  const captureModuleAttempts = new WeakMap();
  const mountCapture = async (extension, strip) => {
    if (extension.dataset.capturePending === 'true' || extension.dataset.captureConfigured === 'true') return;
    const catalogId = strip.getAttribute('current-project');
    if (!catalogId || !/^[a-z0-9-]+$/.test(catalogId)) return;
    const captureKind = AUTO_CAPTURE_KINDS[catalogId];
    const nativeCapture = document.querySelector('saas-maker-newsletter-capture');
    const showUpdates = script.dataset.capture !== 'false' && Boolean(captureKind) && !nativeCapture;
    extension.setAttribute('show-updates', String(showUpdates));
    extension.setAttribute('capture-status', 'loading');
    extension.dataset.capturePending = 'true';
    const controller = new AbortController();
    const configTimeout = window.setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch('https://api.sassmaker.com/v1/capture-config/' + catalogId, {
        headers: { accept: 'application/json' },
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('Capture unavailable');
      const config = await response.json();
      window.clearTimeout(configTimeout);
      if (!config || typeof config.api_key !== 'string' || !/^pk_[a-z0-9]+$/.test(config.api_key)) throw new Error('Capture unavailable');
      if (!extension.isConnected) { extension.setAttribute('capture-status', 'unavailable'); return; }
      mountFeedback(config.api_key, extension);
      if (script.dataset.capture === 'false' || !captureKind || document.querySelector('saas-maker-newsletter-capture')) {
        extension.setAttribute('show-updates', 'false');
        extension.dataset.captureConfigured = 'true';
        return;
      }
      if (!customElements.get('saas-maker-newsletter-capture')) {
        await new Promise((resolve, reject) => {
          const loader = document.createElement('script');
          loader.type = 'module';
          const attempt = captureModuleAttempts.get(extension) || 0;
          loader.src = new URL('newsletter-capture.js', assetBase).href + (attempt ? '?retry=' + attempt : '');
          loader.crossOrigin = 'anonymous';
          let settled = false;
          let timeout;
          const fail = () => {
            if (settled) return;
            settled = true;
            window.clearTimeout(timeout);
            captureModuleAttempts.set(extension, attempt + 1);
            loader.remove();
            reject(new Error('Capture unavailable'));
          };
          timeout = window.setTimeout(fail, 8000);
          loader.onload = () => {
            if (settled) return;
            if (!customElements.get('saas-maker-newsletter-capture')) { fail(); return; }
            settled = true;
            window.clearTimeout(timeout);
            resolve();
          };
          loader.onerror = fail;
          document.head.append(loader);
        });
      }
      if (!extension.isConnected) { extension.setAttribute('capture-status', 'unavailable'); return; }
      if (document.querySelector('saas-maker-newsletter-capture')) {
        extension.setAttribute('show-updates', 'false');
        extension.dataset.captureConfigured = 'true';
        return;
      }
      const capture = document.createElement('saas-maker-newsletter-capture');
      capture.setAttribute('project-key', config.api_key);
      capture.setAttribute('catalog-id', catalogId);
      capture.setAttribute('product-name', script.dataset.name || config.name || catalogId);
      capture.setAttribute('kind', captureKind);
      capture.setAttribute('source', 'fleet-footer');
      capture.setAttribute('privacy-url', 'https://sassmaker.com/privacy');
      capture.setAttribute('layout', 'compact');
      capture.setAttribute('integrated', '');
      if (extension.getAttribute('theme')) capture.setAttribute('theme', extension.getAttribute('theme'));
      capture.slot = 'capture';
      extension.append(capture);
      extension.setAttribute('capture-status', 'ready');
      extension.dataset.captureConfigured = 'true';
    } catch {
      extension.setAttribute('capture-status', 'unavailable');
    } finally { window.clearTimeout(configTimeout); delete extension.dataset.capturePending; }
  };
  const mountFeedback = (apiKey, extension) => {
    if (script.dataset.feedback === 'false' || document.querySelector('[data-saas-maker-feedback-root]')) return;
    const hasExistingWidget = (host) => Array.from(document.querySelectorAll('[data-feedback-widget]'))
      .some((widget) => !host.contains(widget));
    if (hasExistingWidget(document.createElement('div'))) return;
    const host = document.createElement('section');
    host.dataset.saasMakerFeedbackRoot = 'true';
    host.slot = 'feedback';
    host.setAttribute('aria-label', 'Feedback and support');
    const copy = document.createElement('div');
    copy.className = 'saas-maker-feedback-copy';
    const heading = document.createElement('h2');
    heading.textContent = 'Help shape ' + (script.dataset.name || 'this product') + '.';
    const description = document.createElement('p');
    description.textContent = 'Have a question or an idea? Share it here.';
    copy.append(heading, description);
    const launcher = document.createElement('button');
    launcher.type = 'button';
    launcher.dataset.saasMakerFeedbackLauncher = 'true';
    const launcherLabel = 'Send feedback ↗';
    launcher.setAttribute('aria-haspopup', 'dialog');
    launcher.setAttribute('aria-label', 'Send feedback');
    launcher.textContent = launcherLabel;
    const status = document.createElement('span');
    status.className = 'saas-maker-feedback-status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    const widgetRoot = document.createElement('div');
    widgetRoot.dataset.saasMakerFeedbackMount = 'true';
    host.append(copy, launcher, status, widgetRoot);
    const style = document.createElement('style');
    style.dataset.saasMakerFeedbackStyle = 'true';
    style.textContent = "\n  [data-saas-maker-feedback-launcher] {\n    display: inline-flex; min-width: 44px; min-height: 44px; align-items: center; justify-content: center;\n    padding: .65rem 1rem; border: 1px solid color-mix(in srgb, currentColor 18%, transparent);\n    border-radius: .65rem; background: transparent; color: inherit; font: inherit;\n    font-weight: 680; line-height: 1.3; cursor: pointer; text-align: center;\n    transition: background-color 160ms ease, border-color 160ms ease;\n  }\n  [data-saas-maker-feedback-root] { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 1rem; width: min(100% - 2rem, 72rem); margin: 1.25rem auto; padding: 1.25rem; border: 1px solid color-mix(in srgb, currentColor 18%, transparent); border-radius: 1rem; background: color-mix(in srgb, currentColor 4%, transparent); color: inherit; font-family: inherit; font-size: 14px; line-height: 1.45; }\n  [data-saas-maker-feedback-root] .saas-maker-feedback-copy { min-width: 0; }\n  [data-saas-maker-feedback-root] h2 { margin: 0; font-size: clamp(1rem, 2vw, 1.25rem); font-weight: 720; letter-spacing: -.025em; line-height: 1.2; }\n  [data-saas-maker-feedback-root] p { margin: .4rem 0 0; color: color-mix(in srgb, currentColor 76%, transparent); }\n  [data-saas-maker-feedback-launcher]:hover:not([aria-busy='true']) { border-color: color-mix(in srgb, currentColor 36%, transparent); background: color-mix(in srgb, currentColor 6%, transparent); }\n  [data-saas-maker-feedback-launcher]:focus-visible { outline: 2px solid #2563eb; outline-offset: 3px; }\n  [data-saas-maker-feedback-launcher][aria-busy='true'] { cursor: wait; opacity: .75; }\n  [data-saas-maker-feedback-root] .saas-maker-feedback-status { grid-column: 1 / -1; color: #a32929; font: 12px/1.4 system-ui, sans-serif; }\n  [data-saas-maker-feedback-root][slot='feedback'] { display: block; width: 100%; margin: 0; padding: 0; border: 0; background: transparent; }\n  [data-saas-maker-feedback-root][slot='feedback'] h2 { font-size: 1rem; font-weight: 600; line-height: 1.35; }\n  [data-saas-maker-feedback-root][slot='feedback'] [data-saas-maker-feedback-launcher] { width: 100%; margin-block-start: 1rem; }\n  [data-saas-maker-feedback-root][slot='feedback'] .saas-maker-feedback-status { display: block; margin-block-start: .5rem; }\n  @media (max-width: 560px) { [data-saas-maker-feedback-root] { grid-template-columns: minmax(0, 1fr); } [data-saas-maker-feedback-launcher] { width: 100%; } }\n  @media (prefers-reduced-motion: reduce) { [data-saas-maker-feedback-launcher] { transition: none; } }\n";
    document.head.append(style);
    extension.append(host);
    const pageUrl = window.location.origin + window.location.pathname;
    const productTitle = document.title || script.dataset.name || 'Product';
    const options = { apiKey, pageUrl, pageTitle: productTitle };
    let active = true;
    let loading = false;
    let mounted = false;
    let observer;
    let loader;
    const removeLauncher = () => {
      if (!active) return;
      active = false;
      observer?.disconnect();
      loader?.remove();
      window.SaasMakerFeedback?.unmountSharedFooterFeedback?.(widgetRoot);
      host.remove();
      style.remove();
      if (launcher.dataset.activated === 'true') {
        document.querySelector('[data-feedback-widget] .smw-trigger')?.focus();
      }
    };
    const openWidget = () => {
      if (!active || hasExistingWidget(host)) { removeLauncher(); return; }
      const api = window.SaasMakerFeedback;
      if (mounted && typeof api?.openSharedFooterFeedback === 'function') {
        api.openSharedFooterFeedback(widgetRoot, options);
        return;
      }
      if (loading) return;
      if (typeof api?.mountSharedFooterFeedback === 'function') {
        api.mountSharedFooterFeedback(widgetRoot, options);
        mounted = true;
        launcher.textContent = launcherLabel;
        status.textContent = '';
        return;
      }
      loading = true;
      status.textContent = '';
      launcher.setAttribute('aria-busy', 'true');
      launcher.textContent = 'Loading…';
      loader = document.createElement('script');
      loader.src = new URL('feedback-launcher.js', assetBase).href;
      loader.crossOrigin = 'anonymous';
      loader.onload = () => {
        loading = false;
        if (!active || hasExistingWidget(host)) { removeLauncher(); return; }
        const loadedApi = window.SaasMakerFeedback;
        if (typeof loadedApi?.mountSharedFooterFeedback !== 'function') {
          launcher.removeAttribute('aria-busy');
          launcher.textContent = launcherLabel;
          status.textContent = 'Feedback could not load. Try again.';
          loader.remove();
          return;
        }
        loadedApi.mountSharedFooterFeedback(widgetRoot, options);
        mounted = true;
        launcher.removeAttribute('aria-busy');
        launcher.textContent = launcherLabel;
        status.textContent = '';
      };
      loader.onerror = () => {
        loading = false;
        launcher.removeAttribute('aria-busy');
        launcher.textContent = launcherLabel;
        status.textContent = 'Feedback could not load. Try again.';
        loader.remove();
      };
      document.head.append(loader);
    };
    launcher.addEventListener('click', () => {
      launcher.dataset.activated = 'true';
      openWidget();
    });
    observer = new MutationObserver(() => {
      if (active && hasExistingWidget(host)) removeLauncher();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  };
  const mount = (authoredHost) => {
    if (!script || script.dataset.auto === 'false') return;
    const host = authoredHost instanceof HTMLElement && authoredHost.localName === 'fleet-footer-extension'
      ? authoredHost : document.querySelector('fleet-footer-extension');
    if (script.dataset.hostOnly === 'true' && !host) return;
    const footer = host?.querySelector('ai-chat-footer') || document.querySelector('ai-chat-footer') || document.createElement('ai-chat-footer');
    footer.setAttribute('product-name', script.dataset.name || footer.getAttribute('product-name') || document.title || 'this product');
    footer.setAttribute('product-url', script.dataset.url || footer.getAttribute('product-url') || window.location.origin);
    for (const attribute of ['label', 'prompt', 'providers', 'theme', 'layout']) {
      if (script.dataset[attribute]) footer.setAttribute(attribute, script.dataset[attribute]);
    }
    const compose = () => {
      const strip = host?.querySelector('portfolio-project-strip') || document.querySelector('portfolio-project-strip');
      if (!strip || script.dataset.compose === 'false') return false;
      const extension = host || document.createElement('fleet-footer-extension');
      extension.setAttribute('product-name', footer.getAttribute('product-name'));
      if (!extension.hasAttribute('font-base')) extension.setAttribute('font-base', new URL('fonts/fleet-footer-precise-v1/', assetBase).href);
      if (strip.getAttribute('current-project') === 'ph-catalog') {
        extension.setAttribute('signature-name', 'Atlas');
        extension.setAttribute('signature-font', 'newsreader');
      }
      if (script.dataset.surface) extension.setAttribute('surface', script.dataset.surface);
      const theme = script.dataset.theme || footer.getAttribute('theme') || strip.getAttribute('theme');
      if (theme) extension.setAttribute('theme', theme);
      for (const name of ['src', 'alt', 'width', 'height', 'position', 'credit']) {
        const value = script.dataset['art' + name[0].toUpperCase() + name.slice(1)];
        if (value) extension.setAttribute('art-' + name, value);
      }
      const artwork = FOOTER_ART[strip.getAttribute('current-project')];
      if (artwork) {
        const defaults = {
          src: new URL(artwork.src, 'https://sassmaker.com').href,
          alt: artwork.alt,
          width: artwork.width,
          height: artwork.height,
          position: artwork.focalX + '% ' + artwork.focalY + '%',
          credit: artwork.credit,
        };
        for (const [name, value] of Object.entries(defaults)) {
          if (!extension.hasAttribute('art-' + name)) extension.setAttribute('art-' + name, String(value));
        }
      }
      const cta = extension.querySelector('[data-fleet-footer-cta]') || document.querySelector('[data-fleet-footer-cta]');
      const navigation = extension.querySelector('[data-fleet-footer-navigation]') || document.querySelector('[data-fleet-footer-navigation]');
      if (!extension.isConnected) {
        const anchor = cta || navigation;
        if (anchor?.parentElement && !anchor.contains(extension)) anchor.parentElement.insertBefore(extension, anchor);
        else {
          // Legacy insertion position only: unmarked native content is never adopted.
          const capture = document.querySelector('saas-maker-newsletter-capture');
          const pageFooter = capture?.closest('footer') || document.querySelector('footer');
          if (pageFooter?.parentElement) pageFooter.parentElement.insertBefore(extension, pageFooter);
          else if (capture?.parentElement) capture.parentElement.insertBefore(extension, capture);
          else document.body.append(extension);
        }
      }
      for (const [node, slot] of [[cta, 'cta'], [navigation, 'navigation']]) {
        if (!node || node === extension || node.contains(extension)) continue;
        node.slot = slot;
        if (node.parentElement !== extension) extension.append(node);
      }
      footer.setAttribute('integrated', '');
      footer.setAttribute('layout', 'question');
      footer.slot = 'ai';
      strip.setAttribute('integrated', '');
      strip.setAttribute('layout', 'studio');
      if (theme) { footer.setAttribute('theme', theme); strip.setAttribute('theme', theme); }
      strip.slot = 'projects';
      if (footer.parentElement !== extension) extension.append(footer);
      if (strip.parentElement !== extension) extension.append(strip);
      if (extension.dataset.captureRetryBound !== 'true') {
        extension.dataset.captureRetryBound = 'true';
        extension.addEventListener('capture-retry', () => void mountCapture(extension, strip));
        extension.addEventListener('footer-connect', () => void mountCapture(extension, strip));
      }
      void mountCapture(extension, strip);
      return true;
    };
    if (compose()) return;
    if (!footer.isConnected) document.body.append(footer);
    if (script.dataset.compose === 'false') return;
    let stopWaiting = 0;
    const observer = new MutationObserver(() => {
      if (!compose()) return;
      observer.disconnect();
      window.clearTimeout(stopWaiting);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    stopWaiting = window.setTimeout(() => observer.disconnect(), 10000);
  };
  document.addEventListener('footer-connect', (event) => {
    const host = event.target;
    if (host instanceof HTMLElement && host.localName === 'fleet-footer-extension' &&
        script?.dataset.project && host.dataset.fleetFooterProject === script.dataset.project) mount(host);
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
})();