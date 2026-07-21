const Account = require("../database/models/Account.model");

const accountRepository = {
  async getAll() {
    return Account.find().sort({ id: 1 });
  },

  async getById(id) {
    return Account.findOne({ id: Number(id) });
  },

  async getByEmail(email, { excludeId, withPassword = false } = {}) {
    const query = { email: String(email).toLowerCase().trim() };
    if (excludeId !== undefined && excludeId !== null) {
      query.id = { $ne: Number(excludeId) };
    }
    const q = Account.findOne(query);
    return withPassword ? q.select("+passwordHash +password") : q;
  },

  async create(data) {
    const last = await Account.findOne().sort({ id: -1 });
    const nextId = last && last.id ? last.id + 1 : 1;

    const account = new Account({ ...data, id: nextId });
    return account.save();
  },

  async update(id, data) {
    return Account.findOneAndUpdate({ id: Number(id) }, data, {
      new: true,
      runValidators: true,
    });
  },

  async delete(id) {
    return Account.findOneAndDelete({ id: Number(id) });
  },
};

module.exports = { accountRepository };
