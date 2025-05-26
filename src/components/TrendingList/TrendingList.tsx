import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { TrendInteractions } from '../TrendInteractions/TrendInteractions';
import { TrendPoll } from '../TrendPoll/TrendPoll';
import { TrendRating } from '../../types/interactions';
import { TrendItem } from './types';

interface TrendingListProps {
  trends: TrendItem[];
  onTrendInteraction?: (trendId: string, type: 'rate' | 'save' | 'share' | 'vote', value?: any) => void;
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const FilterSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const FilterRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary.slateBlue : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.background.primary : theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.9rem;
  border: 1px solid ${({ theme }) => theme.colors.primary.slateBlue}40;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme, $active }) =>
      $active ? theme.colors.primary.slateBlue : theme.colors.background.tertiary};
  }
`;

const TrendGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const TrendCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: ${({ theme }) => theme.transitions.default};
  border: 1px solid ${({ theme }) => theme.colors.background.tertiary};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.primary.slateBlue}40;
  }
`;

const MediaContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  overflow: hidden;
`;

const TrendImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
  opacity: 0;

  &.loaded {
    opacity: 1;
  }
`;

const TrendInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

const TrendTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.primary};
  font-size: 1.2rem;
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
`;

const TrendMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Category = styled.span`
  color: ${({ theme }) => theme.colors.primary.sageGreen};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.8rem;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const GrowthIndicator = styled.div<{ $positive: boolean }>`
  color: ${({ theme, $positive }) =>
    $positive ? theme.colors.primary.sageGreen : theme.colors.primary.dustyRose};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.typography.body};
  font-size: 0.9rem;
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  line-height: 1.5;
`;

const SourceInfo = styled.div`
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text.light};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AestheticTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const AestheticTag = styled.span`
  color: ${({ theme }) => theme.colors.text.light};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.8rem;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const InteractionStats = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.background.tertiary};
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.9rem;
`;

const categories = ['All', 'Music', 'Fashion', 'Slangs', 'Cities', 'Artists', 'Aesthetics', 'Culture'];
const timeFilters = ['Now', 'Today', 'This Week', 'This Month'];
const aestheticFilters = ['Y2K', 'Dark Academia', 'Cottagecore', 'Minimalist', 'Cyberpunk'];

export const TrendingList = ({ trends, onTrendInteraction }: TrendingListProps) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTime, setSelectedTime] = useState('Now');
  const [selectedAesthetic, setSelectedAesthetic] = useState('');
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({});

  const handleImageLoad = (id: string) => {
    setImageLoaded(prev => ({ ...prev, [id]: true }));
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('Image failed to load:', e.currentTarget.src);
    e.currentTarget.src = '/images/placeholder.svg';
  };

  const handleTrendInteraction = (
    trendId: string,
    type: 'rate' | 'save' | 'share' | 'vote',
    value?: any
  ) => {
    onTrendInteraction?.(trendId, type, value);
  };

  const filteredTrends = trends.filter((trend) => {
    if (selectedCategory !== 'All' && trend.category !== selectedCategory) return false;
    return true;
  });

  return (
    <Container>
      <FilterSection>
        <FilterRow>
          {categories.map(category => (
            <FilterButton
              key={category}
              $active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </FilterButton>
          ))}
        </FilterRow>
        <FilterRow>
          {timeFilters.map(filter => (
            <FilterButton
              key={filter}
              $active={selectedTime === filter}
              onClick={() => setSelectedTime(filter)}
            >
              {filter}
            </FilterButton>
          ))}
        </FilterRow>
        <FilterRow>
          {aestheticFilters.map(filter => (
            <FilterButton
              key={filter}
              $active={selectedAesthetic === filter}
              onClick={() => setSelectedAesthetic(filter)}
            >
              {filter}
            </FilterButton>
          ))}
        </FilterRow>
      </FilterSection>

      <TrendGrid>
        <AnimatePresence>
          {filteredTrends.map((trend) => (
            <TrendCard
              key={trend.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MediaContainer>
                <TrendImage
                  src={trend.imageUrl}
                  alt={trend.title}
                  onLoad={() => handleImageLoad(trend.id)}
                  onError={handleImageError}
                  className={imageLoaded[trend.id] ? 'loaded' : ''}
                />
              </MediaContainer>
              <TrendInfo>
                <TrendMeta>
                  <Category>{trend.category}</Category>
                  <GrowthIndicator $positive={trend.growth > 0}>
                    {trend.growth > 0 ? '↑' : '↓'} {Math.abs(trend.growth)}%
                  </GrowthIndicator>
                </TrendMeta>
                <TrendTitle>{trend.title}</TrendTitle>
                <Description>{trend.description}</Description>
                <SourceInfo>
                  <span>{trend.source}</span>
                  <span>{trend.date}</span>
                </SourceInfo>
                <AestheticTags>
                  {trend.aestheticTags.map(tag => (
                    <AestheticTag key={tag}>{tag}</AestheticTag>
                  ))}
                </AestheticTags>
                <InteractionStats>
                  <StatItem>
                    <span>👍</span>
                    {trend.interactions.likes.toLocaleString()}
                  </StatItem>
                  <StatItem>
                    <span>🔄</span>
                    {trend.interactions.shares.toLocaleString()}
                  </StatItem>
                  <StatItem>
                    <span>💾</span>
                    {trend.interactions.saves.toLocaleString()}
                  </StatItem>
                </InteractionStats>
              </TrendInfo>
            </TrendCard>
          ))}
        </AnimatePresence>
      </TrendGrid>
    </Container>
  );
}; 