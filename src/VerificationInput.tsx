import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewProps,
  Dimensions,
  TextProps,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withDelay,
  withTiming,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

interface VerificationInputProps {
  length?: number;
  onCodeComplete?: (code: string) => void;
  error?: string;
  value?: string;
  animationEnabled?: boolean;
  inputStyle?: TextProps["style"];
  titleStyle?: TextProps["style"];
  containerStyle?: ViewProps["style"];
}

const { width } = Dimensions.get("window");
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const VerificationInput: React.FC<VerificationInputProps> = ({
  length = 6,
  onCodeComplete,
  error,
  value,
  animationEnabled = false,
  inputStyle,
  titleStyle,
  containerStyle,
}) => {
  const [code, setCode] = useState<string[]>(
    value ? value.split("") : Array(length).fill("")
  );
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Animation values for each input
  const inputAnimations = Array(length)
    .fill(0)
    .map(() => ({
      scale: useSharedValue(1),
      rotate: useSharedValue(0),
      translateY: useSharedValue(0),
      glow: useSharedValue(0),
    }));

  // Separator animation
  const separatorWidth = useSharedValue(15);
  const separatorOpacity = useSharedValue(1);

  const animateInput = (index: number) => {
    if (!animationEnabled) return;
    const animations = inputAnimations[index];

    // Reset animations
    animations.scale.value = 1;
    animations.rotate.value = 0;
    animations.translateY.value = 0;
    animations.glow.value = 0;

    // Sequence of animations
    animations.scale.value = withSequence(
      withSpring(1.2, { damping: 2 }),
      withSpring(1)
    );

    animations.rotate.value = withSequence(
      withTiming(-0.1, { duration: 100 }),
      withTiming(0.1, { duration: 100 }),
      withTiming(0, { duration: 100 })
    );

    animations.translateY.value = withSequence(withSpring(-5), withSpring(0));

    animations.glow.value = withSequence(
      withTiming(1, { duration: 300 }),
      withDelay(300, withTiming(0, { duration: 300 }))
    );

    // Animate separators if applicable
    if ((index + 1) % 3 === 0 && index + 1 < length) {
      separatorWidth.value = withSequence(
        withSpring(25),
        withDelay(200, withSpring(15))
      );
      separatorOpacity.value = withSequence(
        withTiming(0.5),
        withDelay(200, withTiming(1))
      );
    }
  };

  const getInputStyle = (index: number) => {
    const animations = inputAnimations[index];

    return useAnimatedStyle(() => {
      const glowStrength = interpolate(
        animations.glow.value,
        [0, 1],
        [0, 15],
        Extrapolate.CLAMP
      );

      return {
        transform: [
          { scale: animations.scale.value },
          { rotate: `${animations.rotate.value}rad` },
          { translateY: animations.translateY.value },
        ],
        shadowColor: "orange",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: animations.glow.value,
        shadowRadius: glowStrength,
        elevation: glowStrength,
      };
    });
  };

  const separatorStyle = useAnimatedStyle(() => ({
    width: separatorWidth.value,
    opacity: separatorOpacity.value,
  }));

  const handleChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value !== "") {
      animateInput(index);
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (newCode.every((digit) => digit !== "")) {
      onCodeComplete?.(newCode.join(""));
      // Celebrate animation when code is complete
      newCode.forEach((_, i) => {
        setTimeout(() => animateInput(i), i * 100);
      });
    }
  };

  // Error animation
  const errorShake = useSharedValue(0);

  useEffect(() => {
    if (error) {
      errorShake.value = withSequence(
        withTiming(-10, { duration: 100 }),
        withTiming(10, { duration: 100 }),
        withTiming(-10, { duration: 100 }),
        withTiming(0, { duration: 100 })
      );
    }
  }, [error, errorShake]); // Added errorShake to dependencies

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: errorShake.value }],
  }));

  return (
    <Animated.View
      style={[styles.container, containerStyle, containerAnimatedStyle]}
    >
      <Text
        style={[
          {
            fontWeight: "bold",
            marginVertical: 10,
            fontSize: 20,
            color: "orange",
          },
          titleStyle,
        ]}
      >
        Verification code
      </Text>
      <View style={styles.verificationContainer}>
        {Array.from({ length }).map((_, index) => (
          <React.Fragment key={index}>
            <AnimatedTextInput
              ref={(ref: TextInput | null) => {
                inputRefs.current[index] = ref;
              }}
              style={[
                styles.verificationInput,
                {
                  borderColor: error ? "red" : "grey",
                  fontSize: 24,
                },
                getInputStyle(index),
                inputStyle,
              ]}
              maxLength={1}
              keyboardType="numeric"
              onChangeText={(value: string) => handleChange(value, index)}
              value={code[index]}
            />
            {(index + 1) % 3 === 0 && index + 1 < length && (
              <Animated.View style={[styles.separator, separatorStyle]} />
            )}
          </React.Fragment>
        ))}
      </View>
      {error && (
        <Animated.View style={styles.errorContainer}>
          <Text>{error}</Text>
        </Animated.View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  verificationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  verificationInput: {
    width: 45,
    height: 53,
    borderWidth: 1,
    borderRadius: 4,
    textAlign: "center",
    fontSize: 18,
    borderColor: "#939090",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  separator: {
    height: 4,
    backgroundColor: "black",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginTop: 12,
    alignSelf: "flex-start",
  },
});

export default VerificationInput;
