# Pure C++ TurboModule Integration Guide

This library provides a Pure C++ TurboModule. To use it in your React Native app, you need to register the C++ module in your app's native code.

## Android Integration

### 1. Create CMakeLists.txt in your app

Create `android/app/src/main/jni/CMakeLists.txt`:

```cmake
cmake_minimum_required(VERSION 3.13)

# Define the library name here.
project(appmodules)

# This file includes all the necessary to let you build your React Native application
include(${REACT_ANDROID_DIR}/cmake-utils/ReactNative-application.cmake)
```

### 2. Update your app's build.gradle

In `android/app/build.gradle`, add:

```gradle
android {
    // ... other config

    externalNativeBuild {
        cmake {
            path "src/main/jni/CMakeLists.txt"
        }
    }
}
```

### 3. Create OnLoad.cpp in your app

Create `android/app/src/main/jni/OnLoad.cpp`:

```cpp
#include <DefaultComponentsRegistry.h>
#include <DefaultTurboModuleManagerDelegate.h>
#include <autolinking.h>
#include <fbjni/fbjni.h>
#include <react/renderer/componentregistry/ComponentDescriptorProviderRegistry.h>
#include <rncore.h>

// Include the library's C++ module
#include "NativeQRCodeModule.h"

namespace facebook::react {

void registerComponents(
    std::shared_ptr<const ComponentDescriptorProviderRegistry> registry) {
  autolinking_registerProviders(registry);
}

std::shared_ptr<TurboModule> cxxModuleProvider(
    const std::string& name,
    const std::shared_ptr<CallInvoker>& jsInvoker) {

  // Register our library's C++ TurboModule
  if (name == NativeAwesomeLibraryModule::kModuleName) {
    return std::make_shared<NativeAwesomeLibraryModule>(jsInvoker);
  }

  return autolinking_cxxModuleProvider(name, jsInvoker);
}

std::shared_ptr<TurboModule> javaModuleProvider(
    const std::string& name,
    const JavaTurboModule::InitParams& params) {
  return autolinking_ModuleProvider(name, params);
}

} // namespace facebook::react

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return facebook::jni::initialize(vm, [] {
    facebook::react::DefaultTurboModuleManagerDelegate::cxxModuleProvider =
        &facebook::react::cxxModuleProvider;
    facebook::react::DefaultTurboModuleManagerDelegate::javaModuleProvider =
        &facebook::react::javaModuleProvider;
    facebook::react::DefaultComponentsRegistry::
        registerComponentDescriptorsFromEntryPoint =
            &facebook::react::registerComponents;
  });
}
```

## iOS Integration

### 1. Add the shared folder to your iOS project

1. Open your iOS project in Xcode
2. Right-click your project and select "Add files to [ProjectName]"
3. Navigate to `node_modules/react-native-awesome-library/shared` and add it

### 2. Create Module Provider

Create `NativeAwesomeLibraryModuleProvider.h`:

```objc
#import <Foundation/Foundation.h>
#import <ReactCommon/RCTTurboModule.h>

NS_ASSUME_NONNULL_BEGIN

@interface NativeAwesomeLibraryModuleProvider : NSObject <RCTModuleProvider>

@end

NS_ASSUME_NONNULL_END
```

Create `NativeAwesomeLibraryModuleProvider.mm`:

```objc
#import "NativeAwesomeLibraryModuleProvider.h"
#import <ReactCommon/CallInvoker.h>
#import <ReactCommon/TurboModule.h>
#import "NativeQRCodeModule.h"

@implementation NativeAwesomeLibraryModuleProvider

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeAwesomeLibraryModule>(params.jsInvoker);
}

@end
```

## Usage

Once integrated, you can use the module in your React Native code:

```typescript
import AwesomeLibrary from 'react-native-awesome-library';

// Use the C++ TurboModule
const result = AwesomeLibrary.multiply(5, 3);
const qrCode = AwesomeLibrary.encodeQR('Hello World');
```
