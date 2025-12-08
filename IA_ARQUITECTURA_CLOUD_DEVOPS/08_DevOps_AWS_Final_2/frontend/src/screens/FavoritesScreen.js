import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ItemCard from '../components/ItemCard';
import { theme } from '../theme/theme';
import { useAuth } from '../context/AuthContext';

const FavoritesScreen = ({ navigation }) => {
  const { favorites, toggleFavorite, isLoading } = useAuth();

  if (isLoading) {
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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ItemCard
            item={item}
            onPress={() => navigation.navigate('Detail', { itemId: item.id })}
            onFavoritePress={() => toggleFavorite(item)}
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
