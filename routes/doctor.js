const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegister = require('../validation/doctor');
const validateLoginInput = require('../validation/login');
const multer = require('multer')
const mongodb = require('mongoose')
const storage = multer.diskStorage({
    destination :function(req, file , next){
 
    next( null , '  ServerSide/Uploads/')  
    
    },
    filename : function( req , file , next){
      next(null, file.originalname)
    }
  })
  
  const fileFilter =(req, file , next) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    
    next(null , true)
  }
  else {
    next(null , false)
  }
  }
  
  const upload = multer({
    storage : storage , 
    limits :{
    fileSize : 1024 * 1024 * 5
  },
    fileFilter : fileFilter
  })
  

// console.log('multer' , upload)
const Doctor = require('../models/Doctor');

router.post('/register', upload.single('picture'), function (req, res) {


    const { errors, isValid } = validateRegister(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    Doctor.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {

            console.log("image data" , req.file)
            const newDoctor = new Doctor({
                fname: req.body.fname,
                lname: req.body.lname,
                gender: req.body.gender,
                cnic: req.body.cnic,
                mobile: req.body.mobile,
                specil: req.body.specil,
                joinAs : req.body.joinAs,
                dateofbirth : req.body.dateofbirth,
                qualification : req.body.qualification,
                experience : req.body.experience,
                base : req.body.base,
                email: req.body.email,
                picture: req.file.path,
                password : req.body.password,
                address: req.body.address,
                // password: req.body.password,

    
            });

            // const newDoctor = new Doctor({
            //     fname: "laher",
            //     lname: "asif",
            //     gender: "male",
            //     cnic: "2232323",
            //     mobile: "232323",
            //     specil: "web",
            //     joinAs : "director",
            //     dateofbirth :"121212",
            //     qualification : "dasdasdas",
            //     experience : "sdasdsada",
            //     base : "asdasd",
            //     email: "laher@gmail.com",
            //     picture: "",
            //     password : "1234567",
            //     address: "kkjkjkjkj",
                // password: req.body.password,

    
            // });
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newDoctor.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newDoctor.password = hash;
                            newDoctor.save()
                            .then(product => {
            
                                res.json({ success: true, message: "Doctor  are  Successfully Registed", data: product })
                            })
                            .catch(error => {
                                res.json({ success: false, message: "During Registration process Error" , error
                                  })
                            })
                        }
                    });
                }
            })
           

            
        }
    });
});
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    Doctor.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: user.id,
                                name: user.name,
                                avatar: user.avatar
                            }
                            jwt.sign(payload, 'secret', {
                                expiresIn: 20
                            }, (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        success: true,
                                        token: `Bearer ${token}`
                                    });
                                }
                            });
                        }
                        else {
                            errors.password = 'Incorrect Password';
                            return res.status(400).json(errors);
                        }
                    })
                    .catch(error =>{
                        res.json({success : false , message : 'error in login user process ', error})
                    })
                    
        });
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

router.get('/Get_Doctor',(req, res)=>{

    Doctor.find()
    .exec()
    .then(doctors =>{
        res.json({ success : true , message : "All doctor Successfully fatched" , data : doctors })
        
    })
    .catch(error =>{
        res.json({success : false , message : "Fatching Doctors Error" , error}) 
    })

})

router.get('/Delete_Doctor/:id' , ( req,res)=>{
    var id = req.params._id

    console.log("delete id" , id)
    Doctor.findOneAndRemove(id)
    .exec()
    .then(doctors =>{
         console.log("Deleted Response from Api", doctors.data)
         res.json({success  : true , message : "Doctor are Succesfully Deleted" , data : doctors})
    })
    .catch(error =>{
        res.json({success : false , message : " Deleting process have an error" })
    })
})

router.get('/Get_One_Doctor/:id',(req,res)=>{
    var id = req.params._id
    Doctor.findById(id)
    .exec()
    .then(doctors =>{
         console.log("Deleted Response from Api", doctors.data)
         res.json({success  : true , message : "Doctor are Succesfully Getted" , data : doctors})
    })
    .catch(error =>{
        res.json({success : false , message : " Deleting process have an error" })
    })

})


router.get('/groupby' ,( req , res)=>{
      let specil = req.body.specil
    // let fname = req.body.fname;
    // let lname = req.body.lname
      
    Doctor.find( {specil : req.body.specil })
      .exec()
      .then(doctors =>{
           console.log("Geted Response from Api", doctors.data)
           res.json({success  : true , message : "Doctor are Succesfully Geted on base id" , data : doctors})
      })
      .catch(error =>{
          res.json({success : false , message : " Deleting process have an error" })
      })
    //   console.log("name form frontend ", name)
  })

 




  
router.post('/updatedoctor/:id' ,( req , res)=>{
    
    console.log(req.params._id)
 Doctor.findByIdAndUpdate({ _id : req.param.id,
        $set: {
            fname: req.body.fname,
            lname: req.body.lname,
            gender: req.body.gender,
            cnic: req.body.cnic,
            mobile: req.body.mobile,
            specil: req.body.specil,
            joinAs : req.body.joinAs,
            dateofbirth : req.body.dateofbirth,
            qualification : req.body.qualification,
            experience : req.body.experience,
            base : req.body.base,
            email: req.body.email,
            // picture: req.file.path,
            // password : req.body.password,
            address: req.body.address,
        }
        })
    .exec()
    .then(doctors =>{
         console.log("Updated Response from Api", doctors.data)
         res.json({success  : true , message : "Updating are Succesfully Geted on base id" , data : doctors})
    })
    .catch(error =>{
        res.json({success : false , message : " Updating process have an error", error })
    })
  //   console.log("name form frontend ", name)
  // Worker.aggregate([{$group : {Firstname : "$fname" , LastName :{ lname : "#lname" }}}])
})



module.exports = router;