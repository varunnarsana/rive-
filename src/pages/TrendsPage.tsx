import React, { useState, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { useTheme } from '../context/ThemeContext';

type TrendRating = 'obsessed' | 'cool' | 'neutral' | 'not';

interface Metrics {
  views: number;
  likes: number;
  rating: number;
  ratingCount: number;
}

interface Comment {
  id: string;
  user: string;
  avatar: string;
  content: string;
  timestamp: string;
}

interface TrendingItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  metrics: Metrics;
  relatedTrends: string[];
  comments: Comment[];
  aesthetic: string;
}

interface Aesthetic {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

interface Category {
  id: string;
  name: string;
  trends: TrendingItem[];
  description: string;
}

interface MockData {
  trendingItems: TrendingItem[];
  categories: Category[];
  aesthetics: Aesthetic[];
  selectedTrend: TrendingItem | null;
}

const initialTrendingItems: TrendingItem[] = [
  {
    id: "1",
    title: "Y2K Revival",
    description: "The return of millennium-era fashion and aesthetics, bringing back the iconic styles of the 2000s with a modern twist. Platform shoes, crop tops, and metallic fabrics are making a huge comeback.",
    imageUrl: "https://via.placeholder.com/400",
    category: "Fashion",
    aesthetic: "y2k",
    metrics: {
      views: 15000,
      likes: 1200,
      rating: 4.5,
      ratingCount: 280
    },
    relatedTrends: ["2", "3"],
    comments: [
      {
        id: "1",
        user: "@fashionista",
        avatar: "https://via.placeholder.com/40",
        content: "Love this aesthetic! Bringing back the best of the 90s.",
        timestamp: "2025-05-25T20:00:00"
      }
    ]
  },
  {
    id: "2",
    title: "Dark Academia",
    description: "A romantic take on the scholarly aesthetic, featuring tweed blazers, vintage books, and a moody color palette. This trend celebrates the pursuit of knowledge and classical beauty.",
    imageUrl: "https://via.placeholder.com/400",
    category: "Aesthetic",
    aesthetic: "dark-academia",
    metrics: {
      views: 12000,
      likes: 950,
      rating: 4.2,
      ratingCount: 180
    },
    relatedTrends: ["1", "3"],
    comments: []
  },
  {
    id: "3",
    title: "Cyberpunk",
    description: "A futuristic blend of high-tech and street culture, characterized by neon colors, metallic textures, and edgy fashion choices. This aesthetic explores themes of technology and rebellion.",
    imageUrl: "https://via.placeholder.com/400",
    category: "Art",
    aesthetic: "cyberpunk",
    metrics: {
      views: 18000,
      likes: 1500,
      rating: 4.8,
      ratingCount: 320
    },
    relatedTrends: ["1", "2"],
    comments: []
  }
];

const mockData: MockData = {
  trendingItems: initialTrendingItems,
  categories: [
    {
      id: "1",
      name: "Fashion",
      description: "Latest trends in clothing, accessories, and style",
      trends: [initialTrendingItems[0]]
    },
    {
      id: "2",
      name: "Aesthetic",
      description: "Visual styles and cultural movements",
      trends: [initialTrendingItems[1]]
    },
    {
      id: "3",
      name: "Art",
      description: "Creative expressions and artistic movements",
      trends: [initialTrendingItems[2]]
    }
  ],
  aesthetics: [
    {
      id: "1",
      name: "Y2K",
      imageUrl: "https://via.placeholder.com/200",
      description: "Millennium-era fashion and pop culture"
    },
    {
      id: "2",
      name: "Dark Academia",
      imageUrl: "https://via.placeholder.com/200",
      description: "Scholarly and vintage-inspired aesthetic"
    },
    {
      id: "3",
      name: "Cyberpunk",
      imageUrl: "https://via.placeholder.com/200",
      description: "Futuristic and high-tech street style"
    }
  ],
  selectedTrend: null
};

// Initialize categories with trends
mockData.categories[0].trends.push(mockData.trendingItems[0]);
mockData.categories[1].trends.push(mockData.trendingItems[1]);
mockData.categories[2].trends.push(mockData.trendingItems[2]);



const themeStyles = css<{ themeMode: 'light' | 'dark' }>`
  ${(props) => props.themeMode === 'dark' && css`
    background-color: #1f2937;
    color: #f3f4f6;
  `}
  ${(props) => props.themeMode === 'light' && css`
    background-color: #f3f4f6;
    color: #1f2937;
  `}
`;

const Container = styled.div<{ themeMode: 'light' | 'dark' }>`
  min-height: 100vh;
  transition: all 0.2s;
  ${themeStyles}
`;

const PageContent = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 4rem;
`;

const MainTitle = styled.h1`
  font-family: 'Georgia', serif;
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${props => props.theme.mode === 'dark' ? '#f3f4f6' : '#1f2937'};
`;

const Tagline = styled.p`
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 1.25rem;
  color: ${props => props.theme.mode === 'dark' ? '#d1d5db' : '#6b7280'};
  margin-bottom: 2rem;
`;

const TrendCarousel = styled.div`
  margin-bottom: 4rem;
  overflow: hidden;
`;

const CarouselTrack = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1rem;
`;


`;


`;


`;


`;

const TrendDescription = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.mode === 'dark' ? '#d1d5db' : '#6b7280'};
  margin-bottom: 1rem;
