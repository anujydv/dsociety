const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
    res.render('common/signup', {
        title: "Login"
    });
});
route.get('/dashboard', (req, res) => {
    res.render('userdash/dashboard', {
        title: "Dashboard"
    });
});

module.exports = route;