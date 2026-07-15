import React from 'react';
import { View, Text, Pressable, Linking, StyleSheet } from 'react-native';
import TextIntl from './TextIntl';
import {
  TEXT_APP_TITLE,
  TEXT_FOOTER_DESCRIPTION,
  TEXT_FOOTER_HOTLINE,
  TEXT_FOOTER_EMAIL,
  TEXT_FOOTER_ADDRESS,
  TEXT_FOOTER_PRODUCTS_TITLE,
  TEXT_FOOTER_PRODUCT_PC,
  TEXT_FOOTER_PRODUCT_CPU_MB,
  TEXT_FOOTER_PRODUCT_GPU,
  TEXT_FOOTER_PRODUCT_RAM,
  TEXT_FOOTER_PRODUCT_SSD,
  TEXT_FOOTER_PRODUCT_LAPTOP,
  TEXT_FOOTER_PRODUCT_COOLER,
  TEXT_FOOTER_PRODUCT_HEADPHONE,
  TEXT_FOOTER_PRODUCT_MOUSE,
  TEXT_FOOTER_SUPPORT_TITLE,
  TEXT_FOOTER_SUPPORT_GUIDE,
  TEXT_FOOTER_SUPPORT_WARRANTY,
  TEXT_FOOTER_SUPPORT_RETURN,
  TEXT_FOOTER_SUPPORT_TRACK,
  TEXT_FOOTER_SUPPORT_CONFIG,
  TEXT_FOOTER_SUPPORT_FAQ,
  TEXT_FOOTER_ABOUT_TITLE,
  TEXT_FOOTER_ABOUT_COMPANY,
  TEXT_FOOTER_ABOUT_SHOWROOM,
  TEXT_FOOTER_ABOUT_RECRUIT,
  TEXT_FOOTER_ABOUT_NEWS,
  TEXT_FOOTER_ABOUT_TERMS,
  TEXT_FOOTER_ABOUT_PRIVACY,
  TEXT_FOOTER_COPYRIGHT,
  TEXT_FOOTER_SECURE_PAYMENT,
} from '../constants/i18nKeys';

const FooterLink = ({ onPress, children }) => (
  <Pressable onPress={onPress} style={styles.footerLink}>
    <Text style={styles.footerLinkText}>{children}</Text>
  </Pressable>
);

const IconBox = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

