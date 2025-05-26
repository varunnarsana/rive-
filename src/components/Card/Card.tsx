import styled from 'styled-components';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  hoverable?: boolean;
}

const StyledCard = styled(motion.div)<{ $hoverable?: boolean }>`
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: ${({ theme }) => theme.transitions.default};
  border: 1px solid ${({ theme }) => theme.colors.background.tertiary};
  
  ${({ $hoverable, theme }) =>
    $hoverable &&
    `
    cursor: pointer;
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${theme.shadows.md};
      border-color: ${theme.colors.primary.dustyRose}20;
    }
  `}
`;

export const Card = ({ children, onClick, hoverable = false }: CardProps) => {
  return (
    <StyledCard
      $hoverable={hoverable}
      onClick={onClick}
      whileHover={hoverable ? { scale: 1.02 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </StyledCard>
  );
}; 