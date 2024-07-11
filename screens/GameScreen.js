import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import WordInput from "../components/WordInput";
import PrimaryButton from "../components/PrimaryButton";
import { useRef, useState } from "react";
import WordOutput from "../components/WordOutput";
import Keyboard from "../components/Keyboard";

export default function GameScreen({
  setIsGameOver,
  wordToGuess,
  guessWords,
  setGuessWords,
  words,
}) {
  const [newWord, setNewWord] = useState("");

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
      setIsGameOver(true);
    }

    setNewWord("");
  };

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
      <View style={styles.wordsContainer}>
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
      <View style={styles.inputContainer}>
        <WordInput newWord={newWord} onChangeInput={onChangeInput} />
      </View>

      <View style={styles.keyboardContainer}>
        <Keyboard setNewWord={setNewWord} newWord={newWord}></Keyboard>
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
          {isWord(newWord) === false
            ? "Not A Word"
            : isWord(newWord) === true
            ? "SUBMIT"
            : "press more key(s)"}
        </PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingVertical: 50,
    paddingTop: 100,
    paddingHorizontal: 16,

    // width: "100%",
  },
  wordsContainer: {
    flex: 1.5,
    alignItems: "center",
    borderColor: "gray",
    // borderWidth: 1,
    marginBottom: 40,
  },
  inputContainer: {
    flex: 0.25,
    justifyContent: "center",

    alignItems: "center",
    borderColor: "gray",
    // borderWidth: 1,
    marginBottom: 16,
  },

  keyboardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "gray",
    // borderWidth: 1,
    marginBottom: 16,
  },
  buttonContainer: {
    flex: 0.5,
    justifyContent: "center",
    paddingHorizontal: 50,
    borderColor: "gray",
    // borderWidth: 1,
  },
});
