import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useNavigate } from 'react-router-dom';

// --- ANIMASJONER ---
const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
  20%, 40%, 60%, 80% { transform: translateX(6px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(0.8); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
`;

// --- STYLED COMPONENTS ---

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #050505;
  color: white;
  position: relative;
  overflow: hidden;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, monospace;

  background-image: 
    linear-gradient(rgba(255, 69, 0, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 69, 0, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;

  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(circle at 50% 50%, transparent 20%, #000 100%);
    pointer-events: none;
  }
`;

const Card = styled.div`
  background: rgba(15, 15, 15, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 3rem;
  width: 100%;
  max-width: 400px;
  position: relative;
  z-index: 10;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
  animation: ${fadeIn} 0.5s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${props => props.$shake && css`
    animation: ${shake} 0.4s cubic-bezier(.36,.07,.19,.97) both;
    border-color: #ff4444;
    box-shadow: 0 0 30px rgba(255, 68, 68, 0.2);
  `}

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 50%; transform: translateX(-50%);
    width: 60px; height: 4px;
    background: #ff4500;
    border-radius: 0 0 4px 4px;
    box-shadow: 0 0 15px #ff4500;
  }
`;

const LockIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #fff 0%, #777 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 5px 15px rgba(0,0,0,0.5));
`;

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const Status = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  height: 20px;
  color: ${props => props.$error ? '#ff4444' : props.$success ? '#00ff88' : '#ff4500'};
  text-transform: uppercase;
  margin-bottom: 2rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-shadow: 0 0 10px rgba(255, 69, 0, 0.3);
  opacity: ${props => props.$loading ? 0.7 : 1};
  transition: color 0.3s;
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 2.5rem;
`;

const PinDot = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.15);
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background: transparent;

  ${props => props.$filled && css`
    background: #ff4500;
    border-color: #ff4500;
    box-shadow: 0 0 15px rgba(255, 69, 0, 0.6);
    transform: scale(1.1);
  `}

  ${props => props.$loading && css`
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.2);
    animation: ${pulse} 1s infinite;
  `}
`;

const NumpadGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
  width: 100%;
  pointer-events: ${props => props.$disabled ? 'none' : 'auto'};
  opacity: ${props => props.$disabled ? 0.5 : 1};
  transition: opacity 0.3s;
`;

const NumButton = styled.button`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 500;
  height: 70px;
  cursor: pointer;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.95);
    background: #ff4500;
    border-color: #ff4500;
    color: #000;
    box-shadow: 0 0 20px rgba(255, 69, 0, 0.4);
  }
`;

const ActionButton = styled(NumButton)`
  background: transparent;
  border-color: transparent;
  color: #666;
  font-size: 1.2rem;

  &:hover {
    background: rgba(255, 69, 0, 0.1);
    color: #ff4500;
    border-color: rgba(255, 69, 0, 0.2);
  }
`;

const BackLink = styled.button`
  margin-top: 2rem;
  background: none;
  border: none;
  color: #666;
  font-size: 0.85rem;
  cursor: pointer;
  transition: color 0.2s;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover { color: #fff; }
`;

function AdminPinPage() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [statusText, setStatusText] = useState('Skriv inn adgangskode');
  const navigate = useNavigate();

  // --- NYTT: Sjekk om brukeren allerede er logget inn ---
  useEffect(() => {
    const checkExistingAuth = async () => {
      try {
        const res = await fetch('/api/auth');
        if (res.ok) {
          // Hvis cookie er gyldig, gå rett til admin
          navigate('/admin');
        }
      } catch (err) {
        // Ikke gjør noe, vent på PIN
      }
    };
    checkExistingAuth();
  }, [navigate]);

  const checkPin = useCallback(async (currentPin) => {
    setLoading(true);
    setStatusText('Verifiserer...');

    try {
      // Kall Vercel Serverless Function (POST til api/verify)
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: currentPin }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        setStatusText('ACCESS GRANTED');
        // Setter UI-flagg (men sikkerheten ligger i cookien)
        sessionStorage.setItem('adminAuthenticated', 'true');
        
        setTimeout(() => navigate('/admin'), 800);
      } else {
        throw new Error('Invalid PIN');
      }
    } catch (err) {
      setError(true);
      setStatusText('ACCESS DENIED');
      setLoading(false);
      
      // Vibrer telefon hvis på mobil
      if (navigator.vibrate) navigator.vibrate(200);

      setTimeout(() => {
        setPin('');
        setStatusText('Prøv igjen');
        setError(false);
      }, 800);
    }
  }, [navigate]);

  const handlePress = useCallback((val) => {
    if (loading || success) return; // Blokker input mens vi laster

    if (pin.length < 6) {
      const newPin = pin + val;
      setPin(newPin);
      setError(false);
      
      if (newPin.length === 6) {
        // Vent bitte litt for visuell feedback på siste dot før vi sjekker
        setTimeout(() => checkPin(newPin), 100);
      }
    }
  }, [pin, checkPin, loading, success]);

  const handleDelete = useCallback(() => {
    if (loading || success) return;
    if (pin.length > 0) {
      setPin(prev => prev.slice(0, -1));
      setError(false);
      setStatusText('Skriv inn adgangskode');
    }
  }, [pin, loading, success]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') handlePress(e.key);
      if (e.key === 'Backspace') handleDelete();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePress, handleDelete]);

  return (
    <Container>
      <Card $shake={error}>
        <LockIcon>🔒</LockIcon>
        <Title>Admin Tilgang</Title>
        <Status $error={error} $success={success} $loading={loading}>
          {statusText}
        </Status>

        <DotsContainer>
          {[...Array(6)].map((_, i) => (
            <PinDot 
              key={i} 
              $filled={pin.length > i} 
              $loading={loading && pin.length === 6}
            />
          ))}
        </DotsContainer>

        <NumpadGrid $disabled={loading || success}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <NumButton key={num} onClick={() => handlePress(num.toString())}>
              {num}
            </NumButton>
          ))}
          <ActionButton onClick={handleDelete}>✕</ActionButton>
          <NumButton onClick={() => handlePress('0')}>0</NumButton>
          <div /> 
        </NumpadGrid>

        <BackLink onClick={() => navigate('/')}>
          ← Tilbake til Forsiden
        </BackLink>
      </Card>
    </Container>
  );
}

export default AdminPinPage;