const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('default/index',{title:"Home"});
});

module.exports = router;