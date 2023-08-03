require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("[SERVER]: Mongoose successfully connected.");
    } catch (error) {
        console.error(error);
    } 
}

export default connect;
