import { Job, CandidateProfile } from './types';

export const mockJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Full-Stack Engineer',
    company: 'TechCorp',
    description: 'Build scalable web applications with React and Node.js',
    requiredSkills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    preferredSkills: ['TypeScript', 'Docker', 'GraphQL', 'CI/CD'],
    salary: { min: 140000, max: 180000, currency: 'USD' },
    level: 'senior',
    industry: 'Technology',
    location: 'San Francisco, CA',
    isRemote: true,
    postedDate: '2025-05-20',
    applications: 345,
    hiringRate: 8.5,
  },
  {
    id: 'job-2',
    title: 'Data Science Engineer',
    company: 'DataFlow',
    description: 'Design and deploy ML models for predictive analytics',
    requiredSkills: ['Python', 'Machine Learning', 'SQL', 'Pandas'],
    preferredSkills: ['TensorFlow', 'AWS SageMaker', 'Statistics', 'Spark'],
    salary: { min: 130000, max: 170000, currency: 'USD' },
    level: 'mid',
    industry: 'Technology',
    location: 'New York, NY',
    isRemote: true,
    postedDate: '2025-05-22',
    applications: 512,
    hiringRate: 6.2,
  },
  {
    id: 'job-3',
    title: 'Junior Frontend Developer',
    company: 'StartupXYZ',
    description: 'Build modern user interfaces with React and Vue.js',
    requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React'],
    preferredSkills: ['TypeScript', 'Vue.js', 'Tailwind CSS'],
    salary: { min: 80000, max: 110000, currency: 'USD' },
    level: 'entry',
    industry: 'Technology',
    location: 'Austin, TX',
    isRemote: true,
    postedDate: '2025-05-25',
    applications: 892,
    hiringRate: 12.3,
  },
  {
    id: 'job-4',
    title: 'DevOps Engineer',
    company: 'CloudSys',
    description: 'Manage cloud infrastructure and CI/CD pipelines',
    requiredSkills: ['Docker', 'Kubernetes', 'AWS', 'Linux'],
    preferredSkills: ['Terraform', 'Jenkins', 'Prometheus', 'Go'],
    salary: { min: 120000, max: 160000, currency: 'USD' },
    level: 'mid',
    industry: 'Technology',
    location: 'Seattle, WA',
    isRemote: true,
    postedDate: '2025-05-23',
    applications: 234,
    hiringRate: 9.8,
  },
  {
    id: 'job-5',
    title: 'Product Manager - AI/ML',
    company: 'InnovateLabs',
    description: 'Lead product strategy for AI-powered features',
    requiredSkills: ['Product Strategy', 'Analytics', 'Communication'],
    preferredSkills: ['Machine Learning', 'SQL', 'Data Analysis'],
    salary: { min: 150000, max: 200000, currency: 'USD' },
    level: 'senior',
    industry: 'Technology',
    location: 'Boston, MA',
    isRemote: false,
    postedDate: '2025-05-21',
    applications: 156,
    hiringRate: 7.1,
  },
];

export const mockCandidate: CandidateProfile = {
  id: 'candidate-1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  experience: 5,
  skills: [
    { name: 'JavaScript', proficiency: 5, yearsOfExperience: 5 },
    { name: 'React', proficiency: 4, yearsOfExperience: 3 },
    { name: 'Node.js', proficiency: 3, yearsOfExperience: 2 },
    { name: 'Python', proficiency: 2, yearsOfExperience: 1 },
    { name: 'SQL', proficiency: 3, yearsOfExperience: 4 },
    { name: 'AWS', proficiency: 2, yearsOfExperience: 1 },
    { name: 'HTML/CSS', proficiency: 4, yearsOfExperience: 5 },
  ],
  resume: `Alex Johnson | alex@example.com | (555) 123-4567
  
EXPERIENCE
Senior Frontend Engineer | TechCompany Inc. | 2020-2025
- Led development of customer dashboard using React, serving 100k+ users
- Improved performance by 40% through code optimization and lazy loading
- Mentored 3 junior developers on React best practices

Full-Stack Developer | StartupCo | 2019-2020
- Built e-commerce platform using React and Node.js
- Implemented authentication and payment integrations

Junior Developer | WebAgency | 2017-2019
- Developed responsive websites using HTML, CSS, JavaScript

SKILLS
Languages: JavaScript, Python, SQL, HTML, CSS
Frontend: React, Vue.js, CSS-in-JS, Tailwind
Backend: Node.js, Express
Databases: PostgreSQL, MongoDB
Tools: Git, Docker, AWS (basic)

EDUCATION
B.S. Computer Science | State University | 2017`,
  targetRole: 'Senior Full-Stack Engineer',
  targetIndustry: 'Technology',
  targetSalary: 160000,
  location: 'San Francisco, CA',
};

export const laborMarketTrends = {
  topSkillsDemand: [
    { skill: 'Cloud (AWS/Azure)', demand: 95, trend: 'up' },
    { skill: 'Machine Learning', demand: 87, trend: 'up' },
    { skill: 'React', demand: 92, trend: 'stable' },
    { skill: 'Python', demand: 94, trend: 'up' },
    { skill: 'TypeScript', demand: 78, trend: 'up' },
    { skill: 'DevOps', demand: 85, trend: 'up' },
  ],
  averageSalaries: {
    'Senior Full-Stack Engineer': {
      min: 140000,
      max: 180000,
      median: 160000,
    },
    'Data Science Engineer': {
      min: 130000,
      max: 170000,
      median: 150000,
    },
    'Junior Frontend Developer': {
      min: 80000,
      max: 110000,
      median: 95000,
    },
    'DevOps Engineer': {
      min: 120000,
      max: 160000,
      median: 140000,
    },
    'Product Manager - AI/ML': {
      min: 150000,
      max: 200000,
      median: 175000,
    },
  },
  hiringMarket: {
    'San Francisco, CA': { difficulty: 'Very Hard', avgTimeToHire: 45 },
    'New York, NY': { difficulty: 'Hard', avgTimeToHire: 38 },
    'Austin, TX': { difficulty: 'Medium', avgTimeToHire: 35 },
    'Seattle, WA': { difficulty: 'Medium', avgTimeToHire: 40 },
    'Boston, MA': { difficulty: 'Hard', avgTimeToHire: 42 },
  },
};
