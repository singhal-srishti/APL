import { Job, CandidateProfile, SkillGap, RoleRecommendation } from './types';

export function calculateSkillGaps(
  candidateSkills: CandidateProfile['skills'],
  requiredSkills: string[],
  preferredSkills: string[]
): SkillGap[] {
  const gaps: SkillGap[] = [];

  // Check required skills
  for (const requiredSkill of requiredSkills) {
    const candidateSkill = candidateSkills.find(
      (s) => s.name.toLowerCase() === requiredSkill.toLowerCase()
    );

    const gap: SkillGap = {
      skill: requiredSkill,
      candidateLevel: candidateSkill?.proficiency || 0,
      requiredLevel: 4, // Typically need level 4 for required skills
      gap: Math.max(0, (4 - (candidateSkill?.proficiency || 0)) / 4) * 100,
      importance: 'critical',
    };
    gaps.push(gap);
  }

  // Check preferred skills
  for (const preferredSkill of preferredSkills) {
    const candidateSkill = candidateSkills.find(
      (s) => s.name.toLowerCase() === preferredSkill.toLowerCase()
    );

    const gap: SkillGap = {
      skill: preferredSkill,
      candidateLevel: candidateSkill?.proficiency || 0,
      requiredLevel: 3, // Typically need level 3 for preferred skills
      gap: Math.max(0, (3 - (candidateSkill?.proficiency || 0)) / 3) * 100,
      importance: 'high',
    };
    gaps.push(gap);
  }

  return gaps.sort((a, b) => b.gap - a.gap);
}

export function calculateRoleMatch(
  candidate: CandidateProfile,
  job: Job
): number {
  let score = 0;
  let weights = 0;

  // Skill match (60% weight)
  const totalRequiredSkills = job.requiredSkills.length;
  let matchedRequired = 0;
  for (const skill of job.requiredSkills) {
    const candidateSkill = candidate.skills.find(
      (s) => s.name.toLowerCase() === skill.toLowerCase()
    );
    if (candidateSkill && candidateSkill.proficiency >= 3) {
      matchedRequired++;
    }
  }
  score += (matchedRequired / Math.max(totalRequiredSkills, 1)) * 60;
  weights += 60;

  // Experience level match (20% weight)
  const jobExpRequired = job.level === 'entry' ? 1 : job.level === 'mid' ? 3 : 5;
  const expMatch = Math.min(candidate.experience / jobExpRequired, 1);
  score += expMatch * 20;
  weights += 20;

  // Location preference (10% weight)
  if (
    job.isRemote ||
    candidate.location.toLowerCase() === job.location.toLowerCase()
  ) {
    score += 10;
  }
  weights += 10;

  // Salary alignment (10% weight)
  if (
    candidate.targetSalary >= job.salary.min &&
    candidate.targetSalary <= job.salary.max
  ) {
    score += 10;
  }
  weights += 10;

  return Math.round((score / weights) * 100);
}

export function generateRoleRecommendations(
  candidate: CandidateProfile,
  jobs: Job[]
): RoleRecommendation[] {
  const recommendations = jobs
    .map((job) => {
      const matchScore = calculateRoleMatch(candidate, job);
      const skillGaps = calculateSkillGaps(
        candidate.skills,
        job.requiredSkills,
        job.preferredSkills
      );

      const criticalGaps = skillGaps.filter((g) => g.importance === 'critical');
      const reasoning =
        matchScore >= 80
          ? `Excellent match! You have strong ${job.requiredSkills.slice(0, 2).join(' and ')} skills.`
          : matchScore >= 60
            ? `Good potential. You have most key skills but need to develop ${criticalGaps.slice(0, 2).map((g) => g.skill).join(' and ')}.`
            : `Growing opportunity. With focus on ${criticalGaps.slice(0, 2).map((g) => g.skill).join(' and ')}, this could be reachable.`;

      return {
        job,
        matchScore,
        reasoning,
        skillGaps,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  return recommendations;
}
