const fs = require('fs');
const path = require('path');

function loadDemo() {
  const filePath = path.resolve(__dirname, "../../../data/demo_data.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
};

const catalogRepository = {
  getBanners() {
    const demo = loadDemo();
    return demo.banners || [];
  },

  getProducts() {
    const demo = loadDemo();
    return demo.products || [];
  },

  getCategories() {
    const demo = loadDemo();
    return demo.categories || [];
  },

  getManufacturers() {
    const demo = loadDemo();
    return demo.manufacturers || [];
  },
};

module.exports = { catalogRepository };

