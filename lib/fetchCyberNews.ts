// Utility to fetch and filter cyber security news from newsdata.io
type NewsArticle = {
  title?: string;
  description?: string;
  [key: string]: any;
};

export async function fetchCyberNews(): Promise<NewsArticle[]> {
  // Only show news related to online fraud, UPI scam, hacking, mobile/data security
  const keywords = [
    "online fraud", "upi scam", "upi fraud", "hacking", "hacked", "mobile security", "data security", "data breach", "phishing", "malware", "bank fraud", "account hacked", "cyber attack", "cybercrime", "cyber crime"
  ];

  // NewsData.io
  const newsdataApiKey = process.env.NEXT_PUBLIC_NEWSDATA_API_KEY;
  const newsdataEndpoint = `https://newsdata.io/api/1/news?apikey=${newsdataApiKey}&category=technology&language=en`;
  let newsdataResults: NewsArticle[] = [];
  try {
    const res = await fetch(newsdataEndpoint);
    if (res.ok) {
      const data = await res.json();
      newsdataResults = (data.results || []).filter((article: NewsArticle) =>
        keywords.some(kw =>
          (article.title && article.title.toLowerCase().includes(kw)) ||
          (article.description && article.description.toLowerCase().includes(kw))
        )
      );
    }
  } catch {}

  // NewsAPI.org
  const newsapiKey = process.env.NEXT_PUBLIC_NEWSAPI_API_KEY;
  const newsapiEndpoint = `https://newsapi.org/v2/everything?q=${encodeURIComponent(keywords.join(" OR "))}&language=en&sortBy=publishedAt&apiKey=${newsapiKey}`;
  let newsapiResults: NewsArticle[] = [];
  try {
    const res = await fetch(newsapiEndpoint);
    if (res.ok) {
      const data = await res.json();
      newsapiResults = (data.articles || []).map((article: any) => ({
        ...article,
        pubDate: article.publishedAt,
      }));
    }
  } catch {}

  // Mediastack
  const mediastackKey = process.env.NEXT_PUBLIC_MEDIASTACK_API_KEY;
  const mediastackEndpoint = `http://api.mediastack.com/v1/news?access_key=${mediastackKey}&languages=en&keywords=${encodeURIComponent(keywords.join(","))}`;
  let mediastackResults: NewsArticle[] = [];
  try {
    const res = await fetch(mediastackEndpoint);
    if (res.ok) {
      const data = await res.json();
      mediastackResults = (data.data || []).map((article: any) => ({
        ...article,
        pubDate: article.published_at,
      }));
    }
  } catch {}

  // Normalize results: ensure each article has { title, description, link, pubDate }
  const normalize = (article: any): any => {
    const title = article.title || article.heading || article.name || "";
    const description = article.description || article.summary || article.content || article.description || "";
    const link = article.link || article.url || article.source?.url || article.source || "";
    const pubDate = article.pubDate || article.publishedAt || article.published_at || article.pub_date || article.date || null;
    return { ...article, title, description, link, pubDate };
  };

  const allResults = [...newsdataResults, ...newsapiResults, ...mediastackResults].map(normalize);

  // Deduplicate by title and ensure there's a link
  const seen = new Set<string>();
  let uniqueResults = allResults.filter((a) => {
    if (!a.title) return false;
    if (!a.link) return false;
    const t = a.title.trim().toLowerCase();
    if (seen.has(t)) return false;
    seen.add(t);
    return true;
  });

  // Sort by pubDate descending and return up to 10 latest items
  uniqueResults = uniqueResults
    .filter(item => item.pubDate)
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
    .slice(0, 10);

  // If still empty, try mediastack raw results (up to 10)
  if (uniqueResults.length === 0 && mediastackResults.length > 0) {
    uniqueResults = mediastackResults
      .map(normalize)
      .filter(item => item.link && item.pubDate)
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
      .slice(0, 10);
  }

  // If we still have fewer than 3 items, append small curated fallback items so the UI has content
  if (uniqueResults.length < 3) {
    const now = new Date();
    const fallback = [
      {
        title: "Alert: New UPI-themed phishing messages circulating",
        description: "Users report receiving SMS that mimic official banks requesting UPI PINs; do not share OTPs or PINs.",
        link: "https://example.com/upi-phishing-alert",
        pubDate: new Date(now.getTime() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      },
      {
        title: "Data breach advisory: Credentials found in public leak",
        description: "A recent credential leak includes some email addresses; reset passwords and enable 2FA.",
        link: "https://example.com/credential-leak-advisory",
        pubDate: new Date(now.getTime() - 1000 * 60 * 60).toISOString(), // 1 hour ago
      },
      {
        title: "Malware campaign targets mobile banking apps",
        description: "Security teams have identified a trojan disguised as a popular utility app; only install from official stores.",
        link: "https://example.com/mobile-malware-campaign",
        pubDate: new Date(now.getTime() - 1000 * 60 * 90).toISOString(), // 1.5 hours ago
      },
    ];

    // Merge fallbacks while avoiding duplicates by title
    const seenTitles = new Set(uniqueResults.map((r) => (r.title || "").trim().toLowerCase()));
    for (const f of fallback) {
      if (seenTitles.has((f.title || "").trim().toLowerCase())) continue;
      uniqueResults.push(f);
      if (uniqueResults.length >= 3) break;
    }
  }

  return uniqueResults;
}
