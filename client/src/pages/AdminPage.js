import React, { useContext, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { DataContext } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

// --- Styled Components ---

const AdminWrapper = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
  background-color: #050505;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  /* Samme grid-bakgrunn som hovedsiden */
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
  h2 {
    font-size: 2.5rem;
    font-weight: 800;
    margin: 0;
    text-transform: uppercase;
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
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  position: relative;

  /* Orange accent top */
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 20px; right: 20px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #ff4500, transparent);
    opacity: 0.5;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  font-weight: 700;
  color: #ddd;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.8rem;
  color: #888;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 0.5rem;
  letter-spacing: 0.5px;
`;

const Input = styled.input`
  width: 100%;
  background: #161616;
  border: 1px solid #333;
  padding: 1rem;
  color: white;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ff4500;
    box-shadow: 0 0 0 2px rgba(255, 69, 0, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  background: #161616;
  border: 1px solid #333;
  padding: 1rem;
  color: white;
  border-radius: 6px;
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
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  opacity: ${props => props.disabled ? 0.6 : 1};

  &:hover:not(:disabled) {
    filter: brightness(1.1);
    transform: translateY(-2px);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const ItemCard = styled.div`
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
    border-color: #555;
  }

  .img-wrapper {
    height: 150px;
    background: #111;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .placeholder {
      font-size: 3rem;
    }
  }

  .content {
    padding: 1rem;
  }

  h4 { margin: 0 0 0.5rem 0; color: white; }
  p { margin: 0 0 1rem 0; color: #888; font-size: 0.9rem; }

  .actions {
    display: flex;
    gap: 0.5rem;
  }
`;

const SmallBtn = styled(Button)`
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  width: 100%;
  justify-content: center;
`;

// Image Upload Styles
const UploadBox = styled.label`
  border: 2px dashed #444;
  background: rgba(255,255,255,0.02);
  border-radius: 8px;
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
  }
`;

const PreviewBox = styled.div`
  margin-top: 1rem;
  width: 150px;
  height: 150px;
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
  background: #1a1a1a;
  padding: 1rem;
  border-bottom: 1px solid #333;
  
  &:last-child { border-bottom: none; }

  .info { font-weight: 600; }
  .actions { display: flex; gap: 1rem; }
`;

function AdminPage() {
  const navigate = useNavigate();
  const { motm, updateMotm, matches, addMatch, deleteMatch, cases, addCase, deleteCase, players, addPlayer, deletePlayer, clearAllData, matchData, updateMatchData } = useContext(DataContext);
  
  const [activeTab, setActiveTab] = useState('matchData');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Forms States
  const [motmForm, setMotmForm] = useState(motm);
  const [editingMatch, setEditingMatch] = useState(null);
  const [editingCase, setEditingCase] = useState(null);
  const [loading, setLoading] = useState(false);

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
    name: '', number: '', position: '', imagePreview: null
  });

  // Mobile Check
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) navigate('/admin-pin');
  }, [navigate]);

  // --- Handlers ---

  const handleFileUpload = (e, setterFunc, keyName = 'image') => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (keyName === 'previewOnly') {
            setterFunc(reader.result); // Just sets the preview string
        } else {
            setterFunc(prev => ({ ...prev, [keyName]: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Match Data Handlers
  const handleUpdateMatchData = (field, value) => {
    updateMatchData({ ...matchData, [field]: value });
  };

  // Player Handlers
  const handleAddPlayer = async () => {
    if (!playerForm.name || !playerForm.number) return alert('Mangler navn eller nummer');
    setLoading(true);
    try {
      await addPlayer({
        name: playerForm.name,
        number: playerForm.number,
        position: playerForm.position,
        image: playerForm.imagePreview || '🦁'
      });
      setPlayerForm({ name: '', number: '', position: '', imagePreview: null });
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

  if (isMobile) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050505', color: '#fff', flexDirection: 'column', gap: '1rem' }}>
        <h2>💻 Gå til PC</h2>
        <p>Admin-panelet krever større skjerm.</p>
        <Button onClick={() => navigate('/')}>Tilbake</Button>
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
            <span>⚔️</span> Dagens Kamp (Forside)
          </MenuItem>
          <MenuItem active={activeTab === 'motm'} onClick={() => setActiveTab('motm')}>
             <span>⭐</span> Man of the Match
          </MenuItem>
        </MenuGroup>

        <MenuGroup>
          <MenuLabel>Database</MenuLabel>
          <MenuItem active={activeTab === 'players'} onClick={() => setActiveTab('players')}>
            <span>👥</span> Spillere
          </MenuItem>
          <MenuItem active={activeTab === 'matches'} onClick={() => setActiveTab('matches')}>
            <span>📅</span> Terminliste
          </MenuItem>
          <MenuItem active={activeTab === 'cases'} onClick={() => setActiveTab('cases')}>
            <span>⚖️</span> Botkassa
          </MenuItem>
        </MenuGroup>

        <div style={{ marginTop: 'auto' }}>
          <Button danger onClick={async () => {
             if(window.confirm('SLETT ALT? Dette kan ikke angres.')) await clearAllData();
          }} style={{ width: '100%', fontSize: '0.8rem' }}>
             🗑️ Reset Database
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
          <p>Endringer her oppdaterer appen umiddelbart.</p>
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
              <CardTitle>Logoer</CardTitle>
              <FormGroup>
                <Label>Hjemmelag Logo</Label>
                <div style={{display:'flex', gap:'1rem', alignItems:'flex-start'}}>
                    <div style={{flex: 1}}>
                         <Input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleFileUpload(e, (val) => handleUpdateMatchData('homeLogo', val), 'previewOnly')} 
                         />
                         <p style={{fontSize:'0.7rem', color:'#666', marginTop:'5px'}}>Eller lim inn URL under:</p>
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
                         <p style={{fontSize:'0.7rem', color:'#666', marginTop:'5px'}}>Eller lim inn URL under:</p>
                         <Input value={matchData.awayLogo} onChange={e => handleUpdateMatchData('awayLogo', e.target.value)} placeholder="URL..." />
                    </div>
                    <PreviewBox>
                        {matchData.awayLogo ? <img src={matchData.awayLogo} alt="Away" /> : <span>Ingen</span>}
                    </PreviewBox>
                </div>
              </FormGroup>
              <Button onClick={() => alert('Dagens kamp er oppdatert automatisk i context!')}>Bekreft Endringer</Button>
            </Card>
          </div>
        )}

        {/* --- TAB: PLAYERS --- */}
        {activeTab === 'players' && (
          <>
            <Card>
              <CardTitle>Legg til ny kriger</CardTitle>
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
              <FormGroup>
                 <Label>Spillerbilde</Label>
                 <UploadBox>
                    <input type="file" hidden onChange={(e) => handleFileUpload(e, setPlayerForm, 'imagePreview')} />
                    📸 Last opp bilde
                 </UploadBox>
                 {playerForm.imagePreview && (
                    <PreviewBox style={{marginTop: '1rem'}}>
                        <img src={playerForm.imagePreview} alt="Preview" />
                    </PreviewBox>
                 )}
              </FormGroup>
              <Button onClick={handleAddPlayer} disabled={loading}>
                 {loading ? 'Laster opp...' : 'Legg til Spiller'}
              </Button>
            </Card>

            <Grid>
              {players.map(p => (
                <ItemCard key={p.id}>
                  <div className="img-wrapper">
                    {p.image && p.image.length > 10 ? <img src={p.image} alt={p.name} /> : <span className="placeholder">🦁</span>}
                  </div>
                  <div className="content">
                    <h4>{p.name}</h4>
                    <p>#{p.number} • {p.position}</p>
                    <SmallBtn danger onClick={() => deletePlayer(p.id)}>Slett</SmallBtn>
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
                    📸 Last opp nytt bilde
                </UploadBox>
                {motmForm.image && motmForm.image.length > 20 && (
                     <PreviewBox>
                        <img src={motmForm.image} alt="Preview" />
                     </PreviewBox>
                )}
             </FormGroup>
             <Button onClick={handleSaveMotm}>Publiser MOTM</Button>
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
                  <Button onClick={handleSaveMatch}>{editingMatch ? 'Oppdater' : 'Legg til'}</Button>
                  {editingMatch && <Button danger onClick={() => {setEditingMatch(null); setMatchForm({date:'', time:'', opponent:'', location:'', logo:''})}}>Avbryt</Button>}
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
                            <SmallBtn onClick={() => {setEditingMatch(m); setMatchForm(m); window.scrollTo(0,0)}}>Rediger</SmallBtn>
                            <SmallBtn danger onClick={() => deleteMatch(m.id)}>Slett</SmallBtn>
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
                  <Button onClick={handleSaveCase}>{editingCase ? 'Oppdater' : 'Legg til'}</Button>
                  {editingCase && <Button danger onClick={() => {setEditingCase(null); setCaseForm({player:'', reason:'', fine:'', likelihood:0.5, round:''})}}>Avbryt</Button>}
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
                            <SmallBtn onClick={() => {setEditingCase(c); setCaseForm(c); window.scrollTo(0,0)}}>Rediger</SmallBtn>
                            <SmallBtn danger onClick={() => deleteCase(c.id)}>Slett</SmallBtn>
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