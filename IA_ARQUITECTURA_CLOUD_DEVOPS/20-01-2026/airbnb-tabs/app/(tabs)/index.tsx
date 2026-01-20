import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LISTINGS, COLORS } from '../../constants/mock';
import ListingCard from '../../components/ListingCard';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.dark} />
          <Text style={styles.searchText}>¿A dónde quieres ir?</Text>
        </View>

        <View style={styles.filterBtn}>
          <Ionicons name="options" size={20} color={COLORS.dark} />
        </View>
      </View>

      {/* Categorías (solo visual) */}
      <View style={styles.categories}>
        <Text style={[styles.category, styles.activeCategory]}>Cabañas</Text>
        <Text style={styles.category}>Playa</Text>
        <Text style={styles.category}>Novedades</Text>
        <Text style={styles.category}>Diseño</Text>
      </View>

      {/* Listado */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {LISTINGS.map((item) => (
          <ListingCard key={item.id} item={item} />
        ))}
      </ScrollView>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGrey,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 30,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.dark,
  },
  filterBtn: {
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categories: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  category: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.grey,
  },
  activeCategory: {
    color: COLORS.dark,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  scrollContent: {
    padding: 20,
  },
});