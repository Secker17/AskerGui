import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import HomePage from './pages/HomePage';
import UpcomingMatchesPage from './pages/UpcomingMatchesPage';
import AdminPage from './pages/AdminPage';
import { DataProvider } from './context/DataContext';
import './App.css';

const NavBar = styled.nav`
  background: linear-gradient(180deg, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.85) 100%);
  padding: 0.9rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(15px);

  @media (min-width: 768px) {
    padding: 1.2rem 2rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.3rem;
  font-weight: 900;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: all 0.3s ease;
  letter-spacing: -0.5px;
  white-space: nowrap;

  @media (min-width: 768px) {
    font-size: 1.8rem;
    gap: 0.5rem;
  }

  &:hover {
    transform: scale(1.08);
    text-shadow: 0 0 20px rgba(255,255,255,0.4);
  }
`;

const HamburgerButton = styled.button`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;

  @media (min-width: 768px) {
    display: none;
  }

  span {
    width: 24px;
    height: 2.5px;
    background: white;
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  &:hover span {
    background: rgba(255, 255, 255, 0.8);
  }

  ${props => props.open && `
    span:nth-child(1) {
      transform: rotate(45deg) translateY(10px);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: rotate(-45deg) translateY(-10px);
    }
  `}
`;

const NavLinks = styled.div`
  display: ${props => (props.open ? 'flex' : 'none')};
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  flex-direction: column;
  gap: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.9) 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1rem 0;
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (min-width: 768px) {
    display: flex;
    position: static;
    flex-direction: row;
    gap: 2rem;
    background: none;
    border: none;
    padding: 0;
    animation: none;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 700;
  padding: 0.8rem 1.5rem;
  border-radius: 0;
  transition: all 0.3s ease;
  letter-spacing: 0.2px;
  font-size: 0.95rem;
  display: block;

  @media (min-width: 768px) {
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    font-size: 1rem;
    letter-spacing: 0.3px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: translateX(4px);

    @media (min-width: 768px) {
      transform: translateY(-2px);
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

const Footer = styled.footer`
  background: linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.9) 100%);
  color: white;
  text-align: center;
  padding: 2.5rem 2rem;
  margin-top: 6rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(10px);

  p {
    font-weight: 600;
    letter-spacing: 0.3px;
  }
`;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <DataProvider>
      <Router>
        <NavBar>
          <Logo to="/" onClick={closeMenu}>
             Asker/Gui, (Herrer)
          </Logo>
          <HamburgerButton open={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </HamburgerButton>
          <NavLinks open={menuOpen}>
            <NavLink to="/" onClick={closeMenu}>Hjem</NavLink>
            <NavLink to="/matches" onClick={closeMenu}>Kamper</NavLink>
            <NavLink to="https://domstol.vercel.app/" onClick={closeMenu}>Rettsaker</NavLink>
            <NavLink to="/admin" onClick={closeMenu}>⚙️ Admin</NavLink>
          </NavLinks>
        </NavBar>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/matches" element={<UpcomingMatchesPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>

        <Footer>
          <p>&copy; 2025 Asker/Gui Herrer Håndball. Alle rettigheter forbeholdt.</p>
        </Footer>
      </Router>
    </DataProvider>
  );
}

export default App;
