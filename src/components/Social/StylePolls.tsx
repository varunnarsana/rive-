import styled from 'styled-components';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Poll {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    image: string;
    votes: number;
  }[];
  totalVotes: number;
  creator: {
    name: string;
    image: string;
  };
  timestamp: string;
  hasVoted: boolean;
}

const PollsContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(142, 107, 158, 0.1);
  border: 1px solid rgba(142, 107, 158, 0.1);
`;

const PollsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  color: #333;
  font-size: 1.5rem;
  margin: 0;
`;

const CreateButton = styled.button`
  background: linear-gradient(to right, #8E6B9E, #4A3858);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(142, 107, 158, 0.3);
  }
`;

const PollCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(142, 107, 158, 0.1);
  border: 1px solid rgba(142, 107, 158, 0.1);
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(142, 107, 158, 0.2);
  }
`;

const PollHeader = styled.div`
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid rgba(142, 107, 158, 0.1);
`;

const CreatorAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const PollInfo = styled.div`
  flex: 1;
`;

const CreatorName = styled.div`
  font-weight: 500;
  color: #333;
`;

const PollTimestamp = styled.div`
  color: #999;
  font-size: 0.8rem;
`;

const PollQuestion = styled.h3`
  margin: 1rem 1.5rem;
  color: #333;
  font-size: 1.2rem;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 0 1.5rem 1.5rem;
`;

const Option = styled.div<{ $selected?: boolean }>`
  position: relative;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid ${props => props.$selected ? '#8E6B9E' : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const OptionImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const OptionOverlay = styled.div<{ $percentage?: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to right,
    rgba(142, 107, 158, 0.3) ${props => props.$percentage}%,
    transparent ${props => props.$percentage}%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const OptionText = styled.div`
  padding: 1rem;
  background: white;
  color: #333;
  font-weight: 500;
  text-align: center;
`;

const VoteCount = styled.div`
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  
  &:hover {
    color: #333;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid rgba(142, 107, 158, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;
  
  &:focus {
    outline: none;
    border-color: #8E6B9E;
  }
`;

const ImageUploadArea = styled.div<{ $isDragging: boolean }>`
  border: 2px dashed ${props => props.$isDragging ? '#8E6B9E' : '#ddd'};
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.$isDragging ? 'rgba(142, 107, 158, 0.1)' : 'transparent'};

  &:hover {
    border-color: #8E6B9E;
    background: rgba(142, 107, 158, 0.1);
  }
`;

export const StylePolls = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [polls] = useState<Poll[]>([
    {
      id: '1',
      question: 'Which summer dress style do you prefer?',
      options: [
        {
          id: '1',
          text: 'Floral Maxi Dress',
          image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
          votes: 234
        },
        {
          id: '2',
          text: 'Mini Sundress',
          image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
          votes: 156
        }
      ],
      totalVotes: 390,
      creator: {
        name: 'Sarah Anderson',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
      },
      timestamp: '2h ago',
      hasVoted: false
    },
    {
      id: '2',
      question: 'Best fall accessory?',
      options: [
        {
          id: '1',
          text: 'Oversized Scarf',
          image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc',
          votes: 432
        },
        {
          id: '2',
          text: 'Leather Boots',
          image: 'https://images.unsplash.com/photo-1538329972958-465d6d2144ed',
          votes: 567
        }
      ],
      totalVotes: 999,
      creator: {
        name: 'Emily Chen',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
      },
      timestamp: '5h ago',
      hasVoted: true
    }
  ]);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const handleVote = (pollId: string, optionId: string) => {
    setSelectedOptions(prev => ({ ...prev, [pollId]: optionId }));
  };

  const calculatePercentage = (votes: number, total: number) => {
    return Math.round((votes / total) * 100);
  };

  return (
    <PollsContainer>
      <PollsHeader>
        <Title>Style Polls</Title>
        <CreateButton onClick={() => setIsCreateModalOpen(true)}>
          <i className="fas fa-plus"></i>
          Create Poll
        </CreateButton>
      </PollsHeader>

      {polls.map(poll => (
        <PollCard key={poll.id}>
          <PollHeader>
            <CreatorAvatar src={poll.creator.image} alt={poll.creator.name} />
            <PollInfo>
              <CreatorName>{poll.creator.name}</CreatorName>
              <PollTimestamp>{poll.timestamp}</PollTimestamp>
            </PollInfo>
          </PollHeader>

          <PollQuestion>{poll.question}</PollQuestion>

          <OptionsGrid>
            {poll.options.map(option => {
              const isSelected = selectedOptions[poll.id] === option.id;
              const showResults = poll.hasVoted || isSelected;
              const percentage = calculatePercentage(option.votes, poll.totalVotes);

              return (
                <Option
                  key={option.id}
                  $selected={isSelected}
                  onClick={() => !poll.hasVoted && handleVote(poll.id, option.id)}
                >
                  <OptionImage src={option.image} alt={option.text} />
                  {showResults && (
                    <OptionOverlay $percentage={percentage}>
                      {percentage}%
                    </OptionOverlay>
                  )}
                  <OptionText>{option.text}</OptionText>
                  {showResults && (
                    <VoteCount>{option.votes} votes</VoteCount>
                  )}
                </Option>
              );
            })}
          </OptionsGrid>
        </PollCard>
      ))}

      <AnimatePresence>
        {isCreateModalOpen && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCreateModalOpen(false)}
          >
            <ModalContent
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <CloseButton onClick={() => setIsCreateModalOpen(false)}>×</CloseButton>
              <h2>Create New Poll</h2>
              
              <Input placeholder="What's your style question?" />
              
              <h3>Option 1</h3>
              <Input placeholder="Option text" />
              <ImageUploadArea $isDragging={false}>
                <i className="fas fa-cloud-upload-alt" style={{ fontSize: '2rem', marginBottom: '1rem', color: '#8E6B9E' }}></i>
                <p>Upload or drag image here</p>
              </ImageUploadArea>
              
              <h3>Option 2</h3>
              <Input placeholder="Option text" />
              <ImageUploadArea $isDragging={false}>
                <i className="fas fa-cloud-upload-alt" style={{ fontSize: '2rem', marginBottom: '1rem', color: '#8E6B9E' }}></i>
                <p>Upload or drag image here</p>
              </ImageUploadArea>
              
              <CreateButton
                onClick={() => setIsCreateModalOpen(false)}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Create Poll
              </CreateButton>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </PollsContainer>
  );
}; 