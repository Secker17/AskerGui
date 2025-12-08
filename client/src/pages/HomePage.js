import React, { useContext, useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

// --- Animations ---
const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 69, 0, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(255, 69, 0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 69, 0, 0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const slam = keyframes`
  0% { transform: scale(5) rotate(-15deg); opacity: 0; }
  60% { transform: scale(0.8) rotate(-15deg); opacity: 1; }
  80% { transform: scale(1.1) rotate(-15deg); }
  100% { transform: scale(1) rotate(-15deg); }
`;

const snow = keyframes`
  0% { transform: translateY(-10vh); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0.2; }
`;

// --- Styled Components ---

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #050505;
  color: white;
  position: relative;
  overflow-x: hidden;

  background-image: 
    linear-gradient(rgba(255, 69, 0, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 69, 0, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  
  &::after {
    content: '';
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(circle at 50% 50%, transparent 0%, #000000 90%);
    pointer-events: none;
    z-index: 1;
  }
`;

// --- HERO SECTION ---
const Hero = styled.section`
  min-height: 85vh; 
  width: 100%;
  padding: 0 5%;
  display: flex;
  align-items: flex-start; 
  justify-content: space-between; 
  padding-top: 80px; 
  position: relative;
  z-index: 2;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 20%;
    left: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(255, 69, 0, 0.15) 0%, transparent 70%);
    filter: blur(60px);
    z-index: -1;
  }

  @media (max-width: 1200px) {
    flex-direction: column; 
    justify-content: flex-start;
    padding-top: 80px; 
    padding-bottom: 4rem;
    height: auto; 
    min-height: auto;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  z-index: 10; 
  
  @media (max-width: 1200px) {
    align-items: center;
    text-align: center;
    margin-bottom: 2rem; 
  }
`;

// --- VISUALS COMPONENT (Gutta bildet med ny gradient) ---
const HeroVisuals = styled.div`
  flex: 1;
  height: 100%; 
  display: flex;
  justify-content: flex-end;
  align-items: flex-end; 
  position: absolute;
  bottom: 0;
  right: -2%; 
  width: 55%;
  z-index: 5;
  pointer-events: none; 

  /* Gradient overlay som fader bildet til sort i bunnen */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40%; 
    background: linear-gradient(to bottom, transparent 0%, #050505 100%);
    z-index: 6; 
  }

  img {
    max-height: 80vh; 
    width: auto;
    object-fit: contain;
    filter: drop-shadow(0 0 20px rgba(0,0,0,0.8));
    mask-image: none;
    position: relative;
    z-index: 5;
  }

  @media (max-width: 1200px) {
    position: relative; 
    width: 100%;
    height: auto;
    right: auto;
    bottom: auto;
    justify-content: center;
    margin-top: -2rem; 
    
    img {
      max-height: 50vh; 
      width: 100%;
      object-fit: contain;
      mask-image: none;
    }
  }
`;

const LogoContainer = styled.div`
  width: 150px;
  height: 150px;
  margin-bottom: 0.5rem;
  filter: drop-shadow(0 0 20px rgba(255, 69, 0, 0.3));
  animation: ${float} 6s ease-in-out infinite;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const Title = styled.h1`
  font-size: clamp(3rem, 6vw, 6.5rem); 
  line-height: 0.9;
  font-weight: 900;
  font-style: italic;
  text-transform: uppercase;
  margin: 0;
  color: white;
  transform: skew(-5deg);
  text-shadow: 4px 4px 0px rgba(255, 69, 0, 0.2);
  letter-spacing: -2px;
  
  span {
    color: #ff4500;
  }
`;

const Subtitle = styled.div`
  font-size: clamp(1rem, 2vw, 1.8rem);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #ccc;
  border-left: 5px solid #ff4500;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
  transform: skew(-5deg);

  @media (max-width: 1024px) {
    border-left: none;
    border-bottom: 3px solid #ff4500;
    padding-left: 0;
    padding-bottom: 0.8rem;
    letter-spacing: 2px;
  }
`;

const FightCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; 
  gap: 2rem;
  background: linear-gradient(135deg, rgba(20,20,20,0.9) 0%, rgba(10,10,10,0.95) 100%);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 2rem 3rem;
  transform: skew(-10deg);
  border-left: 6px solid #ff4500;
  box-shadow: 0 20px 50px rgba(0,0,0,0.6);
  margin: 1.5rem 0;
  position: relative;
  width: auto;
  min-width: 500px;

  > * {
    transform: skew(10deg);
  }

  @media (max-width: 1200px) {
    transform: skew(0);
    width: 100%;
    min-width: auto;
    border-left: none;
    border-top: 4px solid #ff4500;
    > * { transform: skew(0); }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 1.5rem 1rem;
    gap: 1rem;
  }
`;

const TeamBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  
  img {
    width: 90px;
    height: 90px;
    object-fit: contain;
    filter: drop-shadow(0 0 15px rgba(255,255,255,0.1));
    opacity: ${props => props.$isLoser ? 0.5 : 1};
    filter: ${props => props.$isLoser ? 'grayscale(100%)' : 'none'};
  }
  
  span {
    font-weight: 900;
    font-size: 1.2rem;
    text-transform: uppercase;
    margin-top: 0.8rem;
    letter-spacing: 1px;
    text-align: center;
    color: ${props => props.$isWinner ? '#ff4500' : 'white'};
  }

  @media (max-width: 768px) {
    img { width: 70px; height: 70px; }
    span { font-size: 1rem; }
  }
`;

const WinnerStamp = styled.div`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%) rotate(-15deg);
  border: 4px solid #ff4500;
  color: #ff4500;
  font-size: 1.5rem;
  font-weight: 900;
  text-transform: uppercase;
  padding: 0.2rem 1rem;
  z-index: 10;
  background: rgba(0,0,0,0.8);
  box-shadow: 0 0 15px #ff4500;
  animation: ${slam} 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  pointer-events: none;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 1rem;
    top: -15px;
  }
`;

const VS = styled.div`
  font-size: 4rem;
  font-weight: 900;
  font-style: italic;
  color: transparent;
  -webkit-text-stroke: 2px rgba(255,255,255,0.3);
  position: relative;
  z-index: 0;
  line-height: 1;
  
  &::after {
    content: 'VS';
    position: absolute;
    top: 0; left: 0;
    color: #ff4500;
    opacity: 0.9;
    transform: translate(4px, 4px);
    z-index: -1;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin: 0.5rem 0;
    -webkit-text-stroke: 1px rgba(255,255,255,0.3);
    &::after { transform: translate(2px, 2px); }
  }
`;

const ScoreBoard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  .score {
    font-size: 4rem;
    font-weight: 900;
    color: #fff;
    text-shadow: 0 0 20px rgba(255,255,255,0.3);
    line-height: 1;
  }

  .divider {
    font-size: 2.5rem;
    color: #555;
    font-weight: 900;
  }

  .winner-score {
    color: #ff4500;
    text-shadow: 0 0 30px rgba(255, 69, 0, 0.6);
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    .score { font-size: 3rem; }
    .divider { font-size: 1.5rem; }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  z-index: 20; 
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 1rem;
  }
`;

const ButtonStyles = css`
  padding: 1.2rem 3rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 1.1rem;
  text-decoration: none;
  transform: skew(-10deg);
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  text-align: center;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: 0.5s;
  }

  &:hover::before { left: 100%; }

  &:hover {
    transform: skew(-10deg) translateY(-5px);
    box-shadow: 0 10px 20px rgba(255, 69, 0, 0.3);
  }

  span { transform: skew(10deg); }

  @media (max-width: 768px) {
    width: 100%; 
    padding: 1rem;
    font-size: 1rem;
    transform: skew(-10deg);
    &:hover { transform: skew(-10deg) translateY(-2px); }
  }
`;

const PrimaryBtn = styled(Link)`
  ${ButtonStyles}
  background: #ff4500;
  color: white;
  border: none;
  &:hover { background: #ff5714; }
`;

const LiveBtn = styled.a`
  ${ButtonStyles}
  background: rgba(0,0,0,0.5); 
  color: #ff4500;
  border: 2px solid #ff4500;
  animation: ${props => props.$isFinished ? 'none' : css`${pulse} 2s infinite`};

  &:hover {
    background: rgba(255, 69, 0, 0.1);
    color: white;
  }
`;

// --- Man of the Match STYLES ---

const MotmSection = styled.section`
  padding: 4rem 2rem;
  position: relative;
  z-index: 2;
  background: linear-gradient(180deg, transparent 0%, rgba(15,15,15,0.9) 100%);
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const SectionHeader = styled.h2`
  text-align: center;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  text-transform: uppercase;
  font-style: italic;
  margin-bottom: 2.5rem;
  color: white;
  
  span { color: #ff4500; }
`;

const PlayerCard = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  background: #111;
  border: 1px solid #333;
  position: relative;
  clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: #ff4500;
  }
`;

const CardImage = styled.div`
  height: 400px;
  width: 100%;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(20%) contrast(1.2);
    transition: 0.5s ease;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; width: 100%; height: 60%;
    background: linear-gradient(to top, #111 0%, transparent 100%);
  }
  
  @media (max-width: 768px) {
    height: 350px; 
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  text-align: center;
  position: relative;
`;

const CardBadge = styled.div`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: #ff4500;
  color: white;
  padding: 0.4rem 1.2rem;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 0.8rem;
  clip-path: polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px);
`;

const PlayerName = styled.h3`
  font-size: 2rem;
  margin: 1rem 0 0.2rem 0;
  text-transform: uppercase;
  font-weight: 900;
  font-style: italic;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const PlayerMeta = styled.p`
  color: #888;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  border-top: 1px solid #222;
  padding-top: 1rem;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  .val { font-size: 2rem; font-weight: 800; color: #ff4500; line-height: 1; }
  .lbl { font-size: 0.75rem; color: #666; text-transform: uppercase; font-weight: 700; margin-top: 5px; }
`;

// --- JULEKALENDER STYLES ---

const CalendarSection = styled.section`
  padding: 10rem 2rem 4rem 2rem;
  background: linear-gradient(180deg, #050505 0%, #101010 50%, #050505 100%);
  position: relative;
  z-index: 5;
  overflow: hidden;

  /* Snø-effekt bakgrunn */
  &::before {
    content: '❄';
    position: absolute;
    top: -5vh;
    left: 10%;
    color: rgba(255,255,255,0.1);
    font-size: 2rem;
    animation: ${snow} 10s linear infinite;
  }
  &::after {
    content: '❄';
    position: absolute;
    top: -5vh;
    left: 80%;
    color: rgba(255,255,255,0.1);
    font-size: 1.5rem;
    animation: ${snow} 7s linear infinite 2s;
  }
`;

const CalendarHeader = styled(SectionHeader)`
  margin-bottom: 3rem;
  span { color: #ff4500; }
  p {
    font-size: 1rem;
    color: #888;
    margin-top: 0.5rem;
    font-style: normal;
    font-weight: 600;
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const CalendarDoor = styled.div`
  aspect-ratio: 1;
  background: ${props => props.$isOpen ? '#ff4500' : '#1a1a1a'};
  border: 2px solid ${props => props.$isOpen ? '#ff4500' : '#333'};
  color: ${props => props.$isOpen ? 'black' : 'white'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 900;
  cursor: ${props => props.$isLocked ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$isLocked ? 0.4 : 1};
  position: relative;
  transition: all 0.3s ease;
  transform: skew(-5deg);

  &:hover {
    transform: ${props => !props.$isLocked ? 'skew(-5deg) scale(1.1)' : 'skew(-5deg)'};
    box-shadow: ${props => !props.$isLocked ? '0 0 20px rgba(255, 69, 0, 0.4)' : 'none'};
    border-color: ${props => !props.$isLocked ? '#ff4500' : '#333'};
  }

  &::after {
    content: '${props => props.$isLocked ? '🔒' : (props.$isOpen ? '✅' : '')}';
    position: absolute;
    font-size: 1rem;
    bottom: 5px;
    right: 5px;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.9);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: #111;
  border: 2px solid #ff4500;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
  position: relative;
  box-shadow: 0 0 50px rgba(255,69,0,0.3);
  transform: skew(-2deg);

  h3 {
    font-size: 2rem;
    text-transform: uppercase;
    color: white;
    margin-bottom: 1.5rem;
    font-style: italic;
    font-weight: 900;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    background: none;
    border: none;
    color: #666;
    font-size: 1.5rem;
    cursor: pointer;
    &:hover { color: white; }
  }
`;

const MysteryImageContainer = styled.div`
  width: 100%;
  height: 300px;
  background: radial-gradient(circle, #333 0%, #000 70%);
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #333;
  overflow: hidden;
  position: relative;
`;

const MysteryImage = styled.img`
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  filter: ${props => props.$isRevealed ? 'none' : 'brightness(0)'};
  filter: ${props => props.$isRevealed ? 'none' : 'brightness(0) drop-shadow(0 0 5px rgba(255,255,255,0.2))'};
  transition: filter 1.5s ease-in-out;
  pointer-events: none;
`;

const GuessInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input {
    background: #050505;
    border: 1px solid #333;
    padding: 1rem;
    color: white;
    font-size: 1.1rem;
    font-family: inherit;
    text-align: center;
    &:focus { outline: 2px solid #ff4500; border-color: transparent; }
  }

  button {
    background: #ff4500;
    color: white;
    border: none;
    padding: 1rem;
    font-weight: 900;
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.2s;
    &:hover { background: #ff5714; }
  }

  .hint-text {
    color: #888;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  
  .feedback {
    margin-top: 1rem;
    font-weight: bold;
    font-size: 1.2rem;
  }
  .correct { color: #4caf50; }
  .wrong { color: #f44336; }
`;

const FeaturesSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1300px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const FeatureBox = styled.div`
  background: #0a0a0a;
  padding: 2rem;
  border: 1px solid #222;
  position: relative;
  transition: 0.3s;
  
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 0; height: 3px;
    background: #ff4500;
    transition: 0.4s;
  }

  &:hover::before { width: 100%; }
  &:hover { background: #111; }

  h3 {
    font-size: 1.3rem;
    text-transform: uppercase;
    font-weight: 800;
    margin-bottom: 0.8rem;
    color: white;
  }

  p { color: #888; line-height: 1.5; font-size: 0.95rem; }
`;

const StatsBar = styled.div`
  background: #ff4500;
  color: black;
  padding: 3rem 1rem;
  margin-top: 2rem;
  transform: skewY(-2deg);
  
  @media (max-width: 768px) {
    transform: skewY(0); 
    padding: 2.5rem 1rem;
  }
`;

const StatsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
  transform: skewY(2deg);

  @media (max-width: 768px) {
    transform: skewY(0);
    gap: 2.5rem; 
  }

  div { text-align: center; }
  .num { font-size: 3rem; font-weight: 900; display: block; line-height: 1; }
  .lbl { font-weight: 700; text-transform: uppercase; font-size: 0.9rem; margin-top: 5px; opacity: 0.8; }
`;

function HomePage() {
  const { motm, matchData, calendarData } = useContext(DataContext);
  const [logo] = useState('/images/standard_832px-Asker_SK_logo.svg.png');
  const teamImage = '/images/gutta.png'; 
  
  // --- LOCALSTORAGE LOGIC FOR PROGRESS (PER PERSON) ---
  const [activeDoor, setActiveDoor] = useState(null); 
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState(null);
  
  // Henter lagret fremdrift, eller starter med tom liste
  const [openedDoors, setOpenedDoors] = useState(() => {
    const saved = localStorage.getItem('calendar_progress');
    return saved ? JSON.parse(saved) : [];
  });

  // Lagrer fremdrift automatisk når 'openedDoors' endres
  useEffect(() => {
    localStorage.setItem('calendar_progress', JSON.stringify(openedDoors));
  }, [openedDoors]);

  const currentMatch = {
    homeTeam: 'Asker',
    awayTeam: 'HSIL', 
    homeLogo: '/images/standard_832px-Asker_SK_logo.svg.png',
    awayLogo: '/images/HSIL logo desktop.png',
    liveLink: 'https://example.com/live',
    isFinished: false,
    score: { home: 0, away: 0 },
    ...matchData 
  };
  
  const getResultText = () => {
    if (!currentMatch.isFinished) return '100%';
    const home = Number(currentMatch.score?.home || 0);
    const away = Number(currentMatch.score?.away || 0);
    if (home > away) return '3 POENG'; 
    if (home === away) return '1 POENG'; 
    return '0 POENG'; 
  };

  const isCorrectGuess = (guess, answer) => {
    if (!guess || !answer) return false;
    const cleanGuess = guess.toLowerCase().trim();
    const cleanAnswer = answer.toLowerCase().trim();
    if (cleanGuess === cleanAnswer) return true;
    const answerParts = cleanAnswer.split(' ');
    return answerParts.some(part => part === cleanGuess);
  };

  const handleDoorClick = (day) => {
    const today = new Date();
    // FOR TESTING: 
    // const currentDay = 25; 
    const currentDay = today.getDate();
    const currentMonth = today.getMonth(); 

    if (day !== currentDay || currentMonth !== 11) {
        if (currentMonth !== 11) {
            alert("Det er ikke desember enda! Kom tilbake senere. 🎅");
            return;
        }
        if (day < currentDay) {
            alert("Denne luken er forbi! Du kan bare åpne dagens luke. 🔒");
            return;
        }
        if (day > currentDay) {
            alert("Hold hestene! Du kan ikke åpne luker frem i tid. 🚫");
            return;
        }
    }

    const doorData = calendarData && calendarData.find(d => Number(d.day) === day);
    if (!doorData) {
        alert("Ingen innhold i denne luken enda. Admin må legge det inn! 🦁");
        return;
    }

    setActiveDoor(doorData);
    setGuess('');
    setFeedback(null);
    
    if (openedDoors.includes(day)) {
        setFeedback('correct');
    }
  };

  const handleGuessSubmit = () => {
    if (!activeDoor) return;
    
    if (isCorrectGuess(guess, activeDoor.player)) {
        setFeedback('correct');
        if (!openedDoors.includes(activeDoor.day)) {
            setOpenedDoors([...openedDoors, activeDoor.day]);
        }
    } else {
        setFeedback('wrong');
    }
  };

  const days = Array.from({ length: 24 }, (_, i) => i + 1);

  return (
    <Container>
      <Hero>
        <HeroContent>
          <LogoContainer>
            {logo ? <img src={logo} alt="Asker Logo" /> : <div className="placeholder">🦁</div>}
          </LogoContainer>
          
          <Title>
            ASKER <span>/ GUI</span>
          </Title>
          <Subtitle>
            NO GUTS • NO GLORY • BLØ FOR DRAKTA
          </Subtitle>
          
          <FightCard>
            <TeamBlock $isWinner={currentMatch.isFinished && currentMatch.score.home > currentMatch.score.away}>
              {currentMatch.isFinished && currentMatch.score.home > currentMatch.score.away && (
                 <WinnerStamp>SEIER</WinnerStamp>
              )}
              <img src={currentMatch.homeLogo} alt="Home" />
              <span>{currentMatch.homeTeam}</span>
            </TeamBlock>
            
            {currentMatch.isFinished ? (
              <ScoreBoard>
                <span className={`score ${currentMatch.score.home > currentMatch.score.away ? 'winner-score' : ''}`}>
                  {currentMatch.score.home}
                </span>
                <span className="divider">-</span>
                <span className={`score ${currentMatch.score.away > currentMatch.score.home ? 'winner-score' : ''}`}>
                  {currentMatch.score.away}
                </span>
              </ScoreBoard>
            ) : (
              <VS>VS</VS>
            )}
            
            <TeamBlock $isLoser={currentMatch.isFinished && currentMatch.score.away < currentMatch.score.home}>
              <img src={currentMatch.awayLogo} alt="Away" />
              <span>{currentMatch.awayTeam}</span>
            </TeamBlock>
          </FightCard>

          <ActionButtons>
            <PrimaryBtn to="/matches">
              <span>Se Terminliste</span>
            </PrimaryBtn>
            <LiveBtn 
              href={currentMatch.liveLink} 
              target="_blank" 
              $isFinished={currentMatch.isFinished}
            >
              <span>{currentMatch.isFinished ? '📄 Se Kamprapport' : '🔴 Se Kampen Live'}</span>
            </LiveBtn>
          </ActionButtons>
        </HeroContent>

        <HeroVisuals>
          <img src={teamImage} alt="Asker Gutta" />
        </HeroVisuals>
      </Hero>
      
      {/* --- JULEKALENDER START --- */}
      <CalendarSection>
        <CalendarHeader>
            Guttas <span>Julekalender</span>
            <p>Hvem skjuler seg i mørket? Gjett spilleren for å se bildet!</p>
        </CalendarHeader>
        
        <CalendarGrid>
            {days.map((dayNum) => {
                const today = new Date().getDate();
                const currentMonth = new Date().getMonth(); 
                
                // Låst logikk: Låst hvis det IKKE er i dag (både før og etter)
                // Merk: Endre gjerne 'today' til et fast tall (f.eks 1) for å teste at luke 1 fungerer
                const isLocked = (dayNum !== today) || (currentMonth !== 11);

                const isOpen = openedDoors.includes(dayNum);
                const hasData = calendarData && calendarData.find(d => Number(d.day) === dayNum);

                return (
                    <CalendarDoor 
                        key={dayNum} 
                        onClick={() => hasData ? handleDoorClick(dayNum) : alert("Ingen luke her enda!")}
                        $isLocked={isLocked || !hasData}
                        $isOpen={isOpen}
                        style={{ opacity: !hasData ? 0.2 : (isLocked ? 0.5 : 1) }}
                    >
                        {dayNum}
                    </CalendarDoor>
                );
            })}
        </CalendarGrid>

        {/* Modal for gjetting */}
        {activeDoor && (
            <ModalOverlay onClick={() => setActiveDoor(null)}>
                <ModalContent onClick={e => e.stopPropagation()}>
                    <button className="close-btn" onClick={() => setActiveDoor(null)}>✕</button>
                    <h3>Luke {activeDoor.day}</h3>
                    
                    <MysteryImageContainer>
                        {activeDoor.image ? (
                            <MysteryImage 
                                src={activeDoor.image} 
                                alt="Mystery Player" 
                                $isRevealed={feedback === 'correct'} 
                            />
                        ) : (
                            <div style={{color:'#666'}}>Ingen bilde lastet opp</div>
                        )}
                    </MysteryImageContainer>

                    <GuessInput>
                        <p className="hint-text">Hint: {activeDoor.hint}</p>
                        
                        {feedback !== 'correct' && (
                            <>
                                <input 
                                    type="text" 
                                    placeholder="Hvilken spiller er dette?" 
                                    value={guess}
                                    onChange={(e) => setGuess(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleGuessSubmit()}
                                />
                                <button onClick={handleGuessSubmit}>Gjett Spiller</button>
                            </>
                        )}

                        {feedback === 'wrong' && <p className="feedback wrong">Feil! Prøv igjen.</p>}
                        {feedback === 'correct' && (
                            <div className="feedback correct">
                                <p>Riktig! 🦁</p>
                                <p style={{color: 'white', fontSize: '1.2rem', marginTop: '0.5rem', fontWeight: '900', fontStyle: 'italic'}}>
                                    {activeDoor.player}
                                </p>
                            </div>
                        )}
                    </GuessInput>
                </ModalContent>
            </ModalOverlay>
        )}
      </CalendarSection>
      {/* --- JULEKALENDER SLUTT --- */}

      <MotmSection>
        <SectionHeader>Kampens <span>Gigant</span></SectionHeader>
        <PlayerCard>
          <CardImage>
            {motm.image && (motm.image.startsWith('data:') || motm.image.startsWith('http')) ? (
              <img src={motm.image} alt={motm.player} />
            ) : (
              <div style={{height: '100%', display: 'flex', alignItems:'center', justifyContent:'center', fontSize: '4rem', background: '#222'}}>🦁</div>
            )}
          </CardImage>
          
          <CardContent>
            <CardBadge>Runde {motm.round}</CardBadge>
            <PlayerName>{motm.player}</PlayerName>
            <PlayerMeta>#{motm.number} • {motm.position}</PlayerMeta>
            
            <StatRow>
              <StatItem>
                <span className="val">{motm.goals}</span>
                <span className="lbl">Kasser</span>
              </StatItem>
              <StatItem>
                <span className="val">{motm.saves || 0}</span>
                <span className="lbl">Reddninger</span>
              </StatItem>
            </StatRow>
          </CardContent>
        </PlayerCard>
      </MotmSection>

      <StatsBar>
        <StatsContent>
          <div>
            <span className="num">{getResultText()}</span>
            <span className="lbl">{currentMatch.isFinished ? 'Resultat' : 'Fight'}</span>
          </div>
          <div>
            <span className="num">#1</span>
            <span className="lbl">Samhold</span>
          </div>
          <div>
            <span className="num">2025</span>
            <span className="lbl">Sesong</span>
          </div>
        </StatsContent>
      </StatsBar>

      <FeaturesSection>
        <FeaturesGrid>
          <FeatureBox>
            <h3>📅 Terminliste</h3>
            <p>Full oversikt over når krigen fortsetter. Hold deg oppdatert på neste slag.</p>
          </FeatureBox>
          <FeatureBox>
            <h3>⚖️ Botkassa</h3>
            <p>Justisen er hard i garderoben. Se hvem som synder mest og må betale prisen.</p>
          </FeatureBox>
          <FeatureBox>
            <h3>📊 Tabell</h3>
            <p>Veien mot toppen. Følg lagets klatring i divisjonen minutt for minutt.</p>
          </FeatureBox>
        </FeaturesGrid>
      </FeaturesSection>
    </Container>
  );
}

export default HomePage;