const {v4: uuidv4} = require('uuid')
const nodemailer = require('nodemailer')
const User = require('../models/User')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'theshoppiesno.1@gmail.com',
        pass: 'idwjohuxlihycvld'
    }
})

function sendCode(req, res){
    const code = uuidv4()
    const mailOptions = {
        from: 'isfaroshir@gmail.com',
        to: req.body.email,
        subject: 'Shoppies Code',
        text: 'Your code is: ' + code
    }
    transporter.sendMail(mailOptions, function(err, info){
        if (err){
            console.log(err);
            res.json({'status': 'invalid'})
        } else{
            console.log('Email sent: '+ info.response);
            console.log('code', code);
            res.json({'code': code, 'status': 'success'})
        }
    })
}

function login(req, res){
    const email = req.body.email
    const imdbID = req.body.lastClickedMovie.imdbID
    User.findOne({email: email}, (err, foundUser) => {
        if (err) console.log(err);
        else{
            if (foundUser){
                res.json({'email': foundUser.email})
            }
            else{
                const newUser = new User({
                    email: email,
                    nominations: [imdbID]
                })
                newUser.save()
                res.json({'email': email})
            }
        }
    })
}

exports.sendCode = sendCode
exports.login = login