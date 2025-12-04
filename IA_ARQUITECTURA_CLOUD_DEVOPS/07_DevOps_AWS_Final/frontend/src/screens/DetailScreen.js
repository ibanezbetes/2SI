import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, Button } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import api from '../services/api';
import { theme } from '../theme/theme';

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
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error || !item) {
    return (
      <View style={styles.center}>
      <View style={styles.center}>
        <Text style={styles.errorText}>{error || 'Item no encontrado'}</Text>
      </View>
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
    backgroundColor: theme.colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: theme.spacing.l,
  },
  title: {
    fontSize: theme.typography.h1.fontSize,
    fontWeight: theme.typography.h1.fontWeight,
    marginBottom: theme.spacing.s,
    color: theme.colors.text,
  },
  price: {
    fontSize: 24,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginBottom: theme.spacing.s,
  },
  category: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.m,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.text,
    marginBottom: theme.spacing.l,
  },
  sectionTitle: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    marginBottom: theme.spacing.m,
    color: theme.colors.text,
  },
  videoContainer: {
    marginTop: theme.spacing.m,
    borderRadius: theme.borderRadius.medium,
    overflow: 'hidden',
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 18,
  },
});

export default DetailScreen;
