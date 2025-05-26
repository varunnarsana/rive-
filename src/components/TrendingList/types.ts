import { TrendPoll } from '../../types/interactions';

export interface TrendItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  growth: number;
  source: string;
  date: string;
  aestheticTags: string[];
  interactions: {
    likes: number;
    shares: number;
    saves: number;
  };
} 