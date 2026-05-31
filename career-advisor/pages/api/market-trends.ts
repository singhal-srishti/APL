import type { NextApiRequest, NextApiResponse } from 'next';
import { laborMarketTrends } from '@/data/mockData';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return res.status(200).json({
      topSkills: laborMarketTrends.topSkillsDemand,
      averageSalaries: laborMarketTrends.averageSalaries,
      hiringMarket: laborMarketTrends.hiringMarket,
    });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
