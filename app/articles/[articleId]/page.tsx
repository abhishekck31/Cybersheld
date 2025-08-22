"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { FooterSection } from "@/components/footer-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Clock,
  User,
  Star,
  Share2,
  ChevronRight,
  Eye,
  Calendar,
  Tag,
  ArrowLeft,
  ThumbsUp,
  MessageCircle,
  Bookmark,
} from "lucide-react"

export default function ArticlePage() {
  const params = useParams()
  const articleId = params.articleId as string

  // Mock article data - in real app, this would come from API
  const article = {
    id: "complete-phishing-guide",
    title: "The Complete Guide to Phishing Protection in 2024",
    excerpt: "Learn everything you need to know about identifying, avoiding, and reporting phishing attacks in India.",
    content: `
# Introduction to Phishing

Phishing attacks have become increasingly sophisticated in 2024, with cybercriminals targeting Indian users through various channels including email, SMS, WhatsApp, and fake websites. This comprehensive guide will help you understand, identify, and protect yourself from these threats.

## What is Phishing?

Phishing is a cybercrime where attackers impersonate legitimate organizations to steal sensitive information such as usernames, passwords, credit card details, and other personal data. The term "phishing" comes from "fishing" - attackers cast a wide net hoping to catch unsuspecting victims.

## Common Types of Phishing Attacks in India

### 1. Email Phishing
- Fake bank emails asking for account verification
- Fraudulent government notices claiming tax refunds
- Fake job offers requiring personal information

### 2. SMS Phishing (Smishing)
- Fake OTP messages claiming account suspension
- Fraudulent delivery notifications with malicious links
- Fake prize notifications from telecom companies

### 3. WhatsApp Phishing
- Fake messages from "family members" asking for money
- Fraudulent business verification requests
- Fake customer support contacts

## How to Identify Phishing Attempts

### Red Flags to Watch For:
1. **Urgent language**: "Act now or your account will be closed"
2. **Generic greetings**: "Dear Customer" instead of your name
3. **Suspicious links**: URLs that don't match the claimed sender
4. **Grammar mistakes**: Poor spelling and grammar in official communications
5. **Unexpected attachments**: Files you weren't expecting

### Technical Indicators:
- Check the sender's email address carefully
- Hover over links to see the actual destination
- Look for HTTPS in website URLs
- Verify contact information independently

## Protection Strategies

### For Individuals:
1. **Never share OTPs** with anyone over phone or message
2. **Verify independently** - call the organization directly
3. **Use official apps** instead of clicking links in messages
4. **Enable two-factor authentication** on all important accounts
5. **Keep software updated** with latest security patches

### For Families:
1. **Educate elderly members** about common scams
2. **Create a family code word** for emergency requests
3. **Set up account alerts** for all financial transactions
4. **Regular security discussions** about new threats

## What to Do If You've Been Phished

### Immediate Actions:
1. **Change passwords** for affected accounts immediately
2. **Contact your bank** if financial information was compromised
3. **Monitor accounts** for unauthorized transactions
4. **Report the incident** to cybercrime.gov.in
5. **Inform contacts** if your email/social media was compromised

### Recovery Steps:
1. **Document everything** - take screenshots of fraudulent messages
2. **File a police complaint** with all evidence
3. **Contact credit agencies** if identity theft is suspected
4. **Monitor credit reports** for unusual activity

## Reporting Phishing Attacks

### Government Resources:
- **National Cyber Crime Reporting Portal**: cybercrime.gov.in
- **Cyber Crime Helpline**: 1930
- **Local police cyber crime units**

### Bank-Specific Reporting:
- Most banks have dedicated fraud helplines
- Report immediately to freeze accounts if needed
- Follow up with written complaints

## Advanced Protection Techniques

### Technical Solutions:
1. **Use reputable antivirus software** with real-time protection
2. **Enable email filtering** to block suspicious messages
3. **Use password managers** to avoid reusing passwords
4. **Regular security audits** of your online accounts

### Behavioral Changes:
1. **Think before you click** - pause and verify
2. **When in doubt, don't** - it's better to be safe
3. **Stay informed** about latest phishing trends
4. **Share knowledge** with friends and family

## Conclusion

Phishing attacks will continue to evolve, but by staying informed and following these protection strategies, you can significantly reduce your risk. Remember, the best defense against phishing is a combination of technical tools and human awareness.

Stay vigilant, stay safe, and help others by sharing this knowledge with your community.
    `,
    category: "Email Security",
    author: "Dr. Priya Sharma",
    publishDate: "2024-01-15",
    readTime: "12 min",
    difficulty: "Beginner",
    views: 15420,
    likes: 892,
    rating: 4.8,
    tags: ["phishing", "email", "security", "beginners"],
    featured: true,
    trending: true,
  }

  const relatedArticles = [
    {
      id: "mobile-banking-security",
      title: "Mobile Banking Security: Best Practices for Indian Users",
      readTime: "8 min",
      category: "Mobile Security",
    },
    {
      id: "upi-fraud-prevention",
      title: "UPI Fraud Prevention: Protecting Your Digital Payments",
      readTime: "10 min",
      category: "Financial Security",
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto max-w-4xl px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link href="/articles" className="hover:text-primary transition-colors">
            Articles
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{article.category}</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground truncate">{article.title}</span>
        </div>

        {/* Back Button */}
        <Link href="/articles">
          <Button variant="ghost" className="mb-6 hover-lift">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Articles
          </Button>
        </Link>

        {/* Article Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center space-x-2 mb-4">
            <Badge variant="outline">{article.category}</Badge>
            <Badge className={getDifficultyColor(article.difficulty)}>{article.difficulty}</Badge>
            {article.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
            {article.trending && <Badge className="bg-red-100 text-red-800">Trending</Badge>}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">{article.title}</h1>

          <p className="text-xl text-muted-foreground mb-6 leading-relaxed">{article.excerpt}</p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(article.publishDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>{article.views.toLocaleString()} views</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>{article.rating} rating</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 mb-8">
            <Button className="btn-primary">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Like ({article.likes})
            </Button>
            <Button variant="outline" className="hover-lift bg-transparent">
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" className="hover-lift bg-transparent">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Reading Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Reading Progress</span>
              <span className="font-semibold text-primary">0%</span>
            </div>
            <Progress value={0} className="h-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-3">
            <Card className="card-modern animate-slide-up">
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  <div className="whitespace-pre-line text-foreground leading-relaxed">{article.content}</div>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="hover:bg-primary/10 cursor-pointer">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-12">
              <Card className="card-modern">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Comments & Discussion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Share your thoughts and experiences with the community.</p>
                  <Button className="btn-primary">Join Discussion</Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Info */}
            <Card className="card-modern animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg">About the Author</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                    PS
                  </div>
                  <div>
                    <div className="font-semibold">{article.author}</div>
                    <div className="text-sm text-muted-foreground">Cyber Security Expert</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  15+ years experience in cybersecurity, former CERT-In analyst, and author of multiple security
                  publications.
                </p>
              </CardContent>
            </Card>

            {/* Related Articles */}
            <Card className="card-modern animate-fade-in animation-delay-200">
              <CardHeader>
                <CardTitle className="text-lg">Related Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.id}
                      href={`/articles/${related.id}`}
                      className="block p-3 border rounded-lg hover:shadow-md transition-all hover-lift"
                    >
                      <div className="font-semibold text-sm mb-1">{related.title}</div>
                      <div className="text-xs text-muted-foreground flex items-center space-x-2">
                        <span>{related.category}</span>
                        <span>•</span>
                        <span>{related.readTime}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-modern animate-fade-in animation-delay-400">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/quiz">
                  <Button variant="outline" className="w-full hover-lift bg-transparent">
                    Take Related Quiz
                  </Button>
                </Link>
                <Link href="/study">
                  <Button variant="outline" className="w-full hover-lift bg-transparent">
                    Study Modules
                  </Button>
                </Link>
                <Link href="/tools">
                  <Button variant="outline" className="w-full hover-lift bg-transparent">
                    Security Tools
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
