import styled from 'styled-components';
import { motion } from 'framer-motion';

interface SavedTrend {
  id: string;
  title: string;
  growth: number;
  category: string;
}

interface SavedTrendsProps {
  trends: SavedTrend[];
}

const Container = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const TrendList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const TrendCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const TrendInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const TrendTitle = styled.h4`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.primary};
  font-size: 1rem;
  margin: 0;
`;

const TrendCategory = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.8rem;
`;

const TrendGrowth = styled.div<{ $positive: boolean }>`
  color: ${({ theme, $positive }) =>
    $positive ? theme.colors.primary.sageGreen : theme.colors.primary.dustyRose};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &::before {
    content: '${({ $positive }) => ($positive ? '↗' : '↘')}';
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.typography.secondary};
`;

export const SavedTrends = ({ trends }: SavedTrendsProps) => {
  if (trends.length === 0) {
    return (
      <Container>
        <EmptyState>No saved trends yet</EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <TrendList>
        {trends.map((trend, index) => (
          <TrendCard
            key={trend.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <TrendInfo>
              <TrendTitle>{trend.title}</TrendTitle>
              <TrendCategory>{trend.category}</TrendCategory>
            </TrendInfo>
            <TrendGrowth $positive={trend.growth > 0}>
              {Math.abs(trend.growth)}%
            </TrendGrowth>
          </TrendCard>
        ))}
      </TrendList>
    </Container>
  );
}; 