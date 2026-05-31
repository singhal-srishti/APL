import { ATSScore, Job } from './types';

export function analyzeATSScore(resume: string, job: Job): ATSScore {
  const sections = {
    contactInfo: 0,
    summary: 0,
    skills: 0,
    experience: 0,
    education: 0,
  };

  const issues: string[] = [];
  const suggestions: string[] = [];

  // Check contact info
  const hasEmail = /[\w\.-]+@[\w\.-]+\.\w+/.test(resume);
  const hasPhone = /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(resume);
  sections.contactInfo = hasEmail && hasPhone ? 100 : hasEmail ? 75 : 50;
  if (!hasEmail) issues.push('Missing professional email address');
  if (!hasPhone) issues.push('Missing phone number');

  // Check for summary/objective
  const hasSummary =
    /summary|objective|profile|about/i.test(resume) &&
    resume.length > 100;
  sections.summary = hasSummary ? 100 : 0;
  if (!hasSummary)
    suggestions.push(
      'Add a professional summary (2-3 lines) highlighting your key strengths'
    );

  // Check skills section
  let skillsScore = 0;
  for (const requiredSkill of job.requiredSkills) {
    if (
      resume.toLowerCase().includes(requiredSkill.toLowerCase())
    ) {
      skillsScore += (100 / job.requiredSkills.length) * 0.8;
    }
  }
  for (const preferredSkill of job.preferredSkills) {
    if (
      resume.toLowerCase().includes(preferredSkill.toLowerCase())
    ) {
      skillsScore += (100 / job.preferredSkills.length) * 0.3;
    }
  }
  sections.skills = Math.min(100, skillsScore);
  if (sections.skills < 60) {
    suggestions.push(
      `Clearly mention skills from the job posting: ${job.requiredSkills.slice(0, 3).join(', ')}`
    );
  }

  // Check experience section
  const hasExperienceSection = /experience|employment|work/i.test(resume);
  const hasMeasurableResults = /\d+%|saved|improved|increased|reduced/i.test(
    resume
  );
  sections.experience = hasExperienceSection ? 70 : 50;
  if (hasMeasurableResults) sections.experience = 90;
  if (!hasExperienceSection)
    issues.push('Missing or unclear work experience section');
  if (!hasMeasurableResults)
    suggestions.push(
      'Add quantifiable achievements (e.g., "Improved performance by 40%")'
    );

  // Check education section
  const hasEducationSection = /education|degree|university|bachelor|master/i.test(
    resume
  );
  sections.education = hasEducationSection ? 100 : 50;
  if (!hasEducationSection)
    issues.push('Missing education section');

  // Additional ATS checks
  const hasGoodFormatting = !/^|[,;:\-—–]+ {5,}|\n{3,}/.test(resume);
  if (!hasGoodFormatting)
    suggestions.push('Ensure consistent spacing and formatting throughout');

  const overallScore = Math.round(
    (sections.contactInfo * 0.15 +
      sections.summary * 0.1 +
      sections.skills * 0.25 +
      sections.experience * 0.35 +
      sections.education * 0.15) /
      100
  );

  // Generate optimized resume
  const optimizedResume = optimizeResumeForATS(resume, job, suggestions);

  return {
    overallScore,
    sections,
    issues,
    suggestions,
    optimizedResume,
  };
}

function optimizeResumeForATS(
  resume: string,
  job: Job,
  suggestions: string[]
): string {
  let optimized = resume;

  // Add job-specific keywords
  const keywordsToAdd = job.requiredSkills.slice(0, 3).join(', ');

  // Ensure skills section exists
  if (!/skills/i.test(optimized)) {
    optimized += `\n\nSKILLS\n${keywordsToAdd}`;
  } else {
    // Add missing required skills to existing skills section
    const skillsSection = optimized.match(/SKILLS[\s\S]*?(?=\n[A-Z]+|$)/i);
    if (skillsSection) {
      for (const skill of job.requiredSkills) {
        if (!skillsSection[0].includes(skill)) {
          optimized = optimized.replace(
            skillsSection[0],
            skillsSection[0] + `, ${skill}`
          );
        }
      }
    }
  }

  // Add summary if missing
  if (!/summary|objective|profile/i.test(optimized)) {
    const newSummary = `PROFESSIONAL SUMMARY\nExperienced professional with strong expertise in ${job.requiredSkills[0]} and ${job.requiredSkills[1]}. Proven track record of delivering quality work and collaborating effectively with cross-functional teams.\n`;
    optimized = newSummary + optimized;
  }

  return optimized;
}

export function calculateSalaryBenchmark(
  job: Job,
  marketData: any
): { median: number; range: { min: number; max: number }; marketComparison: string } {
  const jobTitle = job.title;
  const marketSalary =
    marketData.averageSalaries[jobTitle];

  if (marketSalary) {
    const postingSalary = {
      min: job.salary.min,
      max: job.salary.max,
    };

    const comparison =
      postingSalary.min < marketSalary.min
        ? 'Below market'
        : postingSalary.max > marketSalary.max
          ? 'Above market'
          : 'At market rate';

    return {
      median: marketSalary.median,
      range: { min: marketSalary.min, max: marketSalary.max },
      marketComparison: comparison,
    };
  }

  return {
    median: (job.salary.min + job.salary.max) / 2,
    range: { min: job.salary.min, max: job.salary.max },
    marketComparison: 'Market data unavailable',
  };
}
