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

interface AestheticLook {
  id: string;
  title: string;
  image: string;
  colors: string[];
  keywords: string[];
  description: string;
}

// Define theme interface
interface Theme {
  spacing: {
    xl: string;
    lg: string;
    md: string;
    sm: string;
    [key: string]: string;
  };
  colors: {
    primary: string;
    secondary: string;
    background: {
      primary: string;
      secondary: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
    [key: string]: any;
  };
  typography: {
    primary: string;
    secondary: string;
    [key: string]: string;
  };
  borderRadius: {
    lg: string;
    md: string;
    sm: string;
    [key: string]: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    [key: string]: string;
  };
  [key: string]: any;
}

const defaultTheme: Theme = {
  spacing: {
    xl: '2rem',
    lg: '1.5rem',
    md: '1rem',
    sm: '0.5rem',
  },
  colors: {
    primary: '#8E6B9E',
    secondary: '#4A3858',
    background: {
      primary: '#FFFFFF',
      secondary: '#F8F9FA',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#666666',
    },
  },
  typography: {
    primary: '"Playfair Display", serif',
    secondary: '"Roboto", sans-serif',
  },
  borderRadius: {
    lg: '16px',
    md: '12px',
    sm: '8px',
  },
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 12px rgba(0, 0, 0, 0.15)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.2)',
  },
};

// Create a styled component with simplified theme handling
const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${defaultTheme.spacing.xl};
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
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

const AestheticGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

interface AestheticCardProps {
  image: string;
}

const AestheticCard = styled.div<AestheticCardProps>`
  position: relative;
  height: 500px;
  border-radius: 16px;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    
    .glass-overlay {
      opacity: 1;
      background: rgba(0, 0, 0, 0.7);
    }
    
    .content {
      transform: translateY(0);
      opacity: 1;
    }
  }
  overflow: hidden;
  background: url(${(props: AestheticCardProps) => props.image}) center/cover no-repeat;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    
    .glass-overlay {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
    }
    
    .content {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const GlassOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const AestheticContent = styled.div`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 12px;
  transform: translateY(20px);
  opacity: 0.9;
  transition: all 0.3s ease;
`;

const AestheticTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 1rem;
  color: #1a1a1a;
`;

const ColorPalette = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const ColorSwatch = styled.div<{ color: string }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${props => props.color};
  border: 2px solid white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Keywords = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const Keyword = styled.span`
  background: rgba(0, 0, 0, 0.05);
  color: #333;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
`;

