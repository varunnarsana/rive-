import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ThemeOfDayProps {
  title: string;
  description: string;
  image: string;
  stats: {
    engagement: number;
    growth: number;
    reach: string;
  };
}

const Container = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background.secondary};
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

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing.xl};
  color: white;
`;

const Title = styled.h3`
  font-size: 2rem;
  font-family: ${({ theme }) => theme.typography.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Description = styled.p`
  font-size: 1.1rem;
  font-family: ${({ theme }) => theme.typography.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  max-width: 600px;
`;

const Stats = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const StatItem = styled(motion.div)`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  font-family: ${({ theme }) => theme.typography.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.8;
  font-family: ${({ theme }) => theme.typography.secondary};
`;

export const ThemeOfDay = ({ title, description, image, stats }: ThemeOfDayProps) => {
  return (
    <Container>
      <ImageContainer>
        <Image src={image} alt={title} />
        <Overlay>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <Stats>
            <StatItem
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <StatValue>{stats.engagement}%</StatValue>
              <StatLabel>Engagement</StatLabel>
            </StatItem>
            <StatItem
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <StatValue>+{stats.growth}%</StatValue>
              <StatLabel>Growth</StatLabel>
            </StatItem>
            <StatItem
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <StatValue>{stats.reach}</StatValue>
              <StatLabel>Reach</StatLabel>
            </StatItem>
          </Stats>
        </Overlay>
      </ImageContainer>
    </Container>
  );
}; 