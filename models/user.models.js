const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    useremail: {
        type: String,
        required: true,
    },
    usernumber: {
        type: String,
        required: true,
    },
    userpassword: {
        type: String,
        required: true,
    },

})
userSchema.pre("save", async function () {
    console.log("pre save", this)
    const user = this;

    if (!user.isModified('userpassword')) {
        return
    }
    try {
        const saltRound = await bcrypt.genSalt(10)
        const hassedpassword = await bcrypt.hash(user.userpassword, saltRound)
        user.userpassword = hassedpassword
    } catch (error) {
        console.log(error)
    }
})

userSchema.methods.generatetoken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.useremail
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d"
            }
        )
    } catch (error) {
        console.log(error)
    }
}
const User = new mongoose.model('users', userSchema)
module.exports = User;