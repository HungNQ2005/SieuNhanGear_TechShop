const { specificationRepository } = require("../repositories/specification.repository");
const { HttpError } = require("../errors/httpError");

const DATA_TYPES = ["text", "number", "boolean", "select"];

const specificationService = {
  async getAllSpecifications() {
    const groups = await specificationRepository.getAllGroups();
    const attributes = await specificationRepository.getAllAttributes();
    return groups.map((group) => {
      const groupObj = group.toObject ? group.toObject() : group;
      groupObj.attributes = attributes.filter((attr) => attr.groupId === group.id);
      return groupObj;
    });
  },

  async getAllGroups() {
    return specificationRepository.getAllGroups();
  },

  async getGroupById(id) {
    const group = await specificationRepository.getGroupById(id);
    if (!group) throw new HttpError({ code: "NOT_FOUND", statusCode: 404, message: "Specification group not found" });
    return group;
  },

  async createGroup({ name, description, icon }) {
    if (!name || !String(name).trim()) {
      throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: "name is required" });
    }
    return specificationRepository.createGroup({
      name: String(name).trim(),
      description: description ? String(description).trim() : "",
      icon: icon || "mouse",
      status: "active",
    });
  },

  async updateGroup(id, data) {
    await this.getGroupById(id);
    const payload = {};
    if (data.name !== undefined) payload.name = String(data.name).trim();
    if (data.description !== undefined) payload.description = String(data.description).trim();
    if (data.icon !== undefined) payload.icon = data.icon;
    if (data.status !== undefined) payload.status = data.status;
    return specificationRepository.updateGroup(id, payload);
  },

  async deleteGroup(id) {
    await this.getGroupById(id);
    // Xoá kèm các attribute thuộc group để tránh dữ liệu mồ côi
    const attributes = await specificationRepository.getAllAttributes({ groupId: id });
    await Promise.all(attributes.map((a) => specificationRepository.deleteAttribute(a.id)));
    return specificationRepository.deleteGroup(id);
  },

  async getAllAttributes(filters) {
    return specificationRepository.getAllAttributes(filters);
  },

  async createAttribute({ groupId, name, dataType }) {
    if (!groupId || !name || !String(name).trim()) {
      throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: "groupId and name are required" });
    }
    if (dataType && !DATA_TYPES.includes(dataType)) {
      throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: `dataType must be one of: ${DATA_TYPES.join(", ")}` });
    }
    const group = await specificationRepository.getGroupById(groupId);
    if (!group) {
      throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: `Group ${groupId} does not exist` });
    }
    return specificationRepository.createAttribute({
      groupId: Number(groupId),
      groupName: group.name,
      name: String(name).trim(),
      dataType: dataType || "text",
      usageCount: 0,
      status: "active",
    });
  },

  async updateAttribute(id, data) {
    const attribute = await specificationRepository.getAttributeById(id);
    if (!attribute) throw new HttpError({ code: "NOT_FOUND", statusCode: 404, message: "Attribute not found" });

    const payload = {};
    if (data.name !== undefined) payload.name = String(data.name).trim();
    if (data.dataType !== undefined) {
      if (!DATA_TYPES.includes(data.dataType)) {
        throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: `dataType must be one of: ${DATA_TYPES.join(", ")}` });
      }
      payload.dataType = data.dataType;
    }
    if (data.status !== undefined) payload.status = data.status;

    return specificationRepository.updateAttribute(id, payload);
  },

  async deleteAttribute(id) {
    const attribute = await specificationRepository.getAttributeById(id);
    if (!attribute) throw new HttpError({ code: "NOT_FOUND", statusCode: 404, message: "Attribute not found" });
    return specificationRepository.deleteAttribute(id);
  },
};

module.exports = { specificationService };
