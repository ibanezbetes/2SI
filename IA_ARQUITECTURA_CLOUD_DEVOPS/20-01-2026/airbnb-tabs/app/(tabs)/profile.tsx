import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/mock';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
        <Ionicons name="notifications-outline" size={24} color={COLORS.dark} />
      </View>

      {/* Usuario */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=200&q=80',
            }}
            style={styles.avatarImg}
          />
        </View>
        <View>
          <Text style={styles.name}>Alumno React</Text>
          <Text style={styles.subtext}>Mostrar perfil</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Menú */}
      <View style={styles.menuItem}>
        <Text style={styles.menuText}>Configuración</Text>
        <Ionicons name="chevron-forward" size={20} color={COLORS.grey} />
      </View>

      <View style={styles.divider} />

      <View style={styles.menuItem}>
        <Text style={styles.menuText}>Ayuda</Text>
        <Ionicons name="chevron-forward" size={20} color={COLORS.grey} />
      </View>

      {/* Acción */}
      <View style={styles.actionSection}>
        <Pressable style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 30,
    gap: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.lightGrey,
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.dark,
  },
  subtext: {
    color: COLORS.grey,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 24,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  menuText: {
    fontSize: 16,
    color: COLORS.dark,
  },
  actionSection: {
    padding: 24,
    marginTop: 20,
  },
  logoutBtn: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.dark,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: COLORS.dark,
    fontWeight: '600',
  },
});