const mongoose = require('mongoose');

// Social media schema
const Social_media = new mongoose.Schema({
    owner_id: {
        type: Number,
        required: true
    },
    hotel_id: {
        type: Number,
        required: true
    },
    social_media: [{
        facebook: String,
        Twitter: String,
        Instagram: String,
        Linkedin: String,
        Pinterest: String,
        Youtube: String,
        GMB: String

    }],
})

// social media model
const Social = mongoose.model('Social', Social_media)
module.exports = Social;


