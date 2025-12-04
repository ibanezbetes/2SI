import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../services/api';
import ItemCard from '../components/ItemCard';
import { theme } from '../theme/theme';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await api.get('/favorites');
      setFavorites(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar favoritos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [])
  );

  const removeFavorite = async (itemId) => {
    try {
      // TODO: Get real userId. Using demo user.
      const demoUserId = 'demo-user-id';
      await api.delete(`/favorites/${itemId}`); // Ensure backend supports this or adjust endpoint
      fetchFavorites();
    } catch (error) {
      console.error('Error removing favorite', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard
            item={item.item} // Structure might be { id, item: { ... } } depending on backend relation
            onPress={() => navigation.navigate('Detail', { itemId: item.item.id })}
            onFavoritePress={() => removeFavorite(item.item.id)}
            isFavorite={true}
          />
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>No tienes favoritos guardados</Text>
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
    padding: theme.spacing.m,
    backgroundColor: theme.colors.background,
  },
  emptyText: {
    color: theme.colors.textSecondary,
    fontSize: 16,
  },
});

export default FavoritesScreen;
