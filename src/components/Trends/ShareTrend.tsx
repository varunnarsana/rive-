import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Container = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const ShareGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
`;

const ShareButton = styled(motion.button)`
  background: ${({ theme }) => theme.colors.background.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const Icon = styled.span`
  font-size: 1.5rem;
`;

const Label = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.9rem;
`;

const LinkContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const LinkInput = styled.input`
  flex: 1;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.9rem;
  padding: 0;

  &:focus {
    outline: none;
  }
`;

const CopyButton = styled.button<{ $copied: boolean }>`
  background: none;
  border: none;
  color: ${({ theme, $copied }) =>
    $copied ? theme.colors.primary.sageGreen : theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.9rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.slateBlue};
  }
`;

const shareOptions = [
  { icon: '📧', label: 'Email', action: 'email' },
  { icon: '🔗', label: 'Copy Link', action: 'copy' },
  { icon: '📱', label: 'Message', action: 'message' },
  { icon: '📥', label: 'Export', action: 'export' },
] as const;

export const ShareTrend = () => {
  const [copied, setCopied] = useState(false);
  const shareUrl = 'https://rive.app/trends/y2k-revival';

  const handleShare = (action: string) => {
    switch (action) {
      case 'email':
        window.location.href = `mailto:?subject=Check out this trend&body=I found this interesting trend: ${shareUrl}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
      case 'message':
        // Implement native share if available
        if (navigator.share) {
          navigator.share({
            title: 'Check out this trend',
            text: 'I found this interesting trend on Rive',
            url: shareUrl,
          });
        }
        break;
      case 'export':
        // Implement export functionality
        break;
    }
  };

  return (
    <Container>
      <ShareGrid>
        {shareOptions.map((option, index) => (
          <ShareButton
            key={option.action}
            onClick={() => handleShare(option.action)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Icon>{option.icon}</Icon>
            <Label>{option.label}</Label>
          </ShareButton>
        ))}
      </ShareGrid>

      <LinkContainer>
        <LinkInput
          type="text"
          value={shareUrl}
          readOnly
          onClick={(e) => e.currentTarget.select()}
        />
        <CopyButton
          $copied={copied}
          onClick={() => handleShare('copy')}
        >
          {copied ? 'Copied!' : 'Copy'}
        </CopyButton>
      </LinkContainer>
    </Container>
  );
}; 