const mongoose = require('mongoose');
const Hotel_work = new mongoose.Schema({
    owner_id: {
        type: Number,
        required: true
    },
    hotel_id: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    post_upload: {
        type: String,
        required: true
    },
    total_number_of_post: {
        type: Number,
        required: true
    },
    total_number_of_reels: {
        type: Number,
        required: true
    },
    total_number_of_stories: {
        type: Number,
        required: true
    },
    Google_reviews: {
        type: String,
        required: true
    },
    Tripadvisor_reviews: {
        type: String,
        required: true
    },
    Month_calender: {
        type: String,
        required: true
    }
});

const Hotel_Work = mongoose.model('Hotel_Work', Hotel_work);
module.exports = Hotel_Work;

