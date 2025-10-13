import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Questions from "../constants/temp";
import { useRouter } from "expo-router";

const Analysis = () => {
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

  const getCategoryScore = (category) => {
    const scores = category.questions.map((q) => answers[q.id] ?? 0);
    const currentScore = scores.reduce((sum, val) => sum + val, 0);
    const maxScore = category.questions.length * 2;
    const percent = (currentScore / maxScore) * 100;
    return { currentScore, maxScore, percent };
  };

  const getScoreColor = (percent) => {
    if (percent >= 70) return "#16a34a"; // green
    if (percent >= 40) return "#facc15"; // yellow
    return "#dc2626"; // red
  };

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
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Category Summary</Text>
        {Questions.map((category) => {
          const { currentScore, maxScore, percent } = getCategoryScore(category);
          return (
            <View key={category.id} style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Text
                style={[
                  styles.scoreText,
                  { color: getScoreColor(percent) },
                ]}
              >
                {currentScore} / {maxScore} ({percent.toFixed(0)}%)
              </Text>
            </View>
          );
        })}

        <Text style={[styles.title, { marginTop: 30 }]}>Areas to Improve</Text>
        {weakQuestions.length === 0 ? (
          <Text style={styles.noWeakText}>🎉 Great job! No weak areas found.</Text>
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

      <View style={styles.buttonContainer}>
        <Button
          title="🏠 Back to Home"
          color="#1e3a8a"
          onPress={() => router.push("/")}
        />
      </View>
    </View>
  );
};

export default Analysis;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1e3a8a",
  },
  categoryContainer: {
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  scoreText: {
    fontSize: 16,
    marginTop: 4,
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
    marginTop: 10,
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
});
