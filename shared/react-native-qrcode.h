#ifndef QRCODE_H
#define QRCODE_H
#include <string>

namespace qrcode {
  double multiply(double a, double b);
  std::string encode(const char *text);
  std::string encodeChunk(const char *text);
}

#endif /* QRCODE_H */
