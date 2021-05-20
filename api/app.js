const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload')
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3005
const dbConnectionURL = 'mongodb+srv://Ivan:Isupov95@cluster0.wvc9q.mongodb.net/b2b-v2?retryWrites=true&w=majority'
const secretKey = process.env.secretKey


const brewRouter = require('./routes/brewRouter')
const barRouter = require('./routes/barRouter')
const userRouter = require('./routes/userRouter')


app.use(
  cors({
    origin: true,
    credentials: true,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  })
);

app.use(fileupload())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/bar', barRouter)
app.use('/brew', brewRouter)
app.use('/user', userRouter)


app.listen(PORT, (req, res) => {
  mongoose.connect(dbConnectionURL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify:true}, () => {
    console.log('Mongo DB B2B v-2');
  })
  console.log('Server start at port',PORT);
})

