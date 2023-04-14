const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    photo:{
        type: String,
        require: true,
    },

    country: {
        type: String,
        required: true
    },

    population: {
        type: Number,
        required: true
    }


});



const City = mongoose.model('City', citySchema);

module.exports = City;