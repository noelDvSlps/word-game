import { StyleSheet, View } from "react-native";
import GameScreen from "./screens/GameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import StartGameScreen from "./screens/StartGameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  let words = require("an-array-of-english-words");
  words = words.filter((word) => word.length === 5);

  const [isGameOver, setIsGameOver] = useState(true);
  const [wordToGuess, setWordToGuess] = useState("");
  const [guessWords, setGuessWords] = useState([]);
  let screen;

  const startGame = () => {
    const randomWords = words[Math.floor(Math.random() * words.length)];
    setWordToGuess(randomWords.toUpperCase());
    console.log(randomWords);
    setIsGameOver(false);
    setGuessWords([]);
  };

  if (isGameOver && wordToGuess === "") {
    screen = (
      <StartGameScreen
        setIsGameOver={setIsGameOver}
        words={words}
        startGame={startGame}
      />
    );
  }

  if (!isGameOver) {
    screen = (
      <GameScreen
        guessWords={guessWords}
        setGuessWords={setGuessWords}
        setIsGameOver={setIsGameOver}
        wordToGuess={wordToGuess}
        words={words}
      />
    );
  }

  if (isGameOver && wordToGuess !== "") {
    screen = (
      <GameOverScreen
        setIsGameOver={setIsGameOver}
        startGame={startGame}
        guessWords={guessWords}
      />
    );
  }
  return (
    <LinearGradient style={styles.container} colors={["gray", "white"]}>
      {screen}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
