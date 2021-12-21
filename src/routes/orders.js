const express = require('express')
const router = express.Router()
const orderController = require("../controllers/orders")
 router
    .get('/', orderController.getOrder)
    .get('/:iduser', orderController.getOrderByUser)
    .post('/', orderController.insertOrder)

 module.exports = router