const { orderService } = require("../services/order.service");
const { orderRepository } = require("../repositories/order.repository");

function toCsv(orders) {
  const header = "id,code,customerName,statusId,paymentStatus,total,createdAt";
  const rows = orders.map((o) =>
    [o.id, o.code, `"${o.customerName}"`, o.statusId, o.paymentStatus, o.total, o.createdAt].join(",")
  );
  return [header, ...rows].join("\n");
}

const orderController = {
  async create(req, res, next) {
    try {
      if (req.body.isMock || req.body.customerName) {
        const data = await orderService.createMockOrder(req.user, req.body);
        return res.status(201).json(data);
      }
      const data = await orderService.createOrder(req.user, req.body);
      res.status(201).json(data);
    } catch (e) {
      next(e);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const data = await orderService.updateOrderFull(id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const result = await orderService.deleteOrder(id);
      res.json(result);
    } catch (e) {
      next(e);
    }
  },

  async pay(req, res, next) {
    try {
      const { id } = req.params;
      const data = await orderService.makePayment(req.user, id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  },

  async getMyOrders(req, res, next) {
    try {
      const data = await orderService.getOrderHistory(req.user);
      res.json(data);
    } catch (e) {
      next(e);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await orderService.getOrderById(req.user, id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  },

  // UC-13 View Order List (Sale Staff / Public Order Search)
  async getAll(req, res, next) {
    try {
      const { statusId, code } = req.query;
      if (code) {
        const orders = await orderRepository.getByCode(code);
        return res.json(orders);
      }
      const data = await orderService.getAllOrders({ statusId });
      res.json(data);
    } catch (e) {
      next(e);
    }
  },

  // UC-16 Update Order Status (Sale Staff)
  async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const data = await orderService.updateOrderStatus(id, req.body.statusId);
      res.json(data);
    } catch (e) {
      next(e);
    }
  },

  async getStatuses(req, res, next) {
    try {
      const data = await orderService.getOrderStatuses();
      res.json(data);
    } catch (e) {
      next(e);
    }
  },

  // UC-15 View Sales Report (R, excel) - trả JSON hoặc CSV (?format=csv) để mở bằng Excel
  async getSalesReport(req, res, next) {
    try {
      const { from, to, format } = req.query;
      const orders = await orderRepository.getBetweenDates(from, to);
      const plainOrders = orders.map((o) => o.toJSON());

      const summary = {
        totalOrders: plainOrders.length,
        totalRevenue: plainOrders.reduce((sum, o) => sum + o.total, 0),
        paidOrders: plainOrders.filter((o) => o.paymentStatus === "Paid").length,
      };

      if (format === "csv" || format === "excel") {
        res.setHeader("Content-Type", "text/csv; charset=utf-8");
        res.setHeader("Content-Disposition", "attachment; filename=sales-report.csv");
        return res.send(toCsv(plainOrders));
      }

      res.json({ summary, orders: plainOrders });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = { orderController };
