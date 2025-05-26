import styled from 'styled-components';

interface FoodCardProps {
  image: string;
  title: string;
  description: string;
  aesthetic: string;
  filter: string;
}

const Card = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    
    .food-image {
      transform: scale(1.05);
    }
    
    .food-overlay {
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.8) 0%,
        rgba(0, 0, 0, 0.5) 50%,
        rgba(0, 0, 0, 0.3) 100%
      );
    }
  }
`;

const FoodImage = styled.div<{ image: string; filter: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
  filter: ${props => props.filter};
`;

const FoodOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    transparent 100%
  );
  color: white;
  transition: all 0.3s ease;
`;

const AestheticBadge = styled.span`
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-bottom: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 0.5rem;
  font-weight: 600;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const Description = styled.p`
  margin: 0;
  font-size: 1rem;
  opacity: 0.9;
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const FoodCard: React.FC<FoodCardProps> = ({
  image,
  title,
  description,
  aesthetic,
  filter
}) => {
  return (
    <Card>
      <FoodImage 
        className="food-image"
        image={image}
        filter={filter}
      />
      <FoodOverlay className="food-overlay">
        <AestheticBadge>{aesthetic}</AestheticBadge>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </FoodOverlay>
    </Card>
  );
};

export default FoodCard;
