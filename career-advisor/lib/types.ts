export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  level: 'entry' | 'mid' | 'senior';
  industry: string;
  location: string;
  isRemote: boolean;
  postedDate: string;
  applications: number;
  hiringRate: number; // percentage
}

export interface CandidateProfile {
  id: string;
  name: string;
  email: string;
  experience: number; // years
  skills: {
    name: string;
    proficiency: number; // 1-5 scale
    yearsOfExperience: number;
  }[];
  resume: string;
  targetRole: string;
  targetIndustry: string;
  targetSalary: number;
  location: string;
}

export interface SkillGap {
  skill: string;
  candidateLevel: number;
  requiredLevel: number;
  gap: number;
  importance: 'critical' | 'high' | 'medium' | 'low';
}

export interface RoleRecommendation {
  job: Job;
  matchScore: number;
  reasoning: string;
  skillGaps: SkillGap[];
}

export interface HiringProbability {
  jobId: string;
  probability: number;
  factors: {
    skillMatch: number;
    experienceMatch: number;
    educationMatch: number;
    locationMatch: number;
  };
  explanation: string;
}

export interface ATSScore {
  overallScore: number;
  sections: {
    contactInfo: number;
    summary: number;
    skills: number;
    experience: number;
    education: number;
  };
  issues: string[];
  suggestions: string[];
  optimizedResume: string;
}

export interface InterviewPrepPlan {
  jobId: string;
  technicalTopics: {
    topic: string;
    importance: 'critical' | 'high' | 'medium';
    resources: string[];
  }[];
  behavioralQuestions: string[];
  companyCultureFacts: string[];
  mockInterviewScript: string;
  estimatedPrep: number; // hours
}
