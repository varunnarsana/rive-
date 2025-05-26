import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  type: 'banner' | 'card' | 'timeline' | 'heatmap';
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type }) => {
  const pulse = {
    animate: {
      opacity: [0.4, 0.7, 0.4],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const renderBannerSkeleton = () => (
    <motion.div
      className="w-full h-64 rounded-xl bg-gray-200 dark:bg-gray-700 overflow-hidden"
      {...pulse}
    >
      <div className="h-full w-full relative">
        <div className="absolute bottom-6 left-6 space-y-3">
          <div className="h-8 w-32 bg-gray-300 dark:bg-gray-600 rounded-full" />
          <div className="h-6 w-64 bg-gray-300 dark:bg-gray-600 rounded-lg" />
          <div className="h-4 w-48 bg-gray-300 dark:bg-gray-600 rounded-lg" />
        </div>
      </div>
    </motion.div>
  );

  const renderCardSkeleton = () => (
    <motion.div
      className="w-full h-40 rounded-lg bg-gray-200 dark:bg-gray-700 p-4"
      {...pulse}
    >
      <div className="space-y-3">
        <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded" />
        <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-600 rounded" />
        <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-600 rounded" />
      </div>
    </motion.div>
  );

  const renderTimelineSkeleton = () => (
    <motion.div
      className="w-full h-64 rounded-lg bg-gray-200 dark:bg-gray-700 p-4"
      {...pulse}
    >
      <div className="h-6 w-40 bg-gray-300 dark:bg-gray-600 rounded mb-4" />
      <div className="flex justify-between items-end h-40">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="w-8 bg-gray-300 dark:bg-gray-600 rounded-t"
            style={{ height: `${Math.random() * 100}%` }}
          />
        ))}
      </div>
    </motion.div>
  );

  const renderHeatmapSkeleton = () => (
    <motion.div
      className="w-full rounded-lg bg-gray-200 dark:bg-gray-700 p-4"
      {...pulse}
    >
      <div className="h-6 w-48 bg-gray-300 dark:bg-gray-600 rounded mb-4" />
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-3">
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-4 flex-1 bg-gray-300 dark:bg-gray-600 rounded" />
          </div>
        ))}
      </div>
    </motion.div>
  );

  const skeletons = {
    banner: renderBannerSkeleton,
    card: renderCardSkeleton,
    timeline: renderTimelineSkeleton,
    heatmap: renderHeatmapSkeleton
  };

  return skeletons[type]();
}; 