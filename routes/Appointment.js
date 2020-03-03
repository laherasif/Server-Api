const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// const validateRegister = require('../validation/doctor');
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, next) {

        next(null, 'ServerSide/Appointment/')

    },
    filename: function (req, file, next) {
        next(null, file.originalname)
    }
})

const fileFilter = (req, file, next) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {

        next(null, true)
    }
    else {
        next(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})


// console.log('multer' , upload)
const Appointment = require('../models/Appointment');

router.post('/register', upload.single('picture'), function (req, res) {


    // const { errors, isValid } = validateRegister(req.body);

    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }

    Appointment.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {

            const newAppont = new Appointment({
                fname: req.body.fname,
                lname: req.body.lname,
                gender: req.body.gender,
                mobile: req.body.mobile,
                email : req.body.email,
                nationality: req.body.nationality,
                country: req.body.country,
                dateofbirth: req.body.dateofbirth,
                hospital: req.body.hospital,
                medical :req.body.medical,
                condition: req.body.condition,
                date1: req.body.date1,
                time1: req.body.time1,
                date2: req.body.date2,
                time2: req.body.time2,
                name_doctor: req.body.name_doctor,
                language: req.body.language,
                contect_no: req.body.contect_no,
                first_message: req.body.first_message,
                message: req.body.message,
                // picture: req.file.path,
                // address: req.body.address,

            });

            newAppont.save()
                .then(product => {

                    res.json({ success: true, message: "Appointments  are  Successfully Registed", data: product })
                })
                .catch(error => {
                    res.json({
                        success: false, message: "During Registration process Error", error
                    })
                })




        }
    });
});


router.get('/Get_Appoint',(req, res)=>{
    Appointment.find({})
    .exec()
    .then(appoint =>{
        res.json({success : true , message : " getted appointmets " , data : appoint})
    })
    .catch(erorr =>{
        res.json({success : false , message : " error during in geted proceess" , erorr})
    })
})

module.exports = router;