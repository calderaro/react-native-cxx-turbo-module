import AwesomeLibrary from './NativeAwesomeLibrary';

export function multiply(a: number, b: number): number {
  return AwesomeLibrary.multiply(a, b);
}

export function encodeQR(text: string): string {
  return AwesomeLibrary.encodeQR(text);
}

export function encodeQRChunk(text: string): string {
  return AwesomeLibrary.encodeQRChunk(text);
}
