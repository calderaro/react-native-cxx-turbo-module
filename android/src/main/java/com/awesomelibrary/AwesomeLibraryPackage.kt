package com.awesomelibrary

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import java.util.HashMap

class AwesomeLibraryPackage : TurboReactPackage() {
  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
    // For C++ TurboModules, return null - they are handled by the C++ module provider
    return null
  }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
    return ReactModuleInfoProvider {
      val moduleInfos: MutableMap<String, ReactModuleInfo> = HashMap()
      
      // Register the C++ TurboModule
      moduleInfos["AwesomeLibrary"] = ReactModuleInfo(
        "AwesomeLibrary",
        "AwesomeLibrary",
        false,  // canOverrideExistingModule
        false,  // needsEagerInit
        false,  // hasConstants
        true,   // isCxxModule <- This is key for C++ modules!
        true    // isTurboModule
      )
      
      moduleInfos
    }
  }
}
