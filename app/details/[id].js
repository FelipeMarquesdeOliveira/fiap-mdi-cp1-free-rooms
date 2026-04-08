import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { ROOMS } from '../../data/rooms';
import StatusBadge from '../../components/StatusBadge';
import BotaoCustomizado from '../../components/BotaoCustomizado';
import { useApp } from '../../context/AppContext';

export default function RoomDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { favorites, toggleFavorite, addReservation } = useApp();
  
  const sala = ROOMS.find(r => r.id === id);
  const isFavorited = favorites.includes(id);

  const [dataSelecionada, setDataSelecionada] = useState('Amanhã, às 14:00');
  const horarios = ['Hoje, às 16:00', 'Hoje, às 19:00', 'Amanhã, às 10:00', 'Amanhã, às 14:00'];

  if (!sala) {
    return (
      <View style={styles.container}>
        <Text>Sala não encontrada.</Text>
      </View>
    );
  }

  const handleReserve = () => {
    addReservation(sala, dataSelecionada);
    Alert.alert(
      "Reserva Confirmada! 🎉",
      `Sua reserva para a ${sala.nome} no dia ${dataSelecionada} foi realizada com sucesso.`,
      [{ text: "Ver Minhas Reservas", onPress: () => router.push('/history') }, { text: "OK" }]
    );
  };

  const handleReportProblem = () => {
    Alert.alert("Reportar Problema", `Você deseja reportar um problema na ${sala.nome}?`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Confirmar", onPress: () => Alert.alert("Sucesso", "Problema reportado!") }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.nome}>{sala.nome}</Text>
          <StatusBadge status={sala.status} />
        </View>
        <Text style={styles.location}>Bloco {sala.bloco} - {sala.andar}º Andar</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Escolha o Horário</Text>
        <View style={styles.horariosGrid}>
          {horarios.map(h => (
            <TouchableOpacity 
              key={h} 
              style={[styles.horarioChip, dataSelecionada === h && styles.horarioChipActive]}
              onPress={() => setDataSelecionada(h)}
            >
              <Text style={[styles.horarioText, dataSelecionada === h && styles.horarioTextActive]}>{h}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Comodidades</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Ionicons name="people" size={24} color={Colors.primary} />
            <Text style={styles.infoLabel}>Capacidade: {sala.capacidade}</Text>
          </View>
          <View style={styles.infoCard}>
            <Ionicons name="snow" size={24} color={sala.possuiArCondicionado ? Colors.primary : Colors.gray} />
            <Text style={styles.infoLabel}>Ar Condicionado</Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <BotaoCustomizado 
          title="RESERVAR ESTA SALA" 
          onPress={handleReserve}
        />
        <View style={styles.secondaryActions}>
          <TouchableOpacity onPress={() => toggleFavorite(sala.id)} style={styles.iconBtn}>
            <Ionicons name={isFavorited ? "heart" : "heart-outline"} size={24} color={Colors.primary} />
            <Text style={styles.iconBtnText}>{isFavorited ? "Favoritado" : "Favoritar"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleReportProblem} style={styles.iconBtn}>
            <Ionicons name="warning-outline" size={24} color={Colors.gray} />
            <Text style={styles.iconBtnText}>Reportar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surface },
  header: { padding: 24, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  nome: { fontSize: 28, fontWeight: 'bold', color: Colors.text },
  location: { fontSize: 16, color: Colors.textSecondary },
  section: { padding: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.text, marginBottom: 12 },
  horariosGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  horarioChip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, backgroundColor: '#f0f0f0', borderWidth: 1, borderColor: '#ddd' },
  horarioChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  horarioText: { fontSize: 13, color: Colors.text },
  horarioTextActive: { color: '#fff', fontWeight: 'bold' },
  infoGrid: { flexDirection: 'row', gap: 12 },
  infoCard: { flex: 1, backgroundColor: '#fff', padding: 15, borderRadius: 12, alignItems: 'center', elevation: 2 },
  infoLabel: { fontSize: 12, color: Colors.textSecondary, marginTop: 5 },
  actions: { padding: 20, gap: 15 },
  secondaryActions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  iconBtn: { alignItems: 'center', gap: 5 },
  iconBtnText: { fontSize: 12, color: Colors.textSecondary }
});
