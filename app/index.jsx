import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FAB } from "react-native-paper";
import { useRouter } from "expo-router";

const dummyData = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
];

const Main = () => {
  const router = useRouter()
  const [people, setpeople] = useState("");
  useEffect(() => {
    const loadPeople = async () => {
      const storedPeople = await AsyncStorage.getItem("people");
      storedPeople ? setpeople(JSON.parse(storedPeople)) : setpeople(dummyData);
    };
    loadPeople();
  }, []);

  return (
     <View className="flex-1 bg-white p-4">
      <FlatList
        data={people}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
      <FAB
        style={{
          position: "absolute",
          right: 16,
          bottom: 16,
          backgroundColor: "#22c55e", // green
        }}
        icon="plus"
        label="Add"
        onPress={() => router.push("/add")}
      />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({});
