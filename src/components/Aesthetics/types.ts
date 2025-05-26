export interface AestheticDetail {
  id: string;
  name: string;
  description: string;
  fashion: {
    clothing: string[];
    accessories: string[];
    brands: string[];
    styles: string[];
  };
  music: {
    genres: string[];
    artists: string[];
    songs: string[];
    playlists: string[];
  };
  decor: {
    elements: string[];
    colors: string[];
    materials: string[];
    patterns: string[];
  };
  vibe: {
    keywords: string[];
    feelings: string[];
    activities: string[];
  };
  places: {
    locations: string[];
    venues: string[];
    cities: string[];
  };
  people: {
    influencers: string[];
    celebrities: string[];
    characters: string[];
  };
  artists: {
    visual: string[];
    musicians: string[];
    designers: string[];
  };
  sayings: string[];
  colorPalette: string[];
  imageUrl: string;
} 