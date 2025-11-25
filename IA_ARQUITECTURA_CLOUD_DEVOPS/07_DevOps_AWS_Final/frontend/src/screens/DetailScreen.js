import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, Button } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import api from '../services/api';

const DetailScreen = ({ route, navigation }) => {
  const { itemId } = route.params;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItem();
  }, [itemId]);

  const fetchItem = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/items/${itemId}`);
      setItem(response.data);
    } catch (err) {
      setError('Error al cargar el detalle');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error || !item) {
    return (
      <View style={styles.center}>
        <Text>{error || 'Item no encontrado'}</Text>
      </View>
    );
  }

  const videoId = getVideoId(item.videoUrl);
  const imageUrl = item.thumbnailKey ? `https://test-bucket.s3.amazonaws.com/${item.thumbnailKey}` : 'https://via.placeholder.com/150';

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price} €</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.description}>{item.description}</Text>

        {videoId && (
          <View style={styles.videoContainer}>
            <Text style={styles.sectionTitle}>Video de presentación</Text>
            <YoutubePlayer
              height={200}
              play={false}
              videoId={videoId}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: '#2ecc71',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  videoContainer: {
    marginTop: 10,
  },
});

export default DetailScreen;
