import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { DataContext } from '../context/DataContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  min-height: 80vh;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  text-align: center;
  color: #f1f1f1;
  margin-bottom: 3rem;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #ffffff, #aaaaaa);
    margin: 1rem auto 0;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.8rem 1.5rem;
  border: 2px solid #eaeaea;
  background: ${props => props.active ? '#111' : '#000'};
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  letter-spacing: 0.3px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
`;

const MatchesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MatchCard = styled.div`
  background: #0f0f0f;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
  transition: all 0.3s ease;
  animation: slideUp 0.5s ease-out;
  border-left: 5px solid ${props => {
    if (props.status === 'upcoming') return '#eaeaea';
    if (props.status === 'live') return '#ffffff';
    return '#bdbdbd';
  }};

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
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(102, 126, 234, 0.2);
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

const StatusBadge = styled.span`
  background: ${props => props.status === 'live' ? '#ffffff' : 'rgba(255, 255, 255, 0.15)'};
  color: ${props => props.status === 'live' ? '#000' : '#fff'};
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
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

const ActionButton = styled.button`
  width: 100%;
  padding: 0.9rem;
  background: #000;
  color: white;
  border: 2px solid #eaeaea;
  border-radius: 10px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
  }

  &:active {
    transform: translateY(0);
  }
`;

function UpcomingMatchesPage() {
  const [filter, setFilter] = useState('all');
  const { matches } = useContext(DataContext);

  const filteredMatches = filter === 'all' 
    ? matches 
    : matches.filter(m => m.competition === filter);

  return (
    <Container>
      <PageTitle>Kommende Kamper 📅</PageTitle>

      <FilterButtons>
        <FilterButton 
          active={filter === 'all'} 
          onClick={() => setFilter('all')}
        >
          Alle Kamper
        </FilterButton>
        <FilterButton 
          active={filter === 'NM Serien'} 
          onClick={() => setFilter('NM Serien')}
        >
          NM Serien
        </FilterButton>
        <FilterButton 
          active={filter === 'Cupkamp'} 
          onClick={() => setFilter('Cupkamp')}
        >
          Cupkamper
        </FilterButton>
      </FilterButtons>

      <MatchesGrid>
        {filteredMatches.map(match => (
          <MatchCard key={match.id} status={match.status}>
            <MatchHeader>
              <div>
                <MatchDate>{match.date}</MatchDate>
                <MatchTime>{match.time}</MatchTime>
              </div>
              <StatusBadge status={match.status}>
                {match.status === 'upcoming' ? 'Kommende' : 'Live'}
              </StatusBadge>
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
                <DetailRow>
                  <span className="label">🎯 Turnering:</span>
                  <span className="value">{match.competition}</span>
                </DetailRow>
                <DetailRow>
                  <span className="label">🎫 Billetter:</span>
                  <span className="value">{match.tickets}</span>
                </DetailRow>
              </MatchDetails>

              <ActionButton>
                Kjøp Billetter
              </ActionButton>
            </MatchBody>
          </MatchCard>
        ))}
      </MatchesGrid>
    </Container>
  );
}

export default UpcomingMatchesPage;
