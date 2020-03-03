const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SalarySchema = new Schema({
    fulname: {
        type: String,
        required: true
    },
    gender : {
        type : String ,
        required : true
    },
    
    paySecdule :{
        type : String ,
        required : true
    },
    date: {
        type: String,
        required: true
    },
    Specil:{
        type : String,
        required : true
    },
    payment:{
        type : Number,
        required : true
    }
});

const Salary = mongoose.model('salarys', SalarySchema);

module.exports = Salary;