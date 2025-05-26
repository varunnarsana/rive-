import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
  Graticule
} from 'react-simple-maps';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 600px;
  margin: 2rem 0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background: #f8f9fa;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  color: #666;
  
  &:hover {
    color: #000;
  }
`;

const CityHeader = styled.div`
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #eee;
`;

const CityName = styled.h3`
  font-size: 2rem;
  margin: 0 0 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CityAesthetic = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin: 0;
  font-weight: 500;
`;

const CityContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

const CityImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const CityInfo = styled.div`
  h4 {
    margin: 1.5rem 0 0.5rem;
    font-size: 1.1rem;
    color: #333;
  }
  
  p {
    margin: 0 0 1rem;
    color: #666;
    line-height: 1.6;
  }
`;

const TrendBadge = styled.span`
  display: inline-block;
  background: #f0f0f0;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

interface City {
  id: string;
  name: string;
  coordinates: [number, number];
  aesthetic: string;
  trendWord: string;
  song: string;
  images: string[];
  color: string;
  quote: string;
}

const cities: City[] = [
  {
    id: 'tokyo',
    name: 'Tokyo',
    coordinates: [139.6917, 35.6895],
    aesthetic: 'Tech Geisha',
    trendWord: 'Kawaii Cold',
    song: 'Planet Zero (Hyperpop Remix)',
    images: [
      'https://source.unsplash.com/random/800x600/?japan,street',
      'https://source.unsplash.com/random/800x600/?tokyo,night',
      'https://source.unsplash.com/random/800x600/?japanese,fashion'
    ],
    color: '#FF6B6B',
    quote: 'Where ancient tradition meets cyberpunk future.'
  },
  {
    id: 'seoul',
    name: 'Seoul',
    coordinates: [126.9780, 37.5665],
    aesthetic: 'Digital Hanbok',
    trendWord: 'Hallyu Wave 2.0',
    song: 'Next Level (City Pop Remix)',
    images: [
      'https://source.unsplash.com/random/800x600/?korea,street',
      'https://source.unsplash.com/random/800x600/?seoul,night'
    ],
    color: '#4ECDC4',
    quote: 'The future is already here, just not evenly distributed.'
  },
  {
    id: 'paris',
    name: 'Paris',
    coordinates: [2.3522, 48.8566],
    aesthetic: 'Nouveau Rétro',
    trendWord: 'Chic Démodé',
    song: 'La Vie En Rose (Synthwave Version)',
    images: [
      'https://source.unsplash.com/random/800x600/?paris,fashion',
      'https://source.unsplash.com/random/800x600/?french,style'
    ],
    color: '#FFD166',
    quote: 'Elegance is refusal.'
  },
  {
    id: 'newyork',
    name: 'New York',
    coordinates: [-74.0060, 40.7128],
    aesthetic: 'Urban Grunge',
    trendWord: 'Street Luxe',
    song: 'Empire State of Mind (Lo-Fi Remix)',
    images: [
      'https://source.unsplash.com/random/800x600/?newyork,street',
      'https://source.unsplash.com/random/800x600/?nyc,fashion'
    ],
    color: '#6A0572',
    quote: 'The city that never sleeps, always creates.'
  },
  {
    id: 'lagos',
    name: 'Lagos',
    coordinates: [3.3792, 6.5244],
    aesthetic: 'Afro-Futurism',
    trendWord: 'Naija Vibe',
    song: 'Essence (Amapiano Remix)',
    images: [
      'https://source.unsplash.com/random/800x600/?lagos,africa',
      'https://source.unsplash.com/random/800x600/?nigerian,fashion'
    ],
    color: '#FF9F1C',
    quote: 'The future is African.'
  }
];

const WorldMap: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  return (
    <>
      <MapContainer>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 150,
            center: [20, 20],
          }}
        >
          <ZoomableGroup center={[20, 20]} zoom={1} minZoom={0.8} maxZoom={5}>
            <Graticule stroke="#E2E8F0" strokeWidth={0.5} />
            <Geographies
              geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
            >
              {({ geographies }) =>
                geographies.map((geo) => {
                  const isHighlighted = cities.some(
                    city => city.name.toLowerCase() === geo.properties.name?.toLowerCase()
                  );
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={isHighlighted ? '#F1F5F9' : '#F8FAFC'}
                      stroke={isHighlighted ? '#CBD5E1' : '#E2E8F0'}
                      strokeWidth={0.5}
                      style={{
                        default: {
                          fill: isHighlighted ? '#F1F5F9' : '#F8FAFC',
                          outline: 'none',
                        },
                        hover: {
                          fill: isHighlighted ? '#E2E8F0' : '#F1F5F9',
                          outline: 'none',
                        },
                        pressed: {
                          fill: isHighlighted ? '#E2E8F0' : '#F1F5F9',
                          outline: 'none',
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
            
            {cities.map((city) => (
              <Marker key={city.id} coordinates={city.coordinates}>
                <g onClick={() => setSelectedCity(city)}>
                  <circle
                    r={city === selectedCity ? 12 : 8}
                    fill={city.color}
                    stroke="#fff"
                    strokeWidth={2}
                    style={{
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      filter: city === selectedCity ? `drop-shadow(0 0 8px ${city.color})` : 'none'
                    }}
                  />
                  {city === selectedCity && (
                    <text
                      textAnchor="middle"
                      y={-20}
                      style={{
                        fill: '#1E293B',
                        fontSize: '12px',
                        fontWeight: 600,
                        fontFamily: 'sans-serif',
                        pointerEvents: 'none',
                        textShadow: '0 1px 2px rgba(255,255,255,0.8)'
                      }}
                    >
                      {city.name}
                    </text>
                  )}
                </g>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </MapContainer>

      {selectedCity && (
        <ModalOverlay onClick={() => setSelectedCity(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setSelectedCity(null)}>×</CloseButton>
            <CityHeader>
              <CityName>
                {selectedCity.name} {selectedCity.name === 'Tokyo' ? '🌸' : ''}
                {selectedCity.name === 'Seoul' ? '💫' : ''}
                {selectedCity.name === 'Paris' ? '🗼' : ''}
                {selectedCity.name === 'New York' ? '🗽' : ''}
                {selectedCity.name === 'Lagos' ? '🌍' : ''}
              </CityName>
              <CityAesthetic>{selectedCity.aesthetic}</CityAesthetic>
            </CityHeader>
            <CityContent>
              <ImageGrid>
                {selectedCity.images.map((image, index) => (
                  <CityImage 
                    key={index} 
                    src={image} 
                    alt={`${selectedCity.name} ${index + 1}`} 
                  />
                ))}
              </ImageGrid>
              <CityInfo>
                <p>{selectedCity.quote}</p>
                
                <h4>Trending Now</h4>
                <div>
                  <TrendBadge>#{selectedCity.trendWord}</TrendBadge>
                </div>
                
                <h4>Soundtrack</h4>
                <p>{selectedCity.song}</p>
                
                <h4>About {selectedCity.name}'s Aesthetic</h4>
                <p>
                  {selectedCity.aesthetic} blends {selectedCity.name}'s unique cultural elements 
                  with modern influences, creating a distinctive style that's both timeless and 
                  forward-thinking.
                </p>
              </CityInfo>
            </CityContent>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default WorldMap;
