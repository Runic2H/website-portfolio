'use client'
import { Space } from "lucide-react"
import Link from "next/link"
import { Github, Linkedin } from "lucide-react"
import { MagneticButton } from "./ui/magnetic-button"

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container max-w-screen-xl mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
          <p className="text-center text-sm leading-loose md:text-left">
            Copyright © 2025 <span className="mx-2">|</span>
            <Link href="/" className="font-medium underline underline-offset-4">
             Elton Teo
            </Link>
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <MagneticButton 
            variant="ghost"
            size="icon"
            asChild
          >
            <Link 
              href="https://github.com/runic2h" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </Link>
          </MagneticButton>
          <MagneticButton 
            variant="ghost"
            size="icon"
            asChild
          >
            <Link 
              href="https://linkedin.com/in/eltonteo99" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          </MagneticButton>
        </div>
      </div>
    </footer>
  )
}

export default Footer

