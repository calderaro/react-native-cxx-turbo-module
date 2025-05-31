package com.awesomelibrary

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class AwesomeLibraryPackage : TurboReactPackage() {
  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
    return null // C++ modules don't need Java implementations
  }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
    return ReactModuleInfoProvider {
      mapOf(
        "AwesomeLibrary" to ReactModuleInfo(
          "AwesomeLibrary",
          "AwesomeLibrary", 
          false, // canOverrideExistingModule
          false, // needsEagerInit
          false, // hasConstants
          true,  // isCxxModule - THIS IS CRITICAL for C++ modules
          true   // isTurboModule
        )
      )
    }
  }
} 