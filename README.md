# React Native Verification Input

## Overview
`react-native-verification-input` is a customizable and animated verification code input component for React Native. It supports smooth animations using `react-native-reanimated`, customizable styles, and an optional error indication.

## Features
- Customizable length of the verification code input
- Animated input fields for enhanced user experience
- Error handling with shaking animation
- Separator styling for better readability
- Fully customizable styles

## Installation

### Prerequisites
Ensure you have `react-native-reanimated` installed in your project:
```sh
npm install react-native-reanimated
```
Or using Yarn:
```sh
yarn add react-native-reanimated
```

### Install the package
```sh
npm install react-native-verification-input
```
Or using Yarn:
```sh
yarn add react-native-verification-input
```

## Usage

### Basic Example
```tsx
import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import VerificationInput from 'react-native-verification-input';
import { Button } from './src/components';

const App = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 22 }}>
        OTP VERIFICATION SCREEN
      </Text>
      <View style={{ width: '85%' }}>
        <VerificationInput
          length={6}
          value={code}
          onCodeComplete={(code) => setCode(code)}
          error={error}
          animationEnabled
        />
      </View>
      <Button
        width={'85%'}
        title="Continue"
        textColor="white"
        onPress={() => {}}
      />
    </SafeAreaView>
  );
};

export default App;
```

## Props
| Prop Name       | Type            | Default | Description |
|----------------|----------------|---------|-------------|
| `length`       | `number`        | `6`     | Number of input fields |
| `onCodeComplete` | `(code: string) => void` | `undefined` | Callback function when code is completed |
| `error`        | `string`        | `''`    | Displays an error message and triggers shake animation |
| `value`        | `string`        | `''`    | Controlled value for the input fields |
| `animationEnabled` | `boolean`   | `false` | Enables animations on input |
| `inputStyle`   | `TextStyle`     | `undefined` | Custom styling for input fields |
| `titleStyle`   | `TextStyle`     | `undefined` | Custom styling for the title text |
| `containerStyle` | `ViewStyle`   | `undefined` | Custom styling for the outer container |

## Customization
You can customize the styles by passing the `inputStyle`, `titleStyle`, and `containerStyle` props. Example:
```tsx
<VerificationInput
  length={6}
  inputStyle={{ borderColor: 'blue', fontSize: 20 }}
  titleStyle={{ color: 'blue', fontSize: 24 }}
  containerStyle={{ marginVertical: 20 }}
  animationEnabled
/>
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

🚀 **Enjoy using `react-native-verification-input`!**

