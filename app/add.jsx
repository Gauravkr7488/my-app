import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import { FAB, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function saveName(newName) {
  try {
    const storedPeople = await AsyncStorage.getItem("people");
    const people = storedPeople ? JSON.parse(storedPeople) : [];

    const newPerson = {
      id: people.length > 0 ? people[people.length - 1].id + 1 : 1,
      name: newName.trim(),
    };

    people.push(newPerson);
    await AsyncStorage.setItem("people", JSON.stringify(people));
    console.log("Person saved successfully!");
  } catch (error) {
    console.log("Error saving person:", error);
  }
}

const Add = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleQuizPress = async () => {
    if (!name.trim()) {
      setError(true); // show visual error
      return;
    }
    setError(false);
    await saveName(name);
    router.push("/quiz");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>

      <TextInput
        mode="outlined"
        placeholder="Type here..."
        value={name}
        onChangeText={(text) => {
          setName(text);
          if (error && text.trim()) setError(false);
        }}
        style={[
          styles.input,
          error && { borderColor: "red", borderWidth: 1 }, // highlight red if empty
        ]}
        outlineColor={error ? "red" : undefined}
        activeOutlineColor={error ? "red" : "#6200ee"}
      />

      {error && <Text style={styles.errorText}>Name cannot be empty</Text>}

      <FAB label="Quiz" style={styles.fab} onPress={handleQuizPress} />
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    marginBottom: 8,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 12,
  },
  fab: {
    alignSelf: "center",
    marginTop: 10,
  },
});
