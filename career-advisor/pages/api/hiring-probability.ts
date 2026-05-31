import type { NextApiRequest, NextApiResponse } from 'next';
import { mockJobs, mockCandidate } from '@/data/mockData';
import { calculateBatchHiringProbabilities } from '@/lib/hiringProbability';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const jobId = req.query.jobId as string;
    const probabilities = calculateBatchHiringProbabilities(
      mockCandidate,
      mockJobs
    );

    if (jobId) {
      const prob = probabilities.find((p) => p.jobId === jobId);
      return res.status(200).json(prob || { error: 'Job not found' });
    }

    return res.status(200).json(probabilities);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
