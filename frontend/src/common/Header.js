import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Modal,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import UserDropdown from "../features/Auth/UserDropdown/UserDropdown";
import { useLocalization } from "../providers/LocalizationProvider";
import { useFilter } from "../store/FilterContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { API } from "../constants/apiURL";
import TextIntl from "./TextIntl";
import api from "../services/api";
import { useCart } from "../store/CartContext";
import {
  TEXT_APP_TITLE,
  TEXT_CATEGORIES_LABEL,
  TEXT_SEARCH_PLACEHOLDER,
  TEXT_HOTLINE_LABEL,
  TEXT_HOTLINE_NUMBER,
  TEXT_SHOWROOM_LABEL,
  TEXT_SHOWROOM_SUBLABEL,
  TEXT_TRACK_ORDER_LABEL,
  TEXT_TRACK_ORDER_SUBLABEL,
  TEXT_CHANGE_LANGUAGE,
  TEXT_CART_SUBLABEL,
  TEXT_HOME_DROPDOWN_ALL_PRODUCT,
  TEXT_HOME_DROPDOWN_CATEGORY,
  TEXT_HOME_DROPDOWN_MANUFACTURER,
} from "../constants/i18nKeys";
import {
  IconGrid,
  IconShippingBox,
  IconChevronDown,
  IconSearch,
  IconPhone,
  IconMapPin,
  IconGlobe,
  IconUser,
  IconShoppingCart,
  IconBox,
  IconMore,
} from "../constants/icons";
import AuthModal from "../features/Auth/Auth";
// ─── Header Component ─────────────────────────────────────────────────────
export default function Header() {
  const { t, toggleLocale } = useLocalization();
  const navigate = useNavigate();
  const { loadCart } = useCart();
  const {
    selectedCategoryId,
    setSelectedCategoryId,
    selectedManufacturerId,
    setSelectedManufacturerId,
    clearFilters,
  } = useFilter();

  const { width } = useWindowDimensions();
  const isCompact = width < 1100;

  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [loadingDropdown, setLoadingDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const categoryButtonRef = useRef(null);

  const [moreVisible, setMoreVisible] = useState(false);
  const [morePosition, setMorePosition] = useState({ top: 0, left: 0 });
  const moreButtonRef = useRef(null);
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      const user = JSON.parse(savedUser);

      setUser(user);

      loadCart(user.id);
    }
  }, []);
  useEffect(() => {
    if (dropdownVisible && categories.length === 0) {
      setLoadingDropdown(true);
      Promise.all([api.get(API.GET_CATEGORY), api.get(API.GET_MANUFACTURER)])
        .then(([catRes, manRes]) => {
          setCategories(Array.isArray(catRes.data) ? catRes.data : []);
          setManufacturers(Array.isArray(manRes.data) ? manRes.data : []);
        })
        .catch((err) => console.error("Dropdown fetch error:", err))
        .finally(() => setLoadingDropdown(false));
    }
  }, [dropdownVisible]);

  const handleOpenDropdown = () => {
    categoryButtonRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setDropdownPosition({ top: pageY + height + 4, left: pageX });
    });
    setDropdownVisible(true);
  };
  const handleLogout = async () => {
    localStorage.removeItem("user");

    setUser(null);
    setShowUserDropdown(false);

    await loadCart(null);

    navigate(ROUTES.HOME);
  };
  const handleOpenMore = () => {
    moreButtonRef.current?.measure((x, y, w, height, pageX, pageY) => {
      setMorePosition({ top: pageY + height + 4, left: pageX });
    });
    setMoreVisible(true);
  };

  const handleSelectCategory = (id) => {
    setSelectedCategoryId(id === selectedCategoryId ? null : id);
    setSelectedManufacturerId(null);
    setDropdownVisible(false);
  };

  const handleSelectManufacturer = (id) => {
    setSelectedManufacturerId(id === selectedManufacturerId ? null : id);
    setSelectedCategoryId(null);
    setDropdownVisible(false);
  };

  const handleLogoPress = () => {
    clearFilters();
    setSearchQuery("");
    navigate(ROUTES.HOME);
  };

  const handleSearch = () => {
    // Implement search logic here
    console.log("Search:", searchQuery);
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.topRow}>
          {/* Logo */}
          <Pressable onPress={handleLogoPress} style={styles.logoButton}>
            <View style={styles.logoIconBox}>
              <IconBox />
            </View>
            <Text style={styles.logoText}>{t(TEXT_APP_TITLE)}</Text>
          </Pressable>

          {/* Danh mục button */}
          <Pressable
            ref={categoryButtonRef}
            style={styles.categoryButton}
            onPress={handleOpenDropdown}
          >
            <IconGrid />
            <Text style={styles.categoryText}>{t(TEXT_CATEGORIES_LABEL)}</Text>
            <IconChevronDown />
          </Pressable>

          {/* Category Dropdown Modal */}
          <Modal
            visible={dropdownVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setDropdownVisible(false)}
          >
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setDropdownVisible(false)}
            >
              <Pressable
                style={[
                  styles.dropdownBox,
                  { top: dropdownPosition.top, left: dropdownPosition.left },
                ]}
                onPress={(e) => e.stopPropagation()}
              >
                {loadingDropdown ? (
                  <ActivityIndicator color="#0066ff" style={{ padding: 24 }} />
                ) : (
                  <ScrollView
                    style={{ maxHeight: 420 }}
                    showsVerticalScrollIndicator={false}
                  >
                    {/* Tất cả sản phẩm */}
                    <Pressable
                      style={[
                        styles.dropdownAllBtn,
                        !selectedCategoryId &&
                          !selectedManufacturerId &&
                          styles.dropdownItemActive,
                      ]}
                      onPress={() => {
                        clearFilters();
                        setDropdownVisible(false);
                      }}
                    >
                      <TextIntl
                        tx={TEXT_HOME_DROPDOWN_ALL_PRODUCT}
                        style={styles.dropdownAllText}
                      />
                    </Pressable>

                    {/* Danh mục category */}
                    <TextIntl
                      tx={TEXT_HOME_DROPDOWN_CATEGORY}
                      style={styles.dropdownGroupLabel}
                    />
                    {categories.map((cat) => (
                      <Pressable
                        key={`cat-${cat.id}`}
                        style={[
                          styles.dropdownItem,
                          selectedCategoryId === cat.id &&
                            styles.dropdownItemActive,
                        ]}
                        onPress={() => handleSelectCategory(cat.id)}
                      >
                        <Text
                          style={[
                            styles.dropdownItemText,
                            selectedCategoryId === cat.id &&
                              styles.dropdownItemTextActive,
                          ]}
                        >
                          {cat.name}
                        </Text>
                      </Pressable>
                    ))}

                    {/* Danh mục manufacturer */}
                    <TextIntl
                      tx={TEXT_HOME_DROPDOWN_MANUFACTURER}
                      style={styles.dropdownGroupLabel}
                    />
                    {manufacturers.map((man) => (
                      <Pressable
                        key={`man-${man.id}`}
                        style={[
                          styles.dropdownItem,
                          selectedManufacturerId === man.id &&
                            styles.dropdownItemActive,
                        ]}
                        onPress={() => handleSelectManufacturer(man.id)}
                      >
                        <Text
                          style={[
                            styles.dropdownItemText,
                            selectedManufacturerId === man.id &&
                              styles.dropdownItemTextActive,
                          ]}
                        >
                          {man.name}
                        </Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                )}
              </Pressable>
            </Pressable>
          </Modal>

          {/* Search bar */}
          <View style={styles.searchContainer}>
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder={t(TEXT_SEARCH_PLACEHOLDER)}
              style={styles.searchInput}
              onSubmitEditing={handleSearch}
            />
            <Pressable style={styles.searchButton} onPress={handleSearch}>
              <IconSearch />
            </Pressable>
          </View>

          {/* Right actions */}
          <View style={styles.rightActions}>
            {/* Full mode (width >= 1100) */}
            {!isCompact && (
              <>
                <View style={styles.actionItem}>
                  <View style={styles.iconWrapper}>
                    <IconPhone />
                  </View>
                  <View>
                    <Text style={styles.smallLabel}>
                      {t(TEXT_HOTLINE_LABEL)}
                    </Text>
                    <Text style={styles.boldValue}>
                      {t(TEXT_HOTLINE_NUMBER)}
                    </Text>
                  </View>
                </View>

                <Pressable
                  style={styles.actionItem}
                  onPress={() => navigate(ROUTES.SHOWROOM)}
                >
                  <View style={styles.iconWrapper}>
                    <IconMapPin />
                  </View>
                  <View>
                    <Text style={styles.smallLabel}>
                      {t(TEXT_SHOWROOM_LABEL)}
                    </Text>
                    <Text style={styles.boldValue}>
                      {t(TEXT_SHOWROOM_SUBLABEL)}
                    </Text>
                  </View>
                </Pressable>

                <Pressable style={styles.actionItem}>
                  <View style={styles.iconWrapper}>
                    <IconShippingBox />
                  </View>
                  <View>
                    <Text style={styles.smallLabel}>
                      {t(TEXT_TRACK_ORDER_LABEL)}
                    </Text>
                    <Text style={styles.boldValue}>
                      {t(TEXT_TRACK_ORDER_SUBLABEL)}
                    </Text>
                  </View>
                </Pressable>

                <Pressable onPress={toggleLocale} style={styles.actionItem}>
                  <IconGlobe />
                  <Text style={styles.languageText}>
                    {t(TEXT_CHANGE_LANGUAGE)}
                  </Text>
                  <IconChevronDown />
                </Pressable>
              </>
            )}

            {/* Compact mode: More button */}
            {isCompact && (
              <>
                <Pressable
                  ref={moreButtonRef}
                  style={styles.moreButton}
                  onPress={handleOpenMore}
                >
                  <IconMore />
                </Pressable>

                <Modal
                  visible={moreVisible}
                  transparent
                  animationType="fade"
                  onRequestClose={() => setMoreVisible(false)}
                >
                  <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setMoreVisible(false)}
                  >
                    <Pressable
                      style={[
                        styles.dropdownBox,
                        { top: morePosition.top, left: morePosition.left },
                      ]}
                      onPress={(e) => e.stopPropagation()}
                    >
                      <View style={styles.moreItem}>
                        <IconPhone />
                        <View>
                          <Text style={styles.smallLabel}>
                            {t(TEXT_HOTLINE_LABEL)}
                          </Text>
                          <Text style={styles.boldValue}>
                            {t(TEXT_HOTLINE_NUMBER)}
                          </Text>
                        </View>
                      </View>

                      <Pressable style={styles.moreItem}>
                        <IconMapPin />
                        <View>
                          <Text style={styles.smallLabel}>
                            {t(TEXT_SHOWROOM_LABEL)}
                          </Text>
                          <Text style={styles.boldValue}>
                            {t(TEXT_SHOWROOM_SUBLABEL)}
                          </Text>
                        </View>
                      </Pressable>

                      <Pressable style={styles.moreItem}>
                        <IconShippingBox />
                        <View>
                          <Text style={styles.smallLabel}>
                            {t(TEXT_TRACK_ORDER_LABEL)}
                          </Text>
                          <Text style={styles.boldValue}>
                            {t(TEXT_TRACK_ORDER_SUBLABEL)}
                          </Text>
                        </View>
                      </Pressable>

                      <Pressable
                        onPress={() => {
                          toggleLocale();
                          setMoreVisible(false);
                        }}
                        style={styles.moreItem}
                      >
                        <IconGlobe />
                        <Text style={styles.languageText}>
                          {t(TEXT_CHANGE_LANGUAGE)}
                        </Text>
                      </Pressable>
                    </Pressable>
                  </Pressable>
                </Modal>
              </>
            )}

            {/* Account button */}
            <Pressable
              style={styles.iconButton}
              onPress={() => {
                if (user) {
                  setShowUserDropdown(!showUserDropdown);
                } else {
                  setShowAuthModal(true);
                }
              }}
            >
              <IconUser />
              {user && <Text style={styles.userName}>{user.name}</Text>}
              {showUserDropdown && user && (
                <UserDropdown
                  user={user}
                  onClose={() => setShowUserDropdown(false)}
                  onLogout={handleLogout}
                />
              )}
            </Pressable>

            {/* Cart button */}
            <Pressable
              style={styles.cartButton}
              onPress={() => navigate(ROUTES.CART)}
            >
              <View style={styles.cartIconWrapper}>
                <IconShoppingCart />
                {totalItems > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{totalItems}</Text>
                  </View>
                )}
              </View>

              <Text style={styles.cartText}>{t(TEXT_CART_SUBLABEL)}</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <AuthModal
        visible={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={async (user) => {
          setUser(user);

          localStorage.setItem("user", JSON.stringify(user));

          await loadCart(user.id);

          setShowAuthModal(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    position: "relative",
    zIndex: 9999,
    elevation: 9999,
  },
  innerContainer: {
    maxWidth: 1280,
    marginHorizontal: "auto",
    paddingHorizontal: 16,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    gap: 12,
  },
  logoButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
  },
  logoIconBox: {
    width: 32,
    height: 32,
    backgroundColor: "#2563eb",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111827",
    letterSpacing: -0.5,
    whiteSpace: "nowrap",
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    flexShrink: 0,
  },
  categoryText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  searchContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    overflow: "hidden",
  },
  searchInput: {
    flex: 1,
    height: 36,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#374151",
    backgroundColor: "#ffffff",
  },
  searchButton: {
    height: 36,
    paddingHorizontal: 12,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flexShrink: 0,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  smallLabel: {
    fontSize: 10,
    color: "#6b7280",
  },
  boldValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111827",
    whiteSpace: "nowrap",
  },
  languageText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  iconButton: {
    position: "relative",
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignItems: "center",
    zIndex: 1000,
  },
  cartButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  cartIconWrapper: {
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    minWidth: 16,
    height: 16,
    backgroundColor: "blue",
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  cartBadgeText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
  },
  cartText: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 0.5,
    color: "#111827",
    whiteSpace: "nowrap",
  },
  moreButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  moreItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  dropdownBox: {
    position: "absolute",
    width: 260,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
  },
  dropdownGroupLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  dropdownItemActive: {
    backgroundColor: "#eff6ff",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#374151",
  },
  dropdownItemTextActive: {
    color: "#2563eb",
    fontWeight: "600",
  },
  dropdownAllBtn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  dropdownAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  userDropdown: {
    position: "absolute",
    top: "100%",
    right: 0,

    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",

    minWidth: 180,
    padding: 12,

    zIndex: 9999,
    elevation: 10, // nếu chạy native
  },
  dropdownName: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  userName: {
    fontSize: 12,
    marginLeft: 4,
    color: "#111827",
  },
});
