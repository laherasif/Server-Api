const express = require('express')
const router = express.Router();
const validateRegister = require('../validation/StaffVali')
const multer = require('multer')
const Staff = require('../models/Staff')

const storage = multer.diskStorage({
    destination: function (req, file, next) {
        next(null, 'ServerSide/Images/Staffs')
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
    Staff.findOne({
        email : req.body.email
    })
    .exec()
    .then(user =>{
        if(user)
        {
          return res.status(400).json({email : "email already exit"})
        }
        else{
       const NewStaff = new Staff({
        fname: req.body.fname,
        lname: req.body.lname,
        gender: req.body.gender,
        cnic: req.body.cnic,
        mobile: req.body.mobile,
        specilist: req.body.Specilist,
        dateofbirth : req.body.dateofbirth,
        qualification : req.body.qualification,
        experience : req.body.experience,
        base : req.body.base,
        email: req.body.email,
        picture: req.file.path,
        address: req.body.address,
       }) 
       NewStaff.save()
       .then(staff =>{
           res.json({success : true , message : " Staff Register process Successfully Completed" , data : staff})
       })
       .catch(error =>{
           res.json({success : false , message : " Staff Register process error", error
           })
       })
    }
    })

})


router.get('/getstaff',(req,res)=>{
  Staff.find()
  .exec()
  .then(user =>{
    res.json({success : true , message : " Fetch Staffs Successfully", data : user })
  })
  .catch(err=>{
    res.json({success : false , message : "error are during Fetch Staff" , err})
  })
})


router.get('/delstaff/:id' , ( req,res)=>{
  var id = req.params.id

  console.log("delete id" , id)
  Staff.findByIdAndRemove(id)
  .exec()
  .then(doctors =>{
       console.log("Deleted Response from Api", doctors.data)
       res.json({success  : true , message : "Doctor are Succesfully Deleted" , data : doctors})
  })
  .catch(error =>{
      res.json({success : false , message : " Deleting process have an error" })
  })
})



router.post('/updatestaff/:id' ,( req , res)=>{
  Staff.findByIdAndUpdate({ _id: req.params.id }, {
      $set: {
        fname: req.body.fname,
        lname: req.body.lname,
        gender: req.body.gender,
        cnic: req.body.cnic,
        mobile: req.body.mobile,
        // specilist: req.body.Specilist,
        dateofbirth : req.body.dateofbirth,
        qualification : req.body.qualification,
        experience : req.body.experience,
        base : req.body.base,
        email: req.body.email,
        // picture: req.file.path,
        address: req.body.address,
      }
  })
      .exec()
      .then(product => {
          if (!product) {
              res.status(404).json({ success: false, Error: 'Product not found for this id' })
          }
          res.status(200).json({
              success: true,
              message: 'Product updated successfully',
              body: {
                  method: 'PATCH',
                  URL: `http://localhost:5000/${product._id}`,
                  data: product
              }
          })
      })
      .catch(err => {
          console.log('Product update Error: ', err)
      })

//   console.log("name form frontend ", name)
// Worker.aggregate([{$group : {Firstname : "$fname" , LastName :{ lname : "#lname" }}}])
})

module.exports = router