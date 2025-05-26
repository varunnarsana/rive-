import styled from 'styled-components';
import { Card } from '../Card/Card';
import { motion } from 'framer-motion';

interface TrendCardProps {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  popularity: number;
}

const TrendContainer = styled(Card)`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${({ theme }) => theme.spacing.lg};
  overflow: hidden;
  min-height: 200px;
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const TrendImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Category = styled.span`
  color: ${({ theme }) => theme.colors.primary.sageGreen};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.95rem;
  margin: 0;
`;

const PopularityBar = styled(motion.div)<{ $popularity: number }>`
  height: 4px;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.primary.dustyRose} ${({ $popularity }) => $popularity}%,
    ${({ theme }) => theme.colors.background.tertiary} ${({ $popularity }) => $popularity}%
  );
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin-top: auto;
`;

export const TrendCard = ({ category, title, description, imageUrl, popularity }: TrendCardProps) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/images/placeholder.svg';
  };

  return (
    <TrendContainer hoverable>
      <ImageContainer>
        <TrendImage src={imageUrl} alt={title} onError={handleImageError} />
      </ImageContainer>
      <ContentContainer>
        <Category>{category}</Category>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <PopularityBar
          $popularity={popularity}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </ContentContainer>
    </TrendContainer>
  );
}; 