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
            id: { type: Number, required: true },
            nome: String,
            uf: String
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
                id: { type: Number, required: true },
                nome: String,
                uf: String
            }
        })]
    });

    return mongoose.model('User', schema, 'users');

}