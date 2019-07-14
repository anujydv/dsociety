const express = require('express');
const route = express.Router();
var network = require('../../composer/logic/network_manager');

// install Network start
route.get('/installNetwork', async (req, res) => {
    res.render('NetworkAdminDash/networkManager/installNetwork');
});
// install Network end

// list Network start
route.get('/listNetwork', async (req, res) => {
    try {
        let data = await network.listBusinessNetwork();
        res.render('NetworkAdminDash/networkManager/listNetwork', { data });
    } catch (error) {
        res.json({ error });
    }
});
// list Network end

// loglevel Network start
route.get('/logLevelNetwork', async (req, res) => {
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
route.get('/startNetwork', async (req, res) => {
    res.render('NetworkAdminDash/networkManager/startNetwork');
});
// start Network end

// test Network start
route.get('/testNetwork', async (req, res) => {
    try {
        let data = await network.pingBusinessNetwork();
        res.render('NetworkAdminDash/networkManager/testNetwork', { data });
    } catch (error) {
        res.json(error);
    }
});
// test Network end

// upgrade Network start
route.get('/upgradeNetwork', async (req, res) => {
    res.render('NetworkAdminDash/networkManager/upgradeNetwork');
});
// upgrade Network end

module.exports = route;