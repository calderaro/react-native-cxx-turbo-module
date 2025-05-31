
#ifndef TPENCODER_H
#define TPENCODER_H

#include <string>
#include <vector>
#include "qrcodegen.hpp"

class TPEncoder
{
private:
    int MAX_SINGLE_JWS_SIZE = 400;
    int MAX_CHUNK_SIZE = 420;
    int SMALLEST_B64_CHAR_CODE = 45;

    std::string generateBitmapImage (qrcodegen::QrCode* data, int scale);
    unsigned char* createBitmapFileHeader (int height, int stride);
    unsigned char* createBitmapInfoHeader (int height, int width);
    std::string base64Encode(const std::string& in);

    std::vector<std::string> getChunks(std::string);
    std::vector<std::vector<std::string>> encodeChunksToSHC(std::vector<std::string>);
    std::vector<std::string> encodeChunksToQR(std::vector<std::vector<std::string>>, int);
    std::vector<std::string> encodeChunksToGIF(std::vector<std::string>);

public:
    std::vector<std::string> compressedCredentailToQr(std::string, int);
};

#endif