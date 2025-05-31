#import "AwesomeLibrary.h"
#include "../cpp/react-native-qrcode.h"

@implementation AwesomeLibrary
RCT_EXPORT_MODULE()

- (NSNumber *)multiply:(double)a b:(double)b {
    NSNumber *result = @(qrcode::multiply(a, b));
    return result;
}

- (NSString *)encodeQR:(NSString *)text {
    std::string cppText = [text UTF8String];
    std::string result = qrcode::encode(cppText.c_str());
    return [NSString stringWithUTF8String:result.c_str()];
}

- (NSString *)encodeQRChunk:(NSString *)text {
    std::string cppText = [text UTF8String];
    std::string result = qrcode::encodeChunk(cppText.c_str());
    return [NSString stringWithUTF8String:result.c_str()];
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeAwesomeLibrarySpecJSI>(params);
}

@end
