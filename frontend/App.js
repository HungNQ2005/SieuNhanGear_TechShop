import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Platform } from 'react-native';
import { LocalizationProvider } from './src/providers/LocalizationProvider';
import { CartProvider } from './src/store/CartContext';
import HomeScreen from './src/features/home/HomeScreen';

export default function App() {
  return (
    <LocalizationProvider>
      <CartProvider>
        <SafeAreaView style={styles.safeArea}>
          <HomeScreen />
          <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'light'} />
        </SafeAreaView>
      </CartProvider>
    </LocalizationProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});
