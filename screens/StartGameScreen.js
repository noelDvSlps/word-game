import { StyleSheet, Text, TextInput, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";

function StartGameScreen({ startGame, rules, title }) {
  const onHandlePressStart = () => {
    startGame();
  };

  return (
    <View style={styles.screenContainer}>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ color: "white", fontSize: 20 }}>{title}</Text>
      </View>
      <View>
        <Text style={{ color: "white", fontSize: 16, textAlign: "center" }}>
          {rules}
        </Text>
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
  screenContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: "#777876",
    borderRadius: 8,
  },

  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
