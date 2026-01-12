import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Category } from "./types/category";

const [categories, setCategories] = useState<Category[]>([]);
const API_URL = "http://10.0.2.2:3001/categories";


const CATEGORIES = [
  { id: "1", name: "Nature", image: "https://picsum.photos/800/500?random=11" },
  { id: "2", name: "Cities", image: "https://picsum.photos/800/500?random=22" },
  { id: "3", name: "Beach", image: "https://picsum.photos/800/500?random=33" },
  { id: "4", name: "Forest", image: "https://picsum.photos/800/500?random=44" },
];

useEffect(() => {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      // forma más simple: asumimos que llega un array correcto
      setCategories(data);
    })
    .catch(() => {
      // si falla, no hacemos nada: se quedan los datos locales
    });
}, []);

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Categories</Text>
        <Text style={styles.subtitle}>First simple screen</Text>

        {CATEGORIES.map((cat) => (
          <View key={cat.id} style={styles.card}>
            <Image source={{ uri: cat.image }} style={styles.image} />
            <Text style={styles.name}>{cat.name}</Text>
          </View>
        ))}
        {categories.map((cat) => (
          <View key={cat.id} style={styles.card}>
            <Image source={{ uri: cat.image }} style={styles.image} />
            <Text style={styles.name}>{cat.name}</Text>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFFFF" },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  image: {
    height: 140,
    width: "100%",
    borderRadius: 14,
    backgroundColor: "#F2F2F2",
  },
  name: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
  },
});
