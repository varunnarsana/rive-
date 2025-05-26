export interface RisingStar {
  id: string;
  name: string;
  handle: string;
  imageUrl: string;
  description: string;
  category: string;
  growthRate: number;
  followers: number;
}

export interface RisingStarsProps {
  stars: RisingStar[];
} 