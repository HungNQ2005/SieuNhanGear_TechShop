/**
 * Seed script for SNGDB - SieuNhanGear Database
 * 
 * Usage:
 * 1. Ensure MongoDB is running on localhost:27017
 * 2. Run: node seed.js
 * 3. Script will clear existing data and seed with demo_data.json
 */

const path = require('path');
const backendDir = path.resolve(__dirname, '../backend');

// Ensure Node resolves dependencies from backend/node_modules
module.paths.unshift(path.join(backendDir, 'node_modules'));

let mongoose;
try {
  mongoose = require('mongoose');
} catch (error) {
  console.error('❌ Unable to load mongoose. Please install backend dependencies first:');
  console.error('   cd backend && npm install');
  process.exit(1);
}

const demoData = require('../frontend/demo_data.json');
const env = require('../backend/src/config/env.js').env;

// ===========================
// Define MongoDB Schemas
// ===========================

const categorySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  icon: String,
  subCategoriesCount: Number,
  status: String,
}, { timestamps: true, collection: 'categories' });

const manufacturerSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
}, { timestamps: true, collection: 'manufacturers' });

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, index: true },
  rating: Number,
  price: { type: Number, required: true },
  category_id: Number,
  manufacturer_id: Number,
  img_URL: String,
  description: String,
  stock: { type: Number, default: 0 },
}, { timestamps: true, collection: 'products' });

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: String,
  email: { type: String, required: true, unique: true, sparse: true },
  phone: String,
  role: String,
  password: String,
}, { timestamps: true, collection: 'accounts' });

const newsSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  tag: String,
  date: String,
  title: String,
  image: String,
}, { timestamps: true, collection: 'news' });

const bannerSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  img_URL: String,
}, { timestamps: true, collection: 'banners' });

const showroomSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: String,
  address: String,
  phone: String,
  website: String,
  latitude: Number,
  longitude: Number,
}, { timestamps: true, collection: 'showrooms' });

const cartSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  accountId: Number,
  productId: Number,
  quantity: Number,
}, { timestamps: true, collection: 'carts' });

const orderStatusSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: String,
  color: String,
}, { timestamps: true, collection: 'orderStatuses' });

const orderItemSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  orderId: Number,
  productId: Number,
  price: Number,
  quantity: Number,
}, { timestamps: true, collection: 'orderItems' });

const orderSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  code: String,
  customerId: Number,
  customerName: String,
  phone: String,
  address: String,
  statusId: Number,
  paymentMethod: String,
  paymentStatus: String,
  shippingCompanyId: Number,
  trackingCode: String,
  total: Number,
  createdAt: Date,
  accountId: Number,
  orderDate: Date,
  receiverName: String,
  email: String,
  province: String,
  provinceCode: String,
  ward: String,
  wardCode: String,
  shippingFee: Number,
  discountCode: String,
  discountAmount: Number,
  subtotal: Number,
  totalPrice: Number,
  status: String,
}, { timestamps: true, collection: 'orders' });

const shippingCompanySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: String,
  phone: String,
}, { timestamps: true, collection: 'shippingCompanies' });

const paymentMethodSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  code: String,
  name: String,
  description: String,
}, { timestamps: true, collection: 'paymentMethods' });

const voucherSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  code: String,
  description: String,
  discountPercentage: Number,
  minOrderValue: Number,
  isActive: Boolean,
}, { timestamps: true, collection: 'vouchers' });

const shippingAddressSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  accountId: Number,
  receiverName: String,
  email: String,
  phone: String,
  province: String,
  provinceCode: String,
  ward: String,
  wardCode: String,
  address: String,
  isDefault: Boolean,
}, { timestamps: true, collection: 'shippingAddresses' });

const warehouseSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: String,
  code: String,
  region: String,
}, { timestamps: true, collection: 'warehouses' });

const stockSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  productId: Number,
  warehouseId: Number,
  quantity: Number,
  lowStockThreshold: Number,
  criticalThreshold: Number,
  lastUpdated: Date,
  updatedBy: String,
}, { timestamps: true, collection: 'stocks' });

const stockHistorySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  productId: Number,
  warehouseId: Number,
  type: String,
  change: Number,
  quantityAfter: Number,
  date: Date,
  updatedBy: String,
  note: String,
}, { timestamps: true, collection: 'stockHistories' });

// ===========================
// Create Models
// ===========================

const Category = mongoose.model('Category', categorySchema);
const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);
const Product = mongoose.model('Product', productSchema);
const User = mongoose.model('User', userSchema);
const News = mongoose.model('News', newsSchema);
const Banner = mongoose.model('Banner', bannerSchema);
const Showroom = mongoose.model('Showroom', showroomSchema);
const Cart = mongoose.model('Cart', cartSchema);
const OrderStatus = mongoose.model('OrderStatus', orderStatusSchema);
const OrderItem = mongoose.model('OrderItem', orderItemSchema);
const Order = mongoose.model('Order', orderSchema);
const ShippingCompany = mongoose.model('ShippingCompany', shippingCompanySchema);
const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);
const Voucher = mongoose.model('Voucher', voucherSchema);
const ShippingAddress = mongoose.model('ShippingAddress', shippingAddressSchema);
const Warehouse = mongoose.model('Warehouse', warehouseSchema);
const Stock = mongoose.model('Stock', stockSchema);
const StockHistory = mongoose.model('StockHistory', stockHistorySchema);

