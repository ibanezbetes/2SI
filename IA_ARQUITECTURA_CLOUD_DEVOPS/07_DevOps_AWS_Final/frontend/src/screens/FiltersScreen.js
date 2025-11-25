import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const FiltersScreen = ({ navigation }) => {
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('DESC');

  const applyFilters = () => {
    const filters = {};
    if (q) filters.q = q;
    if (category) filters.category = category;
    if (minPrice) filters.minPrice = parseFloat(minPrice);
    if (maxPrice) filters.maxPrice = parseFloat(maxPrice);
    filters.sort = sort;
    filters.order = order;

    navigation.navigate('Home', { filters });
  };

  const clearFilters = () => {
    setQ('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSort('createdAt');
    setOrder('DESC');
    navigation.navigate('Home', { filters: {} });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Buscar</Text>
      <TextInput style={styles.input} value={q} onChangeText={setQ} placeholder="Palabra clave..." />

      <Text style={styles.label}>Categoría</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={category} onValueChange={setCategory}>
          <Picker.Item label="Todas" value="" />
          <Picker.Item label="Electricidad" value="Electricidad" />
          <Picker.Item label="Fontanería" value="Fontanería" />
          <Picker.Item label="Carpintería" value="Carpintería" />
          <Picker.Item label="Pintura" value="Pintura" />
          <Picker.Item label="Jardinería" value="Jardinería" />
          <Picker.Item label="Limpieza" value="Limpieza" />
        </Picker>
      </View>

      <Text style={styles.label}>Precio Mínimo (€)</Text>
      <TextInput
        style={styles.input}
        value={minPrice}
        onChangeText={setMinPrice}
        placeholder="0"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Precio Máximo (€)</Text>
      <TextInput
        style={styles.input}
        value={maxPrice}
        onChangeText={setMaxPrice}
        placeholder="1000"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Ordenar por</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={sort} onValueChange={setSort}>
          <Picker.Item label="Fecha de creación" value="createdAt" />
          <Picker.Item label="Precio" value="price" />
        </Picker>
      </View>

      <Text style={styles.label}>Orden</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={order} onValueChange={setOrder}>
          <Picker.Item label="Descendente (Mayor a menor)" value="DESC" />
          <Picker.Item label="Ascendente (Menor a mayor)" value="ASC" />
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Aplicar Filtros" onPress={applyFilters} />
        <View style={{ marginTop: 10 }}>
          <Button title="Limpiar Filtros" onPress={clearFilters} color="red" />
        </View>
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 50,
  },
});

export default FiltersScreen;
