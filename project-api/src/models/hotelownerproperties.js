const mongoose = require('mongoose');

//hotel owner's properties schema
const PropertySchema = new mongoose.Schema({

    owner_id: {
        type: Number
    },
    hotel_id: {
        type: Number,
        required: true
    },

    hotel_profile_photo: {
        type: String,
        required: true
    },

    hotel_name: {
        type: String,
        required: true
    },

    Country:{
     type:String,
     required: true
    },

    hotel_location: [{
        Latitude:String,
        Longitude:String
    }],
    hotel_stars: {
        type: Number,
        required: true
    },
    hotel_room: {
        type: Number,
        required: true
    },
    Number_of_banquet: {
        type: Number,
        required: true
    }


});

const Property = mongoose.model('Property', PropertySchema);
module.exports = Property;

