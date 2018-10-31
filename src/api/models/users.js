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
        },
        irrigations: [new mongoose.Schema({
            status: {
                type: Boolean,
                default: false
            },
            name: {
                type: String,
                required: true
            },
            address: {
                type: String
            },
            cep: {
                type: String
            },
            city: {
                type: Number,
                required: true
            }
        })]
    });

    return mongoose.model('User', schema, 'users');

}