`;


`;

const FilterSection = styled.section`
  margin-bottom: 3rem;
  padding: 2rem;
  background: ${props => props.theme.mode === 'dark' ? '#111827' : '#ffffff'};
  border-radius: 1rem;
`;

const FilterTitle = styled.h2`
  font-family: 'Georgia', serif;
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.mode === 'dark' ? '#f3f4f6' : '#1f2937'};
`;


`;


`;


`;


`;


`;

const RatingTitle = styled.h3`
  font-family: 'Georgia', serif;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.mode === 'dark' ? '#f3f4f6' : '#1f2937'};
`;


`;


`;


`;

const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;


`;

const CommentAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const CommentContent = styled.div`
  flex: 1;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const CommentAuthor = styled.span`
  font-weight: 600;
  color: ${props => props.theme.mode === 'dark' ? '#f3f4f6' : '#1f2937'};
`;

const CommentTime = styled.span`
  font-size: 0.875rem;
  color: ${props => props.theme.mode === 'dark' ? '#9ca3af' : '#6b7280'};
`;

const CommentText = styled.p`
  color: ${props => props.theme.mode === 'dark' ? '#d1d5db' : '#4b5563'};
`;

const CommentForm = styled.form`
  margin-top: 1.5rem;
`;

const CommentInput = styled.textarea`
  width: 100%;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid ${props => props.theme.mode === 'dark' ? '#374151' : '#e5e7eb'};
  background: ${props => props.theme.mode === 'dark' ? '#1f2937' : '#ffffff'};
  color: ${props => props.theme.mode === 'dark' ? '#f3f4f6' : '#1f2937'};
  resize: vertical;
  min-height: 100px;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #f59e0b;
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  background: #f59e0b;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #d97706;
  }

  &:disabled {
    background: #d1d5db;
    cursor: not-allowed;
  }
`;


`;

const Heading = styled.h1`
  font-family: 'Georgia', serif;
  font-size: 3rem;
  line-height: 1.2;
`;

const Subheading = styled.p`
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 1.25rem;
  color: ${(props) => props.themeMode === 'dark' ? '#d1d5db' : '#6b7280'};
  margin-top: 0.5rem;
`;

const FilterButton = styled.button<{ themeMode: 'light' | 'dark' }>`
  background: none;
  border: 1px solid ${(props) => props.themeMode === 'dark' ? '#d1d5db' : '#6b7280'};
  color: ${(props) => props.themeMode === 'dark' ? '#d1d5db' : '#6b7280'};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-family: 'Helvetica Neue', sans-serif;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.themeMode === 'dark' ? '#2d3748' : '#f7fafc'};
  }
`;

const TrendCard = styled.div<{ themeMode: 'light' | 'dark' }>`
  background-color: ${(props) => props.themeMode === 'dark' ? '#111827' : '#ffffff'};
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const TrendImage = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
    padding: 1rem;
  }
`;


`;

