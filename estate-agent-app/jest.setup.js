import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock import.meta for Vite compatibility with Jest
global.import = {
  meta: {
    env: {
      BASE_URL: '/'
    }
  }
};