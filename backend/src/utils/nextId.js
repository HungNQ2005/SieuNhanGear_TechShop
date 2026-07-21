// Sinh id dạng Number tự tăng, dùng chung cho các repository (giống pattern product/account/category)
async function nextId(Model) {
  const last = await Model.findOne().sort({ id: -1 });
  return last && last.id ? last.id + 1 : 1;
}

module.exports = { nextId };
