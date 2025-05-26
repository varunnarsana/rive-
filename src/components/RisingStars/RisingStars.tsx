import styled from 'styled-components';
import { motion } from 'framer-motion';

interface RisingStar {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  description: string;
  growthRate: number;
}

interface RisingStarsProps {
  stars: RisingStar[];
}

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.primary};
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const StarCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: ${({ theme }) => theme.transitions.default};

  ${StarCard}:hover & {
    transform: scale(1.05);
  }
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const StarName = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
`;

const StarCategory = styled.span`
  color: ${({ theme }) => theme.colors.primary.sageGreen};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.9rem;
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.typography.body};
  font-size: 0.9rem;
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`;

const GrowthIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const GrowthLabel = styled.span`
  color: ${({ theme }) => theme.colors.primary.dustyRose};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.9rem;
  font-weight: 500;
`;

const GrowthBar = styled.div<{ $growth: number }>`
  height: 4px;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.primary.dustyRose},
    ${({ theme }) => theme.colors.primary.slateBlue}
  );
  width: ${({ $growth }) => $growth}%;
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

export const RisingStars = ({ stars }: RisingStarsProps) => {
  return (
    <Container>
      <Title>Rising Stars</Title>
      <Grid>
        {stars.map((star) => (
          <StarCard
            key={star.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <ImageContainer>
              <Image src={star.imageUrl} alt={star.name} />
            </ImageContainer>
            <Content>
              <StarName>{star.name}</StarName>
              <StarCategory>{star.category}</StarCategory>
              <Description>{star.description}</Description>
              <GrowthIndicator>
                <GrowthLabel>{star.growthRate}% Growth</GrowthLabel>
                <GrowthBar $growth={star.growthRate} />
              </GrowthIndicator>
            </Content>
          </StarCard>
        ))}
      </Grid>
    </Container>
  );
}; 