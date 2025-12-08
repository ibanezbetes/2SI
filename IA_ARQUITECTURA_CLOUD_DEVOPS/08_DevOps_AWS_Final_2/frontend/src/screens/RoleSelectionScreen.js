import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const RoleSelectionScreen = () => {
  const { login } = useAuth();

  const handleRoleSelect = (role) => {
    login(role);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Selecciona tu Rol</Text>
        <Text style={styles.subtitle}>Elige cómo quieres acceder a la aplicación</Text>

        <TouchableOpacity
          style={[styles.button, styles.userButton]}
          onPress={() => handleRoleSelect('USER')}
        >
          <Text style={styles.buttonText}>Usuario Estándar</Text>
          <Text style={styles.buttonSubtext}>Ver ítems, favoritos y perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.adminButton]}
          onPress={() => handleRoleSelect('ADMIN')}
        >
          <Text style={styles.buttonText}>Administrador</Text>
          <Text style={styles.buttonSubtext}>Gestión completa y panel admin</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  userButton: {
    backgroundColor: '#4A90E2',
  },
  adminButton: {
    backgroundColor: '#2C3E50',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginTop: 4,
  },
});

export default RoleSelectionScreen;
