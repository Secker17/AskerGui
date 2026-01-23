import React, { useContext, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { DataContext } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import Tesseract from 'tesseract.js';

// --- Styled Components ---

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const AdminWrapper = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
  background-color: #050505;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  animation: ${fadeIn} 0.5s ease;

  background-image: 
    linear-gradient(rgba(255, 69, 0, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 69, 0, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MobileHeader = styled.div`
  display: none;
  padding: 1rem 2rem;
  background: #0a0a0a;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1024px) {
    display: flex;
  }
`;

const Sidebar = styled.aside`
  background: #080808;
  border-right: 1px solid rgba(255,255,255,0.08);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 1024px) {
    position: fixed;
    left: ${props => props.open ? '0' : '-100%'};
    width: 280px;
    transition: left 0.3s ease;
    box-shadow: 10px 0 30px rgba(0,0,0,0.5);
  }
`;

const Brand = styled.h1`
  font-size: 1.8rem;
  font-weight: 900;
  text-transform: uppercase;
  font-style: italic;
  margin-bottom: 3rem;
  color: #fff;
  
  span { color: #ff4500; }
`;

const MenuGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const MenuLabel = styled.h3`
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #666;
  letter-spacing: 1px;
  margin-bottom: 0.8rem;
  padding-left: 0.8rem;
`;

const MenuItem = styled.button`
  background: ${props => props.active ? 'rgba(255, 69, 0, 0.1)' : 'transparent'};
  color: ${props => props.active ? '#ff4500' : '#888'};
  border: none;
  border-left: 3px solid ${props => props.active ? '#ff4500' : 'transparent'};
  padding: 0.8rem 1rem;
  text-align: left;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 0 8px 8px 0;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background: rgba(255,255,255,0.03);
    color: #fff;
  }
`;

const MainContent = styled.main`
  padding: 3rem;
  overflow-y: auto;
  max-width: 1400px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Header = styled.header`
  margin-bottom: 3rem;
  border-bottom: 1px solid #222;
  padding-bottom: 1rem;
  
  h2 {
    font-size: 2.5rem;
    font-weight: 800;
    margin: 0;
    text-transform: uppercase;
    font-style: italic;
  }
  p {
    color: #888;
    margin-top: 0.5rem;
  }
`;

// --- Forms & Cards ---

const Card = styled.div`
  background: #0f0f0f;
  border: 1px solid #222;
  border-radius: 4px;
  padding: 2rem;
  margin-bottom: 2rem;
  position: relative;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 4px; height: 100%;
    background: ${props => props.accentColor || '#ff4500'};
  }
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  font-weight: 800;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #222;
  padding-bottom: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.75rem;
  color: #888;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 0.5rem;
  letter-spacing: 0.5px;
`;

const Input = styled.input`
  width: 100%;
  background: #161616;
  border: 1px solid #333;
  padding: 1rem;
  color: white;
  border-radius: 4px;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: monospace; 

  &:focus {
    outline: none;
    border-color: ${props => props.accentColor || '#ff4500'};
    background: #000;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: transparent;
  }
`;

const Select = styled.select`
  width: 100%;
  background: #161616;
  border: 1px solid #333;
  padding: 1rem;
  color: white;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #ff4500;
  }
`;

const Button = styled.button`
  background: ${props => props.danger ? '#b91c1c' : (props.bg || '#ff4500')};
  color: ${props => props.textColor || 'white'};
  border: none;
  padding: 1rem 2rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.2s;
  transform: skew(-10deg);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 120px;
  opacity: ${props => props.disabled ? 0.6 : 1};

  span { transform: skew(10deg); }

  &:hover:not(:disabled) {
    filter: brightness(1.2);
    transform: skew(-10deg) translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.4);
  }

  &:active:not(:disabled) {
    transform: skew(-10deg) translateY(0);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
`;

const ItemCard = styled.div`
  background: #111;
  border: 1px solid #222;
  position: relative;
  transition: transform 0.2s;
  transform: skew(-2deg); 

  &:hover {
    transform: skew(-2deg) translateY(-5px);
    border-color: #ff4500;
    box-shadow: 0 10px 20px rgba(0,0,0,0.5);
  }

  .img-wrapper {
    height: 180px;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-bottom: 1px solid #222;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: skew(2deg);
    }
    
    .placeholder {
      font-size: 3rem;
      transform: skew(2deg);
    }
  }

  .content {
    padding: 1.2rem;
    transform: skew(2deg);
  }

  h4 { 
    margin: 0 0 0.2rem 0; 
    color: white; 
    font-size: 1.1rem; 
    text-transform: uppercase;
    font-weight: 800;
    font-style: italic;
  }
  
  p { 
    margin: 0 0 1rem 0; 
    color: #ff4500; 
    font-size: 0.85rem; 
    font-weight: 600; 
    text-transform: uppercase;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
  }
`;

const SmallBtn = styled(Button)`
  padding: 0.6rem 1rem;
  font-size: 0.75rem;
  width: 100%;
  min-width: auto;
