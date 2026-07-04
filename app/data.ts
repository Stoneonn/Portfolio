type ArchivedProject = {
  name: string
  description: string
  link: string
  image: string
  id: string
}

type DataProject = {
  name: string
  description: string
  link: string
  embedUrl?: string
  id: string
  color: string
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

type Painting = {
  src: string
  title: string
  artist: string
  year: string
}

/* The owner's route — rendered as an artwork's provenance line. */
export const PROVENANCE = [
  'Muğla',
  'Eskişehir',
  'İstanbul',
  'Dilijan',
  'Milano',
]

/* The one that gets its own poster wall. */
export const FEATURED_EXHIBITION = {
  overline: 'Milan Design Week, mapped',
  title: 'MDW 2026',
  description:
    '8 days, 100+ events — hours, addresses, tickets, registration flags, map links. Built solo.',
  dates: 'April 19–26, 2026 · Milano',
  href: '/designweek',
  id: 'mdw2026',
}

/* Ventures no longer on view. */
export const ARCHIVE: ArchivedProject[] = [
  {
    name: 'EcoIstanbul',
    description: 'Sustainable commutes in Istanbul, made easy.',
    link: 'https://cagriokan.com/',
    image: '/ecoistanbul_deck.jpg',
    id: 'ecoistanbul',
  },
  {
    name: 'Pigmenta',
    description:
      'AI powered coating systems for strategic industries: reliable, efficient, military-grade',
    link: 'https://pigmenta.tech/',
    image: '/pigmenta_deck.jpg',
    id: 'pigmenta',
  },
]

export const DATA_PROJECTS: DataProject[] = [
  {
    name: 'Been',
    description: 'All the places I’ve been around the world.',
    link: 'https://beeneverywhere.net/',
    embedUrl: 'https://beeneverywhere.net/user/otaskaya',
    id: 'been',
    color: 'bg-[#FF385C]',
  },
  {
    name: 'Last.fm',
    description: 'What I’ve listened to every day for the past 4 years.',
    link: 'https://www.last.fm/user/otaskaya',
    embedUrl: 'https://lastfmstats.com/user/otaskaya/charts',
    id: 'lastfm',
    color: 'bg-[#B90000]',
  },
  {
    name: 'Goodreads',
    description: 'Books, books, books.',
    link: 'https://www.goodreads.com/user/show/135046786-stoneon',
    id: 'goodreads',
    color: 'bg-[#F4F1EA]',
  },
  {
    name: 'IMDB',
    description: 'My top shows',
    link: 'https://www.imdb.com/user/ur143130788/ratings/?sort=top_rated%2Cdesc&view=detailed',
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
      {
        title: 'BOFIT Blog',
        link: 'https://www.bofit.fi/en/publications/bofit-blog/',
      },
      {
        title: 'BBVA Research',
        link: 'https://www.bbvamarketstrategy.com/tag/turkey/',
      },
      {
        title: 'Journal of Social and Personal Relationships',
        link: 'https://journals.sagepub.com/home/spr',
      },
    ],
  },
  {
    category: 'Opinion',
    items: [
      {
        title: 'Project Syndicate',
        link: 'https://www.project-syndicate.org/',
      },
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
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/otaskaya',
  },
]

/* Wall text before the final gallery. */
export const QUOTE = {
  text: 'We set sail on this new sea because there is new knowledge to be gained, and new rights to be won, and they must be won and used for the progress of all people.',
  attribution: 'John F. Kennedy',
  year: '1962',
}

/*
  The house collection. Add paintings here (self-hosted under
  /public/paintings) — once there is more than one, the finale will pick
  at random on each visit.
*/
export const PAINTINGS: Painting[] = [
  {
    src: '/paintings/dusk-on-the-golden-horn.jpg',
    title: 'Dusk on the Golden Horn',
    artist: 'Ivan Aivazovsky',
    year: '1845',
  },
]

export const EMAIL = 'omertaskaya@gmail.com'
