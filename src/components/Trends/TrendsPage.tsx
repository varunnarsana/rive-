import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendCompare } from './TrendCompare';
import { TrendPrediction } from './TrendPrediction';
import { SavedTrends } from './SavedTrends';
import { ShareTrend } from './ShareTrend';
import { ThemeOfDay } from './ThemeOfDay';
import { TrendHeatMap } from './TrendHeatMap';
import { TrendTimeline } from './TrendTimeline';
import { RelatedTrends } from './RelatedTrends';
import { useTheme } from '../../context/ThemeContext';

// Mock data
const mockData = {
  themeOfDay: {
    title: "Y2K Revival",
    description: "The return of millennium-era fashion and aesthetics",
    metrics: {
      growth: 85,
      engagement: 150
    },
    imageUrl: "/images/y2k-theme.jpg"
  },
  regions: [
    { name: "North America", intensity: 85, count: 1250 },
    { name: "Europe", intensity: 75, count: 980 },
    { name: "Asia Pacific", intensity: 90, count: 1500 },
    { name: "Latin America", intensity: 60, count: 450 },
    { name: "Africa", intensity: 40, count: 320 }
  ],
  timelineData: [
    { date: "Mon", value: 45, label: "Engagement" },
    { date: "Tue", value: 60, label: "Engagement" },
    { date: "Wed", value: 85, label: "Engagement" },
    { date: "Thu", value: 70, label: "Engagement" },
    { date: "Fri", value: 95, label: "Engagement" },
    { date: "Sat", value: 100, label: "Engagement" },
    { date: "Sun", value: 80, label: "Engagement" }
  ],
  availableTrends: [
    {
      id: "1",
      title: "Cottagecore",
      category: "Aesthetic",
      description: "A celebration of rural lifestyle and traditional crafts",
      imageUrl: "/images/cottagecore.jpg",
      timestamp: new Date().toISOString(),
      metrics: {
        engagement: 12500,
        growth: 45,
        popularity: 78,
        sentiment: 85
      }
    },
    {
      id: "2",
      title: "Dark Academia",
      category: "Aesthetic",
      description: "An aesthetic that romanticizes classical literature, learning, and the arts",
      imageUrl: "/images/dark-academia.jpg",
      timestamp: new Date().toISOString(),
      metrics: {
        engagement: 9800,
        growth: 30,
        popularity: 65,
        sentiment: 75
      }
    },
    {
      id: "3",
      title: "Cyberpunk",
      category: "Aesthetic",
      description: "A fusion of high-tech and low-life elements",
      imageUrl: "/images/cyberpunk.jpg",
      timestamp: new Date().toISOString(),
      metrics: {
        engagement: 15000,
        growth: 60,
        popularity: 88,
        sentiment: 80
      }
    }
  ],
  predictionData: {
    id: "1",
    title: "Cottagecore",
    category: "Aesthetic",
    data: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString(),
      actual: Math.random() * 100,
      predicted: Math.random() * 100 + 50,
      confidence: Math.random() * 0.2
    }))
  },
  relatedTrends: [
    {
      id: "4",
      title: "Farmcore",
      category: "Aesthetic",
      similarity: 85,
      metrics: {
        engagement: 8500,
        growth: 35
      }
    },
    {
      id: "5",
      title: "Grandmacore",
      category: "Aesthetic",
      similarity: 75,
      metrics: {
        engagement: 6200,
        growth: 25
      }
    }
  ]
};

export const TrendsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(mockData);
  const [savedTrends, setSavedTrends] = useState<string[]>([]);
  const [selectedTrend, setSelectedTrend] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    // Simulate API loading
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setData(mockData);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleSaveTrend = (trendId: string) => {
    setSavedTrends(prev => 
      prev.includes(trendId)
        ? prev.filter(id => id !== trendId)
        : [...prev, trendId]
    );
  };

  const handleShareTrend = (trend: any) => {
    setSelectedTrend(trend.id);
    setShowShareModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              theme === 'dark' ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-600'
            }`}
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        </div>

        {/* Theme of the Day */}
        <AnimatePresence mode="wait">
          {!loading && (
            <ThemeOfDay theme={data.themeOfDay} />
          )}
        </AnimatePresence>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Heat Map */}
          <AnimatePresence mode="wait">
            {!loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <TrendHeatMap regions={data.regions} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Timeline */}
          <AnimatePresence mode="wait">
            {!loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <TrendTimeline
                  data={data.timelineData}
                  title="Weekly Trend Evolution"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trend Compare */}
          <TrendCompare
            availableTrends={data.availableTrends}
            onSaveTrend={handleSaveTrend}
            onShareTrend={handleShareTrend}
          />

          {/* Trend Prediction */}
          <TrendPrediction trend={data.predictionData} />

          {/* Saved Trends */}
          <SavedTrends
            savedTrends={data.availableTrends.filter(t => savedTrends.includes(t.id)).map(t => ({
              ...t,
              savedAt: new Date().toISOString()
            }))}
            onRemove={id => setSavedTrends(prev => prev.filter(savedId => savedId !== id))}
            onView={id => setSelectedTrend(id)}
          />

          {/* Related Trends */}
          {selectedTrend && (
            <RelatedTrends
              currentTrend={data.availableTrends.find(t => t.id === selectedTrend)!}
              relatedTrends={data.relatedTrends}
              onTrendSelect={setSelectedTrend}
            />
          )}
        </div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && selectedTrend && (
          <ShareTrend
            trend={data.availableTrends.find(t => t.id === selectedTrend)!}
            onClose={() => setShowShareModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}; 