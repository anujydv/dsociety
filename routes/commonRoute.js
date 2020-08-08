const express = require('express');
const routes = express.Router();
const Email = require('../src/model/email');

routes.get('/login', (req, res) => {
    res.render('common/login', {
        title: "Login",
        logindata:req.flash('msg')[0]
    });
});

routes.post('/check_login/', async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let data = await Email.findOne({ email: email, password: password });
        if (data) {
            req.session.validate = true;
            req.session.status = data.level;
            req.session.type = data.type;
            switch (req.session.type){
                case 'user':
                    res.redirect('/user/');
                    break;
                case 'peer':
                    res.redirect('/peer/');
                    break;
                case 'net':
                    req.session.card = data.card;
                    res.redirect('/network/');
                    break;
            }
        }else{
            req.flash('msg','Username Or Password Is Wrong');
            res.redirect('/common/login');
        }
    } catch (error) {
        console.error(error);
    }    
});

routes.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect("/common/login");
});
module.exports = routes;