const express = require('express');
const route = express.Router();
var network = require('../../composer/logic/card_manager');

function mapToObj(inputMap) {
    let obj = {};
    inputMap.forEach(function (value, key) {
        obj[key] = value
    });
    return obj;
}
route.get('/importCard/', (req, res) => {
    try {
        let data = network.importCard(cardName, idCard);
        res.json({ data });
        // res.render('NetworkAdminDash/cardManager/importCard');
    } catch (error) {
        res.json({ error });
    }
});

route.get('/exportCard/',async (req, res) => {
    try {
        let data = await network.exportCard(cardName);
        res.json({ data });
        // res.render('NetworkAdminDash/cardManager/exportCard');
    } catch (error) {
        res.json({ error });
    }
});
route.get('/listCard/',async (req, res) => {
    try {
        let mapData = await network.listCard();        
        let data = mapToObj(mapData);
        res.render('NetworkAdminDash/cardManager/listCard',{data});
    } catch (error) {
        res.json({ error });
    }
});

route.get('/deleteCard/',async (req, res) => {
    try {
        let data = await network.deleteCard(cardName);
        res.json({ data });
        // res.render('NetworkAdminDash/cardManager/deleteCard');
    } catch (error) {
        res.json({ error });
    }
});

module.exports = route;