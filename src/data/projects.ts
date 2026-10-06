export type Project = {
  slug: string
  title: string
  period: string
  category: string
  summary: string
  fullDescription: string
  challenge: string
  solution: string
  results: string[]
  tags: string[]
  technologies: string[]
  github?: string
  liveUrl?: string
  featured: boolean
  accent: 'yellow' | 'red' | 'sage' | 'orange' | 'green' | 'white'
  /**
   * Screenshot shown on the card and the case study.
   * Place images in public/images/ — e.g. public/images/project-crypto-aml.jpg
   * If the file is missing the card falls back to the plain accent plate.
   */
  image?: string
}

export const projects: Project[] = [
  {
    slug: 'crypto-aml-blockchain-analytics',
    title: 'Cryptocurrency AML & Blockchain Analytics',
    period: '01/2026 – 06/2026',
    category: 'AI/ML',
    accent: 'green',
    featured: true,
    image: '/images/project-crypto-aml.jpg',
    summary:
      'Blockchain analytics platform for detecting suspicious transactions and money-laundering patterns using DSU-based ETL concurrency, graph analysis, entity resolution, clustering and risk scoring.',
    fullDescription:
      'A blockchain analytics platform built to detect suspicious transactions and money-laundering patterns. Transaction data is ingested and transformed through ETL pipelines that use DSU-based algorithms for concurrency, then analysed as a graph with Neo4j for entity resolution, clustering and risk scoring. I personally presented the finished system to the National Bank of Ethiopia on behalf of INSA, who expressed interest in further collaboration.',
    challenge:
      'Cryptocurrency flows are pseudonymous, high-volume and spread across thousands of addresses. Conventional rule-based monitoring misses multi-hop laundering routes, while naive ETL pipelines collapse under the volume and duplicate the same work across threads.',
    solution:
      'I implemented a Disjoint Set Union based concurrency layer so ETL workers coordinate over shared partitions without redundant work, then modelled addresses and entities as a graph in Neo4j to trace multi-hop relationships. Entity resolution, community clustering and a weighted risk-scoring layer sit on top of the graph, with Python and Web3 handling chain access and MongoDB/MySQL storing intermediate and relational results.',
    results: [
      'Traced multi-hop transaction paths across pseudonymous addresses using graph analytics',
      'DSU-based ETL concurrency removed redundant processing across worker threads',
      'Entity resolution and clustering surfaced linked wallets belonging to one actor',
      'Weighted risk scoring produced reviewable suspicion levels per address',
      'Presented the platform to the National Bank of Ethiopia, who requested further collaboration',
    ],
    tags: ['Python', 'Web3', 'Neo4j', 'Graph Analytics'],
    technologies: ['Python', 'Web3', 'MongoDB', 'Neo4j', 'MySQL', 'DSU', 'ETL', 'Docker'],
    github: 'https://github.com/Y262521/Crypto_AML',
  },
  {
    slug: 'wastina-trust-platform',
    title: 'Wastina Digital Trust Platform',
    period: '11/2025 – Present',
    category: 'Backend',
    accent: 'sage',
    featured: true,
    image: '/images/project-digital-trust.jpg',
    summary:
      'Digital trust and reputation platform for identity verification, digital guarantees and verifiable trust history. Spring Boot, Keycloak, PostgreSQL, Redis and MinIO, containerised with Docker.',
    fullDescription:
      'A digital trust and reputation platform covering identity verification, digital guarantees, employment and rental relationships, and verifiable trust history. I design and optimise the Spring Boot architecture, backed by Keycloak for identity, PostgreSQL for records, Redis for caching and MinIO for document storage, all containerised with Docker. Performance testing with Bombardier has reached 344+ req/s at 29 ms average latency with zero errors in baseline token-auth testing.',
    challenge:
      'Trust data has to be tamper-evident and auditable, yet identity verification and document handling are inherently slow. A naive synchronous design makes every request wait on hashing, storage and third-party identity calls.',
    solution:
      'I kept the critical path synchronous and token authentication tuned so the hot path stays cheap, pushing document and verification work behind Redis-backed caching and MinIO object storage. Containerising the services with Docker made the performance baseline reproducible, and Bombardier gave a repeatable load-test harness to prove each change.',
    results: [
      '344+ requests per second sustained in load testing',
      '29 ms average latency across the baseline token-auth run',
      'Zero errors recorded during baseline performance testing',
      'Verifiable trust history across employment and rental relationships',
      'Dockerised deployment for reproducible environments',
    ],
    tags: ['Spring Boot', 'Keycloak', 'PostgreSQL', 'Docker'],
    technologies: [
      'Spring Boot',
      'Java',
      'Keycloak',
      'PostgreSQL',
      'Redis',
      'MinIO',
      'Docker',
      'Bombardier',
    ],
    github: 'https://github.com/Hakimaj/wastina_trust',
  },
  {
    slug: 'veilwork',
    title: 'VeilWork — Privacy-Preserving Payroll',
    period: '06/2026 – Present',
    category: 'Backend',
    accent: 'red',
    featured: true,
    image: '/images/project-veilwork.jpg',
    summary:
      'Platform for blind collaboration, peer review and escrow-based payroll that keeps workers\u2019 identities and pay rates private, with PII segregation and metadata scrubbing.',
    fullDescription:
      'A production platform for blind collaboration, peer review and escrow-based payroll that keeps workers\u2019 identities and pay rates private from each other. Built on Spring Boot with MySQL, Redis and MinIO, the system enforces PII segregation, scrubs identifying metadata, processes work asynchronously and uses idempotent transactions so payments cannot double-apply. Media uploads go directly to object storage so files never transit application memory.',
    challenge:
      'Blind collaboration only works if the privacy guarantees are structural rather than cosmetic. Pay rates, identities and file metadata leak through side channels \u2014 logs, object keys, error messages \u2014 and escrow payments must be exactly-once.',
    solution:
      'I segregated personally identifiable information behind access-controlled boundaries, scrubbed metadata before anything is persisted, and moved heavy processing onto async workers. Idempotent transactions keyed on the escrow operation make replays harmless, and direct-to-storage uploads keep payload bytes out of the application tier entirely.',
    results: [
      'Worker identities and pay rates kept private through PII segregation',
      'Metadata scrubbing removes identifying traces before persistence',
      'Asynchronous processing keeps slow work off the request path',
      'Idempotent transactions guarantee exactly-once escrow payouts',
      'Direct media uploads to MinIO for scalable, low-memory delivery',
    ],
    tags: ['Spring Boot', 'MySQL', 'Redis', 'MinIO'],
    technologies: ['Spring Boot', 'Java', 'MySQL', 'Redis', 'MinIO', 'Docker'],
    github: 'https://github.com/Hakimaj/VeilWork-',
  },
  {
    slug: 'shop-management-pos-system',
    title: 'Shop Management & POS System',
    period: '07/2026 – 09/2026',
    category: 'Full Stack',
    accent: 'orange',
    featured: true,
    image: '/images/project-shop.jpg',
    summary:
      'React, FastAPI and MySQL system for inventory, sales, payments, cost and profit management \u2014 currently in use by a paying customer.',
    fullDescription:
      'A full-stack shop management and point-of-sale system covering inventory, sales, payments, cost and profit management. Built with React on the front end, FastAPI for services and MySQL for records, then optimised for fast and responsive daily operations. It is currently in active use by a paying customer, which made every optimisation decision a real constraint rather than a guess.',
    challenge:
      'Daily shop operations punish any sluggishness: staff scan, price and check out items in a live queue. Stock counts drift, profit reporting lags, and slow screens stop the till.',
    solution:
      'I modelled inventory, sales, payments and cost as separate concerns so profit can be computed without denormalising the till path, built the API with FastAPI for fast request handling, and tuned the React interface for fast, responsive interaction during real transactions.',
    results: [
      'Currently in production use by a paying customer',
      'Manages inventory, sales, payments, cost and profit in one system',
      'Optimised for fast, responsive daily shop operations',
      'React front end paired with a FastAPI + MySQL backend',
    ],
    tags: ['React', 'FastAPI', 'MySQL', 'Python'],
    technologies: ['React', 'JavaScript', 'FastAPI', 'Python', 'MySQL', 'REST API'],
    github: 'https://github.com/Hakimaj/ShopManagentSystem',
  },
  {
    slug: 'university-complaint-management',
    title: 'University Complaint Management System',
    period: '10/2025 – 11/2025',
    category: 'Full Stack',
    accent: 'yellow',
    featured: false,
    image: '/images/project-complaint.jpg',
    summary:
      'Spring Boot and MySQL platform digitising university complaint submission, routing and resolution with role-based access control and department workflows.',
    fullDescription:
      'A team project that digitised how a university receives, routes and resolves complaints. Built with Spring Boot and MySQL, it handles submission, categorisation, department routing and resolution tracking, with role-based access control deciding who sees and acts on what.',
    challenge:
      'Complaints previously moved through email and paper, so nothing was traceable and departments had no visibility of their queue. Sensitive complaints also required strict access boundaries.',
    solution:
      'We modelled the complaint lifecycle as an explicit workflow with categorisation driving department routing, and layered role-based access control so each role only sees the slice of the pipeline it is responsible for. Every status change is persisted for auditability.',
    results: [
      'Digitised complaint submission, routing and resolution end to end',
      'Role-based access control restricting visibility by role',
      'Complaint categorisation driving automatic department routing',
      'Structured department workflows with persisted status tracking',
    ],
    tags: ['Spring Boot', 'MySQL', 'RBAC'],
    technologies: ['Spring Boot', 'Java', 'MySQL', 'RBAC', 'REST API'],
    github: 'https://github.com/Hakimaj/complaintManagementSystem',
  },
  {
    slug: 'peersupport',
    title: 'PeerSupport \u2014 Anonymous Peer Support App',
    period: '03/2025 \u2013 06/2025',
    category: 'Full Stack',
    accent: 'white',
    featured: false,
    image: '/images/project-peersupport.jpg',
    summary:
      'Empathy-first peer-support platform built around privacy and anonymity, with identity modes, moderated spaces, real-time chat and risk-aware posting.',
    fullDescription:
      'An empathy-first peer-support platform designed around privacy, anonymity and user safety. It offers anonymous, pseudonymous and verified identity modes, moderated community spaces, real-time chat interfaces, crisis resources and risk-aware posting workflows so that someone in distress can reach out without exposing who they are.',
    challenge:
      'People asking for help are often the people least able to risk exposure. A support platform that demands identity up front excludes exactly the users who need it, while completely open spaces leave nowhere safe to talk.',
    solution:
      'I designed around graduated trust: anonymous, pseudonymous and verified modes let each user choose their exposure, moderated spaces keep communities usable, real-time chat handles live support conversations, and risk-aware posting workflows catch posts that suggest immediate danger so crisis resources can be surfaced.',
    results: [
      'Anonymous, pseudonymous and verified identity modes',
      'Moderated community spaces with real-time chat',
      'Risk-aware posting workflows surfacing crisis resources',
      'Privacy-first design that never forces identity disclosure',
    ],
    tags: ['React', 'Spring Boot', 'Real-time Chat', 'Community'],
    technologies: ['React', 'JavaScript', 'Java', 'Spring Boot', 'REST API', 'WebSockets'],
    github: 'https://github.com/Hakimaj/PeerSupport',
  },
]

export const projectCategories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]

export const featuredProjects = projects.filter((p) => p.featured)

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
