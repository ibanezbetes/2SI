import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import api from '../services/api';
import { theme } from '../theme/theme';

const EditItemScreen = ({ route, navigation }) => {
  const { itemId } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Electricidad');
  const [price, setPrice] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [image, setImage] = useState(null);
  const [thumbnailKey, setThumbnailKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const response = await api.get(`/items/${itemId}`);
      const item = response.data;
      setTitle(item.title);
      setDescription(item.description);
      setCategory(item.category);
      setPrice(item.price.toString());
      setVideoUrl(item.videoUrl);
      setThumbnailKey(item.thumbnailKey);
      
      if (item.thumbnailKey) {
          // Construct URL for preview if needed, or just keep key logic
          // For Image component:
          setImage({ uri: `https://test-bucket.s3.amazonaws.com/${item.thumbnailKey}` });
      }
    } catch (error) {
      console.error('Error fetching item', error);
      Alert.alert('Error', 'No se pudo cargar la información del ítem');
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
      setThumbnailKey(null); // Reset key so we know to upload new one
    }
  };

  const uploadImageToS3 = async (imageUri) => {
    try {
      const presignResponse = await api.post('/uploads/presign');
      const { url, key } = presignResponse.data;

      const response = await fetch(imageUri);
      const blob = await response.blob();

      await fetch(url, {
        method: 'PUT',
        body: blob,
        headers: {
          'Content-Type': 'image/jpeg',
        },
      });

      return key;
    } catch (error) {
      console.error('Error uploading image', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !price) {
      Alert.alert('Error', 'Por favor completa los campos obligatorios');
      return;
    }

    try {
      setSubmitting(true);
      
      let finalKey = thumbnailKey;
      
      // If image changed (we have a local uri and thumbnailKey was reset)
      if (!thumbnailKey && image && image.uri) {
          finalKey = await uploadImageToS3(image.uri);
      }

      await api.put(`/items/${itemId}`, {
        title,
        description,
        category,
        price: parseFloat(price),
        videoUrl,
        thumbnailKey: finalKey,
      });

      Alert.alert('Éxito', 'Publicación actualizada', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo actualizar la publicación');
    } finally {
      setSubmitting(false);
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
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput 
        style={styles.input} 
        value={title} 
        onChangeText={setTitle} 
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Categoría</Text>
      <View style={styles.pickerContainer}>
        <Picker 
          selectedValue={category} 
          onValueChange={setCategory}
          style={{ color: theme.colors.text, backgroundColor: theme.colors.surface }}
        >
          <Picker.Item label="Electricidad" value="Electricidad" />
          <Picker.Item label="Fontanería" value="Fontanería" />
          <Picker.Item label="Carpintería" value="Carpintería" />
          <Picker.Item label="Pintura" value="Pintura" />
          <Picker.Item label="Jardinería" value="Jardinería" />
          <Picker.Item label="Limpieza" value="Limpieza" />
        </Picker>
      </View>

      <Text style={styles.label}>Precio (€)</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Video YouTube URL</Text>
      <TextInput
        style={styles.input}
        value={videoUrl}
        onChangeText={setVideoUrl}
      />

      <Text style={styles.label}>Imagen</Text>
      <Button title="Cambiar Imagen" onPress={pickImage} color={theme.colors.secondary} />
      {image && <Image source={{ uri: image.uri }} style={styles.previewImage} />}

      <View style={styles.submitButton}>
        {submitting ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          <Button title="Guardar Cambios" onPress={handleSubmit} color={theme.colors.primary} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.m,
    backgroundColor: theme.colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
    marginTop: theme.spacing.s,
    color: theme.colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.s,
    borderRadius: theme.borderRadius.small,
    fontSize: 16,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.small,
    backgroundColor: theme.colors.surface,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginTop: theme.spacing.s,
    borderRadius: theme.borderRadius.medium,
  },
  submitButton: {
    marginTop: theme.spacing.xl,
    marginBottom: 50,
  },
});

export default EditItemScreen;
