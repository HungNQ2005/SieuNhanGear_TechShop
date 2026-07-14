const Account = require("../database/models/Account.model");

const getAllAccounts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const sort = req.query.sort || "name";

        const accounts = await Account.find()
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Account.countDocuments();

        res.status(200).json({
            success: true,
            data: accounts,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Error in getAllAccounts:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const getAccountById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: "Invalid account ID format",
            });
        }

        const account = await Account.findById(id).lean();

        if (!account) {
            return res.status(404).json({
                success: false,
                message: "Account not found",
            });
        }

        res.status(200).json({
            success: true,
            data: account,
        });
    } catch (error) {
        console.error("Error in getAccountById:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const createAccount = async (req, res) => {
    try {
        const { name, email, password, phone, gender, dateOfBirth, role_id } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: name, email, password",
            });
        }

        const existingAccount = await Account.findOne({ email });

        if (existingAccount) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        const newAccount = new Account({
            name,
            email,
            password,
            phone,
            gender,
            dateOfBirth,
            role_id: role_id || "1",
        });

        await newAccount.save();

        const accountData = newAccount.toObject();
        delete accountData.password;

        res.status(201).json({
            success: true,
            message: "Account created successfully",
            data: accountData,
        });
    } catch (error) {
        console.error("Error in createAccount:", error);
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const updateAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: "Invalid account ID format",
            });
        }

        if (updateData.email) {
            const existing = await Account.findOne({
                email: updateData.email,
                _id: { $ne: id },
            });
            if (existing) {
                return res.status(400).json({
                    success: false,
                    message: "Email already in use by another account",
                });
            }
        }

        const updatedAccount = await Account.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).lean();

        if (!updatedAccount) {
            return res.status(404).json({
                success: false,
                message: "Account not found",
            });
        }

        delete updatedAccount.password;

        res.status(200).json({
            success: true,
            message: "Account updated successfully",
            data: updatedAccount,
        });
    } catch (error) {
        console.error("Error in updateAccount:", error);
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const deleteAccount = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: "Invalid account ID format",
            });
        }

        const deletedAccount = await Account.findByIdAndDelete(id);

        if (!deletedAccount) {
            return res.status(404).json({
                success: false,
                message: "Account not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Account deleted successfully",
        });
    } catch (error) {
        console.error("Error in deleteAccount:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = {
    getAllAccounts,
    getAccountById,
    createAccount,
    updateAccount,
    deleteAccount,
};