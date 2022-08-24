const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const storeSchema = new Schema( {
    plato1: {
        type: String,
        required: true,
    },
    plato2: {
        type: String,
        unique: false,
    },
    plato3: {
        type: String,
        unique: true
    },
    plato4: {
        type: String,
        unique: true
    },
    plato5: {
        type: String,
        unique: true
    },
    calle: {
        type: String,
        required: true,
        unique: true
    },
    altura: {
        type: String,
        required: true,
        unique: true
    },
    piso: {
        type: String,
        required: true,
        unique: true  
    },
    mensaje: {
        type: String,
        required: true,
    }

})

const Delivery = mongoose.model('Delivery', storeSchema);

module.exports = {Delivery}