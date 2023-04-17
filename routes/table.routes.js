var express = require('express');
var router = express.Router();

const TableController = require('../controllers/table.controller');

router.route('/').get(TableController.getLayout);

router.route("/open").post(TableController.openTable);

router.route("/detail/:tableID").get(TableController.getTableDetail);

module.exports = router;
