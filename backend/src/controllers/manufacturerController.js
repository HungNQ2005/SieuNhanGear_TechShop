const Manufacturer = require("../database/models/Manufacturer");
const demoData = require("../data/demo_data.json");

const getAllManufacturers = async (req, res) => {
    try {
        let manufacturers = await Manufacturer.find().lean();
        if (!manufacturers || manufacturers.length === 0) {
            manufacturers = demoData.manufacturers || [];
        }
        res.json(manufacturers);
    } catch (error) {
        res.json(demoData.manufacturers || []);
    }
};

const getManufacturerById = async (req, res) => {
    try {
        let manufacturer = await Manufacturer.findOne({ id: Number(req.params.id) }).lean();
        if (!manufacturer) {
            manufacturer = (demoData.manufacturers || []).find(m => String(m.id) === String(req.params.id));
        }
        res.json(manufacturer || null);
    } catch (error) {
        const found = (demoData.manufacturers || []).find(m => String(m.id) === String(req.params.id));
        res.json(found || null);
    }
};

module.exports = {
    getAllManufacturers,
    getManufacturerById
};