import { StyleSheet, Text, TextInput, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";

function StartGameScreen({ startGame, rules, title }) {
  const onHandlePressStart = () => {
    startGame();
  };

  return (
    <View style={styles.inputContainer}>
      <View>
        <Text style={{ color: "white" }}>{title}</Text>
      </View>
      <View>
        <Text style={{ color: "white" }}>{rules}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onHandlePress={onHandlePressStart} param={null}>
            Start
          </PrimaryButton>
        </View>
        {/* <View style={styles.buttonContainer}>
          <PrimaryButton>QUIT</PrimaryButton>
        </View> */}
      </View>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: "#3b021f",
    borderRadius: 8,
  },

  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
