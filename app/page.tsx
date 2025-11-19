'use client'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { Gallery } from '@/components/gallery'
import { motion } from 'motion/react'
import { Dock, DockItem, DockIcon, DockLabel } from '@/components/ui/dock'
import {
  Home,
  FolderOpenDot,
  Activity,
  Book,
  Mail,
  Sun,
  Moon,
  Monitor,
} from 'lucide-react'
import { XIcon } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import { Magnetic } from '@/components/ui/magnetic'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatedBackground } from '@/components/ui/animated-background'
import {
  PROJECTS,
  DATA_PROJECTS,
  EDUCATION,
  BLOG_POSTS,
  EMAIL,
  SOCIAL_LINKS,
} from './data'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

// Helper function to scroll to section
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const offset = 80
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

type ProjectVideoProps = {
  src: string
}

function ProjectVideo({ src }: ProjectVideoProps) {
  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger>
        <video
          src={src}
          autoPlay
          loop
          muted
          className="aspect-video w-full cursor-zoom-in rounded-xl"
        />
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative aspect-video rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50">
          <video
            src={src}
            autoPlay
            loop
            muted
            className="aspect-video h-[50vh] w-full rounded-xl md:h-[70vh]"
          />
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

type ProjectEmbedProps = {
  src: string
  imageSrc: string
}

function ProjectEmbed({ src, imageSrc }: ProjectEmbedProps) {
  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger>
        <div className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-xl">
          <Image
            src={imageSrc}
            alt="Project preview"
            fill
            className="object-cover"
          />
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative aspect-video rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50">
          <iframe
            src={src}
            className="aspect-video h-[50vh] w-full rounded-xl md:h-[70vh]"
            title="Embedded website"
          />
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

function MagneticSocialLink({
  children,
  link,
}: {
  children: React.ReactNode
  link: string
}) {
  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <a
        href={link}
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        {children}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
        >
          <path
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </a>
    </Magnetic>
  )
}

function ProgressiveBlurSlider() {
  return (
    <div
      className="relative h-[350px] w-screen overflow-hidden"
      style={{ marginLeft: 'calc(-50vw + 50%)', transform: 'rotate(-15deg)' }}
    >
      <InfiniteSlider className="flex h-full w-full items-center">
        {[
          'Ö',
          'M',
          'E',
          'R',
          'T',
          'A',
          'Ş',
          'K',
          'A',
          'Y',
          'A',
          'Ö',
          'M',
          'E',
          'R',
          'T',
          'A',
          'Ş',
          'K',
          'A',
          'Y',
          'A',
        ].map((letter, index) => (
          <div
            key={`${letter}-${index}`}
            className="w-16 text-center text-4xl font-[450] text-black dark:text-white"
          >
            {letter}
          </div>
        ))}
      </InfiniteSlider>
    </div>
  )
}

function ProgressiveBlurSliderClockwise() {
  return (
    <div
      className="relative h-[350px] w-screen overflow-hidden"
      style={{ marginLeft: 'calc(-50vw + 50%)', transform: 'rotate(15deg)' }}
    >
      <InfiniteSlider
        className="flex h-full w-full items-center"
        reverse={true}
      >
        {[
          'Ö',
          'M',
          'E',
          'R',
          'T',
          'A',
          'Ş',
          'K',
          'A',
          'Y',
          'A',
          'Ö',
          'M',
          'E',
          'R',
          'T',
          'A',
          'Ş',
          'K',
          'A',
          'Y',
          'A',
        ].map((letter, index) => (
          <div
            key={`${letter}-${index}`}
            className="w-16 text-center text-4xl font-[450] text-black dark:text-white"
          >
            {letter}
          </div>
        ))}
      </InfiniteSlider>
    </div>
  )
}

export default function Personal() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const cycleTheme = () => {
    if (!mounted) return

    const themes = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(theme || 'system')
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const getThemeIcon = () => {
    if (!mounted) return <Sun className="h-6 w-6 text-zinc-200" />

    switch (theme) {
      case 'light':
        return <Sun className="h-6 w-6 text-zinc-200" />
      case 'dark':
        return <Moon className="h-6 w-6 text-zinc-200" />
      case 'system':
        return <Monitor className="h-6 w-6 text-zinc-200" />
      default:
        return <Sun className="h-6 w-6 text-zinc-200" />
    }
  }

  const getThemeLabel = () => {
    if (!mounted) return 'Theme'

    switch (theme) {
      case 'light':
        return 'Light'
      case 'dark':
        return 'Dark'
      case 'system':
        return 'System'
      default:
        return 'Theme'
    }
  }

  return (
    <motion.main
      className="space-y-24"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        id="home"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <Gallery />
      </motion.section>

      <motion.section
        id="projects"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">Projects</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <div key={project.name} className="space-y-2">
              <div className="relative rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
                {project.video && <ProjectVideo src={project.video} />}
                {project.embedUrl && project.image && (
                  <ProjectEmbed
                    src={project.embedUrl}
                    imageSrc={project.image}
                  />
                )}
              </div>
              <div className="px-1">
                <a
                  className="font-base group relative inline-block font-[450] text-zinc-900 dark:text-zinc-50"
                  href={project.link}
                  target="_blank"
                >
                  {project.name}
                  <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 transition-all duration-200 group-hover:max-w-full dark:bg-zinc-50"></span>
                </a>
                <p className="text-base text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="data"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">Data</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {DATA_PROJECTS.map((project) => (
            <div key={project.name} className="space-y-2">
              <div className="relative rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
                {project.video && <ProjectVideo src={project.video} />}
                {project.embedUrl && project.image && (
                  <ProjectEmbed
                    src={project.embedUrl}
                    imageSrc={project.image}
                  />
                )}
                {!project.video && !project.embedUrl && project.image && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="px-1">
                <a
                  className="font-base group relative inline-block font-[450] text-zinc-900 dark:text-zinc-50"
                  href={project.link}
                  target="_blank"
                >
                  {project.name}
                  <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 transition-all duration-200 group-hover:max-w-full dark:bg-zinc-50"></span>
                </a>
                <p className="text-base text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="education"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">Education</h3>
        <div className="flex flex-col space-y-2">
          {EDUCATION.map((edu) => (
            <a
              className="relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30"
              href={edu.link}
              target="_blank"
              rel="noopener noreferrer"
              key={edu.id}
            >
              <Spotlight
                className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
                size={64}
              />
              <div className="relative h-full w-full rounded-[15px] bg-white p-4 dark:bg-zinc-950">
                <div className="relative flex w-full flex-row items-center gap-4">
                  <Image
                    src={edu.logo}
                    alt={`${edu.school} logo`}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-lg object-contain"
                  />
                  <div className="flex flex-1 flex-row justify-between">
                    <div>
                      <h4 className="font-normal dark:text-zinc-100">
                        {edu.degree}
                      </h4>
                      <p className="text-zinc-500 dark:text-zinc-400">
                        {edu.school}
                      </p>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {edu.start} - {edu.end}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-3 text-lg font-medium">Blog</h3>
        <div className="flex flex-col space-y-0">
          <AnimatedBackground
            enableHover
            className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
            transition={{
              type: 'spring',
              bounce: 0,
              duration: 0.2,
            }}
          >
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.uid}
                className="-mx-3 rounded-xl px-3 py-3"
                href={post.link}
                data-id={post.uid}
              >
                <div className="flex flex-col space-y-1">
                  <h4 className="font-normal dark:text-zinc-100">
                    {post.title}
                  </h4>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </AnimatedBackground>
        </div>
      </motion.section>

      <motion.section
        id="contact"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">Connect with me!</h3>
        <p className="mb-5 text-zinc-600 dark:text-zinc-400">
          Contact me at{' '}
          <a className="underline dark:text-zinc-300" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </p>
        <div className="flex items-center justify-start space-x-3">
          {SOCIAL_LINKS.map((link) => (
            <MagneticSocialLink key={link.label} link={link.link}>
              {link.label}
            </MagneticSocialLink>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="pointer-events-none relative mt-32 -mb-24 w-full"
        aria-hidden="true"
      >
        <div className="relative">
          <ProgressiveBlurSlider />
          <div className="absolute inset-0">
            <ProgressiveBlurSliderClockwise />
          </div>
        </div>
      </motion.section>

      {/* Dock — fixed at bottom center */}
      <div className="fixed bottom-18 left-1/2 z-50 -translate-x-1/2">
        <Dock magnification={80} distance={150} panelHeight={64}>
          <DockItem onClick={cycleTheme}>
            <DockIcon>{getThemeIcon()}</DockIcon>
            <DockLabel>{getThemeLabel()}</DockLabel>
          </DockItem>

          <DockItem
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <DockIcon>
              <Home className="h-6 w-6 text-zinc-200" />
            </DockIcon>
            <DockLabel>Home</DockLabel>
          </DockItem>

          <DockItem onClick={() => scrollToSection('projects')}>
            <DockIcon>
              <FolderOpenDot className="h-6 w-6 text-zinc-200" />
            </DockIcon>
            <DockLabel>Projects</DockLabel>
          </DockItem>

          <DockItem onClick={() => scrollToSection('data')}>
            <DockIcon>
              <Activity className="h-6 w-6 text-zinc-200" />
            </DockIcon>
            <DockLabel>Data</DockLabel>
          </DockItem>

          <DockItem onClick={() => scrollToSection('education')}>
            <DockIcon>
              <Book className="h-6 w-6 text-zinc-200" />
            </DockIcon>
            <DockLabel>Education</DockLabel>
          </DockItem>

          <DockItem onClick={() => scrollToSection('contact')}>
            <DockIcon>
              <Mail className="h-6 w-6 text-zinc-200" />
            </DockIcon>
            <DockLabel>Contact</DockLabel>
          </DockItem>
        </Dock>
      </div>
    </motion.main>
  )
}
