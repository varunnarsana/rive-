import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { TrendPoll as TrendPollType } from '../../types/interactions';

interface TrendPollProps {
  poll: TrendPollType;
  onVote: (optionIndex: number) => void;
}

const PollContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const Question = styled.h4`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Option = styled(motion.button)<{ $voted: boolean }>`
  position: relative;
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: 2px solid ${({ theme, $voted }) =>
    $voted ? theme.colors.primary.slateBlue : theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  width: 100%;
  text-align: left;
  overflow: hidden;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.slateBlue};
  }
`;

const OptionText = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.secondary};
  position: relative;
  z-index: 1;
`;

const ProgressBar = styled(motion.div)<{ $percentage: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary.slateBlue}20;
  width: ${({ $percentage }) => $percentage}%;
`;

const VoteCount = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.9rem;
  margin-left: ${({ theme }) => theme.spacing.sm};
`;

const PollMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.background.tertiary};
`;

const TotalVotes = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.9rem;
`;

const TimeRemaining = styled.span`
  color: ${({ theme }) => theme.colors.primary.sageGreen};
  font-family: ${({ theme }) => theme.typography.secondary};
  font-size: 0.9rem;
`;

export const TrendPoll = ({ poll, onVote }: TrendPollProps) => {
  const [voted, setVoted] = useState<number | null>(null);
  const totalVotes = Object.values(poll.votes).reduce((a, b) => a + b, 0);

  const handleVote = (optionIndex: number) => {
    if (voted === null) {
      setVoted(optionIndex);
      onVote(optionIndex);
    }
  };

  const calculateTimeRemaining = () => {
    const end = new Date(poll.endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Poll ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d remaining`;
    return `${hours}h remaining`;
  };

  return (
    <PollContainer>
      <Question>{poll.question}</Question>
      <OptionsContainer>
        {poll.options.map((option, index) => {
          const voteCount = poll.votes[index] || 0;
          const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;
          
          return (
            <Option
              key={index}
              $voted={voted === index}
              onClick={() => handleVote(index)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={voted !== null}
            >
              <ProgressBar
                $percentage={percentage}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.5 }}
              />
              <OptionText>
                {option}
                {voted !== null && (
                  <VoteCount>{Math.round(percentage)}%</VoteCount>
                )}
              </OptionText>
            </Option>
          );
        })}
      </OptionsContainer>
      
      <PollMeta>
        <TotalVotes>{totalVotes} votes</TotalVotes>
        <TimeRemaining>{calculateTimeRemaining()}</TimeRemaining>
      </PollMeta>
    </PollContainer>
  );
}; 