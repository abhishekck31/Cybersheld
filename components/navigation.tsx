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
    <nav className="sticky top-0 z-50 w-full glass-effect border-b border-gray-700/50 animate-fade-in">
      <div className="container flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-3 hover-lift group">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 animate-pulse-slow">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-2xl gradient-text">CyberShield</span>
            <span className="text-sm text-gray-400 font-medium">India</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {navItems.slice(0, 4).map((item, index) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 text-sm font-semibold text-gray-300 hover:text-blue-400 transition-all duration-300 hover:scale-105 group stagger-animation"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Icon className="h-4 w-4 group-hover:text-blue-400 transition-colors duration-300" />
                <span>{item.label}</span>
              </Link>
            )
          })}

          <div className="relative group">
            <Button variant="ghost" className="text-sm font-semibold text-gray-300 hover:text-blue-400">
              More
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              {navItems.slice(4).map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-300 hover:text-blue-400 hover:bg-gray-700/50 transition-colors"
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
                  className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white flex items-center space-x-2 bg-transparent"
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
                    avatarBox: "w-10 h-10",
                    userButtonPopoverCard: "bg-gray-800 border-gray-700",
                    userButtonPopoverActionButton: "text-gray-300 hover:text-blue-400 hover:bg-gray-700",
                  },
                }}
              />
            </SignedIn>
          </div>

          <Button
            className="bg-red-600 hover:bg-red-700 text-white flex items-center space-x-2 pulse-glow animate-bounce-in"
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
              <Button variant="ghost" size="icon" className="text-blue-400 hover:text-blue-300">
                <LogIn className="h-5 w-5" />
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
            />
          </SignedIn>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover-lift text-gray-300 hover:text-blue-400">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] glass-effect border-gray-700">
              <div className="flex flex-col space-y-6 mt-12">
                <div className="text-center mb-8 animate-scale-in">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-bold text-xl gradient-text">CyberShield India</span>
                  </div>
                </div>

                <SignedOut>
                  <SignInButton mode="modal">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2 py-3">
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
                      className="flex items-center space-x-4 text-lg font-semibold text-gray-300 hover:text-blue-400 transition-all duration-300 hover:scale-105 p-4 rounded-2xl hover:bg-gray-800/50 stagger-animation card-glow"
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="p-3 bg-gray-700/50 rounded-xl">
                        <Icon className="h-5 w-5 text-blue-400" />
                      </div>
                      <span>{item.label}</span>
                    </Link>
                  )
                })}

                <Button
                  className="bg-red-600 hover:bg-red-700 text-white mt-8 w-full py-4 text-lg flex items-center justify-center space-x-2 animate-bounce-in"
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
