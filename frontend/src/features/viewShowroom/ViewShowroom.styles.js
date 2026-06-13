import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  page: {
    padding: 16,
    backgroundColor: '#F8FAFC',
    minHeight: 600,
  },

  header: {
    marginTop: 8,
    marginBottom: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 13,
    color: '#64748B',
  },

  content: {
    flexDirection: 'column',
    gap: 12,
  },

  grid: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },

  list: {
    width: 340,
    maxWidth: '40%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },

  listItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    cursor: 'pointer',
  },

  listItemActive: {
    backgroundColor: '#EFF6FF',
  },

  listName: {
    fontWeight: '700',
    color: '#0F172A',
    fontSize: 14,
    marginBottom: 4,
  },

  listText: {
    color: '#475569',
    fontSize: 12,
    marginBottom: 2,
  },

  mapWrap: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minHeight: 520,
  },

  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  errorText: {
    color: '#DC2626',
    fontSize: 13,
    marginTop: 8,
  },

  loaderWrap: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

