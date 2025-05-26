import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TrendItem } from '../TrendingList/types';

interface TrendDetailProps {
  trend: TrendItem;
  onClose: () => void;
}

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Container = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1;
  
  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
`;

const HeaderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeaderOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.spacing.xl};
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography.primary};
  font-size: 2rem;
  margin: 0;
`;

const MetaInfo = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Section = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.typography.body};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0;
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const GalleryImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: scale(1.05);
  }
`;

const RelatedTrends = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  overflow-x: auto;
  padding-bottom: ${({ theme }) => theme.spacing.md};

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.tertiary};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary.slateBlue};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }
`;

const RelatedTrendCard = styled.div`
  flex: 0 0 200px;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const StatItem = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const StatValue = styled.div`
  font-family: ${({ theme }) => theme.typography.primary};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary.slateBlue};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const TrendDetail = ({ trend, onClose }: TrendDetailProps) => {
  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <Container
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={onClose}>×</CloseButton>
        
        <Header>
          <HeaderImage src={trend.imageUrl} alt={trend.title} />
          <HeaderOverlay>
            <Title>{trend.title}</Title>
            <MetaInfo>
              <span>{trend.category}</span>
              <span>•</span>
              <span>{trend.date}</span>
            </MetaInfo>
          </HeaderOverlay>
        </Header>

        <Content>
          <Section>
            <SectionTitle>About this Trend</SectionTitle>
            <Description>{trend.description}</Description>
            <Stats>
              <StatItem>
                <StatValue>{trend.growth}%</StatValue>
                <StatLabel>Growth</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{trend.source}</StatValue>
                <StatLabel>Source</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{trend.interactions.likes}</StatValue>
                <StatLabel>Likes</StatLabel>
              </StatItem>
            </Stats>
          </Section>

          {trend.imageUrl && (
            <Section>
              <SectionTitle>Gallery</SectionTitle>
              <Gallery>
                <GalleryImage src={trend.imageUrl} alt={trend.title} />
                {/* Add more images here */}
              </Gallery>
            </Section>
          )}

          <Section>
            <SectionTitle>Related Trends</SectionTitle>
            <RelatedTrends>
              {/* Add related trends here */}
              <RelatedTrendCard>
                <h4>Similar Trend 1</h4>
                <p>Brief description</p>
              </RelatedTrendCard>
              <RelatedTrendCard>
                <h4>Similar Trend 2</h4>
                <p>Brief description</p>
              </RelatedTrendCard>
            </RelatedTrends>
          </Section>
        </Content>
      </Container>
    </Overlay>
  );
}; 