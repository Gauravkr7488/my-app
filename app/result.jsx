import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Questions from "../constants/temp";

const Result = () => {
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const loadAnswers = async () => {
      try {
        const id = await AsyncStorage.getItem("currentPersonId");
        if (!id) return;

        const storedPeople = await AsyncStorage.getItem("people");
        const people = storedPeople ? JSON.parse(storedPeople) : [];

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

  return (
    <ScrollView style={styles.container}>
      {Questions.map((category) => (
        <View key={category.id} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{category.title}</Text>

          {category.questions.map((q) => {
            const score = answers[q.id] ?? 0; // default 0 if not answered
            return (
              <View key={q.id} style={styles.questionContainer}>
                <Text style={styles.questionText}>{q.id}</Text>
                <Text style={styles.scoreText}>{score}</Text>
              </View>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
};

export default Result;

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
    marginBottom: 12,
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  questionText: {
    fontSize: 16,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#22c55e",
  },
});
