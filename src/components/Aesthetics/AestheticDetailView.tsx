import styled from 'styled-components';
import { motion } from 'framer-motion';

interface AestheticDetailProps {
  aesthetic: {
    name: string;
    description: string;
    personality: {
      traits: string[];
      description: string;
    };
    music: {
      songs: Array<{
        title: string;
        artist: string;
        imageUrl: string;
      }>;
      playlists: string[];
      artists: Array<{
        name: string;
        imageUrl: string;
        description: string;
      }>;
    };
    fashion: {
      outfits: Array<{
        imageUrl: string;
        description: string;
      }>;
      styles: string[];
      keyPieces: string[];
    };
    decor: {
      elements: string[];
      inspiration: Array<{
        imageUrl: string;
        description: string;
      }>;
      tips: string[];
    };
    colorPalette: Array<{
      color: string;
      name: string;
      hex: string;
    }>;
    artists: Array<{
      name: string;
      type: string;
      imageUrl: string;
      description: string;
    }>;
  };
  onClose: () => void;
}

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Container = styled(motion.div)`
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 1200px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  position: relative;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ImageCard = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const CardTitle = styled.h4`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ColorSwatch = styled.div<{ $color: string }>`
  width: 100%;
  padding-bottom: 100%;
  background-color: ${props => props.$color};
  border-radius: 8px;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ColorLabel = styled.div`
  text-align: center;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #666;
`;

const PersonalityList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const PersonalityItem = styled.li`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
  text-align: center;
`;

export const AestheticDetailView = ({ aesthetic, onClose }: AestheticDetailProps) => {
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
        onClick={e => e.stopPropagation()}
      >
        <CloseButton onClick={onClose}>×</CloseButton>
        
        <Title>{aesthetic.name}</Title>
        <Description>{aesthetic.description}</Description>

        <Section>
          <SectionTitle>Personality & Vibe</SectionTitle>
          <Description>{aesthetic.personality.description}</Description>
          <PersonalityList>
            {aesthetic.personality.traits.map((trait, index) => (
              <PersonalityItem key={index}>{trait}</PersonalityItem>
            ))}
          </PersonalityList>
        </Section>

        <Section>
          <SectionTitle>Music</SectionTitle>
          <Grid>
            {aesthetic.music.songs.map((song, index) => (
              <ImageCard key={index}>
                <img src={song.imageUrl} alt={song.title} />
                <CardContent>
                  <CardTitle>{song.title}</CardTitle>
                  <CardDescription>{song.artist}</CardDescription>
                </CardContent>
              </ImageCard>
            ))}
          </Grid>
        </Section>

        <Section>
          <SectionTitle>Fashion</SectionTitle>
          <Grid>
            {aesthetic.fashion.outfits.map((outfit, index) => (
              <ImageCard key={index}>
                <img src={outfit.imageUrl} alt={outfit.description} />
                <CardContent>
                  <CardDescription>{outfit.description}</CardDescription>
                </CardContent>
              </ImageCard>
            ))}
          </Grid>
        </Section>

        <Section>
          <SectionTitle>Room Decor</SectionTitle>
          <Grid>
            {aesthetic.decor.inspiration.map((item, index) => (
              <ImageCard key={index}>
                <img src={item.imageUrl} alt={item.description} />
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </ImageCard>
            ))}
          </Grid>
        </Section>

        <Section>
          <SectionTitle>Color Palette</SectionTitle>
          <ColorGrid>
            {aesthetic.colorPalette.map((color, index) => (
              <div key={index}>
                <ColorSwatch $color={color.hex} />
                <ColorLabel>{color.name}</ColorLabel>
              </div>
            ))}
          </ColorGrid>
        </Section>

        <Section>
          <SectionTitle>Artists & Influencers</SectionTitle>
          <Grid>
            {aesthetic.artists.map((artist, index) => (
              <ImageCard key={index}>
                <img src={artist.imageUrl} alt={artist.name} />
                <CardContent>
                  <CardTitle>{artist.name}</CardTitle>
                  <CardDescription>{artist.type}</CardDescription>
                  <CardDescription>{artist.description}</CardDescription>
                </CardContent>
              </ImageCard>
            ))}
          </Grid>
        </Section>
      </Container>
    </Overlay>
  );
}; 