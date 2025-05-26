import styled from 'styled-components';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Challenge {
  id: string;
  title: string;
  description: string;
  image: string;
  deadline: string;
  participants: number;
  prize: string;
  status: 'active' | 'upcoming' | 'completed';
  submissions?: {
    user: {
      name: string;
      image: string;
    };
    image: string;
    likes: number;
  }[];
}

const ChallengesContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(142, 107, 158, 0.1);
  border: 1px solid rgba(142, 107, 158, 0.1);
`;

const ChallengeHeader = styled.div`
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

const ChallengeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ChallengeCard = styled.div<{ $status: 'active' | 'upcoming' | 'completed' }>`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(142, 107, 158, 0.1);
  border: 1px solid rgba(142, 107, 158, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(142, 107, 158, 0.2);
  }

  ${props => props.$status === 'completed' && `
    opacity: 0.7;
  `}
`;

const ChallengeImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ChallengeContent = styled.div`
  padding: 1.5rem;
`;

const ChallengeTitle = styled.h3`
  margin: 0 0 0.5rem;
  color: #333;
  font-size: 1.2rem;
`;

const ChallengeDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 1rem;
`;

const ChallengeStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  font-size: 0.9rem;
`;

const StatusBadge = styled.span<{ $status: 'active' | 'upcoming' | 'completed' }>`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  
  ${props => {
    switch (props.$status) {
      case 'active':
        return `
          background: rgba(76, 175, 80, 0.1);
          color: #4CAF50;
        `;
      case 'upcoming':
        return `
          background: rgba(142, 107, 158, 0.1);
          color: #8E6B9E;
        `;
      case 'completed':
        return `
          background: rgba(158, 158, 158, 0.1);
          color: #9E9E9E;
        `;
    }
  }}
`;

const ParticipateButton = styled.button<{ $status: 'active' | 'upcoming' | 'completed' }>`
  width: 100%;
  padding: 1rem;
  border: none;
  background: ${props => props.$status === 'active' 
    ? 'linear-gradient(to right, #8E6B9E, #4A3858)'
    : '#f0f0f0'};
  color: ${props => props.$status === 'active' ? 'white' : '#666'};
  font-size: 1rem;
  cursor: ${props => props.$status === 'active' ? 'pointer' : 'not-allowed'};
  transition: all 0.3s ease;

  &:hover {
    transform: ${props => props.$status === 'active' ? 'translateY(-2px)' : 'none'};
    box-shadow: ${props => props.$status === 'active' 
      ? '0 4px 15px rgba(142, 107, 158, 0.3)'
      : 'none'};
  }
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid rgba(142, 107, 158, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #8E6B9E;
  }
`;

export const StyleChallenges = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [challenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Summer Y2K Revival',
      description: 'Create a Y2K-inspired summer outfit that combines nostalgia with modern trends.',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
      deadline: '2 days left',
      participants: 124,
      prize: '$200 Gift Card',
      status: 'active',
      submissions: [
        {
          user: {
            name: 'Sarah Anderson',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
          },
          image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
          likes: 45
        }
      ]
    },
    {
      id: '2',
      title: 'Dark Academia Fall',
      description: 'Design a sophisticated dark academia look perfect for autumn.',
      image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc',
      deadline: 'Starting in 3 days',
      participants: 0,
      prize: 'Featured Profile + $150',
      status: 'upcoming'
    },
    {
      id: '3',
      title: 'Sustainable Style',
      description: 'Create an outfit using only sustainable and eco-friendly fashion pieces.',
      image: 'https://images.unsplash.com/photo-1538329972958-465d6d2144ed',
      deadline: 'Ended',
      participants: 256,
      prize: '$300 Gift Card',
      status: 'completed'
    }
  ]);

  const [newChallenge, setNewChallenge] = useState({
    title: '',
    description: '',
    deadline: '',
    prize: ''
  });

  const handleCreateChallenge = () => {
    // Here you would typically send the challenge to your backend
    console.log('Creating challenge:', newChallenge);
    setIsCreateModalOpen(false);
    setNewChallenge({
      title: '',
      description: '',
      deadline: '',
      prize: ''
    });
  };

  return (
    <ChallengesContainer>
      <ChallengeHeader>
        <Title>Style Challenges</Title>
        <CreateButton onClick={() => setIsCreateModalOpen(true)}>
          <i className="fas fa-plus"></i>
          Create Challenge
        </CreateButton>
      </ChallengeHeader>

      <ChallengeGrid>
        {challenges.map(challenge => (
          <ChallengeCard key={challenge.id} $status={challenge.status}>
            <ChallengeImage src={challenge.image} alt={challenge.title} />
            <ChallengeContent>
              <ChallengeTitle>{challenge.title}</ChallengeTitle>
              <ChallengeDescription>{challenge.description}</ChallengeDescription>
              <ChallengeStats>
                <span>{challenge.participants} participants</span>
                <StatusBadge $status={challenge.status}>
                  {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                </StatusBadge>
              </ChallengeStats>
              <div style={{ margin: '1rem 0' }}>
                <strong>Prize:</strong> {challenge.prize}
              </div>
              <ParticipateButton $status={challenge.status}>
                {challenge.status === 'active' ? 'Participate Now' :
                 challenge.status === 'upcoming' ? 'Coming Soon' :
                 'Challenge Ended'}
              </ParticipateButton>
            </ChallengeContent>
          </ChallengeCard>
        ))}
      </ChallengeGrid>

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
              <h2>Create New Challenge</h2>
              
              <Input
                placeholder="Challenge Title"
                value={newChallenge.title}
                onChange={e => setNewChallenge({ ...newChallenge, title: e.target.value })}
              />
              
              <TextArea
                placeholder="Challenge Description"
                value={newChallenge.description}
                onChange={e => setNewChallenge({ ...newChallenge, description: e.target.value })}
              />
              
              <Input
                type="date"
                placeholder="Deadline"
                value={newChallenge.deadline}
                onChange={e => setNewChallenge({ ...newChallenge, deadline: e.target.value })}
              />
              
              <Input
                placeholder="Prize (e.g. $200 Gift Card)"
                value={newChallenge.prize}
                onChange={e => setNewChallenge({ ...newChallenge, prize: e.target.value })}
              />
              
              <CreateButton
                onClick={handleCreateChallenge}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Create Challenge
              </CreateButton>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </ChallengesContainer>
  );
}; 