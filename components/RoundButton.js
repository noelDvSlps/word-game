import { Pressable, StyleSheet, Text, View } from "react-native";

export default function RoundButton({
  children,
  onHandlePress,
  param,
  enable = true,
}) {
  const pressHandler = () => {
    // alert(enable);
    onHandlePress(param);
  };
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [
                enable === true
                  ? {
                      ...styles.buttonRound,
                      ...styles.buttonEnabled,
                    }
                  : {
                      ...styles.buttonRound,
                      ...styles.buttonDisabled,
                      ...styles.pressed,
                    },
              ]
            : [
                enable === true
                  ? { ...styles.buttonRound, ...styles.buttonEnabled }
                  : { ...styles.buttonRound, ...styles.buttonDisabled },
              ]
        }
        onPress={enable ? pressHandler : null}
        // android_ripple={{ color: "black", b }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    overflow: "hidden",
    marginHorizontal: 0,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  buttonRound: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    height: 50,
    width: 50,
  },

  buttonEnabled: {
    backgroundColor: "#B1D481",
    borderRadius: 25,
    // paddingVertical: 8,
    // paddingHorizontal: 16,
    elevation: 2,
    margin: 4,
  },
  buttonDisabled: {
    backgroundColor: "#B4B3B9",
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
    margin: 4,
  },
  pressed: {
    backgroundColor: "#B4B3B9",
    opacity: 0.75,
  },
});
