"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import {
  Menu,
  Shield,
  Globe,
  Phone,
  BookOpen,
  Zap,
  AlertTriangle,
  User,
  GraduationCap,
  ChevronDown,
  LogIn,
} from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/knowledge", label: "Knowledge Hub", icon: BookOpen },
    { href: "/learn", label: "Learning Modules", icon: GraduationCap },
    { href: "/quiz", label: "Scam Quiz", icon: Zap },
    { href: "/articles", label: "Articles", icon: BookOpen },
    { href: "/tools", label: "Security Tools", icon: Shield },
    { href: "/report", label: "Report Scam", icon: Phone },
    { href: "/news", label: "Latest News", icon: Globe },
    { href: "/dashboard", label: "Dashboard", icon: User },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full bg-black border-b border-cyan-400/60 shadow-[0_2px_24px_0_rgba(0,255,255,0.08)] animate-fade-in">
      <div className="container flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="p-3 bg-gradient-to-br from-cyan-500 via-blue-700 to-fuchsia-600 rounded-2xl shadow-lg group-hover:shadow-cyan-400/30 transition-all duration-300 animate-pulse-slow">
            <Shield className="h-8 w-8 text-cyan-300 drop-shadow-[0_0_8px_cyan]" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-2xl text-cyan-300 drop-shadow-[0_0_6px_cyan] tracking-wide">CyberShield</span>
            <span className="text-sm text-fuchsia-400 font-medium tracking-wider">India</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {navItems.slice(0, 4).map((item, index) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 text-sm font-semibold text-cyan-200 hover:text-fuchsia-400 transition-all duration-300 hover:scale-105 group stagger-animation"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Icon className="h-4 w-4 group-hover:text-fuchsia-400 transition-colors duration-300" />
                <span>{item.label}</span>
              </Link>
            )
          })}

          <div className="relative group">
            <Button variant="ghost" className="text-sm font-semibold text-cyan-200 hover:text-fuchsia-400">
              More
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-[#18181b] border border-cyan-400/40 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              {navItems.slice(4).map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-2 px-4 py-3 text-sm text-cyan-200 hover:text-fuchsia-400 hover:bg-cyan-900/20 transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="stagger-animation" style={{ animationDelay: "500ms" }}>
            <LanguageSwitcher />
          </div>

          <div className="flex items-center space-x-3">
            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="outline"
                  className="border-cyan-400 text-cyan-300 hover:bg-cyan-700 hover:text-black flex items-center space-x-2 bg-transparent shadow-cyan-400/20"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 ring-2 ring-cyan-400",
                    userButtonPopoverCard: "bg-[#18181b] border-cyan-400/40",
                    userButtonPopoverActionButton: "text-cyan-200 hover:text-fuchsia-400 hover:bg-cyan-900/20",
                  },
                }}
              />
            </SignedIn>
          </div>

          <Button
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white flex items-center space-x-2 neon-glow animate-bounce-in border-2 border-cyan-400/60 shadow-cyan-400/20"
            style={{ animationDelay: "600ms" }}
          >
            <AlertTriangle className="h-4 w-4" />
            <span>Emergency: 1930</span>
          </Button>
        </div>

        <div className="md:hidden flex items-center space-x-3">
          <LanguageSwitcher />
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" size="icon" className="text-cyan-300 hover:text-fuchsia-400">
                <LogIn className="h-5 w-5" />
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 ring-2 ring-cyan-400",
                },
              }}
            />
          </SignedIn>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-cyan-300 hover:text-fuchsia-400">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-black border-cyan-400/40">
              <div className="flex flex-col space-y-6 mt-12">
                <div className="text-center mb-8 animate-scale-in">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-cyan-500 via-blue-700 to-fuchsia-600 rounded-2xl shadow-lg">
                      <Shield className="h-6 w-6 text-cyan-300 drop-shadow-[0_0_8px_cyan]" />
                    </div>
                    <span className="font-bold text-xl text-cyan-300 drop-shadow-[0_0_6px_cyan] tracking-wide">CyberShield India</span>
                  </div>
                </div>

                <SignedOut>
                  <SignInButton mode="modal">
                    <Button className="w-full bg-cyan-700 hover:bg-fuchsia-700 text-white flex items-center justify-center space-x-2 py-3 border-2 border-cyan-400/60">
                      <LogIn className="h-5 w-5" />
                      <span>Sign In</span>
                    </Button>
                  </SignInButton>
                </SignedOut>

                {navItems.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-4 text-lg font-semibold text-cyan-200 hover:text-fuchsia-400 transition-all duration-300 hover:scale-105 p-4 rounded-2xl hover:bg-cyan-900/20 stagger-animation card-glow"
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="p-3 bg-cyan-900/30 rounded-xl">
                        <Icon className="h-5 w-5 text-fuchsia-400" />
                      </div>
                      <span>{item.label}</span>
                    </Link>
                  )
                })}

                <Button
                  className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white mt-8 w-full py-4 text-lg flex items-center justify-center space-x-2 border-2 border-cyan-400/60 animate-bounce-in"
                  style={{ animationDelay: "800ms" }}
                >
                  <AlertTriangle className="h-5 w-5" />
                  <span>Emergency: 1930</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
