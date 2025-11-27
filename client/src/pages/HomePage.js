import React, { useContext, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

// --- Animations ---
const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 69, 0, 0.4); }
  70% { box-shadow: 0 0 0 20px rgba(255, 69, 0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 69, 0, 0); }
`;

const slideInLeft = keyframes`
  from { opacity: 0; transform: translateX(-100px) skew(-10deg); }
  to { opacity: 1; transform: translateX(0) skew(-10deg); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// --- Styled Components ---

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #050505;
  color: white;
  position: relative;
  overflow-x: hidden;

  /* Aggressive Background Grid */
  background-image: 
    linear-gradient(rgba(255, 69, 0, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 69, 0, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  
  /* Vignette effect */
  &::after {
    content: '';
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(circle at 50% 50%, transparent 0%, #000000 90%);
    pointer-events: none;
    z-index: 1;
  }
`;

const Hero = styled.section`
  padding: 8rem 5%; 
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Venstrejustert for action */
  position: relative;
  z-index: 2;

  /* Bakgrunns-element (Røyk/Glød) */
  &::before {
    content: '';
    position: absolute;
    top: 20%;
    left: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(255, 69, 0, 0.15) 0%, transparent 70%);
    filter: blur(60px);
    z-index: -1;
  }

  @media (max-width: 1024px) {
    justify-content: center;
    padding: 6rem 2rem;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Venstrejustert */
  gap: 1rem;
  
  @media (max-width: 1024px) {
    align-items: center;
  }
`;

const LogoContainer = styled.div`
  width: 150px;
  height: 150px;
  margin-bottom: 1rem;
  filter: drop-shadow(0 0 20px rgba(255, 69, 0, 0.3));
  animation: ${float} 6s ease-in-out infinite;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const Title = styled.h1`
  font-size: 7rem;
  line-height: 0.9;
  font-weight: 900;
  font-style: italic;
  text-transform: uppercase;
  margin: 0;
  color: white;
  transform: skew(-5deg); /* Fart! */
  text-shadow: 5px 5px 0px rgba(255, 69, 0, 0.2);
  letter-spacing: -3px;
  
  span {
    color: #ff4500; /* Asker Orange */
  }

  @media (max-width: 1024px) {
    font-size: 5rem;
  }
  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Subtitle = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 4px;
  color: #ccc;
  border-left: 5px solid #ff4500;
  padding-left: 1.5rem;
  margin-bottom: 2rem;
  transform: skew(-5deg);

  @media (max-width: 1024px) {
    border-left: none;
    border-bottom: 4px solid #ff4500;
    padding-left: 0;
    padding-bottom: 0.5rem;
  }
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

// --- Fight Card / Match Display ---
const FightCard = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  background: linear-gradient(135deg, rgba(20,20,20,0.9) 0%, rgba(10,10,10,0.95) 100%);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 1.5rem 3rem;
  transform: skew(-10deg); /* Action Shape */
  border-left: 6px solid #ff4500;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  margin: 2rem 0;
  position: relative;

  /* Innholdet må skews tilbake for å være leselig */
  > * {
    transform: skew(10deg);
  }

  @media (max-width: 768px) {
    flex-direction: row; /* Keep row even on mobile if possible */
    padding: 1rem;
    gap: 0.5rem;
    transform: skew(0); /* Fjern skew på veldig liten skjerm */
    > * { transform: skew(0); }
    border-left: none;
    border-top: 4px solid #ff4500;
    width: 100%;
    justify-content: space-around;
  }
`;

const TeamBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  img {
    width: 90px;
    height: 90px;
    object-fit: contain;
    filter: drop-shadow(0 10px 10px rgba(0,0,0,0.5));
  }
  
  span {
    font-weight: 800;
    font-size: 1.2rem;
    text-transform: uppercase;
    margin-top: 0.5rem;
    letter-spacing: 1px;
  }

  @media (max-width: 768px) {
    img { width: 60px; height: 60px; }
    span { font-size: 0.9rem; }
  }
`;

const VS = styled.div`
  font-size: 4rem;
  font-weight: 900;
  font-style: italic;
  color: transparent;
  -webkit-text-stroke: 2px rgba(255,255,255,0.2);
  position: relative;
  z-index: 0;
  
  &::after {
    content: 'VS';
    position: absolute;
    top: 0; left: 0;
    color: #ff4500;
    opacity: 0.8;
    transform: translate(4px, 4px);
    z-index: -1;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const ButtonStyles = css`
  padding: 1.2rem 3rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 1.1rem;
  text-decoration: none;
  transform: skew(-10deg);
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  /* Shine effect */
  &::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: skew(-10deg) translateY(-5px);
    box-shadow: 0 10px 20px rgba(255, 69, 0, 0.3);
  }

  /* Fix text inside skew */
  span {
    transform: skew(10deg);
  }
`;

const PrimaryBtn = styled(Link)`
  ${ButtonStyles}
  background: #ff4500;
  color: white;
  border: none;
  
  &:hover {
    background: #ff5714;
  }
`;

const LiveBtn = styled.a`
  ${ButtonStyles}
  background: transparent;
  color: #ff4500;
  border: 2px solid #ff4500;
  animation: ${pulse} 2s infinite;

  &:hover {
    background: rgba(255, 69, 0, 0.1);
    color: white;
  }
`;

// --- Man of the Match (Card Style) ---
const MotmSection = styled.section`
  padding: 4rem 2rem;
  position: relative;
  z-index: 2;
  background: linear-gradient(180deg, transparent 0%, rgba(20,20,20,0.8) 100%);
`;

const SectionHeader = styled.h2`
  text-align: center;
  font-size: 3rem;
  font-weight: 900;
  text-transform: uppercase;
  font-style: italic;
  margin-bottom: 3rem;
  color: white;
  
  span { color: #ff4500; }
`;

const PlayerCard = styled.div`
  max-width: 400px;
  margin: 0 auto;
  background: #111;
  border: 1px solid #333;
  position: relative;
  clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    border-color: #ff4500;
    box-shadow: 0 0 30px rgba(255, 69, 0, 0.2);
  }
`;

const CardImage = styled.div`
  height: 400px;
  width: 100%;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(20%) contrast(1.2);
    transition: 0.5s ease;
  }

  /* Team overlay on image */
  &::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; width: 100%; height: 50%;
    background: linear-gradient(to top, #111 0%, transparent 100%);
  }

  ${PlayerCard}:hover img {
    filter: grayscale(0%) contrast(1.1) scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  text-align: center;
  position: relative;
`;

const CardBadge = styled.div`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  background: #ff4500;
  color: white;
  padding: 0.5rem 1.5rem;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 0.9rem;
  clip-path: polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px);
`;

const PlayerName = styled.h3`
  font-size: 2rem;
  margin: 1rem 0 0.2rem 0;
  text-transform: uppercase;
  font-weight: 900;
  font-style: italic;
`;

const PlayerMeta = styled.p`
  color: #888;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  border-top: 1px solid #222;
  padding-top: 1rem;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  .val { font-size: 2rem; font-weight: 800; color: #ff4500; line-height: 1; }
  .lbl { font-size: 0.75rem; color: #666; text-transform: uppercase; font-weight: 700; margin-top: 5px; }
`;

// --- Features Grid (Industrial Style) ---
const FeaturesSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1300px;
  margin: 0 auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureBox = styled.div`
  background: #0a0a0a;
  padding: 2.5rem;
  border: 1px solid #222;
  position: relative;
  transition: 0.3s;
  
  /* Corner accents */
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 0; height: 2px;
    background: #ff4500;
    transition: 0.4s;
  }

  &:hover::before { width: 100%; }
  
  &:hover {
    background: #111;
    transform: translateY(-5px);
  }

  h3 {
    font-size: 1.5rem;
    text-transform: uppercase;
    font-weight: 800;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  p { color: #888; line-height: 1.6; }
`;

const StatsBar = styled.div`
  background: #ff4500;
  color: black;
  padding: 3rem 1rem;
  margin-top: 4rem;
  transform: skewY(-2deg); /* Hele seksjonen er skråstilt */
`;

const StatsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
  transform: skewY(2deg); /* Teksten rettes opp igjen */

  div {
    text-align: center;
  }
  
  .num { font-size: 3.5rem; font-weight: 900; display: block; }
  .lbl { font-weight: 700; text-transform: uppercase; font-size: 1.1rem; }
`;

function HomePage() {
  const { motm, matchData } = useContext(DataContext);
  const [logo] = useState('/images/standard_832px-Asker_SK_logo.svg.png');
  
  // Data fallback
  const currentMatch = {
    homeTeam: 'Asker',
    awayTeam: 'HSIL', 
    homeLogo: '/images/standard_832px-Asker_SK_logo.svg.png',
    awayLogo: '/images/HSIL logo desktop.png',
    liveLink: 'https://example.com/live',
    ...matchData 
  };
  
  return (
    <Container>
      <Hero>
        <HeroContent>
          {/* Logo animasjon */}
          <LogoContainer>
            {logo ? <img src={logo} alt="Asker Logo" /> : <div className="placeholder">🦁</div>}
          </LogoContainer>
          
          <Title>
            ASKER <span>/ GUI</span>
          </Title>
          <Subtitle>
            NO GUTS • NO GLORY • BLØ FOR DRAKTA
          </Subtitle>
          
          <FightCard>
            <TeamBlock>
              <img src={currentMatch.homeLogo} alt="Home" />
              <span>{currentMatch.homeTeam}</span>
            </TeamBlock>
            
            <VS>VS</VS>
            
            <TeamBlock>
              <img src={currentMatch.awayLogo} alt="Away" />
              <span>{currentMatch.awayTeam}</span>
            </TeamBlock>
          </FightCard>

          <ActionButtons>
            <PrimaryBtn to="/matches">
              <span>Se Terminliste</span>
            </PrimaryBtn>
            <LiveBtn href={currentMatch.liveLink} target="_blank">
              <span>🔴 Se Kampen Live</span>
            </LiveBtn>
          </ActionButtons>

        </HeroContent>
      </Hero>

      <MotmSection>
        <SectionHeader>Kampens <span>Gigant</span></SectionHeader>
        <PlayerCard>
          <CardImage>
            {/* Fallback image logic */}
            {motm.image && (motm.image.startsWith('data:') || motm.image.startsWith('http')) ? (
              <img src={motm.image} alt={motm.player} />
            ) : (
              <div style={{height: '100%', display: 'flex', alignItems:'center', justifyContent:'center', fontSize: '4rem', background: '#222'}}>🦁</div>
            )}
          </CardImage>
          
          <CardContent>
            <CardBadge>Runde {motm.round}</CardBadge>
            <PlayerName>{motm.player}</PlayerName>
            <PlayerMeta>#{motm.number} • {motm.position}</PlayerMeta>
            
            <StatRow>
              <StatItem>
                <span className="val">{motm.goals}</span>
                <span className="lbl">Kasser</span>
              </StatItem>
              <StatItem>
                <span className="val">{motm.saves || 0}</span>
                <span className="lbl">Reddninger</span>
              </StatItem>
            </StatRow>
          </CardContent>
        </PlayerCard>
      </MotmSection>

      <StatsBar>
        <StatsContent>
          <div>
            <span className="num">100%</span>
            <span className="lbl">Fight</span>
          </div>
          <div>
            <span className="num">#1</span>
            <span className="lbl">Samhold</span>
          </div>
          <div>
            <span className="num">2025</span>
            <span className="lbl">Sesong</span>
          </div>
        </StatsContent>
      </StatsBar>

      <FeaturesSection>
        <FeaturesGrid>
          <FeatureBox>
            <h3>📅 Terminliste</h3>
            <p>Full oversikt over når krigen fortsetter. Hold deg oppdatert på neste slag.</p>
          </FeatureBox>
          <FeatureBox>
            <h3>⚖️ Botkassa</h3>
            <p>Justisen er hard i garderoben. Se hvem som synder mest og må betale prisen.</p>
          </FeatureBox>
          <FeatureBox>
            <h3>📊 Tabell</h3>
            <p>Veien mot toppen. Følg lagets klatring i divisjonen minutt for minutt.</p>
          </FeatureBox>
        </FeaturesGrid>
      </FeaturesSection>
    </Container>
  );
}

export default HomePage;