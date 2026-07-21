import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
  Modal,
  FlatList,
} from "react-native";
import { styles } from "./CheckoutPage.style";
import { useCart } from "../../store/CartContext";
import { useLocalization } from "../../providers/LocalizationProvider";
import {
  getPaymentMethods,
  getVouchers,
  getVoucherByCode,
  createOrder,
  getProvinces,
  getWardsByProvince,
  getShippingAddressByAccount,
} from "../../services/api";
import AuthModal from "../Auth/Auth";
import ShippingInfoCard from "./ShippingInfoCard";
import PaymentMethodCard from "./PaymentMethodCard";
import OrderSummaryCard from "./OrderSummaryCard";
import {
  calculateSubtotal,
  calculateDiscount,
  calculateTotal,
} from "../../store/CheckoutContext";
import {
  TEXT_CHECKOUT_DISCOUNT,
  TEXT_CHECKOUT_DISCOUNT_PLACEHOLDER,
  TEXT_CHECKOUT_APPLY,
  TEXT_CHECKOUT_REMOVE,
  TEXT_CHECKOUT_AVAILABLE_CODES,
  TEXT_CHECKOUT_ORDER_TITLE,
  TEXT_CHECKOUT_SUBTOTAL,
  TEXT_CHECKOUT_SHIPPING_FEE,
  TEXT_CHECKOUT_DISCOUNT_LABEL,
  TEXT_CHECKOUT_TOTAL,
  TEXT_CHECKOUT_PLACE_ORDER,
  TEXT_CHECKOUT_PROVINCE,
  TEXT_CHECKOUT_WARD,
  TEXT_LOADING,
  TEXT_EXPIRED,
  TEXT_NO_DATA,
  CLOSE_TEXT,
} from "../../constants/i18nKeys";
import { IconDiscount } from "../../constants/icons";

const DEFAULT_PAYMENT_METHODS = [
  { id: 1, code: "COD", name: "Thanh toán khi nhận hàng (COD)", description: "Thanh toán tiền mặt cho nhân viên giao hàng khi nhận hàng" },
  { id: 2, code: "VNPAY", name: "Thanh toán qua VNPAY", description: "Thanh toán qua Ví điện tử hoặc QR Code VNPAY" },
  { id: 3, code: "BANK", name: "Chuyển khoản ngân hàng", description: "Chuyển khoản qua tài khoản ngân hàng cửa hàng" },
];

