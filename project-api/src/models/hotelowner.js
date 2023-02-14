const mongoose = require('mongoose');


//function to validate email
var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return re.test(email)
};

//hotel owner's schema
const HotelSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },

    Email: {
        type: String, required: true, validate: [validateEmail, 'Pls Enter valid email address'],
        match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    Password: {
        type: String,
        required: true
    },

    Phone: {
        type: Number,
        required: true
    },
    owner_id: {
        type: Number,
        required: true
    },
    token: {
        type: Number,
        required: true
    },
    Country: {
        type: String,
        required: true
    },

    Profile_photo: { type: String, required: true },
     Cover_photo: { type: String, required: true },

    Service_type: { type: String, required: true }

});


const Hotel_owner = mongoose.model('Hotel_owner', HotelSchema);
module.exports = Hotel_owner;

