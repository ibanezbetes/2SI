import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/mock';

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Favoritos</Text>
        <Text style={styles.subtitle}>
          Inicia sesión para ver tus listas.
        </Text>

        <View style={styles.placeholderCard}>
          <Text style={styles.placeholderText}>
            Aún no tienes favoritos
          </Text>
        </View>

        <View style={styles.btn}>
          <Text style={styles.btnText}>Empezar a explorar</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.grey,
    marginBottom: 32,
  },
  placeholderCard: {
    height: 200,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  placeholderText: {
    color: COLORS.grey,
  },
  btn: {
    backgroundColor: COLORS.dark,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
});