import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FAB } from "react-native-paper";
import { useRouter } from "expo-router";

const Main = () => {
  const router = useRouter();
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const loadPeople = async () => {
      const storedPeople = await AsyncStorage.getItem("people");
      if (storedPeople) {
        setPeople(JSON.parse(storedPeople));
      } else {
        setPeople([]); // No data if nothing in storage
      }
    };
    loadPeople();
  }, []);

  const handlePressPerson = async (personId) => {
    await AsyncStorage.setItem("currentPersonId", String(personId));
    router.push("/analysis"); // or "/quiz" depending on your flow
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>
      <FlatList
        data={people}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePressPerson(item.id)}
            style={{
              padding: 12,
              borderBottomWidth: 1,
              borderBottomColor: "#e5e7eb",
            }}
          >
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20, fontSize: 16 }}>
            No people added yet.
          </Text>
        }
      />
      <FAB
        style={{
          position: "absolute",
          right: 16,
          bottom: 16,
          backgroundColor: "#22c55e",
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
