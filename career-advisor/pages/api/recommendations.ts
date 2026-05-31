import type { NextApiRequest, NextApiResponse } from 'next';
import { mockJobs, mockCandidate } from '@/data/mockData';
import { generateRoleRecommendations } from '@/lib/roleRecommendations';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const recommendations = generateRoleRecommendations(mockCandidate, mockJobs);
    
    return res.status(200).json({
      candidate: mockCandidate,
      recommendations,
      totalMatches: recommendations.length,
    });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
