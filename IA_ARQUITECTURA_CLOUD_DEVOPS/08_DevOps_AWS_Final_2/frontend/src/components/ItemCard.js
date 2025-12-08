import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme/theme';

const ItemCard = ({ item, onPress, onFavoritePress, isFavorite }) => {
  const imageUrl = item.thumbnailKey ? `https://test-bucket.s3.amazonaws.com/${item.thumbnailKey}` : 'https://via.placeholder.com/150';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price} €</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
      <TouchableOpacity style={styles.favoriteButton} onPress={onFavoritePress}>
        <Text style={styles.favoriteText}>{isFavorite ? '★' : '☆'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    marginVertical: theme.spacing.s,
    marginHorizontal: theme.spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: theme.spacing.m,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: theme.colors.text,
  },
  price: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteText: {
    fontSize: 24,
    color: theme.colors.warning,
  },
});

export default ItemCard;
