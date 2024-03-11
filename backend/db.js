const mongoose = require("mongoose");
const { MONGO_URL } = require("./config");
const { Schema } = require("zod");
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
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
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
