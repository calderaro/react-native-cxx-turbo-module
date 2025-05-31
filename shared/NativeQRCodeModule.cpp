#include "NativeQRCodeModule.h"
#include <string>

namespace facebook::react {

NativeAwesomeLibraryModule::NativeAwesomeLibraryModule(std::shared_ptr<CallInvoker> jsInvoker)
    : NativeAwesomeLibraryCxxSpec(std::move(jsInvoker)) {}

double NativeAwesomeLibraryModule::multiply(jsi::Runtime& rt, double a, double b) {
    return a * b;
}

jsi::String NativeAwesomeLibraryModule::encodeQR(jsi::Runtime& rt, jsi::String text) {
    // Convert jsi::String to std::string
    std::string input = text.utf8(rt);
    
    // For now, just return the input text with QR prefix (placeholder implementation)
    // TODO: Implement actual QR encoding logic
    std::string result = "QR:" + input;
    
    return jsi::String::createFromUtf8(rt, result);
}

jsi::String NativeAwesomeLibraryModule::encodeQRChunk(jsi::Runtime& rt, jsi::String text) {
    // Convert jsi::String to std::string
    std::string input = text.utf8(rt);
    
    // For now, just return the input text with QRChunk prefix (placeholder implementation)
    // TODO: Implement actual QR chunk encoding logic
    std::string result = "QRChunk:" + input;
    
    return jsi::String::createFromUtf8(rt, result);
}

} // namespace facebook::react 