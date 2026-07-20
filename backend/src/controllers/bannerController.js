const Banner = require("../database/models/Banner");

const getAllBanners = async (req, res, next) => {
    try {
        const banners = await Banner.find();
        res.status(200).json(banners);
    } catch (error) {
        next(error);
    }
};

const getBannerById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid banner ID format" });
        }

        const banner = await Banner.findById(id);
        if (!banner) {
            return res.status(404).json({ message: "Banner not found" });
        }

        res.status(200).json(banner);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllBanners,
    getBannerById
};