`;

// Image Upload Styles
const UploadBox = styled.label`
  border: 2px dashed #333;
  background: rgba(255,255,255,0.02);
  border-radius: 4px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  display: block;
  transition: all 0.2s;

  &:hover {
    border-color: #ff4500;
    background: rgba(255, 69, 0, 0.05);
  }

  span {
    display: block;
    color: #888;
    margin-top: 0.5rem;
    font-size: 0.8rem;
    text-transform: uppercase;
  }
`;

const PreviewBox = styled.div`
  margin-top: 1rem;
  width: 120px;
  height: 120px;
  border: 1px solid #333;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const ListRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #111;
  padding: 1.2rem;
  border-bottom: 1px solid #222;
  transition: 0.2s;
  
  &:hover {
    background: #161616;
  }
  
  &:last-child { border-bottom: none; }

  .info { 
    font-weight: 700; 
    text-transform: uppercase;
    font-size: 0.9rem;
    color: #ddd;
    display: flex;
    gap: 15px;
    align-items: center;
  }
  
  .actions { display: flex; gap: 0.5rem; }
`;

const ScoreInputWrapper = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  margin-top: 1rem;
  padding: 1.5rem;
  background: #1a1a1a;
  border: 1px solid ${props => props.$finished ? '#ff4500' : '#333'};
  border-radius: 4px;
`;

const ToggleContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 1rem;
  margin-bottom: 1rem;

  .switch {
    position: relative;
    width: 60px;
    height: 30px;
    background: #333;
    border-radius: 30px;
    transition: 0.3s;
  }

  input { display: none; }

  input:checked + .switch {
    background: #ff4500;
  }

  .switch::before {
    content: '';
    position: absolute;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    left: 4px;
    bottom: 4px;
    background: white;
    transition: 0.3s;
  }

  input:checked + .switch::before {
    transform: translateX(30px);
  }

  span {
    font-weight: 900;
    text-transform: uppercase;
    font-size: 1rem;
    color: ${props => props.$active ? '#ff4500' : '#888'};
  }
`;

const LoadingScreen = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff4500;
  font-family: monospace;
  font-size: 1.2rem;
  background: #050505;
`;

