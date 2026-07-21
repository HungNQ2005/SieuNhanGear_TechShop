const { SpecificationGroup, SpecificationAttribute } = require("../database/models/Specification.model");
const { nextId } = require("../utils/nextId");

const specificationRepository = {
  async getAllGroups() {
    return SpecificationGroup.find().sort({ id: 1 });
  },
  async getGroupById(id) {
    return SpecificationGroup.findOne({ id: Number(id) });
  },
  async createGroup(data) {
    const id = await nextId(SpecificationGroup);
    const group = new SpecificationGroup({ ...data, id });
    return group.save();
  },
  async updateGroup(id, data) {
    return SpecificationGroup.findOneAndUpdate({ id: Number(id) }, data, { new: true, runValidators: true });
  },
  async deleteGroup(id) {
    return SpecificationGroup.findOneAndDelete({ id: Number(id) });
  },

  async getAllAttributes({ groupId } = {}) {
    const query = {};
    if (groupId !== undefined && groupId !== null) query.groupId = Number(groupId);
    return SpecificationAttribute.find(query).sort({ id: 1 });
  },
  async getAttributeById(id) {
    return SpecificationAttribute.findOne({ id: Number(id) });
  },
  async createAttribute(data) {
    const id = await nextId(SpecificationAttribute);
    const attribute = new SpecificationAttribute({ ...data, id });
    return attribute.save();
  },
  async updateAttribute(id, data) {
    return SpecificationAttribute.findOneAndUpdate({ id: Number(id) }, data, { new: true, runValidators: true });
  },
  async deleteAttribute(id) {
    return SpecificationAttribute.findOneAndDelete({ id: Number(id) });
  },
};

module.exports = { specificationRepository };
