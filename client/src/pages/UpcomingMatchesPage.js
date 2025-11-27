import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { DataContext } from '../context/DataContext';

// --- Animasjoner ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// --- Styled Components ---

const Container = styled.div`
  min-height: 100vh;
  padding: 4rem 1rem;
  background-color: #050505;
  color: white;
  position: relative;
  overflow-x: hidden;

  /* Samme aggressive bakgrunn som Home */
  background-image: 
    linear-gradient(rgba(255, 69, 0, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 69, 0, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;

  &::before {
    content: '';
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(circle at 50% 0%, rgba(255, 69, 0, 0.1) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
`;

const PageTitle = styled.h1`
  font-size: 4rem;
  font-weight: 900;
  text-transform: uppercase;
  font-style: italic;
  margin: 0;
  letter-spacing: -2px;
  color: #fff;
  text-shadow: 4px 4px 0px #ff4500;
  transform: skew(-5deg);

  span {
    color: #ff4500;
    text-shadow: none;
    -webkit-text-stroke: 2px white;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const PageSubtitle = styled.p`
  color: #888;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 700;
  margin-top: 1rem;
  font-size: 1.1rem;
  
  &::before, &::after {
    content: '///';
    color: #ff4500;
    margin: 0 10px;
  }
`;

const MatchesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

// --- Battle Card Design ---
const BattleCard = styled.article`
  background: #0f0f0f;
  border: 1px solid #222;
  border-left: 6px solid #ff4500; /* Oransje "stripe" */
  position: relative;
  display: grid;
  grid-template-columns: 150px 1fr 150px; /* Dato - Kamp - Sted */
  align-items: stretch;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform: skew(-10deg); /* Action vinkel */
  margin-left: 20px; 
  margin-right: 20px;
  animation: ${fadeIn} 0.5s ease-out backwards;
  animation-delay: ${props => props.index * 0.1}s;

  &:hover {
    transform: skew(-10deg) translateX(10px);
    box-shadow: -10px 10px 30px rgba(0,0,0,0.5);
    border-color: #444;
    
    .vs-text {
      transform: scale(1.2) skew(10deg);
      color: #ff4500;
    }
  }

  /* Rette opp innholdet inni */
  > * {
    transform: skew(10deg); 
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    transform: skew(0);
    border-left: 1px solid #222;
    border-top: 6px solid #ff4500;
    margin: 0;

    &:hover {
      transform: translateY(-5px);
    }

    > * { transform: skew(0); }
  }
`;

const DateSection = styled.div`
  background: #161616;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  border-right: 1px solid #222;
  text-align: center;

  .day {
    font-size: 2.5rem;
    font-weight: 900;
    color: #fff;
    line-height: 1;
  }
  
  .month {
    font-size: 1.2rem;
    text-transform: uppercase;
    font-weight: 700;
    color: #ff4500;
  }

  .weekday {
    font-size: 0.8rem;
    color: #666;
    margin-top: 5px;
    text-transform: uppercase;
  }

  @media (max-width: 900px) {
    flex-direction: row;
    gap: 1rem;
    border-right: none;
    border-bottom: 1px solid #222;
    padding: 1rem;
    
    .day { font-size: 1.5rem; }
    .month { font-size: 1rem; }
  }
`;

const MatchContent = styled.div`
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  position: relative;

  /* Bakgrunns VS */
  &::before {
    content: 'VS';
    position: absolute;
    font-size: 8rem;
    font-weight: 900;
    font-style: italic;
    color: rgba(255,255,255,0.02);
    z-index: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const TeamBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 1;
  width: 120px;

  img {
    width: 70px;
    height: 70px;
    object-fit: contain;
    filter: drop-shadow(0 5px 5px rgba(0,0,0,0.5));
  }

  .name {
    font-weight: 800;
    text-transform: uppercase;
    font-size: 1rem;
    text-align: center;
    line-height: 1.2;
  }
`;

const VS = styled.div`
  font-size: 2rem;
  font-weight: 900;
  font-style: italic;
  color: #333;
  transition: 0.3s;
  z-index: 1;

  @media (max-width: 600px) {
    transform: rotate(90deg);
    font-size: 1.5rem;
  }
`;

const InfoSection = styled.div`
  background: #161616;
  border-left: 1px solid #222;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5rem;
  gap: 1rem;

  @media (max-width: 900px) {
    border-left: none;
    border-top: 1px solid #222;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .icon {
    color: #ff4500;
    font-size: 1.2rem;
  }
  
  .text {
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    color: #ccc;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem;
  background: rgba(255,255,255,0.03);
  border: 1px dashed #333;
  color: #666;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 2rem;
`;

// Helper functions
const getDay = (d) => new Date(d).getDate();
const getMonth = (d) => new Date(d).toLocaleDateString('nb-NO', { month: 'short' }).replace('.', '');
const getWeekday = (d) => new Date(d).toLocaleDateString('nb-NO', { weekday: 'long' });

function UpcomingMatchesPage() {
  const { matches } = useContext(DataContext);
  
  const HOME_LOGO = '/images/standard_832px-Asker_SK_logo.svg.png';

  // SORTERING: Lager en ny liste og sorterer den på dato (Ascending / Stigende)
  // Dette sikrer at datoer nærmest i tid (eller eldste) kommer først.
  const sortedMatches = [...matches].sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <Container>
      <HeaderSection>
        <PageTitle>Termin<span>liste</span></PageTitle>
        <PageSubtitle>Neste slag om poengene</PageSubtitle>
      </HeaderSection>

      <MatchesGrid>
        {sortedMatches.length > 0 ? (
          sortedMatches.map((match, index) => (
            <BattleCard key={match.id || index} index={index}>
              
              {/* Dato Seksjon */}
              <DateSection>
                <span className="day">{match.date ? getDay(match.date) : '?'}</span>
                <span className="month">{match.date ? getMonth(match.date) : 'TBD'}</span>
                <span className="weekday">{match.date ? getWeekday(match.date) : ''}</span>
              </DateSection>

              {/* Kamp Seksjon */}
              <MatchContent>
                <TeamBlock>
                  <img src={HOME_LOGO} alt="Asker" />
                  <span className="name">Asker / Gui</span>
                </TeamBlock>
                
                <VS className="vs-text">VS</VS>
                
                <TeamBlock>
                  {match.logo ? (
                     <img src={match.logo} alt={match.opponent} />
                  ) : (
                     <div style={{fontSize: '3rem'}}>🛡️</div>
                  )}
                  <span className="name">{match.opponent || 'Motstander'}</span>
                </TeamBlock>
              </MatchContent>

              {/* Info Seksjon */}
              <InfoSection>
                <InfoItem>
                  <span className="icon">⏰</span>
                  <span className="text">{match.time || 'Tid kommer'}</span>
                </InfoItem>
                <InfoItem>
                  <span className="icon">📍</span>
                  <span className="text">{match.location || 'Hjemme'}</span>
                </InfoItem>
              </InfoSection>

            </BattleCard>
          ))
        ) : (
          <EmptyState>Ingen planlagte kamper<br/><span style={{fontSize:'1rem', color:'#444'}}>Sjekk igjen senere</span></EmptyState>
        )}
      </MatchesGrid>
    </Container>
  );
}

export default UpcomingMatchesPage;