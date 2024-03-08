const express = require('express')
const zod = require('zod')
const {userModel}=require('../db')
const jwt =require ('jsonwebtoken')
const {JWT_SECRET} =require( '../config')

const router = express.Router()

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
  firstName: zod.string(),
  lastname: zod.string()
})
router.post('/signup', async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(req.body)
  if (!success) {
    return res.json({
      message: 'Incorrect inputs'
    })
  }
  const user = userModel.findOne({
    username: body.username
  })
  if (user._id) {
    return res.json({
      msg: 'email already exists'
    })
  }

  let newUser = await userModel.create(body)
  const token = jwt.sign(
    {
      uesrId: newUser._id
    },
    JWT_SECRET
  )
  res.json({
    msg: 'User created successfully',
    token: token
  })
})

router.get('/signin', (req, res) => {res.send('opened sigin')})

module.exports = router
