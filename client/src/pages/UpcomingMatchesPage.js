import React, { useContext } from 'react';
import styled from 'styled-components';
import { DataContext } from '../context/DataContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 80vh;

  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  text-align: center;
  color: #fff;
  margin-bottom: 0.5rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -1px;

  @media (min-width: 768px) {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
`;

const PageSubtitle = styled.p`
  text-align: center;
  color: #bdbdbd;
  font-size: 0.95rem;
  margin-bottom: 2.5rem;

  @media (min-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 3rem;
  }
`;

const MatchesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    gap: 2rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const MatchCard = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 1.5rem;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  animation: slideUp 0.5s ease-out;
  backdrop-filter: blur(10px);

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(255,255,255,0.15);
    box-shadow: 0 12px 40px rgba(255,255,255,0.1);
  }

  @media (max-width: 768px) {
    border-left: 3px solid ${props => {
      if (props.status === 'upcoming') return '#eaeaea';
      if (props.status === 'live') return '#ffffff';
      return '#bdbdbd';
    }};
  }
`;

const MatchHeader = styled.div`
  background: #0a0a0a;
  color: white;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255,255,255,0.06);
`;

const MatchDate = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const MatchTime = styled.div`
  font-size: 1.3rem;
  font-weight: 900;
`;

const MatchBody = styled.div`
  padding: 2rem;
`;

const TeamsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 1rem;
`;

const Team = styled.div`
  flex: 1;
  text-align: center;
`;

const TeamName = styled.h3`
  font-size: 1.2rem;
  color: #f1f1f1;
  margin-bottom: 0.5rem;
  font-weight: 800;
`;

const TeamLogo = styled.div`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const VS = styled.div`
  font-size: 0.9rem;
  color: #bdbdbd;
  font-weight: 700;
  text-transform: uppercase;
`;

const MatchDetails = styled.div`
  background: #0b0b0b;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid rgba(255,255,255,0.06);
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;

  &:last-child {
    margin-bottom: 0;
  }

  .label {
    color: #bdbdbd;
    font-weight: 600;
  }

  .value {
    color: #f1f1f1;
    font-weight: 800;
  }
`;


function UpcomingMatchesPage() {
  const { matches } = useContext(DataContext);

  return (
    <Container>
      <PageTitle>📅 Kommende Kamper</PageTitle>
      <PageSubtitle>Se alle kommende kamper for Asker/Gui</PageSubtitle>

      <MatchesGrid>
        {matches.map(match => (
          <MatchCard key={match.id}>
            <MatchHeader>
              <div>
                <MatchDate>{match.date}</MatchDate>
                <MatchTime>{match.time}</MatchTime>
              </div>
            </MatchHeader>

            <MatchBody>
              <TeamsContainer>
                <Team>
                  <TeamName>Asker/Gui</TeamName>
                  <TeamLogo>🏐</TeamLogo>
                </Team>
                <VS>VS</VS>
                <Team>
                  <TeamName>{match.opponent}</TeamName>
                  <TeamLogo>{match.logo}</TeamLogo>
                </Team>
              </TeamsContainer>

              <MatchDetails>
                <DetailRow>
                  <span className="label">📍 Arena:</span>
                  <span className="value">{match.location}</span>
                </DetailRow>
              </MatchDetails>
            </MatchBody>
          </MatchCard>
        ))}
      </MatchesGrid>
    </Container>
  );
}

export default UpcomingMatchesPage;
