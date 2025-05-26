import styled, { keyframes } from 'styled-components';
import { DefaultTheme, css } from 'styled-components';

interface StyledProps {
  theme: DefaultTheme;
}

interface CuratedLook {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface Playlist {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
}

interface SlangTerm {
  id: string;
  term: string;
  definition: string;
  usage: string;
}

interface TrendItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  likes: number;
  views: number;
}

interface TrendCategory {
  id: string;
  name: string;
  items: TrendItem[];
}

const Container = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
  background: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  width: 100%;
`;

const ContentContainer = styled.main<StyledProps>`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 0 1rem;
`;

const TrendGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.5rem;
  perspective: 1000px;
`;

const fadeIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TrendCard = styled.div<StyledProps>`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  opacity: 0;
  animation: ${fadeIn} 0.6s ease-out forwards;
  ${flexCenter}
`;

const TrendImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

const TrendInfo = styled.div`
  padding: 1.8rem;
  background: ${({ theme }) => theme.colors.background};
`;

const TrendTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  line-height: 1.4;
  transition: color 0.3s ease;
`;

const TrendDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const TrendMetrics = styled.div`
  display: flex;
  gap: 1.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 1.2rem;
  padding-top: 1.2rem;
  border: 1px solid rgba(0,0,0,0.1);
`;

const CategoryTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  position: relative;
  display: inline-block;
`;

const SlangSection = styled.section`
  margin: 6rem 0;
  padding: 4rem 0;
  background: ${({ theme }) => theme.colors.background};
`;

const SlangList = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 0 2rem;
`;

const SlangDefinition = styled.p`
  font-size: 1.2rem;
  font-style: italic;
`;

const SlangCard = styled.div`
  position: relative;
  opacity: 0;
  animation: ${fadeIn} 0.6s ease-out forwards;
`;

const SlangTerm = styled.h3`
  font-size: 3rem;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  line-height: 1.2;
`;

const SlangUsage = styled.p`
  font-size: 1.2rem;
  font-style: italic;
`;

const PlaylistsSection = styled.section`
  margin: 6rem 0;
  padding: 4rem 0;
  position: relative;
  overflow: hidden;
`;

const PlaylistCarousel = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
`;

const PlaylistCard = styled.div`
  flex: 0 0 300px;
  scroll-snap-align: start;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
`;

const PlaylistImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const PlaylistInfo = styled.div`
  padding: 1.5rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: 1.1rem;
  line-height: 1.4;
  text-align: center;
`;

const PlaylistTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  line-height: 1.4;
  transition: color 0.3s ease;
`;

const SectionTitle = styled.h2<StyledProps>`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;
  letter-spacing: -0.5px;
`;

const PageContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  overflow-x: hidden;
  position: relative;
`;

const playlists: Playlist[] = [
  {
    id: '1',
    title: 'Tokyo Nights',
    coverUrl: 'https://source.unsplash.com/800x600/?tokyo,night',
    description: 'Neon-lit streets and cyberpunk vibes'
  },
  {
    id: '2',
    title: 'Paris Romance',
    coverUrl: 'https://source.unsplash.com/800x600/?paris,fashion',
    description: 'Elegant fashion and timeless style'
  },
  {
    id: '3',
    title: 'Seoul Wave',
    coverUrl: 'https://source.unsplash.com/800x600/?seoul,street',
    description: 'K-pop culture and street fashion'
  }
];

const slangTerms: SlangTerm[] = [
  {
    id: '1',
    term: 'Aesthetic Core',
    definition: 'A hyper-focused aesthetic that combines multiple style elements into a cohesive look',
    usage: 'Her cottagecore aesthetic core is on point!'
  },
  {
    id: '2',
    term: 'Fits Check',
    definition: 'A social media trend where users share and rate each other\'s outfits',
    usage: 'Time for a fits check! Rate my outfit 1-10!'
  },
  {
    id: '3',
    term: 'Vibe Shift',
    definition: 'A sudden change in cultural mood or aesthetic preferences',
    usage: 'The vibe shift from Y2K to minimalism was unexpected'
  }
];

const curatedLooks: CuratedLook[] = [
  {
    id: '1',
    title: 'Personal Style',
    image: 'https://source.unsplash.com/800x600/?aesthetic,style',
    description: 'Style is a way to say who you are without having to speak'
  },
  {
    id: '2',
    title: 'Modern Elegance',
    image: 'https://source.unsplash.com/800x600/?fashion,elegance',
    description: 'Elegance is not standing out, but being remembered'
  },
  {
    id: '3',
    title: 'Street Style',
    image: 'https://source.unsplash.com/800x600/?street,fashion',
    description: 'Fashion is what you buy, style is what you do with it'
  }
];

