const express = require('express');
const route = express.Router();

// install Network start
route.get('/installNetwork', (req, res) => {
    res.render('NetworkAdminDash/networkManager/installNetwork');
});
// install Network end

// list Network start
route.get('/listNetwork', (req, res) => {
    res.render('NetworkAdminDash/networkManager/listNetwork');
});
// list Network end

// loglevel Network start
route.get('/logLevelNetwork', (req, res) => {
    res.render('NetworkAdminDash/networkManager/loglevelNetwork');
});
// loglevel Network end

// start Network start
route.get('/startNetwork', (req, res) => {
    res.render('NetworkAdminDash/networkManager/startNetwork');
});
// start Network end

// test Network start
route.get('/testNetwork', (req, res) => {
    res.render('NetworkAdminDash/networkManager/testNetwork');
});
// test Network end

// upgrade Network start
route.get('/upgradeNetwork', (req, res) => {
    res.render('NetworkAdminDash/networkManager/upgradeNetwork');
});
// upgrade Network end

module.exports = route;