// ===========================
// Seed Function
// ===========================

async function seedDatabase() {
  try {
    console.log('🚀 Starting database seeding...');
    console.log(`📡 Connecting to MongoDB: ${env.MONGODB_URI}`);

    // Connect to MongoDB
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log('✅ Connected to MongoDB');

    // Get the database connection
    const connection = mongoose.connection;
    const db = connection.db;

    // Drop all collections
    console.log('🗑️  Clearing existing collections...');
    const collections = await db.listCollections().toArray();
    for (const collection of collections) {
      await db.collection(collection.name).deleteMany({});
      console.log(`  ✓ Cleared ${collection.name}`);
    }

    // Seed data
    console.log('📥 Seeding data from demo_data.json...\n');

    // Seed Categories
    if (demoData.categories && demoData.categories.length > 0) {
      await Category.insertMany(demoData.categories);
      console.log(`✅ Seeded ${demoData.categories.length} categories`);
    }

    // Seed Manufacturers
    if (demoData.manufacturers && demoData.manufacturers.length > 0) {
      await Manufacturer.insertMany(demoData.manufacturers);
      console.log(`✅ Seeded ${demoData.manufacturers.length} manufacturers`);
    }

    // Seed Products
    if (demoData.products && demoData.products.length > 0) {
      await Product.insertMany(demoData.products);
      console.log(`✅ Seeded ${demoData.products.length} products`);
    }

    // Seed Users (Accounts)
    if (demoData.accounts && demoData.accounts.length > 0) {
      await User.insertMany(demoData.accounts);
      console.log(`✅ Seeded ${demoData.accounts.length} accounts`);
    }

    // Seed News
    if (demoData.news && demoData.news.length > 0) {
      await News.insertMany(demoData.news);
      console.log(`✅ Seeded ${demoData.news.length} news`);
    }

    // Seed Banners
    if (demoData.banners && demoData.banners.length > 0) {
      await Banner.insertMany(demoData.banners);
      console.log(`✅ Seeded ${demoData.banners.length} banners`);
    }

    // Seed Showrooms
    if (demoData.showroom && demoData.showroom.length > 0) {
      await Showroom.insertMany(demoData.showroom);
      console.log(`✅ Seeded ${demoData.showroom.length} showrooms`);
    }

    // Seed Carts
    if (demoData.cart && demoData.cart.length > 0) {
      await Cart.insertMany(demoData.cart);
      console.log(`✅ Seeded ${demoData.cart.length} cart items`);
    }

    // Seed Order Statuses
    if (demoData.orderStatus && demoData.orderStatus.length > 0) {
      await OrderStatus.insertMany(demoData.orderStatus);
      console.log(`✅ Seeded ${demoData.orderStatus.length} order statuses`);
    }

    // Seed Order Items
    if (demoData.orderItems && demoData.orderItems.length > 0) {
      await OrderItem.insertMany(demoData.orderItems);
      console.log(`✅ Seeded ${demoData.orderItems.length} order items`);
    }

    // Seed Orders
    if (demoData.orders && demoData.orders.length > 0) {
      await Order.insertMany(demoData.orders);
      console.log(`✅ Seeded ${demoData.orders.length} orders`);
    }

    // Seed Shipping Companies
    if (demoData.shippingCompanies && demoData.shippingCompanies.length > 0) {
      await ShippingCompany.insertMany(demoData.shippingCompanies);
      console.log(`✅ Seeded ${demoData.shippingCompanies.length} shipping companies`);
    }

    // Seed Payment Methods
    if (demoData.paymentMethods && demoData.paymentMethods.length > 0) {
      await PaymentMethod.insertMany(demoData.paymentMethods);
      console.log(`✅ Seeded ${demoData.paymentMethods.length} payment methods`);
    }

    // Seed Vouchers
    if (demoData.vouchers && demoData.vouchers.length > 0) {
      await Voucher.insertMany(demoData.vouchers);
      console.log(`✅ Seeded ${demoData.vouchers.length} vouchers`);
    }

    // Seed Shipping Addresses
    if (demoData.shippingAddresses && demoData.shippingAddresses.length > 0) {
      await ShippingAddress.insertMany(demoData.shippingAddresses);
      console.log(`✅ Seeded ${demoData.shippingAddresses.length} shipping addresses`);
    }

    // Seed Warehouses
    if (demoData.warehouses && demoData.warehouses.length > 0) {
      await Warehouse.insertMany(demoData.warehouses);
      console.log(`✅ Seeded ${demoData.warehouses.length} warehouses`);
    }

    // Seed Stock
    if (demoData.stock && demoData.stock.length > 0) {
      await Stock.insertMany(demoData.stock);
      console.log(`✅ Seeded ${demoData.stock.length} stock records`);
    }

    // Seed Stock History
    if (demoData.stockHistory && demoData.stockHistory.length > 0) {
      await StockHistory.insertMany(demoData.stockHistory);
      console.log(`✅ Seeded ${demoData.stockHistory.length} stock history records`);
    }

    console.log('\n🎉 Database seeding completed successfully!');
    console.log(`📊 Database: SNGDB`);
    console.log(`📍 Connection: ${env.MONGODB_URI}`);

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

// ===========================
// Run Seeding
// ===========================

seedDatabase();
