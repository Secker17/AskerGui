import React, { createContext, useState, useEffect } from 'react';
import { ref, onValue, set, remove, push } from 'firebase/database';
import { database } from '../firebase';

export const DataContext = createContext();

const defaultMotm = {
  player: 'Magnus Andersen',
  position: 'Høyre Fløy',
  number: 7,
  goals: 11,
  saves: 8,
  image: '⭐',
};

const defaultMatches = [
  { id: 1, date: '2025-11-28', time: '19:00', opponent: 'Kolbotn IL', logo: '🦁', location: 'Asker Idrettshall' },
  { id: 2, date: '2025-12-02', time: '18:30', opponent: 'Elverum HB', logo: '🦁', location: 'Elverum Arena' },
  { id: 3, date: '2025-12-05', time: '20:00', opponent: 'Drammen HB', logo: '🦁', location: 'Drammen Hallen' },
  { id: 4, date: '2025-12-09', time: '19:00', opponent: 'Fredrikstad IL', logo: '🦁', location: 'Asker Idrettshall' },
  { id: 5, date: '2025-12-12', time: '18:00', opponent: 'Sandefjord HB', logo: '🦁', location: 'Sandefjord Idrettshall' },
  { id: 6, date: '2025-12-16', time: '19:30', opponent: 'Moss HB', logo: '🦁', location: 'Asker Idrettshall' },
];

const defaultCases = [
  { id: 1, player: 'Spiller A', reason: 'Uforsiktig feiring', fine: 12000, likelihood: 0.45, round: 'Runde 9' },
  { id: 2, player: 'Spiller B', reason: 'Sen takling', fine: 35000, likelihood: 0.72, round: 'Runde 10' },
  { id: 3, player: 'Spiller C', reason: 'Mouthing mot dommer', fine: 8000, likelihood: 0.25, round: 'Runde 7' },
  { id: 4, player: 'Spiller D', reason: 'Forsinkelse til kampstart', fine: 15000, likelihood: 0.31, round: 'Runde 6' },
  { id: 5, player: 'Spiller E', reason: 'Upassende feiring', fine: 28000, likelihood: 0.61, round: 'Runde 8' },
];

const defaultPlayers = [
  { id: 1, name: 'Magnus Andersen', number: 7, position: 'Høyre Fløy', image: '🦁' },
  { id: 2, name: 'Spiller A', number: 1, position: 'Keeper', image: '🦁' },
  { id: 3, name: 'Spiller B', number: 2, position: 'Venstre Fløy', image: '🦁' },
  { id: 4, name: 'Spiller C', number: 3, position: 'Sentral', image: '🦁' },
  { id: 5, name: 'Spiller D', number: 4, position: 'Høyre Back', image: '🦁' },
];

export function DataProvider({ children }) {
  const [motm, setMotm] = useState(defaultMotm);
  const [matches, setMatches] = useState(defaultMatches);
  const [cases, setCases] = useState(defaultCases);
  const [players, setPlayers] = useState(defaultPlayers);

  // Firebase listeners
  useEffect(() => {
    // Listen to MOTM
    const motmRef = ref(database, 'motm');
    const unsubscribeMotm = onValue(motmRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMotm(data);
      } else {
        // Initialize with default if no data exists
        set(motmRef, defaultMotm);
      }
    });

    // Listen to Matches
    const matchesRef = ref(database, 'matches');
    const unsubscribeMatches = onValue(matchesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const matchesArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setMatches(matchesArray);
      } else {
        // Initialize with defaults if no data exists
        defaultMatches.forEach(match => {
          const newMatchRef = push(matchesRef);
          set(newMatchRef, match);
        });
      }
    });

    // Listen to Cases
    const casesRef = ref(database, 'cases');
    const unsubscribeCases = onValue(casesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const casesArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setCases(casesArray);
      } else {
        // Initialize with defaults if no data exists
        defaultCases.forEach(caseItem => {
          const newCaseRef = push(casesRef);
          set(newCaseRef, caseItem);
        });
      }
    });

    // Listen to Players
    const playersRef = ref(database, 'players');
    const unsubscribePlayers = onValue(playersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const playersArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setPlayers(playersArray);
      } else {
        // Initialize with defaults if no data exists
        defaultPlayers.forEach(player => {
          const newPlayerRef = push(playersRef);
          set(newPlayerRef, player);
        });
      }
    });

    // Cleanup listeners
    return () => {
      unsubscribeMotm();
      unsubscribeMatches();
      unsubscribeCases();
      unsubscribePlayers();
    };
  }, []);

  const updateMotm = (newMotm) => {
    setMotm(newMotm);
    set(ref(database, 'motm'), newMotm);
  };

  const addMatch = (match) => {
    const newMatchRef = push(ref(database, 'matches'));
    set(newMatchRef, match);
  };

  const deleteMatch = (id) => {
    console.log('Deleting match with ID:', id);
    remove(ref(database, `matches/${id}`));
  };

  const updateMatch = (id, updatedMatch) => {
    set(ref(database, `matches/${id}`), updatedMatch);
  };

  const addCase = (caseItem) => {
    const newCaseRef = push(ref(database, 'cases'));
    set(newCaseRef, caseItem);
  };

  const deleteCase = (id) => {
    console.log('Deleting case with ID:', id);
    remove(ref(database, `cases/${id}`));
  };

  const updateCase = (id, updatedCase) => {
    set(ref(database, `cases/${id}`), updatedCase);
  };

  const addPlayer = (player) => {
    const newPlayerRef = push(ref(database, 'players'));
    set(newPlayerRef, player);
  };

  const deletePlayer = (id) => {
    console.log('Deleting player with ID:', id);
    remove(ref(database, `players/${id}`));
  };

  const updatePlayer = (id, updatedPlayer) => {
    set(ref(database, `players/${id}`), updatedPlayer);
  };

  return (
    <DataContext.Provider value={{
      motm, updateMotm,
      matches, addMatch, deleteMatch, updateMatch,
      cases, addCase, deleteCase, updateCase,
      players, addPlayer, deletePlayer, updatePlayer,
    }}>
      {children}
    </DataContext.Provider>
  );
}
