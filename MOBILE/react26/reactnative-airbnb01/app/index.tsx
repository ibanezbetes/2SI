import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CATEGORIES, FEATURED, POPULAR } from "../constants/places";


export default function HomeScreen() {
  const activeCategoryId = "views"; // KATA 1: fijo (en KATA 4 lo haremos interactivo)

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* NAVBAR */}
        <View style={styles.navbar}>
          <View style={styles.navLeft}>
            <Text style={styles.brand}>StayFinder</Text>
            <Text style={styles.tagline}>Find your perfect stay</Text>
          </View>
          <View style={styles.navRight}>
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
              <Feather name="menu" size={20} color="#111" />
            </TouchableOpacity>

            <Image
              style={styles.avatar}
              source={{
                uri: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=256&q=80",
              }}
            />
          </View>
        </View>
        <View style={styles.searchBlock}>
          <View style={styles.searchBar}>
            <Feather name="moon" size={18} color="#6B7280" />
            <TextInput
              placeholder="Search destinations, stays, experiences"
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
            />
          </View>
          <View style={styles.searchMetaRow}>
            <View style={styles.metaPill}>
              <Ionicons name="calendar-outline" size={16} color="#111" />
              <Text style={styles.metaText}>Any week</Text>
            </View>
            <View style={styles.metaPill}>
              <Ionicons name="people-outline" size={16} color="#111" />
              <Text style={styles.metaText}>Add guests</Text>
            </View>
            <View style={[styles.metaPill, styles.metaPillPrimary]}>
              <Ionicons name="options-outline" size={16} color="#111" />
              <Text style={styles.metaText}>Filters</Text>
            </View>
          </View>
        </View>

        {/* CATEGORIES */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <Text style={styles.sectionLink}>See all</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
        >
          {CATEGORIES.map((c) => {
            const isActive = c.id === activeCategoryId;
            return (
              <TouchableOpacity
                key={c.id}
                activeOpacity={0.8}
                style={[styles.chip, isActive && styles.chipActive]}
              >
                <Ionicons
                  name={c.icon}
                  size={16}
                  color={isActive ? "#111" : "#6B7280"}
                />
                <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                  {c.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* FEATURED */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Featured</Text>
          <Text style={styles.sectionLink}>Top picks</Text>
        </View>

        <View style={styles.featuredCard}>
          <Image style={styles.featuredImage} source={{ uri: FEATURED.image }} />
          <View style={styles.featuredOverlay} />

          <View style={styles.featuredTopRow}>
            <View style={styles.ratingPill}>
              <Ionicons name="star" size={14} color="#111" />
              <Text style={styles.ratingText}>
                {FEATURED.rating} ({FEATURED.reviews})
              </Text>
            </View>

            <TouchableOpacity style={styles.heartPill} activeOpacity={0.7}>
              <Ionicons name="heart-outline" size={18} color="#111" />
            </TouchableOpacity>
          </View>

          <View style={styles.featuredBottom}>
            <Text style={styles.featuredTitle}>{FEATURED.title}</Text>
            <Text style={styles.featuredSubtitle}>{FEATURED.subtitle}</Text>
            <Text style={styles.featuredPrice}>{FEATURED.price}</Text>
          </View>
        </View>

        {/* POPULAR */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Popular stays</Text>
          <Text style={styles.sectionLink}>Explore</Text>
        </View>

        <View style={styles.grid}>
          {POPULAR.map((p) => (
            <View key={p.id} style={styles.smallCard}>
              <Image style={styles.smallImage} source={{ uri: p.image }} />
              <View style={styles.smallInfo}>
                <Text style={styles.smallTitle} numberOfLines={1}>
                  {p.title}
                </Text>
                <Text style={styles.smallPrice}>{p.price} / night</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Footer spacer */}
        <View style={{ height: 16 }} />
      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFFFF" },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 18, paddingTop: 10,
  },

  navbar: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  navLeft: { gap: 2 },
  brand: { fontSize: 28, fontWeight: "800", color: "#111" },
  tagline: { fontSize: 13, color: "#6B7280" },
  navRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: { width: 40, height: 40, borderRadius: 20 },

  searchBlock: { marginBottom: 14 },
  searchBar: {
    height: 50,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchInput: { flex: 1, fontSize: 14, color: "#111" },
  searchMetaRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    flexWrap: "wrap",
  },
  metaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  metaPillPrimary: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  metaText: { fontSize: 13, color: "#111", fontWeight: "600" },

  sectionHeaderRow: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: "#111" },
  sectionLink: { fontSize: 13, color: "#6B7280", fontWeight: "600" },

  chipsRow: { paddingRight: 12, gap: 10 },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
  },
  chipActive: {
    backgroundColor: "#FDE68A",
  },
  chipText: { fontSize: 13, color: "#6B7280", fontWeight: "700" },
  chipTextActive: { color: "#111" },

  featuredCard: {
    borderRadius: 18,
    overflow: "hidden",
    height: 250,
    backgroundColor: "#EEE",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.10,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  featuredImage: { width: "100%", height: "100%" },
  featuredOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.18)",
  },
  featuredTopRow: {
    position: "absolute",
    left: 12,
    right: 12,
    top: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.90)",
  },
  ratingText: { fontSize: 12, fontWeight: "800", color: "#111" },
  heartPill: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.90)",
  },
  featuredBottom: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 14,
  },
  featuredTitle: { fontSize: 18, fontWeight: "900", color: "#FFF" },
  featuredSubtitle: { marginTop: 4, fontSize: 13, color: "rgba(255,255,255,0.92)" },
  featuredPrice: { marginTop: 8, fontSize: 14, fontWeight: "900", color: "#FFF" },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  smallCard: {
    width: "48%",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  smallImage: { width: "100%", height: 110 },
  smallInfo: { padding: 10 },
  smallTitle: { fontSize: 13, fontWeight: "900", color: "#111" },
  smallPrice: { marginTop: 4, fontSize: 12, color: "#6B7280", fontWeight: "700" },
});
