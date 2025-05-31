# react-native-awesome-library

awesome library for react native baby

## Installation

```sh
npm install react-native-awesome-library
```

## C++ Support

This library includes C++ support for high-performance operations, particularly QR code generation. The C++ code is automatically compiled for both iOS and Android platforms.

### Features

- **Cross-platform C++ integration**: Shared C++ code between iOS and Android
- **QR Code Generation**: High-performance QR code encoding with base64 bitmap output
- **Chunked QR Encoding**: Support for specialized QR code chunk encoding
- **CMake build system**: Proper C++ compilation configuration for Android
- **iOS C++ integration**: Seamless Objective-C++ bridging

## Usage

```js
import { multiply, encodeQR, encodeQRChunk } from 'react-native-awesome-library';

// Basic multiplication (demonstrates C++ integration)
const result = multiply(3, 7);

// Generate QR code as base64 bitmap
const qrCodeBitmap = encodeQR('Hello, World!');

// Generate QR code with chunk encoding
const qrCodeChunk = encodeQRChunk('1234567890ABCDEF');
```

## C++ Architecture

The library uses a shared C++ codebase located in the `cpp/` directory:

- `react-native-qrcode.cpp/h`: Main QR code functionality
- `qrcodegen.cpp/hpp`: QR code generation library
- `TPEncoder.cpp/hpp`: Token proof encoding utilities

### Android Integration

- CMake build system (`android/CMakeLists.txt`)
- JNI bindings (`android/src/main/cpp/cpp-adapter.cpp`)
- Kotlin bridge (`android/src/main/java/com/awesomelibrary/AwesomeLibraryCpp.kt`)

### iOS Integration

- Objective-C++ bridge (`ios/AwesomeLibrary.mm`)
- CocoaPods configuration with C++17 support

## Development

### Building

The C++ code is automatically compiled when building the React Native project. No additional setup is required.

### Adding C++ Functions

1. Add your C++ function to the appropriate file in `cpp/`
2. Update the JNI bindings in `android/src/main/cpp/cpp-adapter.cpp`
3. Update the Kotlin bridge in `android/src/main/java/com/awesomelibrary/AwesomeLibraryCpp.kt`
4. Update the iOS bridge in `ios/AwesomeLibrary.mm`
5. Update the TypeScript interface in `src/NativeAwesomeLibrary.ts`
6. Export the function in `src/index.tsx`

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
