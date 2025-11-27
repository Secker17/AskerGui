import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import styled, { createGlobalStyle, css } from 'styled-components';

// Sider
import HomePage from './pages/HomePage';
import UpcomingMatchesPage from './pages/UpcomingMatchesPage';
import PlayersPage from './pages/PlayersPage';
import AdminPage from './pages/AdminPage';
import AdminPinPage from './pages/AdminPinPage';
import { DataProvider } from './context/DataContext';

// --- Global Styles (Action Grid Theme) ---
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #050505;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    color: white;
    overflow-x: hidden;

    /* Aggressive Background Grid for hele appen */
    background-image: 
      linear-gradient(rgba(255, 69, 0, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 69, 0, 0.03) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  /* Vignette effect overlay */
  body::after {
    content: '';
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(circle at 50% 0%, rgba(255, 69, 0, 0.05) 0%, transparent 80%);
    pointer-events: none;
    z-index: -1;
  }

  * {
    box-sizing: border-box;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #000;
  }
  ::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #ff4500;
  }
`;

// --- Navbar Components ---

const NavContainer = styled.nav`
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  height: 90px;
  
  /* Hard Industrial Look */
  background: rgba(5, 5, 5, 0.95);
  border-bottom: 2px solid #1a1a1a;
  
  /* Oransje Action Line i bunnen */
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #ff4500, transparent);
    box-shadow: 0 0 15px #ff4500;
  }

  box-shadow: 0 10px 30px rgba(0,0,0,0.8);
`;

const NavContent = styled.div`
  width: 95%; 
  max-width: 1800px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 2rem;
  font-weight: 900;
  font-style: italic; /* Action style */
  text-transform: uppercase;
  color: white;
  letter-spacing: -1px;
  display: flex;
  align-items: center;
  transform: skew(-5deg); /* Fart! */
  
  span {
    color: #ff4500;
    margin-left: 5px;
  }

  &:hover {
    text-shadow: 0 0 20px rgba(255, 69, 0, 0.5);
  }
`;

const DesktopMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 900px) {
    display: none;
  }
`;

// Felles stil for lenker (Skewed Box)
const navItemStyles = css`
  color: #aaa;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 800;
  padding: 0.8rem 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  transition: all 0.2s ease;
  
  /* The Action Skew Shape */
  transform: skew(-20deg);
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(0,0,0,0.3);

  /* Fix text inside skew */
  & > span {
    display: block;
    transform: skew(20deg); 
  }

  &:hover {
    color: #fff;
    background: #ff4500;
    border-color: #ff4500;
    box-shadow: 0 0 20px rgba(255, 69, 0, 0.4);
    transform: skew(-20deg) translateY(-2px);
  }

  &.active {
    background: #fff;
    color: #000;
  }
`;

const StyledLink = styled(Link)`
  ${navItemStyles}
`;

const StyledExternalLink = styled.a`
  ${navItemStyles}
`;

const AdminButton = styled(Link)`
  ${navItemStyles}
  border-color: #ff4500;
  color: #ff4500;

  &:hover {
    background: #ff4500;
    color: white;
  }
`;

// --- Mobile Menu Stuff ---

const Hamburger = styled.button`
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1100;
  width: 50px;
  height: 50px;

  @media (max-width: 900px) {
    display: flex;
  }

  span {
    display: block;
    width: 35px;
    height: 3px;
    background: white;
    transform: skew(-10deg);
    transition: all 0.3s ease;
    
    &:nth-child(1) { transform: ${props => props.open ? 'rotate(45deg) translate(6px, 6px)' : 'none'}; }
    &:nth-child(2) { opacity: ${props => props.open ? '0' : '1'}; transform: ${props => props.open ? 'translateX(-20px)' : 'none'}; }
    &:nth-child(3) { transform: ${props => props.open ? 'rotate(-45deg) translate(6px, -6px)' : 'none'}; }
  }
`;

const MobileDropdown = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #000;
  padding-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  z-index: 1050;
  
  /* Action Background Pattern for Mobile Menu */
  background-image: linear-gradient(rgba(255, 69, 0, 0.05) 1px, transparent 1px);
  background-size: 100% 50px;
  
  /* Animasjon */
  opacity: ${props => (props.open ? '1' : '0')};
  visibility: ${props => (props.open ? 'visible' : 'hidden')};
  transform: ${props => (props.open ? 'translateX(0)' : 'translateX(100%)')};
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
`;

const MobileLink = styled(Link)`
  font-size: 2rem;
  color: white;
  text-decoration: none;
  font-weight: 900;
  text-transform: uppercase;
  font-style: italic;
  letter-spacing: -1px;
  transform: skew(-5deg);
  
  &:hover {
    color: #ff4500;
    transform: skew(-5deg) scale(1.1);
  }
`;

const MobileExtLink = styled.a`
  font-size: 1.5rem;
  color: #888;
  text-decoration: none;
  font-weight: 700;
  text-transform: uppercase;
`;

// --- Footer ---
const Footer = styled.footer`
  background: #0a0a0a;
  color: #444;
  text-align: center;
  padding: 4rem 2rem;
  margin-top: auto;
  border-top: 2px solid #1a1a1a;
  position: relative;

  /* Orange top accent */
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 2px;
    background: #ff4500;
  }

  p {
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
`;

// Helper for scroll
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <DataProvider>
      <GlobalStyle />
      <Router>
        <ScrollToTop />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          
          <NavContainer>
            <NavContent>
              <Logo to="/" onClick={closeMenu}>
                Asker<span>/ Gui</span>
              </Logo>

              {/* Desktop Menu */}
              <DesktopMenu>
                <StyledLink to="/">
                  <span>Hjem</span>
                </StyledLink>
                <StyledLink to="/players">
                  <span>Spillere</span>
                </StyledLink>
                <StyledLink to="/matches">
                  <span>Kamper</span>
                </StyledLink>
                <StyledExternalLink href="https://domstol.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <span>Botkassa ↗</span>
                </StyledExternalLink>
                <AdminButton to="/admin">
                  <span>⚙️ Admin</span>
                </AdminButton>
              </DesktopMenu>

              {/* Mobil Hamburger */}
              <Hamburger 
                open={menuOpen} 
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Meny"
              >
                <span></span>
                <span></span>
                <span></span>
              </Hamburger>

            </NavContent>
          </NavContainer>

          {/* Fullskjerm mobilmeny */}
          <MobileDropdown open={menuOpen}>
            <MobileLink to="/" onClick={closeMenu}>Hjem</MobileLink>
            <MobileLink to="/players" onClick={closeMenu}>Spillere</MobileLink>
            <MobileLink to="/matches" onClick={closeMenu}>Terminliste</MobileLink>
            <MobileExtLink href="https://domstol.vercel.app/" target="_blank" onClick={closeMenu}>
              Botkassa ↗
            </MobileExtLink>
            <MobileLink to="/admin" onClick={closeMenu}>Admin</MobileLink>
          </MobileDropdown>

          {/* Hovedinnhold */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/players" element={<PlayersPage />} />
            <Route path="/matches" element={<UpcomingMatchesPage />} />
            <Route path="/admin-pin" element={<AdminPinPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>

          <Footer>
            <p>&copy; 2025 Asker/Gui Herrer. Fight for glory.</p>
          </Footer>

        </div>
      </Router>
    </DataProvider>
  );
}

export default App;