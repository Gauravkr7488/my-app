import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { FAB } from "react-native-paper";
import { useRouter } from "expo-router";

export default function Main() {
  const router = useRouter();
  const people = [
    { id: "1", name: "Ava", quizzes: 3 },
    { id: "2", name: "Noah", quizzes: 1 },
    { id: "3", name: "Mia", quizzes: 5 },
  ];

  return (
    <View className="flex-1 bg-white p-4">
      <FlatList
        data={people}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="p-4 border-b border-gray-200">
            <Text className="text-lg font-semibold">{item.name}</Text>
          </View>
        )}
      />

      <FAB
        icon="plus"
        style={{
          position: "absolute",
          right: 16,
          bottom: 16,
          backgroundColor: "#22c55e", // green
        }}
        color="white"
        onPress={() => router.push("/addNew")} // navigate to page
      />
    </View>
  );
}
