const mongoose = require('mongoose');


const URI = process.env.MONGODB_URI
async function connectDb() {
    try {
        await mongoose.connect(URI)
        console.log("db connected")
    } catch (error) {
        console.log("db not connected", error)
        process.exit(0)
    }
}
module.exports = connectDb;