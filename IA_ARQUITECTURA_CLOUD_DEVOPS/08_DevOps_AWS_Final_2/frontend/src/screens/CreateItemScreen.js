import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import api from '../services/api';
import { theme } from '../theme/theme';

const CreateItemScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Electricidad');
  const [price, setPrice] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const uploadImageToS3 = async (imageUri) => {
    try {
      console.log('Getting presigned URL...');
      // 1. Get presigned URL
      const presignResponse = await api.post('/uploads/presign');
      console.log('Presign response:', presignResponse.data);
      const { url, key } = presignResponse.data;

      // 2. Upload image to S3
      console.log('Fetching image blob...');
      const response = await fetch(imageUri);
      const blob = await response.blob();
      console.log('Blob size:', blob.size);

      console.log('Uploading to S3...', url);
      const uploadResponse = await fetch(url, {
        method: 'PUT',
        body: blob,
        headers: {
          'Content-Type': 'image/jpeg',
        },
      });
      console.log('Upload status:', uploadResponse.status);

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed with status ${uploadResponse.status}`);
      }

      return key;
    } catch (error) {
      console.error('Error in uploadImageToS3:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !price || !videoUrl || !image) {
      Alert.alert('Error', 'Por favor completa todos los campos e incluye una imagen');
      return;
    }

    try {
      setLoading(true);

      // Upload image
      const thumbnailKey = await uploadImageToS3(image.uri);

      // Create item
      await api.post('/items', {
        title,
        description,
        category,
        price: parseFloat(price),
        videoUrl,
        thumbnailKey,
      });

      Alert.alert('Éxito', 'Publicación creada correctamente', [
        { text: 'OK', onPress: () => navigation.navigate('Home') },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo crear la publicación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput 
        style={styles.input} 
        value={title} 
        onChangeText={setTitle} 
        placeholder="Ej: Reparación de enchufe" 
        placeholderTextColor={theme.colors.textSecondary}
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Describe el trabajo..."
        placeholderTextColor={theme.colors.textSecondary}
        multiline
      />

      <Text style={styles.label}>Categoría</Text>
      <View style={styles.pickerContainer}>
        <Picker 
          selectedValue={category} 
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={{ color: theme.colors.text, backgroundColor: theme.colors.surface }}
          dropdownIconColor={theme.colors.text}
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
        placeholder="0.00"
        placeholderTextColor={theme.colors.textSecondary}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Video YouTube URL</Text>
      <TextInput
        style={styles.input}
        value={videoUrl}
        onChangeText={setVideoUrl}
        placeholder="https://youtube.com/..."
        placeholderTextColor={theme.colors.textSecondary}
      />

      <Text style={styles.label}>Imagen</Text>
      <Button title="Seleccionar Imagen" onPress={pickImage} color={theme.colors.secondary} />
      {image && <Image source={{ uri: image.uri }} style={styles.previewImage} />}

      <View style={styles.submitButton}>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          <Button title="Publicar Trabajo" onPress={handleSubmit} color={theme.colors.primary} />
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

export default CreateItemScreen;
