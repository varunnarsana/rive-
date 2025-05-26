import styled from 'styled-components';
import { motion } from 'framer-motion';

interface PredictionData {
  value: number;
  confidence: number;
}

interface TrendPredictionProps {
  predictions: {
    shortTerm: PredictionData;
    midTerm: PredictionData;
    longTerm: PredictionData;
  };
}

const Container = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const PredictionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
`;

const PredictionCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  text-align: center;
`;

const TimeFrame = styled.h4`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Value = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.primary};
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ConfidenceBar = styled.div`
  width: 100%;
  height: 4px;
  background: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin-top: ${({ theme }) => theme.spacing.sm};
  overflow: hidden;
`;

const ConfidenceFill = styled(motion.div)<{ $confidence: number }>`
  height: 100%;
  width: ${({ $confidence }) => $confidence}%;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.primary.slateBlue},
    ${({ theme }) => theme.colors.primary.sageGreen}
  );
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const ConfidenceLabel = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.8rem;
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const TrendPrediction = ({ predictions }: TrendPredictionProps) => {
  const timeFrames = [
    { key: 'shortTerm', label: 'Short Term' },
    { key: 'midTerm', label: 'Mid Term' },
    { key: 'longTerm', label: 'Long Term' },
  ] as const;

  return (
    <Container>
      <PredictionGrid>
        {timeFrames.map(({ key, label }, index) => (
          <PredictionCard
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <TimeFrame>{label}</TimeFrame>
            <Value>{predictions[key].value}%</Value>
            <ConfidenceBar>
              <ConfidenceFill
                $confidence={predictions[key].confidence}
                initial={{ width: 0 }}
                animate={{ width: `${predictions[key].confidence}%` }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              />
            </ConfidenceBar>
            <ConfidenceLabel>
              {predictions[key].confidence}% Confidence
            </ConfidenceLabel>
          </PredictionCard>
        ))}
      </PredictionGrid>
    </Container>
  );
}; 