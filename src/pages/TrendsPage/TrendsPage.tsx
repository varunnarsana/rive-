import { useState, useEffect } from 'react';
import styled, { keyframes, DefaultTheme } from 'styled-components';
import Typewriter from '../../components/Typewriter/Typewriter';
import WorldMap from '../../components/WorldMap/WorldMap';
import FoodSection from '../../components/FoodCards/FoodSection';
import TikTokFoodSection from '../../components/TikTokFood/TikTokFoodSection';

interface StyledProps {
  theme: DefaultTheme;
}

interface Playlist {
  id: string;
  title: string;
  mood: string;
  coverUrl: string;
  color: string;
}

interface SlangTerm {
  id: string;
  term: string;
  definition: string;
  pronunciation: string;
  usage?: string;
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
  overflow-x: hidden;
`;

const WorldAestheticsSection = styled.section`
  width: 100%;
  margin: 6rem 0;
`;

const ContentContainer = styled.main<StyledProps>`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 0 1rem;
`;

const fadeIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(10px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const SlangSection = styled.section`
  margin: 6rem 0;
  padding: 4rem 0;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
`;

const LooksSection = styled.section`
  margin: 6rem 0;
  padding: 4rem 0;
  position: relative;
`;

const LooksContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
  position: relative;
  height: 400px;
`;

const LookCard = styled.div`
  position: absolute;
  width: 300px;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.background.primary};
  
  &:nth-child(1) {
    transform: rotate(-5deg) translateY(10px);
    z-index: 3;
    left: 20%;
  }
  
  &:nth-child(2) {
    transform: rotate(2deg) translateY(5px);
    z-index: 2;
    left: 40%;
  }
  
  &:nth-child(3) {
    transform: rotate(-2deg) translateY(0);
    z-index: 1;
    left: 60%;
  }
  
  &:hover {
    transform: scale(1.05) !important;
    z-index: 10 !important;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
    
    &::before {
      opacity: 1;
    }
    
    .look-overlay {
      opacity: 1;
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border: 1px solid rgba(255, 215, 0, 0.7);
    border-radius: 12px;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 2;
  }
`;

const LookImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
  
  ${LookCard}:hover & {
    transform: scale(1.1);
  }
`;

const LookOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 2rem;
  text-align: center;
`;

const LookQuote = styled.p`
  color: white;
  font-size: 1.2rem;
  font-style: italic;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin: 0;
  line-height: 1.6;
  
  &::before, &::after {
    content: '"';
    font-size: 2rem;
    line-height: 0;
    vertical-align: middle;
    opacity: 0.8;
  }
`;

const CulturalPulseSection = styled.section`
  margin: 8rem 0;
  padding: 4rem 0;
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const PulseContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`;

const PulseTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 3rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, #d4af37, #f0e68c);
  }
`;

const TypewriterText = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  min-height: 4rem;
  margin: 2rem 0;
  opacity: 0;
  animation: fadeIn 1s ease-out 0.5s forwards;
  
  @keyframes fadeIn {
    to { opacity: 1; }
  }
`;

const TickerContainer = styled.div`
  margin-top: 4rem;
  padding: 1.5rem 0;
  background: rgba(0, 0, 0, 0.05);
  overflow: hidden;
  position: relative;
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100px;
    z-index: 2;
    pointer-events: none;
  }
  
  &::before {
    left: 0;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.background.secondary}, transparent);
  }
  
  &::after {
    right: 0;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.background.secondary});
  }
`;

const TickerTrack = styled.div`
  display: flex;
  white-space: nowrap;
  will-change: transform;
  animation: scroll 40s linear infinite;
  
  @keyframes scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
`;

const TickerItem = styled.span`
  display: inline-flex;
  align-items: center;
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 2rem;
  white-space: nowrap;
  position: relative;
  
  &::after {
    content: '•';
    margin-left: 2rem;
    color: #d4af37;
  }
  
  &:last-child::after {
    display: none;
  }
`;

const SlangList = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem 2rem;
  max-height: 70vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.primary} ${({ theme }) => theme.colors.background};
  
  /* Custom scrollbar for WebKit browsers */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary}40;
    border-radius: 20px;
  }
