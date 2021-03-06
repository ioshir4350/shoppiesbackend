const express = require("express")
const bodyParser = require('body-parser')

const nominationRoutes = require('./routes/nomination')
const authRoutes = require('./routes/auth')

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const URI = process.env.URI
const mongoose = require('mongoose')
const connectDB = async()=>{
  await mongoose.connect(URI, {useUnifiedTopology: true, useNewUrlParser: true});
  console.log('db connected!');
};

connectDB()

app.use('/api/nomination', nominationRoutes)
app.use('/api/auth', authRoutes)

app.listen(process.env.PORT)