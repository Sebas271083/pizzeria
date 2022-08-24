const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const storeSchema = new Schema( {
    nombrePlato: {
        type: String,
        required: true,
    },
    precio: {
        type: String,
        required: true,
        unique: false,
    },
    descripcion: {
        type: String,
        required: true,
        unique: true
    },
})

const Carta = mongoose.model('Carta', storeSchema);

module.exports = {Carta}