function AdminPage() {
  const navigate = useNavigate();
  const { 
      motm, updateMotm, 
      matches, addMatch, deleteMatch, 
      cases, addCase, deleteCase, 
      players, addPlayer, deletePlayer, 
      matchData, updateMatchData,
      leagueTable, addTableRow, deleteTableRow, updateTableRow, 
      clearAllData,
      topScorer, updateTopScorer // Hentet fra context
  } = useContext(DataContext);
  
  const [activeTab, setActiveTab] = useState('matchData');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // States
  const [motmForm, setMotmForm] = useState(motm);
  const [topScorerForm, setTopScorerForm] = useState({ name: '', goals: 0 }); // Ny state for toppscorer

  const [editingMatch, setEditingMatch] = useState(null);
  const [editingCase, setEditingCase] = useState(null);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [analyzing, setAnalyzing] = useState(false); 
  const [statusText, setStatusText] = useState('');

  const [matchForm, setMatchForm] = useState({ date: '', time: '', opponent: '', location: '', logo: '' });
  const [caseForm, setCaseForm] = useState({ player: '', reason: '', fine: '', likelihood: 0.5, round: '' });
  const [playerForm, setPlayerForm] = useState({ name: '', number: '', position: '', imagePreview: null, image: '', isCaptain: false, isTeamLeader: false, isTrainer: false });
  
  // Tabell form
  const [tableForm, setTableForm] = useState({
    team: '', played: 0, won: 0, draw: 0, lost: 0, gf: 0, ga: 0
  });
  const [editingTableRow, setEditingTableRow] = useState(null);

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

  const initialTeams = [
    { team: 'Romsås/Ellingsrud', played: 8, won: 7, draw: 1, lost: 0, gf: 236, ga: 127 },
    { team: 'Gøy HK 4', played: 8, won: 6, draw: 2, lost: 0, gf: 248, ga: 169 },
    { team: 'Asker/Gui', played: 7, won: 5, draw: 1, lost: 1, gf: 233, ga: 169 },
    { team: 'Frogner 2', played: 6, won: 4, draw: 0, lost: 2, gf: 174, ga: 139 },
    { team: 'Haga/Raumnes & Årnes', played: 8, won: 3, draw: 0, lost: 5, gf: 207, ga: 212 },
    { team: 'Skedsmo', played: 9, won: 3, draw: 0, lost: 6, gf: 206, ga: 233 },
    { team: 'Raballder 2', played: 8, won: 3, draw: 0, lost: 5, gf: 154, ga: 181 },
    { team: 'Nordstrand Rullestolhåndball', played: 3, won: 2, draw: 0, lost: 1, gf: 74, ga: 65 },
    { team: 'Gjerdrum/Kløfta', played: 9, won: 2, draw: 0, lost: 7, gf: 181, ga: 193 },
    { team: 'HSIL/Ammerud', played: 8, won: 0, draw: 0, lost: 8, gf: 85, ga: 310 },
  ];

  // Oppdater form state når context laster
  useEffect(() => {
    if (topScorer) setTopScorerForm(topScorer);
  }, [topScorer]);

  useEffect(() => {
    if (motm) setMotmForm(motm);
  }, [motm]);

  // --- AUTH ---
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth');
        if (res.ok) setIsAuthenticated(true);
        else navigate('/admin-pin');
      } catch (err) { navigate('/admin-pin'); } 
      finally { setAuthLoading(false); }
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try { await fetch('/api/logout', { method: 'POST' }); navigate('/admin-pin'); } catch (error) {}
  };

  // --- GENERIC HANDLERS ---
  const handleFileUpload = (e, setterFunc, keyName = 'image') => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (keyName === 'previewOnly') setterFunc(reader.result); 
        else setterFunc(prev => ({ ...prev, [keyName]: reader.result, imagePreview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // --- MATCH & PLAYER & CASE LOGIC ---
  const handleUpdateMatchData = (field, value) => updateMatchData({ ...matchData, [field]: value });
  const handleScoreUpdate = (team, value) => updateMatchData({ ...matchData, score: { ...matchData.score, [team]: Number(value) } });
  
  const handleSavePlayer = async () => {
    if (!playerForm.name || !playerForm.number) return alert('Mangler navn eller nummer');
    setLoading(true);
    const playerData = { ...playerForm, image: playerForm.imagePreview || playerForm.image || '🦁' };
    try {
      if (editingPlayer) { await deletePlayer(editingPlayer.id); await addPlayer(playerData); setEditingPlayer(null); }
      else { await addPlayer(playerData); }
      setPlayerForm({ name: '', number: '', position: '', imagePreview: null, image: '', isCaptain: false, isTeamLeader: false, isTrainer: false });
    } catch (e) { alert(e.message); }
    setLoading(false);
  };
  const handleEditPlayer = (p) => { setEditingPlayer(p); setPlayerForm({...p, imagePreview: p.image}); window.scrollTo(0,0); };
  const handleCancelEditPlayer = () => { setEditingPlayer(null); setPlayerForm({ name: '', number: '', position: '', imagePreview: null, image: '', isCaptain: false, isTeamLeader: false, isTrainer: false }); };

  const handleSaveMatch = async () => {
    if (!matchForm.opponent) return;
    setLoading(true);
    try {
      if (editingMatch) { await deleteMatch(editingMatch.id); await addMatch({ ...matchForm, id: editingMatch.id }); setEditingMatch(null); }
      else { await addMatch(matchForm); }
      setMatchForm({ date: '', time: '', opponent: '', location: '', logo: '' });
    } catch (e) { alert(e.message); }
    setLoading(false);
  };

  const handleSaveCase = async () => {
    if (!caseForm.player) return;
    setLoading(true);
    try {
      const data = { ...caseForm, fine: Number(caseForm.fine) };
      if (editingCase) { await deleteCase(editingCase.id); await addCase({ ...data, id: editingCase.id }); setEditingCase(null); }
      else { await addCase(data); }
      setCaseForm({ player: '', reason: '', fine: '', likelihood: 0.5, round: '' });
    } catch (e) { alert(e.message); }
    setLoading(false);
  };

  const handleSaveMotm = async () => {
    setLoading(true);
    try { await updateMotm(motmForm); alert('MOTM Lagret!'); } catch (e) { alert(e.message); }
    setLoading(false);
  };

  const handleSaveTopScorer = async () => {
    if(!updateTopScorer) return alert("Mangler funksjon i DataContext! Sjekk koden.");
    setLoading(true);
    try { await updateTopScorer(topScorerForm); alert('Toppscorer lagret!'); } catch(e) { alert(e.message); }
    setLoading(false);
  };

  // --- NY & FORBEDRET OCR LOGIKK ---

  // Hjelpefunksjon for å pre-prosessere bilde for bedre OCR
  const preprocessImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Oppskaler bildet for bedre tekstgjenkjenning
          const scaleFactor = 2; 
          canvas.width = img.width * scaleFactor;
          canvas.height = img.height * scaleFactor;
          
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // Gjør om til gråtone og øk kontrast
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            // Enkel binarisering (svart/hvitt)
            const color = avg > 128 ? 255 : 0; 
            data[i] = color;     // R
            data[i + 1] = color; // G
            data[i + 2] = color; // B
          }
          ctx.putImageData(imageData, 0, 0);
          resolve(canvas.toDataURL('image/jpeg'));
        };
        img.onerror = (err) => reject(err);
      };
    });
  };

  const handleTableImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if(!window.confirm("Dette vil lese tabellen fra bildet og OVERSKRIVE dagens tabell. Vil du fortsette?")) return;

    setAnalyzing(true);
    setStatusText("Forbehandler bilde...");

    try {
      // 1. Slett eksisterende
      if(leagueTable && leagueTable.length > 0) {
        for(let row of leagueTable) {
           if(deleteTableRow) await deleteTableRow(row.id);
        }
      }

      // 2. Pre-prosesser bilde (Gjør det svart/hvitt og skarpere)
      const optimizedImage = await preprocessImage(file);

      setStatusText("Leser tekst (dette tar litt tid)...");

      // 3. Analyser bilde med Tesseract
      const result = await Tesseract.recognize(
        optimizedImage,
        'nor+eng', // Bruk både norsk og engelsk
        { 
          logger: m => {
             if(m.status === 'recognizing text') {
               setStatusText(`Analyserer: ${Math.round(m.progress * 100)}%`);
             }
          },
          tessedit_pageseg_mode: '6', // PSM 6 antar en enkelt tekstblokk
        }
      );

      setStatusText("Tolker data...");
      const lines = result.data.text.split('\n').filter(line => line.trim() !== '');
      console.log("OCR Rådata:", lines);
      
      let teamsAdded = 0;

      for (let line of lines) {
        line = line.trim();

        // Hopp over overskrifter og støy
        const lower = line.toLowerCase();
        if (lower.includes('lag') || lower.includes('kamper') || lower.includes('mål') || line.length < 5) continue;

        // --- SMARTERE REGEX STRATEGI ---
        // Matcher: (Alt fram til tallene) (Tall) (Tall) (Tall) (Tall) (Tall) (Bindestrek/Mellomrom) (Tall)
        const regex = /(.*?)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s*[-:–.,]\s*(\d+)/;
        
        const match = line.match(regex);

        if (match) {
          let rawTeamName = match[1].trim();

          // Rens lagnavn: Fjern plasseringstall i starten
  let teamName = rawTeamName.replace(/^\d+[.,]?\s*/, '');
          
          // Fjern eventuelle rare tegn
          teamName = teamName.replace(/^[._\-:;|]+/, '').trim();

          // Ignorer hvis navnet ble tomt eller ser ut som støy
          if (teamName.length < 2 || !isNaN(teamName)) continue;

          // Tolk tallene
          const played = Number(match[2]);
          const won = Number(match[3]);
          const draw = Number(match[4]);
          const lost = Number(match[5]);
          const gf = Number(match[6]); // Goals For
          const ga = Number(match[7]); // Goals Against
          
          const points = (won * 2) + (draw * 1);
          
          // Lagre til DB
          console.log(`Fant lag: ${teamName}`, { played, won, draw, lost, gf, ga });
          await addTableRow({ 
            team: teamName, 
            played, won, draw, lost, gf, ga, points, 
            rank: 0 
          });
          teamsAdded++;
        }
      }

      if (teamsAdded === 0) {
        alert("Fant ingen lag. Prøv å ta et tydeligere bilde der kun tabellen vises (zoom inn).");
      } else {
        alert(`Suksess! La til ${teamsAdded} lag.`);
      }

    } catch (err) {
      console.error(err);
      alert("Feil under analyse: " + err.message);
    } finally {
      setAnalyzing(false);
      setStatusText("");
    }
  };

  const populateTable = async () => {
    if(!window.confirm("Slett tabell og last inn standard data?")) return;
    setLoading(true);
    try {
        if(leagueTable && leagueTable.length > 0) {
            for(let row of leagueTable) {
                if(deleteTableRow) await deleteTableRow(row.id);
            }
        }
        for(let teamData of initialTeams) {
              const points = (teamData.won * 2) + (teamData.draw * 1);
              await addTableRow({ ...teamData, points, rank: 0 }); 
        }
        alert("Tabell lastet inn!");
    } catch (e) {
        alert("Feil: " + e.message);
    }
    setLoading(false);
  };

  const handleSaveTable = async () => {
      if(!tableForm.team) return alert("Mangler lagnavn");
      setLoading(true);
      try {
          const calculatedPoints = (Number(tableForm.won) * 2) + Number(tableForm.draw);
          const data = {
              team: tableForm.team,
              played: Number(tableForm.played),
              won: Number(tableForm.won),
              draw: Number(tableForm.draw),
              lost: Number(tableForm.lost),
              gf: Number(tableForm.gf),
              ga: Number(tableForm.ga),
              points: calculatedPoints,
              rank: 0 
          };

          if(editingTableRow) {
               if(updateTableRow) await updateTableRow(editingTableRow.id, data);
               else { await deleteTableRow(editingTableRow.id); await addTableRow(data); }
               setEditingTableRow(null);
          } else {
               await addTableRow(data);
          }
          setTableForm({ team: '', played: 0, won: 0, draw: 0, lost: 0, gf: 0, ga: 0 });
          alert("Lagret! Tabellen oppdateres automatisk.");
      } catch(e) { 
          alert("Feil: " + e.message); 
      }
      setLoading(false);
  };

  const handleEditTable = (row) => {
      setEditingTableRow(row);
      setTableForm(row);
      window.scrollTo(0,0);
  };

  const sortedTable = leagueTable ? [...leagueTable].sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      const gdA = a.gf - a.ga;
      const gdB = b.gf - b.ga;
      if (gdB !== gdA) return gdB - gdA;
      return b.gf - a.gf;
  }) : [];


  if (authLoading) return <LoadingScreen>VERIFISERER TILGANG...</LoadingScreen>;
  if (!isAuthenticated) return null;
  if (isMobile) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050505', color: '#fff' }}><h2>Gå til PC</h2></div>;

  return (
    <AdminWrapper>
      <MobileHeader>
        <Brand style={{margin:0, fontSize:'1.2rem'}}>Admin</Brand>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{background:'none', border:'none', color:'white', fontSize:'1.5rem'}}>☰</button>
      </MobileHeader>

      <Sidebar open={sidebarOpen}>
        <Brand>Asker<span>Admin</span></Brand>
        <MenuGroup>
          <MenuLabel>Dashbord</MenuLabel>
          <MenuItem active={activeTab === 'matchData'} onClick={() => setActiveTab('matchData')}><span>⚔️</span> Dagens Kamp</MenuItem>
          <MenuItem active={activeTab === 'motm'} onClick={() => setActiveTab('motm')}><span>⭐</span> Utmerkelser</MenuItem>
        </MenuGroup>
        <MenuGroup>
          <MenuLabel>Database</MenuLabel>
          <MenuItem active={activeTab === 'players'} onClick={() => setActiveTab('players')}><span>👥</span> Spillerstall</MenuItem>
          <MenuItem active={activeTab === 'matches'} onClick={() => setActiveTab('matches')}><span>📅</span> Terminliste</MenuItem>
          <MenuItem active={activeTab === 'cases'} onClick={() => setActiveTab('cases')}><span>⚖️</span> Botkassa</MenuItem>
          <MenuItem active={activeTab === 'table'} onClick={() => setActiveTab('table')}><span>📊</span> Tabell</MenuItem>
        </MenuGroup>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Button onClick={handleLogout} style={{ width: '100%', fontSize: '0.8rem', background: '#222' }}><span>🔒 Logg ut</span></Button>
          <Button danger onClick={async () => { if(window.confirm('SLETT ALT?')) await clearAllData(); }} style={{ width: '100%', fontSize: '0.8rem' }}><span>🗑️ Reset Database</span></Button>
        </div>
      </Sidebar>

      <MainContent>
        <Header>
          <h2>{activeTab === 'table' ? 'Tabell' : 'Admin Panel'}</h2>
          <p>Endringer lagres umiddelbart i Firebase.</p>
        </Header>

        {/* --- TAB: MATCH DATA --- */}
        {activeTab === 'matchData' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <Card>
              <CardTitle>Kamp Informasjon</CardTitle>
              <FormGroup><Label>Hjemmelag</Label><Input value={matchData.homeTeam} onChange={e => handleUpdateMatchData('homeTeam', e.target.value)} /></FormGroup>
              <FormGroup><Label>Bortelag</Label><Input value={matchData.awayTeam} onChange={e => handleUpdateMatchData('awayTeam', e.target.value)} /></FormGroup>
              <FormGroup><Label>Live Stream Link</Label><Input value={matchData.liveLink} onChange={e => handleUpdateMatchData('liveLink', e.target.value)} /></FormGroup>
            </Card>
            <Card>
              <CardTitle>Resultat & Status</CardTitle>
              <ToggleContainer $active={matchData.isFinished}>
                <input type="checkbox" checked={matchData.isFinished || false} onChange={(e) => handleUpdateMatchData('isFinished', e.target.checked)} />
                <div className="switch"></div>
                <span>{matchData.isFinished ? 'Kampen er ferdig' : 'Kampen pågår / Kommende'}</span>
              </ToggleContainer>
              <ScoreInputWrapper $finished={matchData.isFinished}>
                  <Input type="number" style={{fontSize: '2rem', textAlign:'center', height:'80px', fontWeight:'bold', color:'#ff4500'}} value={matchData.score?.home ?? 0} onChange={(e) => handleScoreUpdate('home', e.target.value)} />
                  <span style={{fontSize:'2rem', fontWeight:'900', color:'#444'}}>-</span>
                  <Input type="number" style={{fontSize: '2rem', textAlign:'center', height:'80px', fontWeight:'bold', color:'#fff'}} value={matchData.score?.away ?? 0} onChange={(e) => handleScoreUpdate('away', e.target.value)} />
              </ScoreInputWrapper>
            </Card>
            <Card style={{gridColumn: '1 / -1'}}>
              <CardTitle>Logoer</CardTitle>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <FormGroup><Label>Hjemme Logo</Label><Input type="file" onChange={(e) => handleFileUpload(e, (val) => handleUpdateMatchData('homeLogo', val), 'previewOnly')} /><Input value={matchData.homeLogo} onChange={e => handleUpdateMatchData('homeLogo', e.target.value)} placeholder="URL..." /></FormGroup>
                <FormGroup><Label>Borte Logo</Label><Input type="file" onChange={(e) => handleFileUpload(e, (val) => handleUpdateMatchData('awayLogo', val), 'previewOnly')} /><Input value={matchData.awayLogo} onChange={e => handleUpdateMatchData('awayLogo', e.target.value)} placeholder="URL..." /></FormGroup>
              </div>
            </Card>
          </div>
        )}

        {/* --- TAB: PLAYERS --- */}
        {activeTab === 'players' && (
          <>
            <Card>
              <CardTitle>{editingPlayer ? 'Rediger Spiller' : 'Ny Spiller'}</CardTitle>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <FormGroup><Label>Navn</Label><Input value={playerForm.name} onChange={e => setPlayerForm({...playerForm, name: e.target.value})} /></FormGroup>
                <FormGroup><Label>Nummer</Label><Input type="number" value={playerForm.number} onChange={e => setPlayerForm({...playerForm, number: e.target.value})} /></FormGroup>
                <FormGroup><Label>Posisjon</Label><Input value={playerForm.position} onChange={e => setPlayerForm({...playerForm, position: e.target.value})} /></FormGroup>
              </div>
              <div style={{display: 'flex', gap: '2rem', marginBottom: '1.5rem'}}>
                <ToggleContainer $active={playerForm.isCaptain}><input type="checkbox" checked={playerForm.isCaptain} onChange={(e) => setPlayerForm({...playerForm, isCaptain: e.target.checked})} /><div className="switch"></div><span>Kaptein</span></ToggleContainer>
                <ToggleContainer $active={playerForm.isTeamLeader}><input type="checkbox" checked={playerForm.isTeamLeader} onChange={(e) => setPlayerForm({...playerForm, isTeamLeader: e.target.checked})} /><div className="switch"></div><span>Lagleder</span></ToggleContainer>
                <ToggleContainer $active={playerForm.isTrainer}><input type="checkbox" checked={playerForm.isTrainer} onChange={(e) => setPlayerForm({...playerForm, isTrainer: e.target.checked})} /><div className="switch"></div><span>Trener</span></ToggleContainer>
              </div>
              <FormGroup><Label>Spillerbilde</Label><UploadBox><input type="file" hidden onChange={(e) => handleFileUpload(e, setPlayerForm, 'imagePreview')} /><span>📸 Last opp bilde</span></UploadBox>{playerForm.imagePreview && <PreviewBox style={{marginTop: '1rem'}}><img src={playerForm.imagePreview} alt="Preview" /></PreviewBox>}</FormGroup>
              <div style={{display:'flex', gap:'1rem'}}><Button onClick={handleSavePlayer} disabled={loading}><span>{loading ? 'Lagrer...' : (editingPlayer ? 'Oppdater' : 'Legg til')}</span></Button>{editingPlayer && <Button danger onClick={handleCancelEditPlayer}><span>Avbryt</span></Button>}</div>
            </Card>
            <Grid>
              {players.map(p => (
                <ItemCard key={p.id}>
                  <div className="img-wrapper">{p.image && p.image.length > 10 ? <img src={p.image} alt={p.name} /> : <span className="placeholder">🦁</span>}</div>
                  <div className="content">
                    <h4>{p.name}</h4><p>#{p.number} • {p.position}</p>
                    <div className="actions"><SmallBtn onClick={() => handleEditPlayer(p)}><span>Rediger</span></SmallBtn><SmallBtn danger onClick={() => deletePlayer(p.id)}><span>Slett</span></SmallBtn></div>
                  </div>
                </ItemCard>
              ))}
            </Grid>
          </>
        )}

        {/* --- TAB: MOTM & TOPPSCORER --- */}
        {activeTab === 'motm' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            
            {/* MOTM SECTION */}
            <Card>
              <CardTitle>⭐ Man of the Match</CardTitle>
              <FormGroup><Label>Velg fra liste</Label><Select onChange={(e) => { const p = players.find(pl => pl.name === e.target.value); if(p) setMotmForm({...motmForm, player: p.name, number: p.number, position: p.position}); }}><option>Velg spiller...</option>{players.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}</Select></FormGroup>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FormGroup><Label>Navn</Label><Input value={motmForm.player} onChange={e => setMotmForm({...motmForm, player: e.target.value})} /></FormGroup>
                <FormGroup><Label>Mål</Label><Input type="number" value={motmForm.goals} onChange={e => setMotmForm({...motmForm, goals: Number(e.target.value)})} /></FormGroup>
                <FormGroup><Label>Reddninger</Label><Input type="number" value={motmForm.saves} onChange={e => setMotmForm({...motmForm, saves: Number(e.target.value)})} /></FormGroup>
                <FormGroup><Label>Runde</Label><Input value={motmForm.round} onChange={e => setMotmForm({...motmForm, round: e.target.value})} /></FormGroup>
              </div>
              <FormGroup><Label>Bilde</Label><UploadBox><input type="file" hidden onChange={(e) => handleFileUpload(e, setMotmForm, 'image')} /><span>📸 Nytt bilde</span></UploadBox></FormGroup>
              <Button onClick={handleSaveMotm}><span>Publiser MOTM</span></Button>
            </Card>

            {/* TOP SCORER SECTION */}
            <Card accentColor="#00ff88" style={{ border: '1px solid #00ff88' }}>
              <CardTitle style={{ color: '#00ff88', borderBottomColor: '#00ff88' }}>⚽ Årets Toppscorer</CardTitle>
              <div style={{marginBottom:'1.5rem', color:'#888'}}>Oppdater hvem som har gullhjelmen</div>
              
              <FormGroup>
                <Label>Velg Spiller</Label>
                <Select 
                  value={topScorerForm.name || ''} 
                  onChange={(e) => setTopScorerForm({ ...topScorerForm, name: e.target.value })}
                  style={{ borderColor: '#00ff88' }}
                >
                  <option value="">Velg målfarlig spiller...</option>
                  {players.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Antall Mål Totalt</Label>
                <Input 
                  type="number" 
                  accentColor="#00ff88"
                  style={{ fontSize: '2.5rem', color: '#00ff88', fontWeight: 'bold', textAlign: 'center' }}
                  value={topScorerForm.goals} 
                  onChange={e => setTopScorerForm({...topScorerForm, goals: Number(e.target.value)})} 
                />
              </FormGroup>

              <Button 
                onClick={handleSaveTopScorer}
                bg="#00ff88"
                textColor="#000"
                style={{ width: '100%', marginTop: '1rem' }}
              >
                <span>🏆 Lagre Toppscorer</span>
              </Button>
            </Card>

          </div>
        )}

        {/* --- TAB: MATCHES --- */}
        {activeTab === 'matches' && (
           <>
             <Card>
               <CardTitle>{editingMatch ? 'Rediger Kamp' : 'Ny Kamp'}</CardTitle>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                  <FormGroup><Label>Dato</Label><Input type="date" value={matchForm.date} onChange={e => setMatchForm({...matchForm, date: e.target.value})} /></FormGroup>
                  <FormGroup><Label>Tid</Label><Input type="time" value={matchForm.time} onChange={e => setMatchForm({...matchForm, time: e.target.value})} /></FormGroup>
                  <FormGroup><Label>Motstander</Label><Input value={matchForm.opponent} onChange={e => setMatchForm({...matchForm, opponent: e.target.value})} /></FormGroup>
                  <FormGroup><Label>Sted</Label><Input value={matchForm.location} onChange={e => setMatchForm({...matchForm, location: e.target.value})} /></FormGroup>
               </div>
               <FormGroup><Label>Motstander Logo (URL)</Label><Input value={matchForm.logo} onChange={e => setMatchForm({...matchForm, logo: e.target.value})} /></FormGroup>
               <div style={{display:'flex', gap:'1rem'}}><Button onClick={handleSaveMatch}><span>{editingMatch ? 'Oppdater' : 'Legg til'}</span></Button>{editingMatch && <Button danger onClick={() => {setEditingMatch(null); setMatchForm({date:'', time:'', opponent:'', location:'', logo:''})}}><span>Avbryt</span></Button>}</div>
             </Card>
             <Card>
                <CardTitle>Terminliste</CardTitle>
                {matches.map(m => (<ListRow key={m.id}><div className="info"><span style={{color:'#ff4500'}}>{m.date}</span> - {m.opponent}</div><div className="actions"><SmallBtn onClick={() => {setEditingMatch(m); setMatchForm(m); window.scrollTo(0,0)}}><span>Rediger</span></SmallBtn><SmallBtn danger onClick={() => deleteMatch(m.id)}><span>Slett</span></SmallBtn></div></ListRow>))}
             </Card>
           </>
        )}

        {/* --- TAB: CASES --- */}
        {activeTab === 'cases' && (
           <>
            <Card>
                <CardTitle>{editingCase ? 'Rediger Sak' : 'Ny Sak'}</CardTitle>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <FormGroup><Label>Spiller</Label><Input value={caseForm.player} onChange={e => setCaseForm({...caseForm, player: e.target.value})} /></FormGroup>
                    <FormGroup><Label>Årsak</Label><Input value={caseForm.reason} onChange={e => setCaseForm({...caseForm, reason: e.target.value})} /></FormGroup>
                    <FormGroup><Label>Bot (kr)</Label><Input type="number" value={caseForm.fine} onChange={e => setCaseForm({...caseForm, fine: e.target.value})} /></FormGroup>
                    <FormGroup><Label>Sannsynlighet</Label><input type="range" min="0" max="100" style={{width:'100%'}} value={caseForm.likelihood * 100} onChange={e => setCaseForm({...caseForm, likelihood: e.target.value / 100})} /></FormGroup>
                </div>
                <div style={{display:'flex', gap:'1rem'}}><Button onClick={handleSaveCase}><span>{editingCase ? 'Oppdater' : 'Legg til'}</span></Button>{editingCase && <Button danger onClick={() => {setEditingCase(null); setCaseForm({player:'', reason:'', fine:'', likelihood:0.5, round:''})}}><span>Avbryt</span></Button>}</div>
            </Card>
            <Card>
                <CardTitle>Saker</CardTitle>
                {cases.map(c => (<ListRow key={c.id}><div className="info">{c.player} - {c.reason} ({c.fine} kr)</div><div className="actions"><SmallBtn onClick={() => {setEditingCase(c); setCaseForm(c); window.scrollTo(0,0)}}><span>Rediger</span></SmallBtn><SmallBtn danger onClick={() => deleteCase(c.id)}><span>Slett</span></SmallBtn></div></ListRow>))}
            </Card>
           </>
        )}

        {/* --- TAB: TABLE (AUTOMATISK SORTERING & OCR) --- */}
        {activeTab === 'table' && (
           <>
            <Card style={{ border: '1px solid #ff4500' }}>
              <CardTitle>⚡ Smart Tabell-oppdatering</CardTitle>
              {analyzing ? (
                <div style={{textAlign: 'center', padding: '2rem', color: '#ff4500'}}>
                   <h3>🤖 {statusText || 'Analyserer bildet...'}</h3>
                   <p>Dette tar vanligvis 5-10 sekunder.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                   <UploadBox style={{ flex: 1 }}>
                     <input type="file" accept="image/*" hidden onChange={handleTableImageUpload} />
                     <span style={{fontSize: '1.2rem'}}>📸 Last opp screenshot av tabell</span>
                     <span style={{fontSize: '0.8rem', color: '#666'}}>
                       Støtter de fleste tabellformater
                     </span>
                   </UploadBox>
                   <div style={{ flex: 1, fontSize: '0.9rem', color: '#888' }}>
                      <p>Tips for best resultat:</p>
                      <ul style={{paddingLeft: '1.2rem'}}>
                        <li>Klipp bildet slik at KUN tabellen vises.</li>
                        <li>Sjekk at tallene er tydelige.</li>
                        <li>Vi fikser automatisk farger og kontrast!</li>
                      </ul>
                   </div>
                </div>
              )}
            </Card>

            <Card>
                <CardTitle>{editingTableRow ? `Rediger: ${editingTableRow.team}` : 'Legg til lag (Manuelt)'}</CardTitle>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 60px 60px 60px 80px 80px', gap: '0.8rem', alignItems: 'end' }}>
                    
                    <FormGroup style={{marginBottom:0}}>
                        <Label>Lagnavn</Label>
                        <Input value={tableForm.team} onChange={e => setTableForm({...tableForm, team: e.target.value})} />
                    </FormGroup>
                    
                    <FormGroup style={{marginBottom:0}}><Label>K</Label><Input type="number" value={tableForm.played} onChange={e => setTableForm({...tableForm, played: e.target.value})} /></FormGroup>
                    <FormGroup style={{marginBottom:0}}><Label>V</Label><Input type="number" value={tableForm.won} onChange={e => setTableForm({...tableForm, won: e.target.value})} /></FormGroup>
                    <FormGroup style={{marginBottom:0}}><Label>U</Label><Input type="number" value={tableForm.draw} onChange={e => setTableForm({...tableForm, draw: e.target.value})} /></FormGroup>
                    <FormGroup style={{marginBottom:0}}><Label>T</Label><Input type="number" value={tableForm.lost} onChange={e => setTableForm({...tableForm, lost: e.target.value})} /></FormGroup>
                    
                    <FormGroup style={{marginBottom:0}}><Label>Mål+</Label><Input type="number" value={tableForm.gf} onChange={e => setTableForm({...tableForm, gf: e.target.value})} /></FormGroup>
                    <FormGroup style={{marginBottom:0}}><Label>Mål-</Label><Input type="number" value={tableForm.ga} onChange={e => setTableForm({...tableForm, ga: e.target.value})} /></FormGroup>
                </div>

                <div style={{marginTop: '1rem', color: '#888', fontStyle:'italic', fontSize:'0.9rem'}}>
                    * Poeng beregnes automatisk (2p for seier). Plassering justeres automatisk.
                </div>
                
                <div style={{display:'flex', gap:'1rem', marginTop:'1.5rem'}}>
                  <Button onClick={handleSaveTable}><span>{editingTableRow ? 'Oppdater Lag' : 'Legg til Lag'}</span></Button>
                  {editingTableRow && <Button danger onClick={() => {setEditingTableRow(null); setTableForm({ team: '', played: 0, won: 0, draw: 0, lost: 0, gf: 0, ga: 0 })}}><span>Avbryt</span></Button>}
                </div>
            </Card>

            <Card>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem'}}>
                   <CardTitle style={{margin:0}}>Nåværende Tabell</CardTitle>
                   <Button danger onClick={populateTable} style={{fontSize:'0.8rem', padding:'0.5rem 1rem'}}>
                       <span>⚠️ Reset til standard</span>
                   </Button>
                </div>

                <ListRow style={{background:'#0a0a0a', borderBottom:'2px solid #333', color:'#888', fontSize:'0.8rem'}}>
                    <div className="info" style={{width:'100%', display:'grid', gridTemplateColumns: '40px 1fr 40px 40px 40px 40px 100px 50px', gap: '10px'}}>
                        <span>#</span><span>Lag</span><span>K</span><span>V</span><span>U</span><span>T</span><span>Mål</span><span>P</span>
                    </div>
                    <div style={{width:'140px'}}>Handling</div>
                </ListRow>

                {sortedTable.map((row, index) => (
                    <ListRow key={row.id}>
                        <div className="info" style={{width:'100%', display:'grid', gridTemplateColumns: '40px 1fr 40px 40px 40px 40px 100px 50px', gap: '10px'}}>
                            <span style={{color: '#ff4500', fontWeight:'900'}}>{index + 1}.</span>
                            <span style={{fontWeight: row.team === 'Asker/Gui' ? '900' : 'normal', color: row.team === 'Asker/Gui' ? '#ff4500' : 'inherit'}}>{row.team}</span>
                            <span>{row.played}</span>
                            <span>{row.won}</span>
                            <span>{row.draw}</span>
                            <span>{row.lost}</span>
                            <span>{row.gf} - {row.ga}</span>
                            <span style={{color: '#fff', fontWeight:'900'}}>{row.points}</span>
                        </div>
                        <div className="actions">
                            <SmallBtn onClick={() => handleEditTable(row)}><span>Rediger</span></SmallBtn>
                            <SmallBtn danger onClick={() => deleteTableRow(row.id)}><span>Slett</span></SmallBtn>
                        </div>
                    </ListRow>
                ))}
            </Card>
           </>
        )}

      </MainContent>
    </AdminWrapper>
  );
}

export default AdminPage;