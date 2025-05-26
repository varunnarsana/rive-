import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Region {
  name: string;
  value: number;
}

interface TrendHeatMapProps {
  data: {
    regions: Region[];
  };
}

const Container = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const RegionList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const RegionCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const RegionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const RegionName = styled.h4`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.primary};
  font-size: 1.1rem;
  margin: 0;
`;

const RegionValue = styled.span`
  color: ${({ theme }) => theme.colors.primary.sageGreen};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-weight: 600;
  font-size: 1.2rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
`;

const Progress = styled(motion.div)<{ $value: number }>`
  height: 100%;
  width: ${({ $value }) => $value}%;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.primary.slateBlue},
    ${({ theme }) => theme.colors.primary.sageGreen}
  );
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const Legend = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const TrendHeatMap = ({ data }: TrendHeatMapProps) => {
  return (
    <Container>
      <RegionList>
        {data.regions.map((region, index) => (
          <RegionCard
            key={region.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <RegionHeader>
              <RegionName>{region.name}</RegionName>
              <RegionValue>{region.value}%</RegionValue>
            </RegionHeader>
            <ProgressBar>
              <Progress
                $value={region.value}
                initial={{ width: 0 }}
                animate={{ width: `${region.value}%` }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              />
            </ProgressBar>
            <Legend>
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </Legend>
          </RegionCard>
        ))}
      </RegionList>
    </Container>
  );
}; 