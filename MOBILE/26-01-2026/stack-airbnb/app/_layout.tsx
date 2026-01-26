import { Stack } from "expo-router";

export default function RootLayout() {
return (
<Stack screenOptions={{ headerShown: true }}>
<Stack.Screen name="index" options={{ title: "Inicio" }} />
<Stack.Screen name="listing" options={{ title: "Catálogo" }} />
<Stack.Screen name="detail" options={{ title: "Detalle" }} />
</Stack>
);
}