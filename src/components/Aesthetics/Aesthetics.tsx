import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { AestheticDetails } from './AestheticDetails';
import { aestheticsData } from './aestheticsData';

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const AestheticCard = styled(motion.div)<{ $isSelected?: boolean }>`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all 0.3s ease;
  border: 2px solid transparent;

  ${({ $isSelected, theme }) => $isSelected && `
    border-color: ${theme.colors.primary.slateBlue};
    transform: scale(1.02);
  `}

  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
  line-height: 1.5;
`;

export const Aesthetics = () => {
  const [selectedAesthetic, setSelectedAesthetic] = useState<string | null>(null);

  const handleAestheticClick = (id: string) => {
    setSelectedAesthetic(id === selectedAesthetic ? null : id);
  };

  return (
    <Container>
      <Grid>
        {Object.entries(aestheticsData).map(([id, aesthetic]) => (
          <AestheticCard
            key={id}
            onClick={() => handleAestheticClick(id)}
            $isSelected={selectedAesthetic === id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
          >
            <ImageContainer>
              <Image src={aesthetic.imageUrl} alt={aesthetic.name} />
            </ImageContainer>
            <Title>{aesthetic.name}</Title>
            <Description>{aesthetic.description}</Description>
          </AestheticCard>
        ))}
      </Grid>

      <AnimatePresence>
        {selectedAesthetic && (
          <AestheticDetails 
            aesthetic={aestheticsData[selectedAesthetic]}
          />
        )}
      </AnimatePresence>
    </Container>
  );
}; 