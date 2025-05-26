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

interface TrendData {
  name: string;
  values: number[];
}

interface TrendCompareProps {
  data: TrendData[];
}

const Container = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TrendLegend = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const LegendColor = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ $color }) => $color};
`;

const LegendLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ChartContainer = styled.div`
  position: relative;
  height: 300px;
`;

const colors = [
  'rgba(99, 102, 241, 0.8)', // Indigo
  'rgba(236, 72, 153, 0.8)', // Pink
  'rgba(34, 197, 94, 0.8)', // Green
  'rgba(249, 115, 22, 0.8)', // Orange
];

export const TrendCompare = ({ data }: TrendCompareProps) => {
  const labels = Array.from({ length: data[0].values.length }, (_, i) => `Day ${i + 1}`);

  const chartData = {
    labels,
    datasets: data.map((trend, index) => ({
      label: trend.name,
      data: trend.values,
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length].replace('0.8', '0.1'),
      tension: 0.4,
      fill: true,
      pointRadius: 4,
      pointBackgroundColor: colors[index % colors.length],
      pointBorderColor: '#fff',
      pointHoverRadius: 6,
    })),
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
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
      <Header>
        <TrendLegend>
          {data.map((trend, index) => (
            <LegendItem key={trend.name}>
              <LegendColor $color={colors[index % colors.length]} />
              <LegendLabel>{trend.name}</LegendLabel>
            </LegendItem>
          ))}
        </TrendLegend>
      </Header>

      <ChartContainer>
        <Line data={chartData} options={options} />
      </ChartContainer>
    </Container>
  );
}; 