import styled from 'styled-components';
import { motion } from 'framer-motion';

interface RelatedTrend {
  id: string;
  title: string;
  similarity: number;
  growth: number;
}

interface RelatedTrendsProps {
  trends: RelatedTrend[];
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
  box-shadow: ${({ theme }) => theme.shadows.sm};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const TrendHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const TrendTitle = styled.h4`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.primary};
  font-size: 1rem;
  margin: 0;
`;

const SimilarityScore = styled.div`
  color: ${({ theme }) => theme.colors.primary.slateBlue};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.9rem;
  font-weight: 600;
`;

const TrendMetrics = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const MetricBar = styled.div`
  flex: 1;
  height: 4px;
  background: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
`;

const MetricFill = styled(motion.div)<{ $value: number }>`
  height: 100%;
  width: ${({ $value }) => $value}%;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.primary.slateBlue},
    ${({ theme }) => theme.colors.primary.sageGreen}
  );
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const GrowthIndicator = styled.div<{ $positive: boolean }>`
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

export const RelatedTrends = ({ trends }: RelatedTrendsProps) => {
  if (trends.length === 0) {
    return (
      <Container>
        <EmptyState>No related trends found</EmptyState>
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
            <TrendHeader>
              <TrendTitle>{trend.title}</TrendTitle>
              <SimilarityScore>{trend.similarity}% Match</SimilarityScore>
            </TrendHeader>
            <TrendMetrics>
              <MetricBar>
                <MetricFill
                  $value={trend.similarity}
                  initial={{ width: 0 }}
                  animate={{ width: `${trend.similarity}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
              </MetricBar>
              <GrowthIndicator $positive={trend.growth > 0}>
                {Math.abs(trend.growth)}%
              </GrowthIndicator>
            </TrendMetrics>
          </TrendCard>
        ))}
      </TrendList>
    </Container>
  );
}; 