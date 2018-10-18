const mongoose = require('mongoose');

module.exports = (url) => {
    mongoose.connect(url, { useNewUrlParser: true });

    mongoose.connection.on('connected', () => {
        console.log('Mongoose conectado!');
    });
}