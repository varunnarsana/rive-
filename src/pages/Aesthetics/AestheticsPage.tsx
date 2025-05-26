import styled from 'styled-components';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AestheticDetailView } from '../../components/Aesthetics/AestheticDetailView';
import { aestheticsDetailData } from '../../data/aestheticsDetailData';

interface Aesthetic {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  keyElements: string[];
  colorPalette: string[];
  musicGenres?: string[];
  fashionItems?: string[];
  popularHashtags: string[];
  relatedAesthetics: string[];
}

interface AestheticCategory {
  id: string;
  name: string;
  description: string;
  aesthetics: Aesthetic[];
}

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 80px auto 0;
  padding: 2rem;
`;

const Header = styled.header`
  margin-bottom: 3rem;
  text-align: center;
  background: linear-gradient(135deg, rgba(142, 107, 158, 0.05) 0%, rgba(74, 56, 88, 0.05) 100%);
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(142, 107, 158, 0.1);
  border: 1px solid rgba(142, 107, 158, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(120deg, #8E6B9E, #4A3858);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const CategorySection = styled.section`
  margin-bottom: 3rem;
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(142, 107, 158, 0.1);
  border: 1px solid rgba(142, 107, 158, 0.1);
`;

const CategoryTitle = styled.h2`
  color: #333;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid rgba(142, 107, 158, 0.2);
  padding-bottom: 0.5rem;
  background: linear-gradient(120deg, #8E6B9E, #4A3858);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CategoryDescription = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const AestheticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const AestheticCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(142, 107, 158, 0.1);
  border: 1px solid rgba(142, 107, 158, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(142, 107, 158, 0.2);
    border-color: rgba(142, 107, 158, 0.3);
  }
`;

const AestheticImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const AestheticContent = styled.div`
  padding: 1.5rem;
`;

const AestheticName = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(120deg, #8E6B9E, #4A3858);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
`;

const AestheticDescription = styled.p`
  color: #666;
  font-size: 1rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const ElementsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

const ElementItem = styled.li`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  
  &:before {
    content: "•";
    color: #8E6B9E;
    margin-right: 0.5rem;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Tag = styled.span`
  background: rgba(142, 107, 158, 0.1);
  color: #8E6B9E;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(142, 107, 158, 0.2);
  }
`;

const aestheticsData: AestheticCategory[] = [
  {
    id: 'academia',
    name: 'Academia',
    description: 'Aesthetics inspired by academic pursuits, scholarly activities, and the romanticization of learning.',
    aesthetics: [
      {
        id: 'dark-academia',
        name: 'Dark Academia',
        description: 'A gothic-inspired aesthetic that romanticizes classical literature, art, and learning.',
        imageUrl: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc',
        keyElements: ['Vintage books', 'Tweed blazers', 'Oxford shoes', 'Library settings'],
        colorPalette: ['#2B2B2B', '#483C32', '#6B4423', '#8B7355'],
        musicGenres: ['Classical', 'Piano sonatas', 'Baroque'],
        fashionItems: ['Turtlenecks', 'Plaid skirts', 'Leather satchels'],
        popularHashtags: ['#darkacademia', '#academicaesthetic', '#classicalliterature'],
        relatedAesthetics: ['Light Academia', 'Romantic Academia', 'Gothic']
      },
      {
        id: 'light-academia',
        name: 'Light Academia',
        description: 'A softer, brighter version of academia aesthetic focusing on the joy of learning.',
        imageUrl: 'https://images.unsplash.com/photo-1513077202514-c511b41bd4c7',
        keyElements: ['Natural light', 'White marble', 'Fresh flowers', 'Cream-colored books'],
        colorPalette: ['#F5F5F5', '#E8DFD8', '#B7B7A4', '#A5A58D'],
        musicGenres: ['Classical', 'Chamber music', 'Soft instrumental'],
        fashionItems: ['Beige sweaters', 'White blouses', 'Linen pants'],
        popularHashtags: ['#lightacademia', '#softacademic', '#academialife'],
        relatedAesthetics: ['Dark Academia', 'Romantic Academia', 'Cottagecore']
      }
    ]
  },
  {
    id: 'nostalgic',
    name: 'Nostalgic',
    description: 'Aesthetics that draw inspiration from past decades and cultural movements.',
    aesthetics: [
      {
        id: 'y2k',
        name: 'Y2K',
        description: 'A revival of late 90s and early 2000s fashion and pop culture.',
        imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
        keyElements: ['Platform shoes', 'Crop tops', 'Butterfly motifs', 'Metallic fabrics'],
        colorPalette: ['#FF69B4', '#87CEEB', '#9370DB', '#FFD700'],
        musicGenres: ['Pop', 'R&B', 'Hip-hop'],
        fashionItems: ['Cargo pants', 'Baby tees', 'Mini skirts'],
        popularHashtags: ['#y2k', '#y2kaesthetic', '#2000sfashion'],
        relatedAesthetics: ['Cyber Y2K', 'McBling', 'Bubblegum Pop']
      },
      {
        id: 'kidcore',
        name: 'Kidcore',
        description: 'An aesthetic centered around childhood nostalgia and playful elements.',
        imageUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088',
        keyElements: ['Rainbow colors', 'Stickers', 'Toys', 'Cartoons'],
        colorPalette: ['#FF0000', '#FFD700', '#00FF00', '#4169E1'],
        musicGenres: ['Pop', "Children's music", 'Video game soundtracks'],
        fashionItems: ['Overalls', 'Colorful socks', 'Graphic tees'],
        popularHashtags: ['#kidcore', '#nostalgia', '#childhood'],
        relatedAesthetics: ['Rainbowcore', 'Toycore', 'Cartooncore']
      }
    ]
  },
  {
    id: 'nature',
    name: 'Nature-Inspired',
    description: 'Aesthetics that celebrate the natural world and sustainable living.',
    aesthetics: [
      {
        id: 'cottagecore',
        name: 'Cottagecore',
        description: 'A romanticization of rural life and traditional skills.',
        imageUrl: 'https://images.unsplash.com/photo-1595781572981-d63151b232ed',
        keyElements: ['Floral prints', 'Gardens', 'Vintage kitchenware', 'Handmade items'],
        colorPalette: ['#F5E6D3', '#E6B8A2', '#9B6B43', '#7A8C5C'],
        musicGenres: ['Folk', 'Acoustic', 'Classical'],
        fashionItems: ['Prairie dresses', 'Straw hats', 'Aprons'],
        popularHashtags: ['#cottagecore', '#cottagestyle', '#rurallife'],
        relatedAesthetics: ['Farmcore', 'Grandmacore', 'Fairycore']
      },
      {
        id: 'goblincore',
        name: 'Goblincore',
        description: 'An aesthetic celebrating the chaotic and overlooked aspects of nature.',
        imageUrl: 'https://images.unsplash.com/photo-1520262454473-a1a82276a574',
        keyElements: ['Mushrooms', 'Moss', 'Shiny objects', 'Forest findings'],
        colorPalette: ['#4A5D23', '#6B4423', '#8B7355', '#2F4F4F'],
        musicGenres: ['Folk', 'Celtic', 'Nature sounds'],
        fashionItems: ['Earth-toned clothing', 'Layered textures', 'Natural jewelry'],
        popularHashtags: ['#goblincore', '#forestcore', '#mushrooms'],
        relatedAesthetics: ['Crowcore', 'Mosscore', 'Fairycore']
      }
    ]
  },
  {
    id: 'futuristic',
    name: 'Futuristic',
    description: 'Aesthetics that embrace technology, innovation, and future possibilities.',
    aesthetics: [
      {
        id: 'cyberpunk',
        name: 'Cyberpunk',
        description: 'A high-tech, low-life aesthetic mixing advanced technology with urban decay.',
        imageUrl: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03',
        keyElements: ['Neon lights', 'Urban landscapes', 'Digital elements', 'Metallic textures'],
        colorPalette: ['#FF00FF', '#00FFFF', '#FF0000', '#000000'],
        musicGenres: ['Synthwave', 'Electronic', 'Industrial'],
        fashionItems: ['Platform boots', 'Mesh tops', 'LED accessories'],
        popularHashtags: ['#cyberpunk', '#cyberfashion', '#neonvibes'],
        relatedAesthetics: ['Vaporwave', 'Synthwave', 'Techwear']
      },
      {
        id: 'solarpunk',
        name: 'Solarpunk',
        description: 'An optimistic vision of the future combining technology with environmental harmony.',
        imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc',
        keyElements: ['Solar panels', 'Vertical gardens', 'Sustainable tech', 'Natural light'],
        colorPalette: ['#78A161', '#F0DE36', '#88B06A', '#C5E384'],
        musicGenres: ['Electronic', 'World music', 'Ambient'],
        fashionItems: ['Flowing fabrics', 'Natural dyes', 'Upcycled materials'],
        popularHashtags: ['#solarpunk', '#sustainablefuture', '#ecofuturism'],
        relatedAesthetics: ['Lunarpunk', 'Naturepunk', 'Hopepunk']
      }
    ]
  }
];

// Example detailed data for Dark Academia
const darkAcademiaDetail = {
  name: 'Dark Academia',
  description: 'A gothic-inspired aesthetic that romanticizes classical literature, art, and learning, emphasizing the pursuit of knowledge and the beauty in the darker aspects of academic life.',
  personality: {
    description: 'Those drawn to Dark Academia tend to be introspective, passionate about learning, and have a romantic view of intellectual pursuits. They value depth in conversations and experiences, finding beauty in melancholy and the pursuit of knowledge.',
    traits: [
      'Intellectual curiosity',
      'Romantic perspective',
      'Appreciation for classics',
      'Introspective nature',
      'Poetic mindset',
      'Detail-oriented',
      'Deep thinker'
    ]
  },
  music: {
    songs: [
      {
        title: 'Nocturnes, Op. 9: No. 2 in E-Flat Major',
        artist: 'Chopin',
        imageUrl: '/images/dark-academia/music/chopin.jpg'
      },
      {
        title: 'Winter Wind Etude',
        artist: 'Chopin',
        imageUrl: '/images/dark-academia/music/winter-wind.jpg'
      },
      {
        title: 'Symphony No. 5',
        artist: 'Beethoven',
        imageUrl: '/images/dark-academia/music/beethoven.jpg'
      }
    ],
    playlists: [
      'Classical Study Sessions',
      'Dark Academia Ambiance',
      'Romantic Era Classics'
    ],
    artists: [
      {
        name: 'Mozart',
        imageUrl: '/images/dark-academia/artists/mozart.jpg',
        description: 'Classical period composer known for emotional depth'
      }
    ]
  },
  fashion: {
    outfits: [
      {
        imageUrl: '/images/dark-academia/fashion/outfit1.jpg',
        description: 'Tweed blazer with wool trousers and Oxford shoes'
      },
      {
        imageUrl: '/images/dark-academia/fashion/outfit2.jpg',
        description: 'Turtleneck sweater with plaid skirt and leather satchel'
      },
      {
        imageUrl: '/images/dark-academia/fashion/outfit3.jpg',
        description: 'Vintage-inspired dress with cardigan and loafers'
      }
    ],
    styles: ['Vintage academic', 'Gothic inspired', 'Classic tailoring'],
    keyPieces: ['Tweed blazers', 'Oxford shoes', 'Leather satchels']
  },
  decor: {
    elements: [
      'Vintage books',
      'Antique furniture',
      'Dark wood accents',
      'Classic artwork'
    ],
    inspiration: [
      {
        imageUrl: '/images/dark-academia/decor/library.jpg',
        description: 'Personal library with floor-to-ceiling bookshelves'
      },
      {
        imageUrl: '/images/dark-academia/decor/study.jpg',
        description: 'Vintage study desk with brass lamp and leather accessories'
      },
      {
        imageUrl: '/images/dark-academia/decor/room.jpg',
        description: 'Moody bedroom with dark wood furniture and classic art prints'
      }
    ],
    tips: [
      'Focus on vintage furniture pieces',
      'Incorporate dark wood elements',
      'Display classic literature collections'
    ]
  },
  colorPalette: [
    {
      color: 'Dark Brown',
      name: 'Vintage Leather',
      hex: '#483C32'
    },
    {
      color: 'Deep Green',
      name: 'Library',
      hex: '#2F4F4F'
    },
    {
      color: 'Burgundy',
      name: 'Old Book',
      hex: '#800020'
    },
    {
      color: 'Charcoal',
      name: 'Tweed',
      hex: '#36454F'
    }
  ],
  artists: [
    {
      name: 'John William Waterhouse',
      type: 'Painter',
      imageUrl: '/images/dark-academia/artists/waterhouse.jpg',
      description: 'Pre-Raphaelite painter known for romantic and literary themes'
    },
    {
      name: 'Virginia Woolf',
      type: 'Writer',
      imageUrl: '/images/dark-academia/artists/woolf.jpg',
      description: 'Modernist writer exploring complex themes and inner monologue'
    },
    {
      name: 'Lord Byron',
      type: 'Poet',
      imageUrl: '/images/dark-academia/artists/byron.jpg',
      description: 'Romantic poet known for dramatic and melancholic works'
    }
  ]
};

// Add similar detailed data for other aesthetics...

const QuizSection = styled.section`
  text-align: center;
  padding: 3rem;
  background: linear-gradient(135deg, rgba(142, 107, 158, 0.05) 0%, rgba(74, 56, 88, 0.05) 100%);
  border-radius: 20px;
  margin: 2rem 0 4rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(142, 107, 158, 0.1);
  border: 1px solid rgba(142, 107, 158, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80') center/cover;
    opacity: 0.02;
    z-index: 0;
  }
`;

const QuizContent = styled.div`
  position: relative;
  z-index: 1;
`;

const QuizTitle = styled.h2`
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
  background: linear-gradient(120deg, #8E6B9E, #4A3858);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const QuizDescription = styled.p`
  color: #666;
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.8;
`;

const QuizButton = styled.button`
  background: linear-gradient(to right, #8E6B9E, #4A3858);
  color: white;
  border: none;
  padding: 1.2rem 2.5rem;
  border-radius: 50px;
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 1rem auto;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(142, 107, 158, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(142, 107, 158, 0.4);
    background: linear-gradient(to right, #4A3858, #8E6B9E);
  }

  &::after {
    content: '→';
    font-size: 1.4rem;
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: translateX(5px);
  }
`;

const QuizStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 2rem;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #8E6B9E;
  margin-bottom: 0.5rem;
  background: linear-gradient(120deg, #8E6B9E, #4A3858);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const AestheticsPage = () => {
  const [selectedAesthetic, setSelectedAesthetic] = useState<string | null>(null);
  const navigate = useNavigate();

  const getAestheticDetail = (id: string) => {
    return aestheticsDetailData[id] || aestheticsDetailData['dark-academia'];
  };

  return (
    <PageContainer>
      <Header>
        <Title>Aesthetics Explorer</Title>
        <Subtitle>
          Discover and explore the diverse world of Gen Z aesthetics, from classic styles to emerging trends.
          Each aesthetic represents a unique way of expressing identity and creativity through fashion, art, and lifestyle.
        </Subtitle>
      </Header>

      <QuizSection>
        <QuizContent>
          <QuizTitle>Find Your Aesthetic</QuizTitle>
          <QuizDescription>
            Take our personality quiz to discover which trending aesthetics match your style and vibe.
            Get personalized recommendations and connect with like-minded trendsetters.
          </QuizDescription>
          <QuizButton onClick={() => navigate('/quiz')}>
            Take the Quiz
          </QuizButton>
          <QuizStats>
            <StatItem>
              <StatNumber>50K+</StatNumber>
              <StatLabel>Quiz Takers</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>20+</StatNumber>
              <StatLabel>Aesthetics</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>95%</StatNumber>
              <StatLabel>Match Rate</StatLabel>
            </StatItem>
          </QuizStats>
        </QuizContent>
      </QuizSection>

      {aestheticsData.map((category) => (
        <CategorySection key={category.id}>
          <CategoryTitle>{category.name}</CategoryTitle>
          <CategoryDescription>{category.description}</CategoryDescription>
          <AestheticsGrid>
            {category.aesthetics.map((aesthetic, index) => (
              <AestheticCard
                key={aesthetic.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedAesthetic(aesthetic.id)}
              >
                <AestheticImage src={aesthetic.imageUrl} alt={aesthetic.name} />
                <AestheticContent>
                  <AestheticName>{aesthetic.name}</AestheticName>
                  <AestheticDescription>{aesthetic.description}</AestheticDescription>
                  <ElementsList>
                    {aesthetic.keyElements.slice(0, 4).map((element, i) => (
                      <ElementItem key={i}>{element}</ElementItem>
                    ))}
                  </ElementsList>
                  <TagsContainer>
                    {aesthetic.popularHashtags.map((tag, i) => (
                      <Tag key={i}>{tag}</Tag>
                    ))}
                  </TagsContainer>
                </AestheticContent>
              </AestheticCard>
            ))}
          </AestheticsGrid>
        </CategorySection>
      ))}

      <AnimatePresence>
        {selectedAesthetic && (
          <AestheticDetailView
            aesthetic={getAestheticDetail(selectedAesthetic)}
            onClose={() => setSelectedAesthetic(null)}
          />
        )}
      </AnimatePresence>
    </PageContainer>
  );
}; 