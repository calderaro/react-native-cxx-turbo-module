#include "react-native-qrcode.h"
#include <string>
#include <algorithm>

namespace qrcode {
    // Example function: Convert string to uppercase
    std::string toUpperCase(const char* input) {
        std::string result(input);
        std::transform(result.begin(), result.end(), result.begin(), ::toupper);
        return result;
    }
    
    // Example function: Calculate factorial
    long long factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
    
    // Example function: Check if string is palindrome
    bool isPalindrome(const char* input) {
        std::string str(input);
        std::string reversed = str;
        std::reverse(reversed.begin(), reversed.end());
        return str == reversed;
    }
} 