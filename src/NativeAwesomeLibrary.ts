import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  multiply(a: number, b: number): number;
  encodeQR(text: string): string;
  encodeQRChunk(text: string): string;
}

export default TurboModuleRegistry.getEnforcing<Spec>('AwesomeLibrary');
