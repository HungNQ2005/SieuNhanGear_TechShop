import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  pageContent: {
    marginHorizontal: 'auto',
    paddingVertical: 32,
  },

  // Center screen (loading / error)
  centerScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    gap: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
  },
  backBtn: {
    backgroundColor: '#0066ff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    cursor: 'pointer',
  },
  backBtnText: {
    color: '#fff',
    fontWeight: '600',
  },

  // Breadcrumb
  breadcrumbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 2,
    borderRadius: 8,
  },
  backLinkText: {
    fontSize: 14,
    color: '#9ca3af',
    fontWeight: '400',
  },
  breadcrumbCategory: {
    fontSize: 14,
    color: '#9ca3af',
  },
  breadcrumbCategory1: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  separator: {
    fontSize: 14,
    color: '#9ca3af',
    marginHorizontal: 4,
  },

  // Product section
  productSection: {
    flexDirection: 'row',
    gap: 48,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 40,
    elevation: 4,
    flexWrap: 'wrap',
  },
  productInfoFlow: {
    flexDirection: 'row',
    gap: 14,
  },

  // Image
  imageWrapper: {
    flex: 1.2,
    minWidth: 400,
    position: 'relative',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: 480,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: 340,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8ecf0',
  },
  imagePlaceholderText: {
    color: '#9ca3af',
    fontSize: 16,
  },
  brandBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  // Info
  infoWrapper: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 32,
    elevation: 4,
    marginBottom: 24,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  tagManufacturer: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0066ff',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  tagCategory: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  productName: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0f172a',
    lineHeight: 40,
  },

  // Rating
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  star: {
    fontSize: 18,
  },
  starFilled: {
    color: '#f59e0b',
  },
  starEmpty: {
    color: '#d1d5db',
  },
  ratingNum: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
    marginLeft: 4,
  },
  ratingLabel: {
    fontSize: 13,
    color: '#9ca3af',
  },

  // Price
  price: {
    fontSize: 38,
    fontWeight: '900',
    color: '#0066ff',
    marginVertical: 4,
  },

  // Trust badges
  trustRow: {
    flexDirection: 'row',
    gap: 24,
    flexWrap: 'wrap',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  trustText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },

  // Description
  descBlock: {
    gap: 6,
  },
  descTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  descText: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 24,
  },

  // Actions
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    marginTop: 6,
  },
  addToCartBtn: {
    flex: 1.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#0066ff',
    paddingVertical: 16,
    borderRadius: 12,
    cursor: 'pointer',
  },
  addedBtn: {
    backgroundColor: '#10b981',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  buyNowBtn: {
    flex: 1,
    minWidth: 140,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0066ff',
    backgroundColor: '#fff',
  },
  buyNowText: {
    color: '#0066ff',
    fontSize: 15,
    fontWeight: '700',
  },

  // Specs
  specsSection: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 32,
    elevation: 4,
  },
  specsTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 24,
  },
  specRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  specRowLast: {
    borderBottomWidth: 0,
  },
  specLabel: {
    width: 200,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
    backgroundColor: '#f8fafc',
  },
  specValue: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#1e293b',
    lineHeight: 20,
  },
  //Comment
  commentsSection: {
    marginTop: 32,
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 16,
  },
  // Related
  relatedSection: {
    marginTop: 48,
    paddingHorizontal: 4,
  },
  relatedTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 20,
    paddingLeft: 8,
  },
  relatedScroll: {
    gap: 16,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
});