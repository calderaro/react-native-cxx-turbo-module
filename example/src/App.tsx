import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import {
  multiply,
  encodeQR,
  encodeQRChunk,
} from 'react-native-awesome-library';

export default function App() {
  const [multiplyA, setMultiplyA] = useState('3');
  const [multiplyB, setMultiplyB] = useState('7');
  const [multiplyResult, setMultiplyResult] = useState<number | null>(null);

  const [qrText, setQrText] = useState('Hello, World!');
  const [qrBitmap, setQrBitmap] = useState<string | null>(null);

  const [chunkText, setChunkText] = useState('1234567890ABCDEF');
  const [chunkBitmap, setChunkBitmap] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleMultiply = () => {
    try {
      const a = parseFloat(multiplyA);
      const b = parseFloat(multiplyB);

      if (isNaN(a) || isNaN(b)) {
        Alert.alert('Error', 'Please enter valid numbers');
        return;
      }

      const result = multiply(a, b);
      setMultiplyResult(result);
    } catch (error) {
      Alert.alert('Error', 'Failed to calculate: ' + error);
    }
  };

  const handleGenerateQR = async () => {
    if (!qrText.trim()) {
      Alert.alert('Error', 'Please enter text for QR code');
      return;
    }

    try {
      setIsLoading(true);
      const bitmap = encodeQR(qrText);
      setQrBitmap(bitmap);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate QR code: ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateChunkQR = async () => {
    if (!chunkText.trim()) {
      Alert.alert('Error', 'Please enter text for chunk QR code');
      return;
    }

    try {
      setIsLoading(true);
      const bitmap = encodeQRChunk(chunkText);
      setChunkBitmap(bitmap);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate chunk QR code: ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🚀 Awesome Library Demo</Text>
          <Text style={styles.subtitle}>C++ Native Functions</Text>
        </View>

        {/* Multiply Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🧮 C++ Multiplication</Text>
          <Text style={styles.description}>
            Demonstrates basic C++ function integration
          </Text>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.numberInput}
              value={multiplyA}
              onChangeText={setMultiplyA}
              placeholder="First number"
              keyboardType="numeric"
            />
            <Text style={styles.operator}>×</Text>
            <TextInput
              style={styles.numberInput}
              value={multiplyB}
              onChangeText={setMultiplyB}
              placeholder="Second number"
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleMultiply}>
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>

          {multiplyResult !== null && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>
                Result: {multiplyA} × {multiplyB} = {multiplyResult}
              </Text>
            </View>
          )}
        </View>

        {/* QR Code Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 QR Code Generator</Text>
          <Text style={styles.description}>
            High-performance C++ QR code generation with bitmap output
          </Text>

          <TextInput
            style={styles.textInput}
            value={qrText}
            onChangeText={setQrText}
            placeholder="Enter text to encode as QR code"
            multiline
          />

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleGenerateQR}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Generating...' : 'Generate QR Code'}
            </Text>
          </TouchableOpacity>

          {qrBitmap && (
            <View style={styles.qrContainer}>
              <Text style={styles.qrLabel}>Generated QR Code:</Text>
              <Image
                source={{ uri: qrBitmap }}
                style={styles.qrImage}
                resizeMode="contain"
              />
              <Text style={styles.qrText}>"{qrText}"</Text>
            </View>
          )}
        </View>

        {/* Chunk QR Code Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔗 Chunk QR Encoder</Text>
          <Text style={styles.description}>
            Specialized QR code encoding for chunked data
          </Text>

          <TextInput
            style={styles.textInput}
            value={chunkText}
            onChangeText={setChunkText}
            placeholder="Enter data for chunk encoding (e.g., 1234567890ABCDEF)"
          />

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleGenerateChunkQR}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Generating...' : 'Generate Chunk QR'}
            </Text>
          </TouchableOpacity>

          {chunkBitmap && (
            <View style={styles.qrContainer}>
              <Text style={styles.qrLabel}>Generated Chunk QR:</Text>
              <Image
                source={{ uri: chunkBitmap }}
                style={styles.qrImage}
                resizeMode="contain"
              />
              <Text style={styles.qrText}>"{chunkText}"</Text>
            </View>
          )}
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>💡 About This Demo</Text>
          <Text style={styles.infoText}>
            This demo showcases cross-platform C++ integration in React Native
            using:
          </Text>
          <Text style={styles.bulletPoint}>• Shared C++ codebase</Text>
          <Text style={styles.bulletPoint}>• Android JNI bindings</Text>
          <Text style={styles.bulletPoint}>• iOS Objective-C++ bridge</Text>
          <Text style={styles.bulletPoint}>
            • High-performance QR code generation
          </Text>
          <Text style={styles.bulletPoint}>• Base64 bitmap output</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 20,
    lineHeight: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  numberInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  operator: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
    marginHorizontal: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
    marginBottom: 20,
    minHeight: 50,
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: '#95a5a6',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    backgroundColor: '#e8f5e8',
    borderRadius: 8,
    padding: 15,
    marginTop: 10,
  },
  resultText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#27ae60',
    textAlign: 'center',
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  qrLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 15,
  },
  qrImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  qrText: {
    fontSize: 12,
    color: '#7f8c8d',
    fontStyle: 'italic',
    textAlign: 'center',
    maxWidth: 200,
  },
  infoSection: {
    backgroundColor: '#ecf0f1',
    borderRadius: 12,
    padding: 20,
    marginTop: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 22,
    marginLeft: 10,
  },
});
