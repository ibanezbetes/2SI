import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Image, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Tabs screenOptions={{ headerTitleAlign: "center" }}>

        {/* TAB 1 — Home */}
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />

        {/* TAB 2 — BOTÓN CENTRAL (Airbnb style) */}
        <Tabs.Screen
          name="info"
          options={{
            title: "",
            tabBarLabel: "",
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: "#FF385C", // rojo Airbnb
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: -40,
                  shadowColor: "#000",
                  shadowOpacity: 0.25,
                  shadowRadius: 6,
                  elevation: 6,
                }}
              >
                <Image
                  source={require("../assets/airbnb.jpg")}
                  style={{
                    width: 130,
                    height: 130,
                  }}
                  resizeMode="contain"
                />
              </View>
            ),
          }}
        />

        {/* TAB 3 — Info */}
        <Tabs.Screen
          name="info2"
          options={{
            title: "Info",
            tabBarIcon: ({ size, color }) => (
              <Ionicons
                name="information-circle-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />

      </Tabs>
    </SafeAreaProvider>
  );
}
