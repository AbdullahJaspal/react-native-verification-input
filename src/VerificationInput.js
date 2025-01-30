"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
var width = react_native_1.Dimensions.get("window").width;
var AnimatedTextInput = react_native_reanimated_1.default.createAnimatedComponent(react_native_1.TextInput);
var VerificationInput = function (_a) {
    var _b = _a.length, length = _b === void 0 ? 6 : _b, onCodeComplete = _a.onCodeComplete, error = _a.error, value = _a.value, _c = _a.animationEnabled, animationEnabled = _c === void 0 ? false : _c, inputStyle = _a.inputStyle, titleStyle = _a.titleStyle, containerStyle = _a.containerStyle;
    var _d = (0, react_1.useState)(value ? value.split("") : Array(length).fill("")), code = _d[0], setCode = _d[1];
    var inputRefs = (0, react_1.useRef)([]);
    // Animation values for each input
    var inputAnimations = Array(length)
        .fill(0)
        .map(function () { return ({
        scale: (0, react_native_reanimated_1.useSharedValue)(1),
        rotate: (0, react_native_reanimated_1.useSharedValue)(0),
        translateY: (0, react_native_reanimated_1.useSharedValue)(0),
        glow: (0, react_native_reanimated_1.useSharedValue)(0),
    }); });
    // Separator animation
    var separatorWidth = (0, react_native_reanimated_1.useSharedValue)(15);
    var separatorOpacity = (0, react_native_reanimated_1.useSharedValue)(1);
    var animateInput = function (index) {
        if (!animationEnabled)
            return;
        var animations = inputAnimations[index];
        // Reset animations
        animations.scale.value = 1;
        animations.rotate.value = 0;
        animations.translateY.value = 0;
        animations.glow.value = 0;
        // Sequence of animations
        animations.scale.value = (0, react_native_reanimated_1.withSequence)((0, react_native_reanimated_1.withSpring)(1.2, { damping: 2 }), (0, react_native_reanimated_1.withSpring)(1));
        animations.rotate.value = (0, react_native_reanimated_1.withSequence)((0, react_native_reanimated_1.withTiming)(-0.1, { duration: 100 }), (0, react_native_reanimated_1.withTiming)(0.1, { duration: 100 }), (0, react_native_reanimated_1.withTiming)(0, { duration: 100 }));
        animations.translateY.value = (0, react_native_reanimated_1.withSequence)((0, react_native_reanimated_1.withSpring)(-5), (0, react_native_reanimated_1.withSpring)(0));
        animations.glow.value = (0, react_native_reanimated_1.withSequence)((0, react_native_reanimated_1.withTiming)(1, { duration: 300 }), (0, react_native_reanimated_1.withDelay)(300, (0, react_native_reanimated_1.withTiming)(0, { duration: 300 })));
        // Animate separators if applicable
        if ((index + 1) % 3 === 0 && index + 1 < length) {
            separatorWidth.value = (0, react_native_reanimated_1.withSequence)((0, react_native_reanimated_1.withSpring)(25), (0, react_native_reanimated_1.withDelay)(200, (0, react_native_reanimated_1.withSpring)(15)));
            separatorOpacity.value = (0, react_native_reanimated_1.withSequence)((0, react_native_reanimated_1.withTiming)(0.5), (0, react_native_reanimated_1.withDelay)(200, (0, react_native_reanimated_1.withTiming)(1)));
        }
    };
    var getInputStyle = function (index) {
        var animations = inputAnimations[index];
        return (0, react_native_reanimated_1.useAnimatedStyle)(function () {
            var glowStrength = (0, react_native_reanimated_1.interpolate)(animations.glow.value, [0, 1], [0, 15], react_native_reanimated_1.Extrapolate.CLAMP);
            return {
                transform: [
                    { scale: animations.scale.value },
                    { rotate: "".concat(animations.rotate.value, "rad") },
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
    var separatorStyle = (0, react_native_reanimated_1.useAnimatedStyle)(function () { return ({
        width: separatorWidth.value,
        opacity: separatorOpacity.value,
    }); });
    var handleChange = function (value, index) {
        var _a, _b;
        var newCode = __spreadArray([], code, true);
        newCode[index] = value;
        setCode(newCode);
        if (value !== "") {
            animateInput(index);
            if (index < length - 1) {
                (_a = inputRefs.current[index + 1]) === null || _a === void 0 ? void 0 : _a.focus();
            }
        }
        else if (index > 0) {
            (_b = inputRefs.current[index - 1]) === null || _b === void 0 ? void 0 : _b.focus();
        }
        if (newCode.every(function (digit) { return digit !== ""; })) {
            onCodeComplete === null || onCodeComplete === void 0 ? void 0 : onCodeComplete(newCode.join(""));
            // Celebrate animation when code is complete
            newCode.forEach(function (_, i) {
                setTimeout(function () { return animateInput(i); }, i * 100);
            });
        }
    };
    // Error animation
    var errorShake = (0, react_native_reanimated_1.useSharedValue)(0);
    (0, react_1.useEffect)(function () {
        if (error) {
            errorShake.value = (0, react_native_reanimated_1.withSequence)((0, react_native_reanimated_1.withTiming)(-10, { duration: 100 }), (0, react_native_reanimated_1.withTiming)(10, { duration: 100 }), (0, react_native_reanimated_1.withTiming)(-10, { duration: 100 }), (0, react_native_reanimated_1.withTiming)(0, { duration: 100 }));
        }
    }, [error, errorShake]); // Added errorShake to dependencies
    var containerAnimatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(function () { return ({
        transform: [{ translateX: errorShake.value }],
    }); });
    return (<react_native_reanimated_1.default.View style={[styles.container, containerStyle, containerAnimatedStyle]}>
      <react_native_1.Text style={[
            {
                fontWeight: "bold",
                marginVertical: 10,
                fontSize: 20,
                color: "orange",
            },
            titleStyle,
        ]}>
        Verification code
      </react_native_1.Text>
      <react_native_1.View style={styles.verificationContainer}>
        {Array.from({ length: length }).map(function (_, index) { return (<react_1.default.Fragment key={index}>
            <AnimatedTextInput ref={function (ref) {
                inputRefs.current[index] = ref;
            }} style={[
                styles.verificationInput,
                {
                    borderColor: error ? "red" : "grey",
                    fontSize: 24,
                },
                getInputStyle(index),
                inputStyle,
            ]} maxLength={1} keyboardType="numeric" onChangeText={function (value) { return handleChange(value, index); }} value={code[index]}/>
            {(index + 1) % 3 === 0 && index + 1 < length && (<react_native_reanimated_1.default.View style={[styles.separator, separatorStyle]}/>)}
          </react_1.default.Fragment>); })}
      </react_native_1.View>
      {error && (<react_native_reanimated_1.default.View style={styles.errorContainer}>
          <react_native_1.Text>{error}</react_native_1.Text>
        </react_native_reanimated_1.default.View>)}
    </react_native_reanimated_1.default.View>);
};
var styles = react_native_1.StyleSheet.create({
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
exports.default = VerificationInput;
