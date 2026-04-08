import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [reservations, setReservations] = useState([]); // Agora temos reservas em vez de histórico

  const toggleFavorite = (salaId) => {
    setFavorites(prev => {
      if (prev.includes(salaId)) {
        return prev.filter(id => id !== salaId);
      } else {
        return [...prev, salaId];
      }
    });
  };

  // Função para adicionar reserva
  const addReservation = (sala, data) => {
    setReservations(prev => {
      // Remove reserva antiga da mesma sala se existir e adiciona a nova
      const filtered = prev.filter(item => item.id !== sala.id);
      return [{ ...sala, dataReserva: data }, ...filtered];
    });
  };

  // Função para cancelar reserva
  const cancelReservation = (salaId) => {
    setReservations(prev => prev.filter(item => item.id !== salaId));
  };

  return (
    <AppContext.Provider value={{ 
      favorites, 
      toggleFavorite, 
      reservations, 
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
