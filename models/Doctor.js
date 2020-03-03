const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname:{
        type:String,
        required : true
    },
    gender : {
        type : String ,
        required : true
    },
    cnic :{
        type : String,
        required : true
    },
    dateofbirth :{
        type : String,
    },
    mobile :{
        type : String ,
        required : true
    },
    email: {
        type: String,
        required: true
    },
    specil:{
        type : String,
        required : true
    },
    joinAs :{
        type : String,
        required : true
    },
    
    picture: {
        type: String,
     
        
    },
    qualification: {
        type: String,
        required : true
    },
    experience: {
        type: String,
        required : true
        
    },
    base: {
        type: String,
        required : true
        
    },
    password :{
        type: String,
    },
    address:{
        type : String,
        required : true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Doctor = mongoose.model('doctors', DoctorSchema);

module.exports = Doctor;