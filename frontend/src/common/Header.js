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
} from "react-native";
import { useLocalization } from "../providers/LocalizationProvider";
import { useFilter } from "../store/FilterContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import TextIntl from "./TextIntl";
import api from "../services/api";
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
  TEXT_ACCOUNT_LABEL,
  TEXT_CART_SUBLABEL,
  TEXT_HOME_DROPDOWN_ALL_PRODUCT,
  TEXT_HOME_DROPDOWN_CATEGORY,
  TEXT_HOME_DROPDOWN_MANUFACTURER,
} from "../constants/i18nKeys";
import AuthModal from "../features/Auth/Auth";
// ─── SVG Icons (giữ nguyên) ─────────────────────────────────────────────
const IconGrid = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const IconShippingBox = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#2563eb"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16.5 9.4 7.5 4.2" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.29 7 12 12 20.71 7" />
    <line x1="12" y1="22" x2="12" y2="12" />
  </svg>
);

const IconChevronDown = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const IconSearch = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconPhone = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#2563eb"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.91 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.82 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconMapPin = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#2563eb"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconGlobe = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#2563eb"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconUser = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconShoppingCart = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const IconBox = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

// ─── Header Component ─────────────────────────────────────────────────────
export default function Header() {
  const { t, toggleLocale } = useLocalization();
  const navigate = useNavigate();
  const {
    selectedCategoryId,
    setSelectedCategoryId,
    selectedManufacturerId,
    setSelectedManufacturerId,
    clearFilters,
  } = useFilter();

  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount] = useState(0);
  const [user, setUser] = useState(null);

  const [showAuthModal, setShowAuthModal] = useState(false);

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [loadingDropdown, setLoadingDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const categoryButtonRef = useRef(null);

  useEffect(() => {
    if (dropdownVisible && categories.length === 0) {
      setLoadingDropdown(true);
      Promise.all([
        api.get(ROUTES.GET_CATEGORY),
        api.get(ROUTES.GET_MANUFACTURER),
      ])
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

  const handleSelectCategory = (id) => {
    setSelectedCategoryId(id === selectedCategoryId ? null : id);
    setSelectedManufacturerId(null); // bỏ filter manufacturer khi chọn category
    setDropdownVisible(false);
  };

  const handleSelectManufacturer = (id) => {
    setSelectedManufacturerId(id === selectedManufacturerId ? null : id);
    setSelectedCategoryId(null); // bỏ filter category khi chọn manufacturer
    setDropdownVisible(false);
  };

  const handleLogoPress = () => {
    clearFilters();
    setSearchQuery("");
    navigate(ROUTES.HOME);
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

          {/* Dropdown Modal */}
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
                    {/* ── Tất cả ── */}
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

                    {/* ── Nhóm Category ── */}
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

                    {/* ── Nhóm Manufacturer ── */}
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
            />
            <Pressable style={styles.searchButton}>
              <IconSearch />
            </Pressable>
          </View>

          {/* Right actions */}
          <View style={styles.rightActions}>
            {/* Hotline */}
            <View style={styles.actionItem}>
              <View style={styles.iconWrapper}>
                <IconPhone />
              </View>
              <View>
                <Text style={styles.smallLabel}>{t(TEXT_HOTLINE_LABEL)}</Text>
                <Text style={styles.boldValue}>{t(TEXT_HOTLINE_NUMBER)}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Showroom */}
            <Pressable style={styles.actionItem}>
              <View style={styles.iconWrapper}>
                <IconMapPin />
              </View>
              <View>
                <Text style={styles.smallLabel}>{t(TEXT_SHOWROOM_LABEL)}</Text>
                <Text style={styles.boldValue}>
                  {t(TEXT_SHOWROOM_SUBLABEL)}
                </Text>
              </View>
            </Pressable>

            <View style={styles.divider} />

            {/* Track order */}
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

            <View style={styles.divider} />

            {/* Language toggle */}
            <Pressable onPress={toggleLocale} style={styles.actionItem}>
              <IconGlobe />
              <Text style={styles.languageText}>{t(TEXT_CHANGE_LANGUAGE)}</Text>
              <IconChevronDown />
            </Pressable>

            <View style={styles.divider} />

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
              {showUserDropdown && (
                <View style={styles.userDropdown}>
                  <Text style={styles.dropdownName}>{user.name}</Text>

                  <Text>Role: {user.role}</Text>

                  <Pressable
                    onPress={() => {
                      setUser(null);
                      setShowUserDropdown(false);
                    }}
                  >
                    <Text style={{ color: "red" }}>Đăng xuất</Text>
                  </Pressable>
                </View>
              )}
              {user && <Text style={styles.userName}>{user.name}</Text>}
            </Pressable>

            <View style={styles.divider} />

            {/* Cart */}
            <Pressable style={styles.cartButton}>
              <View style={styles.cartIconWrapper}>
                <IconShoppingCart />
                {cartCount > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{cartCount}</Text>
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
        onLoginSuccess={setUser}
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
  // Logo
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
  // Danh mục button
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
  // Search bar
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
  // Right actions
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
  iconWrapper: {},
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
  divider: {
    width: 1,
    height: 32,
    backgroundColor: "#e5e7eb",
  },
  languageText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  iconButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignItems: "center",
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
    backgroundColor: "#ef4444",
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
    top: 60,
    right: 80,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    minWidth: 180,
    zIndex: 999,
  },

  dropdownName: {
    fontWeight: "bold",
    marginBottom: 6,
  },
});
