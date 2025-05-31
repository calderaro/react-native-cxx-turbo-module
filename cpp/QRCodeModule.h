
#pragma once

#include <AwesomeLibrarySpecJSI.h>

#include <memory>
#include <string>

namespace facebook::react {

class QRCodeModule : public NativeQRCodeModuleCxxSpec<QRCodeModule> {
public:
  QRCodeModule(std::shared_ptr<CallInvoker> jsInvoker);

  std::string reverseString(jsi::Runtime& rt, std::string input);
};

} // namespace facebook::react