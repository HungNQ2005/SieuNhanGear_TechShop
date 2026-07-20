const Account = require("../database/models/Account.model");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { env } = require("../config/env");

const register = async (req, res) => {
    try {
        const { name, email, password, phone, gender, dateOfBirth, address, avatarURL, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: name, email, password",
            });
        }

        const existing = await Account.findOne({ email });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newAccount = new Account({
            name,
            email,
            password: hashedPassword,
            phone,
            gender,
            dateOfBirth,
            address,
            avatarURL,
            role: role || "customer",
        });

        await newAccount.save();

        const accountData = newAccount.toObject();
        delete accountData.password;

        res.status(201).json({
            success: true,
            message: "Account registered successfully",
            data: accountData,
        });
    } catch (error) {
        console.error("Error in register:", error);
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

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const account = await Account.findOne({ email });
        if (!account) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isMatch = await bcrypt.compare(password, account.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            { id: account._id, email: account.email, role_id: account.role_id },
            env.JWT_SECRET || "your-secret-key", // nên lấy từ env
            { expiresIn: "7d" }
        );

        const accountData = account.toObject();
        delete accountData.password;

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: accountData,
            token,
        });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const logout = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    } catch (error) {
        console.error("Error in logout:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = {
    register,
    login,
    logout,
};