import { CandidateProfile, Job, LearningPlan } from './types';
import { calculateSkillGaps } from './roleRecommendations';

const courseLibrary: Record<string, { title: string; provider: string; url: string }[]> = {
  'React': [
    { title: 'Advanced React Patterns', provider: 'Frontend Masters', url: 'https://frontendmasters.com/courses/advanced-react-patterns/' },
    { title: 'React Performance Optimization', provider: 'Udemy', url: 'https://www.udemy.com/course/react-performance/' },
  ],
  'Node.js': [
    { title: 'Node.js Best Practices', provider: 'Pluralsight', url: 'https://www.pluralsight.com/courses/nodejs-best-practices' },
    { title: 'Building REST APIs with Node.js', provider: 'Coursera', url: 'https://www.coursera.org/learn/nodejs' },
  ],
  'Python': [
    { title: 'Python for Everybody', provider: 'Coursera', url: 'https://www.coursera.org/specializations/python' },
    { title: 'Data Structures in Python', provider: 'edX', url: 'https://www.edx.org/course/data-structures-fundamentals' },
  ],
  'SQL': [
    { title: 'Advanced SQL for Data Analysts', provider: 'Mode', url: 'https://mode.com/sql-tutorial' },
    { title: 'SQL Performance Tuning', provider: 'Udemy', url: 'https://www.udemy.com/course/sql-performance-tuning/' },
  ],
  'AWS': [
    { title: 'AWS Certified Solutions Architect', provider: 'A Cloud Guru', url: 'https://acloudguru.com/course/aws-certified-solutions-architect-associate' },
    { title: 'AWS Developer: Building on AWS', provider: 'Coursera', url: 'https://www.coursera.org/learn/aws-fundamentals-building-serverless-applications' },
  ],
  'Docker': [
    { title: 'Docker Mastery', provider: 'Udemy', url: 'https://www.udemy.com/course/docker-mastery/' },
    { title: 'Docker for Developers', provider: 'Pluralsight', url: 'https://www.pluralsight.com/courses/docker-getting-started' },
  ],
  'Kubernetes': [
    { title: 'Kubernetes Fundamentals', provider: 'Linux Foundation', url: 'https://training.linuxfoundation.org/training/kubernetes-fundamentals/' },
    { title: 'Kubernetes in Action', provider: 'Udemy', url: 'https://www.udemy.com/course/kubernetes-in-action/' },
  ],
  'Machine Learning': [
    { title: 'Machine Learning', provider: 'Coursera', url: 'https://www.coursera.org/learn/machine-learning' },
    { title: 'Intro to Machine Learning with Python', provider: 'Udacity', url: 'https://www.udacity.com/course/intro-to-machine-learning-with-python--ud120' },
  ],
};

export function generateLearningPlan(
  candidate: CandidateProfile,
  job: Job
): LearningPlan {
  const skillGaps = calculateSkillGaps(candidate.skills, job.requiredSkills, job.preferredSkills);
  const topGaps = skillGaps.filter((gap) => gap.gap > 0).slice(0, 4);

  const actionItems = topGaps.map((gap) => {
    const resources = courseLibrary[gap.skill] || [
      {
        title: `Learn ${gap.skill} fundamentals`,
        provider: 'Coursera',
        url: `https://www.google.com/search?q=${encodeURIComponent(`${gap.skill} online course`)}`,
      },
    ];

    return {
      skill: gap.skill,
      importance: gap.importance,
      gapPercent: Math.round(gap.gap),
      suggestedCourses: resources,
      timelineWeeks: gap.importance === 'critical' ? 6 : gap.importance === 'high' ? 4 : 2,
    };
  });

  const overallFocus = topGaps.length > 0
    ? `Focus on ${topGaps.map((gap) => gap.skill).join(', ')} to improve your fit for this role.`
    : 'You are well aligned with this role. Keep polishing your existing strengths.';

  return {
    jobId: job.id,
    overallFocus,
    actionItems,
    learningSummary: `Build a learning path around your top skill gaps and complete ${actionItems.length} targeted courses in the next ${Math.max(...actionItems.map((item) => item.timelineWeeks))} weeks.`,
  };
}
