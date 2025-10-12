import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FAB, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function saveName(newName) {
  try {
    const storedPeople = await AsyncStorage.getItem("people");
    const people = storedPeople ? JSON.parse(storedPeople) : [];

    // Check for duplicate (case insensitive)
    const nameExists = people.some(
      (p) => p.name.toLowerCase() === newName.trim().toLowerCase()
    );

    if (nameExists) {
      return { success: false, error: "duplicate" };
    }

    const newPerson = {
      id: people.length > 0 ? people[people.length - 1].id + 1 : 1,
      name: newName.trim(),
    };

    people.push(newPerson);
    await AsyncStorage.setItem("people", JSON.stringify(people));
    console.log("Person saved successfully!");
    return { success: true };
  } catch (error) {
    console.log("Error saving person:", error);
    return { success: false, error: "storage" };
  }
}

const Add = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleQuizPress = async () => {
    const trimmed = name.trim();

    if (!trimmed) {
      setError("Name cannot be empty");
      return;
    }

    const result = await saveName(trimmed);

    if (!result.success) {
      if (result.error === "duplicate") {
        setError("This name already exists");
      } else {
        setError("Something went wrong, please try again");
      }
      return;
    }

    setError("");
    router.push("/quiz");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>

      <TextInput
        mode="outlined"
        placeholder="Type here..."
        value={name}
        autoCorrect={false}
        autoCapitalize="none"
        spellCheck={false}
        onChangeText={(text) => {
          setName(text);
          if (error && text.trim()) setError("");
        }}
        style={[styles.input, error && { borderColor: "red", borderWidth: 1 }]}
        outlineColor={error ? "red" : undefined}
        activeOutlineColor={error ? "red" : "#6200ee"}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

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
