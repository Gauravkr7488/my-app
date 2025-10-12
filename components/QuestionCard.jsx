import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


const QuestionCard = ({ questionText, options, selectedValue, onSelect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{questionText}</Text>

      <View style={styles.optionsContainer}>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[
              styles.optionButton,
              selectedValue === opt && styles.selectedOption,
            ]}
            onPress={() => onSelect(opt)}
          >
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  question: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  optionButton: {
    backgroundColor: "#22c55e",
    padding: 12,
    borderRadius: 8,
    margin: 5,
  },
  selectedOption: {
    backgroundColor: "#16a34a",
  },
  optionText: {
    color: "white",
    fontSize: 16,
  },
});

export default QuestionCard;
