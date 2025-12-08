import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, RefreshControl, Button, StatusBar } from 'react-native';
import api from '../services/api';
import ItemCard from '../components/ItemCard';
import { useFocusEffect } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { theme } from '../theme/theme';
import { useAuth } from '../context/AuthContext';

const HomeScreen = ({ navigation, route }) => {
  const { can, favorites, toggleFavorite, isFavorite } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  // favorites state removed, handled by context
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (route.params?.filters) {
      setFilters(route.params.filters);
    }
  }, [route.params?.filters]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const params = { ...filters };
      
      // Fetch items only, favorites are in context
      const response = await api.get('/items', { params });
      setItems(response.data.data);
      
      // Favorites handled by context locally
      
      setError(null);
      
      setError(null);
    } catch (err) {
      setError('Error al cargar los datos');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchItems();
    }, [filters])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchItems();
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchItems();
  };

  // toggleFavorite handled by context directly


  if (loading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Reintentar" onPress={fetchItems} color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      <View style={styles.header}>
        <Button title="Filtros" onPress={() => navigation.navigate('Filters')} color={theme.colors.secondary} />
        {can('ITEM_CREATE') && (
          <Button title="Publicar" onPress={() => navigation.navigate('CreateItem')} color={theme.colors.primary} />
        )}
        {can('FAVORITES_USE') && (
          <Button title="Favoritos" onPress={() => navigation.navigate('Favorites')} color={theme.colors.secondary} />
        )}
        {can('PROFILE_VIEW') && (
          <Button title="Perfil" onPress={() => navigation.navigate('Profile')} color={theme.colors.secondary} />
        )}
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard
            item={item}
            onPress={() => navigation.navigate('Detail', { itemId: item.id })}
            onFavoritePress={() => toggleFavorite(item)}
            isFavorite={isFavorite(item.id)}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>No hay publicaciones disponibles</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: theme.spacing.m,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: theme.spacing.m,
    fontSize: 16,
  },
  emptyText: {
    color: theme.colors.textSecondary,
    fontSize: 16,
  },
});

export default HomeScreen;
