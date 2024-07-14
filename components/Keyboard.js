import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const row3 = ["Z", "X", "C", "V", "B", "N", "M"];
const textLength = 5;

export default function Keyboard({
  setNewWord,
  newWord,
  wordToGuess,
  guessWords,
  rightLetters,
  wrongLetters,
  addWrongLetter,
  addRightLetter,
  keyWidth,
}) {
  guessWords.map((item) => {
    const arrayLetters = [...item.word];
    arrayLetters.map((letter) => {
      if (wordToGuess.indexOf(letter) >= 0) {
        rightLetters.indexOf(letter) < 0 && addRightLetter(letter);
      } else {
        wrongLetters.indexOf(letter) < 0 && addWrongLetter(letter);
      }
    });
  });

  const [value, setValue] = useState("");
  function getNewWord(letter) {
    let textValue = newWord.length < textLength ? newWord + letter : value;
    setValue(textValue);

    return textValue;
  }

  function backspaceHandler() {
    setValue(newWord.substring(0, value.length - 1));
    return newWord.substring(0, value.length - 1);
  }

  function keyboardButton(letter, index) {
    return (
      <Pressable
        key={index}
        style={({ pressed }) =>
          pressed
            ? [styles.textContainer, styles.pressed, { width: keyWidth }]
            : [styles.textContainer, { width: keyWidth }]
        }
        onPress={() => setNewWord(getNewWord(letter))}
      >
        <Text
          style={[
            styles.textContainer,
            rightLetters.indexOf(letter) >= 0
              ? {
                  backgroundColor: "#B1D481",
                  color: "white",
                }
              : wrongLetters.indexOf(letter) >= 0
              ? {
                  backgroundColor: "#888690",
                  color: "white",
                }
              : null,
          ]}
        >
          {letter}
        </Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.keyboardContainer}>
      <View style={styles.keyboardRow}>
        {row1.map((letter, index) => {
          return keyboardButton(letter, `row1-${index}`);
        })}
      </View>
      <View style={styles.keyboardRow}>
        {row2.map((letter, index) => {
          return keyboardButton(letter, `row2-${index}`);
        })}
      </View>
      <View style={styles.keyboardRow}>
        {row3.map((letter, index) => {
          return keyboardButton(letter, `row3-${index}`);
        })}
        <View style={[styles.textContainer, styles.backspaceContainer]}>
          <Pressable
            style={({ pressed }) =>
              pressed
                ? [
                    styles.textContainer,
                    styles.backspaceContainer,
                    styles.pressed,
                  ]
                : [styles.textContainer, styles.backspaceContainer]
            }
            onPress={() => setNewWord(backspaceHandler())}
          >
            <FontAwesome5 name="backspace" size={20} color="gray" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    color: "gray",
    fontWeight: "bold",
    borderWidth: 2,
    borderColor: "#B4B3B9",
    fontSize: 14,
    height: 50,
    width: 37,
    textAlign: "center",
    margin: 1,
    padding: 10,
    borderRadius: 8,
  },
  backspaceContainer: {
    width: 50,
  },
  keyboardRow: {
    flexDirection: "row",
  },
  keyboardContainer: {
    alignItems: "center",
  },
  keyButton: {
    borderRadius: 8,
  },
  pressed: {
    backgroundColor: "#B4B3B9",
  },
});
