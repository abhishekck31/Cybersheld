import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchCyberNews } from '@/lib/fetchCyberNews';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const news = await fetchCyberNews();
    res.status(200).json({ news });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}
