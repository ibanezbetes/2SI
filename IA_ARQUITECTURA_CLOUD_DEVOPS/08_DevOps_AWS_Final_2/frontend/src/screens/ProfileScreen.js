import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme/theme';

const ProfileScreen = () => {
  const { userRole, permissions, logout } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{userRole ? userRole[0] : 'U'}</Text>
        </View>
        <Text style={styles.username}>{userRole === 'ADMIN' ? 'Administrador' : 'Usuario Estándar'}</Text>
        <Text style={styles.roleTag}>{userRole}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Permisos Habilitados</Text>
        <View style={styles.permissionsContainer}>
          {permissions.map((perm, index) => (
            <View key={index} style={styles.chip}>
              <Text style={styles.chipText}>{perm}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Cerrar Sesión / Cambiar Rol</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    alignItems: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  avatarText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  roleTag: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  section: {
    padding: theme.spacing.l,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing.m,
    color: theme.colors.text,
  },
  permissionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: '#e1f5fe',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#b3e5fc',
  },
  chipText: {
    color: '#0277bd',
    fontSize: 12,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.error,
  },
  logoutText: {
    color: theme.colors.error,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileScreen;
