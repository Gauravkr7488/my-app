import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Questions from "../constants/temp";
const Analysis = () => {
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const loadAnswers = async () => {
      try {
        // 1️⃣ Get current person ID
        const id = await AsyncStorage.getItem("currentPersonId");

        if (!id) return;

        // 2️⃣ Load all people
        const storedPeople = await AsyncStorage.getItem("people");
        const people = storedPeople ? JSON.parse(storedPeople) : [];

        // 3️⃣ Find the person
        const person = people.find((p) => p.id === Number(id));

        if (person && person.quizAnswers) {
          setAnswers(person.quizAnswers);
        }
      } catch (error) {
        console.log("Error loading answers:", error);
      }
    };
    loadAnswers();
  }, []);

  const getCategoryScore = (category) => {
    const currentScore = category.questions.reduce((sum, q) => {
      const val = answers[q.id];
      return sum + (typeof val === "number" ? val : 0);
    }, 0);

    const maxScore = category.questions.length * 2;
    return { currentScore, maxScore };
  };

  return (
    <ScrollView style={styles.container}>
      {Questions.map((category) => {
        const { currentScore, maxScore } = getCategoryScore(category);
        return (
          <View key={category.id} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <Text style={styles.scoreText}>
              Score: {currentScore} / {maxScore}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
};


export default Analysis;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  categoryContainer: {
    marginBottom: 24,
    padding: 12,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#22c55e",
  },
});
