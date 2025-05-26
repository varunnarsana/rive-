import styled from 'styled-components';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  sender: {
    name: string;
    image: string;
  };
  text: string;
  timestamp: string;
  isOwn: boolean;
}

interface Chat {
  id: string;
  user: {
    name: string;
    image: string;
    status: 'online' | 'offline';
    lastSeen?: string;
  };
  lastMessage: string;
  unreadCount: number;
  timestamp: string;
}

const MessagesContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 2rem;
  width: 300px;
  z-index: 100;
`;

const MessagesButton = styled.button`
  background: linear-gradient(to right, #8E6B9E, #4A3858);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 12px 12px 0 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-size: 1rem;

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ChatList = styled(motion.div)`
  background: white;
  border: 1px solid rgba(142, 107, 158, 0.1);
  border-top: none;
  max-height: 400px;
  overflow-y: auto;
  box-shadow: 0 -4px 20px rgba(142, 107, 158, 0.15);
`;

const ChatItem = styled.div<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.$isActive ? 'rgba(142, 107, 158, 0.1)' : 'white'};

  &:hover {
    background: rgba(142, 107, 158, 0.1);
  }
`;

const UserAvatar = styled.div`
  position: relative;
  
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const StatusDot = styled.div<{ $status: 'online' | 'offline' }>`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid white;
  background: ${props => props.$status === 'online' ? '#4CAF50' : '#999'};
`;

const ChatInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ChatName = styled.div`
  font-weight: 500;
  color: #333;
  margin-bottom: 0.25rem;
`;

const LastMessage = styled.div`
  color: #666;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChatMeta = styled.div`
  text-align: right;
  font-size: 0.8rem;
`;

const Timestamp = styled.div`
  color: #999;
  margin-bottom: 0.25rem;
`;

const UnreadCount = styled.div`
  background: #8E6B9E;
  color: white;
  border-radius: 12px;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  display: inline-block;
`;

const ChatWindow = styled(motion.div)`
  position: fixed;
  bottom: 0;
  right: calc(2rem + 320px);
  width: 320px;
  background: white;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 -4px 20px rgba(142, 107, 158, 0.15);
  border: 1px solid rgba(142, 107, 158, 0.1);
  display: flex;
  flex-direction: column;
  max-height: 480px;
  z-index: 100;
`;

const ChatHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid rgba(142, 107, 158, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ChatBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageBubble = styled.div<{ $isOwn: boolean }>`
  max-width: 80%;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  background: ${props => props.$isOwn ? 'linear-gradient(to right, #8E6B9E, #4A3858)' : '#f0f0f0'};
  color: ${props => props.$isOwn ? 'white' : '#333'};
  align-self: ${props => props.$isOwn ? 'flex-end' : 'flex-start'};
  position: relative;
`;

const MessageTimestamp = styled.div<{ $isOwn: boolean }>`
  font-size: 0.7rem;
  color: ${props => props.$isOwn ? 'rgba(255, 255, 255, 0.8)' : '#999'};
  margin-top: 0.25rem;
`;

const ChatInput = styled.div`
  padding: 1rem;
  border-top: 1px solid rgba(142, 107, 158, 0.1);
  display: flex;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid rgba(142, 107, 158, 0.2);
  border-radius: 20px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #8E6B9E;
  }
`;

const SendButton = styled.button`
  background: linear-gradient(to right, #8E6B9E, #4A3858);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(142, 107, 158, 0.2);
  }
`;

export const DirectMessages = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState('');
  
  const [chats] = useState<Chat[]>([
    {
      id: '1',
      user: {
        name: 'Emily Chen',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
        status: 'online'
      },
      lastMessage: 'Love your latest style post! 😍',
      unreadCount: 2,
      timestamp: '2m ago'
    },
    {
      id: '2',
      user: {
        name: 'Alex Morgan',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
        status: 'offline',
        lastSeen: '1h ago'
      },
      lastMessage: 'Thanks for the fashion tips!',
      unreadCount: 0,
      timestamp: '1h ago'
    }
  ]);

  const [messages] = useState<Message[]>([
    {
      id: '1',
      sender: {
        name: 'Emily Chen',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
      },
      text: 'Love your latest style post! 😍',
      timestamp: '2:30 PM',
      isOwn: false
    },
    {
      id: '2',
      sender: {
        name: 'You',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
      },
      text: 'Thank you so much! I had fun putting that outfit together.',
      timestamp: '2:31 PM',
      isOwn: true
    },
    {
      id: '3',
      sender: {
        name: 'Emily Chen',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
      },
      text: 'Where did you get that amazing jacket?',
      timestamp: '2:32 PM',
      isOwn: false
    }
  ]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <MessagesContainer>
      <MessagesButton onClick={() => setIsOpen(!isOpen)}>
        <span>
          <i className="fas fa-comment-dots"></i>
          Messages
        </span>
        {isOpen ? (
          <i className="fas fa-chevron-down"></i>
        ) : (
          <i className="fas fa-chevron-up"></i>
        )}
      </MessagesButton>

      <AnimatePresence>
        {isOpen && (
          <ChatList
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {chats.map(chat => (
              <ChatItem
                key={chat.id}
                onClick={() => setActiveChat(chat)}
                $isActive={activeChat?.id === chat.id}
              >
                <UserAvatar>
                  <img src={chat.user.image} alt={chat.user.name} />
                  <StatusDot $status={chat.user.status} />
                </UserAvatar>
                <ChatInfo>
                  <ChatName>{chat.user.name}</ChatName>
                  <LastMessage>{chat.lastMessage}</LastMessage>
                </ChatInfo>
                <ChatMeta>
                  <Timestamp>{chat.timestamp}</Timestamp>
                  {chat.unreadCount > 0 && (
                    <UnreadCount>{chat.unreadCount}</UnreadCount>
                  )}
                </ChatMeta>
              </ChatItem>
            ))}
          </ChatList>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeChat && (
          <ChatWindow
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
          >
            <ChatHeader>
              <UserAvatar>
                <img src={activeChat.user.image} alt={activeChat.user.name} />
                <StatusDot $status={activeChat.user.status} />
              </UserAvatar>
              <ChatInfo>
                <ChatName>{activeChat.user.name}</ChatName>
                <LastMessage>
                  {activeChat.user.status === 'online' 
                    ? 'Online'
                    : `Last seen ${activeChat.user.lastSeen}`
                  }
                </LastMessage>
              </ChatInfo>
              <button
                onClick={() => setActiveChat(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                ×
              </button>
            </ChatHeader>

            <ChatBody>
              {messages.map(message => (
                <MessageBubble key={message.id} $isOwn={message.isOwn}>
                  {message.text}
                  <MessageTimestamp $isOwn={message.isOwn}>
                    {message.timestamp}
                  </MessageTimestamp>
                </MessageBubble>
              ))}
            </ChatBody>

            <ChatInput>
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <SendButton onClick={handleSendMessage}>
                <i className="fas fa-paper-plane"></i>
              </SendButton>
            </ChatInput>
          </ChatWindow>
        )}
      </AnimatePresence>
    </MessagesContainer>
  );
}; 