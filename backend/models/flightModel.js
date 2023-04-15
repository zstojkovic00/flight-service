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
    class: {
        type: String,
        enum: ['First Class', 'Economy', 'Business']
    },
    departureTime: String,
    arrivalTime: String,
    price: {
        type: Number,
        required: true,
    },
});



flightSchema.pre('save', function (next) {
    if (this.class === 'Business') {
        this.price *= 1.3;
    } else if(this.class === 'First Class'){
        this.price *=1.5;
    }
    next();
});


const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;