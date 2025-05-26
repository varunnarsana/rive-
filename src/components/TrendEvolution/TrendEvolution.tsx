import styled from 'styled-components';
import { motion } from 'framer-motion';

interface TrendDataPoint {
  date: string;
  value: number;
}

interface TrendEvolutionProps {
  title: string;
  category: string;
  data: TrendDataPoint[];
  timeframe: 'day' | 'week' | 'month';
  onTimeframeChange: (timeframe: 'day' | 'week' | 'month') => void;
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.primary};
  margin: 0;
  font-size: 1.5rem;
`;

const Category = styled.span`
  color: ${({ theme }) => theme.colors.primary.sageGreen};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.9rem;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const Graph = styled.div`
  position: relative;
  height: 200px;
  display: flex;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.background.tertiary};
`;

const Bar = styled(motion.div)<{ $height: number }>`
  flex: 1;
  height: ${({ $height }) => $height}%;
  background: linear-gradient(
    to top,
    ${({ theme }) => theme.colors.primary.slateBlue},
    ${({ theme }) => theme.colors.primary.dustyRose}
  );
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  min-width: 30px;

  &:hover {
    opacity: 0.8;
    transform: scaleY(1.02);
  }
`;

const DateLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.8rem;
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: block;
`;

const TimeframeSelector = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const TimeframeButton = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary.slateBlue : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.background.primary : theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.9rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  border: none;
  outline: none;

  &:hover {
    background-color: ${({ theme, $active }) =>
      $active ? theme.colors.primary.slateBlue : theme.colors.background.primary};
  }
`;

const ValueLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.9rem;
  font-weight: 500;
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.2s ease;

  ${Bar}:hover + & {
    opacity: 1;
  }
`;

export const TrendEvolution = ({
  title,
  category,
  data,
  timeframe,
  onTimeframeChange,
}: TrendEvolutionProps) => {
  const maxValue = Math.max(...data.map((point) => point.value));

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <Category>{category}</Category>
      </Header>

      <TimeframeSelector>
        {['day', 'week', 'month'].map((tf) => (
          <TimeframeButton
            key={tf}
            $active={timeframe === tf}
            onClick={() => onTimeframeChange(tf as 'day' | 'week' | 'month')}
          >
            {tf.charAt(0).toUpperCase() + tf.slice(1)}
          </TimeframeButton>
        ))}
      </TimeframeSelector>

      <Graph>
        {data.map((point, index) => (
          <div key={index} style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
            <Bar
              $height={(point.value / maxValue) * 100}
              initial={{ height: 0 }}
              animate={{ height: `${(point.value / maxValue) * 100}%` }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            />
            <ValueLabel>{point.value}%</ValueLabel>
            <DateLabel>{point.date}</DateLabel>
          </div>
        ))}
      </Graph>
    </Container>
  );
}; 