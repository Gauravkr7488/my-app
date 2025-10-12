import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QuestionCard from "../components/QuestionCard";
import Questions from "../constants/temp";
import { useRouter } from "expo-router";

const options = [-2, -1, 0, 1, 2];
const allQuestions = Questions.flatMap((category) => category.questions);

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const router = useRouter();

  // Load saved answers on mount
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

  const currentQuestion = allQuestions[currentIndex];

  const handleSelect = async (value) => {
    const updatedAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(updatedAnswers);

    try {
      await AsyncStorage.setItem("quizAnswers", JSON.stringify(updatedAnswers));
      console.log("Answer saved!");
    } catch (error) {
      console.log("Error saving answer:", error);
    }
    
    if (currentIndex < allQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleNext = async () => {
    if (currentIndex < allQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Quiz finished, navigate to analysis screen
      await AsyncStorage.setItem("quizAnswers", JSON.stringify(answers));
      router.push("/result"); // Change this path to your analysis screen route
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <View style={styles.container}>
      <QuestionCard
        questionText={currentQuestion.text}
        options={options}
        selectedValue={answers[currentQuestion.id]}
        onSelect={handleSelect}
      />

      <View style={styles.navContainer}>
        <Button
          title="Previous"
          onPress={handlePrevious}
          disabled={currentIndex === 0}
        />
        <Button
          title={currentIndex === allQuestions.length - 1 ? "Finish" : "Next"}
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
