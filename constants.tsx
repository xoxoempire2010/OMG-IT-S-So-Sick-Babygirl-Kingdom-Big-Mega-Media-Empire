
import { Category, BlogPost, MediaItem, PressContent } from './types';

export const EMPIRE_LOGO = 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2026/01/Omg-its-So-Sick-Babygirl-Kingdom.png';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Do You Remember Youth Clubs In 2000s',
    category: 'Youth Clubs Nostalgia',
    excerpt: 'A look back at the glory days of the local youth club...',
    date: 'Oct 24, 2011',
    imageUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2026/01/Youth-clubs-2000s.jpg',
    content: 'Youth clubs in the 2000s were the ultimate hub for social life before smartphones took over. From pool tables to questionable snacks, we had it all.',
    tags: ['kids after school 2000s', 'youth clubs', '2000s kids']
  },
  {
    id: '2',
    title: 'Bernard Matthews Mini Kievs 2011',
    category: 'Childhood Classics',
    excerpt: 'The undisputed king of the after-school dinner table.',
    date: 'Oct 24, 2011',
    imageUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2026/01/Bernard-Matthews-Mini-Kievs-2010-mp4-image.jpg',
    content: 'Bernard Matthews Mini Kievs were a staple. That garlic butter center was everything.',
    tags: ['nostalgia', 'bernard matthews', 'childhood food']
  },
  {
    id: '3',
    title: 'Flat Bedroom Tour 3 2011',
    category: Category.DREAMY_DECOR,
    excerpt: 'Stepping into the ultimate 2011 teenage girl sanctuary.',
    date: 'Nov 02, 2011',
    imageUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2026/01/Flat-Bedroom-Tour-3-2014-mp4-image.jpg',
    content: 'Neon lights, polaroids everywhere, and a stack of magazines. This is peak 2011 aesthetic.',
    tags: ['nostalgia', 'room tour', '2011']
  }
];

export const MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'p1',
    type: 'photo',
    title: 'Rugrats Burger King Toys 2000s',
    year: '2011',
    rating: 5,
    imageUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2026/01/Rugrats-Burger-King-Toys-2000s-mp4-image.jpg',
    description: 'Rugrats Burger King Toys 2000s.',
    tags: ['Rugrats Burger King Toys 2000s'],
    isCached: true
  },
  {
    id: 'p2',
    type: 'photo',
    title: 'Finding Nemo 2000s',
    year: '2011',
    rating: 4,
    imageUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2026/01/Finding-Nemo-2000s.jpg',
    description: 'Finding Nemo 2000s',
    tags: ['Finding Nemo 2000s'],
    isCached: true
  },
  {
    id: 'm1',
    type: 'movie',
    title: 'High School Musical 1 2000s',
    year: '2004',
    rating: 5,
    imageUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2026/01/High-School-Musical-1-2000s.jpg',
    videoUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2025/11/Waterloo-Road-Lindsay-James-1.mp4',
    description: 'High School Musical 1 2000s.',
    tags: ['High School Musical 1', 'Disney'],
    isCached: false
  },
  {
    id: 'm2',
    type: 'movie',
    title: 'High School Musical 2 2000s',
    year: '2006',
    rating: 5,
    imageUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2026/01/High-School-Musical-2-2000s.jpg',
    videoUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2025/11/Waterloo-road-Lindsay-James2.mp4',
    description: 'High School Musical 2 2000s.',
    tags: ['Summer Slay', 'HSM2'],
    isCached: false
  },
  {
    id: 'tv1',
    type: 'tv',
    title: 'Dora the Explorer 2000s',
    year: '2007-2012',
    rating: 5,
    imageUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2026/01/Dora-the-Explorer-2000s.jpg',
    description: 'Dora the Explorer 2000s.',
    tags: ['Dora', 'Adventure'],
    isCached: true
  },
  {
    id: 'tv2',
    type: 'tv',
    title: 'Hannah Montana',
    year: '2006-2011',
    rating: 4,
    imageUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2026/01/Hannah-Montana-2000s-pic.jpg',
    videoUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2025/11/Lindsay-Hometown-Glory.mp4',
    description: 'The best of both worlds. The original secret identity queen.',
    tags: ['music', 'wig', 'nostalgia'],
    isCached: true
  },
  {
    id: 'v1',
    type: 'video',
    title: 'Metroland In Metrocentre 2000s',
    year: '2011',
    rating: 5,
    imageUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2026/01/Metroland-In-Metrocentre-2000s-Pic.jpg',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-pink-neon-city-lights-reflecting-on-a-river-loop-32742-large.mp4',
    description: 'Metroland In Metrocentre 2000s',
    tags: ['Metroland', 'Retro'],
    isCached: true
  },
  {
    id: 'v2',
    type: 'video',
    title: 'Angel Delight',
    year: '2012',
    rating: 3,
    imageUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2026/01/Angel-Delight.jpeg',
    videoUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2025/11/Lindsay-Hometown-Glory.mp4',
    description: 'Angel Delight',
    tags: ['Sweet', 'Clouds'],
    isCached: true
  }
];

export const DEFAULT_PRESS_CONTENT: PressContent = {
  heroTitle: "The Sovereign Authority On Slay.",
  heroTagline: "Global Media Powerhouse",
  heroIntro: "OMG It’s So Sick Babygirl Kingdom is not just an empire; it’s the definitive cultural blueprint for the nostalgic, hyper-feminine digital age.",
  heroImageUrl: "https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2026/01/Omg-its-So-Sick-Babygirl-Kingdom.png",
  quoteText: "Trendsetter of the Era",
  quoteAuthor: "Imperial Press",
  networkCards: [
    {
      title: "Sovereign Sweetheart",
      tagline: "Digital Fashion & Pop Culture Weekly",
      desc: "The Kingdom's primary editorial outlet for aesthetic forecasting and cultural commentary."
    },
    {
      title: "Nostalgia Nexus",
      tagline: "High-Def 2011 Deep Dives",
      desc: "Dedicated to preserving the golden era of the internet through archived media and storytelling."
    },
    {
      title: "Favorite Things",
      tagline: "The Daily Curation Service",
      desc: "A premium product highlight network focusing on luxury, pink, and nostalgic essentials."
    },
    {
      title: "Imperial Vibe Lab",
      tagline: "Bespoke Aesthetic Consultancy",
      desc: "Our creative arm helping external brands find their 'Babygirl Sparkle' through targeted design."
    }
  ],
  collabPitchTitle: "Partner With The Monarchy",
  collabPitchDesc: "We specialize in turning brands into icons. Our audience doesn't just consume; they belong to a digital sovereignty.",
  contactEmail: "xoxoempire2010@gmail.com"
};
