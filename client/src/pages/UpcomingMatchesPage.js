import React, { useContext } from 'react';
import styled from 'styled-components';
import { DataContext } from '../context/DataContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem 3rem;
  min-height: 80vh;

  @media (min-width: 768px) {
    padding: 3rem 2rem 4rem;
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

  @media (max-width: 480px) {
    font-size: 1.8rem;
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
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 2rem;
  }
`;

const MatchCard = styled.article`
  background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(12px);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(255,255,255,0.2);
    box-shadow: 0 18px 45px rgba(0,0,0,0.45);
  }
`;

const MatchHeader = styled.header`
  padding: 1rem 1.4rem;
  text-align: center;
  background: rgba(0,0,0,0.3);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  font-size: 0.95rem;
  font-weight: 700;
  color: #f0f0f0;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const MatchBody = styled.div`
  padding: 1.8rem 1.4rem;
`;

const TeamsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: center;
  gap: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Team = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
`;

const TeamLogo = styled.div`
  font-size: 3rem;

  @media (max-width: 480px) {
    font-size: 2.6rem;
  }
`;

const TeamName = styled.h3`
  font-size: 1.2rem;
  color: #ffffff;
  font-weight: 800;
  margin: 0;
  letter-spacing: 0.4px;

  @media (max-width: 480px) {
    font-size: 1.05rem;
  }
`;

const VS = styled.div`
  font-size: 1.2rem;
  font-weight: 900;
  color: #ff9560;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;

  @media (max-width: 480px) {
    order: -1;
  }
`;

const MatchFooter = styled.footer`
  padding: 1rem 1.4rem;
  background: rgba(0,0,0,0.25);
  border-top: 1px solid rgba(255,255,255,0.08);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  color: #c9c9c9;
  font-size: 0.95rem;

  span {
    display: block;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;

    span {
      display: inline;
    }
  }
`;

const formatDate = (value) => {
  if (!value) return 'Dato kunngjøres senere';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString('nb-NO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
};

const formatTime = (value) => (value ? value : 'Tid TBD');

const formatLocation = (value) => (value ? value : 'Lokasjon annonseres senere');

function UpcomingMatchesPage() {
  const { matches } = useContext(DataContext);

  return (
    <Container>
      <PageTitle>📅 Kommende Kamper</PageTitle>
      <PageSubtitle>Se alle kommende kamper for Asker/Gui</PageSubtitle>

      <MatchesGrid>
        {matches.map(match => (
          <MatchCard key={match.id}>
            <MatchHeader>{formatDate(match.date)}</MatchHeader>

            <MatchBody>
              <TeamsGrid>
                <Team>
                  <TeamLogo>🏐</TeamLogo>
                  <TeamName>Asker/Gui</TeamName>
                </Team>

                <VS>VS</VS>

                <Team>
                  <TeamLogo>{match.logo || '🤝'}</TeamLogo>
                  <TeamName>{match.opponent}</TeamName>
                </Team>
              </TeamsGrid>
            </MatchBody>

            <MatchFooter>
              <span>{formatTime(match.time)}</span>
              <span>📍 {formatLocation(match.location)}</span>
            </MatchFooter>
          </MatchCard>
        ))}
      </MatchesGrid>
    </Container>
  );
}

export default UpcomingMatchesPage;
