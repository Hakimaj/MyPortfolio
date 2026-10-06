export type Skill = {
  name: string
  level: number
  category: string
}

export const skillBarColors: Record<string, string> = {
  Languages: 'bg-neo-yellow',
  Frontend: 'bg-accent-red',
  Backend: 'bg-neo-sage',
  Database: 'bg-accent-orange',
  'AI/ML': 'bg-accent-green',
  Tools: 'bg-neo-white',
}

export const skills: Skill[] = [
  { name: 'Python', level: 92, category: 'Languages' },
  { name: 'Java', level: 86, category: 'Languages' },
  { name: 'JavaScript', level: 88, category: 'Languages' },
  { name: 'TypeScript', level: 80, category: 'Languages' },
  { name: 'SQL', level: 85, category: 'Languages' },

  { name: 'React', level: 90, category: 'Frontend' },
  { name: 'HTML/CSS', level: 92, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 85, category: 'Frontend' },
  { name: 'FastAPI', level: 82, category: 'Frontend' },

  { name: 'Spring Boot', level: 88, category: 'Backend' },
  { name: 'REST API', level: 90, category: 'Backend' },
  { name: 'Node.js', level: 80, category: 'Backend' },
  { name: 'FastAPI Services', level: 84, category: 'Backend' },

  { name: 'MySQL', level: 88, category: 'Database' },
  { name: 'PostgreSQL', level: 82, category: 'Database' },
  { name: 'MongoDB', level: 84, category: 'Database' },
  { name: 'Neo4j', level: 85, category: 'Database' },
  { name: 'Redis', level: 80, category: 'Database' },

  { name: 'Machine Learning', level: 85, category: 'AI/ML' },
  { name: 'Blockchain / Web3', level: 80, category: 'AI/ML' },
  { name: 'Graph Analytics', level: 86, category: 'AI/ML' },
  { name: 'Data Analysis', level: 88, category: 'AI/ML' },

  { name: 'Docker', level: 80, category: 'Tools' },
  { name: 'Git', level: 90, category: 'Tools' },
  { name: 'Keycloak', level: 78, category: 'Tools' },
  { name: 'MinIO', level: 78, category: 'Tools' },
  { name: 'Bombardier', level: 75, category: 'Tools' },
]

export const skillCategories = Array.from(new Set(skills.map((s) => s.category)))

export const stackGroups = [
  {
    title: 'Frontend',
    items: ['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    items: ['Java / Spring Boot', 'Python / FastAPI', 'REST APIs', 'Keycloak', 'Redis'],
  },
  {
    title: 'Data & AI',
    items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Neo4j', 'Graph Analytics'],
  },
  {
    title: 'Platform',
    items: ['Docker', 'MinIO', 'Git', 'Web3', 'Bombardier'],
  },
] as const