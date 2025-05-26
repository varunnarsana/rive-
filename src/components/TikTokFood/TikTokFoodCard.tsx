import React from 'react';
import styled from 'styled-components';

interface TikTokFoodCardProps {
  id: string;
  title: string;
  tag: string;
  thumbnail: string;
  recipe: string[];
  videoUrl: string;
}

const Card = styled.div`
  position: relative;
  width: 280px;
  height: 380px;
  border-radius: 16px;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background: white;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    
    .recipe-overlay {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const Thumbnail = styled.div<{ image: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  svg {
    width: 24px;
    height: 24px;
    margin-left: 4px;
    fill: #FF2D55;
  }
  
  ${Card}:hover & {
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

const Content = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
`;

const Tag = styled.span`
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const RecipeOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(5px);
  color: white;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
`;

const RecipeTitle = styled.h4`
  font-size: 1.1rem;
  margin: 0 0 1rem;
  color: #FF2D55;
`;

const RecipeList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const RecipeItem = styled.li`
  margin-bottom: 0.75rem;
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.4;
  font-size: 0.95rem;
  
  &::before {
    content: '•';
    color: #FF2D55;
    font-size: 1.5rem;
    position: absolute;
    left: 0;
    top: -0.25rem;
  }
`;

const TikTokFoodCard: React.FC<TikTokFoodCardProps> = ({
  title,
  tag,
  thumbnail,
  recipe,
  videoUrl
}) => {
  return (
    <Card onClick={() => window.open(videoUrl, '_blank')}>
      <Thumbnail image={thumbnail}>
        <PlayButton>
          <svg viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </PlayButton>
        
        <Content>
          <Title>{title}</Title>
          <Tag>{tag}</Tag>
        </Content>
        
        <RecipeOverlay className="recipe-overlay">
          <RecipeTitle>Quick Recipe</RecipeTitle>
          <RecipeList>
            {recipe.map((step, index) => (
              <RecipeItem key={index}>{step}</RecipeItem>
            ))}
          </RecipeList>
        </RecipeOverlay>
      </Thumbnail>
    </Card>
  );
};

export default TikTokFoodCard;
