export type TrendRating = 'love' | 'neutral' | 'dislike';

export interface TrendPoll {
  id: string;
  question: string;
  options: string[];
  votes: Record<string, number>;
  endDate: string;
}

export interface UserTrendInteraction {
  trendId: string;
  rating?: TrendRating;
  saved: boolean;
  voted?: boolean;
  sharedCount: number;
}

export interface UserPreferences {
  savedTrends: string[];
  ratedTrends: Record<string, TrendRating>;
  aesthetics: string[];
  interests: string[];
  recentlyViewed: string[];
} 