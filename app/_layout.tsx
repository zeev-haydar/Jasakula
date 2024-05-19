import { Slot } from "expo-router";
import { useFonts } from 'expo-font';
import { CategoryProvider } from "../providers/CategoryProvider";
import { SafeAreaView } from "react-native";
import { JasaProvider } from "@/providers/JasaProvider";

export default function AppLayout() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CategoryProvider>
                <JasaProvider>
                    <Slot />
                </JasaProvider>
            </CategoryProvider>
        </SafeAreaView>
    );

}