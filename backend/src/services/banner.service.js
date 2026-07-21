const { bannerRepository } = require("../repositories/banner.repository");
const { HttpError } = require("../errors/httpError");

function validate(data, { partial = false } = {}) {
  const errors = [];
  if (!partial || data.img_URL !== undefined) {
    if (!data.img_URL || !String(data.img_URL).trim()) errors.push("img_URL is required");
  }
  if (errors.length) {
    throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: "Invalid banner data", details: errors });
  }
}

function sanitize(data) {
  const payload = {};
  if (data.title !== undefined) payload.title = String(data.title).trim();
  if (data.img_URL !== undefined) payload.img_URL = String(data.img_URL).trim();
  if (data.link !== undefined) payload.link = String(data.link).trim();
  if (data.displayOrder !== undefined) payload.displayOrder = Number(data.displayOrder);
  if (data.status !== undefined) payload.status = data.status;
  return payload;
}

const bannerService = {
  async getAll() {
    return bannerRepository.getAll();
  },
  async getById(id) {
    const banner = await bannerRepository.getById(id);
    if (!banner) throw new HttpError({ code: "NOT_FOUND", statusCode: 404, message: "Banner not found" });
    return banner;
  },
  async create(data) {
    validate(data);
    const payload = sanitize(data);
    if (payload.status === undefined) payload.status = "active";
    return bannerRepository.create(payload);
  },
  async update(id, data) {
    await this.getById(id);
    validate(data, { partial: true });
    return bannerRepository.update(id, sanitize(data));
  },
  async delete(id) {
    await this.getById(id);
    return bannerRepository.delete(id);
  },
};

module.exports = { bannerService };
