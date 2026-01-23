import React, { createContext, useState, useEffect } from 'react';
import { ref, onValue, set, remove, push } from 'firebase/database';
import { database } from '../firebase';

export const DataContext = createContext();

// --- DEFAULT DATA ---
const defaultMotm = {
  player: 'Magnus Andersen',
  position: 'Høyre Fløy',
  number: 7,
  goals: 11,
  saves: 8,
  image: '⭐',
};

// Ny default for toppscorer
const defaultTopScorer = {
  name: '',
  goals: 0
};

const defaultMatches = [];
const defaultCases = [];
const defaultPlayers = [];
const defaultCalendar = [];
const defaultLeagueTable = [];

const defaultMatchData = {
  homeTeam: 'Asker',
  awayTeam: 'HSIL',
  homeLogo: '/images/standard_832px-Asker_SK_logo.svg.png',
  awayLogo: '/images/HSIL logo desktop.png',
  liveLink: '',
  isFinished: false,
  score: { home: 0, away: 0 }
};

export function DataProvider({ children }) {
  const [motm, setMotm] = useState(defaultMotm);
  const [topScorer, setTopScorer] = useState(defaultTopScorer); // <--- NY STATE
  const [matches, setMatches] = useState(defaultMatches);
  const [cases, setCases] = useState(defaultCases);
  const [players, setPlayers] = useState(defaultPlayers);
  const [matchData, setMatchData] = useState(defaultMatchData);
  const [calendarData, setCalendarData] = useState(defaultCalendar);
  const [leagueTable, setLeagueTable] = useState(defaultLeagueTable);

  // --- FIREBASE LISTENERS ---
  useEffect(() => {
    // Listen to MOTM
    const motmRef = ref(database, 'motm');
    const unsubscribeMotm = onValue(motmRef, (snapshot) => {
      const data = snapshot.val();
      setMotm(data || defaultMotm);
    });

    // Listen to TOP SCORER (NY)
    const topScorerRef = ref(database, 'topScorer');
    const unsubscribeTopScorer = onValue(topScorerRef, (snapshot) => {
      const data = snapshot.val();
      setTopScorer(data || defaultTopScorer);
    });

    // Listen to Matches
    const matchesRef = ref(database, 'matches');
    const unsubscribeMatches = onValue(matchesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const matchesArray = Object.keys(data).map(key => ({ ...data[key], id: key }));
        setMatches(matchesArray);
      } else {
        setMatches([]);
      }
    });

    // Listen to Cases
    const casesRef = ref(database, 'cases');
    const unsubscribeCases = onValue(casesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const casesArray = Object.keys(data).map(key => ({ ...data[key], id: key }));
        setCases(casesArray);
      } else {
        setCases([]);
      }
    });

    // Listen to Players
    const playersRef = ref(database, 'players');
    const unsubscribePlayers = onValue(playersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const playersArray = Object.keys(data).map(key => ({ ...data[key], id: key }));
        setPlayers(playersArray);
      } else {
        setPlayers([]);
      }
    });

    // Listen to MatchData
    const matchDataRef = ref(database, 'matchData');
    const unsubscribeMatchData = onValue(matchDataRef, (snapshot) => {
      const data = snapshot.val();
      setMatchData(data || defaultMatchData);
    });

    // Listen to Calendar
    const calendarRef = ref(database, 'calendar');
    const unsubscribeCalendar = onValue(calendarRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const calendarArray = Object.values(data); 
        setCalendarData(calendarArray);
      } else {
        setCalendarData([]);
      }
    });

    // Listen to Table
    const tableRef = ref(database, 'table');
    const unsubscribeTable = onValue(tableRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const tableArray = Object.keys(data).map(key => ({ ...data[key], id: key }));
        setLeagueTable(tableArray);
      } else {
        setLeagueTable([]);
      }
    });

    // Cleanup listeners
    return () => {
      unsubscribeMotm();
      unsubscribeTopScorer(); // <--- Cleanup
      unsubscribeMatches();
      unsubscribeCases();
      unsubscribePlayers();
      unsubscribeMatchData();
      unsubscribeCalendar();
      unsubscribeTable();
    };
  }, []);

  // --- FUNCTIONS ---

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

  // NY FUNKSJON: TOPPSCORER
  const updateTopScorer = async (newData) => {
    try {
      setTopScorer(newData);
      await set(ref(database, 'topScorer'), newData);
      return true;
    } catch (error) {
      console.error('Error updating Top Scorer:', error);
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

  const updateMatchData = async (newMatchData) => {
    try {
      setMatchData(newMatchData);
      await set(ref(database, 'matchData'), newMatchData);
      return true;
    } catch (error) {
      console.error('Error updating match data:', error);
      throw error;
    }
  };

  const addToCalendar = async (doorData) => {
    try {
      await set(ref(database, `calendar/${doorData.day}`), doorData);
      return true;
    } catch (error) {
      console.error('Error adding to calendar:', error);
      throw error;
    }
  };

  const deleteFromCalendar = async (day) => {
    try {
      await remove(ref(database, `calendar/${day}`));
      return true;
    } catch (error) {
      console.error('Error deleting from calendar:', error);
      throw error;
    }
  };

  // --- TABELL FUNKSJONER ---
  
  const addTableRow = async (row) => {
    try {
      const newRowRef = push(ref(database, 'table'));
      await set(newRowRef, row);
      return true;
    } catch (error) {
      console.error('Error adding table row:', error);
      throw error;
    }
  };

  const deleteTableRow = async (id) => {
    try {
      await remove(ref(database, `table/${id}`));
      return true;
    } catch (error) {
      console.error('Error deleting table row:', error);
      throw error;
    }
  };

  const updateTableRow = async (id, updatedRow) => {
    try {
      await set(ref(database, `table/${id}`), updatedRow);
      return true;
    } catch (error) {
      console.error('Error updating table row:', error);
      throw error;
    }
  };

  const clearAllData = async () => {
    try {
      await remove(ref(database, 'matches'));
      await remove(ref(database, 'cases'));
      await remove(ref(database, 'players'));
      await remove(ref(database, 'calendar'));
      await remove(ref(database, 'table'));
      await remove(ref(database, 'motm'));
      await remove(ref(database, 'topScorer')); // <--- Sletter også toppscorer ved reset
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  };

  return (
    <DataContext.Provider value={{
      motm, updateMotm,
      topScorer, updateTopScorer, // <--- EKSPORTERER TOPPSCORER HER
      matches, addMatch, deleteMatch, updateMatch,
      cases, addCase, deleteCase, updateCase,
      players, addPlayer, deletePlayer, updatePlayer,
      matchData, updateMatchData,
      calendarData, addToCalendar, deleteFromCalendar,
      leagueTable, addTableRow, deleteTableRow, updateTableRow, 
      clearAllData
    }}>
      {children}
    </DataContext.Provider>
  );
}