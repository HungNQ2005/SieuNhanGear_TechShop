const Manufacturer = require("../database/models/Manufacturer");

const getAllManufacturers = async (req, res) => {
    try {
        const manufacturers = await Manufacturer.find();
        res.json(manufacturers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getManufacturerById = async (req, res) => {
    try {
        const manufacturer = await Manufacturer.findOne({ id: req.params.id });
        res.json(manufacturer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllManufacturers,
    getManufacturerById
};