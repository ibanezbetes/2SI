import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../services/api';
import { theme } from '../theme/theme';
import { useAuth } from '../context/AuthContext';

const PanelAdminScreen = ({ navigation }) => {
  const { can } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, byCategory: {} });

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    try {
      setLoading(true);
      const itemsResponse = await api.get('/items');
      const data = itemsResponse.data.data;
      setItems(data);
      
      // Calculate mock stats
      const categories = {};
      data.forEach(item => {
        categories[item.category] = (categories[item.category] || 0) + 1;
      });
      
      setStats({
        total: data.length,
        byCategory: categories
      });
      
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudieron cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
      if (!can('ITEM_DEACTIVATE')) return;
      
      Alert.alert(
      'Confirmar desactivación',
      '¿Estás seguro de que quieres desactivar este ítem?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Desactivar', 
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`/items/${id}`);
              fetchData(); // Refresh list
            } catch (error) {
              Alert.alert('Error', 'No se pudo desactivar el ítem');
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <View style={styles.cellInfo}>
        <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.itemSubtitle}>{item.category} - {item.price}€</Text>
      </View>
      <View style={styles.actions}>
        {can('ITEM_EDIT') && (
            <TouchableOpacity 
                style={[styles.actionBtn, styles.editBtn]}
                onPress={() => navigation.navigate('EditItem', { itemId: item.id })}
            >
                <Text style={styles.btnText}>Editar</Text>
            </TouchableOpacity>
        )}
        {can('ITEM_DEACTIVATE') && (
            <TouchableOpacity 
                style={[styles.actionBtn, styles.deleteBtn]}
                onPress={() => handleDelete(item.id)}
            >
                <Text style={styles.btnText}>Baja</Text>
            </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color={theme.colors.primary} /></View>;
  }

  return (
    <View style={styles.container}>
      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Estadísticas</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total Ítems</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{Object.keys(stats.byCategory).length}</Text>
            <Text style={styles.statLabel}>Categorías</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions Header */}
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Gestión de Ítems</Text>
        {can('ITEM_CREATE') && (
            <TouchableOpacity 
                style={styles.createBtn}
                onPress={() => navigation.navigate('CreateItem')}
            >
                <Text style={styles.createBtnText}>+ Crear Nuevo</Text>
            </TouchableOpacity>
        )}
      </View>

      {/* List */}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.m,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    marginBottom: theme.spacing.l,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.medium,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing.s,
    color: theme.colors.text,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  createBtn: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  createBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.s,
    borderRadius: theme.borderRadius.small,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cellInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  itemSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
  },
  actionBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  editBtn: {
    backgroundColor: '#f39c12',
  },
  deleteBtn: {
    backgroundColor: '#e74c3c',
  },
  btnText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default PanelAdminScreen;
