import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useApp } from '../../context/AppContext';
import SalaCard from '../../components/SalaCard';

export default function ReservationsScreen() {
  const router = useRouter();
  const { reservations, cancelReservation } = useApp();

  return (
    <View style={styles.container}>
      {reservations.length > 0 ? (
        <View style={{ flex: 1 }}>
          <Text style={styles.helperText}>Você tem {reservations.length} reserva(s) ativa(s):</Text>
          <FlatList
            data={reservations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemWrapper}>
                <SalaCard 
                  sala={item} 
                  onPress={() => router.push({ pathname: '/details/[id]', params: { id: item.id } })}
                />
                <View style={styles.reservationDetails}>
                  <View style={styles.dateTimeContainer}>
                    <Ionicons name="calendar-outline" size={16} color={Colors.primary} />
                    <Text style={styles.dateTimeText}>Agendado para: {item.dataReserva}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.cancelBtn} 
                    onPress={() => cancelReservation(item.id)}
                  >
                    <Text style={styles.cancelBtnText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            contentContainerStyle={styles.listContent}
          />
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="calendar-outline" size={60} color={Colors.primary} />
          </View>
          <Text style={styles.emptyTitle}>Nenhuma reserva</Text>
          <Text style={styles.emptySubtitle}>
            Escolha uma sala e selecione um horário para vê-la aqui.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surface },
  helperText: { padding: 20, paddingBottom: 0, fontSize: 14, color: Colors.textSecondary, fontWeight: 'bold' },
  listContent: { padding: 20 },
  itemWrapper: { marginBottom: 10 },
  reservationDetails: {
    backgroundColor: '#fff',
    marginTop: -15, // Encaixa no card de cima
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
  dateTimeContainer: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  dateTimeText: { fontSize: 13, color: Colors.text, fontWeight: '500' },
  cancelBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, borderWidth: 1, borderColor: Colors.gray },
  cancelBtnText: { fontSize: 12, color: Colors.textSecondary },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  iconCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginBottom: 20, elevation: 3 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.text, marginBottom: 10 },
  emptySubtitle: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center' }
});
