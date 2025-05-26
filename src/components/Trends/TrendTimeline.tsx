import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ScaleOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface TrendDataPoint {
  date: string;
  value: number;
}

interface TrendTimelineProps {
  data: TrendDataPoint[];
  timeframe: '1M' | '3M' | '6M' | '1Y';
  onTimeframeChange: (timeframe: '1M' | '3M' | '6M' | '1Y') => void;
}

const Container = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TimeframeSelector = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.background.tertiary};
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const TimeframeButton = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary.slateBlue : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.background.primary : theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme, $active }) =>
      $active ? theme.colors.primary.slateBlue : theme.colors.background.primary};
  }
`;

const ChartContainer = styled.div`
  position: relative;
  height: 300px;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const TrendTimeline = ({ data, timeframe, onTimeframeChange }: TrendTimelineProps) => {
  const chartData = {
    labels: data.map(point => point.date),
    datasets: [
      {
        label: 'Trend Popularity',
        data: data.map(point => point.value),
        fill: true,
        backgroundColor: 'rgba(107, 114, 128, 0.2)',
        borderColor: '#6B7280',
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#6B7280',
        pointBorderColor: '#fff',
        pointHoverRadius: 6,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleFont: {
          family: "'Montserrat', sans-serif",
          size: 14,
        },
        bodyFont: {
          family: "'Montserrat', sans-serif",
          size: 12,
        },
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        type: 'category',
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "'Montserrat', sans-serif",
            size: 12,
          },
          color: '#4B5563',
        },
      } as ScaleOptions<'category'>,
      y: {
        type: 'linear',
        beginAtZero: true,
        grid: {
          color: '#E5E7EB',
        },
        ticks: {
          font: {
            family: "'Montserrat', sans-serif",
            size: 12,
          },
          color: '#4B5563',
          callback: function(value) {
            return `${value}%`;
          },
        },
      } as ScaleOptions<'linear'>,
    },
  };

  return (
    <Container>
      <Controls>
        <TimeframeSelector>
          {['1M', '3M', '6M', '1Y'].map((tf) => (
            <TimeframeButton
              key={tf}
              $active={timeframe === tf}
              onClick={() => onTimeframeChange(tf as '1M' | '3M' | '6M' | '1Y')}
            >
              {tf}
            </TimeframeButton>
          ))}
        </TimeframeSelector>
      </Controls>

      <ChartContainer>
        <Line data={chartData} options={options} />
      </ChartContainer>
    </Container>
  );
}; 