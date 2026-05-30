import React, { useState } from 'react';
import { View, Pressable, StyleSheet, TextInput } from 'react-native';
import TextIntl from './TextIntl';
import { useLocalization } from '../providers/LocalizationProvider';
import {
  TEXT_APP_TITLE,
  TEXT_CHANGE_LANGUAGE,
  TEXT_SEARCH_PLACEHOLDER,
  TEXT_HOTLINE_LABEL,
  TEXT_HOTLINE_NUMBER,
  TEXT_SHOWROOM_LABEL,
  TEXT_TRACK_ORDER_LABEL,
} from '../constants/i18nKeys';

export default function Header() {
  const { locale, toggleLocale, t } = useLocalization();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Pressable onPress={() => {}}>
          <TextIntl tx={TEXT_APP_TITLE} style={styles.title} />
        </Pressable>

        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={t(TEXT_SEARCH_PLACEHOLDER)}
          style={styles.search}
          returnKeyType="search"
          onSubmitEditing={() => {}}
        />

        <View style={styles.right}>
          <View style={styles.hotline}>
            <TextIntl tx={TEXT_HOTLINE_LABEL} style={styles.hotlineLabel} />
            <TextIntl tx={TEXT_HOTLINE_NUMBER} style={styles.hotlineNumber} />
          </View>

          <Pressable style={styles.trackButton} onPress={() => {}}>
            <TextIntl tx={TEXT_TRACK_ORDER_LABEL} style={styles.trackText} />
          </Pressable>

          <Pressable onPress={toggleLocale} style={styles.langButton}>
            <TextIntl tx={TEXT_CHANGE_LANGUAGE} style={styles.langText} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e6eef8',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },
  search: {
    flex: 1,
    height: 40,
    paddingHorizontal: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e6eef8',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  hotline: {
    alignItems: 'flex-end',
    marginRight: 8,
  },
  hotlineLabel: {
    fontSize: 10,
    color: '#64748b',
  },
  hotlineNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
  },
  trackButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  trackText: {
    fontSize: 12,
    color: '#0f172a',
    fontWeight: '600',
  },
  langButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  langText: {
    fontSize: 12,
    color: '#0f172a',
    fontWeight: '700',
  },
});

