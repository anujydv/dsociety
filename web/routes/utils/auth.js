var auth = (req, res, next) => {
    if (req.session.validate !== true) {
        res.redirect('/common/login');
    } else {
        console.log(req.session.type)
        switch (req.session.type) {
            case 'user':
                if (req.originalUrl.match('user')) {
                    next()                    
                } else {
                    res.redirect('/common/login');
                }
                break;
            case 'peer':                
                if (req.originalUrl.match('peer')) {
                    next()                    
                } else {
                    res.redirect('/common/login');
                }
                break;
            case 'net':
                if (req.originalUrl.match('network')) {
                    next()                    
                } else {
                    res.redirect('/common/login');
                }
                break;
        }
    }
}

module.exports = {
    auth
}