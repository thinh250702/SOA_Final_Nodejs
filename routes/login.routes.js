var express = require('express');
var router = express.Router();

const LoginController = require('../controllers/login.controller');

router.route('/')
	.get(LoginController.getPage);

router.route('/login')
	.get(LoginController.login)
  .post(LoginController.login);

  router.route('/logout')
	.get(LoginController.logout)

module.exports = router;
