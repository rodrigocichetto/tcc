const mongoose = require('mongoose');

module.exports = () => {
    
    let schema = mongoose.Schema({
        name: {
            type: String
        },
        username: {
            type: String,
            required: true,
            index: {
                unique: true
            }    
        },
        password: {
            type: String,
            required: true 
        },
        mail: {
            type: String
        },
        city: {
            type: Number
        }
    });

    return mongoose.model('User', schema, 'users');

}