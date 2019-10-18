const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
console.log(process.env.DB_URL_SERVER);
mongoose.connect(process.env.DB_URL_SERVER, {
    useNewUrlParser: true
});

module.exports = mongoose;