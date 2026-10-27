import { site } from './site';

export type AboutPart = { text: string; emphasis?: boolean; href?: string };
export const aboutParagraphs: AboutPart[][] = [
  [
    { text: `I'm ${site.name}, an ` },
    { text: site.role.toLowerCase(), emphasis: true },
    {
      text: ` based in ${site.location}. I work on the layer most people never see — the backend services, data pipelines and infrastructure that decide whether a product is fast, reliable and affordable to run.`,
    },
  ],
  [
    { text: 'I spent three years at ' },
    { text: 'Front.Page', emphasis: true },
    {
      text: " (YC S'21), where the backend had to grow up fast: I built a real-time market-data pipeline on Go and Kafka that helped carry daily actives from ",
    },
    { text: '15k to 200k in 14 weeks', emphasis: true },
    { text: '. From there the work moved into ' },
    { text: 'AI infrastructure', emphasis: true },
    {
      text: ' — vector-powered personalized feeds with BERT embeddings and Milvus, and a family of RAG agents whose moderation bot cut human intervention in support queries by 90%.',
    },
  ],
  [
    { text: "Today I'm at " },
    { text: 'Vault Wealth', emphasis: true },
    {
      text: ' (Peak XV-backed), building financial-planning services and the durable, Temporal-backed workflows underneath them — because in wealth management, a workflow that fails halfway is worse than one that never ran.',
    },
  ],
  [
    {
      text: 'I care most about the unglamorous things: the timeout, the retry, the backpressure, the migration that has to run while the system stays up. Good infrastructure is mostly the failure modes you handled before anyone noticed.',
    },
  ],
  [
    {
      text: 'Outside the day job I build constantly — developer tools, full-stack apps, a few games — and most of it is open source on ',
    },
    { text: 'my projects page', href: '/projects' },
    { text: '.' },
  ],
];

export const toolbox = [
  { group: 'Languages', items: ['Go', 'TypeScript', 'JavaScript', 'Python'] },
  {
    group: 'Backend',
    items: ['Node.js', 'REST APIs', 'Protocol Buffers', 'Microservices'],
  },
  {
    group: 'Distributed & Real-time',
    items: ['Apache Kafka', 'Temporal', 'Socket.io', 'Queue batching'],
  },
  {
    group: 'AI / LLM',
    items: ['RAG', 'OpenAI APIs', 'BERT embeddings', 'Milvus', 'GPT'],
  },
  {
    group: 'Data',
    items: [
      'MySQL',
      'PostgreSQL',
      'Redis',
      'ClickHouse',
      'Elasticsearch',
      'BigQuery',
    ],
  },
  {
    group: 'Cloud & DevOps',
    items: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Prometheus'],
  },
];
