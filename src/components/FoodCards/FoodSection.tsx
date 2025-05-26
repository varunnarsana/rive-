import React from 'react';
import styled from 'styled-components';
import FoodCard from './FoodCard';

const Section = styled.section`
  padding: 4rem 0;
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #1a1a1a;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #ff6b6b, #feca57);
    border-radius: 3px;
  }
`;

const Subtitle = styled.p`
  text-align: center;
  color: #666;
  max-width: 800px;
  margin: 0 auto 3rem;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const FoodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
`;

const foodItems = [
  {
    id: 1,
    title: 'Coquette Breakfast',
    description: 'Iced latte with lavender syrup & a pistachio croissant',
    aesthetic: 'Coquette',
    image: 'https://source.unsplash.com/random/600x800/?breakfast,pastry',
    filter: 'brightness(0.95) contrast(1.1) saturate(1.2)'
  },
  {
    id: 2,
    title: 'Dark Academia Dinner',
    description: 'Wine, beetroot risotto, candlelight, and cello in the background',
    aesthetic: 'Dark Academia',
    image: 'https://source.unsplash.com/random/600x800/?risotto,fine-dining',
    filter: 'sepia(0.3) contrast(1.1) brightness(0.9)'
  },
  {
    id: 3,
    title: 'Coastal Grandmother Lunch',
    description: 'Aperol spritz with a fresh seafood tower and herb salad',
    aesthetic: 'Coastal Grandmother',
    image: 'https://source.unsplash.com/random/600x800/?seafood,beach',
    filter: 'brightness(1.05) contrast(1.05) saturate(1.1)'
  },
  {
    id: 4,
    title: 'Goblincore Snack',
    description: 'Mushroom toast with foraged herbs and edible flowers',
    aesthetic: 'Goblincore',
    image: 'https://source.unsplash.com/random/600x800/?mushroom,forest',
    filter: 'saturate(1.3) contrast(1.1)'
  },
  {
    id: 5,
    title: 'Librarian\'s Tea Time',
    description: 'Earl Grey with honey, scones, and a side of poetry',
    aesthetic: 'Dark Academia',
    image: 'https://source.unsplash.com/random/600x800/?tea,books',
    filter: 'sepia(0.2) contrast(1.1) brightness(0.95)'
  },
  {
    id: 6,
    title: 'Neon Diner',
    description: 'Matcha soft serve with popping candy in a black sesame cone',
    aesthetic: 'Neon Punk',
    image: 'https://source.unsplash.com/random/600x800/?dessert,neon',
    filter: 'saturate(1.5) contrast(1.2) brightness(0.95)'
  }
];

const FoodSection: React.FC = () => {
  return (
    <Section>
      <SectionTitle>🍽️ TRENDING FOOD — The Posh Way</SectionTitle>
      <Subtitle>"Not just what's hot — but what's being plated in stories, songs, and soft lighting."</Subtitle>
      
      <h3 style={{
        textAlign: 'center',
        marginBottom: '2rem',
        fontSize: '1.5rem',
        color: '#444',
        fontStyle: 'italic'
      }}>Plates by Aesthetic</h3>
      
      <FoodGrid>
        {foodItems.map((food) => (
          <FoodCard
            key={food.id}
            title={food.title}
            description={food.description}
            aesthetic={food.aesthetic}
            image={food.image}
            filter={food.filter}
          />
        ))}
      </FoodGrid>
    </Section>
  );
};

export default FoodSection;
