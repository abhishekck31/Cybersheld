"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { FooterSection } from "@/components/footer-section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Search, Clock, User, Star, TrendingUp, Eye, Heart } from "lucide-react"

interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  publishDate: string
  readTime: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  views: number
  likes: number
  rating: number
  tags: string[]
  featured: boolean
  trending: boolean
  imageUrl?: string
}

const articles: Article[] = [
  {
    id: "complete-phishing-guide",
    title: "The Complete Guide to Phishing Protection in 2024",
    excerpt: "Learn everything you need to know about identifying, avoiding, and reporting phishing attacks in India.",
    content: "Detailed content about phishing protection...",
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
  },
  {
    id: "mobile-banking-security",
    title: "Mobile Banking Security: Best Practices for Indian Users",
    excerpt: "Essential security measures to protect your mobile banking transactions and personal data.",
    content: "Comprehensive guide on mobile banking security...",
    category: "Mobile Security",
    author: "Rajesh Kumar",
    publishDate: "2024-01-12",
    readTime: "8 min",
    difficulty: "Intermediate",
    views: 12350,
    likes: 654,
    rating: 4.7,
    tags: ["mobile", "banking", "UPI", "security"],
    featured: true,
    trending: false,
  },
  {
    id: "upi-fraud-prevention",
    title: "UPI Fraud Prevention: Protecting Your Digital Payments",
    excerpt: "Common UPI scams and how to protect yourself from fraudulent payment requests and fake apps.",
    content: "Detailed analysis of UPI fraud techniques...",
    category: "Financial Security",
    author: "Anita Desai",
    publishDate: "2024-01-10",
    readTime: "10 min",
    difficulty: "Beginner",
    views: 18750,
    likes: 1205,
    rating: 4.9,
    tags: ["UPI", "payments", "fraud", "prevention"],
    featured: false,
    trending: true,
  },
  {
    id: "social-engineering-tactics",
    title: "Understanding Social Engineering: Psychology of Cyber Attacks",
    excerpt: "How cybercriminals manipulate human psychology to steal information and money.",
    content: "Deep dive into social engineering techniques...",
    category: "Psychology",
    author: "Dr. Vikram Singh",
    publishDate: "2024-01-08",
    readTime: "15 min",
    difficulty: "Advanced",
    views: 8920,
    likes: 445,
    rating: 4.6,
    tags: ["social engineering", "psychology", "manipulation", "advanced"],
    featured: false,
    trending: false,
  },
  {
    id: "senior-citizen-cyber-safety",
    title: "Cyber Safety Guide for Senior Citizens",
    excerpt: "Simple and practical cyber security tips specifically designed for older adults in India.",
    content: "Senior-friendly cyber security guide...",
    category: "Demographics",
    author: "Meera Patel",
    publishDate: "2024-01-05",
    readTime: "6 min",
    difficulty: "Beginner",
    views: 9840,
    likes: 567,
    rating: 4.8,
    tags: ["seniors", "elderly", "simple", "practical"],
    featured: false,
    trending: false,
  },
  {
    id: "cryptocurrency-scams-india",
    title: "Cryptocurrency Scams in India: What You Need to Know",
    excerpt: "Identifying and avoiding fake cryptocurrency investment schemes targeting Indian investors.",
    content: "Comprehensive analysis of crypto scams...",
    category: "Investment Security",
    author: "Arjun Mehta",
    publishDate: "2024-01-03",
    readTime: "11 min",
    difficulty: "Intermediate",
    views: 11200,
    likes: 678,
    rating: 4.5,
    tags: ["cryptocurrency", "investment", "scams", "blockchain"],
    featured: false,
    trending: true,
  },
]

const categories = [
  "All",
  "Email Security",
  "Mobile Security",
  "Financial Security",
  "Psychology",
  "Demographics",
  "Investment Security",
]

