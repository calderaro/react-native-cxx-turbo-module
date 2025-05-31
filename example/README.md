# Awesome Library Example App

This example app demonstrates the C++ native library integration with React Native.

## Features Demonstrated

### 🧮 C++ Multiplication
- **Function**: `multiply(a: number, b: number): number`
- **Description**: Demonstrates basic C++ function integration
- **Usage**: Enter two numbers and see the result calculated by C++ code

### 📱 QR Code Generator  
- **Function**: `encodeQR(text: string): string`
- **Description**: High-performance QR code generation using C++ QR code library
- **Output**: Base64-encoded bitmap image that can be displayed as an image
- **Usage**: Enter any text and generate a QR code

### 🔗 Chunk QR Encoder
- **Function**: `encodeQRChunk(text: string): string`  
- **Description**: Specialized QR code encoding for chunked data
- **Output**: Base64-encoded bitmap image optimized for chunk encoding
- **Usage**: Enter data (like hex strings) for specialized QR encoding

## How to Run

1. **Install dependencies**:
   ```bash
   yarn install
   # or
   npm install
   ```

2. **Install iOS dependencies** (iOS only):
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Run the app**:
   ```bash
   # iOS
   yarn ios
   # or
   npm run ios
   
   # Android  
   yarn android
   # or
   npm run android
   ```

## App Sections

### 1. Header
- Shows app title and subtitle
- Indicates this is a C++ native functions demo

### 2. C++ Multiplication Section
- Two number input fields
- Calculate button to trigger C++ multiplication
- Result display showing the calculation

### 3. QR Code Generator Section
- Text input for QR code content
- Generate button to create QR code
- Displays the generated QR code image
- Shows the encoded text below the image

### 4. Chunk QR Encoder Section  
- Text input for chunk data
- Generate button for chunk QR encoding
- Displays the generated chunk QR code
- Shows the encoded data below the image

### 5. Info Section
- Explains the technologies used
- Lists the C++ integration features

## UI Features

- **Modern Design**: Clean, card-based interface with shadows
- **Interactive Controls**: Responsive buttons and input fields
- **Error Handling**: Alerts for invalid inputs or errors
- **Loading States**: Shows loading indication during QR generation
- **Responsive Images**: QR codes displayed as scalable images
- **Scrollable Content**: Full content accessible via scroll

## Technical Details

### C++ Integration
- The app uses the native library functions through React Native bridges
- Android: JNI bindings with Kotlin bridge
- iOS: Objective-C++ bridge
- Shared C++ codebase for cross-platform functionality

### QR Code Features
- **High Performance**: C++ implementation for fast generation
- **Bitmap Output**: Returns base64-encoded BMP images
- **Cross Platform**: Same C++ code works on both iOS and Android
- **Chunked Encoding**: Special encoding for structured data

### Error Handling
- Input validation for numeric fields
- Try-catch blocks around native function calls
- User-friendly error messages via alerts
- Graceful fallbacks for missing data

## Testing the C++ Integration

1. **Basic Math**: Test the multiplication function with different numbers
2. **QR Generation**: Try different text inputs to see QR codes generated
3. **Chunk Encoding**: Test with hex strings or structured data
4. **Error Cases**: Try invalid inputs to see error handling
5. **Performance**: Notice the fast QR code generation speed

## Troubleshooting

### Build Issues
- Ensure React Native development environment is set up correctly
- For Android: Make sure Android NDK and CMake are installed
- For iOS: Ensure Xcode and CocoaPods are installed

### Runtime Issues
- Check that the native library is properly linked
- Verify that C++ compilation completed successfully
- Look at Metro bundler output for any errors

### QR Code Display Issues
- QR codes are returned as data URIs with base64 BMP images
- If images don't display, check that the base64 data is valid
- Ensure the Image component can handle data URI sources

## Next Steps

- Try modifying the QR code input text
- Experiment with different calculation values
- Check the generated QR codes with a QR code scanner app
- Explore the source code to understand the C++ integration

For more detailed information about the C++ integration, see the main project README and `CPP_DEVELOPMENT.md`.
