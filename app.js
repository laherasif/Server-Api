const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');




const users = require('./routes/user');
const doctors = require('./routes/doctor');
const staff = require('./routes/staff');
const worker = require('./routes/worker');
const announces = require('./routes/announce')
const appoint = require('./routes/Appointment')
const specil = require('./routes/SpecilAppoint')


// const salry = require('./routes/salary')

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
);

const app = express();
app.use(passport.initialize());
require('./passport')(passport);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, PUT');
        return res.status(200).json({})
    }
    next()
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/Uploads' , express.static(__dirname+'Uploads'))



app.use('/api/users', users);
app.use('/api/doctors', doctors)
app.use('/api/staffs', staff)
app.use('/api/workers' , worker);
app.use('/api/announces', announces);
// app.use('/api/salarys', salry)
app.use('/api/appointments', appoint)
app.use('/api/spcilist/appoints', specil)


app.get('/', function (req, res) {
    res.send('hello');
});
// app.get('/Uploads/',(req, res)=>{
//     res.send('iamges')
// })


// app.use((req , res )=>{
//     res.status(400).json({
//         error : {
//             global : "Still not working  , please try again"
//         }
//     })
// })

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});