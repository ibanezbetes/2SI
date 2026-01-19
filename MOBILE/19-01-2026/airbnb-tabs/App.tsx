import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LISTINGS } from './constants/mock';
import ListingCard from './components/ListingCard';
import { ScrollView } from 'react-native';
import { COLORS } from './constants/mock';

export default function App() {
  return (
    <ScrollView>
      {LISTINGS.map((card) => (
        <ListingCard key={card.id} card={card} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  }
});