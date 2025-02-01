"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import dynamic from 'next/dynamic'

// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

interface Media {
  type: 'image' | 'video'
  src: string
  alt?: string
  poster?: string
}

interface ImageCarouselProps {
  media: Media[]
  autoplay?: boolean
}

export function ImageCarousel({ media, autoplay = false }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = () => {
    setCurrentIndex((current) => (current === 0 ? media.length - 1 : current - 1))
  }

  const handleNext = () => {
    setCurrentIndex((current) => (current === media.length - 1 ? 0 : current + 1))
  }

  const currentMedia = media[currentIndex]

  return (
    <div className="relative w-full aspect-video">
      {/* Media Display */}
      <div className="relative h-full w-full rounded-lg overflow-hidden">
        {currentMedia.type === 'video' ? (
          <ReactPlayer
            url={currentMedia.src}
            width="100%"
            height="100%"
            controls
            playing={autoplay}
            playsinline
            volume={0.2}
            light={currentMedia.poster}
            config={{
              file: {
                attributes: {
                  poster: currentMedia.poster,
                  className: "object-cover",
                },
              },
            }}
          />
        ) : (
          <Image
            src={currentMedia.src}
            alt={currentMedia.alt || "Carousel image"}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      {/* Navigation Controls */}
      {media.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous slide</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next slide</span>
          </Button>
        </>
      )}
    </div>
  )
} 