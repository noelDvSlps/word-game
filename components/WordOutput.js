import { StyleSheet, Text, View } from "react-native";

export default function WordOutput({ word, wordToGuess }) {
  // console.log(wordToGuess);
  let rightCharIndexes = [];
  let wrongCharIndexes = [];
  let wrongPositionIndexes = [];

  const charsWordToGuess = [...wordToGuess];
  const charsWords = [...word.word];

  function getRightPositionIndexes() {
    charsWords.map((char, index) => {
      if (charsWordToGuess[index] === char) {
        rightCharIndexes.push(index);
        charsWordToGuess[index] = "*";
      }
    });
  }

  function getWrongPositionIndexes() {
    charsWords.map((char, index) => {
      if (rightCharIndexes.indexOf(index) >= 0) {
        return;
      }
      if (charsWordToGuess[index] !== char) {
        const charPosition = charsWordToGuess.indexOf(char);
        if (charPosition >= 0) {
          wrongPositionIndexes.push(index);
          charsWordToGuess[charPosition] = "*";
        }
      }
    });
  }

  getRightPositionIndexes();
  getWrongPositionIndexes();

  return (
    <View style={styles.container}>
      {[...word.word].map((letter, index) => {
        return (
          <Text
            style={[
              styles.textContainer,
              {
                backgroundColor:
                  rightCharIndexes.indexOf(index) >= 0
                    ? "#B1D481"
                    : wrongPositionIndexes.indexOf(index) >= 0
                    ? "#F4CF52"
                    : "#888690",
              },
            ]}
            key={index}
          >
            {letter}
          </Text>
        );
      })}
      {/* <Text style={styles.textContainer}>{word.status}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: 18,
    height: 50,
    width: 50,
    textAlign: "center",
    borderRadius: 8,
    margin: 5,
    textAlignVertical: "center",
  },
});
