import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { TrendRating } from '../../types/interactions';

interface TrendInteractionsProps {
  trendId: string;
  initialRating?: TrendRating;
  initialSaved?: boolean;
  onRate?: (rating: TrendRating) => void;
  onSave?: (saved: boolean) => void;
  onShare?: () => void;
}

const InteractionsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const RatingContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const RatingButton = styled(motion.button)<{ $active: boolean }>`
  background: none;
  border: 2px solid ${({ theme, $active }) => 
    $active ? theme.colors.primary.slateBlue : theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  color: ${({ theme, $active }) => 
    $active ? theme.colors.primary.slateBlue : theme.colors.text.secondary};
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.slateBlue};
    color: ${({ theme }) => theme.colors.primary.slateBlue};
  }
`;

const SaveButton = styled(RatingButton)`
  background-color: ${({ theme, $active }) => 
    $active ? theme.colors.primary.sageGreen : 'transparent'};
  border-color: ${({ theme, $active }) => 
    $active ? theme.colors.primary.sageGreen : theme.colors.background.tertiary};
  color: ${({ theme, $active }) => 
    $active ? theme.colors.background.primary : theme.colors.text.secondary};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.sageGreen};
    color: ${({ theme, $active }) => 
      $active ? theme.colors.background.primary : theme.colors.primary.sageGreen};
  }
`;

const ShareButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.9rem;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.slateBlue};
    background-color: ${({ theme }) => theme.colors.background.tertiary};
  }
`;

const ShareOptions = styled(motion.div)`
  position: absolute;
  bottom: 100%;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.spacing.sm};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  min-width: 150px;
  z-index: 10;
`;

const ShareOption = styled.button`
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  text-align: left;
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.secondary};
  color: ${({ theme }) => theme.colors.text.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const TrendInteractions = ({
  trendId,
  initialRating,
  initialSaved = false,
  onRate,
  onSave,
  onShare,
}: TrendInteractionsProps) => {
  const [rating, setRating] = useState<TrendRating | undefined>(initialRating);
  const [saved, setSaved] = useState(initialSaved);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleRate = (newRating: TrendRating) => {
    setRating(rating === newRating ? undefined : newRating);
    onRate?.(newRating);
  };

  const handleSave = () => {
    setSaved(!saved);
    onSave?.(!saved);
  };

  const handleShare = (platform: string) => {
    setShowShareOptions(false);
    onShare?.();
    // Implement platform-specific sharing logic here
    console.log(`Sharing on ${platform}`);
  };

  return (
    <InteractionsContainer>
      <RatingContainer>
        <RatingButton
          $active={rating === 'love'}
          onClick={() => handleRate('love')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ❤️ Love it
        </RatingButton>
        <RatingButton
          $active={rating === 'neutral'}
          onClick={() => handleRate('neutral')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          😐 Neutral
        </RatingButton>
        <RatingButton
          $active={rating === 'dislike'}
          onClick={() => handleRate('dislike')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          👎 Not for me
        </RatingButton>
      </RatingContainer>

      <SaveButton
        $active={saved}
        onClick={handleSave}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {saved ? '✓ Saved' : '+ Save'}
      </SaveButton>

      <div style={{ position: 'relative' }}>
        <ShareButton
          onClick={() => setShowShareOptions(!showShareOptions)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Share
        </ShareButton>

        <AnimatePresence>
          {showShareOptions && (
            <ShareOptions
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <ShareOption onClick={() => handleShare('twitter')}>
                Twitter
              </ShareOption>
              <ShareOption onClick={() => handleShare('instagram')}>
                Instagram
              </ShareOption>
              <ShareOption onClick={() => handleShare('tiktok')}>
                TikTok
              </ShareOption>
              <ShareOption onClick={() => handleShare('copy')}>
                Copy Link
              </ShareOption>
            </ShareOptions>
          )}
        </AnimatePresence>
      </div>
    </InteractionsContainer>
  );
}; 