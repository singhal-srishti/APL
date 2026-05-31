import type { NextApiRequest, NextApiResponse } from 'next';
import { mockJobs, mockCandidate, laborMarketTrends } from '@/data/mockData';
import { analyzeATSScore, calculateSalaryBenchmark } from '@/lib/atsOptimization';

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

    const atsScore = analyzeATSScore(mockCandidate.resume, job);
    const salaryBenchmark = calculateSalaryBenchmark(
      job,
      laborMarketTrends
    );

    return res.status(200).json({
      atsScore,
      salaryBenchmark,
    });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
