const express = require('express');
const route = express.Router();

route.get('/createCard/', (req, res) => {
    res.render('NetworkAdminDash/cardManager/createCard');
});
route.get('/deleteCard/', (req, res) => {
    res.render('NetworkAdminDash/cardManager/deleteCard');
});
route.get('/listCard/', (req, res) => {
    res.render('NetworkAdminDash/cardManager/listCard');
});

module.exports = route;