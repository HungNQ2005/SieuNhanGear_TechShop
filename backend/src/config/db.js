const mongoose = require("mongoose");
const { env } = require("./env");

console.log('env object:', env);
console.log('MONGODB_URI:', env.MONGODB_URI);

const connectDB = async () => {
    try {
        await mongoose.connect(env.MONGODB_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;