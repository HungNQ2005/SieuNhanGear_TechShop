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
import { deleteCart } from "../../services/CartService";
import { getAccounts } from "../../services/api";
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

export default function CheckoutPage() {
  const { t } = useLocalization();
  const [accountId, setAccountId] = useState(null);
  const { items, loadCart, clearCart } = useCart();
  const [paymentMethods, setPaymentMethods] = useState([]);
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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [wards, setWards] = useState([]);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerType, setPickerType] = useState("");
  const [pickerData, setPickerData] = useState([]);

  useEffect(() => {
    const initData = async () => {
      try {
        // Lấy account đầu tiên
        const accountRes = await getAccounts();

        const account = accountRes.data?.[0];

        if (!account) return;

        setAccountId(account.id);

        await loadCart(account.id);

        const [paymentRes, voucherRes, provinceData, shippingRes] =
          await Promise.all([
            getPaymentMethods(),
            getVouchers(),
            getProvinces(),
            getShippingAddressByAccount(account.id),
          ]);

        setPaymentMethods(paymentRes?.data || []);
        setVouchers(voucherRes?.data || []);
        setProvinces(provinceData?.data || []);

        if (paymentRes?.data?.length) {
          setSelectedPaymentMethod(paymentRes.data[0].code);
        }

        const shipping = shippingRes?.data?.[0];

        if (shipping) {
          setFormData({
            name: shipping.receiverName,
            email: shipping.email,
            phone: shipping.phone,
            province: shipping.province,
            provinceCode: shipping.provinceCode,
            ward: shipping.ward,
            wardCode: shipping.wardCode,
            address: shipping.address,
          });

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
    if (empty.length || !safeItems.length) return;

    setSubmitting(true);
    try {
      const orderPayload = {
        accountId: accountId,
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
      };
      const { data: createdOrder } = await createOrder(orderPayload);
      await Promise.all(
        safeItems.map((item) =>
          createOrderItem({
            orderId: createdOrder.id,
            productId: item.id,
            quantity: item.quantity || 1,
            price: item.price || 0,
          }),
        ),
      );
      await Promise.all(
        safeItems.map((item) =>
          item.cartId ? deleteCart(item.cartId) : Promise.resolve(),
        ),
      );
      clearCart();
    } catch (_) { }
    setSubmitting(false);
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
