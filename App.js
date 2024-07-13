import { StyleSheet, View } from "react-native";
import GameScreen from "./screens/GameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import StartGameScreen from "./screens/StartGameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import "expo-dev-client";

import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.REWARDED
  : "ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy";

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  keywords: ["fashion", "clothing"],
});

export default function App() {
  let words = require("an-array-of-english-words");
  words = words.filter((word) => word.length === 5);

  const [isGameOver, setIsGameOver] = useState(true);
  const [wordToGuess, setWordToGuess] = useState("");
  const [guessWords, setGuessWords] = useState([]);
  let screen;

  const [loaded, setLoaded] = useState(false);

  const reloadAd = () => {
    rewarded.removeAllListeners();
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
      }
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("User earned reward of ", reward);
      }
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  };

  const isAdAvailable = () => {
    return loaded;
  };

  // useEffect(() => {
  //   reloadAd();
  // }, []);

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
        reloadAd={reloadAd}
      />
    );
  }

  if (isGameOver && wordToGuess !== "") {
    screen = (
      <GameOverScreen
        setIsGameOver={setIsGameOver}
        startGame={startGame}
        guessWords={guessWords}
        rewarded={rewarded}
        reloadAd={reloadAd}
        isAdAvailable={isAdAvailable}
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
