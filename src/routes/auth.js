const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')

router 
.post('/', authController.login)
.post('/register', authController.Register)
.post('/registerAdmin', authController.RegisterAdmin)

module.exports = router