`;

const SlangCard = styled.div`
  position: relative;
  opacity: 0;
  animation: ${fadeIn} 0.6s ease-out forwards;
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid ${({ theme }) => theme.colors.border || 'rgba(0,0,0,0.1)'};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const SlangHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

const SlangTerm = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.5px;
`;

const Pronunciation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: 'Inter', sans-serif;
  margin-top: 0.5rem;
  
  button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    border-radius: 50%;
    transition: all 0.2s;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => `${theme.colors.primary}15`};
    }
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.text.secondary};
  margin: 1rem 0;
  opacity: 0.2;
`;

const SlangDefinition = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-style: italic;
`;

const PlaylistsSection = styled.section`
  margin: 6rem 0;
  padding: 4rem 0;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #f8f5ff 0%, #f0f7ff 100%);
  border-radius: 24px;
  padding: 4rem 0;
`;

const PlaylistCarousel = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem 4rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const PlaylistCard = styled.div<{ color: string }>`
  flex: 0 0 280px;
  scroll-snap-align: start;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
    
    img {
      transform: scale(1.05);
    }
    
    &::after {
      opacity: 0.2;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ color }) => color};
    opacity: 0;
    transition: opacity 0.4s ease;
    mix-blend-mode: overlay;
  }
`;

const PlaylistImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
`;

const PlaylistInfo = styled.div`
  padding: 1.8rem;
  position: relative;
  z-index: 1;
  background: white;
`;

const PlaylistTitle = styled.h3`
  font-size: 1.4rem;
  margin: 0 0 0.5rem 0;
  color: #2d3748;
  font-weight: 700;
  font-family: 'Playfair Display', serif;
  letter-spacing: -0.5px;
`;

const PlaylistMood = styled.p`
  font-size: 1rem;
  color: #718096;
  margin: 0;
  font-style: italic;
  line-height: 1.5;
  font-family: 'Inter', sans-serif;
`;

