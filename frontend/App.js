import "./src/globals.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Platform, View } from 'react-native';
import { LocalizationProvider } from './src/providers/LocalizationProvider';
import { CartProvider } from './src/store/CartContext';
import HomeScreen from './src/features/home/HomeScreen';
import Header from './src/common/Header';
import Footer from './src/common/Footer';

export default function App() {
  return (
    <LocalizationProvider>
      <CartProvider>
        <BrowserRouter>
          <SafeAreaView style={styles.safeArea}>
            <View>
              <Header />
            </View>
            <View style={{ flex: 1 }}>
              {/*Các path để dẫn đến các trang nội dung.*/}
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/home" element={<HomeScreen />} />
              </Routes>
            </View>
            <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'light'} />
          </SafeAreaView>
        </BrowserRouter>
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
