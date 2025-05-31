# C++ Development Guide

This guide explains how to develop and integrate C++ code in the react-native-awesome-library.

## Project Structure

```
├── cpp/                          # Shared C++ source code
│   ├── react-native-qrcode.h     # Main header file
│   ├── react-native-qrcode.cpp   # Main implementation
│   ├── qrcodegen.hpp/cpp         # QR code generation library
│   ├── TPEncoder.hpp/cpp         # Token proof encoder
│   └── example.cpp               # Example functions
├── android/
│   ├── CMakeLists.txt            # CMake build configuration
│   └── src/main/cpp/
│       └── cpp-adapter.cpp       # JNI bridge to C++
├── ios/
│   └── AwesomeLibrary.mm         # Objective-C++ bridge
└── src/
    ├── NativeAwesomeLibrary.ts   # TypeScript interface
    └── index.tsx                 # Public API
```

## Adding New C++ Functions

### 1. Add C++ Implementation

Add your function to the appropriate C++ file in the `cpp/` directory:

```cpp
// In cpp/react-native-qrcode.h
namespace qrcode {
    std::string myNewFunction(const char* input);
}

// In cpp/react-native-qrcode.cpp
namespace qrcode {
    std::string myNewFunction(const char* input) {
        // Your implementation here
        return std::string("processed: ") + input;
    }
}
```

### 2. Update Android JNI Bridge

Add JNI binding in `android/src/main/cpp/cpp-adapter.cpp`:

```cpp
extern "C" JNIEXPORT jstring JNICALL
Java_com_awesomelibrary_AwesomeLibraryCpp_nativeMyNewFunction(JNIEnv *env, jobject thiz, jstring input) {
    const char *nativeInput = env->GetStringUTFChars(input, 0);
    std::string result = qrcode::myNewFunction(nativeInput);
    env->ReleaseStringUTFChars(input, nativeInput);
    return env->NewStringUTF(result.c_str());
}
```

### 3. Update Kotlin Bridge

Add the external function declaration in `android/src/main/java/com/awesomelibrary/AwesomeLibraryCpp.kt`:

```kotlin
external fun nativeMyNewFunction(input: String): String
```

### 4. Update Android Module

Add the function to `android/src/main/java/com/awesomelibrary/AwesomeLibraryModule.kt`:

```kotlin
override fun myNewFunction(input: String): String {
    return cppModule.nativeMyNewFunction(input)
}
```

### 5. Update iOS Bridge

Add the function to `ios/AwesomeLibrary.mm`:

```objc
- (NSString *)myNewFunction:(NSString *)input {
    std::string cppInput = [input UTF8String];
    std::string result = qrcode::myNewFunction(cppInput.c_str());
    return [NSString stringWithUTF8String:result.c_str()];
}
```

### 6. Update TypeScript Interface

Add the function to `src/NativeAwesomeLibrary.ts`:

```typescript
export interface Spec extends TurboModule {
  // ... existing functions
  myNewFunction(input: string): string;
}
```

### 7. Export Public API

Add the function to `src/index.tsx`:

```typescript
export function myNewFunction(input: string): string {
  return AwesomeLibrary.myNewFunction(input);
}
```

### 8. Update CMake (if adding new files)

If you add new C++ files, update `android/CMakeLists.txt`:

```cmake
set(CPP_SOURCES
  ../cpp/react-native-qrcode.cpp
  ../cpp/qrcodegen.cpp
  ../cpp/TPEncoder.cpp
  ../cpp/your-new-file.cpp  # Add your new file here
)
```

## Build Configuration

### Android

The Android build uses CMake with the following configuration:

- **C++ Standard**: C++17
- **Supported ABIs**: arm64-v8a, armeabi-v7a, x86, x86_64
- **Build Tool**: CMake 3.18.1+

### iOS

The iOS build uses CocoaPods with:

- **C++ Standard**: C++17
- **Standard Library**: libc++
- **Compiler Flags**: Folly compatibility flags

## Best Practices

### Memory Management

- Always release JNI string references on Android
- Use RAII principles in C++ code
- Avoid memory leaks by proper cleanup

### Error Handling

```cpp
// Good: Handle errors gracefully
std::string safeFunction(const char* input) {
    if (!input) {
        return ""; // or throw appropriate exception
    }
    // ... implementation
}
```

### String Handling

```cpp
// Android JNI pattern
extern "C" JNIEXPORT jstring JNICALL
Java_..._nativeFunction(JNIEnv *env, jobject thiz, jstring input) {
    const char *nativeInput = env->GetStringUTFChars(input, 0);
    std::string result = yourFunction(nativeInput);
    env->ReleaseStringUTFChars(input, nativeInput);  // Important!
    return env->NewStringUTF(result.c_str());
}
```

### Performance Considerations

- Minimize string conversions between native and C++
- Use const references for large objects
- Consider async operations for heavy computations

## Testing C++ Code

### Unit Testing

Create unit tests for your C++ functions:

```cpp
// In cpp/tests/test_myfunction.cpp
#include "react-native-qrcode.h"
#include <cassert>

void testMyNewFunction() {
    std::string result = qrcode::myNewFunction("test");
    assert(result == "processed: test");
}
```

### Integration Testing

Test the full bridge from JavaScript to C++:

```javascript
// In src/__tests__/index.test.ts
import { myNewFunction } from '../index';

test('myNewFunction works correctly', () => {
  const result = myNewFunction('test');
  expect(result).toBe('processed: test');
});
```

## Debugging

### Android

- Use `adb logcat` to see native logs
- Add `__android_log_print` for debugging
- Use Android Studio's native debugger

### iOS

- Use Xcode's debugger
- Add `NSLog` statements for debugging
- Use LLDB for C++ debugging

## Common Issues

### Build Errors

1. **CMake not found**: Ensure CMake is installed and version is 3.18.1+
2. **NDK issues**: Check Android NDK installation
3. **Header not found**: Verify include paths in CMakeLists.txt

### Runtime Errors

1. **JNI crashes**: Check string handling and memory management
2. **Symbol not found**: Ensure all functions are properly exported
3. **Type mismatches**: Verify parameter types match between layers

## Performance Tips

1. **Minimize JNI calls**: Batch operations when possible
2. **Use appropriate data types**: Prefer primitive types over objects
3. **Cache frequently used objects**: Avoid repeated conversions
4. **Profile your code**: Use platform-specific profiling tools

## Resources

- [React Native C++ Guide](https://reactnative.dev/docs/native-modules-android#c-support)
- [Android NDK Documentation](https://developer.android.com/ndk)
- [iOS Objective-C++ Guide](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/WorkingwithBlocks/WorkingwithBlocks.html) 