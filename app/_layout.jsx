import { Stack } from "expo-router";
import "./global.css";
import { PaperProvider } from "react-native-paper";
import {
  SafeAreaProvider,
  SafeAreaView,
  // useSafeAreaInsets,
} from "react-native-safe-area-context";

const RootLayout = () => {
  return (
    <SafeAreaProvider>
        <PaperProvider>
          <Stack />
        </PaperProvider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
