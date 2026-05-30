import React from 'react';
import { View, StyleSheet } from 'react-native';
import TextIntl from './TextIntl';
import { TEXT_APP_TITLE } from '../constants/i18nKeys';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <TextIntl tx={TEXT_APP_TITLE} style={styles.footerText} />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  footerText: {
    color: '#475569',
    textAlign: 'center',
  },
});