const popularTags = [
  "phishing",
  "UPI",
  "mobile",
  "banking",
  "fraud",
  "prevention",
  "beginners",
  "advanced",
  "seniors",
  "investment",
]

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("latest")

  const filteredArticles = articles
    .filter((article) => {
      const matchesCategory = selectedCategory === "All" || article.category === selectedCategory
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.views - a.views
        case "rating":
          return b.rating - a.rating
        case "latest":
        default:
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      }
    })

  const featuredArticles = articles.filter((article) => article.featured)
  const trendingArticles = articles.filter((article) => article.trending)

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

      <main className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 glass-effect px-6 py-3 rounded-full">
              <BookOpen className="h-5 w-5 text-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary">Cyber Security Knowledge Base</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Security Articles</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive guides, tutorials, and insights to help you stay safe in the digital world
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-8">
            <div className="card-modern p-4 text-center">
              <div className="text-2xl font-bold text-primary">{articles.length}</div>
              <div className="text-sm text-muted-foreground">Articles</div>
            </div>
            <div className="card-modern p-4 text-center">
              <div className="text-2xl font-bold text-secondary">{categories.length - 1}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="card-modern p-4 text-center">
              <div className="text-2xl font-bold text-accent">75K+</div>
              <div className="text-sm text-muted-foreground">Readers</div>
            </div>
            <div className="card-modern p-4 text-center">
              <div className="text-2xl font-bold text-green-600">4.7</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="animate-slide-up">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
            <TabsTrigger value="all">All Articles</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* Search and Filters */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search articles, topics, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border rounded-lg bg-background"
                  >
                    <option value="latest">Latest</option>
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "btn-primary" : "hover-lift"}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Popular Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground mr-2">Popular tags:</span>
                {popularTags.slice(0, 6).map((tag) => (
                  <Button
                    key={tag}
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery(tag)}
                    className="text-xs h-6 px-2 text-primary hover:bg-primary/10"
                  >
                    #{tag}
                  </Button>
                ))}
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <Card
                  key={article.id}
                  className="card-modern hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="outline" className="text-xs">
                        {article.category}
                      </Badge>
                      <Badge className={getDifficultyColor(article.difficulty)}>{article.difficulty}</Badge>
                    </div>

                    <CardTitle className="text-lg font-bold leading-tight hover:text-primary transition-colors">
                      <Link href={`/articles/${article.id}`}>{article.title}</Link>
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed mb-4">{article.excerpt}</CardDescription>

                    {/* Article Meta */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{article.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-3 w-3" />
                          <span>{article.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span>{article.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs px-2 py-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Link href={`/articles/${article.id}`}>
                      <Button className="btn-primary w-full">Read Article</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article, index) => (
                <Card
                  key={article.id}
                  className="card-modern hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                      <Badge className={getDifficultyColor(article.difficulty)}>{article.difficulty}</Badge>
                    </div>
                    <CardTitle className="text-2xl font-bold leading-tight">
                      <Link href={`/articles/${article.id}`} className="hover:text-primary transition-colors">
                        {article.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed mb-6">{article.excerpt}</CardDescription>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-sm">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold">{article.rating}</span>
                      </div>
                    </div>

                    <Link href={`/articles/${article.id}`}>
                      <Button className="btn-primary w-full text-lg py-3">Read Featured Article</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending">
            <div className="space-y-6">
              {trendingArticles.map((article, index) => (
                <Card
                  key={article.id}
                  className="card-modern hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className="bg-red-100 text-red-800">Trending</Badge>
                          <Badge className={getDifficultyColor(article.difficulty)}>{article.difficulty}</Badge>
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          <Link href={`/articles/${article.id}`} className="hover:text-primary transition-colors">
                            {article.title}
                          </Link>
                        </h3>
                        <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{article.author}</span>
                            <span>{article.readTime}</span>
                            <div className="flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                              <span>{article.views.toLocaleString()}</span>
                            </div>
                          </div>
                          <Link href={`/articles/${article.id}`}>
                            <Button variant="outline" className="hover-lift bg-transparent">
                              Read Now
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Newsletter Signup */}
        <div className="mt-16 text-center">
          <Card className="glass-effect border-2 border-primary/20 max-w-2xl mx-auto animate-fade-in">
            <CardContent className="pt-8">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Stay Informed</h3>
              <p className="text-muted-foreground mb-6">
                Get the latest cyber security articles and insights delivered to your inbox weekly
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input placeholder="Enter your email" className="flex-1" />
                <Button className="btn-primary">Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
