const { Router } = require('express')
const userModel = require('../models/user.model')
const authController = require('../controllers/auth.controller')

const router = Router()

router.post('register', authController.registerController)
router.post('login', authController.loginController)

module.exports = router