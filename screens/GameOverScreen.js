import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import WordOutput from "../components/WordOutput";

export default function GameOverScreen({ startGame, guessWords }) {
  console.log(guessWords[0]);
  const onHandlePressRestart = () => {
    startGame();
  };
  return (
    <View style={styles.inputContainer}>
      <WordOutput
        word={guessWords[guessWords.length - 1]}
        wordToGuess={guessWords[guessWords.length - 1].word}
      />
      <Text style={{ color: "white" }}>
        YOU GUESSED IT RIGHT AT {guessWords.length} TRIES!! GAME OVER{" "}
      </Text>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onHandlePress={onHandlePressRestart} param={null}>
            Restart
          </PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton onHandlePress={() => alert("Unable to Close")}>
            QUIT
          </PrimaryButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 0.25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: "#3b021f",
    borderRadius: 8,
  },

  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
