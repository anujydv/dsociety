var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('NetworkAdminDash/index');
});

module.exports = router;
