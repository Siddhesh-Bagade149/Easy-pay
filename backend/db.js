const mongoose = require("mongoose");
const { MONGO_URL } = require("./config");
const { Schema } = require("zod");
const  argon2  = require("argon2");
mongoose.Promise = global.Promise;

try {
  mongoose.connect(
    //hidden mongo url
    MONGO_URL
  );
  console.log("connected to mongourl");
} catch (error) {
  console.log("error in connecting mongoose " + error);
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 40,
  },
  password_hash: {
    type: String,
    required: true,
  },
  // password: {
  //   type: String,
  //   required: true,
  //   minLength: 5,
  // },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

//creating a custom method createHash which will be available on each instance (document) created from the userSchema.
userSchema.methods.createHash = async function (plainTextPassword) {
  // return password hash
  let hashpw = await argon2.hash(plainTextPassword);
  // console.log(hashpw);
  return hashpw;
};

// Method to validate the entered password using argon2
userSchema.methods.validatePassword = async function (candidatePassword) {
  return await argon2.verify(this.password_hash, candidatePassword);
};
const userModel = mongoose.model("User", userSchema);

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userModel,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const accountModel = mongoose.model("accoutModel", accountSchema);
module.exports = {
  userModel,
  accountModel,
};
