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
    logo: '/logos/bocconi_logo.webp',
  },
  {
    name: 'UWC Dilijan',
    degree: 'IB Diploma',
    url: 'https://uwcdilijan.org',
    logo: '/logos/uwcdilijan_logo.webp',
  },
  {
    name: 'TEV İnanç Türkeş High School',
    degree: 'T21C',
    url: 'https://tevitol.k12.tr/',
    logo: '/logos/tevitol.webp',
  },
]

export type Project = {
  name: string
  line: string
  url: string
  tag: string
  live?: boolean
}

/*
  Equal citizens; the one that shipped last gets one accent, nothing more.
  `live` marks the most recent, so move it when something newer ships.

  The line used to say "this year… to explore", which read as upcoming — MDW
  2026 ran 20-26 April 2026 and is past. Keep this in the past tense until the
  2027 edition replaces it.
*/
export const PROJECTS: Project[] = [
  {
    name: 'MDW 2026',
    line: 'My personal selection for Milan Design Week 2026 — thirty exhibitions across Milano.',
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
    src: '/paintings/dusk-on-the-golden-horn.webp',
    title: 'Dusk on the Golden Horn',
    artist: 'Ivan Aivazovsky',
    year: '1845',
    medium: 'oil on canvas',
  },
]

/*
  The address is stored in halves and only joined on a click. That keeps the
  literal string out of the served HTML, out of the noscript fallback, and out
  of the JS bundle — the three places a harvester scanning for `mailto:` or
  /\S+@\S+/ would find it. Deliberately not exported: nothing should be able to
  rebuild the address except emailAddress(), at the moment a human asks for it.
*/
const EMAIL_PARTS = ['omertaskaya', 'gmail.com'] as const

export const EMAIL_DISPLAY = `${EMAIL_PARTS[0]} [at] ${EMAIL_PARTS[1]}`

export const emailAddress = (): string => EMAIL_PARTS.join('@')

export const SOCIALS = [
  { label: 'Instagram', url: 'https://www.instagram.com/otaskaya_' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/otaskaya' },
]

/* ————— Photographs ————— */

export type Photo = { id: string; src: string; alt: string }

/*
  The photographs live here, not inline in the JSX, so the image sitemap in
  seo.ts and the collage in sections/day.tsx cannot disagree about what exists.
  Layout stays in the JSX — every figure is placed by hand and none of them
  share a shape.

  Filenames are descriptive on purpose: Google treats the filename as a signal
  for image search, and `04-road.webp` told it nothing — worse, it was wrong,
  since the picture is of hitchhiking rather than a road. The old paths are
  redirected in ../vercel.json so nothing that already fetched them 404s.
*/
export const PHOTOS: Photo[] = [
  {
    id: 'presentation',
    src: '/photos/omer-taskaya-presentation.webp',
    alt: 'Ömer standing among a seated audience with both thumbs up, in front of a presentation screen',
  },
  {
    id: 'camera',
    src: '/photos/omer-taskaya-with-camera.webp',
    alt: 'Ömer raising a compact camera to frame a shot, lilac in bloom and hills behind him at dusk',
  },
  {
    id: 'hitchhiking',
    src: '/photos/omer-taskaya-hitchhiking.webp',
    alt: 'Ömer from behind, arm out and thumb up, hitchhiking on a tree-lined road',
  },
  {
    id: 'winter',
    src: '/photos/omer-taskaya-winter-trail.webp',
    alt: 'Ömer in a dark beanie on a snowed-in forest trail, a cross-country skier climbing behind him',
  },
  {
    id: 'portrait',
    src: '/photos/omer-taskaya-portrait.webp',
    alt: 'Portrait of Ömer in a black leather jacket over a burgundy shirt, exposed ducting behind',
  },
]

export const photo = (id: string): Photo => {
  const found = PHOTOS.find((p) => p.id === id)
  if (!found) throw new Error(`photo: no entry with id "${id}"`)
  return found
}
