import { useState } from 'react';
import styled from 'styled-components';

import { animated, useSpring } from '@react-spring/web';

interface CityTrend {
  id: string;
  city: string;
  coordinates: [number, number];
  emoji: string;
  aesthetic: string;
  trendWord: string;
  song: string;
  images: string[];
}

const cityTrends: CityTrend[] = [
  {
    id: '1',
    city: 'Tokyo',
    coordinates: [139.6917, 35.6895],
    emoji: '🌸',
    aesthetic: 'Tech Geisha',
    trendWord: 'Kawaii Cold',
    song: 'Planet Zero (Hyperpop Remix)',
    images: [
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800',
      'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800'
    ]
  },
  {
    id: '2',
    city: 'Paris',
    coordinates: [2.3522, 48.8566],
    emoji: '🥀',
    aesthetic: 'Neo Romantique',
    trendWord: 'L\'amour Noir',
    song: 'Midnight in Montmartre',
    images: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
      'https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?w=800',
      'https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?w=800'
    ]
  },
  {
    id: '3',
    city: 'Seoul',
    coordinates: [126.9780, 37.5665],
    emoji: '✨',
    aesthetic: 'Cyber Hanbok',
    trendWord: 'Digital Dynasty',
    song: 'Neon Dynasty (feat. AI)',
    images: [
      'https://images.unsplash.com/photo-1617653202545-c9e606ff5743?w=800',
      'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=800',
      'https://images.unsplash.com/photo-1622992742943-716fa18c34d1?w=800'
    ]
  }
];

const MapContainer = styled.div`
  width: 100%;
  height: 600px;
  position: relative;
  background: linear-gradient(to bottom, #1a1b4b, #4a4a8f);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=');
    opacity: 0.1;
  }
`;

const CityMarker = styled.div<{ $active: boolean }>`
  width: 16px;
  height: 16px;
  background: #fff;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  
  &::before {
    content: '';
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    border: 2px solid #fff;
    opacity: ${({ $active }) => ($active ? 0.8 : 0.2)};
    transform: scale(${({ $active }) => ($active ? 1.2 : 0.8)});
    transition: all 0.3s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: -16px;
    border-radius: 50%;
    border: 1px solid #fff;
    opacity: ${({ $active }) => ($active ? 0.4 : 0)};
    transform: scale(${({ $active }) => ($active ? 1 : 0.5)});
    transition: all 0.3s ease;
  }
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.8);
    
    &::before {
      opacity: 0.8;
      transform: scale(1.2);
    }
    
    &::after {
      opacity: 0.4;
      transform: scale(1);
    }
  }
`;

const ModalOverlay = styled(animated.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled(animated.div)`
  background: ${({ theme }) => theme.colors?.background?.primary || '#ffffff'};
  border-radius: 24px;
  padding: 2rem;
  width: 90%;
  max-width: 800px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(45deg, rgba(147, 112, 219, 0.1), rgba(255, 182, 193, 0.1));
    z-index: -1;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors?.text?.primary || '#1f2937'};
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const CityHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CityName = styled.h3`
  font-size: 2.5rem;
  font-family: 'Playfair Display', serif;
  margin: 0;
`;

const CityEmoji = styled.span`
  font-size: 2.5rem;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

const TrendImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const TrendDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 2rem;
  background: ${({ theme }) => theme.colors?.background?.secondary || '#f8f9fa'};
  border-radius: 16px;
`;

const TrendDetail = styled.div`
  text-align: center;
  
  h4 {
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem;
    margin: 0 0 0.5rem;
    color: ${({ theme }) => theme.colors?.text?.secondary || '#6b7280'};
  }
  
  p {
    font-size: 1.1rem;
    margin: 0;
    color: ${({ theme }) => theme.colors?.text?.primary || '#1f2937'};
  }
`;

const WorldAestheticsRadar = () => {
  const [selectedCity, setSelectedCity] = useState<CityTrend | null>(null);
  
  const modalSpring = useSpring({
    opacity: selectedCity ? 1 : 0,
    transform: selectedCity ? 'scale(1)' : 'scale(0.9)',
    config: { tension: 300, friction: 20 }
  });

  return (
    <>
      <MapContainer>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <svg
            viewBox="0 0 800 400"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: 0.2
            }}
          >
            <path
              d="M100,200 C200,150 300,250 400,200 C500,150 600,250 700,200"
              stroke="white"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M100,180 C200,130 300,230 400,180 C500,130 600,230 700,180"
              stroke="white"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M100,220 C200,170 300,270 400,220 C500,170 600,270 700,220"
              stroke="white"
              strokeWidth="1"
              fill="none"
            />
          </svg>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            padding: '2rem',
            height: '100%',
            alignItems: 'center'
          }}>
            {cityTrends.map((city) => (
              <div
                key={city.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <CityMarker
                  $active={selectedCity?.id === city.id}
                  onClick={() => setSelectedCity(city)}
                />
                <div style={{ color: 'white', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem' }}>{city.emoji}</div>
                  <div style={{ fontSize: '1rem', opacity: 0.8 }}>{city.city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MapContainer>

      {selectedCity && (
        <ModalOverlay
          style={modalSpring}
          onClick={() => setSelectedCity(null)}
        >
          <Modal onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setSelectedCity(null)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </CloseButton>
            <CityHeader>
              <CityName>{selectedCity.city}</CityName>
              <CityEmoji>{selectedCity.emoji}</CityEmoji>
            </CityHeader>
            <ImageGrid>
              {selectedCity.images.map((image, index) => (
                <TrendImage key={index} src={image} alt={`${selectedCity.city} trend ${index + 1}`} />
              ))}
            </ImageGrid>
            <TrendDetails>
              <TrendDetail>
                <h4>Aesthetic</h4>
                <p>{selectedCity.aesthetic}</p>
              </TrendDetail>
              <TrendDetail>
                <h4>Trend Word</h4>
                <p>{selectedCity.trendWord}</p>
              </TrendDetail>
              <TrendDetail>
                <h4>Song</h4>
                <p>{selectedCity.song}</p>
              </TrendDetail>
            </TrendDetails>
          </Modal>
        </ModalOverlay>
      )}
    </>
  );
};

export default WorldAestheticsRadar;