export default function CheckoutPage() {
  const { t } = useLocalization();
  const [accountId, setAccountId] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingCheckout, setPendingCheckout] = useState(false);
  const { items, loadCart, clearCart } = useCart();
  const [paymentMethods, setPaymentMethods] = useState(DEFAULT_PAYMENT_METHODS);
  const [vouchers, setVouchers] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    province: "",
    provinceCode: "",
    ward: "",
    wardCode: "",
    address: "",
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("COD");
  const [provinces, setProvinces] = useState([]);
  const [wards, setWards] = useState([]);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerType, setPickerType] = useState("");
  const [pickerData, setPickerData] = useState([]);
  const [notifVisible, setNotifVisible] = useState(false);
  const [notifMessage, setNotifMessage] = useState('');

  useEffect(() => {
    const initData = async () => {
      try {
        // Nếu user đã đăng nhập, lấy thông tin từ localStorage và điền mặc định
        const savedUser = localStorage.getItem('user');
        const user = savedUser ? JSON.parse(savedUser) : null;
        if (user) {
          const accountIdVal = user._id || user.id;
          setAccountId(accountIdVal);
          await loadCart(accountIdVal);

          setFormData((prev) => ({
            ...prev,
            name: prev.name || user.name || "",
            email: prev.email || user.email || "",
            phone: prev.phone || user.phone || "",
          }));
        }

        // Sử dụng allSettled để một API lỗi không làm hỏng toàn bộ init
        const settled = await Promise.allSettled([
          getPaymentMethods(),
          getVouchers(),
          getProvinces(),
          user ? getShippingAddressByAccount(user._id || user.id) : Promise.resolve({ data: [] }),
        ]);

        const paymentRes = settled[0].status === 'fulfilled' ? settled[0].value : null;
        const voucherRes = settled[1].status === 'fulfilled' ? settled[1].value : null;
        const provinceData = settled[2].status === 'fulfilled' ? settled[2].value : null;
        const shippingRes = settled[3].status === 'fulfilled' ? settled[3].value : null;

        const methods = (paymentRes?.data && paymentRes.data.length > 0) ? paymentRes.data : DEFAULT_PAYMENT_METHODS;
        setPaymentMethods(methods);
        setVouchers(voucherRes?.data || []);
        setProvinces(provinceData?.data || []);

        if (methods.length > 0 && !selectedPaymentMethod) {
          setSelectedPaymentMethod(methods[0].code);
        }

        const shipping = shippingRes?.data?.[0];

        if (shipping) {
          setFormData((prev) => ({
            ...prev,
            name: shipping.receiverName || prev.name,
            email: shipping.email || prev.email,
            phone: shipping.phone || prev.phone,
            province: shipping.province || prev.province,
            provinceCode: shipping.provinceCode || prev.provinceCode,
            ward: shipping.ward || prev.ward,
            wardCode: shipping.wardCode || prev.wardCode,
            address: shipping.address || prev.address,
          }));

          if (shipping.provinceCode) {
            const wardRes = await getWardsByProvince(shipping.provinceCode);
            setWards(wardRes.data || []);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    initData();
  }, []);

  const handleSelectProvince = async (province) => {
    setFormData((prev) => ({
      ...prev,
      province: province.name,
      provinceCode: province.code,
      ward: "",
      wardCode: "",
    }));
    try {
      const res = await getWardsByProvince(province.code);
      setWards(res?.data || []);
    } catch (_) {
      setWards([]);
    }
    setPickerVisible(false);
  };

  const handleSelectWard = (ward) => {
    setFormData((prev) => ({ ...prev, ward: ward.name, wardCode: ward.code }));
    setPickerVisible(false);
  };

  const openPicker = (type) => {
    setPickerType(type);
    setPickerData(type === "province" ? provinces : wards);
    setPickerVisible(true);
  };

  const safeItems = Array.isArray(items) ? items : [];
  const subtotal = useMemo(() => calculateSubtotal(safeItems), [safeItems]);
  const discountAmount = useMemo(
    () => calculateDiscount(subtotal, appliedVoucher),
    [subtotal, appliedVoucher],
  );
  const shippingFee = 0;
  const total = useMemo(
    () => calculateTotal(subtotal, shippingFee, discountAmount),
    [subtotal, shippingFee, discountAmount],
  );

  const handleApplyDiscount = async () => {
    const code = discountCode.trim().toUpperCase();
    if (!code) return;
    setIsApplyingDiscount(true);
    try {
      const response = await getVoucherByCode(code);
      let voucher = response.data;
      if (Array.isArray(voucher) && voucher.length) voucher = voucher[0];
      if (voucher && voucher.isActive && subtotal >= voucher.minOrderValue) {
        setAppliedVoucher(voucher);
        setDiscountCode("");
      }
    } catch (_) { }
    setIsApplyingDiscount(false);
  };

  const handleRemoveDiscount = () => {
    setAppliedVoucher(null);
    setDiscountCode("");
  };

  const handleSelectVoucher = (voucher) => {
    setAppliedVoucher(voucher);
    setDiscountCode("");
  };

  const handleCheckout = async () => {
    const required = ["name", "email", "phone", "province", "ward", "address"];
    const empty = required.filter((f) => !formData[f]?.trim());
    if (!safeItems.length) {
      setNotifMessage('Giỏ hàng rỗng');
      setNotifVisible(true);
      return;
    }
    if (empty.length) {
      setNotifMessage('Vui lòng nhập đủ thông tin giao hàng');
      setNotifVisible(true);
      return;
    }

    // Kiểm tra đăng nhập
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      setPendingCheckout(true);
      setShowAuthModal(true);
      return;
    }

    setSubmitting(true);
    try {
      const orderPayload = {
        orderDate: new Date().toISOString(),
        receiverName: formData.name,
        email: formData.email,
        phone: formData.phone,
        province: formData.province,
        provinceCode: formData.provinceCode,
        ward: formData.ward,
        wardCode: formData.wardCode,
        address: `${formData.address}, ${formData.ward}, ${formData.province}`,
        paymentMethod: selectedPaymentMethod,
        shippingFee: 0,
        discountCode: appliedVoucher?.code || "",
        discountAmount,
        subtotal,
        totalPrice: total,
        status: "Pending",
        items: safeItems.map((it) => ({ productId: it.id, price: it.price || 0, quantity: it.quantity || 1 })),
      };
      const { data: createdOrder } = await createOrder(orderPayload);
      setNotifMessage('Đặt hàng thành công! Mã đơn: ' + (createdOrder?.code || createdOrder?.id || ''));
      setNotifVisible(true);
      setTimeout(() => {
        clearCart();
      }, 0);
    } catch (_) {}
    setSubmitting(false);
  };

  const handleAuthSuccess = async (user) => {
    try {
      const accountIdVal = user._id || user.id;
      localStorage.setItem('user', JSON.stringify(user));
      setAccountId(accountIdVal);
      await loadCart(accountIdVal);
    } catch (e) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    setShowAuthModal(false);
    if (pendingCheckout) {
      setPendingCheckout(false);
      handleCheckout();
    }
  };

  const handleInputChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.contentContainer}>
        <View style={styles.leftColumn}>
          {/* Shipping Info */}
          <ShippingInfoCard
            styles={styles}
            t={t}
            formData={formData}
            handleInputChange={handleInputChange}
            openPicker={openPicker}
            allowManualSelect={!provinces || provinces.length === 0}
          />
          {/* Discount */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconContainer}>
                <IconDiscount />
              </View>
              <Text style={styles.sectionTitle}>
                {t(TEXT_CHECKOUT_DISCOUNT)}
              </Text>
            </View>
            <View style={styles.discountContainer}>
              <View style={styles.discountInputContainer}>
                <TextInput
                  style={[
                    styles.discountInput,
                    appliedVoucher && styles.discountInputDisabled,
                  ]}
                  placeholder={t(TEXT_CHECKOUT_DISCOUNT_PLACEHOLDER)}
                  placeholderTextColor="#999"
                  value={discountCode}
                  onChangeText={setDiscountCode}
                  editable={!appliedVoucher && !isApplyingDiscount}
                />
                {appliedVoucher ? (
                  <TouchableOpacity
                    style={styles.discountButtonRemove}
                    onPress={handleRemoveDiscount}
                  >
                    <Text style={styles.discountButtonTextRemove}>
                      {t(TEXT_CHECKOUT_REMOVE)}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[
                      styles.discountButton,
                      isApplyingDiscount && styles.discountButtonDisabled,
                    ]}
                    onPress={handleApplyDiscount}
                    disabled={isApplyingDiscount}
                  >
                    <Text style={styles.discountButtonText}>
                      {isApplyingDiscount
                        ? t(TEXT_LOADING)
                        : t(TEXT_CHECKOUT_APPLY)}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              {appliedVoucher && (
                <View style={styles.appliedDiscountContainer}>
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountBadgeText}>
                      {appliedVoucher.code}
                    </Text>
                  </View>
                  <Text style={styles.discountDesc}>
                    {appliedVoucher.description}
                  </Text>
                  <Text style={styles.discountValueText}>
                    Giảm {appliedVoucher.discountPercentage}%
                  </Text>
                </View>
              )}
              {vouchers?.length > 0 && (
                <View style={styles.availableCodesContainer}>
                  <Text style={styles.availableCodesTitle}>
                    {t(TEXT_CHECKOUT_AVAILABLE_CODES)}
                  </Text>
                  <View style={styles.codesList}>
                    {vouchers.map((v) => (
                      <TouchableOpacity
                        key={v.id}
                        style={[
                          styles.codeItem,
                          appliedVoucher?.id === v.id && styles.codeItemActive,
                          !v.isActive && styles.codeItemDisabled,
                        ]}
                        onPress={() => v.isActive && handleSelectVoucher(v)}
                        disabled={!v.isActive}
                      >
                        <Text
                          style={[
                            styles.codeBadge,
                            appliedVoucher?.id === v.id &&
                            styles.codeBadgeActive,
                            !v.isActive && styles.codeBadgeDisabled,
                          ]}
                        >
                          {v.code}
                        </Text>
                        {!v.isActive && (
                          <Text style={styles.codeStatus}>
                            {t(TEXT_EXPIRED)}
                          </Text>
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </View>

            {/* Payment Method */}
            <PaymentMethodCard
              styles={styles}
              t={t}
              paymentMethods={paymentMethods}
              selectedPaymentMethod={selectedPaymentMethod}
              setSelectedPaymentMethod={setSelectedPaymentMethod}
            />
          </View>
        </View>
        {/* Order Summary */}
        <View style={styles.rightColumn}>
          <OrderSummaryCard
            styles={styles}
            t={t}
            safeItems={safeItems}
            subtotal={subtotal}
            shippingFee={shippingFee}
            discountAmount={discountAmount}
            appliedVoucher={appliedVoucher}
            total={total}
            submitting={submitting}
            handleCheckout={handleCheckout}
          />
        </View>
      </View>

        <AuthModal
          visible={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={handleAuthSuccess}
        />
        {/* Modal thông báo */}
        <Modal visible={notifVisible} transparent animationType="fade" onRequestClose={() => setNotifVisible(false)}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: 400, backgroundColor: '#fff', borderRadius: 8, padding: 20 }}>
              <Text style={{ fontSize: 16, marginBottom: 12 }}>{notifMessage}</Text>
              <TouchableOpacity onPress={() => setNotifVisible(false)} style={{ alignSelf: 'flex-end', padding: 8 }}>
                <Text style={{ color: '#2563eb', fontWeight: '600' }}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      {/* Modal Picker */}
      <Modal
        visible={pickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {pickerType === "province"
                ? t(TEXT_CHECKOUT_PROVINCE)
                : t(TEXT_CHECKOUT_WARD)}
            </Text>
            <FlatList
              data={pickerData}
              keyExtractor={(item) =>
                item.code?.toString() || item.id?.toString()
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.pickerItem}
                  onPress={() => {
                    if (pickerType === "province") handleSelectProvince(item);
                    else if (pickerType === "ward") handleSelectWard(item);
                  }}
                >
                  <Text style={styles.pickerItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.pickerEmpty}> {t(TEXT_NO_DATA)}</Text>
              }
            />
            <TouchableOpacity
              onPress={() => setPickerVisible(false)}
              style={styles.modalClose}
            >
              <Text style={styles.modalCloseText}>{t(CLOSE_TEXT)}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