export default function Footer() {
  const handleEmailPress = () => {
    Linking.openURL('mailto:support@sieuNhanGear.vn');
  };

  const handleHotlinePress = () => {
    Linking.openURL('tel:18009999');
  };

  return (
    <View style={styles.footerContainer}>
      <View style={styles.innerContainer}>
        {/* Grid: 4 cột */}
        <View style={styles.gridContainer}>

          {/* Cột 1: Thông tin công ty */}
          <View style={[styles.column, styles.columnCompany]}>
            <View style={styles.logoRow}>
              <View style={styles.logoBox}>
                <IconBox />
              </View>
              <Text style={styles.logoText}>
                <TextIntl tx={TEXT_APP_TITLE} />
              </Text>
            </View>

            <Text style={styles.description}>
              <TextIntl tx={TEXT_FOOTER_DESCRIPTION} />
            </Text>
            <Pressable onPress={handleHotlinePress} style={styles.hotlinePressable}>
              <Text style={styles.hotlineText}>
                <TextIntl tx={TEXT_FOOTER_HOTLINE} />
              </Text>
            </Pressable>
            <Pressable onPress={handleEmailPress}>
              <Text style={styles.emailText}>
                <TextIntl tx={TEXT_FOOTER_EMAIL} />
              </Text>
            </Pressable>
            <Text style={styles.addressText}>
              <TextIntl tx={TEXT_FOOTER_ADDRESS} />
            </Text>
          </View>

          {/* Cột 2: Sản phẩm */}
          <View style={[styles.column, styles.columnProducts]}>
            <Text style={styles.columnTitle}>
              <TextIntl tx={TEXT_FOOTER_PRODUCTS_TITLE} />
            </Text>
            <FooterLink><TextIntl tx={TEXT_FOOTER_PRODUCT_PC} /></FooterLink>
            <FooterLink><TextIntl tx={TEXT_FOOTER_PRODUCT_CPU_MB} /></FooterLink>
            <FooterLink><TextIntl tx={TEXT_FOOTER_PRODUCT_GPU} /></FooterLink>
            <FooterLink><TextIntl tx={TEXT_FOOTER_PRODUCT_RAM} /></FooterLink>
            <FooterLink><TextIntl tx={TEXT_FOOTER_PRODUCT_SSD} /></FooterLink>
            <FooterLink><TextIntl tx={TEXT_FOOTER_PRODUCT_LAPTOP} /></FooterLink>
            <FooterLink><TextIntl tx={TEXT_FOOTER_PRODUCT_COOLER} /></FooterLink>
            <FooterLink><TextIntl tx={TEXT_FOOTER_PRODUCT_HEADPHONE} /></FooterLink>
            <FooterLink><TextIntl tx={TEXT_FOOTER_PRODUCT_MOUSE} /></FooterLink>
          </View>

          {/* Cột 3: Hỗ trợ */}
          <View style={[styles.column, styles.columnSupport]}>
            <Text style={styles.columnTitle}>
              <TextIntl tx={TEXT_FOOTER_SUPPORT_TITLE} />
            </Text>
            <FooterLink><TextIntl tx={TEXT_FOOTER_SUPPORT_GUIDE} /></FooterLink>
            <FooterLink><TextIntl tx={TEXT_FOOTER_SUPPORT_WARRANTY} /></FooterLink>
            <FooterLink><TextIntl tx={TEXT_FOOTER_SUPPORT_RETURN} /></FooterLink>
            <FooterLink><TextIntl tx={TEXT_FOOTER_SUPPORT_TRACK} /></FooterLink>
            <FooterLink><TextIntl tx={TEXT_FOOTER_SUPPORT_CONFIG} /></FooterLink>
            <FooterLink><TextIntl tx={TEXT_FOOTER_SUPPORT_FAQ} /></FooterLink>
          </View>

          {/* Cột 4: Về SieuNhanGear */}
          <View style={[styles.column, styles.columnAbout]}>
            <Text style={styles.columnTitle}>
              <TextIntl tx={TEXT_FOOTER_ABOUT_TITLE} />
            </Text>
            <FooterLink><TextIntl tx={TEXT_FOOTER_ABOUT_COMPANY} /></FooterLink>
            <FooterLink><TextIntl tx={TEXT_FOOTER_ABOUT_SHOWROOM} /></FooterLink>
            <FooterLink><TextIntl tx={TEXT_FOOTER_ABOUT_RECRUIT} /></FooterLink>
            <FooterLink><TextIntl tx={TEXT_FOOTER_ABOUT_NEWS} /></FooterLink>
            <FooterLink><TextIntl tx={TEXT_FOOTER_ABOUT_TERMS} /></FooterLink>
            <FooterLink><TextIntl tx={TEXT_FOOTER_ABOUT_PRIVACY} /></FooterLink>
          </View>
        </View>

        {/* Copyright - dòng cuối */}
        <View style={styles.copyrightRow}>
          <Text style={styles.copyrightText}>
            <TextIntl tx={TEXT_FOOTER_COPYRIGHT} />
          </Text>
          <Text style={styles.paymentText}>
            <TextIntl tx={TEXT_FOOTER_SECURE_PAYMENT} />
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    backgroundColor: '#040a29',
    borderWidth: 0,
    borderColor: '#e5e7eb', 
    marginTop: 4,
  },
  innerContainer: {
    maxWidth: 1280,
    marginHorizontal: 'auto',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 32,
  },
  column: {
    flex: 1,
    minWidth: 200, 
  },
  columnCompany: {
    minWidth: 200,
  },
  columnProducts: {
    minWidth: 150,
  },
  columnSupport: {
    minWidth: 150,
  },
  columnAbout: {
    minWidth: 180,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBox: {
    width: 32,
    height: 32,
    backgroundColor: '#2563eb',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  description: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  hotlinePressable: {
    marginBottom: 8,
  },
  hotlineText: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '600',
  },
  emailText: {
    color: '#9ca3af',
    fontSize: 14,
  },
  addressText: {
    color: '#9ca3af',
    fontSize: 14,
    marginTop: 8,
  },
  columnTitle: {
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  footerLink: {
    paddingVertical: 4,
  },
  footerLinkText: {
    color: '#9ca3af',
    fontSize: 14,
  },
  copyrightRow: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    marginTop: 32,
    paddingTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  copyrightText: {
    color: '#6b7280',
    fontSize: 14,
  },
  paymentText: {
    color: '#6b7280',
    fontSize: 14,
  },
});