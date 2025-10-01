const jwt = require("jsonwebtoken")
const User = require("../models/user.models")

const authmiddleware = async (req, res, next) => {
    const webtoken = req.header("Authorization")

    if (!webtoken) {
        return res.status(400).json({ msg: "Unauthorize, token not providen" })
    }
    console.log('token from auth middleware', webtoken)

    const token = webtoken.replace("Bearer", '').trim()

    try {
        const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log(isVerified)

        const userData = await User.findOne({ useremail: isVerified.email }).select({ userpassword: 0 })
        req.user = userData
        req.gettoken = token
        req.userID = req.user_id;
        console.log(userData)
        next()
    } catch (error) {
        console.log("JWT Verification error", error)
        return res.status(401).json({ msg: "Unauthorize, Invalid token" })
    }

}

module.exports = authmiddleware