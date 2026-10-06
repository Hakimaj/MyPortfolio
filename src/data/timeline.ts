export type TimelineEntry = {
  id: string
  period: string
  location: string
  title: string
  org: string
  kind: 'work' | 'education'
  points: string[]
  tags: string[]
}

/**
 * Chronological CV "Organisations" block. Kept in newest-first order for the
 * vertical timeline on the home page.
 */
export const timeline: TimelineEntry[] = [
  {
    id: 'veilwork',
    period: '06/2026 – Present',
    location: 'Remote',
    title: 'Software Developer',
    org: 'VeilWork',
    kind: 'work',
    points: [
      'Developing a privacy-preserving production platform for blind collaboration, peer review and escrow-based payroll.',
      'Built on Spring Boot with MySQL, Redis and MinIO, enforcing PII segregation and metadata scrubbing.',
      'Async processing, idempotent transactions and direct media uploads keep the platform secure and scalable.',
    ],
    tags: ['Spring Boot', 'MySQL', 'Redis', 'MinIO'],
  },
  {
    id: 'wastina',
    period: '11/2025 – Present',
    location: 'Addis Ababa, Ethiopia',
    title: 'Backend Developer',
    org: 'Wastina Digital Trust Platform',
    kind: 'work',
    points: [
      'Designing and optimising a Spring Boot architecture for a digital trust and reputation platform.',
      'Identity verification, digital guarantees and employment/rental relationships with verifiable trust history.',
      'Performance testing with Bombardier: 344+ req/s, 29 ms average latency, zero errors in baseline token-auth testing.',
    ],
    tags: ['Spring Boot', 'Keycloak', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'insa',
    period: '02/2026 – 06/2026',
    location: 'Addis Ababa, Ethiopia',
    title: 'Emerging Technologies Intern',
    org: 'Information Network Security Administration (INSA)',
    kind: 'work',
    points: [
      'Built a Python FastAPI backend and designed ETL pipelines to process cryptocurrency data.',
      'Used Neo4j graph analytics and DSU clustering to trace multi-hop transactions and detect illicit financial flows.',
      'Presented the resulting AML analytics platform to the National Bank of Ethiopia on behalf of INSA.',
    ],
    tags: ['Python', 'FastAPI', 'Neo4j', 'ETL'],
  },
  {
    id: 'bit',
    period: '01/2023 – Present',
    location: 'Bahirdar, Ethiopia',
    title: 'Computer Engineering Student',
    org: 'Bahir Dar Institute of Technology, Bahir Dar University',
    kind: 'education',
    points: [
      'Fifth-year Computer Engineering student, focused on software development, AI/ML and computer systems.',
      'Experience building projects across frontend, backend, databases and system design.',
      'Coursework and certifications across Java, Python, React, Spring Boot, DevOps and machine learning.',
    ],
    tags: ['Computer Engineering', 'AI/ML', 'Systems'],
  },
]