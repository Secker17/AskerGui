import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  min-height: 80vh;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  text-align: center;
  color: #333;
  margin-bottom: 3rem;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    margin: 1rem auto 0;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PlayerCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 3rem;
  animation: fadeIn 0.8s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 2rem;
    gap: 1.5rem;
  }
`;

const PlayerImage = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  font-size: 8rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    animation: pulse 4s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    min-height: 300px;
    font-size: 6rem;
  }
`;

const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PlayerName = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const PlayerNumber = styled.p`
  font-size: 1.3rem;
  color: #667eea;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const PlayerBio = styled.p`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const StatsSection = styled.div`
  margin-top: 2rem;
`;

const StatsTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  }

  .label {
    font-weight: 600;
  }

  .value {
    font-size: 1.5rem;
    font-weight: 900;
  }
`;

const AchievementsSection = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid #eee;
`;

const AchievementsTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AchievementsList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const AchievementItem = styled.li`
  background: #f8f9ff;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #667eea;
  transition: all 0.3s ease;

  &:hover {
    background: #f0f3ff;
    transform: translateX(5px);
  }

  span {
    font-weight: 600;
    color: #667eea;
  }
`;

function BestPlayerPage() {
  return (
    <Container>
      <PageTitle>Beste Spiller 🌟</PageTitle>

      <PlayerCard>
        <PlayerImage>
          ⭐
        </PlayerImage>
        <PlayerInfo>
          <PlayerName>Magnus Andersen</PlayerName>
          <PlayerNumber>Nummer 7 • Høyre Fløy</PlayerNumber>
          <PlayerBio>
            Magnus Andersen er laget vårt mest talentfulle spiller med over 200 mål denne sesongen. 
            Med sin eksplosive hastighet og presise skudd, har han blitt en nøkkelfigur i Asker/Gui sitt 
            offensive spill. Han er kjent for sin dedikasjon, ledelse og inspirasjon til hele laget.
          </PlayerBio>

          <StatsSection>
            <StatsTitle>📊 Statistikk Denne Sesongen</StatsTitle>
            <StatsGrid>
              <StatItem>
                <span className="label">Mål</span>
                <span className="value">245</span>
              </StatItem>
              <StatItem>
                <span className="label">Assist</span>
                <span className="value">38</span>
              </StatItem>
              <StatItem>
                <span className="label">Kamper</span>
                <span className="value">24</span>
              </StatItem>
              <StatItem>
                <span className="label">Gjennomsnitt</span>
                <span className="value">10.2</span>
              </StatItem>
            </StatsGrid>
          </StatsSection>

          <AchievementsSection>
            <AchievementsTitle>🏆 Prestasjoner & Utmerkelser</AchievementsTitle>
            <AchievementsList>
              <AchievementItem>
                <span>Årets Spiller 2024</span> - Norges Håndballforbund
              </AchievementItem>
              <AchievementItem>
                <span>Toppskytt</span> - NM Serien 2024
              </AchievementItem>
              <AchievementItem>
                <span>Beste Fløyspiller</span> - Eliteserien 2024
              </AchievementItem>
              <AchievementItem>
                <span>Landslagsspiller</span> - Norges Håndballlag
              </AchievementItem>
            </AchievementsList>
          </AchievementsSection>
        </PlayerInfo>
      </PlayerCard>
    </Container>
  );
}

export default BestPlayerPage;
