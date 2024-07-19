import { Platform, StyleSheet, View } from "react-native";
import GameScreen from "./screens/GameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import StartGameScreen from "./screens/StartGameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import "expo-dev-client";

import {
  RewardedAd,
  RewardedInterstitialAd,
  RewardedAdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

const rules = `Each guess must be a valid five-letter word.
The color of a tile will change to show you how close your guess was.
If the tile turns green, the letter is in the word, and it is in the correct spot.
If the tile turns yellow, the letter is in the word, but it is not in the correct spot.
If the tile turns gray, the letter is not in the word.
YOU HAVE UNLIMITED TRIES.`;

const title = "WORDS UNLIMITED";

const adUnitIdInterstitial = __DEV__
  ? TestIds.REWARDED_INTERSTITIAL
  : Platform.OS === "ios"
  ? "ca-app-pub-4795904642663569/5536868603"
  : "ca-app-pub-4795904642663569/7269323497";

const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(
  adUnitIdInterstitial,
  {
    requestNonPersonalizedAdsOnly: true,
  }
);

export default function App() {
  let words = require("an-array-of-english-words");
  words = words.filter((word) => word.length === 5);

  const [isGameOver, setIsGameOver] = useState(true);
  const [wordToGuess, setWordToGuess] = useState("");
  const [guessWords, setGuessWords] = useState([]);

  let screen;

  const [loaded, setLoaded] = useState(false);

  function getLoaded() {
    return loaded;
  }

  const reloadAd = () => {
    rewardedInterstitial.removeAllListeners();
    const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
        return true;
      }
    );
    const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("User earned reward of ", reward);
        setLoaded(false);
        return reward;
      }
    );

    // Start loading the rewarded interstitial ad straight away
    rewardedInterstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  };

  const isAdAvailable = () => {
    return loaded;
  };

  const startGame = () => {
    const randomWords = words[Math.floor(Math.random() * words.length)];
    setWordToGuess(randomWords.toUpperCase());
    setIsGameOver(false);
    setGuessWords([]);
  };

  if (isGameOver && wordToGuess === "") {
    screen = (
      <StartGameScreen
        setIsGameOver={setIsGameOver}
        words={words}
        startGame={startGame}
        rules={rules}
        title={title}
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
        rewarded={rewardedInterstitial}
        reloadAd={reloadAd}
        isAdAvailable={isAdAvailable}
        rules={rules}
        setLoaded={setLoaded}
        getLoaded={getLoaded}
      />
    );
  }

  if (isGameOver && wordToGuess !== "") {
    screen = (
      <GameOverScreen
        setIsGameOver={setIsGameOver}
        startGame={startGame}
        guessWords={guessWords}
        rewarded={rewardedInterstitial}
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
