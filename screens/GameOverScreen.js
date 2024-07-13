import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import WordOutput from "../components/WordOutput";
import Entypo from "@expo/vector-icons/Entypo";

export default function GameOverScreen({
  startGame,
  guessWords,
  rewarded,
  isAdAvailable,
}) {
  console.log(guessWords[0]);
  const onHandlePressRestart = () => {
    const ok = isAdAvailable();

    if (ok) {
      setTimeout(() => {
        try {
          rewarded.show();
        } catch (error) {
          alert("ad error");
        }
      }, 300);
    }
    setTimeout(() => {
      startGame();
    }, 600);
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
            Restart{" "}
            {isAdAvailable && <Entypo name="video" size={24} color="purple" />}
          </PrimaryButton>
        </View>
        {/* <View style={styles.buttonContainer}>
          <PrimaryButton onHandlePress={() => alert("Unable to Close")}>
            QUIT
          </PrimaryButton>
        </View> */}
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
