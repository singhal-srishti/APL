import type { NextApiRequest, NextApiResponse } from 'next';
import { mockJobs } from '@/data/mockData';
import { generateInterviewPrepPlan } from '@/lib/interviewPrep';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const jobId = req.query.jobId as string;
    const job = mockJobs.find((j) => j.id === jobId);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const prepPlan = generateInterviewPrepPlan(job);

    return res.status(200).json(prepPlan);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
