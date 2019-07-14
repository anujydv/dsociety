var auth = (req,res,next)=>{
    if(req.session.validate != true){
        res.redirect('/common/login');
    }else{
        next();
    }
}

module.exports = {
    auth
}