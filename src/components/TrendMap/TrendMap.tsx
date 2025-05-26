import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { WorldMapSvg } from './WorldMapSvg';

interface TrendLocation {
  id: string;
  city: string;
  country: string;
  coordinates: [number, number];
  trends: {
    title: string;
    category: string;
    popularity: number;
  }[];
}

interface TrendMapProps {
  locations: TrendLocation[];
}

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing.md};
`;

const WorldMapWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.background.primary};
  padding: ${({ theme }) => theme.spacing.lg};
  
  svg {
    width: 100%;
    height: 100%;
    path {
      fill: ${({ theme }) => theme.colors.background.tertiary};
      stroke: ${({ theme }) => theme.colors.primary.slateBlue}40;
      stroke-width: 1;
      vector-effect: non-scaling-stroke;
      transition: ${({ theme }) => theme.transitions.default};

      &:hover {
        fill: ${({ theme }) => theme.colors.primary.slateBlue}20;
      }
    }
  }
`;

const LocationMarker = styled(motion.div)<{ $active: boolean }>`
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary.dustyRose : theme.colors.primary.slateBlue};
  border-radius: 50%;
  cursor: pointer;
  transform-origin: center;
  transform: translate(-50%, -50%);
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.colors.primary.slateBlue};
    opacity: 0.5;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary.slateBlue}20;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.5;
    }
    70% {
      transform: translate(-50%, -50%) scale(2);
      opacity: 0;
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0;
    }
  }
`;

const TrendPopup = styled(motion.div)`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  min-width: 250px;
  z-index: 10;
  pointer-events: none;
`;

const PopupHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CityName = styled.h4`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.primary};
  margin: 0;
`;

const CountryName = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.9rem;
`;

const TrendList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TrendItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.xs} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.background.tertiary};

  &:last-child {
    border-bottom: none;
  }
`;

const TrendTitle = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.9rem;
`;

const TrendCategory = styled.span`
  color: ${({ theme }) => theme.colors.primary.sageGreen};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.8rem;
`;

const PopularityBar = styled.div<{ $percentage: number }>`
  width: ${props => props.$percentage}%;
  height: 4px;
  background: ${({ theme }) => theme.colors.primary.dustyRose};
  border-radius: 2px;
  margin-top: 4px;
`;

export const TrendMap: React.FC<TrendMapProps> = ({ locations }) => {
  const [hoveredLocation, setHoveredLocation] = useState<TrendLocation | null>(null);

  return (
    <MapContainer>
      <WorldMapWrapper>
        <WorldMapSvg />
      </WorldMapWrapper>

      {locations.map((location) => (
        <LocationMarker
          key={location.id}
          $active={hoveredLocation?.id === location.id}
          style={{
            left: `${location.coordinates[0]}%`,
            top: `${location.coordinates[1]}%`,
          }}
          whileHover={{ scale: 1.2 }}
          onMouseEnter={() => setHoveredLocation(location)}
          onMouseLeave={() => setHoveredLocation(null)}
        />
      ))}

      <AnimatePresence>
        {hoveredLocation && (
          <TrendPopup
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            style={{
              left: `${hoveredLocation.coordinates[0]}%`,
              top: `${hoveredLocation.coordinates[1]}%`,
              transform: 'translate(-50%, -120%)',
            }}
          >
            <PopupHeader>
              <CityName>{hoveredLocation.city}</CityName>
              <CountryName>{hoveredLocation.country}</CountryName>
            </PopupHeader>
            <TrendList>
              {hoveredLocation.trends.map((trend, index) => (
                <TrendItem key={index}>
                  <div>
                    <TrendTitle>{trend.title}</TrendTitle>
                    <PopularityBar $percentage={trend.popularity} />
                  </div>
                  <TrendCategory>{trend.category}</TrendCategory>
                </TrendItem>
              ))}
            </TrendList>
          </TrendPopup>
        )}
      </AnimatePresence>
    </MapContainer>
  );
}; 