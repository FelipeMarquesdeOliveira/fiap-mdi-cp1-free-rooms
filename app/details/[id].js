import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { ROOMS } from '../../data/rooms';
import StatusBadge from '../../components/StatusBadge';
import BotaoCustomizado from '../../components/BotaoCustomizado';
import { useApp } from '../../context/AppContext';

export default function RoomDetailsScreen() {
  const { id, fromHistory } = useLocalSearchParams();
  const router = useRouter();
  const { favorites, toggleFavorite, addReservation, pastReservations } = useApp();
  
  const [isViewingHistory, setIsViewingHistory] = useState(fromHistory === 'true');
  const pastData = pastReservations.find(p => p.id === id);

  const sala = ROOMS.find(r => r.id === id);
  const isFavorited = favorites.includes(id);

  const [dataSelecionada, setDataSelecionada] = useState('Amanhã, às 14:00');
  const [modalReportVisible, setModalReportVisible] = useState(false);
  const [modalFeedback, setModalFeedback] = useState({ visible: false, type: 'success', message: '' });
  
  const [reportTitle, setReportTitle] = useState('');
  const [reportDesc, setReportDesc] = useState('');

  // Descrições Tech de exemplo para o histórico
  const techActivities = {
    "101": "Hackathon Interno: Desenvolvimento de MVP em React Native",
    "202": "Workshop de Cyber Security e Testes de Penetração",
    "301": "Laboratório de Data Science: Modelagem de Dados com Python",
    "601": "Aula Prática de IoT: Configuração de Sensores Arduino",
    "default": "Estudo de Arquitetura de Software e Design Patterns"
  };

  const currentTechActivity = techActivities[id] || techActivities.default;

  const horarios = ['Hoje, às 16:00', 'Hoje, às 19:00', 'Amanhã, às 10:00', 'Amanhã, às 14:00'];

  if (!sala) return <View style={styles.container}><Text>Sala não encontrada.</Text></View>;

  const handleReserve = () => {
    if (sala.status !== 'livre' && !isViewingHistory) {
      setModalFeedback({
        visible: true,
        type: 'error',
        message: `Falha na Reserva! A sala já está ${sala.status === 'ocupada' ? 'ocupada' : 'em manutenção'}.`
      });
      return;
    }

    addReservation(sala, dataSelecionada);
    setModalFeedback({
      visible: true,
      type: 'success',
      message: 'Sala reservada com sucesso para o horário selecionado!'
    });
  };

  const enviarReporte = () => {
    if (!reportTitle.trim() || !reportDesc.trim()) return;
    setModalReportVisible(false);
    setReportTitle(''); setReportDesc('');
    setModalFeedback({ visible: true, type: 'success', message: 'Reporte enviado com sucesso!' });
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.nome}>{sala.nome}</Text>
            <StatusBadge status={sala.status} />
          </View>
          <Text style={styles.location}>Bloco {sala.bloco} - {sala.andar}º Andar</Text>
        </View>

        {/* --- SEÇÃO DE HISTÓRICO --- */}
        {isViewingHistory && (
          <View style={styles.historySection}>
            <View style={styles.historyHeader}>
              <Ionicons name="code-working" size={20} color={Colors.primary} />
              <Text style={styles.historyTitle}>REGISTRO DE ATIVIDADE TECH</Text>
            </View>
            <View style={styles.historyBox}>
              <View style={styles.historyRow}>
                <Text style={styles.historyLabel}>Atividade:</Text>
                <Text style={styles.historyValueFull}>{currentTechActivity}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.historyRow}>
                <Text style={styles.historyLabel}>Alunos no Grupo:</Text>
                <Text style={styles.historyValue}>Gabriel, Felipe, Ricardo</Text>
              </View>
              <View style={styles.historyRow}>
                <Text style={styles.historyLabel}>Total de Utilização:</Text>
                <Text style={styles.historyValue}>5 Alunos</Text>
              </View>
              <View style={styles.historyRow}>
                <Text style={styles.historyLabel}>Data de Uso:</Text>
                <Text style={styles.historyValue}>{pastData?.dataReserva || 'N/A'}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.btnRetry} onPress={() => setIsViewingHistory(false)}>
              <Text style={styles.btnRetryText}>RESERVAR PARA NOVA ATIVIDADE</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* --- SEÇÃO DE RESERVA (Normal ou ao clicar em Reservar Novamente) --- */}
        {!isViewingHistory && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Escolher um dos Horários Disponíveis</Text>
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
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{isViewingHistory ? 'Detalhes Adicionais' : '2. Comodidades'}</Text>
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

        {!isViewingHistory && (
          <View style={styles.actions}>
            <BotaoCustomizado title="RESERVAR ESTA SALA" onPress={handleReserve} />
            <View style={styles.secondaryActions}>
              <TouchableOpacity onPress={() => toggleFavorite(sala.id)} style={styles.iconBtn}>
                <Ionicons name={isFavorited ? "heart" : "heart-outline"} size={24} color={Colors.primary} />
                <Text style={styles.iconBtnText}>{isFavorited ? "Favoritado" : "Favoritar"}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalReportVisible(true)} style={styles.iconBtn}>
                <Ionicons name="warning-outline" size={24} color={Colors.gray} />
                <Text style={styles.iconBtnText}>Reportar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Modais de Reporte e Feedback mantidos... */}
      <Modal animationType="slide" transparent={true} visible={modalReportVisible}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { height: 'auto', paddingBottom: 40 }]}>
            <Text style={styles.modalTitle}>Reportar Problema</Text>
            <TextInput style={styles.input} placeholder="O que houve? (Ex: Luz queimada)" value={reportTitle} onChangeText={setReportTitle} />
            <TextInput style={[styles.input, { height: 80 }]} placeholder="Descrição..." multiline value={reportDesc} onChangeText={setReportDesc} />
            <BotaoCustomizado title="ENVIAR REPORTE" onPress={enviarReporte} />
            <TouchableOpacity onPress={() => setModalReportVisible(false)} style={{ marginTop: 15, alignItems: 'center' }}>
              <Text style={{ color: Colors.gray }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal animationType="fade" transparent={true} visible={modalFeedback.visible}>
        <View style={styles.modalOverlay}>
          <View style={styles.feedbackBox}>
            <Ionicons 
              name={modalFeedback.type === 'success' ? "checkmark-circle" : "close-circle"} 
              size={80} 
              color={modalFeedback.type === 'success' ? Colors.status.livre : Colors.primary} 
            />
            <Text style={styles.feedbackTitle}>{modalFeedback.type === 'success' ? 'Sucesso!' : 'Ops!'}</Text>
            <Text style={styles.feedbackMsg}>{modalFeedback.message}</Text>
            <TouchableOpacity 
              style={[styles.btnFinal, { backgroundColor: modalFeedback.type === 'success' ? Colors.status.livre : Colors.primary }]}
              onPress={() => {
                setModalFeedback({ ...modalFeedback, visible: false });
                if (modalFeedback.type === 'success') router.push('/history');
              }}
            >
              <Text style={styles.btnFinalText}>{modalFeedback.type === 'success' ? 'Ver Reservas' : 'Tentar Novamente'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  container: { flex: 1, backgroundColor: Colors.surface },
  header: { padding: 24, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  nome: { fontSize: 28, fontWeight: 'bold', color: Colors.text },
  location: { fontSize: 16, color: Colors.textSecondary },
  historySection: { padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  historyHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 15 },
  historyTitle: { fontSize: 14, fontWeight: 'bold', color: Colors.primary },
  historyBox: { backgroundColor: '#f9f9f9', padding: 18, borderRadius: 12, borderWidth: 1, borderColor: '#eee' },
  historyRow: { flexDirection: 'column', marginBottom: 12 },
  historyLabel: { fontSize: 12, color: Colors.textSecondary, marginBottom: 4, textTransform: 'uppercase' },
  historyValue: { fontSize: 14, fontWeight: 'bold', color: Colors.text },
  historyValueFull: { fontSize: 15, fontWeight: 'bold', color: Colors.primary, lineHeight: 20 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 10 },
  btnRetry: { backgroundColor: Colors.primary, marginTop: 15, padding: 15, borderRadius: 10, alignItems: 'center' },
  btnRetryText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  section: { padding: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.text, marginBottom: 12 },
  horariosGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  horarioChip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, backgroundColor: '#f0f0f0' },
  horarioChipActive: { backgroundColor: Colors.primary },
  horarioText: { fontSize: 13, color: Colors.text },
  horarioTextActive: { color: '#fff', fontWeight: 'bold' },
  infoGrid: { flexDirection: 'row', gap: 12 },
  infoCard: { flex: 1, backgroundColor: '#fff', padding: 15, borderRadius: 12, alignItems: 'center', elevation: 2 },
  infoLabel: { fontSize: 12, color: Colors.textSecondary, marginTop: 5 },
  actions: { padding: 20, gap: 15 },
  secondaryActions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  iconBtn: { alignItems: 'center', gap: 5 },
  iconBtnText: { fontSize: 12, color: Colors.textSecondary },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', width: '90%', borderRadius: 20, padding: 25 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#f5f5f5', borderRadius: 10, padding: 12, marginBottom: 15, borderWidth: 1, borderColor: '#eee' },
  feedbackBox: { backgroundColor: '#fff', width: '85%', borderRadius: 25, padding: 30, alignItems: 'center', elevation: 10 },
  feedbackTitle: { fontSize: 24, fontWeight: 'bold', marginTop: 15, color: Colors.text },
  feedbackMsg: { fontSize: 16, color: Colors.textSecondary, textAlign: 'center', marginVertical: 15 },
  btnFinal: { paddingHorizontal: 30, paddingVertical: 15, borderRadius: 12, width: '100%', alignItems: 'center' },
  btnFinalText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
