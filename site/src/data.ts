/* All content for otaskaya.me. Facts only — nothing invented. */

export type City = {
  name: string
  gloss: string
  lat: number
  lon: number
  current?: boolean
}

/* The route. Latitude climbs 37°N → 45°N: a life moving north. */
export const CITIES: City[] = [
  { name: 'Muğla', gloss: 'the Aegean', lat: 37.215, lon: 28.363 },
  { name: 'Eskişehir', gloss: 'the plateau', lat: 39.777, lon: 30.52 },
  { name: 'İstanbul', gloss: 'the crossing', lat: 41.008, lon: 28.978 },
  { name: 'Dilijan', gloss: 'the mountains', lat: 40.741, lon: 44.863 },
  { name: 'Milano', gloss: 'at present', lat: 45.464, lon: 9.19, current: true },
]

export const PRESS_CATEGORIES = [
  'World News',
  'Specialized Reports',
  'Opinion',
  'Turkish News',
  'Russian News',
  'Culture',
] as const

export type PressCategory = (typeof PRESS_CATEGORIES)[number]

export type WireItem = {
  masthead: string
  category: PressCategory
  url: string
}

/* The morning press — his actual reading list. */
export const WIRE: WireItem[] = [
  { masthead: 'Reuters', category: 'World News', url: 'https://www.reuters.com/' },
  { masthead: 'Financial Times', category: 'World News', url: 'https://www.ft.com/' },
  { masthead: 'BOFIT', category: 'Specialized Reports', url: 'https://www.bofit.fi/en/publications/bofit-blog/' },
  { masthead: 'BBVA Research', category: 'Specialized Reports', url: 'https://www.bbvamarketstrategy.com/tag/turkey/' },
  { masthead: 'J. of Social & Personal Relationships', category: 'Specialized Reports', url: 'https://journals.sagepub.com/home/spr' },
  { masthead: 'The Economist', category: 'Opinion', url: 'https://www.economist.com/' },
  { masthead: 'Project Syndicate', category: 'Opinion', url: 'https://www.project-syndicate.org/' },
  { masthead: 'Jacobin', category: 'Opinion', url: 'https://jacobin.com/' },
  { masthead: 'Ekonomi Gazetesi', category: 'Turkish News', url: 'https://www.ekonomigazetesi.com/' },
  { masthead: 'Aposto', category: 'Turkish News', url: 'https://aposto.com/n/daily?tab=issue' },
  { masthead: 'Novaya Gazeta', category: 'Russian News', url: 'https://novayagazeta.eu/' },
  { masthead: 'The Moscow Times', category: 'Russian News', url: 'https://www.themoscowtimes.com/' },
  { masthead: 'The Bell', category: 'Russian News', url: 'https://thebell.io/' },
  { masthead: 'Mediazona', category: 'Russian News', url: 'https://zona.media/' },
  { masthead: 'Interfax', category: 'Russian News', url: 'https://www.interfax.ru/' },
  { masthead: 'The New Yorker', category: 'Culture', url: 'https://www.newyorker.com/' },
  { masthead: 'ArchDaily', category: 'Culture', url: 'https://www.archdaily.com/' },
  { masthead: 'Dezeen', category: 'Culture', url: 'https://www.dezeen.com/' },
]

export type School = {
  name: string
  degree: string
  url: string
  logo: string
}

export const EDUCATION: School[] = [
  {
    name: 'Bocconi University',
    degree: 'BSc Economics & Management',
    url: 'https://www.unibocconi.it/en',
    logo: '/logos/bocconi_logo.png',
  },
  {
    name: 'UWC Dilijan',
    degree: 'IB Diploma',
    url: 'https://uwcdilijan.org',
    logo: '/logos/uwcdilijan_logo.png',
  },
  {
    name: 'TEV İnanç Türkeş High School',
    degree: 'T21C',
    url: 'https://tevitol.k12.tr/',
    logo: '/logos/tevitol.png',
  },
]

export const PHOTOS = [
  { src: '/photos/01-portrait.jpg', alt: 'Portrait' },
  { src: '/photos/02-stage.jpg', alt: 'Speaking on stage' },
  { src: '/photos/03-camera.jpg', alt: 'Holding a camera' },
  { src: '/photos/04-road.jpg', alt: 'On the road' },
  { src: '/photos/05-snow.jpg', alt: 'In the snow' },
]

export type Project = {
  name: string
  line: string
  url: string
  tag: string
  live?: boolean
}

/* Equal citizens; the one that shipped last gets one accent, nothing more. */
export const PROJECTS: Project[] = [
  {
    name: 'MDW 2026',
    line: 'My personal selection to the Milan Design Week this year, curated to explore.',
    url: '/designweek',
    tag: 'APR 2026',
    live: true,
  },
  {
    name: 'EcoIstanbul',
    line: 'Sustainable commutes in Istanbul, made easy.',
    url: 'https://cagriokan.com/',
    tag: 'ARCHIVED',
  },
  {
    name: 'Pigmenta',
    line: 'AI-powered coating systems for strategic industries.',
    url: 'https://pigmenta.tech/',
    tag: 'ARCHIVED',
  },
]

export type Instrument = {
  id: 'been' | 'lastfm' | 'goodreads' | 'imdb'
  name: string
  line: string
  url: string
  embed?: string
  color: string
}

export const INSTRUMENTS: Instrument[] = [
  {
    id: 'been',
    name: 'Been',
    line: 'all the places I’ve Been',
    url: 'https://beeneverywhere.net/',
    embed: 'https://beeneverywhere.net/user/otaskaya',
    color: '#FF385C',
  },
  {
    id: 'lastfm',
    name: 'Last.fm',
    line: 'listening history',
    url: 'https://www.last.fm/user/otaskaya',
    embed: 'https://lastfmstats.com/user/otaskaya/charts',
    color: '#B90000',
  },
  {
    id: 'goodreads',
    name: 'Goodreads',
    line: 'the bookshelf',
    url: 'https://www.goodreads.com/user/show/135046786-stoneon',
    color: '#F4F1EA',
  },
  {
    id: 'imdb',
    name: 'IMDB',
    line: 'ratings',
    url: 'https://www.imdb.com/user/ur143130788/ratings/?sort=top_rated%2Cdesc&view=detailed',
    color: '#F5C518',
  },
]

export const QUOTE = {
  text: 'We set sail on this new sea because there is new knowledge to be gained, and new rights to be won, and they must be won and used for the progress of all people.',
  attribution: 'John F. Kennedy',
  where: 'Rice University, 1962',
}

export type Painting = {
  src: string
  title: string
  artist: string
  year: string
  medium: string
}

/*
  The collection. Self-hosted under /public/paintings. When this array
  grows past one entry, the ending picks one at random per visit.
*/
export const PAINTINGS: Painting[] = [
  {
    src: '/paintings/dusk-on-the-golden-horn.jpg',
    title: 'Dusk on the Golden Horn',
    artist: 'Ivan Aivazovsky',
    year: '1845',
    medium: 'oil on canvas',
  },
]

export const EMAIL = 'omertaskaya@gmail.com'

export const EMAIL_DISPLAY = 'omertaskaya [at] gmail.com'

export const SOCIALS = [
  { label: 'Instagram', url: 'https://www.instagram.com/otaskaya_' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/otaskaya' },
]
