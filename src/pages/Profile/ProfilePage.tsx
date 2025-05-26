import styled from 'styled-components';
import { useState } from 'react';
import { motion } from 'framer-motion';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 80px auto 0;
  padding: 2rem;
`;

const ProfileHeader = styled.div`
  background: linear-gradient(135deg, rgba(142, 107, 158, 0.05) 0%, rgba(74, 56, 88, 0.05) 100%);
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(142, 107, 158, 0.1);
  border: 1px solid rgba(142, 107, 158, 0.1);
`;

const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  background: linear-gradient(to right, #8E6B9E, #4A3858);
  position: relative;
  overflow: hidden;
  border: 4px solid white;
  box-shadow: 0 4px 15px rgba(142, 107, 158, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileName = styled.h1`
  font-size: 2.2rem;
  background: linear-gradient(120deg, #8E6B9E, #4A3858);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const ProfileBio = styled.p`
  color: #666;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Section = styled.section`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(142, 107, 158, 0.1);
  border: 1px solid rgba(142, 107, 158, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  background: linear-gradient(120deg, #8E6B9E, #4A3858);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(142, 107, 158, 0.2);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(142, 107, 158, 0.1);
  border: 1px solid rgba(142, 107, 158, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(142, 107, 158, 0.2);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, rgba(142, 107, 158, 0.05) 0%, rgba(74, 56, 88, 0.05) 100%);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  background: linear-gradient(120deg, #8E6B9E, #4A3858);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
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

const EditButton = styled.button`
  background: linear-gradient(to right, #8E6B9E, #4A3858);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(142, 107, 158, 0.3);
  }
`;

export const ProfilePage = () => {
  const [userProfile] = useState({
    name: 'Sarah Anderson',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    bio: 'Fashion enthusiast and digital creator passionate about aesthetic trends and sustainable style.',
    stats: {
      followers: '2.5K',
      following: '850',
      posts: '127',
      likes: '12K'
    },
    interests: ['Y2K Fashion', 'Dark Academia', 'Minimalism', 'Sustainable Style'],
    collections: [
      {
        id: 1,
        title: 'Summer Y2K Looks',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
        description: 'My favorite Y2K-inspired summer outfits and accessories.'
      },
      {
        id: 2,
        title: 'Dark Academia Essentials',
        image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc',
        description: 'Classic pieces for the perfect academic aesthetic.'
      }
    ],
    savedStyles: [
      {
        id: 1,
        title: 'Vintage Minimalism',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
        description: 'Clean lines meet vintage inspiration.'
      },
      {
        id: 2,
        title: 'Modern Cottagecore',
        image: 'https://images.unsplash.com/photo-1595781572981-d63151b232ed',
        description: 'A fresh take on the romantic countryside aesthetic.'
      }
    ]
  });

  return (
    <PageContainer>
      <ProfileHeader>
        <ProfileImage>
          <img src={userProfile.image} alt={userProfile.name} />
        </ProfileImage>
        <ProfileName>{userProfile.name}</ProfileName>
        <ProfileBio>{userProfile.bio}</ProfileBio>
        <TagsContainer>
          {userProfile.interests.map((interest, index) => (
            <Tag key={index}>{interest}</Tag>
          ))}
        </TagsContainer>
        <EditButton>Edit Profile</EditButton>
      </ProfileHeader>

      <Section>
        <StatGrid>
          <StatCard>
            <StatNumber>{userProfile.stats.followers}</StatNumber>
            <StatLabel>Followers</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{userProfile.stats.following}</StatNumber>
            <StatLabel>Following</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{userProfile.stats.posts}</StatNumber>
            <StatLabel>Posts</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{userProfile.stats.likes}</StatNumber>
            <StatLabel>Likes</StatLabel>
          </StatCard>
        </StatGrid>
      </Section>

      <Section>
        <SectionTitle>My Collections</SectionTitle>
        <Grid>
          {userProfile.collections.map((collection) => (
            <Card
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CardImage src={collection.image} alt={collection.title} />
              <CardContent>
                <CardTitle>{collection.title}</CardTitle>
                <CardDescription>{collection.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section>
        <SectionTitle>Saved Styles</SectionTitle>
        <Grid>
          {userProfile.savedStyles.map((style) => (
            <Card
              key={style.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CardImage src={style.image} alt={style.title} />
              <CardContent>
                <CardTitle>{style.title}</CardTitle>
                <CardDescription>{style.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Section>
    </PageContainer>
  );
}; 