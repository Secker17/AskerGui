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
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  animation: slideUp 0.5s ease-out;
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(255,255,255,0.15);
    box-shadow: 0 12px 40px rgba(255,255,255,0.1);
{{ ... }}
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MatchHeader = styled.div`
  padding: 0.8rem 1.2rem;
  text-align: center;
  background: rgba(0,0,0,0.2);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  font-size: 0.9rem;
  color: #fff;
  font-weight: 700;
`;

const MatchBody = styled.div`
  padding: 1.5rem 1rem;
`;

const TeamsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
`;

const Team = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
`;

const TeamName = styled.h3`
  font-size: 1.1rem;
  color: #f1f1f1;
  margin: 0;
  font-weight: 800;
  line-height: 1.3;
`;

const VS = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: #fff;
  margin: 0 1rem;
`;

const Location = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255,255,255,0.08);
  color: #bdbdbd;
  font-size: 0.9rem;
  font-weight: 600;
`; = useContext(DataContext);

  const formatDate = (dateString) => {
    if (!dateString) return { day: '', month: '' };
    const date = new Date(dateString);
    const day = date.getDate();
{{ ... }}

      <MatchesGrid>
        {matches.map(match => (
          <MatchCard key={match.id}>
            <MatchHeader>
              {new Date(match.date).toLocaleDateString('nb-NO', { weekday: 'long', day: 'numeric', month: 'long' })} • {match.time}
            </MatchHeader>
            <MatchBody>
              <TeamsContainer>
                <Team>
                  <TeamLogo>🏐</TeamLogo>
                  <TeamName>Asker/Gui</TeamName>
                </Team>
                <VS>VS</VS>
                <Team>
                  <TeamLogo>{match.logo}</TeamLogo>
                  <TeamName>{match.opponent}</TeamName>
                </Team>
              </TeamsContainer>
              <Location>📍 {match.location}</Location>
            </MatchBody>
          </MatchCard>
        ))}
      </MatchesGrid>
    </Container>
  );
}

