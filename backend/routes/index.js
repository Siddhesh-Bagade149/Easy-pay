const express = require('express');
const app=express();

const router = express.Router();

const userRouter= require('./user')

app.use('/user',userRouter)

module.exports = router;