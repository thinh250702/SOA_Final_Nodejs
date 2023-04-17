var express = require('express');
var router = express.Router();

const MenuController = require('../controllers/menu.controller');

router.route('/:tableID')
    .get(MenuController.getMenu);

router.route('/:tableID/addToCart').post(MenuController.addToCart); 

router.route('/:tableID/updateCart').post(MenuController.updateCart);

module.exports = router;
