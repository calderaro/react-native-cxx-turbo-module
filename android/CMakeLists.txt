cmake_minimum_required(VERSION 3.4.1)
project(AwesomeLibrary)

set (CMAKE_VERBOSE_MAKEFILE ON)

add_library(
    react-native-awesome-library
    STATIC
    ../cpp/QRCodeModule.cpp
)

# Specifies a path to native header files.
target_include_directories(
    react-native-awesome-library
    PUBLIC
    ../cpp
)

target_link_libraries(
    react-native-awesome-library
    jsi
    reactnative
    react_codegen_AwesomeLibrarySpec
)