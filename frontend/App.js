import { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Platform, View, ScrollView } from 'react-native';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './src/common/Header';
import Footer from './src/common/Footer';
import HomeScreen from './src/features/home/HomeScreen';
import ProductPage from './src/features/product/ProductPage';
import { ROUTES } from './src/constants/routes';
import { LocalizationProvider } from './src/providers/LocalizationProvider';
import { CartProvider } from './src/store/CartContext';
import { FilterProvider } from './src/store/FilterContext';

export default function App() {
  const scrollViewRef = useRef(null);

  return (
    <FilterProvider>
      <LocalizationProvider>
        <CartProvider>
          <BrowserRouter>
            <SafeAreaView style={styles.safeArea}>
              <Header />
              <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={true}
              >
                <Routes>
                  <Route path={ROUTES.ROOT} element={<HomeScreen scrollViewRef={scrollViewRef} />} />
                  <Route path={ROUTES.HOME} element={<HomeScreen scrollViewRef={scrollViewRef} />} />
                  <Route path={ROUTES.PRODUCT_PAGE} element={<ProductPage hideOuterScroll />} />
                </Routes>
                <Footer />
              </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
  },
});