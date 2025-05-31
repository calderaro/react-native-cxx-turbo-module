# react-native-awesome-library

A React Native library with C++ integration using Turbo Modules for high-performance string operations.

## Installation

```sh
npm install react-native-awesome-library
```

## Features

- **C++ Integration**: Native C++ implementation for string operations
- **Turbo Module**: Uses React Native's new Turbo Module architecture
- **Cross-platform**: Works on both iOS and Android

## Usage

```js
import { reverseString } from 'react-native-awesome-library';

// Reverse a string using native C++ implementation
const result = reverseString('Hello World');
console.log(result); // 'dlroW olleH'
```

## API

### `reverseString(input: string): string`

Reverses the input string using a native C++ implementation.

**Parameters:**

- `input` (string): The string to reverse

**Returns:**

- (string): The reversed string

## Architecture

The library uses a Turbo Module with shared C++ code between iOS and Android platforms:

### C++ Implementation

- **QRCodeModule.cpp/h**: Contains the native string reversal implementation
- **Turbo Module Spec**: TypeScript interface defined in `NativeQRCodeModule.ts`

### Platform Integration

- **iOS**: Objective-C++ bridge in `ios/AwesomeLibrary.mm`
- **Android**: Kotlin integration in `android/src/main/java/com/awesomelibrary/`
- **CMake**: Android build configuration in `android/CMakeLists.txt`

## Development

### Building

The C++ code is automatically compiled when building the React Native project. No additional setup is required.

### Adding New Functions

1. Add your C++ function to `cpp/QRCodeModule.cpp` and `cpp/QRCodeModule.h`
2. Update the TypeScript interface in `src/NativeQRCodeModule.ts`
3. Export the function in `src/index.tsx`
4. Build and test on both platforms

## Example

Check out the example app in the `example/` directory to see the library in action.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
