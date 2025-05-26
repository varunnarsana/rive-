import styled from 'styled-components';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StyleGroup {
  id: string;
  name: string;
  description: string;
  image: string;
  members: number;
  category: string;
  isJoined: boolean;
  recentDiscussions: {
    id: string;
    user: {
      name: string;
      image: string;
    };
    text: string;
    timestamp: string;
    likes: number;
    replies: number;
  }[];
}

const GroupsContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(142, 107, 158, 0.1);
  border: 1px solid rgba(142, 107, 158, 0.1);
`;

const GroupsHeader = styled.div`
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

const GroupsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const GroupCard = styled.div`
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
`;

const GroupImage = styled.div<{ $image: string }>`
  width: 100%;
  height: 150px;
  background: url(${props => props.$image}) center/cover;
  position: relative;
`;

const GroupCategory = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  color: #8E6B9E;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
`;

const GroupContent = styled.div`
  padding: 1.5rem;
`;

const GroupName = styled.h3`
  margin: 0 0 0.5rem;
  color: #333;
  font-size: 1.2rem;
`;

const GroupDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 1rem;
  line-height: 1.5;
`;

const GroupStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const JoinButton = styled.button<{ $isJoined: boolean }>`
  width: 100%;
  padding: 1rem;
  border: none;
  background: ${props => props.$isJoined 
    ? 'rgba(142, 107, 158, 0.1)'
    : 'linear-gradient(to right, #8E6B9E, #4A3858)'};
  color: ${props => props.$isJoined ? '#8E6B9E' : 'white'};
  font-size: 1rem;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(142, 107, 158, 0.3);
  }
`;

const DiscussionsContainer = styled.div`
  margin-top: 1rem;
  border-top: 1px solid rgba(142, 107, 158, 0.1);
  padding-top: 1rem;
`;

const DiscussionItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(142, 107, 158, 0.1);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const DiscussionContent = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-weight: 500;
  color: #333;
  margin-bottom: 0.25rem;
`;

const DiscussionText = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const DiscussionMeta = styled.div`
  display: flex;
  gap: 1rem;
  color: #999;
  font-size: 0.8rem;

  span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
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

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  border: 1px solid rgba(142, 107, 158, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #8E6B9E;
  }
`;

export const StyleGroups = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [groups] = useState<StyleGroup[]>([
    {
      id: '1',
      name: 'Y2K Fashion Lovers',
      description: 'A community dedicated to celebrating and reviving Y2K fashion trends. Share your favorite looks, discuss vintage finds, and get inspired!',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
      members: 1234,
      category: 'Retro',
      isJoined: false,
      recentDiscussions: [
        {
          id: '1',
          user: {
            name: 'Sarah Anderson',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
          },
          text: 'Found this amazing butterfly top at a thrift store!',
          timestamp: '2h ago',
          likes: 45,
          replies: 12
        }
      ]
    },
    {
      id: '2',
      name: 'Dark Academia Aesthetic',
      description: 'For those who love the intellectual and moody vibes of dark academia. Share your scholarly outfits and discuss literature-inspired fashion.',
      image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc',
      members: 856,
      category: 'Academic',
      isJoined: true,
      recentDiscussions: [
        {
          id: '1',
          user: {
            name: 'Emily Chen',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
          },
          text: 'What are your favorite autumn layering pieces?',
          timestamp: '5h ago',
          likes: 32,
          replies: 8
        }
      ]
    }
  ]);

  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    category: ''
  });

  const handleCreateGroup = () => {
    // Here you would typically send the group to your backend
    console.log('Creating group:', newGroup);
    setIsCreateModalOpen(false);
    setNewGroup({
      name: '',
      description: '',
      category: ''
    });
  };

  const handleJoinGroup = (groupId: string) => {
    // Here you would typically send the join request to your backend
    console.log('Joining group:', groupId);
  };

  return (
    <GroupsContainer>
      <GroupsHeader>
        <Title>Style Groups</Title>
        <CreateButton onClick={() => setIsCreateModalOpen(true)}>
          <i className="fas fa-plus"></i>
          Create Group
        </CreateButton>
      </GroupsHeader>

      <GroupsGrid>
        {groups.map(group => (
          <GroupCard key={group.id}>
            <GroupImage $image={group.image}>
              <GroupCategory>{group.category}</GroupCategory>
            </GroupImage>
            <GroupContent>
              <GroupName>{group.name}</GroupName>
              <GroupDescription>{group.description}</GroupDescription>
              <GroupStats>
                <span>{group.members} members</span>
                <span>{group.recentDiscussions.length} discussions</span>
              </GroupStats>
              <JoinButton
                $isJoined={group.isJoined}
                onClick={() => handleJoinGroup(group.id)}
              >
                {group.isJoined ? 'Joined' : 'Join Group'}
              </JoinButton>

              <DiscussionsContainer>
                {group.recentDiscussions.map(discussion => (
                  <DiscussionItem key={discussion.id}>
                    <UserAvatar src={discussion.user.image} alt={discussion.user.name} />
                    <DiscussionContent>
                      <UserName>{discussion.user.name}</UserName>
                      <DiscussionText>{discussion.text}</DiscussionText>
                      <DiscussionMeta>
                        <span>{discussion.timestamp}</span>
                        <span>
                          <i className="fas fa-heart"></i>
                          {discussion.likes}
                        </span>
                        <span>
                          <i className="fas fa-comment"></i>
                          {discussion.replies}
                        </span>
                      </DiscussionMeta>
                    </DiscussionContent>
                  </DiscussionItem>
                ))}
              </DiscussionsContainer>
            </GroupContent>
          </GroupCard>
        ))}
      </GroupsGrid>

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
              <h2>Create New Group</h2>
              
              <Input
                placeholder="Group Name"
                value={newGroup.name}
                onChange={e => setNewGroup({ ...newGroup, name: e.target.value })}
              />
              
              <TextArea
                placeholder="Group Description"
                value={newGroup.description}
                onChange={e => setNewGroup({ ...newGroup, description: e.target.value })}
              />
              
              <Select
                value={newGroup.category}
                onChange={e => setNewGroup({ ...newGroup, category: e.target.value })}
              >
                <option value="">Select Category</option>
                <option value="Retro">Retro</option>
                <option value="Academic">Academic</option>
                <option value="Streetwear">Streetwear</option>
                <option value="Minimalist">Minimalist</option>
                <option value="Sustainable">Sustainable</option>
                <option value="Luxury">Luxury</option>
              </Select>
              
              <CreateButton
                onClick={handleCreateGroup}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Create Group
              </CreateButton>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </GroupsContainer>
  );
}; 