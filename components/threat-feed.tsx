"use client";
import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle, ShieldCheck, AlertTriangle } from "lucide-react";

const tips = [
  "Don’t click links in unsolicited SMS.",
  "Verify UPI requests before paying.",
  "Never share your OTP with anyone.",
  "Check URLs for spelling and HTTPS.",
  "Always verify QR codes before paying.",
  "Enable 2FA on all important accounts.",
  "Be cautious of urgent requests for money."
];

function getVisualCue(severity: string) {
  if (/high|critical|scam|fraud|phishing|ransomware/i.test(severity)) {
    return { icon: <AlertCircle className="text-red-500 inline mr-1" />, label: "Scam Alert", color: "bg-red-900/10 border-red-500" };
  }
  if (/caution|medium|warning/i.test(severity)) {
    return { icon: <AlertTriangle className="text-yellow-500 inline mr-1" />, label: "Caution", color: "bg-yellow-900/10 border-yellow-500" };
  }
  return { icon: <ShieldCheck className="text-green-500 inline mr-1" />, label: "Safe Tip", color: "bg-green-900/10 border-green-500" };
}

export function ThreatFeed() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);


  const fetchFeed = async () => {
    setLoading(true);
    setError("");
    try {
      // Add cache-busting param to always get fresh data
      const res = await fetch(`/api/cyber-news?_=${Date.now()}`);
      if (!res.ok) throw new Error("API error");
      const { news } = await res.json();
      setNews(news);
      setLastUpdated(new Date());
    } catch (e) {
      setError("Failed to load threat feed.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFeed();
    intervalRef.current = setInterval(fetchFeed, 1000 * 60 * 3); // auto-refresh every 3 min
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);


  // Keep only valid (non-empty) news items, sort newest first, and limit to 3 latest items
  const validNews = news
    .filter((item) => item && item.title && item.title.toString().trim() !== "" && item.description && item.description.toString().trim() !== "" && item.pubDate)
    .slice();

  const recentNews = validNews
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
    .slice(0, 3);

  const normalizeLink = (link: string | undefined) => {
  if (!link) return "https://www.ndtv.com/livetv-ndtv24x7";
    try {
      // If it's already a valid absolute URL, return as-is
      const u = new URL(link);
      return u.toString();
    } catch (e) {
      // Otherwise, prepend https://
      return `https://${link}`;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <span className="text-lg font-semibold text-primary flex items-center gap-2">
          <RefreshCw className="h-5 w-5 animate-spin-slow text-primary" />
          Live Feed
        </span>
        <Button size="sm" variant="outline" onClick={fetchFeed} disabled={loading} className="flex items-center gap-2">
          <RefreshCw className={loading ? "animate-spin" : ""} /> Refresh
        </Button>
      </div>
  {error && news.length === 0 && <div className="text-red-500 mb-4">{error}</div>}
      <div className="flex flex-col gap-4">
  {recentNews.length === 0 && !loading && <div className="col-span-full text-center text-gray-400">No cyber security news found.</div>}
  {recentNews.map((item: any, idx: number) => {
          const cue = getVisualCue(item.title + " " + (item.description || ""));
          const tip = tips[idx % tips.length];
          const safeLink = normalizeLink(item.link);
          return (
            <Card key={safeLink || item.title + idx} className={`border-l-4 ${cue.color} rounded-xl shadow-md bg-gradient-to-br from-black/80 to-gray-900/80 p-0 flex flex-col`}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-1">
                  {cue.icon}
                  <span className="font-semibold text-xs tracking-wide uppercase">{cue.label}</span>
                </div>
                <CardTitle className="text-base font-bold mb-1 text-foreground leading-tight line-clamp-2">{item.title}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground mb-1 line-clamp-3">{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 mt-auto pb-3">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{item.pubDate ? new Date(item.pubDate).toLocaleString() : ""}</span>
                  <a href={safeLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Read Full Story</a>
                </div>
                <div className="text-xs text-primary font-medium flex items-center gap-1 mt-1">
                  <ShieldCheck className="h-4 w-4 text-primary" /> Safety Tip: {tip}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="text-xs text-gray-500 mt-4 text-right">
        Last updated: {lastUpdated ? lastUpdated.toLocaleTimeString() : "-"}
      </div>
    </div>
  );
}
