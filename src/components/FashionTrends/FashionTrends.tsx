import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface FashionTrend {
  id: string;
  title: string;
  designer: string;
  imageUrl: string;
  outfitGallery: string[];
  style: string;
  popularity: number;
  season: string;
  price: string;
  description: string;
  tags: string[];
  details: {
    materials: string[];
    colors: string[];
    occasions: string[];
  };
  availability: 'In Stock' | 'Pre-Order' | 'Coming Soon';
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const Section = styled.section`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-family: ${({ theme }) => theme.typography.primary};
`;

const FashionCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.5rem;
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.typography.primary};
`;

const Designer = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1rem;
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.typography.secondary};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`;

const Price = styled.div`
  color: ${({ theme }) => theme.colors.primary.slateBlue};
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.background.tertiary};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.8rem;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;

  > span:first-child {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 0.9rem;
    min-width: 80px;
  }
`;

const AvailabilityBadge = styled.div<{ $status: string }>`
  background: ${({ theme, $status }) => 
    $status === 'In Stock' ? theme.colors.primary.sageGreen :
    $status === 'Pre-Order' ? theme.colors.primary.slateBlue :
    theme.colors.primary.dustyRose}20;
  color: ${({ theme, $status }) => 
    $status === 'In Stock' ? theme.colors.primary.sageGreen :
    $status === 'Pre-Order' ? theme.colors.primary.slateBlue :
    theme.colors.primary.dustyRose};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.8rem;
  font-weight: 500;
  display: inline-block;
`;

const StatsCard = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const StatValue = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 600;
`;

// Mock data
const mockTrends: FashionTrend[] = [
  {
    id: '1',
    title: 'Modern Minimalist Set',
    designer: 'Style Studio',
    imageUrl: '/images/fashion-1.jpg.svg',
    outfitGallery: ['/images/fashion-1-1.jpg.svg', '/images/fashion-1-2.jpg.svg'],
    style: 'Minimalist',
    popularity: 95,
    season: 'Spring/Summer 2024',
    price: '$299',
    description: 'A versatile minimalist set perfect for the modern wardrobe. Features clean lines and sustainable materials.',
    tags: ['Minimalist', 'Sustainable', 'Versatile'],
    details: {
      materials: ['Organic Cotton', 'Recycled Polyester'],
      colors: ['White', 'Beige', 'Black'],
      occasions: ['Casual', 'Office', 'Evening']
    },
    availability: 'In Stock'
  },
  {
    id: '2',
    title: 'Urban Explorer Collection',
    designer: 'City Trends',
    imageUrl: '/images/fashion-2.jpg.svg',
    outfitGallery: ['/images/fashion-2-1.jpg.svg', '/images/fashion-2-2.jpg.svg'],
    style: 'Urban',
    popularity: 88,
    season: 'All Season',
    price: '$399',
    description: 'Designed for the urban explorer, this collection combines style with functionality.',
    tags: ['Urban', 'Functional', 'Streetwear'],
    details: {
      materials: ['Technical Fabric', 'Leather'],
      colors: ['Navy', 'Gray', 'Olive'],
      occasions: ['Casual', 'Travel', 'Outdoor']
    },
    availability: 'Pre-Order'
  }
];

export const FashionTrends = () => {
  const [selectedTrend, setSelectedTrend] = useState<FashionTrend | null>(null);

  const totalPopularity = mockTrends.reduce((sum, trend) => sum + trend.popularity, 0);
  const averagePopularity = Math.round(totalPopularity / mockTrends.length);
  const topStyle = mockTrends.reduce((prev, current) => 
    prev.popularity > current.popularity ? prev : current
  ).style;

  return (
    <Container>
      <MainContent>
        <Section>
          <SectionTitle>Trending Styles</SectionTitle>
          <AnimatePresence>
            {mockTrends.map((trend) => (
              <FashionCard
                key={trend.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedTrend(trend)}
              >
                <ImageContainer>
                  <Image src={trend.imageUrl} alt={trend.title} />
                </ImageContainer>
                <Content>
                  <Title>{trend.title}</Title>
                  <Designer>by {trend.designer}</Designer>
                  <Description>{trend.description}</Description>
                  <Price>{trend.price}</Price>
                  <TagsContainer>
                    {trend.tags.map(tag => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </TagsContainer>
                  <DetailsContainer>
                    <DetailRow>
                      <span>Materials:</span>
                      {trend.details.materials.map(material => (
                        <Tag key={material}>{material}</Tag>
                      ))}
                    </DetailRow>
                    <DetailRow>
                      <span>Colors:</span>
                      {trend.details.colors.map(color => (
                        <Tag key={color}>{color}</Tag>
                      ))}
                    </DetailRow>
                    <DetailRow>
                      <span>Perfect for:</span>
                      {trend.details.occasions.map(occasion => (
                        <Tag key={occasion}>{occasion}</Tag>
                      ))}
                    </DetailRow>
                    <DetailRow>
                      <AvailabilityBadge $status={trend.availability}>
                        {trend.availability}
                      </AvailabilityBadge>
                    </DetailRow>
                  </DetailsContainer>
                </Content>
              </FashionCard>
            ))}
          </AnimatePresence>
        </Section>
      </MainContent>

      <Sidebar>
        <Section>
          <SectionTitle>Fashion Stats</SectionTitle>
          <StatsCard>
            <StatRow>
              <StatLabel>Average Popularity</StatLabel>
              <StatValue>{averagePopularity}%</StatValue>
            </StatRow>
            <StatRow>
              <StatLabel>Top Style</StatLabel>
              <StatValue>{topStyle}</StatValue>
            </StatRow>
            <StatRow>
              <StatLabel>Trending Season</StatLabel>
              <StatValue>{mockTrends[0].season}</StatValue>
            </StatRow>
          </StatsCard>
        </Section>

        {selectedTrend && (
          <Section>
            <SectionTitle>Selected Style</SectionTitle>
            <StatsCard>
              <StatRow>
                <StatLabel>Collection</StatLabel>
                <StatValue>{selectedTrend.title}</StatValue>
              </StatRow>
              <StatRow>
                <StatLabel>Designer</StatLabel>
                <StatValue>{selectedTrend.designer}</StatValue>
              </StatRow>
              <StatRow>
                <StatLabel>Style</StatLabel>
                <StatValue>{selectedTrend.style}</StatValue>
              </StatRow>
              <StatRow>
                <StatLabel>Popularity</StatLabel>
                <StatValue>{selectedTrend.popularity}%</StatValue>
              </StatRow>
            </StatsCard>
          </Section>
        )}
      </Sidebar>
    </Container>
  );
}; 