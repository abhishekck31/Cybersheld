import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'Missing URL' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Gemini API key not set' });
    }

  const prompt = `Analyze the following URL for safety, phishing, or scam risk. For the given URL, provide:
1. The source or company/organization behind the website (if possible)
2. The type of website (e.g., bank, e-commerce, social media, government, news, etc.)
3. A clear, concise risk assessment (is it safe, suspicious, or dangerous?)
4. A short explanation for your assessment
5. Advice for a non-technical user
Format your answer in a readable way with headings for each section. URL: ${url}`;

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    const data = await response.json();
    const geminiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No analysis available.';
    res.status(200).json({ result: geminiText });
  } catch (error) {
    res.status(500).json({ error: 'Failed to analyze URL' });
  }
}
