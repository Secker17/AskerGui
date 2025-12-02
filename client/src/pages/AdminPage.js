import React, { useContext, useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { DataContext } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

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
    background: #ff4500;
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
    border-color: #ff4500;
    background: #000;
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
  background: ${props => props.danger ? '#b91c1c' : '#ff4500'};
  color: white;
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
  }
  
  .actions { display: flex; gap: 0.5rem; }
`;

// Ny style for score input
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
  const { motm, updateMotm, matches, addMatch, deleteMatch, cases, addCase, deleteCase, players, addPlayer, deletePlayer, clearAllData, matchData, updateMatchData } = useContext(DataContext);
  
  const [activeTab, setActiveTab] = useState('matchData');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Security State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Forms States
  const [motmForm, setMotmForm] = useState(motm);
  const [editingMatch, setEditingMatch] = useState(null);
  const [editingCase, setEditingCase] = useState(null);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [loading, setLoading] = useState(false); // Data loading state

  // Match Data Form
  const [matchForm, setMatchForm] = useState({
    date: '', time: '', opponent: '', location: '', logo: ''
  });

  // Case Form
  const [caseForm, setCaseForm] = useState({
    player: '', reason: '', fine: '', likelihood: 0.5, round: ''
  });

  // Player Form
  const [playerForm, setPlayerForm] = useState({
    name: '', 
    number: '', 
    position: '', 
    imagePreview: null, 
    image: '',
    isCaptain: false,
    isTeamLeader: false
  });

  // Mobile Check
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

  // --- SECURITY CHECK (NY) ---
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth');
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          navigate('/admin-pin');
        }
      } catch (err) {
        console.error("Auth check failed", err);
        navigate('/admin-pin');
      } finally {
        setAuthLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  // --- LOGOUT HANDLER (NY) ---
  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      navigate('/admin-pin');
    } catch (error) {
      console.error("Logout failed", error);
      navigate('/admin-pin');
    }
  };

  // --- Handlers ---

  const handleFileUpload = (e, setterFunc, keyName = 'image') => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (keyName === 'previewOnly') {
            setterFunc(reader.result); 
        } else {
            setterFunc(prev => ({ ...prev, [keyName]: reader.result, imagePreview: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Match Data Handlers
  const handleUpdateMatchData = (field, value) => {
    updateMatchData({ ...matchData, [field]: value });
  };

  // Håndter oppdatering av resultat (Score)
  const handleScoreUpdate = (team, value) => {
    const currentScore = matchData.score || { home: 0, away: 0 };
    const newScore = { ...currentScore, [team]: Number(value) };
    updateMatchData({ ...matchData, score: newScore });
  };

  // Player Handlers
  const handleEditPlayer = (player) => {
    setEditingPlayer(player);
    setPlayerForm({
      name: player.name,
      number: player.number,
      position: player.position,
      image: player.image,
      imagePreview: player.image,
      isCaptain: player.isCaptain || false, // Hent status
      isTeamLeader: player.isTeamLeader || false // Hent status
    });
    window.scrollTo(0,0);
  };

  const handleCancelEditPlayer = () => {
    setEditingPlayer(null);
    setPlayerForm({ name: '', number: '', position: '', imagePreview: null, image: '', isCaptain: false, isTeamLeader: false });
  };

  const handleSavePlayer = async () => {
    if (!playerForm.name || !playerForm.number) return alert('Mangler navn eller nummer');
    setLoading(true);
    
    try {
      const playerData = {
        name: playerForm.name,
        number: playerForm.number,
        position: playerForm.position,
        image: playerForm.imagePreview || playerForm.image || '🦁',
        isCaptain: playerForm.isCaptain, // Lagre status
        isTeamLeader: playerForm.isTeamLeader // Lagre status
      };

      if (editingPlayer) {
        await deletePlayer(editingPlayer.id);
        await addPlayer(playerData);
        setEditingPlayer(null);
        alert('Spiller oppdatert!');
      } else {
        await addPlayer(playerData);
        alert('Spiller lagt til!');
      }
      
      setPlayerForm({ name: '', number: '', position: '', imagePreview: null, image: '', isCaptain: false, isTeamLeader: false });
      
    } catch (e) { alert(e.message); }
    setLoading(false);
  };

  // Match List Handlers
  const handleSaveMatch = async () => {
    if (!matchForm.opponent) return;
    setLoading(true);
    try {
      if (editingMatch) {
        await deleteMatch(editingMatch.id);
        await addMatch({ ...matchForm, id: editingMatch.id });
        setEditingMatch(null);
      } else {
        await addMatch(matchForm);
      }
      setMatchForm({ date: '', time: '', opponent: '', location: '', logo: '' });
    } catch (e) { alert(e.message); }
    setLoading(false);
  };

  // Case Handlers
  const handleSaveCase = async () => {
    if (!caseForm.player) return;
    setLoading(true);
    try {
      const data = { ...caseForm, fine: Number(caseForm.fine) };
      if (editingCase) {
        await deleteCase(editingCase.id);
        await addCase({ ...data, id: editingCase.id });
        setEditingCase(null);
      } else {
        await addCase(data);
      }
      setCaseForm({ player: '', reason: '', fine: '', likelihood: 0.5, round: '' });
    } catch (e) { alert(e.message); }
    setLoading(false);
  };

  // MOTM Handler
  const handleSaveMotm = async () => {
    setLoading(true);
    try {
      await updateMotm(motmForm);
      alert('Lagret!');
    } catch (e) { alert(e.message); }
    setLoading(false);
  };

  if (authLoading) {
    return <LoadingScreen>VERIFISERER TILGANG...</LoadingScreen>;
  }

  if (!isAuthenticated) return null;

  if (isMobile) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050505', color: '#fff', flexDirection: 'column', gap: '1rem' }}>
        <h2>💻 Gå til PC</h2>
        <p>Admin-panelet krever større skjerm.</p>
        <Button onClick={() => navigate('/')}><span>Tilbake</span></Button>
      </div>
    );
  }

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
          <MenuItem active={activeTab === 'matchData'} onClick={() => setActiveTab('matchData')}>
            <span>⚔️</span> Dagens Kamp
          </MenuItem>
          <MenuItem active={activeTab === 'motm'} onClick={() => setActiveTab('motm')}>
             <span>⭐</span> Man of the Match
          </MenuItem>
        </MenuGroup>

        <MenuGroup>
          <MenuLabel>Database</MenuLabel>
          <MenuItem active={activeTab === 'players'} onClick={() => setActiveTab('players')}>
            <span>👥</span> Spillerstall
          </MenuItem>
          <MenuItem active={activeTab === 'matches'} onClick={() => setActiveTab('matches')}>
            <span>📅</span> Terminliste
          </MenuItem>
          <MenuItem active={activeTab === 'cases'} onClick={() => setActiveTab('cases')}>
            <span>⚖️</span> Botkassa
          </MenuItem>
        </MenuGroup>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Button onClick={handleLogout} style={{ width: '100%', fontSize: '0.8rem', background: '#222' }}>
               <span>🔒 Logg ut</span>
          </Button>
          
          <Button danger onClick={async () => {
             if(window.confirm('SLETT ALT? Dette kan ikke angres.')) await clearAllData();
          }} style={{ width: '100%', fontSize: '0.8rem' }}>
              <span>🗑️ Reset Database</span>
          </Button>
        </div>
      </Sidebar>

      <MainContent>
        <Header>
          <h2>
            {activeTab === 'matchData' && 'Dagens Kamp'}
            {activeTab === 'motm' && 'Man of the Match'}
            {activeTab === 'players' && 'Spillerstall'}
            {activeTab === 'matches' && 'Terminliste'}
            {activeTab === 'cases' && 'Botkassa'}
          </h2>
          <p>Endringer lagres umiddelbart i Firebase.</p>
        </Header>

        {/* --- TAB: MATCH DATA (DAGENS KAMP) --- */}
        {activeTab === 'matchData' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <Card>
              <CardTitle>Kamp Informasjon</CardTitle>
              <FormGroup>
                <Label>Hjemmelag</Label>
                <Input value={matchData.homeTeam} onChange={e => handleUpdateMatchData('homeTeam', e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label>Bortelag</Label>
                <Input value={matchData.awayTeam} onChange={e => handleUpdateMatchData('awayTeam', e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label>Live Stream Link</Label>
                <Input value={matchData.liveLink} onChange={e => handleUpdateMatchData('liveLink', e.target.value)} />
              </FormGroup>
            </Card>

            <Card>
              <CardTitle>Resultat & Status</CardTitle>
              
              <ToggleContainer $active={matchData.isFinished}>
                <input 
                  type="checkbox" 
                  checked={matchData.isFinished || false} 
                  onChange={(e) => handleUpdateMatchData('isFinished', e.target.checked)} 
                />
                <div className="switch"></div>
                <span>{matchData.isFinished ? 'Kampen er ferdig (Vis Resultat)' : 'Kampen pågår / Kommende'}</span>
              </ToggleContainer>

              <ScoreInputWrapper $finished={matchData.isFinished}>
                  <FormGroup style={{marginBottom:0, flex:1, textAlign:'center'}}>
                      <Label style={{fontSize:'1rem', color: '#fff'}}>{matchData.homeTeam || 'Hjemme'}</Label>
                      <Input 
                        type="number" 
                        style={{fontSize: '2rem', textAlign:'center', height:'80px', fontWeight:'bold', color:'#ff4500'}}
                        value={matchData.score?.home ?? 0}
                        onChange={(e) => handleScoreUpdate('home', e.target.value)}
                      />
                  </FormGroup>
                  <span style={{fontSize:'2rem', fontWeight:'900', color:'#444'}}>-</span>
                  <FormGroup style={{marginBottom:0, flex:1, textAlign:'center'}}>
                      <Label style={{fontSize:'1rem', color: '#fff'}}>{matchData.awayTeam || 'Borte'}</Label>
                      <Input 
                        type="number" 
                        style={{fontSize: '2rem', textAlign:'center', height:'80px', fontWeight:'bold', color:'#fff'}}
                        value={matchData.score?.away ?? 0}
                        onChange={(e) => handleScoreUpdate('away', e.target.value)}
                      />
                  </FormGroup>
              </ScoreInputWrapper>
              
              <p style={{marginTop: '1rem', color: '#666', fontSize: '0.8rem'}}>
                  * Vinneren markeres automatisk basert på scoren. Ved seier vises "3 Poeng" på forsiden.
              </p>
            </Card>

            <Card style={{gridColumn: '1 / -1'}}>
              <CardTitle>Logoer</CardTitle>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <FormGroup>
                  <Label>Hjemmelag Logo</Label>
                  <div style={{display:'flex', gap:'1rem', alignItems:'flex-start'}}>
                      <div style={{flex: 1}}>
                           <Input 
                             type="file" 
                             accept="image/*" 
                             onChange={(e) => handleFileUpload(e, (val) => handleUpdateMatchData('homeLogo', val), 'previewOnly')} 
                           />
                           <p style={{fontSize:'0.7rem', color:'#666', marginTop:'5px'}}>Eller URL:</p>
                           <Input value={matchData.homeLogo} onChange={e => handleUpdateMatchData('homeLogo', e.target.value)} placeholder="URL..." />
                      </div>
                      <PreviewBox>
                          {matchData.homeLogo ? <img src={matchData.homeLogo} alt="Home" /> : <span>Ingen</span>}
                      </PreviewBox>
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label>Bortelag Logo</Label>
                  <div style={{display:'flex', gap:'1rem', alignItems:'flex-start'}}>
                      <div style={{flex: 1}}>
                           <Input 
                             type="file" 
                             accept="image/*" 
                             onChange={(e) => handleFileUpload(e, (val) => handleUpdateMatchData('awayLogo', val), 'previewOnly')} 
                           />
                           <p style={{fontSize:'0.7rem', color:'#666', marginTop:'5px'}}>Eller URL:</p>
                           <Input value={matchData.awayLogo} onChange={e => handleUpdateMatchData('awayLogo', e.target.value)} placeholder="URL..." />
                      </div>
                      <PreviewBox>
                          {matchData.awayLogo ? <img src={matchData.awayLogo} alt="Away" /> : <span>Ingen</span>}
                      </PreviewBox>
                  </div>
                </FormGroup>
              </div>
            </Card>
          </div>
        )}

        {/* --- TAB: PLAYERS (MED REDIGERING) --- */}
        {activeTab === 'players' && (
          <>
            <Card>
              <CardTitle>{editingPlayer ? 'Rediger Spiller' : 'Ny Spiller'}</CardTitle>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <FormGroup>
                    <Label>Navn</Label>
                    <Input value={playerForm.name} onChange={e => setPlayerForm({...playerForm, name: e.target.value})} placeholder="Navn..." />
                </FormGroup>
                <FormGroup>
                    <Label>Nummer</Label>
                    <Input type="number" value={playerForm.number} onChange={e => setPlayerForm({...playerForm, number: e.target.value})} placeholder="#" />
                </FormGroup>
                <FormGroup>
                    <Label>Posisjon</Label>
                    <Input value={playerForm.position} onChange={e => setPlayerForm({...playerForm, position: e.target.value})} placeholder="Posisjon..." />
                </FormGroup>
              </div>
              
              {/* ROLLER SEKSJON */}
              <div style={{display: 'flex', gap: '2rem', marginBottom: '1.5rem'}}>
                <ToggleContainer $active={playerForm.isCaptain}>
                  <input 
                    type="checkbox" 
                    checked={playerForm.isCaptain} 
                    onChange={(e) => setPlayerForm({...playerForm, isCaptain: e.target.checked})} 
                  />
                  <div className="switch"></div>
                  <span>Kaptein ©</span>
                </ToggleContainer>

                <ToggleContainer $active={playerForm.isTeamLeader}>
                  <input 
                    type="checkbox" 
                    checked={playerForm.isTeamLeader} 
                    onChange={(e) => setPlayerForm({...playerForm, isTeamLeader: e.target.checked})} 
                  />
                  <div className="switch"></div>
                  <span>Lagleder</span>
                </ToggleContainer>
              </div>

              <FormGroup>
                 <Label>Spillerbilde</Label>
                 <UploadBox>
                    <input type="file" hidden onChange={(e) => handleFileUpload(e, setPlayerForm, 'imagePreview')} />
                    <span>📸 Last opp bilde</span>
                 </UploadBox>
                 {playerForm.imagePreview && (
                    <PreviewBox style={{marginTop: '1rem'}}>
                        <img src={playerForm.imagePreview} alt="Preview" />
                    </PreviewBox>
                 )}
              </FormGroup>
              
              <div style={{display:'flex', gap:'1rem'}}>
                  <Button onClick={handleSavePlayer} disabled={loading}>
                      <span>{loading ? 'Lagrer...' : (editingPlayer ? 'Oppdater Spiller' : 'Legg til Spiller')}</span>
                  </Button>
                  {editingPlayer && (
                      <Button danger onClick={handleCancelEditPlayer}><span>Avbryt</span></Button>
                  )}
              </div>
            </Card>

            <h3 style={{marginTop:'3rem', marginBottom:'1rem', textTransform:'uppercase'}}>Spillere i troppen ({players.length})</h3>
            <Grid>
              {players.map(p => (
                <ItemCard key={p.id}>
                  <div className="img-wrapper">
                    {p.image && p.image.length > 10 ? <img src={p.image} alt={p.name} /> : <span className="placeholder">🦁</span>}
                  </div>
                  <div className="content">
                    <h4>{p.name}</h4>
                    <p>#{p.number} • {p.position}</p>
                    
                    {/* VISER STATUS PÅ ADMIN KORTET OGSÅ */}
                    <div style={{marginBottom:'1rem', display:'flex', gap:'0.5rem'}}>
                        {p.isCaptain && <span style={{fontSize:'0.7rem', background:'#ff4500', padding:'2px 6px', color:'black', fontWeight:'bold'}}>KAPTEIN</span>}
                        {p.isTeamLeader && <span style={{fontSize:'0.7rem', background:'#fff', padding:'2px 6px', color:'black', fontWeight:'bold'}}>LAGLEDER</span>}
                    </div>

                    <div className="actions">
                        <SmallBtn onClick={() => handleEditPlayer(p)}><span>Rediger</span></SmallBtn>
                        <SmallBtn danger onClick={() => deletePlayer(p.id)}><span>Slett</span></SmallBtn>
                    </div>
                  </div>
                </ItemCard>
              ))}
            </Grid>
          </>
        )}

        {/* --- TAB: MOTM --- */}
        {activeTab === 'motm' && (
          <Card>
              <CardTitle>Oppdater MOTM Kortet</CardTitle>
              <FormGroup>
                <Label>Velg fra liste (Fyller ut automatisk)</Label>
                <Select onChange={(e) => {
                  const p = players.find(pl => pl.name === e.target.value);
                  if(p) setMotmForm({...motmForm, player: p.name, number: p.number, position: p.position});
                }}>
                  <option>Velg spiller...</option>
                  {players.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                </Select>
              </FormGroup>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FormGroup>
                    <Label>Navn</Label>
                    <Input value={motmForm.player} onChange={e => setMotmForm({...motmForm, player: e.target.value})} />
                </FormGroup>
                <FormGroup>
                    <Label>Mål</Label>
                    <Input type="number" value={motmForm.goals} onChange={e => setMotmForm({...motmForm, goals: Number(e.target.value)})} />
                </FormGroup>
                <FormGroup>
                    <Label>Reddninger</Label>
                    <Input type="number" value={motmForm.saves} onChange={e => setMotmForm({...motmForm, saves: Number(e.target.value)})} />
                </FormGroup>
                <FormGroup>
                    <Label>Runde</Label>
                    <Input value={motmForm.round} onChange={e => setMotmForm({...motmForm, round: e.target.value})} />
                </FormGroup>
             </div>
             <FormGroup>
                <Label>Bilde (Override)</Label>
                <UploadBox>
                    <input type="file" hidden onChange={(e) => handleFileUpload(e, setMotmForm, 'image')} />
                    <span>📸 Last opp nytt bilde</span>
                </UploadBox>
                {motmForm.image && motmForm.image.length > 20 && (
                      <PreviewBox>
                          <img src={motmForm.image} alt="Preview" />
                      </PreviewBox>
                )}
             </FormGroup>
             <Button onClick={handleSaveMotm}><span>Publiser MOTM</span></Button>
          </Card>
        )}

        {/* --- TAB: MATCHES --- */}
        {activeTab === 'matches' && (
           <>
             <Card>
               <CardTitle>{editingMatch ? 'Rediger Kamp' : 'Ny Kamp'}</CardTitle>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                  <FormGroup><Label>Dato</Label><Input type="date" value={matchForm.date} onChange={e => setMatchForm({...matchForm, date: e.target.value})} /></FormGroup>
                  <FormGroup><Label>Tid</Label><Input type="time" value={matchForm.time} onChange={e => setMatchForm({...matchForm, time: e.target.value})} /></FormGroup>
                  <FormGroup><Label>Motstander</Label><Input value={matchForm.opponent} onChange={e => setMatchForm({...matchForm, opponent: e.target.value})} placeholder="Lagnavn" /></FormGroup>
                  <FormGroup><Label>Sted</Label><Input value={matchForm.location} onChange={e => setMatchForm({...matchForm, location: e.target.value})} placeholder="Arena" /></FormGroup>
               </div>
               <FormGroup>
                 <Label>Motstander Logo (URL)</Label>
                 <Input value={matchForm.logo} onChange={e => setMatchForm({...matchForm, logo: e.target.value})} placeholder="https://..." />
               </FormGroup>
               <div style={{display:'flex', gap:'1rem'}}>
                  <Button onClick={handleSaveMatch}><span>{editingMatch ? 'Oppdater' : 'Legg til'}</span></Button>
                  {editingMatch && <Button danger onClick={() => {setEditingMatch(null); setMatchForm({date:'', time:'', opponent:'', location:'', logo:''})}}><span>Avbryt</span></Button>}
               </div>
             </Card>
             
             <Card>
                <CardTitle>Kommende Kamper</CardTitle>
                {matches.map(m => (
                    <ListRow key={m.id}>
                        <div className="info">
                            <span style={{color:'#ff4500'}}>{m.date}</span> - {m.opponent}
                        </div>
                        <div className="actions">
                            <SmallBtn onClick={() => {setEditingMatch(m); setMatchForm(m); window.scrollTo(0,0)}}><span>Rediger</span></SmallBtn>
                            <SmallBtn danger onClick={() => deleteMatch(m.id)}><span>Slett</span></SmallBtn>
                        </div>
                    </ListRow>
                ))}
             </Card>
           </>
        )}

        {/* --- TAB: CASES (BOTKASSA) --- */}
        {activeTab === 'cases' && (
           <>
            <Card>
                <CardTitle>{editingCase ? 'Rediger Sak' : 'Ny Sak'}</CardTitle>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <FormGroup><Label>Spiller</Label><Input value={caseForm.player} onChange={e => setCaseForm({...caseForm, player: e.target.value})} /></FormGroup>
                    <FormGroup><Label>Årsak</Label><Input value={caseForm.reason} onChange={e => setCaseForm({...caseForm, reason: e.target.value})} /></FormGroup>
                    <FormGroup><Label>Bot (kr)</Label><Input type="number" value={caseForm.fine} onChange={e => setCaseForm({...caseForm, fine: e.target.value})} /></FormGroup>
                    <FormGroup>
                        <Label>Sannsynlighet ({Math.round(caseForm.likelihood * 100)}%)</Label>
                        <input type="range" min="0" max="100" style={{width:'100%'}} value={caseForm.likelihood * 100} onChange={e => setCaseForm({...caseForm, likelihood: e.target.value / 100})} />
                    </FormGroup>
                </div>
                <div style={{display:'flex', gap:'1rem'}}>
                  <Button onClick={handleSaveCase}><span>{editingCase ? 'Oppdater' : 'Legg til'}</span></Button>
                  {editingCase && <Button danger onClick={() => {setEditingCase(null); setCaseForm({player:'', reason:'', fine:'', likelihood:0.5, round:''})}}><span>Avbryt</span></Button>}
                </div>
            </Card>

            <Card>
                <CardTitle>Saker</CardTitle>
                {cases.map(c => (
                    <ListRow key={c.id}>
                        <div className="info">
                            {c.player} - {c.reason} ({c.fine} kr)
                        </div>
                        <div className="actions">
                            <SmallBtn onClick={() => {setEditingCase(c); setCaseForm(c); window.scrollTo(0,0)}}><span>Rediger</span></SmallBtn>
                            <SmallBtn danger onClick={() => deleteCase(c.id)}><span>Slett</span></SmallBtn>
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