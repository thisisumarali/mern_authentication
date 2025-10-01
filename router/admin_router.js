const express = require("express")
const authcontroller = require("../controllers/user-controllers")
const authmiddleware = require("../Middlewares/authmiddleware")
const router = express.Router()

router.route('/register').post(authcontroller.userRegister)
router.route('/login').post(authcontroller.login)
router.route('/user').get(authmiddleware, authcontroller.usertokencheck)

module.exports = router