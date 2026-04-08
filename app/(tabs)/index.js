import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default function RoomsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FIAP FreeRooms</Text>
      <Text style={styles.subtitle}>Encontre sua sala de estudo agora.</Text>
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Lista de salas em desenvolvimento...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: Colors.gray,
  }
});
