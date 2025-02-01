'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { ImageCarousel } from "@/components/image-carousel"
import { AnimatedHeadline } from "@/components/animated-headline"
import { useState, useEffect } from "react"
import { ProjectModal } from "@/components/project-modal"
import { ExternalLink } from "lucide-react"
import confetti from 'canvas-confetti';
import { motion, useScroll } from "framer-motion"
import ContactForm from "../components/contact-form";


export default function Page() {
  const { scrollYProgress } = useScroll()
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)
    // Project data
  const projects = [
    {
      title: "SlimeRush - Software Engineering Project 1",
      description: "A 2D rogue-like shooter game developed using a DigiPen's in house game C engine, CProcessing.",
      image: "/assets/projects/1.jpg",
      media: [
        {
          type: 'image' as const,
          src: "/assets/projects/SR.gif",
          alt: "SlimeRush Gameplay"
        },
        {
          type: 'image' as const,
          src: "/assets/projects/1.jpg",
          alt: "SlimeRush Screenshot"
        },
      ],
      longDescription: "Project Lead and Level Programmer for a 2D rogue-like shooter. This was a group project where I was responsible for the gameplay design and programming. My first introduction to game development and game engines.",
      technologies: ["C", "CProcessing Game Engine"],
      contributions: [
        "Built from scratch using C, using the CProcessing Game Engine ",
        "Implemented main collision hitboxes between all game objects ",
        "Implemented core gameplay features, such as character progression, gameplay loop ",
        "Implemented core UI elements such as player and enemy health bars to improve game's design",
      ],
      tags: ["Games", "School Projects"],
    },
    {
      title: "Project DUCK! - Software Engineering Project 2",
      description: "A 2D adventure game built using DigiPen's in house game C++ engine, Alpha.",
      image: "/assets/projects/2.jpg",
      media: [
        {
          type: 'video' as const,
          src: "/assets/projects/Project_Duck.mp4",
          alt: "Project DUCK! 2 Minute Gameplay",
          poster: "/assets/projects/2.jpg",
        },
      ],
      longDescription: "Project Lead and Level Programmer for a top-down adventure video game built using DigiPen's in house game C++ engine, Alpha. Project DUCK! is a reaction-based adventure game where the player must find his way to the other side of the pond and fight back against the evil turtles.",
      technologies: ["C++", "Alpha Game Engine", "FMOD"],
      features: [
        "A leveling system",
        "Different enemies with unique abilities and scaling difficulty",
        "Procedurally generated maze built from a 2D tilemap",
        "A reaction-based dodge and combat mechanic",
      ],
      contributions: [
        "Built from scratch using C++, using the Alpha Game Engine",
        "Idealized and Implemented core game mechanic for the combat elements of the game ",
        "QA Lead, rigorously tested and fixed bugs or reported them",
      ],
      tags: ["Games", "School Projects"],
    },
    {
      title: "Exomata - Software Engineering Project 3",
      description: "A 2.5D Hack and Slash game using a custom built C++ game engine, ExoEngine.",
      image: "/assets/projects/5.jpg",
      media: [
        {
          type: 'video' as const,
          src: "/assets/projects/DNG.mp4",
          alt: "Exomata Showcase",
          poster: "/assets/projects/5.jpg",
        },
        {
          type: 'image' as const,
          src: "/assets/projects/5.jpg",
          alt: "Exomata Screenshot"
        },
      ],
      longDescription: "Technical Lead and Backend Developer for ExoEngine, a custom game engine for our 2D HacknSlash game, Exomata, built using C++ and OpenGL. Your Ship Crashes on an Alien Planet and you must fight your way back home.",
      technologies: ["C++", "OpenGL", "IMGUI", "FMOD"],
      features: [
        "A custom built game engine",
        "Different enemies types",
        "A combat system with parry mechanics and hit stop for adding weight to attacks",
      ],
      contributions: [
        "Designed and implemented the backend architecture for the engine, implemented using an Entity Component System (ECS) architecture pattern to create the game objects",
        "Designed and implemented a Finite State Machine to handle all gameplay behaviours and did scripting for most ingame behaviours, including character movement and enemy AI",
        "Handled project's version control using GitHub and was in charge of resolving merge conflicts",
      ],
      tags: ["Games", "School Projects"],
    },
    {
      title: "Disinheritance - Software Engineering Project 4",
      description: "A 3D story-based stealth horror game using a custom built C++ game engine, GAM300Engine.",
      image: "/assets/projects/6.png",
      media: [
        {
          type: 'video' as const,
          src: "/assets/projects/Disinheritance.mp4",
          alt: "Disinheritance Showcase",
          poster: "/assets/projects/6.png",
        },
      ],
      longDescription: "Technical Lead and Backend Developer for GAM300Engine, a custom 3D game engine for our story-based stealth horror game, built using C++ and Vulcan. A thief set out to reclaim his family's rightful inheritance, but soon discovers the horrors that lie within the mansion and his family's dark secrets. Will he be able to escape?",
      technologies: ["C++", "Vulcan", "IMGUI" , "FMOD", ".NET", "C#"],
      features: [
        "A custom built 3D game engine",
        "A lockpicking minigame with stealth mechanics",
        "JUMPSCARES!",
        "Immersive Sound Design with directional sfx and ambient noises",
      ],
      contributions: [
        "Developed a Custom Scripting Language using .NET to allow game designers to work on the game using C#",
        "Developed custom functions that emulate features on the Unity Game Engine for ease of use for gameplay designers",
        "Developed custom scripts for Hot Reloading of game engine when altering game level",
        "Handled merge conflicts and managed Git repository",
      ],
      tags: ["Games", "School Projects"],
    },
    {
      title: "Fox Hunt - Personal Project",
      description: "A 2D Hyper Casual Platformer built using PlayCanvas Game Engine.",
      image: "/assets/projects/4.jpg",
      media: [
        {
          type: 'image' as const,
          src: "/assets/projects/4.jpg",
          alt: "Fox Hunt Showcase",
        },
      ],
      longDescription: "A personal project just for fun, a 2D Hyper Casual Platformer built using PlayCanvas Game Engine, using assets from the unity asset store.",
      technologies: ["PlayCanvas", "JavaScript"],
      features: [
        "A simple and fun gameplay loop",
        "Collect as many cherries as possible to gather points before the time runs out",
        "Wall Jumping Mechanics for some added challenge and skill expression",
      ],
      tags: ["Games", "Personal Projects"],
      liveUrl: "https://playcanv.as/p/NTxxXKUF/",
    },
    {
      title: "My Portfolio Website - Personal Project",
      description: "A portfolio website built using Next.js, Tailwind CSS, and Framer Motion.",
      image: "/assets/gallery/bg.jpg",
      media: [
        {
          type: 'image' as const,
          src: "/assets/gallery/bg.jpg",
          alt: "My Portfolio Website Showcase",
        },
      ],
      longDescription: "A personal project just to showcase my projects and skills.",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
      tags: ["Personal Projects"],
      liveUrl: "runic2h-website.vercel.app",
    },
    // ... add more projects
  ]

  // Experience data
  const experienceData = [
    {
      title: "Full Stack Intern",
      company: "uParcel",
      period: "2024 - Present",
      description: "An 8 month Internship as a Full-Stack Developer tasked with designing and writing with Python on Django framework for uParcel's backend services, as well as JavaScript on Next.js Framework for uParcel's web application.",
    },
    {
      title: "Technical Intern",
      company: "TinyMOS",
      period: "2019 - 2019",
      description: "A 9 month Internship in a startup company that created the world's smallest astronomy camera as a cross platform mobile developer using Xamarin for their application, the Nano1Companion.",
    },
    {
      title: "Technical Intern",
      company: "Infinito Blockchain Labs",
      period: "2018 - 2019",
      description: "A 6 month internship at Infinity Blockchain Labs, developing frontend features for Infinito Wallet using React Native, a universal Crypto-Wallet.",
    },
  ];

  const aboutMeMedia = [
    {
      type: 'image' as const,
      src: '/assets/gallery/aboutme1.jpg',
      alt: "Graduating with a Diploma in Information Technology",
    },
    {
      type: 'image' as const,
      src: '/assets/gallery/aboutme2.jpg',
      alt: "Awards Night 2019",
    },
    {
      type: 'image' as const,
      src: '/assets/gallery/aboutme3.jpg',
      alt: "Promotion to 2nd Sergeant in the Singapore Armed Forces",
    },
  ]

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setIsVisible(latest < 0.2)
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href')?.slice(1);
    const targetElement = document.getElementById(targetId || '');
    
    if (targetElement) {
      const windowHeight = window.innerHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      // Scroll to position the target element in the middle of the viewport
      window.scrollTo({
        top: targetPosition - (windowHeight / 4),
        behavior: 'smooth'
      });
    }
  };

  const handleConfetti = () => {
    // First burst from the left
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { x: 0, y: 0.5 }
    });

    // Second burst from the right
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { x: 1, y: 0.5 }
    });

    // Middle burst
    confetti({
      particleCount: 150,
      spread: 160,
      origin: { x: 0.5, y: 0.5 }
    });

    // Add delayed bursts for continuous effect
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { x: 0.2, y: 0.5 }
      });
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { x: 0.8, y: 0.5 }
      });
    }, 250);

    // Final burst
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 160,
        origin: { x: 0.5, y: 0.5 }
      });
    }, 500);
  };

  // Get unique tags from all projects
  const allTags = Array.from(
    new Set(projects.flatMap(project => project.tags))
  ).sort()

  // Filter projects based on selected tag
  const filteredProjects = selectedFilter
    ? projects.filter(project => project.tags.includes(selectedFilter))
    : projects

  return (
    <div className="min-h-screen gradient-background">
      <main className="flex-1">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full min-h-screen flex flex-col container max-w-screen-xl mx-auto px-4 md:px-6"
        >
          {/* Main content wrapper with flex column */}
          <div className="relative z-10 h-full flex flex-col flex-1">
            {/* Center content */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="space-y-2">
                    <AnimatedHeadline 
                      phrases={[
                        "a Problem Solver",
                        "a Developer",
                        "a Creator",
                        "Elton Teo"
                      ]} 
                      name=""
                    />
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                      Welcome to my portfolio!
                    </p>
                  </div>
                  <div className="space-x-4">
                    <Button 
                      onClick={(e) => {
                        handleConfetti();
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                          const windowHeight = window.innerHeight;
                          const targetPosition = contactSection.getBoundingClientRect().top + window.scrollY;
                          window.scrollTo({
                            top: targetPosition - (windowHeight / 4),
                            behavior: 'smooth'
                          });
                        }
                      }}
                    >
                      Contact Me
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/assets/resume/elton-teo-resume.pdf" target="_blank">
                        Download Resume
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Indicator with visibility animation */}
            <motion.div 
              className="flex justify-center pb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="cursor-pointer"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: isVisible ? 1 : 0, y: 0 }}
                transition={{ 
                  duration: 1,
                  repeat: isVisible ? Infinity : 0,
                  repeatType: "reverse"
                }}
              >
                <Link 
                  href="#about" 
                  onClick={handleSmoothScroll}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-sm text-muted-foreground">Scroll Down</span>
                    <div className="w-8 h-8 rounded-full border-2 border-muted-foreground flex items-center justify-center">
                      <motion.div
                        className="w-1 h-3 bg-muted-foreground rounded-full"
                        initial={{ opacity: 0, y: -2 }}
                        animate={{ opacity: isVisible ? 1 : 0, y: 2 }}
                        transition={{
                          duration: 1.5,
                          repeat: isVisible ? Infinity : 0,
                          repeatType: "reverse"
                        }}
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.8 }}
          id="about" 
          className="w-full py-12 md:py-24"
        >
          <div className="container max-w-screen-xl mx-auto px-4 md:px-6 min-h-[40vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Text Content with hover animation */}
              <motion.div 
                className="space-y-6"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.h2 
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  About Me
                </motion.h2>
                <div className="space-y-4 text-gray-500 dark:text-gray-400">
                  <p>
                    I am Elton Teo, a current Computer Science in Interactive Media and Game Development undergraduate at DigiPen Institute of Technology Singapore.
                  </p>
                  <p>
                    A strong passion and love for technology drives me to constantly look for ways to improve myself in the field and pick up new skills along the way. 
                    I graduated from Ngee Ann Poly with a Diploma in Information Technology specializing in Mobile Business Applications.
                  </p>
                  <p>
                    Currently in my final year at DigiPen Institute of Technology Singapore, I have expanded my expertise into full stack development while maintaining my passion for game development, game engines, and game design as a hobby.
                  </p>
                </div>
              </motion.div>

              {/* Image Carousel - removed animations */}
              <div className="relative">
                <ImageCarousel media={aboutMeMedia} autoplay={true} />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.8 }}
          id="projects" 
          className="w-full py-12 md:py-24"
        >
          <div className="container max-w-screen-xl mx-auto px-4 md:px-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8"
            >
              Projects
            </motion.h2>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              <Button
                variant={selectedFilter === null ? "default" : "outline"}
                onClick={() => setSelectedFilter(null)}
                className="rounded-full"
              >
                All
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedFilter === tag ? "default" : "outline"}
                  onClick={() => setSelectedFilter(tag)}
                  className="rounded-full"
                >
                  {tag}
                </Button>
              ))}
            </div>

            {/* Projects Grid - update to use filteredProjects */}
            <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: "0px 5px 15px rgba(0,0,0,0.1)"
                  }}
                >
                  <Card 
                    className="group cursor-pointer transition-all hover:shadow-lg gradient-card"
                    onClick={() => setSelectedProject(project)}
                  >
                    <CardContent className="p-4">
                      <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index === 0}
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-card-foreground">{project.title}</h3>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedProject(project)
                        }}
                      >
                        View Details
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.8 }}
          id="experience" 
          className="w-full py-12 md:py-24"
        >
          <div className="container max-w-screen-xl mx-auto px-4 md:px-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12"
            >
              Work Experience
            </motion.h2>
            
            {/* Desktop Timeline View */}
            <div className="hidden md:block max-w-2xl mx-auto">
              <div className="relative space-y-8">
                {/* Animated Timeline Line - keeping this animation */}
                <motion.div 
                  className="absolute left-1/2 top-0 h-full w-0.5 bg-primary/20 -ml-0.5"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 1.5 }}
                />

                {/* Experience Items - removing animations from cards */}
                {experienceData.map((experience, index) => (
                  <div 
                    key={index} 
                    className={`relative ${
                      index % 2 === 0 ? 'ml-auto pl-8' : 'mr-auto pr-8'
                    } w-1/2`}
                  >
                    {/* Content Card */}
                    <div className="rounded-lg border bg-card p-6 shadow-sm">
                      <h3 className="font-semibold text-card-foreground">{experience.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{experience.company}</p>
                      <p className="text-sm text-muted-foreground mt-1">{experience.period}</p>
                      <p className="mt-3 text-sm leading-relaxed text-card-foreground/80">
                        {experience.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Card View - removing animations */}
            <div className="md:hidden space-y-4">
              {experienceData.map((experience, index) => (
                <div
                  key={index}
                >
                  <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <h3 className="font-semibold text-card-foreground">{experience.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{experience.company}</p>
                    <p className="text-sm text-muted-foreground mt-1">{experience.period}</p>
                    <p className="mt-3 text-sm leading-relaxed text-card-foreground/80">
                      {experience.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.8 }}
          id="contact" 
          className="w-full py-12 md:py-24"
        >
          <div className="container max-w-screen-xl mx-auto px-4 md:px-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8"
            >
              Get in Touch
            </motion.h2>
            <ContactForm />
          </div>
        </motion.section>

        {/* Project Modal */}
        {selectedProject && (
          <ProjectModal
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
            project={selectedProject}
          />
        )}
      </main>
    </div>
  )
}

