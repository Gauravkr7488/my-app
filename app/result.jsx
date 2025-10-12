import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Questions from "../constants/temp";

const Analysis = () => {
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const loadAnswers = async () => {
      try {
        const saved = await AsyncStorage.getItem("quizAnswers");
        if (saved) setAnswers(JSON.parse(saved));
      } catch (error) {
        console.log("Error loading answers:", error);
      }
    };
    loadAnswers();
  }, []);

  // Function to calculate sum of scores for a category
  const getCategoryScore = (category) => {
    return category.questions.reduce((sum, q) => {
      const val = answers[q.id];
      return sum + (typeof val === "number" ? val : 0);
    }, 0);
  };

  return (
    <ScrollView style={styles.container}>
      {Questions.map((category) => (
        <View key={category.id} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <Text style={styles.scoreText}>
            Total Score: {getCategoryScore(category)}
          </Text>
        </View>
      ))}
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
