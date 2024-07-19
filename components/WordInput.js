import { StyleSheet, Text, View } from "react-native";
import deleteLetters from "../helper/helper";
export default function WordInput({
  newWord,
  onChangeInput,
  setSelectedBox,
  selectedBox,
  setNewWord,
}) {
  let lettersArray = [...newWord];

  function InputHandler(enteredText, i) {
    onChangeInput(newWord, i, enteredText === "" ? " " : enteredText);
  }

  function onHandlePressKey(index) {
    if (newWord.trim().length < index) {
      return;
    }
    setSelectedBox(index);
    const n = deleteLetters(index, newWord);
    setNewWord(n);
  }

  return (
    <>
      <View style={styles.container}>
        {lettersArray.map((letter, index) => {
          return (
            <Text
              style={[
                styles.textContainer,
                selectedBox === index && styles.selected,
                // hints.indexOf(index) >= 0 && { backgroundColor: "#B1D481" },
              ]}
              maxLength={1}
              key={index}
              onChangeText={(enteredText) => {
                InputHandler(enteredText, index);
              }}
              onPress={() => onHandlePressKey(index)}
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

    backgroundColor: "#697171",
  },
  selected: {
    borderWidth: 2,
    backgroundColor: "#D3D3D3",
    color: "black",
    borderColor: "#697171",
  },
  hint: {
    backgroundColor: "#B1D481",
  },
});
