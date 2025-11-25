import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

const defaultMotm = {
  player: 'Magnus Andersen',
  position: 'Høyre Fløy',
  number: 7,
  round: 'Runde 12',
  goals: 11,
  assists: 3,
  accuracy: 92,
  image: '⭐',
};

const defaultMatches = [
  { id: 1, date: '28. Nov 2025', time: '19:00', opponent: 'Kolbotn IL', logo: '🏐', location: 'Asker Idrettshall', competition: 'NM Serien', tickets: 'Tilgjengelig' },
  { id: 2, date: '2. Des 2025', time: '18:30', opponent: 'Elverum HB', logo: '⚽', location: 'Elverum Arena', competition: 'NM Serien', tickets: 'Begrenset' },
  { id: 3, date: '5. Des 2025', time: '20:00', opponent: 'Drammen HB', logo: '🎯', location: 'Drammen Hallen', competition: 'NM Serien', tickets: 'Utsolgt' },
  { id: 4, date: '9. Des 2025', time: '19:00', opponent: 'Fredrikstad IL', logo: '🏆', location: 'Asker Idrettshall', competition: 'Cupkamp', tickets: 'Tilgjengelig' },
  { id: 5, date: '12. Des 2025', time: '18:00', opponent: 'Sandefjord HB', logo: '⭐', location: 'Sandefjord Idrettshall', competition: 'NM Serien', tickets: 'Tilgjengelig' },
  { id: 6, date: '16. Des 2025', time: '19:30', opponent: 'Moss HB', logo: '🎪', location: 'Asker Idrettshall', competition: 'NM Serien', tickets: 'Begrenset' },
];

const defaultCases = [
  { id: 1, player: 'Spiller A', reason: 'Uforsiktig feiring', fine: 12000, likelihood: 0.45, round: 'Runde 9' },
  { id: 2, player: 'Spiller B', reason: 'Sen takling', fine: 35000, likelihood: 0.72, round: 'Runde 10' },
  { id: 3, player: 'Spiller C', reason: 'Mouthing mot dommer', fine: 8000, likelihood: 0.25, round: 'Runde 7' },
  { id: 4, player: 'Spiller D', reason: 'Forsinkelse til kampstart', fine: 15000, likelihood: 0.31, round: 'Runde 6' },
  { id: 5, player: 'Spiller E', reason: 'Upassende feiring', fine: 28000, likelihood: 0.61, round: 'Runde 8' },
];

const defaultPlayers = [
  { id: 1, name: 'Magnus Andersen', number: 7, position: 'Høyre Fløy', image: '⭐' },
  { id: 2, name: 'Spiller A', number: 1, position: 'Keeper', image: '🥅' },
  { id: 3, name: 'Spiller B', number: 2, position: 'Venstre Fløy', image: '🏐' },
  { id: 4, name: 'Spiller C', number: 3, position: 'Sentral', image: '💪' },
  { id: 5, name: 'Spiller D', number: 4, position: 'Høyre Back', image: '🎯' },
];

export function DataProvider({ children }) {
  const [motm, setMotm] = useState(defaultMotm);
  const [matches, setMatches] = useState(defaultMatches);
  const [cases, setCases] = useState(defaultCases);
  const [players, setPlayers] = useState(defaultPlayers);

  useEffect(() => {
    const savedMotm = localStorage.getItem('motm');
    const savedMatches = localStorage.getItem('matches');
    const savedCases = localStorage.getItem('cases');
    const savedPlayers = localStorage.getItem('players');

    if (savedMotm) setMotm(JSON.parse(savedMotm));
    if (savedMatches) setMatches(JSON.parse(savedMatches));
    if (savedCases) setCases(JSON.parse(savedCases));
    if (savedPlayers) setPlayers(JSON.parse(savedPlayers));
  }, []);

  const updateMotm = (newMotm) => {
    setMotm(newMotm);
    localStorage.setItem('motm', JSON.stringify(newMotm));
  };

  const updateMatches = (newMatches) => {
    setMatches(newMatches);
    localStorage.setItem('matches', JSON.stringify(newMatches));
  };

  const addMatch = (match) => {
    const newMatch = { ...match, id: Math.max(...matches.map(m => m.id), 0) + 1 };
    const updated = [...matches, newMatch];
    updateMatches(updated);
  };

  const deleteMatch = (id) => {
    const updated = matches.filter(m => m.id !== id);
    updateMatches(updated);
  };

  const updateMatch = (id, updatedMatch) => {
    const updated = matches.map(m => m.id === id ? { ...m, ...updatedMatch } : m);
    updateMatches(updated);
  };

  const updateCases = (newCases) => {
    setCases(newCases);
    localStorage.setItem('cases', JSON.stringify(newCases));
  };

  const addCase = (caseItem) => {
    const newCase = { ...caseItem, id: Math.max(...cases.map(c => c.id), 0) + 1 };
    const updated = [...cases, newCase];
    updateCases(updated);
  };

  const deleteCase = (id) => {
    const updated = cases.filter(c => c.id !== id);
    updateCases(updated);
  };

  const updateCase = (id, updatedCase) => {
    const updated = cases.map(c => c.id === id ? { ...c, ...updatedCase } : c);
    updateCases(updated);
  };

  const updatePlayers = (newPlayers) => {
    setPlayers(newPlayers);
    localStorage.setItem('players', JSON.stringify(newPlayers));
  };

  const addPlayer = (player) => {
    const newPlayer = { ...player, id: Math.max(...players.map(p => p.id), 0) + 1 };
    const updated = [...players, newPlayer];
    updatePlayers(updated);
  };

  const deletePlayer = (id) => {
    const updated = players.filter(p => p.id !== id);
    updatePlayers(updated);
  };

  const updatePlayer = (id, updatedPlayer) => {
    const updated = players.map(p => p.id === id ? { ...p, ...updatedPlayer } : p);
    updatePlayers(updated);
  };

  return (
    <DataContext.Provider value={{
      motm, updateMotm,
      matches, updateMatches, addMatch, deleteMatch, updateMatch,
      cases, updateCases, addCase, deleteCase, updateCase,
      players, updatePlayers, addPlayer, deletePlayer, updatePlayer,
    }}>
      {children}
    </DataContext.Provider>
  );
}
