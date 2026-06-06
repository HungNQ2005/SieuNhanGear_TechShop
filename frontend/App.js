import "./src/globals.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Platform, View } from 'react-native';
import { LocalizationProvider } from './src/providers/LocalizationProvider';
import { CartProvider } from './src/store/CartContext';
import { FilterProvider } from './src/store/FilterContext';
import { ROUTES } from './src/constants/routes';
import HomeScreen from './src/features/home/HomeScreen';
import ProductPage from './src/features/product/ProductPage';  // ← NEW
import Header from './src/common/Header';
import Footer from './src/common/Footer';

export default function App() {
  return (
    <FilterProvider>
      <LocalizationProvider>
        <CartProvider>
          <BrowserRouter>
            <SafeAreaView style={styles.safeArea}>
              <View>
                <Header />
              </View>
              <View style={{ flex: 1 }}>
                <Routes>
                  <Route path={ROUTES.ROOT} element={<HomeScreen />} />
                  <Route path={ROUTES.HOME} element={<HomeScreen />} />
                  <Route path={ROUTES.PRODUCT_PAGE} element={<ProductPage />} />
                </Routes>
              </View>
              <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'light'} />
            </SafeAreaView>
          </BrowserRouter>
        </CartProvider>
      </LocalizationProvider>
    </FilterProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});