// Utility to fetch and filter cyber security news from newsdata.io
type NewsArticle = {
  title?: string;
  description?: string;
  [key: string]: any;
};

export async function fetchCyberNews(): Promise<NewsArticle[]> {
  const keywords = [
    "cyber", "scam", "fraud", "phishing", "ransomware", "malware", "data breach", "hacked", "security", "otp", "upi", "identity theft", "bank fraud"
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

  // Merge and deduplicate by title
  const allResults = [...newsdataResults, ...newsapiResults, ...mediastackResults];
  const seen = new Set();
  let uniqueResults = allResults.filter((a) => {
    if (!a.title) return false;
    const t = a.title.trim().toLowerCase();
    if (seen.has(t)) return false;
    seen.add(t);
    return true;
  });

  // If nothing from past 24h, show last 3 possible news from mediastack
  if (uniqueResults.length === 0 && mediastackResults.length > 0) {
    uniqueResults = mediastackResults.slice(0, 3);
  }
  return uniqueResults;
}
