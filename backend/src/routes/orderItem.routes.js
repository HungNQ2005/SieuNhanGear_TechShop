const express = require("express");
const { orderItemRepository } = require("../repositories/orderItem.repository");
const demoData = require("../data/demo_data.json");

function createOrderItemRouter() {
  const router = express.Router();

  // GET /api/orderItems?orderId=...
  router.get("/", async (req, res) => {
    try {
      const { orderId } = req.query;
      if (orderId) {
        let items = await orderItemRepository.getByOrder(orderId);
        if (!items || items.length === 0) {
          items = (demoData.orderItems || []).filter(
            (item) => String(item.orderId) === String(orderId)
          );
        }
        return res.json(items);
      }
      let allItems = await orderItemRepository.getByOrder(0);
      if (!allItems || allItems.length === 0) {
        allItems = demoData.orderItems || [];
      }
      res.json(allItems);
    } catch (err) {
      const { orderId } = req.query;
      const fallback = (demoData.orderItems || []).filter(
        (item) => String(item.orderId) === String(orderId)
      );
      res.json(fallback);
    }
  });

  return router;
}

module.exports = { createOrderItemRouter };
