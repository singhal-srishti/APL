import { Job, CandidateProfile, HiringProbability } from './types';

export function calculateHiringProbability(
  candidate: CandidateProfile,
  job: Job
): HiringProbability {
  // Skill match factor
  const totalRequiredSkills = job.requiredSkills.length;
  let skillMatch = 0;
  for (const skill of job.requiredSkills) {
    const candidateSkill = candidate.skills.find(
      (s) => s.name.toLowerCase() === skill.toLowerCase()
    );
    if (candidateSkill) {
      skillMatch += (candidateSkill.proficiency / 5) * 100;
    }
  }
  skillMatch = skillMatch / totalRequiredSkills;

  // Experience factor
  const jobExpRequired = job.level === 'entry' ? 1 : job.level === 'mid' ? 3 : 5;
  let experienceMatch = (candidate.experience / jobExpRequired) * 100;
  experienceMatch = Math.min(experienceMatch, 100);

  // Education match (assume candidate has relevant degree)
  const educationMatch = candidate.skills.length > 5 ? 90 : 75;

  // Location match
  let locationMatch = job.isRemote ? 100 : 60;
  if (
    !job.isRemote &&
    candidate.location.toLowerCase() === job.location.toLowerCase()
  ) {
    locationMatch = 100;
  }

  // Adjust based on application volume and hiring rate
  const competitionFactor = Math.max(
    50,
    100 - (job.applications / 100) * 10
  );
  const hiringRateFactor = job.hiringRate;

  // Calculate final probability
  const factors = {
    skillMatch: skillMatch,
    experienceMatch: experienceMatch,
    educationMatch: educationMatch,
    locationMatch: locationMatch,
  };

  let baseProbability =
    (skillMatch * 0.4 +
      experienceMatch * 0.3 +
      educationMatch * 0.15 +
      locationMatch * 0.15) /
    100;

  const probability = Math.round(
    baseProbability * competitionFactor * (hiringRateFactor / 10) * 10
  );

  const explanation =
    probability >= 70
      ? `You have a strong chance of getting this role. Your ${skillMatch >= 80 ? 'skills are a great match' : 'experience aligns well'} with the position. Focus on highlighting relevant projects in your application.`
      : probability >= 50
        ? `You have a fair chance at this role. Strengthen your application by emphasizing your experience with the key technologies and consider upskilling in any critical gaps.`
        : `This role is currently challenging for you. Prioritize learning ${job.requiredSkills[0]} and ${job.requiredSkills[1]} to increase your chances.`;

  return {
    jobId: job.id,
    probability,
    factors,
    explanation,
  };
}

export function calculateBatchHiringProbabilities(
  candidate: CandidateProfile,
  jobs: Job[]
): HiringProbability[] {
  return jobs.map((job) => calculateHiringProbability(candidate, job));
}
