import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 25%, #2d2d2d 50%, #1a1a1a 75%, #0f0f0f 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  position: relative;

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(255, 0, 0, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 40% 20%, rgba(255, 100, 0, 0.06) 0%, transparent 50%);
    pointer-events: none;
    z-index: 1;
  }
`;

const Hero = styled.section`
  background: transparent;
  color: white;
  padding: 6rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const MotmSection = styled.section`
  padding: 3rem 2rem;
  max-width: 1100px;
  margin: 0 auto 2rem;
  position: relative;
  z-index: 2;
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
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
  max-width: 600px;
  margin: 0 auto;
  animation: fadeInDown 0.8s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

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

const LogoContainer = styled.div`
  position: relative;
  width: 240px;
  height: 240px;
  background: transparent;
  border: none;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s ease;
  overflow: visible;
  box-shadow: none;
  filter: none;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: none;
  }

  .placeholder {
    font-size: 5rem;
    opacity: 0.8;
    transition: all 0.3s ease;
    filter: none;
  }

  input[type="file"] {
    display: none;
  }

  @media (max-width: 768px) {
    width: 180px;
    height: 180px;

    .placeholder {
      font-size: 4rem;
    }
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  margin: 0;
  font-weight: 900;
  text-shadow: 
    0 0 20px rgba(255, 50, 0, 0.8),
    0 0 40px rgba(255, 0, 0, 0.6),
    2px 2px 8px rgba(0, 0, 0, 0.8);
  color: #fff;
  letter-spacing: 2px;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  margin: 0;
  opacity: 1;
  color: #ff6400;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-shadow: 
    0 0 15px rgba(255, 100, 0, 0.6),
    0 0 30px rgba(255, 50, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const CTAButton = styled(Link)`
  padding: 1rem 2.5rem;
  font-size: 1.05rem;
  font-weight: 800;
  border: none;
  border-radius: 0;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  box-shadow: 
    0 0 30px rgba(255, 50, 0, 0.4),
    0 8px 20px rgba(0, 0, 0, 0.4);

  &.primary {
    background: linear-gradient(135deg, #ff4500 0%, #ff6400 100%);
    color: #fff;
    border: 2px solid #ff2500;

    &:hover {
      transform: translateY(-4px) scale(1.05);
      box-shadow: 
        0 0 50px rgba(255, 50, 0, 0.7),
        0 12px 30px rgba(0, 0, 0, 0.5);
      filter: brightness(1.2);
    }
  }

  &.secondary {
    background: transparent;
    color: #ff6400;
    border: 2px solid #ff6400;

    &:hover {
      background: rgba(255, 100, 0, 0.15);
      transform: translateY(-4px);
      box-shadow: 
        0 0 50px rgba(255, 50, 0, 0.6),
        0 12px 30px rgba(0, 0, 0, 0.5);
    }
  }

  @media (max-width: 768px) {
    padding: 0.9rem 2rem;
    font-size: 0.95rem;
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
  const logo = '/images/standard_832px-Asker_SK_logo.svg.png';


  return (
    <Container>
      <Hero>
        <HeroContent>
          <LogoContainer>
            {logo ? (
              <img src={logo} alt="Team Logo" />
            ) : (
              <div className="placeholder">🏐</div>
            )}
          </LogoContainer>
          <Title>Asker</Title>
          <Subtitle>Blø for drakta</Subtitle>
          <CTAButtons>
            <CTAButton to="/matches" className="primary">
              Kommende Kamper
            </CTAButton>
          </CTAButtons>
        </HeroContent>
      </Hero>

      <MotmSection>
        <MotmCard>
          <MotmImage>
            {motm.image && (motm.image.startsWith('data:') || motm.image.startsWith('http')) ? (
              <img src={motm.image} alt={motm.player} />
            ) : (
              '⭐'
            )}
          </MotmImage>
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
