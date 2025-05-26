import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface MusicTrendCardProps {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  genre: string;
  plays: number;
  duration: string;
  onPlay: () => void;
}

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid ${({ theme }) => theme.colors.background.tertiary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  &:hover {
    transform: translateX(8px);
    background: ${({ theme }) => theme.colors.background.secondary};
    border-color: ${({ theme }) => theme.colors.primary.slateBlue};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: ${({ theme }) => theme.colors.background.tertiary};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;

  &.loaded {
    opacity: 1;
  }
`;

const PlayOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const PlayIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary.slateBlue};
`;

const Info = styled.div`
  flex: 1;
  min-width: 0;
`;

const Title = styled.h4`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Artist = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: 4px;
  flex-wrap: wrap;
`;

const StatItem = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.light};
  display: flex;
  align-items: center;
  gap: 4px;
  background: ${({ theme }) => theme.colors.background.tertiary};
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const Genre = styled.span`
  font-size: 0.75rem;
  padding: 2px 8px;
  background: ${({ theme }) => theme.colors.primary.slateBlue}20;
  color: ${({ theme }) => theme.colors.primary.slateBlue};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: 500;
`;

export const MusicTrendCard = ({
  title,
  artist,
  imageUrl,
  genre,
  plays,
  duration,
  onPlay
}: MusicTrendCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    console.log('MusicTrendCard rendered:', {
      title,
      artist,
      imageUrl,
      imageLoaded,
      imageError
    });
  }, [title, artist, imageUrl, imageLoaded, imageError]);

  const handleImageLoad = () => {
    console.log('Image loaded successfully:', imageUrl);
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('Image failed to load:', imageUrl);
    setImageError(true);
    setImageLoaded(false);
    e.currentTarget.src = '/images/placeholder.svg';
  };

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onPlay}
      whileHover={{ scale: 1.02 }}
    >
      <ImageContainer>
        <Image 
          src={imageUrl} 
          alt={title} 
          onError={handleImageError}
          onLoad={handleImageLoad}
          className={imageLoaded ? 'loaded' : ''}
        />
        <PlayOverlay
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <PlayIcon>▶</PlayIcon>
        </PlayOverlay>
      </ImageContainer>
      
      <Info>
        <Title>{title}</Title>
        <Artist>{artist}</Artist>
        <Stats>
          <Genre>{genre}</Genre>
          <StatItem>👥 {plays.toLocaleString()}</StatItem>
          <StatItem>⏱ {duration}</StatItem>
        </Stats>
      </Info>
    </Card>
  );
}; 