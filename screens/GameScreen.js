import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import WordInput from "../components/WordInput";
import PrimaryButton from "../components/PrimaryButton";
import { useRef, useState } from "react";
import WordOutput from "../components/WordOutput";
import Keyboard from "../components/Keyboard";
import { Dimensions } from "react-native";
import Foundation from "@expo/vector-icons/Foundation";
import { FontAwesome } from "@expo/vector-icons";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import RoundButton from "../components/RoundButton";

let windowWidth = Dimensions.get("window").width;
let windowHeight = Dimensions.get("window").height;

const breakPointSmall = { width: 385, height: 700 };
const breakPointMedium = { width: 400, height: 1000 };
const breakPointLarge = { width: 700, height: 1450 };

export default function GameScreen({
  setIsGameOver,
  wordToGuess,
  guessWords,
  setGuessWords,
  words,
  rewarded,
  reloadAd,
  isAdAvailable,
  rules,
}) {
  const [newWord, setNewWord] = useState(" ".repeat(5));
  const [selectedBox, setSelectedBox] = useState(0);
  const [rightLetters, setRightLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [hintLetters, setHintLetters] = useState([]);

  const [availableInputBoxes, setAvailableInputBoxes] = useState([
    0, 1, 2, 3, 4,
  ]);

  function showHint() {
    const hintLetters = [...new Set(wordToGuess)];
    if (hintLetters.length === rightLetters.length) {
      alert("No more");
      return;
    }

    for (i = 0; i < rightLetters.length; i++) {
      const index = hintLetters.indexOf(rightLetters[i]);
      if (index > -1) {
        // only splice array when item is found
        hintLetters.splice(index, 1); // 2nd parameter means remove one item only
      }
    }

    const hintLetter =
      hintLetters[Math.floor(Math.random() * hintLetters.length)];

    setRightLetters((previous) => [...previous, hintLetter]);
    setHintLetters((previous) => [...previous, hintLetter]);
  }

  const onHandlePressHint = async () => {
    const ok = isAdAvailable();
    if (ok) {
      try {
        const s = await rewarded.show();
        showHint();
        setTimeout(() => {
          reloadAd();
        }, 15000);
      } catch (error) {
        reloadAd();
        alert("Try again later");
      }
    } else {
      reloadAd();
    }
  };

  function addRightLetter(letter) {
    setRightLetters((previous) => [...previous, letter]);
  }
  function addWrongLetter(letter) {
    setWrongLetters((previous) => [...previous, letter]);
  }

  const flatList = useRef(null);

  const isWord = (newWord) => {
    if (newWord.indexOf(" ") >= 0) {
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

  function onHandleSubmit(newWord) {
    if (!isAdAvailable()) {
      reloadAd();
    }
    addWord(newWord);

    const uniqueLetters = [...new Set(newWord)];
    const rl = [...rightLetters];
    const wl = [...wrongLetters];

    for (i = 0; i < uniqueLetters.length; i++) {
      const uniqueLetter = uniqueLetters[i];

      if (
        rightLetters.indexOf(uniqueLetter) < 0 &&
        [...wordToGuess].indexOf(uniqueLetter) >= 0
      ) {
        rl.push(uniqueLetters[i]);
      } else if (
        wrongLetters.indexOf(uniqueLetter) < 0 &&
        [...wordToGuess].indexOf(uniqueLetter) < 0
      ) {
        wl.push(uniqueLetters[i]);
      }
    }
    setRightLetters(rl);
    setWrongLetters(wl);
  }

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
      setRightLetters([]);
      setWrongLetters([]);
      setIsGameOver(true);
    }

    //reset
    const tempArray = [...newWord];
    for (let i = 0; i < availableInputBoxes.length; i++) {
      tempArray[availableInputBoxes[i]] = " ";
    }
    setNewWord("     ");
    setSelectedBox(0);
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
        <WordInput
          newWord={newWord}
          setNewWord={setNewWord}
          onChangeInput={onChangeInput}
          selectedBox={selectedBox}
          setSelectedBox={setSelectedBox}
          wordToGuess={wordToGuess}
        />
      </View>

      <View style={styles.keyboardContainer}>
        <Keyboard
          setNewWord={setNewWord}
          newWord={newWord}
          wordToGuess={wordToGuess}
          guessWords={guessWords}
          rightLetters={rightLetters}
          wrongLetters={wrongLetters}
          addWrongLetter={addWrongLetter}
          addRightLetter={addRightLetter}
          keyWidth={
            windowHeight <= breakPointSmall.height
              ? 34
              : windowHeight <= breakPointMedium.height
              ? 37
              : 50
          }
          selectedBox={selectedBox}
          setSelectedBox={setSelectedBox}
          availableInputBoxes={availableInputBoxes}
          setRightLetters={setRightLetters}
          setWronglLetters={setWrongLetters}
          setHintLetters={setHintLetters}
          hintLetters={hintLetters}
        ></Keyboard>
      </View>
      <View
        style={[
          styles.buttonContainer,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 0,
          },
        ]}
      >
        <View style={{ flex: 5 }}>
          <PrimaryButton
            param={newWord}
            onHandlePress={onHandleSubmit}
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
        <View
          style={{
            flex:
              isAdAvailable() &&
              [...new Set(wordToGuess)].length !== rightLetters.length
                ? 1
                : 0,
          }}
        >
          {isAdAvailable() &&
            [...new Set(wordToGuess)].length !== rightLetters.length && (
              <RoundButton onHandlePress={onHandlePressHint} param={null}>
                <View
                  style={{
                    position: "relative",
                  }}
                >
                  <View>
                    <Foundation name="lightbulb" size={50} color="yellow" />
                  </View>
                  <View style={[styles.absoluteContainer]}>
                    <FontAwesome
                      name="video-camera"
                      size={16}
                      color="#697171"
                    />
                  </View>
                </View>
              </RoundButton>
            )}
        </View>
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
    paddingVertical: windowHeight <= breakPointSmall.height ? 20 : 20,
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
  },
  buttonContainer: {
    flex: 0.5,
    justifyContent: "center",
    paddingHorizontal: 50,
    marginBottom: 16,
  },
  absoluteContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerAdContainer: {
    alignItems: "center",
  },
});
