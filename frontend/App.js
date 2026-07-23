import { useRef } from "react";

import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  View,
  ScrollView,
} from "react-native";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./src/common/Header";
import Footer from "./src/common/Footer";
import HomeScreen from "./src/features/home/HomeScreen";
import ProductPage from "./src/features/product/ProductPage";
import { ROUTES } from "./src/constants/routes";
import { LocalizationProvider } from "./src/providers/LocalizationProvider";
import { CartProvider } from "./src/store/CartContext";
import { FilterProvider } from "./src/store/FilterContext";
import ViewShowroom from "./src/features/viewShowroom/ViewShowroom";
import CartScreen from "./src/features/Cart/screens/CartScreen";
import OrderManagementScreen from "./src/features/Auth/Admin/OrderManagement/OrderManagementScreen";
import CheckoutPage from "./src/features/checkout/CheckoutPage";
import OrderTrackingScreen from "./src/features/order-tracking/screens/OrderTrackingScreen";
import OrderDetailScreen from "./src/features/Auth/Admin/OrderManagement/OrderDetail/OrderDetailScreen";
import InventoryManagementScreen from "./src/features/Auth/Admin/InventoryManagement/InventoryManagementScreen";
import SpecificationsScreen from "./src/features/Auth/Admin/ProductManagement/Specifications/SpecificationsScreen";
import ManageShowroom from "./src/features/Auth/Admin/Admin System/ShowroomManagement/screens/ManageShowroom";
import ManageAccount from "./src/features/Auth/Admin/Admin System/AccounManagement/screens/ManageAccount";
import ManageNews from "./src/features/Auth/Admin/Admin System/NewsManagement/screens/ManageNews";
import ProductsScreen from "./src/features/Auth/Admin/ProductManagement/Products/ProductsScreen";
import CategoriesScreen from "./src/features/Auth/Admin/ProductManagement/Categories/CategoriesScreen";
import VoucherManagementScreen from "./src/features/Auth/Admin/VoucherManagement/VoucherManagementScreen";
import ProfileManagerment from "./src/features/profileManagerment/screens/ProfileManagerment";
import AIChatWidget from "./src/features/ai/AIChatWidget";

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
                  <Route
                    path={ROUTES.ROOT}
                    element={<HomeScreen scrollViewRef={scrollViewRef} />}
                  />
                  <Route
                    path={ROUTES.HOME}
                    element={<HomeScreen scrollViewRef={scrollViewRef} />}
                  />
                  <Route
                    path={ROUTES.PRODUCT_PAGE}
                    element={<ProductPage hideOuterScroll />}
                  />
                  <Route path={ROUTES.SHOWROOM} element={<ViewShowroom />} />
                  <Route path={ROUTES.CART} element={<CartScreen />} />
                  <Route
                    path={ROUTES.ORDER_MANAGEMENT}
                    element={<OrderManagementScreen />}
                  />
                  <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
                  <Route
                    path={ROUTES.ORDER}
                    element={<OrderTrackingScreen />}
                  />

                  <Route
                    path={ROUTES.ADMIN_ORDER_DETAIL}
                    element={<OrderDetailScreen />}
                  />
                  <Route
                    path={ROUTES.INVENTORY_MANAGEMENT}
                    element={<InventoryManagementScreen />}
                  />
                  <Route
                    path={ROUTES.PRODUCT_SPECIFICATIONS}
                    element={<SpecificationsScreen />}
                  />
                  <Route
                    path={ROUTES.ADMIN_SHOWROOM}
                    element={<ManageShowroom />}
                  />
                  <Route
                    path={ROUTES.ADMIN_ACCOUNTS}
                    element={<ManageAccount />}
                  />
                  <Route
                    path={ROUTES.ADMIN_NEWS}
                    element={<ManageNews />}
                  />
                  <Route
                    path={ROUTES.ADMIN_PRODUCT}
                    element={<ProductsScreen />}
                  />
                  <Route
                    path={ROUTES.PRODUCT_CATEGORIES}
                    element={<CategoriesScreen />}
                  />
                  <Route
                    path={ROUTES.ADMIN_VOUCHER}
                    element={<VoucherManagementScreen />}
                  />
                  <Route
                    path={ROUTES.PROFILE}
                    element={<ProfileManagerment />}
                  />
                  <Route
                    path={ROUTES.PROFILE_INFOMATION}
                    element={<ProfileManagerment />}
                  />
                  <Route
                    path={ROUTES.PROFILE_FAVORITE_PROFUCT}
                    element={<ProfileManagerment />}
                  />
                  <Route
                    path={ROUTES.PROFILE_ORDER_HISTORY}
                    element={<ProfileManagerment />}
                  />
                </Routes>
                <Footer />
              </ScrollView>
              <StatusBar style={Platform.OS === "ios" ? "dark" : "light"} />
              <AIChatWidget />
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
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    flexGrow: 1,
  },
});
