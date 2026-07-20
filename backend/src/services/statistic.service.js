const Order = require("../database/models/Order.model");
const OrderItem = require("../database/models/OrderItem.model");
const Product = require("../database/models/Product.model");
const Account = require("../database/models/Account.model");

const statisticService = {
  // UC-23 View Statistics: tổng quan doanh thu, đơn hàng, tồn kho, khách hàng
  async getOverview() {
    const [orders, totalProducts, totalAccounts, lowStockProducts] = await Promise.all([
      Order.find(),
      Product.countDocuments(),
      Account.countDocuments(),
      Product.find({ stock: { $lte: 5 } }).sort({ stock: 1 }).limit(10),
    ]);

    const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === "Paid" ? o.total : 0), 0);
    const ordersByStatus = orders.reduce((acc, o) => {
      acc[o.statusId] = (acc[o.statusId] || 0) + 1;
      return acc;
    }, {});

    const items = await OrderItem.find();
    const soldByProduct = items.reduce((acc, i) => {
      acc[i.productId] = (acc[i.productId] || 0) + i.quantity;
      return acc;
    }, {});
    const topProductIds = Object.entries(soldByProduct)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([productId, quantitySold]) => ({ productId: Number(productId), quantitySold }));

    const topProducts = await Promise.all(
      topProductIds.map(async (t) => {
        const product = await Product.findOne({ id: t.productId });
        return { ...t, name: product ? product.name : `#${t.productId}` };
      })
    );

    return {
      totalOrders: orders.length,
      totalRevenue,
      totalProducts,
      totalAccounts,
      ordersByStatus,
      topProducts,
      lowStockProducts: lowStockProducts.map((p) => p.toJSON()),
    };
  },
};

module.exports = { statisticService };