const TrendTitle = styled.h2`
  font-family: 'Georgia', serif;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const TrendMetrics = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.themeMode === 'dark' ? '#d1d5db' : '#6b7280'};
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const CategorySection = styled.div`
  margin-bottom: 3rem;
`;

const CategoryTitle = styled.h3`
  font-family: 'Georgia', serif;
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;


  margin-top: 1rem;
`;

const AestheticCard = styled.div<{ selected?: boolean }>`
  border: 2px solid ${(props) => props.selected ? '#f59e0b' : 'transparent'};
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.02);
  }
`;


`;

const AestheticName = styled.p`
  text-align: center;
  margin-top: 0.5rem;
  font-family: 'Helvetica Neue', sans-serif;
`;

const ViewAllButton = styled.button<{ themeMode: 'light' | 'dark' }>`
  background: none;
  border: 1px solid ${(props) => props.themeMode === 'dark' ? '#d1d5db' : '#6b7280'};
  color: ${(props) => props.themeMode === 'dark' ? '#d1d5db' : '#6b7280'};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-family: 'Helvetica Neue', sans-serif;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.themeMode === 'dark' ? '#2d3748' : '#f7fafc'};
  }
`;

const RatingWidget = styled.div<{ themeMode: 'light' | 'dark' }>`
  background-color: ${(props) => props.themeMode === 'dark' ? '#111827' : '#ffffff'};
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const RatingOptions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const RatingButton = styled.button<{ selected?: boolean }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  background: ${(props) => props.selected ? '#f59e0b' : 'transparent'};
  color: ${(props) => props.selected ? '#ffffff' : '#374151'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.selected ? '#f59e0b' : '#f3f4f6'};
  }
`;

const CommentsSection = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${(props) => props.themeMode === 'dark' ? '#374151' : '#e5e7eb'};
`;

const CommentCard = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: ${(props) => props.themeMode === 'dark' ? '#1f2937' : '#f3f4f6'};
  border-radius: 0.5rem;
`;


  resize: vertical;
  min-height: 80px;
`;

const CommentActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const CommentButton = styled.button<{ themeMode: 'light' | 'dark' }>`
  background-color: ${(props) => props.themeMode === 'dark' ? '#1f2937' : '#ffffff'};
  color: ${(props) => props.themeMode === 'dark' ? '#f3f4f6' : '#1f2937'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.themeMode === 'dark' ? '#2d3748' : '#f7fafc'};
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ItemTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ItemDescription = styled.p<{ themeMode: 'light' | 'dark' }>`
  color: ${(props) => props.themeMode === 'dark' ? '#d1d5db' : '#6b7280'};
  margin-bottom: 1rem;
`;

