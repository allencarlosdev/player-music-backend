const express = require('express')
const { registerController, loginController } = require('../controllers/auth')
const router = express.Router()
const { validatorLogin, validatorRegister } = require('../validators/auth')

router.post('/register', validatorRegister, registerController)
router.post('/login', validatorLogin, loginController)
module.exports = router
