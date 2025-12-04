import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { theme } from '../theme/theme';

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
      <TextInput 
        style={styles.input} 
        value={q} 
        onChangeText={setQ} 
        placeholder="Palabra clave..." 
        placeholderTextColor={theme.colors.textSecondary}
      />

      <Text style={styles.label}>Categoría</Text>
      <View style={styles.pickerContainer}>
        <Picker 
          selectedValue={category} 
          onValueChange={setCategory}
          style={{ color: theme.colors.text, backgroundColor: theme.colors.surface }}
          dropdownIconColor={theme.colors.text}
        >
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
        placeholderTextColor={theme.colors.textSecondary}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Precio Máximo (€)</Text>
      <TextInput
        style={styles.input}
        value={maxPrice}
        onChangeText={setMaxPrice}
        placeholder="1000"
        placeholderTextColor={theme.colors.textSecondary}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Ordenar por</Text>
      <View style={styles.pickerContainer}>
        <Picker 
          selectedValue={sort} 
          onValueChange={setSort}
          style={{ color: theme.colors.text, backgroundColor: theme.colors.surface }}
          dropdownIconColor={theme.colors.text}
        >
          <Picker.Item label="Fecha de creación" value="createdAt" />
          <Picker.Item label="Precio" value="price" />
        </Picker>
      </View>

      <Text style={styles.label}>Orden</Text>
      <View style={styles.pickerContainer}>
        <Picker 
          selectedValue={order} 
          onValueChange={setOrder}
          style={{ color: theme.colors.text, backgroundColor: theme.colors.surface }}
          dropdownIconColor={theme.colors.text}
        >
          <Picker.Item label="Descendente (Mayor a menor)" value="DESC" />
          <Picker.Item label="Ascendente (Menor a mayor)" value="ASC" />
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Aplicar Filtros" onPress={applyFilters} color={theme.colors.primary} />
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.small,
    backgroundColor: theme.colors.surface,
    overflow: 'hidden',
  },
  buttonContainer: {
    marginTop: theme.spacing.xl,
    marginBottom: 50,
  },
});

export default FiltersScreen;
