const express = require('express')
const router = express.Router();
const validateRegister = require('../validation/WorkerVali')
const multer = require('multer')
const Worker = require('../models/Worker')

const storage = multer.diskStorage({
    destination: function (req, file, next) {
        next(null, 'ServerSide/Images/Workers')
    },
    filename: function (req, file, next) {
      next(null , file.originalname)
    },
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

router.post('/register' , upload.single('picture'),(req,res) =>{
         
    const { errors , isValid } = validateRegister(req.body);
     
    if(!isValid)
    {
        return res.status(400).json(errors)
    }
    Worker.findOne({
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


router.get('/groupby' ,( req , res)=>{
  Worker.aggregate([{$group : {_id : "$fname" , LastName :{ lname : "#lname" }}}])
})

module.exports = router