#pragma once

#include <AwesomeLibrarySpecJSI.h>
#include <memory>
#include <string>

namespace facebook::react {

class NativeAwesomeLibraryModule : public NativeAwesomeLibraryCxxSpec<NativeAwesomeLibraryModule> {
public:
  NativeAwesomeLibraryModule(std::shared_ptr<CallInvoker> jsInvoker);

  double multiply(jsi::Runtime& rt, double a, double b);
  jsi::String encodeQR(jsi::Runtime& rt, jsi::String text);
  jsi::String encodeQRChunk(jsi::Runtime& rt, jsi::String text);
  
  static constexpr auto kModuleName = "AwesomeLibrary";
};

} // namespace facebook::react
