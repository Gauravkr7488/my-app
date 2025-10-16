import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Questions from "../constants/temp"; // same question file

const PersonPage = () => {
  const [answers, setAnswers] = useState({});
  const router = useRouter();

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

  // Find questions with low scores
  const weakQuestions = Questions.flatMap((category) =>
    category.questions
      .filter((q) => (answers[q.id] ?? 0) < 1)
      .map((q) => ({
        ...q,
        categoryTitle: category.title,
        score: answers[q.id] ?? 0,
      }))
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Areas to Improve</Text>

      <ScrollView style={{ flex: 1 }}>
        {weakQuestions.length === 0 ? (
          <Text style={styles.noWeakText}>
            🎉 Great job! No weak areas found.
          </Text>
        ) : (
          weakQuestions.map((q) => (
            <View key={q.id} style={styles.weakContainer}>
              <Text style={styles.weakCategory}>{q.categoryTitle}</Text>
              <Text style={styles.weakQuestion}>{q.text}</Text>
              <Text style={styles.weakScore}>Score: {q.score}</Text>
              {q.advice && (
                <Text style={styles.adviceText}>💡 {q.advice}</Text>
              )}
            </View>
          ))
        )}
      </ScrollView>

      <View style={{ marginTop: 20 }}>
        <Button
          title="🔁 Retake Quiz"
          color="#2563eb"
          onPress={() => router.push("/quiz")}
        />
      </View>
    </View>
  );
};

export default PersonPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 16,
  },
  weakContainer: {
    backgroundColor: "#fee2e2",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  weakCategory: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#b91c1c",
  },
  weakQuestion: {
    fontSize: 16,
    marginTop: 4,
  },
  weakScore: {
    fontSize: 14,
    color: "#dc2626",
    marginTop: 4,
  },
  adviceText: {
    fontSize: 14,
    color: "#1e40af",
    marginTop: 6,
    fontStyle: "italic",
  },
  noWeakText: {
    fontSize: 16,
    color: "#16a34a",
    textAlign: "center",
    marginTop: 20,
  },
});
