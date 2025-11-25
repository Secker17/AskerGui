import React, { useState } from 'react';
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
  margin-bottom: 1rem;
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

const Disclaimer = styled.div`
  background: #fff3cd;
  border: 2px solid #ffc107;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #856404;
  font-weight: 500;

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 0.95rem;
  }
`;

const CasesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const CaseCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: slideUp 0.5s ease-out;
  border-top: 5px solid #667eea;
  cursor: pointer;

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
    border-top: 3px solid #667eea;
  }
`;

const CaseHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const CaseTitle = styled.h3`
  font-size: 1.3rem;
  margin: 0;
  font-weight: 700;
`;

const CaseStatus = styled.span`
  background: rgba(255, 255, 255, 0.3);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
`;

const CaseBody = styled.div`
  padding: 1.5rem;
`;

const CaseDate = styled.p`
  color: #667eea;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
`;

const CaseDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.95rem;
`;

const CaseDetails = styled.div`
  background: #f8f9ff;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;

  &:last-child {
    margin-bottom: 0;
  }

  .label {
    color: #666;
    font-weight: 500;
  }

  .value {
    color: #333;
    font-weight: 600;
  }
`;

const ExpandButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(102, 126, 234, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ExpandedContent = styled.div`
  background: #f8f9ff;
  padding: 1.5rem;
  border-top: 1px solid #eee;
  margin-top: 1rem;
  border-radius: 8px;
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      max-height: 0;
    }
    to {
      opacity: 1;
      max-height: 500px;
    }
  }

  h4 {
    color: #667eea;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    font-size: 1rem;

    &:first-child {
      margin-top: 0;
    }
  }

  p {
    color: #666;
    line-height: 1.6;
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
  }

  ul {
    color: #666;
    margin-left: 1.5rem;
    line-height: 1.6;
    font-size: 0.95rem;

    li {
      margin-bottom: 0.3rem;
    }
  }
`;

const InfoSection = styled.section`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-top: 3rem;

  h2 {
    color: #333;
    margin-bottom: 1rem;
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  p {
    color: #666;
    line-height: 1.8;
    margin-bottom: 1rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;

    h2 {
      font-size: 1.4rem;
    }
  }
`;

function LegalPage() {
  const [expandedCases, setExpandedCases] = useState({});

  const toggleExpand = (caseId) => {
    setExpandedCases(prev => ({
      ...prev,
      [caseId]: !prev[caseId]
    }));
  };

  const cases = [
    {
      id: 1,
      title: 'Kontrakttviste - Spiller A',
      date: 'Forventet høring: 15. Januar 2026',
      status: 'Pågående',
      player: 'Placeholder Navn',
      court: 'Oslo Tingrett',
      type: 'Arbeidsrettslig sak',
      description: 'Denne saken gjelder en kontrakttviste mellom laget og en spiller angående kontraktsbetingelser.',
      details: `
        <h4>Bakgrunn:</h4>
        <p>Denne saken er rent illustrativ og brukes kun for å demonstrere systemet. Ingen virkelige personer eller hendelser er representert.</p>
        
        <h4>Juridisk Grunnlag:</h4>
        <ul>
          <li>Arbeidsavtale fra 2024</li>
          <li>Norsk arbeidslov</li>
          <li>Idrettens arbeidsrettslige regler</li>
        </ul>
        
        <h4>Status:</h4>
        <p>Saken er under behandling. Neste høring er planlagt for 15. januar 2026.</p>
      `
    },
    {
      id: 2,
      title: 'Disiplinærsak - Regelbrudd',
      date: 'Forventet avgjørelse: 20. Desember 2025',
      status: 'Under behandling',
      player: 'Placeholder Navn',
      court: 'Norges Håndballforbund',
      type: 'Disiplinær sak',
      description: 'Disiplinærsak relatert til påstått regelbrudd under en kamp i NM-serien.',
      details: `
        <h4>Bakgrunn:</h4>
        <p>Denne saken er rent illustrativ og brukes kun for å demonstrere systemet. Ingen virkelige personer eller hendelser er representert.</p>
        
        <h4>Anklagepunkter:</h4>
        <ul>
          <li>Påstått regelbrudd under kamp</li>
          <li>Oppførsel overfor dommer</li>
        </ul>
        
        <h4>Prosess:</h4>
        <p>Saken behandles av Norges Håndballforbunds disiplinærkomité. Avgjørelse forventes 20. desember 2025.</p>
      `
    },
    {
      id: 3,
      title: 'Skadeerstatningskrav',
      date: 'Forventet avgjørelse: 10. Januar 2026',
      status: 'Venter på dom',
      player: 'Placeholder Navn',
      court: 'Oslo Tingrett',
      type: 'Sivil sak',
      description: 'Skadeerstatningskrav knyttet til en påstått skade oppstått under trening.',
      details: `
        <h4>Bakgrunn:</h4>
        <p>Denne saken er rent illustrativ og brukes kun for å demonstrere systemet. Ingen virkelige personer eller hendelser er representert.</p>
        
        <h4>Kravet:</h4>
        <ul>
          <li>Medisinsk behandling</li>
          <li>Tapt inntekt under rehabilitering</li>
          <li>Smerte og lidelse</li>
        </ul>
        
        <h4>Status:</h4>
        <p>Saken er under behandling i Oslo Tingrett. Dom forventes 10. januar 2026.</p>
      `
    }
  ];

  return (
    <Container>
      <PageTitle>Juridisk Informasjon ⚖️</PageTitle>

      <Disclaimer>
        ⚠️ <strong>VIKTIG MERKNAD:</strong> Alle saker på denne siden er fiktive og brukes kun for demonstrasjon. 
        Ingen virkelige personer, hendelser eller juridiske saker er representert. Dette er kun et eksempel på hvordan 
        juridisk informasjon kan presenteres.
      </Disclaimer>

      <CasesGrid>
        {cases.map(caseItem => (
          <CaseCard key={caseItem.id}>
            <CaseHeader>
              <div>
                <CaseTitle>{caseItem.title}</CaseTitle>
              </div>
              <CaseStatus>{caseItem.status}</CaseStatus>
            </CaseHeader>

            <CaseBody>
              <CaseDate>📅 {caseItem.date}</CaseDate>
              <CaseDescription>{caseItem.description}</CaseDescription>

              <CaseDetails>
                <DetailRow>
                  <span className="label">👤 Spiller:</span>
                  <span className="value">{caseItem.player}</span>
                </DetailRow>
                <DetailRow>
                  <span className="label">🏛️ Instans:</span>
                  <span className="value">{caseItem.court}</span>
                </DetailRow>
                <DetailRow>
                  <span className="label">📋 Type:</span>
                  <span className="value">{caseItem.type}</span>
                </DetailRow>
              </CaseDetails>

              <ExpandButton onClick={() => toggleExpand(caseItem.id)}>
                {expandedCases[caseItem.id] ? 'Skjul Detaljer' : 'Se Detaljer'}
              </ExpandButton>

              {expandedCases[caseItem.id] && (
                <ExpandedContent dangerouslySetInnerHTML={{ __html: caseItem.details }} />
              )}
            </CaseBody>
          </CaseCard>
        ))}
      </CasesGrid>

      <InfoSection>
        <h2>ℹ️ Om Juridisk Informasjon</h2>
        <p>
          Denne siden inneholder informasjon om juridiske saker som kan være relevant for laget og dets spillere. 
          All informasjon er offentlig tilgjengelig og presenteres for transparens.
        </p>
        <p>
          <strong>Merk:</strong> Alle saker presentert her er fiktive eksempler. Ingen virkelige juridiske saker, 
          personer eller hendelser er representert på denne siden.
        </p>
        <p>
          For mer informasjon om juridiske prosesser eller spørsmål, vennligst kontakt laget direkte eller 
          konsulter en juridisk rådgiver.
        </p>
      </InfoSection>
    </Container>
  );
}

export default LegalPage;