const MetricsContainer = styled.div<{ themeMode: 'light' | 'dark' }>`
  display: flex;
  justify-content: space-between;
const TrendsPage: React.FC = () => {
  const { themeMode } = useTheme();
  const [selectedAesthetic, setSelectedAesthetic] = useState<string | null>(null);
  const [selectedTrend, setSelectedTrend] = useState<TrendingItem | null>(null);
  const [newComment, setNewComment] = useState("");
  const [userRating, setUserRating] = useState<string | null>(null);

  const filteredTrends = useMemo(() => {
    return selectedAesthetic
      ? mockData.trendingItems.filter(trend => trend.aesthetic === selectedAesthetic)
      : mockData.trendingItems;
  }, [selectedAesthetic]);

  const handleAestheticSelect = (aesthetic: string) => {
    setSelectedAesthetic(prev => prev === aesthetic ? null : aesthetic);
    // Logic to rate the trend
    console.log('Rated trend:', rating);
  };

  const handleSubmitComment = () => {
    if (selectedTrend && newComment.trim()) {
      // Logic to submit comment
      console.log('Submitted comment:', newComment);
      setNewComment('');
    }
  };

  return (
    <Container themeMode={themeMode}>
      <PageContent>
        <Header>
          <div>
            <Heading>Trends</Heading>
            <Subheading>Explore What's Shaping Culture.</Subheading>
          </div>
          <FilterButton onClick={() => console.log('Filter clicked')} themeMode={themeMode}>
            Filter by Aesthetic
          </FilterButton>
        </Header>

        {/* Top Trending Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {mockData.trendingItems.slice(0, 3).map((trend) => (
            <TrendCard key={trend.id} themeMode={themeMode}>
              <TrendImage>
                <img src={trend.imageUrl} alt={trend.title} />
                <div className="overlay">
                  <TrendTitle>{trend.title}</TrendTitle>
                </div>
              </TrendImage>
              <TrendInfo>
                <TrendMetrics>
                  <span>Views: {trend.metrics.views}</span>
                  <span>Likes: {trend.metrics.likes}</span>
                </TrendMetrics>
              </TrendInfo>
            </TrendCard>
          ))}
        </div>

        {/* Categories Section */}
        {mockData.categories.map((category) => (
          <CategorySection key={category.id}>
            <CategoryTitle>{category.name}</CategoryTitle>
            <CategoryGrid>
              {category.trends.map((trend) => (
                <TrendCard
                  key={trend.id}
                  themeMode={themeMode}
                  onClick={() => setSelectedTrend(trend)}
                >
                  <TrendImage>
                    <img src={trend.imageUrl} alt={trend.title} />
                    <div className="overlay">
                      <TrendTitle>{trend.title}</TrendTitle>
                    </div>
                  </TrendImage>
                  <TrendInfo>
                    <TrendMetrics>
                      <span>Views: {trend.metrics.views}</span>
                      <span>Likes: {trend.metrics.likes}</span>
                    </TrendMetrics>
                  </TrendInfo>
                </TrendCard>
              ))}
            </CategoryGrid>
            <ViewAllButton themeMode={themeMode}>View All</ViewAllButton>
          </CategorySection>
        ))}

        {/* Aesthetic Filter Section */}
        <div className="mt-8">
          <h2 className="font-bold text-2xl mb-4">Filter by Aesthetic</h2>
          <AestheticGrid>
            {mockData.aesthetics.map((aesthetic) => (
              <AestheticCard
                key={aesthetic.id}
                selected={selectedAesthetics.includes(aesthetic.id)}
                onClick={() => handleAestheticSelect(aesthetic.id)}
              >
                <AestheticImage src={aesthetic.imageUrl} alt={aesthetic.name} />
                <AestheticName>{aesthetic.name}</AestheticName>
              </AestheticCard>
            ))}
          </AestheticGrid>
        </div>

        {/* Trend Detail Section */}
        {selectedTrend && (
          <div className="mt-8">
            <TrendCard themeMode={themeMode}>
              <TrendImage>
                <img src={selectedTrend.imageUrl} alt={selectedTrend.title} />
              </TrendImage>
              <TrendInfo>
                <TrendTitle>{selectedTrend.title}</TrendTitle>
                <p className="mt-2">{selectedTrend.description}</p>
                
                {/* Rating Widget */}
                <RatingWidget themeMode={themeMode}>
                  <h3>What's Your Take?</h3>
                  <RatingOptions>
                    <RatingButton onClick={() => handleRateTrend(5)}>
                      Obsessed
                    </RatingButton>
                    <RatingButton onClick={() => handleRateTrend(3)}>
                      Cool
                    </RatingButton>
                    <RatingButton onClick={() => handleRateTrend(1)}>
                      Not
                    </RatingButton>
                  </RatingOptions>
                </RatingWidget>

                {/* Comments Section */}
                <CommentsSection>
                  <h3>Comments</h3>
                  {selectedTrend.comments.map((comment) => (
                    <CommentCard key={comment.id}>
                      <div className="flex-shrink-0">
                        <img
                          src="https://via.placeholder.com/40"
                          alt="User"
                          className="w-10 h-10 rounded-full"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{comment.user}</div>
                        <p>{comment.content}</p>
                      </div>
                    </CommentCard>
                  ))}
                  
                  <div className="mt-4">
                    <CommentInput
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add your comment..."
                    />
                    <CommentActions>
                      <CommentButton
                        onClick={handleSubmitComment}
                        themeMode={themeMode}
                        disabled={!newComment.trim()}
                      >
                        Post Comment
                      </CommentButton>
                    </CommentActions>
                  </div>
                </CommentsSection>
              </TrendInfo>
            </TrendCard>
          </div>
        )}
      </PageContent>
    </Container>
  );
};

export default TrendsPage;