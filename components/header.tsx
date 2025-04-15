"use client"

import { useState } from "react"
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { MagneticButton } from "./ui/magnetic-button"
import { Menu } from "lucide-react"
import { useActiveSection } from "@/context/active-section-context"
import { cn } from "@/lib/utils"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { activeSection, setActiveSection } = useActiveSection()

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ]

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      const offset = 80 // Height of the header plus some padding
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })

      setTimeout(() => {
        const sectionId = href.slice(1)
        const section = document.getElementById(sectionId)
        if (section) {
          section.focus({ preventScroll: true })
        }
      }, 100)
    }
    if (isMenuOpen) setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-screen-xl mx-auto flex h-14 items-center px-4 md:px-6">
        <div className="mr-4 hidden md:flex">
          <MagneticButton 
            variant="ghost"
            asChild
            className="mr-6 flex items-center space-x-2"
            onClick={() => setActiveSection(null)}
          >
            <Link href="/">
              <span className="hidden font-bold sm:inline-block">Elton Teo</span>
            </Link>
          </MagneticButton>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <MagneticButton
                key={item.href}
                variant="ghost"
                asChild
                className={cn(
                  "transition-all hover:text-foreground/80 relative py-1",
                  activeSection === item.href.slice(1)
                    ? "text-foreground after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-primary after:content-['']"
                    : "text-foreground/60"
                )}
                onClick={(e) => handleClick(e as any, item.href)}
              >
                <Link href={item.href}>
                  {item.label}
                </Link>
              </MagneticButton>
            ))}
          </nav>
        </div>
        <MagneticButton
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus:ring-0 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </MagneticButton>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">{/* Add search functionality if needed */}</div>
          <nav className="flex items-center">
            <ModeToggle />
          </nav>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container max-w-screen-xl mx-auto border-t py-4 md:hidden px-4 md:px-6">
          <nav className="flex flex-col space-y-4 text-sm font-medium">
            {navItems.map((item) => (
              <MagneticButton
                key={item.href}
                variant="ghost"
                asChild
                className={cn(
                  "px-4 py-2 rounded-md transition-colors",
                  activeSection === item.href.slice(1)
                    ? "bg-primary/10 text-foreground"
                    : "text-foreground/60 hover:text-foreground/80"
                )}
                onClick={(e) => handleClick(e as any, item.href)}
              >
                <Link href={item.href}>
                  {item.label}
                </Link>
              </MagneticButton>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header

