import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PrimaryButton({
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
                      ...styles.buttonEnabled,
                    }
                  : { ...styles.buttonDisabled, ...styles.pressed },
              ]
            : [enable === true ? styles.buttonEnabled : styles.buttonDisabled]
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
  },
  // buttonInnerContainer: {
  //   backgroundColor: "#72063c",
  //   borderRadius: 25,
  //   paddingVertical: 8,
  //   paddingHorizontal: 16,
  //   elevation: 2,
  //   margin: 4,
  // },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  buttonEnabled: {
    backgroundColor: "#B1D481",
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 16,
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

    // opacity: 0.75,
  },
});
