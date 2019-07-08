const express = require('express');
const route = express.Router();

route.get('/submitTransaction/', (req, res) => {
    res.render('NetworkAdminDash/transactionManager/submitTransaction');
});
module.exports = route;