require("dotenv").config()
const connectDb = require('./utils/db')
const express = require("express")
const app = express();
const router = require("./router/admin_router")

app.use(express.json())
app.use("/api/auth", router)

connectDb().then(() => {
    app.listen(5000, () => {
        console.log("Server is running on the port");
    })
})
