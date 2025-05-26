import styled from 'styled-components';
import { useState } from 'react';
import { TrendBoard } from '../../components/TrendBoard/TrendBoard';
import { TrendMap } from '../../components/TrendMap/TrendMap';
import { TrendEvolution } from '../../components/TrendEvolution/TrendEvolution';
import { RisingStars } from '../../components/RisingStars/RisingStars';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Hero = styled.section`
  text-align: center;
  padding: 4rem 0 2rem;
  background: linear-gradient(to bottom, #f8f9fa, #ffffff);
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  color: #333;
  margin-bottom: 1rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
`;

// Mock data for board items
const mockBoardItems = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=2070&auto=format&fit=crop',
    title: 'Lo-fi Beats',
    type: 'image' as const,
    size: 'large' as const,
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2076&auto=format&fit=crop',
    title: 'Y2K Fashion',
    type: 'image' as const,
    size: 'medium' as const,
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop',
    title: 'Dark Academia',
    type: 'image' as const,
    size: 'medium' as const,
  },
];

const mockLocations = [
  {
    id: '1',
    city: 'Tokyo',
    country: 'Japan',
    coordinates: [82, 12] as [number, number],
    trends: [
      { title: 'Kawaii Fashion', category: 'Fashion', popularity: 95 },
      { title: 'J-Pop Revival', category: 'Music', popularity: 88 },
    ],
  },
  {
    id: '2',
    city: 'Paris',
    country: 'France',
    coordinates: [46, 8] as [number, number],
    trends: [
      { title: 'French Minimalism', category: 'Aesthetics', popularity: 92 },
      { title: 'Café Culture', category: 'Lifestyle', popularity: 85 },
    ],
  },
  {
    id: '3',
    city: 'New York',
    country: 'USA',
    coordinates: [23, 11] as [number, number],
    trends: [
      { title: 'Street Style', category: 'Fashion', popularity: 90 },
      { title: 'Urban Art', category: 'Culture', popularity: 87 },
    ],
  },
  {
    id: '4',
    city: 'Seoul',
    country: 'South Korea',
    coordinates: [78, 14] as [number, number],
    trends: [
      { title: 'K-Pop Fashion', category: 'Fashion', popularity: 96 },
      { title: 'Beauty Innovation', category: 'Beauty', popularity: 94 },
    ],
  },
  {
    id: '5',
    city: 'London',
    country: 'UK',
    coordinates: [43, 7] as [number, number],
    trends: [
      { title: 'Vintage Revival', category: 'Fashion', popularity: 88 },
      { title: 'Alternative Scene', category: 'Culture', popularity: 85 },
    ],
  },
  {
    id: '6',
    city: 'Milan',
    country: 'Italy',
    coordinates: [48, 11] as [number, number],
    trends: [
      { title: 'Haute Couture', category: 'Fashion', popularity: 93 },
      { title: 'Luxury Streetwear', category: 'Fashion', popularity: 89 },
    ],
  },
  {
    id: '7',
    city: 'Sydney',
    country: 'Australia',
    coordinates: [85, 32] as [number, number],
    trends: [
      { title: 'Beach Fashion', category: 'Fashion', popularity: 87 },
      { title: 'Sustainable Style', category: 'Lifestyle', popularity: 86 },
    ],
  }
];

// Mock data for trend evolution
const mockEvolutionData = {
  day: [
    { date: '9 AM', value: 35 },
    { date: '12 PM', value: 48 },
    { date: '3 PM', value: 65 },
    { date: '6 PM', value: 82 },
    { date: '9 PM', value: 95 }
  ],
  week: [
    { date: 'Mon', value: 45 },
    { date: 'Tue', value: 52 },
    { date: 'Wed', value: 68 },
    { date: 'Thu', value: 75 },
    { date: 'Fri', value: 88 }
  ],
  month: [
    { date: 'Week 1', value: 45 },
    { date: 'Week 2', value: 62 },
    { date: 'Week 3', value: 78 },
    { date: 'Week 4', value: 85 },
    { date: 'Week 5', value: 92 }
  ]
};

// Mock data for rising stars
const mockRisingStars = [
  {
    id: '1',
    name: 'Sarah Chen',
    handle: '@sarahcreates',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
    description: 'Fashion innovator blending streetwear with high fashion',
    category: 'Fashion',
    growthRate: 245,
    followers: 125000
  },
  {
    id: '2',
    name: 'Alex Rivera',
    handle: '@alexcreates',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop',
    description: 'Digital artist pushing boundaries in NFT space',
    category: 'Art',
    growthRate: 180,
    followers: 98000
  }
];

export const HomePage = () => {
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month'>('week');

  return (
    <PageContainer>
      <Hero>
        <HeroTitle>Discover What's Next</HeroTitle>
        <HeroSubtitle>
          Stay ahead of the curve with Riva's real-time trend analysis and predictions.
          Understand what Gen Z is talking about, creating, and caring about.
        </HeroSubtitle>
      </Hero>

      <Section>
        <SectionTitle>Trending Now</SectionTitle>
        <TrendBoard items={mockBoardItems} category="Current Trends" />
      </Section>

      <Section>
        <SectionTitle>Global Trend Map</SectionTitle>
        <TrendMap locations={mockLocations} />
      </Section>

      <Section>
        <SectionTitle>Trend Evolution</SectionTitle>
        <TrendEvolution
          title="Y2K Fashion Trend"
          category="Fashion"
          timeframe={timeframe}
          data={mockEvolutionData[timeframe]}
          onTimeframeChange={setTimeframe}
        />
      </Section>

      <Section>
        <SectionTitle>Rising Stars</SectionTitle>
        <RisingStars stars={mockRisingStars} />
      </Section>
    </PageContainer>
  );
}; 