const express = require('express')
const zod = require('zod')
const { userModel } = require('../db')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

const router = express.Router()

router.get('/',(req,res)=>{
  res.send('working for /api/v1/user')
})

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
  firstName: zod.string(),
  lastname: zod.string()
})
router.post('/signup', async (req, res) => {
  const body = req.body
  try {
    console.log('inside user try');
    const { success } = signupSchema.safeParse(req.body)
    if (!success) {
      return res.json({
        message: 'Incorrect inputs'
      })
    }

    const existingUser = await userModel.findOne({
      username: body.username
    })

    if (existingUser._id) {
      return res.json({
        msg: 'email already exists'
      })
    }

    let newUser = await userModel.create(body)
    const token = jwt.sign(
      {
        userId: newUser._id
      },
      JWT_SECRET
    )
    res.json({
      msg: 'User created successfully',
      token: token
    })
  } 
  catch (error) {
    console.error('Error creating user:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
})

router.get('/signin', (req, res) => {
  res.send('opened sigin')
})

module.exports = router
