/** Career timeline — drives the "Trajectory" section on home & /about. */

export type Experience = {
  role: string;
  company: string;
  companyUrl?: string;
  /** Small chip next to the company, e.g. an investor or batch. */
  tag?: string;
  period: string;
  /** Set true for the current role — renders a live "active" indicator. */
  current?: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    role: 'Software Engineer',
    company: 'Vault Wealth',
    tag: 'Peak XV-backed',
    period: 'Feb 2025 — Present',
    current: true,
    summary:
      'Backend services and reliability infrastructure for a wealth-management platform — financial planning, durable workflows, and the systems they run on.',
    highlights: [
      'Built a Financial Planning Service in Go and MySQL, including proprietary logic to compute clients’ financial health scores.',
      'Migrated critical workflows to Temporal, eliminating 90% of unexpected failures and freeing roughly 3 engineering hours every day.',
      'Migrated the web app from MUI to Tailwind and built responsive React components.',
    ],
    stack: ['Go', 'MySQL', 'Temporal', 'React', 'Tailwind'],
  },
  {
    role: 'Software Engineer',
    company: 'Front.Page',
    tag: 'YC S’21',
    period: 'Jan 2022 — Jan 2025',
    summary:
      'Backend and data infrastructure for a fast-growing fintech social product — real-time market data, personalized feeds, and the AI systems layered on top.',
    highlights: [
      'Built a real-time stock-data pipeline with Go, Kafka and Protocol Buffers — supporting DAU growth from 15k to 200k in 14 weeks.',
      'Shipped vector-powered personalized feeds using BERT embeddings, GPT and Milvus, lifting home-feed engagement by 40%.',
      'Built RAG chatbots on OpenAI APIs; the moderation bot cut human intervention in support queries by 90%.',
      'Cut session-refresh DB calls by 92% with queue-based batching and granular session controls; used Redis for O(1) unread-news counts and to cut HTML build+load from 600ms to 60ms.',
      'Integrated the Razorpay payment gateway, opening a new revenue stream and contributing to a 50% increase in overall revenue.',
      'Designed real-time stock ticks over Socket.io with room-based, in-memory and Redis-backed subscription modes.',
    ],
    stack: [
      'Go',
      'Kafka',
      'Node.js',
      'Redis',
      'Milvus',
      'ClickHouse',
      'BigQuery',
    ],
  },
];

/** Education — shown on the /about page. */
export const education = {
  school: 'Manipal Institute of Technology',
  degree: 'B.Tech, Computer Science and Engineering',
  period: 'Aug 2018 — Jul 2022',
};
