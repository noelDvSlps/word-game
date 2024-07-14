import { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
export default function WordInput({ newWord, onChangeInput }) {
  let lettersArray = [...newWord, ..." ".repeat(5 - newWord.length)];

  function InputHandler(enteredText, i) {
    onChangeInput(newWord, i, enteredText === "" ? " " : enteredText);
  }

  return (
    <>
      <View style={styles.container}>
        {lettersArray.map((letter, index) => {
          return (
            <Text
              style={styles.textContainer}
              maxLength={1}
              key={index}
              onChangeText={(enteredText) => {
                InputHandler(enteredText, index);
              }}
            >
              {letter}
            </Text>
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    // borderColor: "black",
    // borderWidth: 1,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    height: 50,
    width: 50,
    textAlign: "center",
    margin: 5,
    padding: 10,
    borderRadius: 8,
    // borderWidth: 2,
    // borderColor: "white",
    backgroundColor: "#697171",
  },
});
