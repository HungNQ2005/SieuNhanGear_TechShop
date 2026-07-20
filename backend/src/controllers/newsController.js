const demoData = require("../data/demo_data.json");

const getAllNews = async (req, res) => {
    try {
        res.json(demoData.news || []);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNewsById = async (req, res) => {
    try {
        const item = (demoData.news || []).find(n => String(n.id) === String(req.params.id));
        if (!item) {
            return res.status(404).json({ message: "News not found" });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllNews,
    getNewsById,
};
