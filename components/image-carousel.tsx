"use client"

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"

interface CarouselMedia {
  type: 'image' | 'video'
  src: string
  alt?: string
  poster?: string // Thumbnail for video
}

interface ImageCarouselProps {
  media: CarouselMedia[]
  autoplay?: boolean
  autoplayDelay?: number
}

export function ImageCarousel({ 
  media, 
  autoplay = false, 
  autoplayDelay = 5000 
}: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "center",
      skipSnaps: false,
      dragFree: false,
    },
    (autoplay && media.length > 1) ? [
      Autoplay({
        delay: autoplayDelay,
        stopOnInteraction: true,
        rootNode: (emblaRoot) => emblaRoot.parentElement,
      })
    ] : []
  )

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  // Pause autoplay when video is playing
  const handleVideoPlay = useCallback(() => {
    if (emblaApi) {
      const autoplayPlugin = emblaApi.plugins().autoplay
      if (autoplayPlugin) autoplayPlugin.stop()
    }
  }, [emblaApi])

  // Resume autoplay when video is paused
  const handleVideoPause = useCallback(() => {
    if (emblaApi && autoplay) {
      const autoplayPlugin = emblaApi.plugins().autoplay
      if (autoplayPlugin) autoplayPlugin.play()
    }
  }, [emblaApi, autoplay])

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {media.map((item, index) => (
            <div 
              key={index}
              className="relative flex-[0_0_100%] min-w-0"
            >
              <div className="relative aspect-video">
                {item.type === 'video' ? (
                  <div className="relative" style={{ zIndex: 100 }}>
                    <video
                      src={item.src}
                      poster={item.poster}
                      className="w-full h-full object-cover"
                      controls
                      controlsList="nodownload"
                      playsInline
                      preload="metadata"
                      onPlay={handleVideoPlay}
                      onPause={handleVideoPause}
                      style={{ position: 'relative', zIndex: 100 }}
                    >
                      <source src={item.src} type="video/mp4" />
                      <source src={item.src.replace('.mp4', '.webm')} type="video/webm" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt || ''}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Only show navigation buttons if there's more than one item */}
      {media.length > 1 && (
        <div className={`absolute inset-0 flex items-center justify-between p-4 pointer-events-none transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm pointer-events-auto"
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm pointer-events-auto"
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
      )}

      {/* Only show dots if there's more than one item */}
      {media.length > 1 && (
        <div className={`absolute bottom-4 left-0 right-0 pointer-events-none transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex justify-center gap-2">
            {media.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-all pointer-events-auto ${
                  index === selectedIndex
                    ? "bg-primary w-4"
                    : "bg-primary/50"
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 