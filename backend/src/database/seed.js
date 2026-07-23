const mongoose = require("mongoose");
const path = require("path");
const demoData = require("../data/demo_data.json");
const { hashPassword } = require("../utils/password");

const Account = require("./models/Account.model");
const Product = require("./models/Product.model");
const Category = require("./models/Category.model");
const Manufacturer = require("./models/Manufacturer");
const Banner = require("./models/Banner.model");
const Showroom = require("./models/Showroom.model");
const Voucher = require("./models/Voucher.model");
const Order = require("./models/Order.model");
const OrderItem = require("./models/OrderItem.model");
const OrderStatus = require("./models/OrderStatus.model");
const Warehouse = require("./models/Warehouse.model");
const Cart = require("./models/Cart.model");
const Comment = require("./models/Comment.model");

async function seedDatabase() {
  try {
    console.log("[Seeding] Starting database seed process...");

    // 1. Accounts
    if ((await Account.countDocuments()) === 0 && demoData.accounts) {
      console.log("[Seeding] Populating Accounts...");
      const accountsToInsert = demoData.accounts.map((acc) => ({
        ...acc,
        passwordHash: hashPassword(acc.password || "123456"),
        password: acc.password || "123456",
      }));
      await Account.insertMany(accountsToInsert);
    }

    // 2. Categories
    if ((await Category.countDocuments()) === 0 && demoData.categories) {
      console.log("[Seeding] Populating Categories...");
      await Category.insertMany(demoData.categories);
    }

    // 3. Manufacturers
    if (Manufacturer && (await Manufacturer.countDocuments()) === 0 && demoData.manufacturers) {
      console.log("[Seeding] Populating Manufacturers...");
      await Manufacturer.insertMany(demoData.manufacturers);
    }

    // 4. Products
    if ((await Product.countDocuments()) === 0 && demoData.products) {
      console.log("[Seeding] Populating Products...");
      await Product.insertMany(demoData.products);
    }

    // 5. Banners
    if ((await Banner.countDocuments()) === 0 && demoData.banners) {
      console.log("[Seeding] Populating Banners...");
      await Banner.insertMany(demoData.banners);
    }

    // 6. Showrooms
    if ((await Showroom.countDocuments()) === 0 && demoData.showroom) {
      console.log("[Seeding] Populating Showrooms...");
      await Showroom.insertMany(demoData.showroom);
    }

    // 7. Vouchers
    if ((await Voucher.countDocuments()) === 0 && demoData.vouchers) {
      console.log("[Seeding] Populating Vouchers...");
      await Voucher.insertMany(demoData.vouchers);
    }

    // 8. OrderStatus
    if ((await OrderStatus.countDocuments()) === 0 && demoData.orderStatus) {
      console.log("[Seeding] Populating OrderStatus...");
      await OrderStatus.insertMany(demoData.orderStatus);
    }

    // 9. Orders
    if ((await Order.countDocuments()) === 0 && demoData.orders) {
      console.log("[Seeding] Populating Orders...");
      await Order.insertMany(demoData.orders);
    }

    // 10. OrderItems
    if ((await OrderItem.countDocuments()) === 0 && demoData.orderItems) {
      console.log("[Seeding] Populating OrderItems...");
      await OrderItem.insertMany(demoData.orderItems);
    }

    // 11. Warehouses
    if ((await Warehouse.countDocuments()) === 0 && demoData.warehouses) {
      console.log("[Seeding] Populating Warehouses...");
      await Warehouse.insertMany(demoData.warehouses);
    }

    // 12. Cart
    if ((await Cart.countDocuments()) === 0 && demoData.cart) {
      console.log("[Seeding] Populating Cart...");
      await Cart.insertMany(demoData.cart);
    }

    // 13. News
    if (demoData.news) {
      const { News } = require("./models/News.model");
      if ((await News.countDocuments()) === 0) {
        console.log("[Seeding] Populating News...");
        await News.insertMany(demoData.news);
      }
    }

    console.log("[Seeding] Database seeding complete.");
  } catch (error) {
    console.error("[Seeding] Error during seeding:", error);
  }
}

module.exports = { seedDatabase };
