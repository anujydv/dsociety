var express = require('express');
var {auth} = require('../utils/auth');
var router = express.Router();

/* GET users listing. */
router.get('/', auth,function (req, res, next) {
    res.render('NetworkAdminDash/index');
});

module.exports = router;
