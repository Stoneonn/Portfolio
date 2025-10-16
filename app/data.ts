type Project = {
  name: string
  description: string
  link: string
  video?: string
  image?: string
  embedUrl?: string
  id: string
}

type DataProject = {
  name: string
  description: string
  link: string
  video?: string
  image?: string
  embedUrl?: string
  id: string
}

type Education = {
  school: string
  degree: string
  start: string
  end: string
  link: string
  logo: string
  id: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Motion Primitives Pro',
    description:
      'Advanced components and templates to craft beautiful websites.',
    link: 'https://pro.motion-primitives.com/',
    video:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/newProfileItem/d898be8a-7037-4c71-af0c-8997239b050d.mp4?_a=DATAdtAAZAA0',
    id: 'project1',
  },
  {
    name: 'Motion Primitives',
    description: 'UI kit to make beautiful, animated interfaces.',
    link: 'https://motion-primitives.com/',
    video:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
    id: 'project2',
  },
]

export const DATA_PROJECTS: DataProject[] = [
  {
    name: 'Been',
    description: 'All the places I\'ve been around the world.',
    link: 'https://beeneverywhere.net/',
    image: '/TCC.jpg',
    embedUrl: 'https://beeneverywhere.net/user/otaskaya',
    id: 'data1',
  },
  {
    name: 'Last.fm',
    description: 'What I\'ve listened to every day for the past 4 years.',
    link: '#',
    image: '/lastfm_logo.png',
    embedUrl: 'https://lastfmstats.com/user/otaskaya/charts',
    id: 'data2',
  },
  {
    name: 'Reading Stats',
    description: 'Books I\'ve read and my reading patterns.',
    link: '#',
    image: '/been-preview.svg',
    embedUrl: 'https://www.last.fm/user/otaskaya/',
    id: 'data3',
  },
  {
    name: 'Coding Activity',
    description: 'My development journey and contributions.',
    link: '#',
    image: '/been-preview.svg',
    id: 'data4',
  },
]

export const EDUCATION: Education[] = [
  {
    school: 'Bocconi University',
    degree: 'International Economics and Management',
    start: '2025',
    end: '2028',
    link: 'https://www.unibocconi.it/en',
    logo: '/bocconi_logo.png',
    id: 'edu1',
  },
  {
    school: 'UWC Dilijan',
    degree: 'IB Diploma',
    start: '2023',
    end: '2025',
    link: 'https://uwcdilijan.org',
    logo: '/uwcdilijan_logo.png',
    id: 'edu2',
  },
  {
    school: 'TEV İnanç Türkeş High School',
    degree: 'T21C',
    start: '2020',
    end: '2023',
    link: 'https://tevitol.k12.tr/',
    logo: '/tevitol.png',
    id: 'edu3',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Exploring the Intersection of Design, AI, and Design Engineering',
    description: 'How AI is changing the way we design',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-1',
  },
  {
    title: 'Why I left my job to start my own company',
    description:
      'A deep dive into my decision to leave my job and start my own company',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-2',
  },
  {
    title: 'What I learned from my first year of freelancing',
    description:
      'A look back at my first year of freelancing and what I learned',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-3',
  },
  {
    title: 'How to Export Metadata from MDX for Next.js SEO',
    description: 'A guide on exporting metadata from MDX files to leverage Next.js SEO features.',
    link: '/blog/example-mdx-metadata',
    uid: 'blog-4',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Instagram',
    link: 'https://www.instagram.com/otaskaya_',
  },

  {
    label: 'Github',
    link: 'https://github.com/stoneonn',
  },
  {
    label: 'UWCHub',
    link: 'https://uwchub.org/user/787936',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/otaskaya',
  },

]

export const EMAIL = 'omertaskaya@gmail.com'
