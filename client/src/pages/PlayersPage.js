import React, { useContext } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { DataContext } from '../context/DataContext';

// --- Animasjoner ---
const slideUp = keyframes`
  from { opacity: 0; transform: translateY(40px) skew(-5deg); }
  to { opacity: 1; transform: translateY(0) skew(-5deg); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// --- Styled Components ---

const Container = styled.div`
  min-height: 100vh;
  background-color: #050505;
  color: white;
  position: relative;
  overflow-x: hidden;
  padding-bottom: 4rem;

  background-image: 
    linear-gradient(rgba(255, 69, 0, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 69, 0, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;

  &::before {
    content: '';
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(circle at 50% 0%, rgba(255, 69, 0, 0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  padding: 6rem 1rem 3rem;
  position: relative;
  z-index: 1;
`;

const PageTitle = styled.h1`
  font-size: clamp(3rem, 10vw, 6rem);
  font-weight: 900;
  text-transform: uppercase;
  font-style: italic;
  margin: 0;
  line-height: 0.9;
  color: white;
  transform: skew(-5deg);
  text-shadow: 4px 4px 0px #ff4500;
  letter-spacing: -2px;

  span {
    color: #ff4500;
    text-shadow: 4px 4px 0px rgba(255,255,255,0.2);
  }
`;

const PageSubtitle = styled.div`
  display: inline-block;
  background: #ff4500;
  color: black;
  font-weight: 800;
  text-transform: uppercase;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  transform: skew(-10deg);
  margin-top: 1.5rem;
  letter-spacing: 2px;
  box-shadow: 0 0 20px rgba(255, 69, 0, 0.4);
`;

const StatsHUD = styled.div`
  display: flex;
  justify-content: center;
  gap: 1px;
  background: #222;
  max-width: 900px;
  margin: 0 auto 4rem;
  border: 1px solid #333;
  transform: skew(-10deg);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);

  @media (max-width: 768px) {
    transform: skew(0);
    flex-direction: column;
    background: transparent;
    border: none;
    box-shadow: none;
    gap: 1rem;
  }
`;

const HUDItem = styled.div`
  flex: 1;
  background: #0f0f0f;
  padding: 1.5rem;
  text-align: center;
  position: relative;
  transition: 0.3s;

  &:hover {
    background: #161616;
    .val { color: #ff4500; text-shadow: 0 0 10px rgba(255,69,0,0.5); }
  }

  .val {
    display: block;
    font-size: 2.5rem;
    font-weight: 900;
    color: white;
    line-height: 1;
    transform: skew(10deg);
    transition: 0.3s;
    text-transform: uppercase;
  }

  .lbl {
    display: block;
    font-size: 0.8rem;
    text-transform: uppercase;
    color: #666;
    font-weight: 700;
    margin-top: 0.5rem;
    letter-spacing: 1px;
    transform: skew(10deg);
  }

  @media (max-width: 768px) {
    transform: skew(0);
    border: 1px solid #222;
    .val, .lbl { transform: skew(0); }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2.5rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  z-index: 1;
  position: relative;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
  }
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem;
  background: linear-gradient(to top, #000 10%, rgba(0,0,0,0.8) 50%, transparent 100%);
  z-index: 2;
  transform: skew(5deg);
  transition: transform 0.3s ease;
`;

const BigNumber = styled.div`
  position: absolute;
  top: -20px;
  right: -10px;
  font-size: 8rem;
  font-weight: 900;
  font-style: italic;
  color: rgba(255, 255, 255, 0.05);
  line-height: 1;
  z-index: 1;
  transition: all 0.4s ease;
`;

// --- BADGES ---

const CaptainBadge = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  width: 45px;
  height: 45px;
  background: linear-gradient(45deg, #FFD700, #FDB931, #FFD700);
  background-size: 200% auto;
  animation: ${shimmer} 3s linear infinite;
  color: #000;
  font-weight: 900;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  transform: skew(5deg);
  z-index: 10;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.6);

  &::after {
    content: 'C';
  }
`;

const LeaderBadge = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: #fff;
  color: #000;
  padding: 4px 10px;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  transform: skew(5deg);
  z-index: 10;
  border-left: 4px solid #ff4500;
`;

const TrainerBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  background: #1e40af;
  color: #fff;
  font-weight: 900;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  transform: skew(5deg);
  z-index: 10;
  box-shadow: 0 5px 15px rgba(0,0,0,0.5);

  &::after {
    content: 'T';
  }
`;

const MVPBadge = styled.div`
  position: absolute;
  bottom: 150px; 
  left: 50%;
  transform: translateX(-50%) skew(5deg);
  background: #FFD700;
  color: black;
  font-weight: 900;
  padding: 0.3rem 1rem;
  text-transform: uppercase;
  font-size: 0.8rem;
  z-index: 10;
  box-shadow: 0 0 10px #FFD700;
  border: 1px solid white;
`;

// --- NYTT DESIGN FOR TOPPSCORER ---
const TopScorerBadge = styled.div`
  position: absolute;
  bottom: 25px; /* Plassert nede til høyre */
  right: 20px;
  z-index: 20; /* Over CardContent gradienten */
  
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  
  text-align: right;
  font-style: italic;
  transform: skew(5deg); /* Matcher kortets vridning for teksten */

  .label {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #888;
    font-weight: 700;
    margin-bottom: -2px;
  }
  
  .count {
    font-size: 2.2rem;
    font-weight: 900;
    color: #00ff88; /* Neon grønn */
    line-height: 0.9;
    text-shadow: 0 0 15px rgba(0, 255, 136, 0.4);
    
    display: flex;
    align-items: center;
    gap: 5px;

    &::after {
      content: '⚽';
      font-size: 1rem;
      filter: grayscale(100%); /* Gjør ballen litt mer diskret */
      opacity: 0.7;
    }
  }
`;

const PlayerCard = styled.div`
  background: #121212;
  height: 400px;
  position: relative;
  overflow: hidden;
  border: 1px solid #333;
  transform: skew(-5deg);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  animation: ${slideUp} 0.6s ease-out backwards;
  animation-delay: ${props => props.index * 0.1}s;
  cursor: pointer;

  ${props => props.$isMotm && css`
     border: 2px solid #FFD700;
     box-shadow: 0 0 20px rgba(255, 215, 0, 0.2);
     
     &::after {
       background: #FFD700 !important;
       transform: scaleX(1) !important;
       height: 6px !important;
     }

     ${Name} span {
       color: #FFD700 !important;
     }
  `}

  .img-wrapper {
    width: 110%;
    height: 100%;
    margin-left: -5%;
    position: relative;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: ${props => props.$isMotm ? 'grayscale(0%) contrast(1.1)' : 'grayscale(100%) contrast(1.2) brightness(0.9)'};
      transition: all 0.4s ease;
      transform: skew(5deg);
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: #ff4500;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
    z-index: 3;
  }

  &:hover {
    transform: skew(-5deg) translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    border-color: ${props => props.$isMotm ? '#FFD700' : '#555'};

    .img-wrapper img {
      filter: grayscale(0%) contrast(1.1) brightness(1.1);
      transform: skew(5deg) scale(1.05);
    }

    ${BigNumber} {
      color: ${props => props.$isMotm ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 69, 0, 0.2)'};
      transform: translateX(-10px);
    }

    ${CardContent} {
      transform: skew(5deg) translateY(-5px);
    }

    ${CaptainBadge}, ${LeaderBadge}, ${TrainerBadge}, ${MVPBadge}, ${TopScorerBadge} {
        transform: skew(5deg) scale(1.1);
    }

    &::after {
      transform: scaleX(1);
    }
  }

  @media (max-width: 768px) {
    transform: skew(0);
    height: 350px;
    
    .img-wrapper { 
      width: 100%; 
      margin-left: 0;
      img { transform: skew(0); }
    }

    ${CardContent} { transform: skew(0); }
    ${CaptainBadge}, ${LeaderBadge}, ${TrainerBadge}, ${MVPBadge}, ${TopScorerBadge} { transform: skew(0); }
    
    &:hover {
      transform: translateY(-5px);
      .img-wrapper img { transform: scale(1.05); }
      ${CardContent} { transform: translateY(-5px); }
    }
  }
`;

const Name = styled.h3`
  font-size: 2rem;
  margin: 0;
  text-transform: uppercase;
  font-weight: 900;
  font-style: italic;
  color: #fff;
  line-height: 0.9;
  
  span {
    display: block;
    font-size: 1rem;
    color: #ff4500;
    font-weight: 700;
    margin-bottom: 5px;
    letter-spacing: 2px;
  }
`;

const Position = styled.div`
  display: inline-block;
  background: rgba(255,255,255,0.1);
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 1rem;
  border: 1px solid rgba(255,255,255,0.2);
  backdrop-filter: blur(4px);
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem;
  border: 1px dashed #333;
  background: rgba(255,255,255,0.02);
  max-width: 600px;
  margin: 2rem auto;

  h2 { color: #888; text-transform: uppercase; }
  p { color: #555; }
`;

function PlayersPage() {
  const { players, motm, topScorer } = useContext(DataContext);

  const sortedPlayers = [...players].sort((a, b) => {
    return (a.number || 0) - (b.number || 0);
  });

  const isPlayerMotm = (player) => {
    if (!motm) return false;
    return player.name === motm.player || player.id === motm.id;
  };

  return (
    <Container>
      <HeaderSection>
        <PageTitle>Spiller<span>stall</span></PageTitle>
        <PageSubtitle>Asker / Gui Herrer</PageSubtitle>
      </HeaderSection>

      <StatsHUD>
        <HUDItem>
          <span className="val">{players.length}</span>
          <span className="lbl">Krigere</span>
        </HUDItem>
        <HUDItem>
          <span className="val">2024/25</span>
          <span className="lbl">Sesong</span>
        </HUDItem>
        <HUDItem>
          <span className="val" style={{color:'#ff4500'}}>OPPRYKK</span>
          <span className="lbl">Målsetning</span>
        </HUDItem>
      </StatsHUD>

      {sortedPlayers.length > 0 ? (
        <Grid>
          {sortedPlayers.map((player, index) => {
            const isMotm = isPlayerMotm(player);
            const isTopScorer = topScorer && topScorer.name === player.name;

            return (
              <PlayerCard key={player.id} index={index} $isMotm={isMotm}>
                
                {/* Badges */}
                {player.isCaptain && <CaptainBadge title="Kaptein" />}
                {isMotm && <MVPBadge>MVP</MVPBadge>}
                {player.isTeamLeader && <LeaderBadge>LAGLEDER</LeaderBadge>}
                {player.isTrainer && <TrainerBadge title="Trener" />}

                {/* --- NY TOPPSCORER PLASSERING (NEDE TIL HØYRE) --- */}
                {isTopScorer && (
                    <TopScorerBadge>
                      <span className="label">Toppscorer</span>
                      <span className="count">{topScorer.goals}</span>
                    </TopScorerBadge>
                )}

                <div className="img-wrapper">
                  {player.image && (player.image.startsWith('data:') || player.image.startsWith('http')) ? (
                    <img src={player.image} alt={player.name} loading="lazy" />
                  ) : (
                    <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'4rem', background:'#111', color:'#333'}}>
                      🦁
                    </div>
                  )}
                </div>
                
                <BigNumber>{player.number}</BigNumber>

                <CardContent>
                  <Name>
                    <span>#{player.number}</span>
                    {player.name}
                  </Name>
                  <Position>{player.position || 'Ukjent Posisjon'}</Position>
                </CardContent>
              </PlayerCard>
            );
          })}
        </Grid>
      ) : (
        <EmptyState>
          <h2>Ingen spillere i troppen</h2>
          <p>Gå til Admin-panelet for å legge til spillere.</p>
        </EmptyState>
      )}
    </Container>
  );
}

export default PlayersPage;