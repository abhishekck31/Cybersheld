"use client"

import React, { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe, Check } from "lucide-react"

const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
]

export function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState("en")

  // Load Google Translate widget and set language when needed
  const loadGoogleTranslate = (languageCode: string) => {
    // ensure widget init function is defined
    ;(window as any).googleTranslateElementInit = () => {
      try {
        ;new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: languages.map((lang) => lang.code).join(","),
            layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element",
        )
      } catch (e) {
        // widget load failed
      }
    }

    if (!document.querySelector('script[src*="translate.google.com"]')) {
      const googleTranslateScript = document.createElement("script")
      googleTranslateScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      googleTranslateScript.async = true
      document.head.appendChild(googleTranslateScript)
    }

    // after short delay, try to set the combo value
    setTimeout(() => {
      const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null
      if (combo) {
        combo.value = languageCode
        combo.dispatchEvent(new Event('change'))
      }
    }, 900)
  }

  // Persist language selection across site
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("cs_lang")
      if (saved) {
        setCurrentLanguage(saved)
        if (saved !== 'en') {
          // attempt to load and apply translation immediately
          loadGoogleTranslate(saved)
        }
      }
    } catch (e) {
      // ignore
    }
  }, [])

  // Re-apply translation after client-side navigation so translated text persists
  const pathname = usePathname()
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("cs_lang")
      if (saved && saved !== 'en') {
        // re-run loader to reapply translation for new route
        loadGoogleTranslate(saved)
      }
    } catch (e) {
      // ignore
    }
  }, [pathname])



  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode)
    try {
      localStorage.setItem("cs_lang", languageCode)
    } catch (e) {
      // ignore
    }

    if (languageCode !== "en") {
      loadGoogleTranslate(languageCode)
    } else {
      // If switching back to English, reload page without translation (best-effort)
      const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null
      if (combo) {
        combo.value = 'en'
        combo.dispatchEvent(new Event('change'))
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
        <DropdownMenuContent
          align="end"
          className="w-56 bg-black/80 backdrop-blur-md border border-cyan-900/30 shadow-lg overflow-hidden"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 10%, rgba(0,255,247,0.04), transparent 20%), radial-gradient(circle at 80% 90%, rgba(56,189,248,0.03), transparent 30%)' }}
        >
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`flex items-center justify-between px-3 py-2 hover:bg-white/5 ${currentLanguage === language.code ? 'bg-white/5' : ''}`}
            >
              <div className="flex flex-col">
                <span className="font-medium text-white">{language.nativeName}</span>
                <span className="text-xs text-gray-400">{language.name}</span>
              </div>
              {currentLanguage === language.code && <Check className="h-4 w-4 text-cyan-400" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Hidden div for Google Translate widget (needed by the script) */}
      <div id="google_translate_element" style={{ display: currentLanguage === 'en' ? 'none' : 'block', position: 'absolute', left: -9999 }} />
    </div>
  )
}
