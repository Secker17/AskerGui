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

const defaultMatches = [];

const defaultCases = [];

const defaultPlayers = [];

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

  const updateMotm = async (newMotm) => {
    try {
      setMotm(newMotm);
      await set(ref(database, 'motm'), newMotm);
      return true;
    } catch (error) {
      console.error('Error updating MOTM:', error);
      throw error;
    }
  };

  const addMatch = async (match) => {
    try {
      const newMatchRef = push(ref(database, 'matches'));
      await set(newMatchRef, match);
      return true;
    } catch (error) {
      console.error('Error adding match:', error);
      throw error;
    }
  };

  const deleteMatch = async (id) => {
    try {
      await remove(ref(database, `matches/${id}`));
      return true;
    } catch (error) {
      console.error('Error deleting match:', error);
      throw error;
    }
  };

  const updateMatch = async (id, updatedMatch) => {
    try {
      await set(ref(database, `matches/${id}`), updatedMatch);
      return true;
    } catch (error) {
      console.error('Error updating match:', error);
      throw error;
    }
  };

  const addCase = async (caseItem) => {
    try {
      const newCaseRef = push(ref(database, 'cases'));
      await set(newCaseRef, caseItem);
      return true;
    } catch (error) {
      console.error('Error adding case:', error);
      throw error;
    }
  };

  const deleteCase = async (id) => {
    try {
      await remove(ref(database, `cases/${id}`));
      return true;
    } catch (error) {
      console.error('Error deleting case:', error);
      throw error;
    }
  };

  const updateCase = async (id, updatedCase) => {
    try {
      await set(ref(database, `cases/${id}`), updatedCase);
      return true;
    } catch (error) {
      console.error('Error updating case:', error);
      throw error;
    }
  };

  const addPlayer = async (player) => {
    try {
      const newPlayerRef = push(ref(database, 'players'));
      await set(newPlayerRef, player);
      return true;
    } catch (error) {
      console.error('Error adding player:', error);
      throw error;
    }
  };

  const deletePlayer = async (id) => {
    try {
      await remove(ref(database, `players/${id}`));
      return true;
    } catch (error) {
      console.error('Error deleting player:', error);
      throw error;
    }
  };

  const updatePlayer = async (id, updatedPlayer) => {
    try {
      await set(ref(database, `players/${id}`), updatedPlayer);
      return true;
    } catch (error) {
      console.error('Error updating player:', error);
      throw error;
    }
  };

  const clearAllData = async () => {
    try {
      await remove(ref(database, 'matches'));
      await remove(ref(database, 'cases'));
      await remove(ref(database, 'players'));
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  };

  return (
    <DataContext.Provider value={{
      motm, updateMotm,
      matches, addMatch, deleteMatch, updateMatch,
      cases, addCase, deleteCase, updateCase,
      players, addPlayer, deletePlayer, updatePlayer,
      clearAllData,
    }}>
      {children}
    </DataContext.Provider>
  );
}
