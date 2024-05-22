const express = require('express');
const userRouter= require('./user')
const accountRouter=require('./accounts')
const router = express.Router();

router.use('/user',userRouter)
router.use('/account',accountRouter);
router.get('/', (req, res) => {
    res.send('GET request to the /')
  })

module.exports = router;
