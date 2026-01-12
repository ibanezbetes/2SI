import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Info() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ padding: 18 }}>
                <Text style={{ fontSize: 22, fontWeight: "700" }}>Info</Text>
                <Text style={{ marginTop: 8, opacity: 0.7 }}>
                    Pantalla mínima para completar los tabs.
                </Text>
            </View>
        </SafeAreaView>
    );
}