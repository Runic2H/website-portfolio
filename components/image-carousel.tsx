"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import dynamic from 'next/dynamic'
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

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
  delay?: number
}

export function ImageCarousel({ media, autoplay = false, delay = 5000 }: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "center",
      skipSnaps: false,
      dragFree: false,
    },
    autoplay ? [
      Autoplay({
        delay: delay,
        stopOnInteraction: true,
        rootNode: (emblaRoot) => emblaRoot.parentElement,
      })
    ] : []
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div 
      className="relative w-full aspect-video"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media Display */}
      <div className="overflow-hidden rounded-lg h-full" ref={emblaRef}>
        <div className="flex h-full">
          {media.map((item, index) => (
            <div 
              key={index}
              className="relative flex-[0_0_100%] min-w-0 h-full"
            >
              {item.type === 'video' ? (
                <ReactPlayer
                  url={item.src}
                  width="100%"
                  height="100%"
                  controls
                  playing={autoplay}
                  playsinline
                  volume={0.2}
                  light={item.poster}
                  config={{
                    file: {
                      attributes: {
                        poster: item.poster,
                        className: "object-cover",
                      },
                    },
                  }}
                />
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt || "Carousel image"}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls - Only show when hovered and multiple items exist */}
      {media.length > 1 && (
        <div className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous slide</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
            onClick={scrollNext}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next slide</span>
          </Button>

          {/* Dots Pagination */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {media.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === selectedIndex 
                    ? "bg-primary w-4" 
                    : "bg-primary/50 hover:bg-primary/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 