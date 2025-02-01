"use client"
import { useEffect, useState } from 'react'

interface AnimatedHeadlineProps {
  phrases: string[]
  name: string
}

export function AnimatedHeadline({ phrases, name }: AnimatedHeadlineProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [showName, setShowName] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)
  
  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isTyping) {
      const currentPhrase = phrases[currentPhraseIndex]
      if (displayText.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1))
        }, 30)
      } else if (currentPhraseIndex === phrases.length - 1) {
        // For the last phrase, show name and wait
        timeout = setTimeout(() => {
          setShowName(true)
          // Start fade out after 3 seconds
          timeout = setTimeout(() => {
            setIsFadingOut(true)
            // Reset everything after fade out animation (1s)
            timeout = setTimeout(() => {
              setShowName(false)
              setIsFadingOut(false)
              setIsTyping(false)
            }, 1000)
          }, 3000)
        }, 1000)
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false)
        }, 1500)
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 30)
      } else {
        setCurrentPhraseIndex((prev) => (prev === phrases.length - 1 ? 0 : prev + 1))
        setIsTyping(true)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, isTyping, currentPhraseIndex, phrases, showName])

  return (
    <div className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
      <span className="text-primary">{displayText}</span>
      <span className="animate-blink">{!isFadingOut && "|"}</span>
      {showName && (
        <div className={`mt-2 ${isFadingOut ? "animate-fade-out" : "animate-fade-in"}`}>
          {name}
        </div>
      )}
    </div>
  )
}