const mockTrendingData: TrendCategory[] = [
  {
    id: 'music',
    name: 'Trending Music',
    items: [
      {
        id: 'm1',
        title: 'Lo-fi Beats Revolution',
        description: 'The rise of calming study music among Gen Z',
        imageUrl: 'https://via.placeholder.com/300x180?text=Lo-fi+Music',
        likes: 15000,
        views: 50000
      },
      {
        id: 'm2',
        title: 'K-pop Wave 2025',
        description: 'New generation of K-pop taking over global charts',
        imageUrl: 'https://via.placeholder.com/300x180?text=K-pop',
        likes: 25000,
        views: 75000
      }
    ]
  },
  {
    id: 'fashion',
    name: 'Trending Fashion',
    items: [
      {
        id: 'f1',
        title: 'Digital Fashion NFTs',
        description: 'Virtual clothing becoming the new status symbol',
        imageUrl: 'https://via.placeholder.com/300x180?text=Digital+Fashion',
        likes: 12000,
        views: 45000
      },
      {
        id: 'f2',
        title: 'Sustainable Streetwear',
        description: 'Eco-friendly fashion meets urban style',
        imageUrl: 'https://via.placeholder.com/300x180?text=Sustainable+Fashion',
        likes: 18000,
        views: 60000
      }
    ]
  },
  {
    id: 'artist',
    name: 'Trending Artists',
    items: [
      {
        id: 'a1',
        title: 'AI Collaborations',
        description: 'Artists creating with artificial intelligence',
        imageUrl: 'https://via.placeholder.com/300x180?text=AI+Art',
        likes: 20000,
        views: 65000
      },
      {
        id: 'a2',
        title: 'Virtual Reality Galleries',
        description: 'Immersive art experiences in the metaverse',
        imageUrl: 'https://via.placeholder.com/300x180?text=VR+Art',
        likes: 16000,
        views: 55000
      }
    ]
  },
  {
    id: 'slang',
    name: 'Trending Slang',
    items: [
      {
        id: 's1',
        title: 'Tech-Inspired Lingo',
        description: 'New vocabulary from digital culture',
        imageUrl: 'https://via.placeholder.com/300x180?text=Tech+Slang',
        likes: 10000,
        views: 40000
      },
      {
        id: 's2',
        title: 'Global Internet Speech',
        description: 'Cross-cultural communication trends',
        imageUrl: 'https://via.placeholder.com/300x180?text=Internet+Slang',
        likes: 14000,
        views: 48000
      }
    ]
  },
  {
    id: 'city',
    name: 'Trending Cities',
    items: [
      {
        id: 'c1',
        title: 'Smart Cities 2025',
        description: 'Tech-integrated urban spaces',
        imageUrl: 'https://via.placeholder.com/300x180?text=Smart+Cities',
        likes: 22000,
        views: 70000
      },
      {
        id: 'c2',
        title: 'Digital Nomad Hubs',
        description: 'Cities embracing remote work culture',
        imageUrl: 'https://via.placeholder.com/300x180?text=Digital+Nomad',
        likes: 19000,
        views: 58000
      }
    ]
  },
  {
    id: 'food',
    name: 'Trending Food',
    items: [
      {
        id: 'fd1',
        title: 'Lab-Grown Cuisine',
        description: 'Sustainable food technology innovations',
        imageUrl: 'https://via.placeholder.com/300x180?text=Future+Food',
        likes: 17000,
        views: 52000
      },
      {
        id: 'fd2',
        title: 'Virtual Restaurant Concepts',
        description: 'Digital-first dining experiences',
        imageUrl: 'https://via.placeholder.com/300x180?text=Virtual+Food',
        likes: 13000,
        views: 44000
      }
    ]
  }
];

const TrendsPage: React.FC = () => {
  return (
    <Container>
      <ContentContainer>
        <PlaylistsSection>
          <SectionTitle>Trending Playlists</SectionTitle>
          <PlaylistCarousel>
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.id}>
                <PlaylistImage src={playlist.coverUrl} alt={playlist.title} />
                <PlaylistInfo>
                  <PlaylistTitle>{playlist.title}</PlaylistTitle>
                  <PlaylistInfo>{playlist.description}</PlaylistInfo>
                </PlaylistInfo>
              </PlaylistCard>
            ))}
          </PlaylistCarousel>
        </PlaylistsSection>

        <SlangSection>
          <SectionTitle>Trending Slang</SectionTitle>
          <SlangList>
            {slangTerms.map((term) => (
              <SlangCard key={term.id}>
                <SlangTerm>{term.term}</SlangTerm>
                <SlangDefinition>{term.definition}</SlangDefinition>
                <SlangUsage>Usage: {term.usage}</SlangUsage>
              </SlangCard>
            ))}
          </SlangList>
        </SlangSection>

        <section>
          <SectionTitle>Curated Looks</SectionTitle>
          <div>
            {curatedLooks.map((look) => (
              <div key={look.id}>
                <img src={look.image} alt={look.title} />
                <div>
                  <h3>{look.title}</h3>
                  <p>{look.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {mockTrendingData.map((category) => (
          <div key={category.id}>
            <CategoryTitle>{category.name}</CategoryTitle>
            <TrendGrid>
              {category.items.map((item) => (
                <TrendCard key={item.id}>
                  <TrendImage src={item.imageUrl} alt={item.title} />
                  <TrendInfo>
                    <TrendTitle>{item.title}</TrendTitle>
                    <TrendDescription>{item.description}</TrendDescription>
                    <TrendMetrics>
                      <span>👁️ {item.views.toLocaleString()} views</span>
                      <span>❤️ {item.likes.toLocaleString()} likes</span>
                    </TrendMetrics>
                  </TrendInfo>
                </TrendCard>
              ))}
            </TrendGrid>
          </div>
        ))}
      </ContentContainer>
    </Container>
  );
};

export default TrendsPage;