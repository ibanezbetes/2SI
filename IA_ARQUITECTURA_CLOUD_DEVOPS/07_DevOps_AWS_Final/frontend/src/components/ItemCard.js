import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

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
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  category: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 4,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteText: {
    fontSize: 20,
    color: '#f1c40f',
  },
});

export default ItemCard;
