import { Slot } from "expo-router";
import { useFonts } from 'expo-font';
import { CategoryProvider } from "../providers/CategoryProvider";
import { SafeAreaView } from "react-native";

export default function AppLayout() {
    return (
        <SafeAreaView style={{ flex: 1 }}> 
            <CategoryProvider>
                <Slot />
            </CategoryProvider>
        </SafeAreaView>
    );

}