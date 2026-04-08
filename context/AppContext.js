import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [reservations, setReservations] = useState([]);
  
  // Corrigido: Usando IDs REAIS que existem em data/rooms.js para o clique funcionar!
  const [pastReservations, setPastReservations] = useState([
    { id: "101", nome: "Sala 101", bloco: "Único", andar: 1, status: "livre", dataReserva: "Ontem, às 10:00" },
    { id: "202", nome: "Sala 202", bloco: "Único", andar: 2, status: "manutencao", dataReserva: "Terça, às 14:00" },
    { id: "301", nome: "Sala 301", bloco: "Único", andar: 3, status: "livre", dataReserva: "Segunda, às 08:30" },
    { id: "601", nome: "Sala 601", bloco: "Único", andar: 6, status: "ocupada", dataReserva: "Segunda, às 11:00" },
  ]);

  const toggleFavorite = (salaId) => {
    setFavorites(prev => {
      if (prev.includes(salaId)) {
        return prev.filter(id => id !== salaId);
      } else {
        return [...prev, salaId];
      }
    });
  };

  const addReservation = (sala, data) => {
    setReservations(prev => {
      const filtered = prev.filter(item => item.id !== sala.id);
      return [{ ...sala, dataReserva: data }, ...filtered];
    });
  };

  const cancelReservation = (salaId) => {
    setReservations(prev => prev.filter(item => item.id !== salaId));
  };

  return (
    <AppContext.Provider value={{ 
      favorites, 
      toggleFavorite, 
      reservations, 
      pastReservations,
      addReservation, 
      cancelReservation 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
