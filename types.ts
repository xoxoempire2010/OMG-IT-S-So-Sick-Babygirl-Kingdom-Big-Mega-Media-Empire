
export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  content: string;
  tags: string[];
}

export enum Category {
  SPARKLE_SCIENCE = 'Sparkle Science',
  KAWAII_CLOSET = 'Kawaii Closet',
  DREAMY_DECOR = 'Dreamy Decor',
  GOSSIP_GIRLIES = 'Gossip Girlies',
  SOUL_CANDY = 'Soul Candy',
  IMPERIAL_CINEMA = 'Imperial Cinema',
  KINGDOM_TV = 'Kingdom TV',
  FREEBIE_VAULT = 'Freebie Vault',
  VIP_EXCLUSIVES = 'VIP Exclusives'
}

export type MediaType = 'movie' | 'tv' | 'video' | 'photo';
export type ImperialLocation = 'home' | 'travel' | 'mcdonalds' | 'arcade';
export type ConnectivityMode = 'online' | 'offline';

export interface MediaItem {
  id: string;
  type: MediaType;
  title: string;
  year: string;
  rating: number; // 1-5 hearts
  imageUrl: string;
  videoUrl?: string;
  description: string;
  tags: string[];
  isCached?: boolean; // For offline travel
}

export interface ShopItem {
  id: string;
  name: string;
  price: string; 
  imageUrl: string;
  isVip: boolean;
  category: string;
}

export interface PressContent {
  heroTitle: string;
  heroTagline: string;
  heroIntro: string;
  heroImageUrl: string;
  quoteText: string;
  quoteAuthor: string;
  networkCards: Array<{ title: string; tagline: string; desc: string }>;
  collabPitchTitle: string;
  collabPitchDesc: string;
  contactEmail: string;
}

export type AppPages = 'home' | 'blog' | 'cinema' | 'tvlab' | 'map' | 'oracle' | 'upload' | 'post' | 'mall' | 'clubs' | 'contact' | 'terms' | 'watch' | 'press' | 'press_edit';
