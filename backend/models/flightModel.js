const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    airlines: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;