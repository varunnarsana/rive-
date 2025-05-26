export interface TrendingTrack {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  platform: 'spotify' | 'appleMusic' | 'tiktok';
  genre: string;
  metrics: {
    streams: number;
    previousStreams: number;
    chartPosition: number;
    previousPosition: number;
    growthRate: number;
    viralScore: number;
  };
  timestamps: {
    lastUpdated: Date;
    trackingPeriod: '24h' | '7d' | '30d';
  };
  links: {
    spotify?: string;
    appleMusic?: string;
    tiktok?: string;
  };
}

const mockTracks: TrendingTrack[] = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist: 'Luna Nova',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
    platform: 'spotify',
    genre: 'Indie Pop',
    metrics: {
      streams: 1500000,
      previousStreams: 1200000,
      chartPosition: 3,
      previousPosition: 5,
      growthRate: 25,
      viralScore: 85
    },
    timestamps: {
      lastUpdated: new Date(),
      trackingPeriod: '24h'
    },
    links: {
      spotify: 'https://open.spotify.com/track/example1'
    }
  },
  {
    id: '2',
    title: 'Digital Dystopia',
    artist: 'Cyber Collective',
    imageUrl: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c',
    platform: 'spotify',
    genre: 'Electronic',
    metrics: {
      streams: 2100000,
      previousStreams: 1800000,
      chartPosition: 1,
      previousPosition: 2,
      growthRate: 16.67,
      viralScore: 92
    },
    timestamps: {
      lastUpdated: new Date(),
      trackingPeriod: '24h'
    },
    links: {
      spotify: 'https://open.spotify.com/track/example2'
    }
  },
  {
    id: '3',
    title: 'Summer Vibes',
    artist: 'Beach Dreams',
    imageUrl: 'https://images.unsplash.com/photo-1534196511436-921a4e99f297',
    platform: 'appleMusic',
    genre: 'Pop',
    metrics: {
      streams: 980000,
      previousStreams: 750000,
      chartPosition: 8,
      previousPosition: 12,
      growthRate: 30.67,
      viralScore: 78
    },
    timestamps: {
      lastUpdated: new Date(),
      trackingPeriod: '24h'
    },
    links: {
      appleMusic: 'https://music.apple.com/track/example3'
    }
  },
  {
    id: '4',
    title: 'Viral Dance',
    artist: 'TikTok Stars',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
    platform: 'tiktok',
    genre: 'Dance',
    metrics: {
      streams: 3500000,
      previousStreams: 2000000,
      chartPosition: 2,
      previousPosition: 1,
      growthRate: 75,
      viralScore: 95
    },
    timestamps: {
      lastUpdated: new Date(),
      trackingPeriod: '24h'
    },
    links: {
      tiktok: 'https://tiktok.com/music/example4'
    }
  },
  {
    id: '5',
    title: 'Retro Wave',
    artist: 'Synthwave Dreams',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
    platform: 'appleMusic',
    genre: 'Synthwave',
    metrics: {
      streams: 1200000,
      previousStreams: 900000,
      chartPosition: 5,
      previousPosition: 7,
      growthRate: 33.33,
      viralScore: 82
    },
    timestamps: {
      lastUpdated: new Date(),
      trackingPeriod: '24h'
    },
    links: {
      appleMusic: 'https://music.apple.com/track/example5'
    }
  }
];

class MusicTrendingService {
  private static instance: MusicTrendingService;
  private wsConnection: WebSocket | null = null;
  private eventSource: EventSource | null = null;

  private constructor() {
    this.setupWebSocket();
    this.setupEventSource();
  }

  public static getInstance(): MusicTrendingService {
    if (!MusicTrendingService.instance) {
      MusicTrendingService.instance = new MusicTrendingService();
    }
    return MusicTrendingService.instance;
  }

  private setupWebSocket() {
    try {
      this.wsConnection = new WebSocket('ws://localhost:8080');
      
      this.wsConnection.onmessage = (event) => {
        const data = JSON.parse(event.data);
        // Handle real-time updates
        console.log('Received WebSocket update:', data);
      };

      this.wsConnection.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Failed to setup WebSocket:', error);
    }
  }

  private setupEventSource() {
    try {
      this.eventSource = new EventSource('/api/trending-music-stream');
      
      this.eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        // Handle SSE updates
        console.log('Received SSE update:', data);
      };

      this.eventSource.onerror = () => {
        this.eventSource?.close();
      };
    } catch (error) {
      console.error('Failed to setup EventSource:', error);
    }
  }

  public async fetchTrendingMusic(): Promise<TrendingTrack[]> {
    try {
      // For now, just return mock data
      // In the future, this will fetch from the backend
      return mockTracks;
    } catch (error) {
      console.error('Error fetching trending music:', error);
      return [];
    }
  }

  private calculateTrendScore(track: TrendingTrack): number {
    const weights = {
      streams: 0.4,
      chartPosition: 0.3,
      growthRate: 0.2,
      viralScore: 0.1
    };

    const normalizedStreams = Math.min(track.metrics.streams / 1000000, 1);
    const normalizedChart = (100 - track.metrics.chartPosition) / 100;
    const normalizedGrowth = Math.min(track.metrics.growthRate / 100, 1);
    const normalizedViral = track.metrics.viralScore / 100;

    return (
      normalizedStreams * weights.streams +
      normalizedChart * weights.chartPosition +
      normalizedGrowth * weights.growthRate +
      normalizedViral * weights.viralScore
    );
  }
}

export const musicService = MusicTrendingService.getInstance(); 