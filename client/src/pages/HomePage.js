import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const Hero = styled.section`
  background: linear-gradient(180deg, #000000 0%, #111111 100%);
  color: white;
  padding: 6rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const MotmSection = styled.section`
  padding: 3rem 2rem;
  max-width: 1100px;
  margin: -3rem auto 2rem;
`;

const MotmCard = styled.div`
  background: linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.6);
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MotmImage = styled.div`
  background: #111;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  min-height: 220px;
`;

const MotmContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MotmHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
`;

const MotmTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 800;
`;

const MotmBadge = styled.span`
  background: #fff;
  color: #000;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.5px;
`;

const MotmSub = styled.p`
  color: #cfcfcf;
  margin-bottom: 1rem;
`;

const MotmStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const MotmStat = styled.div`
  background: #0b0b0b;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 10px;
  padding: 0.9rem;
  text-align: center;

  .value {
    font-size: 1.4rem;
    font-weight: 900;
    color: #fff;
  }

  .label {
    color: #bdbdbd;
    font-size: 0.85rem;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
  animation: fadeInDown 0.8s ease-out;

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  font-weight: 900;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.95;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const CTAButton = styled(Link)`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;

  &.primary {
    background: white;
    color: #000;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    }
  }

  &.secondary {
    background: rgba(255, 255, 255, 0.08);
    color: white;
    border: 2px solid white;

    &:hover {
      background: rgba(255, 255, 255, 0.16);
      transform: translateY(-3px);
    }
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #eaeaea;
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
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const FeatureCard = styled.div`
  background: #0f0f0f;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #ffffff;
  }

  p {
    color: #bdbdbd;
    line-height: 1.6;
  }

  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
`;

const StatsSection = styled.section`
  background: #0d0d0d;
  color: white;
  padding: 4rem 2rem;
  margin: 4rem 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const StatCard = styled.div`
  animation: slideUp 0.6s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .number {
    font-size: 3rem;
    font-weight: 900;
    margin-bottom: 0.5rem;
  }

  .label {
    font-size: 1.1rem;
    opacity: 0.9;
  }
`;

function HomePage() {
  const { motm } = useContext(DataContext);

  return (
    <Container>
      <Hero>
        <HeroContent>
          <Title>🏐 Asker/Gui Herrer Håndball</Title>
          <Subtitle>Norges mest moderne og spennende håndballag</Subtitle>
          <CTAButtons>
            <CTAButton to="/matches" className="primary">
              Se Kommende Kamper
            </CTAButton>
          </CTAButtons>
        </HeroContent>
      </Hero>

      <MotmSection>
        <MotmCard>
          <MotmImage>⭐</MotmImage>
          <MotmContent>
            <MotmHeader>
              <MotmTitle>Man of the Match</MotmTitle>
              <MotmBadge>{motm.round}</MotmBadge>
            </MotmHeader>
            <MotmSub>{motm.player} • {motm.position} • #{motm.number}</MotmSub>
            <MotmStats>
              <MotmStat>
                <div className="value">{motm.goals}</div>
                <div className="label">Mål</div>
              </MotmStat>
              <MotmStat>
                <div className="value">{motm.assists}</div>
                <div className="label">Assist</div>
              </MotmStat>
              <MotmStat>
                <div className="value">{motm.accuracy}%</div>
                <div className="label">Treffsikkerhet</div>
              </MotmStat>
            </MotmStats>
          </MotmContent>
        </MotmCard>
      </MotmSection>

      <FeaturesSection>
        <SectionTitle>Hva Vi Tilbyr</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <div className="icon">📅</div>
            <h3>Kommende Kamper</h3>
            <p>Hold deg oppdatert med alle kommende kamper, tider, og arenaer for hele sesongen.</p>
          </FeatureCard>
          <FeatureCard>
            <div className="icon">⚖️</div>
            <h3>Kommende Rettsaker</h3>
            <p>Utforsk (fiktive) saker med høyeste bøter og hvilke som kan gå til rettssak – kun for gøy.</p>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <StatsSection>
        <StatsGrid>
          <StatCard>
            <div className="number">25+</div>
            <div className="label">Spillere</div>
          </StatCard>
          <StatCard>
            <div className="number">15</div>
            <div className="label">Kamper Sesongen</div>
          </StatCard>
          <StatCard>
            <div className="number">95%</div>
            <div className="label">Seier Prosent</div>
          </StatCard>
          <StatCard>
            <div className="number">2025</div>
            <div className="label">Etablert År</div>
          </StatCard>
        </StatsGrid>
      </StatsSection>
    </Container>
  );
}

export default HomePage;
