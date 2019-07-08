const express = require('express');
const routes = express.Router();

routes.get('/login', (req, res) => {
    res.render('common/login', {
        title: "Login"
    });
});

routes.post('/check_login/', (req, res) => {

    res.render();
});
module.exports = routes;