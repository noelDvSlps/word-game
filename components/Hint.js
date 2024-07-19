import { StyleSheet, Text, View } from "react-native";

export default function Hint({ hintWord }) {
  const lettersArray = [...hintWord];
  return (
    <View style={styles.container}>
      {lettersArray.map((letter, index) => {
        return (
          <Text style={[styles.textContainer]} maxLength={1} key={index}>
            {letter}
          </Text>
        );
      })}
    </View>
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
    fontSize: 14,
    fontWeight: "bold",
    height: 40,
    width: 40,
    textAlign: "center",
    margin: 5,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#B1D481",
  },
});
