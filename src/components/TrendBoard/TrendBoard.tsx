import styled from 'styled-components';
import { motion } from 'framer-motion';

interface TrendBoardItem {
  id: string;
  imageUrl: string;
  title: string;
  type: 'image' | 'video';
  size: 'small' | 'medium' | 'large';
}

interface TrendBoardProps {
  items: TrendBoardItem[];
  category: string;
}

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const BoardItem = styled(motion.div)<{ $size: 'small' | 'medium' | 'large' }>`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  cursor: pointer;
  grid-column: span ${({ $size }) => ($size === 'large' ? 2 : 1)};
  grid-row: span ${({ $size }) => ($size === 'large' ? 2 : 1)};
  aspect-ratio: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 50%,
      ${({ theme }) => theme.colors.primary.slateBlue}80
    );
    z-index: 1;
    opacity: 0;
    transition: ${({ theme }) => theme.transitions.default};
  }

  &:hover::before {
    opacity: 1;
  }
`;

const BoardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ItemTitle = styled(motion.span)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.sm};
  left: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.background.primary};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.9rem;
  z-index: 2;
  opacity: 0;
  padding: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ theme }) => theme.colors.primary.slateBlue}80;
  backdrop-filter: blur(4px);
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  text-align: center;
`;

const CategoryTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.primary};
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const TrendBoard = ({ items, category }: TrendBoardProps) => {
  return (
    <div>
      <CategoryTitle>{category}</CategoryTitle>
      <Board>
        {items.map((item) => (
          <BoardItem
            key={item.id}
            $size={item.size}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <BoardImage src={item.imageUrl} alt={item.title} />
            <ItemTitle
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {item.title}
            </ItemTitle>
          </BoardItem>
        ))}
      </Board>
    </div>
  );
}; 