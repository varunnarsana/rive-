import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';
import WebSocket from 'ws';
import SSE from 'express-sse';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Initialize SSE for real-time updates
const sse = new SSE();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Spotify API client
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

// Refresh Spotify access token periodically
async function refreshSpotifyToken() {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body['access_token']);
    console.log('Spotify token refreshed');
    // Refresh token before it expires
    setTimeout(refreshSpotifyToken, (data.body['expires_in'] - 60) * 1000);
  } catch (error) {
    console.error('Error refreshing Spotify token:', error);
    setTimeout(refreshSpotifyToken, 60000); // Retry after 1 minute
  }
}

// Cache for trending tracks
let trendingTracksCache: any = null;
let lastCacheUpdate = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Function to fetch trending tracks from various sources
async function fetchTrendingTracks() {
  try {
    // Fetch from Spotify
    const [newReleases, viral, charts] = await Promise.all([
      spotifyApi.getNewReleases({ limit: 20 }),
      spotifyApi.getPlaylist('37i9dQZEVXbMDoHDwVN2tF'), // Global Viral 50
      spotifyApi.getPlaylist('37i9dQZEVXbLRQDuF5jeBp')  // Global Top 50
    ]);

    // Fetch from TikTok (via RapidAPI)
    const tiktokResponse = await axios.get('https://tiktok-api.example.com/trending-sounds', {
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
        'X-RapidAPI-Host': 'tiktok-api.example.com'
      }
    });

    // Process and merge data
    const tracks = [
      ...processSpotifyTracks(newReleases.body.albums.items),
      ...processSpotifyTracks(viral.body.tracks.items),
      ...processSpotifyTracks(charts.body.tracks.items),
      ...processTikTokTracks(tiktokResponse.data)
    ];

    // Sort by trend score
    const sortedTracks = tracks.sort((a, b) => calculateTrendScore(b) - calculateTrendScore(a));

    return sortedTracks;
  } catch (error) {
    console.error('Error fetching trending tracks:', error);
    throw error;
  }
}

function processSpotifyTracks(tracks: any[]) {
  return tracks.map(track => ({
    id: track.id,
    title: track.name,
    artist: track.artists?.[0]?.name || 'Unknown Artist',
    imageUrl: track.images?.[0]?.url || track.album?.images?.[0]?.url,
    platform: 'spotify',
    genre: track.genres?.[0] || track.type || 'Unknown',
    metrics: {
      streams: 0,
      previousStreams: 0,
      chartPosition: 0,
      previousPosition: 0,
      growthRate: 0,
      viralScore: 0
    },
    timestamps: {
      lastUpdated: new Date(),
      trackingPeriod: '24h'
    },
    links: {
      spotify: track.external_urls?.spotify
    }
  }));
}

function processTikTokTracks(tracks: any[]) {
  return tracks.map(track => ({
    id: track.id,
    title: track.title,
    artist: track.creator,
    imageUrl: track.coverUrl,
    platform: 'tiktok',
    genre: 'Unknown',
    metrics: {
      streams: track.playCount,
      previousStreams: track.previousPlayCount,
      chartPosition: track.rank,
      previousPosition: track.previousRank,
      growthRate: ((track.playCount - track.previousPlayCount) / track.previousPlayCount) * 100,
      viralScore: track.viralScore
    },
    timestamps: {
      lastUpdated: new Date(),
      trackingPeriod: '24h'
    },
    links: {
      tiktok: track.shareUrl
    }
  }));
}

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
    const now = Date.now();
    if (!trendingTracksCache || now - lastCacheUpdate > CACHE_DURATION) {
      trendingTracksCache = await fetchTrendingTracks();
      lastCacheUpdate = now;
    }
    res.json(trendingTracksCache);
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
  refreshSpotifyToken(); // Initial token refresh
});

// WebSocket server for real-time updates
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket');

  ws.on('error', console.error);
  ws.on('close', () => console.log('Client disconnected from WebSocket'));
});

// Update trending tracks periodically and notify clients
setInterval(async () => {
  try {
    const tracks = await fetchTrendingTracks();
    trendingTracksCache = tracks;
    lastCacheUpdate = Date.now();

    // Notify WebSocket clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(tracks));
      }
    });

    // Notify SSE clients
    sse.send(tracks);
  } catch (error) {
    console.error('Error updating trending tracks:', error);
  }
}, 30000); // Update every 30 seconds 