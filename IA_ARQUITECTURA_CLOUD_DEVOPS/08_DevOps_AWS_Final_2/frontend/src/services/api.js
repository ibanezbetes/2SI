import axios from 'axios';
import { Platform } from 'react-native';

// Use localhost for iOS simulator, 10.0.2.2 for Android emulator
// Use localhost for iOS simulator, 10.0.2.2 for Android emulator
const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
