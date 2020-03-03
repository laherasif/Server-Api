const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SPappointmentSchema = new Schema({
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
    Specil:{
        type : String,
        // required : true
    },
    dateofbirth:{
        type:String
    },
    spelist_doctor:{
        type: String,
    },
    address:{
        type : String,
        // required : true
    },
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
    visited: {
        type: Boolean,
        // default: Date.now
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

const SPAppointment = mongoose.model('spappoints', SPappointmentSchema);

module.exports = SPAppointment;