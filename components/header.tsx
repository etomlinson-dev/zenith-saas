"use client"

import { useState, useEffect } from "react"
import { LeLoLogo } from "./lelo-logo"
import { Button } from "./ui/button"
import { LayoutDashboard, Kanban, Box, Users, MapPin, UserCog, Cpu, Bot } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      setIsScrolled(currentScrollY > 50)

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <header
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div
        className={`flex items-center justify-center gap-6 px-6 py-3 rounded-2xl border transition-all duration-300 border-zinc-700 text-transparent opacity-100 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-xl border-border/40 shadow-2xl"
            : "bg-background/95 backdrop-blur-lg border-border/30 shadow-lg"
        }`}
      >
        <a href="/" className="transform transition-transform duration-200 hover:scale-105">
          <LeLoLogo />
        </a>

        <nav className="hidden md:flex items-center gap-6">
          <a
            href="/hub"
            className="relative text-foreground/80 hover:text-foreground transition-all duration-300 group px-3 py-1 rounded-lg hover:bg-foreground/5 transform hover:scale-110 hover:rotate-1 hover:skew-x-1 flex items-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            Hub
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-4"></span>
          </a>
          <a
            href="/projects"
            className="relative text-foreground/80 hover:text-foreground transition-all duration-300 group px-3 py-1 rounded-lg hover:bg-foreground/5 transform hover:scale-110 hover:-rotate-1 hover:-skew-x-1 flex items-center gap-2"
          >
            <Kanban className="w-4 h-4" />
            PM
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-4"></span>
          </a>
          <a
            href="/inventory"
            className="relative text-foreground/80 hover:text-foreground transition-all duration-300 group px-3 py-1 rounded-lg hover:bg-foreground/5 transform hover:scale-110 hover:rotate-1 hover:skew-x-1 flex items-center gap-2"
          >
            <Box className="w-4 h-4" />
            Inventory
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-4"></span>
          </a>
          <a
            href="/hr"
            className="relative text-foreground/80 hover:text-foreground transition-all duration-300 group px-3 py-1 rounded-lg hover:bg-foreground/5 transform hover:scale-110 hover:rotate-1 hover:skew-x-1 flex items-center gap-2"
          >
            <UserCog className="w-4 h-4" />
            HR
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-4"></span>
          </a>
          <a
            href="/workforce"
            className="relative text-foreground/80 hover:text-foreground transition-all duration-300 group px-3 py-1 rounded-lg hover:bg-foreground/5 transform hover:scale-110 hover:-rotate-1 hover:-skew-x-1 flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            WFM
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-4"></span>
          </a>
          <a
            href="/manufacturing"
            className="relative text-foreground/80 hover:text-foreground transition-all duration-300 group px-3 py-1 rounded-lg hover:bg-foreground/5 transform hover:scale-110 hover:-rotate-1 hover:-skew-x-1 flex items-center gap-2 whitespace-nowrap"
          >
            <Cpu className="w-4 h-4" />
            Z-MO
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-4"></span>
          </a>
          <a
            href="/automation"
            className="relative text-foreground/80 hover:text-foreground transition-all duration-300 group px-3 py-1 rounded-lg hover:bg-foreground/5 transform hover:scale-110 hover:rotate-1 hover:skew-x-1 flex items-center gap-2"
          >
            <Bot className="w-4 h-4" />
            Automation
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-4"></span>
          </a>
          <a
            href="/customer-success"
            className="relative text-foreground/80 hover:text-foreground transition-all duration-300 group px-3 py-1 rounded-lg hover:bg-foreground/5 transform hover:scale-110 hover:rotate-1 hover:skew-x-1 flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            CSP
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-4"></span>
          </a>
          <a
            href="#pricing"
            className="relative text-foreground/80 hover:text-foreground transition-all duration-300 group px-3 py-1 rounded-lg hover:bg-foreground/5 transform hover:scale-110 hover:-rotate-1 hover:-skew-x-1"
          >
            Pricing
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-4"></span>
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-foreground/80 hover:text-foreground hover:bg-foreground/10 transition-all duration-200 rounded-xl"
          >
            Sign In
          </Button>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground transform transition-all duration-200 hover:scale-105 hover:shadow-lg rounded-xl"
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
