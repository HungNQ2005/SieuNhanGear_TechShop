const CartItem = require("../../../database/models/Cart.model");
const { nextId } = require("../../../utils/nextId");

const cartRepository = {
  async getAllByAccount(accountId) {
    return CartItem.find({ accountId: Number(accountId) }).sort({ id: 1 });
  },

  async getOne(accountId, productId) {
    return CartItem.findOne({ accountId: Number(accountId), productId: Number(productId) });
  },

  async getById(id) {
    return CartItem.findOne({ id: Number(id) });
  },

  async create(data) {
    const id = await nextId(CartItem);
    const item = new CartItem({ ...data, id });
    return item.save();
  },

  async updateQuantity(id, quantity) {
    return CartItem.findOneAndUpdate({ id: Number(id) }, { quantity }, { new: true, runValidators: true });
  },

  async delete(id) {
    return CartItem.findOneAndDelete({ id: Number(id) });
  },

  async clearByAccount(accountId) {
    return CartItem.deleteMany({ accountId: Number(accountId) });
  },

  async syncByAccount(accountId, items) {
    await CartItem.deleteMany({ accountId: Number(accountId) });
    const createdItems = [];
    for (const item of items) {
      const id = await nextId(CartItem);
      const newDoc = new CartItem({
        id,
        accountId: Number(accountId),
        productId: Number(item.productId),
        quantity: Number(item.quantity || 1),
      });
      const saved = await newDoc.save();
      createdItems.push(saved);
    }
    return createdItems;
  },
};

module.exports = { cartRepository };
