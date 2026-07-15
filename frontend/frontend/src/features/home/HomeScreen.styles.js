import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  banner: {
    flexDirection: 'row',
    backgroundColor: '#111827', // thêm màu nền từ style cũ
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    width: '100%',
    marginTop: 30,
  },
  heroStamp: {
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#0066ff'
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0, 102, 255, 0.2)',
    borderWidth: 1,
    borderColor: '#0066ff',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  heroSection: {
    flex: 8,
    paddingVertical: '10%',
    paddingHorizontal: 0,
  },
  hotProductContainer: {
    flex: 4,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: '4%',
  },
  heroTitle: {
    fontSize: 50,
    fontWeight: '800',
    color: 'white',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 17,
    color: '#c2c2c2',
    marginBottom: 16,
  },
  productCount: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '600',
  },
  sectionTitle: {
    paddingHorizontal: 50,
    paddingVertical: 15,
    fontSize: 25,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
  },
  emptyText: {
    color: '#7d7d7d',
    fontSize: 20,
    textAlign: 'center',
  },
  buttonBox: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 15,
  },
  shoppingButton: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  shoppingButton1: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    backgroundColor: '#0066ff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: '#0066ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 25,
    elevation: 5,
  },
  buildConfigButton: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buildConfigButton1: {
    // empty
  },
  statusLine: {
    flexDirection: 'row',
    gap: 25,
    paddingVertical: 15,
  },
  statusLine1: {
    flexDirection: 'row',
    gap: 4,
  },
  statusLine2: {
    fontSize: 25,
    fontWeight: '700',
    color: 'white',
  },
  statusLine3: {
    fontSize: 14,
    color: '#c2c2c2',
  },
  productGrid: {
    paddingHorizontal: 30,
    paddingVertical: 0,
  },
  emptyContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 30,
  },
  categoryLine: {
    marginVertical: 24,
    paddingHorizontal: 45,
  },
  categoryHeader: {
    marginBottom: 16,
  },
  categoryScroll: {
    gap: 12,
    paddingVertical: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  categoryChipActive: {
    backgroundColor: '#0066ff',
    borderColor: '#0066ff',
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
  },
  categoryChipTextActive: {
    color: '#ffffff',
  },
  categoryLine1: {
    textTransform: 'uppercase',
    fontSize: 12,
    color: '#0066ff',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  categoryLine2: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 4,
  },
  categoryScrollContainer: {
    gap: 16,
    paddingVertical: 8,
    paddingRight: 16,
  },
  categoryCard: {
    width: 160,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',        // thêm shadow từ style cũ
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eef2f6',
    alignItems: 'center',
  },
  categoryCardActive: {
    borderColor: '#0066ff',
    backgroundColor: '#f0f7ff',
    shadowOpacity: 0.1,
  },
  categoryIconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryCardDesc: {
    fontSize: 12,
    color: '#5b677b',
    textAlign: 'center',
    marginBottom: 8,
  },
  categoryCardCount: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0066ff',
  },
  // Thêm style loader (đang thiếu)
  loader: {
    marginVertical: 20,
  },
});