const mongoose = require('mongoose')

//function to validate email
var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return re.test(email)
};
const adminSchema = new mongoose.Schema({
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
    Phone_no: {
        type: Number,
        required: true
    },
    Profile_photo: {
        type: String,
        required: true
    },
    User_id: {
        type: String, required: true,
    },
});

//admin model
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;



