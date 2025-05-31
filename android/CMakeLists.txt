cmake_minimum_required(VERSION 3.13)

# Define the library name here.
project(awesomelibrary)

set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_CXX_STANDARD 17)

# Only build the C++ code if the codegen target is available
# This ensures we only build when consumed by an app, not standalone
if(TARGET react_codegen_AwesomeLibrarySpec)
    # Add the library
    add_library(
            ${CMAKE_PROJECT_NAME}
            SHARED
            ../shared/NativeQRCodeModule.cpp
    )

    # Include directories for our shared code
    target_include_directories(${CMAKE_PROJECT_NAME} PUBLIC ../shared)
    
    # Link with the generated codegen object library
    target_link_libraries(${CMAKE_PROJECT_NAME} react_codegen_AwesomeLibrarySpec)
else()
    # Create a dummy target when codegen is not available
    add_library(${CMAKE_PROJECT_NAME} INTERFACE)
    message(STATUS "AwesomeLibrary: Codegen target not available, creating interface library")
endif()

