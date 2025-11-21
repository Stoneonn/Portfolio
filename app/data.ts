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
  color?: string
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

type ReadingCategory = {
  category: string
  items: {
    title: string
    link: string
  }[]
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'EcoIstanbul',
    description: 'Sustainable commutes in Istanbul, made easy.',
    link: 'https://otaskaya.me/',
    video:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/newProfileItem/d898be8a-7037-4c71-af0c-8997239b050d.mp4?_a=DATAdtAAZAA0',
    id: 'project1',
  },
  {
    name: 'Pigmenta',
    description:
      'AI powered painting systems for shipyards: reliable, efficient, military-grade',
    link: 'https://otaskaya.me/',
    video:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
    id: 'project2',
  },
]

export const DATA_PROJECTS: DataProject[] = [
  {
    name: 'Been',
    description: "All the places I've been around the world.",
    link: 'https://beeneverywhere.net/',
    image: '/TCC.jpg',
    embedUrl: 'https://beeneverywhere.net/user/otaskaya',
    id: 'been',
    color: 'bg-[#FF385C]',
  },
  {
    name: 'Last.fm',
    description: "What I've listened to every day for the past 4 years.",
    link: '#',
    image: '/lastfm_logo.png',
    embedUrl: 'https://lastfmstats.com/user/otaskaya/charts',
    id: 'lastfm',
    color: 'bg-[#B90000]',
  },
  {
    name: 'Goodreads',
    description: 'Books, books, books.',
    link: 'https://www.goodreads.com/user/show/135046786-stoneon',
    image: '/goodreads_logo.png',
    embedUrl:
      'https://www.goodreads.com/review/list/135046786-stoneon?page=1&per_page=10&shelf=read&utf8=%E2%9C%93&view=table',
    id: 'goodreads',
    color: 'bg-[#F4F1EA]',
  },
  {
    name: 'IMDB',
    description: 'My top shows',
    link: 'https://www.imdb.com/user/ur143130788/ratings/?sort=top_rated%2Cdesc&view=detailed',
    image: '/imdb_logo.png',
    embedUrl:
      'https://www.imdb.com/user/ur143130788/ratings/?sort=top_rated%2Cdesc&view=detailed',
    id: 'imdb',
    color: 'bg-[#F5C518]',
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

export const READING_LIST: ReadingCategory[] = [
  {
    category: 'World News',
    items: [
      { title: 'Reuters', link: 'https://www.reuters.com/' },
      { title: 'FT', link: 'https://www.ft.com/' },
    ],
  },
  {
    category: 'Specialized Reports',
    items: [
      { title: 'BOFIT Blog', link: 'https://www.bofit.fi/en/publications/bofit-blog/' },
      { title: 'BBVA Research', link: 'https://www.bbvamarketstrategy.com/tag/turkey/' },
      {
        title: 'Journal of Social and Personal Relationships',
        link: 'https://journals.sagepub.com/home/spr',
      },
    ],
  },
  {
    category: 'Opinion',
    items: [
      { title: 'Project Syndicate', link: 'https://www.project-syndicate.org/' },
      { title: 'The Economist', link: 'https://www.economist.com/' },
      { title: 'Jacobin', link: 'https://jacobin.com/' },
    ],
  },
  {
    category: 'Turkish News',
    items: [
      { title: 'Ekonomi Gazetesi', link: 'https://www.ekonomigazetesi.com/' },
      { title: 'Aposto', link: 'https://aposto.com/n/daily?tab=issue' },
    ],
  },
  {
    category: 'Russian News',
    items: [
      { title: 'Novaya Gazeta', link: 'https://novayagazeta.eu/' },
      { title: 'The Moscow Times', link: 'https://www.themoscowtimes.com/' },
      { title: 'The Bell', link: 'https://thebell.io/' },
      { title: 'Interfax', link: 'https://www.interfax.ru/' },
      { title: 'Mediazona', link: 'https://zona.media/' },
    ],
  },
  {
    category: 'Culture',
    items: [
      { title: 'The New Yorker', link: 'https://www.newyorker.com/' },
      { title: 'ArchDaily', link: 'https://www.archdaily.com/' },
    ],
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
    label: 'UWC',
    link: 'https://uwchub.org/user/787936',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/otaskaya',
  },
]

export const EMAIL = 'omertaskaya@gmail.com'
