import styled from 'styled-components';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface Post {
  id: string;
  user: {
    name: string;
    image: string;
  };
  image: string;
  caption: string;
  likes: number;
  comments: Comment[];
  tags: string[];
  timestamp: string;
  isLiked: boolean;
}

interface Comment {
  id: string;
  user: {
    name: string;
    image: string;
  };
  text: string;
  timestamp: string;
}

const FeedContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
`;

const PostCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(142, 107, 158, 0.1);
  margin-bottom: 2rem;
  overflow: hidden;
  border: 1px solid rgba(142, 107, 158, 0.1);
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #8E6B9E;
`;

const UserName = styled.span`
  font-weight: 600;
  color: #333;
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const PostActions = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ActionButton = styled.button<{ $isActive?: boolean }>`
  background: none;
  border: none;
  color: ${props => props.$isActive ? '#8E6B9E' : '#666'};
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: #8E6B9E;
  }
`;

const PostContent = styled.div`
  padding: 0 1rem 1rem;
`;

const Caption = styled.p`
  color: #333;
  margin-bottom: 0.5rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Tag = styled.span`
  background: rgba(142, 107, 158, 0.1);
  color: #8E6B9E;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(142, 107, 158, 0.2);
  }
`;

const CommentsSection = styled.div`
  padding: 1rem;
  border-top: 1px solid rgba(142, 107, 158, 0.1);
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(142, 107, 158, 0.2);
  border-radius: 20px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #8E6B9E;
  }
`;

const Comment = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const CommentContent = styled.div`
  flex: 1;
`;

const CommentText = styled.p`
  margin: 0;
  color: #333;
  font-size: 0.9rem;
`;

const Timestamp = styled.span`
  color: #999;
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;

export const SocialFeed = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      user: {
        name: 'Sarah Anderson',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
      },
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
      caption: 'Loving this Y2K inspired summer look! 🌞✨',
      likes: 124,
      comments: [
        {
          id: '1',
          user: {
            name: 'Emily Chen',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
          },
          text: 'This is absolutely gorgeous! 😍',
          timestamp: '2h ago'
        }
      ],
      tags: ['Y2KFashion', 'SummerStyle', 'OOTD'],
      timestamp: '3h ago',
      isLiked: false
    },
    {
      id: '2',
      user: {
        name: 'Sarah Anderson',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
      },
      image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc',
      caption: 'Dark academia vibes today 📚🕯️',
      likes: 89,
      comments: [],
      tags: ['DarkAcademia', 'VintageFashion', 'StyleInspo'],
      timestamp: '5h ago',
      isLiked: false
    }
  ]);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const [newComment, setNewComment] = useState('');

  const handleComment = (postId: string, comment: string) => {
    if (!comment.trim()) return;

    const newCommentObj: Comment = {
      id: Date.now().toString(),
      user: {
        name: 'Sarah Anderson',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
      },
      text: comment,
      timestamp: 'Just now'
    };

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newCommentObj]
        };
      }
      return post;
    }));

    setNewComment('');
  };

  return (
    <FeedContainer>
      {posts.map(post => (
        <PostCard
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PostHeader>
            <UserAvatar src={post.user.image} alt={post.user.name} />
            <UserName>{post.user.name}</UserName>
            <Timestamp>{post.timestamp}</Timestamp>
          </PostHeader>

          <PostImage src={post.image} alt="Post" />

          <PostActions>
            <ActionButton
              onClick={() => handleLike(post.id)}
              $isActive={post.isLiked}
            >
              <i className={`fas fa-heart${post.isLiked ? ' fa-solid' : ''}`}></i>
              {post.likes}
            </ActionButton>
            <ActionButton>
              <i className="fas fa-comment"></i>
              {post.comments.length}
            </ActionButton>
            <ActionButton>
              <i className="fas fa-share"></i>
            </ActionButton>
          </PostActions>

          <PostContent>
            <Caption>{post.caption}</Caption>
            <TagsContainer>
              {post.tags.map(tag => (
                <Tag key={tag}>#{tag}</Tag>
              ))}
            </TagsContainer>
          </PostContent>

          <CommentsSection>
            {post.comments.map(comment => (
              <Comment key={comment.id}>
                <UserAvatar src={comment.user.image} alt={comment.user.name} />
                <CommentContent>
                  <CommentText>
                    <strong>{comment.user.name}</strong> {comment.text}
                    <Timestamp>{comment.timestamp}</Timestamp>
                  </CommentText>
                </CommentContent>
              </Comment>
            ))}
            <Comment>
              <UserAvatar
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                alt="Your avatar"
              />
              <CommentInput
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleComment(post.id, newComment);
                  }
                }}
              />
            </Comment>
          </CommentsSection>
        </PostCard>
      ))}
    </FeedContainer>
  );
}; 