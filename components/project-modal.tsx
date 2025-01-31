"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Globe } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { VisuallyHidden } from "@/components/ui/visually-hidden"
import { ImageCarousel } from "@/components/image-carousel"

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    title: string
    description: string
    image: string
    media?: Array<{
      type: 'image' | 'video'
      src: string
      alt?: string
      poster?: string
    }>
    longDescription: string
    technologies: string[]
    tags: string[]
    liveUrl?: string
    githubUrl?: string
    features?: string[]
    contributions?: string[]
  }
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  // For local images, use relative paths from the public directory
  const projectMedia = project.media ?? [{
    type: 'image' as const,
    src: project.image.startsWith('http') 
      ? project.image 
      : `/assets/projects/${project.image}`,
    alt: project.title
  }];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[80vh] overflow-y-auto">
        <VisuallyHidden>
          <DialogTitle>Project: {project.title}</DialogTitle>
        </VisuallyHidden>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="relative z-0"
            >
              {/* Project Images Carousel */}
              <motion.div 
                className="relative w-full aspect-video rounded-lg overflow-hidden mb-6"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {projectMedia ? (
                  <div className="relative" style={{ isolation: 'isolate' }}>
                    <ImageCarousel media={projectMedia} autoplay={false} />
                  </div>
                ) : (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={true}
                    className="object-cover"
                    onError={(e) => {
                      console.error(`Failed to load image: ${project.image}`);
                      // Optionally set a fallback image
                      e.currentTarget.src = '/assets/fallback-image.jpg';
                    }}
                  />
                )}
              </motion.div>

              {/* Rest of the content with adjusted z-indices */}
              <div className="relative z-10">
                {/* Project Title */}
                <motion.h2 
                  className="text-2xl font-bold mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  {project.title}
                </motion.h2>

                {/* Technologies */}
                <motion.div 
                  className="flex flex-wrap gap-2 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.15 }}
                >
                  {project.technologies.map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.15, delay: 0.05 * index }}
                    >
                      <Badge variant="secondary">{tech}</Badge>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Long Description */}
                <motion.p 
                  className="text-muted-foreground mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                >
                  {project.longDescription}
                </motion.p>

                {/* Features Section - Only show if features exist */}
                {project.features && project.features.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.25 }}
                  >
                    <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                    <ul className="space-y-2 mb-6">
                      {project.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.15, delay: 0.3 + (index * 0.05) }}
                          className="flex items-center space-x-2"
                        >
                          <span className="w-2 h-2 bg-primary rounded-full" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Contributions Section - Only show if contributions exist */}
                {project.contributions && project.contributions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.25 }}
                  >
                    <h3 className="text-xl font-semibold mb-3">Contributions</h3>
                    <ul className="space-y-2 mb-6">
                      {project.contributions.map((contribution, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.15, delay: 0.3 + (index * 0.05) }}
                          className="flex items-center space-x-2"
                        >
                          <span className="w-2 h-2 bg-primary rounded-full" />
                          <span>{contribution}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.35 }}
                >
                  {project.liveUrl && (
                    <Button asChild className="group">
                      <Link href={project.liveUrl} target="_blank">
                        <span>Try it Here!</span>
                        <motion.div
                          className="inline-block ml-2"
                          whileHover={{ rotate: 45 }}
                          transition={{ duration: 0.15 }}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </motion.div>
                      </Link>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button variant="outline" asChild className="group">
                      <Link href={project.githubUrl} target="_blank">
                        <span>View Code</span>
                        <motion.div
                          className="inline-block ml-2"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Github className="h-4 w-4" />
                        </motion.div>
                      </Link>
                    </Button>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
} 