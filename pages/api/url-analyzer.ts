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

    const prompt = `Analyze the following URL for safety, phishing, or scam risk. For the given URL, provide:\n1. The source or company/organization behind the website (if possible)\n2. The type of website (e.g., bank, e-commerce, social media, government, news, etc.)\n3. A clear, concise risk assessment (is it safe, suspicious, or dangerous?)\n4. A short explanation for your assessment\n5. Advice for a non-technical user\nFormat your answer in a readable way with headings for each section. URL: ${url}`;

  const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    const data = await response.json();
    // Debug: log the full Gemini response
    console.log('Gemini API response:', JSON.stringify(data, null, 2));
    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      res.status(200).json({ result: data.candidates[0].content.parts[0].text });
    } else if (data?.error) {
      res.status(200).json({ result: `Gemini API error: ${data.error.message || JSON.stringify(data.error)}` });
    } else {
      res.status(200).json({ result: 'No analysis available. (No Gemini output)' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to analyze URL' });
  }
}
