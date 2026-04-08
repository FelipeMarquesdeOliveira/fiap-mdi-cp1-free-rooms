import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useApp } from '../../context/AppContext';
import SalaCard from '../../components/SalaCard';

export default function ReservationsScreen() {
  const router = useRouter();
  const { reservations, pastReservations, cancelReservation } = useApp();
  const [activeTab, setActiveTab] = useState('ativas'); 

  const dataToShow = activeTab === 'ativas' ? reservations : pastReservations;

  return (
    <View style={styles.container}>
      {/* Seletor de Abas - Sempre visível agora */}
      <View style={styles.tabSelector}>
        <TouchableOpacity 
          style={[styles.tabBtn, activeTab === 'ativas' && styles.tabBtnActive]}
          onPress={() => setActiveTab('ativas')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'ativas' && styles.tabBtnTextActive]}>Ativas</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabBtn, activeTab === 'historico' && styles.tabBtnActive]}
          onPress={() => setActiveTab('historico')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'historico' && styles.tabBtnTextActive]}>Histórico</Text>
        </TouchableOpacity>
      </View>

      {/* Texto auxiliar */}
      <Text style={styles.helperText}>
        {activeTab === 'ativas' ? 'Suas reservas atuais:' : 'Salas que você já utilizou:'}
      </Text>

      {/* Lista condicional apenas para o conteúdo da aba selecionada */}
      {dataToShow.length > 0 ? (
        <FlatList
          data={dataToShow}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemWrapper}>
              <SalaCard 
                sala={item} 
                onPress={() => router.push({ 
                  pathname: '/details/[id]', 
                  params: { id: item.id, fromHistory: activeTab === 'historico' ? 'true' : 'false' } 
                })}
              />
              <View style={[styles.reservationDetails, activeTab === 'historico' && styles.historyDetails]}>
                <View style={styles.dateTimeContainer}>
                  <Ionicons 
                    name={activeTab === 'ativas' ? "calendar-outline" : "checkmark-circle-outline"} 
                    size={16} 
                    color={activeTab === 'ativas' ? Colors.primary : Colors.status.livre} 
                  />
                  <Text style={styles.dateTimeText}>
                    {activeTab === 'ativas' ? `${item.dataReserva}` : `Utilizada em: ${item.dataReserva}`}
                  </Text>
                </View>
                
                {activeTab === 'ativas' && (
                  <TouchableOpacity 
                    style={styles.cancelBtn} 
                    onPress={() => cancelReservation(item.id)}
                  >
                    <Text style={styles.cancelBtnText}>Cancelar</Text>
                  </TouchableOpacity>
                )}
                
                {activeTab === 'historico' && (
                  <View style={styles.completedBadge}>
                    <Text style={styles.completedText}>CONCLUÍDO</Text>
                  </View>
                )}
              </View>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.iconCircle}>
            <Ionicons 
              name={activeTab === 'ativas' ? "calendar-outline" : "time-outline"} 
              size={60} 
              color={Colors.gray} 
            />
          </View>
          <Text style={styles.emptyTitle}>
            {activeTab === 'ativas' ? 'Sem reservas ativas' : 'Sem histórico ainda'}
          </Text>
          <Text style={styles.emptySubtitle}>
            {activeTab === 'ativas' 
              ? 'As salas que você reservar hoje aparecerão nesta aba.' 
              : 'Nenhum registro de uso passado encontrado.'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surface },
  tabSelector: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 8,
    margin: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabBtnActive: {
    backgroundColor: Colors.primary,
  },
  tabBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textSecondary,
  },
  tabBtnTextActive: {
    color: '#fff',
  },
  helperText: { paddingHorizontal: 20, paddingBottom: 5, fontSize: 13, color: Colors.textSecondary, fontWeight: '500' },
  listContent: { padding: 20, paddingTop: 10 },
  itemWrapper: { marginBottom: 10 },
  reservationDetails: {
    backgroundColor: '#fff',
    marginTop: -15,
    padding: 15,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginBottom: 20,
    elevation: 2,
  },
  historyDetails: {
    backgroundColor: '#f9f9f9',
  },
  dateTimeContainer: { flexDirection: 'row', alignItems: 'center', gap: 5, flex: 1 },
  dateTimeText: { fontSize: 13, color: Colors.text, fontWeight: '500' },
  cancelBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, borderWidth: 1, borderColor: Colors.gray },
  cancelBtnText: { fontSize: 12, color: Colors.textSecondary },
  completedBadge: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  completedText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.status.livre,
  },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40, marginTop: 40 },
  iconCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginBottom: 20, elevation: 3 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.text, marginBottom: 10 },
  emptySubtitle: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center' }
});
