import { Stack } from "expo-router";
import "./global.css";
import { Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";

const RootLayout = () => {
  return (
    <PaperProvider>
      <Stack />
    </PaperProvider>
  );
};

export default RootLayout;
