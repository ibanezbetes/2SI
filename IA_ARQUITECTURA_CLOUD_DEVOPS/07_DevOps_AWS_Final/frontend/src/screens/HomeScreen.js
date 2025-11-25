import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, RefreshControl, Button } from 'react-native';
import api from '../services/api';
import ItemCard from '../components/ItemCard';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation, route }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
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
      const response = await api.get('/items', { params });
      setItems(response.data.data);
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

  const toggleFavorite = async (item) => {
    // TODO: Implement favorite logic
    console.log('Toggle favorite', item.id);
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
        <Button title="Reintentar" onPress={fetchItems} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Filtros" onPress={() => navigation.navigate('Filters')} />
        <Button title="Publicar" onPress={() => navigation.navigate('CreateItem')} />
        <Button title="Favoritos" onPress={() => navigation.navigate('Favorites')} />
        <Button title="Perfil" onPress={() => navigation.navigate('Profile')} />
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard
            item={item}
            onPress={() => navigation.navigate('Detail', { itemId: item.id })}
            onFavoritePress={() => toggleFavorite(item)}
            isFavorite={false} // TODO: Check if favorite
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.center}>
            <Text>No hay publicaciones disponibles</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
