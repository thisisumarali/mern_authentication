const User = require("../models/user.models")
const bcrypt = require("bcryptjs")


// const getallUsers = async (req, res) => {
//     try {
//         const users = await User.find()
//         res.status(200).json({
//             success: true,
//             users
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ msg: "Server error" });
//     }
// }

const userRegister = async (req, res) => {
    try {
        console.log("Incoming data", req.body);
        const { name, mail, pnum, pass } = req.body;
        const UserExist = await User.findOne({ useremail: mail })
        if (UserExist) return res.status(400).json({ msg: "EMAIL ALREADY EXIST.." })

        const userCreate = await User.create({ username: name, useremail: mail, usernumber: pnum, userpassword: pass })
        return res.status(201).json({
            msg: userCreate,
            token: await userCreate.generatetoken(),
            userId: userCreate._id.toString()
        })
    } catch (error) {
        console.log("Error during user Registeration ", error)
        if (error.name == 'ValidationError') return res.status(400).json({ msg: error.message })
        return res.status(500).json({ msg: "Internal error message" })
    }
}

const login = async (req, res) => {
    try {
        const { mail, pass } = req.body;

        const user = await User.findOne({ useremail: mail })

        if (!user) {
            return res.status(401).json({ msg: "User not found" })
        }

        const isMatch = await bcrypt.compare(pass, user.userpassword);
        if (!isMatch) {
            return res.status(401).json({ msg: "Incorrect password" });
        }

        return res.status(200).json({ msg: 'login successful', mail: user.useremail, userId: user._id.toString(), token: await user.generatetoken() })


    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Server error" })
    }
}


const usertokencheck = async (req, res) => {
    try {
        const userData = req.user;
        console.log(userData)
        return res.status(200).json({ msg: userData })
    } catch (error) {
        console.log(error)
    }
}
module.exports = { userRegister, login, usertokencheck }