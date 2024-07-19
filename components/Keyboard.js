import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import deleteLetters from "../helper/helper";
const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const row3 = ["Z", "X", "C", "V", "B", "N", "M"];

export default function Keyboard({
  setNewWord,
  newWord,
  rightLetters,
  wrongLetters,
  keyWidth,
  selectedBox,
  setSelectedBox,
  hintLetters,
  setHintLetters,
}) {
  function arrayToWord(arrayOfLetters) {
    let wordFromArray = "";
    const arrayLength = arrayOfLetters.length;
    for (let i = 0; i < arrayLength; i++) {
      wordFromArray = wordFromArray + arrayOfLetters[i];
    }

    return wordFromArray;
  }

  function getNewWord(letter) {
    const arrayNewWord = [...newWord];
    arrayNewWord[selectedBox] = letter;
    let textValue = arrayToWord(arrayNewWord);
    return textValue;
  }

  function onHandlePressKey(key) {
    selectedBox !== null && setNewWord(getNewWord(key));
    setSelectedBox((previous) =>
      previous + 1 > 4 || previous === null ? null : previous + 1
    );
    if (hintLetters.indexOf(key) >= 0) {
      setHintLetters([...hintLetters.filter((letter) => letter !== key)]);
    }
  }

  function backspaceHandler() {
    const lastLetterIndex =
      [...newWord].filter((letter) => letter !== " ").length - 1;
    setNewWord(deleteLetters(lastLetterIndex, newWord));
    lastLetterIndex >= 0 && setSelectedBox(lastLetterIndex);
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
        onPress={() => onHandlePressKey(letter)}
      >
        <Text
          style={[
            styles.textContainer,
            rightLetters.indexOf(letter) >= 0
              ? {
                  backgroundColor: "#B1D481",
                  color: "white",
                  borderColor: hintLetters.indexOf(letter) >= 0 && "#F4CF52",
                  borderWidth: hintLetters.indexOf(letter) >= 0 ? 2 : 0,
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
      {[row1, row2, row3].map((row, rowIndex) => {
        return (
          <View style={styles.keyboardRow} key={rowIndex}>
            {row.map((letter, index) => {
              return keyboardButton(letter, `row${rowIndex}-${index}`);
            })}
            {rowIndex === 2 && (
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
                  onPress={backspaceHandler}
                >
                  <FontAwesome5 name="backspace" size={20} color="gray" />
                </Pressable>
              </View>
            )}
          </View>
        );
      })}
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
