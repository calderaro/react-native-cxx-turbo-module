package com.awesomelibrary

class AwesomeLibraryCpp {
    companion object {
        init {
            System.loadLibrary("awesomelibrary")
        }
    }

    external fun nativeMultiply(a: Double, b: Double): Double
    external fun nativeEncodeQR(text: String): String
    external fun nativeEncodeQRChunk(text: String): String
} 