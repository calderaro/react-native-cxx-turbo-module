package com.awesomelibrary

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

// Commented out Java TurboModule since we're using C++ TurboModule instead
/*
@ReactModule(name = AwesomeLibraryModule.NAME)
class AwesomeLibraryModule(reactContext: ReactApplicationContext) :
  NativeAwesomeLibrarySpec(reactContext) {

  private val cppModule = AwesomeLibraryCpp()

  override fun getName(): String {
    return NAME
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  override fun multiply(a: Double, b: Double): Double {
    return cppModule.nativeMultiply(a, b)
  }

  override fun encodeQR(text: String): String {
    return cppModule.nativeEncodeQR(text)
  }

  override fun encodeQRChunk(text: String): String {
    return cppModule.nativeEncodeQRChunk(text)
  }

  companion object {
    const val NAME = "AwesomeLibrary"
  }
}
*/
