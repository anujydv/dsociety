const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL_SERVER, {
    useNewUrlParser: true
});

module.exports = mongoose;