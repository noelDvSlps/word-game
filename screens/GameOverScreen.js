import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import WordOutput from "../components/WordOutput";
import Entypo from "@expo/vector-icons/Entypo";
import { useEffect, useState } from "react";

export default function GameOverScreen({
  startGame,
  guessWords,
  rewarded,
  isAdAvailable,
}) {
  const [meaning, setMeaning] = useState("");
  useEffect(() => {
    fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${
        guessWords[guessWords.length - 1].word
      }`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMeaning(
          data.message
            ? "Trust me, it is a word, google it!"
            : data[0].meanings[0].definitions[0].definition
        );
      });
  }, []);
  const onHandlePressRestart = () => {
    const ok = isAdAvailable();

    if (ok) {
      setTimeout(() => {
        try {
          rewarded.show();
        } catch (error) {
          console.log("skips ad");
        }
      }, 300);
    }
    setTimeout(() => {
      startGame();
    }, 600);
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <View style={styles.wordContainer}>
          <WordOutput
            word={guessWords[guessWords.length - 1]}
            wordToGuess={guessWords[guessWords.length - 1].word}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{meaning}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            YOU GUESSED IT RIGHT AT {guessWords.length} TRIES!!
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onHandlePress={onHandlePressRestart} param={null}>
              Restart{" "}
              {isAdAvailable && <Entypo name="video" size={24} color="gray" />}
            </PrimaryButton>
          </View>
          {/* <View style={styles.buttonContainer}>
          <PrimaryButton onHandlePress={() => alert("Unable to Close")}>
            QUIT
          </PrimaryButton>
        </View> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: "#777876",
    borderRadius: 8,
    maxHeight: "80%",
  },
  wordContainer: {
    flex: 0.25,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 0.25,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    textAlign: "center",
    color: "white",
  },

  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
