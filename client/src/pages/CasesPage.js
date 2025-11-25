import React, { useMemo, useState, useContext } from 'react';
import styled from 'styled-components';
import { DataContext } from '../context/DataContext';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem;
  min-height: 100vh;
`;

const PageTitle = styled.h1`
  font-size: 3.5rem;
  text-align: center;
  color: #fff;
  margin-bottom: 0.5rem;
  font-weight: 900;
  letter-spacing: -1px;
  text-transform: uppercase;
  background: linear-gradient(180deg, #ffffff 0%, #bdbdbd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled.p`
  text-align: center;
  color: #bdbdbd;
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
  font-weight: 500;
`;

const Notice = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.04) 100%);
  border: 1px solid rgba(255,255,255,0.1);
  color: #cfcfcf;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2.5rem;
  text-align: center;
  backdrop-filter: blur(10px);
  font-size: 0.95rem;
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const ControlButton = styled.button`
  padding: 0.9rem 1.8rem;
  background: ${p => (p.active ? '#fff' : 'rgba(255,255,255,0.05)')};
  color: ${p => (p.active ? '#000' : '#fff')};
  border: 2px solid ${p => (p.active ? '#fff' : 'rgba(255,255,255,0.2)')};
  border-radius: 12px;
  font-weight: 900;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  text-transform: uppercase;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(255,255,255,0.15);
    background: ${p => (p.active ? '#fff' : 'rgba(255,255,255,0.1)')};
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.4rem;
    font-size: 0.85rem;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const ListItem = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 1.8rem;
  display: grid;
  grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr;
  gap: 2rem;
  align-items: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    border-color: rgba(255,255,255,0.15);
    box-shadow: 0 20px 50px rgba(0,0,0,0.4);
    transform: translateY(-4px);

    &::before {
      left: 100%;
    }
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const Rank = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  color: #fff;
  text-align: center;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.1);

  @media (max-width: 1024px) {
    font-size: 1.8rem;
    padding: 0.8rem;
  }
`;

const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PlayerName = styled.h3`
  color: #fff;
  margin: 0;
  font-size: 1.3rem;
  font-weight: 900;
`;

const PlayerReason = styled.p`
  color: #bdbdbd;
  margin: 0;
  font-size: 0.95rem;
`;

const StatBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  text-align: center;

  .label {
    color: #9f9f9f;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .value {
    color: #fff;
    font-size: 1.4rem;
    font-weight: 900;
  }

  @media (max-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: left;
    gap: 0.8rem;

    .label {
      grid-column: 1;
    }

    .value {
      grid-column: 2;
      text-align: right;
    }
  }
`;

export default function CasesPage() {
  const [sortBy, setSortBy] = useState('fine');
  const { cases } = useContext(DataContext);

  const sorted = useMemo(() => {
    const arr = [...cases];
    if (sortBy === 'fine') {
      arr.sort((a, b) => b.fine - a.fine);
    } else {
      arr.sort((a, b) => b.likelihood - a.likelihood);
    }
    return arr;
  }, [cases, sortBy]);

  const formatNOK = (n) => new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK', maximumFractionDigits: 0 }).format(n);
  const pct = (v) => `${Math.round(v * 100)}%`;

  return (
    <Container>
      <PageTitle>Kommende Rettsaker</PageTitle>
      <Subtitle>Fiktive saker vi lager for moro skyld</Subtitle>

      <Notice>
        ⚠️ Dette er en fiktiv toppliste. Ingen virkelige personer eller juridiske saker er representert.
      </Notice>

      <Controls>
        <ControlButton active={sortBy === 'fine'} onClick={() => setSortBy('fine')}>💰 Høyest Bot</ControlButton>
        <ControlButton active={sortBy === 'likelihood'} onClick={() => setSortBy('likelihood')}>⚖️ Størst Sannsynlighet</ControlButton>
      </Controls>

      <List>
        {sorted.map((item, idx) => (
          <ListItem key={item.id}>
            <Rank>#{idx + 1}</Rank>
            <PlayerInfo>
              <PlayerName>{item.player}</PlayerName>
              <PlayerReason>{item.reason}</PlayerReason>
            </PlayerInfo>
            <StatBox>
              <span className="label">Bot</span>
              <span className="value">{formatNOK(item.fine)}</span>
            </StatBox>
            <StatBox>
              <span className="label">Rettssak</span>
              <span className="value">{pct(item.likelihood)}</span>
            </StatBox>
            <StatBox>
              <span className="label">Runde</span>
              <span className="value">{item.round}</span>
            </StatBox>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
