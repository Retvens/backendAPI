const mongoose = require('mongoose');

//mongoose conn
const conn = mongoose.connect('mongodb+srv://Hotel:Hotel@cluster0.qqo0way.mongodb.net/Retvens', { useNewUrlParser: true });
if(conn){
    console.log("connection successful");
}
else{
    console.log('error in connection')
}
