import styled from 'styled-components';
import { SocialFeed } from '../../components/Social/SocialFeed';
import { Stories } from '../../components/Social/Stories';
import { CreatePost } from '../../components/Social/CreatePost';
import { DirectMessages } from '../../components/Social/DirectMessages';
import { StyleChallenges } from '../../components/Social/StyleChallenges';
import { StyleGroups } from '../../components/Social/StyleGroups';
import { StylePolls } from '../../components/Social/StylePolls';
import { useState } from 'react';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 80px auto 0;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div``;

const Sidebar = styled.div`
  @media (max-width: 1024px) {
    display: none;
  }
`;

const SidebarSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 15px rgba(142, 107, 158, 0.1);
  border: 1px solid rgba(142, 107, 158, 0.1);
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(142, 107, 158, 0.1);
`;

const TrendingTag = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #8E6B9E;
  }
`;

const TagCount = styled.span`
  color: #999;
  font-size: 0.8rem;
`;

const SuggestedUser = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-weight: 500;
  color: #333;
`;

const UserBio = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const FollowButton = styled.button`
  background: linear-gradient(to right, #8E6B9E, #4A3858);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(142, 107, 158, 0.2);
  }
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #8E6B9E;
`;

export const SocialPage = () => {
  const [trendingTags] = useState([
    { tag: 'Y2KFashion', posts: 1234 },
    { tag: 'DarkAcademia', posts: 856 },
    { tag: 'SustainableFashion', posts: 743 },
    { tag: 'VintageLooks', posts: 652 },
    { tag: 'MinimalStyle', posts: 521 }
  ]);

  const [suggestedUsers] = useState([
    {
      name: 'Emily Chen',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      bio: 'Fashion & Lifestyle Creator'
    },
    {
      name: 'Alex Morgan',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
      bio: 'Vintage Style Enthusiast'
    },
    {
      name: 'Sophie Taylor',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      bio: 'Sustainable Fashion Advocate'
    }
  ]);

  const handleNewPost = (post: { image: string; caption: string; tags: string[] }) => {
    // Here you would typically send the post to your backend
    console.log('New post:', post);
  };

  return (
    <>
      <PageContainer>
        <MainContent>
          <Stories />
          <StylePolls />
          <StyleGroups />
          <StyleChallenges />
          <CreatePost onPost={handleNewPost} />
          <SocialFeed />
        </MainContent>
        
        <Sidebar>
          <SidebarSection>
            <SectionTitle>Trending Tags</SectionTitle>
            {trendingTags.map(({ tag, posts }) => (
              <TrendingTag key={tag}>
                #{tag}
                <TagCount>{posts} posts</TagCount>
              </TrendingTag>
            ))}
          </SidebarSection>

          <SidebarSection>
            <SectionTitle>Suggested Users</SectionTitle>
            {suggestedUsers.map((user) => (
              <SuggestedUser key={user.name}>
                <UserAvatar src={user.image} alt={user.name} />
                <UserInfo>
                  <UserName>{user.name}</UserName>
                  <UserBio>{user.bio}</UserBio>
                </UserInfo>
                <FollowButton>Follow</FollowButton>
              </SuggestedUser>
            ))}
          </SidebarSection>
        </Sidebar>
      </PageContainer>
      <DirectMessages />
    </>
  );
}; 