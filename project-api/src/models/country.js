const mongoose = require('mongoose');
const countries = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Country_photo: {
        type: String,
        required: true
    },


});

const Country = mongoose.model('Country', countries)
module.exports = Country;

