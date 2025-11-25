import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import api from '../services/api';

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
    // 1. Get presigned URL
    const presignResponse = await api.post('/uploads/presign');
    const { url, key } = presignResponse.data;

    // 2. Upload image to S3
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
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Ej: Reparación de enchufe" />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Describe el trabajo..."
        multiline
      />

      <Text style={styles.label}>Categoría</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)}>
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
        keyboardType="numeric"
      />

      <Text style={styles.label}>Video YouTube URL</Text>
      <TextInput
        style={styles.input}
        value={videoUrl}
        onChangeText={setVideoUrl}
        placeholder="https://youtube.com/..."
      />

      <Text style={styles.label}>Imagen</Text>
      <Button title="Seleccionar Imagen" onPress={pickImage} />
      {image && <Image source={{ uri: image.uri }} style={styles.previewImage} />}

      <View style={styles.submitButton}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Publicar Trabajo" onPress={handleSubmit} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  previewImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginTop: 10,
    borderRadius: 5,
  },
  submitButton: {
    marginTop: 30,
    marginBottom: 50,
  },
});

export default CreateItemScreen;
