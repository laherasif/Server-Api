const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StaffSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    cnic: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    specilist: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true
    },
    base: {
        type: String,
        required: true
    },
    dateofbirth: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Staff = mongoose.model('staffs', StaffSchema);

module.exports = Staff;