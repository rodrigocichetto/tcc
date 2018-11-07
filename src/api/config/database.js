const mongoose = require('mongoose');

module.exports = (url) => {
    mongoose.connect(url, { useNewUrlParser: true });

    mongoose.connection.on('connected', () => {
        console.log('Mongoose conectado!');
    });

    // Retry connection
    const connectWithRetry = () => {
        console.log('MongoDB connection with retry')
        return mongoose.connect(url, { useNewUrlParser: true });
    }

    // Exit application on error
    mongoose.connection.on('error', err => {
        console.log(`MongoDB connection error: ${err}`);
        setTimeout(connectWithRetry, 5000);
        // process.exit(-1)
    })
}