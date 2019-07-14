const express = require('express');
const route = express.Router();
// var network = require('../../composer/logic/network_manager');
const {auth} = require('../utils/auth');
// install Network start
route.get('/installNetwork',auth, async (req, res) => {
    res.render('NetworkAdminDash/networkManager/installNetwork');
});
// install Network end

// list Network start
route.get('/listNetwork',auth, async (req, res) => {
    try {
        let data = await network.listBusinessNetwork();
        res.render('NetworkAdminDash/networkManager/listNetwork', { data });
    } catch (error) {
        res.json({ error });
    }
});
// list Network end

// loglevel Network start
route.get('/logLevelNetwork',auth, async (req, res) => {
    try {
        let data = await network.logBusinessNetwork();
        res.json(data);
        // res.render('NetworkAdminDash/networkManager/loglevelNetwork');
    } catch (error) {
        res.json({ error });
    }
});
// loglevel Network end

// start Network start
route.get('/startNetwork',auth, async (req, res) => {
    res.render('NetworkAdminDash/networkManager/startNetwork');
});
// start Network end

// test Network start
route.get('/testNetwork',auth, async (req, res) => {
    try {
        let data = await network.pingBusinessNetwork();
        res.render('NetworkAdminDash/networkManager/testNetwork', { data });
    } catch (error) {
        res.json(error);
    }
});
// test Network end

// upgrade Network start
route.get('/upgradeNetwork',auth, async (req, res) => {
    res.render('NetworkAdminDash/networkManager/upgradeNetwork');
});
// upgrade Network end

module.exports = route;