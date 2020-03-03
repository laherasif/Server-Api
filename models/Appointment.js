const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    condition:{
        type: String,
    },
    fname: {
        type: String,
        // required: true
    },
    lname:{
        type:String,
        // required : true
    },
    gender : {
        type : String ,
        // required : true
    },
    dateofbirth:{
     type: String,
    },
    email :{
        type : String,
        // required : true
    },
    mobile :{
        type : String ,
        // required : true
    },
    hospital: {
        type: String,
        // required: true
    },
    nationality:{
        type : String,
        // required : true
    },
    country:{
        type : String,
        // required : true
    },
    // address:{
    //     type : String,
        // required : true
    // },
    date1: {
        type: String,
        // required: true
    },
    time1: {
        type: String
    },
    date2: {
        type: String,
        // default: Date.now
    },
    time2: {
        type: String,
        // required: true
    },
    medical: {
        type: String
    },
    name_doctor: {
        type: String,
        // required: true
    },
    contect_no: {
        type: String
    },
    first_message: {
        type: String,
        // default: Date.now
    },
    message: {
        type: String,
        // required: true
    },
    language: {
        type: String
    },
    
});

const Appointment = mongoose.model('appoints', AppointmentSchema);

module.exports = Appointment;