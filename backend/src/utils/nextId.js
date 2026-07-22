// Sinh id dạng Number tự tăng, dùng chung cho các repository (giống pattern product/account/category)
async function nextId(Model) {
  try {
    const last = await Model.findOne().sort({ id: -1 });
    const nextNum = last && last.id && !isNaN(last.id) ? last.id + 1 : 1;
    return Math.max(1, nextNum);
  } catch (e) {
    console.error("nextId error:", e);
    return Math.max(1, Date.now() % 1000000);
  }
}

module.exports = { nextId };
