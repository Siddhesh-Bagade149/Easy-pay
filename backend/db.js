const mongoose = require('mongoose')

mongoose.Promise = global.Promise

// Connect MongoDB at default port 27017.
// mongoose.connect('mongodb+srv://siddhesh:CNwdQmdIvwcOGoGb@cluster0.rbwuu52.mongodb.net/PaytmDB').
// catch(error => console.log('error in connecting mongoose '+error));

try {
   mongoose.connect(
    'mongodb+srv://siddhesh:CNwdQmdIvwcOGoGb@cluster0.rbwuu52.mongodb.net/PaytmDB'
  )
  console.log('connected to mongourl')
} catch (error) {
  hconsole.log('error in connecting mongoose ' + error)
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 40
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  }
})

const userModel = mongoose.model('User', userSchema)

module.exports = {
  userModel
}
