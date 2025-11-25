import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { DataContext } from '../context/DataContext';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  min-height: 100vh;

  @media (min-width: 768px) {
    grid-template-columns: 250px 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 280px 1fr;
  }
`;

const Sidebar = styled.aside`
  background: linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 100%);
  border-right: 1px solid rgba(255,255,255,0.08);
  padding: 1.5rem 1rem;
  display: ${props => (props.open ? 'flex' : 'none')};
  flex-direction: column;
  gap: 0.5rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  overflow-y: auto;

  @media (min-width: 768px) {
    display: flex;
    position: static;
    width: auto;
    height: auto;
    z-index: auto;
    padding: 2rem 1.5rem;
    gap: 1rem;
  }
`;

const SidebarTitle = styled.h3`
  color: #fff;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  font-weight: 900;
  margin-top: 1rem;

  @media (min-width: 768px) {
    margin-top: 0;
    margin-bottom: 1.5rem;
  }

  &:first-child {
    margin-top: 0;
  }
`;

const SidebarButton = styled.button`
  background: ${props => (props.active ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)')};
  color: #fff;
  border: 1px solid ${props => (props.active ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)')};
  padding: 0.8rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  text-align: left;
  font-size: 0.9rem;

  &:hover {
    background: rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.15);
  }

  @media (min-width: 768px) {
    padding: 0.7rem 1rem;
    font-size: 0.85rem;
  }
`;

const CloseSidebar = styled.button`
  display: block;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Container = styled.div`
  padding: 2rem 1rem;
  min-height: 100vh;

  @media (min-width: 768px) {
    padding: 2rem;
  }

  @media (min-width: 1024px) {
    padding: 3rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #fff;
  margin-bottom: 0.5rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -1px;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  color: #bdbdbd;
  font-size: 0.9rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2.5rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    gap: 2rem;
  }
`;

const Section = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  color: #fff;
  margin-bottom: 1.2rem;
  font-weight: 900;

  @media (min-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 1.2rem;
  }
`;

const Label = styled.label`
  display: block;
  color: #bdbdbd;
  font-weight: 600;
  margin-bottom: 0.4rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.3px;

  @media (min-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;

  @media (min-width: 768px) {
    padding: 0.8rem;
  }

  &:focus {
    outline: none;
    border-color: rgba(255,255,255,0.3);
    background: rgba(255,255,255,0.08);
    box-shadow: 0 0 10px rgba(255,255,255,0.1);
  }

  &::placeholder {
    color: rgba(255,255,255,0.4);
  }
`;

const ImageInput = styled.input`
  display: none;
`;

const ImageUploadLabel = styled.label`
  display: block;
  width: 100%;
  padding: 1rem;
  background: rgba(255,255,255,0.05);
  border: 2px dashed rgba(255,255,255,0.2);
  border-radius: 8px;
  color: #bdbdbd;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;

  &:hover {
    border-color: rgba(255,255,255,0.4);
    background: rgba(255,255,255,0.08);
  }
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 150px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-top: 0.5rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.7rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;

  @media (min-width: 768px) {
    padding: 0.8rem;
  }

  &:focus {
    outline: none;
    border-color: rgba(255,255,255,0.3);
    background: rgba(255,255,255,0.08);
  }

  option {
    background: #0a0a0a;
    color: #fff;
  }
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  background: ${p => (p.danger ? '#ff4444' : '#fff')};
  color: ${p => (p.danger ? '#fff' : '#000')};
  border: none;
  border-radius: 10px;
  font-weight: 900;
  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.8rem;
  opacity: ${p => (p.disabled ? 0.6 : 1)};

  @media (min-width: 768px) {
    padding: 0.9rem 1.8rem;
    font-size: 0.9rem;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 1rem;

  @media (min-width: 768px) {
    gap: 0.8rem;
    margin-top: 1.5rem;
  }
`;

const ListItem = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 10px;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  @media (min-width: 768px) {
    padding: 1rem;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .info {
    flex: 1;
    color: #fff;
    font-weight: 600;
    font-size: 0.9rem;

    @media (min-width: 768px) {
      font-size: 1rem;
    }
  }

  .actions {
    display: flex;
    gap: 0.5rem;
    width: 100%;

    @media (min-width: 768px) {
      width: auto;
    }
  }
`;

const DeleteButton = styled(Button)`
  padding: 0.6rem 1rem;
  font-size: 0.75rem;
  flex: 1;

  @media (min-width: 768px) {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
    flex: none;
  }
`;

const PlayerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
`;

const PlayerCard = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.06);
  }

  .image {
    width: 100%;
    height: 120px;
    background: rgba(255,255,255,0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    margin-bottom: 0;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (min-width: 768px) {
      height: 140px;
      font-size: 3rem;
    }
  }

  .content {
    padding: 1rem;
  }

  .name {
    color: #fff;
    font-weight: 700;
    font-size: 0.85rem;
    margin-bottom: 0.3rem;

    @media (min-width: 768px) {
      font-size: 0.95rem;
    }
  }

  .number {
    color: #bdbdbd;
    font-size: 0.75rem;
    margin-bottom: 0.5rem;

    @media (min-width: 768px) {
      font-size: 0.85rem;
    }
  }

  .position {
    color: #9f9f9f;
    font-size: 0.7rem;
    margin-bottom: 0.8rem;

    @media (min-width: 768px) {
      font-size: 0.8rem;
      margin-bottom: 1rem;
    }
  }

  .delete-btn {
    width: 100%;
    padding: 0.5rem;
    font-size: 0.7rem;

    @media (min-width: 768px) {
      padding: 0.6rem;
      font-size: 0.75rem;
    }
  }
`;

function AdminPage() {
  const { motm, updateMotm, matches, addMatch, deleteMatch, cases, addCase, deleteCase, players, addPlayer, deletePlayer } = useContext(DataContext);
  const [activeTab, setActiveTab] = useState('players');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [motmForm, setMotmForm] = useState(motm);
  const [editingMatch, setEditingMatch] = useState(null);
  const [editingCase, setEditingCase] = useState(null);
  const [matchForm, setMatchForm] = useState({
    date: '',
    time: '',
    opponent: '',
    logo: '🦁',
    location: '',
  });
  const [caseForm, setCaseForm] = useState({
    player: '',
    reason: '',
    fine: 0,
    likelihood: 0.5,
    round: '',
  });
  const [playerForm, setPlayerForm] = useState({
    name: '',
    number: '',
    position: '',
    image: null,
    imagePreview: null,
  });
  const [uploadingPlayer, setUploadingPlayer] = useState(false);
  const [motmImagePreview, setMotmImagePreview] = useState(motm.image);

  const closeSidebar = () => setSidebarOpen(false);
  const selectTab = (tab) => {
    setActiveTab(tab);
    closeSidebar();
  };

  const handleMotmChange = (e) => {
    const { name, value } = e.target;
    setMotmForm({ ...motmForm, [name]: isNaN(value) ? value : Number(value) });
  };

  const handleMotmImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMotmImagePreview(reader.result);
        setMotmForm({ ...motmForm, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMotmSave = () => {
    updateMotm(motmForm);
    alert('Man of the Match oppdatert!');
  };

  const handleMatchChange = (e) => {
    const { name, value } = e.target;
    setMatchForm({ ...matchForm, [name]: value });
  };

  const handleAddMatch = () => {
    if (!matchForm.date || !matchForm.opponent) {
      alert('Fyll inn dato og motstander');
      return;
    }
    
    if (editingMatch) {
      // Update existing match
      const updatedMatch = { ...matchForm, id: editingMatch.id };
      deleteMatch(editingMatch.id);
      addMatch(updatedMatch);
      setEditingMatch(null);
      alert('Kamp oppdatert!');
    } else {
      // Add new match
      addMatch(matchForm);
      alert('Kamp lagt til!');
    }
    
    setMatchForm({
      date: '',
      time: '',
      opponent: '',
      logo: '🦁',
      location: '',
    });
  };

  const handleEditMatch = (match) => {
    setEditingMatch(match);
    setMatchForm({
      date: match.date,
      time: match.time,
      opponent: match.opponent,
      logo: match.logo,
      location: match.location,
    });
    setActiveTab('matches');
  };

  const handleCancelEdit = () => {
    setEditingMatch(null);
    setMatchForm({
      date: '',
      time: '',
      opponent: '',
      logo: '🦁',
      location: '',
    });
  };

  const handleCaseChange = (e) => {
    const { name, value } = e.target;
    setCaseForm({ ...caseForm, [name]: isNaN(value) ? value : Number(value) });
  };

  const handleAddCase = () => {
    if (!caseForm.player || !caseForm.reason) {
      alert('Fyll inn spiller og årsak');
      return;
    }
    
    if (editingCase) {
      // Update existing case
      const updatedCase = { ...caseForm, id: editingCase.id };
      deleteCase(editingCase.id);
      addCase(updatedCase);
      setEditingCase(null);
      alert('Rettssak oppdatert!');
    } else {
      // Add new case
      addCase(caseForm);
      alert('Rettssak lagt til!');
    }
    
    setCaseForm({
      player: '',
      reason: '',
      fine: 0,
      likelihood: 0.5,
      round: '',
    });
  };

  const handleEditCase = (caseItem) => {
    setEditingCase(caseItem);
    setCaseForm({
      player: caseItem.player,
      reason: caseItem.reason,
      fine: caseItem.fine,
      likelihood: caseItem.likelihood,
      round: caseItem.round,
    });
    setActiveTab('cases');
  };

  const handleCancelEditCase = () => {
    setEditingCase(null);
    setCaseForm({
      player: '',
      reason: '',
      fine: 0,
      likelihood: 0.5,
      round: '',
    });
  };

  const handlePlayerChange = (e) => {
    const { name, value } = e.target;
    setPlayerForm({ ...playerForm, [name]: isNaN(value) ? value : Number(value) });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPlayerForm({ ...playerForm, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPlayerForm(prev => ({ ...prev, imagePreview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPlayer = () => {
    if (!playerForm.name || !playerForm.number || !playerForm.position) {
      alert('Fyll inn navn, nummer og posisjon');
      return;
    }

    setUploadingPlayer(true);
    let imageData = '🦁';

    if (playerForm.imagePreview) {
      imageData = playerForm.imagePreview;
    }

    addPlayer({
      name: playerForm.name,
      number: playerForm.number,
      position: playerForm.position,
      image: imageData,
    });

    setPlayerForm({
      name: '',
      number: '',
      position: '',
      image: null,
      imagePreview: null,
    });
    setUploadingPlayer(false);
    alert('Spiller lagt til!');
  };

  return (
    <Wrapper>
      <Sidebar open={sidebarOpen}>
        <CloseSidebar onClick={closeSidebar}>✕</CloseSidebar>
        
        <SidebarTitle>Innhold</SidebarTitle>
        <SidebarButton active={activeTab === 'players'} onClick={() => selectTab('players')}>👥 Spillere</SidebarButton>
        <SidebarButton active={activeTab === 'motm'} onClick={() => selectTab('motm')}>⭐ Man of the Match</SidebarButton>
        <SidebarButton active={activeTab === 'matches'} onClick={() => selectTab('matches')}>📅 Kamper</SidebarButton>
        <SidebarButton active={activeTab === 'cases'} onClick={() => selectTab('cases')}>⚖️ Rettsaker</SidebarButton>

        <SidebarTitle style={{ marginTop: '2rem' }}>Lister</SidebarTitle>
        <SidebarButton active={activeTab === 'matchList'} onClick={() => selectTab('matchList')}>📋 Alle Kamper</SidebarButton>
        <SidebarButton active={activeTab === 'caseList'} onClick={() => selectTab('caseList')}>📋 Alle Rettsaker</SidebarButton>
      </Sidebar>

      <Container>
        <Title>⚙️ Admin</Title>
        <Subtitle>Administrer innholdet på siden</Subtitle>

        {activeTab === 'players' && (
        <Section style={{ marginBottom: '2rem' }}>
        <SectionTitle>Legg til Spiller</SectionTitle>
        <FormGroup>
          <Label>Navn</Label>
          <Input
            type="text"
            name="name"
            value={playerForm.name}
            onChange={handlePlayerChange}
            placeholder="F.eks. Magnus Andersen"
          />
        </FormGroup>
        <FormGroup>
          <Label>Nummer</Label>
          <Input
            type="number"
            name="number"
            value={playerForm.number}
            onChange={handlePlayerChange}
            min="1"
          />
        </FormGroup>
        <FormGroup>
          <Label>Posisjon</Label>
          <Input
            type="text"
            name="position"
            value={playerForm.position}
            onChange={handlePlayerChange}
            placeholder="F.eks. Høyre Fløy"
          />
        </FormGroup>
        <FormGroup>
          <Label>Bilde</Label>
          <ImageUploadLabel htmlFor="player-image">
            📸 Klikk for å velge bilde
          </ImageUploadLabel>
          <ImageInput
            id="player-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {playerForm.imagePreview && (
            <ImagePreview>
              <img src={playerForm.imagePreview} alt="Preview" />
            </ImagePreview>
          )}
        </FormGroup>
        <Button onClick={handleAddPlayer} disabled={uploadingPlayer}>
          {uploadingPlayer ? 'Laster opp...' : 'Legg til Spiller'}
        </Button>

        <SectionTitle style={{ marginTop: '2rem' }}>Spillere ({players.length})</SectionTitle>
        <PlayerGrid>
          {players.map(player => (
            <PlayerCard key={player.id}>
              <div className="image">
                {player.image && (player.image.startsWith('data:') || player.image.startsWith('http')) ? (
                  <img src={player.image} alt={player.name} />
                ) : (
                  player.image
                )}
              </div>
              <div className="content">
                <div className="name">{player.name}</div>
                <div className="number">#{player.number}</div>
                <div className="position">{player.position}</div>
                <DeleteButton danger className="delete-btn" onClick={() => {
                  deletePlayer(player.id);
                  alert('Spiller slettet!');
                }}>Slett</DeleteButton>
              </div>
            </PlayerCard>
          ))}
        </PlayerGrid>
      </Section>
        )}

        {activeTab === 'motm' && (
      <Grid>
        <Section>
          <SectionTitle>Man of the Match</SectionTitle>
          <FormGroup>
            <Label>Velg Spiller</Label>
            <Select
              value={motmForm.player}
              onChange={(e) => {
                const selected = players.find(p => p.name === e.target.value);
                if (selected) {
                  setMotmForm({
                    ...motmForm,
                    player: selected.name,
                    position: selected.position,
                    number: selected.number,
                  });
                }
              }}
            >
              <option value="">-- Velg spiller --</option>
              {players.map(p => (
                <option key={p.id} value={p.name}>{p.name} (#{p.number})</option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Spiller Navn</Label>
            <Input
              type="text"
              name="player"
              value={motmForm.player}
              onChange={handleMotmChange}
              placeholder="F.eks. Magnus Andersen"
            />
          </FormGroup>
          <FormGroup>
            <Label>Posisjon</Label>
            <Input
              type="text"
              name="position"
              value={motmForm.position}
              onChange={handleMotmChange}
              placeholder="F.eks. Høyre Fløy"
            />
          </FormGroup>
          <FormGroup>
            <Label>Nummer</Label>
            <Input
              type="number"
              name="number"
              value={motmForm.number}
              onChange={handleMotmChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Mål</Label>
            <Input
              type="number"
              name="goals"
              value={motmForm.goals}
              onChange={handleMotmChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Reddninger</Label>
            <Input
              type="number"
              name="saves"
              value={motmForm.saves || 0}
              onChange={handleMotmChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Bilde</Label>
            <ImageUploadLabel htmlFor="motm-image">
              📸 Klikk for å velge bilde
            </ImageUploadLabel>
            <ImageInput
              id="motm-image"
              type="file"
              accept="image/*"
              onChange={handleMotmImageChange}
            />
            {motmImagePreview && (motmImagePreview.startsWith('data:') || motmImagePreview.startsWith('http')) && (
              <ImagePreview>
                <img src={motmImagePreview} alt="MOTM Preview" />
              </ImagePreview>
            )}
          </FormGroup>
          <Button onClick={handleMotmSave}>Lagre MOTM</Button>
        </Section>
      </Grid>
        )}

        {activeTab === 'matches' && (
      <Grid>
        <Section>
          <SectionTitle>{editingMatch ? 'Rediger Kamp' : 'Legg til Kamp'}</SectionTitle>
          <FormGroup>
            <Label>Dato</Label>
            <Input
              type="date"
              name="date"
              value={matchForm.date}
              onChange={handleMatchChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Tid</Label>
            <Input
              type="time"
              name="time"
              value={matchForm.time}
              onChange={handleMatchChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Motstander</Label>
            <Input
              type="text"
              name="opponent"
              value={matchForm.opponent}
              onChange={handleMatchChange}
              placeholder="F.eks. Kolbotn IL"
            />
          </FormGroup>
          <FormGroup>
            <Label>Logo (Emoji)</Label>
            <Input
              type="text"
              name="logo"
              value={matchForm.logo}
              onChange={handleMatchChange}
              maxLength="2"
            />
          </FormGroup>
          <FormGroup>
            <Label>Arena</Label>
            <Input
              type="text"
              name="location"
              value={matchForm.location}
              onChange={handleMatchChange}
              placeholder="F.eks. Asker Idrettshall"
            />
          </FormGroup>
          {editingMatch && <Button secondary onClick={handleCancelEdit}>Avbryt</Button>}
          <Button onClick={handleAddMatch}>{editingMatch ? 'Oppdater Kamp' : 'Legg til Kamp'}</Button>
        </Section>
      </Grid>
        )}

        {activeTab === 'matchList' && (
        <Section>
          <SectionTitle>Kamper ({matches.length})</SectionTitle>
          <List>
            {matches.map(match => (
              <ListItem key={match.id}>
                <div className="info">
                  {match.date} - {match.opponent} {match.time && `(${match.time})`}
                </div>
                <div className="actions">
                  <DeleteButton onClick={() => handleEditMatch(match)}>Rediger</DeleteButton>
                  <DeleteButton danger onClick={() => {
                    deleteMatch(match.id);
                    alert('Kamp slettet!');
                  }}>Slett</DeleteButton>
                </div>
              </ListItem>
            ))}
          </List>
        </Section>
        )}

        {activeTab === 'cases' && (
      <Grid>
        <Section>
          <SectionTitle>{editingCase ? 'Rediger Rettssak' : 'Legg til Rettssak'}</SectionTitle>
          <FormGroup>
            <Label>Spiller</Label>
            <Input
              type="text"
              name="player"
              value={caseForm.player}
              onChange={handleCaseChange}
              placeholder="F.eks. Magnus Andersen"
            />
          </FormGroup>
          <FormGroup>
            <Label>Årsak</Label>
            <Input
              type="text"
              name="reason"
              value={caseForm.reason}
              onChange={handleCaseChange}
              placeholder="F.eks. For sent til trening"
            />
          </FormGroup>
          <FormGroup>
            <Label>Bøtebeløp (kr)</Label>
            <Input
              type="number"
              name="fine"
              value={caseForm.fine}
              onChange={handleCaseChange}
              min="0"
            />
          </FormGroup>
          <FormGroup>
            <Label>Sannsynlighet for rettssak (%)</Label>
            <Input
              type="number"
              name="likelihood"
              value={Math.round(caseForm.likelihood * 100)}
              onChange={(e) => {
                const value = Math.max(0, Math.min(100, Number(e.target.value)));
                setCaseForm({ ...caseForm, likelihood: value / 100 });
              }}
              min="0"
              max="100"
            />
          </FormGroup>
          <FormGroup>
            <Label>Runde</Label>
            <Input
              type="text"
              name="round"
              value={caseForm.round}
              onChange={handleCaseChange}
              placeholder="F.eks. Runde 12"
            />
          </FormGroup>
          {editingCase && <Button secondary onClick={handleCancelEditCase}>Avbryt</Button>}
          <Button onClick={handleAddCase}>{editingCase ? 'Oppdater Rettssak' : 'Legg til Rettssak'}</Button>
        </Section>
      </Grid>
        )}

        {activeTab === 'caseList' && (
        <Section>
          <SectionTitle>Rettsaker ({cases.length})</SectionTitle>
          <List>
            {cases.map(caseItem => (
              <ListItem key={caseItem.id}>
                <div className="info">
                  {caseItem.player} - {caseItem.reason} ({Math.round(caseItem.likelihood * 100)}%)
                </div>
                <div className="actions">
                  <DeleteButton onClick={() => handleEditCase(caseItem)}>Rediger</DeleteButton>
                  <DeleteButton danger onClick={() => {
                    deleteCase(caseItem.id);
                    alert('Rettssak slettet!');
                  }}>Slett</DeleteButton>
                </div>
              </ListItem>
            ))}
          </List>
        </Section>
        )}
      </Container>
    </Wrapper>
  );
}

export default AdminPage;
