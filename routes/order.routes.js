var express = require('express');
var router = express.Router();

const OrderController = require('../controllers/order.controller');

router.route('/:tableID').post(OrderController.placeOrder);

module.exports = router;
