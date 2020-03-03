const express = require('express')
const router = express.Router();
const validateRegister = require('../validation/WorkerVali')
const multer = require('multer')
const Announce = require('../models/Announce')




router.post('/register' ,(req,res) =>{
         
    const { errors , isValid } = validateRegister(req.body);
     
    if(!isValid)
    {
        return res.status(400).json(errors)
    }
    Announce.findOne({
        email : req.body.email
    })
    .exec()
    .then(user =>{
        if(user)
        {
          return res.status(400).json({email : "email already exit"})
        }
        else{
       const worker = new Worker({
        fname: req.body.fname,
        lname: req.body.lname,
        gender: req.body.gender,
        cnic: req.body.cnic,
        mobile: req.body.mobile,
        specilist: req.body.specilist,
        dateofbirth : req.body.dateofbirth,
        status : req.body.status,
        picture: req.file.path,
        address: req.body.address,
       }) 
       worker.save()
       .then(work =>{
           res.json({success : true , message : " Worker Register process Successfully Completed" , data : work})
       })
       .catch(error =>{
           res.json({success : false , message : " Staff Register process error", error
           })
       })
    }
    })

})


router.get('/getworker',(req,res)=>{
  Worker.find()
  .exec()
  .then(user =>{
    res.json({success : true , message : " Fetch Staffs Successfully", data : user })
  })
  .catch(err=>{
    res.json({success : false , message : "error are during Fetch Staff" , err})
  })
})

router.get('/delworker',(req , res)=>{
  Worker.findByIdAndRemove({ id : req.params.id})
  .exec()
  .then(user =>{
    res.json({ success : true , message : " Staff are successfully Deleted", user
    })
  })
  .catch(err =>{
    res.json({ success : false , message : " During Staff  Deletion Process Fail" , err})
})
})

module.exports = router