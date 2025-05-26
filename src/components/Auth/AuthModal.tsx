import styled from 'styled-components';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Container = styled(motion.div)`
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #8E6B9E;
  }
`;

const Button = styled.button<{ $loading?: boolean }>`
  background: linear-gradient(to right, #8E6B9E, #4A3858);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: ${props => props.$loading ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  opacity: ${props => props.$loading ? 0.7 : 1};
  position: relative;
  
  &:hover {
    background: ${props => props.$loading ? 'linear-gradient(to right, #8E6B9E, #4A3858)' : 'linear-gradient(to right, #4A3858, #8E6B9E)'};
  }
`;

const SwitchButton = styled.button`
  background: none;
  border: none;
  color: #8E6B9E;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 1rem;
  
  &:hover {
    color: #4A3858;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #ddd;
  }
  
  span {
    padding: 0 1rem;
    color: #666;
    font-size: 0.9rem;
  }
`;

const SocialButton = styled(Button)`
  background: white;
  border: 1px solid #ddd;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);

  @keyframes spin {
    0% { transform: translateY(-50%) rotate(0deg); }
    100% { transform: translateY(-50%) rotate(360deg); }
  }
`;

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const { login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      onClose();
      setEmail('');
      setPassword('');
      setName('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <Container
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>×</CloseButton>
            <Title>{isLogin ? 'Welcome Back' : 'Join Us'}</Title>
            
            <Form onSubmit={handleSubmit}>
              {!isLogin && (
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  disabled={loading}
                />
              )}
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <Button type="submit" $loading={loading} disabled={loading}>
                {isLogin ? 'Log In' : 'Sign Up'}
                {loading && <LoadingSpinner />}
              </Button>
            </Form>

            <Divider>
              <span>or continue with</span>
            </Divider>

            <SocialButton type="button" disabled={loading}>
              <img src="/images/google-icon.svg" alt="Google" width="20" height="20" />
              Continue with Google
            </SocialButton>

            <div style={{ textAlign: 'center' }}>
              <SwitchButton
                type="button"
                onClick={handleSwitchMode}
                disabled={loading}
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : 'Already have an account? Log in'}
              </SwitchButton>
            </div>
          </Container>
        </Overlay>
      )}
    </AnimatePresence>
  );
}; 