const Waveform = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  overflow: hidden;
  opacity: 0.6;
  z-index: 0;
  
  svg {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 200%;
    height: 100%;
    animation: wave 12s linear infinite;
  }
  
  @keyframes wave {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;
  letter-spacing: -0.5px;
`;

const playlists: Playlist[] = [
  {
    id: '1',
    title: 'Midnight Reverie',
    coverUrl: 'https://source.unsplash.com/800x800/?moon,night,stars',
    mood: 'For candle-lit journaling in silk PJs',
    color: '#4B3B6D'
  },
  {
    id: '2',
    title: 'Urban Solitude',
    coverUrl: 'https://source.unsplash.com/800x800/?rain,city,window',
    mood: 'For walking through rain like a main character',
    color: '#3A506B'
  },
  {
    id: '3',
    title: 'Golden Hour',
    coverUrl: 'https://source.unsplash.com/800x800/?sunset,beach,waves',
    mood: 'When the golden light hits just right',
    color: '#E6AF2E'
  },
  {
    id: '4',
    title: 'Café de Flore',
    coverUrl: 'https://source.unsplash.com/800x800/?paris,cafe,book',
    mood: 'For pretending to be a writer in Paris',
    color: '#A67F8E'
  },
  {
    id: '5',
    title: 'Mountain Mornings',
    coverUrl: 'https://source.unsplash.com/800x800/?mountain,mist,sunrise',
    mood: 'For crisp air and fresh starts',
    color: '#6B8F71'
  }
];

const curatedLooks = [
  {
    id: '1',
    imageUrl: 'https://source.unsplash.com/random/600x800/?fashion,runway,1',
    quote: 'Elegance is refusal — Coco Chanel'
  },
  {
    id: '2',
    imageUrl: 'https://source.unsplash.com/random/600x800/?fashion,runway,2',
    quote: 'Style is a way to say who you are without having to speak — Rachel Zoe'
  },
  {
    id: '3',
    imageUrl: 'https://source.unsplash.com/random/600x800/?fashion,runway,3',
    quote: 'Fashion is the armor to survive the reality of everyday life — Bill Cunningham'
  }
];

const slangTerms: SlangTerm[] = [
  {
    id: '1',
    term: 'Girl Dinner',
    definition: 'A meal that is not a meal, but a collection of snacks that somehow form a complete dining experience',
    pronunciation: '/ɡərl ˈdɪnər/'
  },
  {
    id: '2',
    term: 'Rizz',
    definition: 'Charisma or the ability to attract a romantic or sexual partner',
    pronunciation: '/rɪz/'
  },
  {
    id: '3',
    term: 'Beige Flag',
    definition: 'A trait or behavior that is not quite a red flag, but gives you pause',
    pronunciation: '/beɪʒ flæɡ/'
  }
];

const TrendsPage: React.FC = () => {
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);
  const headlines = [
    'Soft Grunge is back',
    'Espresso is the new matcha',
    'Goth Coquette: the fusion we didn\'t expect'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadlineIndex(prev => (prev + 1) % headlines.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [headlines.length]);

  console.log('TrendsPage rendered');
  console.log('Playlists:', playlists);
  console.log('Slang terms:', slangTerms);
  
  return (
    <Container>
      <ContentContainer>
        <TikTokFoodSection />
        <FoodSection />
        <WorldAestheticsSection>
          <SectionTitle>🌍 World Aesthetics Radar</SectionTitle>
          <WorldMap />
        </WorldAestheticsSection>
        <CulturalPulseSection>
          <PulseContainer>
            <PulseTitle>🗞️ The Cultural Pulse</PulseTitle>
            <TypewriterText>
              <Typewriter 
                text={headlines[currentHeadlineIndex]} 
                speed={50}
                delay={0}
              />
            </TypewriterText>
            
            <TickerContainer>
              <TickerTrack>
                {[...headlines, ...headlines].map((headline, index) => (
                  <TickerItem key={`${headline}-${index}`}>
                    {headline}
                  </TickerItem>
                ))}
              </TickerTrack>
            </TickerContainer>
          </PulseContainer>
        </CulturalPulseSection>
        <LooksSection>
          <SectionTitle>👗 Curated Looks of the Week</SectionTitle>
          <LooksContainer>
            {curatedLooks.map((look) => (
              <LookCard key={look.id}>
                <LookImage 
                  src={look.imageUrl} 
                  alt={`Fashion look ${look.id}`} 
                  loading="lazy"
                />
                <LookOverlay className="look-overlay">
                  <LookQuote>{look.quote}</LookQuote>
                </LookOverlay>
              </LookCard>
            ))}
          </LooksContainer>
        </LooksSection>
        <PlaylistsSection>
          <SectionTitle>🎧 Posh Playlists</SectionTitle>
          <PlaylistCarousel>
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.id} color={playlist.color}>
                <PlaylistImage 
                  src={playlist.coverUrl} 
                  alt={playlist.title} 
                  loading="lazy"
                />
                <PlaylistInfo>
                  <PlaylistTitle>{playlist.title}</PlaylistTitle>
                  <PlaylistMood>{playlist.mood}</PlaylistMood>
                </PlaylistInfo>
              </PlaylistCard>
            ))}
          </PlaylistCarousel>
          <Waveform>
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 60C0 60 123.5 0 309 0C494.5 0 618 60 823 60C1028 60 1132.5 0 1440 0V120H0V60Z" fill="url(#waveform)"/>
              <defs>
                <linearGradient id="waveform" x1="720" y1="0" x2="720" y2="120" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4B3B6D" stopOpacity="0.4"/>
                  <stop offset="1" stopColor="#4B3B6D" stopOpacity="0"/>
                </linearGradient>
              </defs>
            </svg>
          </Waveform>
        </PlaylistsSection>

        <SlangSection>
          <SectionTitle>
            <span role="img" aria-label="deaf-person">🧏‍♀️</span> Slang, Decoded
          </SectionTitle>
          <SlangList>
            {slangTerms.map((term) => (
              <SlangCard key={term.id}>
                <SlangHeader>
                  <div>
                    <SlangTerm>{term.term}</SlangTerm>
                    <Pronunciation>
                      {term.pronunciation}
                      <button 
                        onClick={() => {
                          const utterance = new SpeechSynthesisUtterance(term.term);
                          window.speechSynthesis.speak(utterance);
                        }}
                        aria-label="Listen to pronunciation"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                      </button>
                    </Pronunciation>
                  </div>
                </SlangHeader>
                <Divider />
                <SlangDefinition>{term.definition}</SlangDefinition>
              </SlangCard>
            ))}
          </SlangList>
        </SlangSection>
      </ContentContainer>
    </Container>
  );
};

export default TrendsPage;