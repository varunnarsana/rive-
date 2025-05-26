import express from 'express';
import cors from 'cors';
import { WebSocketServer, WebSocket } from 'ws';
import SSE from 'express-sse';

const app = express();
const port = process.env.PORT || 8080;

// Initialize SSE for real-time updates
const sse = new SSE();

// Middleware
app.use(cors());
app.use(express.json());

// Mock data for trending tracks
const mockTracks = [
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

// Cache for trending tracks
let trendingTracksCache = mockTracks;
let lastCacheUpdate = Date.now();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function calculateTrendScore(track: any) {
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

// API Endpoints
app.get('/api/trends/music', async (req, res) => {
  try {
    // Sort tracks by trend score
    const sortedTracks = [...trendingTracksCache].sort((a, b) => 
      calculateTrendScore(b) - calculateTrendScore(a)
    );
    res.json(sortedTracks);
  } catch (error) {
    console.error('Error in /api/trends/music:', error);
    res.status(500).json({ error: 'Failed to fetch trending music' });
  }
});

// SSE endpoint for real-time updates
app.get('/api/trending-music-stream', (req, res) => {
  sse.init(req, res);
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// WebSocket server for real-time updates
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket');
  ws.send(JSON.stringify(trendingTracksCache));

  ws.on('error', console.error);
  ws.on('close', () => console.log('Client disconnected from WebSocket'));
});

// Simulate real-time updates
setInterval(() => {
  // Randomly update some metrics
  trendingTracksCache = trendingTracksCache.map(track => ({
    ...track,
    metrics: {
      ...track.metrics,
      streams: track.metrics.streams + Math.floor(Math.random() * 10000),
      growthRate: track.metrics.growthRate + (Math.random() * 2 - 1), // Random change between -1 and 1
      viralScore: Math.min(100, Math.max(0, track.metrics.viralScore + (Math.random() * 4 - 2))) // Random change between -2 and 2
    },
    timestamps: {
      ...track.timestamps,
      lastUpdated: new Date()
    }
  }));

  // Notify WebSocket clients
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(trendingTracksCache));
    }
  });

  // Notify SSE clients
  sse.send(trendingTracksCache);
}, 30000); // Update every 30 seconds 