#include "QRCodeModule.h"

namespace facebook::react {

QRCodeModule::QRCodeModule(std::shared_ptr<CallInvoker> jsInvoker) : NativeQRCodeModuleCxxSpec(std::move(jsInvoker)) {}

std::string QRCodeModule::reverseString(jsi::Runtime& rt, std::string input) {
  return std::string(input.rbegin(), input.rend());
}

}