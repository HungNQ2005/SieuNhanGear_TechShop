const { catalogRepository } = require('../repositories/catalog.repository');

const catalogService = {
  async getBanners() {
    return catalogRepository.getBanners();
  },
  async getProducts() {
    return catalogRepository.getProducts();
  },
  async getCategories() {
    return catalogRepository.getCategories();
  },
  async getManufacturers() {
    return catalogRepository.getManufacturers();
  },
};

module.exports = { catalogService };

