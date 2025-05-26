import styled from 'styled-components';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MusicTrendCard } from './MusicTrendCard';

interface MusicTrend {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  genre: string;
  plays: number;
  duration: string;
  releaseDate: string;
  bpm: number;
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

const Controls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.background.tertiary};
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.9rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.slateBlue};
  }
`;

const SearchInput = styled.input`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.background.tertiary};
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.9rem;
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.slateBlue};
  }
`;

const TrendList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
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
const mockTrends: MusicTrend[] = [
  {
    id: '1',
    title: 'Dreamy Nights',
    artist: 'Luna Wave',
    imageUrl: '/images/music-1.jpg.svg',
    genre: 'Lo-fi',
    plays: 1250000,
    duration: '3:45',
    releaseDate: '2024-02-15',
    bpm: 85
  },
  {
    id: '2',
    title: 'Cyber Pulse',
    artist: 'Digital Dreams',
    imageUrl: '/images/music-2.jpg.svg',
    genre: 'Synthwave',
    plays: 890000,
    duration: '4:20',
    releaseDate: '2024-02-10',
    bpm: 120
  },
  {
    id: '3',
    title: 'Urban Echo',
    artist: 'City Lights',
    imageUrl: '/images/music-3.jpg.svg',
    genre: 'Alternative',
    plays: 750000,
    duration: '3:30',
    releaseDate: '2024-02-01',
    bpm: 95
  }
];

export const MusicTrends = () => {
  const [sortBy, setSortBy] = useState<'plays' | 'date' | 'bpm'>('plays');
  const [filterGenre, setFilterGenre] = useState('all');
  const [search, setSearch] = useState('');
  const [playing, setPlaying] = useState<MusicTrend | null>(null);

  const handlePlay = (trend: MusicTrend) => {
    setPlaying(trend);
  };

  const filteredAndSortedTrends = mockTrends
    .filter(trend => {
      if (filterGenre !== 'all' && trend.genre !== filterGenre) return false;
      if (search && !trend.title.toLowerCase().includes(search.toLowerCase()) &&
          !trend.artist.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'plays':
          return b.plays - a.plays;
        case 'date':
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        case 'bpm':
          return b.bpm - a.bpm;
        default:
          return 0;
      }
    });

  const totalPlays = filteredAndSortedTrends.reduce((sum, trend) => sum + trend.plays, 0);
  const averageBPM = Math.round(
    filteredAndSortedTrends.reduce((sum, trend) => sum + trend.bpm, 0) / 
    filteredAndSortedTrends.length
  );

  return (
    <Container>
      <MainContent>
        <Section>
          <SectionTitle>Trending Tracks</SectionTitle>
          <Controls>
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
              <option value="plays">Most Played</option>
              <option value="date">Latest</option>
              <option value="bpm">BPM</option>
            </Select>
            <Select value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)}>
              <option value="all">All Genres</option>
              <option value="Lo-fi">Lo-fi</option>
              <option value="Synthwave">Synthwave</option>
              <option value="Alternative">Alternative</option>
            </Select>
            <SearchInput
              type="text"
              placeholder="Search songs or artists..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Controls>
          <TrendList>
            <AnimatePresence>
              {filteredAndSortedTrends.map((trend) => (
                <motion.div
                  key={trend.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <MusicTrendCard
                    {...trend}
                    onPlay={() => handlePlay(trend)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </TrendList>
        </Section>
      </MainContent>

      <Sidebar>
        <Section>
          <SectionTitle>Music Stats</SectionTitle>
          <StatsCard>
            <StatRow>
              <StatLabel>Total Plays</StatLabel>
              <StatValue>{totalPlays.toLocaleString()}</StatValue>
            </StatRow>
            <StatRow>
              <StatLabel>Average BPM</StatLabel>
              <StatValue>{averageBPM}</StatValue>
            </StatRow>
            <StatRow>
              <StatLabel>Trending Genres</StatLabel>
              <StatValue>{filteredAndSortedTrends[0]?.genre || 'N/A'}</StatValue>
            </StatRow>
          </StatsCard>
        </Section>

        {playing && (
          <Section>
            <SectionTitle>Now Playing</SectionTitle>
            <StatsCard>
              <StatRow>
                <StatLabel>Track</StatLabel>
                <StatValue>{playing.title}</StatValue>
              </StatRow>
              <StatRow>
                <StatLabel>Artist</StatLabel>
                <StatValue>{playing.artist}</StatValue>
              </StatRow>
              <StatRow>
                <StatLabel>Genre</StatLabel>
                <StatValue>{playing.genre}</StatValue>
              </StatRow>
              <StatRow>
                <StatLabel>BPM</StatLabel>
                <StatValue>{playing.bpm}</StatValue>
              </StatRow>
            </StatsCard>
          </Section>
        )}
      </Sidebar>
    </Container>
  );
}; 