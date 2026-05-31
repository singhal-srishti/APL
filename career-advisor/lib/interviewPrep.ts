import { Job, InterviewPrepPlan } from './types';

export function generateInterviewPrepPlan(job: Job): InterviewPrepPlan {
  const technicalTopics = generateTechnicalTopics(job);
  const behavioralQuestions = generateBehavioralQuestions(job);
  const companyCultureFacts = generateCompanyCultureFacts(job);
  const mockInterviewScript = generateMockInterviewScript(job);

  return {
    jobId: job.id,
    technicalTopics,
    behavioralQuestions,
    companyCultureFacts,
    mockInterviewScript,
    estimatedPrep: calculatePrepTime(job),
  };
}

function generateTechnicalTopics(
  job: Job
): InterviewPrepPlan['technicalTopics'] {
  const topics: InterviewPrepPlan['technicalTopics'] = [];

  // Map of skills to interview topics
  const skillTopics: Record<string, { topic: string; resources: string[] }> = {
    'React': {
      topic: 'React Component Lifecycle & Hooks',
      resources: [
        'React Hooks documentation',
        'LeetCode React problems',
        'Build a todo app from scratch',
      ],
    },
    'Node.js': {
      topic: 'Node.js Event Loop & Async Programming',
      resources: [
        'Node.js event loop explained',
        'Promise and async/await patterns',
        'Build a REST API',
      ],
    },
    'Python': {
      topic: 'Python Data Structures & Algorithms',
      resources: [
        'Python collections module',
        'LeetCode Python problems',
        'Python design patterns',
      ],
    },
    'SQL': {
      topic: 'Database Design & Query Optimization',
      resources: [
        'Complex SQL queries',
        'Index design and normalization',
        'Query execution plans',
      ],
    },
    'AWS': {
      topic: 'AWS Services & Architecture',
      resources: [
        'EC2, S3, Lambda, RDS basics',
        'AWS certification study materials',
        'Design scalable applications',
      ],
    },
    'Machine Learning': {
      topic: 'ML Models & Algorithm Selection',
      resources: [
        'Supervised vs unsupervised learning',
        'Model evaluation metrics',
        'Feature engineering techniques',
      ],
    },
    'Docker': {
      topic: 'Containerization & Microservices',
      resources: [
        'Docker container lifecycle',
        'Kubernetes orchestration basics',
        'Container networking',
      ],
    },
  };

  // Add topics for required skills
  for (const skill of job.requiredSkills) {
    const topic = skillTopics[skill];
    if (topic) {
      topics.push({
        topic: topic.topic,
        importance: 'critical',
        resources: topic.resources,
      });
    }
  }

  // Add topics for preferred skills
  for (const skill of job.preferredSkills) {
    const topic = skillTopics[skill];
    if (topic) {
      topics.push({
        topic: topic.topic,
        importance: 'high',
        resources: topic.resources,
      });
    }
  }

  // If no specific topics found, add general topics
  if (topics.length === 0) {
    topics.push({
      topic: 'System Design & Architecture',
      importance: 'critical',
      resources: [
        'Designing Data-Intensive Applications',
        'System design interview prep',
      ],
    });
  }

  return topics.slice(0, 5); // Return top 5
}

function generateBehavioralQuestions(job: Job): string[] {
  const baseQuestions = [
    'Tell me about a time you had to learn a new technology quickly. How did you approach it?',
    'Describe a situation where you had to debug a complex problem. What was your approach?',
    'Tell me about a time you disagreed with a team member. How did you resolve it?',
    'Describe your most challenging project. What made it difficult and how did you overcome it?',
    'How do you handle tight deadlines or high-pressure situations?',
  ];

  // Add role-specific questions
  const roleQuestions: Record<string, string[]> = {
    'Senior': [
      'Tell me about a time you mentored a junior developer. What did they learn from you?',
      'Describe your approach to code review. How do you balance being helpful and critical?',
      'Have you led a project from conception to production? Walk me through your process.',
    ],
    'Mid': [
      'Tell me about a feature you owned end-to-end. What was your workflow?',
      'How do you approach breaking down large tasks into manageable pieces?',
    ],
  };

  const roleLevel =
    job.level === 'senior'
      ? 'Senior'
      : job.level === 'mid'
        ? 'Mid'
        : 'Entry';
  const additionalQuestions = roleQuestions[roleLevel] || [];

  return [...baseQuestions, ...additionalQuestions];
}

function generateCompanyCultureFacts(job: Job): string[] {
  const cultureFacts: Record<string, string[]> = {
    'TechCorp': [
      'Fast-growing tech company with 500+ employees',
      'Known for innovative product development',
      'Strong emphasis on remote-first culture',
      'Competitive salary and equity packages',
    ],
    'DataFlow': [
      'Pioneer in data analytics and ML',
      'High-performing team with top talent',
      'Focus on cutting-edge technology',
      'Collaborative and inclusive environment',
    ],
    'StartupXYZ': [
      'Early-stage startup (Series B)',
      'Fast-paced, dynamic work environment',
      'Strong focus on learning and growth',
      'Direct impact on product and strategy',
    ],
  };

  return (
    cultureFacts[job.company] || [
      `Learn more about ${job.company} culture and values`,
      'Research company news and recent announcements',
      'Find the company on LinkedIn and review current employees',
      'Look for company blog posts and engineering talks',
    ]
  );
}

function generateMockInterviewScript(job: Job): string {
  return `MOCK INTERVIEW SCRIPT - ${job.title} at ${job.company}

OPENING (2 min)
Interviewer: "Hi! Thanks for taking the time. Tell me a bit about yourself and why you're interested in this role?"
[You should: Give a 60-90 second introduction focusing on relevant experience]

ROLE-SPECIFIC QUESTIONS (20 min)
Interviewer: "This role involves working with ${job.requiredSkills[0]}. Walk me through a project where you used it."
[You should: Explain your project, your role, and challenges you faced]

TECHNICAL DEEP DIVE (15 min)
Interviewer: "How would you architect a system that handles ${job.level === 'senior' ? '1M+ concurrent users' : '100k+ concurrent users'}?"
[You should: Think out loud, explain trade-offs, ask clarifying questions]

QUESTIONS FOR INTERVIEWER (5 min)
You should ask:
- "What does the team structure look like?"
- "What are the biggest challenges the team is currently facing?"
- "How does the company support professional development?"

CLOSING (3 min)
Interviewer: "Do you have any final questions?"
"Thank you! I'm very interested in this opportunity."`;
}

function calculatePrepTime(job: Job): number {
  const baseTime = 10;
  const skillComplexity = Math.min(job.requiredSkills.length * 2, 15);
  const levelFactor =
    job.level === 'senior' ? 3 : job.level === 'mid' ? 2 : 1;

  return baseTime + skillComplexity + levelFactor;
}
