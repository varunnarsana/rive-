import styled from 'styled-components';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Story {
  id: string;
  user: {
    name: string;
    image: string;
  };
  image: string;
  timestamp: string;
}

const StoriesContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(142, 107, 158, 0.1);
  border: 1px solid rgba(142, 107, 158, 0.1);
`;

const StoriesScroll = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 0.5rem;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const StoryRing = styled.div<{ $isViewed?: boolean }>`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  padding: 3px;
  background: ${props => props.$isViewed 
    ? '#ddd'
    : 'linear-gradient(45deg, #8E6B9E, #4A3858)'};
`;

const StoryImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
`;

const StoryUsername = styled.span`
  font-size: 0.8rem;
  color: #666;
  max-width: 70px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AddStoryButton = styled.button`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: none;
  background: rgba(142, 107, 158, 0.1);
  color: #8E6B9E;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(142, 107, 158, 0.2);
  }
`;

const StoryModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const StoryContent = styled(motion.div)`
  position: relative;
  max-width: 400px;
  width: 100%;
  height: 700px;
`;

const StoryImage2 = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

const StoryHeader = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StoryUserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid white;
`;

const StoryUserInfo = styled.div`
  flex: 1;
  color: white;
`;

const StoryUserName = styled.div`
  font-weight: 500;
`;

const StoryTimestamp = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
`;

const ProgressBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  overflow: hidden;
`;

const Progress = styled(motion.div)`
  height: 100%;
  background: white;
`;

export const Stories = () => {
  const [stories] = useState<Story[]>([
    {
      id: '1',
      user: {
        name: 'Sarah Anderson',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
      },
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
      timestamp: '2h ago'
    },
    {
      id: '2',
      user: {
        name: 'Emily Chen',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
      },
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
      timestamp: '3h ago'
    },
    {
      id: '3',
      user: {
        name: 'Alex Morgan',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'
      },
      image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc',
      timestamp: '5h ago'
    }
  ]);

  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [viewedStories, setViewedStories] = useState<Set<string>>(new Set());

  const handleStoryClick = (story: Story) => {
    setSelectedStory(story);
    setViewedStories(new Set([...viewedStories, story.id]));
  };

  return (
    <>
      <StoriesContainer>
        <StoriesScroll>
          <StoryItem>
            <AddStoryButton>
              <i className="fas fa-plus"></i>
            </AddStoryButton>
            <StoryUsername>Add Story</StoryUsername>
          </StoryItem>

          {stories.map(story => (
            <StoryItem key={story.id} onClick={() => handleStoryClick(story)}>
              <StoryRing $isViewed={viewedStories.has(story.id)}>
                <StoryImage src={story.user.image} alt={story.user.name} />
              </StoryRing>
              <StoryUsername>{story.user.name}</StoryUsername>
            </StoryItem>
          ))}
        </StoriesScroll>
      </StoriesContainer>

      <AnimatePresence>
        {selectedStory && (
          <StoryModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStory(null)}
          >
            <StoryContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <ProgressBar>
                <Progress
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                  onAnimationComplete={() => setSelectedStory(null)}
                />
              </ProgressBar>

              <StoryHeader>
                <StoryUserImage
                  src={selectedStory.user.image}
                  alt={selectedStory.user.name}
                />
                <StoryUserInfo>
                  <StoryUserName>{selectedStory.user.name}</StoryUserName>
                  <StoryTimestamp>{selectedStory.timestamp}</StoryTimestamp>
                </StoryUserInfo>
                <CloseButton onClick={() => setSelectedStory(null)}>
                  ×
                </CloseButton>
              </StoryHeader>

              <StoryImage2 src={selectedStory.image} alt="Story" />
            </StoryContent>
          </StoryModal>
        )}
      </AnimatePresence>
    </>
  );
}; 