const CopyButton = styled.button`
  background: #1a1a1a;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: #333;
    transform: translateY(-2px);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
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

const aestheticLooks: AestheticLook[] = [
  {
    id: '1',
    title: 'Dark Academia',
    image: 'https://source.unsplash.com/random/600x800/?dark-academia-fashion',
    colors: ['#3E2723', '#5D4037', '#8D6E63', '#BCAAA4', '#D7CCC8'],
    keywords: ['Tweed blazers', 'Oxford shirts', 'Pleated skirts', 'Leather satchels', 'Wingtip shoes'],
    description: 'Scholarly elegance meets vintage charm with structured silhouettes and rich textures.'
  },
  {
    id: '2',
    title: 'Y2K Revival',
    image: 'https://source.unsplash.com/random/600x800/?y2k-fashion',
    colors: ['#FF4081', '#00BCD4', '#FFEB3B', '#9C27B0', '#E91E63'],
    keywords: ['Low-rise jeans', 'Crop tops', 'Frosted lips', 'Chunky sneakers', 'Logo mania'],
    description: 'Early 2000s nostalgia with a futuristic twist, embracing bold colors and playful accessories.'
  },
  {
    id: '3',
    title: 'Clean Girl',
    image: 'https://source.unsplash.com/random/600x800/?minimal-fashion',
    colors: ['#FFFFFF', '#F5F5F5', '#E0E0E0', '#9E9E9E', '#212121'],
    keywords: ['White tank tops', 'Straight-leg jeans', 'Gold hoops', 'Slicked-back buns', 'Minimal makeup'],
    description: 'Effortless elegance through neutral palettes and timeless wardrobe staples.'
  },
  {
    id: '4',
    title: 'Softcore',
    image: 'https://source.unsplash.com/random/600x800/?pastel-fashion',
    colors: ['#F8BBD0', '#B3E5FC', '#C8E6C9', '#FFF9C4', '#D1C4E9'],
    keywords: ['Pastel knits', 'Flowy dresses', 'Cardigans', 'Mary janes', 'Pearl accessories'],
    description: 'Dreamy aesthetics with soft textures and romantic silhouettes for a delicate look.'
  },
  {
    id: '5',
    title: 'Cyber Fairy',
    image: 'https://source.unsplash.com/random/600x800/?cyber-fashion',
    colors: ['#00E5FF', '#FF00FF', '#00FFB3', '#9D00FF', '#FFD600'],
    keywords: ['Iridescent fabrics', 'Platform boots', 'Futuristic sunglasses', 'Holographic details', 'Techwear'],
    description: 'A futuristic blend of digital aesthetics and ethereal fairy elements.'
  },
  {
    id: '6',
    title: 'Indie Sleaze',
    image: 'https://source.unsplash.com/random/600x800/?indie-fashion',
    colors: ['#000000', '#FF0000', '#FFFFFF', '#808080', '#FFFF00'],
    keywords: ['Band tees', 'Leather jackets', 'Skinny jeans', 'Converse', 'Vintage sunglasses'],
    description: 'Raw, edgy style inspired by the 2010s indie music scene and underground culture.'
  }
];

export const FashionTrends = () => {
  const [selectedTrend, setSelectedTrend] = useState<FashionTrend | null>(null);
  const [copiedLook, setCopiedLook] = useState<string | null>(null);

  const totalPopularity = mockTrends.reduce((sum, trend) => sum + trend.popularity, 0);
  const averagePopularity = Math.round(totalPopularity / mockTrends.length);
  const topStyle = mockTrends.reduce((prev, current) => 
    prev.popularity > current.popularity ? prev : current
  ).style;

  const handleCopyFit = (title: string) => {
    const look = aestheticLooks.find(look => look.title === title);
    if (look) {
      const textToCopy = `Outfit Inspiration: ${look.title}\n\nKeywords: ${look.keywords.join(', ')}\n\n${look.description}`;
      navigator.clipboard.writeText(textToCopy);
      setCopiedLook(title);
      setTimeout(() => setCopiedLook(null), 2000);
    }
  };

  return (
    <Container>
      <MainContent>
        <Section>
          <SectionTitle>👗 TRENDING FASHION — The Aesthetic Vogueboard</SectionTitle>
          <p style={{ textAlign: 'center', fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
            "See what's trending — from sidewalk to catwalk, filtered by aesthetic and fueled by the Gen-Z fashion engine."
          </p>
          
          <div style={{ marginBottom: '4rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>Dressed by Vibe</h3>
            <AestheticGrid>
              {aestheticLooks.map((look) => (
                <AestheticCard 
                  key={look.id} 
                  image={look.image}
                  onClick={() => handleCopyFit(look.title)}
                >
                  <GlassOverlay className="glass-overlay">
                    <AestheticContent className="content">
                      <AestheticTitle>{look.title}</AestheticTitle>
                      <p style={{ color: '#444', marginBottom: '1rem' }}>{look.description}</p>
                      <ColorPalette>
                        {look.colors.map((color, idx) => (
                          <ColorSwatch key={idx} color={color} />
                        ))}
                      </ColorPalette>
                      <Keywords>
                        {look.keywords.map((keyword, idx) => (
                          <Keyword key={idx}>{keyword}</Keyword>
                        ))}
                      </Keywords>
                      <CopyButton>
                        {copiedLook === look.title ? 'Copied! ✅' : 'Copy this fit'}
                      </CopyButton>
                    </AestheticContent>
                  </GlassOverlay>
                </AestheticCard>
              ))}
            </AestheticGrid>
          </div>
        </Section>

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