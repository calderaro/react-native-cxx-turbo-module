#include <stdio.h>
#include <stdlib.h>
#include <string>
#include <vector>
#include <cstring>
#include "qrcodegen.hpp"
#include "react-native-qrcode.h"

const int BYTES_PER_PIXEL = 3;
const int FILE_HEADER_SIZE = 14;
const int INFO_HEADER_SIZE = 40;

std::string generateBitmapImage (qrcodegen::QrCode* data);
unsigned char* createBitmapFileHeader(int height, int stride);
unsigned char* createBitmapInfoHeader(int height, int width);
std::string base64_encode(const std::string& in);
std::vector<qrcodegen::QrSegment> getQrSegmentsFromChunk(const char *text);

namespace qrcode {
	double multiply(double a, double b) {
		return a * b;
	}

	std::string encode(const char *text) {
        std::vector<qrcodegen::QrSegment> segs = qrcodegen::QrSegment::makeSegments(text);
        qrcodegen::QrCode qr1 = qrcodegen::QrCode::encodeSegments(
            segs, qrcodegen::QrCode::Ecc::LOW,
            qrcodegen::QrCode::MIN_VERSION,
            qrcodegen::QrCode::MAX_VERSION,
            -1,
            false
        );

		return generateBitmapImage(&qr1);
	}

    std::string encodeChunk(const char *text) {
        std::vector<qrcodegen::QrSegment> segments = getQrSegmentsFromChunk(text);
        qrcodegen::QrCode qrdata = qrcodegen::QrCode::encodeSegments(
            segments,
            qrcodegen::QrCode::Ecc::LOW,
            qrcodegen::QrCode::MIN_VERSION,
            qrcodegen::QrCode::MAX_VERSION,
            -1,
            false
        );
        
        return generateBitmapImage(&qrdata);
    }
}



std::string generateBitmapImage (qrcodegen::QrCode* data)
{
    const int scale = 20;
    const int size = data->getSize() * scale;
    int widthInBytes = size * BYTES_PER_PIXEL;
    unsigned char padding[3] = {0, 0, 0};
    int paddingSize = (4 - (widthInBytes) % 4) % 4;
    int stride = (widthInBytes) + paddingSize;

    unsigned char* image = (unsigned char*)malloc(sizeof(char) * (size * size * 3));
    unsigned char* fileHeader = createBitmapFileHeader(size, stride);
    unsigned char* infoHeader = createBitmapInfoHeader(size, size);


    for (int y = 0; y < size; y++) {
        for (int x = 0; x < size; x++) {
            int i = (size * y + x) * 3;
            unsigned char color = data->getModule(x / scale, y / scale) ? (unsigned char) ( 0 ) : (unsigned char) ( 255 );
            image[i] = color;
            image[i + 1] = color;
            image[i + 2] = color;
        }
    }

    int fullSize = ((size * ((size * 3 ) + paddingSize))) + FILE_HEADER_SIZE + INFO_HEADER_SIZE;
    unsigned char* idata = (unsigned char*)malloc(fullSize);

    memcpy(idata, fileHeader, FILE_HEADER_SIZE);
    memcpy(idata + FILE_HEADER_SIZE, infoHeader, INFO_HEADER_SIZE);

    int offset = FILE_HEADER_SIZE + INFO_HEADER_SIZE;

    for (int i = 0; i < size; i++) {
        memcpy(idata + offset + (i * stride), image + (i * widthInBytes), widthInBytes);
    }


	std::string bmp_str(reinterpret_cast<char*>(idata), fullSize);
    std::string b64 = base64_encode(bmp_str);
    std::string result = "data:image/bmp;base64," + b64;
    free(image);
    free(idata);

	return result;
}

unsigned char* createBitmapFileHeader (int height, int stride)
{
    int fileSize = FILE_HEADER_SIZE + INFO_HEADER_SIZE + (stride * height);

    static unsigned char fileHeader[] = {
        0,0,     /// signature
        0,0,0,0, /// image file size in bytes
        0,0,0,0, /// reserved
        0,0,0,0, /// start of pixel array
    };

    fileHeader[ 0] = (unsigned char)('B');
    fileHeader[ 1] = (unsigned char)('M');
    fileHeader[ 2] = (unsigned char)(fileSize      );
    fileHeader[ 3] = (unsigned char)(fileSize >>  8);
    fileHeader[ 4] = (unsigned char)(fileSize >> 16);
    fileHeader[ 5] = (unsigned char)(fileSize >> 24);
    fileHeader[10] = (unsigned char)(FILE_HEADER_SIZE + INFO_HEADER_SIZE);

    return fileHeader;
}

unsigned char* createBitmapInfoHeader (int height, int width)
{
    static unsigned char infoHeader[] = {
        0,0,0,0, /// header size
        0,0,0,0, /// image width
        0,0,0,0, /// image height
        0,0,     /// number of color planes
        0,0,     /// bits per pixel
        0,0,0,0, /// compression
        0,0,0,0, /// image size
        0,0,0,0, /// horizontal resolution
        0,0,0,0, /// vertical resolution
        0,0,0,0, /// colors in color table
        0,0,0,0, /// important color count
    };

    infoHeader[ 0] = (unsigned char)(INFO_HEADER_SIZE);
    infoHeader[ 4] = (unsigned char)(width      );
    infoHeader[ 5] = (unsigned char)(width >>  8);
    infoHeader[ 6] = (unsigned char)(width >> 16);
    infoHeader[ 7] = (unsigned char)(width >> 24);
    infoHeader[ 8] = (unsigned char)(height      );
    infoHeader[ 9] = (unsigned char)(height >>  8);
    infoHeader[10] = (unsigned char)(height >> 16);
    infoHeader[11] = (unsigned char)(height >> 24);
    infoHeader[12] = (unsigned char)(1);
    infoHeader[14] = (unsigned char)(BYTES_PER_PIXEL*8);

    return infoHeader;
}

std::string base64_encode(const std::string& in) {
    std::string out;

    int val = 0, valb = -6;

    for (unsigned char c : in) {
        val = (val << 8) + c;
        valb += 8;

        while (valb >= 0) {
            out.push_back("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(val >> valb) & 0x3F]);
            valb -= 6;
        }
    }

    if (valb > -6) {
        out.push_back("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[((val << 8) >> (valb + 8)) & 0x3F]);
    }

    while (out.size() % 4) {
        out.push_back('=');
    }

    return out;
}

std::vector<qrcodegen::QrSegment> getQrSegmentsFromChunk(const char *text) {
    std::string str(text);
    std::vector<qrcodegen::QrSegment> segments = qrcodegen::QrSegment::makeSegments(str.substr(0, 12).c_str());
    segments.push_back(qrcodegen::QrSegment::makeNumeric(str.substr(12, str.length()).c_str()));
  
    return segments;
}
