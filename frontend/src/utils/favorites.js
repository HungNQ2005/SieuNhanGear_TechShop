export const getFavorites = () => {
  if (typeof localStorage === 'undefined') return [];
  try {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

export const isFavorite = (productId) => {
  const favorites = getFavorites();
  return favorites.some((item) => String(item.id || item._id) === String(productId));
};

export const toggleFavorite = (product) => {
  if (!product) return false;
  const productId = product.id || product._id;
  const favorites = getFavorites();
  const index = favorites.findIndex((item) => String(item.id || item._id) === String(productId));

  let updated = [];
  let added = false;
  if (index >= 0) {
    updated = favorites.filter((_, i) => i !== index);
    added = false;
  } else {
    updated = [...favorites, product];
    added = true;
  }

  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem('favorites', JSON.stringify(updated));
      window.dispatchEvent(new Event('favoritesUpdated'));
    } catch (e) {
      console.error('Failed to update favorites', e);
    }
  }

  return added;
};
