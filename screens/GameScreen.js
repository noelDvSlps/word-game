import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import WordInput from "../components/WordInput";
import PrimaryButton from "../components/PrimaryButton";
import { useRef, useState } from "react";
import WordOutput from "../components/WordOutput";
import Keyboard from "../components/Keyboard";
import { Dimensions } from "react-native";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

let windowWidth = Dimensions.get("window").width;
let windowHeight = Dimensions.get("window").height;

// windowWidth = 375;
// windowHeight = 667;

const breakPointSmall = { width: 385, height: 700 };
const breakPointMedium = { width: 400, height: 1000 };
const breakPointLarge = { width: 700, height: 1450 };

export default function GameScreen({
  setIsGameOver,
  wordToGuess,
  guessWords,
  setGuessWords,
  words,
  reloadAd,
  rules,
}) {
  const [newWord, setNewWord] = useState("");

  let rl = [];
  let wl = [];

  function addRightLetter(letter) {
    rl.push(letter);
  }
  function addWrongLetter(letter) {
    wl.push(letter);
  }

  const flatList = useRef(null);

  const isWord = (newWord) => {
    if (newWord.trim().length < 5) {
      return;
    }

    if (
      words.indexOf(newWord.trim().toLowerCase()) >= 0 &&
      newWord.trim().length === 5
    ) {
      return true;
    }
    return false;
  };

  const addWord = (newWord) => {
    if (newWord.trim().length < 5) {
      return;
    }

    setGuessWords((previousWords) => [
      ...previousWords,
      {
        word: newWord,
        status: newWord === wordToGuess ? "Correct" : "Incorrect",
      },
    ]);

    if (newWord.trim() === wordToGuess) {
      reloadAd();
      rl = [];
      wl = [];
      setIsGameOver(true);
    }

    setNewWord("");
  };

  const adUnitIdBanner = __DEV__
    ? TestIds.BANNER
    : Platform.OS === "ios"
    ? "ca-app-pub-4795904642663569/6423532723"
    : "ca-app-pub-4795904642663569/5656024778";

  function setCharAt(str, letterPosition, chr) {
    let newValue = str;
    if (letterPosition > str.length - 1) return str;

    if (letterPosition === 0) {
      return chr + str.substring(letterPosition + 1);
    } else if (letterPosition + 1 === str.length) {
      return str.substring(0, letterPosition) + chr;
    } else {
      return (
        str.substring(0, letterPosition) +
        chr +
        str.substring(letterPosition + 1)
      );
    }
  }

  const onChangeInput = (word, letterPosition, letter) => {
    let newValue = setCharAt(word, letterPosition, letter);
    setNewWord(newValue);
  };

  return (
    <View style={styles.appContainer}>
      <View
        style={[
          styles.wordsContainer,
          {
            flexDirection: "column-reverse",
            justifyContent: guessWords.length ? "flex-start" : "center",
            alignItems: "center",
          },
        ]}
      >
        {guessWords.length ? (
          <View
            style={[
              {
                padding: 0,
                height: guessWords.length > 5 ? 300 : guessWords.length * 60,
              },
              styles.listContainer,
            ]}
          >
            <FlatList
              ref={flatList}
              onContentSizeChange={() => {
                flatList.current.scrollToEnd();
              }}
              data={guessWords}
              renderItem={(itemData) => {
                return (
                  <WordOutput word={itemData.item} wordToGuess={wordToGuess} />
                );
              }}
            />
          </View>
        ) : (
          <>
            <Text
              style={{
                textAlign: "center",
                fontSize: windowHeight <= breakPointSmall.height ? 15 : 17,
              }}
            >
              Start Typing!
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: windowHeight <= breakPointSmall.height ? 15 : 17,
              }}
            >
              {rules}
            </Text>
          </>
        )}
      </View>

      <View style={styles.inputContainer}>
        <WordInput newWord={newWord} onChangeInput={onChangeInput} />
      </View>

      <View style={styles.keyboardContainer}>
        <Keyboard
          setNewWord={setNewWord}
          newWord={newWord}
          wordToGuess={wordToGuess}
          guessWords={guessWords}
          rightLetters={rl}
          wrongLetters={wl}
          addWrongLetter={addWrongLetter}
          addRightLetter={addRightLetter}
          keyWidth={
            windowHeight <= breakPointSmall.height
              ? 34
              : windowHeight <= breakPointMedium.height
              ? 37
              : 50
          }
        ></Keyboard>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          param={newWord}
          onHandlePress={addWord}
          enable={
            newWord.length === 5 &&
            words.indexOf(newWord.trim().toLowerCase()) >= 0
              ? true
              : false
          }
        >
          {isWord(newWord) === false ? "Not A Word" : "SUBMIT"}
        </PrimaryButton>
      </View>
      <View style={styles.bannerAdContainer}>
        <BannerAd
          unitId={adUnitIdBanner}
          size={BannerAdSize.BANNER}
          requestOptions={{ requestNonPersonalizedAdsOnly: true }}
        ></BannerAd>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingVertical: windowHeight <= breakPointSmall.height ? 20 : 50,
    paddingHorizontal: 16,
    maxHeight: windowHeight,
    flex: 1,
    height: windowHeight,
    width: windowWidth,
  },
  wordsContainer: {
    flex: 2,
    maxHeight:
      windowHeight <= breakPointSmall.height
        ? 240
        : windowHeight <= breakPointMedium.height
        ? 300
        : 420,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  listContainer: {
    maxHeight:
      windowHeight <= breakPointSmall.height
        ? 240
        : windowHeight <= breakPointMedium.height
        ? 300
        : 420,
  },
  inputContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",

    margin: 20,
  },

  keyboardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    marginBottom: 16,
  },
  buttonContainer: {
    flex: 0.5,
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  bannerAdContainer: {
    alignItems: "center",
  },
});
