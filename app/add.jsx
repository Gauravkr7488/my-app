import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FAB, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function saveName(newName) {
  try {
    // 1️⃣ Get existing people
    const storedPeople = await AsyncStorage.getItem("people");
    const people = storedPeople ? JSON.parse(storedPeople) : [];

    // 2️⃣ Create new person with unique id
    const newPerson = {
      id: people.length > 0 ? people[people.length - 1].id + 1 : 1,
      name: newName,
    };

    // 3️⃣ Add new person to the array
    people.push(newPerson);

    // 4️⃣ Save back to AsyncStorage
    await AsyncStorage.setItem("people", JSON.stringify(people));
    console.log("Person saved successfully!");
  } catch (error) {
    console.log("Error saving person:", error);
  }
}

const Add = () => {
  const [name, setName] = useState("");
  const router = useRouter();
  return (
    <View>
      <Text>Name</Text>
      <TextInput
        placeholder="Type here..."
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <FAB
        label="Quiz"
        onPress={async () => {
          await saveName(name);
          router.push("/quiz");
        }}
      />
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({});
