import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { musicService, TrendingTrack } from '../services/musicService';

interface FilterState {
  platform: ('spotify' | 'appleMusic' | 'tiktok')[];
  genre: string[];
}

const MusicTrends: React.FC = () => {
  const [tracks, setTracks] = useState<TrendingTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    platform: ['spotify', 'appleMusic', 'tiktok'],
    genre: []
  });

  const [availableGenres, setAvailableGenres] = useState<string[]>([]);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);
        const trendingTracks = await musicService.fetchTrendingMusic();
        setTracks(trendingTracks);
        
        // Extract unique genres
        const genres = [...new Set(trendingTracks.map(track => track.genre))];
        setAvailableGenres(genres);
      } catch (err) {
        setError('Failed to fetch trending music. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchTracks, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const togglePlatformFilter = (platform: 'spotify' | 'appleMusic' | 'tiktok') => {
    setFilters(prev => ({
      ...prev,
      platform: prev.platform.includes(platform)
        ? prev.platform.filter(p => p !== platform)
        : [...prev.platform, platform]
    }));
  };

  const toggleGenreFilter = (genre: string) => {
    setFilters(prev => ({
      ...prev,
      genre: prev.genre.includes(genre)
        ? prev.genre.filter(g => g !== genre)
        : [...prev.genre, genre]
    }));
  };

  const filteredTracks = tracks.filter(track => {
    const platformMatch = filters.platform.includes(track.platform);
    const genreMatch = filters.genre.length === 0 || filters.genre.includes(track.genre);
    return platformMatch && genreMatch;
  });

  const calculateTrendIndicator = (track: TrendingTrack) => {
    const growth = track.metrics.growthRate;
    if (growth > 50) return '🚀';
    if (growth > 20) return '📈';
    if (growth < -20) return '📉';
    return '➡️';
  };

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-100 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Trending Music</h2>
      
      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Platforms</h3>
          <div className="flex gap-2">
            {['spotify', 'appleMusic', 'tiktok'].map(platform => (
              <button
                key={platform}
                onClick={() => togglePlatformFilter(platform as 'spotify' | 'appleMusic' | 'tiktok')}
                className={`px-4 py-2 rounded-full transition-all ${
                  filters.platform.includes(platform)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {platform === 'spotify' ? 'Spotify' :
                 platform === 'appleMusic' ? 'Apple Music' : 'TikTok'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Genres</h3>
          <div className="flex flex-wrap gap-2">
            {availableGenres.map(genre => (
              <button
                key={genre}
                onClick={() => toggleGenreFilter(genre)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  filters.genre.includes(genre)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tracks Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredTracks.map(track => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="relative aspect-square">
                  <img
                    src={track.imageUrl}
                    alt={track.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-2">
                    {calculateTrendIndicator(track)}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 truncate">{track.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{track.artist}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="bg-gray-200 px-2 py-1 rounded">
                      {track.genre}
                    </span>
                    <span className="text-purple-600">
                      #{track.metrics.chartPosition}
                    </span>
                  </div>

                  <div className="mt-4 flex gap-2">
                    {track.links.spotify && (
                      <a
                        href={track.links.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700"
                      >
                        Spotify
                      </a>
                    )}
                    {track.links.appleMusic && (
                      <a
                        href={track.links.appleMusic}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-pink-700"
                      >
                        Apple Music
                      </a>
                    )}
                    {track.links.tiktok && (
                      <a
                        href={track.links.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:text-gray-700"
                      >
                        TikTok
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default MusicTrends; 