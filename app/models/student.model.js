const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    mobile_number: String
},
    {
        timestams:true
});

module.exports = mongoose.model('Student', StudentSchema);