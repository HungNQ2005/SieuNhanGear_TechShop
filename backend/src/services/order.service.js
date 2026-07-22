const { orderRepository } = require("../repositories/order.repository");
const { orderItemRepository } = require("../repositories/orderItem.repository");
const { orderStatusRepository } = require("../repositories/orderStatus.repository");
const { cartRepository } = require("../features/cart/repositories/cart.repository");
const { productRepository } = require("../repositories/product.repository");
const { accountRepository } = require("../repositories/account.repository");
const { HttpError } = require("../errors/httpError");

async function attachItems(order) {
  if (!order || !order.id || isNaN(order.id)) {
    console.warn("Warning: Order has invalid ID", { orderId: order?.id, order: order?.toJSON?.() });
    return { ...order.toJSON(), items: [] };
  }
  const items = await orderItemRepository.getByOrder(order.id);
  return { ...order.toJSON(), items: items.map((i) => i.toJSON()) };
}

function assertOwnerOrStaff(order, user) {
  const staffRoles = ["sales_staff", "system_admin"];
  if (order.customerId !== user.id && !staffRoles.includes(user.role)) {
    throw new HttpError({ code: "FORBIDDEN", statusCode: 403, message: "You cannot access this order" });
  }
}

const orderService = {
  // UC-09 Create Order: tạo đơn từ giỏ hàng hiện tại của user
  async createOrder(user, { phone, address, shippingCompanyId, paymentMethod, voucherCode }) {
    if (!address || !String(address).trim()) {
      throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: "address is required" });
    }

    const cartItems = await cartRepository.getAllByAccount(user.id);
    if (!cartItems.length) {
      throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: "Cart is empty" });
    }

    const account = await accountRepository.getById(user.id);

    let total = 0;
    const orderItemsInput = [];
    for (const cartItem of cartItems) {
      const product = await productRepository.getById(cartItem.productId);
      if (!product) {
        throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: `Product ${cartItem.productId} no longer exists` });
      }
      if (product.stock !== undefined && cartItem.quantity > product.stock) {
        throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: `"${product.name}" does not have enough stock` });
      }
      total += product.price * cartItem.quantity;
      orderItemsInput.push({
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: cartItem.quantity,
      });
    }

    const order = await orderRepository.create({
      customerId: user.id,
      customerName: account ? account.name : user.email,
      phone: phone || (account ? account.phone : ""),
      address: String(address).trim(),
      statusId: 1, // Pending
      paymentMethod: paymentMethod || "COD",
      paymentStatus: "Pending",
      shippingCompanyId: shippingCompanyId ? Number(shippingCompanyId) : null,
      voucherCode: voucherCode || "",
      total,
    });

    const items = await orderItemRepository.createMany(
      orderItemsInput.map((i) => ({ ...i, orderId: order.id }))
    );

    // Trừ tồn kho sau khi tạo đơn thành công
    for (const cartItem of cartItems) {
      const product = await productRepository.getById(cartItem.productId);
      if (product) {
        await productRepository.update(product.id, { stock: Math.max(0, product.stock - cartItem.quantity) });
      }
    }

    await cartRepository.clearByAccount(user.id);

    return { ...order.toJSON(), items: items.map((i) => i.toJSON()) };
  },

  // UC-10 Make Payment
  async makePayment(user, orderId, { paymentStatus }) {
    const order = await orderRepository.getById(orderId);
    if (!order) {
      throw new HttpError({ code: "NOT_FOUND", statusCode: 404, message: "Order not found" });
    }
    assertOwnerOrStaff(order, user);

    const allowed = ["Pending", "Paid", "Failed"];
    const nextStatus = allowed.includes(paymentStatus) ? paymentStatus : "Paid";

    const updated = await orderRepository.updatePayment(orderId, nextStatus);
    return attachItems(updated);
  },

  // UC-08 View Order History (Customer)
  async getOrderHistory(user) {
    const orders = await orderRepository.getAll({ customerId: user.id });
    return Promise.all(orders.map(attachItems));
  },

  // UC-14 View Order Status / xem chi tiết 1 đơn
  async getOrderById(user, orderId) {
    const order = await orderRepository.getById(orderId);
    if (!order) {
      throw new HttpError({ code: "NOT_FOUND", statusCode: 404, message: "Order not found" });
    }
    assertOwnerOrStaff(order, user);
    return attachItems(order);
  },

  // UC-13 View Order List (Sale Staff / System Admin - xem tất cả đơn)
  async getAllOrders({ statusId } = {}) {
    const orders = await orderRepository.getAll({ statusId });
    return Promise.all(orders.map(attachItems));
  },

  // UC-16 Update Order Status (Sale Staff)
  async updateOrderStatus(orderId, statusId) {
    const numericStatusId = Number(statusId);
    const status = await orderStatusRepository.getById(numericStatusId);
    if (!status) {
      throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: "Invalid statusId" });
    }
    const order = await orderRepository.updateStatus(orderId, numericStatusId);
    if (!order) {
      throw new HttpError({ code: "NOT_FOUND", statusCode: 404, message: "Order not found" });
    }
    return attachItems(order);
  },

  async getOrderStatuses() {
    return orderStatusRepository.getAll();
  },

  async deleteOrder(orderId) {
    const deleted = await orderRepository.delete(orderId);
    if (!deleted) {
      throw new HttpError({ code: "NOT_FOUND", statusCode: 404, message: "Order not found" });
    }
    try {
      await orderItemRepository.deleteByOrder(orderId);
    } catch (e) {
      // Ignore if orderItemRepository does not have deleteByOrder
    }
    return { message: "Order deleted successfully", id: orderId };
  },

  async updateOrderFull(orderId, data) {
    const updated = await orderRepository.update(orderId, data);
    if (!updated) {
      throw new HttpError({ code: "NOT_FOUND", statusCode: 404, message: "Order not found" });
    }
    return attachItems(updated);
  },

  async createMockOrder(user, data) {
    const customerName = data.receiverName || data.customerName || (user ? user.name || user.email : "Khách hàng");
    const phone = data.phone || (user ? user.phone : "") || "0900000000";
    const address = data.address || "Việt Nam";
    const email = data.email || (user ? user.email : "");
    const statusId = Number(data.statusId) || 1;
    const paymentMethod = data.paymentMethod || "COD";
    const paymentStatus = data.paymentStatus || "Pending";
    const total = Number(data.totalPrice ?? data.total) || 0;

    const order = await orderRepository.create({
      customerId: user ? (user.id || user._id || 1) : 1,
      customerName,
      email,
      phone,
      address,
      province: data.province || "",
      provinceCode: data.provinceCode || "",
      ward: data.ward || "",
      wardCode: data.wardCode || "",
      statusId,
      status: data.status || "Pending",
      paymentMethod,
      paymentStatus,
      subtotal: Number(data.subtotal) || total,
      shippingFee: Number(data.shippingFee) || 0,
      total,
      totalPrice: total,
      voucherCode: data.discountCode || data.voucherCode || "",
      discountCode: data.discountCode || "",
      discountAmount: Number(data.discountAmount) || 0,
      trackingCode: data.trackingCode || `SN${Date.now()}`,
    });

    if (Array.isArray(data.items) && data.items.length > 0) {
      try {
        await orderItemRepository.createMany(
          data.items.map((item) => ({
            orderId: order.id,
            productId: item.productId || item.id || 1,
            price: item.price || 0,
            quantity: item.quantity || 1,
          }))
        );
      } catch (e) {
        console.log("Create order items warning:", e);
      }
    }

    if (user && (user.id || user._id)) {
      try {
        await cartRepository.clearByAccount(user.id || user._id);
      } catch (_) {}
    }

    return attachItems(order);
  },
};

module.exports = { orderService };
