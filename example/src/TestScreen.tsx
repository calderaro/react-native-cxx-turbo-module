import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { multiply, encodeQR, encodeQRChunk } from 'react-native-awesome-library';

export default function TestScreen() {
  // Test basic functionality
  const multiplyResult = multiply(6, 8);
  
  // Test QR generation (these will only work when the native bridge is properly set up)
  let qrResult = '';
  let chunkResult = '';
  
  try {
    qrResult = encodeQR('Test QR Code');
  } catch (error) {
    qrResult = 'Error: ' + error;
  }
  
  try {
    chunkResult = encodeQRChunk('1234567890ABCDEF');
  } catch (error) {
    chunkResult = 'Error: ' + error;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Native Library Test Results</Text>
      
      <View style={styles.section}>
        <Text style={styles.label}>C++ Multiply Function:</Text>
        <Text style={styles.result}>6 × 8 = {multiplyResult}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.label}>QR Code Generation:</Text>
        <Text style={styles.result} numberOfLines={2}>
          {qrResult.length > 50 ? qrResult.substring(0, 50) + '...' : qrResult}
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.label}>Chunk QR Generation:</Text>
        <Text style={styles.result} numberOfLines={2}>
          {chunkResult.length > 50 ? chunkResult.substring(0, 50) + '...' : chunkResult}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#666',
  },
  result: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'monospace',
  },
}); 