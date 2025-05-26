import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthModal } from '../Auth/AuthModal';
import { useAuth } from '../../context/AuthContext';

const HeaderContainer = styled.header`
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  background: linear-gradient(120deg, #8E6B9E, #4A3858);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Playfair Display', serif;
  letter-spacing: 1px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  color: ${props => props.$active ? '#8E6B9E' : '#666'};
  text-decoration: none;
  font-size: 1.1rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -4px;
    height: 2px;
    background: #8E6B9E;
    transform: scaleX(${props => props.$active ? 1 : 0});
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

const AuthButton = styled.button`
  background: linear-gradient(to right, #8E6B9E, #4A3858);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(142, 107, 158, 0.2);
  }
`;

const ProfileContainer = styled.div`
  position: relative;
`;

const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #8E6B9E;
  background: none;
  border: none;
  padding: 0;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #8E6B9E;
  }
`;

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(142, 107, 158, 0.15);
  padding: 0.5rem;
  min-width: 200px;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transform: translateY(${props => props.$isOpen ? '0' : '-10px'});
  transition: all 0.3s ease;
  z-index: 100;
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  color: #666;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(142, 107, 158, 0.1);
    color: #8E6B9E;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  width: 100%;
  color: #666;
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  font-size: 1rem;

  &:hover {
    background: rgba(142, 107, 158, 0.1);
    color: #8E6B9E;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(142, 107, 158, 0.1);
  margin: 0.5rem 0;
`;

export const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <Logo to="/">Riva</Logo>
          <Nav>
            <NavLink to="/" $active={location.pathname === '/'}>
              Home
            </NavLink>
            <NavLink to="/aesthetics" $active={location.pathname === '/aesthetics'}>
              Aesthetics
            </NavLink>
            <NavLink to="/trends" $active={location.pathname === '/trends'}>
              Trends
            </NavLink>
            <NavLink to="/fashion" $active={location.pathname === '/fashion'}>
              Fashion
            </NavLink>
            <NavLink to="/music" $active={location.pathname === '/music'}>
              Music
            </NavLink>
            <NavLink to="/social" $active={location.pathname === '/social'}>
              Social
            </NavLink>
            {isAuthenticated && user ? (
              <ProfileContainer ref={dropdownRef}>
                <ProfileButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img src={user.image} alt={user.name} />
                  {user.name.split(' ')[0]}
                </ProfileButton>
                <DropdownMenu $isOpen={isDropdownOpen}>
                  <DropdownItem to="/profile">
                    <i className="fas fa-user"></i>
                    View Profile
                  </DropdownItem>
                  <DropdownItem to="/profile/settings">
                    <i className="fas fa-cog"></i>
                    Settings
                  </DropdownItem>
                  <Divider />
                  <LogoutButton onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                    Log Out
                  </LogoutButton>
                </DropdownMenu>
              </ProfileContainer>
            ) : (
              <AuthButton onClick={() => setIsAuthModalOpen(true)}>
                Log In / Sign Up
              </AuthButton>
            )}
          </Nav>
        </HeaderContent>
      </HeaderContainer>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}; 