import React, { useRef } from 'react';
import styled from 'styled-components';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import TikTokFoodCard from './TikTokFoodCard';

const Section = styled.section`
  padding: 4rem 0;
  width: 100%;
  position: relative;
  background: #f8f9fa;
  margin: 2rem 0;
`;

const SectionHeader = styled.div`
  max-width: 1200px;
  margin: 0 auto 2rem;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SectionSubtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
  max-width: 800px;
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const CarouselTrack = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1rem 2rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollButton = styled.button<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ direction }) => (direction === 'left' ? 'left: 1rem' : 'right: 1rem')};
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f0f0f0;
    transform: translateY(-50%) scale(1.1);
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const TikTokFoodSection: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const tiktokVideos = [
    {
      id: '1',
      title: 'Cloud Bread Grilled Cheese',
      tag: '#LazyLuxury',
      thumbnail: 'https://source.unsplash.com/random/400x600/?sandwich,cheese',
      recipe: [
        'Mix eggs, cream cheese, and sweetener',
        'Bake into cloud-like buns at 300°F for 25 mins',
        'Fill with cheese and grill until golden'
      ],
      videoUrl: 'https://www.tiktok.com/'
    },
    {
      id: '2',
      title: 'Sushi Bake',
      tag: '#GirlDinner',
      thumbnail: 'https://source.unsplash.com/random/400x600/?sushi',
      recipe: [
        'Mix cooked rice with rice vinegar',
        'Layer with crab mix and bake',
        'Top with spicy mayo and green onions'
      ],
      videoUrl: 'https://www.tiktok.com/'
    },
    {
      id: '3',
      title: 'Whipped Coffee',
      tag: '#MorningVibes',
      thumbnail: 'https://source.unsplash.com/random/400x600/?coffee',
      recipe: [
        'Whip instant coffee, sugar, and hot water',
        'Pour over iced milk',
        'Mix before drinking'
      ],
      videoUrl: 'https://www.tiktok.com/'
    },
    {
      id: '4',
      title: 'Baked Feta Pasta',
      tag: '#ViralFood',
      thumbnail: 'https://source.unsplash.com/random/400x600/?pasta',
      recipe: [
        'Bake feta and cherry tomatoes with olive oil',
        'Mix with cooked pasta',
        'Add fresh basil and black pepper'
      ],
      videoUrl: 'https://www.tiktok.com/'
    },
    {
      id: '5',
      title: 'Mini Pancake Cereal',
      tag: '#BreakfastGoals',
      thumbnail: 'https://source.unsplash.com/random/400x600/?pancakes',
      recipe: [
        'Make mini pancakes with pancake batter',
        'Cook in a pan until golden',
        'Serve in a bowl with milk and toppings'
      ],
      videoUrl: 'https://www.tiktok.com/'
    },
    {
      id: '6',
      title: 'Chocolate Mug Cake',
      tag: '#DessertForOne',
      thumbnail: 'https://source.unsplash.com/random/400x600/?chocolate',
      recipe: [
        'Mix flour, sugar, cocoa, and milk in a mug',
        'Microwave for 90 seconds',
        'Top with ice cream or whipped cream'
      ],
      videoUrl: 'https://www.tiktok.com/'
    },
    {
      id: '7',
      title: 'Viral Corn Ribs',
      tag: '#SummerEats',
      thumbnail: 'https://source.unsplash.com/random/400x600/?corn',
      recipe: [
        'Cut corn into rib-like pieces',
        'Season and bake until crispy',
        'Drizzle with spicy mayo and cheese'
      ],
      videoUrl: 'https://www.tiktok.com/'
    }
  ];

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>🧊 TikTok Viral Food Radar</SectionTitle>
        <SectionSubtitle>Discover the latest food trends taking over your FYP</SectionSubtitle>
      </SectionHeader>
      
      <CarouselContainer>
        <ScrollButton 
          direction="left" 
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <FiChevronLeft size={24} />
        </ScrollButton>
        
        <CarouselTrack ref={carouselRef}>
          {tiktokVideos.map((video) => (
            <TikTokFoodCard
              key={video.id}
              id={video.id}
              title={video.title}
              tag={video.tag}
              thumbnail={video.thumbnail}
              recipe={video.recipe}
              videoUrl={video.videoUrl}
            />
          ))}
        </CarouselTrack>
        
        <ScrollButton 
          direction="right" 
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <FiChevronRight size={24} />
        </ScrollButton>
      </CarouselContainer>
    </Section>
  );
};

export default TikTokFoodSection;
