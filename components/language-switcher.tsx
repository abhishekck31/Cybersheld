"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe, Check } from "lucide-react"

const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
]

export function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState("en")

  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode)

    // In a real implementation, this would integrate with Google Translate API
    // For demo purposes, we'll just show the selection
    console.log(`[v0] Language changed to: ${languageCode}`)

    // Mock Google Translate integration
    if (languageCode !== "en") {
      // Add Google Translate widget or API call here
      const googleTranslateScript = document.createElement("script")
      googleTranslateScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"

      // Create the translate function
      ;(window as any).googleTranslateElementInit = () => {
        ;new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: languages.map((lang) => lang.code).join(","),
            layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element",
        )
      }

      if (!document.querySelector('script[src*="translate.google.com"]')) {
        document.head.appendChild(googleTranslateScript)
      }
    }
  }

  const currentLang = languages.find((lang) => lang.code === currentLanguage) || languages[0]

  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="bg-transparent">
            <Globe className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">{currentLang.nativeName}</span>
            <span className="sm:hidden">{currentLang.code.toUpperCase()}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className="flex items-center justify-between"
            >
              <div className="flex flex-col">
                <span className="font-medium">{language.nativeName}</span>
                <span className="text-xs text-gray-600">{language.name}</span>
              </div>
              {currentLanguage === language.code && <Check className="h-4 w-4 text-cyan-600" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Hidden div for Google Translate widget */}
      <div id="google_translate_element" className="hidden"></div>
    </div>
  )
}
