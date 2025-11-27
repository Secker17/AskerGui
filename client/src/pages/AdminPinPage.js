import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
  padding: 2rem;
`;

const PinCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem;
  max-width: 400px;
  width: 100%;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
`;

const Title = styled.h1`
  color: #fff;
  font-size: 2rem;
  font-weight: 900;
  text-align: center;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Subtitle = styled.p`
  color: #ff6400;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 600;
`;

const PinInput = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 1.5rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: #fff;
  letter-spacing: 8px;
  margin-bottom: 2rem;
  
  &:focus {
    outline: none;
    border-color: #ff6400;
    background: rgba(255, 255, 255, 0.15);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
    letter-spacing: 2px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  background: #ff6400;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ff4500;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(255, 100, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  text-align: center;
  margin-top: 1rem;
  font-weight: 600;
  font-size: 0.9rem;
`;

const BackButton = styled.button`
  display: block;
  margin: 2rem auto 0;
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

function AdminPinPage() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  // Hardkodet PIN-kode - kan endres
  const CORRECT_PIN = '1881';
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (pin.length !== 4) {
      setError('PIN må være 4 siffer');
      return;
    }
    
    if (pin === CORRECT_PIN) {
      // Lagre at brukeren har tilgang (session)
      sessionStorage.setItem('adminAuthenticated', 'true');
      navigate('/admin');
    } else {
      setError('Feil PIN-kode');
      setPin('');
    }
  };
  
  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Kun siffer
    if (value.length <= 4) {
      setPin(value);
      setError('');
    }
  };
  
  return (
    <Container>
      <PinCard>
        <Title>🔐 Admin Tilgang</Title>
        <Subtitle>Skriv inn 4-sifret PIN-kode</Subtitle>
        
        <form onSubmit={handleSubmit}>
          <PinInput
            type="password"
            value={pin}
            onChange={handleChange}
            placeholder="0000"
            maxLength={4}
            autoComplete="off"
          />
          
          <Button type="submit">
            Lås opp Admin
          </Button>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </form>
        
        <BackButton onClick={() => navigate('/')}>
          Tilbake til Hjem
        </BackButton>
      </PinCard>
    </Container>
  );
}

export default AdminPinPage;
