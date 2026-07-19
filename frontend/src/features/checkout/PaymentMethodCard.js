import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { IconPaymentMethod } from "../../constants/icons";
import { TEXT_CHECKOUT_PAYMENT_METHOD } from "../../constants/i18nKeys";

export default function PaymentMethodCard({
  styles,
  t,
  paymentMethods,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionIconContainer}>
          <IconPaymentMethod />
        </View>

        <Text style={styles.sectionTitle}>
          {t(TEXT_CHECKOUT_PAYMENT_METHOD)}
        </Text>
      </View>

      <View style={styles.methodsContainer}>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.methodCard,
              selectedPaymentMethod === method.code &&
                styles.methodCardSelected,
            ]}
            onPress={() => setSelectedPaymentMethod(method.code)}
          >
            <View style={styles.methodRadio}>
              {selectedPaymentMethod === method.code && (
                <View style={styles.methodRadioSelected} />
              )}
            </View>

            <View style={styles.methodInfo}>
              <Text style={styles.methodLabel}>{method.name}</Text>
 
              {method.description ? (
                <Text style={styles.methodDescription}>
                  {method.description}
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
